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
        eingeordnet auf dem höchsten Level des Themas (Schwierigkeits-Höhepunkt). */
  CORPUS.forEach((theme) => {
    if (theme.grammar) return;
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
