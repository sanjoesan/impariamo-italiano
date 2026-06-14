# 🇮🇹 Impariamo! — Spielerisch Italienisch lernen

Eine liebevoll gestaltete Lernplattform im nostalgischen **„La Dolce Vita"**-Stil.
Lerne Italienisch mit Sprachausgabe, **Spracherkennung**, Dialogen, Grammatik und einem Hauch toskanischer Sonne. ☀️

**▶︎ Live:** https://sanjoesan.github.io/impariamo-italiano/

![Italienisch lernen](favicon.svg)

## ✨ Funktionen

- **🎚️ Sechs Schwierigkeitsgrade (CEFR A1–C2)** – jede Lektion ist klar eingestuft,
  von „Principiante" 🌱 bis „Padronanza" 👑. Auf der Startseite **nach Stufe und nach
  Abschnitt (Lebensbereich) filterbar**. Auch die Oberstufen **B2, C1 und C2 haben
  jetzt jeweils 160+ Lektionen** – inkl. fortgeschrittenem Wortschatz (Wirtschaft,
  Politik, Wissenschaft, Recht, Kunst, Redewendungen, formelle Sprache …).
  **Jeder Lebensbereich reicht bis C2** – auch Alltag, Beruf, Gesundheit, Natur & Co.
- **📚 800+ Lektionen aus 70 Themen** über **alle Lebensbereiche** – Begrüßung, Essen,
  Restaurant, Reise, Verkehr, Arbeit, Schule, Gesundheit, Mode, Shopping, Geld, Technik,
  Tiere, Natur, Sport, Freizeit, Musik, Gefühle, Charakter, Wohnen, Küche, Feste,
  Behörden, Dating, Internet, Berufe, Tagesablauf, Flughafen, **Wirtschaft & Finanzen,
  Politik & Gesellschaft, Wissenschaft & Umwelt, Recht, Kunst & Kultur, Modi di Dire** u. v. m.
  Über **4000 Übungs-Items** mit Beispielsätzen – bewusst auch mal **witzig**.
- **🔤 Grammatik kommt nicht zu kurz:** eigene Grammatik-Lektionen mit Merkregel
  (Artikel, Plural, Präpositionen, verschmolzene Präpositionen, Pronomen, Possessive,
  Steigerung, c'è/ci sono, questo/quello, Passato vs. Imperfetto, Verneinung, Fragewörter).
- **🎭 Ganze Dialoge** (20 Szenen: Bar, Restaurant, Arzt, Hotel, Flughafen, Werkstatt,
  erstes Date, Paar-Streit, Notruf, Bewerbung …). Antworten werden **aus Bausteinen
  ausgewählt** statt getippt – wenig Tipparbeit, viel Sprechgefühl.
- **🔀 Konjugations-Trainer** („Coniugazioni") – **19 Verben** durch alle 6 Personen
  in **6 Zeiten/Modi** (Presente, Passato Prossimo, Imperfetto, Futuro, Condizionale, Congiuntivo).
- **🗺️ Storia – der Lernpfad:** ein Weg quer durch alle Themen, dessen **Schwierigkeit
  Schritt für Schritt steigt** (A1 → C2). Das **Start-Niveau ist frei wählbar – generell
  und jederzeit nachträglich**; der Pfad beginnt dann dort. Nach jeder Lektion geht's per
  **„Nächste Lektion"** direkt weiter. Der Fortschritt wird gespeichert.
- **🎲 Zufalls-Lektion mit Schwierigkeitswahl** – „Wie schwer darf's sein?".
- **🎮 Bis zu sieben Spielmodi pro Lektion:**
  - **📖 Lernen** – Karteikarten zum Umdrehen, mit automatischer Aussprache (Grammatik-Regel inklusive)
  - **🎧 Hören** – Diktat: du hörst und tippst (tolerant bei Akzenten & Satzzeichen)
  - **🎯 Quiz** – Multiple-Choice mit Sofort-Feedback
  - **🧩 Zuordnen** – Italienisch ↔ Deutsch verbinden
  - **✍️ Satzbau** – ganze Sätze aus **Wort-Bausteinen** zusammensetzen (kein Tippen)
  - **✏️ Lücke** – das fehlende Wort einsetzen (per Klick)
  - **🎤 Sprechen** – mit **Mikrofon-Knopf**; die Spracherkennung läuft auf **Italienisch (`it-IT`)**,
    nicht auf Deutsch, und bewertet deine Aussprache.
- **🔊 Sprachausgabe** – natürliche italienische Aussprache über die Web Speech API;
  beste Stimme automatisch, Stimme & Tempo einstellbar.
- **🌙 Tag-/Nacht-Modus** („Notte Romana"), **🔔 Soundeffekte**, **🏆 XP, Level, Serie (🔥),
  Münzen, Sterne, Abzeichen** und Konfetti.
- **💾 Fortschritt** wird lokal gespeichert (kein Konto). **📱 Responsiv.**

## 🎤 Mikrofon & Spracherkennung

Der Modus **Sprechen** nutzt die Web Speech **Recognition** API. Wichtig: Die Erkennung
ist fest auf **`it-IT`** gesetzt, damit dein Italienisch (und nicht Deutsch) erkannt wird.
Verfügbar v. a. in Chrome/Edge; wo die API fehlt, kannst du dich per „👍 Hat geklappt"
selbst bewerten. Der Browser fragt einmalig nach Mikrofon-Erlaubnis.

## ⌨️ Tastatur (im Lernmodus)

| Taste | Aktion |
|-------|--------|
| `←` / `→` | vorherige / nächste Karte |
| `Leertaste` | Karte umdrehen |
| `S` | Vokabel anhören |

## 🚀 Lokal starten

Reine statische Seite – einfach `index.html` im Browser öffnen.
Für Sprachausgabe **und Mikrofon** empfiehlt sich ein moderner Browser (Chrome, Edge, Safari).

```bash
# Optional mit lokalem Server (z. B. für mobile Tests im Netzwerk)
python -m http.server 8000
# dann http://localhost:8000 öffnen
```

## 🛠️ Technik

Reines **HTML + CSS + Vanilla JavaScript**, ohne Build-Schritt und ohne Laufzeit-Abhängigkeiten.
Die Lektionen werden zur Laufzeit aus einem **Themen-Korpus** generiert (`data.js`):
pro Thema & Level kleine Häppchen, plus themenübergreifende **Ripasso**- und **Sfida**-Lektionen.
Schriften: Pacifico, Playfair Display, Nunito (Google Fonts).

## ✅ Qualitätssicherung

**18 Headless-Integrationstests** mit **jsdom**: die App wird komplett geladen, echte
Nutzer-Flows werden durchgespielt (Lektion öffnen, alle Hör-Fragen beantworten, Satzbau,
Lückentext, **Spracherkennung auf it-IT**, ganzen Dialog spielen, Story-Fortschritt,
Quiz, Konjugationen …). Zusätzlich: Datenintegrität (330+ Lektionen, 2000+ Items, eindeutige
IDs), Level-Struktur, Grammatik-Regeln, Konjugationen (jede Zeit, 6 Personen, IT + DE) sowie
CSS-Hygiene. Jeder Push läuft automatisch durch die **GitHub-Actions-CI**.

```bash
npm install   # einmalig (nur für Tests; die Seite selbst braucht nichts)
npm test      # alle Tests
npm run check # nur Syntax-Check
```

## 📝 Eigene Inhalte hinzufügen

Alle Inhalte stehen in [`data.js`](data.js):

- **Vokabeln/Grammatik:** ein neues Thema im `CORPUS`-Array (`levels: { A1: [...], A2: [...] }`).
  Jedes Wort: `{ it, de, emoji, ex, exDe }`. Der Beispielsatz `ex` treibt automatisch die Modi
  **Satzbau**, **Lücke** und **Sprechen**. Mit `grammar: true` + `rule: "…"` wird daraus eine
  Grammatik-Lektion mit Merkregel.
- **Dialoge:** ein Eintrag im `DIALOGHI`-Array; Zeilen mit `who: "P"` (Partner) bzw.
  `who: "U"` (deine Antwort, wird zu Bausteinen).
- **Verben:** ein Eintrag im `CONJUGATIONS`-Array (`forms`/`formsDe` je Zeit).

Der Generator baut daraus Lektionen, Ripasso, Sfide und den Story-Pfad – die Tests prüfen
die Vollständigkeit automatisch. So lässt sich der Bestand mühelos **Richtung 1000 Lektionen**
erweitern.

---

*Fatto con ♥ · In bocca al lupo!*
