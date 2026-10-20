import { LOGO_RIBBONS, LOGO_START } from "./rofran-logo-data";
import { MARK_PATH, MOTION_BOX } from "./rofran-mark";

// The animated ROFRAN mark: a crocus opens and its three saffron threads grow out of it (a pale style at the base,
// crimson at the flared tips); the petals open out and fall away, the threads rest, then slowly turn into the cream
// R monogram and catch the light. Ribbons fitted to the storyboard frames are drawn for every animation frame and
// used as a mask over the gold; a blurred copy of that mask shapes the bevel. The petals are drawn in the shader.
// The exact traced threads and R open and close the motion. Source and tooling: design/rofran-logo-animation.
export const TIMELINE = { bloom: 1600, flower: 1000, release: 1100, rest: 1100, morph: 4200, sheen: 1200, grow: 1300, growDelay: 400 };
export const DURATION = TIMELINE.bloom + TIMELINE.flower + TIMELINE.release + TIMELINE.rest + TIMELINE.morph + TIMELINE.sheen;
// The crocus around the threads' base, as a goblet: four tepals behind the threads, two in front (open at the
// centre), then two yellow stamens in front of the threads. Angle from straight up (degrees), length, half width,
// layer (0 behind the threads, 1 in front, 2 stamen), outward bend of the tip.
const PETALS = [[-38, 90, 15, 0, -0.09], [-12, 102, 16, 0, -0.04], [14, 102, 16, 0, 0.04], [40, 90, 15, 0, 0.09],
  [-24, 96, 18, 1, -0.08], [25, 96, 18, 1, 0.08], [-7, 102, 4.4, 2, -0.05], [13, 102, 4.4, 2, 0.05]];
export type MarkEngine = { draw(time: number): void; resize(): void; dispose(): void };

const [minX, minY, BW, BH] = MOTION_BOX;
const numbers = (d: string) => (d.match(/-?\d*\.?\d+/g) || []).map(Number);

function ribbonPath(pts: number[][]) {
  const fmt = (p: number[]) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`, left: number[][] = [], right: number[][] = [], n = pts.length;
  const spline = (Q: number[][]) => {
    let d = "";
    for (let i = 0; i < Q.length - 1; i++) {
      const q0 = Q[i - 1] || Q[i], q1 = Q[i], q2 = Q[i + 1], q3 = Q[i + 2] || q2;
      d += `C${fmt([q1[0] + (q2[0] - q0[0]) / 6, q1[1] + (q2[1] - q0[1]) / 6])} ${fmt([q2[0] - (q3[0] - q1[0]) / 6, q2[1] - (q3[1] - q1[1]) / 6])} ${fmt(q2)}`;
    }
    return d;
  };
  pts.forEach((p, i) => {
    // Ends take their direction over two segments, so the caps (serifs, thread tips) do not tilt.
    const a = pts[Math.max(0, Math.min(i - 1, n - 3))], b = pts[Math.min(n - 1, Math.max(i + 1, 2))], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len, h = Math.max(0, p[2]) / 2;
    left.push([p[0] + nx * h, p[1] + ny * h]); right.push([p[0] - nx * h, p[1] - ny * h]);
  });
  right.reverse();
  return `M${fmt(left[0])}${spline(left)}L${fmt(right[0])}${spline(right)}Z`;
}

// Signed distance field of a binary mask (Felzenszwalb & Huttenlocher), in texels, negative inside.
const INF = 1e20;
function edt1d(f: Float64Array, n: number, d: Float64Array, v: Int32Array, z: Float64Array) {
  let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
}
function edt(mask: Uint8Array, w: number, h: number, target: number) {
  const grid = new Float64Array(w * h), m = Math.max(w, h);
  const f = new Float64Array(m), d = new Float64Array(m), v = new Int32Array(m), z = new Float64Array(m + 1);
  for (let i = 0; i < w * h; i++) grid[i] = mask[i] === target ? 0 : INF;
  for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) f[y] = grid[y * w + x]; edt1d(f, h, d, v, z); for (let y = 0; y < h; y++) grid[y * w + x] = d[y]; }
  for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) f[x] = grid[y * w + x]; edt1d(f, w, d, v, z); for (let x = 0; x < w; x++) grid[y * w + x] = d[x]; }
  return grid;
}

const VERTEX = `#version 300 es
out vec2 uv;
void main() { vec2 p = vec2(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1.); gl_Position = vec4(p, 0., 1.); uv = vec2(p.x + 1., 1. - p.y) * .5; }`;
const FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D shapeMask, heightMap;
uniform float grow, front, sheen, saffron, flower;
uniform vec2 px, span;
uniform vec4 box;          // mark units: min x, min y, width, height
uniform vec4 petalA[8];    // base x, base y, angle from straight up, length
uniform vec4 petalB[8];    // half width, layer (0 behind the threads, 1 in front, 2 stamen), outward bend
in vec2 uv; out vec4 color;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
// Outline of tepal or stamen i at p: coverage, with u along it (0 base, 1 tip), v across (-1..1) and q in mark
// units fixed to the petal (for details that must travel with it).
float shape(int i, vec2 p, float e, out float u, out float v, out vec2 q) {
  vec4 a = petalA[i], b = petalB[i];
  vec2 dir = vec2(sin(a.z), -cos(a.z)), side = vec2(cos(a.z), sin(a.z)), d = p - a.xy;
  u = dot(d, dir) / a.w;
  if (u <= 0. || u >= 1.) return 0.;
  float y = dot(d, side) - b.z * u * u * a.w;   // the centre line bends outward towards the tip
  float ka = (u - .65) / .35, kt = (u - .62) / .38;   // (GLSL pow() is undefined for negative bases)
  float w = b.y > 1.5
    ? b.x * max(.28 * step(u, .9), sqrt(max(0., 1. - ka * ka)))   // filament, then anther
    : b.x * (u < .62 ? .16 + .84 * pow(sin(u / .62 * 1.5708), 1.3) : pow(max(0., 1. - kt * kt), .62));
  v = y / max(w, 1e-3); q = vec2(u * a.w, y);
  return smoothstep(e, -e, abs(y) - w);
}
// A crocus tepal, as in the film: a pale throat, violet deepening into fanned dark veins, light lilac tips, the
// low sun glowing through the thin edges, a few dew drops. Front tepals show their outside, back ones the hollow.
vec4 tepal(int i, vec2 p, float e) {
  float u, v; vec2 q;
  float cover = shape(i, p, e, u, v, q);
  if (cover <= 0.) return vec4(0.);
  bool ahead = petalB[i].y > .5;
  vec2 side = vec2(cos(petalA[i].z), sin(petalA[i].z));
  vec3 n = normalize(vec3(side * v * (ahead ? .8 : -.8), 1.));
  float diffuse = max(dot(n, normalize(vec3(-.55, -.6, .7))), 0.);
  vec3 c = mix(ahead ? vec3(.36, .16, .50) : vec3(.88, .80, .92), vec3(.52, .27, .76), smoothstep(.04, .4, u));
  c = mix(c, vec3(.67, .47, .90), smoothstep(.5, .98, u));
  float lines = abs(fract(v * (3. + 1.5 * u) + .5) - .5);
  float vein = (1. - smoothstep(.02, .11, lines)) * (.35 + .45 * (1. - u)) * smoothstep(.02, .15, u);
  vein += (1. - smoothstep(0., .14, abs(v))) * .35 * (1. - u);   // midrib
  c = mix(c, vec3(.27, .08, .40), clamp(vein, 0., 1.) * .5);
  c *= (.62 + .5 * diffuse) * (ahead ? 1. : .82);
  c += smoothstep(.55, 1., abs(v)) * smoothstep(.2, .9, u) * .2 * vec3(1., .55, .55);
  vec2 cell = q / 7., id = floor(cell) + float(i) * 13.;
  vec2 drop = (fract(cell) - .5 - (vec2(hash(id), hash(id + 7.3)) - .5) * .4) * 7.;
  float r = 1.1 + .7 * hash(id + 3.1), dd = length(drop) / r;
  if (hash(id + 1.7) > .88 && u > .2 && u < .92 && abs(v) < .8 && dd < 1.) {
    c = mix(c, c * .62, smoothstep(.55, 1., dd));
    c += (1. - smoothstep(0., .5, length(drop / r + vec2(.35, .35)))) * .75;
  }
  return vec4(c * cover, cover);
}
// A stamen: a pale filament and a long golden anther dusted with pollen.
vec4 stamen(int i, vec2 p, float e) {
  float u, v; vec2 q;
  float cover = shape(i, p, e, u, v, q);
  if (cover <= 0.) return vec4(0.);
  vec3 c = u < .32 ? vec3(.92, .84, .60) : mix(vec3(.99, .72, .20), vec3(.93, .50, .10), smoothstep(.3, 1., u));
  c *= .72 + .38 * (1. - abs(v));
  c += (hash(floor(q * 1.6)) - .5) * .14;
  return vec4(c * cover, cover);
}
void main() {
  vec2 p = box.xy + uv * box.zw;
  float e = box.z * px.x;
  // The flower fades as one piece, so overlapping petals never turn see-through. The front tepals cast a soft
  // shadow (towards the lower right, away from the light) on everything behind them.
  // The stamens stand in front of the threads, so both are always seen beside them.
  vec4 back = vec4(0.), mid = vec4(0.), ahead = vec4(0.);
  float shadow = 0.;
  if (flower > 0.) for (int i = 0; i < 8; i++) {
    float layer = petalB[i].y;
    if (layer > 1.5) { vec4 s = stamen(i, p, e); mid = s + mid * (1. - s.a); }
    else if (layer > .5) {
      vec4 s = tepal(i, p, e); ahead = s + ahead * (1. - s.a);
      float u, v; vec2 q;
      shadow = max(shadow, shape(i, p - vec2(1.8, 2.6), e * 4., u, v, q));
    }
    else { vec4 s = tepal(i, p, e); back = s + back * (1. - s.a); }
  }
  vec4 acc = back * flower;
  float alpha = texture(shapeMask, uv).a;
  alpha *= smoothstep(front - px.y * 1.5, front + px.y * 1.5, uv.y);   // write-on: threads grow up from their base
  if (alpha > 0.) {
    vec2 g = vec2(texture(heightMap, uv + vec2(px.x, 0.)).a - texture(heightMap, uv - vec2(px.x, 0.)).a,
                  texture(heightMap, uv + vec2(0., px.y)).a - texture(heightMap, uv - vec2(0., px.y)).a);
    vec3 n = normalize(vec3(-g * 3.5, 1.));
    vec3 light = normalize(vec3(-.55, -.6, .7));
    float diffuse = dot(n, light);
    float spec = pow(max(dot(reflect(-light, n), vec3(0., 0., 1.)), 0.), 26.);
    float k = clamp(uv.y * .85 + uv.x * .3 - .1, 0., 1.);
    vec3 base = mix(vec3(.97, .92, .78), vec3(.90, .83, .64), smoothstep(.0, .55, k));
    base = mix(base, vec3(.76, .62, .40), smoothstep(.55, 1.15, k));
    vec3 c = base * (.8 + .3 * diffuse) + spec * .4 * vec3(1., .96, .86);
    // Saffron: along each thread from the shared base (span.x) to the tips (span.y).
    float s = clamp((uv.y - span.x) / (span.y - span.x), 0., 1.);
    vec3 stigma = mix(vec3(.98, .80, .42), vec3(.94, .45, .14), smoothstep(.04, .3, s));
    stigma = mix(stigma, vec3(.80, .14, .07), smoothstep(.25, .62, s));
    stigma = mix(stigma, vec3(.56, .05, .04), smoothstep(.62, 1., s));
    vec3 thread = stigma * (.72 + .4 * diffuse) + spec * .16 * vec3(1., .78, .5);
    // Gilding goes crimson → amber → cream, never through the dusty pink of a straight crimson-to-cream mix.
    float gild = 1. - saffron;
    vec3 amber = vec3(.95, .66, .30) * (.78 + .36 * diffuse) + spec * .3 * vec3(1., .9, .7);
    thread = mix(thread, amber, smoothstep(0., .55, gild));
    c = mix(thread, c, smoothstep(.35, 1., gild));
    float q = (uv.x + uv.y * .6) / 1.6;
    float ds = (q - sheen) / .05, df = (uv.y - front) / .012;
    c += exp(-ds * ds) * .38 * vec3(1., .97, .9);   // light sweep, masked by the shape
    c += exp(-df * df) * .5 * grow * mix(vec3(1.), vec3(1., .55, .25), saffron); // glow at the growing tips
    c += (hash(gl_FragCoord.xy) - .5) * .025;                           // satin grain
    acc = vec4(c * alpha, alpha) + acc * (1. - alpha);
  }
  acc = mid * flower + acc * (1. - mid.a * flower);
  acc.rgb *= 1. - .35 * shadow * flower;
  color = ahead * flower + acc * (1. - ahead.a * flower);
}`;

export function createMarkEngine(canvas: HTMLCanvasElement): MarkEngine | null {
  const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false });
  if (!gl) return null;

  // Monotone cubic (PCHIP) path through the fitted frames: smooth, never overshooting a frame, so strokes that
  // rest together (the threads' common base) stay together. Travelled at an even pace of stroke movement.
  const R = LOGO_RIBBONS, K = R.length, P = R[0].length;
  const slopes = R.map(frame => frame.map(part => part.map(() => [0, 0, 0])));
  for (let part = 0; part < P; part++) R[0][part].forEach((_, i) => {
    for (let v = 0; v < 3; v++) {
      const y = R.map(f => f[part][i][v]), d = y.slice(1).map((value, k) => value - y[k]);
      for (let k = 0; k < K; k++) slopes[k][part][i][v] = k === 0 ? d[0] : k === K - 1 ? d[K - 2] : d[k - 1] * d[k] <= 0 ? 0 : 2 / (1 / d[k - 1] + 1 / d[k]);
    }
  });
  const hermite = (a: number, b: number, ma: number, mb: number, t: number) => {
    const t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * a + (t3 - 2 * t2 + t) * ma + (3 * t2 - 2 * t3) * b + (t3 - t2) * mb;
  };
  const travel = [0];
  for (let j = 0; j < K - 1; j++) {
    let sum = 0, n = 0;
    for (let part = 0; part < P; part++) R[j][part].forEach((p, i) => { const q = R[j + 1][part][i]; sum += Math.hypot(q[0] - p[0], q[1] - p[1]) + Math.abs(q[2] - p[2]); n++; });
    travel.push(travel[j] + sum / n + 0.5);
  }
  const keyAt = (p: number) => {
    const target = p * travel[K - 1]; let j = 0;
    while (j < K - 2 && travel[j + 1] < target) j++;
    return j + (target - travel[j]) / (travel[j + 1] - travel[j]);
  };
  const ribbonsAt = (u: number) => {
    const s = Math.min(Math.floor(u), K - 2), t = u - s, path = new Path2D();
    for (let part = 0; part < P; part++) path.addPath(new Path2D(ribbonPath(R[s][part].map((p, i) => [0, 1, 2].map(v => hermite(p[v], R[s + 1][part][i][v], slopes[s][part][i][v], slopes[s + 1][part][i][v], t))))));
    return path;
  };

  // Hand-overs between the exact traced shapes and the ribbons blend distance fields, so the outline itself
  // moves (no see-through double image).
  const GRID = 320 / Math.max(BW, BH), W = Math.round(BW * GRID), H = Math.round(BH * GRID);
  const raster = document.createElement("canvas"); raster.width = W; raster.height = H;
  const rctx = raster.getContext("2d", { willReadFrequently: true })!;
  const field = (path: Path2D) => {
    rctx.setTransform(1, 0, 0, 1, 0, 0); rctx.clearRect(0, 0, W, H);
    rctx.setTransform(GRID, 0, 0, GRID, -minX * GRID, -minY * GRID);
    rctx.fillStyle = "#fff"; rctx.fill(path);
    const px = rctx.getImageData(0, 0, W, H).data, mask = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) mask[i] = px[i * 4 + 3] > 127 ? 1 : 0;
    const out = edt(mask, W, H, 1), inn = edt(mask, W, H, 0), result = new Float32Array(W * H);
    for (let p = 0; p < W * H; p++) result[p] = mask[p] ? -(Math.sqrt(inn[p]) - 0.5) : Math.sqrt(out[p]) - 0.5;
    return result;
  };
  const startPath = new Path2D(LOGO_START), endPath = new Path2D(MARK_PATH);
  const open = [field(startPath), field(ribbonsAt(0))], close = [field(ribbonsAt(K - 1)), field(endPath)];
  const blendCanvas = document.createElement("canvas"); blendCanvas.width = W; blendCanvas.height = H;
  const blendCtx = blendCanvas.getContext("2d")!, blendImage = blendCtx.createImageData(W, H);
  const blend = ([a, b]: Float32Array[], f: number) => {
    const px = blendImage.data;
    for (let p = 0; p < W * H; p++) { px[p * 4] = px[p * 4 + 1] = px[p * 4 + 2] = 255; px[p * 4 + 3] = 255 * Math.min(1, Math.max(0, 0.5 - (a[p] + (b[p] - a[p]) * f))); }
    blendCtx.putImageData(blendImage, 0, 0);
    return blendCanvas;
  };
  const smooth01 = (x: number) => x * x * (3 - 2 * x);
  const OPEN = 0.06, CLOSE = 0.72;
  const shapeAt = (m: number): Path2D | HTMLCanvasElement => {
    if (m <= 0) return startPath;
    if (m < OPEN) return blend(open, smooth01(m / OPEN));
    if (m < CLOSE) return ribbonsAt(keyAt((m - OPEN) / (CLOSE - OPEN)));
    if (m < 1) return blend(close, smooth01((m - CLOSE) / (1 - CLOSE)));
    return endPath;
  };

  // The drawn shape is the mask; a blurred copy gives a height map for the bevel.
  const mask = document.createElement("canvas"), soft = document.createElement("canvas");
  const mctx = mask.getContext("2d")!, sctx = soft.getContext("2d")!;
  const paint = (shape: Path2D | HTMLCanvasElement) => {
    const s = mask.width / BW;
    mctx.setTransform(1, 0, 0, 1, 0, 0); mctx.clearRect(0, 0, mask.width, mask.height);
    if (shape instanceof HTMLCanvasElement) mctx.drawImage(shape, 0, 0, mask.width, mask.height);
    else { mctx.setTransform(s, 0, 0, s, -minX * s, -minY * s); mctx.fillStyle = "#fff"; mctx.fill(shape); }
    sctx.setTransform(1, 0, 0, 1, 0, 0); sctx.clearRect(0, 0, soft.width, soft.height);
    sctx.filter = `blur(${(1.4 * s).toFixed(2)}px)`; sctx.drawImage(mask, 0, 0); sctx.filter = "none";
  };

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "shader");
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT)); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program); gl.bindVertexArray(gl.createVertexArray());
  const u = Object.fromEntries(["shapeMask", "heightMap", "grow", "front", "sheen", "saffron", "flower", "px", "span", "box", "petalA", "petalB"].map(name => [name, gl.getUniformLocation(program, name)]));
  const textures = [mask, soft].map((source, unit) => {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, texture);
    for (const [p, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, p, v);
    return { texture, source, unit };
  });
  gl.uniform1i(u.shapeMask, 0); gl.uniform1i(u.heightMap, 1);

  const start = numbers(LOGO_START), ys = start.filter((_, i) => i % 2);
  const baseUv = (Math.max(...ys) + 2 - minY) / BH, topUv = (Math.min(...ys) - 4 - minY) / BH;
  const baseX = start[2 * ys.indexOf(Math.max(...ys))], baseY = Math.max(...ys) + 2;
  gl.uniform4f(u.box, minX, minY, BW, BH);
  const petalA = new Float32Array(PETALS.length * 4), petalB = new Float32Array(PETALS.length * 4);
  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
  const easeInOut = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2, easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
  let current = 0;
  const resize = () => {
    const width = Math.max(1, Math.round(canvas.getBoundingClientRect().width * Math.min(devicePixelRatio || 1, 2.5)));
    canvas.width = mask.width = soft.width = width;
    canvas.height = mask.height = soft.height = Math.max(1, Math.round(width * BH / BW));
    gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(u.px, 1 / canvas.width, 1 / canvas.height); gl.uniform2f(u.span, baseUv, topUv);
  };
  const draw = (time: number) => {
    current = time;
    const { bloom, flower, release, rest, morph: m, sheen: sh } = TIMELINE;
    const grow = easeOut(clamp01((time - TIMELINE.growDelay) / TIMELINE.grow));
    // The crocus opens petal by petal and sways a little, then the petals open out, drop and fade, leaving the threads.
    const fall = clamp01((time - bloom - flower) / release);
    PETALS.forEach(([deg, length, half, layer, bend], i) => {
      const open = easeOut(clamp01((time - i * 60) / bloom)), drop = clamp01((time - bloom - flower - i * 70) / release) ** 2;
      const side = Math.sign(deg), sway = Math.sin(time / 700 + i * 1.3) * 0.015 * open;
      const angle = deg * Math.PI / 180 * (0.3 + 0.7 * open) * (1 + 0.3 * drop) + sway;
      petalA.set([baseX + side * 6 * drop, baseY + 10 * drop, angle, length * (0.7 + 0.3 * open) * (1 - 0.12 * drop)], i * 4);
      petalB.set([half * (0.6 + 0.4 * open), layer, bend * open, 0], i * 4);
    });
    gl.uniform4fv(u.petalA, petalA); gl.uniform4fv(u.petalB, petalB);
    gl.uniform1f(u.flower, clamp01(time / 300) * (1 - fall * fall));
    const morphStart = bloom + flower + release + rest;
    const morph = easeInOut(clamp01((time - morphStart) / m));
    const sweep = (time - morphStart - m) / sh;
    // The threads keep their saffron colour while they rest, then gild to cream as they turn into the R.
    const saffron = 1 - easeInOut(clamp01((time - morphStart) / (m * 0.85)));
    paint(shapeAt(morph));
    for (const { texture, source, unit } of textures) {
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    }
    gl.uniform1f(u.front, grow >= 1 ? -1 : baseUv + (topUv - baseUv) * grow);
    gl.uniform1f(u.grow, grow >= 1 ? 0 : 1);
    gl.uniform1f(u.sheen, sweep > 0 && sweep < 1 ? -0.15 + 1.3 * sweep : -9);
    gl.uniform1f(u.saffron, saffron);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  resize();
  return {
    draw,
    resize: () => { resize(); draw(current); },
    // Free the GPU objects but keep the context: the same canvas may get a new engine later.
    dispose: () => { for (const { texture } of textures) gl.deleteTexture(texture); gl.deleteProgram(program); },
  };
}
