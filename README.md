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
- **🎮 Drei Spielmodi pro Lektion:**
  - **📖 Lernen** – Karteikarten zum Umdrehen, mit automatischer Aussprache
  - **🎯 Quiz** – Multiple-Choice mit Sofort-Feedback
  - **🧩 Zuordnen** – Italienisch ↔ Deutsch verbinden
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

Reines **HTML + CSS + Vanilla JavaScript**, ohne Build-Schritt und ohne Abhängigkeiten.
Schriften: Pacifico, Playfair Display, Nunito (Google Fonts).

## 📝 Eigene Vokabeln hinzufügen

Alle Inhalte stehen in [`data.js`](data.js). Eine neue Lektion ist einfach ein weiterer Eintrag im `LESSONS`-Array.

---

*Fatto con ♥ · In bocca al lupo!*
