/* Shared by index.html (photos) and colors.html (palettes). The stage markup is injected from here so the two pages can't drift. */
const STAGE = `<div id="stage">
  <div class="pat dash" id="pat-t1a"></div>
  <div class="pat dots" id="pat-t1b"></div>
  <div class="pat dash" id="pat-t2a" data-node="1:27"></div>
  <div class="pat diag" id="pat-t2b" data-node="1:28"></div>

  <div class="title" data-node="1:6"><p class="l1">exercise     02 </p><p class="l2">memoryscape</p></div>
  <p class="year small" data-node="1:25">2026</p>
  <nav class="vers small" aria-label="גרסה"><a data-ver="1">גרסה 1</a><a data-ver="2">גרסה 2</a><a data-ver="3">גרסה 3</a></nav>
  <nav class="views small" aria-label="תצוגה"><a href="colors.html" data-view="color">צבע</a><a href="index.html" data-view="photo">תמונה</a></nav>

  <div id="cards"></div>

  <div class="legend" id="legend-t1" data-node="1:78">
    <div class="it"><span class="sw dots"></span><span class="small" dir="rtl">מערכות יחסים אחרות</span></div>
    <div class="it"><span class="sw dash"></span><span class="small" dir="rtl" style="position:relative;top:0">הורים וילדים</span></div>
  </div>
  <div class="legend" id="legend-t2" data-node="1:54">
    <div class="it"><span class="sw dash"></span><span class="small" dir="rtl">יפתח</span></div>
    <div class="it"><span class="sw diag"></span><span class="small" dir="rtl">יעל</span></div>
  </div>

  <nav class="themes" data-node="1:20" aria-label="תמות">
    <button data-theme="4" aria-pressed="false" style="width:53px">תמה 4</button>
    <button data-theme="3" aria-pressed="false" style="width:53px">תמה 3</button>
    <button data-theme="2" aria-pressed="false" style="width:52px">תמה 2</button>
    <button data-theme="1" aria-pressed="false" style="width:50px">תמה 1</button>
  </nav>
</div>

<div id="lb"></div>
<button id="close" aria-label="סגירה"><svg viewBox="0 0 22 22" fill="none" stroke="#000" stroke-width="1.4"><path d="M2 2L20 20M20 2L2 20"/></svg></button>`;

/* ─────────────────────────────────────────────────────────────
   MEMORIES — one entry per photo.
   `meta` is the hidden accompanying text (what is seen in the image).
   It is never rendered; fill it in here.
   crop = the Figma image-fill geometry as % of the frame [left, top, width, height] or 'cover'.
   ───────────────────────────────────────────────────────────── */
/* PALETTES — 10 colours per photo, from its VISIBLE crop (median-cut + k-means, tools/palettes.py), sorted by share. */
const PALETTES = {"m01":[{"hex":"#c2c2c9","share":0.145},{"hex":"#b9b5bd","share":0.1385},{"hex":"#aea6ae","share":0.1177},{"hex":"#454249","share":0.1174},{"hex":"#9d94a0","share":0.0964},{"hex":"#7c6572","share":0.0909},{"hex":"#897c8d","share":0.0884},{"hex":"#5b555f","share":0.0844},{"hex":"#c8ced6","share":0.0761},{"hex":"#b07e7f","share":0.0452}],"m02":[{"hex":"#a8b2b3","share":0.2125},{"hex":"#999b97","share":0.1314},{"hex":"#c7b7af","share":0.1106},{"hex":"#7f8385","share":0.1047},{"hex":"#6f6663","share":0.0944},{"hex":"#46464a","share":0.0869},{"hex":"#272627","share":0.0853},{"hex":"#baa59b","share":0.0807},{"hex":"#d4c8c4","share":0.0729},{"hex":"#dbe4f3","share":0.0206}],"m03":[{"hex":"#856b68","share":0.133},{"hex":"#987d75","share":0.1145},{"hex":"#b89f95","share":0.1096},{"hex":"#a98f85","share":0.1083},{"hex":"#c7b1a7","share":0.1072},{"hex":"#e1d6d1","share":0.103},{"hex":"#d4c3bb","share":0.0999},{"hex":"#755755","share":0.0996},{"hex":"#613e42","share":0.0757},{"hex":"#f2eae4","share":0.0491}],"m04":[{"hex":"#847676","share":0.1271},{"hex":"#6d5855","share":0.1192},{"hex":"#afa7a8","share":0.1175},{"hex":"#654e4c","share":0.1174},{"hex":"#7b6a68","share":0.1148},{"hex":"#bbb6b6","share":0.1139},{"hex":"#74615f","share":0.1052},{"hex":"#908585","share":0.0726},{"hex":"#9e9596","share":0.0711},{"hex":"#d2cfcc","share":0.0411}],"m05":[{"hex":"#887762","share":0.2523},{"hex":"#a87839","share":0.1378},{"hex":"#452913","share":0.1314},{"hex":"#c09551","share":0.1117},{"hex":"#5b4026","share":0.0981},{"hex":"#8e5f29","share":0.0875},{"hex":"#685b4b","share":0.0665},{"hex":"#1e140b","share":0.0417},{"hex":"#c5ae89","share":0.0375},{"hex":"#e2d5c2","share":0.0355}],"m06":[{"hex":"#566e5a","share":0.1658},{"hex":"#445649","share":0.149},{"hex":"#6d816e","share":0.1426},{"hex":"#6b676c","share":0.1236},{"hex":"#fdfefe","share":0.1139},{"hex":"#58535a","share":0.1055},{"hex":"#2b2e41","share":0.0657},{"hex":"#95867f","share":0.0637},{"hex":"#cccfd9","share":0.0393},{"hex":"#afa9ae","share":0.0307}],"m07":[{"hex":"#b1b0ae","share":0.1731},{"hex":"#bdbcb8","share":0.1545},{"hex":"#a1a1a0","share":0.1321},{"hex":"#332c2c","share":0.1142},{"hex":"#606367","share":0.1003},{"hex":"#797877","share":0.0971},{"hex":"#8f8e8d","share":0.091},{"hex":"#cbcac9","share":0.0692},{"hex":"#624f43","share":0.0521},{"hex":"#f4f4f2","share":0.0164}],"m08":[{"hex":"#cfbda9","share":0.1669},{"hex":"#e4dbd2","share":0.1537},{"hex":"#483e3e","share":0.1527},{"hex":"#dcd3c9","share":0.1037},{"hex":"#dfcdb9","share":0.1007},{"hex":"#e5d3bf","share":0.0965},{"hex":"#bfa892","share":0.0683},{"hex":"#b08d70","share":0.0588},{"hex":"#63514f","share":0.0532},{"hex":"#926f5c","share":0.0455}],"m09":[{"hex":"#231a16","share":0.1341},{"hex":"#0f0d0c","share":0.1327},{"hex":"#a5a5a2","share":0.1225},{"hex":"#322b27","share":0.1201},{"hex":"#473c34","share":0.113},{"hex":"#deded9","share":0.108},{"hex":"#585048","share":0.0991},{"hex":"#6f675c","share":0.0874},{"hex":"#89857a","share":0.0538},{"hex":"#611a17","share":0.0294}],"m10":[{"hex":"#0f0d0a","share":0.1645},{"hex":"#1b1713","share":0.1378},{"hex":"#85715e","share":0.1207},{"hex":"#59493b","share":0.1099},{"hex":"#695d51","share":0.0995},{"hex":"#998a75","share":0.0985},{"hex":"#2c241e","share":0.0906},{"hex":"#42372c","share":0.0886},{"hex":"#b9ab97","share":0.065},{"hex":"#ded3bf","share":0.0249}],"material:asphalt":[{"hex":"#958b89","share":0.2417},{"hex":"#998f8c","share":0.2192},{"hex":"#918886","share":0.1427},{"hex":"#8f8684","share":0.1133},{"hex":"#938987","share":0.1055},{"hex":"#a09592","share":0.0669},{"hex":"#d4cecf","share":0.0437},{"hex":"#8b8280","share":0.0306},{"hex":"#c4bebc","share":0.021},{"hex":"#b1a9a7","share":0.0154}],"material:gold-tile":[{"hex":"#9f8f86","share":0.1481},{"hex":"#8b7b72","share":0.1369},{"hex":"#b2a298","share":0.1352},{"hex":"#73655c","share":0.1076},{"hex":"#c6b6a9","share":0.1041},{"hex":"#352924","share":0.1012},{"hex":"#544943","share":0.0906},{"hex":"#b38f63","share":0.0871},{"hex":"#c5a479","share":0.0479},{"hex":"#dccec0","share":0.0411}],"material:grass":[{"hex":"#276213","share":0.194},{"hex":"#4c8637","share":0.1712},{"hex":"#366f2b","share":0.1467},{"hex":"#407f16","share":0.1273},{"hex":"#629a4b","share":0.1134},{"hex":"#174a0b","share":0.1133},{"hex":"#68a322","share":0.0606},{"hex":"#90c053","share":0.0441},{"hex":"#646d69","share":0.0216},{"hex":"#dbefaa","share":0.0078}],"material:painted-floor":[{"hex":"#e6891c","share":0.1746},{"hex":"#e7dccd","share":0.1622},{"hex":"#d1a963","share":0.1552},{"hex":"#d9b576","share":0.1371},{"hex":"#eae2d7","share":0.1364},{"hex":"#e4c593","share":0.069},{"hex":"#edd4b3","share":0.0606},{"hex":"#f4ede4","share":0.0475},{"hex":"#983612","share":0.0449},{"hex":"#a56a4b","share":0.0126}],"material:sesame-floor":[{"hex":"#d8d2c7","share":0.1656},{"hex":"#a2988b","share":0.1223},{"hex":"#cfc9be","share":0.1148},{"hex":"#aba294","share":0.112},{"hex":"#e2dcd1","share":0.1063},{"hex":"#b4ab9d","share":0.101},{"hex":"#bcb4a7","share":0.0963},{"hex":"#c5beb2","share":0.092},{"hex":"#998d7e","share":0.0726},{"hex":"#8b715e","share":0.0171}],"material:sidewalk":[{"hex":"#c3a084","share":0.1788},{"hex":"#302824","share":0.1474},{"hex":"#b08c70","share":0.1405},{"hex":"#a29693","share":0.1047},{"hex":"#5a5453","share":0.0906},{"hex":"#141210","share":0.0906},{"hex":"#493c35","share":0.088},{"hex":"#877e79","share":0.0731},{"hex":"#886b56","share":0.0642},{"hex":"#d4c2b4","share":0.0221}],"place:hatachtit":[{"hex":"#6a6866","share":0.2263},{"hex":"#595855","share":0.1745},{"hex":"#e1dbcf","share":0.1002},{"hex":"#3b3a34","share":0.0975},{"hex":"#f0ede7","share":0.086},{"hex":"#1c1b1a","share":0.0718},{"hex":"#7d8ea4","share":0.069},{"hex":"#898173","share":0.0648},{"hex":"#ada698","share":0.057},{"hex":"#c8c2b6","share":0.053}],"place:klay-8-givatayim":[{"hex":"#f1f1f2","share":0.1634},{"hex":"#24261c","share":0.1252},{"hex":"#3a3b2e","share":0.1149},{"hex":"#4e4e46","share":0.112},{"hex":"#837d6f","share":0.1006},{"hex":"#64635b","share":0.0999},{"hex":"#e2e1e0","share":0.0809},{"hex":"#aeb6c3","share":0.0705},{"hex":"#a29a88","share":0.0704},{"hex":"#cdcdce","share":0.0622}],"place:matalon-70":[{"hex":"#d0e3f6","share":0.147},{"hex":"#42433f","share":0.138},{"hex":"#2f302c","share":0.1191},{"hex":"#94938d","share":0.1073},{"hex":"#525454","share":0.1039},{"hex":"#6a6a5f","share":0.0888},{"hex":"#7f807c","share":0.0883},{"hex":"#1a1a18","share":0.0866},{"hex":"#b3ad9f","share":0.0694},{"hex":"#f8fbfd","share":0.0516}],"place:shalom-tower":[{"hex":"#dbd9cf","share":0.1898},{"hex":"#c3c3bc","share":0.1476},{"hex":"#fdffff","share":0.1073},{"hex":"#c5e5fe","share":0.1009},{"hex":"#969590","share":0.0925},{"hex":"#6c7174","share":0.091},{"hex":"#97acbb","share":0.0762},{"hex":"#484748","share":0.0719},{"hex":"#e9f4fc","share":0.0711},{"hex":"#201f1f","share":0.0517}],"place:wadi-shiach-orchard":[{"hex":"#0f1310","share":0.1372},{"hex":"#1e241c","share":0.1181},{"hex":"#728053","share":0.1085},{"hex":"#d7d6d5","share":0.1053},{"hex":"#858f70","share":0.105},{"hex":"#5d6843","share":0.103},{"hex":"#323a29","share":0.0977},{"hex":"#475035","share":0.0927},{"hex":"#bfbfbb","share":0.0667},{"hex":"#9c9f91","share":0.0658}],"place:yaavetz-2a":[{"hex":"#514e41","share":0.1428},{"hex":"#444133","share":0.1405},{"hex":"#706c62","share":0.1289},{"hex":"#363425","share":0.1275},{"hex":"#605c51","share":0.1257},{"hex":"#837e70","share":0.1081},{"hex":"#979389","share":0.0881},{"hex":"#aaacad","share":0.0634},{"hex":"#242318","share":0.0595},{"hex":"#cdcdcc","share":0.0155}],"place:yarkon-park":[{"hex":"#f5f8fc","share":0.1961},{"hex":"#6c7c16","share":0.153},{"hex":"#475b1c","share":0.1255},{"hex":"#829f3b","share":0.0996},{"hex":"#d0e1f9","share":0.0974},{"hex":"#62774d","share":0.0837},{"hex":"#82997e","share":0.0713},{"hex":"#223411","share":0.0667},{"hex":"#a6c95b","share":0.0607},{"hex":"#a4bcbd","share":0.0459}]};
const VIEW = document.documentElement.dataset.view || 'photo';   // 'photo' (index.html) | 'color' (colors.html)

const MEMORIES = [
  {id:'m01', src:'img/m01.jpg', rot:true, fill:'#fff', crop:[-12.03,-14.8,112.03,122.45], nat:[1920,1080], meta:''},
  {id:'m02', src:'img/m02.jpg', fill:'#fff', crop:[0,0,100,100],          nat:[1512,2016], meta:''},
  {id:'m03', src:'img/m03.jpg', fill:'#fff', crop:[0,-105.8,100,311.76],  nat:[946,2048],  meta:''},
  {id:'m04', src:'img/m04.jpg',              crop:[0,0,100,100],          nat:[496,496],   meta:''},
  {id:'m05', src:'img/m05.jpg', fill:'#fff', crop:[0,0,99.93,132.96],     nat:[921,2048],  meta:''},
  {id:'m06', src:'img/m06.jpg',              crop:'cover',                nat:[899,1599],  meta:''},
  {id:'m07', src:'img/m07.jpg',              crop:[0,0,100,213.06],       nat:[1184,1664], meta:''},
  {id:'m08', src:'img/m08.jpg',              crop:[0,0,100,104.35],       nat:[1080,1920], meta:''},
  {id:'m09', src:'img/m09.jpg', fill:'#fff', crop:[0,-15.82,100,116.38],  nat:[1200,1600], meta:''},
  {id:'m10', src:'img/m10.jpg',              crop:'cover',                nat:[1536,2048], meta:''},
];

/* LAYOUTS — [x, y, w, h] in frame px, straight from Figma. A memory missing from a layout fades out.
   `pats` / `legend` switch on background patterns + legend; `extras` (future) adds images only that theme shows. */
const LAYOUTS = {
  0: { /* 1:5 default */
    m01:[93,482,163.9,101.2],   m02:[114,232,122.1,162.8], m03:[379,232,163.9,113.3], m04:[379,482.2,163.9,163.9],
    m05:[665,482.2,107.8,181.5],m06:[664,232,108.9,177.1], m07:[895,232,174.9,115.5], m08:[927,482.2,108.9,185.9],
    m09:[1191,232,156.2,178.2], m10:[1202,482.2,133.1,177.1],
  },
  1: { /* theme 1 — two sides, every photo at its DEFAULT size (no scaling, per Yael 08/11).
          Right: הורים וילדים — Figma 1:61's arrangement (m07 bottom-aligned to m06, m07/m10 share a left edge). Left: מערכות יחסים אחרות. Rows at the default tops 232 / 482.2 */
    m06:[904,232,108.9,177.1], m07:[1057.4,293.6,174.9,115.5], m08:[904,482.2,108.9,185.9], m10:[1057.4,486.7,133.1,177.1],
    m02:[98.95,232,122.1,162.8], m03:[290.05,232,163.9,113.3], m09:[505.9,232,156.2,178.2],
    m01:[78.05,482.2,163.9,101.2], m04:[290.05,482.2,163.9,163.9], m05:[530.1,482.2,107.8,181.5],
    pats:['pat-t1a','pat-t1b'], legend:'legend-t1',
  },
  2: { /* 1:26 — יפתח / יעל */
    m01:[524,209,163.9,101.2], m02:[978,338,122.1,162.8], m03:[243,336,163.9,113.3], m04:[64,199,163.9,163.9],
    m05:[979,531,107.8,181.5], m06:[834,328,108.9,177.1], m07:[431,333,174.9,115.5], m08:[1193,527,108.9,185.9],
    m09:[642,333,156.2,178.2], m10:[1176,318,133.1,177.1],
    pats:['pat-t2a','pat-t2b'], legend:'legend-t2',
  },
  3: { /* מקומות — Yael's answers (08/11). Each memory sits on its PLACE PHOTO from the board (the real image, not a drawing),
          laid out roughly by geography: Haifa top-right, Tel Aviv–Givatayim below. Only photos with a named place appear.
          Rule: memory photo at place.x − 36, place.y + 46; place name above the place photo, right-aligned. */
    m10:[1074,156,133.1,177.1], m03:[764,358,163.9,113.3],
    m06:[384,376,108.9,177.1], m09:[964,586,156.2,178.2], m05:[84,606,107.8,181.5], m08:[444,606,108.9,185.9],
    extras:['p-hatachtit','p-wadi','p-yarkon','p-klay','p-yaavetz','p-matalon'],
  },
  4: { /* חומרים — each memory on a patch of its MATERIAL PHOTO from the board (cover-cropped), 3 × 2. Only photos with a named material appear. */
    m07:[80,347.25,174.9,115.5], m08:[268.9,312.05,108.9,185.9], m06:[665.6,316.45,108.9,177.1], m10:[1104.1,316.45,133.1,177.1],
    m02:[208.3,549.6,122.1,162.8], m04:[638.1,549.05,163.9,163.9], m05:[1116.75,540.25,107.8,181.5],
    extras:['x-sesame','x-grass','x-asphalt','x-gold','x-sidewalk','x-painted'],
  },
};

document.body.insertAdjacentHTML('afterbegin', STAGE);
const stage = document.getElementById('stage');

/* EXTRAS — the board photos (places / materials) a theme brings in. Fixed boxes; they fade in and out with their theme.
   place photos keep their own aspect (height 150); material photos fill a 434.7×210 patch (cover). */
const EXTRAS = {
  'p-hatachtit':{src:'boards/web/places/hatachtit.jpg',          pal:'place:hatachtit',          box:[1110,110,278.6,150],  label:'התחתית'},
  'p-wadi':     {src:'boards/web/places/wadi-shiach-orchard.jpg', pal:'place:wadi-shiach-orchard', box:[800,312,199.9,150],  label:'בוסתן ואדי שיח'},
  'p-yarkon':   {src:'boards/web/places/yarkon-park.jpg',         pal:'place:yarkon-park',         box:[420,330,265.5,150],  label:'פארק הירקון'},
  'p-klay':     {src:'boards/web/places/klay-8-givatayim.jpg',    pal:'place:klay-8-givatayim',    box:[1000,540,197.6,150], label:'קלעי 8 גבעתיים'},
  'p-yaavetz':  {src:'boards/web/places/yaavetz-2a.jpg',          pal:'place:yaavetz-2a',          box:[120,560,205.6,150],  label:'יעבץ 2א'},
  'p-matalon':  {src:'boards/web/places/matalon-70.jpg',          pal:'place:matalon-70',          box:[480,560,186.8,150],  label:'מטלון 70'},
  'x-sesame':   {src:'boards/web/materials/sesame-floor.jpg',  pal:'material:sesame-floor',  box:[52,300,434.7,210],    label:'רצפת שומשום', patch:true},
  'x-grass':    {src:'boards/web/materials/grass.jpg',         pal:'material:grass',         box:[502.7,300,434.7,210], label:'דשא',         patch:true},
  'x-asphalt':  {src:'boards/web/materials/asphalt.jpg',       pal:'material:asphalt',       box:[953.3,300,434.7,210], label:'אספלט',       patch:true},
  'x-gold':     {src:'boards/web/materials/gold-tile.jpg',     pal:'material:gold-tile',     box:[52,526,434.7,210],    label:'מרצפת זהב',   patch:true},
  'x-sidewalk': {src:'boards/web/materials/sidewalk.jpg',      pal:'material:sidewalk',      box:[502.7,526,434.7,210], label:'מדרכה',       patch:true},
  'x-painted':  {src:'boards/web/materials/painted-floor.jpg', pal:'material:painted-floor', box:[953.3,526,434.7,210], label:'רצפה מצויירת', patch:true},
};
const extrasEl = document.createElement('div'); extrasEl.id='extras';
stage.insertBefore(extrasEl, document.getElementById('cards'));
for(const [id,x] of Object.entries(EXTRAS)){
  const [l,t,w,h]=x.box, el=document.createElement('div');
  el.className='extra'+(x.patch?' patch':''); el.id=id;
  el.style.cssText=`left:${l}px;top:${t}px;width:${w}px;height:${h}px`;
  el.innerHTML = (VIEW==='color'
      ? `<div class="frame swatch">${bandsHTML(x.pal)}</div>`
      : `<img src="${x.src}" alt="">`) + `<span class="xl" dir="rtl">${x.label}</span>`;
  extrasEl.appendChild(el);
}
const cardsEl = document.getElementById('cards');
document.querySelectorAll('.views a').forEach(a=>{ if(a.dataset.view===VIEW) a.setAttribute('aria-current','page'); });


const ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="1.5"><path d="M3 13L13 3M5 3h8v8"/></svg>';

function lum(hex){ const n=parseInt(hex.slice(1),16); return (0.299*(n>>16)+0.587*(n>>8&255)+0.114*(n&255))/255; }
function bandsHTML(key){
  return PALETTES[key].map(c=>`<i class="${lum(c.hex)>.55?'lt':'dk'}" style="flex:${c.share} 1 0;background:${c.hex}"><span>${c.hex} · ${Math.round(c.share*100)}%</span></i>`).join('');
}
function frameHTML(m){
  if(VIEW==='color') return `<div class="frame swatch">${bandsHTML(m.id)}</div>`;
  const img = m.crop==='cover'
    ? `<img class="cover" src="${m.src}" alt="">`
    : `<img src="${m.src}" alt="" style="left:${m.crop[0]}%;top:${m.crop[1]}%;width:${m.crop[2]}%;height:${m.crop[3]}%">`;
  return `<div class="frame" style="--fill:${m.fill||'transparent'}">${m.rot?`<div class="rot">${img}</div>`:img}</div>`;
}

const cards = MEMORIES.map((m,i)=>{
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.id = m.id;
  el.innerHTML = frameHTML(m) + `<button class="open" aria-label="${VIEW==='color'?'פתיחת הפלטה':'פתיחת התמונה'}">${ARROW}</button>`;
  cardsEl.appendChild(el);
  // parallax state: each photo sits at its own depth
  const s = {el, m, depth: 5 + ((i*7)%11), px:0, py:0};
  el.querySelector('.open').addEventListener('click', e=>{e.stopPropagation(); expand(s)});
  return s;
});

/* ── theme switching ── */
let current = 0;
function apply(n, instant){
  const L = LAYOUTS[n];
  cards.forEach((c,i)=>{
    const r = L[c.m.id];
    c.el.style.transitionDelay = instant ? '0ms' : `${i*35}ms`;
    if(instant) c.el.style.transitionDuration = '0ms';
    if(r){
      const [x,y,w,h]=r;
      c.el.style.setProperty('--x',x+'px'); c.el.style.setProperty('--y',y+'px');
      c.el.style.setProperty('--w',w+'px'); c.el.style.setProperty('--h',h+'px');
      c.el.classList.remove('off');
    } else c.el.classList.add('off');
  });
  if(instant) requestAnimationFrame(()=>cards.forEach(c=>c.el.style.transitionDuration=''));
  document.querySelectorAll('.extra').forEach(x=>x.classList.toggle('on', !!L.extras?.includes(x.id)));
  document.querySelectorAll('.pat').forEach(p=>p.classList.toggle('on', !!L.pats?.includes(p.id)));
  document.querySelectorAll('.legend').forEach(g=>g.classList.toggle('on', L.legend===g.id));
  document.querySelectorAll('.themes button').forEach(b=>b.setAttribute('aria-pressed', String(+b.dataset.theme===n && n!==0)));
  current = n;
  // keep the theme when switching between the photo and colour views
  document.querySelectorAll('.views a').forEach(a=>{ a.href = (a.dataset.view==='color'?'colors.html':'index.html') + (n?`?theme=${n}`:''); });
  // version switch (v1 at the root, v2 in v2/) — keeps the view (photo/colour) and the theme
  const page = (VIEW==='color'?'colors.html':'index.html') + (n?`?theme=${n}`:'');
  document.querySelectorAll('.vers a').forEach(a=>{ a.href = '' + (a.dataset.ver==='3' ? 'v3/index.html'+(n?`?theme=${n}`:'') : (a.dataset.ver==='2'?'v2/':'') + page); if(a.dataset.ver==='1') a.setAttribute('aria-current','page'); });
}
document.querySelectorAll('.themes button').forEach(b=>{
  const n = +b.dataset.theme;
  if(!LAYOUTS[n]) { b.setAttribute('aria-disabled','true'); b.title='בקרוב'; return; }
  b.addEventListener('click', ()=> apply(current===n ? 0 : n));   // clicking the active theme returns to the default view
});
const q=new URLSearchParams(location.search);
if(q.has('ls')) document.documentElement.style.setProperty('--ls',q.get('ls')+'px');
apply(LAYOUTS[+q.get('theme')] ? +q.get('theme') : 0, true);

/* ── fit the 1440×838 canvas to the window ── */
let scale = 1;
function fit(){
  scale = Math.min(innerWidth/1440, innerHeight/838);
  stage.style.transform = `translate(${(innerWidth-1440*scale)/2}px,${(innerHeight-838*scale)/2}px) scale(${scale})`;
}
addEventListener('resize', fit); fit();

/* ── mouse drift ── */
let mx=0, my=0;
addEventListener('pointermove', e=>{ mx = e.clientX/innerWidth*2-1; my = e.clientY/innerHeight*2-1; });
document.addEventListener('pointerleave', ()=>{ mx=0; my=0; });
const still = matchMedia('(prefers-reduced-motion: reduce)').matches || q.has('still');
(function tick(){
  for(const c of cards){
    const tx = still?0:-mx*c.depth, ty = still?0:-my*c.depth*.7;
    c.px += (tx-c.px)*.06; c.py += (ty-c.py)*.06;
    c.el.style.transform = `translate3d(${c.px.toFixed(2)}px,${c.py.toFixed(2)}px,0)`;
  }
  requestAnimationFrame(tick);
})();

/* ── expand to full screen ── */
const lb = document.getElementById('lb'), closeBtn = document.getElementById('close');
let open = null;
function setBox(el,r){ for(const k of ['x','y','w','h']) el.style.setProperty('--'+k, r[k]+'px'); }
function rectOf(el){ const b=el.getBoundingClientRect(); return {x:b.left,y:b.top,w:b.width,h:b.height}; }

function expand(c){
  if(open) return;
  const fly = document.createElement('div');
  fly.className = 'fly';
  fly.innerHTML = frameHTML(c.m);
  fly.style.transition = 'none';
  setBox(fly, rectOf(c.el));
  document.body.appendChild(fly);
  c.el.style.visibility = 'hidden';
  // target: the whole photo, as large as the screen allows
  const pad = 96, [nw,nh] = c.m.nat;
  const s = Math.min((innerWidth-pad*2)/nw, (innerHeight-pad*2)/nh);
  const w = nw*s, h = nh*s;
  fly.getBoundingClientRect();           // commit start state
  fly.style.transition = '';
  requestAnimationFrame(()=>{
    setBox(fly, {x:(innerWidth-w)/2, y:(innerHeight-h)/2, w, h});
    fly.classList.add('full');
    lb.classList.add('on'); closeBtn.classList.add('on');
  });
  open = {c, fly};
  closeBtn.focus({preventScroll:true});
}
function collapse(){
  if(!open) return;
  const {c, fly} = open;
  setBox(fly, rectOf(c.el));
  fly.classList.remove('full');
  lb.classList.remove('on'); closeBtn.classList.remove('on');
  fly.addEventListener('transitionend', function done(e){
    if(e.target!==fly) return;
    fly.removeEventListener('transitionend', done);
    c.el.style.visibility = ''; fly.remove(); open = null;
  });
}
closeBtn.addEventListener('click', collapse);
addEventListener('keydown', e=>{ if(e.key==='Escape') collapse(); });
