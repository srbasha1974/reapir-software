# Training material for the Thulir repair software

- `training-map.html`: the curriculum by workflow stage and role, plus the finished module 02 (video, Do / Don't card, quiz).
- `media/`: the rendered clips (MP4, captions burned in, no audio).
- `recorder/`: the scripts that record each clip from a **local** copy of `srbasha1974/repair-service`.

## Re-recording a clip

1. In `repair-service`: `supabase start`, a `.env.local` pointing at `http://127.0.0.1:54321`, `npm run db:demo`, then `npx next dev -H 127.0.0.1 -p 3000`.
2. `ln -s ../../../repair-service/node_modules training/recorder/node_modules` (or set `REPAIR_SERVICE_DIR`).
3. `cd training/recorder && npx tsx 02-inward.ts en` (or `ta` for Tamil captions) writes `out/02-inward.<lang>.webm`. Captions live in `captions-02.ts`.
4. Encode: `ffmpeg -ss 1.5 -i out/02-inward.en.webm -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart -an ../media/02-receiving-a-delivery.mp4`

The recorder refuses to run unless `.env.local` points at the local database. It signs in as the seeded test users (`frontoffice@thulirtech.com` and so on) through the same helper the app's e2e tests use, so it never needs Google or production data.
