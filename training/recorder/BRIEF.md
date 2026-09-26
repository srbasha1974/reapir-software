# Brief for recording a training module

You are recording short, captioned screen videos that teach staff of a repair-service business how to use
their software. The finished pilot is module 02 ("Receiving a delivery"). **Copy its pattern exactly**:

- `training/recorder/02-inward.ts`: the scripted recording (see how it uses `Stage`)
- `training/recorder/captions-02.ts`: every on-screen word in English and Tamil
- `training/recorder/stage.ts`: the helper (captions, pointer, ring, title cards, unrecorded mode)
- `training/training-map.html`: the `L` object shows what the finished card and quiz look like for 02

Paths: training repo = `/home/user/reapir-software`, the app = `/home/user/repair-service` (read-only for you).

## The audience

Technical staff, fine in English, but they won't read long text. Short captions, one idea per caption.
Headline ≤ ~8 words plus an optional `<small>` second line. Green (`'do'`) for a rule to follow, red
(`'dont'`) for a mistake to avoid, plain otherwise. Target clip length 60–110 s (module 12 may reach 150 s).
Open with the title card (kicker `Thulir training · Module NN · <Role>`), close with a "Remember" card of 3–4 rules.

## Truth comes from the app, not from guesses

Every rule you teach must be true of this code base. Before scripting a module, read:
- the use case(s) in `repair-service/specification/use-cases/` and the relevant `specs/NNN-*/spec.md`
- the screen's code in `repair-service/app/(app)/...` (labels, buttons, warnings, what is refused)
- the database rules where relevant (`repair-service/supabase/migrations/`, grep the function/trigger)
Then script against the **real** screen: use real labels in locators and captions. If something you
expected isn't possible, don't teach it. Put it in `notes` instead.

Roles and grants (verified): Front Office = inward, challans, goods receipt, places orders from PRs in Zoho.
Liaison = assessment pick-up, quotations, allot, spares, purchase requests, goods receipt, stock adjust,
challans, verification assign/record, customer testing, invoice batches. Service Head = diagnosis,
quotations, allot, SLA, write-off, verification assign, targets. Engineer = repair, parts, timesheets,
peer verification, non-repairable. Ops Manager = config, statuses, reasons, roles, rates, invoice batches,
quotations. Sales Head = trial/convert, owner reassign. Sales Engineer = prospects, interactions, contacts.

Seeded sign-ins (no password; `Stage.open` mints a real session): admin.test@, exec@, saleshead@,
salesengineer@, servicehead@, liaison@, engineer@, frontoffice@, opsmanager@, bothroles@ (Engineer +
Service Head, use as the *second* engineer for peer verification), all `@thulirtech.com`.
`tools/walkthrough/routes.txt` in the app lists screens and who uses them.

## The shared environment: be careful

- The app runs at http://127.0.0.1:3000 (next dev) on a LOCAL Supabase with demo data. Other agents are
  recording at the same time against the same database.
- **Never** reset or reseed the database, never restart next/supabase/docker, never edit anything in
  `/home/user/repair-service`, never edit `.env.local`. If the app is down, stop and report it.
- **Make your own records.** Don't rely on a demo job staying in the state you found it: another agent
  may move it. Set up what your clip needs in an **unrecorded** pre-step through the app itself
  (`Stage.open(email, path, dir, { record: false })`), e.g. register a fresh delivery as frontoffice and
  move its jobs forward as the right role. Use unique serials/refs (a timestamp stamp, like 02 does).
  Read-only SQL to find ids is fine: `docker exec supabase_db_Repair_Service psql -U postgres -At -c "..."`.
  Don't write with SQL.
- Only touch your own files: `training/recorder/NN-*.ts`, `captions-NN.ts`, `training/media/NN-*`,
  `training/modules/NN.json`, `training/recorder/out/NN-*`. Do not edit `stage.ts` (if you need a helper,
  put it in your own file), `training-map.html`, the README, or git. Don't commit.

## Recording, checking, encoding

Run from `training/recorder`: `npx tsx NN-name.ts en` and `npx tsx NN-name.ts ta` (Tamil holds ×1.25 like 02).
Check each take ONCE with a contact sheet and fix what's wrong (wrong highlight, caption covering the
action, truncated text, error on screen). Two re-records per language at most.

```
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
$FF -y -loglevel error -i out/NN-name.en.webm -vf "fps=1/6,scale=683:-1,tile=3x4" -frames:v 1 out/NN-sheet.png   # then Read it
$FF -y -loglevel error -i out/NN-name.en.webm -vf "fps=4,scale=200:-1,tile=8x1" -frames:v 1 out/NN-head.png      # find where the title card is fully drawn
$FF -y -loglevel error -ss <that time> -i out/NN-name.en.webm -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an ../media/NN-slug.mp4
$FF -y -loglevel error -ss 1.0 -i ../media/NN-slug.mp4 -frames:v 1 -q:v 3 ../media/NN-poster.jpg
```
Tamil files: `../media/NN-slug-ta.mp4`, `../media/NN-poster-ta.jpg`. Keep each MP4 under 8 MB.

## Tamil

Simple spoken-style Tamil. Keep the app's own words in English exactly as on screen (button names,
field labels, statuses, "job", "item", "serial"), so staff can find them. Same meaning as the English, no
extra claims. Title-card durations must be true of the clip.

## Deliverable per module: `training/modules/NN.json`

```json
{
  "id": "03",
  "title": { "en": "Assessment", "ta": "..." },
  "role": "Liaison · Service Head",
  "path": "Service › …",                        // where on screen, as the app's nav names it
  "video": { "en": "media/03-assessment.mp4", "ta": "media/03-assessment-ta.mp4" },
  "poster": { "en": "media/03-poster.jpg", "ta": "media/03-poster-ta.jpg" },
  "seconds": { "en": 88, "ta": 104 },
  "do":   { "en": ["…"], "ta": ["…"] },         // 4–8 lines, <b> allowed, true of the app
  "dont": { "en": ["…"], "ta": ["…"] },         // 3–6 lines
  "quiz": { "en": [ { "q": "…", "o": ["…","…","…"], "a": 1, "why": "…" } ], "ta": [ … ] },  // 4 scenario questions, same order both languages
  "notes": ["anything the app could not show, app bugs/UX issues you noticed, assumptions"]
}
```
Validate the JSON (`python3 -m json.tool`). Your final reply: per module, the files written, durations,
and the notes. Be brief.

---

# Round 2 (2026-09-26): re-record on the current app

The app moved to `main` HEAD (many findings fixed, features 016–024). The database was **reset** and demo
data reloaded; the previous round's test records are gone. Read first:

- `training/CHANGE-IMPACT.md`: per module, what changed, which do/dont/quiz lines are now wrong, which
  locators break (note the two shared set-up fixes at the bottom of its table).
- `training/recorder/TAMIL-STYLE.md`: **the new Tamil style. Mandatory.** Business/technical words stay
  English in Tamil script (சர்வீஸ், ரிப்பேர், கொட்டேஷன், ஜாப்…); exact on-screen labels stay in English
  letters; short spoken sentences. Rewrite every `ta` string in captions-NN.ts and NN.json in this style,
  don't just patch.
- `training/APP-FINDINGS.md` and CHANGE-IMPACT §2: fixed findings must no longer be taught as limitations,
  and the module's `notes` must drop stale items.

For each module you own: update script + captions (EN where the app changed, TA always), fix locators,
re-record **both** languages, re-check with a contact sheet, re-encode to the **same file names** in
`training/media/`, and update `modules/NN.json` (do/dont/quiz/notes/seconds, both languages). Teach new
behaviour that belongs in your module when it fits the length (CHANGE-IMPACT §3). Title-card durations
must be true. Previous-round limits still apply (two re-records per language, same shared-env rules).

---

# KPI modules 13–17 (explaining the numbers)

Source of truth: `training/KPI-CATALOGUE.md` (definitions with file:line, one consistent worked month with
boards A–D and comeback R, clip outlines, quizzes). The modules: 13 Operations 1 (clip 1a), 14 Operations 2
(clip 1b), 15 Money 1 (clip 2a), 16 Money 2 (clip 2b), 17 Sales (clip 3). Kicker role e.g. "Service Head ·
Operations Manager".

- **Explain, then show.** For each KPI: a short worked-example card (use `Stage.card` with a small HTML
  table: line items, the arithmetic, the result, one line on how to read it), then point at the real
  figure on screen. Numbers on cards must follow the catalogue's worked month. Where the screen's numbers
  are the local demo's, say so in a caption ("your figures will differ") rather than pretending they match.
- **Don't teach what doesn't reconcile.** The catalogue lists inconsistencies (Revenue − Cost vs Total
  margin, rework possibly double-counted, scorecard Rework meaning, first pass counting write-offs). Teach
  what each figure *means as computed*; never claim two screen totals add up when they don't. Record each
  inconsistency in `notes`.
- **Length**: up to ~150 s per clip.
- **Page cards**: add `"examples": {"en": [...], "ta": [...]}` to `modules/NN.json`, 2–4 per module:
  `{"title": "Board A: ₹12,000 servo drive", "lines": [["Normal price","₹10,000","rate card"], …,
  ["= Charged","₹12,000","the larger of …"]], "read": "one sentence on how to read it"}`. A label starting
  with `= ` renders as a total row. Same numbers in both languages.
- Data: refresh the MIS materialised view first (`npx tsx tools/reports/refresh.ts` in the app, or the
  Refresh act as opsmanager@) and set up the example boards through the app (unrecorded), writing their
  job numbers to `training/recorder/kpi-seed.json` so the other KPI agent can reuse them.

---

# Round 3 (2026-09-26): Rack & Bin branding, recorded on `develop`

The clips move into the app itself (feature 030-training), so they must look like the app.
`stage.ts`, `13-kpi-helpers.ts` and `15-cards.ts` are already restyled to the app's design system
(repair-service `DESIGN.md`, "Rack & Bin"): title/Remember/worked-example cards are a white bay on the
grey ground with a code chip (`TRN NN`), the logo and the 3px green brand rule under the bin label;
captions are ink, `do` = blue wash, `dont` = red wash; the ring is attention yellow. **Don't add colours
of your own in card HTML** — no uppercase kickers, no green anywhere except that rule (Green Quarantine
Rule), blue only for "doing". Use `<h1>`/`<h2>`/`<p>`/`<ol>` and the helpers' classes.

The app is now `repair-service` branch `030-training` (= `develop`: features 025 critique fixes, 026
deslop pilot, 027 list sort/filter, 028 review fixes, 029 MCP semantic context). Screens may have
changed: fix locators, and if behaviour changed, update captions and `modules/NN.json` (both languages)
so they stay true. Database was reset to `develop` with demo data; build your own records as before.
The stack restarts sometimes: `bash training/recorder/local-up.sh` brings it back (never RESET=1 while
others are recording).

For each module you own: re-record **both languages** with the new look, check a contact sheet once,
re-encode to the **same file names** in `training/media/`, update `seconds` and any changed lines in
the JSON. Title-card durations must be true.
