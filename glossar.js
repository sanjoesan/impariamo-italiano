/* =========================================================
   Impariamo! — Glossar: Übersetzung EINZELNER Satzwörter
   Reine Logik ohne DOM (auch in Node testbar). Quellen in dieser
   Priorität: KLEINWOERTER (kuratiert) → Wortschatz der Lektionen →
   Verbformen des Konjugations-Trainers. Oberfläche: wortinfo.js.
   ========================================================= */

/* Wortform vereinheitlichen: klein, typografischer Apostroph → ', Satzzeichen außen weg */
function glossKey(token) {
  return (token || "").toLowerCase().normalize("NFC").replace(/’/g, "'")
    .replace(/^[¿¡"'«»“„(\[]+/, "").replace(/[.,!?;:"»«”“)\]…]+$/, "");
}

/* Nur einzelne Wörter kommen ins Glossar (Mehrwort-Einträge passen nie auf ein Satzwort) */
function isSingleWord(key) {
  return /^[\p{L}'-]+$/u.test(key);
}

class WordGlossary {
  /**
   * @param {{it: string, de: string}[]} words  Wortschatz des Kurses (it = Lernsprache)
   * @param {{forms: Object<string, string[]>, formsDe: Object<string, string[]>}[]} conjugations
   * @param {Object<string, string>} smallWords  kuratierte Kleinwörter (Vorrang)
   * @param {string[]} articles  Artikel, die vor Wortschatz-Einträgen stehen
   */
  constructor(words, conjugations, smallWords, articles) {
    /** @type {Map<string, string[]>} Schlüssel → Übersetzungen in Prioritäts-Reihenfolge */
    this._map = new Map();
    this._articles = articles || [];
    Object.entries(smallWords || {}).forEach(([k, de]) => this._add(glossKey(k), de));
    (words || []).forEach((w) => this._add(this._stripArticle(glossKey(w.it)), w.de));
    (conjugations || []).forEach((v) => Object.keys(v.forms || {}).forEach((tense) =>
      (v.forms[tense] || []).forEach((form, i) => this._add(glossKey(form), ((v.formsDe || {})[tense] || [])[i]))));
  }

  _stripArticle(key) {
    for (const a of this._articles) {
      if (a.endsWith("'") ? key.startsWith(a) && key.length > a.length : key.startsWith(a + " ")) {
        return key.slice(a.length).trim();
      }
    }
    return key;
  }

  _add(key, de) {
    if (!key || !de || !isSingleWord(key)) return;
    const list = this._map.get(key) || [];
    // schon bekannt (auch ohne Artikel / als Teil von „a / b")? → nicht doppelt zeigen
    const core = (s) => s.trim().toLowerCase().replace(/^(der|die|das|den|dem|ein|eine)\s+/, "");
    const known = list.flatMap((x) => x.split(" / ")).map(core);
    if (!known.includes(core(de))) list.push(de);
    this._map.set(key, list);
  }

  /** Übersetzungen eines Satzworts (höchstens 3) — leer, wenn unbekannt.
      „l'acqua" / „dell'anno" / „qu'il": sonst wird der Teil nach dem Apostroph gesucht. */
  lookup(token) {
    const key = glossKey(token);
    const hit = this._map.get(key) || this._map.get(key.slice(key.lastIndexOf("'") + 1));
    return hit ? hit.slice(0, 3) : [];
  }
}

/* Glossar des AKTIVEN Kurses (CORPUS/CONJUGATIONS gehören zu LANG_ACTIVE, siehe selectCourse).
   Grammatik-Themen bleiben draußen: ihr „de" erklärt eine Regel, statt zu übersetzen. */
function glossaryForActiveCourse() {
  return new WordGlossary(
    CORPUS.filter((t) => !t.grammar).flatMap((t) => Object.values(t.levels || {}).flat()),
    CONJUGATIONS,
    KLEINWOERTER[LANG_ACTIVE],
    ARTIKEL[LANG_ACTIVE]
  );
}
