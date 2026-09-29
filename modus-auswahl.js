/* =========================================================
   Impariamo! — Auswahl-Übung: eine Aufgabe, mehrere Antworten.
   Spielt die Aufgaben (ChoiceItem, siehe grammatik.js) einer
   Lektion ab: Artikel, Präposition, Regel anwenden — und die
   Verständnisfragen zu Dialogen. Lädt NACH app.js.
   ========================================================= */

/* Drill-Modi: Tab-Beschriftung + Überschrift; Aufgaben liegen in lesson.drills[id] */
const DRILL_MODES = {
  article: { label: "🔤 Artikel",       title: "Welcher Artikel passt?",     unit: "Artikel" },
  prep:    { label: "🔗 Präposition",   title: "Welche Präposition passt?",  unit: "Präpositionen" },
  rule:    { label: "📐 Regel anwenden", title: "Welches Wort passt?",        unit: "Regeln" }
};
Object.entries(DRILL_MODES).forEach(([id, meta]) =>
  registerMode(id, meta.label, () => startChoiceDrill(current.lesson.drills[id], meta)));

let choiceState = null;

/* @param {object[]} items  ChoiceItems   @param {{title: string, unit: string}} meta */
function startChoiceDrill(items, meta) {
  choiceState = { items: shuffle(items || []), meta, pos: 0, correct: 0, answered: false };
  showChoice();
}

function choicePromptHtml(item) {
  if (item.ask) return `<div class="choice-ask">${item.ask}</div>`;
  // Leerzeichen um die Lücke erhalten („per ___ il" ≠ „___amico")
  const part = (p) => (/^\s/.test(p) ? " " : "") + glossSentenceHtml(p) + (/\s$/.test(p) ? " " : "");
  return `<div class="gap-sentence">${item.prompt.split("___").map(part)
    .join(`<span class="gap-blank" id="choiceBlank">______</span>`)}</div>`;
}

function showChoice() {
  const st = choiceState;
  if (st.pos >= st.items.length) return finishChoiceDrill();
  st.answered = false;
  const item = st.items[st.pos];
  setProgress(Math.round((st.pos / st.items.length) * 100));

  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="gap-stage">
      <div class="gap-cue"><span class="bc-label">${st.meta.title} · ${st.pos + 1}/${st.items.length}</span></div>
      ${choicePromptHtml(item)}
      ${item.hint ? `<div class="gap-de">„${item.hint}"</div>` : ""}
      <div class="gap-options" id="choiceOptions"></div>
      <div class="build-sol" id="choiceSol"></div>
      <div class="listen-actions"><button class="btn btn-primary hidden" id="choiceNext">Weiter ›</button></div>
    </div>`;
  const wrap = $("#choiceOptions");
  shuffle(item.options).forEach((opt) => {
    const b = document.createElement("button");
    b.className = "gap-opt";
    b.textContent = opt;
    b.addEventListener("click", () => answerChoice(b, opt));
    wrap.appendChild(b);
  });
  $("#choiceNext").addEventListener("click", () => { st.pos++; showChoice(); });
}

function answerChoice(btn, opt) {
  const st = choiceState;
  if (st.answered) return;
  st.answered = true;
  const item = st.items[st.pos];
  const ok = normalizeText(opt) === normalizeText(item.answer);
  $$("#choiceOptions .gap-opt").forEach((b) => {
    b.disabled = true;
    if (normalizeText(b.textContent) === normalizeText(item.answer)) b.classList.add("correct");
  });
  const blank = $("#choiceBlank");
  if (blank) { blank.textContent = item.answer; blank.classList.add("filled"); }
  if (ok) { st.correct++; award(5, 1); sfx.correct(); }
  else { btn.classList.add("wrong"); sfx.wrong(); }
  $("#choiceSol").innerHTML = (ok ? `✅ <span style="color:var(--olive)">Esatto!</span>`
    : `❌ Richtig: <span style="color:var(--terracotta-d)">${item.answer}</span>`)
    + (item.explain ? `<div class="choice-explain">💡 ${item.explain}</div>` : "");
  if (item.say) speak(item.say);
  const next = $("#choiceNext");
  next.textContent = st.pos >= st.items.length - 1 ? "Fertig 🏁" : "Weiter ›";
  next.classList.remove("hidden");
}

function finishChoiceDrill() {
  const st = choiceState;
  const total = st.items.length;
  const score = st.correct;
  const ratio = total ? score / total : 0;
  setProgress(100);
  if (ratio >= 0.7) completeLesson();
  award(score * 3, score);
  checkBadges();
  if (ratio >= 0.7) { sfx.win(); burstConfetti(); }
  const mode = current.mode;
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${ratio === 1 ? "🏆" : ratio >= 0.7 ? "✨" : "💪"}</div>
      <h3>${score} / ${total} ${st.meta.unit} richtig</h3>
      <p><em>${ratio === 1 ? "Perfetto!" : ratio >= 0.7 ? "Bravo!" : "Nochmal üben lohnt sich!"}</em></p>
      <div class="done-actions">
        ${nextStepHtml()}
        <button class="btn btn-ghost" id="retryChoice">↻ Nochmal</button>
        ${otherModesHtml(mode)}
        <button class="btn btn-ghost" id="choiceHome">🏠 Startseite</button>
      </div>
    </div>`;
  wireNextStep(body);
  $("#retryChoice").addEventListener("click", () => setMode(mode));
  $("#choiceHome").addEventListener("click", goHome);
  wireOtherModes(body);
  renderHome();
}
