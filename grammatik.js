/* =========================================================
   Impariamo! — Grammatik-Übungen (Aufgaben-Erzeuger)
   Reine Funktionen ohne DOM, deterministisch (kein Zufall beim
   Laden). Lädt VOR data.js: buildLessons() hängt die Aufgaben als
   lesson.drills an. Anzeige: modus-auswahl.js.

   Eine Aufgabe (ChoiceItem):
     { prompt?: string   Satz der Lernsprache mit "___" als Lücke
       ask?:    string   ODER eine deutsche Frage (ohne Lücke)
       hint?:   string   deutsche Hilfe (Übersetzung)
       answer:  string   richtige Antwort (kommt in options vor)
       options: string[] Antwortmöglichkeiten
       explain?: string  kurze Regel nach dem Antworten
       say?:    string   wird nach dem Antworten vorgelesen }
   ========================================================= */

const MIN_DRILL_ITEMS = 3;   // weniger Aufgaben → Übung erscheint nicht

/* Regeln je Lernsprache. Fehlt eine Sprache, bekommt sie (noch) keine
   Artikel-/Präpositions-Übungen. */
const GRAMMAR_RULES = {
  it: {
    articles: ["il", "lo", "la", "l'", "i", "gli", "le"],
    articleExplain: {
      "il": "il = maskulin Singular vor Konsonant",
      "lo": "lo = maskulin vor s+Konsonant, z, gn, ps, x, y",
      "la": "la = feminin Singular vor Konsonant",
      "l'": "l' = Singular vor Vokal (maskulin & feminin)",
      "i": "i = maskulin Plural vor Konsonant",
      "gli": "gli = maskulin Plural vor Vokal, s+Konsonant, z, gn, ps",
      "le": "le = feminin Plural"
    },
    prepositions: {
      "di": "di = von / aus (Herkunft, Besitz)", "a": "a = zu / nach / in (Städte), um (Uhrzeit)",
      "da": "da = von / seit / bei (jemandem)", "in": "in = in / nach (Länder, Regionen)",
      "con": "con = mit", "su": "su = auf / über", "per": "per = für / durch / um zu",
      "tra": "tra = zwischen / in (zeitlich)", "fra": "fra = zwischen / in (zeitlich)"
    },
    // gleichwertige Formen: nie als „falsche" Antwort anbieten
    synonyms: { "tra": ["fra"], "fra": ["tra"] },
    // verschmolzene Präpositionen: Form → Bestandteile
    articulated: {
      "al": "a + il", "allo": "a + lo", "alla": "a + la", "ai": "a + i", "agli": "a + gli", "alle": "a + le",
      "del": "di + il", "dello": "di + lo", "della": "di + la", "dei": "di + i", "degli": "di + gli", "delle": "di + le",
      "dal": "da + il", "dallo": "da + lo", "dalla": "da + la", "dai": "da + i", "dagli": "da + gli", "dalle": "da + le",
      "nel": "in + il", "nello": "in + lo", "nella": "in + la", "nei": "in + i", "negli": "in + gli", "nelle": "in + le",
      "sul": "su + il", "sullo": "su + lo", "sulla": "su + la", "sui": "su + i", "sugli": "su + gli", "sulle": "su + le"
    }
  }
};

/* Einfacher, stabiler Zahlenwert eines Texts — für deterministische Ablenker */
function stableHash(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.codePointAt(0)) >>> 0;
  return h;
}

/* `count` Ablenker aus `pool` (ohne `answer`), deterministisch je `seed` */
function pickDistractors(pool, answer, count, seed) {
  const others = [...new Set(pool)].filter((x) => x !== answer);
  const start = others.length ? stableHash(seed) % others.length : 0;
  return others.slice(start).concat(others.slice(0, start)).slice(0, count);
}

/* Satz mit Lücke an Token-Position `index` (Satzzeichen des Tokens bleiben stehen) */
function blankToken(tokens, index, bare) {
  return tokens.map((t, i) => (i === index ? t.replace(new RegExp(escapeRegExp(bare), "i"), "___") : t)).join(" ");
}
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

/* 🔤 Artikel: „la pizza" → „___ pizza" (Wahl aus allen bestimmten Artikeln) */
function articleDrill(words, rules) {
  const items = [];
  words.forEach((w) => {
    const m = /^(il|lo|la|i|gli|le)\s+(\S+)$/i.exec(w.it.trim()) || /^(l)['’](\S+)$/i.exec(w.it.trim());
    if (!m) return;
    const article = m[1].toLowerCase() === "l" ? "l'" : m[1].toLowerCase();
    const noun = m[2];
    items.push({
      prompt: article === "l'" ? `___${noun}` : `___ ${noun}`,
      hint: w.de,
      answer: article,
      options: rules.articles.slice(),
      explain: rules.articleExplain[article],
      say: w.it
    });
  });
  return items;
}

/* 🔗 Präposition: erste (bevorzugt verschmolzene) Präposition im Beispielsatz wird zur Lücke */
function prepDrill(words, rules) {
  const simple = Object.keys(rules.prepositions);
  const articulated = Object.keys(rules.articulated);
  const seen = new Set();
  const items = [];
  words.forEach((w) => {
    if (!w.ex || seen.has(w.ex)) return;
    seen.add(w.ex);
    const tokens = w.ex.trim().split(/\s+/);
    const bare = tokens.map((t) => glossKey(t));
    let index = bare.findIndex((b) => articulated.includes(b));
    if (index < 0) index = bare.findIndex((b) => simple.includes(b));
    if (index < 0) return;
    const answer = bare[index];
    const isArt = articulated.includes(answer);
    // je Synonym-Gruppe nur EINE Form, und nie eine, die der Antwort gleichwertig ist
    const pool = [];
    (isArt ? articulated : simple).forEach((p) => {
      const syn = (rules.synonyms || {})[p] || [];
      if (syn.includes(answer)) return;
      if (p !== answer && syn.some((s) => pool.includes(s))) return;
      pool.push(p);
    });
    items.push({
      prompt: blankToken(tokens, index, answer),
      hint: w.exDe,
      answer,
      options: [answer, ...pickDistractors(pool, answer, 3, w.ex)],
      explain: isArt ? `${answer} = ${rules.articulated[answer]}` : rules.prepositions[answer],
      say: w.ex
    });
  });
  return items;
}

/* 📐 Regel anwenden (Grammatik-Themen): das Grammatikwort fehlt im Beispielsatz.
   `themeWords` = alle Wörter des Themas (Ablenker). Drei Formen:
     „libro → libri"      → „libro → ___"
     „non ... mai"        → zweiter Teil wird Lücke im Beispielsatz
     „il", „c'è", „il mio" → Wort/Wendung wird Lücke im Beispielsatz */
function ruleDrill(words, themeWords) {
  const shape = (w) => {
    const it = w.it.trim();
    if (it.includes("→")) {
      const [from, to] = it.split("→").map((s) => s.trim());
      return from && to ? { kind: "arrow", from, key: to } : null;
    }
    const parts = it.split(/\s*(?:\.\.\.|…)\s*/).map((s) => s.trim()).filter(Boolean);
    if (parts.length === 2) return { kind: "pattern", first: parts[0], key: parts[1].replace(/[?!.]+$/, "") };
    if (parts.length === 1) return { kind: "plain", key: parts[0].replace(/[?!.]+$/, "") };
    return null;
  };
  const wordCount = (s) => s.split(/\s+/).length;
  const elided = (s) => /'\p{L}/u.test(s);          // „l'orologio", „un'ora"
  // Ablenker: gleiche Form, gleiche Wortzahl, gleiche Bauart („a" nie gegen „andare a piedi",
  // „gli" nie gegen „l'orologio")
  const poolOf = (kind, answer) => themeWords.map(shape)
    .filter((s) => s && s.kind === kind && wordCount(s.key) === wordCount(answer) && elided(s.key) === elided(answer))
    .map((s) => s.key.toLowerCase());

  const items = [];
  words.forEach((w) => {
    const s = shape(w);
    if (!s) return;
    const answer = s.key.toLowerCase();
    const base = { hint: w.exDe || w.de, answer, options: [answer, ...pickDistractors(poolOf(s.kind, answer), answer, 3, w.it)], explain: w.de, say: w.ex };
    if (s.kind === "arrow") { items.push({ ...base, prompt: `${s.from} → ___`, hint: w.de, say: s.key }); return; }
    const at = findPhrase(w.ex || "", s.key);
    if (at < 0) return;
    if (s.kind === "pattern" && findPhrase(w.ex.slice(0, at), s.first) < 0) return;
    items.push({ ...base, prompt: w.ex.slice(0, at) + "___" + w.ex.slice(at + s.key.length) });
  });
  return items.filter((it) => it.options.length >= 3);   // mind. 2 sinnvolle Ablenker
}

/* Position einer Wendung als ganzes Wort (Groß/klein egal); -1 wenn nicht enthalten.
   Endet sie auf Apostroph („l'", „un'"), darf direkt ein Buchstabe folgen. */
function findPhrase(sentence, phrase) {
  const p = phrase.replace(/’/g, "'");
  const tail = p.endsWith("'") ? "(?=\\p{L})" : "(?=$|[\\s.,!?;:\"»)…])";
  const m = new RegExp(`(^|[\\s"'«(¿¡])(${escapeRegExp(p)})${tail}`, "iu").exec(sentence.replace(/’/g, "'"));
  return m ? m.index + m[1].length : -1;
}
