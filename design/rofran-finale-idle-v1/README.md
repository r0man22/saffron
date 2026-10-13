# ROFRAN finale landscape loop

Generated with Seedance 2.5 at 480p, 24 fps, 5 seconds. The same clean final landscape from the story is supplied as both first and last frame. Camera locked; soft cloud drift, cyclical sunlight and subtle crocus movement. No text, logo, people or product.

Upscaled through Monid using Topaz Starlight Precise 2.6 (slp-2.6), sharpness 3, silent SDR. Native output 1918×1078 normalized to 1920×1080. Website uses a 120-frame, 5-second loop and a 720p mobile variant, H.264, faststart. The duplicate endpoint frame is removed to avoid a double hold at the seam.

Seedance cost: $0.5182759. Topaz: 5 credits, $0.50. Downloaded outputs are retained locally. Private API job records and temporary hosting URLs are excluded from the website files.

## Integration verification

- `npm run typecheck`, `npm run build` and the rendered HTML/media tests passed.
- In-browser: Discover the story plays the full film and moves through all seven chapters; arrow-key scrolling interrupts playback and returns control to manual scrubbing.
- Chapter 7 settles on the final frame and starts the 1920×1080 looping landscape. Returning to chapter 1 pauses the finale and resumes the opening loop.
- Mobile 390×844 selects the 1280×720 variant without horizontal overflow.
- Finale letters have staggered 5-second light passes; navigation and button labels contain a single text instance.
