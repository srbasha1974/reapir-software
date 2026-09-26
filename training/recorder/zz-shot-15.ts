import { Stage } from '/home/user/reapir-software/training/recorder/stage'
const [email, path, out, full] = process.argv.slice(2)
const s = await Stage.open(email, path, '/tmp/claude-0/-home-user-reapir-software/fa8f5f2c-a102-540e-9e6c-ca89930d82f6/scratchpad/raw', { record: false })
await s.wait(1500)
await s.page.screenshot({ path: out, fullPage: full === 'full' })
if (process.env.TEXT) console.log((await s.page.locator('main').innerText()).slice(0, 6000))
await s.close()
