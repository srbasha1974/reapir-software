/**
 * Joins a module's per-role recordings (06, 08), each trimmed to where its first card is fully drawn.
 *
 * The Rack & Bin cards are a white bay on the grey ground (#EEF0F3) with a 3px green rule under the
 * bin label, so a card frame is found by: the left edge grey from top to bottom, and one row where the
 * green rule crosses the bay. Three 1-px columns of the first 12 s are read, at 10 frames a second.
 */
import { execFileSync } from 'node:child_process'

export const FF = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim()
const HGT = 768
const near = (a: number[], b: number[], t: number) => a.every((v, i) => Math.abs(v - b[i]) <= t)

export function cardStart(file: string): number {
  const cols = [20, 300, 1000]
  const f = '[0:v]format=rgb24,split=3[a0][a1][a2];' + cols.map((x, i) => `[a${i}]crop=2:${HGT}:${x}:0[c${i}]`).join(';') + `;[c0][c1][c2]hstack=3,fps=10[o]`
  const raw = execFileSync(FF, ['-loglevel', 'error', '-t', '12', '-i', file, '-filter_complex', f, '-map', '[o]', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], { maxBuffer: 1 << 28 })
  const frame = 6 * HGT * 3
  for (let k = 0; k * frame < raw.length; k++) {
    const px = (x: number, y: number) => { const o = k * frame + (y * 6 + x * 2) * 3; return [raw[o], raw[o + 1], raw[o + 2]] }
    let grey = true
    for (let y = 0; y < HGT && grey; y += 4) grey = near(px(0, y), [238, 240, 243], 8)
    if (!grey) continue
    for (let y = 0; y < HGT; y++) {
      if (near(px(1, y), [88, 160, 56], 30) && near(px(2, y), [88, 160, 56], 30)) return k / 10 + 0.2
    }
  }
  throw new Error(`No card found early in ${file}`)
}

export function joinAtCards(segments: string[], out: string) {
  const trims = segments.map(cardStart)
  console.log('segment starts', trims)
  const inputs = segments.flatMap((f, i) => ['-ss', String(trims[i]), '-i', f])
  const filter = segments.map((_, i) => `[${i}:v]fps=25,setpts=PTS-STARTPTS[v${i}]`).join(';') +
    ';' + segments.map((_, i) => `[v${i}]`).join('') + `concat=n=${segments.length}:v=1:a=0[out]`
  execFileSync(FF, ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', filter, '-map', '[out]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '14', '-pix_fmt', 'yuv420p', '-an', out])
  return out
}
