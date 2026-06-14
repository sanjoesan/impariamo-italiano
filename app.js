/* =========================================================
   Impariamo! — App-Logik
   ========================================================= */
"use strict";

/* ---------- Zustand (localStorage) ---------- */
const STORE_KEY = "impariamo_v1";
const defaultState = () => ({
  xp: 0,
  coins: 0,
  streak: 0,
  lastActive: null,            // "YYYY-MM-DD"
  lessons: {},                 // id -> { stars, completed, learned: [indices] }
  badges: [],                  // ids
  storyPos: 0,                 // Index in STORY (steigende Schwierigkeit)
  storyDone: 0,                // wie viele Story-Etappen geschafft
  levelFilter: "A1",           // aktiver Level-Filter auf der Startseite
  settings: { voiceURI: null, rate: 0.95, theme: "giorno", sound: true }
});

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const s = Object.assign(defaultState(), parsed);
    // Einstellungen tief mergen, damit neue Optionen (theme/sound) Defaults behalten
    s.settings = Object.assign(defaultState().settings, parsed.settings || {});
    return s;
  } catch (e) {
    return defaultState();
  }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------- Hilfsfunktionen ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const todayStr = () => new Date().toISOString().slice(0, 10);

function levelFromXp(xp) {
  // Level n braucht 100*n XP kumulativ-ish; einfache, sich steigernde Kurve
  let lvl = 1, need = 100, acc = 0;
  while (xp >= acc + need) { acc += need; lvl++; need = 100 + (lvl - 1) * 50; }
  return { level: lvl, inLevel: xp - acc, need };
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Streak aktualisieren ---------- */
function touchStreak() {
  const t = todayStr();
  if (state.lastActive === t) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (state.lastActive === yesterday) state.streak += 1;
  else state.streak = 1;
  state.lastActive = t;
  saveState();
}

/* ---------- XP / Münzen vergeben ---------- */
function award(xp, coins) {
  const before = levelFromXp(state.xp).level;
  state.xp += xp;
  state.coins += coins;
  const after = levelFromXp(state.xp).level;
  saveState();
  renderStats();
  if (after > before) {
    toast(`🎉 Level ${after}! Bravissimo!`);
    burstConfetti();
    sfx.win();
  }
}

/* =========================================================
   SPRACHAUSGABE (Web Speech API)
   ========================================================= */
let voices = [];
let itVoice = null;

function rankVoice(v) {
  // Höher = besser. Bevorzuge it-IT und bekannte gute Stimmen.
  let s = 0;
  const lang = (v.lang || "").toLowerCase();
  const name = (v.name || "").toLowerCase();
  if (lang.startsWith("it")) s += 100;
  if (lang === "it-it") s += 20;
  if (/google/.test(name)) s += 40;        // Google-Stimmen klingen meist sehr natürlich
  if (/natural|neural|premium|enhanced/.test(name)) s += 35;
  if (/elsa|cosimo|alice|federica|isabella|giorgio|luca|bianca/.test(name)) s += 15;
  if (!v.localService) s += 10;             // Online-Stimmen oft hochwertiger
  return s;
}

function pickVoice() {
  const itVoices = voices.filter((v) => (v.lang || "").toLowerCase().startsWith("it"));
  const pool = itVoices.length ? itVoices : voices;
  // gespeicherte Auswahl respektieren
  if (state.settings.voiceURI) {
    const saved = voices.find((v) => v.voiceURI === state.settings.voiceURI);
    if (saved) { itVoice = saved; return; }
  }
  itVoice = pool.slice().sort((a, b) => rankVoice(b) - rankVoice(a))[0] || null;
}

function loadVoices() {
  voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  pickVoice();
  populateVoiceSelect();
}

function speak(text, btn) {
  if (!("speechSynthesis" in window)) {
    toast("⚠️ Sprachausgabe wird hier nicht unterstützt");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "it-IT";
  u.rate = state.settings.rate || 0.95;
  u.pitch = 1;
  if (itVoice) u.voice = itVoice;
  if (btn) {
    btn.classList.add("speaking");
    u.onend = u.onerror = () => btn.classList.remove("speaking");
  }
  speechSynthesis.speak(u);
}

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  // Manche Browser brauchen einen kleinen Anstoß
  setTimeout(loadVoices, 400);
}

/* =========================================================
   SPRACHERKENNUNG (Web Speech Recognition) — auf ITALIENISCH
   WICHTIG: lang = "it-IT", damit das Mikrofon Italienisch (nicht
   Deutsch) erkennt. Wird im Modus „Sprechen" verwendet.
   ========================================================= */
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const speechRecAvailable = !!SpeechRec;
let recognizer = null;

function startRecognition({ onResult, onError, onEnd } = {}) {
  if (!SpeechRec) { onError && onError("unsupported"); return null; }
  stopRecognition();
  try {
    const rec = new SpeechRec();
    rec.lang = "it-IT";            // <— Italienische Erkennung erzwingen
    rec.interimResults = false;
    rec.maxAlternatives = 4;
    rec.continuous = false;
    rec.onresult = (e) => {
      const alts = [];
      const r = e.results && e.results[0];
      for (let i = 0; r && i < r.length; i++) alts.push(r[i].transcript);
      onResult && onResult(alts);
    };
    rec.onerror = (e) => { onError && onError((e && e.error) || "error"); };
    rec.onend = () => { recognizer = null; onEnd && onEnd(); };
    rec.start();
    recognizer = rec;
    return rec;
  } catch (err) { onError && onError("error"); return null; }
}
function stopRecognition() {
  if (recognizer) { try { recognizer.abort(); } catch (e) {} recognizer = null; }
}

/* =========================================================
   SOUNDEFFEKTE (Web Audio API — keine Audiodateien nötig)
   ========================================================= */
let audioCtx = null;
function getAudio() {
  if (!state.settings.sound) return null;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  } catch (e) { return null; }
}
function tone(freq, start, dur, type, vol) {
  const ac = getAudio();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(vol || 0.18, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g); g.connect(ac.destination);
  osc.start(t0); osc.stop(t0 + dur + 0.03);
}
const sfx = {
  correct() { tone(659.25, 0, 0.15, "sine", 0.2); tone(783.99, 0.09, 0.15, "sine", 0.2); tone(1046.5, 0.18, 0.28, "sine", 0.22); },
  wrong()   { tone(196, 0, 0.18, "sawtooth", 0.11); tone(155.56, 0.09, 0.24, "sawtooth", 0.11); },
  win()     { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.11, 0.32, "triangle", 0.2)); },
  click()   { tone(523.25, 0, 0.07, "sine", 0.1); }
};

/* =========================================================
   THEME (Tag / Nacht)
   ========================================================= */
function applyTheme() {
  const notte = state.settings.theme === "notte";
  document.body.classList.toggle("notte", notte);
  const btn = $("#themeBtn");
  if (btn) { btn.textContent = notte ? "☀️" : "🌙"; btn.title = notte ? "Tag-Modus" : "Nacht-Modus"; }
}
function toggleTheme() {
  state.settings.theme = state.settings.theme === "notte" ? "giorno" : "notte";
  saveState();
  applyTheme();
  toast(state.settings.theme === "notte" ? "🌙 Buonanotte!" : "☀️ Buongiorno!");
}

/* =========================================================
   RENDER: Statusleiste
   ========================================================= */
function renderStats() {
  const lf = levelFromXp(state.xp);
  $("#statLevel").textContent = lf.level;
  $("#statStreak").textContent = state.streak;
  $("#statCoins").textContent = state.coins;
  $("#xpFill").style.width = Math.round((lf.inLevel / lf.need) * 100) + "%";
  $("#xpText").textContent = `${lf.inLevel} / ${lf.need} XP · Lvl ${lf.level}`;
}

/* =========================================================
   Helfer rund um Lektionen & Level
   ========================================================= */
const lessonById = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
function lessonItemCount(l) { return l.kind === "dialogue" ? l.lines.length : l.words.length; }
function lessonLearnedCount(l, prog) {
  if (l.kind === "dialogue") return prog.completed ? l.lines.length : 0;
  return (prog.learned || []).length;
}
function getProg(id) { return state.lessons[id] || { stars: 0, completed: false, learned: [] }; }

function makeLessonCard(lesson) {
  const prog = getProg(lesson.id);
  const total = lessonItemCount(lesson);
  const learnedCount = lessonLearnedCount(lesson, prog);
  const pct = total ? Math.round((learnedCount / total) * 100) : 0;
  const stars = "★".repeat(prog.stars || 0) + "☆".repeat(3 - (prog.stars || 0));
  const lvl = LEVEL_BY_CODE[lesson.levelCode];
  const kindTag = lesson.kind === "dialogue" ? "💬 Dialog"
                : lesson.kind === "grammar" ? "🔤 Grammatik"
                : lesson.area === "Sfide" ? "🎯 Sfida"
                : lesson.area === "Ripasso" ? "🔁 Ripasso" : "📚";

  const card = document.createElement("button");
  card.className = "lesson-card";
  card.style.setProperty("--card-color", lesson.color);
  card.innerHTML = `
    ${prog.completed ? `<span class="lc-stamp">✓ Fatto</span>` : ""}
    <span class="lc-badge" style="--lv:${lvl ? lvl.color : lesson.color}">${lesson.levelCode}</span>
    <span class="lc-emoji">${lesson.emoji}</span>
    <span class="lc-title">${lesson.title}</span>
    <span class="lc-de">${lesson.de}</span>
    <div class="lc-progress"><i style="width:${pct}%"></i></div>
    <div class="lc-foot">
      <span class="lc-stars" style="color:${lesson.color}">${stars}</span>
      <span class="lc-count">${kindTag} · ${total} 🎮</span>
    </div>`;
  card.addEventListener("click", () => openLesson(lesson.id));
  return card;
}

/* =========================================================
   RENDER: Startseite (Story, Level-Filter, Lektions-Karten)
   ========================================================= */
function renderHome() {
  $("#heroStats").textContent =
    `📚 ${LESSONS.length} Lektionen · 🎚️ 6 Stufen (A1–C2) · 💬 Dialoge · 🎤 Sprechen · ✍️ Bausteine`;
  renderStoryPanel();
  renderLevelFilter();
  renderLessonGrid();
  renderConjGrid();
  renderBadges();
}

function renderStoryPanel() {
  const panel = $("#storyPanel");
  if (!panel) return;
  const pos = Math.min(state.storyPos || 0, STORY.length - 1);
  const lesson = lessonById[STORY[pos]];
  if (!lesson) { panel.innerHTML = ""; return; }
  const lvl = LEVEL_BY_CODE[lesson.levelCode];
  const pct = Math.round((pos / STORY.length) * 100);

  // Start-Niveau-Wahl: nur Stufen anbieten, die in der Story wirklich vorkommen
  const levelsInStory = LEVELS.filter((L) => storyStartIndexForLevel(L.n) >= 0);
  const chips = levelsInStory.map((L) =>
    `<button class="story-lv-chip${L.n === lesson.level ? " active" : ""}" data-storylv="${L.n}"
       style="--lv:${L.color}" title="Story ab ${L.code} – ${L.de}">${L.emoji} ${L.code}</button>`
  ).join("");

  panel.innerHTML = `
    <div class="story-card" style="--card-color:${lvl ? lvl.color : lesson.color}">
      <div class="story-head">
        <span class="story-step">Etappe ${pos + 1} / ${STORY.length}</span>
        <span class="story-lv" style="--lv:${lvl ? lvl.color : lesson.color}">${lvl ? lvl.emoji + " " + lvl.code : lesson.levelCode}</span>
      </div>
      <div class="story-levels">
        <span class="story-levels-label">🎚️ Start-Niveau:</span>
        <div class="story-lv-chips">${chips}</div>
      </div>
      <div class="story-next">
        <span class="story-emoji">${lesson.emoji}</span>
        <div>
          <div class="story-title">${lesson.title}</div>
          <div class="story-de">${lesson.de}</div>
        </div>
      </div>
      <div class="story-prog"><i style="width:${pct}%"></i></div>
      <button class="btn btn-primary" id="storyGo">▶︎ Etappe starten</button>
    </div>`;
  $("#storyGo").addEventListener("click", startStory);
  $$("#storyPanel [data-storylv]").forEach((b) =>
    b.addEventListener("click", () => setStoryStartLevel(parseInt(b.dataset.storylv, 10)))
  );
}

function renderLevelFilter() {
  const wrap = $("#levelFilter");
  if (!wrap) return;
  wrap.innerHTML = "";
  const opts = [{ code: "all", emoji: "🌈", label: "Tutti" }]
    .concat(LEVELS.map((l) => ({ code: l.code, emoji: l.emoji, label: l.code, color: l.color })));
  opts.forEach((o) => {
    const b = document.createElement("button");
    b.className = "lv-chip" + (state.levelFilter === o.code ? " active" : "");
    if (o.color) b.style.setProperty("--lv", o.color);
    const count = o.code === "all" ? LESSONS.length : LESSONS.filter((l) => l.levelCode === o.code).length;
    b.innerHTML = `${o.emoji} ${o.label} <small>${count}</small>`;
    b.addEventListener("click", () => {
      state.levelFilter = o.code; saveState();
      renderLevelFilter(); renderLessonGrid();
    });
    wrap.appendChild(b);
  });
}

function renderLessonGrid() {
  const grid = $("#lessonGrid");
  grid.innerHTML = "";
  const filter = state.levelFilter || "all";
  const list = LESSONS.filter((l) => filter === "all" || l.levelCode === filter);

  // nach Bereich gruppieren, in fester Reihenfolge
  const order = ["Grundlagen", "Soziales", "Alltag", "Beruf", "Reisen", "Gesundheit", "Natur", "Freizeit", "Grammatica", "Dialoge", "Sfide", "Ripasso"];
  const groups = {};
  list.forEach((l) => { (groups[l.area] = groups[l.area] || []).push(l); });
  const areas = Object.keys(groups).sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  areas.forEach((area) => {
    const head = document.createElement("div");
    head.className = "area-head";
    head.innerHTML = `<span>${area}</span><small>${groups[area].length}</small>`;
    grid.appendChild(head);
    const row = document.createElement("div");
    row.className = "area-grid";
    groups[area].forEach((lesson) => row.appendChild(makeLessonCard(lesson)));
    grid.appendChild(row);
  });
}

function renderConjGrid() {
  const grid = $("#conjGrid");
  if (!grid) return;
  grid.innerHTML = "";
  CONJUGATIONS.forEach((v) => {
    const card = document.createElement("button");
    card.className = "conj-card";
    card.style.setProperty("--card-color", v.color);
    card.innerHTML = `
      <span class="cc-emoji">${v.emoji}</span>
      <span class="cc-inf">${v.inf}</span>
      <span class="cc-de">${v.infDe}</span>
      <span class="cc-tag">${CONJ_TENSES.length} Zeiten</span>`;
    card.addEventListener("click", () => openConj(v.id));
    grid.appendChild(card);
  });
}

function renderBadges() {
  const wrap = $("#badges");
  wrap.innerHTML = "";
  BADGES.forEach((b) => {
    const have = state.badges.includes(b.id);
    const el = document.createElement("div");
    el.className = "badge" + (have ? "" : " locked");
    el.innerHTML = `
      <span class="b-emoji">${have ? b.emoji : "🔒"}</span>
      <div class="b-name">${b.name}</div>
      <div class="b-desc">${b.desc}</div>`;
    wrap.appendChild(el);
  });
}

/* ---------- Abzeichen prüfen ---------- */
function checkBadges() {
  const completed = Object.values(state.lessons).filter((l) => l.completed).length;
  const totalLearned = Object.values(state.lessons).reduce((s, l) => s + (l.learned ? l.learned.length : 0), 0);
  const maxStars = Math.max(0, ...Object.values(state.lessons).map((l) => l.stars || 0));

  if (completed >= 1) grantBadge("primo");
  if (completed >= 10) grantBadge("studioso");
  if (completed >= 50) grantBadge("maestro");
  if (state.streak >= 3) grantBadge("fiamma");
  if (maxStars >= 3) grantBadge("stelle");
  if (state.coins >= 500) grantBadge("ricco");
  if (totalLearned >= 200) grantBadge("poliglotta");
  if ((state.storyDone || 0) >= 10) grantBadge("narratore");
  saveState();
}

/* =========================================================
   LEKTION ÖFFNEN
   ========================================================= */
let current = { lesson: null, mode: "learn", index: 0 };

const MODE_META = {
  learn:    "📖 Lernen",
  dialogue: "🎭 Dialog",
  listen:   "🎧 Hören",
  quiz:     "🎯 Quiz",
  match:    "🧩 Zuordnen",
  build:    "✍️ Satzbau",
  gap:      "✏️ Lücke",
  speak:    "🎤 Sprechen"
};

function buildModeTabs(lesson, activeMode) {
  const tabs = $("#modeTabs");
  tabs.innerHTML = "";
  lesson.modes.forEach((m) => {
    const b = document.createElement("button");
    b.className = "mode-tab" + (m === activeMode ? " active" : "");
    b.dataset.mode = m;
    b.textContent = MODE_META[m] || m;
    b.addEventListener("click", () => setMode(m));
    tabs.appendChild(b);
  });
}

function openLesson(id) {
  const lesson = lessonById[id] || LESSONS.find((l) => l.id === id);
  if (!lesson) return;
  touchStreak();
  const startMode = (lesson.modes && lesson.modes[0]) || "learn";
  current = { lesson, mode: startMode, index: 0 };
  if (!state.lessons[id]) state.lessons[id] = { stars: 0, completed: false, learned: [] };
  saveState();

  $("#viewHome").classList.add("hidden");
  $("#viewLesson").classList.remove("hidden");
  $("#lessonEmoji").textContent = lesson.emoji;
  $("#lessonTitle").textContent = lesson.title;
  const lvl = LEVEL_BY_CODE[lesson.levelCode];
  const badge = $("#lessonLevelBadge");
  if (badge) {
    badge.innerHTML = lvl ? `${lvl.emoji} ${lvl.code}<span class="lvl-de"> · ${lvl.de}</span>` : lesson.levelCode;
    badge.style.setProperty("--lv", lvl ? lvl.color : lesson.color);
  }
  buildModeTabs(lesson, startMode);
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderMode();
}

function goHome() {
  speechSynthesis && speechSynthesis.cancel();
  stopRecognition();
  $("#viewLesson").classList.add("hidden");
  $("#viewConj").classList.add("hidden");
  $("#viewHome").classList.remove("hidden");
  renderStats();
  renderHome();
}

function setMode(mode) {
  speechSynthesis && speechSynthesis.cancel();
  stopRecognition();
  current.mode = mode;
  current.index = 0;
  $$("#modeTabs .mode-tab").forEach((t) => t.classList.toggle("active", t.dataset.mode === mode));
  renderMode();
}

function renderMode() {
  switch (current.mode) {
    case "learn":    return renderLearn();
    case "listen":   return renderListen();
    case "quiz":     return renderQuiz();
    case "match":    return renderMatch();
    case "build":    return renderBuild();
    case "gap":      return renderGap();
    case "speak":    return renderSpeak();
    case "dialogue": return renderDialogue();
    default:         return renderLearn();
  }
}

function setProgress(pct) { $("#lessonProgress").style.width = pct + "%"; }

/* Buttons zu anderen verfügbaren Modi (für Abschluss-Bildschirme).
   Nur Modi, die diese Lektion wirklich anbietet — verhindert Abstürze. */
function otherModesHtml(exclude, max) {
  const modes = (current.lesson.modes || []).filter((m) => m !== exclude && m !== "learn");
  return modes.slice(0, max || 2)
    .map((m) => `<button class="btn btn-ghost" data-goto="${m}">${MODE_META[m] || m}</button>`).join("");
}
function wireOtherModes(scope) {
  (scope || document).querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", () => setMode(b.dataset.goto)));
}

/* markiert die Lektion als abgeschlossen + rückt ggf. die Story vor */
function completeLesson(stars) {
  const p = state.lessons[current.lesson.id];
  if (typeof stars === "number") p.stars = Math.max(p.stars || 0, stars);
  p.completed = true;
  if (/^[3-6]$/.test(String(current.lesson.level)) || current.lesson.levelCode[0] === "B" || current.lesson.levelCode[0] === "C") {
    grantBadge("scalatore");
  }
  saveState();
  advanceStoryIfMatch(current.lesson.id);
}

/* =========================================================
   MODUS 1 — LERNEN (Flashcards)
   ========================================================= */
function renderLearn() {
  const { lesson, index } = current;
  const w = lesson.words[index];
  const body = $("#lessonBody");
  setProgress(Math.round(((index + 1) / lesson.words.length) * 100));

  body.innerHTML = `
    <div class="flash-stage">
      ${lesson.rule ? `<div class="grammar-rule">📐 <b>Regel:</b> ${lesson.rule}</div>` : ""}
      <div class="flashcard" id="flashcard">
        <div class="flash-inner">
          <div class="flash-face front">
            <span class="flash-emoji">${w.emoji}</span>
            <div class="flash-word${lesson.sentences ? " is-sentence" : ""}">${w.it}</div>
            <div class="flash-ex"><em>${w.ex}</em></div>
            <div class="flash-hint">↻ Tippen zum Umdrehen</div>
          </div>
          <div class="flash-face back">
            <span class="flash-emoji">${w.emoji}</span>
            <div class="flash-de">${w.de}</div>
            <div class="flash-ex"><span class="ex-de">${w.exDe}</span></div>
            <div class="flash-hint">↻ Tippen zum Umdrehen</div>
          </div>
        </div>
      </div>

      <button class="speak-btn" id="speakBtn">🔊 Anhören</button>

      <div class="flash-nav">
        <button class="nav-arrow" id="prevBtn" ${index === 0 ? "disabled" : ""}>‹</button>
        <span class="flash-counter">${index + 1} / ${lesson.words.length}</span>
        <button class="nav-arrow" id="nextBtn">${index === lesson.words.length - 1 ? "✓" : "›"}</button>
      </div>
    </div>`;

  const card = $("#flashcard");
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  $("#speakBtn").addEventListener("click", (e) => { e.stopPropagation(); speak(w.it, e.currentTarget); });

  // Vokabel als "gelernt" markieren + XP beim ersten Mal
  markLearned(index);

  $("#prevBtn").addEventListener("click", () => { if (current.index > 0) { current.index--; renderLearn(); autoSpeak(); } });
  $("#nextBtn").addEventListener("click", () => {
    if (current.index < lesson.words.length - 1) { current.index++; renderLearn(); autoSpeak(); }
    else { toast("📖 Alle Vokabeln gesehen! Jetzt das Quiz 🎯"); setMode("quiz"); }
  });

  autoSpeak();
}

function autoSpeak() {
  // Automatische, dezente Aussprache beim Kartenwechsel
  const w = current.lesson.words[current.index];
  const btn = $("#speakBtn");
  setTimeout(() => speak(w.it, btn), 180);
}

function markLearned(index) {
  const p = state.lessons[current.lesson.id];
  if (!p.learned) p.learned = [];
  if (!p.learned.includes(index)) {
    p.learned.push(index);
    saveState();
    award(8, 2);
    checkBadges();
    renderHome();
  }
}

/* =========================================================
   MODUS 2 — QUIZ (Multiple Choice)
   ========================================================= */
let quizState = null;

function renderQuiz() {
  const { lesson } = current;
  quizState = { order: shuffle(lesson.words.map((_, i) => i)), pos: 0, correct: 0, answered: false };
  showQuizQuestion();
}

function showQuizQuestion() {
  const { lesson } = current;
  const body = $("#lessonBody");
  if (quizState.pos >= quizState.order.length) return finishQuiz();

  setProgress(Math.round((quizState.pos / quizState.order.length) * 100));
  const wIndex = quizState.order[quizState.pos];
  const w = lesson.words[wIndex];

  // 3 Ablenker aus derselben Lektion
  const others = shuffle(lesson.words.filter((x) => x.de !== w.de)).slice(0, 3);
  const options = shuffle([w, ...others]);

  body.innerHTML = `
    <div class="quiz-stage">
      <div class="quiz-prompt">
        <span class="quiz-q-label">Was bedeutet …?</span>
        <span class="quiz-emoji">${w.emoji}</span>
        <span class="quiz-word${lesson.sentences ? " is-sentence" : ""}">${w.it}</span>
        <div><button class="speak-btn" id="qSpeak">🔊 Anhören</button></div>
      </div>
      <div class="quiz-options" id="quizOptions"></div>
      <div class="quiz-feedback" id="quizFeedback"></div>
    </div>`;

  $("#qSpeak").addEventListener("click", (e) => speak(w.it, e.currentTarget));
  speak(w.it);

  const optWrap = $("#quizOptions");
  options.forEach((opt) => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.textContent = opt.de;
    b.addEventListener("click", () => answerQuiz(b, opt.de === w.de, w));
    optWrap.appendChild(b);
  });
}

function answerQuiz(btn, isCorrect, w) {
  if (quizState.answered) return;
  quizState.answered = true;
  $$(".quiz-opt").forEach((b) => {
    b.disabled = true;
    if (b.textContent === w.de) b.classList.add("correct");
  });
  const fb = $("#quizFeedback");
  if (isCorrect) {
    btn.classList.add("correct");
    quizState.correct++;
    fb.textContent = ["Bravo! 🎉", "Esatto! ✨", "Perfetto! 👏", "Sì! 🌟"][quizState.pos % 4];
    fb.style.color = "var(--olive)";
    award(5, 1);
    sfx.correct();
  } else {
    btn.classList.add("wrong");
    fb.textContent = `Quasi! Richtig: „${w.de}"`;
    fb.style.color = "var(--red-it)";
    sfx.wrong();
  }
  setTimeout(() => { quizState.pos++; quizState.answered = false; showQuizQuestion(); }, 1150);
}

function finishQuiz() {
  const { lesson } = current;
  const total = quizState.order.length;
  const score = quizState.correct;
  const pct = score / total;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
  setProgress(100);

  // Fortschritt speichern (bestes Ergebnis behalten)
  const p = state.lessons[lesson.id];
  p.stars = Math.max(p.stars || 0, stars);
  if (pct >= 0.7) completeLesson(stars); else saveState();

  // Belohnungen
  award(score * 4 + (stars === 3 ? 20 : 0), score * 2 + stars * 5);
  if (score === total) {
    if (!state.badges.includes("perfetto")) { state.badges.push("perfetto"); saveState(); }
  }
  checkBadges();

  const msgs = ["Continua così!", "Che bravo!", "Magnifico!", "Sei un campione!"];
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${stars === 3 ? "🏆" : stars >= 1 ? "🎉" : "💪"}</div>
      <div class="done-stars" style="color:var(--gold)">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <h3>${score} / ${total} richtig</h3>
      <p>${stars === 3 ? "Fehlerfrei – " : ""}${msgs[stars] || "Weiter so!"} <em>(+${score * 4 + (stars === 3 ? 20 : 0)} XP)</em></p>
      <div class="done-actions">
        <button class="btn btn-primary" id="retryQuiz">↻ Nochmal</button>
        <button class="btn btn-ghost" id="toMatch">🧩 Zuordnen</button>
        <button class="btn btn-ghost" id="toHome">🏠 Startseite</button>
      </div>
    </div>`;
  $("#retryQuiz").addEventListener("click", () => setMode("quiz"));
  $("#toMatch").addEventListener("click", () => setMode("match"));
  $("#toHome").addEventListener("click", goHome);

  if (stars >= 2) { burstConfetti(); sfx.win(); }
  renderHome();
}

/* =========================================================
   MODUS 3 — ZUORDNEN (Match)
   ========================================================= */
let matchState = null;

function renderMatch() {
  const { lesson } = current;
  // bis zu 6 Paare pro Runde für Übersicht
  const pool = shuffle(lesson.words).slice(0, Math.min(6, lesson.words.length));
  matchState = { pairs: pool, selected: null, done: 0, total: pool.length };
  setProgress(0);

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="match-stage">
      <div class="match-col" id="colIt"><h4>🇮🇹 Italiano</h4></div>
      <div class="match-col" id="colDe"><h4>🇩🇪 Deutsch</h4></div>
    </div>`;

  const colIt = $("#colIt");
  const colDe = $("#colDe");

  shuffle(pool).forEach((w) => {
    const el = document.createElement("button");
    el.className = "match-item it-item";
    el.textContent = w.it;
    el.dataset.key = w.it;
    el.addEventListener("click", () => selectMatch(el, "it", w));
    colIt.appendChild(el);
  });
  shuffle(pool).forEach((w) => {
    const el = document.createElement("button");
    el.className = "match-item de-item";
    el.textContent = w.de;
    el.dataset.key = w.it;
    el.addEventListener("click", () => selectMatch(el, "de", w));
    colDe.appendChild(el);
  });
}

function selectMatch(el, side, w) {
  if (el.classList.contains("done")) return;

  if (side === "it") speak(w.it, null);

  if (!matchState.selected) {
    $$(".match-item.selected").forEach((x) => x.classList.remove("selected"));
    el.classList.add("selected");
    matchState.selected = { el, side, w };
    return;
  }

  const sel = matchState.selected;
  // gleiche Spalte → Auswahl wechseln
  if (sel.side === side) {
    $$(".match-item.selected").forEach((x) => x.classList.remove("selected"));
    el.classList.add("selected");
    matchState.selected = { el, side, w };
    return;
  }

  // Treffer?
  if (sel.w.it === w.it) {
    sel.el.classList.remove("selected");
    sel.el.classList.add("done");
    el.classList.add("done");
    matchState.selected = null;
    matchState.done++;
    award(4, 1);
    sfx.correct();
    setProgress(Math.round((matchState.done / matchState.total) * 100));
    if (matchState.done === matchState.total) finishMatch();
  } else {
    const a = sel.el, b = el;
    sfx.wrong();
    a.classList.add("shake"); b.classList.add("shake");
    setTimeout(() => { a.classList.remove("shake", "selected"); b.classList.remove("shake"); }, 420);
    matchState.selected = null;
  }
}

function finishMatch() {
  const p = state.lessons[current.lesson.id];
  if (!p.completed) { /* Match allein schließt nicht ab, aber zählt zum Lernen */ }
  saveState();
  checkBadges();
  burstConfetti();
  sfx.win();

  const body = $("#lessonBody");
  setTimeout(() => {
    body.innerHTML = `
      <div class="done-screen">
        <div class="done-emoji">🧩✨</div>
        <h3>Tutto abbinato!</h3>
        <p>Alle Paare gefunden. <em>Sei bravissimo!</em></p>
        <div class="done-actions">
          <button class="btn btn-primary" id="againMatch">↻ Neue Runde</button>
          <button class="btn btn-ghost" id="toQuiz2">🎯 Quiz</button>
          <button class="btn btn-ghost" id="toHome2">🏠 Startseite</button>
        </div>
      </div>`;
    $("#againMatch").addEventListener("click", () => setMode("match"));
    $("#toQuiz2").addEventListener("click", () => setMode("quiz"));
    $("#toHome2").addEventListener("click", goHome);
  }, 500);
}

/* =========================================================
   MODUS 4 — HÖREN (Ascolto / Diktat)
   ========================================================= */
let listenState = null;

function normalizeText(s) {
  return (s || "")
    .toLowerCase().trim()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")  // Akzente entfernen (è -> e)
    .replace(/['’.,!?;:"]/g, "")                        // Satzzeichen entfernen
    .replace(/\s+/g, " ");
}

function renderListen() {
  const { lesson } = current;
  listenState = { order: shuffle(lesson.words.map((_, i) => i)), pos: 0, correct: 0, answered: false };
  showListen();
}

function showListen() {
  const { lesson } = current;
  if (listenState.pos >= listenState.order.length) return finishListen();
  listenState.answered = false;   // WICHTIG: für jede neue Frage zurücksetzen
  setProgress(Math.round((listenState.pos / listenState.order.length) * 100));
  const w = lesson.words[listenState.order[listenState.pos]];

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="listen-stage">
      <div class="listen-card">
        <span class="listen-q-label">Hör zu und schreibe es auf Italienisch · ${listenState.pos + 1}/${listenState.order.length}</span>
        <button class="listen-big-speak" id="bigSpeak" title="Anhören">🔊</button>
        <button class="listen-replay" id="replayBtn">↻ nochmal anhören</button>
        <input type="text" class="listen-input" id="listenInput"
               placeholder="… tippe, was du hörst" autocomplete="off"
               autocapitalize="off" autocorrect="off" spellcheck="false" />
        <div class="listen-solution" id="listenSolution"></div>
      </div>
      <div class="listen-actions">
        <button class="btn btn-ghost" id="listenSkip">🙈 Lösung</button>
        <button class="btn btn-primary" id="listenCheck">Prüfen ✓</button>
      </div>
    </div>`;

  const speakBtn = $("#bigSpeak");
  speakBtn.addEventListener("click", () => speak(w.it, speakBtn));
  $("#replayBtn").addEventListener("click", () => speak(w.it, speakBtn));
  $("#listenCheck").addEventListener("click", () => checkListen(w));
  $("#listenSkip").addEventListener("click", () => revealListen(w));

  const inp = $("#listenInput");
  inp.addEventListener("keydown", (e) => { if (e.key === "Enter") checkListen(w); });
  inp.focus();

  setTimeout(() => speak(w.it, speakBtn), 250);
}

function checkListen(w) {
  if (listenState.answered) { nextListen(); return; }
  const inp = $("#listenInput");
  if (!inp.value.trim()) { speak(w.it); inp.focus(); return; }

  const ok = normalizeText(inp.value) === normalizeText(w.it);
  listenState.answered = true;
  inp.disabled = true;
  inp.classList.add(ok ? "correct" : "wrong");
  const sol = $("#listenSolution");

  if (ok) {
    sol.innerHTML = `✅ <span style="color:var(--olive)">Esatto! „${w.it}" — ${w.de}</span>`;
    listenState.correct++;
    award(6, 2);
    sfx.correct();
  } else {
    sol.innerHTML = `❌ Richtig: <span style="color:var(--terracotta-d)">„${w.it}"</span> <span class="listen-de-hint">(${w.de})</span>`;
    sfx.wrong();
  }
  const last = listenState.pos >= listenState.order.length - 1;
  $("#listenCheck").textContent = last ? "Fertig 🏁" : "Weiter ›";
}

function revealListen(w) {
  if (listenState.answered) return;
  listenState.answered = true;
  const inp = $("#listenInput");
  inp.value = w.it; inp.disabled = true;
  $("#listenSolution").innerHTML = `👀 <span style="color:var(--terracotta-d)">„${w.it}"</span> <span class="listen-de-hint">(${w.de})</span>`;
  const last = listenState.pos >= listenState.order.length - 1;
  $("#listenCheck").textContent = last ? "Fertig 🏁" : "Weiter ›";
}

function nextListen() { listenState.pos++; showListen(); }

function finishListen() {
  const total = listenState.order.length;
  const score = listenState.correct;
  const ratio = total ? score / total : 0;
  setProgress(100);

  if (ratio >= 0.7) completeLesson();
  award(score * 3 + (ratio === 1 ? 15 : 0), score * 2);
  checkBadges();
  if (ratio >= 0.7) { sfx.win(); burstConfetti(); }

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${ratio === 1 ? "🏆" : ratio >= 0.7 ? "🎧✨" : "💪"}</div>
      <h3>${score} / ${total} richtig gehört</h3>
      <p>${ratio === 1 ? "Perfekt diktiert! " : "Gut zugehört! "}<em>Ottimo orecchio!</em></p>
      <div class="done-actions">
        <button class="btn btn-primary" id="retryListen">↻ Nochmal</button>
        ${otherModesHtml("listen")}
        <button class="btn btn-ghost" id="listenToHome">🏠 Startseite</button>
      </div>
    </div>`;
  $("#retryListen").addEventListener("click", () => setMode("listen"));
  $("#listenToHome").addEventListener("click", goHome);
  wireOtherModes(body);
  renderHome();
}

/* =========================================================
   Gemeinsame Helfer für Satzbau / Lücke / Sprechen
   ========================================================= */
function tokenize(sentence) {
  return (sentence || "").trim().split(/\s+/).filter(Boolean);
}
function cleanToken(t) {
  return (t || "").replace(/^[¿¡"'«»(]+/, "").replace(/[.,!?;:"'»«)]+$/, "");
}
/* Ähnlichkeit zweier Phrasen über Wort-Überlappung (für Spracherkennung) */
function phraseSimilarity(a, b) {
  const wa = normalizeText(a).split(" ").filter(Boolean);
  const wb = normalizeText(b).split(" ").filter(Boolean);
  if (!wa.length || !wb.length) return 0;
  const setB = new Set(wb);
  const hit = wa.filter((w) => setB.has(w)).length;
  return hit / Math.max(wa.length, wb.length);
}

/* =========================================================
   MODUS — SATZBAU (Bausteine zusammensetzen, wenig Tippen)
   ========================================================= */
let buildState = null;

function renderBuild() {
  const { lesson } = current;
  buildState = { order: shuffle(lesson.words.map((_, i) => i)), pos: 0, correct: 0, answered: false };
  showBuild();
}

function showBuild() {
  const { lesson } = current;
  if (buildState.pos >= buildState.order.length) return finishBuild();
  buildState.answered = false;
  const w = lesson.words[buildState.order[buildState.pos]];
  const tokens = tokenize(w.ex.length ? w.ex : w.it);
  buildState.tokens = tokens;
  buildState.answer = [];
  buildState.bank = shuffle(tokens.map((t, i) => ({ t, i })));
  setProgress(Math.round((buildState.pos / buildState.order.length) * 100));

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="build-stage">
      <div class="build-cue">
        <span class="bc-label">Bau den Satz · ${buildState.pos + 1}/${buildState.order.length}</span>
        <span class="bc-de">„${w.exDe}"</span>
        <button class="speak-btn small" id="buildHear">🔊 Original hören</button>
      </div>
      <div class="build-answer" id="buildAnswer"></div>
      <div class="build-bank" id="buildBank"></div>
      <div class="build-sol" id="buildSol"></div>
      <div class="listen-actions">
        <button class="btn btn-ghost" id="buildReveal">🙈 Lösung</button>
        <button class="btn btn-primary" id="buildCheck">Prüfen ✓</button>
      </div>
    </div>`;

  $("#buildHear").addEventListener("click", (e) => speak(w.it, e.currentTarget));
  $("#buildCheck").addEventListener("click", () => checkBuild(w));
  $("#buildReveal").addEventListener("click", () => revealBuild(w));
  renderBuildRows();
}

function renderBuildRows() {
  const ans = $("#buildAnswer");
  const bank = $("#buildBank");
  if (!ans || !bank) return;
  ans.innerHTML = "";
  bank.innerHTML = "";
  const used = new Set(buildState.answer);
  buildState.answer.forEach((i) => {
    const chip = document.createElement("button");
    chip.className = "chip chip-answer";
    chip.textContent = buildState.tokens[i];
    chip.addEventListener("click", () => {
      if (buildState.answered) return;
      buildState.answer = buildState.answer.filter((x) => x !== i);
      renderBuildRows();
    });
    ans.appendChild(chip);
  });
  if (!buildState.answer.length) ans.innerHTML = `<span class="build-placeholder">Tippe die Wörter in die richtige Reihenfolge …</span>`;
  buildState.bank.forEach(({ t, i }) => {
    const chip = document.createElement("button");
    chip.className = "chip chip-bank" + (used.has(i) ? " used" : "");
    chip.textContent = t;
    chip.disabled = used.has(i);
    chip.addEventListener("click", () => {
      if (buildState.answered || used.has(i)) return;
      buildState.answer.push(i);
      renderBuildRows();
    });
    bank.appendChild(chip);
  });
}

function checkBuild(w) {
  if (buildState.answered) { buildState.pos++; showBuild(); return; }
  if (!buildState.answer.length) return;
  const assembled = buildState.answer.map((i) => buildState.tokens[i]).join(" ");
  const ok = normalizeText(assembled) === normalizeText(w.ex);
  buildState.answered = true;
  const sol = $("#buildSol");
  if (ok) {
    sol.innerHTML = `✅ <span style="color:var(--olive)">Esatto! „${w.ex}"</span>`;
    buildState.correct++;
    award(6, 2); sfx.correct();
  } else {
    sol.innerHTML = `❌ Richtig: <span style="color:var(--terracotta-d)">„${w.ex}"</span>`;
    sfx.wrong();
  }
  speak(w.it);
  const last = buildState.pos >= buildState.order.length - 1;
  $("#buildCheck").textContent = last ? "Fertig 🏁" : "Weiter ›";
  $$("#buildAnswer .chip, #buildBank .chip").forEach((c) => (c.disabled = true));
}

function revealBuild(w) {
  if (buildState.answered) return;
  buildState.answered = true;
  buildState.answer = buildState.tokens.map((_, i) => i);
  renderBuildRows();
  $("#buildSol").innerHTML = `👀 <span style="color:var(--terracotta-d)">„${w.ex}"</span>`;
  speak(w.it);
  $$("#buildAnswer .chip, #buildBank .chip").forEach((c) => (c.disabled = true));
  const last = buildState.pos >= buildState.order.length - 1;
  $("#buildCheck").textContent = last ? "Fertig 🏁" : "Weiter ›";
}

function finishBuild() {
  const total = buildState.order.length;
  const score = buildState.correct;
  const ratio = total ? score / total : 0;
  setProgress(100);
  if (ratio >= 0.7) completeLesson();
  award(score * 2, score);
  checkBadges();
  if (ratio >= 0.7) { sfx.win(); burstConfetti(); }
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${ratio === 1 ? "🏆" : ratio >= 0.7 ? "✍️✨" : "💪"}</div>
      <h3>${score} / ${total} Sätze gebaut</h3>
      <p><em>${ratio === 1 ? "Costruttore provetto!" : "Continua a costruire!"}</em></p>
      <div class="done-actions">
        <button class="btn btn-primary" id="retryBuild">↻ Nochmal</button>
        ${otherModesHtml("build")}
        <button class="btn btn-ghost" id="buildHome">🏠 Startseite</button>
      </div>
    </div>`;
  $("#retryBuild").addEventListener("click", () => setMode("build"));
  $("#buildHome").addEventListener("click", goHome);
  wireOtherModes(body);
  renderHome();
}

/* =========================================================
   MODUS — LÜCKENTEXT (einzelnes Wort einsetzen, wenig Tippen)
   ========================================================= */
let gapState = null;

function renderGap() {
  const { lesson } = current;
  gapState = { order: shuffle(lesson.words.map((_, i) => i)), pos: 0, correct: 0, answered: false };
  showGap();
}

function pickGapTarget(tokens) {
  // längstes „inhaltliches" Wort wählen (deterministisch)
  let best = -1, bestLen = 0;
  tokens.forEach((t, i) => {
    const c = cleanToken(t);
    if (c.length >= 3 && /[a-zàèéìòù]/i.test(c) && c.length > bestLen) { bestLen = c.length; best = i; }
  });
  if (best < 0) tokens.forEach((t, i) => { if (cleanToken(t).length > bestLen) { bestLen = cleanToken(t).length; best = i; } });
  return best < 0 ? 0 : best;
}

function showGap() {
  const { lesson } = current;
  if (gapState.pos >= gapState.order.length) return finishGap();
  gapState.answered = false;
  const w = lesson.words[gapState.order[gapState.pos]];
  const tokens = tokenize(w.ex.length ? w.ex : w.it);
  if (tokens.length < 2) { gapState.pos++; return showGap(); }
  const ti = pickGapTarget(tokens);
  const target = cleanToken(tokens[ti]);
  setProgress(Math.round((gapState.pos / gapState.order.length) * 100));

  // Ablenker aus anderen Sätzen der Lektion
  const distractPool = [];
  lesson.words.forEach((x) => tokenize(x.ex).forEach((t) => {
    const c = cleanToken(t);
    if (c.length >= 3 && c.toLowerCase() !== target.toLowerCase()) distractPool.push(c);
  }));
  const distract = shuffle([...new Set(distractPool)]).slice(0, 3);
  const options = shuffle([target, ...distract]);

  const sentenceHtml = tokens.map((t, i) => i === ti
    ? `<span class="gap-blank" id="gapBlank">______</span>`
    : `<span class="gap-tok">${t}</span>`).join(" ");

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="gap-stage">
      <div class="gap-cue">
        <span class="bc-label">Setz das richtige Wort ein · ${gapState.pos + 1}/${gapState.order.length}</span>
        <button class="speak-btn small" id="gapHear">🔊 Satz hören</button>
      </div>
      <div class="gap-sentence">${sentenceHtml}</div>
      <div class="gap-de">„${w.exDe}"</div>
      <div class="gap-options" id="gapOptions"></div>
      <div class="build-sol" id="gapSol"></div>
    </div>`;
  $("#gapHear").addEventListener("click", (e) => speak(w.it, e.currentTarget));
  const optWrap = $("#gapOptions");
  options.forEach((opt) => {
    const b = document.createElement("button");
    b.className = "gap-opt";
    b.textContent = opt;
    b.addEventListener("click", () => answerGap(b, opt, target, tokens, ti, w));
    optWrap.appendChild(b);
  });
}

function answerGap(btn, opt, target, tokens, ti, w) {
  if (gapState.answered) return;
  gapState.answered = true;
  const ok = normalizeText(opt) === normalizeText(target);
  const blank = $("#gapBlank");
  $$(".gap-opt").forEach((b) => {
    b.disabled = true;
    if (normalizeText(b.textContent) === normalizeText(target)) b.classList.add("correct");
  });
  const sol = $("#gapSol");
  if (ok) {
    btn.classList.add("correct");
    if (blank) { blank.textContent = tokens[ti]; blank.classList.add("filled"); }
    sol.innerHTML = `✅ <span style="color:var(--olive)">Perfetto! ${w.de}</span>`;
    gapState.correct++;
    award(5, 1); sfx.correct();
  } else {
    btn.classList.add("wrong");
    if (blank) { blank.textContent = tokens[ti]; blank.classList.add("filled"); }
    sol.innerHTML = `❌ Richtig: <span style="color:var(--terracotta-d)">${target}</span>`;
    sfx.wrong();
  }
  speak(w.it);
  setTimeout(() => { gapState.pos++; showGap(); }, 1250);
}

function finishGap() {
  const total = gapState.order.length;
  const score = gapState.correct;
  const ratio = total ? score / total : 0;
  setProgress(100);
  if (ratio >= 0.7) completeLesson();
  award(score * 2, score);
  checkBadges();
  if (ratio >= 0.7) { sfx.win(); burstConfetti(); }
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${ratio === 1 ? "🏆" : ratio >= 0.7 ? "✏️✨" : "💪"}</div>
      <h3>${score} / ${total} Lücken gefüllt</h3>
      <p><em>${ratio === 1 ? "Senza errori!" : "Quasi perfetto!"}</em></p>
      <div class="done-actions">
        <button class="btn btn-primary" id="retryGap">↻ Nochmal</button>
        ${otherModesHtml("gap")}
        <button class="btn btn-ghost" id="gapHome">🏠 Startseite</button>
      </div>
    </div>`;
  $("#retryGap").addEventListener("click", () => setMode("gap"));
  $("#gapHome").addEventListener("click", goHome);
  wireOtherModes(body);
  renderHome();
}

/* =========================================================
   MODUS — SPRECHEN (Mikrofon, Erkennung auf ITALIENISCH it-IT)
   ========================================================= */
let speakState = null;

function renderSpeak() {
  const { lesson } = current;
  speakState = { order: shuffle(lesson.words.map((_, i) => i)), pos: 0, correct: 0, done: false };
  showSpeak();
}

function showSpeak() {
  const { lesson } = current;
  if (speakState.pos >= speakState.order.length) return finishSpeak();
  speakState.done = false;
  const w = lesson.words[speakState.order[speakState.pos]];
  setProgress(Math.round((speakState.pos / speakState.order.length) * 100));

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="speak-stage">
      <div class="speak-cue">
        <span class="bc-label">Sprich auf Italienisch 🇮🇹 · ${speakState.pos + 1}/${speakState.order.length}</span>
        <div class="speak-target">${w.it}</div>
        <div class="speak-de">${w.de}</div>
        <button class="speak-btn small" id="speakHear">🔊 Vormachen</button>
      </div>
      <button class="mic-btn" id="micBtn" title="Zum Sprechen tippen">🎤</button>
      <div class="speak-status" id="speakStatus">Tippe das Mikrofon und sprich den Satz.</div>
      <div class="speak-heard" id="speakHeard"></div>
      <div class="listen-actions">
        <button class="btn btn-ghost" id="speakSelf">👍 Hat geklappt</button>
        <button class="btn btn-primary" id="speakNext">Weiter ›</button>
      </div>
    </div>`;

  $("#speakHear").addEventListener("click", (e) => speak(w.it, e.currentTarget));
  $("#speakSelf").addEventListener("click", () => markSpeak(true, w, "Selbst bewertet 👍"));
  $("#speakNext").addEventListener("click", () => { speakState.pos++; showSpeak(); });
  $("#micBtn").addEventListener("click", () => doSpeakRecognition(w));

  if (!speechRecAvailable) {
    $("#speakStatus").innerHTML = "🎤 Spracherkennung wird hier nicht unterstützt – sprich laut mit und bewerte dich selbst.";
  }
  setTimeout(() => speak(w.it, $("#speakHear")), 250);
}

function doSpeakRecognition(w) {
  const mic = $("#micBtn");
  const status = $("#speakStatus");
  const heard = $("#speakHeard");
  if (!speechRecAvailable) {
    status.innerHTML = "🎤 Keine Spracherkennung – nutze „Hat geklappt“, wenn du es gesagt hast.";
    return;
  }
  mic.classList.add("listening");
  status.textContent = "🎙️ Ich höre zu … sprich jetzt!";
  heard.textContent = "";
  startRecognition({
    onResult: (alts) => {
      const best = alts && alts[0] ? alts[0] : "";
      heard.innerHTML = `Gehört: <em>„${best}"</em>`;
      const score = Math.max(...alts.map((a) => phraseSimilarity(a, w.it)), 0);
      if (score >= 0.6 || alts.some((a) => normalizeText(a) === normalizeText(w.it))) {
        markSpeak(true, w, "Ottima pronuncia! 🎉");
      } else {
        status.innerHTML = `Fast! Ich habe etwas anderes verstanden. <b>Nochmal?</b>`;
        sfx.wrong();
      }
    },
    onError: (code) => {
      mic.classList.remove("listening");
      if (code === "not-allowed" || code === "service-not-allowed") {
        status.innerHTML = "🚫 Mikrofon-Zugriff verweigert. Erlaube das Mikrofon oder nutze „Hat geklappt“.";
      } else if (code === "no-speech") {
        status.textContent = "🤫 Nichts gehört – tippe nochmal und sprich lauter.";
      } else if (code === "unsupported") {
        status.textContent = "🎤 Spracherkennung hier nicht verfügbar.";
      } else {
        status.textContent = "Hoppla, nochmal versuchen.";
      }
    },
    onEnd: () => { mic.classList.remove("listening"); }
  });
}

function markSpeak(ok, w, msg) {
  if (speakState.done) return;
  stopRecognition();
  $("#micBtn").classList.remove("listening");
  if (ok) {
    speakState.done = true;
    speakState.correct++;
    $("#speakStatus").innerHTML = `✅ <span style="color:var(--olive)">${msg}</span>`;
    award(7, 2);
    grantBadge("oratore");
    sfx.correct();
    const last = speakState.pos >= speakState.order.length - 1;
    $("#speakNext").textContent = last ? "Fertig 🏁" : "Weiter ›";
  }
}

function finishSpeak() {
  const total = speakState.order.length;
  const score = speakState.correct;
  const ratio = total ? score / total : 0;
  setProgress(100);
  if (ratio >= 0.6) completeLesson();
  award(score * 2, score);
  checkBadges();
  if (ratio >= 0.6) { sfx.win(); burstConfetti(); }
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${ratio >= 0.99 ? "🏆" : ratio >= 0.6 ? "🎤✨" : "💪"}</div>
      <h3>${score} / ${total} ausgesprochen</h3>
      <p><em>${ratio >= 0.6 ? "Che bella pronuncia!" : "L'esercizio rende perfetti!"}</em></p>
      <div class="done-actions">
        <button class="btn btn-primary" id="retrySpeak">↻ Nochmal</button>
        ${otherModesHtml("speak")}
        <button class="btn btn-ghost" id="speakHome">🏠 Startseite</button>
      </div>
    </div>`;
  $("#retrySpeak").addEventListener("click", () => setMode("speak"));
  $("#speakHome").addEventListener("click", goHome);
  wireOtherModes(body);
  renderHome();
}

/* =========================================================
   MODUS — DIALOG (ganzer Dialog, Antwort aus Bausteinen wählen)
   ========================================================= */
let dialogState = null;

function renderDialogue() {
  const { lesson } = current;
  dialogState = { lines: lesson.lines, pos: 0, mistakes: 0 };
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="dialogue-stage">
      ${lesson.scene ? `<div class="dlg-scene">🎬 ${lesson.scene}</div>` : ""}
      <div class="dlg-thread" id="dlgThread"></div>
      <div class="dlg-choices" id="dlgChoices"></div>
    </div>`;
  advanceDialogue();
}

function addBubble(line) {
  const thread = $("#dlgThread");
  const mine = line.who === "U";
  const row = document.createElement("div");
  row.className = "dlg-bubble " + (mine ? "mine" : "theirs");
  row.innerHTML = `
    ${!mine && line.name ? `<span class="dlg-name">${line.name}</span>` : ""}
    <span class="dlg-text">${line.it}</span>
    <span class="dlg-tr">${line.de}</span>
    <button class="dlg-speak" title="Anhören">🔊</button>`;
  row.querySelector(".dlg-speak").addEventListener("click", () => speak(line.it, row.querySelector(".dlg-speak")));
  thread.appendChild(row);
  row.scrollIntoView({ behavior: "smooth", block: "end" });
  return row;
}

function advanceDialogue() {
  const choices = $("#dlgChoices");
  choices.innerHTML = "";
  // Partner-Zeilen anzeigen bis zur nächsten Nutzer-Zeile
  while (dialogState.pos < dialogState.lines.length && dialogState.lines[dialogState.pos].who === "P") {
    const line = dialogState.lines[dialogState.pos];
    addBubble(line);
    speak(line.it);
    dialogState.pos++;
  }
  if (dialogState.pos >= dialogState.lines.length) return finishDialogue();

  // Nutzer-Zeile: Auswahl aus Bausteinen
  const line = dialogState.lines[dialogState.pos];
  const distract = shuffle(DIALOG_USER_LINES.filter((t) => t !== line.it)).slice(0, 2);
  const options = shuffle([line.it, ...distract]);
  choices.innerHTML = `<div class="dlg-prompt">👉 Wie antwortest du?</div>`;
  options.forEach((opt) => {
    const b = document.createElement("button");
    b.className = "dlg-choice";
    b.textContent = opt;
    b.addEventListener("click", () => pickDialogue(b, opt, line));
    choices.appendChild(b);
  });
}

function pickDialogue(btn, opt, line) {
  if (opt === line.it) {
    sfx.correct();
    addBubble(line);
    speak(line.it);
    dialogState.pos++;
    award(4, 1);
    advanceDialogue();
  } else {
    sfx.wrong();
    dialogState.mistakes++;
    btn.classList.add("shake", "wrong");
    btn.disabled = true;
    setTimeout(() => btn.classList.remove("shake"), 420);
  }
}

function finishDialogue() {
  $("#dlgChoices").innerHTML = "";
  completeLesson(3);
  grantBadge("attore");
  award(15, 8);
  checkBadges();
  burstConfetti(); sfx.win();
  const body = $("#lessonBody");
  const done = document.createElement("div");
  done.className = "done-screen";
  done.innerHTML = `
    <div class="done-emoji">🎭✨</div>
    <h3>Dialogo completato!</h3>
    <p><em>${dialogState.mistakes === 0 ? "Senza esitazioni — bravissimo!" : "Ben fatto, hai tenuto botta!"}</em></p>
    <div class="done-actions">
      <button class="btn btn-primary" id="retryDlg">↻ Nochmal</button>
      ${otherModesHtml("dialogue")}
      <button class="btn btn-ghost" id="dlgHome">🏠 Startseite</button>
    </div>`;
  body.appendChild(done);
  $("#retryDlg").addEventListener("click", () => setMode("dialogue"));
  $("#dlgHome").addEventListener("click", goHome);
  wireOtherModes(done);
  renderHome();
}

/* =========================================================
   STORY / PERCORSO (steigende Schwierigkeit) + Abzeichen
   ========================================================= */
const DIALOG_USER_LINES = (() => {
  const out = [];
  LESSONS.forEach((l) => { if (l.kind === "dialogue") l.lines.forEach((ln) => { if (ln.who === "U") out.push(ln.it); }); });
  return out;
})();

function startStory() {
  const pos = Math.min(state.storyPos || 0, STORY.length - 1);
  const id = STORY[pos];
  if (id) openLesson(id);
}

/* Erste Story-Etappe einer Stufe (-1 falls Stufe nicht vorkommt) */
function storyStartIndexForLevel(levelN) {
  return STORY.findIndex((id) => lessonById[id] && lessonById[id].level === levelN);
}

/* Story-Startpunkt auf den Beginn der gewählten Stufe setzen
   (für Fortgeschrittene, die nicht bei A1 anfangen wollen) */
function setStoryStartLevel(levelN) {
  const idx = storyStartIndexForLevel(levelN);
  if (idx < 0) return;
  state.storyPos = idx;
  saveState();
  renderStoryPanel();
  const L = LEVELS.find((x) => x.n === levelN);
  if (L) toast(`🗺️ Story beginnt jetzt bei ${L.emoji} ${L.code} – ${L.de}`);
}

function advanceStoryIfMatch(lessonId) {
  const pos = state.storyPos || 0;
  if (STORY[pos] === lessonId) {
    state.storyPos = Math.min(pos + 1, STORY.length);
    state.storyDone = (state.storyDone || 0) + 1;
    if (state.storyDone >= 10) grantBadge("narratore");
    saveState();
    toast(`🗺️ Story-Etappe ${state.storyDone} geschafft! Es wird schwieriger …`);
  }
}

function grantBadge(id) {
  if (state.badges.includes(id)) return;
  state.badges.push(id);
  const b = BADGES.find((x) => x.id === id);
  if (b) { toast(`${b.emoji} Abzeichen: ${b.name}!`); burstConfetti(); }
  saveState();
}

/* =========================================================
   KONJUGATIONEN — Tabelle & Übung
   ========================================================= */
let currentConj = { verb: null, tense: "presente", cmode: "table" };
let conjPractice = null;

function openConj(id) {
  const verb = CONJUGATIONS.find((v) => v.id === id);
  if (!verb) return;
  touchStreak();
  currentConj = { verb, tense: "presente", cmode: "table" };

  $("#viewHome").classList.add("hidden");
  $("#viewLesson").classList.add("hidden");
  $("#viewConj").classList.remove("hidden");
  $("#conjEmoji").textContent = verb.emoji;
  $("#conjTitle").textContent = verb.inf;
  $("#conjInfDe").textContent = verb.infDe;
  $$("#conjModeTabs .mode-tab").forEach((t) => t.classList.toggle("active", t.dataset.cmode === "table"));
  window.scrollTo({ top: 0, behavior: "smooth" });

  renderTenseTabs();
  renderConjMode();
}

function renderTenseTabs() {
  const wrap = $("#tenseTabs");
  wrap.innerHTML = "";
  CONJ_TENSES.forEach((t) => {
    const b = document.createElement("button");
    b.className = "tense-tab" + (t.id === currentConj.tense ? " active" : "");
    b.innerHTML = `${t.it}<small>${t.de}</small>`;
    b.addEventListener("click", () => { currentConj.tense = t.id; renderTenseTabs(); renderConjMode(); });
    wrap.appendChild(b);
  });
}

function setConjMode(cmode) {
  currentConj.cmode = cmode;
  $$("#conjModeTabs .mode-tab").forEach((t) => t.classList.toggle("active", t.dataset.cmode === cmode));
  renderConjMode();
}

function renderConjMode() {
  if (currentConj.cmode === "table") renderConjTable();
  else renderConjPractice();
}

function renderConjTable() {
  const { verb, tense } = currentConj;
  const forms = verb.forms[tense];
  const formsDe = verb.formsDe[tense];
  $("#conjProgress").style.width = "100%";

  const body = $("#conjBody");
  const rows = CONJ_PRONOUNS.map((pron, i) => `
    <div class="conj-row">
      <span class="cr-pron">${pron}</span>
      <span class="cr-form">${forms[i]}</span>
      <button class="cr-speak" data-i="${i}" title="Anhören">🔊</button>
      <span class="cr-de">${formsDe[i]}</span>
    </div>`).join("");

  body.innerHTML = `
    <div class="conj-table">
      ${rows}
    </div>
    <div class="conj-table-foot">
      <button class="btn btn-ghost" id="speakAll">🔊 Ganze Reihe anhören</button>
      <button class="btn btn-primary" id="toPractice">✍️ Diese Zeit üben</button>
    </div>`;

  $$("#conjBody .cr-speak").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const i = +e.currentTarget.dataset.i;
      speak(`${CONJ_PRONOUNS[i]} ${forms[i]}`, e.currentTarget);
    });
  });
  $("#speakAll").addEventListener("click", () => {
    // nacheinander aussprechen
    forms.forEach((f, i) => setTimeout(() => speak(`${CONJ_PRONOUNS[i]} ${f}`), i * 1100));
  });
  $("#toPractice").addEventListener("click", () => setConjMode("practice"));
}

function renderConjPractice() {
  const { verb, tense } = currentConj;
  conjPractice = { order: shuffle(CONJ_PRONOUNS.map((_, i) => i)), pos: 0, correct: 0, answered: false };
  showConjQuestion();
}

function showConjQuestion() {
  const { verb, tense } = currentConj;
  if (conjPractice.pos >= conjPractice.order.length) return finishConjPractice();
  conjPractice.answered = false;
  const i = conjPractice.order[conjPractice.pos];
  const tenseObj = CONJ_TENSES.find((t) => t.id === tense);
  $("#conjProgress").style.width = Math.round((conjPractice.pos / conjPractice.order.length) * 100) + "%";

  const body = $("#conjBody");
  body.innerHTML = `
    <div class="conj-practice">
      <div class="conj-prompt">
        <span class="cp-label">${tenseObj.it} · ${tenseObj.de} · ${conjPractice.pos + 1}/${conjPractice.order.length}</span>
        <div class="cp-cue"><b>${CONJ_PRONOUNS[i]}</b> … (${verb.inf})</div>
        <div class="cp-hint">${verb.infDe} — ${CONJ_PRONOUNS_DE[i]} …</div>
        <input type="text" class="conj-input" id="conjInput"
               placeholder="Verbform eingeben" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" />
        <div class="conj-solution" id="conjSolution"></div>
      </div>
      <div class="listen-actions">
        <button class="btn btn-ghost" id="conjReveal">🙈 Lösung</button>
        <button class="btn btn-primary" id="conjCheck">Prüfen ✓</button>
      </div>
    </div>`;

  const inp = $("#conjInput");
  inp.addEventListener("keydown", (e) => { if (e.key === "Enter") checkConj(); });
  inp.focus();
  $("#conjCheck").addEventListener("click", checkConj);
  $("#conjReveal").addEventListener("click", revealConj);
}

function currentConjForm() {
  const i = conjPractice.order[conjPractice.pos];
  return currentConj.verb.forms[currentConj.tense][i];
}

function checkConj() {
  if (conjPractice.answered) { conjPractice.pos++; showConjQuestion(); return; }
  const inp = $("#conjInput");
  if (!inp.value.trim()) { inp.focus(); return; }

  const correct = currentConjForm();
  const ok = normalizeText(inp.value) === normalizeText(correct);
  conjPractice.answered = true;
  inp.disabled = true;
  inp.classList.add(ok ? "correct" : "wrong");
  const sol = $("#conjSolution");
  if (ok) {
    sol.innerHTML = `✅ <span style="color:var(--olive)">Esatto! ${correct}</span>`;
    conjPractice.correct++;
    award(6, 2);
    sfx.correct();
  } else {
    sol.innerHTML = `❌ Richtig: <span style="color:var(--terracotta-d)">${correct}</span>`;
    sfx.wrong();
  }
  speak(correct);
  const last = conjPractice.pos >= conjPractice.order.length - 1;
  $("#conjCheck").textContent = last ? "Fertig 🏁" : "Weiter ›";
}

function revealConj() {
  if (conjPractice.answered) return;
  conjPractice.answered = true;
  const correct = currentConjForm();
  const inp = $("#conjInput");
  inp.value = correct; inp.disabled = true;
  $("#conjSolution").innerHTML = `👀 <span style="color:var(--terracotta-d)">${correct}</span>`;
  speak(correct);
  const last = conjPractice.pos >= conjPractice.order.length - 1;
  $("#conjCheck").textContent = last ? "Fertig 🏁" : "Weiter ›";
}

function finishConjPractice() {
  const { verb, tense } = currentConj;
  const total = conjPractice.order.length;
  const score = conjPractice.correct;
  const tenseObj = CONJ_TENSES.find((t) => t.id === tense);
  $("#conjProgress").style.width = "100%";
  if (score === total) { award(15, 10); sfx.win(); burstConfetti(); }
  checkBadges();

  const body = $("#conjBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${score === total ? "🏆" : "💪"}</div>
      <h3>${score} / ${total} richtig</h3>
      <p>${verb.inf} · ${tenseObj.it} — <em>${score === total ? "Perfetto!" : "Übung macht den Meister!"}</em></p>
      <div class="done-actions">
        <button class="btn btn-primary" id="conjRetry">↻ Nochmal</button>
        <button class="btn btn-ghost" id="conjToTable">📋 Tabelle</button>
        <button class="btn btn-ghost" id="conjHome">🏠 Startseite</button>
      </div>
    </div>`;
  $("#conjRetry").addEventListener("click", () => setConjMode("practice"));
  $("#conjToTable").addEventListener("click", () => setConjMode("table"));
  $("#conjHome").addEventListener("click", goHome);
  renderStats();
}

/* =========================================================
   EINSTELLUNGEN
   ========================================================= */
function populateVoiceSelect() {
  const sel = $("#voiceSelect");
  if (!sel) return;
  const itVoices = voices.filter((v) => (v.lang || "").toLowerCase().startsWith("it"));
  const list = itVoices.length ? itVoices : voices;
  sel.innerHTML = "";

  if (!list.length) {
    sel.innerHTML = `<option>Keine Stimmen gefunden</option>`;
    $("#voiceHint").textContent = "Dein Gerät bietet keine Sprachstimmen. Auf Smartphones meist vorhanden.";
    return;
  }
  list.forEach((v) => {
    const o = document.createElement("option");
    o.value = v.voiceURI;
    o.textContent = `${v.name} (${v.lang})`;
    if (itVoice && v.voiceURI === itVoice.voiceURI) o.selected = true;
    sel.appendChild(o);
  });
  $("#voiceHint").textContent = itVoices.length
    ? `${itVoices.length} italienische Stimme(n) verfügbar 🇮🇹`
    : "Keine italienische Stimme installiert – wähle die beste verfügbare.";
}

function openSettings() { $("#settingsModal").classList.remove("hidden"); populateVoiceSelect(); }
function closeSettings() { $("#settingsModal").classList.add("hidden"); }

/* =========================================================
   KONFETTI
   ========================================================= */
const confCanvas = $("#confetti");
const cctx = confCanvas.getContext("2d");
let confetti = [];
let confRunning = false;

function sizeCanvas() { confCanvas.width = innerWidth; confCanvas.height = innerHeight; }
sizeCanvas();
addEventListener("resize", sizeCanvas);

function burstConfetti() {
  const colors = ["#c75b39", "#2e7d6f", "#d4922a", "#1f8a4c", "#cd2b2b", "#e7b450"];
  for (let i = 0; i < 90; i++) {
    confetti.push({
      x: innerWidth / 2 + (Math.random() - 0.5) * 220,
      y: innerHeight / 3,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -11 - 4,
      g: 0.32 + Math.random() * 0.12,
      size: 6 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 120
    });
  }
  if (!confRunning) { confRunning = true; requestAnimationFrame(stepConfetti); }
}

function stepConfetti() {
  cctx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  confetti.forEach((p) => {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot);
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    cctx.restore();
  });
  confetti = confetti.filter((p) => p.life > 0 && p.y < confCanvas.height + 40);
  if (confetti.length) requestAnimationFrame(stepConfetti);
  else { cctx.clearRect(0, 0, confCanvas.width, confCanvas.height); confRunning = false; }
}

/* =========================================================
   TOAST
   ========================================================= */
let toastTimer = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* =========================================================
   "WEITERLERNEN" / ZUFALL
   ========================================================= */
function continueLesson() {
  // erste nicht abgeschlossene Lektion, sonst erste
  const next = LESSONS.find((l) => !(state.lessons[l.id] && state.lessons[l.id].completed)) || LESSONS[0];
  openLesson(next.id);
}

/* Zufalls-Lektion mit Schwierigkeitswahl */
function openLevelModal() {
  const pick = $("#levelPick");
  pick.innerHTML = "";
  const opts = [{ code: "all", emoji: "🌈", code2: "Tutti", de: "Egal" }]
    .concat(LEVELS.map((l) => ({ code: l.code, emoji: l.emoji, code2: l.code, de: l.de, color: l.color })));
  opts.forEach((o) => {
    const b = document.createElement("button");
    b.className = "level-pick-btn";
    if (o.color) b.style.setProperty("--lv", o.color);
    b.innerHTML = `<span class="lp-emoji">${o.emoji}</span><span class="lp-code">${o.code2}</span><span class="lp-de">${o.de}</span>`;
    b.addEventListener("click", () => { closeLevelModal(); randomLessonOfLevel(o.code); });
    pick.appendChild(b);
  });
  $("#levelModal").classList.remove("hidden");
}
function closeLevelModal() { $("#levelModal").classList.add("hidden"); }
function randomLessonOfLevel(code) {
  const pool = code === "all" ? LESSONS : LESSONS.filter((l) => l.levelCode === code);
  if (!pool.length) return;
  openLesson(pool[Math.floor(Math.random() * pool.length)].id);
}

/* =========================================================
   EVENTS
   ========================================================= */
$("#brandBtn").addEventListener("click", goHome);
$("#backBtn").addEventListener("click", goHome);
$("#conjBack").addEventListener("click", goHome);
$$("#conjModeTabs .mode-tab").forEach((t) => t.addEventListener("click", () => setConjMode(t.dataset.cmode)));
$("#storyBtn").addEventListener("click", startStory);
$("#continueBtn").addEventListener("click", continueLesson);
$("#randomBtn").addEventListener("click", openLevelModal);
$("#levelModalClose").addEventListener("click", closeLevelModal);
$("#levelModal").addEventListener("click", (e) => { if (e.target.id === "levelModal") closeLevelModal(); });

$("#themeBtn").addEventListener("click", toggleTheme);
$("#soundToggle").addEventListener("change", (e) => {
  state.settings.sound = e.target.checked;
  saveState();
  if (e.target.checked) sfx.click();
});

$("#settingsBtn").addEventListener("click", openSettings);
$("#settingsClose").addEventListener("click", closeSettings);
$("#settingsModal").addEventListener("click", (e) => { if (e.target.id === "settingsModal") closeSettings(); });

$("#voiceSelect").addEventListener("change", (e) => {
  state.settings.voiceURI = e.target.value;
  const v = voices.find((x) => x.voiceURI === e.target.value);
  if (v) itVoice = v;
  saveState();
  speak("Ciao! Buongiorno!");
});

$("#rateRange").addEventListener("input", (e) => {
  state.settings.rate = parseFloat(e.target.value);
  $("#rateVal").textContent = state.settings.rate.toFixed(2) + "×";
  saveState();
});

$("#testVoice").addEventListener("click", (e) => speak("Buongiorno! Andiamo a imparare l'italiano!", e.currentTarget));

$("#resetBtn").addEventListener("click", () => {
  if (confirm("Wirklich den gesamten Fortschritt löschen?")) {
    const keepSettings = state.settings;
    state = defaultState();
    state.settings = keepSettings;
    saveState();
    closeSettings();
    renderStats();
    goHome();
    toast("🗑️ Fortschritt zurückgesetzt");
  }
});

// Tastatur: Pfeile im Lernmodus, Leertaste = umdrehen/anhören
document.addEventListener("keydown", (e) => {
  if ($("#viewLesson").classList.contains("hidden")) return;
  if (current.mode !== "learn") return;
  if (e.key === "ArrowRight") { $("#nextBtn") && $("#nextBtn").click(); }
  else if (e.key === "ArrowLeft") { $("#prevBtn") && $("#prevBtn").click(); }
  else if (e.key === " ") { e.preventDefault(); const c = $("#flashcard"); c && c.classList.toggle("flipped"); }
  else if (e.key.toLowerCase() === "s") { $("#speakBtn") && $("#speakBtn").click(); }
});

/* =========================================================
   INIT
   ========================================================= */
$("#rateRange").value = state.settings.rate;
$("#rateVal").textContent = (state.settings.rate || 0.95).toFixed(2) + "×";
$("#soundToggle").checked = state.settings.sound !== false;
applyTheme();
renderStats();
renderHome();
