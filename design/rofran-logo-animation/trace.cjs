// Traces the emblems of a storyboard grid into vector paths in one shared coordinate system.
// Each frame is aligned on its ROFRAN wordmark (centre, top edge, width = 228 units), so the emblems
// line up even where the storyboard cells drift.
// Usage: node trace.cjs <storyboard.png> <columns> <rows> <out.json> <contact-sheet.png> [first frame] [last frame]
// Needs sharp (from the site) and potrace (npm install potrace).
const sharp = require("C:/Users/user/saffron/node_modules/sharp");
const potrace = require("potrace");
const { writeFileSync } = require("fs");

const [src, cols, rows, outJson, outSheet, first = 1, last] = process.argv.slice(2);
const COLS = +cols, ROWS = +rows, SCALE = 4, LUM = 110, WORDMARK_WIDTH = 228, TOP_SKIP = 0.13;

const trace = (buffer, options) => new Promise((resolve, reject) => potrace.trace(buffer, options, (err, svg) => err ? reject(err) : resolve(svg)));
function mapPath(d, fn) {
  const tokens = d.match(/[MCLZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  let out = "", nums = [];
  const flush = () => { for (let i = 0; i < nums.length; i += 2) { const [x, y] = fn(nums[i], nums[i + 1]); out += `${x.toFixed(2)} ${y.toFixed(2)} `; } nums = []; };
  for (const t of tokens) {
    if (/^[MCLZ]$/i.test(t)) { flush(); if (!/^[MCLZ]$/.test(t)) throw new Error("relative command " + t); out += t + " "; }
    else nums.push(Number(t));
  }
  flush();
  return out.trim();
}

(async () => {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const lum = (x, y) => { const i = (y * width + x) * 3; return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]; };
  const frames = [], lastFrame = +(last || COLS * ROWS);
  for (let k = +first - 1; k < lastFrame; k++) {
    const x0 = Math.round((k % COLS) * width / COLS) + 4, x1 = Math.round((k % COLS + 1) * width / COLS) - 4;
    const y0 = Math.round(Math.floor(k / COLS) * height / ROWS), y1 = Math.round((Math.floor(k / COLS) + 1) * height / ROWS) - 4;
    const w = x1 - x0, h = y1 - y0, skip = Math.round(h * TOP_SKIP);
    // Copy the cell and wipe grid lines: columns or rows that are gold along most of their length.
    const cell = Buffer.alloc(w * h * 3), gold = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const s = ((y0 + y) * width + x0 + x) * 3, d = (y * w + x) * 3;
      cell[d] = data[s]; cell[d + 1] = data[s + 1]; cell[d + 2] = data[s + 2];
      gold[y * w + x] = y >= skip && lum(x0 + x, y0 + y) > LUM ? 1 : 0;
    }
    const bg = [cell[(h - 2) * w * 3 + 3], cell[(h - 2) * w * 3 + 4], cell[(h - 2) * w * 3 + 5]];
    const wipe = i => { cell[i * 3] = bg[0]; cell[i * 3 + 1] = bg[1]; cell[i * 3 + 2] = bg[2]; gold[i] = 0; };
    for (let x = 0; x < w; x++) { let n = 0; for (let y = skip; y < h; y++) n += gold[y * w + x]; if (n > (h - skip) * 0.92) for (let y = 0; y < h; y++) wipe(y * w + x); }
    for (let y = 0; y < h; y++) { let n = 0; for (let x = 0; x < w; x++) n += gold[y * w + x]; if (n > w * 0.92) for (let x = 0; x < w; x++) wipe(y * w + x); }
    for (let y = 0; y < skip; y++) for (let x = 0; x < w; x++) wipe(y * w + x);
    // Wordmark: the lowest band of gold rows, separated from the emblem by a clear gap.
    const rowCount = y => { let n = 0; for (let x = 0; x < w; x++) n += gold[y * w + x]; return n; };
    let bottom = h - 1; while (bottom > 0 && rowCount(bottom) < 2) bottom--;
    let top = bottom, gap = 0;
    for (let y = bottom; y > skip; y--) { if (rowCount(y) < 2) { if (++gap >= 5) break; } else { gap = 0; top = y; } }
    let wx0 = Infinity, wx1 = -Infinity;
    for (let y = top; y <= bottom; y++) for (let x = 0; x < w; x++) if (gold[y * w + x]) { wx0 = Math.min(wx0, x); wx1 = Math.max(wx1, x); }
    const s = (wx1 - wx0 + 1) / WORDMARK_WIDTH, cx = (wx0 + wx1 + 1) / 2;
    const eh = top - 3;
    const crop = await sharp(cell, { raw: { width: w, height: h, channels: 3 } }).extract({ left: 0, top: 0, width: w, height: eh })
      .resize(w * SCALE, eh * SCALE, { kernel: "lanczos3" }).blur(1.1).greyscale().png().toBuffer();
    const svg = await trace(crop, { threshold: 112, blackOnWhite: false, turdSize: 80, optTolerance: 0.3, alphaMax: 1 });
    const d = mapPath(svg.match(/ d="([^"]+)"/)[1], (x, y) => [(x / SCALE - cx) / s, (y / SCALE - top) / s]);
    frames.push({ d, wordmarkHeight: (bottom - top + 1) / s, scale: s });
    console.log(`frame ${String(k + 1).padStart(2, "0")}: wordmark ${wx1 - wx0 + 1}px wide, ${(d.match(/M/g) || []).length} subpaths`);
  }
  writeFileSync(outJson, JSON.stringify(frames));
  const sheet = frames.map((f, k) => `<g transform="translate(${(k % 6) * 260 + 130},${Math.floor(k / 6) * 300 + 250})"><path d="${f.d}" fill="#e5d4a4"/><rect x="-114" y="0" width="228" height="${f.wordmarkHeight.toFixed(1)}" fill="#e5d4a433"/><text x="-120" y="-215" fill="#e5d4a488" font-size="14">${k + +first}</text></g>`).join("");
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1560" height="${Math.ceil(frames.length / 6) * 300}"><rect width="100%" height="100%" fill="#241416"/>${sheet}</svg>`)).png().toFile(outSheet);
})();
