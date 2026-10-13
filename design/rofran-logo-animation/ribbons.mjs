// Four ribbons (stem, leg, inner thread, bowl) fitted to the traced storyboard frames.
// Shared by the prototype (index.html) and build-data.mjs, which writes the site's logo data.

// Storyboard frames the ribbons pass through (01-07) and the finished R the motion settles into (12).
// Frames 08-11 only jitter in size and position around the finished R.
export const FIT_FRAMES = [0, 1, 2, 3, 4, 5, 6], END_FRAME = 11;

// Rough centre lines read off the traced frames (units of the shared box), keyed by position in FIT_FRAMES.
// Mapping: left thread -> stem, middle thread -> inner thread, right thread -> bowl; the leg starts
// folded inside the left thread (legFold 0 keeps it hidden) and swings out in frame 04.
export const FITS = {
  0: { stem:  [[-1,-20],[-6,-50],[-14,-75],[-22,-97],[-31,-117],[-40,-133],[-50,-147],[-58,-156]],
       leg:   [[-24,-102],[-20,-90],[-15,-77],[-11,-65],[-7,-50],[-4,-36],[-1,-22]], legFold: 0,
       inner: [[-1,-21],[-3,-60],[-4,-95],[-2,-125],[1,-152],[3,-172],[2,-190]],
       bowl:  [[-1,-21],[3,-40],[7,-55],[14,-75],[25,-100],[37,-120],[48,-138],[56,-150],[62,-156]] },
  1: { stem:  [[-1,-20],[-6,-50],[-13,-75],[-21,-97],[-29,-117],[-37,-133],[-45,-146],[-53,-155]],
       leg:   [[-23,-101],[-19,-88],[-14,-74],[-10,-62],[-6,-48],[-3,-34],[-1,-22]], legFold: 0,
       inner: [[-1,-21],[-4,-60],[-5,-95],[-2,-125],[3,-152],[4,-172],[1,-190]],
       bowl:  [[-1,-21],[4,-42],[8,-58],[17,-80],[28,-100],[40,-120],[49,-137],[56,-150],[62,-157]] },
  2: { stem:  [[-21,-20],[-23,-50],[-24.5,-80],[-25.5,-110],[-27,-140],[-29,-165],[-31,-182],[-33,-191]],
       leg:   [[-25.5,-110],[-25,-95],[-24.5,-80],[-24,-65],[-23,-50],[-22,-35],[-21,-22]], legFold: 0,
       inner: [[-21,-21],[-17,-55],[-11,-80],[-3,-100],[5,-117],[12,-131],[18,-142],[23,-149]],
       bowl:  [[-21,-21],[-19,-36],[-17,-48],[-14,-57],[-3,-75],[10,-92],[25,-107],[40,-121],[52,-134],[60,-146],[66,-154]], bowlHidden: 4 },
  3: { stem:  [[-31,-20],[-31.5,-50],[-32,-80],[-32.5,-110],[-33,-140],[-33.5,-165],[-34,-182],[-34,-192]],
       leg:   [[-25,-115],[-20,-95],[-11,-78],[4,-62],[24,-48],[45,-35],[65,-25],[84,-19]],
       inner: [[34,-50],[20,-66],[8,-84],[1,-104],[0,-122],[2,-136],[4,-143]],
       bowl:  [[-25,-130],[-18,-152],[-6,-166],[12,-174],[35,-176],[57,-172],[72,-162],[76,-150],[68,-138],[55,-128],[42,-122]] },
  4: { stem:  [[-41,-22],[-39,-45],[-37,-70],[-36,-95],[-35,-120],[-34,-145],[-33,-165],[-33,-180],[-33,-188]],
       leg:   [[-24,-118],[-21,-98],[-10,-77],[11,-62],[36,-49],[57,-37],[89,-21]],
       inner: [[36,-57],[22,-70],[9,-85],[0,-100],[-4,-115],[-3,-128],[-1,-138]],
       bowl:  [[-24,-118],[-21,-140],[-12,-156],[4,-164],[24,-165],[43,-160],[55,-150],[54,-138],[44,-128],[34,-121],[27,-117]] },
  5: { stem:  [[-38,-30],[-38,-55],[-38.5,-80],[-39,-105],[-39.5,-130],[-40,-155],[-40,-172],[-39,-185]],
       leg:   [[-27,-124],[-21,-101],[-6,-80],[17,-64],[42,-49],[67,-32],[92,-22]],
       inner: [[36,-59],[22,-71],[9,-86],[0,-100],[-5,-118],[-5,-131],[-4,-140]],
       bowl:  [[-23,-170],[-8,-176],[10,-178],[30,-177],[48,-171],[61,-160],[64,-148],[58,-136],[46,-125],[33,-118],[24,-115]] },
  6: { stem:  [[-38.5,-34],[-38.5,-60],[-38.5,-85],[-38.5,-110],[-38.5,-135],[-38.5,-160],[-38.5,-178],[-38.5,-185]],
       leg:   [[-28,-112],[-15,-91],[6,-70],[33,-53],[60,-36],[92,-22]],
       inner: [[41,-55],[25,-70],[10,-88],[0,-105],[-6,-125],[-7,-140],[-5,-150]],
       bowl:  [[-28,-186],[-5,-188],[18,-187],[38,-183],[55,-174],[65,-160],[64,-146],[55,-133],[42,-123],[28,-117],[20,-115]] },
};
export const PARTS = ["stem", "leg", "inner", "bowl"];
const RIBBON_POINTS = 18, ATTACH_FROM = 3, REACH = 6;

const cr = (a, b, c, d, t) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
function resample(P, n) {
  const dense = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || P[i + 1];
    for (let s = 0; s < 12; s++) dense.push([cr(p0[0], p1[0], p2[0], p3[0], s / 12), cr(p0[1], p1[1], p2[1], p3[1], s / 12)]);
  }
  dense.push(P.at(-1));
  const len = [0];
  for (let i = 1; i < dense.length; i++) len.push(len[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
  return Array.from({ length: n }, (_, k) => {
    const target = len.at(-1) * k / (n - 1); let i = 1;
    while (i < len.length - 1 && len[i] < target) i++;
    const f = (target - len[i - 1]) / (len[i] - len[i - 1] || 1);
    return [dense[i - 1][0] + (dense[i][0] - dense[i - 1][0]) * f, dense[i - 1][1] + (dense[i][1] - dense[i - 1][1]) * f];
  });
}
// Snap the centre line onto the middle of the traced stroke and read its width from the distance field.
// sample(x, y) returns the signed distance to the traced outline in box units (negative inside).
function fit(points, sample, fold = 1) {
  const P = resample(points, RIBBON_POINTS);
  return P.map((p, i) => {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
    let best = p, bestD = sample(p[0], p[1]);
    if (i > 0 && i < P.length - 1) for (let o = -REACH; o <= REACH; o += 0.5) {
      const q = [p[0] + nx * o, p[1] + ny * o], d = sample(q[0], q[1]);
      if (d < bestD) { bestD = d; best = q; }
    }
    return [best[0], best[1], Math.min(22, 2 * Math.max(0, -bestD)) * fold];
  });
}
// Once the R has formed, keep the bowl and the leg rooted in the stem instead of floating beside it.
function attach(ribbon, stem) {
  const p = ribbon[0], s = stem.reduce((best, q) => Math.abs(q[1] - p[1]) < Math.abs(best[1] - p[1]) ? q : best);
  const edge = s[0] + s[2] * 0.25;
  if (p[0] > edge) p[0] = edge;
}
// Where strokes merge (the threads' common base, the bowl and leg meeting the stem, the inner thread meeting
// the leg) the measured width is that of the merged shape. Cap the first points to the stroke's own body
// width and taper them to a point, so the strokes do not sprout thick roots once they separate.
const TAPER = [0.1, 0.4, 0.7, 0.9];
function taperStart(ribbon) {
  const body = ribbon.slice(Math.floor(ribbon.length * 0.2), Math.ceil(ribbon.length * 0.8)).map(p => p[2]).sort((a, b) => a - b);
  const median = body[Math.floor(body.length / 2)];
  TAPER.forEach((t, i) => { ribbon[i][2] = Math.min(ribbon[i][2], median) * t; });
}
// samplers[k] samples the distance field of FIT_FRAMES[k]. Returns one { stem, leg, inner, bowl } per frame.
export function fitAll(samplers) {
  return Object.keys(FITS).map(Number).sort((a, b) => a - b).map(k => {
    const s = FITS[k], f = samplers[k];
    const r = { stem: fit(s.stem, f), leg: fit(s.leg, f, s.legFold ?? 1), inner: fit(s.inner, f), bowl: fit(s.bowl, f) };
    if (k >= ATTACH_FROM) {
      attach(r.bowl, r.stem); attach(r.leg, r.stem);
      const st = r.stem, n = st.length;   // keep the serif ends square to the upright
      for (const [i, j] of [[0, 2], [1, 2], [n - 1, n - 3], [n - 2, n - 3]]) st[i][0] = st[j][0];
    } else taperStart(r.stem);
    taperStart(r.inner); taperStart(r.bowl); taperStart(r.leg);
    // In frame 03 the right thread's lower part lies inside the middle thread; keep it at zero width so it
    // does not cut across the letter while the bowl travels up to the stem.
    if (s.bowlHidden) for (let i = 0; i < s.bowlHidden; i++) r.bowl[i][2] = 0;
    return r;
  });
}

// ---------- signed distance fields (Felzenszwalb & Huttenlocher) ----------
const INF = 1e20;
function edt1d(f, n, d, v, z) {
  let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
}
function edt(mask, w, h, target) {
  const grid = new Float64Array(w * h), m = Math.max(w, h);
  const f = new Float64Array(m), d = new Float64Array(m), v = new Int32Array(m), z = new Float64Array(m + 1);
  for (let i = 0; i < w * h; i++) grid[i] = mask[i] === target ? 0 : INF;
  for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) f[y] = grid[y * w + x]; edt1d(f, h, d, v, z); for (let y = 0; y < h; y++) grid[y * w + x] = d[y]; }
  for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) f[x] = grid[y * w + x]; edt1d(f, w, d, v, z); for (let x = 0; x < w; x++) grid[y * w + x] = d[x]; }
  return grid;
}
// mask: 1 inside, 0 outside. Returns signed distances in texels, negative inside.
export function distanceField(mask, w, h) {
  const out = edt(mask, w, h, 1), inn = edt(mask, w, h, 0), result = new Float32Array(w * h);
  for (let p = 0; p < w * h; p++) result[p] = mask[p] ? -(Math.sqrt(inn[p]) - 0.5) : Math.sqrt(out[p]) - 0.5;
  return result;
}
// Bilinear sampler in box units for a field covering [minX, minY] at `grid` texels per unit.
export function sampler(field, w, h, minX, minY, grid) {
  return (x, y) => {
    const gx = Math.min(w - 1.001, Math.max(0, (x - minX) * grid - 0.5)), gy = Math.min(h - 1.001, Math.max(0, (y - minY) * grid - 0.5));
    const i = Math.floor(gx), j = Math.floor(gy), a = gx - i, b = gy - j, at = (u, v) => field[v * w + u];
    return ((at(i, j) * (1 - a) + at(i + 1, j) * a) * (1 - b) + (at(i, j + 1) * (1 - a) + at(i + 1, j + 1) * a) * b) / grid;
  };
}
