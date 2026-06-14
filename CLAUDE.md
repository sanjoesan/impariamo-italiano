# CLAUDE.md

Guidance for working in this repository.

## Was das ist

**Impariamo!** — eine spielerische, deutschsprachige Web-App zum **Italienischlernen**
(„La Dolce Vita"-Design). Reine statische Client-App, **kein Build-Schritt, keine
Runtime-Abhängigkeiten**. Einfach `index.html` im Browser öffnen.

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
  badges, `storyPos`, `levelFilter`, `areaFilter`, settings.
- Home: `renderStoryPanel` (inkl. **Start-Niveau-Wahl** via `setStoryStartLevel`),
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
