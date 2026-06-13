/* =========================================================
   Impariamo! — Vokabeldaten (Italienisch → Deutsch)
   Jede Vokabel: it = italienisch, de = deutsch, emoji,
   ex = Beispielsatz (it), exDe = Übersetzung (de)
   ========================================================= */
const LESSONS = [
  {
    id: "saluti",
    title: "Saluti & Cortesia",
    de: "Begrüßung & Höflichkeit",
    emoji: "👋",
    color: "#c75b39",
    words: [
      { it: "Ciao", de: "Hallo / Tschüss", emoji: "👋", ex: "Ciao, come stai?", exDe: "Hallo, wie geht's dir?" },
      { it: "Buongiorno", de: "Guten Morgen", emoji: "☀️", ex: "Buongiorno a tutti!", exDe: "Guten Morgen zusammen!" },
      { it: "Buonasera", de: "Guten Abend", emoji: "🌆", ex: "Buonasera, signora.", exDe: "Guten Abend, gnädige Frau." },
      { it: "Buonanotte", de: "Gute Nacht", emoji: "🌙", ex: "Buonanotte e sogni d'oro.", exDe: "Gute Nacht und süße Träume." },
      { it: "Arrivederci", de: "Auf Wiedersehen", emoji: "🤝", ex: "Arrivederci, a presto!", exDe: "Auf Wiedersehen, bis bald!" },
      { it: "Grazie", de: "Danke", emoji: "🙏", ex: "Grazie mille!", exDe: "Vielen Dank!" },
      { it: "Prego", de: "Bitte (gern geschehen)", emoji: "😊", ex: "Prego, si figuri.", exDe: "Bitte, keine Ursache." },
      { it: "Per favore", de: "Bitte (Aufforderung)", emoji: "🤲", ex: "Un caffè, per favore.", exDe: "Einen Kaffee, bitte." },
      { it: "Scusi", de: "Entschuldigung", emoji: "🙇", ex: "Scusi, dov'è il bagno?", exDe: "Entschuldigung, wo ist die Toilette?" },
      { it: "Come stai?", de: "Wie geht es dir?", emoji: "🤔", ex: "Ciao, come stai oggi?", exDe: "Hallo, wie geht es dir heute?" }
    ]
  },
  {
    id: "numeri",
    title: "I Numeri",
    de: "Die Zahlen",
    emoji: "🔢",
    color: "#2e7d6f",
    words: [
      { it: "Uno", de: "Eins", emoji: "1️⃣", ex: "Vorrei un gelato.", exDe: "Ich möchte ein Eis." },
      { it: "Due", de: "Zwei", emoji: "2️⃣", ex: "Due caffè, per favore.", exDe: "Zwei Kaffee, bitte." },
      { it: "Tre", de: "Drei", emoji: "3️⃣", ex: "Ho tre fratelli.", exDe: "Ich habe drei Geschwister." },
      { it: "Quattro", de: "Vier", emoji: "4️⃣", ex: "Sono le quattro.", exDe: "Es ist vier Uhr." },
      { it: "Cinque", de: "Fünf", emoji: "5️⃣", ex: "Cinque euro, grazie.", exDe: "Fünf Euro, danke." },
      { it: "Sei", de: "Sechs", emoji: "6️⃣", ex: "Apriamo alle sei.", exDe: "Wir öffnen um sechs." },
      { it: "Sette", de: "Sieben", emoji: "7️⃣", ex: "Sette giorni a settimana.", exDe: "Sieben Tage die Woche." },
      { it: "Otto", de: "Acht", emoji: "8️⃣", ex: "Il treno delle otto.", exDe: "Der Acht-Uhr-Zug." },
      { it: "Nove", de: "Neun", emoji: "9️⃣", ex: "Ho nove anni.", exDe: "Ich bin neun Jahre alt." },
      { it: "Dieci", de: "Zehn", emoji: "🔟", ex: "Dieci e lode!", exDe: "Zehn mit Auszeichnung!" }
    ]
  },
  {
    id: "cibo",
    title: "Cibo & Bevande",
    de: "Essen & Trinken",
    emoji: "🍝",
    color: "#b8442e",
    words: [
      { it: "La pizza", de: "die Pizza", emoji: "🍕", ex: "Una pizza margherita, per favore.", exDe: "Eine Pizza Margherita, bitte." },
      { it: "La pasta", de: "die Nudeln", emoji: "🍝", ex: "La pasta è al dente.", exDe: "Die Nudeln sind bissfest." },
      { it: "Il gelato", de: "das Eis", emoji: "🍨", ex: "Un gelato al pistacchio.", exDe: "Ein Pistazieneis." },
      { it: "Il caffè", de: "der Kaffee", emoji: "☕", ex: "Un caffè ristretto, grazie.", exDe: "Einen Espresso, danke." },
      { it: "Il vino", de: "der Wein", emoji: "🍷", ex: "Un bicchiere di vino rosso.", exDe: "Ein Glas Rotwein." },
      { it: "Il pane", de: "das Brot", emoji: "🍞", ex: "Il pane è fresco.", exDe: "Das Brot ist frisch." },
      { it: "Il formaggio", de: "der Käse", emoji: "🧀", ex: "Amo il formaggio italiano.", exDe: "Ich liebe italienischen Käse." },
      { it: "La frutta", de: "das Obst", emoji: "🍎", ex: "La frutta è di stagione.", exDe: "Das Obst ist saisonal." },
      { it: "L'acqua", de: "das Wasser", emoji: "💧", ex: "Acqua naturale, per favore.", exDe: "Stilles Wasser, bitte." },
      { it: "Il pesce", de: "der Fisch", emoji: "🐟", ex: "Il pesce è freschissimo.", exDe: "Der Fisch ist ganz frisch." }
    ]
  },
  {
    id: "viaggio",
    title: "Il Viaggio",
    de: "Die Reise",
    emoji: "🧳",
    color: "#5a7d9b",
    words: [
      { it: "Il treno", de: "der Zug", emoji: "🚆", ex: "Il treno è in ritardo.", exDe: "Der Zug hat Verspätung." },
      { it: "La stazione", de: "der Bahnhof", emoji: "🚉", ex: "Dov'è la stazione?", exDe: "Wo ist der Bahnhof?" },
      { it: "L'albergo", de: "das Hotel", emoji: "🏨", ex: "L'albergo è vicino al mare.", exDe: "Das Hotel ist nah am Meer." },
      { it: "Il biglietto", de: "das Ticket", emoji: "🎫", ex: "Un biglietto per Roma.", exDe: "Ein Ticket nach Rom." },
      { it: "La spiaggia", de: "der Strand", emoji: "🏖️", ex: "Andiamo in spiaggia!", exDe: "Lass uns an den Strand gehen!" },
      { it: "Il mare", de: "das Meer", emoji: "🌊", ex: "Il mare è calmo oggi.", exDe: "Das Meer ist heute ruhig." },
      { it: "La valigia", de: "der Koffer", emoji: "🧳", ex: "La valigia è pesante.", exDe: "Der Koffer ist schwer." },
      { it: "La mappa", de: "die Karte", emoji: "🗺️", ex: "Guardo la mappa.", exDe: "Ich schaue auf die Karte." },
      { it: "Il passaporto", de: "der Reisepass", emoji: "🛂", ex: "Ecco il mio passaporto.", exDe: "Hier ist mein Reisepass." },
      { it: "La macchina", de: "das Auto", emoji: "🚗", ex: "Noleggiamo una macchina.", exDe: "Wir mieten ein Auto." }
    ]
  },
  {
    id: "famiglia",
    title: "La Famiglia",
    de: "Die Familie",
    emoji: "👨‍👩‍👧‍👦",
    color: "#a0568a",
    words: [
      { it: "La mamma", de: "die Mama", emoji: "👩", ex: "La mamma cucina bene.", exDe: "Die Mama kocht gut." },
      { it: "Il papà", de: "der Papa", emoji: "👨", ex: "Il papà legge il giornale.", exDe: "Der Papa liest die Zeitung." },
      { it: "Il fratello", de: "der Bruder", emoji: "👦", ex: "Mio fratello è alto.", exDe: "Mein Bruder ist groß." },
      { it: "La sorella", de: "die Schwester", emoji: "👧", ex: "Ho una sorella piccola.", exDe: "Ich habe eine kleine Schwester." },
      { it: "Il nonno", de: "der Opa", emoji: "👴", ex: "Il nonno racconta storie.", exDe: "Der Opa erzählt Geschichten." },
      { it: "La nonna", de: "die Oma", emoji: "👵", ex: "La nonna fa la pasta.", exDe: "Die Oma macht die Pasta." },
      { it: "Il figlio", de: "der Sohn", emoji: "👶", ex: "Loro hanno un figlio.", exDe: "Sie haben einen Sohn." },
      { it: "La figlia", de: "die Tochter", emoji: "🧒", ex: "La figlia studia musica.", exDe: "Die Tochter studiert Musik." },
      { it: "Il marito", de: "der Ehemann", emoji: "🤵", ex: "Mio marito è simpatico.", exDe: "Mein Mann ist sympathisch." },
      { it: "La moglie", de: "die Ehefrau", emoji: "👰", ex: "Sua moglie è italiana.", exDe: "Seine Frau ist Italienerin." }
    ]
  },
  {
    id: "colori",
    title: "I Colori",
    de: "Die Farben",
    emoji: "🎨",
    color: "#d4922a",
    words: [
      { it: "Rosso", de: "rot", emoji: "🔴", ex: "Una mela rossa.", exDe: "Ein roter Apfel." },
      { it: "Blu", de: "blau", emoji: "🔵", ex: "Il cielo è blu.", exDe: "Der Himmel ist blau." },
      { it: "Verde", de: "grün", emoji: "🟢", ex: "Le colline sono verdi.", exDe: "Die Hügel sind grün." },
      { it: "Giallo", de: "gelb", emoji: "🟡", ex: "Il limone è giallo.", exDe: "Die Zitrone ist gelb." },
      { it: "Bianco", de: "weiß", emoji: "⚪", ex: "Vino bianco, per favore.", exDe: "Weißwein, bitte." },
      { it: "Nero", de: "schwarz", emoji: "⚫", ex: "Un caffè nero.", exDe: "Ein schwarzer Kaffee." },
      { it: "Arancione", de: "orange", emoji: "🟠", ex: "Un tramonto arancione.", exDe: "Ein orangefarbener Sonnenuntergang." },
      { it: "Rosa", de: "rosa", emoji: "🌸", ex: "Fiori rosa in giardino.", exDe: "Rosa Blumen im Garten." },
      { it: "Marrone", de: "braun", emoji: "🟤", ex: "Gli occhi marroni.", exDe: "Die braunen Augen." },
      { it: "Viola", de: "violett", emoji: "🟣", ex: "Un vestito viola.", exDe: "Ein violettes Kleid." }
    ]
  },
  {
    id: "tempo",
    title: "Giorni & Tempo",
    de: "Tage & Zeit",
    emoji: "📅",
    color: "#6b7a3f",
    words: [
      { it: "Lunedì", de: "Montag", emoji: "📅", ex: "Lunedì lavoro.", exDe: "Am Montag arbeite ich." },
      { it: "Martedì", de: "Dienstag", emoji: "📆", ex: "Martedì ho lezione.", exDe: "Am Dienstag habe ich Unterricht." },
      { it: "Mercoledì", de: "Mittwoch", emoji: "🗓️", ex: "Mercoledì sera esco.", exDe: "Mittwochabend gehe ich aus." },
      { it: "Giovedì", de: "Donnerstag", emoji: "📅", ex: "Giovedì è mercato.", exDe: "Donnerstag ist Markt." },
      { it: "Venerdì", de: "Freitag", emoji: "🎉", ex: "Finalmente venerdì!", exDe: "Endlich Freitag!" },
      { it: "Sabato", de: "Samstag", emoji: "🛍️", ex: "Sabato vado al mare.", exDe: "Samstag fahre ich ans Meer." },
      { it: "Domenica", de: "Sonntag", emoji: "⛪", ex: "Domenica si riposa.", exDe: "Sonntag ruht man sich aus." },
      { it: "Oggi", de: "heute", emoji: "📍", ex: "Oggi fa bel tempo.", exDe: "Heute ist schönes Wetter." },
      { it: "Domani", de: "morgen", emoji: "➡️", ex: "A domani!", exDe: "Bis morgen!" },
      { it: "Ieri", de: "gestern", emoji: "⬅️", ex: "Ieri ho dormito tanto.", exDe: "Gestern habe ich viel geschlafen." }
    ]
  },
  {
    id: "citta",
    title: "In Città",
    de: "In der Stadt",
    emoji: "🏛️",
    color: "#9b6b3f",
    words: [
      { it: "La piazza", de: "der Platz", emoji: "⛲", ex: "Ci vediamo in piazza.", exDe: "Wir treffen uns auf dem Platz." },
      { it: "La chiesa", de: "die Kirche", emoji: "⛪", ex: "La chiesa è antica.", exDe: "Die Kirche ist alt." },
      { it: "Il museo", de: "das Museum", emoji: "🏛️", ex: "Visitiamo il museo.", exDe: "Wir besuchen das Museum." },
      { it: "Il mercato", de: "der Markt", emoji: "🧺", ex: "Il mercato è la mattina.", exDe: "Der Markt ist am Morgen." },
      { it: "La strada", de: "die Straße", emoji: "🛣️", ex: "Attraversa la strada.", exDe: "Überquere die Straße." },
      { it: "Il ponte", de: "die Brücke", emoji: "🌉", ex: "Il ponte è romantico.", exDe: "Die Brücke ist romantisch." },
      { it: "La fontana", de: "der Brunnen", emoji: "⛲", ex: "La fontana di Trevi.", exDe: "Der Trevi-Brunnen." },
      { it: "Il negozio", de: "das Geschäft", emoji: "🏪", ex: "Il negozio è chiuso.", exDe: "Das Geschäft ist geschlossen." },
      { it: "La banca", de: "die Bank", emoji: "🏦", ex: "Dov'è la banca?", exDe: "Wo ist die Bank?" },
      { it: "Il ristorante", de: "das Restaurant", emoji: "🍽️", ex: "Un buon ristorante.", exDe: "Ein gutes Restaurant." }
    ]
  },
  {
    id: "frasi",
    title: "Frasi Utili",
    de: "Nützliche Sätze",
    emoji: "💬",
    color: "#3f7d8a",
    words: [
      { it: "Mi chiamo...", de: "Ich heiße...", emoji: "🙋", ex: "Mi chiamo Marco.", exDe: "Ich heiße Marco." },
      { it: "Non capisco", de: "Ich verstehe nicht", emoji: "🤷", ex: "Scusi, non capisco.", exDe: "Entschuldigung, ich verstehe nicht." },
      { it: "Parli inglese?", de: "Sprichst du Englisch?", emoji: "🗣️", ex: "Parli inglese, per favore?", exDe: "Sprichst du bitte Englisch?" },
      { it: "Quanto costa?", de: "Wie viel kostet das?", emoji: "💰", ex: "Quanto costa questo?", exDe: "Wie viel kostet das hier?" },
      { it: "Dov'è...?", de: "Wo ist...?", emoji: "📍", ex: "Dov'è la stazione?", exDe: "Wo ist der Bahnhof?" },
      { it: "Vorrei...", de: "Ich möchte...", emoji: "🙏", ex: "Vorrei un caffè.", exDe: "Ich möchte einen Kaffee." },
      { it: "Aiuto!", de: "Hilfe!", emoji: "🆘", ex: "Aiuto, per favore!", exDe: "Hilfe, bitte!" },
      { it: "Va bene", de: "In Ordnung / Okay", emoji: "👍", ex: "Va bene, grazie.", exDe: "In Ordnung, danke." },
      { it: "Non lo so", de: "Ich weiß es nicht", emoji: "🤔", ex: "Mi dispiace, non lo so.", exDe: "Tut mir leid, ich weiß es nicht." },
      { it: "A che ora?", de: "Um wie viel Uhr?", emoji: "⏰", ex: "A che ora parte il treno?", exDe: "Um wie viel Uhr fährt der Zug?" }
    ]
  },
  {
    id: "ristorante",
    title: "Al Ristorante",
    de: "Im Restaurant",
    emoji: "🍷",
    color: "#8a2e3b",
    words: [
      { it: "Il menu", de: "die Speisekarte", emoji: "📋", ex: "Il menu, per favore.", exDe: "Die Speisekarte, bitte." },
      { it: "Il cameriere", de: "der Kellner", emoji: "🧑‍🍳", ex: "Il cameriere è gentile.", exDe: "Der Kellner ist freundlich." },
      { it: "Il conto", de: "die Rechnung", emoji: "🧾", ex: "Il conto, per favore.", exDe: "Die Rechnung, bitte." },
      { it: "Il tavolo", de: "der Tisch", emoji: "🍽️", ex: "Un tavolo per due.", exDe: "Ein Tisch für zwei." },
      { it: "L'antipasto", de: "die Vorspeise", emoji: "🥗", ex: "Un antipasto misto.", exDe: "Eine gemischte Vorspeise." },
      { it: "Il primo", de: "der erste Gang", emoji: "🍝", ex: "Per primo, gli spaghetti.", exDe: "Als ersten Gang die Spaghetti." },
      { it: "Il secondo", de: "der Hauptgang", emoji: "🍖", ex: "Per secondo, il pesce.", exDe: "Als Hauptgang den Fisch." },
      { it: "Il dolce", de: "die Nachspeise", emoji: "🍰", ex: "Un dolce della casa.", exDe: "Eine hausgemachte Nachspeise." },
      { it: "La mancia", de: "das Trinkgeld", emoji: "💶", ex: "Lasciamo la mancia.", exDe: "Wir geben Trinkgeld." },
      { it: "Buon appetito!", de: "Guten Appetit!", emoji: "😋", ex: "Buon appetito a tutti!", exDe: "Guten Appetit allerseits!" }
    ]
  }
];

/* Abzeichen-Definitionen — werden in app.js ausgewertet */
const BADGES = [
  { id: "primo",     emoji: "🌱", name: "Primo Passo",    desc: "Erste Lektion abgeschlossen" },
  { id: "studioso",  emoji: "📚", name: "Studioso",        desc: "5 Lektionen abgeschlossen" },
  { id: "maestro",   emoji: "🎓", name: "Maestro",         desc: "Alle Lektionen abgeschlossen" },
  { id: "perfetto",  emoji: "💯", name: "Perfetto!",       desc: "Ein Quiz fehlerfrei gemeistert" },
  { id: "fiamma",    emoji: "🔥", name: "In Fiamme",       desc: "3 Tage in Folge gelernt" },
  { id: "stelle",    emoji: "⭐", name: "Tre Stelle",      desc: "3 Sterne in einer Lektion" },
  { id: "ricco",     emoji: "🪙", name: "Ricco",           desc: "200 Soldi gesammelt" },
  { id: "poliglotta",emoji: "🦜", name: "Poliglotta",      desc: "100 Vokabeln gelernt" }
];
