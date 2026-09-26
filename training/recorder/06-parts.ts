/**
 * Module 06 · Parts, purchase requests and stock — Engineer, Liaison, Front Office.
 *
 * Grounded in UC-011 (parts), UC-012, UC-016, UC-017, TD-005 and the code:
 *  - app/(app)/service-centre/jobs/[...job]/acts.tsx: From catalogue (part chosen from a lookup, a
 *    quantity; "Booked, and the stock moved.") and Other spares (description + cost; "Booked. No
 *    stock moved."). work_order_part_shape: a row is a catalogued part OR an Other spare, never both.
 *    work_order_part_job_is_open(): nothing is booked on a closed job (and the card hides the acts).
 *  - Pending spare needs "Waiting for"; the Liaison raises the request from it (spares/spare-forms.tsx).
 *  - PR number PR/YY-MM/NNNNNN (pr_number_format); DRAFT → SENT_TO_FRONT_OFFICE ("With front office",
 *    Send is the Liaison's: purchase_request.manage) → ORDERED (the Front Office's "Mark ordered" with
 *    the Zoho PO no., mark_purchase_request_ordered, purchase_request.order) → PARTIALLY_RECEIVED
 *    ("Part received") / RECEIVED on a receipt (goods_receipt_releases_jobs).
 *  - goods_receipt_releases_jobs(): a board is released only when its whole allocation is covered.
 *  - goods_receipt_is_immutable(): receipts are never edited; corrections are stock adjustments.
 *
 * Several roles, so four short recordings (one per role), trimmed at their title cards and joined.
 * Needs the records from `06-setup.ts <lang>` (out/06-setup.<lang>.json).
 *
 *   npx tsx 06-parts.ts [en|ta]    → out/06-parts.<lang>.mp4 (joined, near-lossless)
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-06'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const setup = JSON.parse(readFileSync(join(OUT, `06-setup.${lang}.json`), 'utf8')) as {
  stamp: string
  jobs: Record<'A' | 'B' | 'C', string>
  parts: { P1: string; P2: string }
  serialPrefix: string
}
const { A, B, C } = setup.jobs
const lot = `lot ${setup.stamp}`
const jobUrl = (j: string) => `/service-centre/jobs/${j}`
const roleCard = (k: string, h: string) => `<div class="k">${k}</div><h1>${h}</h1>`
/** Reloads the address the page is on (a GET). After a server-action redirect the recording can stop
 *  showing overlay changes until the next full load, so every act that redirects is followed by this. */
const reload = async (s: Stage) => { const u = new URL(s.page.url()); await s.goto(u.pathname + u.search) }
const segments = [1, 2, 3, 4].map((n) => join(OUT, `06-parts.${lang}.${n}.webm`))
/**
 * SEG=4 re-records only that segment and re-joins with the takes already on disk (PR=… is then
 * needed for segment 3). A full run is the normal path: no hand edits after it.
 */
const only = process.env.SEG ? process.env.SEG.split(',').map(Number) : [1, 2, 3, 4]
const runs = (n: number) => only.includes(n)

// ── 1 · Engineer: book parts, pause for a spare ─────────────────────────────────────────────
if (runs(1)) {
  {
    const u = await Stage.open('engineer@thulirtech.com', jobUrl(B), RAW, { record: false })
    if (await u.page.getByRole('button', { name: 'Pending spare' }).isVisible().catch(() => false)) {
      await u.page.getByRole('button', { name: 'Pending spare' }).click()
      await u.page.getByPlaceholder('The component it is waiting for…').fill('Gate driver IC IR2110')
      await u.page.getByRole('button', { name: 'Pause for spare' }).click()
      await u.wait(2000)
    }
    await u.close()
  }
  const s = await Stage.open('engineer@thulirtech.com', jobUrl(A), RAW)
  const p = s.page
  await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3200 * pace)
  await s.card(roleCard(c.engK, c.engH), 1400 * pace)

  const fromCat = p.getByRole('button', { name: /From catalogue/ })
  await s.point(fromCat)
  await s.say(c.catalogue, 1800 * pace, 'do')
  await s.click(fromCat)
  await s.unring()
  await s.type(p.getByRole('combobox', { name: 'Part' }), 'IRFP460', 70)
  await s.wait(900)
  await s.click(p.getByRole('option', { name: new RegExp(lot) }))
  await s.say(c.choose, 1500 * pace)
  const qty = p.getByLabel('Quantity')
  await s.click(qty)
  await qty.fill('')
  await qty.pressSequentially('2', { delay: 80 })
  await s.wait(300)
  await s.click(p.getByRole('button', { name: 'Book it' }))
  await p.waitForLoadState('networkidle')
  await p.getByRole('row', { name: /IRFP460/ }).waitFor()
  await reload(s)
  await s.point(p.getByRole('row', { name: /IRFP460/ }))
  await s.say(c.booked, 2600 * pace, 'do')
  await s.unring()

  const other = p.getByRole('button', { name: /Other spares/ })
  await s.point(other)
  await s.say(c.other, 1500 * pace)
  await s.click(other)
  await s.unring()
  await s.type(p.getByLabel('What they were'), 'Assorted resistors, sleeving', 22)
  await s.type(p.getByLabel('Cost (₹)'), '40', 80)
  await s.say(c.otherHow, 1600 * pace)
  await s.click(p.getByRole('button', { name: 'Book it' }))
  await p.waitForLoadState('networkidle')
  await p.getByRole('row', { name: /Other spares/ }).waitFor()
  await reload(s)
  await s.point(p.getByRole('row', { name: /Other spares/ }))
  await s.say(c.oneOrOther, 3000 * pace, 'dont')
  await s.unring()
  await s.quiet()

  await s.wait(600)
  const out = join(OUT, `06-parts.${lang}.1.webm`)
  await s.close(out)
}

// ── 2 · Liaison: raise the request and send it ──────────────────────────────────────────────
let pr = process.env.PR ?? ''
if (runs(2)) {
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares?tab=raise', RAW)
  const p = s.page
  await s.card(roleCard(c.liaK, c.liaH), 1400 * pace)

  const part = p.getByRole('combobox', { name: 'Part on line 1' })
  await s.say(c.line, 600 * pace)
  await s.type(part, 'IR2110', 70)
  await s.wait(900)
  await s.click(p.getByRole('option', { name: new RegExp(lot) }))
  const many = p.getByLabel('How many on line 1')
  await s.click(many)
  await many.fill('2')
  await s.wait(1200)

  await s.type(p.getByLabel('Filter the waiting boards offered on each line'), setup.serialPrefix, 40)
  await s.wait(600)
  await s.say(c.tick, 600 * pace, 'do')
  await s.click(p.getByLabel(`Released by line 1: ${B}`))
  await s.click(p.getByLabel(`Released by line 1: ${C}`))
  await s.wait(1300 * pace)
  await s.type(p.locator('#suggestedSupplier'), 'Sri Murugan Electronics', 22)
  await s.quiet()
  await s.click(p.getByRole('button', { name: /Raise the request/ }))
  await p.waitForURL(/raised=/)
  await p.waitForLoadState('networkidle')
  pr = decodeURIComponent(new URL(p.url()).searchParams.get('raised') ?? '')
  await reload(s)
  const row = p.getByRole('row', { name: new RegExp(pr.replace(/\//g, '\\/')) }).first()
  await s.point(row.locator('td').first())
  await s.say(c.raised, 2600 * pace)
  const send = row.getByRole('button', { name: 'Send to the front office' })
  await s.point(send)
  await s.say(c.send, 2000 * pace, 'do')
  await s.click(send)
  await p.waitForURL(/sent=/)
  await p.waitForLoadState('networkidle')
  // The act lands on the waiting tab; the request's new state is read on On order.
  await s.goto('/service-centre/spares?tab=orders')
  await s.wait(400)
  const sentRow = p.getByRole('row', { name: new RegExp(pr.replace(/\//g, '\\/')) }).first()
  await s.point(sentRow)
  await s.say(c.sent, 2400 * pace)
  await s.unring()
  await s.quiet()
  const out = join(OUT, `06-parts.${lang}.2.webm`)
  await s.close(out)
}

// ── 3 · Front Office: order in Zoho, mark it ordered, record a part delivery ─────────────────
if (runs(3)) {
  const s = await Stage.open('frontoffice@thulirtech.com', '/service-centre/spares?tab=orders', RAW)
  const p = s.page
  await s.card(roleCard(c.foK, c.foH), 1400 * pace)
  const rx = new RegExp(pr.replace(/\//g, '\\/'))
  const row = () => p.getByRole('row', { name: rx }).first()
  await s.point(row().locator('td').nth(3))
  await s.say(c.zoho, 2800 * pace)
  const po = p.locator(`[id="po-${pr}"]`)
  await s.point(row().getByRole('button', { name: 'Give the PO no.' }))
  await s.say(c.po, 2400 * pace, 'do')
  await s.unring()
  await s.type(po, `PO-${setup.stamp}`, 70)
  await s.wait(300)
  await s.click(row().getByRole('button', { name: 'Mark ordered' }))
  await p.waitForURL(/ordered=/)
  await p.waitForLoadState('networkidle')
  await reload(s)
  await s.point(row().locator('td').nth(3))
  await s.say(c.ordered, 2400 * pace)
  await s.unring()

  await s.say(c.receive, 600 * pace)
  await s.type(p.getByRole('combobox', { name: 'Against' }), pr, 35)
  await s.wait(800)
  await s.click(p.getByRole('option', { name: rx }).first())
  await s.wait(700 * pace)
  await s.type(p.locator('#supplierName'), 'Sri Murugan Electronics', 18)
  await s.type(p.locator('#supplierDocumentReference'), `SME/INV/${setup.stamp}`, 25)
  const acc = p.locator('#quantityReceived')
  await s.click(acc)
  await acc.fill('')
  await acc.pressSequentially('1', { delay: 80 })
  await s.point(acc)
  await s.say(c.accepted, 2600 * pace, 'do')
  await s.unring()
  await s.click(p.getByRole('button', { name: 'Record the delivery' }))
  await p.waitForURL(/resumed=/)
  await p.waitForLoadState('networkidle')
  await reload(s)
  await s.point(p.locator('.warn.good').first())
  await s.say(c.partial, 2800 * pace, 'do')
  await s.goto('/service-centre/spares?tab=orders')
  await s.point(row().locator('td').nth(3))
  await s.say(c.partialState, 3200 * pace)
  await s.unring()
  await s.quiet()
  const out = join(OUT, `06-parts.${lang}.3.webm`)
  await s.close(out)
}

// ── 4 · Liaison: correct a count ────────────────────────────────────────────────────────────
if (runs(4)) {
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares?tab=stock', RAW)
  const p = s.page
  await s.wait(2500) // this screen paints late; a card drawn before it is never recorded
  const count = String(Number(execFileSync('docker', ['exec', 'supabase_db_Repair_Service', 'psql', '-U', 'postgres', '-At', '-c',
    `select current_quantity from part where part_name = '${setup.parts.P1}'`]).toString().trim()) - 1)
  await s.card(roleCard(c.adjK, c.adjH), 1400 * pace)
  await s.point(p.getByText('Correct a count', { exact: true }).first())
  await s.say(c.noEdit, 2400 * pace, 'dont')
  await s.unring()
  await s.type(p.getByRole('combobox', { name: 'Part' }), 'IRFP460', 70)
  await s.wait(900)
  await s.click(p.getByRole('option', { name: new RegExp(lot) }))
  await s.wait(500)
  await s.type(p.locator('#quantityAfter'), count, 90)
  await s.click(p.locator('#reason'))
  await p.locator('#reason').selectOption('DAMAGED')
  await s.type(p.locator('#notes'), 'One cracked on the shelf', 25)
  await s.say(c.adjust, 2000 * pace)
  await s.click(p.getByRole('button', { name: 'Correct the count' }))
  await p.waitForURL(/adjusted=/)
  await p.waitForLoadState('networkidle')
  // After this redirect the recording stops showing overlay changes until the next full load, so
  // load the same address again (a GET: nothing is repeated).
  await s.goto('/service-centre/spares?adjusted=1')
  await s.wait(500)
  await s.point(p.locator('.warn.good').first())
  await s.say(c.adjusted, 2800 * pace, 'do')
  await s.unring()
  await s.quiet()
  await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)
  const out = join(OUT, `06-parts.${lang}.4.webm`)
  await s.close(out)
}

// ── Join: each segment starts where its (dark) card is first fully drawn ─────────────────────
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
const filter = segments.map((_, i) => `[${i}:v]setpts=PTS-STARTPTS[v${i}]`).join(';') +
  ';' + segments.map((_, i) => `[v${i}]`).join('') + `concat=n=${segments.length}:v=1:a=0[out]`
const joined = join(OUT, `06-parts.${lang}.mp4`)
execFileSync(FF, ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', filter, '-map', '[out]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '14', '-pix_fmt', 'yuv420p', '-an', joined])
console.log(joined, 'PR', pr)
