# Memoryscape — Exercise 02 (PP course)

## WHERE WE ARE (2026-11-12, v3 added)
- **Live (12/11): https://yael-issacharov.github.io/memoryscape/** (v1) · `/v2/` · `/v3/`. GitHub Pages from `main` /, repo **public** at Yael's request (needed for Pages on the free plan), https://github.com/Yael-Issacharov/memoryscape. A push to `main` redeploys in about 1 minute. Push as **Yael-Issacharov**, then switch gh back to yaeli-byte. The commit author is her GitHub noreply address. `shots/` is git-ignored.
- **noindex (12/11):** every page (root, colors, v2 ×2, v3, questionnaire) has `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, noai, noimageai">`. Limits: GitHub Pages can't send an X-Robots-Tag header, a robots.txt only works at the domain root (yael-issacharov.github.io, which is the portfolio's, so it was left alone), and the repo itself is public. So image files opened directly, and the GitHub repo, aren't covered.
- **v3 no page zoom (12/11):** a trackpad pinch over the UI used to zoom the whole page and push the top (chips, title) out of view. Now ctrl+wheel and Safari gesture events are blocked for the page and routed to `map.setZoom` (±0.5), and the viewport meta has `maximum-scale=1, user-scalable=no`.
- **v3 theme map = OpenFreeMap "positron" via MapLibre (maplibre-gl 4.7.1 + maplibre-gl-leaflet 0.0.22), with all symbol layers removed.** Stadia (the old label-free map) answers 401 off localhost, so it can't be used on the live site. The plain white map is still OSM tiles (they work on github.io).
- **Three versions, all kept**, with a "גרסה 1 · 2 · 3" switch on every page (it keeps the theme; v1/v2 also keep photo/colour).
  - v1 = root (`index.html`, `colors.html`, `app.*`). v2 = `v2/` (photos 1.5×, themes swap content in place). v3 = `v3/index.html`.
- **v3 type rule (Yael 12/11): every text on screen is one size**, `--fs:10.5px` (14px, then −25% on 12/11) with tracking `--ls:.05em` (title .08em, caps). It includes the title, chips, labels, layers, legend, timeline, popup and attribution. Measured: one computed size, 10.5px.
- **v3 (Yael 12/11): the memories on a map of Israel, Google-Maps style.** Leaflet 1.9.4 (unpkg). Drag/zoom, zoom buttons bottom-right, area chips on top (ישראל / חיפה / תל אביב · גבעתיים).
  - **Default = "white map":** OSM standard tiles (Hebrew names) run through a CSS greyscale + high-key filter. `?tiles=toner` switches to Stamen Toner Lite (Stadia; English labels). Carto now needs an API key, so it isn't used.
  - **Each memory = a 10px black square at its place (Yael 12/11: at first glance only the layers show).** Hovering opens it to an 84px photo with the place name under it; click → fullscreen. Places without a memory (מגדל שלום) = a 6px square. מגדל שלום = a dot. The 4 unplaced memories (m01, m02, m04, m07) sit in a "בלי מקום" tray on the right. Click → fullscreen with ✕.
  - **Layers button bottom-left** (Google's שכבות): מפה לבנה · תמה 1 · תמה 2 · תמה 3 · תמה 4 · צבע, plus a legend above it. Themes draw a circular area around each place: T1 dash/dots, T2 dash/diag/both overlaid, T3 the place photo, T4 the material photo (no area if there's no material), צבע = 10 rings sized by each colour's share.
  - URL: `?view=haifa|ta|israel`, `?layer=t1..t4|color` (v1/v2's `?theme=n` maps onto it).
  - **Areas (round 6, Yael 12/11): all of Tel Aviv–Jaffa turns white once it holds a memory (Jaffa added to the white 12/11), and inside it 4 regions, Jaffa excluded, carry the fill.** The cuts follow real lines from Overpass: north = above נחל ירקון, east = past איילון, south = below רחוב אילת, centre = the rest. White base: OSM rel. 1382494 incl. Jaffa, coast-clipped. Regions: the same minus Jaffa rel. 2589843. Memories: centre = התחתית, יעבץ, אבן גבירול (+ מגדל שלום dot) · south = מטלון · east = התקווה, פארק הירקון (its point is south of the river and east of the Ayalon) · north = no memory, so white only. Outside TA a memory fills its whole city (גבעתיים, רמת גן, חיפה, ברלין). **Stacking per area kept:** shifted patterns for T1/T2, 50% layers for T3/T4/צבע, oldest first; the slider peels layers. The whole-TA and neighbourhood versions are in the scratchpad only.
  - **UI (12/11):** **opens on גוש דן** (the default view), and the chips run right→left **גוש דן · חיפה · ישראל · ברלין**, with the active one filled. The timeline is **docked left of the + / − zoom buttons** (measured with `dockTimeline()`), 440px wide so **every decade is a clickable button** that jumps the slider. The slider has a **square 12px handle** on a 3px line (Yael 12/11, matching the square markers), with the current one underlined. The **legend sits to the right of the layers button, for themes 1–2 only** (no "שניהם" line; themes 3/4/צבע have no legend). The layer picker is **click-only**: שכבות opens it and closes it, and a click elsewhere also closes it (no hover; Yael 12/11). It opens **beside** the square (left 94px, bottoms aligned; Yael 12/11: not above it), and the legend fades out while the picker is open.
  - **All 10 memories now have a place** (Yael 12/11: m04 שכונת התקווה, m07 אבן גבירול, m01 רמת גן, m02 ברלין), so the "בלי מקום" tray hides itself. The 4 new places have no board photo, so **theme 3 fills their areas with the memory's own photo** (12/11 fix: before that, older decades looked empty in theme 3). **Same in theme 4:** a memory with no material (m01, m03, m09) fills with its own photo. Every memory now shows an area in every theme and every decade. Berlin chip added; minZoom 4.
  - **Theme views have no street names**: Stamen Toner *background* (Stadia, no labels), lightened with `contrast(.14) brightness(1.78)`. The plain white map keeps OSM with Hebrew names.
  - **Year slider, bottom centre**, past on the right, present on the left (RTL). **Steps by decade** (Yael chose this 12/11): 1960s → 2020s. No heading above it (removed at Yael's request); just עבר / הווה and the decade ticks. Memories later than the chosen decade fade out, markers and areas alike. `YEAR` (decades, from Yael in chat 12/11): m04 1960 · m03 1980 · m07 1990 · m01 2000 · m02, m05, m06, m08, m09, m10 2020.
  - **Popup = photo + "place · decade" + a description** (Yael 12/11: "the descriptions are really good, write one for each photo"). The 10 Hebrew descriptions live in `META` in v3/index.html. They're the project's hidden text, now shown in the v3 popup only; v1/v2 still don't show them.
  - **התחתית is the café at לינקולן 9, Tel Aviv** (Yael 12/11), not Haifa's lower town. All places are geocoded from their addresses (Nominatim). Only בוסתן ואדי שיח is in Haifa now.
  - Circle version saved in the scratchpad only.
- **Waiting on Yael:** review of the descriptions (written by Claude from the photos; correct anything wrong), and place photos for התקווה / אבן גבירול / רמת גן / ברלין if theme 3 should fill them. Hidden text per photo is still empty.
- Pages load `app.js?v=8` / `app.css?v=8`: bump `?v=` after editing v1/v2.

## Source
Figma `LqkIx4BtVggzKCIur4NDsg` (read via the **second** Figma MCP connection, `735f00b8…`; the `figma` connection returns "no edit access").
- Questionnaire answers (artifact QN6grkQ1…, collections `answers` + `settings/themes`): theme3 = places, theme4 = materials, expression = pattern + map.
- `1:5` frame "01" = default · `1:61` frame "02" = theme 1 ("הורים וילדים") · `1:26` frame "03" = theme 2 ("יפתח" / "יעל").
- Canvas 1440×838, scaled to fit the window (contain). Reference renders are in `ref/`.

## Structure
- **v2/** (`index.html`, `colors.html`, `app.js`, `app.css`): self-contained, data at the top of `v2/app.js` (BOX, PLACE, MAT, T1, T2, THEMES). Assets via `../img`, `../fonts`, `../boards/web`. Render: `H=1000 PAGE=v2/ tools/shot.sh out.png "theme=2"`.
- v1 (below) is the frozen first version.
- `index.html` (photos) and `colors.html` (`data-view="color"`) are thin shells. **All code is in `app.css` + `app.js`**, and the stage markup is injected from `STAGE` in `app.js`, so the two views can't drift.
- `app.js` data at the top: `PALETTES` (pasted from palettes.json), plus:
  - `MEMORIES`: id, src, crop (Figma image-fill % `[l,t,w,h]` or `'cover'`), `rot` (m01 is rotated −90°), `nat` (natural px, used for the expanded view), **`meta` (hidden text, never rendered)**.
  - `LAYOUTS[n]`: `[x,y,w,h]` per photo in frame px, plus `pats` and `legend`. A photo missing from a layout fades out.
- `img/m01–m10.jpg`: the exported Figma fills (they arrived as JPEGs named .png).
- `fonts/`: self-hosted Inter 400 (latin) and Noto Sans Hebrew 400.
- `tools/shot.sh <out> "<query>"`: headless render at 1440×838. `tools/diff.py`: per-region diff (needs `/usr/local/bin/python3`, which has PIL).
- `questionnaire/`: the published questionnaire page + web-size thumbs (republish with the same file path, `root` = questionnaire/).
- `tools/shot.sh`: `PAGE=colors.html tools/shot.sh out.png "theme=2"` renders the colour view.
- URL params: `?theme=1|2` opens a theme, `?still` turns off the drift (for diffs), `?ls=` tests title tracking.

## Traps hit
- **Rotated node:** metadata y for 1:9/1:32 is the rotation pivot (583/310). The design-context `top` (482/209) is the real box.
- **Title:** Google's Inter sets ~1.6% wider than Figma's, so with 8.192px tracking line 1 wrapped. Tracking is tuned per line (l1 7.4px + word-spacing .6 + −4px, l2 7.6px). Ink extents now match within 1px (EXERCISE 57, 02 786, MEMORYSCAPE right edge 913).
- **Buttons don't inherit letter-spacing:** the nav labels needed it set explicitly. Label widths are pinned to Figma's (53/53/52/50).
- **Patterns** are Figma pattern fills the MCP can't export, so they're reconstructed as SVG tiles with phase measured off the render. Dashes: 13×1 on a 26×24 tile, 45% black. Diagonals: 21×15 tile, stroke (0,0.3)→(10.5,7.7), 80% black. Theme 1 pos `0 23px` on the (−41,−30) rect. Theme 2 `0 −1px` and `16px 7px`.
- Headless Chrome sometimes drops images on the first run, so render twice (warm profile at `/tmp/memoryscape-chrome`).

## Residual floor
The year and nav text sit 1–2px off. That's Inter/Noto webfont vs Figma's font binaries, and it's what remains of the region error there.
