"""
Encodes a take of modules 00, 01, 02 or 12 to training/media, as BRIEF.md describes, with two additions:

  - the start is found by itself: the first frame where the title card's grey ground fills the corner
    (the app's top bar there is white), plus a moment for the logo to draw;
  - dead server time is cut out: out/<name>.<lang>.cuts.json (written by Cuts in 00-helpers.ts) lists
    spans in seconds from the title card.

  python3 00-encode.py 12-leads en 12-leads     → ../media/12-leads.mp4 (+ poster), prints seconds
"""
import json, os, subprocess, sys

import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
HERE = os.path.dirname(os.path.abspath(__file__))
name, lang, slug = sys.argv[1], sys.argv[2], sys.argv[3]
num = name.split('-')[0]
src = os.path.join(HERE, 'out', f'{name}.{lang}.webm')
suffix = '' if lang == 'en' else '-ta'
mp4 = os.path.join(HERE, '..', 'media', f'{slug}{suffix}.mp4')
poster = os.path.join(HERE, '..', 'media', f'{num}-poster{suffix}.jpg')

# Title card: top-left pixel turns the card ground #EEF0F3.
raw = subprocess.run([FF, '-loglevel', 'error', '-t', '20', '-i', src, '-vf', 'fps=20,crop=2:2:6:6',
                      '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
start = None
for i in range(0, len(raw) // 12):
    r, g, b = raw[i * 12:i * 12 + 3]
    if abs(r - 238) < 6 and abs(g - 240) < 6 and abs(b - 243) < 6:
        start = i / 20 + 0.35
        break
if start is None:
    sys.exit('no title card found')

cuts_file = os.path.join(HERE, 'out', f'{name}.{lang}.cuts.json')
cuts = json.load(open(cuts_file)) if os.path.exists(cuts_file) else []
vf = []
if cuts:
    expr = '+'.join(f'between(t,{start + a - 0.35:.2f},{start + b - 0.35:.2f})' for a, b in cuts)
    vf.append(f"select='not({expr})',setpts=N/FRAME_RATE/TB")
args = [FF, '-y', '-loglevel', 'error', '-i', src, '-ss', f'{start:.2f}']
# select works on source time, so trim after it via -ss on the output side only when no cuts.
if cuts:
    vf[0] = vf[0].replace("select='not(", f"select='gte(t,{start:.2f})*not(")
    args = [FF, '-y', '-loglevel', 'error', '-i', src]
args += (['-vf', ','.join(vf)] if vf else []) + ['-r', '25', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24',
                                                  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4]
subprocess.run(args, check=True)
subprocess.run([FF, '-y', '-loglevel', 'error', '-ss', '1.0', '-i', mp4, '-frames:v', '1', '-q:v', '3', poster], check=True)
out = subprocess.run([FF, '-i', mp4], capture_output=True, text=True).stderr
dur = [l for l in out.splitlines() if 'Duration' in l][0].split(',')[0].split()[-1]
h, m, s = dur.split(':')
secs = int(h) * 3600 + int(m) * 60 + float(s)
print(f'{os.path.basename(mp4)} start={start:.2f} cut={sum(b - a for a, b in cuts):.1f}s -> {secs:.1f}s {os.path.getsize(mp4) / 1e6:.1f}MB')
