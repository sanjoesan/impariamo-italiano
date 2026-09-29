/* =========================================================
   Impariamo! — Modus „📰 Verstehen" (Dialog-Lektionen):
   Dialog hören & mitlesen (Übersetzung zunächst verdeckt), danach
   Verständnisfragen als Auswahl-Übung (lesson.drills.understand,
   siehe dialog-fragen.js). Lädt NACH app.js und modus-auswahl.js.
   ========================================================= */
registerMode("understand", "📰 Verstehen", () => renderUnderstand());

let understandState = null;

function renderUnderstand() {
  const { lesson } = current;
  understandState = { playing: false };
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="dialogue-stage dlg-hide-tr" id="understandStage">
      <div class="gap-cue"><span class="bc-label">Hör zu und lies mit — danach ${lesson.drills.understand.length} Fragen</span></div>
      ${lesson.scene ? `<div class="dlg-scene">🎬 ${lesson.scene}</div>` : ""}
      <div class="dlg-thread" id="dlgThread"></div>
      <div class="listen-actions">
        <button class="btn btn-ghost" id="udPlay">▶︎ Anhören</button>
        <button class="btn btn-ghost" id="udTr">🇩🇪 Übersetzung zeigen</button>
        <button class="btn btn-primary" id="udQuestions">Fragen beantworten ›</button>
      </div>
    </div>`;
  const rows = lesson.lines.map((line) => addBubble(line));
  setProgress(0);
  $("#udPlay").addEventListener("click", () => playDialogue(rows, lesson.lines));
  $("#udTr").addEventListener("click", (e) => {
    const hidden = $("#understandStage").classList.toggle("dlg-hide-tr");
    e.currentTarget.textContent = hidden ? "🇩🇪 Übersetzung zeigen" : "🇩🇪 Übersetzung verbergen";
  });
  $("#udQuestions").addEventListener("click", () => {
    understandState.run = null;              // Vorlesen beenden (Modus bleibt „understand")
    speechSynthesis && speechSynthesis.cancel();
    startChoiceDrill(lesson.drills.understand, { title: "Hast du's verstanden?", unit: "Fragen" });
  });
  playDialogue(rows, lesson.lines);
}

/* Zeile für Zeile vorlesen, die gerade gesprochene hervorheben. Bricht ab, sobald
   die Ansicht gewechselt wurde (neuer understandState). */
function playDialogue(rows, lines) {
  const run = {};
  understandState.run = run;
  const step = (k) => {
    if (understandState.run !== run || current.mode !== "understand") return;
    rows.forEach((r, i) => r.classList.toggle("playing", i === k));
    if (k >= lines.length) return;
    rows[k].scrollIntoView({ behavior: "smooth", block: "nearest" });
    speak(lines[k].it, null, () => setTimeout(() => step(k + 1), 350));
  };
  step(0);
}
