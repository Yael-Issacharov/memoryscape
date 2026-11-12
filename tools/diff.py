# python3 tools/diff.py  — raster diff of each state vs Figma's render (mean / p95 abs error, 0-255)
from PIL import Image, ImageChops
import os
STATES={'0':'ref/01-default.png','1':'ref/02-theme1.png','2':'ref/03-theme2.png'}
REG={'title':(52,52,870,231),'nav':(1000,760,400,30),'year':(1330,50,70,22),'legend':(30,745,280,40),'images':(0,150,1440,600)}
def stats(a,b):
    d=ImageChops.difference(a,b).convert('L'); px=sorted(d.getdata()); n=len(px)
    return sum(px)/n, px[int(n*.95)]
for st,ref in STATES.items():
    R=Image.open(ref).convert('RGB'); B=Image.open(f'shots/build-{st}.png').convert('RGB').crop((0,0,1440,838))
    m,p=stats(R,B); line=f'theme {st}: frame mean {m:5.2f} p95 {p:3d} |'
    for k,(x,y,w,h) in REG.items():
        m,p=stats(R.crop((x,y,x+w,y+h)),B.crop((x,y,x+w,y+h))); line+=f' {k} {m:4.1f}'
    print(line)
    d=ImageChops.difference(R,B).convert('L').point(lambda v:255-min(255,v*3)); os.makedirs('shots/diff',exist_ok=True); d.save(f'shots/diff/theme-{st}.png')
