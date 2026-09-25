#!/usr/bin/env python3
"""Builds training-map.html from training-map.src.html and modules/*.json."""
import json, pathlib
here = pathlib.Path(__file__).parent
mods = {}
for f in sorted((here / 'modules').glob('*.json')):
    m = json.loads(f.read_text())
    for k in ('video', 'poster'):
        for lang, path in m[k].items():
            assert (here / path).exists(), f'{f.name}: missing {path}'
    assert len(m['quiz']['en']) == len(m['quiz']['ta']), f'{f.name}: quiz languages differ'
    mods[m['id']] = m
src = (here / 'training-map.src.html').read_text()
out = src.replace('/*@@MODULES@@*/{}', json.dumps(mods, ensure_ascii=False))
(here / 'training-map.html').write_text(out)
print('modules:', ', '.join(mods))
