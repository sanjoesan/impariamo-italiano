# CLAUDE.md

Guidance for working in this repository.

## Was das ist

Eine spielerische, **deutschsprachige** Web-App zum Sprachenlernen mit **zwei Kursen**,
oben per Flagge umschaltbar (🇮🇹/🇬🇧):
- **Italienisch** („Impariamo!", La-Dolce-Vita-Stil) — Standard.
- **Englisch** („Let's Learn!", „Swinging London" 60er/70er-Pop-Stil, `body.londra`).

Die UI bleibt durchgehend Deutsch; nur Lern-Sprache, Flair, Theme und Sprachausgabe
wechseln. Reine statische Client-App, **kein Build-Schritt, keine Runtime-Abhängigkeiten**.
Einfach `index.html` im Browser öffnen.

Vier Dateien tragen alles:

| Datei        | Inhalt |
|--------------|--------|
| `index.html` | Statische Struktur (Topbar, Home, Lektions-/Konjugations-Ansicht, Modals) |
| `data.js`    | **Daten + Lektions-Generator** (kein Modul, globale `const`s) |
| `app.js`     | App-Logik: State (localStorage), Rendering, Spielmodi, Sprachausgabe/-erkennung |
| `styles.css` | Komplettes Design inkl. Dark-Mode (`body.notte`) und Responsive |

## Befehle

```bash
npm test        # node:test + jsdom — Integrationstests (lädt index.html+data.js+app.js)
npm run check   # node --check app.js && node --check data.js (Syntax)
```

Es gibt keinen Dev-Server/Bundler. Zum manuellen Testen `index.html` öffnen.

## Architektur

### Zwei Kurse / Sprachen (`data.js` + `app.js`)
- Pro Sprache eigene Daten: IT-Quellen (`CORPUS`/`DIALOGHI`/`CONJUGATIONS`/…) und EN-Quellen
  (`CORPUS_EN`/`DIALOGHI_EN`/`CONJ_EN`/`CONJ_TENSES_EN`/`BADGES_EN`/…). Der EN-Korpus ist die
  **strukturgleiche** englische Lokalisierung (gleiche IDs, `de`-Felder bleiben Deutsch).
- Die aktiven Daten (`CORPUS`, `LESSONS`, `STORY`, `CONJUGATIONS`, `BADGES`, …) sind **`let`**
  und werden von **`selectCourse(lang)`** (in `data.js`) umgehängt + neu gebaut.
- Im EN-Kurs prefixt `buildLessons()` alle Lektions-IDs mit **`en:`** → getrennter
  Lernfortschritt (`state.lessons`), obwohl die Themen-IDs identisch sind.
- `app.js`: `setLanguage(lang)` ruft `selectCourse`, setzt `speechLang` (it-IT/en-GB),
  rebaut `lessonById`/`DIALOG_USER_LINES`, schaltet `body.londra` und ruft `applyCourseChrome()`
  (Oberflächentexte aus `UISTR`). Umschalter `#langToggle` → `switchLanguage`. Persistiert in `state.lang`.
- Funktions-Abschnitte (Sfide/Ripasso/Dialoge/Grammatica) werden via `areaLabel()` für EN
  übersetzt; Verben-Trainer nutzt englische Zeiten (Present Simple … Present Perfect).

### Daten & Generator (`data.js`)
Lektionen werden **zur Laufzeit generiert**, nicht von Hand gepflegt:

- `LEVELS` — 6 CEFR-Stufen A1–C2 (`{n, code, it, de, emoji, color, blurb}`), `LEVEL_BY_CODE`.
- `CORPUS` — Themen. Jedes Thema:
  `{ id, title(it), de, emoji, color, area, levels: { A1:[…], A2:[…], … } }`
  Grammatik-Themen haben zusätzlich `grammar: true` + `rule`.
  Ein „Wort" ist `{ it, de, emoji, ex, exDe }` (alle 5 Felder Pflicht — Test prüft das).
- `ADVANCED_CORPUS` — 16 Oberstufen-Themen (B2/C1/C2, `advanced: true`), wird per
  `CORPUS.push(...)` eingehängt.
- `ADVANCED_EXTRA` — B2/C1/C2-Wortschatz, der per `CORPUS.forEach` an die **bestehenden
  Basis-Themen** angehängt wird, damit jeder Lebensbereich bis C2 reicht.
- `DIALOGHI` — ganze Dialoge (`who: "P"`=Partner, `"U"`=du wählt aus Bausteinen).
- `CONJUGATIONS` / `CONJ_TENSES` / `CONJ_PRONOUNS` — Konjugations-Trainer (Verben × 6 Zeiten × 6 Personen, it+de).
- `buildLessons()` erzeugt aus alldem die `LESSONS`:
  1. **Vokabel/Grammatik** — pro Thema × Stufe in Häppchen (`CHUNK_SIZE = 6`).
  2. **Sfida „alles gemischt"** — Kernstoff (nur **A1–B1**) eines Themas gemischt, auf dem
     höchsten Kern-Level. **Bewusst auf A1–B1 begrenzt**, damit B2/C1/C2-Vokabeln die
     B1-Verteilung nicht verschieben.
  3. **Sfida pro Stufe (2b)** — nur für `advanced`-Themen, je Stufe eigene Challenge.
  4. **Dialoge** und **Ripasso** (themenübergreifende Wiederholung je Stufe, Cap `RIPASSO_CAP`).
- `buildStory()` → `STORY`: alle Lektions-IDs nach Stufe aufsteigend sortiert (Lernpfad).

**Folge daraus:** Mehr Lektionen einer Stufe = mehr Wörter im `CORPUS` für diese Stufe.
Nie Lektionen direkt in `LESSONS` schreiben. Neue Inhalte = neues Thema in `CORPUS`
(bzw. `ADVANCED_CORPUS` / `ADVANCED_EXTRA`) oder neuer Dialog/Verb.

### App-Logik (`app.js`)
- `state` in `localStorage` (Key `impariamo_v1`): xp, coins, streak, lessons-Fortschritt,
  badges, `startLevel`, `storyDone`, `levelFilter`, `areaFilter`, settings.
- Lernpfad (Storia) ist **dynamisch**: `storyPath()` = alle Lektionen nach Schwierigkeit
  **ab `state.startLevel`** (1–6); `nextStoryLesson()` = nächste offene Etappe.
  `setStartLevel(n)` wählt das Start-Niveau (generell & jederzeit änderbar). Es gibt
  keinen separaten „Weiterlernen"-Button mehr — die Story-Karte übernimmt das.
  Abschluss-Screens bieten **„Nächste Lektion"** (`nextLessonAfterCurrent`).
- Home: `renderStoryPanel` (inkl. **Start-Niveau-Chips** via `setStartLevel`),
  `renderLevelFilter`, `renderAreaFilter` (Bereichs-/Abschnitt-Filter), `renderLessonGrid`,
  `renderConjGrid`, `renderBadges`.
- Lektions-Spielmodi (in `MODE_META`): `learn, dialogue, listen, quiz, match, build, gap, speak`.
- `AREA_ORDER` / `AREA_EMOJI` steuern Reihenfolge & Icons der Bereiche.
- Sprachausgabe = `speechSynthesis` (it-IT), Sprechen-Modus = `SpeechRecognition` (it-IT).

## Konventionen
- **UI-Sprache: Deutsch** (Lern-Inhalt Italienisch + Deutsch). Kommentare auf Deutsch.
- Dateien sind **CRLF** (Windows). Skripte, die `data.js` patchen, müssen CRLF beachten.
- Design über **CSS-Variablen** (`:root`, Dark-Mode überschreibt sie in `body.notte`).
  Keine `var(--x)` ohne Definition — ein Test prüft Klammern-Balance & undefinierte Variablen.
- Responsive: Breakpoints bei 720 / 620 / 560 / 380 px; nichts darf seitlich überlaufen.

## Tests (`tests/app.test.mjs`)
- Echte Integrationstests: laden index.html+data.js+app.js in **jsdom**, simulieren Klicks/Eingaben.
- Browser-APIs (Speech, Audio, Canvas) sind gestubbt.
- Decken u. a. ab: Filter, alle Spielmodi, Story (+ Start-Niveau), Konjugationen,
  **Datenintegrität** (alle Pflichtfelder, eindeutige IDs), **Umfang** (B2/C1/C2 je ≥ 100),
  CSS-Hygiene. Vor jedem Push grün halten.

## Gotchas
- `git config --global --add safe.directory E:/LernItaly` nötig (Ownership-Quirk), sonst
  scheitert jedes git-Kommando.
- Multi-line Commit-Messages über das **Bash-Tool mit POSIX-Heredoc** (`git commit -F - <<'EOF'`),
  nicht PowerShell `@'…'@` — letzteres schmuggelt ein `@` in die Message.
- Inhalte werden im Repo direkt auf `main` committet & gepusht (deutsche Commit-Messages).
