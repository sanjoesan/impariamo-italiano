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
  },
  {
    id: "verbi",
    title: "Verbi Utili",
    de: "Nützliche Verben",
    emoji: "🏃",
    color: "#7a5ca0",
    words: [
      { it: "Essere", de: "sein", emoji: "🧍", ex: "Io sono italiano.", exDe: "Ich bin Italiener." },
      { it: "Avere", de: "haben", emoji: "🤲", ex: "Ho fame.", exDe: "Ich habe Hunger." },
      { it: "Fare", de: "machen / tun", emoji: "🔨", ex: "Cosa fai?", exDe: "Was machst du?" },
      { it: "Andare", de: "gehen / fahren", emoji: "🚶", ex: "Vado a casa.", exDe: "Ich gehe nach Hause." },
      { it: "Mangiare", de: "essen", emoji: "🍴", ex: "Mangiamo insieme.", exDe: "Wir essen zusammen." },
      { it: "Bere", de: "trinken", emoji: "🥤", ex: "Bevo un caffè.", exDe: "Ich trinke einen Kaffee." },
      { it: "Parlare", de: "sprechen", emoji: "💬", ex: "Parlo italiano.", exDe: "Ich spreche Italienisch." },
      { it: "Capire", de: "verstehen", emoji: "💡", ex: "Non capisco bene.", exDe: "Ich verstehe nicht gut." },
      { it: "Volere", de: "wollen", emoji: "✨", ex: "Voglio un gelato.", exDe: "Ich will ein Eis." },
      { it: "Potere", de: "können", emoji: "💪", ex: "Posso aiutare?", exDe: "Kann ich helfen?" }
    ]
  },
  {
    id: "meteo",
    title: "Tempo Meteo",
    de: "Das Wetter",
    emoji: "🌤️",
    color: "#3f93b8",
    words: [
      { it: "Il sole", de: "die Sonne", emoji: "☀️", ex: "C'è il sole oggi.", exDe: "Heute scheint die Sonne." },
      { it: "La pioggia", de: "der Regen", emoji: "🌧️", ex: "La pioggia cade piano.", exDe: "Der Regen fällt leise." },
      { it: "Il vento", de: "der Wind", emoji: "💨", ex: "Oggi tira vento.", exDe: "Heute ist es windig." },
      { it: "La neve", de: "der Schnee", emoji: "❄️", ex: "La neve è bianca.", exDe: "Der Schnee ist weiß." },
      { it: "Le nuvole", de: "die Wolken", emoji: "☁️", ex: "Ci sono molte nuvole.", exDe: "Es gibt viele Wolken." },
      { it: "Il temporale", de: "das Gewitter", emoji: "⛈️", ex: "Arriva un temporale.", exDe: "Ein Gewitter zieht auf." },
      { it: "Il caldo", de: "die Hitze", emoji: "🥵", ex: "Oggi fa caldo.", exDe: "Heute ist es heiß." },
      { it: "Il freddo", de: "die Kälte", emoji: "🥶", ex: "In montagna fa freddo.", exDe: "In den Bergen ist es kalt." },
      { it: "L'arcobaleno", de: "der Regenbogen", emoji: "🌈", ex: "Che bell'arcobaleno!", exDe: "Was für ein schöner Regenbogen!" },
      { it: "La nebbia", de: "der Nebel", emoji: "🌫️", ex: "C'è nebbia stamattina.", exDe: "Heute Morgen ist Nebel." }
    ]
  },
  {
    id: "corpo",
    title: "Il Corpo",
    de: "Der Körper",
    emoji: "🧑",
    color: "#bd6a5a",
    words: [
      { it: "La testa", de: "der Kopf", emoji: "🧠", ex: "Ho mal di testa.", exDe: "Ich habe Kopfschmerzen." },
      { it: "Gli occhi", de: "die Augen", emoji: "👀", ex: "Hai gli occhi belli.", exDe: "Du hast schöne Augen." },
      { it: "Il naso", de: "die Nase", emoji: "👃", ex: "Il naso è freddo.", exDe: "Die Nase ist kalt." },
      { it: "La bocca", de: "der Mund", emoji: "👄", ex: "Apri la bocca.", exDe: "Mach den Mund auf." },
      { it: "Le orecchie", de: "die Ohren", emoji: "👂", ex: "Le orecchie sentono bene.", exDe: "Die Ohren hören gut." },
      { it: "La mano", de: "die Hand", emoji: "✋", ex: "Dammi la mano.", exDe: "Gib mir die Hand." },
      { it: "Il braccio", de: "der Arm", emoji: "💪", ex: "Mi fa male il braccio.", exDe: "Mir tut der Arm weh." },
      { it: "La gamba", de: "das Bein", emoji: "🦵", ex: "Ho le gambe stanche.", exDe: "Ich habe müde Beine." },
      { it: "Il piede", de: "der Fuß", emoji: "🦶", ex: "Il piede è piccolo.", exDe: "Der Fuß ist klein." },
      { it: "Il cuore", de: "das Herz", emoji: "❤️", ex: "Il cuore batte forte.", exDe: "Das Herz schlägt schnell." }
    ]
  },
  {
    id: "animali",
    title: "Gli Animali",
    de: "Die Tiere",
    emoji: "🐾",
    color: "#5f9e54",
    words: [
      { it: "Il cane", de: "der Hund", emoji: "🐶", ex: "Il cane abbaia.", exDe: "Der Hund bellt." },
      { it: "Il gatto", de: "die Katze", emoji: "🐱", ex: "Il gatto dorme.", exDe: "Die Katze schläft." },
      { it: "Il cavallo", de: "das Pferd", emoji: "🐴", ex: "Il cavallo corre veloce.", exDe: "Das Pferd rennt schnell." },
      { it: "L'uccello", de: "der Vogel", emoji: "🐦", ex: "L'uccello canta.", exDe: "Der Vogel singt." },
      { it: "La mucca", de: "die Kuh", emoji: "🐮", ex: "La mucca fa il latte.", exDe: "Die Kuh gibt Milch." },
      { it: "Il topo", de: "die Maus", emoji: "🐭", ex: "Il topo è piccolo.", exDe: "Die Maus ist klein." },
      { it: "Il leone", de: "der Löwe", emoji: "🦁", ex: "Il leone è forte.", exDe: "Der Löwe ist stark." },
      { it: "La farfalla", de: "der Schmetterling", emoji: "🦋", ex: "La farfalla vola.", exDe: "Der Schmetterling fliegt." },
      { it: "L'ape", de: "die Biene", emoji: "🐝", ex: "L'ape fa il miele.", exDe: "Die Biene macht Honig." },
      { it: "Il coniglio", de: "das Kaninchen", emoji: "🐰", ex: "Il coniglio salta.", exDe: "Das Kaninchen hüpft." }
    ]
  },
  {
    id: "conversazione",
    title: "Conversazione",
    de: "Smalltalk – ganze Sätze",
    emoji: "🗨️",
    color: "#c77d39",
    sentences: true,
    words: [
      { it: "Come ti chiami?", de: "Wie heißt du?", emoji: "🙋", ex: "Mi chiamo Marco.", exDe: "Ich heiße Marco." },
      { it: "Di dove sei?", de: "Woher kommst du?", emoji: "🌍", ex: "Sono di Roma.", exDe: "Ich komme aus Rom." },
      { it: "Piacere di conoscerti!", de: "Freut mich, dich kennenzulernen!", emoji: "🤝", ex: "Il piacere è mio.", exDe: "Die Freude ist ganz meinerseits." },
      { it: "Come stai oggi?", de: "Wie geht es dir heute?", emoji: "😊", ex: "Non c'è male, grazie.", exDe: "Nicht schlecht, danke." },
      { it: "Che lavoro fai?", de: "Was arbeitest du?", emoji: "💼", ex: "Faccio l'insegnante.", exDe: "Ich bin Lehrer." },
      { it: "Quanti anni hai?", de: "Wie alt bist du?", emoji: "🎂", ex: "Ho trent'anni.", exDe: "Ich bin dreißig." },
      { it: "Parli tedesco?", de: "Sprichst du Deutsch?", emoji: "🇩🇪", ex: "Solo un po'.", exDe: "Nur ein bisschen." },
      { it: "Cosa fai nel tempo libero?", de: "Was machst du in der Freizeit?", emoji: "🎨", ex: "Mi piace leggere.", exDe: "Ich lese gern." },
      { it: "Hai fratelli o sorelle?", de: "Hast du Geschwister?", emoji: "👨‍👩‍👧", ex: "Ho una sorella.", exDe: "Ich habe eine Schwester." },
      { it: "Ci vediamo presto!", de: "Wir sehen uns bald!", emoji: "👋", ex: "Va bene, a presto!", exDe: "In Ordnung, bis bald!" }
    ]
  },
  {
    id: "albar",
    title: "Al Bar",
    de: "Im Café – ganze Sätze",
    emoji: "☕",
    color: "#a86b2f",
    sentences: true,
    words: [
      { it: "Vorrei un cappuccino.", de: "Ich hätte gern einen Cappuccino.", emoji: "☕", ex: "Subito, signore.", exDe: "Sofort, mein Herr." },
      { it: "Quanto costa un caffè?", de: "Was kostet ein Kaffee?", emoji: "💶", ex: "Un euro e dieci.", exDe: "Einen Euro zehn." },
      { it: "Posso avere il conto?", de: "Kann ich die Rechnung haben?", emoji: "🧾", ex: "Certo, ecco a Lei.", exDe: "Sicher, bitte sehr." },
      { it: "Avete qualcosa da mangiare?", de: "Habt ihr etwas zu essen?", emoji: "🥐", ex: "Sì, abbiamo i cornetti.", exDe: "Ja, wir haben Hörnchen." },
      { it: "Un tavolo per due, per favore.", de: "Einen Tisch für zwei, bitte.", emoji: "🍽️", ex: "Vi accompagno.", exDe: "Ich begleite Sie." },
      { it: "Accettate la carta?", de: "Nehmt ihr Karte?", emoji: "💳", ex: "Sì, nessun problema.", exDe: "Ja, kein Problem." },
      { it: "Lo prendo al banco.", de: "Ich nehme ihn an der Theke.", emoji: "🧍", ex: "Va bene, costa meno.", exDe: "Gut, das ist günstiger." },
      { it: "Dov'è il bagno?", de: "Wo ist die Toilette?", emoji: "🚻", ex: "In fondo a destra.", exDe: "Ganz hinten rechts." },
      { it: "Per me un'acqua naturale.", de: "Für mich ein stilles Wasser.", emoji: "💧", ex: "Frizzante o naturale?", exDe: "Mit oder ohne Kohlensäure?" },
      { it: "Grazie, buona giornata!", de: "Danke, schönen Tag noch!", emoji: "🌞", ex: "Altrettanto!", exDe: "Ebenfalls!" }
    ]
  },
  {
    id: "indicazioni",
    title: "Chiedere Indicazioni",
    de: "Nach dem Weg fragen – ganze Sätze",
    emoji: "🧭",
    color: "#3f8a6b",
    sentences: true,
    words: [
      { it: "Scusi, dov'è la stazione?", de: "Entschuldigung, wo ist der Bahnhof?", emoji: "🚉", ex: "È vicino, a sinistra.", exDe: "Er ist in der Nähe, links." },
      { it: "È lontano da qui?", de: "Ist es weit von hier?", emoji: "📏", ex: "No, dieci minuti a piedi.", exDe: "Nein, zehn Minuten zu Fuß." },
      { it: "Vada sempre dritto.", de: "Gehen Sie immer geradeaus.", emoji: "⬆️", ex: "E poi?", exDe: "Und dann?" },
      { it: "Giri a destra al semaforo.", de: "Biegen Sie an der Ampel rechts ab.", emoji: "🚦", ex: "Ho capito, grazie.", exDe: "Verstanden, danke." },
      { it: "Mi sono perso.", de: "Ich habe mich verlaufen.", emoji: "😕", ex: "La aiuto io.", exDe: "Ich helfe Ihnen." },
      { it: "Quanto tempo ci vuole?", de: "Wie lange dauert es?", emoji: "⏱️", ex: "Circa un quarto d'ora.", exDe: "Etwa eine Viertelstunde." },
      { it: "C'è una farmacia qui vicino?", de: "Gibt es hier in der Nähe eine Apotheke?", emoji: "💊", ex: "Sì, dopo la piazza.", exDe: "Ja, nach dem Platz." },
      { it: "Può ripetere, per favore?", de: "Können Sie das wiederholen, bitte?", emoji: "🔁", ex: "Certo, più piano.", exDe: "Sicher, langsamer." },
      { it: "Dove posso prendere l'autobus?", de: "Wo kann ich den Bus nehmen?", emoji: "🚌", ex: "Alla fermata laggiù.", exDe: "An der Haltestelle dort drüben." },
      { it: "Grazie per l'aiuto!", de: "Danke für die Hilfe!", emoji: "🙏", ex: "Di niente, buon viaggio!", exDe: "Gern geschehen, gute Reise!" }
    ]
  },
  {
    id: "emozioni",
    title: "Esprimere Emozioni",
    de: "Gefühle ausdrücken – ganze Sätze",
    emoji: "💖",
    color: "#c2548a",
    sentences: true,
    words: [
      { it: "Sono molto felice oggi.", de: "Ich bin heute sehr glücklich.", emoji: "😄", ex: "Sono contento per te.", exDe: "Das freut mich für dich." },
      { it: "Mi sento un po' stanco.", de: "Ich fühle mich etwas müde.", emoji: "😴", ex: "Riposati allora.", exDe: "Dann ruh dich aus." },
      { it: "Che bella sorpresa!", de: "Was für eine schöne Überraschung!", emoji: "🎉", ex: "Speravo ti piacesse.", exDe: "Ich hoffte, es gefällt dir." },
      { it: "Mi manchi tanto.", de: "Du fehlst mir sehr.", emoji: "🥺", ex: "Anche tu mi manchi.", exDe: "Du fehlst mir auch." },
      { it: "Sono d'accordo con te.", de: "Ich bin deiner Meinung.", emoji: "👍", ex: "Meno male!", exDe: "Gott sei Dank!" },
      { it: "Non mi piace per niente.", de: "Das gefällt mir gar nicht.", emoji: "👎", ex: "Capisco, scusa.", exDe: "Ich verstehe, Entschuldigung." },
      { it: "Sono orgoglioso di te.", de: "Ich bin stolz auf dich.", emoji: "🌟", ex: "Grazie, significa molto.", exDe: "Danke, das bedeutet viel." },
      { it: "Mi dispiace tanto.", de: "Es tut mir sehr leid.", emoji: "😞", ex: "Non fa niente.", exDe: "Macht nichts." },
      { it: "Che bella giornata!", de: "Was für ein schöner Tag!", emoji: "🌈", ex: "Approfittiamone!", exDe: "Nutzen wir ihn!" },
      { it: "Ti voglio bene.", de: "Ich hab dich lieb.", emoji: "❤️", ex: "Anch'io ti voglio bene.", exDe: "Ich hab dich auch lieb." }
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

/* =========================================================
   KONJUGATIONEN — Verben in 4 Zeiten × 6 Personen (IT + DE)
   Reihenfolge der Personen: io, tu, lui/lei, noi, voi, loro
   ========================================================= */
const CONJ_PRONOUNS = ["io", "tu", "lui/lei", "noi", "voi", "loro"];
const CONJ_PRONOUNS_DE = ["ich", "du", "er/sie", "wir", "ihr", "sie"];
const CONJ_TENSES = [
  { id: "presente",     it: "Presente",              de: "Gegenwart" },
  { id: "passato",      it: "Passato Prossimo",      de: "Perfekt" },
  { id: "imperfetto",   it: "Imperfetto",            de: "Imperfekt" },
  { id: "futuro",       it: "Futuro Semplice",       de: "Zukunft" },
  { id: "condizionale", it: "Condizionale",          de: "Konditional" },
  { id: "congiuntivo",  it: "Congiuntivo Presente",  de: "Konjunktiv" }
];

const CONJUGATIONS = [
  {
    id: "essere", inf: "Essere", infDe: "sein", emoji: "🧍", color: "#7a5ca0",
    forms: {
      presente:   ["sono", "sei", "è", "siamo", "siete", "sono"],
      passato:    ["sono stato", "sei stato", "è stato", "siamo stati", "siete stati", "sono stati"],
      imperfetto: ["ero", "eri", "era", "eravamo", "eravate", "erano"],
      futuro:       ["sarò", "sarai", "sarà", "saremo", "sarete", "saranno"],
      condizionale: ["sarei", "saresti", "sarebbe", "saremmo", "sareste", "sarebbero"],
      congiuntivo:  ["sia", "sia", "sia", "siamo", "siate", "siano"]
    },
    formsDe: {
      presente:   ["ich bin", "du bist", "er/sie ist", "wir sind", "ihr seid", "sie sind"],
      passato:    ["ich bin gewesen", "du bist gewesen", "er/sie ist gewesen", "wir sind gewesen", "ihr seid gewesen", "sie sind gewesen"],
      imperfetto: ["ich war", "du warst", "er/sie war", "wir waren", "ihr wart", "sie waren"],
      futuro:       ["ich werde sein", "du wirst sein", "er/sie wird sein", "wir werden sein", "ihr werdet sein", "sie werden sein"],
      condizionale: ["ich wäre", "du wärst", "er/sie wäre", "wir wären", "ihr wärt", "sie wären"],
      congiuntivo:  ["(dass) ich sei", "(dass) du seist", "(dass) er/sie sei", "(dass) wir seien", "(dass) ihr seiet", "(dass) sie seien"]
    }
  },
  {
    id: "avere", inf: "Avere", infDe: "haben", emoji: "🤲", color: "#2e7d6f",
    forms: {
      presente:   ["ho", "hai", "ha", "abbiamo", "avete", "hanno"],
      passato:    ["ho avuto", "hai avuto", "ha avuto", "abbiamo avuto", "avete avuto", "hanno avuto"],
      imperfetto: ["avevo", "avevi", "aveva", "avevamo", "avevate", "avevano"],
      futuro:       ["avrò", "avrai", "avrà", "avremo", "avrete", "avranno"],
      condizionale: ["avrei", "avresti", "avrebbe", "avremmo", "avreste", "avrebbero"],
      congiuntivo:  ["abbia", "abbia", "abbia", "abbiamo", "abbiate", "abbiano"]
    },
    formsDe: {
      presente:   ["ich habe", "du hast", "er/sie hat", "wir haben", "ihr habt", "sie haben"],
      passato:    ["ich habe gehabt", "du hast gehabt", "er/sie hat gehabt", "wir haben gehabt", "ihr habt gehabt", "sie haben gehabt"],
      imperfetto: ["ich hatte", "du hattest", "er/sie hatte", "wir hatten", "ihr hattet", "sie hatten"],
      futuro:       ["ich werde haben", "du wirst haben", "er/sie wird haben", "wir werden haben", "ihr werdet haben", "sie werden haben"],
      condizionale: ["ich hätte", "du hättest", "er/sie hätte", "wir hätten", "ihr hättet", "sie hätten"],
      congiuntivo:  ["(dass) ich habe", "(dass) du habest", "(dass) er/sie habe", "(dass) wir haben", "(dass) ihr habet", "(dass) sie haben"]
    }
  },
  {
    id: "fare", inf: "Fare", infDe: "machen / tun", emoji: "🔨", color: "#c75b39",
    forms: {
      presente:   ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
      passato:    ["ho fatto", "hai fatto", "ha fatto", "abbiamo fatto", "avete fatto", "hanno fatto"],
      imperfetto: ["facevo", "facevi", "faceva", "facevamo", "facevate", "facevano"],
      futuro:       ["farò", "farai", "farà", "faremo", "farete", "faranno"],
      condizionale: ["farei", "faresti", "farebbe", "faremmo", "fareste", "farebbero"],
      congiuntivo:  ["faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"]
    },
    formsDe: {
      presente:   ["ich mache", "du machst", "er/sie macht", "wir machen", "ihr macht", "sie machen"],
      passato:    ["ich habe gemacht", "du hast gemacht", "er/sie hat gemacht", "wir haben gemacht", "ihr habt gemacht", "sie haben gemacht"],
      imperfetto: ["ich machte", "du machtest", "er/sie machte", "wir machten", "ihr machtet", "sie machten"],
      futuro:       ["ich werde machen", "du wirst machen", "er/sie wird machen", "wir werden machen", "ihr werdet machen", "sie werden machen"],
      condizionale: ["ich würde machen", "du würdest machen", "er/sie würde machen", "wir würden machen", "ihr würdet machen", "sie würden machen"],
      congiuntivo:  ["(dass) ich mache", "(dass) du machst", "(dass) er/sie macht", "(dass) wir machen", "(dass) ihr macht", "(dass) sie machen"]
    }
  },
  {
    id: "andare", inf: "Andare", infDe: "gehen / fahren", emoji: "🚶", color: "#5a7d9b",
    forms: {
      presente:   ["vado", "vai", "va", "andiamo", "andate", "vanno"],
      passato:    ["sono andato", "sei andato", "è andato", "siamo andati", "siete andati", "sono andati"],
      imperfetto: ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"],
      futuro:       ["andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
      condizionale: ["andrei", "andresti", "andrebbe", "andremmo", "andreste", "andrebbero"],
      congiuntivo:  ["vada", "vada", "vada", "andiamo", "andiate", "vadano"]
    },
    formsDe: {
      presente:   ["ich gehe", "du gehst", "er/sie geht", "wir gehen", "ihr geht", "sie gehen"],
      passato:    ["ich bin gegangen", "du bist gegangen", "er/sie ist gegangen", "wir sind gegangen", "ihr seid gegangen", "sie sind gegangen"],
      imperfetto: ["ich ging", "du gingst", "er/sie ging", "wir gingen", "ihr gingt", "sie gingen"],
      futuro:       ["ich werde gehen", "du wirst gehen", "er/sie wird gehen", "wir werden gehen", "ihr werdet gehen", "sie werden gehen"],
      condizionale: ["ich würde gehen", "du würdest gehen", "er/sie würde gehen", "wir würden gehen", "ihr würdet gehen", "sie würden gehen"],
      congiuntivo:  ["(dass) ich gehe", "(dass) du gehst", "(dass) er/sie geht", "(dass) wir gehen", "(dass) ihr geht", "(dass) sie gehen"]
    }
  },
  {
    id: "parlare", inf: "Parlare", infDe: "sprechen", emoji: "💬", color: "#3f7d8a",
    forms: {
      presente:   ["parlo", "parli", "parla", "parliamo", "parlate", "parlano"],
      passato:    ["ho parlato", "hai parlato", "ha parlato", "abbiamo parlato", "avete parlato", "hanno parlato"],
      imperfetto: ["parlavo", "parlavi", "parlava", "parlavamo", "parlavate", "parlavano"],
      futuro:       ["parlerò", "parlerai", "parlerà", "parleremo", "parlerete", "parleranno"],
      condizionale: ["parlerei", "parleresti", "parlerebbe", "parleremmo", "parlereste", "parlerebbero"],
      congiuntivo:  ["parli", "parli", "parli", "parliamo", "parliate", "parlino"]
    },
    formsDe: {
      presente:   ["ich spreche", "du sprichst", "er/sie spricht", "wir sprechen", "ihr sprecht", "sie sprechen"],
      passato:    ["ich habe gesprochen", "du hast gesprochen", "er/sie hat gesprochen", "wir haben gesprochen", "ihr habt gesprochen", "sie haben gesprochen"],
      imperfetto: ["ich sprach", "du sprachst", "er/sie sprach", "wir sprachen", "ihr spracht", "sie sprachen"],
      futuro:       ["ich werde sprechen", "du wirst sprechen", "er/sie wird sprechen", "wir werden sprechen", "ihr werdet sprechen", "sie werden sprechen"],
      condizionale: ["ich würde sprechen", "du würdest sprechen", "er/sie würde sprechen", "wir würden sprechen", "ihr würdet sprechen", "sie würden sprechen"],
      congiuntivo:  ["(dass) ich spreche", "(dass) du sprichst", "(dass) er/sie spricht", "(dass) wir sprechen", "(dass) ihr sprecht", "(dass) sie sprechen"]
    }
  },
  {
    id: "mangiare", inf: "Mangiare", infDe: "essen", emoji: "🍴", color: "#b8442e",
    forms: {
      presente:   ["mangio", "mangi", "mangia", "mangiamo", "mangiate", "mangiano"],
      passato:    ["ho mangiato", "hai mangiato", "ha mangiato", "abbiamo mangiato", "avete mangiato", "hanno mangiato"],
      imperfetto: ["mangiavo", "mangiavi", "mangiava", "mangiavamo", "mangiavate", "mangiavano"],
      futuro:       ["mangerò", "mangerai", "mangerà", "mangeremo", "mangerete", "mangeranno"],
      condizionale: ["mangerei", "mangeresti", "mangerebbe", "mangeremmo", "mangereste", "mangerebbero"],
      congiuntivo:  ["mangi", "mangi", "mangi", "mangiamo", "mangiate", "mangino"]
    },
    formsDe: {
      presente:   ["ich esse", "du isst", "er/sie isst", "wir essen", "ihr esst", "sie essen"],
      passato:    ["ich habe gegessen", "du hast gegessen", "er/sie hat gegessen", "wir haben gegessen", "ihr habt gegessen", "sie haben gegessen"],
      imperfetto: ["ich aß", "du aßt", "er/sie aß", "wir aßen", "ihr aßt", "sie aßen"],
      futuro:       ["ich werde essen", "du wirst essen", "er/sie wird essen", "wir werden essen", "ihr werdet essen", "sie werden essen"],
      condizionale: ["ich würde essen", "du würdest essen", "er/sie würde essen", "wir würden essen", "ihr würdet essen", "sie würden essen"],
      congiuntivo:  ["(dass) ich esse", "(dass) du isst", "(dass) er/sie isst", "(dass) wir essen", "(dass) ihr esst", "(dass) sie essen"]
    }
  },
  {
    id: "potere", inf: "Potere", infDe: "können", emoji: "💪", color: "#8a6d3f",
    forms: {
      presente:     ["posso", "puoi", "può", "possiamo", "potete", "possono"],
      passato:      ["ho potuto", "hai potuto", "ha potuto", "abbiamo potuto", "avete potuto", "hanno potuto"],
      imperfetto:   ["potevo", "potevi", "poteva", "potevamo", "potevate", "potevano"],
      futuro:       ["potrò", "potrai", "potrà", "potremo", "potrete", "potranno"],
      condizionale: ["potrei", "potresti", "potrebbe", "potremmo", "potreste", "potrebbero"],
      congiuntivo:  ["possa", "possa", "possa", "possiamo", "possiate", "possano"]
    },
    formsDe: {
      presente:     ["ich kann", "du kannst", "er/sie kann", "wir können", "ihr könnt", "sie können"],
      passato:      ["ich habe gekonnt", "du hast gekonnt", "er/sie hat gekonnt", "wir haben gekonnt", "ihr habt gekonnt", "sie haben gekonnt"],
      imperfetto:   ["ich konnte", "du konntest", "er/sie konnte", "wir konnten", "ihr konntet", "sie konnten"],
      futuro:       ["ich werde können", "du wirst können", "er/sie wird können", "wir werden können", "ihr werdet können", "sie werden können"],
      condizionale: ["ich könnte", "du könntest", "er/sie könnte", "wir könnten", "ihr könntet", "sie könnten"],
      congiuntivo:  ["(dass) ich kann", "(dass) du kannst", "(dass) er/sie kann", "(dass) wir können", "(dass) ihr könnt", "(dass) sie können"]
    }
  },
  {
    id: "volere", inf: "Volere", infDe: "wollen", emoji: "✨", color: "#9c5a8a",
    forms: {
      presente:     ["voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
      passato:      ["ho voluto", "hai voluto", "ha voluto", "abbiamo voluto", "avete voluto", "hanno voluto"],
      imperfetto:   ["volevo", "volevi", "voleva", "volevamo", "volevate", "volevano"],
      futuro:       ["vorrò", "vorrai", "vorrà", "vorremo", "vorrete", "vorranno"],
      condizionale: ["vorrei", "vorresti", "vorrebbe", "vorremmo", "vorreste", "vorrebbero"],
      congiuntivo:  ["voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"]
    },
    formsDe: {
      presente:     ["ich will", "du willst", "er/sie will", "wir wollen", "ihr wollt", "sie wollen"],
      passato:      ["ich habe gewollt", "du hast gewollt", "er/sie hat gewollt", "wir haben gewollt", "ihr habt gewollt", "sie haben gewollt"],
      imperfetto:   ["ich wollte", "du wolltest", "er/sie wollte", "wir wollten", "ihr wolltet", "sie wollten"],
      futuro:       ["ich werde wollen", "du wirst wollen", "er/sie wird wollen", "wir werden wollen", "ihr werdet wollen", "sie werden wollen"],
      condizionale: ["ich möchte", "du möchtest", "er/sie möchte", "wir möchten", "ihr möchtet", "sie möchten"],
      congiuntivo:  ["(dass) ich will", "(dass) du willst", "(dass) er/sie will", "(dass) wir wollen", "(dass) ihr wollt", "(dass) sie wollen"]
    }
  },
  {
    id: "venire", inf: "Venire", infDe: "kommen", emoji: "🛬", color: "#4a8a8a",
    forms: {
      presente:     ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
      passato:      ["sono venuto", "sei venuto", "è venuto", "siamo venuti", "siete venuti", "sono venuti"],
      imperfetto:   ["venivo", "venivi", "veniva", "venivamo", "venivate", "venivano"],
      futuro:       ["verrò", "verrai", "verrà", "verremo", "verrete", "verranno"],
      condizionale: ["verrei", "verresti", "verrebbe", "verremmo", "verreste", "verrebbero"],
      congiuntivo:  ["venga", "venga", "venga", "veniamo", "veniate", "vengano"]
    },
    formsDe: {
      presente:     ["ich komme", "du kommst", "er/sie kommt", "wir kommen", "ihr kommt", "sie kommen"],
      passato:      ["ich bin gekommen", "du bist gekommen", "er/sie ist gekommen", "wir sind gekommen", "ihr seid gekommen", "sie sind gekommen"],
      imperfetto:   ["ich kam", "du kamst", "er/sie kam", "wir kamen", "ihr kamt", "sie kamen"],
      futuro:       ["ich werde kommen", "du wirst kommen", "er/sie wird kommen", "wir werden kommen", "ihr werdet kommen", "sie werden kommen"],
      condizionale: ["ich würde kommen", "du würdest kommen", "er/sie würde kommen", "wir würden kommen", "ihr würdet kommen", "sie würden kommen"],
      congiuntivo:  ["(dass) ich komme", "(dass) du kommst", "(dass) er/sie kommt", "(dass) wir kommen", "(dass) ihr kommt", "(dass) sie kommen"]
    }
  }
];
