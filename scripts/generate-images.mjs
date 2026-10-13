// Generates the ROFRAN still images with the OpenAI Images API.
// Usage: node scripts/generate-images.mjs .env.local <output dir> [image names...]
// The env file needs one line: OPENAI_API_KEY=... (.env* files are gitignored). PNGs land in the output dir for review.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const [envFile, outDir, ...only] = process.argv.slice(2);
const key = readFileSync(envFile, "utf8").match(/^\s*OPENAI_API_KEY\s*=\s*["']?([^"'\s]+)/m)?.[1];
if (!key) throw new Error(`OPENAI_API_KEY not found in ${envFile}`);
mkdirSync(outDir, { recursive: true });

const STYLE = `Style: believable, high-end editorial still-life photography, as in a premium food and lifestyle magazine. Natural exposure, soft moderate contrast, restrained natural saturation, real material textures, a gentle film-like softness. The palette must harmonize with a luxury website built on deep wine red and near-black (#160e10, #241416) with muted warm gold light (#e5d4a4) and cream (#f2e9d3): crimson saffron threads, muted violet crocus petals, aged brass, dark wood, wine-red linen. Keep detail in both the shadows and the highlights.
Avoid: sunsets, skies, mountains, valleys, crocus fields, rocks and the sun (those belong to the site's opening film); exaggerated neon purple, oversaturated orange, HDR look, crushed black shadows, glowing edges, over-sharpening, glossy CGI or 3D-render surfaces, fantasy lighting, lens flare.
Output: one single photograph. No text, letters, logo, label, watermark, border or collage.`;

const IMAGES = {
  "product": `Subject: a small clear cylindrical glass jar with a brushed brass screw lid, filled with loose deep-crimson saffron threads, standing on softly draped wine-red linen. A few loose saffron threads and two fallen violet crocus petals lie on the linen in front of it. Background: a dark, softly graduated wine-to-near-black plaster wall. Light: one soft late-afternoon window light from the left, gentle warm highlights on the glass and brass, a soft natural shadow falling to the right. Camera: eye level, 85 mm lens, shallow depth of field. Composition: the jar exactly in the center with generous calm space on both sides, because the image will also be cropped to a square and to a portrait format.`,
  "saffron-threads-macro": `Subject: an extreme close-up macro photograph of a few individual saffron threads, slender deep-crimson stigmas with flared trumpet-shaped tips and a few pale yellow-orange ends, lying loosely on a dark aged-brass tray with a subtle hammered texture. Light: raking warm side light that reveals the fine ridges of the threads. Camera: macro lens, very shallow depth of field. Composition: the threads cross the center of the frame diagonally; the edges fall gently into dark wine-brown shadow.`,
  "crocus-from-above": `Subject: a single Crocus sativus flower photographed from directly above, its six violet petals open like a star with delicate darker veins, three slender crimson stigmas and three yellow stamens at the center, a few tiny dew drops on the petals. Background: dark, moist soil and a few narrow green leaves, softly out of focus. Light: soft, diffused early-morning light with a faint warm tint. Composition: the flower centered, filling about half of the frame height.`,
  "crocus-harvest": `Subject: a shallow hand-woven basket filled with freshly picked violet Crocus sativus flowers, some open with visible crimson stigmas, resting on a dark weathered wooden table; beside it a small aged-brass bowl holds a little heap of separated crimson saffron threads. Light: soft morning window light from the right, warm and calm. Camera: about 35 degrees from above, 50 mm lens. Composition: the basket and bowl sit right of center; the left third of the frame is calm, dark, softly lit wood that can hold overlaid text.`,
  "saffron-infusion": `Subject: a few saffron threads steeping in a small clear glass bowl of warm water, releasing soft golden-amber colour that drifts through the water in fine swirls; a slim brass spoon rests beside the bowl on wine-red linen; a faint wisp of steam rises. Light: soft side window light, warm gold reflections in the water. Camera: about 30 degrees from above, 70 mm lens, shallow depth of field. Composition: the bowl right of center; the left third is calm, dark linen that can hold overlaid text.`,
  "saffron-pantry": `Subject: a small clear glass jar with a brushed brass screw lid, filled with crimson saffron threads and tightly closed, placed in an open dark walnut box lined with cream linen, inside a calm, dim kitchen cupboard. A narrow soft band of warm light touches the edge of the box while the jar itself rests mostly in gentle shadow, suggesting it is kept away from light. Camera: slightly above eye level, 50 mm lens. Composition: the box and jar right of center; the left third is calm, dark cupboard wood that can hold overlaid text.`,
};

// The archive shows gpt-image-2.5-sunburst producing 1920 x 1088 frames for this project; fall back to gpt-image-1 if it is unavailable.
const MODELS = [["gpt-image-2.5-sunburst", "1920x1088"], ["gpt-image-1", "1536x1024"]];

async function generate(name) {
  for (const [model, size] of MODELS) {
    const started = Date.now();
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: `${IMAGES[name]}\n\n${STYLE}`, size, quality: "high", n: 1 }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok && body.data?.[0]?.b64_json) {
      writeFileSync(`${outDir}/${name}.png`, Buffer.from(body.data[0].b64_json, "base64"));
      console.log(`${name}: ok (${model}, ${size}, ${Math.round((Date.now() - started) / 1000)}s)`);
      return;
    }
    console.log(`${name}: ${model} failed (${res.status}): ${body.error?.message ?? "no image returned"}`);
    if (![400, 403, 404].includes(res.status)) return;
  }
}

const names = only.length ? only : Object.keys(IMAGES);
for (let i = 0; i < names.length; i += 3) await Promise.all(names.slice(i, i + 3).map(generate));
