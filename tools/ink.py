# ink extents of the title and labels: python3 tools/ink.py img.png
import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB'); W,H=im.size; px=im.load()
def ext(x0,y0,x1,y1):
    xs=[];ys=[]
    for y in range(y0,y1):
        for x in range(x0,x1):
            r,g,b=px[x,y]
            if r<60 and g<60 and b<60: xs.append(x); ys.append(y)
    return (min(xs),max(xs),min(ys),max(ys)) if xs else None
print('EXERCISE',ext(0,55,700,150),'02',ext(700,55,1000,150),'M-left',ext(0,185,110,232),'E-right',ext(880,185,1000,232),'2026',ext(1300,52,1440,75),'themes',ext(1000,765,1440,790))
