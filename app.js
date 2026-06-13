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
  settings: { voiceURI: null, rate: 0.95 }
});

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
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
   RENDER: Startseite (Lektions-Karten)
   ========================================================= */
function renderHome() {
  const grid = $("#lessonGrid");
  grid.innerHTML = "";
  LESSONS.forEach((lesson) => {
    const prog = state.lessons[lesson.id] || { stars: 0, completed: false, learned: [] };
    const learnedCount = (prog.learned || []).length;
    const pct = Math.round((learnedCount / lesson.words.length) * 100);
    const stars = "★".repeat(prog.stars) + "☆".repeat(3 - prog.stars);

    const card = document.createElement("button");
    card.className = "lesson-card";
    card.style.setProperty("--card-color", lesson.color);
    card.innerHTML = `
      ${prog.completed ? `<span class="lc-stamp">✓ Fatto</span>` : ""}
      <span class="lc-emoji">${lesson.emoji}</span>
      <span class="lc-title">${lesson.title}</span>
      <span class="lc-de">${lesson.de}</span>
      <div class="lc-progress"><i style="width:${pct}%"></i></div>
      <div class="lc-foot">
        <span class="lc-stars" style="color:${lesson.color}">${stars}</span>
        <span class="lc-count">${learnedCount}/${lesson.words.length} 📖</span>
      </div>`;
    card.addEventListener("click", () => openLesson(lesson.id));
    grid.appendChild(card);
  });
  renderBadges();
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
  const grant = (id) => {
    if (!state.badges.includes(id)) {
      state.badges.push(id);
      const b = BADGES.find((x) => x.id === id);
      if (b) { toast(`${b.emoji} Abzeichen: ${b.name}!`); burstConfetti(); }
    }
  };
  const completed = Object.values(state.lessons).filter((l) => l.completed).length;
  const totalLearned = Object.values(state.lessons).reduce((s, l) => s + (l.learned ? l.learned.length : 0), 0);
  const maxStars = Math.max(0, ...Object.values(state.lessons).map((l) => l.stars || 0));

  if (completed >= 1) grant("primo");
  if (completed >= 5) grant("studioso");
  if (completed >= LESSONS.length) grant("maestro");
  if (state.streak >= 3) grant("fiamma");
  if (maxStars >= 3) grant("stelle");
  if (state.coins >= 200) grant("ricco");
  if (totalLearned >= 100) grant("poliglotta");
  saveState();
}

/* =========================================================
   LEKTION ÖFFNEN
   ========================================================= */
let current = { lesson: null, mode: "learn", index: 0 };

function openLesson(id) {
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) return;
  touchStreak();
  current = { lesson, mode: "learn", index: 0 };
  if (!state.lessons[id]) state.lessons[id] = { stars: 0, completed: false, learned: [] };
  saveState();

  $("#viewHome").classList.add("hidden");
  $("#viewLesson").classList.remove("hidden");
  $("#lessonEmoji").textContent = lesson.emoji;
  $("#lessonTitle").textContent = lesson.title;
  $$(".mode-tab").forEach((t) => t.classList.toggle("active", t.dataset.mode === "learn"));
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderMode();
}

function goHome() {
  speechSynthesis && speechSynthesis.cancel();
  $("#viewLesson").classList.add("hidden");
  $("#viewHome").classList.remove("hidden");
  renderStats();
  renderHome();
}

function setMode(mode) {
  current.mode = mode;
  current.index = 0;
  $$(".mode-tab").forEach((t) => t.classList.toggle("active", t.dataset.mode === mode));
  renderMode();
}

function renderMode() {
  if (current.mode === "learn") renderLearn();
  else if (current.mode === "quiz") renderQuiz();
  else if (current.mode === "match") renderMatch();
}

function setProgress(pct) { $("#lessonProgress").style.width = pct + "%"; }

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
      <div class="flashcard" id="flashcard">
        <div class="flash-inner">
          <div class="flash-face front">
            <span class="flash-emoji">${w.emoji}</span>
            <div class="flash-word">${w.it}</div>
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
        <span class="quiz-word">${w.it}</span>
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
  } else {
    btn.classList.add("wrong");
    fb.textContent = `Quasi! Richtig: „${w.de}"`;
    fb.style.color = "var(--red-it)";
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
  if (pct >= 0.7) p.completed = true;
  saveState();

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

  if (stars >= 2) burstConfetti();
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
    setProgress(Math.round((matchState.done / matchState.total) * 100));
    if (matchState.done === matchState.total) finishMatch();
  } else {
    const a = sel.el, b = el;
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
function randomLesson() { openLesson(LESSONS[Math.floor(Math.random() * LESSONS.length)].id); }

/* =========================================================
   EVENTS
   ========================================================= */
$("#brandBtn").addEventListener("click", goHome);
$("#backBtn").addEventListener("click", goHome);
$("#continueBtn").addEventListener("click", continueLesson);
$("#randomBtn").addEventListener("click", randomLesson);

$$(".mode-tab").forEach((t) => t.addEventListener("click", () => setMode(t.dataset.mode)));

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
renderStats();
renderHome();
