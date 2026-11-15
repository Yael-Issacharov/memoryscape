# python3 tools/make-final.py — rebuild final/ from v3/: same page, minus the version switch. Edit v3, then run this.
import shutil
s = open('v3/index.html').read()
def cut(a, b=''):
    global s
    assert a in s, 'not found: ' + a[:60]
    s = s.replace(a, b, 1)
cut('  <nav class="caps" aria-label="גרסה"><a href="../index.html">גרסה 1</a><a href="../v2/index.html">גרסה 2</a><a href="index.html" aria-current="page">גרסה 3</a></nav>\n')
cut(""".brand nav{display:flex;gap:18px;direction:ltr;background:var(--panel);padding:6px 10px;pointer-events:auto}
.brand nav a{text-decoration:none;direction:rtl}
.brand nav a[aria-current="page"],.brand nav a:hover{text-decoration:underline;text-underline-position:from-font}
""")
cut('<title>Memoryscape — Exercise 02 · v3</title>', '<title>Memoryscape — Exercise 02</title>')
s = s.replace('/* Memoryscape v3 (12/11)', '/* Memoryscape — FINAL: generated from v3 by tools/make-final.py (no links to the other versions). Do not edit here.\n   Memoryscape v3 (12/11)', 1)
open('final/index.html', 'w').write(s)
shutil.copy('v3/areas.js', 'final/areas.js')
print('final/ rebuilt from v3,', s.count('גרסה 1'), 'version links left')
