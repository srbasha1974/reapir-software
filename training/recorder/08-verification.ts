/**
 * Module 08 · Verification and customer testing — Liaison/Service Head, peer Engineer, Liaison.
 *
 * Grounded in UC-013 and the code:
 *  - verification/verify-forms.tsx AssignForm: tick boards, "Give it to" (no default); choosing the
 *    repairer shows "They repaired … Checking your own work is recorded …" — allowed, not refused
 *    (decision of 2026-09-02; verification_marks_self() sets is_self_verification).
 *  - assign_verifier(): only from Ready for Verification → In Verification. verification.assign is
 *    held by Liaison and Service Head.
 *  - record_verification(): only the holder records; a fail needs a symptom and returns the board
 *    to In Progress with "Verification failed: <symptom>" on its history, cycle count +1; a pass
 *    goes to Awaiting Customer Confirmation.
 *  - timesheet_entry_is_permitted(): the verifier may book hours (is_verification) while holding it.
 *  - record_customer_test(): only after a peer pass; pass → Ready for Invoice (closed), fail → In
 *    Progress. Recorded by staff on the customer's behalf.
 *
 * bothroles@ (Engineer + Service Head) is the checker, so the verifier is not the repairer
 * (engineer@). Three short recordings, trimmed at their cards and joined.
 * Needs 06-setup.ts <lang> (jobs D and E at Ready for Verification).
 *
 *   npx tsx 08-verification.ts [en|ta]    → out/08-verification.<lang>.mp4
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-08'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const { D, E } = JSON.parse(readFileSync(join(OUT, `06-setup.${lang}.json`), 'utf8')).jobs as Record<string, string>
const ENGINEER = '10000000-0000-4000-a000-000000000007'
const BOTH = '10000000-0000-4000-a000-000000000010'
const roleCard = (k: string, h: string) => `<div class="k">${k}</div><h1>${h}</h1>`
const segments = [1, 2, 3].map((n) => join(OUT, `08-verification.${lang}.${n}.webm`))
const only = process.env.SEG ? process.env.SEG.split(',').map(Number) : [1, 2, 3]
const runs = (n: number) => only.includes(n)
const today = new Date().toLocaleDateString('en-US', { weekday: 'short', timeZone: 'Asia/Kolkata' })

// ── 1 · Liaison gives the boards out ────────────────────────────────────────────────────────
if (runs(1)) {
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/verification?view=queue', RAW)
  const p = s.page
  await s.wait(1200)
  await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)
  await s.card(roleCard(c.giveK, c.giveH), 1600 * pace)
  await s.point(p.locator('table.give'))
  await s.say(c.queue, 2200 * pace)
  await s.unring()
  await s.say(c.tick, 500 * pace, 'do')
  await s.click(p.getByLabel(`Choose ${D}`))
  await s.click(p.getByLabel(`Choose ${E}`))
  await s.wait(700)
  const who = p.locator('#verifierUserId')
  await s.point(who)
  await who.selectOption(ENGINEER)
  await s.wait(900)
  await s.point(p.getByText(/They repaired/).first())
  await s.say(c.self, 4200 * pace, 'dont')
  await s.point(who)
  await who.selectOption(BOTH)
  await s.say(c.peer, 2600 * pace, 'do')
  await s.unring()
  await s.click(p.getByRole('button', { name: /Give 2 boards to them/ }))
  await p.waitForURL(/given=/)
  await p.waitForLoadState('networkidle')
  // A full load after the redirect: overlay changes are not recorded reliably until one.
  await s.goto('/service-centre/verification?view=checking')
  await s.point(p.locator('nav.views a', { hasText: 'Being checked' }))
  await s.say(c.given, 2400 * pace)
  await s.unring()
  await s.quiet()
  await s.close(segments[0])
}

// ── 2 · The peer engineer checks: books hours, fails one, passes one ─────────────────────────
if (runs(2)) {
  const s = await Stage.open('bothroles@thulirtech.com', `/service-centre/verification?view=mine&card=${encodeURIComponent(D)}`, RAW)
  const p = s.page
  await s.wait(1200)
  await s.card(roleCard(c.chkK, c.chkH), 1600 * pace)
  await s.point(p.locator('nav.views a', { hasText: 'With you to check' }))
  await s.say(c.mine, 2200 * pace)

  const ts = p.getByRole('link', { name: 'timesheet', exact: true })
  await s.point(ts)
  await s.say(c.hours, 2400 * pace, 'do')
  await s.click(ts)
  await p.waitForURL(/timesheet/)
  await p.waitForLoadState('networkidle')
  await s.wait(600)
  const cell = p.getByLabel(`${D} ${today}`)
  await s.type(cell, '1.5', 110)
  await cell.press('Enter')
  await s.wait(1200)
  await s.goto(`/service-centre/timesheet?job=${encodeURIComponent(D)}`)
  await s.point(p.getByRole('row', { name: new RegExp(D.replace(/\//g, '\\/')) }).first())
  await s.say(c.booked, 2800 * pace)
  await s.unring()

  // D fails
  await s.goto(`/service-centre/verification?view=mine&card=${encodeURIComponent(D)}`)
  await s.wait(500)
  const failBtn = p.locator('.act', { hasText: 'Fail — back to the bench' })
  await s.point(failBtn)
  await s.say(c.symptom, 3200 * pace, 'dont')
  await s.type(p.getByLabel('Observed symptom'), 'Still trips on overcurrent at 40% load', 35)
  await s.click(p.getByRole('button', { name: 'Fail — back to the bench' }))
  await p.waitForURL(/failed=/)
  await p.waitForLoadState('networkidle')
  await s.goto(`/service-centre/jobs/${D}`)
  await s.point(p.getByText(/Verification failed/).first())
  await s.say(c.failed, 3600 * pace)
  await s.unring()

  // E passes
  await s.goto(`/service-centre/verification?view=mine&card=${encodeURIComponent(E)}`)
  await s.wait(500)
  const pass = p.getByRole('button', { name: 'Pass', exact: true })
  await s.point(pass)
  await s.say(c.pass, 1800 * pace, 'do')
  await s.click(pass)
  await p.waitForURL(/passed=/)
  await p.waitForLoadState('networkidle')
  await s.goto('/service-centre/verification?view=customer')
  await s.point(p.locator('a.item', { hasText: E }).first())
  await s.say(c.passed, 2600 * pace)
  await s.unring()
  await s.quiet()
  await s.close(segments[1])
}

// ── 3 · Liaison records the customer's test ─────────────────────────────────────────────────
if (runs(3)) {
  const s = await Stage.open('liaison@thulirtech.com', `/service-centre/verification?view=customer&card=${encodeURIComponent(E)}`, RAW)
  const p = s.page
  await s.wait(1200)
  await s.card(roleCard(c.custK, c.custH), 1600 * pace)
  await s.point(p.locator('a.item', { hasText: E }).first())
  await s.say(c.withCust, 3000 * pace)
  await s.unring()
  await s.say(c.said, 400 * pace)
  await s.type(p.getByLabel('What they said'), 'Runs their drive at full load, no trips', 35)
  await s.point(p.getByRole('button', { name: 'Still faulty — back to the bench' }))
  await s.say(c.choices, 2600 * pace)
  await s.click(p.getByRole('button', { name: 'It works — close it' }))
  await p.waitForURL(/closed=/)
  await p.waitForLoadState('networkidle')
  await s.goto(`/service-centre/jobs/${E}`)
  await s.point(p.locator('dd', { hasText: /Ready for invoice/i }).first())
  await s.say(c.closed, 3000 * pace, 'do')
  await s.unring()
  await s.quiet()
  await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)
  await s.close(segments[2])
}

// ── Join at each segment's card ─────────────────────────────────────────────────────────────
const FF = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim()
const detect = (f: string): number => {
  const r = spawnSync(FF, ['-i', f, '-vf', 'blackdetect=d=0.3:pic_th=0.80:pix_th=0.12', '-an', '-f', 'null', '-'])
  const m = /black_start:([\d.]+)/.exec(String(r.stderr))
  if (!m || Number(m[1]) > 12) throw new Error(`No title card found early in ${f}`)
  return Number(m[1]) + 0.25
}
const trims = segments.map(detect)
console.log('segment starts', trims)
const inputs = segments.flatMap((f, i) => ['-ss', String(trims[i]), '-i', f])
const filter = segments.map((_, i) => `[${i}:v]fps=25,setpts=PTS-STARTPTS[v${i}]`).join(';') +
  ';' + segments.map((_, i) => `[v${i}]`).join('') + `concat=n=${segments.length}:v=1:a=0[out]`
const joined = join(OUT, `08-verification.${lang}.mp4`)
execFileSync(FF, ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', filter, '-map', '[out]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '14', '-pix_fmt', 'yuv420p', '-an', joined])
console.log(joined)
