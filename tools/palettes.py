# /usr/local/bin/python3 tools/palettes.py — writes palettes.json: 10 colours per photo from its VISIBLE crop
# (the crop + frame size mirror MEMORIES / LAYOUTS[0] in app.js). After running, paste palettes.json into PALETTES in app.js.
from PIL import Image
import json
CROP={'m01':([-12.03,-14.8,112.03,122.45],(101.2,163.9)),'m02':([0,0,100,100],(122.1,162.8)),'m03':([0,-105.8,100,311.76],(163.9,113.3)),
'm04':([0,0,100,100],(163.9,163.9)),'m05':([0,0,99.93,132.96],(107.8,181.5)),'m06':('cover',(108.9,177.1)),'m07':([0,0,100,213.06],(174.9,115.5)),
'm08':([0,0,100,104.35],(108.9,185.9)),'m09':([0,-15.82,100,116.38],(156.2,178.2)),'m10':('cover',(133.1,177.1))}
out={}
for m,(c,(fw,fh)) in CROP.items():
    im=Image.open(f'img/{m}.jpg').convert('RGB'); W,H=im.size
    if c=='cover':
        s=max(fw/W,fh/H); vw,vh=fw/s,fh/s; box=((W-vw)/2,(H-vh)/2,(W+vw)/2,(H+vh)/2)
    else:
        l,t,w,h=c; x0=-l/w*W; y0=-t/h*H; box=(max(0,x0),max(0,y0),min(W,x0+100/w*W),min(H,y0+100/h*H))
    v=im.crop(tuple(int(round(b)) for b in box)); v.thumbnail((300,300))
    q=v.quantize(colors=10, method=Image.Quantize.MEDIANCUT, kmeans=3)
    pal=q.getpalette(); counts=sorted(q.getcolors(), reverse=True); tot=sum(n for n,_ in counts)
    out[m]=[{'hex':'#%02x%02x%02x'%tuple(pal[i*3:i*3+3]),'share':round(n/tot,4)} for n,i in counts]
# board photos (theme 3 places, theme 4 materials) — whole image, keyed place:<id> / material:<id>
import glob,os
for f in sorted(glob.glob('boards/web/*/*.jpg')):
    key=f.split('/')[2][:-1]+':'+os.path.basename(f)[:-4]
    v=Image.open(f).convert('RGB'); v.thumbnail((300,300))
    q=v.quantize(colors=10, method=Image.Quantize.MEDIANCUT, kmeans=3)
    p=q.getpalette(); counts=sorted(q.getcolors(), reverse=True); tot=sum(n for n,_ in counts)
    out[key]=[{'hex':'#%02x%02x%02x'%tuple(p[i*3:i*3+3]),'share':round(n/tot,4)} for n,i in counts]
json.dump(out,open('palettes.json','w'),indent=1)
print('ok')
