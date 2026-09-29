/* =========================================================
   Impariamo! — Gesten-Lektionen: Karte „🤌 Geste" (Bild, Bedeutung,
   So geht's, Wann, passende Sätze) + Quiz „Welche Geste?"
   (Auswahl-Übung, Aufgaben aus gestureDrill in gesten.js).
   Lädt NACH app.js und modus-auswahl.js.
   ========================================================= */
registerMode("gesture", "🤌 Geste", () => renderGesture());
registerMode("gestequiz", "🤌 Welche Geste?", () =>
  startChoiceDrill(current.lesson.drills.gestequiz, { title: "Welche Geste?", unit: "Gesten" }));

function renderGesture() {
  const g = current.lesson.gesture;
  setProgress(0);
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="gesture-card">
      <div class="gesture-pic" aria-hidden="true">${g.pic}</div>
      <h3 class="gesture-name">${glossSentenceHtml(g.name)}</h3>
      <div class="gesture-meaning">${g.meaning}</div>
      <div class="gesture-how"><b>✋ So geht's:</b> ${g.how}</div>
      <div class="gesture-when"><b>🕐 Wann:</b> ${g.when}</div>
      <div class="gesture-examples">
        <b>💬 Passende Sätze</b>
        ${g.sentences.map((s, i) => `
          <div class="gesture-ex">
            <button class="dlg-speak" data-i="${i}" title="Anhören">🔊</button>
            <span><span class="gesture-ex-it">${glossSentenceHtml(s.it)}</span><span class="gesture-ex-de">${s.de}</span></span>
          </div>`).join("")}
      </div>
      <div class="done-actions">${nextStepHtml()}</div>
    </div>`;
  $$("#lessonBody .gesture-ex .dlg-speak").forEach((b) =>
    b.addEventListener("click", () => speak(g.sentences[+b.dataset.i].it, b)));
  wireNextStep(body);
  speak(g.name);
}
