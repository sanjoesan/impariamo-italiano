/* =========================================================
   Impariamo! — Inhalte (Italienisch → Deutsch)
   ---------------------------------------------------------
   Aufbau:
   • LEVELS   — Schwierigkeitsgrade (CEFR A1–C2)
   • CORPUS   — Themen mit Wörtern/Sätzen je Level
   • DIALOGHI — ganze Dialoge (Antwort aus Bausteinen wählen)
   • Generator baut daraus LESSONS + STORY (steigende Schwierigkeit)
   • BADGES / CONJUGATIONS — wie gehabt

   Wort-Objekt:  { it, de, emoji, ex, exDe }
   ex / exDe treiben die Modi „Satzbau", „Lückentext" und „Sprechen".
   ========================================================= */

/* ---------- Schwierigkeitsgrade ---------- */
const LEVELS = [
  { n: 1, code: "A1", it: "Principiante", de: "Anfänger",             emoji: "🌱", color: "#6b7a3f", blurb: "Erste Wörter & Sätze" },
  { n: 2, code: "A2", it: "Elementare",   de: "Grundstufe",           emoji: "🌿", color: "#2e7d6f", blurb: "Alltag & einfache Dialoge" },
  { n: 3, code: "B1", it: "Intermedio",   de: "Mittelstufe",          emoji: "🍋", color: "#d4922a", blurb: "Meinungen & Geschichten" },
  { n: 4, code: "B2", it: "Avanzato",     de: "Fortgeschritten",      emoji: "🔥", color: "#c75b39", blurb: "Fließend diskutieren" },
  { n: 5, code: "C1", it: "Superiore",    de: "Sehr fortgeschritten", emoji: "🏆", color: "#8a2e3b", blurb: "Nuancen & Redewendungen" },
  { n: 6, code: "C2", it: "Padronanza",   de: "Muttersprachlich",     emoji: "👑", color: "#7a5ca0", blurb: "Feinheiten wie ein Profi" }
];
const LEVEL_BY_CODE = Object.fromEntries(LEVELS.map((l) => [l.code, l]));

/* =========================================================
   CORPUS — Themen. Jedes Thema:
   { id, title (it), de, emoji, color, area, levels: { A1:[…], A2:[…], … } }
   ========================================================= */
const CORPUS = [
  {
    id: "saluti", title: "Saluti & Cortesia", de: "Begrüßung & Höflichkeit", emoji: "👋", color: "#c75b39", area: "Soziales",
    levels: {
      A1: [
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
      ],
      A2: [
        { it: "Piacere", de: "Freut mich", emoji: "🤝", ex: "Piacere di conoscerla.", exDe: "Freut mich, Sie kennenzulernen." },
        { it: "Come va?", de: "Wie läuft's?", emoji: "😃", ex: "Come va la vita?", exDe: "Wie läuft das Leben?" },
        { it: "A più tardi", de: "Bis später", emoji: "⏳", ex: "Ci sentiamo, a più tardi!", exDe: "Wir hören uns, bis später!" },
        { it: "Benvenuto", de: "Willkommen", emoji: "🎉", ex: "Benvenuto a casa mia!", exDe: "Willkommen in meinem Zuhause!" },
        { it: "Mi dispiace", de: "Es tut mir leid", emoji: "😔", ex: "Mi dispiace per il ritardo.", exDe: "Es tut mir leid wegen der Verspätung." },
        { it: "Auguri", de: "Glückwunsch / Alles Gute", emoji: "🎂", ex: "Tanti auguri di buon compleanno!", exDe: "Herzlichen Glückwunsch zum Geburtstag!" },
        { it: "Salute!", de: "Gesundheit! / Prost!", emoji: "🥂", ex: "Salute e cin cin!", exDe: "Prost und zum Wohl!" },
        { it: "Con permesso", de: "Gestatten / Darf ich durch", emoji: "🚶", ex: "Con permesso, devo passare.", exDe: "Gestatten, ich muss durch." }
      ],
      B1: [
        { it: "Le porgo i miei saluti", de: "Ich entbiete meine Grüße", emoji: "🎩", ex: "Le porgo i miei più cordiali saluti.", exDe: "Ich entbiete Ihnen meine herzlichsten Grüße." },
        { it: "Non vedo l'ora", de: "Ich kann es kaum erwarten", emoji: "🤩", ex: "Non vedo l'ora di rivederti.", exDe: "Ich kann es kaum erwarten, dich wiederzusehen." },
        { it: "Fa' con comodo", de: "Lass dir Zeit", emoji: "🛋️", ex: "Fa' con comodo, non c'è fretta.", exDe: "Lass dir Zeit, es eilt nicht." },
        { it: "Stammi bene", de: "Mach's gut", emoji: "💛", ex: "Ci vediamo, stammi bene!", exDe: "Wir sehen uns, mach's gut!" },
        { it: "In bocca al lupo", de: "Viel Glück (wörtl. in den Wolfsrachen)", emoji: "🐺", ex: "Esame domani? In bocca al lupo!", exDe: "Prüfung morgen? Viel Glück!" },
        { it: "Crepi il lupo", de: "Danke (Antwort auf in bocca al lupo)", emoji: "🐺", ex: "Crepi il lupo, grazie!", exDe: "Möge der Wolf krepieren, danke!" }
      ]
    }
  },
  {
    id: "presentarsi", title: "Presentarsi", de: "Sich vorstellen", emoji: "🙋", color: "#3f7d8a", area: "Soziales",
    levels: {
      A1: [
        { it: "Mi chiamo...", de: "Ich heiße...", emoji: "🙋", ex: "Mi chiamo Marco.", exDe: "Ich heiße Marco." },
        { it: "Sono di...", de: "Ich komme aus...", emoji: "🌍", ex: "Sono di Napoli.", exDe: "Ich komme aus Neapel." },
        { it: "Ho... anni", de: "Ich bin... Jahre alt", emoji: "🎂", ex: "Ho ventotto anni.", exDe: "Ich bin achtundzwanzig." },
        { it: "Parlo un po' d'italiano", de: "Ich spreche ein bisschen Italienisch", emoji: "🗣️", ex: "Parlo un po' d'italiano.", exDe: "Ich spreche ein bisschen Italienisch." },
        { it: "Piacere!", de: "Freut mich!", emoji: "🤝", ex: "Piacere, sono Lucia.", exDe: "Freut mich, ich bin Lucia." },
        { it: "E tu?", de: "Und du?", emoji: "👉", ex: "Io sto bene, e tu?", exDe: "Mir geht's gut, und dir?" }
      ],
      A2: [
        { it: "Faccio l'ingegnere", de: "Ich bin Ingenieur (von Beruf)", emoji: "👷", ex: "Faccio l'ingegnere a Milano.", exDe: "Ich bin Ingenieur in Mailand." },
        { it: "Abito a...", de: "Ich wohne in...", emoji: "🏠", ex: "Abito a Bologna da tre anni.", exDe: "Ich wohne seit drei Jahren in Bologna." },
        { it: "Sono sposato", de: "Ich bin verheiratet", emoji: "💍", ex: "Sono sposato e ho due figli.", exDe: "Ich bin verheiratet und habe zwei Kinder." },
        { it: "Studio medicina", de: "Ich studiere Medizin", emoji: "🩺", ex: "Studio medicina all'università.", exDe: "Ich studiere Medizin an der Uni." },
        { it: "Il mio numero è...", de: "Meine Nummer ist...", emoji: "📞", ex: "Il mio numero è tre-tre-cinque...", exDe: "Meine Nummer ist drei-drei-fünf..." },
        { it: "Di che segno sei?", de: "Welches Sternzeichen bist du?", emoji: "♈", ex: "Di che segno sei? Sono del Leone.", exDe: "Welches Sternzeichen bist du? Ich bin Löwe." }
      ],
      B1: [
        { it: "Mi occupo di marketing", de: "Ich bin im Marketing tätig", emoji: "📈", ex: "Mi occupo di marketing digitale.", exDe: "Ich bin im digitalen Marketing tätig." },
        { it: "Sono nato a...", de: "Ich bin geboren in...", emoji: "👶", ex: "Sono nato a Palermo nel novanta.", exDe: "Ich bin neunzig in Palermo geboren." },
        { it: "Mi sono trasferito", de: "Ich bin umgezogen", emoji: "📦", ex: "Mi sono trasferito a Roma per lavoro.", exDe: "Ich bin für die Arbeit nach Rom gezogen." },
        { it: "Vado matto per...", de: "Ich bin verrückt nach...", emoji: "🤪", ex: "Vado matto per la cucina thailandese.", exDe: "Ich bin verrückt nach thailändischer Küche." },
        { it: "Lavoro come libero professionista", de: "Ich arbeite als Freiberufler", emoji: "💼", ex: "Lavoro come libero professionista da casa.", exDe: "Ich arbeite freiberuflich von zu Hause." }
      ]
    }
  },
  {
    id: "numeri", title: "I Numeri", de: "Die Zahlen", emoji: "🔢", color: "#2e7d6f", area: "Grundlagen",
    levels: {
      A1: [
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
      ],
      A2: [
        { it: "Venti", de: "Zwanzig", emoji: "🔢", ex: "Ha venti anni.", exDe: "Er ist zwanzig." },
        { it: "Trenta", de: "Dreißig", emoji: "🔢", ex: "Fanno trenta euro.", exDe: "Das macht dreißig Euro." },
        { it: "Cinquanta", de: "Fünfzig", emoji: "🔢", ex: "Cinquanta e cinquanta.", exDe: "Fünfzig und fünfzig." },
        { it: "Cento", de: "Hundert", emoji: "💯", ex: "Cento di questi giorni!", exDe: "Auf hundert solcher Tage!" },
        { it: "Mille", de: "Tausend", emoji: "🔢", ex: "Grazie mille!", exDe: "Tausend Dank!" },
        { it: "Primo", de: "Erster", emoji: "🥇", ex: "Sono arrivato primo.", exDe: "Ich bin Erster geworden." },
        { it: "Mezzo", de: "Halb", emoji: "½", ex: "Un chilo e mezzo.", exDe: "Eineinhalb Kilo." },
        { it: "Un paio", de: "Ein paar", emoji: "✌️", ex: "Un paio di scarpe.", exDe: "Ein Paar Schuhe." }
      ],
      B1: [
        { it: "La metà", de: "Die Hälfte", emoji: "➗", ex: "Ti do la metà della torta.", exDe: "Ich gebe dir die Hälfte des Kuchens." },
        { it: "Il doppio", de: "Das Doppelte", emoji: "✖️", ex: "Costa il doppio in centro.", exDe: "Im Zentrum kostet es das Doppelte." },
        { it: "Una dozzina", de: "Ein Dutzend", emoji: "🥚", ex: "Una dozzina di uova fresche.", exDe: "Ein Dutzend frische Eier." },
        { it: "Per cento", de: "Prozent", emoji: "📊", ex: "Sconto del venti per cento.", exDe: "Zwanzig Prozent Rabatt." },
        { it: "Circa", de: "Ungefähr", emoji: "≈", ex: "Siamo circa in dieci.", exDe: "Wir sind ungefähr zehn." }
      ]
    }
  },
  {
    id: "cibo", title: "Cibo & Bevande", de: "Essen & Trinken", emoji: "🍝", color: "#b8442e", area: "Alltag",
    levels: {
      A1: [
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
      ],
      A2: [
        { it: "Il prosciutto", de: "der Schinken", emoji: "🍖", ex: "Prosciutto e melone, che delizia!", exDe: "Schinken und Melone, was für ein Genuss!" },
        { it: "Le verdure", de: "das Gemüse", emoji: "🥦", ex: "Mangio verdure ogni giorno.", exDe: "Ich esse jeden Tag Gemüse." },
        { it: "Il dolce", de: "der Nachtisch", emoji: "🍰", ex: "Hai lasciato spazio per il dolce?", exDe: "Hast du Platz für den Nachtisch gelassen?" },
        { it: "Lo zucchero", de: "der Zucker", emoji: "🧂", ex: "Niente zucchero nel caffè.", exDe: "Keinen Zucker im Kaffee." },
        { it: "Il sale", de: "das Salz", emoji: "🧂", ex: "Manca un po' di sale.", exDe: "Es fehlt etwas Salz." },
        { it: "Affamato", de: "hungrig", emoji: "🤤", ex: "Sono affamato come un lupo.", exDe: "Ich bin hungrig wie ein Wolf." },
        { it: "Ho sete", de: "Ich habe Durst", emoji: "🥵", ex: "Ho sete, prendo dell'acqua.", exDe: "Ich habe Durst, ich nehme Wasser." },
        { it: "È squisito", de: "Es ist köstlich", emoji: "😋", ex: "Questo risotto è squisito!", exDe: "Dieses Risotto ist köstlich!" }
      ],
      B1: [
        { it: "Una ricetta", de: "ein Rezept", emoji: "📜", ex: "Mi dai la ricetta della nonna?", exDe: "Gibst du mir Omas Rezept?" },
        { it: "Genuino", de: "echt / naturbelassen", emoji: "🌾", ex: "Un prodotto genuino e locale.", exDe: "Ein echtes, regionales Produkt." },
        { it: "A chilometro zero", de: "regional erzeugt", emoji: "🚜", ex: "Verdure a chilometro zero.", exDe: "Gemüse aus der Region." },
        { it: "Andare di traverso", de: "sich verschlucken", emoji: "😵", ex: "Il boccone mi è andato di traverso.", exDe: "Der Bissen ist mir in den falschen Hals geraten." },
        { it: "Fare la scarpetta", de: "die Soße mit Brot auftunken", emoji: "🍞", ex: "Con questo sugo si fa la scarpetta.", exDe: "Mit dieser Soße tunkt man das Brot auf." }
      ],
      C1: [
        { it: "Una leccornia", de: "ein Leckerbissen", emoji: "🤩", ex: "Questo tartufo è una vera leccornia.", exDe: "Dieser Trüffel ist ein wahrer Leckerbissen." },
        { it: "Stucchevole", de: "übermäßig süßlich / penetrant", emoji: "🙄", ex: "Il dolce era un po' stucchevole.", exDe: "Der Nachtisch war etwas zu süßlich." },
        { it: "Avere l'acquolina in bocca", de: "das Wasser läuft im Mund zusammen", emoji: "💦", ex: "Solo l'odore mi fa venire l'acquolina in bocca.", exDe: "Allein der Geruch lässt mir das Wasser im Mund zusammenlaufen." }
      ]
    }
  },
  {
    id: "ristorante", title: "Al Ristorante", de: "Im Restaurant", emoji: "🍷", color: "#8a2e3b", area: "Alltag",
    levels: {
      A1: [
        { it: "Il menu", de: "die Speisekarte", emoji: "📋", ex: "Il menu, per favore.", exDe: "Die Speisekarte, bitte." },
        { it: "Il cameriere", de: "der Kellner", emoji: "🧑‍🍳", ex: "Il cameriere è gentile.", exDe: "Der Kellner ist freundlich." },
        { it: "Il conto", de: "die Rechnung", emoji: "🧾", ex: "Il conto, per favore.", exDe: "Die Rechnung, bitte." },
        { it: "Il tavolo", de: "der Tisch", emoji: "🍽️", ex: "Un tavolo per due.", exDe: "Ein Tisch für zwei." },
        { it: "L'antipasto", de: "die Vorspeise", emoji: "🥗", ex: "Un antipasto misto.", exDe: "Eine gemischte Vorspeise." },
        { it: "Il primo", de: "der erste Gang", emoji: "🍝", ex: "Per primo, gli spaghetti.", exDe: "Als ersten Gang die Spaghetti." },
        { it: "Il secondo", de: "der Hauptgang", emoji: "🍖", ex: "Per secondo, il pesce.", exDe: "Als Hauptgang den Fisch." },
        { it: "La mancia", de: "das Trinkgeld", emoji: "💶", ex: "Lasciamo la mancia.", exDe: "Wir geben Trinkgeld." },
        { it: "Buon appetito!", de: "Guten Appetit!", emoji: "😋", ex: "Buon appetito a tutti!", exDe: "Guten Appetit allerseits!" },
        { it: "Il bicchiere", de: "das Glas", emoji: "🥃", ex: "Un altro bicchiere, grazie.", exDe: "Noch ein Glas, danke." }
      ],
      A2: [
        { it: "La prenotazione", de: "die Reservierung", emoji: "📒", ex: "Ho una prenotazione a nome Rossi.", exDe: "Ich habe eine Reservierung auf den Namen Rossi." },
        { it: "Da bere", de: "zu trinken", emoji: "🍹", ex: "Cosa prende da bere?", exDe: "Was nehmen Sie zu trinken?" },
        { it: "Ben cotto", de: "gut durchgebraten", emoji: "🥩", ex: "Vorrei la bistecca ben cotta.", exDe: "Ich möchte das Steak gut durch." },
        { it: "Il coperto", de: "das Gedeck (Gebühr)", emoji: "🍴", ex: "Il coperto è due euro a persona.", exDe: "Das Gedeck kostet zwei Euro pro Person." },
        { it: "Allergico a...", de: "allergisch gegen...", emoji: "⚠️", ex: "Sono allergico alle noci.", exDe: "Ich bin allergisch gegen Nüsse." },
        { it: "Il bis", de: "der Nachschlag", emoji: "🔁", ex: "Posso fare il bis?", exDe: "Darf ich nachnehmen?" },
        { it: "È tutto?", de: "Ist das alles?", emoji: "❓", ex: "Desidera altro o è tutto?", exDe: "Wünschen Sie noch etwas oder ist das alles?" }
      ],
      B1: [
        { it: "Lo chef consiglia", de: "der Koch empfiehlt", emoji: "👨‍🍳", ex: "Cosa consiglia lo chef stasera?", exDe: "Was empfiehlt der Koch heute Abend?" },
        { it: "Fuori menu", de: "nicht auf der Karte", emoji: "🤫", ex: "Abbiamo un piatto fuori menu.", exDe: "Wir haben ein Gericht außerhalb der Karte." },
        { it: "Pagare alla romana", de: "getrennt zahlen", emoji: "💸", ex: "Paghiamo alla romana, ok?", exDe: "Wir zahlen getrennt, okay?" },
        { it: "Il vino della casa", de: "der Hauswein", emoji: "🍷", ex: "Prendiamo un litro di vino della casa.", exDe: "Wir nehmen einen Liter Hauswein." },
        { it: "Una cena coi fiocchi", de: "ein erstklassiges Abendessen", emoji: "🎀", ex: "È stata una cena coi fiocchi.", exDe: "Das war ein erstklassiges Abendessen." }
      ]
    }
  },
  {
    id: "famiglia", title: "La Famiglia", de: "Die Familie", emoji: "👨‍👩‍👧‍👦", color: "#a0568a", area: "Soziales",
    levels: {
      A1: [
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
      ],
      A2: [
        { it: "Lo zio", de: "der Onkel", emoji: "🧔", ex: "Lo zio vive in campagna.", exDe: "Der Onkel lebt auf dem Land." },
        { it: "La zia", de: "die Tante", emoji: "👩‍🦰", ex: "La zia porta sempre dolci.", exDe: "Die Tante bringt immer Süßes mit." },
        { it: "Il cugino", de: "der Cousin", emoji: "👦", ex: "Mio cugino abita a Torino.", exDe: "Mein Cousin wohnt in Turin." },
        { it: "I nipoti", de: "die Enkel / Neffen", emoji: "👶", ex: "I nonni adorano i nipoti.", exDe: "Die Großeltern lieben die Enkel." },
        { it: "I suoceri", de: "die Schwiegereltern", emoji: "👵", ex: "Domenica pranzo dai suoceri.", exDe: "Sonntag esse ich bei den Schwiegereltern." },
        { it: "Single", de: "Single", emoji: "🕺", ex: "Per ora sono single e felice.", exDe: "Im Moment bin ich Single und glücklich." },
        { it: "Il fidanzato", de: "der Freund (Partner)", emoji: "💑", ex: "Ti presento il mio fidanzato.", exDe: "Ich stelle dir meinen Freund vor." }
      ],
      B1: [
        { it: "Il parente", de: "der Verwandte", emoji: "👪", ex: "A Natale arrivano tutti i parenti.", exDe: "An Weihnachten kommen alle Verwandten." },
        { it: "Andare d'accordo", de: "sich gut verstehen", emoji: "🤝", ex: "Vado d'accordo con mia sorella.", exDe: "Ich verstehe mich gut mit meiner Schwester." },
        { it: "La pecora nera", de: "das schwarze Schaf", emoji: "🐑", ex: "Ogni famiglia ha la sua pecora nera.", exDe: "Jede Familie hat ihr schwarzes Schaf." },
        { it: "Tale padre, tale figlio", de: "der Apfel fällt nicht weit vom Stamm", emoji: "🍎", ex: "Tale padre, tale figlio, no?", exDe: "Wie der Vater, so der Sohn, nicht?" },
        { it: "Il primogenito", de: "das erstgeborene Kind", emoji: "1️⃣", ex: "Luca è il primogenito di tre.", exDe: "Luca ist das erste von drei Kindern." }
      ]
    }
  },
  {
    id: "casa", title: "La Casa", de: "Das Zuhause", emoji: "🏠", color: "#9b6b3f", area: "Alltag",
    levels: {
      A1: [
        { it: "La casa", de: "das Haus", emoji: "🏠", ex: "La mia casa è piccola.", exDe: "Mein Haus ist klein." },
        { it: "La camera", de: "das Zimmer", emoji: "🛏️", ex: "La camera ha una bella vista.", exDe: "Das Zimmer hat eine schöne Aussicht." },
        { it: "La cucina", de: "die Küche", emoji: "🍳", ex: "Cucino in cucina.", exDe: "Ich koche in der Küche." },
        { it: "Il bagno", de: "das Bad", emoji: "🛁", ex: "Il bagno è in fondo.", exDe: "Das Bad ist am Ende." },
        { it: "Il letto", de: "das Bett", emoji: "🛌", ex: "Il letto è comodo.", exDe: "Das Bett ist bequem." },
        { it: "La porta", de: "die Tür", emoji: "🚪", ex: "Chiudi la porta, per favore.", exDe: "Mach bitte die Tür zu." },
        { it: "La finestra", de: "das Fenster", emoji: "🪟", ex: "Apri la finestra, c'è caldo.", exDe: "Mach das Fenster auf, es ist warm." },
        { it: "Il tavolo", de: "der Tisch", emoji: "🪑", ex: "Mettiamo il tavolo in giardino.", exDe: "Stellen wir den Tisch in den Garten." }
      ],
      A2: [
        { it: "Il divano", de: "das Sofa", emoji: "🛋️", ex: "Mi rilasso sul divano.", exDe: "Ich entspanne mich auf dem Sofa." },
        { it: "Il frigorifero", de: "der Kühlschrank", emoji: "🧊", ex: "Il frigorifero è vuoto.", exDe: "Der Kühlschrank ist leer." },
        { it: "L'armadio", de: "der Schrank", emoji: "🚪", ex: "I vestiti sono nell'armadio.", exDe: "Die Kleidung ist im Schrank." },
        { it: "Il balcone", de: "der Balkon", emoji: "🪴", ex: "Bevo il caffè in balcone.", exDe: "Ich trinke den Kaffee auf dem Balkon." },
        { it: "L'affitto", de: "die Miete", emoji: "💶", ex: "L'affitto è troppo caro.", exDe: "Die Miete ist zu teuer." },
        { it: "Il piano", de: "das Stockwerk", emoji: "🏢", ex: "Abito al terzo piano.", exDe: "Ich wohne im dritten Stock." },
        { it: "Le chiavi", de: "die Schlüssel", emoji: "🔑", ex: "Ho perso le chiavi di casa.", exDe: "Ich habe die Hausschlüssel verloren." }
      ],
      B1: [
        { it: "Il trasloco", de: "der Umzug", emoji: "📦", ex: "Il trasloco è stato un incubo.", exDe: "Der Umzug war ein Albtraum." },
        { it: "Il condominio", de: "das Mehrfamilienhaus", emoji: "🏬", ex: "La riunione di condominio è noiosa.", exDe: "Die Eigentümerversammlung ist langweilig." },
        { it: "Fare i lavori", de: "renovieren", emoji: "🔧", ex: "Stiamo facendo i lavori in cucina.", exDe: "Wir renovieren gerade die Küche." },
        { it: "Sentirsi a casa", de: "sich zu Hause fühlen", emoji: "🤗", ex: "Qui mi sento a casa.", exDe: "Hier fühle ich mich zu Hause." },
        { it: "Casa dolce casa", de: "trautes Heim", emoji: "💛", ex: "Finalmente a casa: casa dolce casa!", exDe: "Endlich zu Hause: trautes Heim, Glück allein!" }
      ]
    }
  },
  {
    id: "citta", title: "In Città", de: "In der Stadt", emoji: "🏛️", color: "#9b6b3f", area: "Alltag",
    levels: {
      A1: [
        { it: "La piazza", de: "der Platz", emoji: "⛲", ex: "Ci vediamo in piazza.", exDe: "Wir treffen uns auf dem Platz." },
        { it: "La chiesa", de: "die Kirche", emoji: "⛪", ex: "La chiesa è antica.", exDe: "Die Kirche ist alt." },
        { it: "Il museo", de: "das Museum", emoji: "🏛️", ex: "Visitiamo il museo.", exDe: "Wir besuchen das Museum." },
        { it: "Il mercato", de: "der Markt", emoji: "🧺", ex: "Il mercato è la mattina.", exDe: "Der Markt ist am Morgen." },
        { it: "La strada", de: "die Straße", emoji: "🛣️", ex: "Attraversa la strada.", exDe: "Überquere die Straße." },
        { it: "Il ponte", de: "die Brücke", emoji: "🌉", ex: "Il ponte è romantico.", exDe: "Die Brücke ist romantisch." },
        { it: "Il negozio", de: "das Geschäft", emoji: "🏪", ex: "Il negozio è chiuso.", exDe: "Das Geschäft ist geschlossen." },
        { it: "La banca", de: "die Bank", emoji: "🏦", ex: "Dov'è la banca?", exDe: "Wo ist die Bank?" }
      ],
      A2: [
        { it: "Il municipio", de: "das Rathaus", emoji: "🏛️", ex: "Il municipio è in centro.", exDe: "Das Rathaus ist im Zentrum." },
        { it: "Il semaforo", de: "die Ampel", emoji: "🚦", ex: "Gira a destra al semaforo.", exDe: "Bieg an der Ampel rechts ab." },
        { it: "Il marciapiede", de: "der Gehweg", emoji: "🚶", ex: "Cammina sul marciapiede.", exDe: "Geh auf dem Gehweg." },
        { it: "Il parcheggio", de: "der Parkplatz", emoji: "🅿️", ex: "Non trovo parcheggio.", exDe: "Ich finde keinen Parkplatz." },
        { it: "L'incrocio", de: "die Kreuzung", emoji: "🚥", ex: "All'incrocio vai dritto.", exDe: "An der Kreuzung fahr geradeaus." },
        { it: "Il quartiere", de: "das Viertel", emoji: "🏘️", ex: "È un quartiere tranquillo.", exDe: "Es ist ein ruhiges Viertel." },
        { it: "La periferia", de: "der Stadtrand", emoji: "🌆", ex: "Vivo in periferia.", exDe: "Ich wohne am Stadtrand." }
      ],
      B1: [
        { it: "Il traffico", de: "der Verkehr", emoji: "🚗", ex: "C'è sempre traffico all'ora di punta.", exDe: "Zur Hauptverkehrszeit gibt es immer Stau." },
        { it: "Il centro storico", de: "die Altstadt", emoji: "🏰", ex: "Il centro storico è pedonale.", exDe: "Die Altstadt ist eine Fußgängerzone." },
        { it: "Animato", de: "lebhaft / belebt", emoji: "🎪", ex: "La zona è molto animata di sera.", exDe: "Die Gegend ist abends sehr lebhaft." },
        { it: "I mezzi pubblici", de: "öffentliche Verkehrsmittel", emoji: "🚌", ex: "Uso i mezzi pubblici ogni giorno.", exDe: "Ich nutze täglich die Öffentlichen." },
        { it: "Il vigile", de: "der Verkehrspolizist", emoji: "👮", ex: "Il vigile dirige il traffico.", exDe: "Der Verkehrspolizist regelt den Verkehr." }
      ]
    }
  },
  {
    id: "viaggio", title: "Il Viaggio", de: "Die Reise", emoji: "🧳", color: "#5a7d9b", area: "Reisen",
    levels: {
      A1: [
        { it: "Il treno", de: "der Zug", emoji: "🚆", ex: "Il treno è in ritardo.", exDe: "Der Zug hat Verspätung." },
        { it: "La stazione", de: "der Bahnhof", emoji: "🚉", ex: "Dov'è la stazione?", exDe: "Wo ist der Bahnhof?" },
        { it: "L'albergo", de: "das Hotel", emoji: "🏨", ex: "L'albergo è vicino al mare.", exDe: "Das Hotel ist nah am Meer." },
        { it: "Il biglietto", de: "das Ticket", emoji: "🎫", ex: "Un biglietto per Roma.", exDe: "Ein Ticket nach Rom." },
        { it: "La spiaggia", de: "der Strand", emoji: "🏖️", ex: "Andiamo in spiaggia!", exDe: "Lass uns an den Strand gehen!" },
        { it: "Il mare", de: "das Meer", emoji: "🌊", ex: "Il mare è calmo oggi.", exDe: "Das Meer ist heute ruhig." },
        { it: "La valigia", de: "der Koffer", emoji: "🧳", ex: "La valigia è pesante.", exDe: "Der Koffer ist schwer." },
        { it: "Il passaporto", de: "der Reisepass", emoji: "🛂", ex: "Ecco il mio passaporto.", exDe: "Hier ist mein Reisepass." }
      ],
      A2: [
        { it: "La vacanza", de: "der Urlaub", emoji: "🌴", ex: "Le vacanze iniziano domani.", exDe: "Der Urlaub beginnt morgen." },
        { it: "La prenotazione", de: "die Buchung", emoji: "📲", ex: "Ho una prenotazione per due notti.", exDe: "Ich habe eine Buchung für zwei Nächte." },
        { it: "Il bagaglio", de: "das Gepäck", emoji: "🎒", ex: "Il bagaglio a mano è gratis.", exDe: "Handgepäck ist kostenlos." },
        { it: "Il volo", de: "der Flug", emoji: "✈️", ex: "Il volo parte alle sei.", exDe: "Der Flug geht um sechs." },
        { it: "La cartina", de: "der Stadtplan", emoji: "🗺️", ex: "Mi serve una cartina della città.", exDe: "Ich brauche einen Stadtplan." },
        { it: "Il souvenir", de: "das Souvenir", emoji: "🎁", ex: "Compro un souvenir per la nonna.", exDe: "Ich kaufe ein Souvenir für die Oma." },
        { it: "All'estero", de: "im Ausland", emoji: "🌍", ex: "Quest'estate vado all'estero.", exDe: "Diesen Sommer fahre ich ins Ausland." }
      ],
      B1: [
        { it: "Fare il pieno di esperienze", de: "viele Erlebnisse sammeln", emoji: "🌅", ex: "In Sicilia abbiamo fatto il pieno di esperienze.", exDe: "In Sizilien haben wir viele Erlebnisse gesammelt." },
        { it: "Il fuso orario", de: "die Zeitzone", emoji: "🕰️", ex: "Soffro il fuso orario.", exDe: "Ich leide unter dem Jetlag." },
        { it: "Lo zaino in spalla", de: "mit Rucksack reisen", emoji: "🥾", ex: "Giro l'Europa zaino in spalla.", exDe: "Ich bereise Europa mit dem Rucksack." },
        { it: "Fuori stagione", de: "in der Nebensaison", emoji: "🍂", ex: "Viaggiare fuori stagione costa meno.", exDe: "In der Nebensaison zu reisen ist günstiger." },
        { it: "La meta", de: "das Reiseziel", emoji: "📍", ex: "La nostra meta è la Sardegna.", exDe: "Unser Reiseziel ist Sardinien." }
      ],
      B2: [
        { it: "Un viaggio della speranza", de: "eine beschwerliche Reise", emoji: "🤞", ex: "È stato un viaggio della speranza tra ritardi e scioperi.", exDe: "Es war eine beschwerliche Reise zwischen Verspätungen und Streiks." },
        { it: "Spaesato", de: "orientierungslos / fremd", emoji: "😵‍💫", ex: "Appena arrivato mi sentivo spaesato.", exDe: "Gleich nach der Ankunft fühlte ich mich fremd." },
        { it: "Una tappa obbligata", de: "ein Pflichtbesuch", emoji: "⭐", ex: "Il Colosseo è una tappa obbligata.", exDe: "Das Kolosseum ist ein Pflichtbesuch." }
      ]
    }
  },
  {
    id: "trasporti", title: "I Trasporti", de: "Verkehrsmittel", emoji: "🚌", color: "#3f7d8a", area: "Reisen",
    levels: {
      A1: [
        { it: "L'autobus", de: "der Bus", emoji: "🚌", ex: "Prendo l'autobus numero dieci.", exDe: "Ich nehme den Bus Nummer zehn." },
        { it: "Il taxi", de: "das Taxi", emoji: "🚕", ex: "Chiamiamo un taxi.", exDe: "Rufen wir ein Taxi." },
        { it: "La bicicletta", de: "das Fahrrad", emoji: "🚲", ex: "Vado al lavoro in bicicletta.", exDe: "Ich fahre mit dem Rad zur Arbeit." },
        { it: "L'aereo", de: "das Flugzeug", emoji: "✈️", ex: "L'aereo decolla ora.", exDe: "Das Flugzeug hebt jetzt ab." },
        { it: "La macchina", de: "das Auto", emoji: "🚗", ex: "Noleggiamo una macchina.", exDe: "Wir mieten ein Auto." },
        { it: "La metro", de: "die U-Bahn", emoji: "🚇", ex: "La metro è veloce.", exDe: "Die U-Bahn ist schnell." }
      ],
      A2: [
        { it: "La fermata", de: "die Haltestelle", emoji: "🚏", ex: "Scendo alla prossima fermata.", exDe: "Ich steige an der nächsten Haltestelle aus." },
        { it: "Il binario", de: "das Gleis", emoji: "🛤️", ex: "Il treno parte dal binario tre.", exDe: "Der Zug fährt von Gleis drei ab." },
        { it: "Coincidenza", de: "der Anschluss", emoji: "🔁", ex: "Ho perso la coincidenza.", exDe: "Ich habe den Anschluss verpasst." },
        { it: "Andata e ritorno", de: "Hin- und Rückfahrt", emoji: "↔️", ex: "Un biglietto di andata e ritorno.", exDe: "Eine Hin- und Rückfahrkarte." },
        { it: "Timbrare il biglietto", de: "den Fahrschein entwerten", emoji: "🎟️", ex: "Ricorda di timbrare il biglietto!", exDe: "Denk daran, den Fahrschein zu entwerten!" },
        { it: "A piedi", de: "zu Fuß", emoji: "🚶", ex: "È vicino, andiamo a piedi.", exDe: "Es ist nah, gehen wir zu Fuß." }
      ],
      B1: [
        { it: "Lo sciopero", de: "der Streik", emoji: "🪧", ex: "Oggi c'è sciopero dei treni.", exDe: "Heute streiken die Züge." },
        { it: "L'ora di punta", de: "die Hauptverkehrszeit", emoji: "⏰", ex: "Evita la metro nell'ora di punta.", exDe: "Meide die U-Bahn zur Hauptverkehrszeit." },
        { it: "Fare l'autostop", de: "trampen", emoji: "👍", ex: "Da giovane facevo l'autostop.", exDe: "Als junger Mensch bin ich getrampt." },
        { it: "Restare a piedi", de: "liegen bleiben (Auto)", emoji: "🛞", ex: "Siamo rimasti a piedi in autostrada.", exDe: "Wir sind auf der Autobahn liegen geblieben." }
      ]
    }
  },
  {
    id: "lavoro", title: "Il Lavoro", de: "Die Arbeit", emoji: "💼", color: "#6b7a3f", area: "Beruf",
    levels: {
      A1: [
        { it: "Il lavoro", de: "die Arbeit", emoji: "💼", ex: "Amo il mio lavoro.", exDe: "Ich liebe meine Arbeit." },
        { it: "L'ufficio", de: "das Büro", emoji: "🏢", ex: "Vado in ufficio alle nove.", exDe: "Ich gehe um neun ins Büro." },
        { it: "Il capo", de: "der Chef", emoji: "👔", ex: "Il capo è in riunione.", exDe: "Der Chef ist in einer Besprechung." },
        { it: "Il computer", de: "der Computer", emoji: "💻", ex: "Il computer non funziona.", exDe: "Der Computer funktioniert nicht." },
        { it: "La riunione", de: "die Besprechung", emoji: "🗂️", ex: "La riunione è alle tre.", exDe: "Die Besprechung ist um drei." },
        { it: "Lo stipendio", de: "das Gehalt", emoji: "💶", ex: "Lo stipendio arriva a fine mese.", exDe: "Das Gehalt kommt am Monatsende." }
      ],
      A2: [
        { it: "Il collega", de: "der Kollege", emoji: "🧑‍🤝‍🧑", ex: "Il mio collega è simpatico.", exDe: "Mein Kollege ist sympathisch." },
        { it: "Il colloquio", de: "das Vorstellungsgespräch", emoji: "🤝", ex: "Domani ho un colloquio di lavoro.", exDe: "Morgen habe ich ein Vorstellungsgespräch." },
        { it: "Le ferie", de: "der Urlaub (vom Job)", emoji: "🏝️", ex: "Prendo le ferie ad agosto.", exDe: "Ich nehme im August Urlaub." },
        { it: "Lo straordinario", de: "die Überstunde", emoji: "🌙", ex: "Stasera faccio gli straordinari.", exDe: "Heute Abend mache ich Überstunden." },
        { it: "La scadenza", de: "die Frist / Deadline", emoji: "⏳", ex: "La scadenza è venerdì.", exDe: "Die Frist ist Freitag." },
        { it: "Il contratto", de: "der Vertrag", emoji: "📄", ex: "Ho firmato il contratto.", exDe: "Ich habe den Vertrag unterschrieben." }
      ],
      B1: [
        { it: "Il pendolare", de: "der Pendler", emoji: "🚆", ex: "Faccio il pendolare ogni giorno.", exDe: "Ich pendle jeden Tag." },
        { it: "Lo smart working", de: "Homeoffice", emoji: "🏡", ex: "Lavoro in smart working il lunedì.", exDe: "Montags arbeite ich im Homeoffice." },
        { it: "Fare carriera", de: "Karriere machen", emoji: "📈", ex: "Vuole fare carriera in fretta.", exDe: "Er will schnell Karriere machen." },
        { it: "Staccare la spina", de: "abschalten", emoji: "🔌", ex: "Nel weekend stacco la spina.", exDe: "Am Wochenende schalte ich ab." },
        { it: "Il posto fisso", de: "die feste Anstellung", emoji: "🪑", ex: "I miei sognavano per me il posto fisso.", exDe: "Meine Eltern träumten für mich von einer festen Stelle." }
      ],
      B2: [
        { it: "Avere le mani in pasta", de: "überall mitmischen", emoji: "🤝", ex: "Nel progetto ha le mani in pasta.", exDe: "Beim Projekt mischt er überall mit." },
        { it: "Lavorare sodo", de: "hart arbeiten", emoji: "💪", ex: "Ha lavorato sodo per anni.", exDe: "Er hat jahrelang hart gearbeitet." },
        { it: "Il mobbing", de: "das Mobbing", emoji: "😟", ex: "Ha denunciato il mobbing in ufficio.", exDe: "Er hat das Mobbing im Büro angezeigt." }
      ]
    }
  },
  {
    id: "scuola", title: "La Scuola", de: "Schule & Studium", emoji: "🎒", color: "#d4922a", area: "Beruf",
    levels: {
      A1: [
        { it: "La scuola", de: "die Schule", emoji: "🏫", ex: "La scuola inizia a settembre.", exDe: "Die Schule beginnt im September." },
        { it: "Il libro", de: "das Buch", emoji: "📖", ex: "Leggo un libro interessante.", exDe: "Ich lese ein interessantes Buch." },
        { it: "La penna", de: "der Stift", emoji: "🖊️", ex: "Mi presti una penna?", exDe: "Leihst du mir einen Stift?" },
        { it: "L'insegnante", de: "die Lehrkraft", emoji: "👩‍🏫", ex: "L'insegnante spiega bene.", exDe: "Die Lehrkraft erklärt gut." },
        { it: "Lo studente", de: "der Schüler / Student", emoji: "🧑‍🎓", ex: "Lo studente fa una domanda.", exDe: "Der Student stellt eine Frage." },
        { it: "Il compito", de: "die Hausaufgabe", emoji: "📝", ex: "Devo fare i compiti.", exDe: "Ich muss die Hausaufgaben machen." }
      ],
      A2: [
        { it: "L'esame", de: "die Prüfung", emoji: "🧪", ex: "Ho un esame lunedì.", exDe: "Ich habe Montag eine Prüfung." },
        { it: "Il voto", de: "die Note", emoji: "💯", ex: "Ho preso un bel voto.", exDe: "Ich habe eine gute Note bekommen." },
        { it: "La lezione", de: "der Unterricht", emoji: "📚", ex: "La lezione è noiosa oggi.", exDe: "Der Unterricht ist heute langweilig." },
        { it: "L'aula", de: "der Klassenraum", emoji: "🪑", ex: "L'aula è al primo piano.", exDe: "Der Klassenraum ist im ersten Stock." },
        { it: "La pagella", de: "das Zeugnis", emoji: "📋", ex: "La pagella arriva a giugno.", exDe: "Das Zeugnis kommt im Juni." },
        { it: "Bocciare", de: "durchfallen lassen", emoji: "❌", ex: "Spero di non essere bocciato.", exDe: "Ich hoffe, ich falle nicht durch." }
      ],
      B1: [
        { it: "La laurea", de: "der Hochschulabschluss", emoji: "🎓", ex: "Festeggiamo la sua laurea!", exDe: "Wir feiern ihren Abschluss!" },
        { it: "La borsa di studio", de: "das Stipendium", emoji: "💰", ex: "Ho vinto una borsa di studio.", exDe: "Ich habe ein Stipendium bekommen." },
        { it: "Saltare la scuola", de: "die Schule schwänzen", emoji: "🙈", ex: "Da ragazzo saltavo la scuola.", exDe: "Als Junge habe ich die Schule geschwänzt." },
        { it: "Il secchione", de: "der Streber", emoji: "🤓", ex: "In classe era il secchione.", exDe: "In der Klasse war er der Streber." },
        { it: "Studiare a memoria", de: "auswendig lernen", emoji: "🧠", ex: "Ho studiato tutto a memoria.", exDe: "Ich habe alles auswendig gelernt." }
      ]
    }
  },
  {
    id: "corpo", title: "Il Corpo", de: "Der Körper", emoji: "🧑", color: "#bd6a5a", area: "Gesundheit",
    levels: {
      A1: [
        { it: "La testa", de: "der Kopf", emoji: "🧠", ex: "Ho mal di testa.", exDe: "Ich habe Kopfschmerzen." },
        { it: "Gli occhi", de: "die Augen", emoji: "👀", ex: "Hai gli occhi belli.", exDe: "Du hast schöne Augen." },
        { it: "Il naso", de: "die Nase", emoji: "👃", ex: "Il naso è freddo.", exDe: "Die Nase ist kalt." },
        { it: "La bocca", de: "der Mund", emoji: "👄", ex: "Apri la bocca.", exDe: "Mach den Mund auf." },
        { it: "La mano", de: "die Hand", emoji: "✋", ex: "Dammi la mano.", exDe: "Gib mir die Hand." },
        { it: "Il piede", de: "der Fuß", emoji: "🦶", ex: "Il piede è piccolo.", exDe: "Der Fuß ist klein." },
        { it: "Il cuore", de: "das Herz", emoji: "❤️", ex: "Il cuore batte forte.", exDe: "Das Herz schlägt schnell." },
        { it: "I capelli", de: "die Haare", emoji: "💇", ex: "Hai i capelli ricci.", exDe: "Du hast lockige Haare." }
      ],
      A2: [
        { it: "Il braccio", de: "der Arm", emoji: "💪", ex: "Mi fa male il braccio.", exDe: "Mir tut der Arm weh." },
        { it: "La gamba", de: "das Bein", emoji: "🦵", ex: "Ho le gambe stanche.", exDe: "Ich habe müde Beine." },
        { it: "La schiena", de: "der Rücken", emoji: "🔙", ex: "Ho mal di schiena.", exDe: "Ich habe Rückenschmerzen." },
        { it: "La spalla", de: "die Schulter", emoji: "🤷", ex: "Mi sono fatto male alla spalla.", exDe: "Ich habe mir die Schulter verletzt." },
        { it: "Il dito", de: "der Finger", emoji: "👆", ex: "Mi sono tagliato un dito.", exDe: "Ich habe mir in den Finger geschnitten." },
        { it: "La pelle", de: "die Haut", emoji: "🧴", ex: "Ho la pelle sensibile.", exDe: "Ich habe empfindliche Haut." }
      ],
      B1: [
        { it: "Costare un occhio della testa", de: "ein Vermögen kosten", emoji: "💸", ex: "Quella borsa costa un occhio della testa.", exDe: "Diese Tasche kostet ein Vermögen." },
        { it: "Avere le mani bucate", de: "das Geld verprassen", emoji: "🕳️", ex: "Ha le mani bucate, spende tutto.", exDe: "Er gibt das Geld mit vollen Händen aus." },
        { it: "In gamba", de: "tüchtig / fit", emoji: "🦿", ex: "È una ragazza davvero in gamba.", exDe: "Sie ist ein wirklich tüchtiges Mädchen." },
        { it: "Avere la testa fra le nuvole", de: "verträumt sein", emoji: "☁️", ex: "Oggi hai la testa fra le nuvole.", exDe: "Heute bist du mit dem Kopf in den Wolken." }
      ]
    }
  },
  {
    id: "salute", title: "La Salute", de: "Gesundheit & Arzt", emoji: "🩺", color: "#2e7d6f", area: "Gesundheit",
    levels: {
      A1: [
        { it: "Il medico", de: "der Arzt", emoji: "👨‍⚕️", ex: "Vado dal medico.", exDe: "Ich gehe zum Arzt." },
        { it: "La farmacia", de: "die Apotheke", emoji: "💊", ex: "La farmacia è aperta.", exDe: "Die Apotheke ist offen." },
        { it: "La febbre", de: "das Fieber", emoji: "🌡️", ex: "Ho la febbre alta.", exDe: "Ich habe hohes Fieber." },
        { it: "La medicina", de: "das Medikament", emoji: "💊", ex: "Prendo la medicina dopo i pasti.", exDe: "Ich nehme die Medizin nach dem Essen." },
        { it: "Sto male", de: "Mir geht es schlecht", emoji: "🤒", ex: "Oggi sto male, resto a letto.", exDe: "Heute geht's mir schlecht, ich bleibe im Bett." },
        { it: "L'ospedale", de: "das Krankenhaus", emoji: "🏥", ex: "L'ospedale è lontano.", exDe: "Das Krankenhaus ist weit weg." }
      ],
      A2: [
        { it: "Il raffreddore", de: "die Erkältung", emoji: "🤧", ex: "Ho preso un raffreddore.", exDe: "Ich habe mir eine Erkältung geholt." },
        { it: "La ricetta", de: "das Rezept (Arzt)", emoji: "📝", ex: "Mi serve la ricetta medica.", exDe: "Ich brauche das ärztliche Rezept." },
        { it: "La tosse", de: "der Husten", emoji: "😷", ex: "Ho una tosse fastidiosa.", exDe: "Ich habe einen lästigen Husten." },
        { it: "La puntura", de: "die Spritze", emoji: "💉", ex: "L'infermiera fa la puntura.", exDe: "Die Krankenschwester gibt die Spritze." },
        { it: "Riposarsi", de: "sich ausruhen", emoji: "🛌", ex: "Devi riposarti di più.", exDe: "Du musst dich mehr ausruhen." },
        { it: "Guarire", de: "gesund werden", emoji: "🌈", ex: "Spero di guarire presto.", exDe: "Ich hoffe, bald gesund zu werden." }
      ],
      B1: [
        { it: "Il pronto soccorso", de: "die Notaufnahme", emoji: "🚑", ex: "L'hanno portato al pronto soccorso.", exDe: "Sie haben ihn in die Notaufnahme gebracht." },
        { it: "Sano come un pesce", de: "kerngesund", emoji: "🐟", ex: "A novant'anni è sano come un pesce.", exDe: "Mit neunzig ist er kerngesund." },
        { it: "Rimettersi in forma", de: "wieder fit werden", emoji: "🏃", ex: "Voglio rimettermi in forma.", exDe: "Ich will wieder in Form kommen." },
        { it: "Il colpo della strega", de: "der Hexenschuss", emoji: "🧙", ex: "Mi è venuto il colpo della strega.", exDe: "Ich habe einen Hexenschuss bekommen." }
      ]
    }
  },
  {
    id: "vestiti", title: "Vestiti & Moda", de: "Kleidung & Mode", emoji: "👗", color: "#a0568a", area: "Alltag",
    levels: {
      A1: [
        { it: "La maglietta", de: "das T-Shirt", emoji: "👕", ex: "Porto una maglietta bianca.", exDe: "Ich trage ein weißes T-Shirt." },
        { it: "I pantaloni", de: "die Hose", emoji: "👖", ex: "Questi pantaloni sono comodi.", exDe: "Diese Hose ist bequem." },
        { it: "Le scarpe", de: "die Schuhe", emoji: "👟", ex: "Le scarpe sono nuove.", exDe: "Die Schuhe sind neu." },
        { it: "Il cappotto", de: "der Mantel", emoji: "🧥", ex: "Mettiti il cappotto, fa freddo.", exDe: "Zieh den Mantel an, es ist kalt." },
        { it: "Il cappello", de: "der Hut", emoji: "🎩", ex: "Che bel cappello!", exDe: "Was für ein schöner Hut!" },
        { it: "Il vestito", de: "das Kleid / der Anzug", emoji: "👗", ex: "Indosso un vestito elegante.", exDe: "Ich trage ein elegantes Kleid." }
      ],
      A2: [
        { it: "La taglia", de: "die Größe", emoji: "📏", ex: "Che taglia porti?", exDe: "Welche Größe hast du?" },
        { it: "Il camerino", de: "die Umkleidekabine", emoji: "🚪", ex: "Posso provarlo in camerino?", exDe: "Kann ich es in der Kabine anprobieren?" },
        { it: "Mi sta bene", de: "Es steht mir", emoji: "😍", ex: "Questo colore mi sta bene.", exDe: "Diese Farbe steht mir." },
        { it: "Stretto", de: "eng", emoji: "😬", ex: "Il vestito è troppo stretto.", exDe: "Das Kleid ist zu eng." },
        { it: "I saldi", de: "der Schlussverkauf", emoji: "🏷️", ex: "Compro durante i saldi.", exDe: "Ich kaufe im Schlussverkauf." },
        { it: "Alla moda", de: "modisch", emoji: "💃", ex: "Lei è sempre alla moda.", exDe: "Sie ist immer modisch." }
      ],
      B1: [
        { it: "Vestirsi a cipolla", de: "Zwiebellook (mehrere Schichten)", emoji: "🧅", ex: "In montagna conviene vestirsi a cipolla.", exDe: "In den Bergen lohnt sich der Zwiebellook." },
        { it: "Fare bella figura", de: "eine gute Figur machen", emoji: "✨", ex: "Con questo abito fai bella figura.", exDe: "In diesem Anzug machst du eine gute Figur." },
        { it: "Su misura", de: "maßgeschneidert", emoji: "✂️", ex: "Un abito su misura costa di più.", exDe: "Ein Maßanzug kostet mehr." },
        { it: "Essere di moda", de: "in Mode sein", emoji: "🔥", ex: "Quest'anno il verde è di moda.", exDe: "Dieses Jahr ist Grün in Mode." }
      ]
    }
  },
  {
    id: "shopping", title: "Fare Shopping", de: "Einkaufen", emoji: "🛍️", color: "#c2548a", area: "Alltag",
    levels: {
      A1: [
        { it: "Comprare", de: "kaufen", emoji: "🛒", ex: "Voglio comprare il pane.", exDe: "Ich will Brot kaufen." },
        { it: "Quanto costa?", de: "Was kostet das?", emoji: "💰", ex: "Quanto costa questo?", exDe: "Wie viel kostet das hier?" },
        { it: "Il prezzo", de: "der Preis", emoji: "🏷️", ex: "Il prezzo è giusto.", exDe: "Der Preis ist in Ordnung." },
        { it: "Il supermercato", de: "der Supermarkt", emoji: "🏬", ex: "Vado al supermercato.", exDe: "Ich gehe zum Supermarkt." },
        { it: "I soldi", de: "das Geld", emoji: "💵", ex: "Non ho soldi con me.", exDe: "Ich habe kein Geld dabei." },
        { it: "Il resto", de: "das Wechselgeld", emoji: "🪙", ex: "Ecco il suo resto.", exDe: "Hier ist Ihr Wechselgeld." }
      ],
      A2: [
        { it: "Lo scontrino", de: "der Kassenbon", emoji: "🧾", ex: "Vuole lo scontrino?", exDe: "Möchten Sie den Kassenbon?" },
        { it: "La carta di credito", de: "die Kreditkarte", emoji: "💳", ex: "Pago con la carta di credito.", exDe: "Ich zahle mit Kreditkarte." },
        { it: "In contanti", de: "in bar", emoji: "💶", ex: "Preferisce pagare in contanti?", exDe: "Zahlen Sie lieber in bar?" },
        { it: "Lo sconto", de: "der Rabatt", emoji: "📉", ex: "Mi fa uno sconto?", exDe: "Geben Sie mir einen Rabatt?" },
        { it: "Il carrello", de: "der Einkaufswagen", emoji: "🛒", ex: "Il carrello è già pieno.", exDe: "Der Einkaufswagen ist schon voll." },
        { it: "La spesa", de: "der Einkauf", emoji: "🧺", ex: "Faccio la spesa il sabato.", exDe: "Ich kaufe samstags ein." }
      ],
      B1: [
        { it: "Tirare sul prezzo", de: "um den Preis feilschen", emoji: "🤏", ex: "Al mercato si può tirare sul prezzo.", exDe: "Auf dem Markt kann man feilschen." },
        { it: "Un affare", de: "ein Schnäppchen", emoji: "🤑", ex: "A quel prezzo è un vero affare.", exDe: "Zu dem Preis ist es ein echtes Schnäppchen." },
        { it: "Fregatura", de: "die Abzocke", emoji: "😤", ex: "Che fregatura, costa il triplo!", exDe: "So eine Abzocke, das kostet das Dreifache!" },
        { it: "Acquisti compulsivi", de: "Kaufrausch", emoji: "🛍️", ex: "Online faccio acquisti compulsivi.", exDe: "Online verfalle ich in Kaufrausch." }
      ]
    }
  },
  {
    id: "soldi", title: "Soldi & Banca", de: "Geld & Bank", emoji: "🏦", color: "#6b7a3f", area: "Alltag",
    levels: {
      A2: [
        { it: "Il conto in banca", de: "das Bankkonto", emoji: "🏦", ex: "Apro un conto in banca.", exDe: "Ich eröffne ein Bankkonto." },
        { it: "Il bancomat", de: "der Geldautomat", emoji: "🏧", ex: "Cerco un bancomat.", exDe: "Ich suche einen Geldautomaten." },
        { it: "Prelevare", de: "abheben", emoji: "💸", ex: "Devo prelevare cento euro.", exDe: "Ich muss hundert Euro abheben." },
        { it: "Risparmiare", de: "sparen", emoji: "🐷", ex: "Cerco di risparmiare ogni mese.", exDe: "Ich versuche jeden Monat zu sparen." },
        { it: "Il bonifico", de: "die Überweisung", emoji: "📲", ex: "Faccio un bonifico domani.", exDe: "Ich mache morgen eine Überweisung." },
        { it: "Spendere", de: "ausgeben", emoji: "🤑", ex: "Spendo troppo in caffè.", exDe: "Ich gebe zu viel für Kaffee aus." }
      ],
      B1: [
        { it: "Essere al verde", de: "pleite sein", emoji: "🥦", ex: "A fine mese sono sempre al verde.", exDe: "Am Monatsende bin ich immer pleite." },
        { it: "Un occhio di riguardo", de: "besondere Rücksicht", emoji: "👁️", ex: "La banca ha un occhio di riguardo per i clienti storici.", exDe: "Die Bank nimmt auf langjährige Kunden besondere Rücksicht." },
        { it: "Il mutuo", de: "der Immobilienkredit", emoji: "🏡", ex: "Paghiamo il mutuo da dieci anni.", exDe: "Wir zahlen seit zehn Jahren den Kredit ab." },
        { it: "Far quadrare i conti", de: "über die Runden kommen", emoji: "🧮", ex: "È dura far quadrare i conti.", exDe: "Es ist schwer, über die Runden zu kommen." }
      ],
      B2: [
        { it: "Buttare i soldi dalla finestra", de: "Geld zum Fenster hinauswerfen", emoji: "🪟", ex: "Comprarlo è buttare i soldi dalla finestra.", exDe: "Das zu kaufen ist Geldverschwendung." },
        { it: "Tirare la cinghia", de: "den Gürtel enger schnallen", emoji: "🪢", ex: "Quest'anno tocca tirare la cinghia.", exDe: "Dieses Jahr müssen wir den Gürtel enger schnallen." }
      ]
    }
  },
  {
    id: "tecnologia", title: "Tecnologia", de: "Technik & Handy", emoji: "📱", color: "#3f7d8a", area: "Alltag",
    levels: {
      A1: [
        { it: "Il telefono", de: "das Telefon", emoji: "📱", ex: "Il telefono squilla.", exDe: "Das Telefon klingelt." },
        { it: "Il messaggio", de: "die Nachricht", emoji: "💬", ex: "Ti mando un messaggio.", exDe: "Ich schicke dir eine Nachricht." },
        { it: "Internet", de: "das Internet", emoji: "🌐", ex: "Cerco su internet.", exDe: "Ich suche im Internet." },
        { it: "La password", de: "das Passwort", emoji: "🔑", ex: "Ho dimenticato la password.", exDe: "Ich habe das Passwort vergessen." },
        { it: "La foto", de: "das Foto", emoji: "📷", ex: "Facciamo una foto!", exDe: "Machen wir ein Foto!" }
      ],
      A2: [
        { it: "Lo schermo", de: "der Bildschirm", emoji: "🖥️", ex: "Lo schermo è rotto.", exDe: "Der Bildschirm ist kaputt." },
        { it: "Caricare", de: "aufladen / hochladen", emoji: "🔌", ex: "Devo caricare il telefono.", exDe: "Ich muss das Handy aufladen." },
        { it: "L'applicazione", de: "die App", emoji: "📲", ex: "Scarico una nuova applicazione.", exDe: "Ich lade eine neue App herunter." },
        { it: "Il wifi", de: "das WLAN", emoji: "📶", ex: "Qual è la password del wifi?", exDe: "Wie lautet das WLAN-Passwort?" },
        { it: "Spegnere", de: "ausschalten", emoji: "⏻", ex: "Spegni la luce, per favore.", exDe: "Mach bitte das Licht aus." },
        { it: "Il social", de: "soziale Medien", emoji: "👍", ex: "Passo troppo tempo sui social.", exDe: "Ich verbringe zu viel Zeit in sozialen Medien." }
      ],
      B1: [
        { it: "Andare in tilt", de: "abstürzen / spinnen", emoji: "🤯", ex: "Il computer è andato in tilt.", exDe: "Der Computer ist abgestürzt." },
        { it: "Essere connesso", de: "online sein", emoji: "🛜", ex: "Resto connesso tutto il giorno.", exDe: "Ich bin den ganzen Tag online." },
        { it: "Il segnale", de: "das Signal / der Empfang", emoji: "📡", ex: "Qui non prende, manca il segnale.", exDe: "Hier ist kein Empfang." },
        { it: "Diventare virale", de: "viral gehen", emoji: "🦠", ex: "Il suo video è diventato virale.", exDe: "Sein Video ist viral gegangen." }
      ]
    }
  },
  {
    id: "animali", title: "Gli Animali", de: "Die Tiere", emoji: "🐾", color: "#5f9e54", area: "Natur",
    levels: {
      A1: [
        { it: "Il cane", de: "der Hund", emoji: "🐶", ex: "Il cane abbaia.", exDe: "Der Hund bellt." },
        { it: "Il gatto", de: "die Katze", emoji: "🐱", ex: "Il gatto dorme.", exDe: "Die Katze schläft." },
        { it: "Il cavallo", de: "das Pferd", emoji: "🐴", ex: "Il cavallo corre veloce.", exDe: "Das Pferd rennt schnell." },
        { it: "L'uccello", de: "der Vogel", emoji: "🐦", ex: "L'uccello canta.", exDe: "Der Vogel singt." },
        { it: "Il pesce", de: "der Fisch", emoji: "🐠", ex: "Il pesce nuota.", exDe: "Der Fisch schwimmt." },
        { it: "Il topo", de: "die Maus", emoji: "🐭", ex: "Il topo è piccolo.", exDe: "Die Maus ist klein." }
      ],
      A2: [
        { it: "La mucca", de: "die Kuh", emoji: "🐮", ex: "La mucca fa il latte.", exDe: "Die Kuh gibt Milch." },
        { it: "Il leone", de: "der Löwe", emoji: "🦁", ex: "Il leone è il re della savana.", exDe: "Der Löwe ist der König der Savanne." },
        { it: "La farfalla", de: "der Schmetterling", emoji: "🦋", ex: "La farfalla vola tra i fiori.", exDe: "Der Schmetterling fliegt zwischen den Blumen." },
        { it: "L'ape", de: "die Biene", emoji: "🐝", ex: "L'ape fa il miele.", exDe: "Die Biene macht Honig." },
        { it: "Il maiale", de: "das Schwein", emoji: "🐷", ex: "Il maiale è nel fango.", exDe: "Das Schwein ist im Schlamm." },
        { it: "La gallina", de: "das Huhn", emoji: "🐔", ex: "La gallina fa le uova.", exDe: "Das Huhn legt Eier." }
      ],
      B1: [
        { it: "In quattro e quattr'otto", de: "im Handumdrehen", emoji: "🐇", ex: "Ha finito in quattro e quattr'otto.", exDe: "Er war im Handumdrehen fertig." },
        { it: "Essere una volpe", de: "schlau wie ein Fuchs sein", emoji: "🦊", ex: "Attento, quello è una volpe.", exDe: "Vorsicht, der ist ein schlauer Fuchs." },
        { it: "Avere una fame da lupi", de: "einen Bärenhunger haben", emoji: "🐺", ex: "Dopo la corsa ho una fame da lupi.", exDe: "Nach dem Lauf habe ich einen Bärenhunger." },
        { it: "Prendere due piccioni con una fava", de: "zwei Fliegen mit einer Klappe", emoji: "🕊️", ex: "Così prendiamo due piccioni con una fava.", exDe: "So schlagen wir zwei Fliegen mit einer Klappe." }
      ]
    }
  },
  {
    id: "natura", title: "La Natura", de: "Die Natur", emoji: "🌿", color: "#5f9e54", area: "Natur",
    levels: {
      A1: [
        { it: "L'albero", de: "der Baum", emoji: "🌳", ex: "L'albero è grande.", exDe: "Der Baum ist groß." },
        { it: "Il fiore", de: "die Blume", emoji: "🌸", ex: "Regalo un fiore alla mamma.", exDe: "Ich schenke der Mama eine Blume." },
        { it: "Il sole", de: "die Sonne", emoji: "☀️", ex: "Il sole splende.", exDe: "Die Sonne scheint." },
        { it: "La montagna", de: "der Berg", emoji: "⛰️", ex: "La montagna è alta.", exDe: "Der Berg ist hoch." },
        { it: "Il fiume", de: "der Fluss", emoji: "🏞️", ex: "Il fiume scorre lento.", exDe: "Der Fluss fließt langsam." },
        { it: "Il bosco", de: "der Wald", emoji: "🌲", ex: "Passeggiamo nel bosco.", exDe: "Wir spazieren im Wald." }
      ],
      A2: [
        { it: "Il lago", de: "der See", emoji: "🏔️", ex: "Il lago è ghiacciato.", exDe: "Der See ist zugefroren." },
        { it: "La collina", de: "der Hügel", emoji: "🌄", ex: "La collina è verde.", exDe: "Der Hügel ist grün." },
        { it: "Il prato", de: "die Wiese", emoji: "🌱", ex: "I bambini giocano nel prato.", exDe: "Die Kinder spielen auf der Wiese." },
        { it: "La stella", de: "der Stern", emoji: "⭐", ex: "Le stelle brillano stanotte.", exDe: "Die Sterne funkeln heute Nacht." },
        { it: "La foglia", de: "das Blatt", emoji: "🍃", ex: "Cade una foglia gialla.", exDe: "Ein gelbes Blatt fällt." },
        { it: "L'ambiente", de: "die Umwelt", emoji: "♻️", ex: "Proteggiamo l'ambiente.", exDe: "Schützen wir die Umwelt." }
      ],
      B2: [
        { it: "L'inquinamento", de: "die Umweltverschmutzung", emoji: "🏭", ex: "L'inquinamento è un problema serio.", exDe: "Die Umweltverschmutzung ist ein ernstes Problem." },
        { it: "Il riscaldamento globale", de: "die Erderwärmung", emoji: "🌡️", ex: "Il riscaldamento globale preoccupa tutti.", exDe: "Die Erderwärmung beunruhigt alle." },
        { it: "La raccolta differenziata", de: "die Mülltrennung", emoji: "🗑️", ex: "Qui la raccolta differenziata è obbligatoria.", exDe: "Hier ist Mülltrennung Pflicht." },
        { it: "Salvaguardare", de: "bewahren / schützen", emoji: "🛡️", ex: "Dobbiamo salvaguardare le foreste.", exDe: "Wir müssen die Wälder schützen." }
      ]
    }
  },
  {
    id: "meteo", title: "Tempo Meteo", de: "Das Wetter", emoji: "🌤️", color: "#3f93b8", area: "Natur",
    levels: {
      A1: [
        { it: "Il sole", de: "die Sonne", emoji: "☀️", ex: "C'è il sole oggi.", exDe: "Heute scheint die Sonne." },
        { it: "La pioggia", de: "der Regen", emoji: "🌧️", ex: "La pioggia cade piano.", exDe: "Der Regen fällt leise." },
        { it: "Il vento", de: "der Wind", emoji: "💨", ex: "Oggi tira vento.", exDe: "Heute ist es windig." },
        { it: "La neve", de: "der Schnee", emoji: "❄️", ex: "La neve è bianca.", exDe: "Der Schnee ist weiß." },
        { it: "Fa caldo", de: "Es ist warm", emoji: "🥵", ex: "Oggi fa molto caldo.", exDe: "Heute ist es sehr warm." },
        { it: "Fa freddo", de: "Es ist kalt", emoji: "🥶", ex: "In inverno fa freddo.", exDe: "Im Winter ist es kalt." }
      ],
      A2: [
        { it: "Le nuvole", de: "die Wolken", emoji: "☁️", ex: "Ci sono molte nuvole.", exDe: "Es gibt viele Wolken." },
        { it: "Il temporale", de: "das Gewitter", emoji: "⛈️", ex: "Arriva un temporale.", exDe: "Ein Gewitter zieht auf." },
        { it: "L'arcobaleno", de: "der Regenbogen", emoji: "🌈", ex: "Che bell'arcobaleno!", exDe: "Was für ein schöner Regenbogen!" },
        { it: "La nebbia", de: "der Nebel", emoji: "🌫️", ex: "C'è nebbia stamattina.", exDe: "Heute Morgen ist Nebel." },
        { it: "Il temporale passa", de: "Das Gewitter zieht vorbei", emoji: "🌦️", ex: "Aspetta, il temporale passa presto.", exDe: "Warte, das Gewitter zieht bald vorbei." },
        { it: "Le previsioni", de: "die Wettervorhersage", emoji: "📺", ex: "Le previsioni dicono pioggia.", exDe: "Die Vorhersage sagt Regen." }
      ],
      B1: [
        { it: "Piovere a catinelle", de: "in Strömen regnen", emoji: "🌧️", ex: "Fuori piove a catinelle.", exDe: "Draußen regnet es in Strömen." },
        { it: "Un caldo da morire", de: "eine Affenhitze", emoji: "🔥", ex: "Ad agosto fa un caldo da morire.", exDe: "Im August herrscht eine Affenhitze." },
        { it: "Il tempo è instabile", de: "das Wetter ist wechselhaft", emoji: "🌥️", ex: "Oggi il tempo è instabile.", exDe: "Heute ist das Wetter wechselhaft." },
        { it: "Sereno", de: "heiter / klar", emoji: "🌞", ex: "Domani sarà sereno.", exDe: "Morgen wird es heiter." }
      ]
    }
  },
  {
    id: "sport", title: "Lo Sport", de: "Der Sport", emoji: "⚽", color: "#1f8a4c", area: "Freizeit",
    levels: {
      A1: [
        { it: "Il calcio", de: "der Fußball", emoji: "⚽", ex: "Gioco a calcio la domenica.", exDe: "Ich spiele sonntags Fußball." },
        { it: "Correre", de: "laufen", emoji: "🏃", ex: "Corro ogni mattina.", exDe: "Ich laufe jeden Morgen." },
        { it: "Nuotare", de: "schwimmen", emoji: "🏊", ex: "Mi piace nuotare in mare.", exDe: "Ich schwimme gern im Meer." },
        { it: "La partita", de: "das Spiel / Match", emoji: "🏟️", ex: "La partita inizia alle otto.", exDe: "Das Spiel beginnt um acht." },
        { it: "La palestra", de: "das Fitnessstudio", emoji: "🏋️", ex: "Vado in palestra tre volte.", exDe: "Ich gehe dreimal ins Fitnessstudio." }
      ],
      A2: [
        { it: "La squadra", de: "die Mannschaft", emoji: "👥", ex: "La mia squadra ha vinto!", exDe: "Meine Mannschaft hat gewonnen!" },
        { it: "Vincere", de: "gewinnen", emoji: "🏆", ex: "Spero di vincere la gara.", exDe: "Ich hoffe, das Rennen zu gewinnen." },
        { it: "Perdere", de: "verlieren", emoji: "😢", ex: "Odio perdere a carte.", exDe: "Ich hasse es, beim Kartenspiel zu verlieren." },
        { it: "L'allenamento", de: "das Training", emoji: "💪", ex: "L'allenamento è duro.", exDe: "Das Training ist hart." },
        { it: "Il tifoso", de: "der Fan", emoji: "📣", ex: "Sono un tifoso della Juve.", exDe: "Ich bin Juve-Fan." },
        { it: "Pareggiare", de: "unentschieden spielen", emoji: "🤝", ex: "Abbiamo pareggiato due a due.", exDe: "Wir haben zwei zu zwei gespielt." }
      ],
      B1: [
        { it: "Essere in forma", de: "in Form sein", emoji: "🏅", ex: "Il campione è in gran forma.", exDe: "Der Meister ist in Topform." },
        { it: "Dare il massimo", de: "alles geben", emoji: "🔥", ex: "In campo dà sempre il massimo.", exDe: "Auf dem Platz gibt er immer alles." },
        { it: "Gettare la spugna", de: "das Handtuch werfen", emoji: "🧽", ex: "Non gettare la spugna così presto.", exDe: "Wirf nicht so früh das Handtuch." },
        { it: "Battere un record", de: "einen Rekord brechen", emoji: "📈", ex: "Ha battuto il record mondiale.", exDe: "Er hat den Weltrekord gebrochen." }
      ]
    }
  },
  {
    id: "tempolibero", title: "Tempo Libero", de: "Freizeit & Hobbys", emoji: "🎨", color: "#d4922a", area: "Freizeit",
    levels: {
      A1: [
        { it: "Leggere", de: "lesen", emoji: "📚", ex: "Mi piace leggere la sera.", exDe: "Ich lese gern am Abend." },
        { it: "La musica", de: "die Musik", emoji: "🎵", ex: "Ascolto musica italiana.", exDe: "Ich höre italienische Musik." },
        { it: "Il cinema", de: "das Kino", emoji: "🎬", ex: "Andiamo al cinema stasera?", exDe: "Gehen wir heute Abend ins Kino?" },
        { it: "Ballare", de: "tanzen", emoji: "💃", ex: "Adoro ballare la salsa.", exDe: "Ich liebe es, Salsa zu tanzen." },
        { it: "Il gioco", de: "das Spiel", emoji: "🎲", ex: "Facciamo un gioco?", exDe: "Spielen wir ein Spiel?" },
        { it: "Dipingere", de: "malen", emoji: "🎨", ex: "Dipingo quadri per hobby.", exDe: "Ich male Bilder als Hobby." }
      ],
      A2: [
        { it: "La passione", de: "die Leidenschaft", emoji: "❤️‍🔥", ex: "La cucina è la mia passione.", exDe: "Kochen ist meine Leidenschaft." },
        { it: "Il concerto", de: "das Konzert", emoji: "🎤", ex: "Stasera c'è un concerto in piazza.", exDe: "Heute Abend gibt es ein Konzert auf dem Platz." },
        { it: "La fotografia", de: "die Fotografie", emoji: "📸", ex: "Studio fotografia per passione.", exDe: "Ich lerne Fotografie aus Leidenschaft." },
        { it: "Il giardinaggio", de: "die Gartenarbeit", emoji: "🪴", ex: "Il nonno ama il giardinaggio.", exDe: "Der Opa liebt die Gartenarbeit." },
        { it: "Rilassarsi", de: "sich entspannen", emoji: "😌", ex: "Mi rilasso con un buon film.", exDe: "Ich entspanne mich mit einem guten Film." },
        { it: "Collezionare", de: "sammeln", emoji: "🗃️", ex: "Colleziono francobolli rari.", exDe: "Ich sammle seltene Briefmarken." }
      ],
      B1: [
        { it: "Ammazzare il tempo", de: "die Zeit totschlagen", emoji: "⏳", ex: "Gioco al telefono per ammazzare il tempo.", exDe: "Ich spiele am Handy, um die Zeit totzuschlagen." },
        { it: "Una boccata d'aria", de: "frische Luft schnappen", emoji: "🌬️", ex: "Esco a prendere una boccata d'aria.", exDe: "Ich gehe raus, um frische Luft zu schnappen." },
        { it: "Tempo ben speso", de: "gut investierte Zeit", emoji: "⌛", ex: "Quel corso è tempo ben speso.", exDe: "Dieser Kurs ist gut investierte Zeit." },
        { it: "Avere l'hobby di", de: "das Hobby haben zu", emoji: "🧩", ex: "Ho l'hobby di costruire modellini.", exDe: "Ich habe das Hobby, Modelle zu bauen." }
      ]
    }
  },
  {
    id: "musica", title: "Musica & Arte", de: "Musik & Kunst", emoji: "🎭", color: "#7a5ca0", area: "Freizeit",
    levels: {
      A2: [
        { it: "La canzone", de: "das Lied", emoji: "🎶", ex: "Questa canzone è bellissima.", exDe: "Dieses Lied ist wunderschön." },
        { it: "Il quadro", de: "das Gemälde", emoji: "🖼️", ex: "Quel quadro è di Caravaggio.", exDe: "Dieses Gemälde ist von Caravaggio." },
        { it: "Il cantante", de: "der Sänger", emoji: "🎙️", ex: "Il cantante ha una bella voce.", exDe: "Der Sänger hat eine schöne Stimme." },
        { it: "Lo strumento", de: "das Instrument", emoji: "🎻", ex: "Suoni uno strumento?", exDe: "Spielst du ein Instrument?" },
        { it: "Il pianoforte", de: "das Klavier", emoji: "🎹", ex: "Studio pianoforte da bambino.", exDe: "Ich spiele seit der Kindheit Klavier." },
        { it: "L'opera", de: "die Oper", emoji: "🎭", ex: "L'opera lirica è nata in Italia.", exDe: "Die Oper ist in Italien entstanden." }
      ],
      B1: [
        { it: "Avere orecchio", de: "ein gutes Gehör haben", emoji: "👂", ex: "Per la musica ci vuole orecchio.", exDe: "Für Musik braucht man ein gutes Gehör." },
        { it: "Un capolavoro", de: "ein Meisterwerk", emoji: "🏛️", ex: "La Gioconda è un capolavoro.", exDe: "Die Mona Lisa ist ein Meisterwerk." },
        { it: "Stonare", de: "falsch singen", emoji: "🎤", ex: "Canto sotto la doccia, ma stono.", exDe: "Ich singe unter der Dusche, aber falsch." },
        { it: "Andare a tempo", de: "im Takt sein", emoji: "🥁", ex: "Balla bene, va sempre a tempo.", exDe: "Er tanzt gut, immer im Takt." }
      ]
    }
  },
  {
    id: "emozioni", title: "Emozioni", de: "Gefühle", emoji: "💖", color: "#c2548a", area: "Soziales",
    levels: {
      A1: [
        { it: "Felice", de: "glücklich", emoji: "😄", ex: "Sono felice di vederti.", exDe: "Ich freue mich, dich zu sehen." },
        { it: "Triste", de: "traurig", emoji: "😢", ex: "Oggi mi sento triste.", exDe: "Heute bin ich traurig." },
        { it: "Stanco", de: "müde", emoji: "😴", ex: "Sono stanco morto.", exDe: "Ich bin todmüde." },
        { it: "Arrabbiato", de: "wütend", emoji: "😠", ex: "Perché sei arrabbiato?", exDe: "Warum bist du wütend?" },
        { it: "Contento", de: "zufrieden", emoji: "🙂", ex: "Sono contento del risultato.", exDe: "Ich bin mit dem Ergebnis zufrieden." },
        { it: "Innamorato", de: "verliebt", emoji: "😍", ex: "È innamorato cotto.", exDe: "Er ist bis über beide Ohren verliebt." }
      ],
      A2: [
        { it: "Avere paura", de: "Angst haben", emoji: "😱", ex: "Ho paura dei ragni.", exDe: "Ich habe Angst vor Spinnen." },
        { it: "Annoiarsi", de: "sich langweilen", emoji: "🥱", ex: "Mi annoio senza di te.", exDe: "Ohne dich langweile ich mich." },
        { it: "Sorpreso", de: "überrascht", emoji: "😲", ex: "Sono rimasto sorpreso.", exDe: "Ich war überrascht." },
        { it: "Geloso", de: "eifersüchtig", emoji: "😒", ex: "Non essere geloso!", exDe: "Sei nicht eifersüchtig!" },
        { it: "Emozionato", de: "aufgeregt / gerührt", emoji: "🥹", ex: "Sono emozionato per il viaggio.", exDe: "Ich bin aufgeregt wegen der Reise." },
        { it: "Orgoglioso", de: "stolz", emoji: "🌟", ex: "Sono orgoglioso di te.", exDe: "Ich bin stolz auf dich." }
      ],
      B1: [
        { it: "Avere un diavolo per capello", de: "fuchsteufelswild sein", emoji: "😈", ex: "Stamattina ha un diavolo per capello.", exDe: "Heute Morgen ist sie fuchsteufelswild." },
        { it: "Essere al settimo cielo", de: "im siebten Himmel sein", emoji: "☁️", ex: "Dopo la notizia ero al settimo cielo.", exDe: "Nach der Nachricht war ich im siebten Himmel." },
        { it: "Avere il magone", de: "einen Kloß im Hals haben", emoji: "😞", ex: "Alla partenza avevo il magone.", exDe: "Beim Abschied hatte ich einen Kloß im Hals." },
        { it: "Rodersi il fegato", de: "sich grämen", emoji: "😣", ex: "Non rodernti il fegato per lui.", exDe: "Gräm dich nicht seinetwegen." }
      ]
    }
  },
  {
    id: "carattere", title: "Il Carattere", de: "Charakter", emoji: "🧠", color: "#8a6d3f", area: "Soziales",
    levels: {
      A2: [
        { it: "Simpatico", de: "sympathisch", emoji: "😊", ex: "Il tuo amico è simpatico.", exDe: "Dein Freund ist sympathisch." },
        { it: "Gentile", de: "freundlich", emoji: "🤗", ex: "La signora è molto gentile.", exDe: "Die Dame ist sehr freundlich." },
        { it: "Timido", de: "schüchtern", emoji: "😳", ex: "Da piccolo ero timido.", exDe: "Als Kind war ich schüchtern." },
        { it: "Pigro", de: "faul", emoji: "🦥", ex: "La domenica sono pigro.", exDe: "Sonntags bin ich faul." },
        { it: "Generoso", de: "großzügig", emoji: "🎁", ex: "È generoso con tutti.", exDe: "Er ist großzügig zu allen." },
        { it: "Testardo", de: "stur", emoji: "🐂", ex: "Sei testardo come un mulo.", exDe: "Du bist stur wie ein Esel." }
      ],
      B1: [
        { it: "Avere la testa dura", de: "einen Dickkopf haben", emoji: "🪨", ex: "Ha la testa dura, non cambia idea.", exDe: "Er hat einen Dickkopf, er ändert seine Meinung nicht." },
        { it: "Essere alla mano", de: "umgänglich sein", emoji: "🤝", ex: "Il capo è una persona alla mano.", exDe: "Der Chef ist umgänglich." },
        { it: "Un tipo in gamba", de: "ein patenter Typ", emoji: "💪", ex: "È un tipo in gamba, ci si può fidare.", exDe: "Er ist patent, man kann ihm vertrauen." },
        { it: "Avere la puzza sotto il naso", de: "hochnäsig sein", emoji: "👃", ex: "Quella ha la puzza sotto il naso.", exDe: "Die ist ziemlich hochnäsig." }
      ]
    }
  },
  {
    id: "tempo", title: "Giorni & Tempo", de: "Tage & Zeit", emoji: "📅", color: "#6b7a3f", area: "Grundlagen",
    levels: {
      A1: [
        { it: "Lunedì", de: "Montag", emoji: "📅", ex: "Lunedì lavoro.", exDe: "Am Montag arbeite ich." },
        { it: "Venerdì", de: "Freitag", emoji: "🎉", ex: "Finalmente venerdì!", exDe: "Endlich Freitag!" },
        { it: "Sabato", de: "Samstag", emoji: "🛍️", ex: "Sabato vado al mare.", exDe: "Samstag fahre ich ans Meer." },
        { it: "Domenica", de: "Sonntag", emoji: "⛪", ex: "Domenica si riposa.", exDe: "Sonntag ruht man sich aus." },
        { it: "Oggi", de: "heute", emoji: "📍", ex: "Oggi fa bel tempo.", exDe: "Heute ist schönes Wetter." },
        { it: "Domani", de: "morgen", emoji: "➡️", ex: "A domani!", exDe: "Bis morgen!" },
        { it: "Ieri", de: "gestern", emoji: "⬅️", ex: "Ieri ho dormito tanto.", exDe: "Gestern habe ich viel geschlafen." }
      ],
      A2: [
        { it: "La settimana", de: "die Woche", emoji: "🗓️", ex: "La settimana prossima parto.", exDe: "Nächste Woche reise ich ab." },
        { it: "Il mese", de: "der Monat", emoji: "📆", ex: "Questo mese è stato lungo.", exDe: "Dieser Monat war lang." },
        { it: "Che ore sono?", de: "Wie spät ist es?", emoji: "🕐", ex: "Scusa, che ore sono?", exDe: "Entschuldige, wie spät ist es?" },
        { it: "Mezzogiorno", de: "Mittag", emoji: "🕛", ex: "Pranziamo a mezzogiorno.", exDe: "Wir essen um zwölf zu Mittag." },
        { it: "Mezzanotte", de: "Mitternacht", emoji: "🌃", ex: "La festa finisce a mezzanotte.", exDe: "Die Party endet um Mitternacht." },
        { it: "In ritardo", de: "zu spät / verspätet", emoji: "⏰", ex: "Scusa, sono in ritardo.", exDe: "Sorry, ich bin zu spät." }
      ],
      B1: [
        { it: "Fare le ore piccole", de: "bis in die Puppen aufbleiben", emoji: "🌙", ex: "Ieri abbiamo fatto le ore piccole.", exDe: "Gestern sind wir bis in die Puppen aufgeblieben." },
        { it: "Di punto in bianco", de: "ganz plötzlich", emoji: "💥", ex: "Di punto in bianco se n'è andato.", exDe: "Ganz plötzlich ist er gegangen." },
        { it: "Prendere tempo", de: "Zeit gewinnen", emoji: "⏳", ex: "Sta solo prendendo tempo.", exDe: "Er will nur Zeit gewinnen." },
        { it: "Col senno di poi", de: "im Nachhinein", emoji: "🔮", ex: "Col senno di poi, avevi ragione.", exDe: "Im Nachhinein hattest du recht." }
      ]
    }
  },
  {
    id: "colori", title: "I Colori", de: "Die Farben", emoji: "🎨", color: "#d4922a", area: "Grundlagen",
    levels: {
      A1: [
        { it: "Rosso", de: "rot", emoji: "🔴", ex: "Una mela rossa.", exDe: "Ein roter Apfel." },
        { it: "Blu", de: "blau", emoji: "🔵", ex: "Il cielo è blu.", exDe: "Der Himmel ist blau." },
        { it: "Verde", de: "grün", emoji: "🟢", ex: "Le colline sono verdi.", exDe: "Die Hügel sind grün." },
        { it: "Giallo", de: "gelb", emoji: "🟡", ex: "Il limone è giallo.", exDe: "Die Zitrone ist gelb." },
        { it: "Bianco", de: "weiß", emoji: "⚪", ex: "Vino bianco, per favore.", exDe: "Weißwein, bitte." },
        { it: "Nero", de: "schwarz", emoji: "⚫", ex: "Un caffè nero.", exDe: "Ein schwarzer Kaffee." },
        { it: "Rosa", de: "rosa", emoji: "🌸", ex: "Fiori rosa in giardino.", exDe: "Rosa Blumen im Garten." }
      ],
      A2: [
        { it: "Arancione", de: "orange", emoji: "🟠", ex: "Un tramonto arancione.", exDe: "Ein orangefarbener Sonnenuntergang." },
        { it: "Marrone", de: "braun", emoji: "🟤", ex: "Gli occhi marroni.", exDe: "Die braunen Augen." },
        { it: "Viola", de: "violett", emoji: "🟣", ex: "Un vestito viola.", exDe: "Ein violettes Kleid." },
        { it: "Grigio", de: "grau", emoji: "🌫️", ex: "Una giornata grigia.", exDe: "Ein grauer Tag." },
        { it: "Chiaro", de: "hell", emoji: "💡", ex: "Un azzurro chiaro.", exDe: "Ein helles Blau." },
        { it: "Scuro", de: "dunkel", emoji: "🌑", ex: "Preferisco i colori scuri.", exDe: "Ich mag dunkle Farben lieber." }
      ]
    }
  },
  {
    id: "verbi", title: "Verbi Utili", de: "Nützliche Verben", emoji: "🏃", color: "#7a5ca0", area: "Grundlagen",
    levels: {
      A1: [
        { it: "Essere", de: "sein", emoji: "🧍", ex: "Io sono italiano.", exDe: "Ich bin Italiener." },
        { it: "Avere", de: "haben", emoji: "🤲", ex: "Ho fame.", exDe: "Ich habe Hunger." },
        { it: "Fare", de: "machen / tun", emoji: "🔨", ex: "Cosa fai?", exDe: "Was machst du?" },
        { it: "Andare", de: "gehen / fahren", emoji: "🚶", ex: "Vado a casa.", exDe: "Ich gehe nach Hause." },
        { it: "Mangiare", de: "essen", emoji: "🍴", ex: "Mangiamo insieme.", exDe: "Wir essen zusammen." },
        { it: "Bere", de: "trinken", emoji: "🥤", ex: "Bevo un caffè.", exDe: "Ich trinke einen Kaffee." }
      ],
      A2: [
        { it: "Dormire", de: "schlafen", emoji: "😴", ex: "Dormo otto ore a notte.", exDe: "Ich schlafe acht Stunden pro Nacht." },
        { it: "Scrivere", de: "schreiben", emoji: "✍️", ex: "Scrivo una lettera.", exDe: "Ich schreibe einen Brief." },
        { it: "Leggere", de: "lesen", emoji: "📖", ex: "Leggo il giornale.", exDe: "Ich lese die Zeitung." },
        { it: "Comprare", de: "kaufen", emoji: "🛒", ex: "Compro il latte.", exDe: "Ich kaufe Milch." },
        { it: "Aprire", de: "öffnen", emoji: "🔓", ex: "Apro la finestra.", exDe: "Ich öffne das Fenster." },
        { it: "Chiudere", de: "schließen", emoji: "🔒", ex: "Chiudo la porta.", exDe: "Ich schließe die Tür." }
      ],
      B1: [
        { it: "Riuscire", de: "schaffen / gelingen", emoji: "✅", ex: "Non riesco ad aprire il barattolo.", exDe: "Ich schaffe es nicht, das Glas zu öffnen." },
        { it: "Provare", de: "versuchen / probieren", emoji: "🎯", ex: "Provo a chiamarlo di nuovo.", exDe: "Ich versuche, ihn nochmal anzurufen." },
        { it: "Accorgersi", de: "bemerken", emoji: "👁️", ex: "Non mi sono accorto dell'ora.", exDe: "Ich habe die Uhrzeit nicht bemerkt." },
        { it: "Permettersi", de: "sich leisten", emoji: "💳", ex: "Non posso permettermi una Ferrari.", exDe: "Ich kann mir keinen Ferrari leisten." }
      ]
    }
  },
  {
    id: "frasi", title: "Frasi Utili", de: "Nützliche Sätze", emoji: "💬", color: "#3f7d8a", area: "Soziales", sentences: true,
    levels: {
      A1: [
        { it: "Non capisco", de: "Ich verstehe nicht", emoji: "🤷", ex: "Scusi, non capisco.", exDe: "Entschuldigung, ich verstehe nicht." },
        { it: "Parli inglese?", de: "Sprichst du Englisch?", emoji: "🗣️", ex: "Parli inglese, per favore?", exDe: "Sprichst du bitte Englisch?" },
        { it: "Dov'è il bagno?", de: "Wo ist die Toilette?", emoji: "🚻", ex: "Scusi, dov'è il bagno?", exDe: "Entschuldigung, wo ist die Toilette?" },
        { it: "Vorrei...", de: "Ich möchte...", emoji: "🙏", ex: "Vorrei un caffè.", exDe: "Ich möchte einen Kaffee." },
        { it: "Aiuto!", de: "Hilfe!", emoji: "🆘", ex: "Aiuto, per favore!", exDe: "Hilfe, bitte!" },
        { it: "Va bene", de: "In Ordnung / Okay", emoji: "👍", ex: "Va bene, grazie.", exDe: "In Ordnung, danke." }
      ],
      A2: [
        { it: "Può ripetere?", de: "Können Sie wiederholen?", emoji: "🔁", ex: "Può ripetere più piano?", exDe: "Können Sie langsamer wiederholen?" },
        { it: "Come si dice...?", de: "Wie sagt man...?", emoji: "❓", ex: "Come si dice questo in italiano?", exDe: "Wie sagt man das auf Italienisch?" },
        { it: "Non ne ho idea", de: "Ich habe keine Ahnung", emoji: "🤔", ex: "Dov'è? Non ne ho idea.", exDe: "Wo ist es? Keine Ahnung." },
        { it: "Che peccato!", de: "Wie schade!", emoji: "😔", ex: "Piove? Che peccato!", exDe: "Es regnet? Wie schade!" },
        { it: "Magari!", de: "Schön wär's!", emoji: "🌠", ex: "Vinci tu? Magari!", exDe: "Du gewinnst? Schön wär's!" },
        { it: "Dipende", de: "Es kommt darauf an", emoji: "⚖️", ex: "Vieni? Dipende dal tempo.", exDe: "Kommst du? Kommt aufs Wetter an." }
      ],
      B1: [
        { it: "Non vedo l'ora", de: "Ich kann es kaum erwarten", emoji: "🤩", ex: "Non vedo l'ora che arrivi l'estate.", exDe: "Ich kann den Sommer kaum erwarten." },
        { it: "Mi raccomando!", de: "Pass bloß auf! / Denk dran!", emoji: "☝️", ex: "Guida piano, mi raccomando!", exDe: "Fahr langsam, denk dran!" },
        { it: "Tanto per cambiare", de: "wie immer (ironisch)", emoji: "🙄", ex: "Sei in ritardo, tanto per cambiare.", exDe: "Du bist zu spät, wie immer." },
        { it: "Alla buon'ora!", de: "Na endlich!", emoji: "⏰", ex: "Sei arrivato? Alla buon'ora!", exDe: "Du bist da? Na endlich!" }
      ]
    }
  },
  {
    id: "indicazioni", title: "Chiedere la Strada", de: "Nach dem Weg fragen", emoji: "🧭", color: "#3f8a6b", area: "Reisen", sentences: true,
    levels: {
      A1: [
        { it: "Dov'è la stazione?", de: "Wo ist der Bahnhof?", emoji: "🚉", ex: "Scusi, dov'è la stazione?", exDe: "Entschuldigung, wo ist der Bahnhof?" },
        { it: "A destra", de: "nach rechts", emoji: "➡️", ex: "Giri a destra qui.", exDe: "Biegen Sie hier rechts ab." },
        { it: "A sinistra", de: "nach links", emoji: "⬅️", ex: "La banca è a sinistra.", exDe: "Die Bank ist links." },
        { it: "Sempre dritto", de: "immer geradeaus", emoji: "⬆️", ex: "Vada sempre dritto.", exDe: "Gehen Sie immer geradeaus." },
        { it: "Vicino", de: "in der Nähe", emoji: "📍", ex: "È qui vicino.", exDe: "Es ist hier in der Nähe." },
        { it: "Lontano", de: "weit weg", emoji: "🛣️", ex: "È lontano da qui?", exDe: "Ist es weit von hier?" }
      ],
      A2: [
        { it: "Mi sono perso", de: "Ich habe mich verlaufen", emoji: "😕", ex: "Aiuto, mi sono perso.", exDe: "Hilfe, ich habe mich verlaufen." },
        { it: "Quanto ci vuole?", de: "Wie lange dauert es?", emoji: "⏱️", ex: "Quanto ci vuole a piedi?", exDe: "Wie lange dauert es zu Fuß?" },
        { it: "All'angolo", de: "an der Ecke", emoji: "📐", ex: "Il bar è all'angolo.", exDe: "Die Bar ist an der Ecke." },
        { it: "Di fronte a", de: "gegenüber von", emoji: "🔄", ex: "È di fronte alla chiesa.", exDe: "Es ist gegenüber der Kirche." },
        { it: "Dietro l'angolo", de: "um die Ecke", emoji: "↪️", ex: "La farmacia è dietro l'angolo.", exDe: "Die Apotheke ist um die Ecke." },
        { it: "Attraversare", de: "überqueren", emoji: "🚸", ex: "Attraversi al semaforo.", exDe: "Überqueren Sie an der Ampel." }
      ]
    }
  },

  /* ===================== GRAMMATICA ===================== */
  {
    id: "gr-articoli", title: "Gli Articoli", de: "Bestimmte Artikel", emoji: "🔤", color: "#7a5ca0", area: "Grammatica", grammar: true,
    rule: "il (mask.), lo (vor s+Kons., z, gn, ps), la (fem.), l' (vor Vokal). Plural: i, gli, le.",
    levels: {
      A1: [
        { it: "il", de: "der (mask., vor Konsonant): il libro", emoji: "📘", ex: "Il libro è sul tavolo.", exDe: "Das Buch ist auf dem Tisch." },
        { it: "lo", de: "der (mask., vor s+Kons./z): lo zaino", emoji: "🎒", ex: "Lo zaino è pesante.", exDe: "Der Rucksack ist schwer." },
        { it: "la", de: "die (fem.): la casa", emoji: "🏠", ex: "La casa è grande.", exDe: "Das Haus ist groß." },
        { it: "l'", de: "der/die (vor Vokal): l'amico", emoji: "🧑", ex: "L'amico arriva tardi.", exDe: "Der Freund kommt spät." },
        { it: "i", de: "die (mask. Plural): i libri", emoji: "📚", ex: "I libri sono nuovi.", exDe: "Die Bücher sind neu." },
        { it: "gli", de: "die (mask. Plural vor Vokal/s+K./z): gli amici", emoji: "👬", ex: "Gli amici sono qui.", exDe: "Die Freunde sind hier." },
        { it: "le", de: "die (fem. Plural): le case", emoji: "🏘️", ex: "Le case sono vecchie.", exDe: "Die Häuser sind alt." }
      ],
      A2: [
        { it: "lo studente", de: "Bei s+Konsonant → lo/gli", emoji: "🧑‍🎓", ex: "Lo studente legge; gli studenti ascoltano.", exDe: "Der Student liest; die Studenten hören zu." },
        { it: "l'orologio", de: "Vor Vokal → l' (mask.)", emoji: "⌚", ex: "L'orologio è rotto.", exDe: "Die Uhr ist kaputt." },
        { it: "gli gnocchi", de: "Vor gn/ps/z → lo/gli", emoji: "🥟", ex: "Gli gnocchi sono pronti.", exDe: "Die Gnocchi sind fertig." },
        { it: "lo zucchero", de: "Vor z → lo", emoji: "🧂", ex: "Passami lo zucchero.", exDe: "Reich mir den Zucker." }
      ]
    }
  },
  {
    id: "gr-indeterminativi", title: "Un, Uno, Una", de: "Unbestimmte Artikel", emoji: "1️⃣", color: "#2e7d6f", area: "Grammatica", grammar: true,
    rule: "un (mask.), uno (vor s+Kons./z/gn/ps), una (fem.), un' (fem. vor Vokal).",
    levels: {
      A1: [
        { it: "un", de: "ein (mask.): un caffè", emoji: "☕", ex: "Vorrei un caffè.", exDe: "Ich möchte einen Kaffee." },
        { it: "uno", de: "ein (mask. vor s+Kons./z): uno specchio", emoji: "🪞", ex: "Compro uno specchio.", exDe: "Ich kaufe einen Spiegel." },
        { it: "una", de: "eine (fem.): una mela", emoji: "🍎", ex: "Mangio una mela.", exDe: "Ich esse einen Apfel." },
        { it: "un'", de: "eine (fem. vor Vokal): un'amica", emoji: "👩", ex: "Ho un'amica a Roma.", exDe: "Ich habe eine Freundin in Rom." }
      ],
      A2: [
        { it: "uno zaino", de: "uno vor z: uno zaino", emoji: "🎒", ex: "Porto uno zaino blu.", exDe: "Ich trage einen blauen Rucksack." },
        { it: "un'ora", de: "un' (fem.) vor Vokal: un'ora", emoji: "🕐", ex: "Aspetto da un'ora.", exDe: "Ich warte seit einer Stunde." },
        { it: "un uomo", de: "un (mask.) auch vor Vokal: un uomo", emoji: "👨", ex: "C'è un uomo alla porta.", exDe: "Es ist ein Mann an der Tür." }
      ]
    }
  },
  {
    id: "gr-plurale", title: "Il Plurale", de: "Die Mehrzahl", emoji: "➕", color: "#c75b39", area: "Grammatica", grammar: true,
    rule: "-o → -i (libro/libri), -a → -e (casa/case), -e → -i (cane/cani).",
    levels: {
      A1: [
        { it: "libro → libri", de: "-o wird zu -i", emoji: "📚", ex: "Un libro, due libri.", exDe: "Ein Buch, zwei Bücher." },
        { it: "casa → case", de: "-a wird zu -e", emoji: "🏘️", ex: "Una casa, tre case.", exDe: "Ein Haus, drei Häuser." },
        { it: "cane → cani", de: "-e wird zu -i", emoji: "🐶", ex: "Un cane, molti cani.", exDe: "Ein Hund, viele Hunde." }
      ],
      A2: [
        { it: "amico → amici", de: "-co/-go meist -chi/-ghi, aber amico → amici", emoji: "👬", ex: "Un amico, tanti amici.", exDe: "Ein Freund, viele Freunde." },
        { it: "città → città", de: "Endbetonte & Fremdwörter unverändert", emoji: "🏙️", ex: "Una città, due città.", exDe: "Eine Stadt, zwei Städte." },
        { it: "uovo → uova", de: "Unregelmäßig: uovo → uova (fem. Pl.)", emoji: "🥚", ex: "Un uovo, sei uova.", exDe: "Ein Ei, sechs Eier." },
        { it: "mano → mani", de: "mano ist fem.: la mano → le mani", emoji: "✋", ex: "Lavati le mani!", exDe: "Wasch dir die Hände!" }
      ]
    }
  },
  {
    id: "gr-preposizioni", title: "Le Preposizioni", de: "Präpositionen", emoji: "🔗", color: "#5a7d9b", area: "Grammatica", grammar: true,
    rule: "di, a, da, in, con, su, per, tra/fra — oft anders als im Deutschen.",
    levels: {
      A1: [
        { it: "a", de: "in/nach (Stadt) / um (Zeit): a Roma", emoji: "📍", ex: "Vado a Roma alle otto.", exDe: "Ich fahre um acht nach Rom." },
        { it: "in", de: "in (Land/Mittel): in Italia, in treno", emoji: "🚆", ex: "Vivo in Italia.", exDe: "Ich lebe in Italien." },
        { it: "di", de: "von/aus (Herkunft/Besitz): di Marco", emoji: "🔑", ex: "È il libro di Marco.", exDe: "Es ist Marcos Buch." },
        { it: "con", de: "mit: con te", emoji: "🤝", ex: "Vengo con te.", exDe: "Ich komme mit dir." }
      ],
      A2: [
        { it: "da", de: "von/seit/bei: da lunedì, dal medico", emoji: "📅", ex: "Lavoro qui da lunedì.", exDe: "Ich arbeite seit Montag hier." },
        { it: "su", de: "auf/über: sul tavolo", emoji: "⬆️", ex: "Il gatto è su una sedia.", exDe: "Die Katze ist auf einem Stuhl." },
        { it: "per", de: "für/nach (Richtung): per te", emoji: "🎁", ex: "Questo è per te.", exDe: "Das ist für dich." },
        { it: "tra / fra", de: "zwischen / in (Zeit): tra dieci minuti", emoji: "⏳", ex: "Arrivo tra dieci minuti.", exDe: "Ich komme in zehn Minuten." }
      ],
      B1: [
        { it: "andare a piedi", de: "a für Art und Weise: a piedi", emoji: "🚶", ex: "Ci vado a piedi.", exDe: "Ich gehe zu Fuß hin." },
        { it: "pensare a", de: "Verb + a: pensare a qualcuno", emoji: "💭", ex: "Penso sempre a te.", exDe: "Ich denke immer an dich." },
        { it: "avere voglia di", de: "Verb + di: aver voglia di", emoji: "😋", ex: "Ho voglia di una pizza.", exDe: "Ich habe Lust auf eine Pizza." }
      ]
    }
  },
  {
    id: "gr-articolate", title: "Preposizioni Articolate", de: "Verschmolzene Präpositionen", emoji: "🧩", color: "#8a2e3b", area: "Grammatica", grammar: true,
    rule: "a+il=al, di+il=del, in+il=nel, su+il=sul, da+il=dal … (Präposition + Artikel).",
    levels: {
      A2: [
        { it: "al", de: "a + il = al: al cinema", emoji: "🎬", ex: "Andiamo al cinema.", exDe: "Wir gehen ins Kino." },
        { it: "del", de: "di + il = del: del pane", emoji: "🍞", ex: "Vorrei del pane.", exDe: "Ich möchte etwas Brot." },
        { it: "nel", de: "in + il = nel: nel bicchiere", emoji: "🥛", ex: "C'è acqua nel bicchiere.", exDe: "Es ist Wasser im Glas." },
        { it: "sul", de: "su + il = sul: sul tavolo", emoji: "🪑", ex: "Le chiavi sono sul tavolo.", exDe: "Die Schlüssel sind auf dem Tisch." },
        { it: "dalla", de: "da + la = dalla: dalla nonna", emoji: "👵", ex: "Vado dalla nonna.", exDe: "Ich gehe zur Oma." },
        { it: "negli", de: "in + gli = negli: negli occhi", emoji: "👀", ex: "Ti guardo negli occhi.", exDe: "Ich schaue dir in die Augen." }
      ]
    }
  },
  {
    id: "gr-pronomi", title: "I Pronomi", de: "Pronomen", emoji: "👈", color: "#c2548a", area: "Grammatica", grammar: true,
    rule: "Direkt: mi, ti, lo/la, ci, vi, li/le. Indirekt: mi, ti, gli/le, ci, vi, gli.",
    levels: {
      A2: [
        { it: "mi", de: "mir/mich: mi chiami?", emoji: "🙋", ex: "Mi chiami più tardi?", exDe: "Rufst du mich später an?" },
        { it: "ti", de: "dir/dich: ti amo", emoji: "❤️", ex: "Ti amo da morire.", exDe: "Ich liebe dich wahnsinnig." },
        { it: "lo / la", de: "ihn/sie/es: lo vedo", emoji: "👀", ex: "Conosci Marco? Sì, lo conosco.", exDe: "Kennst du Marco? Ja, ich kenne ihn." },
        { it: "ci", de: "uns / dort: ci vediamo", emoji: "👥", ex: "Ci vediamo domani.", exDe: "Wir sehen uns morgen." }
      ],
      B1: [
        { it: "gli", de: "ihm (indirekt): gli scrivo", emoji: "✉️", ex: "Gli scrivo un messaggio.", exDe: "Ich schreibe ihm eine Nachricht." },
        { it: "le", de: "ihr (indirekt): le telefono", emoji: "📞", ex: "Le telefono stasera.", exDe: "Ich rufe sie heute Abend an." },
        { it: "ne", de: "davon: ne voglio due", emoji: "✌️", ex: "Quante mele? Ne prendo due.", exDe: "Wie viele Äpfel? Ich nehme zwei davon." },
        { it: "glielo", de: "es ihm: glielo dico", emoji: "🗣️", ex: "Glielo dico io.", exDe: "Ich sag's ihm." }
      ]
    }
  },
  {
    id: "gr-possessivi", title: "I Possessivi", de: "Possessivbegleiter", emoji: "🫳", color: "#d4922a", area: "Grammatica", grammar: true,
    rule: "il mio, il tuo, il suo, il nostro, il vostro, il loro — mit Artikel, außer bei Verwandten im Singular.",
    levels: {
      A2: [
        { it: "il mio", de: "mein: il mio cane", emoji: "🐶", ex: "Il mio cane è grande.", exDe: "Mein Hund ist groß." },
        { it: "la mia", de: "meine (fem.): la mia casa", emoji: "🏠", ex: "La mia casa è piccola.", exDe: "Mein Haus ist klein." },
        { it: "il tuo", de: "dein: il tuo telefono", emoji: "📱", ex: "Dov'è il tuo telefono?", exDe: "Wo ist dein Telefon?" },
        { it: "mia madre", de: "Verwandte Singular ohne Artikel: mia madre", emoji: "👩", ex: "Mia madre cucina bene.", exDe: "Meine Mutter kocht gut." },
        { it: "i nostri", de: "unsere (Pl.): i nostri amici", emoji: "👨‍👩‍👧", ex: "I nostri amici arrivano.", exDe: "Unsere Freunde kommen." },
        { it: "il loro", de: "ihr (von ihnen): il loro figlio", emoji: "👶", ex: "Il loro figlio è simpatico.", exDe: "Ihr Sohn ist sympathisch." }
      ]
    }
  },
  {
    id: "gr-comparativi", title: "Comparativi", de: "Steigerung & Vergleich", emoji: "📊", color: "#1f8a4c", area: "Grammatica", grammar: true,
    rule: "più … di (mehr als), meno … di (weniger als), (così) come (so wie), il più … (am meisten).",
    levels: {
      B1: [
        { it: "più ... di", de: "mehr ... als: più alto di", emoji: "📈", ex: "Marco è più alto di Luca.", exDe: "Marco ist größer als Luca." },
        { it: "meno ... di", de: "weniger ... als: meno caro di", emoji: "📉", ex: "Questo è meno caro di quello.", exDe: "Das ist weniger teuer als jenes." },
        { it: "come", de: "(so) wie: bianco come la neve", emoji: "⚖️", ex: "È veloce come il vento.", exDe: "Er ist schnell wie der Wind." },
        { it: "il più ... ", de: "der/die/das ... -ste: il più bello", emoji: "🏆", ex: "È il ristorante più buono della città.", exDe: "Es ist das beste Restaurant der Stadt." },
        { it: "migliore", de: "besser/beste (unregelmäßig): migliore", emoji: "🥇", ex: "Questo vino è migliore.", exDe: "Dieser Wein ist besser." },
        { it: "peggio", de: "schlechter (Adverb): va peggio", emoji: "👎", ex: "Oggi sto peggio di ieri.", exDe: "Heute geht's mir schlechter als gestern." }
      ]
    }
  },
  {
    id: "gr-cesono", title: "C'è e Ci sono", de: "Es gibt …", emoji: "📦", color: "#3f93b8", area: "Grammatica", grammar: true,
    rule: "c'è + Singular, ci sono + Plural. Frage: c'è …? Verneinung: non c'è.",
    levels: {
      A1: [
        { it: "c'è", de: "es gibt (Sing.): c'è un problema", emoji: "1️⃣", ex: "C'è un gatto in giardino.", exDe: "Es ist eine Katze im Garten." },
        { it: "ci sono", de: "es gibt (Pl.): ci sono molti", emoji: "🔢", ex: "Ci sono molti turisti.", exDe: "Es gibt viele Touristen." },
        { it: "c'è ...?", de: "Gibt es …? c'è il wifi?", emoji: "❓", ex: "Scusi, c'è il wifi qui?", exDe: "Entschuldigung, gibt es hier WLAN?" },
        { it: "non c'è", de: "es gibt kein: non c'è tempo", emoji: "🚫", ex: "Non c'è più latte.", exDe: "Es gibt keine Milch mehr." }
      ]
    }
  },
  {
    id: "gr-dimostrativi", title: "Questo e Quello", de: "Dieser & Jener", emoji: "👉", color: "#9b6b3f", area: "Grammatica", grammar: true,
    rule: "questo/a (hier, nah), quello/a (dort, fern). quello passt sich an wie der Artikel an: quel, quello, quell', quei, quegli.",
    levels: {
      A2: [
        { it: "questo", de: "dieser (nah): questo libro", emoji: "📘", ex: "Questo libro è mio.", exDe: "Dieses Buch ist meins." },
        { it: "questa", de: "diese (fem.): questa sera", emoji: "🌆", ex: "Questa sera usciamo.", exDe: "Heute Abend gehen wir aus." },
        { it: "quello", de: "jener (fern): quello là", emoji: "👉", ex: "Voglio quello là.", exDe: "Ich will jenen dort." },
        { it: "quel", de: "quel + Konsonant: quel ragazzo", emoji: "👦", ex: "Chi è quel ragazzo?", exDe: "Wer ist dieser Junge?" },
        { it: "quei", de: "jene (mask. Pl.): quei giorni", emoji: "📅", ex: "Ricordo quei giorni.", exDe: "Ich erinnere mich an jene Tage." }
      ]
    }
  },
  {
    id: "gr-passato", title: "Passato vs Imperfetto", de: "Perfekt oder Imperfekt?", emoji: "⏮️", color: "#7a5ca0", area: "Grammatica", grammar: true,
    rule: "Passato prossimo = abgeschlossene Handlung. Imperfetto = Hintergrund, Gewohnheit, Beschreibung.",
    levels: {
      B1: [
        { it: "ho mangiato", de: "abgeschlossen → Passato: ho mangiato", emoji: "✅", ex: "Ieri ho mangiato una pizza.", exDe: "Gestern habe ich eine Pizza gegessen." },
        { it: "mangiavo", de: "Gewohnheit → Imperfetto: mangiavo", emoji: "🔁", ex: "Da bambino mangiavo molti dolci.", exDe: "Als Kind aß ich viele Süßigkeiten." },
        { it: "era", de: "Beschreibung → Imperfetto: era bello", emoji: "🖼️", ex: "Era una bella giornata.", exDe: "Es war ein schöner Tag." },
        { it: "è arrivato", de: "Ereignis → Passato: è arrivato", emoji: "🚪", ex: "Mentre dormivo, è arrivato Marco.", exDe: "Während ich schlief, kam Marco an." },
        { it: "faceva freddo", de: "Wetter im Hintergrund → Imperfetto", emoji: "🥶", ex: "Faceva freddo e nevicava.", exDe: "Es war kalt und es schneite." }
      ]
    }
  },
  {
    id: "gr-negazione", title: "La Negazione", de: "Die Verneinung", emoji: "🚫", color: "#cd2b2b", area: "Grammatica", grammar: true,
    rule: "non vor dem Verb. Doppelte Verneinung ist normal: non … niente / mai / nessuno / più.",
    levels: {
      A2: [
        { it: "non", de: "nicht: non capisco", emoji: "🚫", ex: "Non capisco la domanda.", exDe: "Ich verstehe die Frage nicht." },
        { it: "non ... niente", de: "nichts: non ho niente", emoji: "0️⃣", ex: "Non ho capito niente.", exDe: "Ich habe nichts verstanden." },
        { it: "non ... mai", de: "nie: non vado mai", emoji: "🌚", ex: "Non bevo mai alcol.", exDe: "Ich trinke nie Alkohol." },
        { it: "non ... nessuno", de: "niemand: non c'è nessuno", emoji: "👻", ex: "Non c'è nessuno in casa.", exDe: "Es ist niemand zu Hause." },
        { it: "non ... più", de: "nicht mehr: non più", emoji: "🛑", ex: "Non ti amo più.", exDe: "Ich liebe dich nicht mehr." },
        { it: "non ... ancora", de: "noch nicht: non ancora", emoji: "⏳", ex: "Non ho ancora finito.", exDe: "Ich bin noch nicht fertig." }
      ]
    }
  },
  {
    id: "gr-interrogativi", title: "Le Domande", de: "Fragewörter", emoji: "❓", color: "#3f8a6b", area: "Grammatica", grammar: true,
    rule: "chi, che/cosa, dove, quando, perché, come, quanto — am Satzanfang.",
    levels: {
      A1: [
        { it: "chi?", de: "wer?: chi è?", emoji: "🧑", ex: "Chi è quella ragazza?", exDe: "Wer ist dieses Mädchen?" },
        { it: "cosa?", de: "was?: cosa fai?", emoji: "🤔", ex: "Cosa fai stasera?", exDe: "Was machst du heute Abend?" },
        { it: "dove?", de: "wo/wohin?: dove vai?", emoji: "📍", ex: "Dove vai in vacanza?", exDe: "Wohin fährst du in den Urlaub?" },
        { it: "quando?", de: "wann?: quando arrivi?", emoji: "📅", ex: "Quando arrivi a casa?", exDe: "Wann kommst du nach Hause?" },
        { it: "perché?", de: "warum?: perché ridi?", emoji: "🙃", ex: "Perché ridi così tanto?", exDe: "Warum lachst du so sehr?" },
        { it: "quanto?", de: "wie viel?: quanto costa?", emoji: "💰", ex: "Quanto costa il biglietto?", exDe: "Wie viel kostet das Ticket?" }
      ]
    }
  },
  {
    id: "cucina", title: "In Cucina", de: "In der Küche", emoji: "🍳", color: "#b8442e", area: "Alltag",
    levels: {
      A1: [
        { it: "La pentola", de: "der Topf", emoji: "🍲", ex: "L'acqua bolle nella pentola.", exDe: "Das Wasser kocht im Topf." },
        { it: "Il coltello", de: "das Messer", emoji: "🔪", ex: "Il coltello è affilato.", exDe: "Das Messer ist scharf." },
        { it: "La forchetta", de: "die Gabel", emoji: "🍴", ex: "Mangio con la forchetta.", exDe: "Ich esse mit der Gabel." },
        { it: "Il piatto", de: "der Teller", emoji: "🍽️", ex: "Il piatto è caldo.", exDe: "Der Teller ist heiß." },
        { it: "Il cucchiaio", de: "der Löffel", emoji: "🥄", ex: "Mi serve un cucchiaio.", exDe: "Ich brauche einen Löffel." },
        { it: "Il forno", de: "der Ofen", emoji: "🔥", ex: "La torta è nel forno.", exDe: "Der Kuchen ist im Ofen." }
      ],
      A2: [
        { it: "Bollire", de: "kochen (Wasser)", emoji: "♨️", ex: "Fai bollire la pasta otto minuti.", exDe: "Lass die Pasta acht Minuten kochen." },
        { it: "Friggere", de: "braten / frittieren", emoji: "🍳", ex: "Friggo le patate in padella.", exDe: "Ich brate die Kartoffeln in der Pfanne." },
        { it: "Assaggiare", de: "probieren / abschmecken", emoji: "👅", ex: "Assaggia il sugo, è buono?", exDe: "Probier die Soße, ist sie gut?" },
        { it: "La ricetta", de: "das Rezept", emoji: "📜", ex: "Seguo la ricetta passo passo.", exDe: "Ich folge dem Rezept Schritt für Schritt." },
        { it: "Mescolare", de: "umrühren", emoji: "🥄", ex: "Mescola bene il composto.", exDe: "Rühre die Masse gut um." },
        { it: "Il grembiule", de: "die Schürze", emoji: "🧑‍🍳", ex: "Metti il grembiule, schizza tutto!", exDe: "Zieh die Schürze an, es spritzt alles!" }
      ],
      B1: [
        { it: "Cuocere a puntino", de: "auf den Punkt garen", emoji: "🎯", ex: "La bistecca è cotta a puntino.", exDe: "Das Steak ist auf den Punkt gegart." },
        { it: "Far bollire in pentola", de: "—", emoji: "🍲", ex: "Lascia sobbollire a fuoco lento.", exDe: "Lass es bei kleiner Flamme köcheln." },
        { it: "Troppi cuochi guastano la cucina", de: "viele Köche verderben den Brei", emoji: "👨‍🍳", ex: "Calma, troppi cuochi guastano la cucina!", exDe: "Ruhig, viele Köche verderben den Brei!" }
      ]
    }
  },
  {
    id: "fruttaverdura", title: "Frutta e Verdura", de: "Obst & Gemüse", emoji: "🥕", color: "#5f9e54", area: "Alltag",
    levels: {
      A1: [
        { it: "La mela", de: "der Apfel", emoji: "🍎", ex: "Una mela al giorno.", exDe: "Ein Apfel am Tag." },
        { it: "La banana", de: "die Banane", emoji: "🍌", ex: "La banana è matura.", exDe: "Die Banane ist reif." },
        { it: "Il pomodoro", de: "die Tomate", emoji: "🍅", ex: "Il pomodoro è rosso.", exDe: "Die Tomate ist rot." },
        { it: "L'arancia", de: "die Orange", emoji: "🍊", ex: "Spremo un'arancia.", exDe: "Ich presse eine Orange aus." },
        { it: "La patata", de: "die Kartoffel", emoji: "🥔", ex: "Le patate sono fritte.", exDe: "Die Kartoffeln sind frittiert." },
        { it: "L'uva", de: "die Trauben", emoji: "🍇", ex: "L'uva è dolce.", exDe: "Die Trauben sind süß." }
      ],
      A2: [
        { it: "La fragola", de: "die Erdbeere", emoji: "🍓", ex: "Adoro le fragole con la panna.", exDe: "Ich liebe Erdbeeren mit Sahne." },
        { it: "La carota", de: "die Karotte", emoji: "🥕", ex: "Il coniglio mangia la carota.", exDe: "Das Kaninchen frisst die Karotte." },
        { it: "L'insalata", de: "der Salat", emoji: "🥗", ex: "Condisco l'insalata con olio.", exDe: "Ich mache den Salat mit Öl an." },
        { it: "La cipolla", de: "die Zwiebel", emoji: "🧅", ex: "La cipolla mi fa piangere.", exDe: "Die Zwiebel bringt mich zum Weinen." },
        { it: "Il limone", de: "die Zitrone", emoji: "🍋", ex: "Un po' di limone sul pesce.", exDe: "Etwas Zitrone auf den Fisch." },
        { it: "Maturo", de: "reif", emoji: "✅", ex: "Questa pera non è ancora matura.", exDe: "Diese Birne ist noch nicht reif." }
      ]
    }
  },
  {
    id: "bar", title: "Bevande al Bar", de: "Getränke an der Bar", emoji: "🍹", color: "#a86b2f", area: "Alltag",
    levels: {
      A1: [
        { it: "Il cappuccino", de: "der Cappuccino", emoji: "☕", ex: "Un cappuccino e un cornetto.", exDe: "Einen Cappuccino und ein Hörnchen." },
        { it: "Il succo", de: "der Saft", emoji: "🧃", ex: "Un succo d'arancia, grazie.", exDe: "Einen Orangensaft, danke." },
        { it: "La birra", de: "das Bier", emoji: "🍺", ex: "Una birra media, per favore.", exDe: "Ein mittleres Bier, bitte." },
        { it: "Il tè", de: "der Tee", emoji: "🍵", ex: "Un tè caldo al limone.", exDe: "Ein heißer Tee mit Zitrone." },
        { it: "La spremuta", de: "der frische Saft", emoji: "🍊", ex: "Una spremuta fresca, grazie.", exDe: "Einen frisch gepressten Saft, danke." }
      ],
      A2: [
        { it: "L'aperitivo", de: "der Aperitif", emoji: "🥂", ex: "Ci prendiamo un aperitivo?", exDe: "Nehmen wir einen Aperitif?" },
        { it: "Lo spritz", de: "der Spritz", emoji: "🍹", ex: "Uno spritz al tramonto è perfetto.", exDe: "Ein Spritz zum Sonnenuntergang ist perfekt." },
        { it: "Liscio o gassato", de: "still oder mit Kohlensäure", emoji: "💧", ex: "Acqua: liscia o gassata?", exDe: "Wasser: still oder mit Kohlensäure?" },
        { it: "Il ghiaccio", de: "das Eis (Würfel)", emoji: "🧊", ex: "Con o senza ghiaccio?", exDe: "Mit oder ohne Eis?" },
        { it: "Alla salute!", de: "Zum Wohl!", emoji: "🥂", ex: "Alla salute, amici!", exDe: "Zum Wohl, Freunde!" }
      ]
    }
  },
  {
    id: "feste", title: "Feste & Tradizioni", de: "Feste & Traditionen", emoji: "🎉", color: "#c2548a", area: "Soziales",
    levels: {
      A2: [
        { it: "Il compleanno", de: "der Geburtstag", emoji: "🎂", ex: "Oggi è il mio compleanno!", exDe: "Heute ist mein Geburtstag!" },
        { it: "Il regalo", de: "das Geschenk", emoji: "🎁", ex: "Ti ho preso un regalo.", exDe: "Ich habe dir ein Geschenk besorgt." },
        { it: "Natale", de: "Weihnachten", emoji: "🎄", ex: "A Natale torno a casa.", exDe: "An Weihnachten fahre ich nach Hause." },
        { it: "Capodanno", de: "Silvester / Neujahr", emoji: "🎆", ex: "Capodanno in piazza con i fuochi.", exDe: "Silvester auf dem Platz mit Feuerwerk." },
        { it: "La festa", de: "die Party / das Fest", emoji: "🥳", ex: "Stasera c'è una festa.", exDe: "Heute Abend ist eine Party." },
        { it: "Brindare", de: "anstoßen", emoji: "🥂", ex: "Brindiamo al nuovo anno!", exDe: "Stoßen wir auf das neue Jahr an!" }
      ],
      B1: [
        { it: "Fare festa", de: "feiern", emoji: "🎊", ex: "Abbiamo fatto festa fino all'alba.", exDe: "Wir haben bis zum Morgengrauen gefeiert." },
        { it: "Gli auguri", de: "die Glückwünsche", emoji: "💌", ex: "Tanti auguri e figli maschi!", exDe: "Alles Gute (scherzhafter Trinkspruch)!" },
        { it: "Il cenone", de: "das Festtagsessen", emoji: "🍝", ex: "Il cenone della vigilia è sacro.", exDe: "Das Festmahl an Heiligabend ist heilig." }
      ]
    }
  },
  {
    id: "posta", title: "Posta & Burocrazia", de: "Post & Behörden", emoji: "📮", color: "#5a7d9b", area: "Alltag",
    levels: {
      A2: [
        { it: "La lettera", de: "der Brief", emoji: "✉️", ex: "Spedisco una lettera.", exDe: "Ich verschicke einen Brief." },
        { it: "Il francobollo", de: "die Briefmarke", emoji: "📮", ex: "Vorrei due francobolli.", exDe: "Ich hätte gern zwei Briefmarken." },
        { it: "Il pacco", de: "das Paket", emoji: "📦", ex: "È arrivato un pacco per te.", exDe: "Es ist ein Paket für dich angekommen." },
        { it: "Il modulo", de: "das Formular", emoji: "📄", ex: "Compili questo modulo, prego.", exDe: "Füllen Sie bitte dieses Formular aus." },
        { it: "La fila", de: "die Schlange (Warteschlange)", emoji: "🚶", ex: "C'è una fila lunghissima.", exDe: "Es gibt eine sehr lange Schlange." },
        { it: "Lo sportello", de: "der Schalter", emoji: "🪟", ex: "Vada allo sportello tre.", exDe: "Gehen Sie zu Schalter drei." }
      ],
      B2: [
        { it: "La pratica burocratica", de: "der Behördenvorgang", emoji: "🗂️", ex: "La pratica richiede settimane.", exDe: "Der Vorgang dauert Wochen." },
        { it: "Fare la trafila", de: "den Amtsweg durchlaufen", emoji: "🔄", ex: "Ho dovuto fare tutta la trafila.", exDe: "Ich musste den ganzen Amtsweg durchlaufen." },
        { it: "Il timbro", de: "der Stempel", emoji: "🔖", ex: "Manca un timbro sul documento.", exDe: "Auf dem Dokument fehlt ein Stempel." }
      ]
    }
  },
  {
    id: "amore", title: "Amore & Appuntamenti", de: "Liebe & Dates", emoji: "💘", color: "#c2548a", area: "Soziales",
    levels: {
      A2: [
        { it: "Ti piaccio?", de: "Magst du mich?", emoji: "😏", ex: "Dimmi la verità: ti piaccio?", exDe: "Sag mir die Wahrheit: Magst du mich?" },
        { it: "Usciamo insieme?", de: "Gehen wir zusammen aus?", emoji: "🌹", ex: "Sabato usciamo insieme?", exDe: "Gehen wir Samstag zusammen aus?" },
        { it: "Il bacio", de: "der Kuss", emoji: "💋", ex: "Un bacio sotto le stelle.", exDe: "Ein Kuss unter den Sternen." },
        { it: "Innamorarsi", de: "sich verlieben", emoji: "😍", ex: "Mi sono innamorato di te.", exDe: "Ich habe mich in dich verliebt." },
        { it: "Il fidanzamento", de: "die Verlobung", emoji: "💍", ex: "Festeggiamo il fidanzamento.", exDe: "Wir feiern die Verlobung." }
      ],
      B1: [
        { it: "Avere una cotta", de: "verknallt sein", emoji: "🥰", ex: "Ho una cotta per la vicina.", exDe: "Ich bin in die Nachbarin verknallt." },
        { it: "Fare il filo a qualcuno", de: "jemandem schöne Augen machen", emoji: "👀", ex: "Le fa il filo da settimane.", exDe: "Er macht ihr seit Wochen schöne Augen." },
        { it: "Prendere una sòla", de: "abblitzen / sitzengelassen werden", emoji: "💔", ex: "Mi ha dato buca, che sòla!", exDe: "Sie hat mich versetzt, so ein Reinfall!" },
        { it: "Mezza arancia", de: "die bessere Hälfte", emoji: "🍊", ex: "Ho trovato la mia mezza arancia.", exDe: "Ich habe meine bessere Hälfte gefunden." }
      ]
    }
  },
  {
    id: "internet", title: "Internet & Social", de: "Internet & Soziale Medien", emoji: "🌐", color: "#3f7d8a", area: "Alltag",
    levels: {
      A2: [
        { it: "Il profilo", de: "das Profil", emoji: "👤", ex: "Aggiorno il mio profilo.", exDe: "Ich aktualisiere mein Profil." },
        { it: "Seguire", de: "folgen", emoji: "➕", ex: "Ti seguo su tutti i social.", exDe: "Ich folge dir auf allen Kanälen." },
        { it: "Il commento", de: "der Kommentar", emoji: "💬", ex: "Lascia un commento sotto il video.", exDe: "Hinterlasse einen Kommentar unter dem Video." },
        { it: "Mettere mi piace", de: "liken", emoji: "👍", ex: "Ho messo mi piace alla foto.", exDe: "Ich habe das Foto geliked." },
        { it: "Caricare un video", de: "ein Video hochladen", emoji: "📤", ex: "Carico un video ogni venerdì.", exDe: "Ich lade jeden Freitag ein Video hoch." }
      ],
      B2: [
        { it: "Lo scroll infinito", de: "endloses Scrollen", emoji: "📜", ex: "Perdo ore nello scroll infinito.", exDe: "Ich verliere Stunden mit endlosem Scrollen." },
        { it: "Gli odiatori", de: "die Hater", emoji: "😈", ex: "Non dare retta agli odiatori.", exDe: "Hör nicht auf die Hater." },
        { it: "La bufala", de: "die Falschmeldung", emoji: "🐃", ex: "Quella notizia è una bufala.", exDe: "Diese Nachricht ist eine Falschmeldung." },
        { it: "Disintossicarsi dai social", de: "Social-Media-Detox machen", emoji: "🧘", ex: "Provo a disintossicarmi dai social.", exDe: "Ich versuche einen Social-Media-Detox." }
      ]
    }
  },
  {
    id: "professioni", title: "Le Professioni", de: "Die Berufe", emoji: "👷", color: "#8a6d3f", area: "Beruf",
    levels: {
      A1: [
        { it: "Il medico", de: "der Arzt", emoji: "👨‍⚕️", ex: "Mia sorella fa il medico.", exDe: "Meine Schwester ist Ärztin." },
        { it: "L'insegnante", de: "die Lehrkraft", emoji: "👩‍🏫", ex: "L'insegnante è paziente.", exDe: "Die Lehrkraft ist geduldig." },
        { it: "Il cuoco", de: "der Koch", emoji: "👨‍🍳", ex: "Il cuoco prepara la cena.", exDe: "Der Koch bereitet das Abendessen zu." },
        { it: "Il poliziotto", de: "der Polizist", emoji: "👮", ex: "Il poliziotto regola il traffico.", exDe: "Der Polizist regelt den Verkehr." },
        { it: "Il contadino", de: "der Bauer", emoji: "🧑‍🌾", ex: "Il contadino lavora la terra.", exDe: "Der Bauer bestellt das Land." }
      ],
      A2: [
        { it: "L'avvocato", de: "der Anwalt", emoji: "⚖️", ex: "L'avvocato difende il cliente.", exDe: "Der Anwalt verteidigt den Mandanten." },
        { it: "L'idraulico", de: "der Klempner", emoji: "🔧", ex: "Chiamo l'idraulico per la perdita.", exDe: "Ich rufe den Klempner wegen des Lecks." },
        { it: "Il commesso", de: "der Verkäufer", emoji: "🛍️", ex: "Il commesso è gentile.", exDe: "Der Verkäufer ist freundlich." },
        { it: "Il giornalista", de: "der Journalist", emoji: "📰", ex: "La giornalista scrive un articolo.", exDe: "Die Journalistin schreibt einen Artikel." },
        { it: "Il pompiere", de: "der Feuerwehrmann", emoji: "🧑‍🚒", ex: "Il pompiere spegne l'incendio.", exDe: "Der Feuerwehrmann löscht den Brand." }
      ]
    }
  },
  {
    id: "routine", title: "La Routine", de: "Tagesablauf", emoji: "⏰", color: "#6b7a3f", area: "Alltag",
    levels: {
      A1: [
        { it: "Svegliarsi", de: "aufwachen", emoji: "⏰", ex: "Mi sveglio alle sette.", exDe: "Ich wache um sieben auf." },
        { it: "Alzarsi", de: "aufstehen", emoji: "🛏️", ex: "Mi alzo subito dal letto.", exDe: "Ich stehe sofort auf." },
        { it: "Lavarsi", de: "sich waschen", emoji: "🚿", ex: "Mi lavo i denti dopo colazione.", exDe: "Ich putze mir nach dem Frühstück die Zähne." },
        { it: "Vestirsi", de: "sich anziehen", emoji: "👕", ex: "Mi vesto in fretta.", exDe: "Ich ziehe mich schnell an." },
        { it: "La colazione", de: "das Frühstück", emoji: "🥐", ex: "Faccio colazione al bar.", exDe: "Ich frühstücke in der Bar." }
      ],
      A2: [
        { it: "Andare a letto", de: "ins Bett gehen", emoji: "🌙", ex: "Vado a letto verso mezzanotte.", exDe: "Ich gehe gegen Mitternacht ins Bett." },
        { it: "Fare la doccia", de: "duschen", emoji: "🚿", ex: "Faccio la doccia ogni mattina.", exDe: "Ich dusche jeden Morgen." },
        { it: "Le faccende", de: "die Hausarbeit", emoji: "🧹", ex: "Il sabato faccio le faccende.", exDe: "Samstags mache ich den Haushalt." },
        { it: "Stirare", de: "bügeln", emoji: "🪞", ex: "Odio stirare le camicie.", exDe: "Ich hasse es, Hemden zu bügeln." },
        { it: "Portare fuori il cane", de: "den Hund ausführen", emoji: "🐕", ex: "Porto fuori il cane la sera.", exDe: "Ich führe abends den Hund aus." }
      ]
    }
  },
  {
    id: "aeroporto", title: "Aeroporto & Dogana", de: "Flughafen & Zoll", emoji: "🛂", color: "#3f7d8a", area: "Reisen",
    levels: {
      A2: [
        { it: "Il check-in", de: "der Check-in", emoji: "🧳", ex: "Il check-in apre due ore prima.", exDe: "Der Check-in öffnet zwei Stunden vorher." },
        { it: "La carta d'imbarco", de: "die Bordkarte", emoji: "🎫", ex: "Mostri la carta d'imbarco.", exDe: "Zeigen Sie die Bordkarte." },
        { it: "Il ritardo", de: "die Verspätung", emoji: "⏱️", ex: "Il volo ha due ore di ritardo.", exDe: "Der Flug hat zwei Stunden Verspätung." },
        { it: "L'atterraggio", de: "die Landung", emoji: "🛬", ex: "L'atterraggio è stato perfetto.", exDe: "Die Landung war perfekt." },
        { it: "Il controllo passaporti", de: "die Passkontrolle", emoji: "🛂", ex: "Faccia la fila al controllo passaporti.", exDe: "Stellen Sie sich an der Passkontrolle an." }
      ],
      B1: [
        { it: "Niente da dichiarare", de: "nichts zu verzollen", emoji: "✅", ex: "Passo dal corridoio: niente da dichiarare.", exDe: "Ich gehe durch den grünen Ausgang: nichts zu verzollen." },
        { it: "Il bagaglio smarrito", de: "das verlorene Gepäck", emoji: "🧳", ex: "Hanno perso il mio bagaglio!", exDe: "Sie haben mein Gepäck verloren!" },
        { it: "L'imbarco prioritario", de: "das Priority Boarding", emoji: "⭐", ex: "Ho pagato l'imbarco prioritario.", exDe: "Ich habe Priority Boarding bezahlt." }
      ]
    }
  }
  /* ===CORPUS_END=== */
];

/* =========================================================
   ADVANCED_CORPUS — B2/C1/C2-Themen (fortgeschrittenes Italienisch).
   Wird in CORPUS eingehaengt; der Generator baut daraus Vokabel-,
   Ripasso- und Sfida-Lektionen (wie bei A1-B1).
   ========================================================= */
const ADVANCED_CORPUS = [
  {
    "id": "adv-lavoro",
    "title": "Mondo del Lavoro",
    "de": "Arbeitswelt & Beruf",
    "emoji": "💼",
    "color": "#3f6f8a",
    "area": "Lavoro & Economia",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il colloquio di lavoro",
          "de": "das Vorstellungsgespräch",
          "emoji": "🤝",
          "ex": "Ho un colloquio di lavoro molto importante domani mattina.",
          "exDe": "Ich habe morgen früh ein sehr wichtiges Vorstellungsgespräch."
        },
        {
          "it": "il contratto a tempo indeterminato",
          "de": "der unbefristete Vertrag",
          "emoji": "📄",
          "ex": "Finalmente mi hanno offerto un contratto a tempo indeterminato.",
          "exDe": "Endlich hat man mir einen unbefristeten Vertrag angeboten."
        },
        {
          "it": "il curriculum",
          "de": "der Lebenslauf",
          "emoji": "📋",
          "ex": "Ho aggiornato il curriculum prima di inviarlo all'azienda.",
          "exDe": "Ich habe den Lebenslauf aktualisiert, bevor ich ihn an die Firma geschickt habe."
        },
        {
          "it": "lo stipendio",
          "de": "das Gehalt",
          "emoji": "💶",
          "ex": "Lo stipendio viene versato il ventisette di ogni mese.",
          "exDe": "Das Gehalt wird am siebenundzwanzigsten jedes Monats überwiesen."
        },
        {
          "it": "il datore di lavoro",
          "de": "der Arbeitgeber",
          "emoji": "👔",
          "ex": "Il mio datore di lavoro è molto comprensivo con i dipendenti.",
          "exDe": "Mein Arbeitgeber ist sehr verständnisvoll gegenüber den Angestellten."
        },
        {
          "it": "il dipendente",
          "de": "der Angestellte",
          "emoji": "🧑‍💻",
          "ex": "L'azienda conta più di duecento dipendenti.",
          "exDe": "Das Unternehmen zählt mehr als zweihundert Angestellte."
        },
        {
          "it": "le ferie",
          "de": "der Urlaub",
          "emoji": "🏖️",
          "ex": "Quest'anno prenderò le ferie nel mese di agosto.",
          "exDe": "Dieses Jahr nehme ich meinen Urlaub im August."
        },
        {
          "it": "lo straordinario",
          "de": "die Überstunde",
          "emoji": "⏰",
          "ex": "Questa settimana ho fatto molti straordinari per finire il progetto.",
          "exDe": "Diese Woche habe ich viele Überstunden gemacht, um das Projekt abzuschließen."
        },
        {
          "it": "il capo",
          "de": "der Chef",
          "emoji": "👨‍💼",
          "ex": "Il capo ci ha convocati per una riunione urgente.",
          "exDe": "Der Chef hat uns zu einer dringenden Besprechung einberufen."
        },
        {
          "it": "il collega",
          "de": "der Kollege",
          "emoji": "👥",
          "ex": "Vado d'accordo con tutti i miei colleghi.",
          "exDe": "Ich verstehe mich mit allen meinen Kollegen gut."
        },
        {
          "it": "la scadenza",
          "de": "die Frist",
          "emoji": "📅",
          "ex": "Dobbiamo consegnare il rapporto entro la scadenza di venerdì.",
          "exDe": "Wir müssen den Bericht bis zur Frist am Freitag abgeben."
        },
        {
          "it": "il tirocinio",
          "de": "das Praktikum",
          "emoji": "🎓",
          "ex": "Ho svolto un tirocinio di sei mesi in uno studio legale.",
          "exDe": "Ich habe ein sechsmonatiges Praktikum in einer Anwaltskanzlei absolviert."
        },
        {
          "it": "il licenziamento",
          "de": "die Kündigung",
          "emoji": "📤",
          "ex": "Il licenziamento è arrivato senza alcun preavviso.",
          "exDe": "Die Kündigung kam ohne jede Vorwarnung."
        },
        {
          "it": "le dimissioni",
          "de": "die Kündigung (durch den Arbeitnehmer)",
          "emoji": "✍️",
          "ex": "Ha rassegnato le dimissioni per accettare un'offerta migliore.",
          "exDe": "Er hat gekündigt, um ein besseres Angebot anzunehmen."
        },
        {
          "it": "la riunione",
          "de": "die Besprechung",
          "emoji": "🗣️",
          "ex": "La riunione di lunedì durerà almeno due ore.",
          "exDe": "Die Besprechung am Montag wird mindestens zwei Stunden dauern."
        },
        {
          "it": "il lavoro da remoto",
          "de": "die Fernarbeit",
          "emoji": "🏠",
          "ex": "Da quando lavoro da remoto, risparmio molto tempo negli spostamenti.",
          "exDe": "Seit ich von zu Hause aus arbeite, spare ich viel Zeit beim Pendeln."
        },
        {
          "it": "l'orario flessibile",
          "de": "die Gleitzeit",
          "emoji": "🕘",
          "ex": "Grazie all'orario flessibile posso accompagnare i figli a scuola.",
          "exDe": "Dank der Gleitzeit kann ich die Kinder zur Schule bringen."
        },
        {
          "it": "il settore",
          "de": "die Branche",
          "emoji": "🏭",
          "ex": "Lavoro nel settore informatico da più di dieci anni.",
          "exDe": "Ich arbeite seit mehr als zehn Jahren in der IT-Branche."
        },
        {
          "it": "la mansione",
          "de": "die Aufgabe / Tätigkeit",
          "emoji": "🛠️",
          "ex": "Le mie mansioni includono la gestione dei clienti.",
          "exDe": "Zu meinen Aufgaben gehört die Betreuung der Kunden."
        },
        {
          "it": "l'aumento di stipendio",
          "de": "die Gehaltserhöhung",
          "emoji": "📈",
          "ex": "Ho chiesto al capo un aumento di stipendio.",
          "exDe": "Ich habe den Chef um eine Gehaltserhöhung gebeten."
        }
      ],
      "C1": [
        {
          "it": "la conciliazione vita-lavoro",
          "de": "die Vereinbarkeit von Beruf und Privatleben",
          "emoji": "⚖️",
          "ex": "L'azienda investe molto nella conciliazione vita-lavoro dei suoi dipendenti.",
          "exDe": "Das Unternehmen investiert viel in die Vereinbarkeit von Beruf und Privatleben seiner Mitarbeiter."
        },
        {
          "it": "il percorso di carriera",
          "de": "der Karriereweg",
          "emoji": "🪜",
          "ex": "Ha tracciato un percorso di carriera ambizioso ma realistico.",
          "exDe": "Er hat einen ehrgeizigen, aber realistischen Karriereweg vorgezeichnet."
        },
        {
          "it": "le competenze trasversali",
          "de": "die überfachlichen Kompetenzen",
          "emoji": "🧩",
          "ex": "Oggi le competenze trasversali contano quanto quelle tecniche.",
          "exDe": "Heute zählen die überfachlichen Kompetenzen ebenso viel wie die fachlichen."
        },
        {
          "it": "la valutazione delle prestazioni",
          "de": "die Leistungsbeurteilung",
          "emoji": "📊",
          "ex": "La valutazione delle prestazioni avviene una volta all'anno.",
          "exDe": "Die Leistungsbeurteilung erfolgt einmal im Jahr."
        },
        {
          "it": "il clima aziendale",
          "de": "das Betriebsklima",
          "emoji": "🌡️",
          "ex": "Un buon clima aziendale aumenta la produttività del team.",
          "exDe": "Ein gutes Betriebsklima steigert die Produktivität des Teams."
        },
        {
          "it": "la riconversione professionale",
          "de": "die berufliche Umschulung",
          "emoji": "🔄",
          "ex": "Dopo i quarant'anni ha intrapreso una riconversione professionale nel digitale.",
          "exDe": "Mit über vierzig hat er eine berufliche Umschulung im digitalen Bereich begonnen."
        },
        {
          "it": "il carico di lavoro",
          "de": "die Arbeitsbelastung",
          "emoji": "🏋️",
          "ex": "Il carico di lavoro è diventato insostenibile negli ultimi mesi.",
          "exDe": "Die Arbeitsbelastung ist in den letzten Monaten unerträglich geworden."
        },
        {
          "it": "delegare le responsabilità",
          "de": "Verantwortung delegieren",
          "emoji": "🤲",
          "ex": "Un buon dirigente sa delegare le responsabilità al momento giusto.",
          "exDe": "Eine gute Führungskraft weiß, wann sie Verantwortung delegieren muss."
        },
        {
          "it": "il colloquio conoscitivo",
          "de": "das Kennenlerngespräch",
          "emoji": "💬",
          "ex": "Il primo incontro è stato solo un colloquio conoscitivo informale.",
          "exDe": "Das erste Treffen war nur ein informelles Kennenlerngespräch."
        },
        {
          "it": "la fidelizzazione dei dipendenti",
          "de": "die Mitarbeiterbindung",
          "emoji": "🔗",
          "ex": "La fidelizzazione dei dipendenti riduce i costi di selezione.",
          "exDe": "Die Mitarbeiterbindung senkt die Kosten für die Personalauswahl."
        },
        {
          "it": "il esaurimento professionale",
          "de": "das Burnout",
          "emoji": "😵‍💫",
          "ex": "Troppi straordinari possono portare all'esaurimento professionale.",
          "exDe": "Zu viele Überstunden können zum Burnout führen."
        },
        {
          "it": "la mobilità interna",
          "de": "die interne Versetzung",
          "emoji": "🚪",
          "ex": "L'azienda incoraggia la mobilità interna prima di assumere dall'esterno.",
          "exDe": "Das Unternehmen fördert die interne Versetzung, bevor es von außen einstellt."
        },
        {
          "it": "il colloquio di uscita",
          "de": "das Austrittsgespräch",
          "emoji": "🚶",
          "ex": "Durante il colloquio di uscita ha spiegato le ragioni della sua partenza.",
          "exDe": "Während des Austrittsgesprächs erläuterte er die Gründe für seinen Weggang."
        },
        {
          "it": "raggiungere gli obiettivi",
          "de": "die Ziele erreichen",
          "emoji": "🎯",
          "ex": "Il reparto ha raggiunto tutti gli obiettivi prefissati per il trimestre.",
          "exDe": "Die Abteilung hat alle für das Quartal gesteckten Ziele erreicht."
        },
        {
          "it": "la formazione continua",
          "de": "die Weiterbildung",
          "emoji": "📚",
          "ex": "La formazione continua è ormai indispensabile in ogni professione.",
          "exDe": "Weiterbildung ist mittlerweile in jedem Beruf unverzichtbar."
        },
        {
          "it": "il telelavoro ibrido",
          "de": "die hybride Arbeit",
          "emoji": "💻",
          "ex": "Abbiamo adottato un modello di telelavoro ibrido tre giorni a settimana.",
          "exDe": "Wir haben ein hybrides Arbeitsmodell mit drei Tagen pro Woche eingeführt."
        },
        {
          "it": "la trattativa salariale",
          "de": "die Gehaltsverhandlung",
          "emoji": "🤝",
          "ex": "La trattativa salariale si è conclusa con un compromesso soddisfacente.",
          "exDe": "Die Gehaltsverhandlung endete mit einem zufriedenstellenden Kompromiss."
        },
        {
          "it": "il colletto bianco",
          "de": "der Angestellte im Büro / die Bürofachkraft",
          "emoji": "👔",
          "ex": "I colletti bianchi sono stati i primi a passare allo smart working.",
          "exDe": "Die Büroangestellten waren die Ersten, die ins Homeoffice wechselten."
        },
        {
          "it": "la precarietà lavorativa",
          "de": "die berufliche Unsicherheit / prekäre Beschäftigung",
          "emoji": "🎲",
          "ex": "I giovani soffrono particolarmente la precarietà lavorativa.",
          "exDe": "Junge Menschen leiden besonders unter der prekären Beschäftigung."
        },
        {
          "it": "il colloquio di gruppo",
          "de": "das Gruppengespräch / Assessment",
          "emoji": "👫",
          "ex": "Il colloquio di gruppo serve a valutare le capacità di collaborazione.",
          "exDe": "Das Gruppengespräch dient dazu, die Fähigkeit zur Zusammenarbeit zu bewerten."
        }
      ],
      "C2": [
        {
          "it": "il demansionamento",
          "de": "die Herabstufung / Aufgabenbeschneidung",
          "emoji": "⬇️",
          "ex": "Il dipendente ha denunciato un demansionamento ingiustificato delle sue funzioni.",
          "exDe": "Der Angestellte hat eine ungerechtfertigte Herabstufung seiner Funktionen angezeigt."
        },
        {
          "it": "il mobbing sul posto di lavoro",
          "de": "das Mobbing am Arbeitsplatz",
          "emoji": "🚫",
          "ex": "Le accuse di mobbing sul posto di lavoro hanno scosso l'intera dirigenza.",
          "exDe": "Die Mobbingvorwürfe am Arbeitsplatz haben die gesamte Führungsebene erschüttert."
        },
        {
          "it": "la cassa integrazione",
          "de": "die Kurzarbeit (mit staatlicher Lohnergänzung)",
          "emoji": "🏦",
          "ex": "Durante la crisi, migliaia di operai sono finiti in cassa integrazione.",
          "exDe": "Während der Krise sind Tausende Arbeiter in Kurzarbeit geschickt worden."
        },
        {
          "it": "il patto di non concorrenza",
          "de": "das Wettbewerbsverbot",
          "emoji": "🤐",
          "ex": "Il dirigente era vincolato da un severo patto di non concorrenza.",
          "exDe": "Die Führungskraft war an ein strenges Wettbewerbsverbot gebunden."
        },
        {
          "it": "l'esubero di personale",
          "de": "der Personalüberhang / Personalabbau",
          "emoji": "📉",
          "ex": "La ristrutturazione ha comportato un consistente esubero di personale.",
          "exDe": "Die Umstrukturierung führte zu einem erheblichen Personalabbau."
        },
        {
          "it": "il welfare aziendale",
          "de": "die betrieblichen Sozialleistungen",
          "emoji": "🎁",
          "ex": "Un solido welfare aziendale attira i talenti più ambiti del mercato.",
          "exDe": "Solide betriebliche Sozialleistungen ziehen die begehrtesten Talente des Marktes an."
        },
        {
          "it": "la dimissione in tronco",
          "de": "die fristlose Kündigung",
          "emoji": "💥",
          "ex": "Dopo l'ennesimo sopruso, ha dato le dimissioni in tronco.",
          "exDe": "Nach der x-ten Schikane hat er fristlos gekündigt."
        },
        {
          "it": "il knowledge worker",
          "de": "der Wissensarbeiter",
          "emoji": "🧠",
          "ex": "Nell'economia odierna, il knowledge worker rappresenta una risorsa strategica.",
          "exDe": "In der heutigen Wirtschaft stellt der Wissensarbeiter eine strategische Ressource dar."
        },
        {
          "it": "il dimissionamento silenzioso",
          "de": "das stille Kündigen (quiet quitting)",
          "emoji": "🤫",
          "ex": "Il dimissionamento silenzioso è la risposta di molti a un management tossico.",
          "exDe": "Das stille Kündigen ist die Antwort vieler auf ein toxisches Management."
        },
        {
          "it": "ricoprire un incarico apicale",
          "de": "eine Spitzenposition bekleiden",
          "emoji": "👑",
          "ex": "Ricopre un incarico apicale in una multinazionale farmaceutica.",
          "exDe": "Sie bekleidet eine Spitzenposition in einem multinationalen Pharmakonzern."
        },
        {
          "it": "l'ammortizzatore sociale",
          "de": "das soziale Auffangnetz / die soziale Absicherung",
          "emoji": "🪂",
          "ex": "Senza adeguati ammortizzatori sociali, i licenziamenti diventano drammatici.",
          "exDe": "Ohne angemessene soziale Auffangnetze werden Entlassungen dramatisch."
        },
        {
          "it": "la fuga di cervelli",
          "de": "die Abwanderung von Fachkräften (brain drain)",
          "emoji": "🧳",
          "ex": "La fuga di cervelli impoverisce il tessuto produttivo del Paese.",
          "exDe": "Die Abwanderung von Fachkräften verarmt das wirtschaftliche Gefüge des Landes."
        },
        {
          "it": "il contratto di somministrazione",
          "de": "der Arbeitnehmerüberlassungsvertrag (Leiharbeit)",
          "emoji": "🔁",
          "ex": "È stato assunto con un contratto di somministrazione tramite un'agenzia interinale.",
          "exDe": "Er wurde über eine Zeitarbeitsfirma mit einem Arbeitnehmerüberlassungsvertrag eingestellt."
        },
        {
          "it": "rassegnare le proprie spettanze",
          "de": "die ausstehenden Ansprüche geltend machen",
          "emoji": "🧾",
          "ex": "Al termine del rapporto ha rassegnato tutte le proprie spettanze maturate.",
          "exDe": "Am Ende des Arbeitsverhältnisses hat er alle seine erworbenen Ansprüche geltend gemacht."
        },
        {
          "it": "il presenzialismo",
          "de": "der Präsentismus (krank zur Arbeit erscheinen)",
          "emoji": "🤒",
          "ex": "Il presenzialismo cronico danneggia la salute più dell'assenteismo.",
          "exDe": "Chronischer Präsentismus schadet der Gesundheit mehr als der Absentismus."
        },
        {
          "it": "il soffitto di cristallo",
          "de": "die gläserne Decke",
          "emoji": "🪟",
          "ex": "Molte donne qualificate si scontrano ancora con il soffitto di cristallo.",
          "exDe": "Viele qualifizierte Frauen stoßen noch immer an die gläserne Decke."
        },
        {
          "it": "l'inquadramento contrattuale",
          "de": "die tarifliche Eingruppierung",
          "emoji": "🗂️",
          "ex": "Ha contestato il proprio inquadramento contrattuale ritenendolo inadeguato.",
          "exDe": "Er hat seine tarifliche Eingruppierung angefochten, weil er sie für unangemessen hielt."
        },
        {
          "it": "la liberatoria transattiva",
          "de": "die einvernehmliche Aufhebungsvereinbarung",
          "emoji": "🤝",
          "ex": "Le parti hanno firmato una liberatoria transattiva per chiudere ogni contenzioso.",
          "exDe": "Die Parteien unterzeichneten eine einvernehmliche Aufhebungsvereinbarung, um jeden Rechtsstreit zu beenden."
        },
        {
          "it": "l'onere della prova",
          "de": "die Beweislast",
          "emoji": "⚖️",
          "ex": "Nei casi di licenziamento illegittimo, l'onere della prova ricade sul datore.",
          "exDe": "Bei rechtswidrigen Kündigungen liegt die Beweislast beim Arbeitgeber."
        },
        {
          "it": "il trattamento di fine rapporto",
          "de": "die Abfindung bei Vertragsende",
          "emoji": "💰",
          "ex": "Ha investito il trattamento di fine rapporto in un fondo pensione.",
          "exDe": "Er hat seine Abfindung in einen Pensionsfonds investiert."
        }
      ]
    }
  },
  {
    "id": "adv-economia",
    "title": "Economia & Finanza",
    "de": "Wirtschaft & Finanzen",
    "emoji": "📈",
    "color": "#2e7d6f",
    "area": "Lavoro & Economia",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il mercato",
          "de": "der Markt",
          "emoji": "🏪",
          "ex": "Il mercato dell'usato è cresciuto molto negli ultimi anni.",
          "exDe": "Der Gebrauchtwarenmarkt ist in den letzten Jahren stark gewachsen."
        },
        {
          "it": "il prezzo",
          "de": "der Preis",
          "emoji": "🏷️",
          "ex": "Il prezzo del caffè è aumentato del dieci per cento.",
          "exDe": "Der Preis für Kaffee ist um zehn Prozent gestiegen."
        },
        {
          "it": "il risparmio",
          "de": "die Ersparnis",
          "emoji": "🐷",
          "ex": "Ho messo da parte un piccolo risparmio per le emergenze.",
          "exDe": "Ich habe eine kleine Ersparnis für Notfälle zurückgelegt."
        },
        {
          "it": "l'investimento",
          "de": "die Investition",
          "emoji": "📊",
          "ex": "L'investimento in formazione ripaga sempre nel lungo periodo.",
          "exDe": "Die Investition in Bildung zahlt sich langfristig immer aus."
        },
        {
          "it": "il conto corrente",
          "de": "das Girokonto",
          "emoji": "🏦",
          "ex": "Ho aperto un conto corrente in una banca online.",
          "exDe": "Ich habe ein Girokonto bei einer Onlinebank eröffnet."
        },
        {
          "it": "il prestito",
          "de": "das Darlehen / der Kredit",
          "emoji": "💳",
          "ex": "Abbiamo chiesto un prestito per comprare la casa.",
          "exDe": "Wir haben ein Darlehen aufgenommen, um das Haus zu kaufen."
        },
        {
          "it": "il tasso di interesse",
          "de": "der Zinssatz",
          "emoji": "📉",
          "ex": "Il tasso di interesse sul mutuo è salito di nuovo.",
          "exDe": "Der Zinssatz für die Hypothek ist wieder gestiegen."
        },
        {
          "it": "la tassa",
          "de": "die Steuer",
          "emoji": "🧾",
          "ex": "Ogni anno bisogna pagare le tasse entro la fine di giugno.",
          "exDe": "Jedes Jahr müssen die Steuern bis Ende Juni bezahlt werden."
        },
        {
          "it": "il guadagno",
          "de": "der Gewinn / Verdienst",
          "emoji": "💵",
          "ex": "Il guadagno mensile non basta più a coprire le spese.",
          "exDe": "Der monatliche Verdienst reicht nicht mehr aus, um die Kosten zu decken."
        },
        {
          "it": "la spesa",
          "de": "die Ausgabe",
          "emoji": "🛒",
          "ex": "Le spese familiari sono aumentate notevolmente.",
          "exDe": "Die Familienausgaben sind erheblich gestiegen."
        },
        {
          "it": "il debito",
          "de": "die Schuld",
          "emoji": "📛",
          "ex": "È riuscito a estinguere tutti i suoi debiti in due anni.",
          "exDe": "Er hat es geschafft, alle seine Schulden in zwei Jahren zu tilgen."
        },
        {
          "it": "l'azienda",
          "de": "das Unternehmen",
          "emoji": "🏢",
          "ex": "L'azienda ha aperto una nuova filiale all'estero.",
          "exDe": "Das Unternehmen hat eine neue Niederlassung im Ausland eröffnet."
        },
        {
          "it": "il cliente",
          "de": "der Kunde",
          "emoji": "🙋",
          "ex": "Il cliente ha sempre ragione, dice il proverbio.",
          "exDe": "Der Kunde hat immer recht, sagt das Sprichwort."
        },
        {
          "it": "il fornitore",
          "de": "der Lieferant",
          "emoji": "🚚",
          "ex": "Abbiamo cambiato fornitore per ridurre i costi.",
          "exDe": "Wir haben den Lieferanten gewechselt, um die Kosten zu senken."
        },
        {
          "it": "la fattura",
          "de": "die Rechnung",
          "emoji": "📨",
          "ex": "Devo ancora pagare la fattura del mese scorso.",
          "exDe": "Ich muss noch die Rechnung vom letzten Monat bezahlen."
        },
        {
          "it": "l'inflazione",
          "de": "die Inflation",
          "emoji": "🎈",
          "ex": "L'inflazione ha eroso il potere d'acquisto delle famiglie.",
          "exDe": "Die Inflation hat die Kaufkraft der Familien geschmälert."
        },
        {
          "it": "la borsa",
          "de": "die Börse",
          "emoji": "📈",
          "ex": "La borsa ha chiuso in rialzo dopo una giornata volatile.",
          "exDe": "Die Börse hat nach einem volatilen Tag im Plus geschlossen."
        },
        {
          "it": "il bilancio",
          "de": "die Bilanz / der Haushalt",
          "emoji": "📚",
          "ex": "Il bilancio dell'azienda quest'anno è in attivo.",
          "exDe": "Die Bilanz des Unternehmens ist dieses Jahr positiv."
        },
        {
          "it": "la moneta",
          "de": "die Währung",
          "emoji": "🪙",
          "ex": "L'euro è la moneta comune di gran parte dell'Europa.",
          "exDe": "Der Euro ist die gemeinsame Währung des größten Teils Europas."
        },
        {
          "it": "il consumatore",
          "de": "der Verbraucher",
          "emoji": "🛍️",
          "ex": "I consumatori sono diventati più attenti alla sostenibilità.",
          "exDe": "Die Verbraucher achten mehr auf Nachhaltigkeit."
        }
      ],
      "C1": [
        {
          "it": "il potere d'acquisto",
          "de": "die Kaufkraft",
          "emoji": "💪",
          "ex": "L'aumento dei prezzi ha ridotto il potere d'acquisto dei salari.",
          "exDe": "Der Preisanstieg hat die Kaufkraft der Löhne verringert."
        },
        {
          "it": "la congiuntura economica",
          "de": "die Konjunktur",
          "emoji": "🔄",
          "ex": "La congiuntura economica mostra segnali di ripresa.",
          "exDe": "Die Konjunktur zeigt Anzeichen einer Erholung."
        },
        {
          "it": "il prodotto interno lordo",
          "de": "das Bruttoinlandsprodukt",
          "emoji": "🌍",
          "ex": "Il prodotto interno lordo è cresciuto dello zero virgola cinque per cento.",
          "exDe": "Das Bruttoinlandsprodukt ist um null Komma fünf Prozent gewachsen."
        },
        {
          "it": "la domanda e l'offerta",
          "de": "Angebot und Nachfrage",
          "emoji": "↔️",
          "ex": "Il prezzo è determinato dall'incontro tra domanda e offerta.",
          "exDe": "Der Preis ergibt sich aus dem Zusammentreffen von Angebot und Nachfrage."
        },
        {
          "it": "il fatturato",
          "de": "der Umsatz",
          "emoji": "💹",
          "ex": "Il fatturato annuale ha superato i cento milioni di euro.",
          "exDe": "Der Jahresumsatz hat hundert Millionen Euro überschritten."
        },
        {
          "it": "la quota di mercato",
          "de": "der Marktanteil",
          "emoji": "🥧",
          "ex": "L'impresa ha conquistato una quota di mercato del venti per cento.",
          "exDe": "Das Unternehmen hat einen Marktanteil von zwanzig Prozent erobert."
        },
        {
          "it": "la redditività",
          "de": "die Rentabilität",
          "emoji": "📐",
          "ex": "La redditività dell'investimento si è rivelata inferiore alle attese.",
          "exDe": "Die Rentabilität der Investition erwies sich als geringer als erwartet."
        },
        {
          "it": "il flusso di cassa",
          "de": "der Cashflow / Liquiditätsfluss",
          "emoji": "💧",
          "ex": "Un flusso di cassa positivo garantisce la solvibilità dell'azienda.",
          "exDe": "Ein positiver Cashflow gewährleistet die Zahlungsfähigkeit des Unternehmens."
        },
        {
          "it": "diversificare il portafoglio",
          "de": "das Portfolio diversifizieren",
          "emoji": "🎒",
          "ex": "Per ridurre il rischio conviene diversificare il portafoglio.",
          "exDe": "Um das Risiko zu senken, empfiehlt es sich, das Portfolio zu diversifizieren."
        },
        {
          "it": "il debito pubblico",
          "de": "die Staatsverschuldung",
          "emoji": "🏛️",
          "ex": "Il debito pubblico italiano resta tra i più elevati d'Europa.",
          "exDe": "Die italienische Staatsverschuldung gehört weiterhin zu den höchsten in Europa."
        },
        {
          "it": "la politica monetaria",
          "de": "die Geldpolitik",
          "emoji": "🎛️",
          "ex": "La banca centrale ha inasprito la politica monetaria per frenare l'inflazione.",
          "exDe": "Die Zentralbank hat die Geldpolitik verschärft, um die Inflation zu bremsen."
        },
        {
          "it": "il rendimento",
          "de": "die Rendite",
          "emoji": "🌱",
          "ex": "I titoli di Stato offrono un rendimento modesto ma sicuro.",
          "exDe": "Staatsanleihen bieten eine bescheidene, aber sichere Rendite."
        },
        {
          "it": "la pressione fiscale",
          "de": "die Steuerlast",
          "emoji": "🗜️",
          "ex": "La pressione fiscale sulle piccole imprese è particolarmente onerosa.",
          "exDe": "Die Steuerlast für kleine Unternehmen ist besonders drückend."
        },
        {
          "it": "l'economia sommersa",
          "de": "die Schattenwirtschaft",
          "emoji": "🌑",
          "ex": "L'economia sommersa rappresenta una quota rilevante del PIL.",
          "exDe": "Die Schattenwirtschaft macht einen beträchtlichen Anteil am BIP aus."
        },
        {
          "it": "la recessione",
          "de": "die Rezession",
          "emoji": "📉",
          "ex": "Due trimestri di crescita negativa segnalano una recessione tecnica.",
          "exDe": "Zwei Quartale mit negativem Wachstum signalisieren eine technische Rezession."
        },
        {
          "it": "il regime fiscale",
          "de": "das Steuersystem / die Steuerregelung",
          "emoji": "📑",
          "ex": "Hanno scelto un regime fiscale agevolato per le start-up.",
          "exDe": "Sie haben eine begünstigte Steuerregelung für Start-ups gewählt."
        },
        {
          "it": "la fusione aziendale",
          "de": "die Unternehmensfusion",
          "emoji": "🤝",
          "ex": "La fusione aziendale ha dato vita a un colosso del settore.",
          "exDe": "Die Unternehmensfusion hat einen Branchenriesen entstehen lassen."
        },
        {
          "it": "il capitale di rischio",
          "de": "das Risikokapital / Wagniskapital",
          "emoji": "🚀",
          "ex": "La startup ha raccolto capitale di rischio da diversi investitori.",
          "exDe": "Das Start-up hat Risikokapital von mehreren Investoren eingesammelt."
        },
        {
          "it": "la sostenibilità economica",
          "de": "die wirtschaftliche Nachhaltigkeit",
          "emoji": "♻️",
          "ex": "La sostenibilità economica del progetto dipende dai finanziamenti pubblici.",
          "exDe": "Die wirtschaftliche Nachhaltigkeit des Projekts hängt von öffentlichen Mitteln ab."
        },
        {
          "it": "l'indebitamento",
          "de": "die Verschuldung",
          "emoji": "⛓️",
          "ex": "L'eccessivo indebitamento ha portato l'impresa sull'orlo del fallimento.",
          "exDe": "Die übermäßige Verschuldung hat das Unternehmen an den Rand des Konkurses gebracht."
        }
      ],
      "C2": [
        {
          "it": "la liquidità di mercato",
          "de": "die Marktliquidität",
          "emoji": "🌊",
          "ex": "Una scarsa liquidità di mercato amplifica la volatilità dei prezzi.",
          "exDe": "Eine geringe Marktliquidität verstärkt die Preisvolatilität."
        },
        {
          "it": "l'allentamento quantitativo",
          "de": "die quantitative Lockerung",
          "emoji": "🖨️",
          "ex": "L'allentamento quantitativo ha inondato i mercati di liquidità.",
          "exDe": "Die quantitative Lockerung hat die Märkte mit Liquidität überschwemmt."
        },
        {
          "it": "lo spread",
          "de": "der Renditeabstand (Spread)",
          "emoji": "📏",
          "ex": "Lo spread tra i titoli italiani e quelli tedeschi si è allargato bruscamente.",
          "exDe": "Der Renditeabstand zwischen italienischen und deutschen Anleihen hat sich abrupt vergrößert."
        },
        {
          "it": "la stagflazione",
          "de": "die Stagflation",
          "emoji": "🥶",
          "ex": "La stagflazione combina stagnazione economica e alta inflazione.",
          "exDe": "Die Stagflation verbindet wirtschaftliche Stagnation mit hoher Inflation."
        },
        {
          "it": "il rischio sistemico",
          "de": "das Systemrisiko",
          "emoji": "🕸️",
          "ex": "Il fallimento di una grande banca può generare un rischio sistemico.",
          "exDe": "Der Zusammenbruch einer Großbank kann ein Systemrisiko auslösen."
        },
        {
          "it": "l'arbitraggio",
          "de": "die Arbitrage",
          "emoji": "🔀",
          "ex": "Gli operatori sfruttano l'arbitraggio per lucrare sulle differenze di prezzo.",
          "exDe": "Die Händler nutzen die Arbitrage, um aus Preisunterschieden Gewinn zu schlagen."
        },
        {
          "it": "la cartolarizzazione",
          "de": "die Verbriefung",
          "emoji": "📜",
          "ex": "La cartolarizzazione dei mutui fu tra le cause della crisi del 2008.",
          "exDe": "Die Verbriefung von Hypotheken war eine der Ursachen der Krise von 2008."
        },
        {
          "it": "il fondo sovrano",
          "de": "der Staatsfonds",
          "emoji": "🏰",
          "ex": "Il fondo sovrano norvegese è uno dei maggiori investitori al mondo.",
          "exDe": "Der norwegische Staatsfonds ist einer der größten Investoren der Welt."
        },
        {
          "it": "la leva finanziaria",
          "de": "der Verschuldungshebel (Leverage)",
          "emoji": "🏗️",
          "ex": "Un eccesso di leva finanziaria espone l'impresa a perdite ingenti.",
          "exDe": "Ein übermäßiger Verschuldungshebel setzt das Unternehmen enormen Verlusten aus."
        },
        {
          "it": "il merito creditizio",
          "de": "die Bonität / Kreditwürdigkeit",
          "emoji": "🏅",
          "ex": "Le agenzie di rating hanno declassato il merito creditizio dello Stato.",
          "exDe": "Die Ratingagenturen haben die Bonität des Staates herabgestuft."
        },
        {
          "it": "la svalutazione competitiva",
          "de": "die Abwertung zur Wettbewerbsförderung",
          "emoji": "🪂",
          "ex": "Alcuni Paesi ricorrono alla svalutazione competitiva per sostenere le esportazioni.",
          "exDe": "Einige Länder greifen zur wettbewerbsfördernden Abwertung, um die Exporte zu stützen."
        },
        {
          "it": "l'elusione fiscale",
          "de": "die Steuervermeidung",
          "emoji": "🦊",
          "ex": "L'elusione fiscale, pur legale, solleva delicate questioni etiche.",
          "exDe": "Die Steuervermeidung wirft, obwohl legal, heikle ethische Fragen auf."
        },
        {
          "it": "il default sovrano",
          "de": "der Staatsbankrott / Zahlungsausfall des Staates",
          "emoji": "💀",
          "ex": "Il rischio di un default sovrano ha fatto crollare i mercati.",
          "exDe": "Das Risiko eines Staatsbankrotts hat die Märkte einbrechen lassen."
        },
        {
          "it": "la bolla speculativa",
          "de": "die Spekulationsblase",
          "emoji": "🫧",
          "ex": "Lo scoppio della bolla speculativa ha bruciato miliardi di capitalizzazione.",
          "exDe": "Das Platzen der Spekulationsblase hat Milliarden an Marktwert vernichtet."
        },
        {
          "it": "il salasso fiscale",
          "de": "der Steueraderlass / die drückende Besteuerung",
          "emoji": "🩸",
          "ex": "I lavoratori autonomi lamentano un vero e proprio salasso fiscale.",
          "exDe": "Die Selbstständigen beklagen einen regelrechten steuerlichen Aderlass."
        },
        {
          "it": "la disintermediazione",
          "de": "die Disintermediation",
          "emoji": "🔌",
          "ex": "La disintermediazione bancaria avvantaggia le piattaforme fintech.",
          "exDe": "Die Disintermediation der Banken begünstigt die Fintech-Plattformen."
        },
        {
          "it": "il vincolo di bilancio",
          "de": "die Haushaltsbeschränkung / Budgetbindung",
          "emoji": "🔒",
          "ex": "Il rigido vincolo di bilancio limita gli investimenti pubblici.",
          "exDe": "Die strenge Haushaltsbeschränkung begrenzt die öffentlichen Investitionen."
        },
        {
          "it": "l'economia di scala",
          "de": "die Skaleneffekte / Größenvorteile",
          "emoji": "🏭",
          "ex": "Le economie di scala consentono di abbattere i costi unitari di produzione.",
          "exDe": "Die Skaleneffekte ermöglichen es, die Stückkosten der Produktion zu senken."
        },
        {
          "it": "la pressione inflazionistica",
          "de": "der Inflationsdruck",
          "emoji": "🌡️",
          "ex": "Le tensioni sull'energia alimentano una persistente pressione inflazionistica.",
          "exDe": "Die Spannungen auf dem Energiemarkt nähren einen anhaltenden Inflationsdruck."
        },
        {
          "it": "il tessuto imprenditoriale",
          "de": "das unternehmerische Gefüge",
          "emoji": "🧵",
          "ex": "Il tessuto imprenditoriale italiano è composto in prevalenza da piccole imprese.",
          "exDe": "Das italienische unternehmerische Gefüge besteht überwiegend aus Kleinunternehmen."
        }
      ]
    }
  },
  {
    "id": "adv-politica",
    "title": "Politica & Istituzioni",
    "de": "Politik & Institutionen",
    "emoji": "🏛️",
    "color": "#8a2e3b",
    "area": "Società & Politica",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il governo",
          "de": "die Regierung",
          "emoji": "🏛️",
          "ex": "Il governo ha approvato una nuova legge sul lavoro.",
          "exDe": "Die Regierung hat ein neues Arbeitsgesetz verabschiedet."
        },
        {
          "it": "il parlamento",
          "de": "das Parlament",
          "emoji": "🏢",
          "ex": "Il parlamento si riunisce ogni settimana per votare le proposte.",
          "exDe": "Das Parlament tritt jede Woche zusammen, um über die Vorschläge abzustimmen."
        },
        {
          "it": "il partito politico",
          "de": "die politische Partei",
          "emoji": "🎗️",
          "ex": "Quel partito politico ha vinto le ultime elezioni.",
          "exDe": "Diese politische Partei hat die letzten Wahlen gewonnen."
        },
        {
          "it": "le elezioni",
          "de": "die Wahlen",
          "emoji": "🗳️",
          "ex": "Le elezioni si terranno la prossima primavera.",
          "exDe": "Die Wahlen finden im kommenden Frühjahr statt."
        },
        {
          "it": "votare",
          "de": "wählen, abstimmen",
          "emoji": "✅",
          "ex": "Domenica andremo a votare per il nuovo sindaco.",
          "exDe": "Am Sonntag gehen wir wählen, um den neuen Bürgermeister zu bestimmen."
        },
        {
          "it": "il cittadino",
          "de": "der Bürger",
          "emoji": "🧑",
          "ex": "Ogni cittadino ha il diritto di esprimere la propria opinione.",
          "exDe": "Jeder Bürger hat das Recht, seine eigene Meinung zu äußern."
        },
        {
          "it": "la legge",
          "de": "das Gesetz",
          "emoji": "📜",
          "ex": "La nuova legge entrerà in vigore il mese prossimo.",
          "exDe": "Das neue Gesetz tritt nächsten Monat in Kraft."
        },
        {
          "it": "il ministro",
          "de": "der Minister",
          "emoji": "👔",
          "ex": "Il ministro dell'economia ha presentato il bilancio annuale.",
          "exDe": "Der Wirtschaftsminister hat den Jahreshaushalt vorgestellt."
        },
        {
          "it": "il sindaco",
          "de": "der Bürgermeister",
          "emoji": "🏙️",
          "ex": "Il sindaco ha promesso di migliorare i trasporti pubblici.",
          "exDe": "Der Bürgermeister hat versprochen, den öffentlichen Nahverkehr zu verbessern."
        },
        {
          "it": "il presidente",
          "de": "der Präsident",
          "emoji": "🎖️",
          "ex": "Il presidente ha tenuto un discorso davanti alla nazione.",
          "exDe": "Der Präsident hielt eine Rede vor der Nation."
        },
        {
          "it": "la maggioranza",
          "de": "die Mehrheit",
          "emoji": "📊",
          "ex": "La maggioranza ha approvato la riforma senza difficoltà.",
          "exDe": "Die Mehrheit hat die Reform ohne Schwierigkeiten verabschiedet."
        },
        {
          "it": "l'opposizione",
          "de": "die Opposition",
          "emoji": "⚔️",
          "ex": "L'opposizione critica duramente le scelte del governo.",
          "exDe": "Die Opposition kritisiert die Entscheidungen der Regierung scharf."
        },
        {
          "it": "la campagna elettorale",
          "de": "der Wahlkampf",
          "emoji": "📣",
          "ex": "Durante la campagna elettorale i candidati girano tutto il paese.",
          "exDe": "Während des Wahlkampfs reisen die Kandidaten durch das ganze Land."
        },
        {
          "it": "il diritto",
          "de": "das Recht",
          "emoji": "⚖️",
          "ex": "Tutti hanno il diritto a un'istruzione gratuita.",
          "exDe": "Alle haben das Recht auf eine kostenlose Bildung."
        },
        {
          "it": "il dovere",
          "de": "die Pflicht",
          "emoji": "📋",
          "ex": "Pagare le tasse è un dovere di ogni cittadino.",
          "exDe": "Steuern zu zahlen ist die Pflicht jedes Bürgers."
        },
        {
          "it": "la democrazia",
          "de": "die Demokratie",
          "emoji": "🕊️",
          "ex": "La democrazia si basa sulla partecipazione dei cittadini.",
          "exDe": "Die Demokratie beruht auf der Beteiligung der Bürger."
        },
        {
          "it": "la costituzione",
          "de": "die Verfassung",
          "emoji": "📖",
          "ex": "La costituzione garantisce la libertà di stampa.",
          "exDe": "Die Verfassung garantiert die Pressefreiheit."
        },
        {
          "it": "il comune",
          "de": "die Gemeinde, das Rathaus",
          "emoji": "🏤",
          "ex": "Devo andare al comune per rinnovare la carta d'identità.",
          "exDe": "Ich muss zur Gemeinde gehen, um meinen Personalausweis zu erneuern."
        },
        {
          "it": "la riforma",
          "de": "die Reform",
          "emoji": "🔧",
          "ex": "La riforma della scuola ha suscitato molte discussioni.",
          "exDe": "Die Schulreform hat viele Diskussionen ausgelöst."
        },
        {
          "it": "il candidato",
          "de": "der Kandidat",
          "emoji": "🙋",
          "ex": "Il candidato più giovane ha conquistato i voti dei giovani.",
          "exDe": "Der jüngste Kandidat gewann die Stimmen der jungen Leute."
        }
      ],
      "C1": [
        {
          "it": "l'astensionismo",
          "de": "die Wahlenthaltung",
          "emoji": "🚫",
          "ex": "L'astensionismo crescente preoccupa tutti i partiti tradizionali.",
          "exDe": "Die wachsende Wahlenthaltung beunruhigt alle traditionellen Parteien."
        },
        {
          "it": "il decreto legge",
          "de": "die Gesetzesverordnung",
          "emoji": "📑",
          "ex": "Il governo è ricorso a un decreto legge per affrontare l'emergenza.",
          "exDe": "Die Regierung griff zu einer Gesetzesverordnung, um den Notstand zu bewältigen."
        },
        {
          "it": "la coalizione",
          "de": "die Koalition",
          "emoji": "🤝",
          "ex": "La coalizione di governo ha mostrato le prime crepe interne.",
          "exDe": "Die Regierungskoalition zeigte erste interne Risse."
        },
        {
          "it": "varare una legge",
          "de": "ein Gesetz verabschieden",
          "emoji": "📜",
          "ex": "Il parlamento ha finalmente varato la legge sulla privacy.",
          "exDe": "Das Parlament hat endlich das Datenschutzgesetz verabschiedet."
        },
        {
          "it": "la mozione di sfiducia",
          "de": "der Misstrauensantrag",
          "emoji": "✋",
          "ex": "L'opposizione ha presentato una mozione di sfiducia contro il ministro.",
          "exDe": "Die Opposition stellte einen Misstrauensantrag gegen den Minister."
        },
        {
          "it": "il referendum",
          "de": "das Referendum, die Volksabstimmung",
          "emoji": "🗳️",
          "ex": "Il referendum abrogativo ha cambiato l'esito della legge.",
          "exDe": "Das aufhebende Referendum hat den Ausgang des Gesetzes verändert."
        },
        {
          "it": "la circoscrizione elettorale",
          "de": "der Wahlkreis",
          "emoji": "🗺️",
          "ex": "In quella circoscrizione elettorale il risultato è stato sorprendente.",
          "exDe": "In jenem Wahlkreis war das Ergebnis überraschend."
        },
        {
          "it": "il quorum",
          "de": "das Quorum, die Beschlussfähigkeit",
          "emoji": "🔢",
          "ex": "Il referendum non ha raggiunto il quorum necessario.",
          "exDe": "Das Referendum erreichte das erforderliche Quorum nicht."
        },
        {
          "it": "promulgare",
          "de": "verkünden, ausfertigen",
          "emoji": "✍️",
          "ex": "Il capo dello Stato ha promulgato la legge senza obiezioni.",
          "exDe": "Das Staatsoberhaupt hat das Gesetz ohne Einwände ausgefertigt."
        },
        {
          "it": "la separazione dei poteri",
          "de": "die Gewaltenteilung",
          "emoji": "⚖️",
          "ex": "La separazione dei poteri è un pilastro dello Stato di diritto.",
          "exDe": "Die Gewaltenteilung ist eine Säule des Rechtsstaats."
        },
        {
          "it": "l'iter legislativo",
          "de": "das Gesetzgebungsverfahren",
          "emoji": "🔄",
          "ex": "L'iter legislativo di questa riforma è stato lungo e tortuoso.",
          "exDe": "Das Gesetzgebungsverfahren dieser Reform war lang und verschlungen."
        },
        {
          "it": "il portavoce",
          "de": "der Sprecher",
          "emoji": "🎤",
          "ex": "Il portavoce del governo ha smentito le voci di dimissioni.",
          "exDe": "Der Regierungssprecher dementierte die Gerüchte über einen Rücktritt."
        },
        {
          "it": "lo scrutinio",
          "de": "die Stimmenauszählung",
          "emoji": "🧮",
          "ex": "Lo scrutinio dei voti è proseguito fino a tarda notte.",
          "exDe": "Die Stimmenauszählung dauerte bis spät in die Nacht."
        },
        {
          "it": "la legislatura",
          "de": "die Legislaturperiode",
          "emoji": "📆",
          "ex": "La legislatura si è conclusa con elezioni anticipate.",
          "exDe": "Die Legislaturperiode endete mit vorgezogenen Neuwahlen."
        },
        {
          "it": "il dissenso",
          "de": "der Dissens, der Widerspruch",
          "emoji": "🙅",
          "ex": "Il dissenso interno al partito ha indebolito la leadership.",
          "exDe": "Der parteiinterne Dissens hat die Führung geschwächt."
        },
        {
          "it": "la sovranità",
          "de": "die Souveränität",
          "emoji": "👑",
          "ex": "Il dibattito sulla sovranità nazionale è tornato di attualità.",
          "exDe": "Die Debatte über die nationale Souveränität ist wieder aktuell geworden."
        },
        {
          "it": "l'emendamento",
          "de": "der Änderungsantrag",
          "emoji": "📝",
          "ex": "L'emendamento proposto ha modificato sostanzialmente il testo.",
          "exDe": "Der vorgeschlagene Änderungsantrag hat den Text wesentlich verändert."
        },
        {
          "it": "il consenso popolare",
          "de": "der Rückhalt in der Bevölkerung",
          "emoji": "📈",
          "ex": "Il premier gode ancora di un ampio consenso popolare.",
          "exDe": "Der Ministerpräsident genießt noch immer breiten Rückhalt in der Bevölkerung."
        },
        {
          "it": "la tornata elettorale",
          "de": "der Wahlgang, die Wahlrunde",
          "emoji": "🔁",
          "ex": "Alla seconda tornata elettorale il candidato ha prevalso di poco.",
          "exDe": "Im zweiten Wahlgang setzte sich der Kandidat knapp durch."
        },
        {
          "it": "il decentramento",
          "de": "die Dezentralisierung",
          "emoji": "🌐",
          "ex": "Il decentramento ha trasferito più poteri alle regioni.",
          "exDe": "Die Dezentralisierung hat den Regionen mehr Befugnisse übertragen."
        }
      ],
      "C2": [
        {
          "it": "il trasformismo",
          "de": "der Opportunismus politischer Lagerwechsel",
          "emoji": "🔀",
          "ex": "Il trasformismo parlamentare ha eroso la fiducia degli elettori.",
          "exDe": "Der opportunistische Lagerwechsel im Parlament hat das Vertrauen der Wähler untergraben."
        },
        {
          "it": "l'inciucio",
          "de": "die undurchsichtige Hinterzimmerabsprache",
          "emoji": "🤫",
          "ex": "La stampa ha denunciato un inciucio tra maggioranza e opposizione.",
          "exDe": "Die Presse prangerte eine Hinterzimmerabsprache zwischen Regierung und Opposition an."
        },
        {
          "it": "il sottosegretario",
          "de": "der Staatssekretär",
          "emoji": "🗂️",
          "ex": "Il sottosegretario ha gestito il dossier con discrezione.",
          "exDe": "Der Staatssekretär bearbeitete den Vorgang mit Diskretion."
        },
        {
          "it": "la dietrologia",
          "de": "das Hineindeuten verborgener Hintergründe",
          "emoji": "🕵️",
          "ex": "In Italia la dietrologia accompagna ogni scandalo politico.",
          "exDe": "In Italien begleitet das Hineindeuten verborgener Hintergründe jeden politischen Skandal."
        },
        {
          "it": "il cerchio magico",
          "de": "der innerste Kreis der Vertrauten",
          "emoji": "🔮",
          "ex": "Le decisioni nascevano sempre nel cerchio magico del leader.",
          "exDe": "Die Entscheidungen entstanden stets im innersten Kreis der Vertrauten des Anführers."
        },
        {
          "it": "il franco tiratore",
          "de": "der heimliche Abweichler bei geheimer Abstimmung",
          "emoji": "🎯",
          "ex": "Alcuni franchi tiratori hanno affossato la candidatura ufficiale.",
          "exDe": "Einige heimliche Abweichler ließen die offizielle Kandidatur scheitern."
        },
        {
          "it": "la lottizzazione",
          "de": "die parteipolitische Postenaufteilung",
          "emoji": "🧩",
          "ex": "La lottizzazione degli enti pubblici ha sempre frenato il merito.",
          "exDe": "Die parteipolitische Aufteilung der öffentlichen Ämter hat das Leistungsprinzip stets gebremst."
        },
        {
          "it": "il ribaltone",
          "de": "der plötzliche Machtumschwung",
          "emoji": "🔃",
          "ex": "Il ribaltone ha portato al potere chi era appena uscito sconfitto.",
          "exDe": "Der plötzliche Machtumschwung brachte denjenigen an die Macht, der gerade noch unterlegen war."
        },
        {
          "it": "il malgoverno",
          "de": "die Misswirtschaft, das schlechte Regieren",
          "emoji": "📉",
          "ex": "Anni di malgoverno hanno lasciato le casse pubbliche dissestate.",
          "exDe": "Jahre der Misswirtschaft haben die öffentlichen Kassen zerrüttet hinterlassen."
        },
        {
          "it": "l'ostruzionismo",
          "de": "die Obstruktionspolitik, die Verzögerungstaktik",
          "emoji": "🚧",
          "ex": "L'ostruzionismo dell'opposizione ha bloccato i lavori per settimane.",
          "exDe": "Die Verzögerungstaktik der Opposition blockierte die Arbeiten wochenlang."
        },
        {
          "it": "la consociazione",
          "de": "die stillschweigende Machtteilung der Parteien",
          "emoji": "🔗",
          "ex": "La consociazione tra i grandi partiti soffocava ogni vera alternativa.",
          "exDe": "Die stillschweigende Machtteilung der großen Parteien erstickte jede echte Alternative."
        },
        {
          "it": "il fumus persecutionis",
          "de": "der Verdacht politisch motivierter Verfolgung",
          "emoji": "⚠️",
          "ex": "La difesa ha invocato il fumus persecutionis per respingere l'accusa.",
          "exDe": "Die Verteidigung berief sich auf den Verdacht politisch motivierter Verfolgung, um die Anklage zurückzuweisen."
        },
        {
          "it": "lo statista",
          "de": "der Staatsmann von Format",
          "emoji": "🎩",
          "ex": "Solo un vero statista sa anteporre il bene comune al consenso immediato.",
          "exDe": "Nur ein wahrer Staatsmann von Format stellt das Gemeinwohl über den unmittelbaren Beifall."
        },
        {
          "it": "la realpolitik",
          "de": "die Realpolitik, das interessengeleitete Handeln",
          "emoji": "♟️",
          "ex": "In nome della realpolitik furono accantonati molti principi proclamati.",
          "exDe": "Im Namen der Realpolitik wurden viele verkündete Grundsätze beiseitegeschoben."
        },
        {
          "it": "l'asse di governo",
          "de": "die tragende Regierungsachse",
          "emoji": "📐",
          "ex": "L'asse di governo si è incrinato sulla legge di bilancio.",
          "exDe": "Die tragende Regierungsachse bekam beim Haushaltsgesetz Risse."
        },
        {
          "it": "il voto di scambio",
          "de": "der Stimmenkauf",
          "emoji": "💱",
          "ex": "L'inchiesta ha portato alla luce un sistema di voto di scambio.",
          "exDe": "Die Ermittlung brachte ein System des Stimmenkaufs ans Licht."
        },
        {
          "it": "la nomenklatura",
          "de": "die etablierte Machtelite",
          "emoji": "🏷️",
          "ex": "La nuova generazione voleva scardinare la vecchia nomenklatura.",
          "exDe": "Die neue Generation wollte die alte Machtelite aus den Angeln heben."
        },
        {
          "it": "il bizantinismo",
          "de": "die übertriebene formalistische Spitzfindigkeit",
          "emoji": "🌀",
          "ex": "Il dibattito si è perso in un bizantinismo procedurale sterile.",
          "exDe": "Die Debatte verlor sich in einer unfruchtbaren prozeduralen Spitzfindigkeit."
        },
        {
          "it": "la moral suasion",
          "de": "die sanfte Einflussnahme ohne Zwang",
          "emoji": "🪶",
          "ex": "Il presidente ha esercitato una discreta moral suasion sui partiti.",
          "exDe": "Der Präsident übte eine diskrete, sanfte Einflussnahme auf die Parteien aus."
        },
        {
          "it": "la governabilità",
          "de": "die Regierbarkeit",
          "emoji": "🧭",
          "ex": "La frammentazione del voto mette a rischio la governabilità del paese.",
          "exDe": "Die Zersplitterung der Stimmen gefährdet die Regierbarkeit des Landes."
        }
      ]
    }
  },
  {
    "id": "adv-societa",
    "title": "Società & Attualità",
    "de": "Gesellschaft & Aktuelles",
    "emoji": "👥",
    "color": "#c2548a",
    "area": "Società & Politica",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "la società",
          "de": "die Gesellschaft",
          "emoji": "👥",
          "ex": "La società moderna cambia più rapidamente che mai.",
          "exDe": "Die moderne Gesellschaft verändert sich schneller als je zuvor."
        },
        {
          "it": "la disoccupazione",
          "de": "die Arbeitslosigkeit",
          "emoji": "📉",
          "ex": "La disoccupazione giovanile resta un problema serio.",
          "exDe": "Die Jugendarbeitslosigkeit bleibt ein ernstes Problem."
        },
        {
          "it": "l'immigrazione",
          "de": "die Einwanderung",
          "emoji": "🌍",
          "ex": "L'immigrazione ha cambiato il volto di molte città.",
          "exDe": "Die Einwanderung hat das Gesicht vieler Städte verändert."
        },
        {
          "it": "la povertà",
          "de": "die Armut",
          "emoji": "🥖",
          "ex": "Molte associazioni lottano contro la povertà nelle periferie.",
          "exDe": "Viele Vereine kämpfen gegen die Armut in den Außenbezirken."
        },
        {
          "it": "l'uguaglianza",
          "de": "die Gleichheit",
          "emoji": "⚖️",
          "ex": "L'uguaglianza tra uomini e donne è ancora da raggiungere.",
          "exDe": "Die Gleichheit zwischen Männern und Frauen ist noch nicht erreicht."
        },
        {
          "it": "la discriminazione",
          "de": "die Diskriminierung",
          "emoji": "🚫",
          "ex": "La discriminazione sul lavoro è vietata dalla legge.",
          "exDe": "Diskriminierung am Arbeitsplatz ist gesetzlich verboten."
        },
        {
          "it": "l'integrazione",
          "de": "die Integration",
          "emoji": "🤝",
          "ex": "La scuola favorisce l'integrazione dei nuovi arrivati.",
          "exDe": "Die Schule fördert die Integration der Neuankömmlinge."
        },
        {
          "it": "il volontariato",
          "de": "die ehrenamtliche Arbeit",
          "emoji": "🙌",
          "ex": "Dedica il fine settimana al volontariato in ospedale.",
          "exDe": "Er widmet das Wochenende der ehrenamtlichen Arbeit im Krankenhaus."
        },
        {
          "it": "i mezzi di comunicazione",
          "de": "die Medien",
          "emoji": "📺",
          "ex": "I mezzi di comunicazione influenzano molto l'opinione pubblica.",
          "exDe": "Die Medien beeinflussen die öffentliche Meinung stark."
        },
        {
          "it": "l'opinione pubblica",
          "de": "die öffentliche Meinung",
          "emoji": "💬",
          "ex": "L'opinione pubblica si è divisa sul tema dell'ambiente.",
          "exDe": "Die öffentliche Meinung ist beim Thema Umwelt gespalten."
        },
        {
          "it": "la generazione",
          "de": "die Generation",
          "emoji": "👶",
          "ex": "La nuova generazione è cresciuta con la tecnologia digitale.",
          "exDe": "Die neue Generation ist mit der digitalen Technik aufgewachsen."
        },
        {
          "it": "il pregiudizio",
          "de": "das Vorurteil",
          "emoji": "🙄",
          "ex": "Bisogna combattere i pregiudizi con l'informazione.",
          "exDe": "Man muss Vorurteile mit Aufklärung bekämpfen."
        },
        {
          "it": "la solidarietà",
          "de": "die Solidarität",
          "emoji": "💞",
          "ex": "In tempi difficili la solidarietà tra vicini è fondamentale.",
          "exDe": "In schwierigen Zeiten ist die Solidarität unter Nachbarn entscheidend."
        },
        {
          "it": "l'inquinamento",
          "de": "die Umweltverschmutzung",
          "emoji": "🏭",
          "ex": "L'inquinamento dell'aria peggiora la qualità della vita.",
          "exDe": "Die Luftverschmutzung verschlechtert die Lebensqualität."
        },
        {
          "it": "il cambiamento climatico",
          "de": "der Klimawandel",
          "emoji": "🌡️",
          "ex": "Il cambiamento climatico minaccia molte specie animali.",
          "exDe": "Der Klimawandel bedroht viele Tierarten."
        },
        {
          "it": "la manifestazione",
          "de": "die Demonstration",
          "emoji": "📢",
          "ex": "Migliaia di persone hanno partecipato alla manifestazione per la pace.",
          "exDe": "Tausende Menschen nahmen an der Friedensdemonstration teil."
        },
        {
          "it": "il diritto civile",
          "de": "das Bürgerrecht",
          "emoji": "📜",
          "ex": "Hanno lottato a lungo per ottenere i diritti civili.",
          "exDe": "Sie haben lange für die Bürgerrechte gekämpft."
        },
        {
          "it": "la classe sociale",
          "de": "die soziale Schicht",
          "emoji": "🏷️",
          "ex": "Le differenze tra le classi sociali sono ancora evidenti.",
          "exDe": "Die Unterschiede zwischen den sozialen Schichten sind noch immer deutlich."
        },
        {
          "it": "l'attualità",
          "de": "das aktuelle Geschehen, das Zeitgeschehen",
          "emoji": "📰",
          "ex": "Mi piace restare aggiornato sull'attualità leggendo i giornali.",
          "exDe": "Ich bleibe gern über das Zeitgeschehen auf dem Laufenden, indem ich Zeitungen lese."
        },
        {
          "it": "il benessere",
          "de": "der Wohlstand, das Wohlergehen",
          "emoji": "😊",
          "ex": "Il benessere economico non basta a garantire la felicità.",
          "exDe": "Wirtschaftlicher Wohlstand reicht nicht aus, um Glück zu garantieren."
        }
      ],
      "C1": [
        {
          "it": "l'emarginazione",
          "de": "die soziale Ausgrenzung",
          "emoji": "🚷",
          "ex": "L'emarginazione dei senzatetto richiede politiche più efficaci.",
          "exDe": "Die soziale Ausgrenzung der Obdachlosen erfordert wirksamere Maßnahmen."
        },
        {
          "it": "il divario sociale",
          "de": "die soziale Kluft",
          "emoji": "↔️",
          "ex": "Il divario sociale tra ricchi e poveri si è ampliato negli ultimi anni.",
          "exDe": "Die soziale Kluft zwischen Arm und Reich hat sich in den letzten Jahren vergrößert."
        },
        {
          "it": "la coesione sociale",
          "de": "der gesellschaftliche Zusammenhalt",
          "emoji": "🧶",
          "ex": "Le politiche pubbliche mirano a rafforzare la coesione sociale.",
          "exDe": "Die öffentlichen Maßnahmen zielen darauf ab, den gesellschaftlichen Zusammenhalt zu stärken."
        },
        {
          "it": "il welfare",
          "de": "der Sozialstaat, die Sozialfürsorge",
          "emoji": "🛟",
          "ex": "I tagli al welfare hanno colpito le fasce più deboli.",
          "exDe": "Die Kürzungen bei der Sozialfürsorge trafen die schwächsten Bevölkerungsschichten."
        },
        {
          "it": "la mobilità sociale",
          "de": "die soziale Mobilität",
          "emoji": "🪜",
          "ex": "In quel paese la mobilità sociale è praticamente bloccata.",
          "exDe": "In jenem Land ist die soziale Mobilität praktisch zum Stillstand gekommen."
        },
        {
          "it": "l'invecchiamento della popolazione",
          "de": "die Überalterung der Bevölkerung",
          "emoji": "👵",
          "ex": "L'invecchiamento della popolazione mette sotto pressione le pensioni.",
          "exDe": "Die Überalterung der Bevölkerung setzt das Rentensystem unter Druck."
        },
        {
          "it": "la denatalità",
          "de": "der Geburtenrückgang",
          "emoji": "📉",
          "ex": "La denatalità rappresenta una sfida cruciale per il futuro.",
          "exDe": "Der Geburtenrückgang stellt eine entscheidende Herausforderung für die Zukunft dar."
        },
        {
          "it": "lo sfruttamento",
          "de": "die Ausbeutung",
          "emoji": "⛓️",
          "ex": "Le indagini hanno svelato lo sfruttamento dei braccianti.",
          "exDe": "Die Ermittlungen deckten die Ausbeutung der Landarbeiter auf."
        },
        {
          "it": "il disagio giovanile",
          "de": "das Unbehagen der Jugend",
          "emoji": "😔",
          "ex": "Gli esperti studiano le cause del crescente disagio giovanile.",
          "exDe": "Die Fachleute untersuchen die Ursachen des wachsenden Unbehagens der Jugend."
        },
        {
          "it": "l'integrazione culturale",
          "de": "die kulturelle Integration",
          "emoji": "🌐",
          "ex": "L'integrazione culturale richiede rispetto reciproco e dialogo.",
          "exDe": "Die kulturelle Integration erfordert gegenseitigen Respekt und Dialog."
        },
        {
          "it": "la sensibilizzazione",
          "de": "die Sensibilisierung, die Bewusstseinsbildung",
          "emoji": "💡",
          "ex": "La campagna di sensibilizzazione ha raggiunto migliaia di scuole.",
          "exDe": "Die Sensibilisierungskampagne erreichte Tausende von Schulen."
        },
        {
          "it": "il tessuto sociale",
          "de": "das soziale Gefüge",
          "emoji": "🕸️",
          "ex": "La crisi economica ha lacerato il tessuto sociale del quartiere.",
          "exDe": "Die Wirtschaftskrise hat das soziale Gefüge des Viertels zerrissen."
        },
        {
          "it": "la precarietà",
          "de": "die Prekarität, die Unsicherheit der Lebensverhältnisse",
          "emoji": "🪤",
          "ex": "La precarietà del lavoro impedisce ai giovani di fare progetti.",
          "exDe": "Die Unsicherheit der Arbeitsverhältnisse hindert junge Menschen daran, Pläne zu schmieden."
        },
        {
          "it": "il pluralismo",
          "de": "der Pluralismus",
          "emoji": "🎭",
          "ex": "Il pluralismo dei media è garanzia di una democrazia sana.",
          "exDe": "Der Medienpluralismus ist eine Garantie für eine gesunde Demokratie."
        },
        {
          "it": "la disinformazione",
          "de": "die Desinformation",
          "emoji": "📵",
          "ex": "La disinformazione si diffonde rapidamente sui social network.",
          "exDe": "Die Desinformation verbreitet sich rasch in den sozialen Netzwerken."
        },
        {
          "it": "la sostenibilità",
          "de": "die Nachhaltigkeit",
          "emoji": "♻️",
          "ex": "La sostenibilità ambientale è ormai una priorità per le imprese.",
          "exDe": "Die ökologische Nachhaltigkeit ist mittlerweile eine Priorität für die Unternehmen."
        },
        {
          "it": "il riscatto sociale",
          "de": "der soziale Aufstieg aus benachteiligten Verhältnissen",
          "emoji": "🌟",
          "ex": "Lo sport è stato per lui uno strumento di riscatto sociale.",
          "exDe": "Der Sport war für ihn ein Mittel des sozialen Aufstiegs aus benachteiligten Verhältnissen."
        },
        {
          "it": "la mobilitazione",
          "de": "die Mobilisierung",
          "emoji": "✊",
          "ex": "La mobilitazione dei cittadini ha fermato la costruzione dell'impianto.",
          "exDe": "Die Mobilisierung der Bürger stoppte den Bau der Anlage."
        },
        {
          "it": "l'inclusione",
          "de": "die Inklusion, die Einbeziehung",
          "emoji": "🫂",
          "ex": "L'inclusione delle persone con disabilità è un obiettivo prioritario.",
          "exDe": "Die Inklusion von Menschen mit Behinderung ist ein vorrangiges Ziel."
        }
      ],
      "C2": [
        {
          "it": "la deriva securitaria",
          "de": "die Abdriftung in einen überzogenen Sicherheitskurs",
          "emoji": "🔒",
          "ex": "Molti intellettuali denunciano la deriva securitaria delle nuove norme.",
          "exDe": "Viele Intellektuelle prangern die Abdriftung der neuen Vorschriften in einen überzogenen Sicherheitskurs an."
        },
        {
          "it": "l'imbarbarimento",
          "de": "die Verrohung der Sitten",
          "emoji": "😤",
          "ex": "Il dibattito pubblico soffre di un progressivo imbarbarimento dei toni.",
          "exDe": "Die öffentliche Debatte leidet unter einer fortschreitenden Verrohung der Umgangstöne."
        },
        {
          "it": "la pauperizzazione",
          "de": "die zunehmende Verarmung",
          "emoji": "🪙",
          "ex": "La pauperizzazione del ceto medio è un fenomeno ormai conclamato.",
          "exDe": "Die Verarmung der Mittelschicht ist inzwischen ein unbestreitbares Phänomen."
        },
        {
          "it": "l'atomizzazione sociale",
          "de": "die soziale Vereinzelung",
          "emoji": "🧊",
          "ex": "L'atomizzazione sociale ha indebolito i legami di comunità.",
          "exDe": "Die soziale Vereinzelung hat die Bindungen der Gemeinschaft geschwächt."
        },
        {
          "it": "il familismo amorale",
          "de": "die rein eigeninteressierte Familienbindung auf Kosten des Gemeinwohls",
          "emoji": "👪",
          "ex": "Il familismo amorale ostacola da sempre lo spirito civico.",
          "exDe": "Die rein eigeninteressierte Familienbindung auf Kosten des Gemeinwohls behindert seit jeher den Gemeinsinn."
        },
        {
          "it": "la gentrificazione",
          "de": "die Gentrifizierung",
          "emoji": "🏘️",
          "ex": "La gentrificazione del centro ha espulso gli abitanti storici.",
          "exDe": "Die Gentrifizierung des Zentrums hat die alteingesessenen Bewohner verdrängt."
        },
        {
          "it": "il qualunquismo",
          "de": "die unpolitische Pauschalverachtung der Politik",
          "emoji": "🤷",
          "ex": "Il qualunquismo dilagante alimenta la sfiducia verso ogni istituzione.",
          "exDe": "Die um sich greifende, unpolitische Pauschalverachtung der Politik nährt das Misstrauen gegenüber jeder Institution."
        },
        {
          "it": "la subcultura",
          "de": "die Subkultur",
          "emoji": "🎸",
          "ex": "Quella subcultura urbana ha sviluppato un proprio linguaggio originale.",
          "exDe": "Jene urbane Subkultur hat eine eigene, originelle Sprache entwickelt."
        },
        {
          "it": "l'anomia",
          "de": "die Anomie, der Verfall verbindlicher Normen",
          "emoji": "🌫️",
          "ex": "I sociologi parlano di anomia per descrivere il vuoto di valori condivisi.",
          "exDe": "Die Soziologen sprechen von Anomie, um das Vakuum gemeinsamer Werte zu beschreiben."
        },
        {
          "it": "il vittimismo",
          "de": "die Neigung, sich stets als Opfer zu inszenieren",
          "emoji": "😢",
          "ex": "Il suo discorso oscillava tra rivendicazione e puro vittimismo.",
          "exDe": "Seine Rede schwankte zwischen berechtigter Forderung und reiner Opferinszenierung."
        },
        {
          "it": "la stigmatizzazione",
          "de": "die Stigmatisierung",
          "emoji": "🏷️",
          "ex": "La stigmatizzazione del malato mentale resta dura a morire.",
          "exDe": "Die Stigmatisierung psychisch Kranker ist nur schwer auszurotten."
        },
        {
          "it": "l'omologazione",
          "de": "die kulturelle Gleichmacherei, die Vereinheitlichung",
          "emoji": "🧱",
          "ex": "Pasolini denunciava l'omologazione dei consumi e dei costumi.",
          "exDe": "Pasolini prangerte die Gleichmacherei des Konsums und der Sitten an."
        },
        {
          "it": "la meritocrazia",
          "de": "die Leistungsgesellschaft, das Leistungsprinzip",
          "emoji": "🏅",
          "ex": "Si invoca la meritocrazia, ma le raccomandazioni continuano a prevalere.",
          "exDe": "Man beschwört das Leistungsprinzip, doch Vetternwirtschaft setzt sich weiterhin durch."
        },
        {
          "it": "la coscienza civica",
          "de": "das staatsbürgerliche Verantwortungsbewusstsein",
          "emoji": "🫶",
          "ex": "Una matura coscienza civica nasce sui banchi di scuola.",
          "exDe": "Ein gereiftes staatsbürgerliches Verantwortungsbewusstsein entsteht auf der Schulbank."
        },
        {
          "it": "il proletariato digitale",
          "de": "das digitale Prekariat der Plattformarbeiter",
          "emoji": "📱",
          "ex": "I fattorini delle app costituiscono ormai un vero proletariato digitale.",
          "exDe": "Die Lieferfahrer der Apps bilden inzwischen ein regelrechtes digitales Prekariat der Plattformarbeiter."
        },
        {
          "it": "la cementificazione",
          "de": "die ungebremste Zubetonierung der Landschaft",
          "emoji": "🏗️",
          "ex": "La cementificazione selvaggia della costa ha deturpato il paesaggio.",
          "exDe": "Die hemmungslose Zubetonierung der Küste hat die Landschaft verschandelt."
        },
        {
          "it": "il disincanto",
          "de": "die desillusionierte Ernüchterung",
          "emoji": "🥀",
          "ex": "Un sottile disincanto pervade ormai la generazione più giovane.",
          "exDe": "Eine feine, desillusionierte Ernüchterung durchzieht inzwischen die jüngste Generation."
        },
        {
          "it": "la marginalità",
          "de": "die Randständigkeit, das Dasein am Rand der Gesellschaft",
          "emoji": "🚪",
          "ex": "Il romanzo racconta la marginalità di chi vive ai confini della città.",
          "exDe": "Der Roman erzählt vom Dasein am Rand der Gesellschaft derer, die an den Grenzen der Stadt leben."
        },
        {
          "it": "l'autoreferenzialità",
          "de": "die Selbstbezogenheit, das Kreisen um sich selbst",
          "emoji": "🪞",
          "ex": "L'autoreferenzialità della classe dirigente la rende sorda ai cittadini.",
          "exDe": "Die Selbstbezogenheit der Führungsschicht macht sie taub gegenüber den Bürgern."
        },
        {
          "it": "la sussidiarietà",
          "de": "das Subsidiaritätsprinzip",
          "emoji": "🤲",
          "ex": "In nome della sussidiarietà molti servizi sono affidati al terzo settore.",
          "exDe": "Im Namen des Subsidiaritätsprinzips werden viele Dienste dem gemeinnützigen Sektor anvertraut."
        }
      ]
    }
  },
  {
    "id": "adv-ambiente",
    "title": "Ambiente & Clima",
    "de": "Umwelt & Klima",
    "emoji": "🌍",
    "color": "#1f8a4c",
    "area": "Scienza & Ambiente",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il riscaldamento globale",
          "de": "die globale Erwärmung",
          "emoji": "🌡️",
          "ex": "Il riscaldamento globale provoca lo scioglimento dei ghiacciai.",
          "exDe": "Die globale Erwärmung verursacht das Schmelzen der Gletscher."
        },
        {
          "it": "i rifiuti",
          "de": "der Abfall",
          "emoji": "🗑️",
          "ex": "Dobbiamo ridurre la quantità di rifiuti che produciamo.",
          "exDe": "Wir müssen die Menge an Abfall verringern, die wir produzieren."
        },
        {
          "it": "la raccolta differenziata",
          "de": "die Mülltrennung",
          "emoji": "♻️",
          "ex": "In molti comuni la raccolta differenziata è obbligatoria.",
          "exDe": "In vielen Gemeinden ist die Mülltrennung verpflichtend."
        },
        {
          "it": "le energie rinnovabili",
          "de": "die erneuerbaren Energien",
          "emoji": "🔋",
          "ex": "Le energie rinnovabili stanno sostituendo i combustibili fossili.",
          "exDe": "Die erneuerbaren Energien ersetzen nach und nach die fossilen Brennstoffe."
        },
        {
          "it": "l'effetto serra",
          "de": "der Treibhauseffekt",
          "emoji": "🌫️",
          "ex": "L'effetto serra è causato dai gas presenti nell'atmosfera.",
          "exDe": "Der Treibhauseffekt wird durch die Gase in der Atmosphäre verursacht."
        },
        {
          "it": "la deforestazione",
          "de": "die Abholzung",
          "emoji": "🌲",
          "ex": "La deforestazione minaccia molte specie animali.",
          "exDe": "Die Abholzung bedroht viele Tierarten."
        },
        {
          "it": "il riciclaggio",
          "de": "das Recycling",
          "emoji": "♻️",
          "ex": "Il riciclaggio della plastica richiede impianti specializzati.",
          "exDe": "Das Recycling von Plastik erfordert spezialisierte Anlagen."
        },
        {
          "it": "la siccità",
          "de": "die Dürre",
          "emoji": "🏜️",
          "ex": "La siccità di quest'estate ha danneggiato i raccolti.",
          "exDe": "Die Dürre dieses Sommers hat die Ernten beschädigt."
        },
        {
          "it": "l'alluvione",
          "de": "die Überschwemmung",
          "emoji": "🌊",
          "ex": "L'alluvione ha costretto molte famiglie a lasciare le loro case.",
          "exDe": "Die Überschwemmung hat viele Familien gezwungen, ihre Häuser zu verlassen."
        },
        {
          "it": "la specie protetta",
          "de": "die geschützte Art",
          "emoji": "🐢",
          "ex": "La tartaruga marina è una specie protetta in Italia.",
          "exDe": "Die Meeresschildkröte ist in Italien eine geschützte Art."
        },
        {
          "it": "il risparmio energetico",
          "de": "die Energieeinsparung",
          "emoji": "💡",
          "ex": "Le lampadine a LED garantiscono un notevole risparmio energetico.",
          "exDe": "LED-Lampen gewährleisten eine erhebliche Energieeinsparung."
        },
        {
          "it": "l'impatto ambientale",
          "de": "die Umweltauswirkung",
          "emoji": "📉",
          "ex": "Bisogna valutare l'impatto ambientale di ogni nuovo progetto.",
          "exDe": "Man muss die Umweltauswirkung jedes neuen Projekts bewerten."
        },
        {
          "it": "la biodiversità",
          "de": "die Biodiversität",
          "emoji": "🦋",
          "ex": "La biodiversità di questa foresta è davvero straordinaria.",
          "exDe": "Die Biodiversität dieses Waldes ist wirklich außergewöhnlich."
        },
        {
          "it": "il combustibile fossile",
          "de": "der fossile Brennstoff",
          "emoji": "⛽",
          "ex": "L'uso dei combustibili fossili va ridotto drasticamente.",
          "exDe": "Der Gebrauch fossiler Brennstoffe muss drastisch reduziert werden."
        },
        {
          "it": "l'ambientalista",
          "de": "der Umweltschützer",
          "emoji": "🪧",
          "ex": "Gli ambientalisti hanno organizzato una manifestazione in piazza.",
          "exDe": "Die Umweltschützer haben eine Demonstration auf dem Platz organisiert."
        },
        {
          "it": "lo smog",
          "de": "der Smog",
          "emoji": "😷",
          "ex": "A causa dello smog il sindaco ha vietato la circolazione delle auto.",
          "exDe": "Wegen des Smogs hat der Bürgermeister den Autoverkehr verboten."
        }
      ],
      "C1": [
        {
          "it": "le emissioni nocive",
          "de": "die schädlichen Emissionen",
          "emoji": "💨",
          "ex": "Le nuove normative mirano a contenere le emissioni nocive dell'industria.",
          "exDe": "Die neuen Vorschriften zielen darauf ab, die schädlichen Emissionen der Industrie einzudämmen."
        },
        {
          "it": "l'impronta ecologica",
          "de": "der ökologische Fußabdruck",
          "emoji": "👣",
          "ex": "Calcolare la propria impronta ecologica aiuta a consumare in modo più responsabile.",
          "exDe": "Den eigenen ökologischen Fußabdruck zu berechnen hilft, bewusster zu konsumieren."
        },
        {
          "it": "il dissesto idrogeologico",
          "de": "die hydrogeologische Instabilität",
          "emoji": "⛰️",
          "ex": "Il dissesto idrogeologico rende molte zone vulnerabili alle frane.",
          "exDe": "Die hydrogeologische Instabilität macht viele Gebiete anfällig für Erdrutsche."
        },
        {
          "it": "la transizione energetica",
          "de": "die Energiewende",
          "emoji": "🔌",
          "ex": "La transizione energetica comporta investimenti ingenti nelle reti elettriche.",
          "exDe": "Die Energiewende bringt erhebliche Investitionen in die Stromnetze mit sich."
        },
        {
          "it": "il consumo di suolo",
          "de": "der Flächenverbrauch",
          "emoji": "🏗️",
          "ex": "L'urbanizzazione incontrollata ha accelerato il consumo di suolo.",
          "exDe": "Die unkontrollierte Verstädterung hat den Flächenverbrauch beschleunigt."
        },
        {
          "it": "mitigare i danni",
          "de": "die Schäden mildern",
          "emoji": "🛡️",
          "ex": "Le politiche ambientali cercano di mitigare i danni provocati dalle alluvioni.",
          "exDe": "Die Umweltpolitik versucht, die durch Überschwemmungen verursachten Schäden zu mildern."
        },
        {
          "it": "la desertificazione",
          "de": "die Wüstenbildung",
          "emoji": "🏜️",
          "ex": "La desertificazione avanza inesorabilmente nel Mediterraneo meridionale.",
          "exDe": "Die Wüstenbildung schreitet im südlichen Mittelmeerraum unaufhaltsam voran."
        },
        {
          "it": "l'economia circolare",
          "de": "die Kreislaufwirtschaft",
          "emoji": "🔄",
          "ex": "L'economia circolare punta a riutilizzare le materie prime anziché scartarle.",
          "exDe": "Die Kreislaufwirtschaft strebt danach, Rohstoffe wiederzuverwenden, statt sie wegzuwerfen."
        },
        {
          "it": "il dissesto ambientale",
          "de": "die Umweltzerstörung",
          "emoji": "💥",
          "ex": "Lo sfruttamento intensivo ha portato a un grave dissesto ambientale della regione.",
          "exDe": "Die intensive Ausbeutung hat zu einer schweren Umweltzerstörung der Region geführt."
        },
        {
          "it": "la neutralità climatica",
          "de": "die Klimaneutralität",
          "emoji": "⚖️",
          "ex": "L'Unione Europea si è impegnata a raggiungere la neutralità climatica entro il 2050.",
          "exDe": "Die Europäische Union hat sich verpflichtet, bis 2050 Klimaneutralität zu erreichen."
        },
        {
          "it": "l'acidificazione degli oceani",
          "de": "die Versauerung der Ozeane",
          "emoji": "🌊",
          "ex": "L'acidificazione degli oceani compromette la sopravvivenza dei coralli.",
          "exDe": "Die Versauerung der Ozeane gefährdet das Überleben der Korallen."
        },
        {
          "it": "salvaguardare l'ecosistema",
          "de": "das Ökosystem schützen",
          "emoji": "🌳",
          "ex": "Le aree protette servono a salvaguardare l'ecosistema locale.",
          "exDe": "Die Schutzgebiete dienen dazu, das lokale Ökosystem zu schützen."
        },
        {
          "it": "il bilancio idrico",
          "de": "die Wasserbilanz",
          "emoji": "💧",
          "ex": "Le scarse precipitazioni hanno alterato il bilancio idrico del bacino.",
          "exDe": "Die geringen Niederschläge haben die Wasserbilanz des Beckens verändert."
        },
        {
          "it": "la fonte rinnovabile",
          "de": "die erneuerbare Quelle",
          "emoji": "☀️",
          "ex": "L'eolico è una fonte rinnovabile sempre più competitiva sul mercato.",
          "exDe": "Die Windkraft ist eine erneuerbare Quelle, die auf dem Markt immer wettbewerbsfähiger wird."
        },
        {
          "it": "il sequestro del carbonio",
          "de": "die Kohlenstoffbindung",
          "emoji": "🌲",
          "ex": "Le foreste svolgono un ruolo cruciale nel sequestro del carbonio.",
          "exDe": "Die Wälder spielen eine entscheidende Rolle bei der Kohlenstoffbindung."
        },
        {
          "it": "l'evento estremo",
          "de": "das Extremereignis",
          "emoji": "🌪️",
          "ex": "Gli eventi estremi sono diventati più frequenti negli ultimi decenni.",
          "exDe": "Die Extremereignisse sind in den letzten Jahrzehnten häufiger geworden."
        },
        {
          "it": "il degrado del territorio",
          "de": "die Landschaftsdegradation",
          "emoji": "🪨",
          "ex": "L'abbandono dei campi ha accentuato il degrado del territorio montano.",
          "exDe": "Die Aufgabe der Felder hat die Degradation des Berglands verstärkt."
        },
        {
          "it": "il consumo idrico",
          "de": "der Wasserverbrauch",
          "emoji": "🚰",
          "ex": "L'agricoltura è responsabile di gran parte del consumo idrico nazionale.",
          "exDe": "Die Landwirtschaft ist für einen Großteil des nationalen Wasserverbrauchs verantwortlich."
        }
      ],
      "C2": [
        {
          "it": "l'antropizzazione del paesaggio",
          "de": "die anthropogene Überformung der Landschaft",
          "emoji": "🏙️",
          "ex": "L'antropizzazione del paesaggio costiero ha snaturato interi tratti di litorale.",
          "exDe": "Die anthropogene Überformung der Küstenlandschaft hat ganze Küstenabschnitte entstellt."
        },
        {
          "it": "la resilienza degli ecosistemi",
          "de": "die Resilienz der Ökosysteme",
          "emoji": "🌿",
          "ex": "La resilienza degli ecosistemi dipende dalla loro complessità intrinseca.",
          "exDe": "Die Resilienz der Ökosysteme hängt von ihrer inneren Komplexität ab."
        },
        {
          "it": "il punto di non ritorno",
          "de": "der Kipppunkt",
          "emoji": "⚠️",
          "ex": "Diversi climatologi temono che il sistema abbia già superato il punto di non ritorno.",
          "exDe": "Mehrere Klimaforscher befürchten, dass das System den Kipppunkt bereits überschritten hat."
        },
        {
          "it": "l'esternalità negativa",
          "de": "der negative externe Effekt",
          "emoji": "📊",
          "ex": "Le esternalità negative dell'industria ricadono inevitabilmente sulla collettività.",
          "exDe": "Die negativen externen Effekte der Industrie fallen unweigerlich der Allgemeinheit zur Last."
        },
        {
          "it": "l'inquinamento diffuso",
          "de": "die diffuse Verschmutzung",
          "emoji": "🌫️",
          "ex": "L'inquinamento diffuso da fertilizzanti è di difficile tracciabilità.",
          "exDe": "Die diffuse Verschmutzung durch Düngemittel ist schwer nachzuverfolgen."
        },
        {
          "it": "la vocazione naturalistica",
          "de": "die naturräumliche Eignung",
          "emoji": "🏞️",
          "ex": "La vocazione naturalistica di quell'area ne sconsiglia ogni edificazione.",
          "exDe": "Die naturräumliche Eignung dieses Gebiets spricht gegen jede Bebauung."
        },
        {
          "it": "il dissesto orografico",
          "de": "die orographische Instabilität",
          "emoji": "🗻",
          "ex": "Il dissesto orografico dei versanti impone interventi di consolidamento.",
          "exDe": "Die orographische Instabilität der Hänge erfordert Sicherungsmaßnahmen."
        },
        {
          "it": "lo scioglimento del permafrost",
          "de": "das Auftauen des Permafrosts",
          "emoji": "🧊",
          "ex": "Lo scioglimento del permafrost libera ingenti quantità di metano.",
          "exDe": "Das Auftauen des Permafrosts setzt enorme Mengen Methan frei."
        },
        {
          "it": "la mitigazione antropica",
          "de": "die anthropogene Minderung",
          "emoji": "🛠️",
          "ex": "Senza una decisa mitigazione antropica le proiezioni restano allarmanti.",
          "exDe": "Ohne eine entschlossene anthropogene Minderung bleiben die Prognosen alarmierend."
        },
        {
          "it": "il bilancio radiativo",
          "de": "die Strahlungsbilanz",
          "emoji": "🔆",
          "ex": "L'aumento dei gas serra altera il bilancio radiativo del pianeta.",
          "exDe": "Die Zunahme der Treibhausgase verändert die Strahlungsbilanz des Planeten."
        },
        {
          "it": "la deriva ecologica",
          "de": "die ökologische Abdrift",
          "emoji": "🧭",
          "ex": "L'introduzione di specie aliene ha innescato una deriva ecologica irreversibile.",
          "exDe": "Die Einführung gebietsfremder Arten hat eine irreversible ökologische Abdrift ausgelöst."
        },
        {
          "it": "l'incidenza antropogenica",
          "de": "der menschengemachte Einfluss",
          "emoji": "🧑‍🏭",
          "ex": "Gli studi confermano l'incidenza antropogenica sul riscaldamento osservato.",
          "exDe": "Die Studien bestätigen den menschengemachten Einfluss auf die beobachtete Erwärmung."
        },
        {
          "it": "la rinaturalizzazione",
          "de": "die Renaturierung",
          "emoji": "🌾",
          "ex": "La rinaturalizzazione del fiume ha restituito spazio alle golene originarie.",
          "exDe": "Die Renaturierung des Flusses hat den ursprünglichen Auen wieder Raum gegeben."
        },
        {
          "it": "il prelievo idrico insostenibile",
          "de": "die nicht nachhaltige Wasserentnahme",
          "emoji": "🪣",
          "ex": "Il prelievo idrico insostenibile ha prosciugato la falda acquifera.",
          "exDe": "Die nicht nachhaltige Wasserentnahme hat den Grundwasserleiter ausgetrocknet."
        },
        {
          "it": "la coibentazione degli edifici",
          "de": "die Wärmedämmung der Gebäude",
          "emoji": "🏠",
          "ex": "Una corretta coibentazione degli edifici abbatte sensibilmente i consumi.",
          "exDe": "Eine korrekte Wärmedämmung der Gebäude senkt den Verbrauch spürbar."
        },
        {
          "it": "la forzante climatica",
          "de": "der Klimaantrieb",
          "emoji": "🌀",
          "ex": "I vulcani rappresentano una forzante climatica di natura episodica.",
          "exDe": "Vulkane stellen einen Klimaantrieb episodischer Natur dar."
        },
        {
          "it": "il deflusso superficiale",
          "de": "der Oberflächenabfluss",
          "emoji": "🌧️",
          "ex": "L'impermeabilizzazione del suolo accentua il deflusso superficiale durante i temporali.",
          "exDe": "Die Versiegelung des Bodens verstärkt den Oberflächenabfluss bei Gewittern."
        },
        {
          "it": "la compensazione delle emissioni",
          "de": "die Emissionskompensation",
          "emoji": "🌳",
          "ex": "La compensazione delle emissioni non può sostituire una reale decarbonizzazione.",
          "exDe": "Die Emissionskompensation kann eine echte Dekarbonisierung nicht ersetzen."
        },
        {
          "it": "l'erosione del litorale",
          "de": "die Küstenerosion",
          "emoji": "🏖️",
          "ex": "L'erosione del litorale ha ridotto drasticamente l'ampiezza delle spiagge.",
          "exDe": "Die Küstenerosion hat die Breite der Strände drastisch verringert."
        }
      ]
    }
  },
  {
    "id": "adv-scienza",
    "title": "Scienza & Ricerca",
    "de": "Wissenschaft & Forschung",
    "emoji": "🔬",
    "color": "#3f93b8",
    "area": "Scienza & Ambiente",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "la ricerca scientifica",
          "de": "die wissenschaftliche Forschung",
          "emoji": "🔬",
          "ex": "La ricerca scientifica richiede finanziamenti costanti.",
          "exDe": "Die wissenschaftliche Forschung erfordert beständige Finanzierung."
        },
        {
          "it": "l'esperimento",
          "de": "das Experiment",
          "emoji": "🧪",
          "ex": "L'esperimento ha confermato l'ipotesi iniziale dei ricercatori.",
          "exDe": "Das Experiment hat die ursprüngliche Hypothese der Forscher bestätigt."
        },
        {
          "it": "la scoperta",
          "de": "die Entdeckung",
          "emoji": "💡",
          "ex": "Questa scoperta potrebbe rivoluzionare la medicina moderna.",
          "exDe": "Diese Entdeckung könnte die moderne Medizin revolutionieren."
        },
        {
          "it": "il laboratorio",
          "de": "das Labor",
          "emoji": "🧫",
          "ex": "Gli studenti passano molte ore in laboratorio.",
          "exDe": "Die Studenten verbringen viele Stunden im Labor."
        },
        {
          "it": "l'ipotesi",
          "de": "die Hypothese",
          "emoji": "❓",
          "ex": "Il ricercatore ha formulato un'ipotesi audace.",
          "exDe": "Der Forscher hat eine gewagte Hypothese formuliert."
        },
        {
          "it": "la teoria",
          "de": "die Theorie",
          "emoji": "📚",
          "ex": "La teoria dell'evoluzione è ampiamente accettata.",
          "exDe": "Die Evolutionstheorie ist weithin anerkannt."
        },
        {
          "it": "il risultato",
          "de": "das Ergebnis",
          "emoji": "📈",
          "ex": "I risultati dello studio sono stati pubblicati su una rivista internazionale.",
          "exDe": "Die Ergebnisse der Studie wurden in einer internationalen Zeitschrift veröffentlicht."
        },
        {
          "it": "il ricercatore",
          "de": "der Forscher",
          "emoji": "👨‍🔬",
          "ex": "Il ricercatore lavora a questo progetto da diversi anni.",
          "exDe": "Der Forscher arbeitet seit mehreren Jahren an diesem Projekt."
        },
        {
          "it": "la prova",
          "de": "der Nachweis",
          "emoji": "✅",
          "ex": "Non esiste alcuna prova a sostegno di questa affermazione.",
          "exDe": "Es gibt keinen Nachweis für diese Behauptung."
        },
        {
          "it": "il microscopio",
          "de": "das Mikroskop",
          "emoji": "🔬",
          "ex": "Al microscopio si possono osservare le cellule.",
          "exDe": "Unter dem Mikroskop kann man die Zellen beobachten."
        },
        {
          "it": "la cellula",
          "de": "die Zelle",
          "emoji": "🦠",
          "ex": "Ogni cellula contiene il materiale genetico dell'organismo.",
          "exDe": "Jede Zelle enthält das genetische Material des Organismus."
        },
        {
          "it": "il dato",
          "de": "die Daten",
          "emoji": "📊",
          "ex": "Gli scienziati hanno raccolto i dati per tre anni.",
          "exDe": "Die Wissenschaftler haben die Daten drei Jahre lang gesammelt."
        },
        {
          "it": "il progresso",
          "de": "der Fortschritt",
          "emoji": "🚀",
          "ex": "Il progresso tecnologico ha cambiato la nostra vita quotidiana.",
          "exDe": "Der technologische Fortschritt hat unser tägliches Leben verändert."
        },
        {
          "it": "lo studio",
          "de": "die Studie",
          "emoji": "📝",
          "ex": "Lo studio ha coinvolto più di mille partecipanti.",
          "exDe": "Die Studie umfasste mehr als tausend Teilnehmer."
        },
        {
          "it": "la formula",
          "de": "die Formel",
          "emoji": "➗",
          "ex": "La formula chimica dell'acqua è molto semplice.",
          "exDe": "Die chemische Formel von Wasser ist sehr einfach."
        },
        {
          "it": "la genetica",
          "de": "die Genetik",
          "emoji": "🧬",
          "ex": "La genetica studia la trasmissione dei caratteri ereditari.",
          "exDe": "Die Genetik untersucht die Vererbung von Erbmerkmalen."
        },
        {
          "it": "la conclusione",
          "de": "die Schlussfolgerung",
          "emoji": "🎯",
          "ex": "Gli autori sono giunti a una conclusione sorprendente.",
          "exDe": "Die Autoren sind zu einer überraschenden Schlussfolgerung gelangt."
        },
        {
          "it": "l'innovazione",
          "de": "die Innovation",
          "emoji": "✨",
          "ex": "L'innovazione è fondamentale per la competitività di un paese.",
          "exDe": "Die Innovation ist entscheidend für die Wettbewerbsfähigkeit eines Landes."
        },
        {
          "it": "il metodo",
          "de": "die Methode",
          "emoji": "🧭",
          "ex": "Hanno applicato un metodo rigoroso per analizzare i campioni.",
          "exDe": "Sie haben eine strenge Methode angewandt, um die Proben zu analysieren."
        }
      ],
      "C1": [
        {
          "it": "la revisione tra pari",
          "de": "die Begutachtung durch Fachkollegen",
          "emoji": "🧐",
          "ex": "Prima della pubblicazione, l'articolo è sottoposto a revisione tra pari.",
          "exDe": "Vor der Veröffentlichung wird der Artikel einer Begutachtung durch Fachkollegen unterzogen."
        },
        {
          "it": "la sperimentazione clinica",
          "de": "die klinische Erprobung",
          "emoji": "💉",
          "ex": "Il farmaco è ancora in fase di sperimentazione clinica.",
          "exDe": "Das Medikament befindet sich noch in der Phase der klinischen Erprobung."
        },
        {
          "it": "il campione rappresentativo",
          "de": "die repräsentative Stichprobe",
          "emoji": "🎲",
          "ex": "Senza un campione rappresentativo i risultati non sono attendibili.",
          "exDe": "Ohne eine repräsentative Stichprobe sind die Ergebnisse nicht zuverlässig."
        },
        {
          "it": "la riproducibilità",
          "de": "die Reproduzierbarkeit",
          "emoji": "🔁",
          "ex": "La riproducibilità degli esperimenti è un requisito imprescindibile.",
          "exDe": "Die Reproduzierbarkeit der Experimente ist eine unverzichtbare Voraussetzung."
        },
        {
          "it": "confutare una tesi",
          "de": "eine These widerlegen",
          "emoji": "❌",
          "ex": "I nuovi dati permettono di confutare la tesi precedentemente accettata.",
          "exDe": "Die neuen Daten ermöglichen es, die zuvor anerkannte These zu widerlegen."
        },
        {
          "it": "il rigore metodologico",
          "de": "die methodische Strenge",
          "emoji": "📐",
          "ex": "Lo studio si distingue per il suo rigore metodologico.",
          "exDe": "Die Studie zeichnet sich durch ihre methodische Strenge aus."
        },
        {
          "it": "la correlazione",
          "de": "die Korrelation",
          "emoji": "🔗",
          "ex": "Una correlazione non implica necessariamente un rapporto di causa-effetto.",
          "exDe": "Eine Korrelation bedeutet nicht zwangsläufig einen Ursache-Wirkungs-Zusammenhang."
        },
        {
          "it": "il finanziamento alla ricerca",
          "de": "die Forschungsförderung",
          "emoji": "💰",
          "ex": "Il taglio dei finanziamenti alla ricerca preoccupa l'intera comunità accademica.",
          "exDe": "Die Kürzung der Forschungsförderung beunruhigt die gesamte akademische Gemeinschaft."
        },
        {
          "it": "il quadro teorico",
          "de": "der theoretische Rahmen",
          "emoji": "🖼️",
          "ex": "L'autore inserisce la ricerca in un solido quadro teorico.",
          "exDe": "Der Autor bettet die Forschung in einen soliden theoretischen Rahmen ein."
        },
        {
          "it": "la variabile dipendente",
          "de": "die abhängige Variable",
          "emoji": "📉",
          "ex": "Nel modello, il reddito funge da variabile dipendente.",
          "exDe": "Im Modell fungiert das Einkommen als abhängige Variable."
        },
        {
          "it": "l'avanguardia scientifica",
          "de": "die wissenschaftliche Vorhut",
          "emoji": "🛰️",
          "ex": "Quell'istituto si colloca all'avanguardia scientifica nel campo della robotica.",
          "exDe": "Dieses Institut steht in der wissenschaftlichen Vorhut auf dem Gebiet der Robotik."
        },
        {
          "it": "il presupposto",
          "de": "die Voraussetzung",
          "emoji": "🧩",
          "ex": "L'intero ragionamento poggia su un presupposto discutibile.",
          "exDe": "Die gesamte Argumentation beruht auf einer fragwürdigen Voraussetzung."
        },
        {
          "it": "la validità statistica",
          "de": "die statistische Validität",
          "emoji": "📊",
          "ex": "Il numero ridotto di soggetti compromette la validità statistica dei risultati.",
          "exDe": "Die geringe Zahl der Probanden beeinträchtigt die statistische Validität der Ergebnisse."
        },
        {
          "it": "il progresso tecnologico",
          "de": "der technologische Fortschritt",
          "emoji": "⚙️",
          "ex": "Il progresso tecnologico solleva nuovi interrogativi di natura etica.",
          "exDe": "Der technologische Fortschritt wirft neue Fragen ethischer Natur auf."
        },
        {
          "it": "l'evidenza empirica",
          "de": "der empirische Beleg",
          "emoji": "🔎",
          "ex": "La conclusione si fonda su una solida evidenza empirica.",
          "exDe": "Die Schlussfolgerung stützt sich auf einen soliden empirischen Beleg."
        },
        {
          "it": "il margine di errore",
          "de": "die Fehlermarge",
          "emoji": "±",
          "ex": "I sondaggi vanno sempre interpretati tenendo conto del margine di errore.",
          "exDe": "Umfragen müssen stets unter Berücksichtigung der Fehlermarge interpretiert werden."
        },
        {
          "it": "la divulgazione scientifica",
          "de": "die Wissenschaftskommunikation",
          "emoji": "📡",
          "ex": "La divulgazione scientifica avvicina il grande pubblico alla ricerca.",
          "exDe": "Die Wissenschaftskommunikation bringt das breite Publikum der Forschung näher."
        },
        {
          "it": "l'interdisciplinarietà",
          "de": "die Interdisziplinarität",
          "emoji": "🔀",
          "ex": "L'interdisciplinarietà favorisce soluzioni innovative a problemi complessi.",
          "exDe": "Die Interdisziplinarität begünstigt innovative Lösungen für komplexe Probleme."
        },
        {
          "it": "il protocollo sperimentale",
          "de": "das Versuchsprotokoll",
          "emoji": "📋",
          "ex": "Ogni passaggio del protocollo sperimentale va documentato con cura.",
          "exDe": "Jeder Schritt des Versuchsprotokolls muss sorgfältig dokumentiert werden."
        }
      ],
      "C2": [
        {
          "it": "il paradigma scientifico",
          "de": "das wissenschaftliche Paradigma",
          "emoji": "🔭",
          "ex": "Una scoperta dirompente può imporre un nuovo paradigma scientifico.",
          "exDe": "Eine bahnbrechende Entdeckung kann ein neues wissenschaftliches Paradigma durchsetzen."
        },
        {
          "it": "la falsificabilità",
          "de": "die Falsifizierbarkeit",
          "emoji": "⚗️",
          "ex": "Secondo Popper, la falsificabilità distingue la scienza dalla pseudoscienza.",
          "exDe": "Laut Popper unterscheidet die Falsifizierbarkeit die Wissenschaft von der Pseudowissenschaft."
        },
        {
          "it": "il bias di conferma",
          "de": "der Bestätigungsfehler",
          "emoji": "🪞",
          "ex": "Il bias di conferma induce i ricercatori a privilegiare i dati congeniali alle loro attese.",
          "exDe": "Der Bestätigungsfehler verleitet Forscher dazu, die ihren Erwartungen genehmen Daten zu bevorzugen."
        },
        {
          "it": "l'inferenza statistica",
          "de": "die statistische Inferenz",
          "emoji": "🧮",
          "ex": "L'inferenza statistica consente di trarre conclusioni sulla popolazione a partire da un campione.",
          "exDe": "Die statistische Inferenz erlaubt es, aus einer Stichprobe Schlüsse auf die Grundgesamtheit zu ziehen."
        },
        {
          "it": "il nesso di causalità",
          "de": "der Kausalzusammenhang",
          "emoji": "🔗",
          "ex": "Stabilire un autentico nesso di causalità richiede esperimenti controllati.",
          "exDe": "Einen echten Kausalzusammenhang nachzuweisen erfordert kontrollierte Experimente."
        },
        {
          "it": "l'epistemologia",
          "de": "die Erkenntnistheorie",
          "emoji": "🧠",
          "ex": "L'epistemologia interroga i fondamenti stessi della conoscenza scientifica.",
          "exDe": "Die Erkenntnistheorie hinterfragt die Grundlagen der wissenschaftlichen Erkenntnis selbst."
        },
        {
          "it": "la soglia di significatività",
          "de": "das Signifikanzniveau",
          "emoji": "📏",
          "ex": "Il risultato non supera la soglia di significatività comunemente adottata.",
          "exDe": "Das Ergebnis überschreitet das allgemein angewandte Signifikanzniveau nicht."
        },
        {
          "it": "la confutazione empirica",
          "de": "die empirische Widerlegung",
          "emoji": "🚫",
          "ex": "Una sola confutazione empirica può minare un'intera costruzione teorica.",
          "exDe": "Eine einzige empirische Widerlegung kann ein ganzes theoretisches Gebäude untergraben."
        },
        {
          "it": "il fattore confondente",
          "de": "der Störfaktor",
          "emoji": "🌀",
          "ex": "Gli autori hanno trascurato un fattore confondente di rilievo.",
          "exDe": "Die Autoren haben einen bedeutenden Störfaktor übersehen."
        },
        {
          "it": "la metanalisi",
          "de": "die Metaanalyse",
          "emoji": "📚",
          "ex": "La metanalisi aggrega i risultati di decine di studi indipendenti.",
          "exDe": "Die Metaanalyse fasst die Ergebnisse von Dutzenden unabhängiger Studien zusammen."
        },
        {
          "it": "l'euristica",
          "de": "die Heuristik",
          "emoji": "🧭",
          "ex": "L'euristica guida l'intuizione del ricercatore nelle fasi iniziali dell'indagine.",
          "exDe": "Die Heuristik leitet die Intuition des Forschers in den frühen Phasen der Untersuchung."
        },
        {
          "it": "il riduzionismo metodologico",
          "de": "der methodologische Reduktionismus",
          "emoji": "🔬",
          "ex": "Il riduzionismo metodologico scompone i fenomeni complessi nelle loro componenti elementari.",
          "exDe": "Der methodologische Reduktionismus zerlegt komplexe Phänomene in ihre elementaren Bestandteile."
        },
        {
          "it": "la robustezza del modello",
          "de": "die Robustheit des Modells",
          "emoji": "🏗️",
          "ex": "La robustezza del modello è stata saggiata con simulazioni ripetute.",
          "exDe": "Die Robustheit des Modells wurde mit wiederholten Simulationen geprüft."
        },
        {
          "it": "l'incommensurabilità",
          "de": "die Inkommensurabilität",
          "emoji": "🧩",
          "ex": "L'incommensurabilità tra paradigmi rivali ostacola il confronto diretto.",
          "exDe": "Die Inkommensurabilität zwischen rivalisierenden Paradigmen erschwert den direkten Vergleich."
        },
        {
          "it": "la sperimentazione in doppio cieco",
          "de": "der Doppelblindversuch",
          "emoji": "🙈",
          "ex": "La sperimentazione in doppio cieco neutralizza l'effetto delle aspettative.",
          "exDe": "Der Doppelblindversuch neutralisiert den Effekt der Erwartungen."
        },
        {
          "it": "il portato euristico",
          "de": "der heuristische Ertrag",
          "emoji": "💎",
          "ex": "Pur essendo imprecisa, l'analogia conserva un notevole portato euristico.",
          "exDe": "Obwohl sie ungenau ist, behält die Analogie einen beachtlichen heuristischen Ertrag."
        },
        {
          "it": "la parsimonia esplicativa",
          "de": "die erklärerische Sparsamkeit",
          "emoji": "🪶",
          "ex": "Tra due teorie equivalenti si privilegia quella di maggiore parsimonia esplicativa.",
          "exDe": "Zwischen zwei gleichwertigen Theorien bevorzugt man jene mit der größeren erklärerischen Sparsamkeit."
        },
        {
          "it": "la taratura dello strumento",
          "de": "die Kalibrierung des Instruments",
          "emoji": "🎛️",
          "ex": "Una taratura dello strumento imprecisa vizia l'intera serie di misurazioni.",
          "exDe": "Eine ungenaue Kalibrierung des Instruments verfälscht die gesamte Messreihe."
        },
        {
          "it": "il dato anomalo",
          "de": "der Ausreißerwert",
          "emoji": "📍",
          "ex": "Prima dell'analisi occorre stabilire come trattare ogni dato anomalo.",
          "exDe": "Vor der Analyse muss festgelegt werden, wie mit jedem Ausreißerwert zu verfahren ist."
        }
      ]
    }
  },
  {
    "id": "adv-tecnologia",
    "title": "Tecnologia & Digitale",
    "de": "Technologie & Digitales",
    "emoji": "💻",
    "color": "#5a7d9b",
    "area": "Tecnologia & Media",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il dispositivo",
          "de": "das Gerät",
          "emoji": "📱",
          "ex": "Questo dispositivo si collega automaticamente alla rete domestica.",
          "exDe": "Dieses Gerät verbindet sich automatisch mit dem Heimnetzwerk."
        },
        {
          "it": "scaricare un'applicazione",
          "de": "eine App herunterladen",
          "emoji": "⬇️",
          "ex": "Ho scaricato un'applicazione per gestire le mie spese.",
          "exDe": "Ich habe eine App heruntergeladen, um meine Ausgaben zu verwalten."
        },
        {
          "it": "l'aggiornamento",
          "de": "das Update",
          "emoji": "🔄",
          "ex": "L'ultimo aggiornamento ha migliorato la durata della batteria.",
          "exDe": "Das letzte Update hat die Akkulaufzeit verbessert."
        },
        {
          "it": "la password sicura",
          "de": "das sichere Passwort",
          "emoji": "🔐",
          "ex": "Conviene scegliere una password sicura con lettere e numeri.",
          "exDe": "Es lohnt sich, ein sicheres Passwort mit Buchstaben und Zahlen zu wählen."
        },
        {
          "it": "navigare in rete",
          "de": "im Internet surfen",
          "emoji": "🌐",
          "ex": "Passo troppo tempo a navigare in rete la sera.",
          "exDe": "Ich verbringe abends zu viel Zeit damit, im Internet zu surfen."
        },
        {
          "it": "la connessione",
          "de": "die Verbindung",
          "emoji": "📶",
          "ex": "La connessione è instabile in questa zona.",
          "exDe": "Die Verbindung ist in dieser Gegend instabil."
        },
        {
          "it": "il motore di ricerca",
          "de": "die Suchmaschine",
          "emoji": "🔍",
          "ex": "Uso un motore di ricerca diverso per proteggere la privacy.",
          "exDe": "Ich benutze eine andere Suchmaschine, um die Privatsphäre zu schützen."
        },
        {
          "it": "lo schermo touch",
          "de": "der Touchscreen",
          "emoji": "👆",
          "ex": "Lo schermo touch non risponde più ai miei comandi.",
          "exDe": "Der Touchscreen reagiert nicht mehr auf meine Befehle."
        },
        {
          "it": "salvare i dati",
          "de": "die Daten speichern",
          "emoji": "💾",
          "ex": "Ricordati di salvare i dati prima di spegnere il computer.",
          "exDe": "Denk daran, die Daten zu speichern, bevor du den Computer ausschaltest."
        },
        {
          "it": "il file allegato",
          "de": "die angehängte Datei",
          "emoji": "📎",
          "ex": "Ti ho mandato il file allegato nell'ultima e-mail.",
          "exDe": "Ich habe dir die angehängte Datei in der letzten E-Mail geschickt."
        },
        {
          "it": "la cartella",
          "de": "der Ordner",
          "emoji": "📁",
          "ex": "Ho organizzato le foto in una cartella per ogni anno.",
          "exDe": "Ich habe die Fotos in einem Ordner pro Jahr organisiert."
        },
        {
          "it": "il caricabatterie",
          "de": "das Ladegerät",
          "emoji": "🔌",
          "ex": "Ho dimenticato il caricabatterie a casa di un amico.",
          "exDe": "Ich habe das Ladegerät bei einem Freund vergessen."
        },
        {
          "it": "la cuffia wireless",
          "de": "der kabellose Kopfhörer",
          "emoji": "🎧",
          "ex": "Le cuffie wireless si scaricano dopo poche ore.",
          "exDe": "Die kabellosen Kopfhörer entladen sich nach wenigen Stunden."
        },
        {
          "it": "il backup",
          "de": "die Sicherungskopie",
          "emoji": "🗄️",
          "ex": "Faccio un backup dei documenti ogni settimana.",
          "exDe": "Ich mache jede Woche eine Sicherungskopie der Dokumente."
        },
        {
          "it": "la videochiamata",
          "de": "der Videoanruf",
          "emoji": "📹",
          "ex": "Facciamo una videochiamata per discutere il progetto.",
          "exDe": "Wir machen einen Videoanruf, um das Projekt zu besprechen."
        },
        {
          "it": "il virus informatico",
          "de": "der Computervirus",
          "emoji": "🦠",
          "ex": "Un virus informatico ha bloccato tutto l'ufficio.",
          "exDe": "Ein Computervirus hat das ganze Büro lahmgelegt."
        },
        {
          "it": "il browser",
          "de": "der Browser",
          "emoji": "🧭",
          "ex": "Apri il link in un nuovo browser per evitare problemi.",
          "exDe": "Öffne den Link in einem neuen Browser, um Probleme zu vermeiden."
        },
        {
          "it": "la memoria piena",
          "de": "der volle Speicher",
          "emoji": "📦",
          "ex": "Non posso scattare altre foto: ho la memoria piena.",
          "exDe": "Ich kann keine weiteren Fotos machen: Mein Speicher ist voll."
        },
        {
          "it": "configurare le impostazioni",
          "de": "die Einstellungen konfigurieren",
          "emoji": "⚙️",
          "ex": "Devo configurare le impostazioni della stampante.",
          "exDe": "Ich muss die Einstellungen des Druckers konfigurieren."
        },
        {
          "it": "il telecomando",
          "de": "die Fernbedienung",
          "emoji": "🎚️",
          "ex": "Il telecomando della TV non funziona più bene.",
          "exDe": "Die Fernbedienung des Fernsehers funktioniert nicht mehr richtig."
        }
      ],
      "C1": [
        {
          "it": "l'intelligenza artificiale",
          "de": "die künstliche Intelligenz",
          "emoji": "🤖",
          "ex": "L'intelligenza artificiale sta trasformando interi settori produttivi.",
          "exDe": "Die künstliche Intelligenz verändert ganze Wirtschaftszweige."
        },
        {
          "it": "l'archiviazione su cloud",
          "de": "die Cloud-Speicherung",
          "emoji": "☁️",
          "ex": "L'archiviazione su cloud consente di accedere ai file ovunque.",
          "exDe": "Die Cloud-Speicherung ermöglicht den Zugriff auf die Dateien von überall."
        },
        {
          "it": "la violazione dei dati",
          "de": "die Datenschutzverletzung",
          "emoji": "🛡️",
          "ex": "L'azienda ha ammesso una grave violazione dei dati dei clienti.",
          "exDe": "Das Unternehmen hat eine schwere Verletzung der Kundendaten eingeräumt."
        },
        {
          "it": "l'apprendimento automatico",
          "de": "das maschinelle Lernen",
          "emoji": "🧠",
          "ex": "L'apprendimento automatico richiede enormi quantità di dati.",
          "exDe": "Das maschinelle Lernen erfordert riesige Datenmengen."
        },
        {
          "it": "l'obsolescenza programmata",
          "de": "die geplante Obsoleszenz",
          "emoji": "⏳",
          "ex": "Molti accusano i produttori di praticare l'obsolescenza programmata.",
          "exDe": "Viele werfen den Herstellern vor, geplante Obsoleszenz zu betreiben."
        },
        {
          "it": "la tutela della privacy",
          "de": "der Schutz der Privatsphäre",
          "emoji": "🕵️",
          "ex": "La tutela della privacy è diventata una priorità normativa.",
          "exDe": "Der Schutz der Privatsphäre ist zu einer regulatorischen Priorität geworden."
        },
        {
          "it": "l'interfaccia utente",
          "de": "die Benutzeroberfläche",
          "emoji": "🖥️",
          "ex": "Un'interfaccia utente intuitiva riduce i tempi di formazione.",
          "exDe": "Eine intuitive Benutzeroberfläche verkürzt die Einarbeitungszeit."
        },
        {
          "it": "il divario digitale",
          "de": "die digitale Kluft",
          "emoji": "🌉",
          "ex": "Il divario digitale penalizza ancora le aree rurali.",
          "exDe": "Die digitale Kluft benachteiligt nach wie vor die ländlichen Gebiete."
        },
        {
          "it": "implementare un sistema",
          "de": "ein System einführen",
          "emoji": "🏗️",
          "ex": "Hanno deciso di implementare un sistema di gestione integrato.",
          "exDe": "Sie haben beschlossen, ein integriertes Verwaltungssystem einzuführen."
        },
        {
          "it": "la crittografia",
          "de": "die Verschlüsselung",
          "emoji": "🔏",
          "ex": "La crittografia end-to-end protegge i messaggi da intercettazioni.",
          "exDe": "Die Ende-zu-Ende-Verschlüsselung schützt die Nachrichten vor Abhören."
        },
        {
          "it": "l'impronta digitale",
          "de": "der digitale Fingerabdruck",
          "emoji": "👣",
          "ex": "Ogni nostra azione online lascia un'impronta digitale.",
          "exDe": "Jede unserer Handlungen im Netz hinterlässt einen digitalen Fingerabdruck."
        },
        {
          "it": "la realtà aumentata",
          "de": "die erweiterte Realität",
          "emoji": "🥽",
          "ex": "La realtà aumentata apre nuove possibilità nella formazione.",
          "exDe": "Die erweiterte Realität eröffnet neue Möglichkeiten in der Ausbildung."
        },
        {
          "it": "il flusso di lavoro",
          "de": "der Arbeitsablauf",
          "emoji": "🔁",
          "ex": "L'automazione ha semplificato notevolmente il flusso di lavoro.",
          "exDe": "Die Automatisierung hat den Arbeitsablauf erheblich vereinfacht."
        },
        {
          "it": "scalabile",
          "de": "skalierbar",
          "emoji": "📈",
          "ex": "L'architettura del software deve essere scalabile e affidabile.",
          "exDe": "Die Architektur der Software muss skalierbar und zuverlässig sein."
        },
        {
          "it": "il punto debole del sistema",
          "de": "die Schwachstelle des Systems",
          "emoji": "🩹",
          "ex": "Gli hacker hanno individuato il punto debole del sistema.",
          "exDe": "Die Hacker haben die Schwachstelle des Systems ausfindig gemacht."
        },
        {
          "it": "l'usabilità",
          "de": "die Benutzerfreundlichkeit",
          "emoji": "✋",
          "ex": "I test sull'usabilità hanno rivelato diversi ostacoli per l'utente.",
          "exDe": "Die Tests zur Benutzerfreundlichkeit haben mehrere Hürden für den Nutzer aufgedeckt."
        },
        {
          "it": "la dipendenza dallo smartphone",
          "de": "die Smartphone-Abhängigkeit",
          "emoji": "📵",
          "ex": "La dipendenza dallo smartphone incide sulla capacità di concentrazione.",
          "exDe": "Die Smartphone-Abhängigkeit beeinträchtigt die Konzentrationsfähigkeit."
        },
        {
          "it": "monetizzare i contenuti",
          "de": "Inhalte monetarisieren",
          "emoji": "💰",
          "ex": "I creatori cercano nuovi modi per monetizzare i contenuti.",
          "exDe": "Die Urheber suchen nach neuen Wegen, ihre Inhalte zu monetarisieren."
        },
        {
          "it": "la rete neurale",
          "de": "das neuronale Netz",
          "emoji": "🕸️",
          "ex": "La rete neurale è stata addestrata su milioni di immagini.",
          "exDe": "Das neuronale Netz wurde mit Millionen von Bildern trainiert."
        },
        {
          "it": "l'integrazione del software",
          "de": "die Software-Integration",
          "emoji": "🧩",
          "ex": "L'integrazione del software con i sistemi esistenti è risultata complessa.",
          "exDe": "Die Integration der Software in die bestehenden Systeme erwies sich als komplex."
        }
      ],
      "C2": [
        {
          "it": "l'algoritmo opaco",
          "de": "der intransparente Algorithmus",
          "emoji": "🌫️",
          "ex": "Un algoritmo opaco sottrae all'utente ogni possibilità di controllo.",
          "exDe": "Ein intransparenter Algorithmus entzieht dem Nutzer jegliche Kontrollmöglichkeit."
        },
        {
          "it": "la sovranità digitale",
          "de": "die digitale Souveränität",
          "emoji": "🏛️",
          "ex": "L'Unione Europea rivendica una propria sovranità digitale di fronte ai colossi tecnologici.",
          "exDe": "Die Europäische Union beansprucht gegenüber den Technologiekonzernen eine eigene digitale Souveränität."
        },
        {
          "it": "l'iperconnessione",
          "de": "die Hypervernetzung",
          "emoji": "🔆",
          "ex": "L'iperconnessione erode i confini tra vita privata e professionale.",
          "exDe": "Die Hypervernetzung verwischt die Grenzen zwischen Privat- und Berufsleben."
        },
        {
          "it": "il capitalismo della sorveglianza",
          "de": "der Überwachungskapitalismus",
          "emoji": "👁️",
          "ex": "Il capitalismo della sorveglianza trasforma i comportamenti umani in materia prima.",
          "exDe": "Der Überwachungskapitalismus verwandelt menschliches Verhalten in einen Rohstoff."
        },
        {
          "it": "l'allucinazione dell'IA",
          "de": "die KI-Halluzination",
          "emoji": "🌀",
          "ex": "Le allucinazioni dell'IA generano affermazioni plausibili ma del tutto infondate.",
          "exDe": "Die KI-Halluzinationen erzeugen plausibel klingende, aber völlig unbegründete Aussagen."
        },
        {
          "it": "la deriva tecnocratica",
          "de": "die technokratische Tendenz",
          "emoji": "⚖️",
          "ex": "Alcuni intellettuali mettono in guardia da una deriva tecnocratica delle istituzioni.",
          "exDe": "Manche Intellektuelle warnen vor einer technokratischen Tendenz der Institutionen."
        },
        {
          "it": "l'ineluttabilità del progresso",
          "de": "die Unausweichlichkeit des Fortschritts",
          "emoji": "🚀",
          "ex": "Si dà per scontata l'ineluttabilità del progresso tecnologico, senza interrogarne le ricadute.",
          "exDe": "Man setzt die Unausweichlichkeit des technologischen Fortschritts als gegeben voraus, ohne dessen Folgen zu hinterfragen."
        },
        {
          "it": "il determinismo tecnologico",
          "de": "der technologische Determinismus",
          "emoji": "🧭",
          "ex": "Il determinismo tecnologico riduce la storia umana a una mera conseguenza degli strumenti.",
          "exDe": "Der technologische Determinismus reduziert die Menschheitsgeschichte auf eine bloße Folge der Werkzeuge."
        },
        {
          "it": "la cesellatura del codice",
          "de": "die feinschliffartige Codeoptimierung",
          "emoji": "🪚",
          "ex": "La cesellatura del codice ha ridotto i tempi di esecuzione di un ordine di grandezza.",
          "exDe": "Die feinschliffartige Optimierung des Codes hat die Ausführungszeiten um eine Größenordnung verringert."
        },
        {
          "it": "l'autoreferenzialità degli algoritmi",
          "de": "die Selbstbezüglichkeit der Algorithmen",
          "emoji": "♾️",
          "ex": "L'autoreferenzialità degli algoritmi rischia di rinchiudere l'utente in una bolla cognitiva.",
          "exDe": "Die Selbstbezüglichkeit der Algorithmen droht den Nutzer in einer kognitiven Blase einzuschließen."
        },
        {
          "it": "la dematerializzazione",
          "de": "die Entmaterialisierung",
          "emoji": "💨",
          "ex": "La dematerializzazione dei documenti ha stravolto le prassi amministrative.",
          "exDe": "Die Entmaterialisierung der Dokumente hat die Verwaltungspraktiken grundlegend umgewälzt."
        },
        {
          "it": "l'asservimento all'automazione",
          "de": "die Unterwerfung unter die Automatisierung",
          "emoji": "🔧",
          "ex": "L'asservimento all'automazione svuota di senso interi mestieri artigianali.",
          "exDe": "Die Unterwerfung unter die Automatisierung beraubt ganze Handwerksberufe ihres Sinns."
        },
        {
          "it": "la fallacia del soluzionismo",
          "de": "der Trugschluss des Solutionismus",
          "emoji": "🧯",
          "ex": "La fallacia del soluzionismo pretende di risolvere ogni problema sociale con un'app.",
          "exDe": "Der Trugschluss des Solutionismus erhebt den Anspruch, jedes gesellschaftliche Problem mit einer App zu lösen."
        },
        {
          "it": "l'effimero digitale",
          "de": "das digital Flüchtige",
          "emoji": "🫧",
          "ex": "L'effimero digitale condanna all'oblio contenuti prodotti in quantità sterminate.",
          "exDe": "Das digital Flüchtige verurteilt in unermesslichen Mengen produzierte Inhalte zum Vergessen."
        },
        {
          "it": "la ridondanza dei sistemi",
          "de": "die Systemredundanz",
          "emoji": "🧷",
          "ex": "La ridondanza dei sistemi garantisce la continuità operativa anche in caso di guasto.",
          "exDe": "Die Systemredundanz gewährleistet die Betriebskontinuität selbst im Störungsfall."
        },
        {
          "it": "il primato del dato",
          "de": "der Primat der Daten",
          "emoji": "📊",
          "ex": "Il primato del dato sull'intuizione umana solleva interrogativi epistemologici.",
          "exDe": "Der Primat der Daten über die menschliche Intuition wirft erkenntnistheoretische Fragen auf."
        },
        {
          "it": "l'opacità computazionale",
          "de": "die rechnerische Undurchschaubarkeit",
          "emoji": "🧮",
          "ex": "L'opacità computazionale dei modelli più avanzati sfugge persino ai loro stessi progettisti.",
          "exDe": "Die rechnerische Undurchschaubarkeit der fortschrittlichsten Modelle entzieht sich selbst ihren eigenen Entwicklern."
        },
        {
          "it": "la frammentazione dell'attenzione",
          "de": "die Zersplitterung der Aufmerksamkeit",
          "emoji": "🪞",
          "ex": "La frammentazione dell'attenzione indotta dalle notifiche compromette il pensiero profondo.",
          "exDe": "Die durch Benachrichtigungen ausgelöste Zersplitterung der Aufmerksamkeit beeinträchtigt das tiefe Denken."
        },
        {
          "it": "l'antropizzazione della macchina",
          "de": "die Vermenschlichung der Maschine",
          "emoji": "🎭",
          "ex": "L'antropizzazione della macchina ci induce ad attribuire intenzioni a un mero calcolo statistico.",
          "exDe": "Die Vermenschlichung der Maschine verleitet uns dazu, einer bloßen statistischen Berechnung Absichten zuzuschreiben."
        }
      ]
    }
  },
  {
    "id": "adv-media",
    "title": "Media & Giornalismo",
    "de": "Medien & Journalismus",
    "emoji": "📰",
    "color": "#9b6b3f",
    "area": "Tecnologia & Media",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il telegiornale",
          "de": "die Nachrichtensendung",
          "emoji": "📺",
          "ex": "Guardo il telegiornale tutte le sere alle otto.",
          "exDe": "Ich schaue jeden Abend um acht die Nachrichtensendung."
        },
        {
          "it": "il quotidiano",
          "de": "die Tageszeitung",
          "emoji": "🗞️",
          "ex": "Leggo il quotidiano al bar mentre prendo il caffè.",
          "exDe": "Ich lese die Tageszeitung im Café, während ich meinen Kaffee trinke."
        },
        {
          "it": "l'articolo di giornale",
          "de": "der Zeitungsartikel",
          "emoji": "📄",
          "ex": "Ho letto un articolo di giornale molto interessante sull'argomento.",
          "exDe": "Ich habe einen sehr interessanten Zeitungsartikel zu dem Thema gelesen."
        },
        {
          "it": "il giornalista",
          "de": "der Journalist",
          "emoji": "🧑‍💼",
          "ex": "Il giornalista ha intervistato il sindaco della città.",
          "exDe": "Der Journalist hat den Bürgermeister der Stadt interviewt."
        },
        {
          "it": "la notizia",
          "de": "die Nachricht",
          "emoji": "❗",
          "ex": "La notizia è apparsa su tutti i siti web stamattina.",
          "exDe": "Die Nachricht ist heute Morgen auf allen Webseiten erschienen."
        },
        {
          "it": "il titolo",
          "de": "die Schlagzeile",
          "emoji": "📛",
          "ex": "Il titolo in prima pagina ha attirato la mia attenzione.",
          "exDe": "Die Schlagzeile auf der Titelseite hat meine Aufmerksamkeit erregt."
        },
        {
          "it": "l'intervista",
          "de": "das Interview",
          "emoji": "🎤",
          "ex": "L'intervista è andata in onda ieri sera.",
          "exDe": "Das Interview wurde gestern Abend ausgestrahlt."
        },
        {
          "it": "la rivista",
          "de": "die Zeitschrift",
          "emoji": "📔",
          "ex": "Mi sono abbonato a una rivista di viaggi.",
          "exDe": "Ich habe eine Reisezeitschrift abonniert."
        },
        {
          "it": "il programma televisivo",
          "de": "die Fernsehsendung",
          "emoji": "📡",
          "ex": "Questo programma televisivo va in onda ogni domenica.",
          "exDe": "Diese Fernsehsendung läuft jeden Sonntag."
        },
        {
          "it": "il conduttore",
          "de": "der Moderator",
          "emoji": "🎙️",
          "ex": "Il conduttore ha presentato gli ospiti della serata.",
          "exDe": "Der Moderator hat die Gäste des Abends vorgestellt."
        },
        {
          "it": "la pubblicità",
          "de": "die Werbung",
          "emoji": "📢",
          "ex": "La pubblicità interrompe sempre il film nel momento più bello.",
          "exDe": "Die Werbung unterbricht den Film immer im spannendsten Moment."
        },
        {
          "it": "il social network",
          "de": "das soziale Netzwerk",
          "emoji": "📲",
          "ex": "Molti giovani si informano soprattutto sui social network.",
          "exDe": "Viele Jugendliche informieren sich vor allem über soziale Netzwerke."
        },
        {
          "it": "il telespettatore",
          "de": "der Zuschauer",
          "emoji": "👀",
          "ex": "Il telespettatore può votare durante la trasmissione.",
          "exDe": "Der Zuschauer kann während der Sendung abstimmen."
        },
        {
          "it": "l'inviato",
          "de": "der Korrespondent",
          "emoji": "🌍",
          "ex": "L'inviato ha raccontato la situazione direttamente dal luogo.",
          "exDe": "Der Korrespondent hat über die Lage direkt vom Ort berichtet."
        },
        {
          "it": "il documentario",
          "de": "der Dokumentarfilm",
          "emoji": "🎬",
          "ex": "Abbiamo visto un documentario sulla fauna marina.",
          "exDe": "Wir haben einen Dokumentarfilm über die Meeresfauna gesehen."
        },
        {
          "it": "la diretta",
          "de": "die Live-Übertragung",
          "emoji": "🔴",
          "ex": "La partita viene trasmessa in diretta su due canali.",
          "exDe": "Das Spiel wird live auf zwei Kanälen übertragen."
        },
        {
          "it": "il lettore",
          "de": "der Leser",
          "emoji": "📖",
          "ex": "Il giornale ha perso molti lettori negli ultimi anni.",
          "exDe": "Die Zeitung hat in den letzten Jahren viele Leser verloren."
        },
        {
          "it": "la fonte",
          "de": "die Quelle",
          "emoji": "💧",
          "ex": "Bisogna sempre verificare la fonte di una notizia.",
          "exDe": "Man muss immer die Quelle einer Nachricht überprüfen."
        },
        {
          "it": "il comunicato stampa",
          "de": "die Pressemitteilung",
          "emoji": "📰",
          "ex": "L'azienda ha diffuso un comunicato stampa per chiarire la vicenda.",
          "exDe": "Das Unternehmen hat eine Pressemitteilung herausgegeben, um den Vorfall aufzuklären."
        },
        {
          "it": "il podcast",
          "de": "der Podcast",
          "emoji": "🎧",
          "ex": "Ascolto un podcast di attualità mentre vado al lavoro.",
          "exDe": "Ich höre einen Podcast über aktuelle Themen auf dem Weg zur Arbeit."
        }
      ],
      "C1": [
        {
          "it": "la libertà di stampa",
          "de": "die Pressefreiheit",
          "emoji": "🕊️",
          "ex": "La libertà di stampa è un pilastro di ogni democrazia.",
          "exDe": "Die Pressefreiheit ist eine Säule jeder Demokratie."
        },
        {
          "it": "il giornalismo investigativo",
          "de": "der investigative Journalismus",
          "emoji": "🔎",
          "ex": "Il giornalismo investigativo ha portato alla luce lo scandalo.",
          "exDe": "Der investigative Journalismus hat den Skandal ans Licht gebracht."
        },
        {
          "it": "la deontologia professionale",
          "de": "die berufliche Standesethik",
          "emoji": "📜",
          "ex": "Il cronista ha violato la deontologia professionale pubblicando quei nomi.",
          "exDe": "Der Reporter hat gegen die berufliche Standesethik verstoßen, indem er jene Namen veröffentlichte."
        },
        {
          "it": "la verifica dei fatti",
          "de": "die Faktenprüfung",
          "emoji": "✅",
          "ex": "La redazione ha istituito un servizio dedicato alla verifica dei fatti.",
          "exDe": "Die Redaktion hat eine eigene Abteilung für die Faktenprüfung eingerichtet."
        },
        {
          "it": "la copertura mediatica",
          "de": "die Medienberichterstattung",
          "emoji": "📡",
          "ex": "L'evento ha ricevuto un'ampia copertura mediatica internazionale.",
          "exDe": "Das Ereignis hat eine breite internationale Medienberichterstattung erfahren."
        },
        {
          "it": "la fonte attendibile",
          "de": "die verlässliche Quelle",
          "emoji": "📚",
          "ex": "Senza una fonte attendibile, la notizia resta una semplice voce.",
          "exDe": "Ohne eine verlässliche Quelle bleibt die Nachricht ein bloßes Gerücht."
        },
        {
          "it": "l'editoriale",
          "de": "der Leitartikel",
          "emoji": "✍️",
          "ex": "L'editoriale del direttore ha suscitato un acceso dibattito.",
          "exDe": "Der Leitartikel des Chefredakteurs hat eine hitzige Debatte ausgelöst."
        },
        {
          "it": "la censura",
          "de": "die Zensur",
          "emoji": "✂️",
          "ex": "In quel paese la censura colpisce duramente i media indipendenti.",
          "exDe": "In jenem Land trifft die Zensur die unabhängigen Medien hart."
        },
        {
          "it": "il clamore mediatico",
          "de": "der Medienrummel",
          "emoji": "🎉",
          "ex": "Il processo ha scatenato un enorme clamore mediatico.",
          "exDe": "Der Prozess hat einen enormen Medienrummel ausgelöst."
        },
        {
          "it": "manipolare l'informazione",
          "de": "die Information manipulieren",
          "emoji": "🎭",
          "ex": "Alcuni regimi manipolano l'informazione per consolidare il potere.",
          "exDe": "Manche Regime manipulieren die Information, um ihre Macht zu festigen."
        },
        {
          "it": "il pluralismo dei media",
          "de": "der Medienpluralismus",
          "emoji": "🌈",
          "ex": "Il pluralismo dei media garantisce una varietà di punti di vista.",
          "exDe": "Der Medienpluralismus gewährleistet eine Vielfalt an Standpunkten."
        },
        {
          "it": "il taglio della notizia",
          "de": "die Aufmachung der Nachricht",
          "emoji": "🪡",
          "ex": "Lo stesso fatto cambia significato a seconda del taglio della notizia.",
          "exDe": "Derselbe Sachverhalt ändert seine Bedeutung je nach Aufmachung der Nachricht."
        },
        {
          "it": "la fonte anonima",
          "de": "die anonyme Quelle",
          "emoji": "🥸",
          "ex": "L'articolo si basa su una fonte anonima vicina al governo.",
          "exDe": "Der Artikel stützt sich auf eine anonyme Quelle aus Regierungsnähe."
        },
        {
          "it": "il sensazionalismo",
          "de": "die Sensationsgier",
          "emoji": "💥",
          "ex": "Il sensazionalismo sacrifica l'accuratezza all'audience.",
          "exDe": "Die Sensationsgier opfert die Genauigkeit der Einschaltquote."
        },
        {
          "it": "la rettifica",
          "de": "die Richtigstellung",
          "emoji": "↩️",
          "ex": "Il giornale ha pubblicato una rettifica il giorno seguente.",
          "exDe": "Die Zeitung hat am folgenden Tag eine Richtigstellung veröffentlicht."
        },
        {
          "it": "il diritto di cronaca",
          "de": "das Recht auf Berichterstattung",
          "emoji": "⚖️",
          "ex": "Il diritto di cronaca deve bilanciarsi con il rispetto della riservatezza.",
          "exDe": "Das Recht auf Berichterstattung muss gegen den Schutz der Privatsphäre abgewogen werden."
        },
        {
          "it": "il bacino di utenza",
          "de": "die Zielgruppe",
          "emoji": "🎯",
          "ex": "La testata ha allargato il proprio bacino di utenza tra i giovani.",
          "exDe": "Das Medienorgan hat seine Zielgruppe unter den Jugendlichen erweitert."
        },
        {
          "it": "il monopolio dell'informazione",
          "de": "das Informationsmonopol",
          "emoji": "🏰",
          "ex": "Un monopolio dell'informazione mette a rischio il dibattito democratico.",
          "exDe": "Ein Informationsmonopol gefährdet die demokratische Debatte."
        }
      ],
      "C2": [
        {
          "it": "la post-verità",
          "de": "die postfaktische Wahrheit",
          "emoji": "🌪️",
          "ex": "Nell'era della post-verità l'appello alle emozioni prevale sui fatti accertati.",
          "exDe": "Im Zeitalter der postfaktischen Wahrheit überwiegt der Appell an die Gefühle die belegten Fakten."
        },
        {
          "it": "la spettacolarizzazione della cronaca",
          "de": "die Spektakularisierung der Berichterstattung",
          "emoji": "🎪",
          "ex": "La spettacolarizzazione della cronaca nera trasforma il dolore in intrattenimento.",
          "exDe": "Die Spektakularisierung der Kriminalberichterstattung verwandelt das Leid in Unterhaltung."
        },
        {
          "it": "l'asservimento al potere",
          "de": "die Unterwerfung unter die Macht",
          "emoji": "🔗",
          "ex": "L'asservimento al potere politico svilisce la funzione di vigilanza della stampa.",
          "exDe": "Die Unterwerfung unter die politische Macht entwürdigt die Wächterfunktion der Presse."
        },
        {
          "it": "la macchina del fango",
          "de": "die Schmutzkampagnen-Maschinerie",
          "emoji": "🪣",
          "ex": "Contro il candidato si è scatenata una vera e propria macchina del fango.",
          "exDe": "Gegen den Kandidaten wurde eine regelrechte Schmutzkampagnen-Maschinerie in Gang gesetzt."
        },
        {
          "it": "il quarto potere",
          "de": "die vierte Gewalt",
          "emoji": "🏛️",
          "ex": "Il quarto potere dovrebbe vigilare sull'operato delle istituzioni.",
          "exDe": "Die vierte Gewalt sollte über das Handeln der Institutionen wachen."
        },
        {
          "it": "l'autocensura preventiva",
          "de": "die vorauseilende Selbstzensur",
          "emoji": "🤐",
          "ex": "L'autocensura preventiva è spesso più insidiosa della censura imposta dall'alto.",
          "exDe": "Die vorauseilende Selbstzensur ist oft tückischer als die von oben verordnete Zensur."
        },
        {
          "it": "la deriva populista dei media",
          "de": "die populistische Tendenz der Medien",
          "emoji": "📣",
          "ex": "La deriva populista dei media asseconda gli istinti viscerali del pubblico.",
          "exDe": "Die populistische Tendenz der Medien bedient die viszeralen Instinkte des Publikums."
        },
        {
          "it": "l'omologazione del linguaggio",
          "de": "die Vereinheitlichung der Sprache",
          "emoji": "📐",
          "ex": "L'omologazione del linguaggio giornalistico impoverisce il dibattito pubblico.",
          "exDe": "Die Vereinheitlichung der journalistischen Sprache verarmt die öffentliche Debatte."
        },
        {
          "it": "la spirale del silenzio",
          "de": "die Schweigespirale",
          "emoji": "🌀",
          "ex": "La spirale del silenzio induce a tacere chi teme di trovarsi in minoranza.",
          "exDe": "Die Schweigespirale veranlasst diejenigen zum Schweigen, die fürchten, in der Minderheit zu sein."
        },
        {
          "it": "la captazione del consenso",
          "de": "die Einfangung der Zustimmung",
          "emoji": "🪝",
          "ex": "La captazione del consenso passa oggi per algoritmi che profilano gli umori collettivi.",
          "exDe": "Die Einfangung der Zustimmung verläuft heute über Algorithmen, die kollektive Stimmungen profilieren."
        },
        {
          "it": "il giornalismo embedded",
          "de": "der eingebettete Journalismus",
          "emoji": "🪖",
          "ex": "Il giornalismo embedded sacrifica l'indipendenza sull'altare dell'accesso esclusivo.",
          "exDe": "Der eingebettete Journalismus opfert die Unabhängigkeit auf dem Altar des exklusiven Zugangs."
        },
        {
          "it": "la diffamazione a mezzo stampa",
          "de": "die üble Nachrede durch die Presse",
          "emoji": "⚔️",
          "ex": "Il direttore è stato condannato per diffamazione a mezzo stampa.",
          "exDe": "Der Chefredakteur wurde wegen übler Nachrede durch die Presse verurteilt."
        },
        {
          "it": "l'agenda setting",
          "de": "die Themensetzung",
          "emoji": "🗂️",
          "ex": "Attraverso l'agenda setting i media decidono non cosa pensare, ma a cosa pensare.",
          "exDe": "Durch die Themensetzung entscheiden die Medien nicht, was man denken, sondern woran man denken soll."
        },
        {
          "it": "la mistificazione mediatica",
          "de": "die mediale Verschleierung",
          "emoji": "🎩",
          "ex": "La mistificazione mediatica ammanta di obiettività una narrazione di parte.",
          "exDe": "Die mediale Verschleierung umhüllt eine einseitige Darstellung mit dem Schein der Objektivität."
        },
        {
          "it": "l'effimero della notizia",
          "de": "die Vergänglichkeit der Nachricht",
          "emoji": "🍂",
          "ex": "L'effimero della notizia condanna ogni scandalo a un rapido oblio.",
          "exDe": "Die Vergänglichkeit der Nachricht verurteilt jeden Skandal zu raschem Vergessen."
        },
        {
          "it": "la connivenza editoriale",
          "de": "die redaktionelle Komplizenschaft",
          "emoji": "🤝",
          "ex": "La connivenza editoriale con gli inserzionisti compromette l'imparzialità della testata.",
          "exDe": "Die redaktionelle Komplizenschaft mit den Inserenten beeinträchtigt die Unparteilichkeit des Blattes."
        },
        {
          "it": "il riduzionismo narrativo",
          "de": "der narrative Reduktionismus",
          "emoji": "🔻",
          "ex": "Il riduzionismo narrativo appiattisce fenomeni complessi in slogan rassicuranti.",
          "exDe": "Der narrative Reduktionismus plättet komplexe Phänomene zu beruhigenden Schlagworten."
        },
        {
          "it": "la pervasività del messaggio",
          "de": "die Allgegenwart der Botschaft",
          "emoji": "🌐",
          "ex": "La pervasività del messaggio pubblicitario satura ogni interstizio della vita quotidiana.",
          "exDe": "Die Allgegenwart der Werbebotschaft durchdringt jeden Zwischenraum des Alltags."
        },
        {
          "it": "l'inchiesta dirompente",
          "de": "die brisante Enthüllung",
          "emoji": "🧨",
          "ex": "Un'inchiesta dirompente ha incrinato la reputazione dell'intero apparato.",
          "exDe": "Eine brisante Enthüllung hat den Ruf des gesamten Apparats erschüttert."
        },
        {
          "it": "la retorica dell'emergenza",
          "de": "die Rhetorik des Ausnahmezustands",
          "emoji": "🚨",
          "ex": "La retorica dell'emergenza, reiterata dai notiziari, normalizza misure eccezionali.",
          "exDe": "Die von den Nachrichtensendungen wiederholte Rhetorik des Ausnahmezustands normalisiert außergewöhnliche Maßnahmen."
        }
      ]
    }
  },
  {
    "id": "adv-arte",
    "title": "Arte & Architettura",
    "de": "Kunst & Architektur",
    "emoji": "🎨",
    "color": "#b5602f",
    "area": "Arte & Cultura",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il dipinto",
          "de": "das Gemälde",
          "emoji": "🖼️",
          "ex": "Il dipinto è esposto nella sala principale del museo.",
          "exDe": "Das Gemälde ist im Hauptsaal des Museums ausgestellt."
        },
        {
          "it": "la scultura",
          "de": "die Skulptur",
          "emoji": "🗿",
          "ex": "Questa scultura in marmo risale al Rinascimento.",
          "exDe": "Diese Skulptur aus Marmor stammt aus der Renaissance."
        },
        {
          "it": "la mostra",
          "de": "die Ausstellung",
          "emoji": "🏛️",
          "ex": "La mostra sull'arte moderna chiude domenica prossima.",
          "exDe": "Die Ausstellung über moderne Kunst schließt nächsten Sonntag."
        },
        {
          "it": "l'artista",
          "de": "der Künstler / die Künstlerin",
          "emoji": "👩‍🎨",
          "ex": "L'artista ha dedicato anni a questa opera.",
          "exDe": "Der Künstler hat diesem Werk Jahre gewidmet."
        },
        {
          "it": "il capolavoro",
          "de": "das Meisterwerk",
          "emoji": "🌟",
          "ex": "La Gioconda è considerata un capolavoro assoluto.",
          "exDe": "Die Mona Lisa gilt als absolutes Meisterwerk."
        },
        {
          "it": "la tela",
          "de": "die Leinwand",
          "emoji": "🎨",
          "ex": "Il pittore ha applicato il colore direttamente sulla tela.",
          "exDe": "Der Maler hat die Farbe direkt auf die Leinwand aufgetragen."
        },
        {
          "it": "l'affresco",
          "de": "das Fresko",
          "emoji": "🖌️",
          "ex": "Gli affreschi della cappella sono in fase di restauro.",
          "exDe": "Die Fresken der Kapelle werden gerade restauriert."
        },
        {
          "it": "la cornice",
          "de": "der Bilderrahmen",
          "emoji": "🔲",
          "ex": "Hanno scelto una cornice dorata per il ritratto.",
          "exDe": "Sie haben einen goldenen Rahmen für das Porträt gewählt."
        },
        {
          "it": "il pennello",
          "de": "der Pinsel",
          "emoji": "🖌️",
          "ex": "Pulisce sempre i pennelli alla fine della giornata.",
          "exDe": "Er reinigt am Ende des Tages immer die Pinsel."
        },
        {
          "it": "la galleria d'arte",
          "de": "die Kunstgalerie",
          "emoji": "🏛️",
          "ex": "Ho comprato questa stampa in una galleria d'arte del centro.",
          "exDe": "Ich habe diesen Druck in einer Kunstgalerie im Zentrum gekauft."
        },
        {
          "it": "il ritratto",
          "de": "das Porträt",
          "emoji": "🧑‍🎨",
          "ex": "Il ritratto della duchessa è di una bellezza straordinaria.",
          "exDe": "Das Porträt der Herzogin ist von außergewöhnlicher Schönheit."
        },
        {
          "it": "il paesaggio",
          "de": "die Landschaft (als Bildmotiv)",
          "emoji": "🏞️",
          "ex": "Preferisco i paesaggi alle nature morte.",
          "exDe": "Ich bevorzuge Landschaften gegenüber Stillleben."
        },
        {
          "it": "la cupola",
          "de": "die Kuppel",
          "emoji": "⛪",
          "ex": "La cupola del Brunelleschi domina lo skyline di Firenze.",
          "exDe": "Brunelleschis Kuppel beherrscht die Skyline von Florenz."
        },
        {
          "it": "l'edificio",
          "de": "das Gebäude",
          "emoji": "🏢",
          "ex": "Questo edificio storico ospita ora una biblioteca.",
          "exDe": "Dieses historische Gebäude beherbergt heute eine Bibliothek."
        },
        {
          "it": "il restauro",
          "de": "die Restaurierung",
          "emoji": "🔧",
          "ex": "Il restauro della facciata durerà due anni.",
          "exDe": "Die Restaurierung der Fassade wird zwei Jahre dauern."
        },
        {
          "it": "la facciata",
          "de": "die Fassade",
          "emoji": "🏛️",
          "ex": "La facciata della chiesa è ricoperta di marmi colorati.",
          "exDe": "Die Fassade der Kirche ist mit farbigem Marmor verkleidet."
        },
        {
          "it": "l'architetto",
          "de": "der Architekt / die Architektin",
          "emoji": "📐",
          "ex": "L'architetto ha presentato il progetto del nuovo teatro.",
          "exDe": "Der Architekt hat den Entwurf des neuen Theaters vorgestellt."
        },
        {
          "it": "la mostra temporanea",
          "de": "die Sonderausstellung",
          "emoji": "📅",
          "ex": "La mostra temporanea sui Macchiaioli attira molti visitatori.",
          "exDe": "Die Sonderausstellung über die Macchiaioli zieht viele Besucher an."
        },
        {
          "it": "lo stile",
          "de": "der Stil",
          "emoji": "✨",
          "ex": "Si riconosce subito lo stile inconfondibile di questo pittore.",
          "exDe": "Man erkennt sofort den unverwechselbaren Stil dieses Malers."
        },
        {
          "it": "il museo civico",
          "de": "das Stadtmuseum",
          "emoji": "🏛️",
          "ex": "Il museo civico conserva reperti di epoca romana.",
          "exDe": "Das Stadtmuseum bewahrt Fundstücke aus römischer Zeit auf."
        }
      ],
      "C1": [
        {
          "it": "il chiaroscuro",
          "de": "das Helldunkel",
          "emoji": "🌗",
          "ex": "Caravaggio padroneggiava il chiaroscuro come pochi altri.",
          "exDe": "Caravaggio beherrschte das Helldunkel wie kaum ein anderer."
        },
        {
          "it": "la prospettiva",
          "de": "die Perspektive",
          "emoji": "📐",
          "ex": "L'invenzione della prospettiva rivoluzionò la pittura quattrocentesca.",
          "exDe": "Die Erfindung der Perspektive revolutionierte die Malerei des 15. Jahrhunderts."
        },
        {
          "it": "la pennellata",
          "de": "der Pinselstrich",
          "emoji": "🖌️",
          "ex": "Le pennellate vibranti tradiscono un'esecuzione rapida e istintiva.",
          "exDe": "Die lebhaften Pinselstriche verraten eine schnelle, instinktive Ausführung."
        },
        {
          "it": "la committenza",
          "de": "der Auftraggeber / die Auftragsvergabe",
          "emoji": "📜",
          "ex": "La committenza dei Medici fu decisiva per il Rinascimento fiorentino.",
          "exDe": "Die Auftragsvergabe der Medici war entscheidend für die florentinische Renaissance."
        },
        {
          "it": "l'opera d'arte",
          "de": "das Kunstwerk",
          "emoji": "🖼️",
          "ex": "Ogni opera d'arte va contestualizzata nella sua epoca.",
          "exDe": "Jedes Kunstwerk muss in seine Epoche eingeordnet werden."
        },
        {
          "it": "la corrente artistica",
          "de": "die Kunstströmung",
          "emoji": "🌊",
          "ex": "Il Futurismo fu la corrente artistica più dirompente del primo Novecento.",
          "exDe": "Der Futurismus war die umwälzendste Kunstströmung des frühen 20. Jahrhunderts."
        },
        {
          "it": "l'avanguardia",
          "de": "die Avantgarde",
          "emoji": "🚩",
          "ex": "Le avanguardie storiche rifiutarono i canoni accademici.",
          "exDe": "Die historischen Avantgarden lehnten die akademischen Regeln ab."
        },
        {
          "it": "il bozzetto",
          "de": "die Skizze / der Entwurf",
          "emoji": "✏️",
          "ex": "Il bozzetto preparatorio rivela ripensamenti sulla composizione.",
          "exDe": "Die vorbereitende Skizze offenbart Umentscheidungen bei der Komposition."
        },
        {
          "it": "la pinacoteca",
          "de": "die Gemäldegalerie",
          "emoji": "🏛️",
          "ex": "La pinacoteca custodisce una pregevole raccolta di primitivi.",
          "exDe": "Die Gemäldegalerie hütet eine wertvolle Sammlung früher Meister."
        },
        {
          "it": "la patina del tempo",
          "de": "die Patina der Zeit",
          "emoji": "⏳",
          "ex": "La patina del tempo conferisce al bronzo un fascino particolare.",
          "exDe": "Die Patina der Zeit verleiht der Bronze einen besonderen Reiz."
        },
        {
          "it": "il committente",
          "de": "der Auftraggeber",
          "emoji": "🤝",
          "ex": "Il committente impose precise indicazioni iconografiche al pittore.",
          "exDe": "Der Auftraggeber machte dem Maler genaue ikonografische Vorgaben."
        },
        {
          "it": "la pala d'altare",
          "de": "das Altarbild",
          "emoji": "⛪",
          "ex": "La pala d'altare raffigura l'Annunciazione su fondo oro.",
          "exDe": "Das Altarbild stellt die Verkündigung auf goldenem Grund dar."
        },
        {
          "it": "l'allestimento",
          "de": "die Ausstellungsgestaltung",
          "emoji": "💡",
          "ex": "L'allestimento sobrio valorizza le singole opere senza distrarre.",
          "exDe": "Die schlichte Ausstellungsgestaltung hebt die einzelnen Werke hervor, ohne abzulenken."
        },
        {
          "it": "il mecenate",
          "de": "der Mäzen",
          "emoji": "💰",
          "ex": "Senza un mecenate illuminato, molti capolavori non sarebbero nati.",
          "exDe": "Ohne einen aufgeklärten Mäzen wären viele Meisterwerke nicht entstanden."
        },
        {
          "it": "la volta a crociera",
          "de": "das Kreuzgewölbe",
          "emoji": "⛪",
          "ex": "La navata è coperta da eleganti volte a crociera gotiche.",
          "exDe": "Das Kirchenschiff ist von eleganten gotischen Kreuzgewölben überspannt."
        },
        {
          "it": "il modellato",
          "de": "die plastische Modellierung",
          "emoji": "🗿",
          "ex": "Il modellato dei panneggi rivela una mano sapiente.",
          "exDe": "Die Modellierung der Gewandfalten verrät eine gekonnte Hand."
        },
        {
          "it": "la resa cromatica",
          "de": "die farbliche Wiedergabe",
          "emoji": "🌈",
          "ex": "Il restauro ha restituito alla tela la sua originaria resa cromatica.",
          "exDe": "Die Restaurierung hat der Leinwand ihre ursprüngliche farbliche Wiedergabe zurückgegeben."
        },
        {
          "it": "l'impianto compositivo",
          "de": "der kompositorische Aufbau",
          "emoji": "🧩",
          "ex": "L'impianto compositivo è rigorosamente simmetrico.",
          "exDe": "Der kompositorische Aufbau ist streng symmetrisch."
        },
        {
          "it": "la fruizione dell'opera",
          "de": "die Rezeption des Werks",
          "emoji": "👁️",
          "ex": "L'illuminazione condiziona profondamente la fruizione dell'opera.",
          "exDe": "Die Beleuchtung beeinflusst die Rezeption des Werks tiefgreifend."
        },
        {
          "it": "il linguaggio figurativo",
          "de": "die figurative Bildsprache",
          "emoji": "🗣️",
          "ex": "L'artista elabora un linguaggio figurativo del tutto personale.",
          "exDe": "Der Künstler entwickelt eine völlig eigene figurative Bildsprache."
        }
      ],
      "C2": [
        {
          "it": "l'ekphrasis",
          "de": "die Ekphrasis (literarische Bildbeschreibung)",
          "emoji": "📖",
          "ex": "L'ekphrasis dello scudo di Achille è un celebre antecedente classico.",
          "exDe": "Die Ekphrasis des Schildes des Achilleus ist ein berühmtes klassisches Vorbild."
        },
        {
          "it": "il non finito",
          "de": "das Unvollendete (als Stilmittel)",
          "emoji": "🪨",
          "ex": "Il non finito michelangiolesco esalta la lotta della forma con la materia.",
          "exDe": "Das Unvollendete bei Michelangelo betont das Ringen der Form mit dem Material."
        },
        {
          "it": "lo sfumato",
          "de": "das Sfumato",
          "emoji": "🌫️",
          "ex": "Lo sfumato leonardesco dissolve i contorni in un'atmosfera vaporosa.",
          "exDe": "Das leonardeske Sfumato löst die Konturen in einer dunstigen Atmosphäre auf."
        },
        {
          "it": "l'horror vacui",
          "de": "der Horror Vacui (Angst vor leerem Raum)",
          "emoji": "🌀",
          "ex": "La decorazione barocca cede spesso a un irrefrenabile horror vacui.",
          "exDe": "Die barocke Dekoration verfällt oft einem unbändigen Horror Vacui."
        },
        {
          "it": "il sublime",
          "de": "das Erhabene",
          "emoji": "⛰️",
          "ex": "Il paesaggio romantico aspira a evocare il sentimento del sublime.",
          "exDe": "Die romantische Landschaft strebt danach, das Gefühl des Erhabenen zu evozieren."
        },
        {
          "it": "la pala marciana",
          "de": "das venezianische Altarretabel",
          "emoji": "🏛️",
          "ex": "Lo studioso attribuì la pala marciana a una bottega veneta del Cinquecento.",
          "exDe": "Der Gelehrte schrieb das venezianische Altarretabel einer venezianischen Werkstatt des 16. Jahrhunderts zu."
        },
        {
          "it": "l'anastilosi",
          "de": "die Anastylose (Wiederaufbau aus Originalteilen)",
          "emoji": "🏗️",
          "ex": "L'anastilosi del tempio ha reimpiegato esclusivamente i frammenti originali.",
          "exDe": "Die Anastylose des Tempels hat ausschließlich die Originalfragmente wiederverwendet."
        },
        {
          "it": "il partito decorativo",
          "de": "das dekorative Gliederungssystem",
          "emoji": "🎀",
          "ex": "Il partito decorativo della loggia segue un ritmo serrato di lesene.",
          "exDe": "Das dekorative Gliederungssystem der Loggia folgt einem dichten Rhythmus von Lisenen."
        },
        {
          "it": "la maniera",
          "de": "die Manier (manieristischer Stil)",
          "emoji": "💫",
          "ex": "La maniera tardo-cinquecentesca predilige pose contorte e colori cangianti.",
          "exDe": "Die spätmanieristische Malweise bevorzugt verschlungene Posen und changierende Farben."
        },
        {
          "it": "l'incarnato",
          "de": "die Inkarnatfarbe (Hauttöne)",
          "emoji": "🎨",
          "ex": "L'incarnato perlaceo delle figure tradisce un'attenta velatura.",
          "exDe": "Der perlmuttartige Hautton der Figuren verrät eine sorgfältige Lasur."
        },
        {
          "it": "il disegno preparatorio",
          "de": "die Untermalung / Vorzeichnung",
          "emoji": "📝",
          "ex": "La riflettografia ha rivelato un disegno preparatorio sotto la pellicola pittorica.",
          "exDe": "Die Infrarotreflektografie hat unter der Malschicht eine Vorzeichnung enthüllt."
        },
        {
          "it": "il pentimento",
          "de": "das Pentiment (übermalte Korrektur)",
          "emoji": "🔍",
          "ex": "Un pentimento visibile testimonia un ripensamento dell'autore.",
          "exDe": "Ein sichtbares Pentiment zeugt von einer nachträglichen Korrektur des Künstlers."
        },
        {
          "it": "la quadratura",
          "de": "die illusionistische Architekturmalerei",
          "emoji": "🏛️",
          "ex": "La quadratura del soffitto dilata illusoriamente lo spazio verso il cielo.",
          "exDe": "Die illusionistische Architekturmalerei der Decke weitet den Raum scheinbar zum Himmel hin."
        },
        {
          "it": "l'apparato iconografico",
          "de": "der ikonografische Apparat",
          "emoji": "📚",
          "ex": "L'apparato iconografico del ciclo affrescato allude alle virtù cardinali.",
          "exDe": "Der ikonografische Apparat des Freskenzyklus spielt auf die Kardinaltugenden an."
        },
        {
          "it": "la cifra stilistica",
          "de": "die stilistische Handschrift",
          "emoji": "🖋️",
          "ex": "Quella torsione delle figure è ormai la sua inconfondibile cifra stilistica.",
          "exDe": "Diese Verdrehung der Figuren ist mittlerweile seine unverkennbare stilistische Handschrift."
        },
        {
          "it": "il diafano",
          "de": "das Diaphane (lichtdurchlässige Wirkung)",
          "emoji": "✨",
          "ex": "Il diafano dei velami conferisce all'immagine una qualità quasi eterea.",
          "exDe": "Das Diaphane der Schleier verleiht dem Bild eine fast ätherische Qualität."
        },
        {
          "it": "la dismisura barocca",
          "de": "die barocke Maßlosigkeit",
          "emoji": "🌪️",
          "ex": "La dismisura barocca trasforma la facciata in un trionfo di volute e timpani spezzati.",
          "exDe": "Die barocke Maßlosigkeit verwandelt die Fassade in einen Triumph aus Voluten und gesprengten Giebeln."
        },
        {
          "it": "il restauro filologico",
          "de": "die philologische Restaurierung",
          "emoji": "🔬",
          "ex": "Il restauro filologico rifugge da ogni integrazione arbitraria.",
          "exDe": "Die philologische Restaurierung scheut jede willkürliche Ergänzung."
        },
        {
          "it": "la temperie culturale",
          "de": "das kulturelle Klima einer Epoche",
          "emoji": "🌡️",
          "ex": "L'opera va letta alla luce della temperie culturale post-tridentina.",
          "exDe": "Das Werk ist im Licht des kulturellen Klimas nach dem Konzil von Trient zu lesen."
        },
        {
          "it": "l'autografia",
          "de": "die Eigenhändigkeit (Autorschaft eines Werks)",
          "emoji": "✍️",
          "ex": "Gli studiosi dibattono ancora sull'autografia del dipinto.",
          "exDe": "Die Gelehrten streiten noch über die Eigenhändigkeit des Gemäldes."
        }
      ]
    }
  },
  {
    "id": "adv-cultura",
    "title": "Tradizioni & Cultura",
    "de": "Traditionen & Kultur",
    "emoji": "🎭",
    "color": "#d4922a",
    "area": "Arte & Cultura",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "la tradizione",
          "de": "die Tradition",
          "emoji": "📿",
          "ex": "In questo paese la tradizione del Palio è molto sentita.",
          "exDe": "In diesem Ort wird die Tradition des Palio sehr lebendig gepflegt."
        },
        {
          "it": "la festa popolare",
          "de": "das Volksfest",
          "emoji": "🎉",
          "ex": "Ogni estate il borgo organizza una festa popolare in piazza.",
          "exDe": "Jeden Sommer veranstaltet das Dorf ein Volksfest auf dem Platz."
        },
        {
          "it": "il costume tradizionale",
          "de": "die Tracht",
          "emoji": "👗",
          "ex": "Durante la sfilata indossano il costume tradizionale della regione.",
          "exDe": "Während des Umzugs tragen sie die traditionelle Tracht der Region."
        },
        {
          "it": "la sagra",
          "de": "das (kulinarische) Dorffest",
          "emoji": "🍝",
          "ex": "Alla sagra del tartufo si possono assaggiare molti piatti tipici.",
          "exDe": "Beim Trüffelfest kann man viele typische Gerichte probieren."
        },
        {
          "it": "il dialetto",
          "de": "der Dialekt",
          "emoji": "🗣️",
          "ex": "Mia nonna parla ancora il dialetto del suo paese.",
          "exDe": "Meine Großmutter spricht noch den Dialekt ihres Dorfes."
        },
        {
          "it": "l'usanza",
          "de": "der Brauch",
          "emoji": "🔄",
          "ex": "È un'usanza scambiarsi regali la sera della vigilia.",
          "exDe": "Es ist ein Brauch, sich am Abend vor dem Fest Geschenke zu schenken."
        },
        {
          "it": "la processione",
          "de": "die Prozession",
          "emoji": "🕯️",
          "ex": "La processione attraversa lentamente le vie del centro storico.",
          "exDe": "Die Prozession zieht langsam durch die Straßen der Altstadt."
        },
        {
          "it": "il patrimonio culturale",
          "de": "das Kulturerbe",
          "emoji": "🏛️",
          "ex": "Questo dialetto fa parte del nostro patrimonio culturale.",
          "exDe": "Dieser Dialekt gehört zu unserem Kulturerbe."
        },
        {
          "it": "la fiera",
          "de": "der Jahrmarkt / die Messe",
          "emoji": "🎪",
          "ex": "Alla fiera di paese ci sono bancarelle di ogni tipo.",
          "exDe": "Auf dem Dorfmarkt gibt es Stände aller Art."
        },
        {
          "it": "il folclore",
          "de": "die Folklore",
          "emoji": "💃",
          "ex": "Il gruppo di danza valorizza il folclore della Sardegna.",
          "exDe": "Die Tanzgruppe pflegt die Folklore Sardiniens."
        },
        {
          "it": "la ricorrenza",
          "de": "der Jahrestag / der Festtag",
          "emoji": "📅",
          "ex": "La ricorrenza viene celebrata ogni anno lo stesso giorno.",
          "exDe": "Der Festtag wird jedes Jahr am selben Tag gefeiert."
        },
        {
          "it": "il rito",
          "de": "der Ritus / das Ritual",
          "emoji": "🔥",
          "ex": "L'accensione del falò è un rito che si ripete da secoli.",
          "exDe": "Das Entzünden des Feuers ist ein Ritus, der sich seit Jahrhunderten wiederholt."
        },
        {
          "it": "la leggenda",
          "de": "die Legende / die Sage",
          "emoji": "🐉",
          "ex": "Su quel castello circola una leggenda misteriosa.",
          "exDe": "Um jenes Schloss rankt sich eine geheimnisvolle Sage."
        },
        {
          "it": "il proverbio",
          "de": "das Sprichwort",
          "emoji": "💬",
          "ex": "C'è un proverbio italiano che dice: chi va piano va sano e va lontano.",
          "exDe": "Es gibt ein italienisches Sprichwort: Wer langsam geht, geht gesund und kommt weit."
        },
        {
          "it": "la maschera",
          "de": "die Maske",
          "emoji": "🎭",
          "ex": "A Venezia si vendono maschere di carnevale fatte a mano.",
          "exDe": "In Venedig werden handgemachte Karnevalsmasken verkauft."
        },
        {
          "it": "il pellegrinaggio",
          "de": "die Wallfahrt / die Pilgerreise",
          "emoji": "⛪",
          "ex": "Ogni anno migliaia di fedeli compiono il pellegrinaggio al santuario.",
          "exDe": "Jedes Jahr unternehmen Tausende von Gläubigen die Wallfahrt zum Heiligtum."
        },
        {
          "it": "la cerimonia",
          "de": "die Zeremonie",
          "emoji": "🎀",
          "ex": "La cerimonia di apertura è stata seguita da un concerto.",
          "exDe": "Auf die Eröffnungszeremonie folgte ein Konzert."
        },
        {
          "it": "il dolce tipico",
          "de": "die typische Süßspeise",
          "emoji": "🍰",
          "ex": "Il panforte è un dolce tipico della tradizione senese.",
          "exDe": "Der Panforte ist eine typische Süßspeise der Sieneser Tradition."
        },
        {
          "it": "il santo patrono",
          "de": "der Schutzheilige",
          "emoji": "😇",
          "ex": "La città festeggia il santo patrono con fuochi d'artificio.",
          "exDe": "Die Stadt feiert ihren Schutzheiligen mit einem Feuerwerk."
        }
      ],
      "C1": [
        {
          "it": "il retaggio",
          "de": "das (überliefertes) Erbe",
          "emoji": "🧬",
          "ex": "Quelle usanze sono un retaggio del mondo contadino.",
          "exDe": "Jene Bräuche sind ein Erbe der bäuerlichen Welt."
        },
        {
          "it": "la trasmissione orale",
          "de": "die mündliche Überlieferung",
          "emoji": "👂",
          "ex": "Le fiabe popolari si sono conservate grazie alla trasmissione orale.",
          "exDe": "Die Volksmärchen haben sich dank der mündlichen Überlieferung erhalten."
        },
        {
          "it": "il sincretismo",
          "de": "der Synkretismus (Verschmelzung von Glaubensformen)",
          "emoji": "🔀",
          "ex": "Molte feste popolari nascono da un sincretismo tra pagano e cristiano.",
          "exDe": "Viele Volksfeste entstehen aus einem Synkretismus von Heidnischem und Christlichem."
        },
        {
          "it": "il radicamento",
          "de": "die Verwurzelung",
          "emoji": "🌳",
          "ex": "Il radicamento di questa festa nel territorio è profondissimo.",
          "exDe": "Die Verwurzelung dieses Festes in der Region ist sehr tief."
        },
        {
          "it": "la trasfigurazione",
          "de": "die Verklärung / Umdeutung",
          "emoji": "✨",
          "ex": "Il rito ha subìto nei secoli una progressiva trasfigurazione simbolica.",
          "exDe": "Der Ritus hat im Laufe der Jahrhunderte eine fortschreitende symbolische Umdeutung erfahren."
        },
        {
          "it": "l'immaginario collettivo",
          "de": "das kollektive Vorstellungswelt",
          "emoji": "🧠",
          "ex": "La figura del brigante popola ancora l'immaginario collettivo meridionale.",
          "exDe": "Die Gestalt des Räubers bevölkert noch immer die kollektive Vorstellungswelt des Südens."
        },
        {
          "it": "la cultura popolare",
          "de": "die Volkskultur",
          "emoji": "🪕",
          "ex": "La cultura popolare custodisce saperi che i libri ignorano.",
          "exDe": "Die Volkskultur bewahrt Wissen, das die Bücher nicht kennen."
        },
        {
          "it": "il senso di appartenenza",
          "de": "das Zugehörigkeitsgefühl",
          "emoji": "🤝",
          "ex": "La festa rafforza il senso di appartenenza alla comunità.",
          "exDe": "Das Fest stärkt das Zugehörigkeitsgefühl zur Gemeinschaft."
        },
        {
          "it": "la rievocazione storica",
          "de": "die historische Nachstellung",
          "emoji": "⚔️",
          "ex": "La rievocazione storica riporta in vita la battaglia medievale.",
          "exDe": "Die historische Nachstellung lässt die mittelalterliche Schlacht wieder aufleben."
        },
        {
          "it": "l'identità culturale",
          "de": "die kulturelle Identität",
          "emoji": "🪪",
          "ex": "La lingua è il pilastro dell'identità culturale di un popolo.",
          "exDe": "Die Sprache ist die Säule der kulturellen Identität eines Volkes."
        },
        {
          "it": "la salvaguardia",
          "de": "der Schutz / die Bewahrung",
          "emoji": "🛡️",
          "ex": "L'UNESCO promuove la salvaguardia del patrimonio immateriale.",
          "exDe": "Die UNESCO fördert den Schutz des immateriellen Erbes."
        },
        {
          "it": "la contaminazione culturale",
          "de": "die kulturelle Vermischung",
          "emoji": "🌍",
          "ex": "La cucina siciliana nasce da secoli di contaminazione culturale.",
          "exDe": "Die sizilianische Küche entstand aus Jahrhunderten kultureller Vermischung."
        },
        {
          "it": "la devozione popolare",
          "de": "die Volksfrömmigkeit",
          "emoji": "🙏",
          "ex": "La devozione popolare si esprime in voti e ex voto.",
          "exDe": "Die Volksfrömmigkeit drückt sich in Gelübden und Votivgaben aus."
        },
        {
          "it": "il tramandare",
          "de": "das Weitergeben (von Wissen/Bräuchen)",
          "emoji": "📜",
          "ex": "Il tramandare i mestieri artigiani è oggi più difficile che mai.",
          "exDe": "Das Weitergeben der Handwerksberufe ist heute schwieriger denn je."
        },
        {
          "it": "lo spaesamento",
          "de": "die Entwurzelung / Orientierungslosigkeit",
          "emoji": "🧭",
          "ex": "L'emigrazione provocò in molti un profondo spaesamento.",
          "exDe": "Die Auswanderung verursachte bei vielen eine tiefe Entwurzelung."
        },
        {
          "it": "il sostrato",
          "de": "das (kulturelle) Substrat",
          "emoji": "🪨",
          "ex": "Nel dialetto sopravvive un sostrato linguistico preromano.",
          "exDe": "Im Dialekt überlebt ein vorrömisches sprachliches Substrat."
        },
        {
          "it": "la ritualità",
          "de": "die Ritualhaftigkeit",
          "emoji": "🔔",
          "ex": "La ritualità del pasto domenicale scandisce la vita familiare.",
          "exDe": "Die Ritualhaftigkeit des Sonntagsessens strukturiert das Familienleben."
        },
        {
          "it": "la matrice contadina",
          "de": "der bäuerliche Ursprung",
          "emoji": "🌾",
          "ex": "Molti detti popolari hanno una chiara matrice contadina.",
          "exDe": "Viele volkstümliche Redensarten haben einen klaren bäuerlichen Ursprung."
        },
        {
          "it": "la convivialità",
          "de": "die Geselligkeit (am Tisch)",
          "emoji": "🍷",
          "ex": "Il pranzo della domenica è un rito di convivialità irrinunciabile.",
          "exDe": "Das Sonntagsessen ist ein unverzichtbares Ritual der Geselligkeit."
        },
        {
          "it": "l'eredità immateriale",
          "de": "das immaterielle Erbe",
          "emoji": "🎼",
          "ex": "I canti di lavoro sono parte dell'eredità immateriale del territorio.",
          "exDe": "Die Arbeitslieder sind Teil des immateriellen Erbes der Region."
        }
      ],
      "C2": [
        {
          "it": "l'autoctonia",
          "de": "die Bodenständigkeit / autochthone Herkunft",
          "emoji": "🏔️",
          "ex": "L'antropologo ne sottolineò la presunta autoctonia, smentita poi dalle fonti.",
          "exDe": "Der Anthropologe betonte die vermeintliche autochthone Herkunft, die später von den Quellen widerlegt wurde."
        },
        {
          "it": "la transustanziazione del rito",
          "de": "die Wesensverwandlung des Ritus",
          "emoji": "🕯️",
          "ex": "Lo studioso parla, non senza ironia, di una transustanziazione del rito in spettacolo turistico.",
          "exDe": "Der Gelehrte spricht, nicht ohne Ironie, von einer Wesensverwandlung des Ritus in ein touristisches Schauspiel."
        },
        {
          "it": "l'invenzione della tradizione",
          "de": "die Erfindung der Tradition",
          "emoji": "🪡",
          "ex": "Molti costumi creduti antichissimi sono in realtà un caso di invenzione della tradizione ottocentesca.",
          "exDe": "Viele für uralt gehaltene Bräuche sind in Wirklichkeit ein Fall von Traditionserfindung des 19. Jahrhunderts."
        },
        {
          "it": "la mummificazione folclorica",
          "de": "die folkloristische Erstarrung",
          "emoji": "🧊",
          "ex": "Il rischio del turismo di massa è la mummificazione folclorica delle usanze locali.",
          "exDe": "Die Gefahr des Massentourismus ist die folkloristische Erstarrung der lokalen Bräuche."
        },
        {
          "it": "il palinsesto culturale",
          "de": "das kulturelle Palimpsest",
          "emoji": "📜",
          "ex": "La città è un palinsesto culturale in cui ogni epoca ha lasciato la propria scrittura.",
          "exDe": "Die Stadt ist ein kulturelles Palimpsest, in dem jede Epoche ihre eigene Schrift hinterlassen hat."
        },
        {
          "it": "l'ibridazione",
          "de": "die Hybridisierung",
          "emoji": "🧬",
          "ex": "L'ibridazione tra culti agrari e liturgia cristiana è documentabile nelle fonti tardoantiche.",
          "exDe": "Die Hybridisierung zwischen Agrarkulten und christlicher Liturgie ist in den spätantiken Quellen belegbar."
        },
        {
          "it": "la liminalità",
          "de": "die Liminalität (Schwellenzustand im Ritual)",
          "emoji": "🚪",
          "ex": "Il carnevale incarna una fase di liminalità in cui le gerarchie sociali si rovesciano.",
          "exDe": "Der Karneval verkörpert eine Phase der Liminalität, in der sich die sozialen Hierarchien umkehren."
        },
        {
          "it": "l'esegesi del mito",
          "de": "die Exegese des Mythos",
          "emoji": "🔮",
          "ex": "L'esegesi del mito fondativo rivela tensioni rimosse della comunità.",
          "exDe": "Die Exegese des Gründungsmythos offenbart verdrängte Spannungen der Gemeinschaft."
        },
        {
          "it": "la deriva mercificante",
          "de": "die kommerzialisierende Tendenz",
          "emoji": "💸",
          "ex": "La deriva mercificante svuota la festa del suo originario portato sacrale.",
          "exDe": "Die kommerzialisierende Tendenz entleert das Fest seines ursprünglichen sakralen Gehalts."
        },
        {
          "it": "il portato simbolico",
          "de": "der symbolische Gehalt",
          "emoji": "🜂",
          "ex": "Pochi avvertono ancora il portato simbolico di quel gesto antico.",
          "exDe": "Nur wenige nehmen noch den symbolischen Gehalt jener uralten Geste wahr."
        },
        {
          "it": "la stratificazione diacronica",
          "de": "die diachrone Schichtung",
          "emoji": "🪜",
          "ex": "La stratificazione diacronica delle usanze rende ardua ogni datazione univoca.",
          "exDe": "Die diachrone Schichtung der Bräuche macht jede eindeutige Datierung schwierig."
        },
        {
          "it": "l'aura del sacro",
          "de": "die Aura des Sakralen",
          "emoji": "🌟",
          "ex": "La secolarizzazione ha dissipato l'aura del sacro che avvolgeva la ricorrenza.",
          "exDe": "Die Säkularisierung hat die Aura des Sakralen aufgelöst, die den Festtag umgab."
        },
        {
          "it": "la koinè culturale",
          "de": "die kulturelle Koiné (gemeinsamer Kulturraum)",
          "emoji": "🌐",
          "ex": "Il Mediterraneo antico costituì una vera koinè culturale.",
          "exDe": "Das antike Mittelmeer bildete eine wahre kulturelle Koiné."
        },
        {
          "it": "il recupero filologico",
          "de": "die philologische Wiederherstellung (eines Brauchs)",
          "emoji": "🔎",
          "ex": "Il recupero filologico del canto evita ogni concessione al gusto contemporaneo.",
          "exDe": "Die philologische Wiederherstellung des Gesangs vermeidet jedes Zugeständnis an den heutigen Geschmack."
        },
        {
          "it": "la nostalgia identitaria",
          "de": "die identitäre Nostalgie",
          "emoji": "🕰️",
          "ex": "Dietro la riscoperta del dialetto si cela talora una nostalgia identitaria.",
          "exDe": "Hinter der Wiederentdeckung des Dialekts verbirgt sich bisweilen eine identitäre Nostalgie."
        },
        {
          "it": "la performatività del rito",
          "de": "die Performativität des Ritus",
          "emoji": "🎬",
          "ex": "La performatività del rito non si esaurisce nel suo significato letterale.",
          "exDe": "Die Performativität des Ritus erschöpft sich nicht in seiner wörtlichen Bedeutung."
        },
        {
          "it": "il genius loci",
          "de": "der Genius Loci (Geist des Ortes)",
          "emoji": "🗺️",
          "ex": "Ogni borgo custodisce un genius loci che resiste all'omologazione.",
          "exDe": "Jedes Dorf hütet einen Genius Loci, der sich der Vereinheitlichung widersetzt."
        },
        {
          "it": "la reificazione del folclore",
          "de": "die Verdinglichung der Folklore",
          "emoji": "📦",
          "ex": "La reificazione del folclore lo riduce a souvenir privo di senso.",
          "exDe": "Die Verdinglichung der Folklore reduziert sie zu einem sinnentleerten Souvenir."
        },
        {
          "it": "l'epos identitario",
          "de": "das identitätsstiftende Epos",
          "emoji": "📯",
          "ex": "La rievocazione alimenta un epos identitario condiviso dall'intera valle.",
          "exDe": "Die Nachstellung nährt ein identitätsstiftendes Epos, das das gesamte Tal teilt."
        },
        {
          "it": "la sedimentazione del costume",
          "de": "die Ablagerung des Brauchtums",
          "emoji": "🏺",
          "ex": "La lenta sedimentazione del costume sfugge a ogni decreto o riforma.",
          "exDe": "Die langsame Ablagerung des Brauchtums entzieht sich jedem Dekret oder jeder Reform."
        }
      ]
    }
  },
  {
    "id": "adv-letteratura",
    "title": "Letteratura & Scrittura",
    "de": "Literatur & Schreiben",
    "emoji": "📖",
    "color": "#7a5ca0",
    "area": "Lingua avanzata",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "la trama",
          "de": "die Handlung",
          "emoji": "🧵",
          "ex": "La trama del romanzo è avvincente fin dalle prime pagine.",
          "exDe": "Die Handlung des Romans ist von den ersten Seiten an fesselnd."
        },
        {
          "it": "il personaggio",
          "de": "die Figur",
          "emoji": "🎭",
          "ex": "Il personaggio principale cambia molto nel corso della storia.",
          "exDe": "Die Hauptfigur verändert sich im Laufe der Geschichte stark."
        },
        {
          "it": "il capitolo",
          "de": "das Kapitel",
          "emoji": "📑",
          "ex": "Ho letto solo il primo capitolo, ma mi ha già conquistato.",
          "exDe": "Ich habe nur das erste Kapitel gelesen, aber es hat mich schon überzeugt."
        },
        {
          "it": "l'autore",
          "de": "der Autor",
          "emoji": "✍️",
          "ex": "L'autore ha vinto un premio importante con questo libro.",
          "exDe": "Der Autor hat mit diesem Buch einen wichtigen Preis gewonnen."
        },
        {
          "it": "il romanzo",
          "de": "der Roman",
          "emoji": "📕",
          "ex": "Questo romanzo racconta la vita di una famiglia siciliana.",
          "exDe": "Dieser Roman erzählt das Leben einer sizilianischen Familie."
        },
        {
          "it": "la poesia",
          "de": "das Gedicht",
          "emoji": "🪶",
          "ex": "Ha imparato a memoria una poesia di Leopardi.",
          "exDe": "Er hat ein Gedicht von Leopardi auswendig gelernt."
        },
        {
          "it": "il racconto",
          "de": "die Erzählung",
          "emoji": "📜",
          "ex": "Ho scritto un breve racconto per il concorso letterario.",
          "exDe": "Ich habe eine kurze Erzählung für den Literaturwettbewerb geschrieben."
        },
        {
          "it": "il narratore",
          "de": "der Erzähler",
          "emoji": "🗣️",
          "ex": "Il narratore osserva gli eventi senza giudicare.",
          "exDe": "Der Erzähler beobachtet die Ereignisse, ohne zu urteilen."
        },
        {
          "it": "la casa editrice",
          "de": "der Verlag",
          "emoji": "🏢",
          "ex": "La casa editrice pubblicherà il suo libro in autunno.",
          "exDe": "Der Verlag wird sein Buch im Herbst veröffentlichen."
        },
        {
          "it": "la recensione",
          "de": "die Rezension",
          "emoji": "⭐",
          "ex": "Ha scritto una recensione entusiasta del nuovo romanzo.",
          "exDe": "Sie hat eine begeisterte Rezension des neuen Romans geschrieben."
        },
        {
          "it": "il genere letterario",
          "de": "die literarische Gattung",
          "emoji": "📚",
          "ex": "Il giallo è il suo genere letterario preferito.",
          "exDe": "Der Krimi ist seine bevorzugte literarische Gattung."
        },
        {
          "it": "la bozza",
          "de": "der Entwurf",
          "emoji": "📝",
          "ex": "Ho finito la prima bozza del mio articolo ieri sera.",
          "exDe": "Ich habe gestern Abend den ersten Entwurf meines Artikels fertiggestellt."
        },
        {
          "it": "il riassunto",
          "de": "die Zusammenfassung",
          "emoji": "📄",
          "ex": "Scrivi un riassunto del testo in dieci righe.",
          "exDe": "Schreibe eine Zusammenfassung des Textes in zehn Zeilen."
        },
        {
          "it": "la citazione",
          "de": "das Zitat",
          "emoji": "❝",
          "ex": "Ha aperto il discorso con una citazione di Dante.",
          "exDe": "Er eröffnete die Rede mit einem Zitat von Dante."
        },
        {
          "it": "la biblioteca",
          "de": "die Bibliothek",
          "emoji": "🏛️",
          "ex": "Passo i pomeriggi in biblioteca a studiare.",
          "exDe": "Ich verbringe die Nachmittage in der Bibliothek mit Lernen."
        },
        {
          "it": "il manoscritto",
          "de": "das Manuskript",
          "emoji": "🖋️",
          "ex": "Ha inviato il manoscritto a tre editori diversi.",
          "exDe": "Sie hat das Manuskript an drei verschiedene Verleger geschickt."
        },
        {
          "it": "la lettura",
          "de": "das Lesen",
          "emoji": "👓",
          "ex": "La lettura è la mia passione fin da bambino.",
          "exDe": "Das Lesen ist seit meiner Kindheit meine Leidenschaft."
        },
        {
          "it": "il protagonista",
          "de": "der Protagonist",
          "emoji": "🌟",
          "ex": "Il protagonista deve affrontare molte difficoltà.",
          "exDe": "Der Protagonist muss viele Schwierigkeiten überwinden."
        }
      ],
      "C1": [
        {
          "it": "la metafora",
          "de": "die Metapher",
          "emoji": "🌉",
          "ex": "L'autore usa la metafora del viaggio per descrivere la vita.",
          "exDe": "Der Autor verwendet die Metapher der Reise, um das Leben zu beschreiben."
        },
        {
          "it": "la prosa",
          "de": "die Prosa",
          "emoji": "📖",
          "ex": "La sua prosa è densa di immagini e di sottintesi.",
          "exDe": "Seine Prosa ist reich an Bildern und Andeutungen."
        },
        {
          "it": "il verso",
          "de": "der Vers",
          "emoji": "🎵",
          "ex": "Ogni verso della poesia segue un ritmo preciso.",
          "exDe": "Jeder Vers des Gedichts folgt einem genauen Rhythmus."
        },
        {
          "it": "l'ambientazione",
          "de": "der Schauplatz",
          "emoji": "🏞️",
          "ex": "L'ambientazione del romanzo è la Napoli del dopoguerra.",
          "exDe": "Der Schauplatz des Romans ist das Neapel der Nachkriegszeit."
        },
        {
          "it": "il colpo di scena",
          "de": "die überraschende Wendung",
          "emoji": "💥",
          "ex": "Il finale riserva un colpo di scena inaspettato.",
          "exDe": "Das Ende hält eine unerwartete überraschende Wendung bereit."
        },
        {
          "it": "la voce narrante",
          "de": "die erzählende Stimme",
          "emoji": "🔊",
          "ex": "La voce narrante si rivolge direttamente al lettore.",
          "exDe": "Die erzählende Stimme wendet sich direkt an den Leser."
        },
        {
          "it": "l'incipit",
          "de": "der Romananfang",
          "emoji": "🚪",
          "ex": "L'incipit di questo libro è tra i più celebri della letteratura.",
          "exDe": "Der Anfang dieses Buches gehört zu den berühmtesten der Literatur."
        },
        {
          "it": "la trama secondaria",
          "de": "der Nebenhandlungsstrang",
          "emoji": "🪡",
          "ex": "La trama secondaria arricchisce la storia principale.",
          "exDe": "Der Nebenhandlungsstrang bereichert die Haupthandlung."
        },
        {
          "it": "il flusso di coscienza",
          "de": "der Bewusstseinsstrom",
          "emoji": "🌊",
          "ex": "Joyce è famoso per l'uso del flusso di coscienza.",
          "exDe": "Joyce ist für die Verwendung des Bewusstseinsstroms berühmt."
        },
        {
          "it": "delineare un personaggio",
          "de": "eine Figur zeichnen",
          "emoji": "✏️",
          "ex": "L'autrice riesce a delineare un personaggio con poche frasi.",
          "exDe": "Die Autorin schafft es, eine Figur mit wenigen Sätzen zu zeichnen."
        },
        {
          "it": "la chiave di lettura",
          "de": "der Deutungsschlüssel",
          "emoji": "🔑",
          "ex": "La prefazione offre una chiave di lettura del testo.",
          "exDe": "Das Vorwort bietet einen Deutungsschlüssel für den Text."
        },
        {
          "it": "l'allegoria",
          "de": "die Allegorie",
          "emoji": "🦅",
          "ex": "Il racconto è un'allegoria della condizione umana.",
          "exDe": "Die Erzählung ist eine Allegorie der menschlichen Existenz."
        },
        {
          "it": "il registro stilistico",
          "de": "die Stilebene",
          "emoji": "🎚️",
          "ex": "L'autore alterna un registro stilistico colto e popolare.",
          "exDe": "Der Autor wechselt zwischen einer gehobenen und einer volkstümlichen Stilebene."
        },
        {
          "it": "la prefazione",
          "de": "das Vorwort",
          "emoji": "📃",
          "ex": "Nella prefazione il curatore spiega le sue scelte.",
          "exDe": "Im Vorwort erläutert der Herausgeber seine Entscheidungen."
        },
        {
          "it": "l'opera prima",
          "de": "das Erstlingswerk",
          "emoji": "🥇",
          "ex": "Con la sua opera prima ha conquistato la critica.",
          "exDe": "Mit seinem Erstlingswerk hat er die Kritik für sich gewonnen."
        },
        {
          "it": "il filo conduttore",
          "de": "der rote Faden",
          "emoji": "🧶",
          "ex": "La memoria è il filo conduttore di tutto il libro.",
          "exDe": "Die Erinnerung ist der rote Faden des gesamten Buches."
        },
        {
          "it": "rendere giustizia al testo",
          "de": "dem Text gerecht werden",
          "emoji": "⚖️",
          "ex": "La traduzione non sempre riesce a rendere giustizia al testo originale.",
          "exDe": "Die Übersetzung schafft es nicht immer, dem Originaltext gerecht zu werden."
        },
        {
          "it": "l'ironia",
          "de": "die Ironie",
          "emoji": "😏",
          "ex": "L'ironia pervade ogni pagina del suo saggio.",
          "exDe": "Die Ironie durchzieht jede Seite seines Essays."
        },
        {
          "it": "la caratterizzazione",
          "de": "die Charakterisierung",
          "emoji": "🖼️",
          "ex": "La caratterizzazione dei personaggi è straordinariamente realistica.",
          "exDe": "Die Charakterisierung der Figuren ist außerordentlich realistisch."
        },
        {
          "it": "evocare un'atmosfera",
          "de": "eine Atmosphäre heraufbeschwören",
          "emoji": "🌫️",
          "ex": "Con poche parole riesce a evocare un'atmosfera cupa.",
          "exDe": "Mit wenigen Worten gelingt es ihm, eine düstere Atmosphäre heraufzubeschwören."
        }
      ],
      "C2": [
        {
          "it": "l'ipotassi",
          "de": "die Hypotaxe",
          "emoji": "🪢",
          "ex": "Lo stile barocco predilige l'ipotassi e i periodi articolati.",
          "exDe": "Der barocke Stil bevorzugt die Hypotaxe und kunstvoll gegliederte Satzgefüge."
        },
        {
          "it": "la paratassi",
          "de": "die Parataxe",
          "emoji": "➖",
          "ex": "La prosa moderna tende alla paratassi, fatta di frasi brevi.",
          "exDe": "Die moderne Prosa neigt zur Parataxe, die aus kurzen Sätzen besteht."
        },
        {
          "it": "l'endecasillabo",
          "de": "der Elfsilbler",
          "emoji": "🎼",
          "ex": "La Divina Commedia è scritta interamente in endecasillabi.",
          "exDe": "Die Göttliche Komödie ist vollständig in Elfsilblern geschrieben."
        },
        {
          "it": "la sinestesia",
          "de": "die Synästhesie",
          "emoji": "🌈",
          "ex": "La sinestesia 'silenzio verde' fonde suono e colore.",
          "exDe": "Die Synästhesie 'grünes Schweigen' verschmilzt Klang und Farbe."
        },
        {
          "it": "l'enjambement",
          "de": "das Enjambement",
          "emoji": "↩️",
          "ex": "L'enjambement spezza il verso e crea una tensione ritmica.",
          "exDe": "Das Enjambement bricht den Vers und erzeugt eine rhythmische Spannung."
        },
        {
          "it": "la litote",
          "de": "die Litotes",
          "emoji": "🔄",
          "ex": "Con una litote dice 'non pochi' per intendere 'molti'.",
          "exDe": "Mit einer Litotes sagt er 'nicht wenige', um 'viele' zu meinen."
        },
        {
          "it": "l'ossimoro",
          "de": "das Oxymoron",
          "emoji": "❄️",
          "ex": "'Ghiaccio bollente' è un classico esempio di ossimoro.",
          "exDe": "'Kochendes Eis' ist ein klassisches Beispiel für ein Oxymoron."
        },
        {
          "it": "l'anastrofe",
          "de": "die Anastrophe",
          "emoji": "🔃",
          "ex": "L'anastrofe inverte l'ordine consueto delle parole per dare enfasi.",
          "exDe": "Die Anastrophe kehrt die übliche Wortstellung um, um Nachdruck zu verleihen."
        },
        {
          "it": "il pastiche",
          "de": "der Pastiche",
          "emoji": "🧩",
          "ex": "Il romanzo è un raffinato pastiche di stili e dialetti diversi.",
          "exDe": "Der Roman ist ein raffinierter Pastiche aus verschiedenen Stilen und Dialekten."
        },
        {
          "it": "l'epifania letteraria",
          "de": "die literarische Epiphanie",
          "emoji": "💡",
          "ex": "Il protagonista vive un'epifania letteraria che ne muta il destino.",
          "exDe": "Der Protagonist erlebt eine literarische Epiphanie, die sein Schicksal verändert."
        },
        {
          "it": "l'intertestualità",
          "de": "die Intertextualität",
          "emoji": "🔗",
          "ex": "L'intertestualità del testo rimanda a opere classiche e moderne.",
          "exDe": "Die Intertextualität des Textes verweist auf klassische und moderne Werke."
        },
        {
          "it": "la prolessi",
          "de": "die Prolepse",
          "emoji": "⏩",
          "ex": "La prolessi anticipa al lettore un evento futuro della narrazione.",
          "exDe": "Die Prolepse nimmt für den Leser ein zukünftiges Ereignis der Erzählung vorweg."
        },
        {
          "it": "l'analessi",
          "de": "die Analepse",
          "emoji": "⏪",
          "ex": "L'analessi riporta il racconto a un episodio dell'infanzia.",
          "exDe": "Die Analepse führt die Erzählung zu einer Episode aus der Kindheit zurück."
        },
        {
          "it": "lo straniamento",
          "de": "die Verfremdung",
          "emoji": "🪞",
          "ex": "Lo straniamento costringe il lettore a guardare la realtà con occhi nuovi.",
          "exDe": "Die Verfremdung zwingt den Leser, die Wirklichkeit mit neuen Augen zu sehen."
        },
        {
          "it": "la mise en abyme",
          "de": "die Verschachtelung (Mise en abyme)",
          "emoji": "🪆",
          "ex": "Il racconto nel racconto è un perfetto esempio di mise en abyme.",
          "exDe": "Die Erzählung in der Erzählung ist ein perfektes Beispiel für eine Mise en abyme."
        },
        {
          "it": "il verso sciolto",
          "de": "der reimlose Vers",
          "emoji": "🍃",
          "ex": "Foscolo compose i suoi carmi in versi sciolti.",
          "exDe": "Foscolo verfasste seine Gedichte in reimlosen Versen."
        },
        {
          "it": "l'esegesi",
          "de": "die Exegese",
          "emoji": "🔍",
          "ex": "L'esegesi del testo richiede una profonda conoscenza del contesto storico.",
          "exDe": "Die Exegese des Textes erfordert eine tiefe Kenntnis des historischen Kontexts."
        },
        {
          "it": "il topos letterario",
          "de": "der literarische Topos",
          "emoji": "🏛️",
          "ex": "Il giardino come luogo dell'anima è un topos letterario ricorrente.",
          "exDe": "Der Garten als Ort der Seele ist ein wiederkehrender literarischer Topos."
        },
        {
          "it": "la prosa d'arte",
          "de": "die Kunstprosa",
          "emoji": "💎",
          "ex": "La prosa d'arte cura ogni parola come fosse poesia.",
          "exDe": "Die Kunstprosa pflegt jedes Wort, als wäre es Poesie."
        }
      ]
    }
  },
  {
    "id": "adv-registro",
    "title": "Registro Formale & Connettivi",
    "de": "Formelle Sprache & Konnektoren",
    "emoji": "✒️",
    "color": "#6b7a3f",
    "area": "Lingua avanzata",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "tuttavia",
          "de": "jedoch",
          "emoji": "↔️",
          "ex": "Il piano era ottimo; tuttavia, mancavano i fondi per realizzarlo.",
          "exDe": "Der Plan war ausgezeichnet; es fehlten jedoch die Mittel, um ihn umzusetzen."
        },
        {
          "it": "inoltre",
          "de": "außerdem",
          "emoji": "➕",
          "ex": "Il prodotto è economico; inoltre, è di ottima qualità.",
          "exDe": "Das Produkt ist günstig; außerdem ist es von hervorragender Qualität."
        },
        {
          "it": "quindi",
          "de": "also",
          "emoji": "➡️",
          "ex": "Aveva studiato molto, quindi ha superato l'esame senza difficoltà.",
          "exDe": "Er hatte viel gelernt, also hat er die Prüfung ohne Schwierigkeiten bestanden."
        },
        {
          "it": "perciò",
          "de": "deshalb",
          "emoji": "✅",
          "ex": "Pioveva forte, perciò abbiamo rimandato la gita.",
          "exDe": "Es regnete stark, deshalb haben wir den Ausflug verschoben."
        },
        {
          "it": "infatti",
          "de": "tatsächlich",
          "emoji": "✔️",
          "ex": "Sembrava stanco e infatti si è addormentato subito.",
          "exDe": "Er wirkte müde und tatsächlich ist er sofort eingeschlafen."
        },
        {
          "it": "comunque",
          "de": "wie dem auch sei",
          "emoji": "🤷",
          "ex": "Non sono d'accordo; comunque, faremo come dici tu.",
          "exDe": "Ich bin nicht einverstanden; wie dem auch sei, wir machen es, wie du sagst."
        },
        {
          "it": "ovvero",
          "de": "das heißt",
          "emoji": "🟰",
          "ex": "Arriverà domani, ovvero il quindici del mese.",
          "exDe": "Er kommt morgen an, das heißt am Fünfzehnten des Monats."
        },
        {
          "it": "anzi",
          "de": "vielmehr",
          "emoji": "🔁",
          "ex": "Non mi dispiace, anzi ne sono molto contento.",
          "exDe": "Es stört mich nicht, vielmehr freue ich mich sehr darüber."
        },
        {
          "it": "in conclusione",
          "de": "abschließend",
          "emoji": "🏁",
          "ex": "In conclusione, il progetto merita il nostro pieno sostegno.",
          "exDe": "Abschließend verdient das Projekt unsere volle Unterstützung."
        },
        {
          "it": "d'altra parte",
          "de": "andererseits",
          "emoji": "✋",
          "ex": "È costoso; d'altra parte, dura molti anni.",
          "exDe": "Es ist teuer; andererseits hält es viele Jahre."
        },
        {
          "it": "per quanto riguarda",
          "de": "was ... betrifft",
          "emoji": "🔎",
          "ex": "Per quanto riguarda i costi, ne parleremo domani.",
          "exDe": "Was die Kosten betrifft, werden wir morgen darüber sprechen."
        },
        {
          "it": "in primo luogo",
          "de": "erstens",
          "emoji": "1️⃣",
          "ex": "In primo luogo, vorrei ringraziare tutti i presenti.",
          "exDe": "Erstens möchte ich allen Anwesenden danken."
        },
        {
          "it": "secondo me",
          "de": "meiner Meinung nach",
          "emoji": "💭",
          "ex": "Secondo me, questa soluzione è la più ragionevole.",
          "exDe": "Meiner Meinung nach ist diese Lösung die vernünftigste."
        },
        {
          "it": "a causa di",
          "de": "aufgrund von",
          "emoji": "⚠️",
          "ex": "Il volo è stato cancellato a causa del maltempo.",
          "exDe": "Der Flug wurde aufgrund des schlechten Wetters gestrichen."
        },
        {
          "it": "grazie a",
          "de": "dank",
          "emoji": "🙏",
          "ex": "Grazie al suo aiuto, abbiamo finito in tempo.",
          "exDe": "Dank seiner Hilfe haben wir rechtzeitig fertig."
        },
        {
          "it": "nonostante",
          "de": "trotz",
          "emoji": "🛡️",
          "ex": "Nonostante la pioggia, la festa è stata un successo.",
          "exDe": "Trotz des Regens war das Fest ein Erfolg."
        },
        {
          "it": "in altre parole",
          "de": "mit anderen Worten",
          "emoji": "💬",
          "ex": "In altre parole, dobbiamo cambiare strategia.",
          "exDe": "Mit anderen Worten, wir müssen die Strategie ändern."
        },
        {
          "it": "ad esempio",
          "de": "zum Beispiel",
          "emoji": "📌",
          "ex": "Molti frutti, ad esempio le arance, sono ricchi di vitamina C.",
          "exDe": "Viele Früchte, zum Beispiel Orangen, sind reich an Vitamin C."
        },
        {
          "it": "in genere",
          "de": "im Allgemeinen",
          "emoji": "📊",
          "ex": "In genere preferisco lavorare la mattina presto.",
          "exDe": "Im Allgemeinen arbeite ich lieber früh am Morgen."
        },
        {
          "it": "del resto",
          "de": "im Übrigen",
          "emoji": "🗒️",
          "ex": "Non mi sorprende; del resto, lo avevo previsto.",
          "exDe": "Es überrascht mich nicht; im Übrigen hatte ich es vorausgesehen."
        }
      ],
      "C1": [
        {
          "it": "pertanto",
          "de": "folglich",
          "emoji": "➿",
          "ex": "I dati sono incompleti; pertanto le conclusioni restano provvisorie.",
          "exDe": "Die Daten sind unvollständig; folglich bleiben die Schlussfolgerungen vorläufig."
        },
        {
          "it": "dunque",
          "de": "somit",
          "emoji": "🔗",
          "ex": "La premessa è falsa, dunque l'intero ragionamento crolla.",
          "exDe": "Die Prämisse ist falsch, somit bricht die gesamte Argumentation zusammen."
        },
        {
          "it": "ciononostante",
          "de": "nichtsdestotrotz",
          "emoji": "🪨",
          "ex": "Le critiche erano dure; ciononostante non cambiò idea.",
          "exDe": "Die Kritik war hart; nichtsdestotrotz änderte er seine Meinung nicht."
        },
        {
          "it": "altresì",
          "de": "ebenso",
          "emoji": "📎",
          "ex": "Si richiede esperienza e altresì un'ottima conoscenza dell'inglese.",
          "exDe": "Erforderlich sind Erfahrung und ebenso ausgezeichnete Englischkenntnisse."
        },
        {
          "it": "in seguito a",
          "de": "infolge",
          "emoji": "📉",
          "ex": "In seguito alle proteste, il governo ha ritirato la legge.",
          "exDe": "Infolge der Proteste hat die Regierung das Gesetz zurückgezogen."
        },
        {
          "it": "al fine di",
          "de": "mit dem Ziel zu",
          "emoji": "🎯",
          "ex": "Sono state adottate nuove misure al fine di ridurre l'inquinamento.",
          "exDe": "Es wurden neue Maßnahmen ergriffen mit dem Ziel, die Verschmutzung zu verringern."
        },
        {
          "it": "a tal proposito",
          "de": "diesbezüglich",
          "emoji": "📍",
          "ex": "A tal proposito, vorrei fare alcune precisazioni.",
          "exDe": "Diesbezüglich möchte ich einige Klarstellungen machen."
        },
        {
          "it": "per di più",
          "de": "obendrein",
          "emoji": "➕",
          "ex": "Il servizio è scadente e per di più costoso.",
          "exDe": "Der Service ist mangelhaft und obendrein teuer."
        },
        {
          "it": "in tal senso",
          "de": "in diesem Sinne",
          "emoji": "🧭",
          "ex": "In tal senso, la riforma rappresenta un passo decisivo.",
          "exDe": "In diesem Sinne stellt die Reform einen entscheidenden Schritt dar."
        },
        {
          "it": "vale a dire",
          "de": "das heißt",
          "emoji": "🟰",
          "ex": "Servono interventi strutturali, vale a dire riforme di lungo periodo.",
          "exDe": "Es bedarf struktureller Eingriffe, das heißt langfristiger Reformen."
        },
        {
          "it": "premesso che",
          "de": "vorausgeschickt, dass",
          "emoji": "📋",
          "ex": "Premesso che i tempi sono stretti, propongo di iniziare subito.",
          "exDe": "Vorausgeschickt, dass die Zeit knapp ist, schlage ich vor, sofort zu beginnen."
        },
        {
          "it": "a prescindere da",
          "de": "unabhängig von",
          "emoji": "🔓",
          "ex": "A prescindere dal risultato, l'esperienza è stata preziosa.",
          "exDe": "Unabhängig vom Ergebnis war die Erfahrung wertvoll."
        },
        {
          "it": "in virtù di",
          "de": "kraft",
          "emoji": "⚖️",
          "ex": "In virtù dei poteri conferitigli, il presidente ha firmato il decreto.",
          "exDe": "Kraft der ihm verliehenen Befugnisse hat der Präsident das Dekret unterzeichnet."
        },
        {
          "it": "laddove",
          "de": "wohingegen",
          "emoji": "🔀",
          "ex": "Alcuni approvano la proposta, laddove altri la respingono.",
          "exDe": "Einige befürworten den Vorschlag, wohingegen andere ihn ablehnen."
        },
        {
          "it": "in merito a",
          "de": "bezüglich",
          "emoji": "🗂️",
          "ex": "In merito alla sua richiesta, le comunichiamo quanto segue.",
          "exDe": "Bezüglich Ihrer Anfrage teilen wir Ihnen Folgendes mit."
        },
        {
          "it": "di conseguenza",
          "de": "demzufolge",
          "emoji": "📤",
          "ex": "La domanda è cresciuta e di conseguenza i prezzi sono saliti.",
          "exDe": "Die Nachfrage ist gestiegen und demzufolge sind die Preise geklettert."
        },
        {
          "it": "purché",
          "de": "sofern",
          "emoji": "🔐",
          "ex": "Acconsento, purché siano rispettate tutte le condizioni.",
          "exDe": "Ich stimme zu, sofern alle Bedingungen eingehalten werden."
        },
        {
          "it": "in linea di massima",
          "de": "grundsätzlich",
          "emoji": "📐",
          "ex": "In linea di massima sono d'accordo, ma servono alcune modifiche.",
          "exDe": "Grundsätzlich bin ich einverstanden, aber es sind einige Änderungen nötig."
        },
        {
          "it": "non da ultimo",
          "de": "nicht zuletzt",
          "emoji": "🔚",
          "ex": "Conta l'esperienza e, non da ultimo, la motivazione del candidato.",
          "exDe": "Es zählt die Erfahrung und, nicht zuletzt, die Motivation des Kandidaten."
        },
        {
          "it": "stante che",
          "de": "angesichts der Tatsache, dass",
          "emoji": "📅",
          "ex": "Stante che le risorse sono limitate, occorre stabilire delle priorità.",
          "exDe": "Angesichts der Tatsache, dass die Mittel begrenzt sind, müssen Prioritäten gesetzt werden."
        }
      ],
      "C2": [
        {
          "it": "nondimeno",
          "de": "gleichwohl",
          "emoji": "🗿",
          "ex": "Le obiezioni erano fondate; nondimeno la commissione approvò il testo.",
          "exDe": "Die Einwände waren berechtigt; gleichwohl genehmigte der Ausschuss den Text."
        },
        {
          "it": "fermo restando che",
          "de": "unbeschadet dessen, dass",
          "emoji": "🧱",
          "ex": "Fermo restando che la legge va rispettata, si può valutare un'eccezione.",
          "exDe": "Unbeschadet dessen, dass das Gesetz einzuhalten ist, kann eine Ausnahme erwogen werden."
        },
        {
          "it": "ancorché",
          "de": "wenngleich",
          "emoji": "🪶",
          "ex": "La proposta, ancorché audace, merita un esame attento.",
          "exDe": "Der Vorschlag verdient, wenngleich kühn, eine sorgfältige Prüfung."
        },
        {
          "it": "onde evitare",
          "de": "um zu vermeiden",
          "emoji": "🚧",
          "ex": "Si raccomanda la massima discrezione, onde evitare malintesi.",
          "exDe": "Es wird größte Diskretion empfohlen, um Missverständnisse zu vermeiden."
        },
        {
          "it": "alla luce di",
          "de": "im Lichte von",
          "emoji": "🔦",
          "ex": "Alla luce dei nuovi dati, le conclusioni vanno riviste.",
          "exDe": "Im Lichte der neuen Daten müssen die Schlussfolgerungen überarbeitet werden."
        },
        {
          "it": "in ottemperanza a",
          "de": "in Befolgung von",
          "emoji": "📜",
          "ex": "In ottemperanza alle disposizioni vigenti, l'ufficio resterà chiuso.",
          "exDe": "In Befolgung der geltenden Bestimmungen bleibt das Büro geschlossen."
        },
        {
          "it": "ferma la facoltà di",
          "de": "vorbehaltlich des Rechts, zu",
          "emoji": "🛂",
          "ex": "Si procede d'ufficio, ferma la facoltà di presentare ricorso.",
          "exDe": "Es wird von Amts wegen verfahren, vorbehaltlich des Rechts, Einspruch einzulegen."
        },
        {
          "it": "giacché",
          "de": "zumal",
          "emoji": "🪧",
          "ex": "Conviene rinviare la decisione, giacché mancano elementi sufficienti.",
          "exDe": "Es empfiehlt sich, die Entscheidung aufzuschieben, zumal ausreichende Anhaltspunkte fehlen."
        },
        {
          "it": "posto che",
          "de": "gesetzt den Fall, dass",
          "emoji": "🎲",
          "ex": "Posto che la tesi sia corretta, ne deriverebbero conseguenze notevoli.",
          "exDe": "Gesetzt den Fall, dass die These zutrifft, ergäben sich daraus beträchtliche Folgen."
        },
        {
          "it": "per converso",
          "de": "umgekehrt",
          "emoji": "🔄",
          "ex": "I costi diminuiscono; per converso, cala anche la qualità.",
          "exDe": "Die Kosten sinken; umgekehrt nimmt auch die Qualität ab."
        },
        {
          "it": "in subordine",
          "de": "hilfsweise",
          "emoji": "🪜",
          "ex": "Si chiede l'annullamento e, in subordine, la riduzione della sanzione.",
          "exDe": "Es wird die Aufhebung und, hilfsweise, die Herabsetzung der Sanktion beantragt."
        },
        {
          "it": "a far data da",
          "de": "mit Wirkung ab",
          "emoji": "🗓️",
          "ex": "Le nuove tariffe entreranno in vigore a far data dal primo gennaio.",
          "exDe": "Die neuen Tarife treten mit Wirkung ab dem ersten Januar in Kraft."
        },
        {
          "it": "in ragione di",
          "de": "in Anbetracht",
          "emoji": "🧮",
          "ex": "In ragione della gravità dei fatti, si è disposta la sospensione.",
          "exDe": "In Anbetracht der Schwere der Vorfälle wurde die Aussetzung angeordnet."
        },
        {
          "it": "viepiù",
          "de": "umso mehr",
          "emoji": "📈",
          "ex": "La questione si fa viepiù urgente con il passare del tempo.",
          "exDe": "Die Frage wird mit der Zeit umso dringlicher."
        },
        {
          "it": "epperò",
          "de": "und doch",
          "emoji": "🌗",
          "ex": "Le premesse erano incoraggianti, epperò l'esito deluse le attese.",
          "exDe": "Die Voraussetzungen waren ermutigend, und doch enttäuschte das Ergebnis die Erwartungen."
        },
        {
          "it": "salvo che",
          "de": "es sei denn",
          "emoji": "🚫",
          "ex": "Il contratto si intende rinnovato, salvo che una parte non receda.",
          "exDe": "Der Vertrag gilt als verlängert, es sei denn, eine Partei tritt zurück."
        },
        {
          "it": "atteso che",
          "de": "in Erwägung dessen, dass",
          "emoji": "🔖",
          "ex": "Atteso che le parti hanno raggiunto un accordo, la causa è estinta.",
          "exDe": "In Erwägung dessen, dass die Parteien eine Einigung erzielt haben, ist das Verfahren eingestellt."
        },
        {
          "it": "a tale stregua",
          "de": "demgemäß",
          "emoji": "🧷",
          "ex": "A tale stregua, ogni eccezione andrebbe valutata caso per caso.",
          "exDe": "Demgemäß wäre jede Ausnahme von Fall zu Fall zu beurteilen."
        },
        {
          "it": "di talché",
          "de": "sodass",
          "emoji": "🪡",
          "ex": "Le prove sono concordi, di talché ogni dubbio risulta superato.",
          "exDe": "Die Beweise stimmen überein, sodass jeder Zweifel ausgeräumt ist."
        },
        {
          "it": "vieppiù che",
          "de": "umso mehr als",
          "emoji": "🔺",
          "ex": "La cautela è doverosa, vieppiù che la materia è assai delicata.",
          "exDe": "Vorsicht ist geboten, umso mehr als die Angelegenheit äußerst heikel ist."
        }
      ]
    }
  },
  {
    "id": "adv-diritto",
    "title": "Diritto & Giustizia",
    "de": "Recht & Justiz",
    "emoji": "⚖️",
    "color": "#5e5b8a",
    "area": "Diritto & Salute",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "il tribunale",
          "de": "das Gericht",
          "emoji": "🏛️",
          "ex": "Il tribunale ha rinviato l'udienza alla settimana prossima.",
          "exDe": "Das Gericht hat die Verhandlung auf nächste Woche vertagt."
        },
        {
          "it": "l'avvocato",
          "de": "der Anwalt",
          "emoji": "👨‍⚖️",
          "ex": "Ho chiamato il mio avvocato per chiedere un consiglio legale.",
          "exDe": "Ich habe meinen Anwalt angerufen, um einen rechtlichen Rat einzuholen."
        },
        {
          "it": "il giudice",
          "de": "der Richter",
          "emoji": "🧑‍⚖️",
          "ex": "Il giudice ha ascoltato attentamente entrambe le parti.",
          "exDe": "Der Richter hat beiden Parteien aufmerksam zugehört."
        },
        {
          "it": "il reato",
          "de": "die Straftat",
          "emoji": "🚨",
          "ex": "Il furto è considerato un reato contro il patrimonio.",
          "exDe": "Diebstahl gilt als eine Straftat gegen das Vermögen."
        },
        {
          "it": "il processo",
          "de": "der Prozess",
          "emoji": "⚖️",
          "ex": "Il processo è durato quasi due anni.",
          "exDe": "Der Prozess dauerte fast zwei Jahre."
        },
        {
          "it": "la testimonianza",
          "de": "die Zeugenaussage",
          "emoji": "🗣️",
          "ex": "La sua testimonianza è stata decisiva per il verdetto.",
          "exDe": "Seine Zeugenaussage war entscheidend für das Urteil."
        },
        {
          "it": "il testimone",
          "de": "der Zeuge",
          "emoji": "👁️",
          "ex": "Il testimone ha riconosciuto l'imputato in aula.",
          "exDe": "Der Zeuge hat den Angeklagten im Gerichtssaal wiedererkannt."
        },
        {
          "it": "la denuncia",
          "de": "die Anzeige",
          "emoji": "📝",
          "ex": "Ha presentato una denuncia alla polizia per il furto dell'auto.",
          "exDe": "Er hat bei der Polizei eine Anzeige wegen des Autodiebstahls erstattet."
        },
        {
          "it": "la condanna",
          "de": "die Verurteilung",
          "emoji": "🔒",
          "ex": "La condanna prevede cinque anni di reclusione.",
          "exDe": "Die Verurteilung sieht fünf Jahre Haft vor."
        },
        {
          "it": "l'imputato",
          "de": "der Angeklagte",
          "emoji": "🙍‍♂️",
          "ex": "L'imputato si è dichiarato innocente davanti alla corte.",
          "exDe": "Der Angeklagte hat sich vor Gericht für unschuldig erklärt."
        },
        {
          "it": "la multa",
          "de": "das Bußgeld",
          "emoji": "💸",
          "ex": "Ho preso una multa per eccesso di velocità.",
          "exDe": "Ich habe ein Bußgeld wegen überhöhter Geschwindigkeit bekommen."
        },
        {
          "it": "il contratto",
          "de": "der Vertrag",
          "emoji": "🤝",
          "ex": "Prima di firmare il contratto, leggi bene tutte le clausole.",
          "exDe": "Bevor du den Vertrag unterschreibst, lies alle Klauseln genau durch."
        },
        {
          "it": "l'innocenza",
          "de": "die Unschuld",
          "emoji": "🕊️",
          "ex": "Ha lottato a lungo per dimostrare la propria innocenza.",
          "exDe": "Er hat lange gekämpft, um seine Unschuld zu beweisen."
        },
        {
          "it": "la colpa",
          "de": "die Schuld",
          "emoji": "😔",
          "ex": "Il giudice ha stabilito la colpa dell'imputato.",
          "exDe": "Der Richter hat die Schuld des Angeklagten festgestellt."
        },
        {
          "it": "la giustizia",
          "de": "die Gerechtigkeit",
          "emoji": "⚖️",
          "ex": "La vittima chiede soltanto giustizia.",
          "exDe": "Das Opfer fordert nur Gerechtigkeit."
        }
      ],
      "C1": [
        {
          "it": "l'ordinamento giuridico",
          "de": "die Rechtsordnung",
          "emoji": "🏛️",
          "ex": "L'ordinamento giuridico italiano si fonda sulla Costituzione.",
          "exDe": "Die italienische Rechtsordnung gründet sich auf die Verfassung."
        },
        {
          "it": "comminare una sanzione",
          "de": "eine Sanktion verhängen",
          "emoji": "📉",
          "ex": "L'autorità ha comminato una sanzione pesante all'azienda inadempiente.",
          "exDe": "Die Behörde hat eine schwere Sanktion gegen das säumige Unternehmen verhängt."
        },
        {
          "it": "presumere l'innocenza",
          "de": "die Unschuld vermuten",
          "emoji": "🤔",
          "ex": "Fino alla sentenza definitiva bisogna presumere l'innocenza dell'imputato.",
          "exDe": "Bis zum rechtskräftigen Urteil muss die Unschuld des Angeklagten vermutet werden."
        },
        {
          "it": "il ricorso in appello",
          "de": "die Berufung",
          "emoji": "📤",
          "ex": "La difesa ha annunciato un ricorso in appello contro la sentenza.",
          "exDe": "Die Verteidigung hat eine Berufung gegen das Urteil angekündigt."
        },
        {
          "it": "la giurisprudenza",
          "de": "die Rechtsprechung",
          "emoji": "📚",
          "ex": "La giurisprudenza recente ha consolidato questo principio.",
          "exDe": "Die jüngste Rechtsprechung hat diesen Grundsatz gefestigt."
        },
        {
          "it": "il dolo",
          "de": "der Vorsatz",
          "emoji": "🎯",
          "ex": "Per configurare il reato è necessario dimostrare il dolo.",
          "exDe": "Um die Straftat zu begründen, muss der Vorsatz nachgewiesen werden."
        },
        {
          "it": "la colpa grave",
          "de": "die grobe Fahrlässigkeit",
          "emoji": "⚠️",
          "ex": "Il danno è stato attribuito alla colpa grave del dipendente.",
          "exDe": "Der Schaden wurde der groben Fahrlässigkeit des Angestellten zugeschrieben."
        },
        {
          "it": "il risarcimento del danno",
          "de": "der Schadensersatz",
          "emoji": "💰",
          "ex": "La vittima ha ottenuto il risarcimento del danno subito.",
          "exDe": "Das Opfer hat den Schadensersatz für den erlittenen Schaden erhalten."
        },
        {
          "it": "il contraddittorio",
          "de": "das kontradiktorische Verfahren",
          "emoji": "🔄",
          "ex": "Il principio del contraddittorio garantisce a entrambe le parti di esporre le proprie ragioni.",
          "exDe": "Der Grundsatz des kontradiktorischen Verfahrens sichert beiden Parteien zu, ihre Gründe darzulegen."
        },
        {
          "it": "l'archiviazione",
          "de": "die Einstellung des Verfahrens",
          "emoji": "🗄️",
          "ex": "Il pubblico ministero ha chiesto l'archiviazione del caso.",
          "exDe": "Der Staatsanwalt hat die Einstellung des Verfahrens beantragt."
        },
        {
          "it": "la prescrizione",
          "de": "die Verjährung",
          "emoji": "⏳",
          "ex": "Il reato è caduto in prescrizione prima della sentenza.",
          "exDe": "Die Straftat ist vor dem Urteil verjährt."
        },
        {
          "it": "l'imputabilità",
          "de": "die Schuldfähigkeit",
          "emoji": "🧠",
          "ex": "La perizia psichiatrica ha messo in dubbio l'imputabilità dell'accusato.",
          "exDe": "Das psychiatrische Gutachten hat die Schuldfähigkeit des Angeklagten in Frage gestellt."
        },
        {
          "it": "la querela",
          "de": "der Strafantrag",
          "emoji": "✍️",
          "ex": "La parte offesa ha sporto querela entro i termini di legge.",
          "exDe": "Der Geschädigte hat innerhalb der gesetzlichen Fristen einen Strafantrag gestellt."
        },
        {
          "it": "il patrocinio legale",
          "de": "der Rechtsbeistand",
          "emoji": "🛡️",
          "ex": "Chi non può permetterselo ha diritto al patrocinio legale gratuito.",
          "exDe": "Wer es sich nicht leisten kann, hat Anspruch auf unentgeltlichen Rechtsbeistand."
        },
        {
          "it": "l'illecito",
          "de": "die Rechtswidrigkeit",
          "emoji": "🚫",
          "ex": "Il comportamento dell'impresa costituisce un illecito amministrativo.",
          "exDe": "Das Verhalten des Unternehmens stellt eine verwaltungsrechtliche Rechtswidrigkeit dar."
        },
        {
          "it": "la legittima difesa",
          "de": "die Notwehr",
          "emoji": "🛡️",
          "ex": "Il giudice ha riconosciuto la legittima difesa e lo ha assolto.",
          "exDe": "Der Richter hat die Notwehr anerkannt und ihn freigesprochen."
        },
        {
          "it": "la presunzione di non colpevolezza",
          "de": "die Unschuldsvermutung",
          "emoji": "⚖️",
          "ex": "La presunzione di non colpevolezza è un pilastro dello Stato di diritto.",
          "exDe": "Die Unschuldsvermutung ist eine Säule des Rechtsstaats."
        },
        {
          "it": "il dispositivo della sentenza",
          "de": "der Urteilstenor",
          "emoji": "📋",
          "ex": "Il dispositivo della sentenza è stato letto in aula.",
          "exDe": "Der Urteilstenor wurde im Gerichtssaal verlesen."
        }
      ],
      "C2": [
        {
          "it": "l'esegesi normativa",
          "de": "die Gesetzesauslegung",
          "emoji": "🔬",
          "ex": "L'esegesi normativa del testo richiede una conoscenza approfondita della ratio legis.",
          "exDe": "Die Gesetzesauslegung des Textes erfordert eine vertiefte Kenntnis der ratio legis."
        },
        {
          "it": "il fumus boni iuris",
          "de": "die Erfolgsaussicht des Anspruchs",
          "emoji": "📜",
          "ex": "Il giudice ha concesso la misura cautelare ravvisando il fumus boni iuris.",
          "exDe": "Der Richter hat die einstweilige Maßnahme gewährt, da er die Erfolgsaussicht des Anspruchs erkannte."
        },
        {
          "it": "l'eccezione di incostituzionalità",
          "de": "die Einrede der Verfassungswidrigkeit",
          "emoji": "🏛️",
          "ex": "La difesa ha sollevato un'eccezione di incostituzionalità della norma applicata.",
          "exDe": "Die Verteidigung hat die Einrede der Verfassungswidrigkeit der angewandten Norm erhoben."
        },
        {
          "it": "la riserva di legge",
          "de": "der Gesetzesvorbehalt",
          "emoji": "📕",
          "ex": "In materia penale vige il principio della riserva di legge.",
          "exDe": "Im Strafrecht gilt der Grundsatz des Gesetzesvorbehalts."
        },
        {
          "it": "il giudicato",
          "de": "die Rechtskraft",
          "emoji": "🔏",
          "ex": "Una volta passata in giudicato, la sentenza non è più impugnabile.",
          "exDe": "Sobald das Urteil in Rechtskraft erwächst, ist es nicht mehr anfechtbar."
        },
        {
          "it": "la potestà punitiva dello Stato",
          "de": "der staatliche Strafanspruch",
          "emoji": "⚔️",
          "ex": "La pena è espressione della potestà punitiva dello Stato.",
          "exDe": "Die Strafe ist Ausdruck des staatlichen Strafanspruchs."
        },
        {
          "it": "il principio di legalità",
          "de": "das Legalitätsprinzip",
          "emoji": "📐",
          "ex": "Il principio di legalità impone che nessuno sia punito per un fatto non previsto dalla legge.",
          "exDe": "Das Legalitätsprinzip verlangt, dass niemand für eine gesetzlich nicht vorgesehene Tat bestraft wird."
        },
        {
          "it": "la disamina del merito",
          "de": "die Sachprüfung",
          "emoji": "🧐",
          "ex": "La Corte ha proceduto alla disamina del merito della controversia.",
          "exDe": "Das Gericht hat die Sachprüfung des Rechtsstreits vorgenommen."
        },
        {
          "it": "l'inadempimento contrattuale",
          "de": "die Vertragsverletzung",
          "emoji": "📄",
          "ex": "L'inadempimento contrattuale legittima la risoluzione del contratto.",
          "exDe": "Die Vertragsverletzung rechtfertigt die Auflösung des Vertrags."
        },
        {
          "it": "la litispendenza",
          "de": "die Rechtshängigkeit",
          "emoji": "⚖️",
          "ex": "L'eccezione di litispendenza è stata accolta dal collegio giudicante.",
          "exDe": "Die Einrede der Rechtshängigkeit wurde vom Spruchkörper anerkannt."
        },
        {
          "it": "l'usucapione",
          "de": "die Ersitzung",
          "emoji": "🏡",
          "ex": "Ha acquisito la proprietà del terreno per usucapione.",
          "exDe": "Er hat das Eigentum am Grundstück durch Ersitzung erworben."
        },
        {
          "it": "il foro competente",
          "de": "der zuständige Gerichtsstand",
          "emoji": "🗺️",
          "ex": "Le parti hanno pattuito il foro competente in caso di lite.",
          "exDe": "Die Parteien haben den zuständigen Gerichtsstand für den Streitfall vereinbart."
        },
        {
          "it": "la clausola vessatoria",
          "de": "die missbräuchliche Klausel",
          "emoji": "🚩",
          "ex": "Il tribunale ha dichiarato nulla la clausola vessatoria del contratto.",
          "exDe": "Das Gericht hat die missbräuchliche Klausel des Vertrags für nichtig erklärt."
        },
        {
          "it": "il sindacato di legittimità",
          "de": "die Rechtmäßigkeitskontrolle",
          "emoji": "🔎",
          "ex": "La Corte di Cassazione esercita un sindacato di legittimità, non di merito.",
          "exDe": "Der Kassationshof übt eine Rechtmäßigkeitskontrolle aus, keine Sachprüfung."
        },
        {
          "it": "la responsabilità extracontrattuale",
          "de": "die deliktische Haftung",
          "emoji": "💥",
          "ex": "Il sinistro ha dato luogo a responsabilità extracontrattuale.",
          "exDe": "Der Unfall hat zu einer deliktischen Haftung geführt."
        },
        {
          "it": "l'esimente",
          "de": "der Rechtfertigungsgrund",
          "emoji": "🛡️",
          "ex": "Lo stato di necessità è considerato un'esimente.",
          "exDe": "Der Notstand gilt als ein Rechtfertigungsgrund."
        },
        {
          "it": "la sussunzione",
          "de": "die Subsumtion",
          "emoji": "🧩",
          "ex": "La sussunzione del fatto nella fattispecie astratta è compito del giudice.",
          "exDe": "Die Subsumtion des Sachverhalts unter den abstrakten Tatbestand ist Aufgabe des Richters."
        },
        {
          "it": "il favor rei",
          "de": "der Grundsatz in dubio pro reo",
          "emoji": "🤲",
          "ex": "In caso di dubbio il giudice deve applicare il favor rei.",
          "exDe": "Im Zweifelsfall muss der Richter den Grundsatz in dubio pro reo anwenden."
        }
      ]
    }
  },
  {
    "id": "adv-salute",
    "title": "Salute & Medicina",
    "de": "Gesundheit & Medizin",
    "emoji": "🩺",
    "color": "#c75b39",
    "area": "Diritto & Salute",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "la visita medica",
          "de": "die ärztliche Untersuchung",
          "emoji": "🩺",
          "ex": "Ho prenotato una visita medica per la prossima settimana.",
          "exDe": "Ich habe für nächste Woche eine ärztliche Untersuchung vereinbart."
        },
        {
          "it": "la diagnosi",
          "de": "die Diagnose",
          "emoji": "📋",
          "ex": "Il medico ha fatto una diagnosi precisa dopo gli esami.",
          "exDe": "Der Arzt hat nach den Untersuchungen eine genaue Diagnose gestellt."
        },
        {
          "it": "la terapia",
          "de": "die Therapie",
          "emoji": "💉",
          "ex": "La terapia durerà almeno tre mesi.",
          "exDe": "Die Therapie wird mindestens drei Monate dauern."
        },
        {
          "it": "il sintomo",
          "de": "das Symptom",
          "emoji": "🤒",
          "ex": "La febbre è il sintomo più comune dell'influenza.",
          "exDe": "Fieber ist das häufigste Symptom der Grippe."
        },
        {
          "it": "la ricetta medica",
          "de": "das Rezept",
          "emoji": "📝",
          "ex": "Per comprare questo farmaco serve la ricetta medica.",
          "exDe": "Um dieses Medikament zu kaufen, braucht man ein Rezept."
        },
        {
          "it": "il farmaco",
          "de": "das Medikament",
          "emoji": "💊",
          "ex": "Devi prendere il farmaco due volte al giorno.",
          "exDe": "Du musst das Medikament zweimal täglich einnehmen."
        },
        {
          "it": "il reparto",
          "de": "die Station",
          "emoji": "🏥",
          "ex": "È stato ricoverato nel reparto di cardiologia.",
          "exDe": "Er wurde auf der kardiologischen Station aufgenommen."
        },
        {
          "it": "il pronto soccorso",
          "de": "die Notaufnahme",
          "emoji": "🚑",
          "ex": "L'abbiamo portato subito al pronto soccorso.",
          "exDe": "Wir haben ihn sofort in die Notaufnahme gebracht."
        },
        {
          "it": "il ricovero",
          "de": "die Einweisung ins Krankenhaus",
          "emoji": "🛏️",
          "ex": "Il medico ha disposto il ricovero immediato.",
          "exDe": "Der Arzt hat die sofortige Einweisung ins Krankenhaus angeordnet."
        },
        {
          "it": "l'intervento chirurgico",
          "de": "der chirurgische Eingriff",
          "emoji": "🔪",
          "ex": "L'intervento chirurgico è riuscito perfettamente.",
          "exDe": "Der chirurgische Eingriff ist einwandfrei verlaufen."
        },
        {
          "it": "la guarigione",
          "de": "die Genesung",
          "emoji": "🌿",
          "ex": "Dopo settimane di riposo, la guarigione è stata completa.",
          "exDe": "Nach Wochen der Ruhe war die Genesung vollständig."
        },
        {
          "it": "la prevenzione",
          "de": "die Vorbeugung",
          "emoji": "🛡️",
          "ex": "La prevenzione è fondamentale per evitare molte malattie.",
          "exDe": "Die Vorbeugung ist entscheidend, um viele Krankheiten zu vermeiden."
        },
        {
          "it": "il vaccino",
          "de": "der Impfstoff",
          "emoji": "💉",
          "ex": "Il vaccino antinfluenzale è consigliato agli anziani.",
          "exDe": "Der Grippeimpfstoff wird älteren Menschen empfohlen."
        },
        {
          "it": "la pressione sanguigna",
          "de": "der Blutdruck",
          "emoji": "🩸",
          "ex": "L'infermiera mi ha misurato la pressione sanguigna.",
          "exDe": "Die Krankenschwester hat mir den Blutdruck gemessen."
        },
        {
          "it": "le analisi del sangue",
          "de": "die Blutuntersuchung",
          "emoji": "🧪",
          "ex": "Le analisi del sangue hanno rivelato una carenza di ferro.",
          "exDe": "Die Blutuntersuchung hat einen Eisenmangel ergeben."
        },
        {
          "it": "la malattia cronica",
          "de": "die chronische Krankheit",
          "emoji": "🩹",
          "ex": "Convive con una malattia cronica da molti anni.",
          "exDe": "Er lebt seit vielen Jahren mit einer chronischen Krankheit."
        },
        {
          "it": "il dolore",
          "de": "der Schmerz",
          "emoji": "😣",
          "ex": "Sente un forte dolore alla schiena da giorni.",
          "exDe": "Er verspürt seit Tagen starke Schmerzen im Rücken."
        },
        {
          "it": "il riposo",
          "de": "die Ruhe",
          "emoji": "😴",
          "ex": "Il medico le ha prescritto qualche giorno di riposo.",
          "exDe": "Der Arzt hat ihr ein paar Tage Ruhe verordnet."
        },
        {
          "it": "lo specialista",
          "de": "der Facharzt",
          "emoji": "👩‍⚕️",
          "ex": "Il medico di base mi ha mandato da uno specialista.",
          "exDe": "Der Hausarzt hat mich zu einem Facharzt überwiesen."
        }
      ],
      "C1": [
        {
          "it": "la patologia",
          "de": "die Erkrankung",
          "emoji": "🔬",
          "ex": "Si tratta di una patologia rara che richiede cure specifiche.",
          "exDe": "Es handelt sich um eine seltene Erkrankung, die spezifische Behandlungen erfordert."
        },
        {
          "it": "la prognosi",
          "de": "die Prognose",
          "emoji": "📈",
          "ex": "La prognosi resta riservata nonostante i miglioramenti.",
          "exDe": "Die Prognose bleibt trotz der Verbesserungen unsicher."
        },
        {
          "it": "la decorrenza della malattia",
          "de": "der Krankheitsverlauf",
          "emoji": "📉",
          "ex": "I medici monitorano attentamente la decorrenza della malattia.",
          "exDe": "Die Ärzte überwachen den Krankheitsverlauf aufmerksam."
        },
        {
          "it": "gli effetti collaterali",
          "de": "die Nebenwirkungen",
          "emoji": "⚠️",
          "ex": "Il farmaco può provocare effetti collaterali come nausea e vertigini.",
          "exDe": "Das Medikament kann Nebenwirkungen wie Übelkeit und Schwindel hervorrufen."
        },
        {
          "it": "la posologia",
          "de": "die Dosierung",
          "emoji": "💊",
          "ex": "Rispetta sempre la posologia indicata dal medico.",
          "exDe": "Halte dich stets an die vom Arzt angegebene Dosierung."
        },
        {
          "it": "il decorso post-operatorio",
          "de": "der postoperative Verlauf",
          "emoji": "🏥",
          "ex": "Il decorso post-operatorio è stato privo di complicazioni.",
          "exDe": "Der postoperative Verlauf war ohne Komplikationen."
        },
        {
          "it": "la riabilitazione",
          "de": "die Rehabilitation",
          "emoji": "🦿",
          "ex": "Dopo l'incidente ha iniziato un lungo percorso di riabilitazione.",
          "exDe": "Nach dem Unfall hat er einen langen Weg der Rehabilitation begonnen."
        },
        {
          "it": "il quadro clinico",
          "de": "das klinische Bild",
          "emoji": "🩻",
          "ex": "Il quadro clinico del paziente è migliorato sensibilmente.",
          "exDe": "Das klinische Bild des Patienten hat sich merklich gebessert."
        },
        {
          "it": "il consenso informato",
          "de": "die Einwilligung nach Aufklärung",
          "emoji": "✍️",
          "ex": "Prima dell'operazione il paziente deve firmare il consenso informato.",
          "exDe": "Vor der Operation muss der Patient die Einwilligung nach Aufklärung unterschreiben."
        },
        {
          "it": "la predisposizione genetica",
          "de": "die genetische Veranlagung",
          "emoji": "🧬",
          "ex": "Esiste una predisposizione genetica a questo tipo di tumore.",
          "exDe": "Es besteht eine genetische Veranlagung für diese Art von Tumor."
        },
        {
          "it": "l'anamnesi",
          "de": "die Anamnese",
          "emoji": "📑",
          "ex": "Il medico ha raccolto un'anamnesi dettagliata del paziente.",
          "exDe": "Der Arzt hat eine ausführliche Anamnese des Patienten erhoben."
        },
        {
          "it": "il quadro sintomatologico",
          "de": "das Symptombild",
          "emoji": "🤧",
          "ex": "Il quadro sintomatologico è compatibile con un'infezione virale.",
          "exDe": "Das Symptombild ist mit einer Virusinfektion vereinbar."
        },
        {
          "it": "la profilassi",
          "de": "die Prophylaxe",
          "emoji": "🛡️",
          "ex": "La profilassi antibiotica viene somministrata prima dell'intervento.",
          "exDe": "Die antibiotische Prophylaxe wird vor dem Eingriff verabreicht."
        },
        {
          "it": "l'insufficienza renale",
          "de": "die Niereninsuffizienz",
          "emoji": "🫘",
          "ex": "Il paziente soffre di insufficienza renale cronica.",
          "exDe": "Der Patient leidet an chronischer Niereninsuffizienz."
        },
        {
          "it": "la recidiva",
          "de": "der Rückfall",
          "emoji": "🔁",
          "ex": "Dopo due anni si è verificata una recidiva della malattia.",
          "exDe": "Nach zwei Jahren ist ein Rückfall der Krankheit aufgetreten."
        },
        {
          "it": "il decesso",
          "de": "der Todesfall",
          "emoji": "🕯️",
          "ex": "Il decesso è sopraggiunto in seguito a complicazioni respiratorie.",
          "exDe": "Der Tod trat infolge von Atemkomplikationen ein."
        },
        {
          "it": "l'esito degli esami",
          "de": "das Untersuchungsergebnis",
          "emoji": "📊",
          "ex": "Stiamo ancora attendendo l'esito degli esami istologici.",
          "exDe": "Wir warten noch auf das Ergebnis der histologischen Untersuchungen."
        },
        {
          "it": "la somministrazione del farmaco",
          "de": "die Verabreichung des Medikaments",
          "emoji": "💉",
          "ex": "La somministrazione del farmaco avviene per via endovenosa.",
          "exDe": "Die Verabreichung des Medikaments erfolgt intravenös."
        },
        {
          "it": "il monitoraggio dei parametri vitali",
          "de": "die Überwachung der Vitalparameter",
          "emoji": "📟",
          "ex": "In terapia intensiva è costante il monitoraggio dei parametri vitali.",
          "exDe": "Auf der Intensivstation erfolgt eine ständige Überwachung der Vitalparameter."
        }
      ],
      "C2": [
        {
          "it": "l'eziologia",
          "de": "die Ätiologie",
          "emoji": "🔍",
          "ex": "L'eziologia della malattia rimane tuttora poco chiara.",
          "exDe": "Die Ätiologie der Krankheit ist bis heute weitgehend ungeklärt."
        },
        {
          "it": "la patogenesi",
          "de": "die Pathogenese",
          "emoji": "🧫",
          "ex": "Gli studi recenti hanno chiarito la patogenesi dell'infiammazione.",
          "exDe": "Jüngste Studien haben die Pathogenese der Entzündung aufgeklärt."
        },
        {
          "it": "la comorbilità",
          "de": "die Komorbidität",
          "emoji": "➕",
          "ex": "La presenza di comorbilità complica notevolmente il trattamento.",
          "exDe": "Das Vorliegen von Komorbidität erschwert die Behandlung erheblich."
        },
        {
          "it": "l'esacerbazione",
          "de": "die Exazerbation",
          "emoji": "📛",
          "ex": "L'esacerbazione dei sintomi ha reso necessario il ricovero.",
          "exDe": "Die Exazerbation der Symptome machte eine Krankenhauseinweisung erforderlich."
        },
        {
          "it": "la sintomatologia conclamata",
          "de": "die voll ausgeprägte Symptomatik",
          "emoji": "🌡️",
          "ex": "Alla diagnosi la sintomatologia era ormai conclamata.",
          "exDe": "Bei der Diagnose war die Symptomatik bereits voll ausgeprägt."
        },
        {
          "it": "il referto istologico",
          "de": "der histologische Befund",
          "emoji": "🔬",
          "ex": "Il referto istologico ha confermato la natura benigna della lesione.",
          "exDe": "Der histologische Befund hat die gutartige Natur der Läsion bestätigt."
        },
        {
          "it": "la remissione completa",
          "de": "die vollständige Remission",
          "emoji": "✨",
          "ex": "Dopo la chemioterapia il paziente è entrato in remissione completa.",
          "exDe": "Nach der Chemotherapie ist der Patient in vollständige Remission gegangen."
        },
        {
          "it": "l'iter diagnostico",
          "de": "der diagnostische Ablauf",
          "emoji": "🧭",
          "ex": "L'iter diagnostico ha previsto numerosi esami strumentali.",
          "exDe": "Der diagnostische Ablauf umfasste zahlreiche apparative Untersuchungen."
        },
        {
          "it": "la farmacoresistenza",
          "de": "die Arzneimittelresistenz",
          "emoji": "🧪",
          "ex": "La farmacoresistenza batterica è una sfida crescente per la sanità.",
          "exDe": "Die bakterielle Arzneimittelresistenz ist eine wachsende Herausforderung für das Gesundheitswesen."
        },
        {
          "it": "l'insorgenza acuta",
          "de": "der akute Beginn",
          "emoji": "⚡",
          "ex": "L'insorgenza acuta dei sintomi ha allarmato i sanitari.",
          "exDe": "Der akute Beginn der Symptome hat das Pflegepersonal alarmiert."
        },
        {
          "it": "la diagnosi differenziale",
          "de": "die Differenzialdiagnose",
          "emoji": "⚖️",
          "ex": "La diagnosi differenziale ha permesso di escludere una neoplasia.",
          "exDe": "Die Differenzialdiagnose hat es ermöglicht, eine Neoplasie auszuschließen."
        },
        {
          "it": "il deficit cognitivo",
          "de": "das kognitive Defizit",
          "emoji": "🧠",
          "ex": "Il deficit cognitivo progredisce lentamente nei pazienti affetti.",
          "exDe": "Das kognitive Defizit schreitet bei den betroffenen Patienten langsam fort."
        },
        {
          "it": "la sepsi",
          "de": "die Sepsis",
          "emoji": "🦠",
          "ex": "La sepsi può evolvere rapidamente in shock settico.",
          "exDe": "Die Sepsis kann sich schnell zu einem septischen Schock entwickeln."
        },
        {
          "it": "l'aderenza terapeutica",
          "de": "die Therapietreue",
          "emoji": "🤝",
          "ex": "Una scarsa aderenza terapeutica compromette l'efficacia della cura.",
          "exDe": "Eine geringe Therapietreue beeinträchtigt die Wirksamkeit der Behandlung."
        },
        {
          "it": "la cachessia",
          "de": "die Kachexie",
          "emoji": "📉",
          "ex": "Nelle fasi avanzate il paziente ha sviluppato una grave cachessia.",
          "exDe": "In den fortgeschrittenen Stadien hat der Patient eine schwere Kachexie entwickelt."
        },
        {
          "it": "il quadro auscultatorio",
          "de": "der Auskultationsbefund",
          "emoji": "🩺",
          "ex": "Il quadro auscultatorio rivelava rantoli a entrambi i polmoni.",
          "exDe": "Der Auskultationsbefund zeigte Rasselgeräusche in beiden Lungen."
        },
        {
          "it": "l'esito infausto",
          "de": "der ungünstige Ausgang",
          "emoji": "🕯️",
          "ex": "Nonostante le cure, la malattia ha avuto un esito infausto.",
          "exDe": "Trotz der Behandlung nahm die Krankheit einen ungünstigen Ausgang."
        },
        {
          "it": "la palliazione",
          "de": "die Palliativversorgung",
          "emoji": "🤲",
          "ex": "Quando la guarigione non è più possibile si ricorre alla palliazione.",
          "exDe": "Wenn eine Heilung nicht mehr möglich ist, greift man auf die Palliativversorgung zurück."
        },
        {
          "it": "l'immunosoppressione",
          "de": "die Immunsuppression",
          "emoji": "🛡️",
          "ex": "L'immunosoppressione post-trapianto richiede un monitoraggio costante.",
          "exDe": "Die Immunsuppression nach der Transplantation erfordert eine ständige Überwachung."
        }
      ]
    }
  },
  {
    "id": "adv-psicologia",
    "title": "Mente & Emozioni",
    "de": "Psyche & Gefühle",
    "emoji": "🧠",
    "color": "#3f8a6b",
    "area": "Mente & Espressioni",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "l'autostima",
          "de": "das Selbstwertgefühl",
          "emoji": "💪",
          "ex": "Dopo quel successo la sua autostima è cresciuta molto.",
          "exDe": "Nach diesem Erfolg ist sein Selbstwertgefühl stark gewachsen."
        },
        {
          "it": "lo stress",
          "de": "der Stress",
          "emoji": "😰",
          "ex": "Lo stress sul lavoro mi sta togliendo il sonno.",
          "exDe": "Der Stress auf der Arbeit raubt mir den Schlaf."
        },
        {
          "it": "essere giù di morale",
          "de": "niedergeschlagen sein",
          "emoji": "😞",
          "ex": "Da qualche giorno sono un po' giù di morale.",
          "exDe": "Seit ein paar Tagen bin ich etwas niedergeschlagen."
        },
        {
          "it": "la fiducia in sé stessi",
          "de": "das Selbstvertrauen",
          "emoji": "🦁",
          "ex": "Per parlare in pubblico serve molta fiducia in sé stessi.",
          "exDe": "Um in der Öffentlichkeit zu sprechen, braucht man viel Selbstvertrauen."
        },
        {
          "it": "l'ansia",
          "de": "die Angst, die Beklemmung",
          "emoji": "😟",
          "ex": "Prima degli esami soffro sempre di ansia.",
          "exDe": "Vor Prüfungen leide ich immer unter Angst."
        },
        {
          "it": "la delusione",
          "de": "die Enttäuschung",
          "emoji": "💔",
          "ex": "Quella notizia è stata una grande delusione per tutti noi.",
          "exDe": "Diese Nachricht war eine große Enttäuschung für uns alle."
        },
        {
          "it": "essere di buon umore",
          "de": "guter Laune sein",
          "emoji": "😊",
          "ex": "Stamattina sono di buon umore e voglio uscire.",
          "exDe": "Heute Morgen bin ich guter Laune und möchte rausgehen."
        },
        {
          "it": "la gelosia",
          "de": "die Eifersucht",
          "emoji": "😒",
          "ex": "La sua gelosia ha rovinato il rapporto.",
          "exDe": "Seine Eifersucht hat die Beziehung ruiniert."
        },
        {
          "it": "l'orgoglio",
          "de": "der Stolz",
          "emoji": "🦚",
          "ex": "Il suo orgoglio gli impedisce di chiedere scusa.",
          "exDe": "Sein Stolz hindert ihn daran, sich zu entschuldigen."
        },
        {
          "it": "sentirsi in colpa",
          "de": "sich schuldig fühlen",
          "emoji": "😣",
          "ex": "Mi sento in colpa per non averla aiutata.",
          "exDe": "Ich fühle mich schuldig, weil ich ihr nicht geholfen habe."
        },
        {
          "it": "la nostalgia",
          "de": "die Sehnsucht, das Heimweh",
          "emoji": "🕰️",
          "ex": "Provo una forte nostalgia dei tempi dell'università.",
          "exDe": "Ich empfinde eine starke Sehnsucht nach der Studienzeit."
        },
        {
          "it": "la rabbia",
          "de": "die Wut, der Zorn",
          "emoji": "😡",
          "ex": "Ha represso la rabbia per non litigare.",
          "exDe": "Er hat die Wut unterdrückt, um nicht zu streiten."
        },
        {
          "it": "la timidezza",
          "de": "die Schüchternheit",
          "emoji": "🙈",
          "ex": "La sua timidezza svanisce tra gli amici.",
          "exDe": "Seine Schüchternheit verschwindet unter Freunden."
        },
        {
          "it": "il sollievo",
          "de": "die Erleichterung",
          "emoji": "😮‍💨",
          "ex": "Ho tirato un sospiro di sollievo dopo l'esito positivo.",
          "exDe": "Ich habe nach dem positiven Ergebnis erleichtert aufgeatmet."
        },
        {
          "it": "essere stressato",
          "de": "gestresst sein",
          "emoji": "🤯",
          "ex": "Sono talmente stressato che non riesco a concentrarmi.",
          "exDe": "Ich bin so gestresst, dass ich mich nicht konzentrieren kann."
        },
        {
          "it": "la paura",
          "de": "die Furcht, die Angst",
          "emoji": "😨",
          "ex": "Ho una paura terribile dei ragni.",
          "exDe": "Ich habe schreckliche Angst vor Spinnen."
        },
        {
          "it": "la felicità",
          "de": "das Glück, die Freude",
          "emoji": "😄",
          "ex": "La vera felicità sta nelle piccole cose.",
          "exDe": "Das wahre Glück liegt in den kleinen Dingen."
        },
        {
          "it": "perdere la pazienza",
          "de": "die Geduld verlieren",
          "emoji": "😤",
          "ex": "Con questi rumori sto per perdere la pazienza.",
          "exDe": "Bei diesem Lärm verliere ich gleich die Geduld."
        },
        {
          "it": "il senso di colpa",
          "de": "das Schuldgefühl",
          "emoji": "⚖️",
          "ex": "Un forte senso di colpa lo tormentava da settimane.",
          "exDe": "Ein starkes Schuldgefühl quälte ihn seit Wochen."
        },
        {
          "it": "la malinconia",
          "de": "die Wehmut, die Melancholie",
          "emoji": "🍂",
          "ex": "L'autunno mi mette addosso una dolce malinconia.",
          "exDe": "Der Herbst versetzt mich in eine süße Wehmut."
        }
      ],
      "C1": [
        {
          "it": "lo sconforto",
          "de": "die Mutlosigkeit, die Niedergeschlagenheit",
          "emoji": "😔",
          "ex": "Di fronte all'ennesimo rifiuto cadde nello sconforto.",
          "exDe": "Angesichts der x-ten Absage verfiel er in Mutlosigkeit."
        },
        {
          "it": "l'inquietudine",
          "de": "die Unruhe, die innere Beunruhigung",
          "emoji": "🌪️",
          "ex": "Un'inquietudine sottile gli impediva di dormire.",
          "exDe": "Eine feine Unruhe hinderte ihn am Schlafen."
        },
        {
          "it": "l'autocontrollo",
          "de": "die Selbstbeherrschung",
          "emoji": "🧘",
          "ex": "Mantenne l'autocontrollo nonostante le provocazioni.",
          "exDe": "Er bewahrte trotz der Provokationen die Selbstbeherrschung."
        },
        {
          "it": "la resilienza",
          "de": "die Resilienz, die seelische Widerstandskraft",
          "emoji": "🌱",
          "ex": "La sua resilienza le ha permesso di superare il lutto.",
          "exDe": "Ihre Resilienz hat es ihr ermöglicht, die Trauer zu überwinden."
        },
        {
          "it": "l'empatia",
          "de": "die Empathie, das Einfühlungsvermögen",
          "emoji": "🤝",
          "ex": "Ascolta gli altri con grande empatia.",
          "exDe": "Er hört anderen mit großem Einfühlungsvermögen zu."
        },
        {
          "it": "il rimorso",
          "de": "die Gewissensbisse, die Reue",
          "emoji": "🥀",
          "ex": "Il rimorso per quelle parole non lo abbandonava mai.",
          "exDe": "Die Reue über jene Worte verließ ihn nie."
        },
        {
          "it": "l'apprensione",
          "de": "die Besorgnis, die bange Erwartung",
          "emoji": "😬",
          "ex": "Attendeva i risultati con evidente apprensione.",
          "exDe": "Er erwartete die Ergebnisse mit sichtlicher Besorgnis."
        },
        {
          "it": "essere in preda al panico",
          "de": "von Panik erfasst sein",
          "emoji": "🚨",
          "ex": "Quando si spense la luce fu in preda al panico.",
          "exDe": "Als das Licht ausging, wurde sie von Panik erfasst."
        },
        {
          "it": "l'angoscia",
          "de": "die Beklemmung, die existenzielle Angst",
          "emoji": "🌫️",
          "ex": "Provava un'angoscia indescrivibile pensando al futuro.",
          "exDe": "Sie empfand eine unbeschreibliche Beklemmung, wenn sie an die Zukunft dachte."
        },
        {
          "it": "il disagio",
          "de": "das Unbehagen, das Unwohlsein",
          "emoji": "😖",
          "ex": "Avvertì un certo disagio in quella conversazione.",
          "exDe": "Er verspürte ein gewisses Unbehagen in diesem Gespräch."
        },
        {
          "it": "la consapevolezza di sé",
          "de": "die Selbstwahrnehmung, das Selbstbewusstsein",
          "emoji": "🪞",
          "ex": "La terapia ha rafforzato la sua consapevolezza di sé.",
          "exDe": "Die Therapie hat seine Selbstwahrnehmung gestärkt."
        },
        {
          "it": "abbattersi",
          "de": "den Mut verlieren, deprimiert sein",
          "emoji": "📉",
          "ex": "Non abbatterti per una sola brutta giornata.",
          "exDe": "Lass dich nicht von einem einzigen schlechten Tag entmutigen."
        },
        {
          "it": "l'irrequietezza",
          "de": "die Ruhelosigkeit, die innere Getriebenheit",
          "emoji": "🦗",
          "ex": "Un'irrequietezza costante lo spingeva a cambiare città.",
          "exDe": "Eine ständige Ruhelosigkeit trieb ihn dazu, die Stadt zu wechseln."
        },
        {
          "it": "la fragilità emotiva",
          "de": "die emotionale Verletzlichkeit",
          "emoji": "🪶",
          "ex": "Nascondeva la sua fragilità emotiva dietro un sorriso.",
          "exDe": "Sie verbarg ihre emotionale Verletzlichkeit hinter einem Lächeln."
        },
        {
          "it": "l'autostima ferita",
          "de": "das verletzte Selbstwertgefühl",
          "emoji": "🩹",
          "ex": "Quella critica colpì la sua autostima ferita.",
          "exDe": "Diese Kritik traf sein ohnehin verletztes Selbstwertgefühl."
        },
        {
          "it": "covare rancore",
          "de": "Groll hegen",
          "emoji": "🐍",
          "ex": "Da anni cova un profondo rancore verso il fratello.",
          "exDe": "Seit Jahren hegt er einen tiefen Groll gegen seinen Bruder."
        },
        {
          "it": "il distacco emotivo",
          "de": "die emotionale Distanz",
          "emoji": "🧊",
          "ex": "Parlava della tragedia con un sorprendente distacco emotivo.",
          "exDe": "Er sprach über die Tragödie mit überraschender emotionaler Distanz."
        },
        {
          "it": "lo smarrimento",
          "de": "die Verwirrung, das Sich-verloren-Fühlen",
          "emoji": "🧭",
          "ex": "Provò un profondo smarrimento dopo il trasferimento.",
          "exDe": "Nach dem Umzug fühlte er sich zutiefst verloren."
        },
        {
          "it": "la suscettibilità",
          "de": "die Empfindlichkeit, die Reizbarkeit",
          "emoji": "🌡️",
          "ex": "La sua suscettibilità rende difficile criticarlo.",
          "exDe": "Seine Empfindlichkeit macht es schwer, ihn zu kritisieren."
        },
        {
          "it": "lasciarsi andare",
          "de": "sich gehen lassen, sich hingeben",
          "emoji": "🍃",
          "ex": "Per una volta si lasciò andare alle emozioni.",
          "exDe": "Ausnahmsweise ließ er sich von den Gefühlen treiben."
        }
      ],
      "C2": [
        {
          "it": "l'accidia",
          "de": "die Trägheit der Seele, die geistige Antriebslosigkeit",
          "emoji": "🕯️",
          "ex": "Un'accidia opprimente gli toglieva ogni voglia di agire.",
          "exDe": "Eine erdrückende seelische Trägheit nahm ihm jeden Tatendrang."
        },
        {
          "it": "lo struggimento",
          "de": "das sehnsüchtige Schmachten, das verzehrende Verlangen",
          "emoji": "🌒",
          "ex": "Lo struggimento per la patria perduta pervade i suoi versi.",
          "exDe": "Das sehnsüchtige Schmachten nach der verlorenen Heimat durchzieht seine Verse."
        },
        {
          "it": "la trepidazione",
          "de": "das bange Hoffen, die zitternde Erwartung",
          "emoji": "🫨",
          "ex": "Aspettava il verdetto con trepidazione mal celata.",
          "exDe": "Sie erwartete das Urteil mit kaum verhohlenem bangem Hoffen."
        },
        {
          "it": "l'abulia",
          "de": "die Willenlosigkeit, der krankhafte Antriebsverlust",
          "emoji": "🛌",
          "ex": "La depressione lo aveva ridotto a uno stato di abulia totale.",
          "exDe": "Die Depression hatte ihn in einen Zustand völliger Willenlosigkeit versetzt."
        },
        {
          "it": "il turbamento",
          "de": "die seelische Erschütterung, die innere Verstörung",
          "emoji": "🌊",
          "ex": "Quelle parole le procurarono un turbamento profondo.",
          "exDe": "Jene Worte lösten in ihr eine tiefe seelische Erschütterung aus."
        },
        {
          "it": "la magnanimità",
          "de": "der Edelmut, die Großmut",
          "emoji": "👑",
          "ex": "Perdonò il traditore con sorprendente magnanimità.",
          "exDe": "Er verzieh dem Verräter mit überraschendem Edelmut."
        },
        {
          "it": "l'ineffabilità",
          "de": "die Unaussprechlichkeit (eines Gefühls)",
          "emoji": "✨",
          "ex": "Tentò invano di descrivere l'ineffabilità di quella gioia.",
          "exDe": "Vergeblich versuchte er, die Unaussprechlichkeit jener Freude zu beschreiben."
        },
        {
          "it": "la pusillanimità",
          "de": "die Kleinmütigkeit, die Feigheit",
          "emoji": "🐁",
          "ex": "La sua pusillanimità gli impedì di difendere l'amico.",
          "exDe": "Seine Kleinmütigkeit hinderte ihn daran, den Freund zu verteidigen."
        },
        {
          "it": "l'estasi",
          "de": "die Ekstase, die Verzückung",
          "emoji": "🌟",
          "ex": "Ascoltava la musica come rapito in estasi.",
          "exDe": "Er lauschte der Musik wie in Verzückung versunken."
        },
        {
          "it": "l'ipocondria",
          "de": "die Hypochondrie, die krankhafte Krankheitsangst",
          "emoji": "🩺",
          "ex": "La sua ipocondria lo portava a consultare medici di continuo.",
          "exDe": "Seine Hypochondrie veranlasste ihn, ständig Ärzte aufzusuchen."
        },
        {
          "it": "la commozione",
          "de": "die tiefe Rührung, die Ergriffenheit",
          "emoji": "🥹",
          "ex": "Lesse la lettera trattenendo a stento la commozione.",
          "exDe": "Er las den Brief und konnte die Rührung kaum zurückhalten."
        },
        {
          "it": "l'esultanza",
          "de": "der Jubel, das Frohlocken",
          "emoji": "🎉",
          "ex": "Alla vittoria seguì un'esultanza incontenibile.",
          "exDe": "Auf den Sieg folgte ein unbändiger Jubel."
        },
        {
          "it": "la prostrazione",
          "de": "die völlige Erschöpfung, die Niedergeschlagenheit",
          "emoji": "🪦",
          "ex": "Dopo il lutto cadde in uno stato di prostrazione.",
          "exDe": "Nach dem Trauerfall verfiel er in einen Zustand völliger Niedergeschlagenheit."
        },
        {
          "it": "il sgomento",
          "de": "das Entsetzen, die fassungslose Bestürzung",
          "emoji": "😱",
          "ex": "Guardò la scena con muto sgomento.",
          "exDe": "Sie betrachtete die Szene mit stummem Entsetzen."
        },
        {
          "it": "l'animosità",
          "de": "die Feindseligkeit, die erbitterte Abneigung",
          "emoji": "⚔️",
          "ex": "Tra le due famiglie regnava una sorda animosità.",
          "exDe": "Zwischen den beiden Familien herrschte eine dumpfe Feindseligkeit."
        },
        {
          "it": "la compunzione",
          "de": "die zerknirschte Reue, die andächtige Zerknirschung",
          "emoji": "🙏",
          "ex": "Confessò la colpa con sincera compunzione.",
          "exDe": "Er gestand die Schuld mit aufrichtiger Zerknirschung."
        },
        {
          "it": "l'ebbrezza",
          "de": "der Rausch, die berauschte Hochstimmung",
          "emoji": "🍷",
          "ex": "Provò l'ebbrezza della libertà appena ritrovata.",
          "exDe": "Er kostete den Rausch der gerade wiedergewonnenen Freiheit."
        },
        {
          "it": "il fastidio viscerale",
          "de": "die tief sitzende Abneigung, der instinktive Widerwille",
          "emoji": "🤢",
          "ex": "Provava un fastidio viscerale per l'ipocrisia.",
          "exDe": "Er empfand einen instinktiven Widerwillen gegen Heuchelei."
        },
        {
          "it": "la riottosità",
          "de": "die Aufsässigkeit, die widerspenstige Trotzhaltung",
          "emoji": "🐐",
          "ex": "La riottosità del ragazzo metteva a dura prova gli insegnanti.",
          "exDe": "Die Aufsässigkeit des Jungen stellte die Lehrer auf eine harte Probe."
        }
      ]
    }
  },
  {
    "id": "adv-idiomi",
    "title": "Modi di Dire",
    "de": "Redewendungen & Sprichwörter",
    "emoji": "💬",
    "color": "#a8472b",
    "area": "Mente & Espressioni",
    "advanced": true,
    "levels": {
      "B2": [
        {
          "it": "in bocca al lupo",
          "de": "viel Glück! (wörtl.: in den Rachen des Wolfes)",
          "emoji": "🐺",
          "ex": "In bocca al lupo per l'esame di domani!",
          "exDe": "Viel Glück für die Prüfung morgen!"
        },
        {
          "it": "costare un occhio della testa",
          "de": "ein Vermögen kosten (wörtl.: ein Auge des Kopfes kosten)",
          "emoji": "💸",
          "ex": "Questa macchina mi è costata un occhio della testa.",
          "exDe": "Dieses Auto hat mich ein Vermögen gekostet."
        },
        {
          "it": "non vedere l'ora",
          "de": "es kaum erwarten können",
          "emoji": "⏰",
          "ex": "Non vedo l'ora di partire per le vacanze.",
          "exDe": "Ich kann es kaum erwarten, in den Urlaub zu fahren."
        },
        {
          "it": "avere le mani bucate",
          "de": "das Geld mit vollen Händen ausgeben (wörtl.: durchlöcherte Hände haben)",
          "emoji": "🕳️",
          "ex": "Mio fratello ha le mani bucate, non risparmia mai.",
          "exDe": "Mein Bruder gibt das Geld mit vollen Händen aus, er spart nie."
        },
        {
          "it": "essere al verde",
          "de": "pleite sein (wörtl.: beim Grünen sein)",
          "emoji": "💚",
          "ex": "A fine mese sono sempre al verde.",
          "exDe": "Am Monatsende bin ich immer pleite."
        },
        {
          "it": "prendere due piccioni con una fava",
          "de": "zwei Fliegen mit einer Klappe schlagen (wörtl.: zwei Tauben mit einer Bohne fangen)",
          "emoji": "🐦",
          "ex": "Andando in centro ho preso due piccioni con una fava.",
          "exDe": "Indem ich in die Stadt ging, habe ich zwei Fliegen mit einer Klappe geschlagen."
        },
        {
          "it": "essere un libro aperto",
          "de": "ein offenes Buch sein",
          "emoji": "📖",
          "ex": "Con me Luca è un libro aperto, capisco tutto.",
          "exDe": "Mir gegenüber ist Luca ein offenes Buch, ich verstehe alles."
        },
        {
          "it": "tagliare la corda",
          "de": "sich aus dem Staub machen (wörtl.: das Seil durchschneiden)",
          "emoji": "🏃",
          "ex": "Appena è arrivata la polizia ha tagliato la corda.",
          "exDe": "Sobald die Polizei kam, hat er sich aus dem Staub gemacht."
        },
        {
          "it": "avere la testa fra le nuvole",
          "de": "mit dem Kopf in den Wolken sein, verträumt sein",
          "emoji": "☁️",
          "ex": "Oggi hai la testa fra le nuvole, cosa ti succede?",
          "exDe": "Heute bist du mit dem Kopf in den Wolken, was ist mit dir los?"
        },
        {
          "it": "rompere il ghiaccio",
          "de": "das Eis brechen",
          "emoji": "🧊",
          "ex": "Una battuta è bastata a rompere il ghiaccio.",
          "exDe": "Ein Witz genügte, um das Eis zu brechen."
        },
        {
          "it": "fare orecchie da mercante",
          "de": "auf taube Ohren stoßen lassen, sich taub stellen (wörtl.: Krämerohren machen)",
          "emoji": "🙉",
          "ex": "Gli ho detto di smettere ma fa orecchie da mercante.",
          "exDe": "Ich habe ihm gesagt, er soll aufhören, aber er stellt sich taub."
        },
        {
          "it": "essere come il cane e il gatto",
          "de": "wie Hund und Katze sein",
          "emoji": "🐶",
          "ex": "I due fratelli sono come il cane e il gatto.",
          "exDe": "Die beiden Brüder sind wie Hund und Katze."
        },
        {
          "it": "togliersi un peso dallo stomaco",
          "de": "sich etwas von der Seele reden (wörtl.: ein Gewicht vom Magen nehmen)",
          "emoji": "😮‍💨",
          "ex": "Dopo averle parlato mi sono tolto un peso dallo stomaco.",
          "exDe": "Nachdem ich mit ihr gesprochen hatte, fiel mir ein Stein vom Herzen."
        },
        {
          "it": "piove sul bagnato",
          "de": "ein Unglück kommt selten allein (wörtl.: es regnet aufs Nasse)",
          "emoji": "🌧️",
          "ex": "Ho perso il lavoro e ora anche il portafoglio: piove sul bagnato.",
          "exDe": "Ich habe den Job verloren und jetzt auch noch das Portemonnaie: ein Unglück kommt selten allein."
        },
        {
          "it": "non avere peli sulla lingua",
          "de": "kein Blatt vor den Mund nehmen (wörtl.: keine Haare auf der Zunge haben)",
          "emoji": "👅",
          "ex": "Mia nonna non ha peli sulla lingua e dice ciò che pensa.",
          "exDe": "Meine Oma nimmt kein Blatt vor den Mund und sagt, was sie denkt."
        },
        {
          "it": "fare il passo più lungo della gamba",
          "de": "sich übernehmen (wörtl.: einen Schritt länger als das Bein machen)",
          "emoji": "🦵",
          "ex": "Comprando quella casa ha fatto il passo più lungo della gamba.",
          "exDe": "Mit dem Kauf dieses Hauses hat er sich übernommen."
        },
        {
          "it": "essere al settimo cielo",
          "de": "im siebten Himmel sein",
          "emoji": "☁️",
          "ex": "Da quando si è fidanzata è al settimo cielo.",
          "exDe": "Seit sie verlobt ist, schwebt sie im siebten Himmel."
        },
        {
          "it": "chi dorme non piglia pesci",
          "de": "wer nicht handelt, geht leer aus (wörtl.: wer schläft, fängt keine Fische)",
          "emoji": "🐟",
          "ex": "Alzati e datti da fare: chi dorme non piglia pesci.",
          "exDe": "Steh auf und tu was: Wer nicht handelt, geht leer aus."
        },
        {
          "it": "avere un diavolo per capello",
          "de": "fuchsteufelswild sein (wörtl.: einen Teufel pro Haar haben)",
          "emoji": "😈",
          "ex": "Dopo quella telefonata aveva un diavolo per capello.",
          "exDe": "Nach diesem Anruf war sie fuchsteufelswild."
        },
        {
          "it": "mettere il dito nella piaga",
          "de": "den Finger in die Wunde legen",
          "emoji": "🩹",
          "ex": "Parlando del divorzio ha messo il dito nella piaga.",
          "exDe": "Indem er die Scheidung ansprach, legte er den Finger in die Wunde."
        }
      ],
      "C1": [
        {
          "it": "avere le mani in pasta",
          "de": "überall die Finger im Spiel haben (wörtl.: die Hände im Teig haben)",
          "emoji": "🍞",
          "ex": "In questo affare lui ha le mani in pasta da anni.",
          "exDe": "Bei diesem Geschäft hat er seit Jahren die Finger im Spiel."
        },
        {
          "it": "prendere lucciole per lanterne",
          "de": "etwas gründlich verwechseln, sich völlig irren (wörtl.: Glühwürmchen für Laternen halten)",
          "emoji": "🪔",
          "ex": "Se credi che ti voglia ingannare, prendi lucciole per lanterne.",
          "exDe": "Wenn du glaubst, dass er dich täuschen will, irrst du dich gewaltig."
        },
        {
          "it": "non tutte le ciambelle riescono col buco",
          "de": "es klappt nicht immer alles (wörtl.: nicht allen Krapfen gelingt das Loch)",
          "emoji": "🍩",
          "ex": "Il progetto è fallito, ma non tutte le ciambelle riescono col buco.",
          "exDe": "Das Projekt ist gescheitert, aber es klappt eben nicht immer alles."
        },
        {
          "it": "menare il can per l'aia",
          "de": "um den heißen Brei herumreden (wörtl.: den Hund über den Hof führen)",
          "emoji": "🐕",
          "ex": "Smettila di menare il can per l'aia e dimmi la verità.",
          "exDe": "Hör auf, um den heißen Brei herumzureden, und sag mir die Wahrheit."
        },
        {
          "it": "fare il diavolo a quattro",
          "de": "einen Höllenlärm machen, alles aufmischen (wörtl.: den Teufel zu viert machen)",
          "emoji": "🎭",
          "ex": "I bambini hanno fatto il diavolo a quattro tutta la sera.",
          "exDe": "Die Kinder haben den ganzen Abend einen Höllenlärm gemacht."
        },
        {
          "it": "cadere dalla padella alla brace",
          "de": "vom Regen in die Traufe kommen (wörtl.: von der Pfanne in die Glut fallen)",
          "emoji": "🔥",
          "ex": "Cambiando lavoro è caduto dalla padella alla brace.",
          "exDe": "Mit dem Jobwechsel ist er vom Regen in die Traufe gekommen."
        },
        {
          "it": "avere la coda di paglia",
          "de": "ein schlechtes Gewissen haben (wörtl.: einen Strohschwanz haben)",
          "emoji": "🌾",
          "ex": "Si è offeso subito: segno che ha la coda di paglia.",
          "exDe": "Er hat sich sofort beleidigt gefühlt: ein Zeichen, dass er ein schlechtes Gewissen hat."
        },
        {
          "it": "tirare l'acqua al proprio mulino",
          "de": "sein eigenes Süppchen kochen, nur an den eigenen Vorteil denken (wörtl.: das Wasser auf die eigene Mühle leiten)",
          "emoji": "💧",
          "ex": "In riunione tira sempre l'acqua al proprio mulino.",
          "exDe": "In Sitzungen denkt er immer nur an den eigenen Vorteil."
        },
        {
          "it": "fare di tutta l'erba un fascio",
          "de": "alle über einen Kamm scheren (wörtl.: aus allem Gras ein Bündel machen)",
          "emoji": "🌿",
          "ex": "Non fare di tutta l'erba un fascio: non sono tutti disonesti.",
          "exDe": "Scher nicht alle über einen Kamm: Nicht alle sind unehrlich."
        },
        {
          "it": "essere al verde più del prezzemolo",
          "de": "völlig blank sein, total pleite (wörtl.: grüner sein als die Petersilie)",
          "emoji": "🌿",
          "ex": "Dopo le vacanze sono al verde più del prezzemolo.",
          "exDe": "Nach dem Urlaub bin ich völlig blank."
        },
        {
          "it": "raddrizzare le gambe ai cani",
          "de": "Unmögliches versuchen (wörtl.: den Hunden die Beine geraderichten)",
          "emoji": "🦴",
          "ex": "Convincerlo a studiare è come raddrizzare le gambe ai cani.",
          "exDe": "Ihn zum Lernen zu bewegen ist ein Ding der Unmöglichkeit."
        },
        {
          "it": "avere il prosciutto sugli occhi",
          "de": "mit Blindheit geschlagen sein, das Offensichtliche nicht sehen (wörtl.: Schinken auf den Augen haben)",
          "emoji": "🥓",
          "ex": "Hai il prosciutto sugli occhi, ti sta chiaramente mentendo.",
          "exDe": "Du bist mit Blindheit geschlagen, sie belügt dich ganz offensichtlich."
        },
        {
          "it": "passare la nottata",
          "de": "das Schlimmste überstehen, über den Berg sein (wörtl.: die Nacht durchstehen)",
          "emoji": "🌃",
          "ex": "Il malato ha passato la nottata, ora va meglio.",
          "exDe": "Der Kranke hat das Schlimmste überstanden, jetzt geht es besser."
        },
        {
          "it": "gettare la spugna",
          "de": "das Handtuch werfen, aufgeben (wörtl.: den Schwamm werfen)",
          "emoji": "🧽",
          "ex": "Dopo tanti tentativi ha gettato la spugna.",
          "exDe": "Nach vielen Versuchen hat er das Handtuch geworfen."
        },
        {
          "it": "battere il ferro finché è caldo",
          "de": "das Eisen schmieden, solange es heiß ist",
          "emoji": "🔨",
          "ex": "L'offerta è ottima, batti il ferro finché è caldo.",
          "exDe": "Das Angebot ist hervorragend, schmiede das Eisen, solange es heiß ist."
        },
        {
          "it": "rendere pan per focaccia",
          "de": "Gleiches mit Gleichem vergelten (wörtl.: Brot mit Fladen vergelten)",
          "emoji": "🫓",
          "ex": "Mi ha tradito e gli ho reso pan per focaccia.",
          "exDe": "Er hat mich hintergangen, und ich habe ihm Gleiches mit Gleichem vergolten."
        },
        {
          "it": "tenere il piede in due scarpe",
          "de": "auf zwei Hochzeiten tanzen (wörtl.: den Fuß in zwei Schuhen halten)",
          "emoji": "👟",
          "ex": "Non fidarti: tiene il piede in due scarpe.",
          "exDe": "Trau ihm nicht: Er tanzt auf zwei Hochzeiten."
        },
        {
          "it": "scoprire l'acqua calda",
          "de": "etwas längst Bekanntes als Neuigkeit verkaufen (wörtl.: das warme Wasser entdecken)",
          "emoji": "♨️",
          "ex": "Dicendo che fa caldo d'estate hai scoperto l'acqua calda.",
          "exDe": "Mit der Feststellung, dass es im Sommer heiß ist, verkündest du nichts Neues."
        },
        {
          "it": "salvare capra e cavoli",
          "de": "es allen recht machen, beide Interessen wahren (wörtl.: Ziege und Kohl retten)",
          "emoji": "🐐",
          "ex": "Con quel compromesso è riuscito a salvare capra e cavoli.",
          "exDe": "Mit diesem Kompromiss hat er es geschafft, beide Interessen zu wahren."
        },
        {
          "it": "fare il portoghese",
          "de": "sich ohne zu zahlen einschleichen, Schwarzfahrer sein (wörtl.: den Portugiesen machen)",
          "emoji": "🎟️",
          "ex": "Al concerto è entrato facendo il portoghese.",
          "exDe": "Beim Konzert hat er sich ohne Ticket eingeschlichen."
        }
      ],
      "C2": [
        {
          "it": "fare il passo del gambero",
          "de": "Rückschritte machen, sich rückwärts entwickeln (wörtl.: den Schritt der Garnele machen)",
          "emoji": "🦐",
          "ex": "Con queste riforme il Paese fa il passo del gambero.",
          "exDe": "Mit diesen Reformen macht das Land einen Rückschritt."
        },
        {
          "it": "non capire un'acca",
          "de": "rein gar nichts verstehen (wörtl.: kein H verstehen)",
          "emoji": "🔤",
          "ex": "Di matematica non capisco un'acca.",
          "exDe": "Von Mathematik verstehe ich rein gar nichts."
        },
        {
          "it": "avere il bernoccolo per qualcosa",
          "de": "ein angeborenes Talent für etwas haben (wörtl.: die Beule für etwas haben)",
          "emoji": "🧠",
          "ex": "Quel ragazzo ha proprio il bernoccolo per le lingue.",
          "exDe": "Dieser Junge hat wirklich ein angeborenes Talent für Sprachen."
        },
        {
          "it": "trovare l'America",
          "de": "das große Los ziehen, sein Glück machen (wörtl.: Amerika finden)",
          "emoji": "🗽",
          "ex": "Con quell'eredità credeva di aver trovato l'America.",
          "exDe": "Mit dieser Erbschaft glaubte er, das große Los gezogen zu haben."
        },
        {
          "it": "predicare bene e razzolare male",
          "de": "Wasser predigen und Wein trinken (wörtl.: gut predigen und schlecht scharren)",
          "emoji": "⛪",
          "ex": "Critica gli sprechi ma poi predica bene e razzola male.",
          "exDe": "Er kritisiert die Verschwendung, predigt aber Wasser und trinkt Wein."
        },
        {
          "it": "fare le nozze coi fichi secchi",
          "de": "etwas mit unzureichenden Mitteln versuchen (wörtl.: die Hochzeit mit getrockneten Feigen feiern)",
          "emoji": "🫛",
          "ex": "Con quel budget vogliono fare le nozze coi fichi secchi.",
          "exDe": "Mit diesem Budget wollen sie das Unmögliche mit zu wenig Mitteln schaffen."
        },
        {
          "it": "avere la botte piena e la moglie ubriaca",
          "de": "alles auf einmal haben wollen, das Unvereinbare verlangen (wörtl.: das volle Fass und die betrunkene Frau haben)",
          "emoji": "🍷",
          "ex": "Vuole la botte piena e la moglie ubriaca: impossibile.",
          "exDe": "Er will alles auf einmal haben: unmöglich."
        },
        {
          "it": "essere il fanalino di coda",
          "de": "das Schlusslicht sein",
          "emoji": "🚨",
          "ex": "In classifica la squadra è il fanalino di coda.",
          "exDe": "In der Tabelle ist die Mannschaft das Schlusslicht."
        },
        {
          "it": "tagliare la testa al toro",
          "de": "ein für alle Mal Schluss machen, die Sache endgültig klären (wörtl.: dem Stier den Kopf abschlagen)",
          "emoji": "🐂",
          "ex": "Per tagliare la testa al toro decidiamo subito a sorte.",
          "exDe": "Um die Sache ein für alle Mal zu klären, losen wir sofort aus."
        },
        {
          "it": "chi va al mulino s'infarina",
          "de": "wer sich in Gefahr begibt, kommt darin um (wörtl.: wer zur Mühle geht, wird mit Mehl bestäubt)",
          "emoji": "🌾",
          "ex": "Frequentando certi ambienti chi va al mulino s'infarina.",
          "exDe": "Wer in solchen Kreisen verkehrt, bleibt nicht unbefleckt."
        },
        {
          "it": "menare per il naso",
          "de": "an der Nase herumführen",
          "emoji": "👃",
          "ex": "Per mesi l'ha menato per il naso con false promesse.",
          "exDe": "Monatelang hat sie ihn mit falschen Versprechen an der Nase herumgeführt."
        },
        {
          "it": "fare un buco nell'acqua",
          "de": "auf der ganzen Linie scheitern (wörtl.: ein Loch ins Wasser machen)",
          "emoji": "🕳️",
          "ex": "Con quell'investimento ha fatto un buco nell'acqua.",
          "exDe": "Mit dieser Investition ist er auf der ganzen Linie gescheitert."
        },
        {
          "it": "l'abito non fa il monaco",
          "de": "Kleider machen nicht den Mann (wörtl.: das Gewand macht nicht den Mönch)",
          "emoji": "👗",
          "ex": "Sembra severo, ma l'abito non fa il monaco.",
          "exDe": "Er wirkt streng, aber Kleider machen nicht den Mann."
        },
        {
          "it": "stare con le mani in mano",
          "de": "untätig herumstehen, Däumchen drehen (wörtl.: mit der Hand in der Hand stehen)",
          "emoji": "🙌",
          "ex": "Non stare con le mani in mano, dammi una mano!",
          "exDe": "Steh nicht untätig herum, hilf mir!"
        },
        {
          "it": "cercare il pelo nell'uovo",
          "de": "ein Haar in der Suppe suchen, pingelig sein (wörtl.: das Haar im Ei suchen)",
          "emoji": "🥚",
          "ex": "Il revisore cerca sempre il pelo nell'uovo.",
          "exDe": "Der Prüfer sucht immer ein Haar in der Suppe."
        },
        {
          "it": "buttare il bambino con l'acqua sporca",
          "de": "das Kind mit dem Bade ausschütten",
          "emoji": "🛁",
          "ex": "Eliminando tutto il progetto rischi di buttare il bambino con l'acqua sporca.",
          "exDe": "Wenn du das ganze Projekt streichst, schüttest du womöglich das Kind mit dem Bade aus."
        },
        {
          "it": "avere voce in capitolo",
          "de": "ein Mitspracherecht haben (wörtl.: eine Stimme im Kapitel haben)",
          "emoji": "🗳️",
          "ex": "Su questa decisione anche lui ha voce in capitolo.",
          "exDe": "Bei dieser Entscheidung hat auch er ein Mitspracherecht."
        },
        {
          "it": "il bue che dice cornuto all'asino",
          "de": "ein Esel schimpft den anderen Langohr (wörtl.: der Ochse, der den Esel gehörnt nennt)",
          "emoji": "🐂",
          "ex": "Mi accusa di disordine? È il bue che dice cornuto all'asino.",
          "exDe": "Er wirft mir Unordnung vor? Da schimpft ein Esel den anderen Langohr."
        },
        {
          "it": "passare sotto le forche caudine",
          "de": "eine demütigende Niederlage hinnehmen müssen (wörtl.: unter dem kaudinischen Joch hindurchgehen)",
          "emoji": "⚔️",
          "ex": "Per ottenere il prestito è dovuto passare sotto le forche caudine.",
          "exDe": "Um den Kredit zu bekommen, musste er eine demütigende Prozedur über sich ergehen lassen."
        }
      ]
    }
  }
];
CORPUS.push(...ADVANCED_CORPUS);

/* =========================================================
   DIALOGHI — ganze Dialoge.
   who: "P" = Partner (spricht vor), "U" = du (Antwort wählen)
   Für U-Zeilen erzeugt die App Bausteine (richtige + Ablenker).
   ========================================================= */
const DIALOGHI = [
  {
    id: "dlg-bar-caffe", title: "Un caffè al volo", de: "Schnell einen Kaffee", emoji: "☕", color: "#a86b2f",
    level: "A1", theme: "ristorante", scene: "Am Tresen einer römischen Bar.",
    lines: [
      { who: "P", name: "Barista", it: "Buongiorno! Cosa Le porto?", de: "Guten Morgen! Was darf ich Ihnen bringen?" },
      { who: "U", it: "Un cappuccino, per favore.", de: "Einen Cappuccino, bitte." },
      { who: "P", name: "Barista", it: "Qualcosa da mangiare? Un cornetto?", de: "Etwas zu essen? Ein Hörnchen?" },
      { who: "U", it: "Sì, un cornetto alla crema.", de: "Ja, ein Hörnchen mit Creme." },
      { who: "P", name: "Barista", it: "Ecco a Lei. Sono due euro e cinquanta.", de: "Bitte sehr. Das macht zwei Euro fünfzig." },
      { who: "U", it: "Ecco, tenga pure il resto.", de: "Hier, behalten Sie das Wechselgeld." }
    ]
  },
  {
    id: "dlg-saluti-strada", title: "Incontro per strada", de: "Begegnung auf der Straße", emoji: "👋", color: "#c75b39",
    level: "A1", theme: "saluti", scene: "Du triffst zufällig eine Bekannte.",
    lines: [
      { who: "P", name: "Giulia", it: "Ciao! Quanto tempo! Come stai?", de: "Hallo! Lange nicht gesehen! Wie geht's?" },
      { who: "U", it: "Ciao Giulia! Sto bene, e tu?", de: "Hallo Giulia! Mir geht's gut, und dir?" },
      { who: "P", name: "Giulia", it: "Non c'è male. Hai tempo per un caffè?", de: "Nicht schlecht. Hast du Zeit für einen Kaffee?" },
      { who: "U", it: "Volentieri, ma ho solo dieci minuti.", de: "Gerne, aber ich habe nur zehn Minuten." },
      { who: "P", name: "Giulia", it: "Perfetto, il bar è qui dietro l'angolo.", de: "Perfekt, die Bar ist gleich um die Ecke." },
      { who: "U", it: "Andiamo, offro io questa volta!", de: "Gehen wir, diesmal lade ich ein!" }
    ]
  },
  {
    id: "dlg-presentarsi-festa", title: "A una festa", de: "Auf einer Party", emoji: "🎉", color: "#3f7d8a",
    level: "A2", theme: "presentarsi", scene: "Du lernst jemanden auf einer Party kennen.",
    lines: [
      { who: "P", name: "Davide", it: "Ciao, non ci conosciamo. Sono Davide.", de: "Hallo, wir kennen uns nicht. Ich bin Davide." },
      { who: "U", it: "Piacere, Davide! Io sono qui con Anna.", de: "Freut mich, Davide! Ich bin mit Anna hier." },
      { who: "P", name: "Davide", it: "Ah, l'amica di Anna! Di dove sei?", de: "Ah, Annas Freund! Woher kommst du?" },
      { who: "U", it: "Vengo dalla Germania, ma vivo a Roma.", de: "Ich komme aus Deutschland, wohne aber in Rom." },
      { who: "P", name: "Davide", it: "Parli benissimo! Da quanto sei qui?", de: "Du sprichst super! Wie lange bist du schon hier?" },
      { who: "U", it: "Da due anni. Mi sono innamorato della città.", de: "Seit zwei Jahren. Ich habe mich in die Stadt verliebt." }
    ]
  },
  {
    id: "dlg-ristorante-ordinare", title: "Si ordina!", de: "Wir bestellen!", emoji: "🍷", color: "#8a2e3b",
    level: "A2", theme: "ristorante", scene: "Im Restaurant, der Kellner kommt an den Tisch.",
    lines: [
      { who: "P", name: "Cameriere", it: "Buonasera, avete deciso?", de: "Guten Abend, haben Sie gewählt?" },
      { who: "U", it: "Sì, per primo vorrei le lasagne.", de: "Ja, als ersten Gang möchte ich die Lasagne." },
      { who: "P", name: "Cameriere", it: "Ottima scelta. E da bere?", de: "Ausgezeichnete Wahl. Und zu trinken?" },
      { who: "U", it: "Una bottiglia di acqua naturale, grazie.", de: "Eine Flasche stilles Wasser, danke." },
      { who: "P", name: "Cameriere", it: "Perfetto. Un dolce alla fine?", de: "Perfekt. Zum Schluss einen Nachtisch?" },
      { who: "U", it: "Magari un tiramisù, ma poi basta!", de: "Vielleicht ein Tiramisù, aber dann ist Schluss!" }
    ]
  },
  {
    id: "dlg-albergo", title: "Check-in in hotel", de: "Einchecken im Hotel", emoji: "🏨", color: "#5a7d9b",
    level: "A2", theme: "viaggio", scene: "An der Rezeption eines kleinen Hotels.",
    lines: [
      { who: "P", name: "Receptionist", it: "Buonasera, ha una prenotazione?", de: "Guten Abend, haben Sie eine Reservierung?" },
      { who: "U", it: "Sì, una camera doppia a nome Bianchi.", de: "Ja, ein Doppelzimmer auf den Namen Bianchi." },
      { who: "P", name: "Receptionist", it: "Perfetto. La colazione è inclusa.", de: "Perfekt. Das Frühstück ist inklusive." },
      { who: "U", it: "Ottimo. A che ora è la colazione?", de: "Ausgezeichnet. Um wie viel Uhr ist das Frühstück?" },
      { who: "P", name: "Receptionist", it: "Dalle sette alle dieci. Ecco la chiave.", de: "Von sieben bis zehn. Hier ist der Schlüssel." },
      { who: "U", it: "Grazie. Il wifi funziona in camera?", de: "Danke. Funktioniert das WLAN im Zimmer?" }
    ]
  },
  {
    id: "dlg-dottore", title: "Dal dottore", de: "Beim Arzt", emoji: "🩺", color: "#2e7d6f",
    level: "A2", theme: "salute", scene: "In der Arztpraxis.",
    lines: [
      { who: "P", name: "Dottoressa", it: "Buongiorno, mi dica, cosa si sente?", de: "Guten Morgen, sagen Sie, was haben Sie?" },
      { who: "U", it: "Ho mal di gola e un po' di febbre.", de: "Ich habe Halsschmerzen und etwas Fieber." },
      { who: "P", name: "Dottoressa", it: "Da quanti giorni si sente così?", de: "Seit wie vielen Tagen fühlen Sie sich so?" },
      { who: "U", it: "Da tre giorni, e non passa.", de: "Seit drei Tagen, und es geht nicht weg." },
      { who: "P", name: "Dottoressa", it: "Le prescrivo uno sciroppo e riposo.", de: "Ich verschreibe Ihnen einen Sirup und Ruhe." },
      { who: "U", it: "Grazie. Posso andare al lavoro?", de: "Danke. Darf ich zur Arbeit gehen?" }
    ]
  },
  {
    id: "dlg-mercato", title: "Trattare al mercato", de: "Feilschen auf dem Markt", emoji: "🍅", color: "#b8442e",
    level: "B1", theme: "shopping", scene: "Am Gemüsestand. Du willst handeln.",
    lines: [
      { who: "P", name: "Fruttivendolo", it: "Pomodori freschissimi, tre euro al chilo!", de: "Ganz frische Tomaten, drei Euro das Kilo!" },
      { who: "U", it: "Tre euro? Mi sembra un po' caro.", de: "Drei Euro? Das kommt mir etwas teuer vor." },
      { who: "P", name: "Fruttivendolo", it: "Sono i migliori del mercato, signore!", de: "Es sind die besten auf dem Markt, mein Herr!" },
      { who: "U", it: "Se ne prendo due chili, mi fa uno sconto?", de: "Wenn ich zwei Kilo nehme, geben Sie mir Rabatt?" },
      { who: "P", name: "Fruttivendolo", it: "Va bene, cinque euro per due chili.", de: "In Ordnung, fünf Euro für zwei Kilo." },
      { who: "U", it: "Affare fatto! Aggiunga un po' di basilico.", de: "Abgemacht! Legen Sie etwas Basilikum dazu." }
    ]
  },
  {
    id: "dlg-appuntamento", title: "Primo appuntamento", de: "Erstes Date", emoji: "💘", color: "#c2548a",
    level: "B1", theme: "emozioni", scene: "Ein erstes Date — etwas nervös.",
    lines: [
      { who: "P", name: "Sofia", it: "Allora, raccontami: cosa fai nella vita?", de: "Also, erzähl mir: Was machst du im Leben?" },
      { who: "U", it: "Lavoro tanto, ma sogno di viaggiare.", de: "Ich arbeite viel, aber ich träume vom Reisen." },
      { who: "P", name: "Sofia", it: "Che romantico! E sai cucinare?", de: "Wie romantisch! Und kannst du kochen?" },
      { who: "U", it: "Diciamo che la pizza la ordino sempre.", de: "Sagen wir, die Pizza bestelle ich immer." },
      { who: "P", name: "Sofia", it: "Ahah, almeno sei sincero!", de: "Haha, wenigstens bist du ehrlich!" },
      { who: "U", it: "Posso offrirti un altro bicchiere di vino?", de: "Darf ich dir noch ein Glas Wein anbieten?" }
    ]
  },
  {
    id: "dlg-litigio", title: "Chi lava i piatti?", de: "Wer spült?", emoji: "🍽️", color: "#a8472b",
    level: "B1", theme: "casa", scene: "Kleiner Streit unter Mitbewohnern.",
    lines: [
      { who: "P", name: "Coinquilino", it: "Scusa, ma i piatti sono ancora nel lavandino.", de: "Sorry, aber das Geschirr ist immer noch in der Spüle." },
      { who: "U", it: "Lo so, lo so, li lavo io stasera.", de: "Ich weiß, ich weiß, ich spüle es heute Abend." },
      { who: "P", name: "Coinquilino", it: "Lo dici da tre giorni, però!", de: "Das sagst du aber schon seit drei Tagen!" },
      { who: "U", it: "Hai ragione, scusa. Faccio io anche la spesa.", de: "Du hast recht, sorry. Ich kaufe auch ein." },
      { who: "P", name: "Coinquilino", it: "Così va meglio. Pace fatta?", de: "So ist es besser. Wieder Frieden?" },
      { who: "U", it: "Pace fatta. Stasera cucino io!", de: "Wieder Frieden. Heute Abend koche ich!" }
    ]
  },
  {
    id: "dlg-meccanico", title: "Dal meccanico", de: "In der Werkstatt", emoji: "🔧", color: "#6a5640",
    level: "B1", theme: "trasporti", scene: "Dein Auto macht komische Geräusche.",
    lines: [
      { who: "P", name: "Meccanico", it: "Allora, che problema ha la macchina?", de: "Also, was hat das Auto für ein Problem?" },
      { who: "U", it: "Fa un rumore strano quando freno.", de: "Es macht ein komisches Geräusch, wenn ich bremse." },
      { who: "P", name: "Meccanico", it: "Mmm, potrebbero essere i freni.", de: "Mmm, das könnten die Bremsen sein." },
      { who: "U", it: "Quanto mi viene a costare?", de: "Wie viel wird mich das kosten?" },
      { who: "P", name: "Meccanico", it: "Sui duecento euro, dipende dai pezzi.", de: "Um die zweihundert Euro, je nach Teilen." },
      { who: "U", it: "Va bene, quando posso ripassare?", de: "In Ordnung, wann kann ich wiederkommen?" }
    ]
  },
  {
    id: "dlg-aeroporto", title: "All'aeroporto", de: "Am Flughafen", emoji: "✈️", color: "#3f7d8a",
    level: "A2", theme: "viaggio", scene: "Am Check-in-Schalter.",
    lines: [
      { who: "P", name: "Addetto", it: "Buongiorno, passaporto e biglietto, prego.", de: "Guten Tag, Pass und Ticket, bitte." },
      { who: "U", it: "Eccoli. Vorrei un posto al finestrino.", de: "Hier sind sie. Ich hätte gern einen Fensterplatz." },
      { who: "P", name: "Addetto", it: "Certo. Ha bagagli da imbarcare?", de: "Sicher. Haben Sie Gepäck aufzugeben?" },
      { who: "U", it: "Solo questa valigia, grazie.", de: "Nur diesen Koffer, danke." },
      { who: "P", name: "Addetto", it: "L'imbarco è alle dieci, gate B12.", de: "Das Boarding ist um zehn, Gate B12." },
      { who: "U", it: "Perfetto. Il volo è in orario?", de: "Perfekt. Ist der Flug pünktlich?" }
    ]
  },
  {
    id: "dlg-telefono", title: "Una telefonata di lavoro", de: "Ein Geschäftsanruf", emoji: "📞", color: "#6b7a3f",
    level: "B2", theme: "lavoro", scene: "Du rufst eine Firma an.",
    lines: [
      { who: "P", name: "Segretaria", it: "Studio Rossi, buongiorno, con chi parlo?", de: "Kanzlei Rossi, guten Tag, mit wem spreche ich?" },
      { who: "U", it: "Buongiorno, vorrei parlare con il dottor Rossi.", de: "Guten Tag, ich würde gern mit Herrn Rossi sprechen." },
      { who: "P", name: "Segretaria", it: "È in riunione. Vuole lasciare un messaggio?", de: "Er ist in einer Besprechung. Möchten Sie eine Nachricht hinterlassen?" },
      { who: "U", it: "Sì, gli dica che ha chiamato Marco Neri.", de: "Ja, sagen Sie ihm, dass Marco Neri angerufen hat." },
      { who: "P", name: "Segretaria", it: "Glielo riferisco. Mi lascia un numero?", de: "Ich richte es ihm aus. Hinterlassen Sie eine Nummer?" },
      { who: "U", it: "Certo. La richiamo io nel pomeriggio.", de: "Gerne. Ich rufe am Nachmittag noch mal an." }
    ]
  },
  {
    id: "dlg-colloquio", title: "Il colloquio di lavoro", de: "Das Vorstellungsgespräch", emoji: "💼", color: "#8a6d3f",
    level: "B2", theme: "lavoro", scene: "Bewerbungsgespräch — bleib selbstbewusst.",
    lines: [
      { who: "P", name: "Selezionatrice", it: "Mi parli un po' di lei. Quali sono i suoi punti di forza?", de: "Erzählen Sie mir von sich. Was sind Ihre Stärken?" },
      { who: "U", it: "Sono preciso, curioso e lavoro bene in squadra.", de: "Ich bin genau, neugierig und arbeite gut im Team." },
      { who: "P", name: "Selezionatrice", it: "E un suo difetto, invece?", de: "Und eine Schwäche von Ihnen?" },
      { who: "U", it: "A volte sono troppo perfezionista.", de: "Manchmal bin ich zu perfektionistisch." },
      { who: "P", name: "Selezionatrice", it: "Perché vuole lavorare con noi?", de: "Warum möchten Sie bei uns arbeiten?" },
      { who: "U", it: "Credo molto nei vostri progetti e voglio crescere.", de: "Ich glaube sehr an Ihre Projekte und will mich weiterentwickeln." }
    ]
  },
  {
    id: "dlg-emergenza", title: "Una piccola emergenza", de: "Ein kleiner Notfall", emoji: "🚑", color: "#cd2b2b",
    level: "B1", theme: "salute", scene: "Du rufst die Nummer 112.",
    lines: [
      { who: "P", name: "Operatore", it: "112, emergenza. Mi dica cosa succede.", de: "112, Notruf. Sagen Sie, was passiert ist." },
      { who: "U", it: "Un signore è caduto e non riesce ad alzarsi.", de: "Ein Herr ist gestürzt und kann nicht aufstehen." },
      { who: "P", name: "Operatore", it: "È cosciente? Respira normalmente?", de: "Ist er bei Bewusstsein? Atmet er normal?" },
      { who: "U", it: "Sì, è cosciente ma ha molto male alla gamba.", de: "Ja, er ist bei Bewusstsein, aber sein Bein tut sehr weh." },
      { who: "P", name: "Operatore", it: "Mi dia l'indirizzo esatto, per favore.", de: "Geben Sie mir bitte die genaue Adresse." },
      { who: "U", it: "Siamo in via Garibaldi, davanti al numero dieci.", de: "Wir sind in der Via Garibaldi, vor Nummer zehn." }
    ]
  },
  {
    id: "dlg-barbiere", title: "Dal parrucchiere", de: "Beim Friseur", emoji: "💈", color: "#9b6b3f",
    level: "A2", theme: "vestiti", scene: "Beim Friseur — du erklärst, was du willst.",
    lines: [
      { who: "P", name: "Parrucchiere", it: "Si accomodi! Come li tagliamo oggi?", de: "Setzen Sie sich! Wie schneiden wir sie heute?" },
      { who: "U", it: "Corti ai lati e non troppo sopra.", de: "Kurz an den Seiten und nicht zu kurz oben." },
      { who: "P", name: "Parrucchiere", it: "Anche la barba la sistemiamo?", de: "Bringen wir auch den Bart in Form?" },
      { who: "U", it: "Sì, ma la lasci abbastanza lunga.", de: "Ja, aber lassen Sie ihn ziemlich lang." },
      { who: "P", name: "Parrucchiere", it: "Ecco fatto. Come si vede?", de: "Fertig. Wie gefällt es Ihnen?" },
      { who: "U", it: "Benissimo, è proprio quello che volevo!", de: "Sehr gut, genau das wollte ich!" }
    ]
  },
  {
    id: "dlg-reclamo", title: "Un reclamo al ristorante", de: "Eine Beschwerde im Restaurant", emoji: "😤", color: "#8a2e3b",
    level: "B2", theme: "ristorante", scene: "Mit dem Essen stimmt etwas nicht.",
    lines: [
      { who: "P", name: "Cameriere", it: "Tutto bene con il piatto, signore?", de: "Alles in Ordnung mit dem Gericht, mein Herr?" },
      { who: "U", it: "A dire il vero, la pasta è fredda.", de: "Ehrlich gesagt ist die Pasta kalt." },
      { who: "P", name: "Cameriere", it: "Mi dispiace molto, la faccio rifare subito.", de: "Das tut mir sehr leid, ich lasse sie sofort neu machen." },
      { who: "U", it: "La ringrazio, e niente fretta.", de: "Ich danke Ihnen, und keine Eile." },
      { who: "P", name: "Cameriere", it: "Offre la casa il dolce, per scusarci.", de: "Der Nachtisch geht aufs Haus, zur Entschuldigung." },
      { who: "U", it: "Molto gentile, così si rimedia volentieri.", de: "Sehr freundlich, so verzeiht man gerne." }
    ]
  },
  {
    id: "dlg-treno-perso", title: "Ho perso il treno!", de: "Ich habe den Zug verpasst!", emoji: "🚆", color: "#3f8a6b",
    level: "B1", theme: "trasporti", scene: "Am Schalter — der Zug ist weg.",
    lines: [
      { who: "P", name: "Bigliettaio", it: "Buongiorno, come posso aiutarla?", de: "Guten Tag, wie kann ich Ihnen helfen?" },
      { who: "U", it: "Ho perso il treno delle nove per Firenze.", de: "Ich habe den Neun-Uhr-Zug nach Florenz verpasst." },
      { who: "P", name: "Bigliettaio", it: "Nessun problema, ce n'è un altro alle dieci.", de: "Kein Problem, es gibt einen weiteren um zehn." },
      { who: "U", it: "Devo pagare un nuovo biglietto?", de: "Muss ich ein neues Ticket bezahlen?" },
      { who: "P", name: "Bigliettaio", it: "Le cambio il biglietto, paga solo la differenza.", de: "Ich tausche das Ticket um, Sie zahlen nur die Differenz." },
      { who: "U", it: "Meno male! Da quale binario parte?", de: "Zum Glück! Von welchem Gleis fährt er ab?" }
    ]
  },
  {
    id: "dlg-invito", title: "Un invito a cena", de: "Eine Einladung zum Essen", emoji: "🍝", color: "#c75b39",
    level: "A2", theme: "famiglia", scene: "Eine Freundin lädt dich ein.",
    lines: [
      { who: "P", name: "Chiara", it: "Ti va di venire a cena da noi sabato?", de: "Hast du Lust, am Samstag bei uns zu essen?" },
      { who: "U", it: "Volentieri! Cosa posso portare?", de: "Sehr gern! Was kann ich mitbringen?" },
      { who: "P", name: "Chiara", it: "Solo la tua compagnia, pensiamo a tutto noi.", de: "Nur deine Gesellschaft, um alles andere kümmern wir uns." },
      { who: "U", it: "Almeno porto una bottiglia di vino.", de: "Wenigstens bringe ich eine Flasche Wein mit." },
      { who: "P", name: "Chiara", it: "Perfetto! Ti aspettiamo verso le otto.", de: "Perfekt! Wir erwarten dich gegen acht." },
      { who: "U", it: "A sabato allora, non vedo l'ora!", de: "Bis Samstag dann, ich kann's kaum erwarten!" }
    ]
  },
  {
    id: "dlg-vicino", title: "Il vicino rumoroso", de: "Der laute Nachbar", emoji: "🔊", color: "#a0568a",
    level: "B2", theme: "casa", scene: "Du klingelst beim Nachbarn — höflich bleiben.",
    lines: [
      { who: "P", name: "Vicino", it: "Sì? Chi è? Ah, il vicino di sotto!", de: "Ja? Wer ist da? Ah, der Nachbar von unten!" },
      { who: "U", it: "Buonasera, scusi il disturbo a quest'ora.", de: "Guten Abend, entschuldigen Sie die Störung um diese Zeit." },
      { who: "P", name: "Vicino", it: "Mi dica pure, c'è qualche problema?", de: "Sagen Sie nur, gibt es ein Problem?" },
      { who: "U", it: "La musica è un po' alta, domani lavoro presto.", de: "Die Musik ist etwas laut, ich arbeite morgen früh." },
      { who: "P", name: "Vicino", it: "Oh, mi scusi! Abbasso subito il volume.", de: "Oh, Verzeihung! Ich mache sofort leiser." },
      { who: "U", it: "La ringrazio, è molto gentile.", de: "Ich danke Ihnen, das ist sehr freundlich." }
    ]
  },
  {
    id: "dlg-gelateria", title: "In gelateria", de: "In der Eisdiele", emoji: "🍦", color: "#d4922a",
    level: "A1", theme: "cibo", scene: "Die schwerste Entscheidung des Tages.",
    lines: [
      { who: "P", name: "Gelataio", it: "Ciao! Cono o coppetta?", de: "Hallo! Hörnchen oder Becher?" },
      { who: "U", it: "Un cono con due gusti, per favore.", de: "Ein Hörnchen mit zwei Sorten, bitte." },
      { who: "P", name: "Gelataio", it: "Quali gusti vuoi?", de: "Welche Sorten möchtest du?" },
      { who: "U", it: "Pistacchio e cioccolato, grazie.", de: "Pistazie und Schokolade, danke." },
      { who: "P", name: "Gelataio", it: "Panna sopra?", de: "Sahne obendrauf?" },
      { who: "U", it: "Sì, esagero! Metti la panna.", de: "Ja, ich übertreibe! Mach Sahne drauf." }
    ]
  }
  /* ===DIALOGHI_END=== */
];

/* =========================================================
   GENERATOR — baut LESSONS & STORY aus CORPUS + DIALOGHI.
   Deterministisch (keine Zufallswerte beim Laden).
   ========================================================= */
const VOCAB_MODES = ["learn", "listen", "quiz", "match", "build", "gap", "speak"];
const DIALOGUE_MODES = ["dialogue", "listen", "speak"];
const CHUNK_SIZE = 6;        // Wörter pro Lektion — klein & knackig
const RIPASSO_CAP = 36;      // max. Wiederholungs-Lektionen pro Level

/* Teilt eine Liste in Häppchen. Ein zu kleiner Rest (< 4) wird ins
   vorletzte Häppchen gemischt, damit keine Mini-Lektion entsteht. */
function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  if (out.length > 1 && out[out.length - 1].length < 4) {
    out[out.length - 2] = out[out.length - 2].concat(out.pop());
  }
  return out;
}

function buildLessons() {
  const out = [];

  /* 1) Vokabel-/Grammatik-Lektionen je Thema × Level, in Häppchen */
  CORPUS.forEach((theme) => {
    LEVELS.forEach((lvl) => {
      const words = theme.levels[lvl.code];
      if (!words || !words.length) return;
      const chunks = chunkArray(words, CHUNK_SIZE);
      chunks.forEach((ws, i) => {
        const multi = chunks.length > 1;
        out.push({
          id: `${theme.id}-${lvl.code}-${i + 1}`,
          kind: theme.grammar ? "grammar" : "vocab",
          theme: theme.id,
          area: theme.area,
          title: multi ? `${theme.title} · ${i + 1}` : theme.title,
          de: theme.de,
          emoji: theme.emoji,
          color: theme.color,
          level: lvl.n,
          levelCode: lvl.code,
          rule: theme.rule || null,
          sentences: !!theme.sentences,
          words: ws,
          modes: VOCAB_MODES.slice()
        });
      });
    });
  });

  /* 2) Sfida — themeninterne Challenge: alle Level eines Themas gemischt,
        eingeordnet auf dem höchsten Level des Themas (Schwierigkeits-Höhepunkt).
        Fortgeschrittene Themen (advanced) bekommen stattdessen Sfide pro Stufe
        (siehe 2b), damit B2/C1/C2 jeweils eigene Challenges haben. */
  CORPUS.forEach((theme) => {
    if (theme.grammar || theme.advanced) return;
    const all = [];
    const present = [];
    LEVELS.forEach((lvl) => {
      const ws = theme.levels[lvl.code];
      if (ws) { ws.forEach((w) => all.push(w)); present.push(lvl); }
    });
    if (present.length < 2 || all.length < 10) return;
    const top = present[present.length - 1];
    const chunks = chunkArray(all, CHUNK_SIZE + 2);
    chunks.forEach((ws, i) => {
      out.push({
        id: `sfida-${theme.id}-${i + 1}`,
        kind: "vocab",
        theme: theme.id,
        area: "Sfide",
        title: chunks.length > 1 ? `${theme.title} · Sfida ${i + 1}` : `${theme.title} · Sfida`,
        de: `${theme.de} – alles gemischt`,
        emoji: "🎯",
        color: theme.color,
        level: top.n,
        levelCode: top.code,
        sentences: !!theme.sentences,
        words: ws,
        modes: VOCAB_MODES.slice()
      });
    });
  });

  /* 2b) Sfida pro Stufe — für fortgeschrittene Themen (B2/C1/C2).
        Jede hohe Stufe bekommt eigene Challenge-Lektionen, statt alles
        auf dem Top-Level zu bündeln. */
  CORPUS.forEach((theme) => {
    if (!theme.advanced) return;
    LEVELS.forEach((lvl) => {
      const ws = theme.levels[lvl.code];
      if (!ws || ws.length < 10) return;
      const chunks = chunkArray(ws.slice(), CHUNK_SIZE + 2);
      chunks.forEach((c, i) => {
        out.push({
          id: `sfida-${theme.id}-${lvl.code}-${i + 1}`,
          kind: "vocab",
          theme: theme.id,
          area: "Sfide",
          title: chunks.length > 1 ? `${theme.title} · Sfida ${lvl.code} ${i + 1}` : `${theme.title} · Sfida ${lvl.code}`,
          de: `${theme.de} – Challenge ${lvl.code}`,
          emoji: "🎯",
          color: theme.color,
          level: lvl.n,
          levelCode: lvl.code,
          sentences: !!theme.sentences,
          words: c,
          modes: VOCAB_MODES.slice()
        });
      });
    });
  });

  /* 3) Dialog-Lektionen — words aus den Zeilen ableiten, damit
        Hören/Sprechen/Bausteine einheitlich funktionieren. */
  DIALOGHI.forEach((d) => {
    const lvl = LEVEL_BY_CODE[d.level] || LEVELS[0];
    const words = d.lines.map((ln) => ({
      it: ln.it, de: ln.de, emoji: d.emoji, ex: ln.it, exDe: ln.de
    }));
    out.push({
      id: `dlg-${d.id}`,
      kind: "dialogue",
      theme: d.theme,
      area: "Dialoge",
      title: d.title,
      de: d.de,
      emoji: d.emoji,
      color: d.color,
      level: lvl.n,
      levelCode: lvl.code,
      scene: d.scene,
      lines: d.lines,
      words: words,
      modes: DIALOGUE_MODES.slice()
    });
  });

  /* 4) Ripasso — gemischte Wiederholung je Level (themenübergreifend) */
  LEVELS.forEach((lvl) => {
    const woven = weave(lvl.code);
    if (woven.length < CHUNK_SIZE) return;
    const chunks = chunkArray(woven, CHUNK_SIZE);
    const maxRipasso = Math.min(chunks.length, RIPASSO_CAP);
    for (let i = 0; i < maxRipasso; i++) {
      if (chunks[i].length < 4) break;
      out.push({
        id: `ripasso-${lvl.code}-${i + 1}`,
        kind: "vocab",
        theme: "ripasso",
        area: "Ripasso",
        title: `Ripasso ${lvl.code} · ${i + 1}`,
        de: `Wiederholung ${lvl.de} ${i + 1}`,
        emoji: "🔁",
        color: lvl.color,
        level: lvl.n,
        levelCode: lvl.code,
        words: chunks[i],
        modes: VOCAB_MODES.slice()
      });
    }
  });

  return out;
}

/* Verzahnt alle Nicht-Grammatik-Wörter eines Levels themenübergreifend
   (Round-Robin), damit Ripasso-Lektionen bunt gemischt sind — deterministisch. */
function weave(code) {
  const lists = CORPUS.filter((t) => !t.grammar).map((t) => t.levels[code]).filter(Boolean);
  const woven = [];
  let added = true, idx = 0;
  while (added) {
    added = false;
    for (const list of lists) {
      if (idx < list.length) { woven.push(list[idx]); added = true; }
    }
    idx++;
  }
  return woven;
}

/* STORY — alle Lektionen nach Schwierigkeit geordnet (steigend). */
function buildStory(lessons) {
  return lessons
    .slice()
    .sort((a, b) => a.level - b.level || a.id.localeCompare(b.id))
    .map((l) => l.id);
}

const LESSONS = buildLessons();
const STORY = buildStory(LESSONS);

/* =========================================================
   ABZEICHEN
   ========================================================= */
const BADGES = [
  { id: "primo",      emoji: "🌱", name: "Primo Passo",  desc: "Erste Lektion abgeschlossen" },
  { id: "studioso",   emoji: "📚", name: "Studioso",     desc: "10 Lektionen abgeschlossen" },
  { id: "maestro",    emoji: "🎓", name: "Maestro",      desc: "50 Lektionen abgeschlossen" },
  { id: "perfetto",   emoji: "💯", name: "Perfetto!",    desc: "Ein Quiz fehlerfrei gemeistert" },
  { id: "fiamma",     emoji: "🔥", name: "In Fiamme",    desc: "3 Tage in Folge gelernt" },
  { id: "stelle",     emoji: "⭐", name: "Tre Stelle",   desc: "3 Sterne in einer Lektion" },
  { id: "ricco",      emoji: "🪙", name: "Ricco",        desc: "500 Soldi gesammelt" },
  { id: "poliglotta", emoji: "🦜", name: "Poliglotta",   desc: "200 Vokabeln gelernt" },
  { id: "oratore",    emoji: "🎤", name: "Oratore",      desc: "Eine Sprech-Übung gemeistert" },
  { id: "attore",     emoji: "🎭", name: "Attore",       desc: "Einen ganzen Dialog gespielt" },
  { id: "narratore",  emoji: "🗺️", name: "Narratore",    desc: "10 Story-Etappen geschafft" },
  { id: "scalatore",  emoji: "🏔️", name: "Scalatore",    desc: "Eine B-Level-Lektion abgeschlossen" }
];

/* =========================================================
   KONJUGATIONEN — Verben in 6 Zeiten × 6 Personen (IT + DE)
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
  },
  {
    id: "dovere", inf: "Dovere", infDe: "müssen", emoji: "⚠️", color: "#a8472b",
    forms: {
      presente:     ["devo", "devi", "deve", "dobbiamo", "dovete", "devono"],
      passato:      ["ho dovuto", "hai dovuto", "ha dovuto", "abbiamo dovuto", "avete dovuto", "hanno dovuto"],
      imperfetto:   ["dovevo", "dovevi", "doveva", "dovevamo", "dovevate", "dovevano"],
      futuro:       ["dovrò", "dovrai", "dovrà", "dovremo", "dovrete", "dovranno"],
      condizionale: ["dovrei", "dovresti", "dovrebbe", "dovremmo", "dovreste", "dovrebbero"],
      congiuntivo:  ["debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"]
    },
    formsDe: {
      presente:     ["ich muss", "du musst", "er/sie muss", "wir müssen", "ihr müsst", "sie müssen"],
      passato:      ["ich habe gemusst", "du hast gemusst", "er/sie hat gemusst", "wir haben gemusst", "ihr habt gemusst", "sie haben gemusst"],
      imperfetto:   ["ich musste", "du musstest", "er/sie musste", "wir mussten", "ihr musstet", "sie mussten"],
      futuro:       ["ich werde müssen", "du wirst müssen", "er/sie wird müssen", "wir werden müssen", "ihr werdet müssen", "sie werden müssen"],
      condizionale: ["ich müsste", "du müsstest", "er/sie müsste", "wir müssten", "ihr müsstet", "sie müssten"],
      congiuntivo:  ["(dass) ich muss", "(dass) du musst", "(dass) er/sie muss", "(dass) wir müssen", "(dass) ihr müsst", "(dass) sie müssen"]
    }
  },
  {
    id: "sapere", inf: "Sapere", infDe: "wissen / können", emoji: "🧠", color: "#2e7d6f",
    forms: {
      presente:     ["so", "sai", "sa", "sappiamo", "sapete", "sanno"],
      passato:      ["ho saputo", "hai saputo", "ha saputo", "abbiamo saputo", "avete saputo", "hanno saputo"],
      imperfetto:   ["sapevo", "sapevi", "sapeva", "sapevamo", "sapevate", "sapevano"],
      futuro:       ["saprò", "saprai", "saprà", "sapremo", "saprete", "sapranno"],
      condizionale: ["saprei", "sapresti", "saprebbe", "sapremmo", "sapreste", "saprebbero"],
      congiuntivo:  ["sappia", "sappia", "sappia", "sappiamo", "sappiate", "sappiano"]
    },
    formsDe: {
      presente:     ["ich weiß", "du weißt", "er/sie weiß", "wir wissen", "ihr wisst", "sie wissen"],
      passato:      ["ich habe gewusst", "du hast gewusst", "er/sie hat gewusst", "wir haben gewusst", "ihr habt gewusst", "sie haben gewusst"],
      imperfetto:   ["ich wusste", "du wusstest", "er/sie wusste", "wir wussten", "ihr wusstet", "sie wussten"],
      futuro:       ["ich werde wissen", "du wirst wissen", "er/sie wird wissen", "wir werden wissen", "ihr werdet wissen", "sie werden wissen"],
      condizionale: ["ich wüsste", "du wüsstest", "er/sie wüsste", "wir wüssten", "ihr wüsstet", "sie wüssten"],
      congiuntivo:  ["(dass) ich weiß", "(dass) du weißt", "(dass) er/sie weiß", "(dass) wir wissen", "(dass) ihr wisst", "(dass) sie wissen"]
    }
  },
  {
    id: "dire", inf: "Dire", infDe: "sagen", emoji: "🗣️", color: "#3f7d8a",
    forms: {
      presente:     ["dico", "dici", "dice", "diciamo", "dite", "dicono"],
      passato:      ["ho detto", "hai detto", "ha detto", "abbiamo detto", "avete detto", "hanno detto"],
      imperfetto:   ["dicevo", "dicevi", "diceva", "dicevamo", "dicevate", "dicevano"],
      futuro:       ["dirò", "dirai", "dirà", "diremo", "direte", "diranno"],
      condizionale: ["direi", "diresti", "direbbe", "diremmo", "direste", "direbbero"],
      congiuntivo:  ["dica", "dica", "dica", "diciamo", "diciate", "dicano"]
    },
    formsDe: {
      presente:     ["ich sage", "du sagst", "er/sie sagt", "wir sagen", "ihr sagt", "sie sagen"],
      passato:      ["ich habe gesagt", "du hast gesagt", "er/sie hat gesagt", "wir haben gesagt", "ihr habt gesagt", "sie haben gesagt"],
      imperfetto:   ["ich sagte", "du sagtest", "er/sie sagte", "wir sagten", "ihr sagtet", "sie sagten"],
      futuro:       ["ich werde sagen", "du wirst sagen", "er/sie wird sagen", "wir werden sagen", "ihr werdet sagen", "sie werden sagen"],
      condizionale: ["ich würde sagen", "du würdest sagen", "er/sie würde sagen", "wir würden sagen", "ihr würdet sagen", "sie würden sagen"],
      congiuntivo:  ["(dass) ich sage", "(dass) du sagst", "(dass) er/sie sagt", "(dass) wir sagen", "(dass) ihr sagt", "(dass) sie sagen"]
    }
  },
  {
    id: "vedere", inf: "Vedere", infDe: "sehen", emoji: "👁️", color: "#5a7d9b",
    forms: {
      presente:     ["vedo", "vedi", "vede", "vediamo", "vedete", "vedono"],
      passato:      ["ho visto", "hai visto", "ha visto", "abbiamo visto", "avete visto", "hanno visto"],
      imperfetto:   ["vedevo", "vedevi", "vedeva", "vedevamo", "vedevate", "vedevano"],
      futuro:       ["vedrò", "vedrai", "vedrà", "vedremo", "vedrete", "vedranno"],
      condizionale: ["vedrei", "vedresti", "vedrebbe", "vedremmo", "vedreste", "vedrebbero"],
      congiuntivo:  ["veda", "veda", "veda", "vediamo", "vediate", "vedano"]
    },
    formsDe: {
      presente:     ["ich sehe", "du siehst", "er/sie sieht", "wir sehen", "ihr seht", "sie sehen"],
      passato:      ["ich habe gesehen", "du hast gesehen", "er/sie hat gesehen", "wir haben gesehen", "ihr habt gesehen", "sie haben gesehen"],
      imperfetto:   ["ich sah", "du sahst", "er/sie sah", "wir sahen", "ihr saht", "sie sahen"],
      futuro:       ["ich werde sehen", "du wirst sehen", "er/sie wird sehen", "wir werden sehen", "ihr werdet sehen", "sie werden sehen"],
      condizionale: ["ich würde sehen", "du würdest sehen", "er/sie würde sehen", "wir würden sehen", "ihr würdet sehen", "sie würden sehen"],
      congiuntivo:  ["(dass) ich sehe", "(dass) du siehst", "(dass) er/sie sieht", "(dass) wir sehen", "(dass) ihr seht", "(dass) sie sehen"]
    }
  },
  {
    id: "dare", inf: "Dare", infDe: "geben", emoji: "🎁", color: "#d4922a",
    forms: {
      presente:     ["do", "dai", "dà", "diamo", "date", "danno"],
      passato:      ["ho dato", "hai dato", "ha dato", "abbiamo dato", "avete dato", "hanno dato"],
      imperfetto:   ["davo", "davi", "dava", "davamo", "davate", "davano"],
      futuro:       ["darò", "darai", "darà", "daremo", "darete", "daranno"],
      condizionale: ["darei", "daresti", "darebbe", "daremmo", "dareste", "darebbero"],
      congiuntivo:  ["dia", "dia", "dia", "diamo", "diate", "diano"]
    },
    formsDe: {
      presente:     ["ich gebe", "du gibst", "er/sie gibt", "wir geben", "ihr gebt", "sie geben"],
      passato:      ["ich habe gegeben", "du hast gegeben", "er/sie hat gegeben", "wir haben gegeben", "ihr habt gegeben", "sie haben gegeben"],
      imperfetto:   ["ich gab", "du gabst", "er/sie gab", "wir gaben", "ihr gabt", "sie gaben"],
      futuro:       ["ich werde geben", "du wirst geben", "er/sie wird geben", "wir werden geben", "ihr werdet geben", "sie werden geben"],
      condizionale: ["ich würde geben", "du würdest geben", "er/sie würde geben", "wir würden geben", "ihr würdet geben", "sie würden geben"],
      congiuntivo:  ["(dass) ich gebe", "(dass) du gibst", "(dass) er/sie gibt", "(dass) wir geben", "(dass) ihr gebt", "(dass) sie geben"]
    }
  },
  {
    id: "stare", inf: "Stare", infDe: "bleiben / sich befinden", emoji: "🧘", color: "#6b7a3f",
    forms: {
      presente:     ["sto", "stai", "sta", "stiamo", "state", "stanno"],
      passato:      ["sono stato", "sei stato", "è stato", "siamo stati", "siete stati", "sono stati"],
      imperfetto:   ["stavo", "stavi", "stava", "stavamo", "stavate", "stavano"],
      futuro:       ["starò", "starai", "starà", "staremo", "starete", "staranno"],
      condizionale: ["starei", "staresti", "starebbe", "staremmo", "stareste", "starebbero"],
      congiuntivo:  ["stia", "stia", "stia", "stiamo", "stiate", "stiano"]
    },
    formsDe: {
      presente:     ["ich bleibe", "du bleibst", "er/sie bleibt", "wir bleiben", "ihr bleibt", "sie bleiben"],
      passato:      ["ich bin geblieben", "du bist geblieben", "er/sie ist geblieben", "wir sind geblieben", "ihr seid geblieben", "sie sind geblieben"],
      imperfetto:   ["ich blieb", "du bliebst", "er/sie blieb", "wir blieben", "ihr bliebt", "sie blieben"],
      futuro:       ["ich werde bleiben", "du wirst bleiben", "er/sie wird bleiben", "wir werden bleiben", "ihr werdet bleiben", "sie werden bleiben"],
      condizionale: ["ich würde bleiben", "du würdest bleiben", "er/sie würde bleiben", "wir würden bleiben", "ihr würdet bleiben", "sie würden bleiben"],
      congiuntivo:  ["(dass) ich bleibe", "(dass) du bleibst", "(dass) er/sie bleibt", "(dass) wir bleiben", "(dass) ihr bleibt", "(dass) sie bleiben"]
    }
  },
  {
    id: "dormire", inf: "Dormire", infDe: "schlafen", emoji: "😴", color: "#7a5ca0",
    forms: {
      presente:     ["dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"],
      passato:      ["ho dormito", "hai dormito", "ha dormito", "abbiamo dormito", "avete dormito", "hanno dormito"],
      imperfetto:   ["dormivo", "dormivi", "dormiva", "dormivamo", "dormivate", "dormivano"],
      futuro:       ["dormirò", "dormirai", "dormirà", "dormiremo", "dormirete", "dormiranno"],
      condizionale: ["dormirei", "dormiresti", "dormirebbe", "dormiremmo", "dormireste", "dormirebbero"],
      congiuntivo:  ["dorma", "dorma", "dorma", "dormiamo", "dormiate", "dormano"]
    },
    formsDe: {
      presente:     ["ich schlafe", "du schläfst", "er/sie schläft", "wir schlafen", "ihr schlaft", "sie schlafen"],
      passato:      ["ich habe geschlafen", "du hast geschlafen", "er/sie hat geschlafen", "wir haben geschlafen", "ihr habt geschlafen", "sie haben geschlafen"],
      imperfetto:   ["ich schlief", "du schliefst", "er/sie schlief", "wir schliefen", "ihr schlieft", "sie schliefen"],
      futuro:       ["ich werde schlafen", "du wirst schlafen", "er/sie wird schlafen", "wir werden schlafen", "ihr werdet schlafen", "sie werden schlafen"],
      condizionale: ["ich würde schlafen", "du würdest schlafen", "er/sie würde schlafen", "wir würden schlafen", "ihr würdet schlafen", "sie würden schlafen"],
      congiuntivo:  ["(dass) ich schlafe", "(dass) du schläfst", "(dass) er/sie schläft", "(dass) wir schlafen", "(dass) ihr schlaft", "(dass) sie schlafen"]
    }
  },
  {
    id: "finire", inf: "Finire", infDe: "beenden / aufhören", emoji: "🏁", color: "#8a6d3f",
    forms: {
      presente:     ["finisco", "finisci", "finisce", "finiamo", "finite", "finiscono"],
      passato:      ["ho finito", "hai finito", "ha finito", "abbiamo finito", "avete finito", "hanno finito"],
      imperfetto:   ["finivo", "finivi", "finiva", "finivamo", "finivate", "finivano"],
      futuro:       ["finirò", "finirai", "finirà", "finiremo", "finirete", "finiranno"],
      condizionale: ["finirei", "finiresti", "finirebbe", "finiremmo", "finireste", "finirebbero"],
      congiuntivo:  ["finisca", "finisca", "finisca", "finiamo", "finiate", "finiscano"]
    },
    formsDe: {
      presente:     ["ich beende", "du beendest", "er/sie beendet", "wir beenden", "ihr beendet", "sie beenden"],
      passato:      ["ich habe beendet", "du hast beendet", "er/sie hat beendet", "wir haben beendet", "ihr habt beendet", "sie haben beendet"],
      imperfetto:   ["ich beendete", "du beendetest", "er/sie beendete", "wir beendeten", "ihr beendetet", "sie beendeten"],
      futuro:       ["ich werde beenden", "du wirst beenden", "er/sie wird beenden", "wir werden beenden", "ihr werdet beenden", "sie werden beenden"],
      condizionale: ["ich würde beenden", "du würdest beenden", "er/sie würde beenden", "wir würden beenden", "ihr würdet beenden", "sie würden beenden"],
      congiuntivo:  ["(dass) ich beende", "(dass) du beendest", "(dass) er/sie beendet", "(dass) wir beenden", "(dass) ihr beendet", "(dass) sie beenden"]
    }
  },
  {
    id: "prendere", inf: "Prendere", infDe: "nehmen", emoji: "✊", color: "#b8442e",
    forms: {
      presente:     ["prendo", "prendi", "prende", "prendiamo", "prendete", "prendono"],
      passato:      ["ho preso", "hai preso", "ha preso", "abbiamo preso", "avete preso", "hanno preso"],
      imperfetto:   ["prendevo", "prendevi", "prendeva", "prendevamo", "prendevate", "prendevano"],
      futuro:       ["prenderò", "prenderai", "prenderà", "prenderemo", "prenderete", "prenderanno"],
      condizionale: ["prenderei", "prenderesti", "prenderebbe", "prenderemmo", "prendereste", "prenderebbero"],
      congiuntivo:  ["prenda", "prenda", "prenda", "prendiamo", "prendiate", "prendano"]
    },
    formsDe: {
      presente:     ["ich nehme", "du nimmst", "er/sie nimmt", "wir nehmen", "ihr nehmt", "sie nehmen"],
      passato:      ["ich habe genommen", "du hast genommen", "er/sie hat genommen", "wir haben genommen", "ihr habt genommen", "sie haben genommen"],
      imperfetto:   ["ich nahm", "du nahmst", "er/sie nahm", "wir nahmen", "ihr nahmt", "sie nahmen"],
      futuro:       ["ich werde nehmen", "du wirst nehmen", "er/sie wird nehmen", "wir werden nehmen", "ihr werdet nehmen", "sie werden nehmen"],
      condizionale: ["ich würde nehmen", "du würdest nehmen", "er/sie würde nehmen", "wir würden nehmen", "ihr würdet nehmen", "sie würden nehmen"],
      congiuntivo:  ["(dass) ich nehme", "(dass) du nimmst", "(dass) er/sie nimmt", "(dass) wir nehmen", "(dass) ihr nehmt", "(dass) sie nehmen"]
    }
  },
  {
    id: "uscire", inf: "Uscire", infDe: "hinausgehen / ausgehen", emoji: "🚪", color: "#4a8a8a",
    forms: {
      presente:     ["esco", "esci", "esce", "usciamo", "uscite", "escono"],
      passato:      ["sono uscito", "sei uscito", "è uscito", "siamo usciti", "siete usciti", "sono usciti"],
      imperfetto:   ["uscivo", "uscivi", "usciva", "uscivamo", "uscivate", "uscivano"],
      futuro:       ["uscirò", "uscirai", "uscirà", "usciremo", "uscirete", "usciranno"],
      condizionale: ["uscirei", "usciresti", "uscirebbe", "usciremmo", "uscireste", "uscirebbero"],
      congiuntivo:  ["esca", "esca", "esca", "usciamo", "usciate", "escano"]
    },
    formsDe: {
      presente:     ["ich gehe aus", "du gehst aus", "er/sie geht aus", "wir gehen aus", "ihr geht aus", "sie gehen aus"],
      passato:      ["ich bin ausgegangen", "du bist ausgegangen", "er/sie ist ausgegangen", "wir sind ausgegangen", "ihr seid ausgegangen", "sie sind ausgegangen"],
      imperfetto:   ["ich ging aus", "du gingst aus", "er/sie ging aus", "wir gingen aus", "ihr gingt aus", "sie gingen aus"],
      futuro:       ["ich werde ausgehen", "du wirst ausgehen", "er/sie wird ausgehen", "wir werden ausgehen", "ihr werdet ausgehen", "sie werden ausgehen"],
      condizionale: ["ich würde ausgehen", "du würdest ausgehen", "er/sie würde ausgehen", "wir würden ausgehen", "ihr würdet ausgehen", "sie würden ausgehen"],
      congiuntivo:  ["(dass) ich ausgehe", "(dass) du ausgehst", "(dass) er/sie ausgeht", "(dass) wir ausgehen", "(dass) ihr ausgeht", "(dass) sie ausgehen"]
    }
  }
];
