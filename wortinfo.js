/* =========================================================
   Impariamo! — Wort-Info: Satzwörter anklicken → kleines Feld
   mit der Übersetzung des einzelnen Worts (Daten: glossar.js).
   Übungsmodi rufen nur glossSentenceHtml()/glossWordHtml() auf;
   Klicks laufen über EINEN Listener (Event-Delegation).
   ========================================================= */

/* Glossar je Kurs nur einmal bauen */
const glossaryCache = new Map();
function activeGlossary() {
  if (!glossaryCache.has(LANG_ACTIVE)) glossaryCache.set(LANG_ACTIVE, glossaryForActiveCourse());
  return glossaryCache.get(LANG_ACTIVE);
}

/* Ein Satzwort als anklickbares Element */
function glossWordHtml(token) {
  return `<span class="gw">${token}</span>`;
}
/* Ganzer Satz: jedes Wort anklickbar */
function glossSentenceHtml(sentence) {
  return (sentence || "").trim().split(/\s+/).filter(Boolean).map(glossWordHtml).join(" ");
}

/* Das Feld lebt in #lessonBody → verschwindet mit jedem Neu-Rendern der Übung von selbst */
function showWordInfo(wordEl) {
  hideWordInfo();
  const host = document.getElementById("lessonBody");
  if (!host) return;
  const tr = activeGlossary().lookup(wordEl.textContent);
  const box = document.createElement("div");
  box.className = "word-info";
  box.id = "wordInfo";
  box.innerHTML = `<b>${glossKey(wordEl.textContent)}</b>` +
    (tr.length ? `<span>${tr.join(" · ")}</span>` : `<span class="wi-none">keine Einzelübersetzung</span>`);
  host.appendChild(box);
  wordEl.classList.add("gw-active");

  // über dem Wort zentrieren, aber nicht seitlich aus #lessonBody hinaus
  const h = host.getBoundingClientRect();
  const r = wordEl.getBoundingClientRect();
  const half = box.offsetWidth / 2;
  const x = Math.min(Math.max(r.left - h.left + r.width / 2, half), h.width - half);
  box.style.left = `${x}px`;
  box.style.top = `${r.top - h.top}px`;
}

function hideWordInfo() {
  const box = document.getElementById("wordInfo");
  if (box) box.remove();
  document.querySelectorAll(".gw-active").forEach((el) => el.classList.remove("gw-active"));
}

/* Capture-Phase: ein Wort-Klick erreicht die Übung nicht (z. B. dreht die Lernkarte nicht um) */
document.addEventListener("click", (e) => {
  const word = e.target.closest && e.target.closest(".gw");
  if (!word) { hideWordInfo(); return; }
  e.stopPropagation();
  if (word.classList.contains("gw-active")) hideWordInfo();
  else showWordInfo(word);
}, true);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") hideWordInfo(); });
