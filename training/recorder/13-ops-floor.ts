/**
 * Module 13 · Numbers · Operations 1: where the floor loses time (KPI catalogue clip 1a).
 *
 * Signed in as the Service Head (an MIS role, and one who also sees Service › What has stalled).
 * For each figure: a worked-example card from the catalogue's September, then the real screen.
 * The screens show the local demo's figures, and the captions say so. Nothing is written.
 *
 *   npx tsx 13-ops-floor.ts [en|ta]    → out/13-ops-floor.<lang>.webm
 */
import { Stage } from './stage'
import { example } from './13-kpi-helpers'
import { CAPTIONS, type Lang } from './captions-13'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const CARD = 6000 * pace

const s = await Stage.open('servicehead@thulirtech.com', '/mis?period=this-month', join(OUT, 'raw'))
const p = s.page
const settle = async () => {
  await p.waitForLoadState('networkidle')
  await s.wait(900)
}

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3800 * pace)

// The dashboard, the period
await s.point(p.locator('section[data-code="KPI"]'))
await s.say(c.demo, 3200 * pace)
await s.unring()

// 1 · Yield
await s.quiet()
await s.card(example(c.exYield), CARD)
const tile = (name: string) => p.locator('a.fig', { hasText: name }).first()
await s.point(tile('Yield'))
await s.say(c.yieldTile, 3600 * pace)
await s.click(tile('Yield'))
await settle()
await s.point(p.locator('.swbox').first())
await s.say(c.yieldBar, 3200 * pace)
await s.point(p.locator('section[data-code="SEG"]'))
await s.say(c.yieldDont, 3800 * pace, 'dont')
await s.unring()

// 2 · Wastage cost
await s.quiet()
await s.card(example(c.exWaste), CARD)
await s.point(p.locator('.pair .fig', { hasText: 'Wastage cost this period' }))
await s.say(c.waste, 3600 * pace)

// 3 · Rework rate
await s.quiet()
await s.card(example(c.exRework), CARD)
await s.point(p.locator('.pair .fig', { hasText: 'Rework jobs' }))
await s.say(c.rework, 3000 * pace)
await s.unring()

// 4 · Queue aging and the testing gates
await s.quiet()
await s.card(example(c.exAging), CARD)
await s.goto('/mis/aging?period=this-month')
await s.wait(800)
await s.point(p.locator('table.heatmap thead'))
await s.say(c.agingCols, 3400 * pace)
const old = p.locator('table.heatmap tbody tr', { hasText: 'Pending Spare' }).first()
if (await old.isVisible().catch(() => false)) {
  await s.point(old)
  await s.say(c.agingOld, 2600 * pace)
}
await s.point(p.locator('section[data-code="GATE"]'))
await s.say(c.gates, 3800 * pace, 'do')
await s.point(p.locator('table.heatmap tbody tr', { hasText: 'Under Assessment' }).first())
await s.say(c.liaison, 3400 * pace)
await s.unring()

// 5 · Stuck tasks (MIS)
await s.quiet()
await s.card(example(c.exStuck), CARD)
await s.goto('/mis?period=this-month')
await s.point(tile('Stuck jobs'))
await s.say(c.stuckTile, 1400 * pace)
await s.click(tile('Stuck jobs'))
await settle()
await s.point(p.locator('section[data-code="IDLE"]'))
await s.say(c.stuckList, 3400 * pace)
await s.point(p.locator('section[data-code="RULE"]'))
await s.say(c.stuckRule, 3600 * pace)
await s.unring()
await s.say(c.stuckDo, 2800 * pace, 'do')

// 6 · What has stalled › Stuck (a different list)
await s.quiet()
await s.card(example(c.exStalled), CARD)
await s.goto('/service-centre/worklists')
await s.wait(800)
await s.point(p.locator('section[data-code="STK"]'))
await s.say(c.stalled, 3200 * pace)
const waiting = p.locator('section[data-code="Q"] tbody tr', { hasText: 'Pending Spare' }).first()
if (await waiting.isVisible().catch(() => false)) {
  await s.point(waiting)
  await s.say(c.stalledPending, 3800 * pace)
}
await s.unring()
await s.say(c.twoLists, 3000 * pace, 'dont')

// 7 · Unbilled hours
await s.quiet()
await s.card(example(c.exUnbilled), CARD + 1000 * pace)
await s.goto('/mis?period=this-month')
await s.point(tile('Unbilled hours'))
await s.say(c.unbilledTile, 1400 * pace)
await s.click(tile('Unbilled hours'))
await settle()
await s.point(p.locator('section[data-code="CAP"]'))
await s.say(c.unbilledSplit, 3200 * pace)
const gap = p.locator('section[data-code="GAP"]')
if (await gap.isVisible().catch(() => false)) {
  await s.point(gap)
  await s.say(c.unbilledGap, 3400 * pace)
}
await s.unring()
await s.say(c.unbilledDont, 2800 * pace, 'dont')
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)

console.log(await s.close(join(OUT, `13-ops-floor.${lang}.webm`)))
