"""Applies stem additions and traps to a Turkish catalogue file (src/data/catalog/*.ts).
Used when training the evaluator on practice answers (src/lib/__tests__/answers.test.ts).

Usage: python scripts/train_stems.py src/data/catalog/<file>.ts <edits.json>
Traps replace a question's existing traps; stems are appended to the named concept.
edits.json: { "<question text>": { "stems": { "<concept label>": ["new stem", ...] }, "traps": ["Label: pat; pat"] } }
"""
import json
import re
import sys

path, edits_path = sys.argv[1], sys.argv[2]
s = open(path, encoding='utf-8', newline='').read()
edits = json.load(open(edits_path, encoding='utf-8'))


def ts_str(x: str) -> str:
    return "'" + x.replace("\\", "\\\\").replace("'", "\\'") + "'"


def string_end(src: str, open_quote: int) -> int:
    """Index of the closing quote of the TS string starting at open_quote."""
    i = open_quote + 1
    while True:
        j = src.find("'", i)
        if src[j - 1] == '\\':
            i = j + 1
            continue
        return j


for qtext, e in edits.items():
    start = s.find(ts_str(qtext))
    assert start >= 0, f"question not found: {qtext}"
    arr_open = s.find('[', start)
    arr_close = s.find(']', arr_open)
    ideal_open = s.find("'", arr_close)
    ideal_close = string_end(s, ideal_open)

    concepts = s[arr_open:arr_close]
    for label, stems in e.get('stems', {}).items():
        m = re.search(r"'" + re.escape(label) + r": ((?:[^'\\]|\\.)*)'", concepts)
        assert m, f"concept {label!r} not found in {qtext}"
        existing = [x.strip() for x in m.group(1).split(',')]
        merged = existing + [x for x in stems if x not in existing]
        concepts = concepts[:m.start()] + ts_str(label + ': ' + ', '.join(merged)) + concepts[m.end():]

    head = s[:arr_open] + concepts + s[arr_close:ideal_close + 1]
    rest = s[ideal_close + 1:]
    traps = e.get('traps')
    if traps:
        arr = '[' + ', '.join(ts_str(t) for t in traps) + ']'
        if rest.startswith(', ['):
            rest = rest[rest.find(']') + 1:]
        rest = ', ' + arr + rest
    s = head + rest

open(path, 'w', encoding='utf-8', newline='').write(s)
print('ok', len(edits))
