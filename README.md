# 🇮🇹 Impariamo! — Spielerisch Italienisch lernen

Eine kleine, liebevoll gestaltete Lernplattform im nostalgischen **„La Dolce Vita"**-Stil.
Lerne Italienisch mit Sprachausgabe, Quiz und einem Hauch toskanischer Sonne. ☀️

**▶︎ Live:** https://sanjoesan.github.io/impariamo-italiano/

![Italienisch lernen](favicon.svg)

## ✨ Funktionen

- **🔊 Sprachausgabe** – natürliche italienische Aussprache über die Web Speech API.
  Die beste verfügbare Stimme wird automatisch gewählt; Stimme & Tempo sind in den Einstellungen anpassbar.
- **📚 10 Themen** mit ~100 Vokabeln und Beispielsätzen
  (Begrüßung, Zahlen, Essen, Reisen, Familie, Farben, Zeit, In der Stadt, Nützliche Sätze, Im Restaurant).
- **🎮 Vier Spielmodi pro Lektion:**
  - **📖 Lernen** – Karteikarten zum Umdrehen, mit automatischer Aussprache
  - **🎧 Hören** – Diktat: du hörst die Vokabel und tippst sie (tolerant bei Akzenten & Satzzeichen)
  - **🎯 Quiz** – Multiple-Choice mit Sofort-Feedback
  - **🧩 Zuordnen** – Italienisch ↔ Deutsch verbinden
- **🌙 Tag-/Nacht-Modus** („Notte Romana") – umschaltbar, bleibt gespeichert.
- **🔔 Soundeffekte** bei richtig/falsch/Level-up (Web Audio, abschaltbar).
- **🏆 Spielerische Motivation:** XP, Level, Tages-Serie (🔥), Münzen, Sterne, Abzeichen und Konfetti.
- **💾 Fortschritt** wird lokal im Browser gespeichert (kein Konto nötig).
- **📱 Responsiv** – funktioniert auf Handy, Tablet und Desktop.

## ⌨️ Tastatur (im Lernmodus)

| Taste | Aktion |
|-------|--------|
| `←` / `→` | vorherige / nächste Karte |
| `Leertaste` | Karte umdrehen |
| `S` | Vokabel anhören |

## 🚀 Lokal starten

Es ist eine reine statische Seite – einfach `index.html` im Browser öffnen.
Für die Sprachausgabe empfiehlt sich ein moderner Browser (Chrome, Edge, Safari).

```bash
# Optional mit lokalem Server (z. B. für mobile Tests im Netzwerk)
python -m http.server 8000
# dann http://localhost:8000 öffnen
```

## 🛠️ Technik

Reines **HTML + CSS + Vanilla JavaScript**, ohne Build-Schritt und ohne Laufzeit-Abhängigkeiten.
Schriften: Pacifico, Playfair Display, Nunito (Google Fonts).

## ✅ Qualitätssicherung

Headless-Integrationstests mit **jsdom**: die App wird komplett geladen, echte
Nutzer-Flows werden durchgespielt (Lektion öffnen, alle Hör-Fragen beantworten,
Theme umschalten, Quiz lösen …) und das Verhalten wird geprüft. Zusätzlich:
Datenintegrität aller Vokabeln und CSS-Hygiene (Klammern, Dark-Mode-Variablen).
Jeder Push läuft automatisch durch die **GitHub-Actions-CI**.

```bash
npm install   # einmalig (nur für Tests; die Seite selbst braucht nichts)
npm test      # alle Tests
npm run check # nur Syntax-Check
```

Die Tests liegen in [`tests/`](tests/). Der Regressionstest *„Hör-Modus: ALLE Fragen
werden geprüft"* sichert konkret den Bug ab, dass früher nur die erste von zehn
Diktat-Fragen gewertet wurde.

## 📝 Eigene Vokabeln hinzufügen

Alle Inhalte stehen in [`data.js`](data.js). Eine neue Lektion ist einfach ein weiterer Eintrag im `LESSONS`-Array.

---

*Fatto con ♥ · In bocca al lupo!*
