/**
 * Module 06 · Parts, purchase requests and stock — Engineer, Liaison, Front Office.
 *
 * Grounded in UC-011 (parts), UC-012, UC-016, UC-017, TD-005 and the code:
 *  - app/(app)/service-centre/jobs/[...job]/acts.tsx: From catalogue (part chosen from a lookup, a
 *    quantity; "Booked, and the stock moved.") and Other spares (description + cost; "Booked. No
 *    stock moved."). work_order_part_shape: a row is a catalogued part OR an Other spare, never both.
 *    work_order_part_job_is_open(): nothing is booked on a closed job (and the card hides the acts).
 *  - Pending spare needs "Waiting for"; the Liaison raises the request from it (spares/spare-forms.tsx).
 *  - PR number PR/YY-MM/NNNNNN (pr_number_format); DRAFT → SENT_TO_FRONT_OFFICE (pr_sent_has_moment
 *    needs emailed_on); a receipt sets PARTIALLY_RECEIVED/RECEIVED (goods_receipt_releases_jobs).
 *    Nothing in the app sets ORDERED: the order itself is placed in Zoho Books.
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
const segments: string[] = []

// ── 1 · Engineer: book parts, pause for a spare ─────────────────────────────────────────────
{
  const s = await Stage.open('engineer@thulirtech.com', jobUrl(A), RAW)
  const p = s.page
  await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)
  await s.card(roleCard(c.engK, c.engH), 1500 * pace)

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
  await s.wait(900)
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
  await s.wait(900)
  await s.point(p.getByRole('row', { name: /Other spares/ }))
  await s.say(c.oneOrOther, 2800 * pace, 'dont')
  await s.unring()
  await s.quiet()

  // Board B: nothing on the shelf, so it pauses
  await s.goto(jobUrl(B))
  await s.wait(600)
  const pending = p.getByRole('button', { name: 'Pending spare' })
  await s.point(pending)
  await s.say(c.pause, 1600 * pace, 'do')
  await s.click(pending)
  await s.unring()
  await s.type(p.getByLabel('Waiting for'), 'Gate driver IC IR2110', 28)
  await s.say(c.pauseHow, 2600 * pace)
  await s.click(p.getByRole('button', { name: 'Pause for spare' }))
  await p.waitForLoadState('networkidle')
  await s.wait(800)
  await s.quiet()
  const out = join(OUT, `06-parts.${lang}.1.webm`)
  await s.close(out)
  segments.push(out)
}

// ── 2 · Liaison: raise the request and send it ──────────────────────────────────────────────
let pr = ''
{
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares?tab=raise', RAW)
  const p = s.page
  await s.card(roleCard(c.liaK, c.liaH), 1500 * pace)

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
  await s.wait(700)
  const row = p.getByRole('row', { name: new RegExp(pr.replace(/\//g, '\\/')) }).first()
  await s.point(row.locator('td').first())
  await s.say(c.raised, 3000 * pace)
  const send = row.getByRole('button', { name: 'Send to the front office' })
  await s.point(send)
  await s.say(c.send, 1500 * pace, 'do')
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
  segments.push(out)
}

// ── 3 · Front Office: order in Zoho, record a part delivery ─────────────────────────────────
{
  const s = await Stage.open('frontoffice@thulirtech.com', '/service-centre/spares?tab=orders', RAW)
  const p = s.page
  await s.card(roleCard(c.foK, c.foH), 1500 * pace)
  const rx = new RegExp(pr.replace(/\//g, '\\/'))
  await s.point(p.getByRole('row', { name: rx }).first())
  await s.say(c.zoho, 3200 * pace)
  await s.unring()

  await s.say(c.receive, 600 * pace)
  await s.type(p.getByRole('combobox', { name: 'Against' }), pr, 35)
  await s.wait(800)
  await s.click(p.getByRole('option', { name: rx }).first())
  await s.wait(900 * pace)
  await s.type(p.locator('#supplierName'), 'Sri Murugan Electronics', 22)
  await s.type(p.locator('#supplierDocumentReference'), `SME/INV/${setup.stamp}`, 28)
  const acc = p.locator('#quantityReceived')
  await s.click(acc)
  await acc.fill('')
  await acc.pressSequentially('1', { delay: 80 })
  await s.point(acc)
  await s.say(c.accepted, 2800 * pace, 'do')
  await s.unring()
  await s.click(p.getByRole('button', { name: 'Record the delivery' }))
  await p.waitForURL(/resumed=/)
  await p.waitForLoadState('networkidle')
  await s.wait(700)
  await s.point(p.locator('.warn.good').first())
  await s.say(c.partial, 3200 * pace, 'do')
  await s.goto('/service-centre/spares?tab=orders')
  await s.point(p.getByRole('row', { name: rx }).first())
  await s.say(c.partialState, 2200 * pace)
  await s.unring()
  await s.quiet()
  const out = join(OUT, `06-parts.${lang}.3.webm`)
  await s.close(out)
  segments.push(out)
}

// ── 4 · Liaison: correct a count ────────────────────────────────────────────────────────────
{
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares?tab=stock', RAW)
  const p = s.page
  await s.card(roleCard(c.adjK, c.adjH), 1500 * pace)
  await s.point(p.getByText('Correct a count', { exact: true }).first())
  await s.say(c.noEdit, 2600 * pace, 'dont')
  await s.unring()
  await s.type(p.getByRole('combobox', { name: 'Part' }), 'IRFP460', 70)
  await s.wait(900)
  await s.click(p.getByRole('option', { name: new RegExp(lot) }))
  await s.wait(500)
  await s.type(p.locator('#quantityAfter'), '17', 90)
  await s.click(p.locator('#reason'))
  await p.locator('#reason').selectOption('DAMAGED')
  await s.type(p.locator('#notes'), 'One cracked on the shelf', 25)
  await s.say(c.adjust, 2000 * pace)
  await s.click(p.getByRole('button', { name: 'Correct the count' }))
  await p.waitForURL(/adjusted=/)
  await p.waitForLoadState('networkidle')
  await s.wait(600)
  await s.point(p.locator('.warn.good').first())
  await s.say(c.adjusted, 2800 * pace, 'do')
  await s.unring()
  await s.quiet()
  await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)
  const out = join(OUT, `06-parts.${lang}.4.webm`)
  await s.close(out)
  segments.push(out)
}

// ── Join: each segment starts where its (dark) card is first fully drawn ─────────────────────
const FF = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim()
const detect = (f: string): number => {
  const r = spawnSync(FF, ['-i', f, '-vf', 'blackdetect=d=0.3:pic_th=0.80:pix_th=0.12', '-an', '-f', 'null', '-'])
  const m = /black_start:([\d.]+)/.exec(String(r.stderr))
  if (!m) throw new Error(`No title card found in ${f}`)
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
