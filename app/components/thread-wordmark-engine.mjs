// Saffron threads that drift out of the film's thread cloud and settle into the ROFRAN wordmark (story finale).
// The targets come from the real type: every letter is rasterised in the page's font, thinned to its centre
// lines, and those lines are cut into thread-length pieces (several side by side in the thick stems).
// Everything is a pure function of the film's time, so scrubbing backwards lifts the threads off again.
// Prototype with tuning controls: design/rofran-thread-wordmark.

export const TIMELINE = {
  birth: [22.72, 23.1],   // threads appear inside the film's own cloud of threads
  gather: [23.2, 23.85],  // each thread starts towards its stroke (left letters first, loosely)
  flight: [0.8, 1.05],    // seconds from leaving the cloud to resting on the stroke
  gild: 0.35,             // a resting thread warms from saffron to gold
  text: 0.45,             // the gold letter fades in over its threads
  ambientOut: [23.55, 24.2], // the threads that do not land fade with the film's
};

export const DEFAULTS = { length: 0.6, width: 0.03, density: 1, ambient: 0.3, seed: 7 };

const VIDEO = { w: 1920, h: 1080 };
const K = 12; // points along a thread
const clamp01 = n => Math.min(1, Math.max(0, n));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => { t = clamp01(t); return t * t * (3 - 2 * t); };
const inOut = t => { t = clamp01(t); return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; };
const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a));
const random = seed => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// ---------- letter centre lines ----------

const N8 = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

function zhangSuen(m, w, h) {
  const del = [];
  for (let changed = true; changed;) {
    changed = false;
    for (let pass = 0; pass < 2; pass++) {
      del.length = 0;
      for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (!m[i]) continue;
        const p = [m[i - w], m[i - w + 1], m[i + 1], m[i + w + 1], m[i + w], m[i + w - 1], m[i - 1], m[i - w - 1]];
        const b = p.reduce((s, v) => s + v, 0);
        if (b < 2 || b > 6) continue;
        let a = 0;
        for (let k = 0; k < 8; k++) if (!p[k] && p[(k + 1) % 8]) a++;
        if (a !== 1) continue;
        if (pass === 0 ? (p[0] && p[2] && p[4]) || (p[2] && p[4] && p[6]) : (p[0] && p[2] && p[6]) || (p[0] && p[4] && p[6])) continue;
        del.push(i);
      }
      for (const i of del) m[i] = 0;
      if (del.length) changed = true;
    }
  }
}

// Remove staircase corners: a pixel whose neighbours already touch each other carries no connection.
function dropRedundant(m, w, h) {
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x;
    if (!m[i]) continue;
    const on = N8.filter(([dx, dy]) => m[i + dy * w + dx]);
    if (on.length < 2) continue;
    const group = on.map((_, k) => k);
    const root = k => group[k] === k ? k : (group[k] = root(group[k]));
    for (let a = 0; a < on.length; a++) for (let b = a + 1; b < on.length; b++) {
      if (Math.abs(on[a][0] - on[b][0]) <= 1 && Math.abs(on[a][1] - on[b][1]) <= 1) group[root(a)] = root(b);
    }
    if (on.every((_, k) => root(k) === root(0))) m[i] = 0;
  }
}

// Exact Euclidean distance to the background (Felzenszwalb & Huttenlocher), squared, in pixels.
function distance(mask, w, h) {
  const INF = 1e20, g = new Float64Array(w * h), n = Math.max(w, h);
  const f = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  const pass = len => {
    let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
    for (let q = 1; q < len; q++) {
      let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
      k++; v[k] = q; z[k] = s; z[k + 1] = INF;
    }
    k = 0;
    for (let q = 0; q < len; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) ** 2 + f[v[k]]; }
  };
  for (let i = 0; i < w * h; i++) g[i] = mask[i] ? INF : 0;
  for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) f[y] = g[y * w + x]; pass(h); for (let y = 0; y < h; y++) g[y * w + x] = d[y]; }
  for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) f[x] = g[y * w + x]; pass(w); for (let x = 0; x < w; x++) g[y * w + x] = d[x]; }
  return g;
}

// Skeleton pixels → branches between end points and junctions (junction pixels that touch form one node).
function branches(m, w, h) {
  const nb = i => N8.map(([dx, dy]) => i + dy * w + dx).filter(j => m[j]);
  const deg = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) if (m[i]) deg[i] = nb(i).length;
  const node = i => m[i] && deg[i] !== 2;
  const cluster = new Int32Array(w * h).fill(-1);
  let clusters = 0;
  for (let i = 0; i < w * h; i++) {
    if (!node(i) || cluster[i] >= 0) continue;
    const stack = [i]; cluster[i] = clusters;
    while (stack.length) for (const j of nb(stack.pop())) if (node(j) && cluster[j] < 0) { cluster[j] = clusters; stack.push(j); }
    clusters++;
  }
  const used = new Uint8Array(w * h), paths = [];
  for (let i = 0; i < w * h; i++) {
    if (!node(i)) continue;
    for (const first of nb(i)) {
      if (node(first) || used[first]) continue;
      const pts = [i, first]; used[first] = 1;
      let prev = i, cur = first, end = -1;
      for (;;) {
        const next = nb(cur).find(j => j !== prev);
        if (next === undefined) break;
        if (node(next)) { pts.push(next); end = cluster[next]; break; }
        if (used[next]) break;
        used[next] = 1; pts.push(next); prev = cur; cur = next;
      }
      paths.push({ pts, a: cluster[i], b: end, closed: false });
    }
  }
  for (let i = 0; i < w * h; i++) {
    if (!m[i] || node(i) || used[i]) continue;
    const pts = [i]; used[i] = 1;
    let prev = -1, cur = i;
    for (;;) {
      const next = nb(cur).find(j => j !== prev && !used[j]);
      if (next === undefined) break;
      used[next] = 1; pts.push(next); prev = cur; cur = next;
    }
    paths.push({ pts, a: -1, b: -1, closed: true });
  }
  const leaf = new Uint8Array(clusters);
  for (let i = 0; i < w * h; i++) if (m[i] && deg[i] === 1) leaf[cluster[i]] = 1;
  return paths.map(p => ({ ...p, pts: p.pts.map(i => [i % w + 0.5, Math.floor(i / w) + 0.5]) })).map(p => ({ ...p, leafA: p.a >= 0 && !!leaf[p.a], leafB: p.b >= 0 && !!leaf[p.b] }));
}

const lengthOf = pts => pts.reduce((s, p, i) => i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0);

function smoothPath(pts, closed, r) {
  const n = pts.length;
  if (n < 3) return pts;
  return pts.map((p, i) => {
    if (!closed && (i === 0 || i === n - 1)) return p;
    let sx = 0, sy = 0, c = 0;
    for (let k = -r; k <= r; k++) {
      let j = i + k;
      if (closed) j = (j + n) % n; else if (j < 0 || j >= n) continue;
      sx += pts[j][0]; sy += pts[j][1]; c++;
    }
    return [sx / c, sy / c];
  });
}

// Point and unit tangent at arc length s along a polyline.
function at(pts, cum, s) {
  s = Math.min(Math.max(s, 0), cum[cum.length - 1]);
  let i = 1;
  while (i < cum.length - 1 && cum[i] < s) i++;
  const t = (s - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1);
  const a = pts[i - 1], b = pts[i], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t), tx: (b[0] - a[0]) / len, ty: (b[1] - a[1]) / len };
}
const cumulative = pts => pts.reduce((c, p, i) => (c.push(i ? c[i - 1] + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), c), []);

// Centre lines of one glyph, in CSS pixels, each with the stroke's half width along it.
function glyphLines(letter, q) {
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  ctx.font = letter.font;
  const mt = ctx.measureText(letter.char), pad = 6;
  const left = letter.x - mt.actualBoundingBoxLeft - pad, top = letter.baseline - mt.actualBoundingBoxAscent - pad;
  const w = Math.ceil((mt.actualBoundingBoxLeft + mt.actualBoundingBoxRight + pad * 2) * q);
  const h = Math.ceil((mt.actualBoundingBoxAscent + mt.actualBoundingBoxDescent + pad * 2) * q);
  ctx.canvas.width = w; ctx.canvas.height = h;
  ctx.setTransform(q, 0, 0, q, -left * q, -top * q);
  ctx.font = letter.font; ctx.fillStyle = "#fff"; ctx.textBaseline = "alphabetic";
  ctx.fillText(letter.char, letter.x, letter.baseline);
  const px = ctx.getImageData(0, 0, w, h).data, mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) mask[i] = px[i * 4 + 3] > 120 ? 1 : 0;
  const dist = distance(mask, w, h), skel = mask.slice();
  zhangSuen(skel, w, h); dropRedundant(skel, w, h);
  const half = (x, y) => Math.sqrt(dist[Math.min(h - 1, Math.max(0, Math.floor(y))) * w + Math.min(w - 1, Math.max(0, Math.floor(x)))]);

  let paths = branches(skel, w, h).filter(p => p.pts.length > 1);
  // Spurs: short leaves that only reach from a junction to the edge of a thick stroke. Serifs are longer.
  const incident = new Map();
  const count = () => { incident.clear(); for (const p of paths) for (const c of [p.a, p.b]) if (c >= 0) incident.set(c, (incident.get(c) || 0) + 1); };
  count();
  paths = paths.filter(p => {
    const len = lengthOf(p.pts);
    if (p.closed) return len > 4;
    const leafEnd = p.leafA ? 0 : p.leafB ? p.pts.length - 1 : -1;
    if (leafEnd < 0 || (p.leafA && p.leafB)) return len > 2;
    const root = p.pts[p.pts.length - 1 - leafEnd];
    return len > half(root[0], root[1]) * 1.15;
  });
  // Join branches that now meet only each other, so a stroke is one continuous line.
  for (let merged = true; merged;) {
    merged = false; count();
    for (const [c, n] of incident) {
      if (n !== 2) continue;
      const two = paths.filter(p => p.a === c || p.b === c);
      if (two.length !== 2 || two[0] === two[1]) continue;
      const [p, r] = two;
      const pp = p.b === c ? p.pts : [...p.pts].reverse(), pEnd = p.b === c ? p.a : p.b;
      const rp = r.a === c ? r.pts : [...r.pts].reverse(), rEnd = r.a === c ? r.b : r.a;
      const joined = { pts: [...pp, ...rp.slice(1)], a: pEnd, b: rEnd, closed: false, leafA: false, leafB: false };
      paths = paths.filter(x => x !== p && x !== r); paths.push(joined); merged = true; break;
    }
  }
  return paths.map(p => {
    let pts = smoothPath(p.pts, p.closed, 3);
    if (p.closed) pts = [...pts, pts[0]];
    return {
      closed: p.closed,
      pts: pts.map(([x, y]) => [x / q + left, y / q + top]),
      half: pts.map(([x, y]) => half(x, y) / q),
    };
  });
}

// ---------- threads ----------

function placeThreads(letters, opts) {
  const rnd = random(opts.seed);
  const capH = letters[0].capHeight, size = letters[0].size;
  const len = opts.length * capH, width = opts.width * size;
  const minX = Math.min(...letters.map(l => l.x)), maxX = Math.max(...letters.map(l => l.x + l.advance));
  const threads = [], lines = [];
  letters.forEach((letter, li) => {
    for (const line of glyphLines(letter, Math.max(1, 220 / size))) {
      lines.push({ letter: li, ...line });
      const cum = cumulative(line.pts), L = cum[cum.length - 1];
      if (L < width * 1.2) continue;
      const halfMax = Math.max(...line.half);
      const copies = Math.min(5, Math.max(1, Math.round(halfMax * 2 * opts.density / (width * 1.25))));
      const pieces = Math.max(1, Math.round(L / len)), seg = L / pieces;
      for (let c = 0; c < copies; c++) {
        // Side-by-side threads are cut at staggered points so their ends do not line up.
        const phase = copies === 1 ? 0 : ((c * 0.38) % 1) * seg;
        const cuts = [];
        for (let s = phase - seg; s < L; s += seg * (0.85 + rnd() * 0.3)) cuts.push([Math.max(0, s), Math.min(L, s + seg)]);
        const side = copies === 1 ? 0 : (c / (copies - 1) - 0.5) * 1.3;
        for (let [a, b] of cuts) {
          if (b - a < seg * 0.4 && pieces > 1) continue;
          const over = (b - a) * 0.06;
          a = Math.max(0, a - over); b = Math.min(L, b + over);
          const pts = [];
          for (let k = 0; k < K; k++) {
            const s = lerp(a, b, k / (K - 1)), p = at(line.pts, cum, s);
            const hi = Math.min(line.half.length - 1, Math.round(s / (L || 1) * (line.half.length - 1)));
            const off = side * line.half[hi] * 0.75;
            pts.push([p.x - p.ty * off, p.y + p.tx * off]);
          }
          threads.push({ letter: li, target: pts, xNorm: ((pts[0][0] + pts[K - 1][0]) / 2 - minX) / ((maxX - minX) || 1), width: width * (0.85 + rnd() * 0.3) });
        }
      }
    }
  });
  const landing = threads.length;
  for (let i = 0; i < Math.round(landing * opts.ambient); i++) threads.push({ letter: -1, target: null, xNorm: rnd(), width: width * (0.8 + rnd() * 0.4) });
  // Flight: where in the film's cloud the thread appears, how it drifts and turns, when it leaves for its stroke.
  for (const th of threads) {
    const r = () => rnd();
    th.birth = lerp(TIMELINE.birth[0], TIMELINE.birth[1], r());
    const gx = (r() + r() + r()) / 3;
    th.from = [lerp(0.2, 0.82, gx), lerp(0.04, 0.5, r())];
    th.drift = [(r() - 0.5) * 70, 25 + r() * 60];
    th.flutter = { amp: 4 + r() * 12, freq: 2 + r() * 2.5, phase: r() * 6.283 };
    th.spin = { a0: r() * 6.283, w: (r() - 0.5) * 2.6, tumble: 1.5 + r() * 2, tphase: r() * 6.283 };
    th.shape = { bend: (r() - 0.5) * 0.5, s: (r() - 0.5) * 0.3, len: len * (0.75 + r() * 0.5) };
    th.depth = 1.15 + r() * 0.5; // nearer the camera while in the air
    th.arc = (r() - 0.5) * 0.35;
    th.gather = lerp(TIMELINE.gather[0], TIMELINE.gather[1], th.xNorm * 0.7 + r() * 0.3);
    th.land = th.gather + lerp(TIMELINE.flight[0], TIMELINE.flight[1], r());
    th.fadeOut = lerp(TIMELINE.ambientOut[0], TIMELINE.ambientOut[1], r());
    if (th.target) {
      const p = th.target, c = p.reduce((s, q) => [s[0] + q[0] / K, s[1] + q[1] / K], [0, 0]);
      th.center = c; th.angle = Math.atan2(p[K - 1][1] - p[0][1], p[K - 1][0] - p[0][0]);
    }
  }
  const letterDone = letters.map((_, li) => Math.max(...threads.filter(t => t.letter === li).map(t => t.land), TIMELINE.gather[1]));
  return { threads, lines, letterDone, wordDone: Math.max(...letterDone) };
}

// ---------- page geometry ----------

/** Glyph origins and baselines of the given letter elements, in `container`'s CSS pixels. */
export function letterBoxes(container, elements) {
  if (!elements.length) return [];
  const cs = getComputedStyle(elements[0]), size = parseFloat(cs.fontSize);
  const font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = font;
  const box = container.getBoundingClientRect(), capHeight = ctx.measureText("H").actualBoundingBoxAscent;
  return elements.map(el => {
    // The element's box holds the font's ascent and descent, centred in its line height.
    const r = el.getBoundingClientRect(), m = ctx.measureText(el.textContent);
    const ascent = m.fontBoundingBoxAscent, descent = m.fontBoundingBoxDescent;
    return { char: el.textContent, x: r.left - box.left, baseline: r.top - box.top + (r.height - ascent - descent) / 2 + ascent, font, size, capHeight, advance: r.width };
  });
}

/** Where the film's frame lies in `container` under object-fit: cover and the video's object-position. */
export function coverBox(container, video) {
  const { width, height } = container.getBoundingClientRect();
  const [px, py] = getComputedStyle(video).objectPosition.split(" ").map(v => parseFloat(v) / 100);
  const s = Math.max(width / VIDEO.w, height / VIDEO.h);
  return { s, ox: (width - VIDEO.w * s) * (Number.isFinite(px) ? px : 0.5), oy: (height - VIDEO.h * s) * (Number.isFinite(py) ? py : 0.5) };
}

// ---------- drawing ----------

const SAFFRON = [[255, 190, 88], [234, 78, 32], [168, 26, 17]];
const GOLD = [[252, 241, 210], [229, 212, 164], [196, 156, 84]];
const rgb = (a, b, t) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(",")})`;

export function createThreadWordmark(canvas) {
  const main = canvas.getContext("2d");
  // Safari before 18 has no canvas filters: the threads are then drawn without blur, glow and shadow.
  const filters = typeof main.filter === "string";
  const layer = () => { const c = document.createElement("canvas"); return { c, ctx: c.getContext("2d") }; };
  const sharp = layer(), soft = layer();
  let W = 0, H = 0, dpr = 1, plan = null, options = { ...DEFAULTS }, letters = [], videoBox = { s: 1, ox: 0, oy: 0 };

  function size() {
    dpr = Math.min(window.innerWidth < 760 ? 1.5 : 2, window.devicePixelRatio || 1);
    W = canvas.clientWidth; H = canvas.clientHeight;
    for (const c of [canvas, sharp.c, soft.c]) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
  }

  function ribbon(ctx, pts, width, color, alpha) {
    if (alpha < 0.01) return;
    const left = [], right = [];
    for (let k = 0; k < K; k++) {
      const a = pts[Math.max(0, k - 1)], b = pts[Math.min(K - 1, k + 1)];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
      const u = k / (K - 1);
      // A stigma: a fine style at the base widening into a trumpet at the tip.
      const hw = width / 2 * (0.3 + 0.7 * u ** 1.6) * (u > 0.9 ? 0.75 + 0.25 * Math.cos((u - 0.9) / 0.1 * 1.4) : 1);
      left.push([pts[k][0] + nx * hw, pts[k][1] + ny * hw]); right.push([pts[k][0] - nx * hw, pts[k][1] - ny * hw]);
    }
    const g = ctx.createLinearGradient(pts[0][0], pts[0][1], pts[K - 1][0], pts[K - 1][1]);
    g.addColorStop(0, color[0]); g.addColorStop(0.4, color[1]); g.addColorStop(1, color[2]);
    ctx.globalAlpha = alpha; ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(left[0][0], left[0][1]);
    for (const p of left.slice(1)) ctx.lineTo(p[0], p[1]);
    for (const p of right.reverse()) ctx.lineTo(p[0], p[1]);
    ctx.closePath(); ctx.fill();
  }

  function state(th, t) {
    const age = t - th.birth;
    if (age < 0) return null;
    const { s, ox, oy } = videoBox;
    // Free flight: a slow fall with flutter and a gentle tumble (the tumble foreshortens the thread).
    const fx = ox + (th.from[0] * VIDEO.w + th.drift[0] * age) * s + Math.sin(age * th.flutter.freq + th.flutter.phase) * th.flutter.amp * s;
    const fy = oy + (th.from[1] * VIDEO.h + th.drift[1] * age + 18 * age * age) * s;
    const fa = th.spin.a0 + th.spin.w * age + Math.sin(age * 1.7 + th.flutter.phase) * 0.25;
    const fore = 0.55 + 0.45 * Math.abs(Math.cos(age * th.spin.tumble + th.spin.tphase));
    let alpha = smooth(age / 0.3), lambda = 0, shapeMix = 0;
    let cx = fx, cy = fy, angle = fa, local;
    const free = (k, f) => { const u = k / (K - 1) - 0.5, l = th.shape.len; return [u * l * f, (th.shape.bend * (0.25 - u * u) + th.shape.s * u * (0.25 - u * u) * 4) * l]; };
    if (!th.target) {
      alpha *= 1 - smooth((t - th.fadeOut) / 0.45);
      local = Array.from({ length: K }, (_, k) => free(k, fore));
    } else {
      lambda = inOut((t - th.gather) / (th.land - th.gather));
      shapeMix = smooth((lambda - 0.35) / 0.65);
      // Turn the short way: the thread may settle base-first or tip-first along its stroke.
      const ageG = Math.max(0, th.gather - th.birth);
      const startA = th.spin.a0 + th.spin.w * ageG + Math.sin(ageG * 1.7 + th.flutter.phase) * 0.25;
      const flip = Math.abs(wrapAngle(th.angle - startA)) > Math.PI / 2;
      const ta = flip ? th.angle + Math.PI : th.angle;
      const endA = startA + wrapAngle(ta - startA);
      angle = lerp(fa, endA, lambda);
      const dx = th.center[0] - fx, dy = th.center[1] - fy, bow = Math.sin(Math.PI * lambda) * th.arc;
      cx = lerp(fx, th.center[0], lambda) - dy * bow; cy = lerp(fy, th.center[1], lambda) + dx * bow;
      const tgt = flip ? [...th.target].reverse() : th.target, cos = Math.cos(-ta), sin = Math.sin(-ta);
      // Mid-flight the thread keeps its own curve; near the stroke it bends to the letter's line.
      local = Array.from({ length: K }, (_, k) => {
        const f = free(k, lerp(fore, 1, lambda)), lx = tgt[k][0] - th.center[0], ly = tgt[k][1] - th.center[1];
        return [lerp(f[0], lx * cos - ly * sin, shapeMix), lerp(f[1], lx * sin + ly * cos, shapeMix)];
      });
      const done = plan.letterDone[th.letter];
      alpha *= 1 - smooth((t - done - 0.15) / (TIMELINE.text + 0.15));
    }
    const depth = lerp(th.depth, 1, smooth(lambda));
    const cos = Math.cos(angle) * depth, sin = Math.sin(angle) * depth;
    const pts = local.map(([x, y]) => [cx + x * cos - y * sin, cy + x * sin + y * cos]);
    const gild = th.target ? smooth((t - th.land) / TIMELINE.gild) : 0;
    return { pts, alpha, focus: 0.55 + 0.45 * smooth(lambda * 1.2 - 0.2), gild, depth };
  }

  const api = {
    // letters: [{ char, x, baseline, font, size, capHeight, advance }] in the canvas's CSS pixels.
    layout(nextLetters, nextVideoBox, nextOptions = {}) {
      size();
      letters = nextLetters; videoBox = nextVideoBox; options = { ...options, ...nextOptions };
      plan = letters.length ? placeThreads(letters, options) : null;
      return plan && { threads: plan.threads.filter(t => t.target).length, ambient: plan.threads.filter(t => !t.target).length, letterDone: plan.letterDone, wordDone: plan.wordDone };
    },
    // Opacity of each gold letter at film time t, so the page can fade the real text in over its threads.
    letterOpacity(t) { return plan ? plan.letterDone.map(d => smooth((t - d - 0.05) / TIMELINE.text)) : []; },
    get wordDone() { return plan?.wordDone ?? Infinity; },
    draw(t, debug = false) {
      main.setTransform(1, 0, 0, 1, 0, 0); main.clearRect(0, 0, canvas.width, canvas.height);
      if (!plan) return;
      for (const l of [sharp, soft]) { l.ctx.setTransform(1, 0, 0, 1, 0, 0); l.ctx.clearRect(0, 0, l.c.width, l.c.height); l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
      for (const th of plan.threads) {
        const st = state(th, t);
        if (!st || st.alpha < 0.01) continue;
        const color = [0, 1, 2].map(i => rgb(SAFFRON[i], GOLD[i], st.gild));
        ribbon(sharp.ctx, st.pts, th.width * st.depth, color, st.alpha * st.focus);
        ribbon(soft.ctx, st.pts, th.width * st.depth * 1.2, color, st.alpha * (1 - st.focus));
      }
      if (filters) {
        main.filter = `blur(${1.6 * dpr}px)`; main.drawImage(soft.c, 0, 0);
        main.filter = `blur(${9 * dpr}px)`; main.globalCompositeOperation = "lighter"; main.globalAlpha = 0.45; main.drawImage(sharp.c, 0, 0);
        main.globalCompositeOperation = "source-over"; main.globalAlpha = 1;
        main.filter = `drop-shadow(0 ${2 * dpr}px ${5 * dpr}px rgba(20,8,5,.45))`; main.drawImage(sharp.c, 0, 0);
        main.filter = "none";
      } else {
        main.globalAlpha = 0.6; main.drawImage(soft.c, 0, 0); main.globalAlpha = 1; main.drawImage(sharp.c, 0, 0);
      }
      if (debug) {
        main.setTransform(dpr, 0, 0, dpr, 0, 0);
        main.lineWidth = 1; main.globalAlpha = 0.9;
        for (const line of plan.lines) {
          main.strokeStyle = line.closed ? "#7df" : "#5f9";
          main.beginPath(); line.pts.forEach(([x, y], i) => i ? main.lineTo(x, y) : main.moveTo(x, y)); main.stroke();
        }
        main.fillStyle = "#fff";
        for (const th of plan.threads) if (th.target) { const [a, b] = [th.target[0], th.target[K - 1]]; main.fillRect(a[0] - 1, a[1] - 1, 2, 2); main.fillRect(b[0] - 1, b[1] - 1, 2, 2); }
        main.globalAlpha = 1;
      }
    },
  };
  return api;
}
