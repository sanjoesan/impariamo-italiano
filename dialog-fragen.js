/* =========================================================
   Impariamo! — Verständnisfragen zu den Dialogen (Modus „📰 Verstehen")
   Je Kurs-Sprache und Dialog-ID 3 Fragen. `line` = Index der Dialogzeile,
   die die Antwort belegt (wird nach dem Antworten gezeigt).
   Lädt VOR data.js; buildLessons() macht daraus lesson.drills.understand.
   ========================================================= */

/* Fragen → Auswahl-Aufgaben (ChoiceItem, siehe grammatik.js) */
function comprehensionDrill(lines, questions) {
  return questions.map((x) => ({
    ask: x.q,
    answer: x.a,
    options: [x.a, ...x.wrong],
    explain: lines[x.line] ? `„${lines[x.line].it}" – ${lines[x.line].de}` : undefined
  }));
}

const DIALOG_FRAGEN = {
  it: {
    "dlg-bar-caffe": [
      { q: "Was bestellst du zu trinken?", a: "Einen Cappuccino", wrong: ["Einen Espresso", "Einen Tee", "Ein Glas Wasser"], line: 1 },
      { q: "Was isst du dazu?", a: "Ein Hörnchen mit Creme", wrong: ["Ein Stück Pizza", "Ein Hörnchen mit Marmelade", "Nichts"], line: 3 },
      { q: "Wie viel kostet alles zusammen?", a: "2,50 Euro", wrong: ["1,50 Euro", "2,15 Euro", "5 Euro"], line: 4 }
    ],
    "dlg-saluti-strada": [
      { q: "Wie geht es dir?", a: "Gut", wrong: ["Schlecht", "Du bist krank", "Du bist sehr müde"], line: 1 },
      { q: "Wie viel Zeit hast du?", a: "Nur zehn Minuten", wrong: ["Eine Stunde", "Den ganzen Nachmittag", "Gar keine"], line: 3 },
      { q: "Wer lädt diesmal zum Kaffee ein?", a: "Du", wrong: ["Giulia", "Ihr zahlt getrennt", "Niemand – ihr geht nicht"], line: 5 }
    ],
    "dlg-presentarsi-festa": [
      { q: "Mit wem bist du auf der Party?", a: "Mit Anna", wrong: ["Mit Davide", "Allein", "Mit Giulia"], line: 1 },
      { q: "Woher kommst du?", a: "Aus Deutschland", wrong: ["Aus Österreich", "Aus Rom", "Aus der Schweiz"], line: 3 },
      { q: "Seit wann bist du in Rom?", a: "Seit zwei Jahren", wrong: ["Seit zwei Monaten", "Seit zehn Jahren", "Seit einer Woche"], line: 5 }
    ],
    "dlg-ristorante-ordinare": [
      { q: "Was nimmst du als ersten Gang?", a: "Lasagne", wrong: ["Spaghetti", "Risotto", "Pizza"], line: 1 },
      { q: "Was trinkst du?", a: "Stilles Wasser", wrong: ["Sprudelwasser", "Rotwein", "Bier"], line: 3 },
      { q: "Was nimmst du zum Nachtisch?", a: "Tiramisù", wrong: ["Eis", "Panna cotta", "Keinen Nachtisch"], line: 5 }
    ],
    "dlg-albergo": [
      { q: "Was für ein Zimmer ist reserviert?", a: "Ein Doppelzimmer", wrong: ["Ein Einzelzimmer", "Eine Suite", "Ein Dreibettzimmer"], line: 1 },
      { q: "Auf welchen Namen läuft die Reservierung?", a: "Bianchi", wrong: ["Rossi", "Neri", "Verdi"], line: 1 },
      { q: "Wann gibt es Frühstück?", a: "Von sieben bis zehn", wrong: ["Von sechs bis neun", "Von acht bis elf", "Gar nicht – es ist nicht inklusive"], line: 4 }
    ],
    "dlg-dottore": [
      { q: "Welche Beschwerden hast du?", a: "Halsschmerzen und etwas Fieber", wrong: ["Bauchschmerzen", "Kopfschmerzen und Husten", "Rückenschmerzen"], line: 1 },
      { q: "Seit wann geht es dir so?", a: "Seit drei Tagen", wrong: ["Seit gestern", "Seit einer Woche", "Seit einem Monat"], line: 3 },
      { q: "Was verschreibt die Ärztin?", a: "Einen Sirup und Ruhe", wrong: ["Tabletten", "Eine Spritze", "Gar nichts"], line: 4 }
    ],
    "dlg-mercato": [
      { q: "Was kosten die Tomaten zuerst?", a: "Drei Euro das Kilo", wrong: ["Zwei Euro das Kilo", "Fünf Euro das Kilo", "Drei Euro das Stück"], line: 0 },
      { q: "Was zahlst du am Ende?", a: "Fünf Euro für zwei Kilo", wrong: ["Sechs Euro für zwei Kilo", "Drei Euro für ein Kilo", "Vier Euro für zwei Kilo"], line: 4 },
      { q: "Was soll der Verkäufer dazulegen?", a: "Etwas Basilikum", wrong: ["Etwas Petersilie", "Eine Zwiebel", "Noch eine Tomate"], line: 5 }
    ],
    "dlg-appuntamento": [
      { q: "Wovon träumst du?", a: "Vom Reisen", wrong: ["Vom Kochen", "Von einem neuen Job", "Von einem Haus am Meer"], line: 1 },
      { q: "Kannst du kochen?", a: "Nein – die Pizza bestellst du immer", wrong: ["Ja, sehr gut", "Nur Pasta", "Ja, am liebsten Pizza"], line: 3 },
      { q: "Was bietest du Sofia am Ende an?", a: "Noch ein Glas Wein", wrong: ["Ein Eis", "Einen Kaffee", "Ein Taxi nach Hause"], line: 5 }
    ],
    "dlg-litigio": [
      { q: "Worum geht es im Streit?", a: "Um das ungespülte Geschirr", wrong: ["Um die Miete", "Um laute Musik", "Um den Einkauf"], line: 0 },
      { q: "Seit wann versprichst du schon zu spülen?", a: "Seit drei Tagen", wrong: ["Seit heute Morgen", "Seit einer Woche", "Seit gestern"], line: 2 },
      { q: "Was versprichst du zusätzlich?", a: "Einzukaufen und heute Abend zu kochen", wrong: ["Die Wohnung zu putzen", "Die Miete zu zahlen", "Auszuziehen"], line: 3 }
    ],
    "dlg-meccanico": [
      { q: "Wann macht das Auto ein Geräusch?", a: "Beim Bremsen", wrong: ["Beim Starten", "In Kurven", "Beim Schalten"], line: 1 },
      { q: "Was könnte kaputt sein?", a: "Die Bremsen", wrong: ["Der Motor", "Die Reifen", "Die Batterie"], line: 2 },
      { q: "Wie viel wird es ungefähr kosten?", a: "Etwa 200 Euro", wrong: ["Etwa 20 Euro", "Etwa 2.000 Euro", "Nichts"], line: 4 }
    ],
    "dlg-aeroporto": [
      { q: "Welchen Platz möchtest du?", a: "Einen Fensterplatz", wrong: ["Einen Gangplatz", "Einen Platz in der ersten Reihe", "Einen Platz am Notausgang"], line: 1 },
      { q: "Was gibst du als Gepäck auf?", a: "Nur einen Koffer", wrong: ["Zwei Koffer", "Gar nichts", "Einen Rucksack"], line: 3 },
      { q: "Wann und wo ist das Boarding?", a: "Um zehn, Gate B12", wrong: ["Um zwölf, Gate B10", "Um zehn, Gate A12", "Um neun, Gate B12"], line: 4 }
    ],
    "dlg-telefono": [
      { q: "Mit wem möchtest du sprechen?", a: "Mit Herrn Rossi", wrong: ["Mit der Sekretärin", "Mit Marco Neri", "Mit Frau Bianchi"], line: 1 },
      { q: "Warum geht das gerade nicht?", a: "Er ist in einer Besprechung", wrong: ["Er ist krank", "Er ist im Urlaub", "Er ist schon nach Hause gegangen"], line: 2 },
      { q: "Was machst du am Ende?", a: "Du rufst am Nachmittag noch mal an", wrong: ["Du schreibst eine E-Mail", "Du kommst persönlich vorbei", "Du wartest am Telefon"], line: 5 }
    ],
    "dlg-colloquio": [
      { q: "Welche Stärken nennst du?", a: "Genau, neugierig und teamfähig", wrong: ["Schnell, laut und kreativ", "Pünktlich und ruhig", "Mehrsprachig und flexibel"], line: 1 },
      { q: "Welche Schwäche gibst du zu?", a: "Du bist manchmal zu perfektionistisch", wrong: ["Du bist oft unpünktlich", "Du arbeitest nicht gern im Team", "Du bist ungeduldig"], line: 3 },
      { q: "Warum willst du dort arbeiten?", a: "Du glaubst an die Projekte und willst dich weiterentwickeln", wrong: ["Wegen des Gehalts", "Weil es nah an deiner Wohnung ist", "Weil ein Freund dort arbeitet"], line: 5 }
    ],
    "dlg-emergenza": [
      { q: "Was ist passiert?", a: "Ein Herr ist gestürzt und kann nicht aufstehen", wrong: ["Ein Autounfall", "Ein Brand in einer Wohnung", "Ein Kind ist verschwunden"], line: 1 },
      { q: "Wie geht es dem Mann?", a: "Er ist bei Bewusstsein, aber sein Bein tut weh", wrong: ["Er ist bewusstlos", "Er atmet nicht mehr", "Er hat starke Kopfschmerzen"], line: 3 },
      { q: "Wo seid ihr?", a: "Via Garibaldi, vor Nummer zehn", wrong: ["Via Roma, Nummer zwölf", "Piazza Garibaldi", "Via Garibaldi, Nummer zwei"], line: 5 }
    ],
    "dlg-barbiere": [
      { q: "Wie sollen die Haare geschnitten werden?", a: "Kurz an den Seiten, oben nicht zu kurz", wrong: ["Überall ganz kurz", "Nur die Spitzen", "Oben kurz, an den Seiten lang"], line: 1 },
      { q: "Was passiert mit dem Bart?", a: "In Form bringen, aber ziemlich lang lassen", wrong: ["Ganz abrasieren", "Gar nichts", "Ganz kurz schneiden"], line: 3 },
      { q: "Wie findest du das Ergebnis?", a: "Sehr gut – genau so wolltest du es", wrong: ["Zu kurz", "Es geht so", "Du willst noch etwas ändern"], line: 5 }
    ],
    "dlg-reclamo": [
      { q: "Was stimmt mit dem Essen nicht?", a: "Die Pasta ist kalt", wrong: ["Die Pasta ist zu salzig", "Es ist das falsche Gericht", "Die Pizza ist verbrannt"], line: 1 },
      { q: "Was macht der Kellner?", a: "Er lässt die Pasta sofort neu machen", wrong: ["Er bringt die Rechnung", "Er holt den Koch", "Er gibt dir Rabatt"], line: 2 },
      { q: "Was geht zur Entschuldigung aufs Haus?", a: "Der Nachtisch", wrong: ["Der Wein", "Der Kaffee", "Das ganze Essen"], line: 4 }
    ],
    "dlg-treno-perso": [
      { q: "Welchen Zug hast du verpasst?", a: "Den Neun-Uhr-Zug nach Florenz", wrong: ["Den Zehn-Uhr-Zug nach Florenz", "Den Neun-Uhr-Zug nach Rom", "Den Neun-Uhr-Zug nach Mailand"], line: 1 },
      { q: "Wann fährt der nächste Zug?", a: "Um zehn", wrong: ["Um halb zehn", "Um elf", "Erst morgen"], line: 2 },
      { q: "Was musst du bezahlen?", a: "Nur die Differenz", wrong: ["Ein ganz neues Ticket", "Gar nichts", "Eine Strafe"], line: 4 }
    ],
    "dlg-invito": [
      { q: "Wann ist das Abendessen?", a: "Am Samstag gegen acht", wrong: ["Am Freitag gegen acht", "Am Samstag gegen sechs", "Am Sonntagmittag"], line: 4 },
      { q: "Was sollst du laut Chiara mitbringen?", a: "Nur deine Gesellschaft", wrong: ["Einen Nachtisch", "Brot", "Einen Salat"], line: 2 },
      { q: "Was bringst du trotzdem mit?", a: "Eine Flasche Wein", wrong: ["Blumen", "Ein Tiramisù", "Pralinen"], line: 3 }
    ],
    "dlg-vicino": [
      { q: "Warum klingelst du beim Nachbarn?", a: "Die Musik ist zu laut", wrong: ["Sein Hund bellt", "Er hat dein Paket", "Du brauchst Salz"], line: 3 },
      { q: "Warum stört dich das gerade heute?", a: "Du arbeitest morgen früh", wrong: ["Du hast Kopfschmerzen", "Dein Baby schläft", "Du lernst für eine Prüfung"], line: 3 },
      { q: "Wie reagiert der Nachbar?", a: "Er entschuldigt sich und macht sofort leiser", wrong: ["Er wird wütend", "Er lädt dich zur Party ein", "Er schließt einfach die Tür"], line: 4 }
    ],
    "dlg-gelateria": [
      { q: "Wie möchtest du dein Eis?", a: "Im Hörnchen mit zwei Sorten", wrong: ["Im Becher mit zwei Sorten", "Im Hörnchen mit drei Sorten", "Im Becher mit einer Sorte"], line: 1 },
      { q: "Welche Sorten wählst du?", a: "Pistazie und Schokolade", wrong: ["Vanille und Erdbeere", "Zitrone und Schokolade", "Pistazie und Haselnuss"], line: 3 },
      { q: "Möchtest du Sahne obendrauf?", a: "Ja", wrong: ["Nein", "Nur ein bisschen daneben", "Lieber Schokoladensoße"], line: 5 }
    ]
  }
};
