/**
 * Module 15 · Numbers · Money 1: how one job's price splits — Liaison · Service Head · Operations Manager.
 * KPI-CATALOGUE.md clip 2a: normal price / Set by hand, labour charge, opportunity premium (and the
 * parts-over-N case, which is what staff call "parts premium"), discount, charged, then labour margin
 * → parts margin → total margin. Explain with a worked card, then show it on the real screen.
 *
 * Grounded in: supabase/migrations/20260925000500_opportunity_premium_DDE-001.sql (the all-in rule),
 * app/(app)/service-centre/quotations/[...quotation]/quote-forms.tsx (Normal price, Set by hand,
 * Premium + "Why a premium", Discount, "Engineer's labour charge"), the quotation record's dashed
 * internal row, and the job card's "What it cost, and what it made" (MIS roles only).
 *
 * Needs kpi-seed.json (npx tsx 15-setup.ts): A is the approved board, X a like board left Under
 * Assessment so the raise form can be filled live without raising anything.
 *
 *   npx tsx 15-money-price.ts [en|ta]   → out/15-money-price.<lang>.webm
 */
import { Stage } from './stage'
import { become } from './09-setup'
import { customerId, jobPath } from './09-setup'
import { CAPTIONS, type Lang } from './captions-15'
import { sumCard, pointAll } from './15-cards'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const seed = JSON.parse(readFileSync(join(import.meta.dirname, 'kpi-seed.json'), 'utf8'))
const A: string = seed.A
const X: string = seed.X
const cid = customerId('Ayyan Industrial Systems')

const s = await Stage.open('liaison@thulirtech.com', `/service-centre/quotations?customer=${cid}&jobs=${encodeURIComponent(X)}`, join(OUT, 'raw'))
const p = s.page
const card = (o: Parameters<typeof sumCard>[0], ms: number) => s.card(sumCard(o), ms * pace)

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3800 * pace)
await card(c.rule, 11000)

// ── The raise form, filled live on board X (never raised) ───────────────────────────────────────
const bay = p.locator('[data-code="NEW"]').first()
const line = p.getByRole('group', { name: 'Line 1', exact: true })
await s.point(bay.locator('li', { hasText: X }).first())
await s.say(c.form, 3600 * pace)
await s.unring()
await s.type(p.locator(`#line-0-description-${cid}`), 'Servo drive repair, urgent', 25)
const normal = p.locator(`#normalPrice-raise-${cid}-0`)
await s.point(normal)
await s.say(c.normal, 2600 * pace)
await s.type(normal, '10000', 90)
await pointAll(s, [normal, line.getByText('Set by hand', { exact: true })])
await s.say(c.byHand, 3800 * pace, 'do')
await s.unring()
const price = p.locator(`#line-0-unitPrice-${cid}`)
await s.type(price, '12000', 90)
await s.wait(500)
await s.point(line.locator('.pricesplit .row.prem'))
await s.click(line.getByLabel('Why a premium'))
await line.getByLabel('Why a premium').selectOption({ label: 'Urgent turnaround' })
await s.point(line.locator('.pricesplit .row.prem'))
await s.say(c.premium, 3600 * pace)
await s.point(line.locator('.pricesplit .row').last())
await s.say(c.labourLive, 3600 * pace)
await s.unring()
await card(c.labourCard, 8500)
await card(c.premiumCard, 8500)
await card(c.partsCard, 10500)

// Below normal: the same form shows a discount instead
await price.fill('')
await s.type(price, '8000', 90)
await s.wait(400)
await pointAll(s, [line.locator('.pricesplit .row.disc'), line.locator('.pricesplit .row').last()])
await s.say(c.discount, 3600 * pace)
await s.unring()
await card(c.discountCard, 8000)

// ── Board A's approved quotation ───────────────────────────────────────────────────────────────
await s.goto(`/service-centre/quotations/${seed.quotationA}`)
await s.wait(500)
const internal = p.locator('table.qlines').first().locator('tr').filter({ hasText: 'Labour charge' }).first()
await s.point(internal)
await s.say(c.record, 3800 * pace)
await s.say(c.fixed, 2800 * pace)
await s.unring()

// ── Board A's job card, as the Service Head ────────────────────────────────────────────────────
await become(s, 'servicehead@thulirtech.com', jobPath(A))
await s.wait(600)
const dt = (t: string) => p.locator('dl.money dt', { hasText: new RegExp(`^${t}$`) })
const dd = (t: string) => dt(t).locator('xpath=following-sibling::dd[1]')
await s.point(p.getByText('What it cost, and what it made'))
await s.say(c.jobCard, 3600 * pace)
await pointAll(s, [dt('Normal price'), dd('Labour charge')])
await s.say(c.labourShown, 3800 * pace)
await pointAll(s, [dt('Premium'), dd('Charged')])
await s.say(c.charged, 3600 * pace, 'dont')
await s.unring()
await s.quiet()
await card(c.marginCard, 10500)
await card(c.totalCard, 10000)
await pointAll(s, [dt('Labour margin'), dd('Total margin')])
await s.say(c.onScreen, 4200 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 7500 * pace)

console.log(await s.close(join(OUT, `15-money-price.${lang}.webm`)))
