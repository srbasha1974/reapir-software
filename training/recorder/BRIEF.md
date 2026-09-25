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
