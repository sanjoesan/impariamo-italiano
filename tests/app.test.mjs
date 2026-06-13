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

// Vokabeldaten direkt verfügbar machen (data.js ist kein Modul)
const LESSONS = new Function(read("data.js") + "\n;return LESSONS;")();

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

  // App-Code ausführen — data.js + app.js in EINEM eval, damit sie sich
  // denselben lexikalischen Scope teilen (wie echte <script>-Tags).
  window.eval(read("data.js") + "\n;\n" + read("app.js"));

  return {
    window, doc,
    $: (sel) => doc.querySelector(sel),
    $$: (sel) => [...doc.querySelectorAll(sel)],
    state: () => JSON.parse(window.localStorage.getItem("impariamo_v1") || "{}"),
    close: () => window.close()
  };
}

/* ======================= TESTS ======================= */

test("App startet & rendert Startseite", () => {
  const app = makeApp();
  assert.equal(app.$("#statLevel").textContent, "1", "Startlevel ist 1");
  assert.equal(app.$$(".lesson-card").length, LESSONS.length, "alle Lektionskarten gerendert");
  assert.ok(app.$$(".badge").length >= 8, "Abzeichen gerendert");
  app.close();
});

test("Hör-Modus: ALLE Fragen werden geprüft (Regression: nur 1/10)", () => {
  const app = makeApp();
  const lesson = LESSONS[0];
  const total = lesson.words.length;

  app.$$(".lesson-card")[0].click();                 // Lektion öffnen
  app.$('.mode-tab[data-mode="listen"]').click();    // Hör-Modus

  let scored = 0;
  for (let i = 0; i < total; i++) {
    // bigSpeak erzwingt Aussprache -> verrät uns die korrekte Lösung
    app.$("#bigSpeak").click();
    const answer = app.window.__spoken;
    assert.ok(answer, `Frage ${i + 1}: ein Wort wurde gesprochen`);

    app.$("#listenInput").value = answer;
    app.$("#listenCheck").click();                   // PRÜFEN

    const sol = app.$("#listenSolution").textContent;
    assert.ok(sol.length > 0, `Frage ${i + 1}: wurde tatsächlich geprüft (Lösung sichtbar)`);
    assert.ok(/Esatto/.test(sol), `Frage ${i + 1}: korrekte Antwort als richtig erkannt`);
    if (/Esatto/.test(sol)) scored++;

    app.$("#listenCheck").click();                   // WEITER / FERTIG
  }

  assert.equal(scored, total, `alle ${total} Fragen geprüft & gewertet (nicht nur 1)`);
  const bodyText = app.$("#lessonBody").textContent;
  assert.ok(bodyText.includes(`${total} / ${total} richtig`), "Abschluss zeigt volle Punktzahl");
  app.close();
});

test("Hör-Modus: falsche Antwort zeigt Lösung und wertet nicht", () => {
  const app = makeApp();
  app.$$(".lesson-card")[0].click();
  app.$('.mode-tab[data-mode="listen"]').click();

  app.$("#listenInput").value = "xxxfalschxxx";
  app.$("#listenCheck").click();
  const sol = app.$("#listenSolution").textContent;
  assert.ok(/Richtig:/.test(sol), "Lösung wird bei falscher Antwort angezeigt");
  app.close();
});

test("Hör-Modus: Akzent-Toleranz (caffè == caffe)", () => {
  const app = makeApp();
  // Lektion 'cibo' enthält 'Il caffè'
  const ciboIdx = LESSONS.findIndex((l) => l.id === "cibo");
  app.$$(".lesson-card")[ciboIdx].click();
  app.$('.mode-tab[data-mode="listen"]').click();

  // Jede Frage korrekt beantworten und weiterklicken, bis ein Akzent-Wort kommt
  let found = false;
  for (let i = 0; i < LESSONS[ciboIdx].words.length; i++) {
    app.$("#bigSpeak").click();
    const word = app.window.__spoken;
    if (/[àèéìòù]/i.test(word)) {
      const plain = word.normalize("NFD").replace(/[̀-ͯ]/g, "");
      app.$("#listenInput").value = plain;            // ohne Akzent eingeben
      app.$("#listenCheck").click();
      assert.ok(/Esatto/.test(app.$("#listenSolution").textContent),
        `"${plain}" wird als "${word}" akzeptiert`);
      found = true;
      break;
    }
    app.$("#listenInput").value = word;               // korrekt, um weiterzukommen
    app.$("#listenCheck").click();                    // prüfen
    app.$("#listenCheck").click();                    // weiter
  }
  assert.ok(found, "ein Akzent-Wort wurde getestet");
  app.close();
});

test("Tag/Nacht-Modus schaltet Klasse + speichert Einstellung", () => {
  const app = makeApp();
  assert.equal(app.doc.body.classList.contains("notte"), false, "startet im Tag-Modus");

  app.$("#themeBtn").click();
  assert.equal(app.doc.body.classList.contains("notte"), true, "Nacht-Modus aktiv");
  assert.equal(app.state().settings.theme, "notte", "Theme gespeichert");
  assert.equal(app.$("#themeBtn").textContent, "☀️", "Icon zeigt Sonne");

  app.$("#themeBtn").click();
  assert.equal(app.doc.body.classList.contains("notte"), false, "zurück im Tag-Modus");
  assert.equal(app.state().settings.theme, "giorno", "Theme zurückgesetzt");
  app.close();
});

test("Quiz: korrekte Antwort wird als richtig markiert & vergibt XP", () => {
  const app = makeApp();
  const lesson = LESSONS[0];
  app.$$(".lesson-card")[0].click();
  app.$('.mode-tab[data-mode="quiz"]').click();

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

test("Lernmodus: Vokabel als gelernt zählen vergibt XP einmalig", () => {
  const app = makeApp();
  app.$$(".lesson-card")[0].click();                 // öffnet direkt Lernmodus, Karte 1 = gelernt
  const learned = app.state().lessons[LESSONS[0].id].learned;
  assert.ok(learned.includes(0), "erste Karte als gelernt markiert");
  assert.ok((app.state().xp || 0) > 0, "XP vergeben");
  app.close();
});

test("Datenintegrität: alle Vokabeln vollständig & IDs eindeutig", () => {
  let words = 0;
  const ids = new Set();
  for (const l of LESSONS) {
    ids.add(l.id);
    assert.ok(l.title && l.de && l.emoji && l.color, `Lektion ${l.id} hat Kopf-Felder`);
    for (const [i, w] of l.words.entries()) {
      words++;
      for (const k of ["it", "de", "emoji", "ex", "exDe"]) {
        assert.ok(w[k] && String(w[k]).trim(), `${l.id}[${i}] hat Feld ${k}`);
      }
    }
  }
  assert.equal(ids.size, LESSONS.length, "Lektions-IDs eindeutig");
  assert.ok(words >= 100, `mindestens 100 Vokabeln (${words})`);
});

test("CSS-Hygiene: Klammern ausgeglichen, Dark-Mode definiert, keine Tippfehler", () => {
  const css = read("styles.css");
  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  assert.equal(open, close, "geschweifte Klammern ausgeglichen");
  assert.ok(/body\.notte\s*{[^}]*--paper\s*:/.test(css), "Dark-Mode setzt --paper");
  assert.ok(!/customColor/.test(css), "kein versehentlicher 'customColor'-Tippfehler");
  // CSS-Variablen ohne Fallback müssen definiert sein.
  // var(--x, …) mit Fallback ist immer sicher (z. B. das per JS gesetzte --card-color).
  const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  const used = new Set([...css.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)].map((m) => m[1]));
  const missing = [...used].filter((v) => !defined.has(v));
  assert.deepEqual(missing, [], "keine undefinierten CSS-Variablen: " + missing.join(", "));
});
