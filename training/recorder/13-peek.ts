import { Stage } from './stage'
import { join } from 'node:path'
const D = '/tmp/claude-0/-home-user-reapir-software/fa8f5f2c-a102-540e-9e6c-ca89930d82f6/scratchpad/peek'
const [email, ...paths] = process.argv.slice(2)
const s = await Stage.open(email, paths[0], join(D, 'raw'), { record: false })
for (const path of paths) {
  await s.goto(path)
  await s.wait(1500)
  const name = path.replace(/[^a-z0-9]+/gi, '_')
  await s.page.screenshot({ path: join(D, `${email.split('@')[0]}${name}.png`), fullPage: true })
  console.log(name, (await s.page.locator('main').innerText().catch(() => '')).slice(0, 3000))
  console.log('-----')
}
await s.close()
