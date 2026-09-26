"""
Encodes a take of modules 00, 01, 02 or 12 to training/media, as BRIEF.md describes, with two additions:

  - the start is found by itself: the first frame where the title card's grey ground fills the corner
    (the app's top bar there is white), plus a moment for the logo to draw;
  - dead server time is cut out: frames carrying the magenta corner mark lit by Cuts (00-helpers.ts).

  python3 00-encode.py 12-leads en 12-leads     → ../media/12-leads.mp4 (+ poster), prints seconds
"""
import os, subprocess, sys

import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
HERE = os.path.dirname(os.path.abspath(__file__))
name, lang, slug = sys.argv[1], sys.argv[2], sys.argv[3]
num = name.split('-')[0]
src = os.path.join(HERE, 'out', f'{name}.{lang}.webm')
suffix = '' if lang == 'en' else '-ta'
mp4 = os.path.join(HERE, '..', 'media', f'{slug}{suffix}.mp4')
poster = os.path.join(HERE, '..', 'media', f'{num}-poster{suffix}.jpg')
H = 768


def pixels(x, y):
    """One pixel per frame, at 25 fps, as a list of (r, g, b)."""
    raw = subprocess.run([FF, '-loglevel', 'error', '-i', src, '-vf', f'fps=25,format=rgb24,crop=2:2:{x}:{y}',
                          '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
    return [tuple(raw[i:i + 3]) for i in range(0, len(raw) - 11, 12)]


def near(px, rgb, tol):
    return all(abs(a - b) < tol for a, b in zip(px, rgb))


top = pixels(6, 6)
first = next((i for i, px in enumerate(top) if near(px, (238, 240, 243), 6)), None)
if first is None:
    sys.exit('no title card found')
start = first + 9  # a moment for the logo to draw

spans = []
for i, px in enumerate(pixels(0, H - 3)):
    if not near(px, (255, 0, 255), 40):
        continue
    if spans and i <= spans[-1][1] + 2:
        spans[-1][1] = i
    else:
        spans.append([i, i])

# A corrected title card (00-title.ts), laid over the frames where the recorded card is up.
title = os.path.join(HERE, 'out', f'{num}-title.{lang}.png')
card_end = first
while card_end + 1 < len(top) and near(top[card_end + 1], (238, 240, 243), 6):
    card_end += 1
expr = f'gte(n,{start})' + ''.join(f'*not(between(n,{a - 1},{b + 1}))' for a, b in spans)
pick = f"select='{expr}',setpts=N/25/TB"
if os.path.exists(title):
    graph = ['-i', src, '-loop', '1', '-i', title, '-filter_complex',
             f"[0:v]fps=25[m];[m][1:v]overlay=shortest=1:enable='between(n,{first},{card_end})',{pick}"]
else:
    graph = ['-i', src, '-vf', f'fps=25,{pick}']
subprocess.run([FF, '-y', '-loglevel', 'error', *graph,
                '-r', '25', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p',
                '-movflags', '+faststart', '-an', mp4], check=True)
subprocess.run([FF, '-y', '-loglevel', 'error', '-ss', '1.0', '-i', mp4, '-frames:v', '1', '-q:v', '3', poster], check=True)
out = subprocess.run([FF, '-i', mp4], capture_output=True, text=True).stderr
h, m, s = [l for l in out.splitlines() if 'Duration' in l][0].split(',')[0].split()[-1].split(':')
secs = int(h) * 3600 + int(m) * 60 + float(s)
cut = sum(b - a + 3 for a, b in spans) / 25
print(f'{os.path.basename(mp4)} title={"patched" if os.path.exists(title) else "as filmed"} start={start / 25:.2f}s cut={cut:.1f}s in {len(spans)} spans -> {secs:.1f}s {os.path.getsize(mp4) / 1e6:.1f}MB')
