import { Stage } from './stage'
const R = 'WO/26-27/00114'
const s = await Stage.open('engineer@thulirtech.com', `/service-centre/timesheet?week=2026-09-21&job=${encodeURIComponent(R)}`, '/tmp/claude-0/-home-user-reapir-software/fa8f5f2c-a102-540e-9e6c-ca89930d82f6/scratchpad/raw', { record: false })
const p = s.page
const cell = p.getByLabel(`${R} Thu`)
console.log(await cell.count())
await cell.fill('2'); await cell.press('Enter'); await p.waitForTimeout(2500)
console.log((await p.locator('main').innerText()).slice(0, 1500))
await s.close()
