/* =========================================================
   Impariamo! — Qualitätssicherung (headless Integrationstests)
   Lädt index.html + data.js + app.js in jsdom, simuliert echte
   Klicks/Eingaben und prüft Verhalten. Läuft mit:  npm test
   ========================================================= */
import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(ROOT, f), "utf8");

// Skript-Reihenfolge genau wie in index.html (eine Quelle, keine zweite Liste)
const APP_SCRIPTS = [...read("index.html").matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
// Alles bis einschließlich data.js: der Lektions-Generator braucht grammatik.js/glossar.js beim Laden
const DATA_SOURCE = APP_SCRIPTS.slice(0, APP_SCRIPTS.indexOf("data.js") + 1).map(read).join("\n;\n");

// Daten direkt verfügbar machen (data.js ist kein Modul)
const DATA = new Function(DATA_SOURCE +
  "\n;return {LESSONS,STORY,LEVELS,CORPUS,DIALOGHI,BADGES,CONJUGATIONS,CONJ_TENSES,CONJ_PRONOUNS};")();
const { LESSONS, STORY, LEVELS, CORPUS, CONJUGATIONS, CONJ_TENSES, CONJ_PRONOUNS } = DATA;

// Kurs-Probe: selectCourse aufrufen und die LIVE-Werte im selben Scope lesen
const courseProbe = new Function(DATA_SOURCE +
  "\n;return (lang) => { selectCourse(lang); return {" +
  "  lang: LANG_ACTIVE, lessons: LESSONS.length, firstId: STORY[0]," +
  "  conjInf: CONJUGATIONS[0].inf, tense0: CONJ_TENSES[0].it, pron0: CONJ_PRONOUNS[0]," +
  "  badge0: BADGES[0].name, vocabTitle: LESSONS.find(l=>l.kind==='vocab').title," +
  "  perLevel: LESSONS.reduce((m,l)=>((m[l.levelCode]=(m[l.levelCode]||0)+1),m),{})," +
  // Kern-Umfang: ohne Zusatz-Etappen (Zeitentrainer, Gesten), die nur Kurse mit passenden Daten haben
  "  core: LESSONS.filter(l=>!l.spread).length" +
  "}; };")();

// Glossar-Probe: Wörterbuch eines Kurses ohne DOM bauen
const glossaryProbe = new Function(DATA_SOURCE +
  "\n;return (lang) => { selectCourse(lang); return { glossary: glossaryForActiveCourse(), lessons: LESSONS }; };")();

/* ---------- App in jsdom hochfahren ---------- */
function makeApp() {
  const dom = new JSDOM(read("index.html"), {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    url: "https://localhost/"
  });
  const { window } = dom;
  const doc = window.document;

  // --- Browser-APIs stubben, die jsdom nicht hat ---
  window.scrollTo = () => {};
  window.confirm = () => true;
  window.requestAnimationFrame = () => 0;   // Konfetti-Loop ruhigstellen
  window.cancelAnimationFrame = () => {};
  if (!window.Element.prototype.scrollIntoView) window.Element.prototype.scrollIntoView = () => {};
  window.Element.prototype.scrollIntoView = () => {};

  // Sprachausgabe stubben + zuletzt gesprochenes Wort merken
  window.__spoken = null;
  class FakeUtterance { constructor(t) { this.text = t; } }
  window.SpeechSynthesisUtterance = FakeUtterance;
  window.speechSynthesis = {
    onvoiceschanged: null,
    getVoices: () => [],
    cancel: () => {},
    speak: (u) => { window.__spoken = u && u.text; }
  };

  // Spracherkennung stubben (it-IT!) — letzte Instanz merken
  window.__lastRec = null;
  class FakeRecognition {
    constructor() { this.lang = null; this.maxAlternatives = 0; this.interimResults = null; window.__lastRec = this; }
    start() { this.started = true; }
    stop() { this.onend && this.onend(); }
    abort() {}
  }
  window.SpeechRecognition = FakeRecognition;

  // Web Audio stubben
  const node = { connect() {}, start() {}, stop() {},
    frequency: { value: 0 }, type: "",
    gain: { setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} } };
  window.AudioContext = class {
    constructor() { this.currentTime = 0; this.state = "running"; this.destination = {}; }
    createOscillator() { return { ...node }; }
    createGain() { return { ...node }; }
    resume() {}
  };

  // Canvas-Context stubben
  window.HTMLCanvasElement.prototype.getContext = () => ({
    clearRect() {}, save() {}, translate() {}, rotate() {}, fillRect() {}, restore() {}, fillStyle: ""
  });

  // App-Code ausführen — alle Skripte aus index.html (gleiche Reihenfolge) in EINEM
  // eval, damit sie sich denselben lexikalischen Scope teilen (wie echte <script>-Tags).
  window.eval(APP_SCRIPTS.map(read).join("\n;\n"));

  return {
    window, doc,
    $: (sel) => doc.querySelector(sel),
    $$: (sel) => [...doc.querySelectorAll(sel)],
    open: (id) => window.openLesson(id),
    setMode: (m) => window.setMode(m),
    state: () => JSON.parse(window.localStorage.getItem("impariamo_v1") || "{}"),
    close: () => window.close()
  };
}

const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/['’.,!?;:"„“]/g, "").replace(/\s+/g, " ").trim();

/* ======================= TESTS ======================= */

test("App startet & rendert Startseite, Level-Filter & Story", () => {
  const app = makeApp();
  assert.equal(app.$("#statLevel").textContent, "1", "Startlevel ist 1");
  assert.ok(app.$$(".lesson-card").length > 0, "Lektionskarten gerendert (gefiltert)");
  assert.equal(app.$$(".lv-chip").length, LEVELS.length + 1, "Level-Chips inkl. „Tutti“");
  assert.ok(app.$(".story-card"), "Story-Panel zeigt nächste Etappe");
  assert.ok(app.$$(".badge").length >= 10, "Abzeichen gerendert");
  app.close();
});

test("Level-Filter zeigt nur Lektionen des gewählten Grads", () => {
  const app = makeApp();
  // A2-Chip finden und klicken
  const chip = app.$$(".lv-chip").find((c) => /A2/.test(c.textContent));
  chip.click();
  const badges = app.$$(".lesson-card .lc-badge").map((b) => b.textContent);
  assert.ok(badges.length > 0, "es gibt A2-Lektionen");
  assert.ok(badges.every((t) => t === "A2"), "ausschließlich A2-Karten sichtbar");
  app.close();
});

test("Bereichs-Filter: zeigt nur Lektionen des gewählten Abschnitts", () => {
  const app = makeApp();
  // Auf eine Stufe stellen und dann einen Abschnitt wählen
  app.$$(".lv-chip").find((c) => /B2/.test(c.textContent)).click();
  const chips = app.$$(".area-chip");
  assert.ok(chips.length > 2, "Bereichs-Chips werden angezeigt");
  // einen konkreten Abschnitt (nicht Tutti) wählen
  const sfide = chips.find((c) => /Sfide/.test(c.textContent));
  assert.ok(sfide, "Abschnitt 'Sfide' vorhanden");
  sfide.click();
  const heads = app.$$(".area-head span").map((s) => s.textContent);
  assert.equal(heads.length, 1, "nur ein Abschnitt sichtbar");
  assert.ok(/Sfide/.test(heads[0]), "der gewählte Abschnitt 'Sfide'");
  assert.equal(app.state().areaFilter, "Sfide", "Bereichs-Filter gespeichert");
  app.close();
});

test("Hör-Modus: ALLE Fragen werden geprüft (Regression: nur 1/10)", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.words.length >= 5);
  app.open(lesson.id);
  app.setMode("listen");
  const total = lesson.words.length;

  let scored = 0;
  for (let i = 0; i < total; i++) {
    app.$("#bigSpeak").click();
    const answer = app.window.__spoken;
    assert.ok(answer, `Frage ${i + 1}: ein Wort wurde gesprochen`);
    app.$("#listenInput").value = answer;
    app.$("#listenCheck").click();                   // PRÜFEN
    const sol = app.$("#listenSolution").textContent;
    assert.ok(/Esatto/.test(sol), `Frage ${i + 1}: korrekt erkannt`);
    scored++;
    app.$("#listenCheck").click();                   // WEITER / FERTIG
  }
  assert.equal(scored, total, `alle ${total} Fragen geprüft`);
  assert.ok(app.$("#lessonBody").textContent.includes(`${total} / ${total} richtig`), "volle Punktzahl");
  app.close();
});

test("Hör-Modus: Akzent-Toleranz (caffè == caffe)", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.words.some((w) => /[àèéìòù]/i.test(w.it)));
  app.open(lesson.id);
  app.setMode("listen");

  let found = false;
  for (let i = 0; i < lesson.words.length; i++) {
    app.$("#bigSpeak").click();
    const word = app.window.__spoken;
    if (/[àèéìòù]/i.test(word)) {
      const plain = word.normalize("NFD").replace(/[̀-ͯ]/g, "");
      app.$("#listenInput").value = plain;
      app.$("#listenCheck").click();
      assert.ok(/Esatto/.test(app.$("#listenSolution").textContent), `"${plain}" akzeptiert als "${word}"`);
      found = true;
      break;
    }
    app.$("#listenInput").value = word;
    app.$("#listenCheck").click();
    app.$("#listenCheck").click();
  }
  assert.ok(found, "ein Akzent-Wort wurde getestet");
  app.close();
});

test("Quiz: korrekte Antwort wird als richtig markiert & vergibt XP", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.words.length >= 4);
  app.open(lesson.id);
  app.setMode("quiz");

  const itWord = app.$(".quiz-word").textContent.trim();
  const correctDe = lesson.words.find((w) => w.it === itWord).de;
  const opt = app.$$(".quiz-opt").find((b) => b.textContent === correctDe);
  assert.ok(opt, "richtige Option gefunden");
  const xpBefore = app.state().xp || 0;
  opt.click();
  assert.ok(opt.classList.contains("correct"), "Option als richtig markiert");
  assert.ok((app.state().xp || 0) > xpBefore, "XP wurden vergeben");
  app.close();
});

test("Satzbau: Bausteine in richtiger Reihenfolge ergeben Esatto", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.words.every((w) => w.ex.trim().split(/\s+/).length >= 2));
  app.open(lesson.id);
  app.setMode("build");

  const cue = app.$(".bc-de").textContent.replace(/["„“]/g, "").trim();
  const w = lesson.words.find((x) => x.exDe === cue);
  assert.ok(w, "aktuelles Wort über den Hinweis erkannt");
  app.$("#buildHear").click();
  assert.equal(app.window.__spoken, w.ex, "„Original hören“ spricht den ganzen Satz, nicht nur das Wort");
  const tokens = w.ex.trim().split(/\s+/);
  tokens.forEach((tok) => {
    const chip = app.$$("#buildBank .chip-bank").find((c) => c.textContent === tok && !c.disabled);
    assert.ok(chip, `Baustein „${tok}“ vorhanden`);
    chip.click();
  });
  app.$("#buildCheck").click();
  assert.ok(/Esatto/.test(app.$("#buildSol").textContent), "Satz korrekt zusammengesetzt");
  assert.equal(app.window.__spoken, w.ex, "nach dem Prüfen wird der ganze Satz vorgelesen");
  app.close();
});

test("Lückentext: richtige Option füllt die Lücke", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.words.every((w) => w.ex.trim().split(/\s+/).length >= 2));
  app.open(lesson.id);
  app.setMode("gap");

  assert.ok(app.$(".gap-blank"), "es gibt genau eine Lücke");
  const cue = app.$(".gap-de").textContent.replace(/["„“]/g, "").trim();
  const w = lesson.words.find((x) => x.exDe === cue);
  app.$("#gapHear").click();
  assert.equal(app.window.__spoken, w.ex, "„Satz hören“ spricht den ganzen Satz, nicht nur das Wort");
  const tokens = app.window.tokenize(w.ex);
  const ti = app.window.pickGapTarget(tokens);
  const target = app.window.cleanToken(tokens[ti]);
  const opt = app.$$(".gap-opt").find((b) => norm(b.textContent) === norm(target));
  assert.ok(opt, "richtige Option vorhanden");
  opt.click();
  assert.ok(/Perfetto/.test(app.$("#gapSol").textContent), "Lücke korrekt gefüllt");
  assert.equal(app.window.__spoken, w.ex, "nach der Antwort wird der ganze Satz vorgelesen");
  app.close();
});

test("Übungskette: nach Lernen schlägt „Weiter“ jede Übung der Lektion vor, zuletzt die nächste Lektion", async () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.drills.article && l.drills.prep &&
    l.words.every((w) => w.ex.trim().split(/\s+/).length >= 2));
  assert.deepEqual(lesson.modes, ["learn", "listen", "quiz", "match", "build", "gap", "article", "prep", "speak"]);
  app.open(lesson.id);
  const activeTab = () => app.$("#modeTabs .mode-tab.active").dataset.mode;

  lesson.words.forEach(() => app.$("#nextBtn").click());
  assert.equal(activeTab(), "listen", "nach Lernen kommt Hören (nicht direkt das Quiz)");

  const finish = { listen: "finishListen", quiz: "finishQuiz", match: "finishMatch",
                   build: "finishBuild", gap: "finishGap", speak: "finishSpeak",
                   article: "finishChoiceDrill", prep: "finishChoiceDrill" };
  for (let i = 1; i < lesson.modes.length; i++) {
    const mode = lesson.modes[i];
    const next = lesson.modes[i + 1];
    app.setMode(mode);
    app.window[finish[mode]]();
    if (mode === "match") await new Promise((r) => setTimeout(r, 600));   // Match-Screen kommt verzögert
    const step = app.$("#nextStepBtn");
    if (next) {
      assert.ok(step, `nach ${mode}: Weiter-Knopf vorhanden`);
      const label = app.$(`#modeTabs .mode-tab[data-mode="${next}"]`).textContent;
      assert.ok(step.textContent.includes(label), `nach ${mode}: schlägt ${label} vor`);
      assert.equal(app.$$(`[data-goto="${next}"]`).length, 0, `nach ${mode}: ${next} nicht doppelt als Nebenknopf`);
      step.click();
      assert.equal(activeTab(), next, `Weiter nach ${mode} öffnet ${next}`);
    } else {
      assert.ok(!step, "nach der letzten Übung kein Weiter-Knopf");
      assert.ok(app.$("#nextLessonBtn").classList.contains("btn-primary"), "dann ist „Nächste Lektion“ der Hauptknopf");
    }
  }
  app.close();
});

test("Grammatik-Aufgaben (IT): Artikel, Präposition & Regel sind eindeutig und gut gebaut", () => {
  const drills = (k) => LESSONS.flatMap((l) => (l.drills && l.drills[k]) || []);
  const art = drills("article"), prep = drills("prep"), rule = drills("rule");
  assert.ok(art.length >= 300 && prep.length >= 500 && rule.length >= 50, `Umfang: ${art.length}/${prep.length}/${rule.length}`);
  for (const it of [...art, ...prep, ...rule]) {
    assert.ok(it.options.includes(it.answer), `Antwort unter den Optionen: ${it.prompt}`);
    assert.equal(new Set(it.options).size, it.options.length, `keine doppelten Optionen: ${it.prompt}`);
    assert.ok(it.options.length >= 3, `mind. 3 Optionen: ${it.prompt}`);
    assert.equal(it.prompt.split("___").length, 2, `genau eine Lücke: ${it.prompt}`);
  }
  assert.ok(!prep.some((it) => it.options.includes("tra") && it.options.includes("fra")), "tra/fra nie gegeneinander");
  const pizza = art.find((it) => it.prompt === "___ pizza");
  assert.equal(pizza && pizza.answer, "la");
  const al = prep.find((it) => it.answer === "al");
  assert.equal(al.explain, "al = a + il", "verschmolzene Präposition wird erklärt");
  // Grammatik-Lektionen üben die Regel direkt nach Lernen
  const gr = LESSONS.find((l) => l.id === "gr-articolate-A2-1");
  assert.deepEqual(gr.modes.slice(0, 2), ["learn", "rule"]);
  // andere Kurse: (noch) keine Grammatik-Übungen
  const en = new Function(DATA_SOURCE + "\n;selectCourse('en'); return LESSONS;")();
  assert.ok(en.every((l) => !l.modes.some((m) => ["article", "prep", "rule"].includes(m))), "EN unverändert");
});

test("Zeitentrainer (IT): Etappen je Zeit auf ihrer Stufe, gleichmäßig im Lernpfad verteilt", () => {
  const stages = LESSONS.filter((l) => l.kind === "tense");
  const expectLevel = { presente: "A1", passato: "A2", imperfetto: "A2", futuro: "B1", condizionale: "B1", congiuntivo: "B2" };
  assert.ok(stages.length >= 48, `genug Etappen (${stages.length})`);
  for (const l of stages) {
    const tense = l.id.split("-")[1];
    assert.equal(l.levelCode, expectLevel[tense], `${l.id} auf Stufe ${expectLevel[tense]}`);
    assert.deepEqual(l.modes, ["learn", "conj", "quiz"]);
    assert.equal(l.words.length, l.drills.conj.length, "je Karte eine Tipp-Aufgabe");
    assert.ok(l.words.every((w) => w.it && w.de && w.emoji && w.ex && w.exDe), "Karten vollständig");
  }
  const essere = stages.find((l) => l.id === "zeiten-futuro-1").drills.conj.find((it) => it.cue === "noi" && it.verb === "Essere");
  assert.equal(essere.answer, "saremo");

  // Lernpfad: übrige Lektionen in alter Ordnung (Stufe, dann ID), Etappen dazwischen verteilt
  const base = STORY.filter((id) => !id.startsWith("zeiten-"));
  const lv = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
  const sorted = base.slice().sort((a, b) => lv[a].level - lv[b].level || a.localeCompare(b));
  assert.deepEqual(base, sorted, "Reihenfolge der übrigen Lektionen unverändert");
  const a1 = STORY.filter((id) => lv[id].levelCode === "A1");
  const pos = a1.map((id, i) => (id.startsWith("zeiten-") ? i : -1)).filter((i) => i >= 0);
  const gaps = pos.slice(1).map((p, i) => p - pos[i]);
  assert.ok(Math.max(...gaps) - Math.min(...gaps) <= 3, `A1 gleichmäßig verteilt (Abstände ${gaps.join(",")})`);
  assert.ok(pos[0] > 0 && pos[pos.length - 1] < a1.length - 1, "weder ganz vorn noch ganz hinten geballt");

  const en = new Function(DATA_SOURCE + "\n;selectCourse('en'); return LESSONS;")();
  assert.ok(!en.some((l) => l.kind === "tense"), "EN (noch) ohne Zeiten-Etappen");
});

test("Konjugieren: getippte Formen werden geprüft, Etappe gilt danach als geschafft", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.id === "zeiten-presente-1");
  app.open(lesson.id);
  assert.equal(app.$("#modeTabs .mode-tab.active").dataset.mode, "learn", "Etappe beginnt mit Lernkarten");
  app.setMode("conj");
  const total = lesson.drills.conj.length;
  for (let i = 0; i < total; i++) {
    const cue = app.$(".cp-cue").textContent;                  // z. B. „noi … (Essere)"
    const item = lesson.drills.conj.find((it) => cue === `${it.cue} … (${it.verb})`);
    assert.ok(item, `Aufgabe erkannt: ${cue}`);
    app.$("#conjDrillInput").value = item.answer.toUpperCase();   // Groß/klein egal
    app.$("#conjDrillCheck").click();
    assert.ok(/Esatto/.test(app.$("#conjDrillSolution").textContent), `richtig: ${cue}`);
    assert.equal(app.window.__spoken, item.say, "Person + Form wird vorgelesen");
    app.$("#conjDrillCheck").click();
  }
  assert.ok(app.$(".done-screen h3").textContent.includes(`${total} / ${total}`));
  assert.ok(app.state().lessons[lesson.id].completed, "Etappe geschafft");
  app.close();
});

test("Auswahl-Übung: richtige Antwort füllt die Lücke, erklärt die Regel, zählt am Ende", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.drills && l.drills.prep);
  app.open(lesson.id);
  app.setMode("prep");
  const total = lesson.drills.prep.length;
  for (let i = 0; i < total; i++) {
    const shown = app.$(".gap-sentence").textContent.replace("______", "___").replace(/\s+/g, " ").trim();
    const item = lesson.drills.prep.find((it) => it.prompt.replace(/\s+/g, " ").trim() === shown);
    assert.ok(item, `Aufgabe erkannt: ${shown}`);
    const btn = app.$$("#choiceOptions .gap-opt").find((b) => b.textContent === item.answer);
    btn.click();
    assert.ok(btn.classList.contains("correct"), "richtige Option markiert");
    assert.equal(app.$("#choiceBlank").textContent, item.answer, "Lücke gefüllt");
    assert.ok(app.$(".choice-explain").textContent.includes(item.explain), "Regel wird erklärt");
    app.$("#choiceNext").click();
  }
  assert.ok(app.$(".done-screen h3").textContent.includes(`${total} / ${total}`), "alle richtig gezählt");
  assert.ok(app.state().lessons[lesson.id].completed, "Lektion gilt als geschafft");
  app.close();
});

test("Glossar: Einzelwörter werden übersetzt (Satzzeichen, Großschreibung, Apostroph)", () => {
  const { glossary: it } = glossaryProbe("it");
  assert.ok(it.lookup("è").some((t) => /ist/.test(t)), "è → ist");
  assert.ok(it.lookup("L’acqua,").some((t) => /Wasser/.test(t)), "L’acqua, → Wasser (Elision + Satzzeichen)");
  assert.ok(it.lookup("Mangio").some((t) => /ich esse/.test(t)), "Verbform aus dem Konjugations-Trainer");
  assert.deepEqual(it.lookup("xyzzy"), [], "unbekanntes Wort → leer");
  assert.ok(!it.lookup("del").some((t) => /[:→+]/.test(t)), "keine Grammatik-Erklärung als Übersetzung");
  assert.ok(glossaryProbe("fr").glossary.lookup("l'eau").some((t) => /Wasser/.test(t)), "FR: l'eau → Wasser");
});

test("Glossar: in jedem Kurs sind ≥ 60 % der Satzwörter übersetzbar", () => {
  for (const lang of ["it", "en", "es", "fr", "pt"]) {
    const { glossary, lessons } = glossaryProbe(lang);
    const sentences = new Set(lessons.flatMap((l) => l.words.map((w) => w.ex)));
    let total = 0, hit = 0;
    sentences.forEach((s) => s.split(/\s+/).filter(Boolean).forEach((t) => { total++; if (glossary.lookup(t).length) hit++; }));
    assert.ok(hit / total >= 0.6, `${lang}: nur ${(100 * hit / total).toFixed(1)} % übersetzbar`);
  }
});

test("Wort-Info: Klick auf ein Satzwort zeigt die Übersetzung, Karte dreht sich nicht", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab");
  app.open(lesson.id);
  const words = app.$$(".flash-ex .gw");
  assert.ok(words.length >= 2, "Beispielsatz besteht aus anklickbaren Wörtern");
  const known = words.find((el) => app.window.activeGlossary().lookup(el.textContent).length);
  assert.ok(known, "mind. ein Wort des Satzes ist bekannt");
  known.dispatchEvent(new app.window.MouseEvent("click", { bubbles: true }));
  const box = app.$("#wordInfo");
  assert.ok(box, "Übersetzungsfeld erscheint");
  assert.ok(box.textContent.includes(app.window.activeGlossary().lookup(known.textContent)[0]), "zeigt die Übersetzung");
  assert.ok(!app.$("#flashcard").classList.contains("flipped"), "Wort-Klick dreht die Karte nicht um");
  app.$("#lessonTitle").click();
  assert.ok(!app.$("#wordInfo"), "Klick daneben schließt das Feld");
  known.click();
  known.click();
  assert.ok(!app.$("#wordInfo"), "zweiter Klick aufs selbe Wort schließt das Feld");

  app.setMode("gap");
  assert.ok(app.$$(".gap-sentence .gw").length >= 1, "Lückentext: Wörter anklickbar");
  app.close();
});

test("Wort-Info: Dialogzeilen sind anklickbar", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "dialogue");
  app.open(lesson.id);
  assert.ok(app.$$(".dlg-text .gw").length >= 1, "Dialogzeile besteht aus anklickbaren Wörtern");
  app.close();
});

test("Sprechen: Mikrofon nutzt Italienisch (it-IT) und wertet korrekt", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.modes.includes("speak") && l.words.length >= 2);
  app.open(lesson.id);
  app.setMode("speak");

  const target = app.$(".speak-target").textContent.trim();
  app.$("#micBtn").click();
  assert.ok(app.window.__lastRec, "Erkennung wurde gestartet");
  assert.equal(app.window.__lastRec.lang, "it-IT", "Spracherkennung läuft auf Italienisch, nicht Deutsch");

  const xpBefore = app.state().xp || 0;
  // Erkennungsergebnis simulieren: exakt das Zielwort
  app.window.__lastRec.onresult({ results: [[{ transcript: target }]] });
  assert.ok(/✅/.test(app.$("#speakStatus").textContent), "korrekte Aussprache als richtig gewertet");
  assert.ok((app.state().xp || 0) > xpBefore, "XP für Sprechen vergeben");
  app.close();
});

test("Dialog: Antworten aus Bausteinen führen zum Abschluss", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "dialogue");
  app.open(lesson.id);                 // Dialog ist der Startmodus
  assert.ok(app.$(".dlg-thread"), "Dialog-Faden gerendert");

  const userLines = lesson.lines.filter((l) => l.who === "U").map((l) => l.it);
  for (const expected of userLines) {
    const choices = app.$$(".dlg-choice");
    if (!choices.length) break;
    const btn = choices.find((b) => b.textContent === expected);
    assert.ok(btn, `richtige Antwort „${expected}“ unter den Bausteinen`);
    btn.click();
  }
  assert.ok(/Dialogo completato/.test(app.$("#lessonBody").textContent), "Dialog abgeschlossen");
  app.close();
});

test("Story: Schwierigkeit steigt & Lernpfad rückt nach Abschluss vor", () => {
  const app = makeApp();
  // Story ist nach Level sortiert -> Anfang ist A1, Ende höher
  const first = LESSONS.find((l) => l.id === STORY[0]);
  const last = LESSONS.find((l) => l.id === STORY[STORY.length - 1]);
  assert.ok(first.level <= last.level, "Story steigt in der Schwierigkeit");

  // nächste Etappe = erste noch nicht abgeschlossene Lektion
  const next0 = app.window.nextStoryLesson();
  assert.ok(next0, "es gibt eine nächste Etappe");

  // Etappe abschließen -> nächste Etappe rückt vor
  app.open(next0.id);
  app.window.completeLesson(3);
  const next1 = app.window.nextStoryLesson();
  assert.notEqual(next1.id, next0.id, "nach Abschluss kommt die nächste Etappe");
  app.close();
});

test("Story-Start: Start-Niveau generell & nachträglich wählbar", () => {
  const app = makeApp();
  // Start-Niveau-Chips werden im Story-Panel angeboten (alle 6 Stufen)
  assert.ok(app.$$(".story-lv-chip").length >= 2, "Start-Niveau-Chips gerendert");

  // Höchste vorkommende Stufe wählen
  const target = Math.max(...STORY.map((id) => LESSONS.find((l) => l.id === id).level));
  assert.ok(target > 1, "Story enthält höhere Stufen als A1");

  app.window.setStartLevel(target);
  assert.equal(app.state().startLevel, target, "Start-Niveau wird gespeichert");

  // nächste Etappe liegt genau auf dem gewählten Niveau
  const next = app.window.nextStoryLesson();
  assert.equal(next.level, target, "nächste Etappe hat das gewählte Niveau");
  assert.equal(app.$(".story-title").textContent, next.title, "Panel zeigt diese Lektion");

  // „Weiterlernen" (Hero-Button) wurde entfernt
  assert.equal(app.$("#continueBtn"), null, "kein separater Weiterlernen-Button mehr");

  // Unbekannte Stufe ändert nichts (robust)
  app.window.setStartLevel(999);
  assert.equal(app.state().startLevel, target, "ungültige Stufe wird ignoriert");
  app.close();
});

test("Abschluss-Screen: „Nächste Lektion“ führt zur Folge-Etappe", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab" && l.words.length >= 5);
  app.open(lesson.id);
  app.setMode("listen");
  const total = lesson.words.length;
  for (let i = 0; i < total; i++) {
    app.$("#bigSpeak").click();
    app.$("#listenInput").value = app.window.__spoken;
    app.$("#listenCheck").click();   // prüfen
    app.$("#listenCheck").click();   // weiter / fertig
  }
  const btn = app.$("#nextLessonBtn");
  assert.ok(btn, "Nächste-Lektion-Button auf dem Abschluss-Screen vorhanden");
  const expected = app.window.nextLessonAfterCurrent();
  assert.ok(expected, "es gibt eine Folge-Lektion");
  btn.click();
  assert.equal(app.$("#lessonTitle").textContent, expected.title, "öffnet die Folge-Lektion");
  app.close();
});

test("Grammatik: eigene Grammatik-Lektionen mit Regel vorhanden", () => {
  const grammarThemes = CORPUS.filter((t) => t.grammar);
  assert.ok(grammarThemes.length >= 10, `mind. 10 Grammatik-Themen (${grammarThemes.length})`);
  const grammarLessons = LESSONS.filter((l) => l.kind === "grammar");
  assert.ok(grammarLessons.length > 0, "Grammatik-Lektionen generiert");
  assert.ok(grammarLessons.every((l) => l.rule && l.rule.trim()), "jede Grammatik-Lektion hat eine Regel");

  // Regel wird im Lernmodus angezeigt
  const app = makeApp();
  app.open(grammarLessons[0].id);
  app.setMode("learn");
  assert.ok(app.$(".grammar-rule"), "Regel-Banner im Lernmodus sichtbar");
  app.close();
});

test("Lernmodus: Vokabel als gelernt zählen vergibt XP einmalig", () => {
  const app = makeApp();
  const lesson = LESSONS.find((l) => l.kind === "vocab");
  app.open(lesson.id);                                // öffnet Lernmodus, Karte 1 = gelernt
  const learned = app.state().lessons[lesson.id].learned;
  assert.ok(learned.includes(0), "erste Karte als gelernt markiert");
  assert.ok((app.state().xp || 0) > 0, "XP vergeben");
  app.close();
});

test("Zwei Kurse: EN-Kurs hat eigene Inhalte & en:-IDs, gleiche Größe", () => {
  const it = courseProbe("it");
  const en = courseProbe("en");
  assert.equal(it.lang, "it");
  assert.equal(en.lang, "en");
  assert.ok(!it.firstId.startsWith("en:"), "IT-IDs ohne Präfix");
  assert.ok(en.firstId.startsWith("en:"), "EN-IDs mit en:-Präfix (getrennter Fortschritt)");
  assert.equal(en.core, it.core, "gleicher Kern-Umfang in beiden Kursen");
  for (const code of ["B2", "C1", "C2"]) {
    assert.ok((en.perLevel[code] || 0) >= 100, `EN ${code} >= 100 (${en.perLevel[code]})`);
  }
  // Inhalte/Beschriftungen sind sprachspezifisch
  assert.notEqual(en.conjInf, it.conjInf, "Verben unterscheiden sich");
  assert.equal(en.tense0, "Present Simple");
  assert.equal(it.tense0, "Presente");
  assert.equal(en.pron0, "I");
  assert.equal(it.pron0, "io");
  assert.notEqual(en.badge0, it.badge0, "Abzeichen-Namen sprachspezifisch");
  assert.notEqual(en.vocabTitle, it.vocabTitle, "Themen-Titel übersetzt");
  // wieder zurück auf IT (Default für die übrigen Tests im File-Scope egal)
  courseProbe("it");
});

test("Sprach-Umschalter: EN aktiviert Englisch-Kurs, Theme & Texte", () => {
  const app = makeApp();
  assert.equal(app.state().lang, "it", "Standard ist Italienisch");
  assert.ok(!app.doc.body.classList.contains("londra"));

  app.$('#langToggle [data-lang="en"]').click();
  assert.equal(app.state().lang, "en", "EN gespeichert");
  assert.ok(app.doc.body.classList.contains("londra"), "Swinging-London-Theme aktiv");
  assert.match(app.$(".brand-text").textContent, /Let's Learn/);
  assert.match(app.$("#secLessonsH").textContent, /The Lessons/);
  assert.match(app.$(".brand-mark").textContent, /🇬🇧/);
  // Lektionskarten zeigen englische Titel
  assert.ok(app.$$(".lesson-card").length > 0, "EN-Lektionen gerendert");

  app.$('#langToggle [data-lang="it"]').click();
  assert.equal(app.state().lang, "it");
  assert.ok(!app.doc.body.classList.contains("londra"));
  assert.match(app.$("#secLessonsH").textContent, /Le Lezioni/);
  app.close();
});

test("Sprach-Umschalter: Spracherkennung wechselt auf en-GB", () => {
  const app = makeApp();
  app.window.startRecognition({});
  assert.equal(app.window.__lastRec.lang, "it-IT", "Italienisch zuerst");
  app.$('#langToggle [data-lang="en"]').click();
  app.window.startRecognition({});
  assert.equal(app.window.__lastRec.lang, "en-GB", "nach Wechsel Englisch");
  app.close();
});

test("Fünf Kurse: ES/FR/PT bauen mit Präfix, eigener Verbalik & ≥100 B2/C1/C2", () => {
  const it = courseProbe("it");
  const expect = {
    es: { tense0: "Presente", pron0: "yo" },
    fr: { tense0: "Présent", pron0: "je" },
    pt: { tense0: "Presente", pron0: "eu" }
  };
  for (const lang of ["es", "fr", "pt"]) {
    const c = courseProbe(lang);
    assert.equal(c.lang, lang, `${lang} aktiv`);
    assert.ok(c.firstId.startsWith(lang + ":"), `${lang}:-Präfix (getrennter Fortschritt)`);
    assert.equal(c.core, it.core, `${lang} gleicher Kern-Umfang`);
    for (const code of ["B2", "C1", "C2"]) {
      assert.ok((c.perLevel[code] || 0) >= 100, `${lang} ${code} >= 100 (${c.perLevel[code]})`);
    }
    assert.equal(c.tense0, expect[lang].tense0, `${lang} Zeit-Label`);
    assert.equal(c.pron0, expect[lang].pron0, `${lang} Pronomen`);
    assert.notEqual(c.vocabTitle, it.vocabTitle, `${lang} Titel übersetzt`);
    assert.notEqual(c.badge0, it.badge0, `${lang} Abzeichen lokalisiert`);
  }
  courseProbe("it");
});

test("Sprach-Umschalter: ES/FR/PT setzen eigenes Theme & Sprache", () => {
  const app = makeApp();
  const cases = [
    { lang: "es", theme: "espana", speech: "es-ES", sec: /Las Lecciones/ },
    { lang: "fr", theme: "paris", speech: "fr-FR", sec: /Les Leçons/ },
    { lang: "pt", theme: "lisboa", speech: "pt-PT", sec: /As Lições/ }
  ];
  for (const c of cases) {
    app.$(`#langToggle [data-lang="${c.lang}"]`).click();
    assert.equal(app.state().lang, c.lang, `${c.lang} aktiv`);
    assert.ok(app.doc.body.classList.contains(c.theme), `${c.lang}: Theme ${c.theme}`);
    // nur EINE Theme-Klasse aktiv
    const themed = ["londra", "espana", "paris", "lisboa"].filter((t) => app.doc.body.classList.contains(t));
    assert.deepEqual(themed, [c.theme], `${c.lang}: nur ${c.theme}`);
    assert.match(app.$("#secLessonsH").textContent, c.sec, `${c.lang}: Abschnitt-Text`);
    app.window.startRecognition({});
    assert.equal(app.window.__lastRec.lang, c.speech, `${c.lang}: Erkennung ${c.speech}`);
    assert.ok(app.$$(".lesson-card").length > 0, `${c.lang}: Lektionen gerendert`);
  }
  // zurück zu IT: keine Theme-Klasse
  app.$('#langToggle [data-lang="it"]').click();
  assert.ok(!["londra", "espana", "paris", "lisboa"].some((t) => app.doc.body.classList.contains(t)), "IT ohne Theme-Klasse");
  app.close();
});

test("Datenintegrität: viele Lektionen, alle Felder, IDs eindeutig", () => {
  let words = 0;
  const ids = new Set();
  for (const l of LESSONS) {
    ids.add(l.id);
    assert.ok(l.title && l.de && l.emoji && l.color && l.levelCode, `Lektion ${l.id} hat Kopf-Felder`);
    assert.ok(Array.isArray(l.modes) && l.modes.length, `Lektion ${l.id} hat Modi`);
    for (const [i, w] of l.words.entries()) {
      words++;
      for (const k of ["it", "de", "emoji", "ex", "exDe"]) {
        assert.ok(w[k] && String(w[k]).trim(), `${l.id}[${i}] hat Feld ${k}`);
      }
    }
  }
  assert.equal(ids.size, LESSONS.length, "Lektions-IDs eindeutig");
  assert.ok(LESSONS.length >= 250, `viele Lektionen (${LESSONS.length})`);
  assert.ok(words >= 1000, `mindestens 1000 Übungs-Items (${words})`);
});

test("Levels: 6 Stufen A1–C2, jede Lektion klar zugeordnet", () => {
  assert.equal(LEVELS.length, 6, "sechs Schwierigkeitsgrade");
  assert.deepEqual(LEVELS.map((l) => l.code), ["A1", "A2", "B1", "B2", "C1", "C2"]);
  for (const l of LESSONS) {
    assert.ok(l.level >= 1 && l.level <= 6, `${l.id}: Level im Bereich 1–6`);
  }
});

test("Umfang: B2, C1 und C2 haben jeweils mind. 100 Lektionen", () => {
  const byLevel = {};
  for (const l of LESSONS) byLevel[l.levelCode] = (byLevel[l.levelCode] || 0) + 1;
  for (const code of ["B2", "C1", "C2"]) {
    assert.ok((byLevel[code] || 0) >= 100, `${code} hat mind. 100 Lektionen (${byLevel[code] || 0})`);
  }
});

test("Tag/Nacht-Modus schaltet Klasse + speichert Einstellung", () => {
  const app = makeApp();
  assert.equal(app.doc.body.classList.contains("notte"), false, "startet im Tag-Modus");
  app.$("#themeBtn").click();
  assert.equal(app.doc.body.classList.contains("notte"), true, "Nacht-Modus aktiv");
  assert.equal(app.state().settings.theme, "notte", "Theme gespeichert");
  app.$("#themeBtn").click();
  assert.equal(app.state().settings.theme, "giorno", "Theme zurückgesetzt");
  app.close();
});

test("CSS-Hygiene: Klammern ausgeglichen, Dark-Mode definiert, keine undefinierten Variablen", () => {
  const css = read("styles.css");
  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  assert.equal(open, close, "geschweifte Klammern ausgeglichen");
  assert.ok(/body\.notte\s*{[^}]*--paper\s*:/.test(css), "Dark-Mode setzt --paper");
  const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  const used = new Set([...css.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)].map((m) => m[1]));
  const missing = [...used].filter((v) => !defined.has(v));
  assert.deepEqual(missing, [], "keine undefinierten CSS-Variablen ohne Fallback: " + missing.join(", "));
});

test("Konjugationen: mehr Verben, jede Zeit 6 Personen (IT+DE)", () => {
  assert.ok(CONJUGATIONS.length >= 15, `mind. 15 Verben (${CONJUGATIONS.length})`);
  const ids = new Set();
  for (const v of CONJUGATIONS) {
    ids.add(v.id);
    assert.ok(v.inf && v.infDe && v.emoji && v.color, `${v.id}: Kopf-Felder`);
    for (const t of CONJ_TENSES) {
      assert.equal(v.forms[t.id]?.length, 6, `${v.id}/${t.id}: 6 IT-Formen`);
      assert.equal(v.formsDe[t.id]?.length, 6, `${v.id}/${t.id}: 6 DE-Formen`);
      for (const f of v.forms[t.id]) assert.ok(f && f.trim(), `${v.id}/${t.id}: keine leere Form`);
    }
  }
  assert.equal(ids.size, CONJUGATIONS.length, "Verb-IDs eindeutig");
});

test("Konjugationen: Übungsmodus prüft ALLE Personen & wertet korrekt", () => {
  const app = makeApp();
  app.$$(".conj-card")[0].click();                    // essere
  app.$('#conjModeTabs .mode-tab[data-cmode="practice"]').click();

  const verb = CONJUGATIONS[0];
  const total = CONJ_PRONOUNS.length;
  let scored = 0;
  for (let i = 0; i < total; i++) {
    const pron = app.$(".cp-cue b").textContent.trim();
    const idx = CONJ_PRONOUNS.indexOf(pron);
    app.$("#conjInput").value = verb.forms.presente[idx];
    app.$("#conjCheck").click();
    if (/Esatto/.test(app.$("#conjSolution").textContent)) scored++;
    app.$("#conjCheck").click();
  }
  assert.equal(scored, total, `alle ${total} Personen geprüft`);
  app.close();
});
