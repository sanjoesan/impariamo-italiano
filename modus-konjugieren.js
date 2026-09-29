/* =========================================================
   Impariamo! — Modus „⏳ Konjugieren" (Zeiten-Etappen im Lernpfad):
   Person + Infinitiv → Verbform tippen. Aufgaben: lesson.drills.conj
   (conjDrill in grammatik.js). Lädt NACH app.js.
   ========================================================= */
registerMode("conj", "⏳ Konjugieren", () => startConjDrill(current.lesson.drills.conj));

let conjDrillState = null;

function startConjDrill(items) {
  conjDrillState = { items: shuffle(items || []), pos: 0, correct: 0, answered: false };
  showConjDrill();
}

function showConjDrill() {
  const st = conjDrillState;
  if (st.pos >= st.items.length) return finishConjDrill();
  st.answered = false;
  const item = st.items[st.pos];
  setProgress(Math.round((st.pos / st.items.length) * 100));
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="conj-practice">
      <div class="conj-prompt">
        <span class="cp-label">Konjugieren · ${st.pos + 1}/${st.items.length}</span>
        <div class="cp-cue"><b>${item.cue}</b> … (${item.verb})</div>
        <div class="cp-hint">${item.hint}</div>
        <input type="text" class="conj-input" id="conjDrillInput"
               placeholder="Verbform eingeben" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" />
        <div class="conj-solution" id="conjDrillSolution"></div>
      </div>
      <div class="listen-actions">
        <button class="btn btn-ghost" id="conjDrillReveal">🙈 Lösung</button>
        <button class="btn btn-primary" id="conjDrillCheck">Prüfen ✓</button>
      </div>
    </div>`;
  const inp = $("#conjDrillInput");
  inp.addEventListener("keydown", (e) => { if (e.key === "Enter") checkConjDrill(); });
  inp.focus();
  $("#conjDrillCheck").addEventListener("click", checkConjDrill);
  $("#conjDrillReveal").addEventListener("click", revealConjDrill);
}

function checkConjDrill() {
  const st = conjDrillState;
  if (st.answered) { st.pos++; showConjDrill(); return; }
  const inp = $("#conjDrillInput");
  if (!inp.value.trim()) { inp.focus(); return; }
  const item = st.items[st.pos];
  const ok = normalizeText(inp.value) === normalizeText(item.answer);
  if (ok) { st.correct++; award(6, 2); sfx.correct(); } else sfx.wrong();
  inp.classList.add(ok ? "correct" : "wrong");
  endConjQuestion(ok ? `✅ <span style="color:var(--olive)">Esatto! ${item.answer}</span>`
                     : `❌ Richtig: <span style="color:var(--terracotta-d)">${item.answer}</span>`);
}

function revealConjDrill() {
  const st = conjDrillState;
  if (st.answered) return;
  $("#conjDrillInput").value = st.items[st.pos].answer;
  endConjQuestion(`👀 <span style="color:var(--terracotta-d)">${st.items[st.pos].answer}</span>`);
}

/* gemeinsamer Abschluss einer Frage (Prüfen & Lösung zeigen) */
function endConjQuestion(solutionHtml) {
  const st = conjDrillState;
  st.answered = true;
  $("#conjDrillInput").disabled = true;
  $("#conjDrillSolution").innerHTML = solutionHtml;
  speak(st.items[st.pos].say);
  $("#conjDrillCheck").textContent = st.pos >= st.items.length - 1 ? "Fertig 🏁" : "Weiter ›";
}

function finishConjDrill() {
  const st = conjDrillState;
  const total = st.items.length;
  const score = st.correct;
  const ratio = total ? score / total : 0;
  setProgress(100);
  if (ratio >= 0.7) completeLesson();
  award(score * 3, score);
  checkBadges();
  if (ratio >= 0.7) { sfx.win(); burstConfetti(); }
  const body = $("#lessonBody");
  body.innerHTML = `
    <div class="done-screen">
      <div class="done-emoji">${ratio === 1 ? "🏆" : ratio >= 0.7 ? "⏳✨" : "💪"}</div>
      <h3>${score} / ${total} Formen richtig</h3>
      <p><em>${ratio === 1 ? "Perfetto!" : ratio >= 0.7 ? "Bravo!" : "Nochmal üben lohnt sich!"}</em></p>
      <div class="done-actions">
        ${nextStepHtml()}
        <button class="btn btn-ghost" id="retryConjDrill">↻ Nochmal</button>
        ${otherModesHtml("conj")}
        <button class="btn btn-ghost" id="conjDrillHome">🏠 Startseite</button>
      </div>
    </div>`;
  wireNextStep(body);
  $("#retryConjDrill").addEventListener("click", () => setMode("conj"));
  $("#conjDrillHome").addEventListener("click", goHome);
  wireOtherModes(body);
  renderHome();
}
