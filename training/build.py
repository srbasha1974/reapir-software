#!/usr/bin/env python3
"""Builds the training page from training-map.src.html and modules/*.json.

    python3 build.py            -> training-map.html, media linked by relative path (works from the repo)
    python3 build.py --hosted   -> dist/training-map.html for the published artifact: media point at
                                   the artifact's asset store (media/hosted.json), and only modules
                                   whose files are all uploaded are included.
"""
import json, pathlib, sys
here = pathlib.Path(__file__).parent
hosted = '--hosted' in sys.argv
blobs = json.loads((here / 'media' / 'hosted.json').read_text()) if hosted else {}
mods, skipped = {}, []
for f in sorted((here / 'modules').glob('*.json')):
    m = json.loads(f.read_text())
    paths = [p for k in ('video', 'poster') for p in m[k].values()]
    for p in paths:
        assert (here / p).exists(), f'{f.name}: missing {p}'
    assert len(m['quiz']['en']) == len(m['quiz']['ta']), f'{f.name}: quiz languages differ'
    if hosted:
        if not all(p in blobs for p in paths):
            skipped.append(m['id'])
            continue
        for k in ('video', 'poster'):
            m[k] = {lang: blobs[p] for lang, p in m[k].items()}
    mods[m['id']] = m
src = (here / 'training-map.src.html').read_text()
out = src.replace('/*@@MODULES@@*/{}', json.dumps(mods, ensure_ascii=False))
dest = here / ('dist/training-map.html' if hosted else 'training-map.html')
dest.parent.mkdir(exist_ok=True)
dest.write_text(out)
print('modules:', ', '.join(mods), '| not uploaded yet:', ', '.join(skipped) or 'none', '->', dest.relative_to(here))
