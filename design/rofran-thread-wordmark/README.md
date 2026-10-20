# ROFRAN thread wordmark (prototype)

In the finale, saffron threads leave the film's own cloud of threads and settle into the ROFRAN wordmark. Each settled thread warms to gold, and the real gold text fades in over it, letter by letter, from left to right. The R monogram, tagline and button follow.

```bash
node design/rofran-thread-wordmark/serve.mjs
```

Open http://127.0.0.1:4317/design/rofran-thread-wordmark/. The server serves the repository root with byte ranges, so the story film (`public/media/rofran-story.mp4`) can be scrubbed. Scrolling over the film scrubs it, as on the site. Settings changes thread length, width, density and the number of loose threads, and switches to the current site finale for comparison. `preview.mp4` is a 1280×720 render of 22.5–25.7 s.

## How it works

- **Targets come from the real type.** Each letter is rasterised in the page's own font and size from the DOM, then thinned to centre lines (Zhang–Suen). Spurs are pruned, and the remaining lines are split into thread-length pieces. Thick stems get two or three threads side by side, with their cuts staggered. Any font size, and other words, work without hand-drawn paths.
- **A pure function of film time.** Positions, turns and colours are computed from `t` alone, so scrubbing backwards lifts the threads off the letters again. The engine has no state between frames. It is the same pattern the R monogram engine uses (`draw(time)`).
- **Timing, in film seconds** (`TIMELINE`):
  - 22.7–23.1: threads appear inside the film's thread cloud.
  - 23.2–23.85: each thread starts towards its stroke, left letters first.
  - The word is complete at about 24.8.
  - The R monogram, tagline and button follow before the film ends at 25.708.
- **Rendering.** Canvas 2D on a sharp layer and a soft (blurred) layer, plus a glow pass. Each thread is a tapered stigma shape: a fine yellow style that widens into a red trumpet. A thread is soft and slightly enlarged while in the air, and comes into focus as it lands.

At 1440×810, drawing takes about 2–8 ms of CPU per frame. Layout, which builds the centre lines, takes about 130 ms and runs once per size.

## On the site

- The engine is `app/components/thread-wordmark-engine.mjs`. This prototype imports the same file, so tuning here is tuning the site.
- `scroll-story.tsx` loads the engine after the page, then draws it into `.story-threads`, which sits above `.story-shade` and below `.scene-copy`. Each frame it reads the film's own clock (`currentTime`), so scroll scrubbing and "Discover the story" playback both work.
- The finale `h2` stays real text for search and screen readers. While threads are active (`.threads-on`), its letters skip `focusIn`, and their opacity follows `letterOpacity(t)`.
- Until the word is complete, the finale carries `.is-gathering`: the R, tagline and button stay hidden. When the word completes, they rise with the usual `riseIn`, and `AnimatedMark` starts then rather than when chapter 7 begins.
- With reduced motion, save-data or a failed film, the engine does not run and the static finale is shown as before. In Safari before 18, which has no canvas filters, the threads are drawn without blur, glow and shadow.
