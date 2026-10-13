"use client";
import { useEffect, useRef, useState } from "react";
import { MARK_PATH, MOTION_BOX } from "./rofran-mark";
import type { MarkEngine } from "./animated-mark-engine";

// The R monogram assembling itself from three saffron threads. Plays from the start each time `play` turns on;
// the WebGL engine and its data load on first play. Reduced motion or no WebGL2 shows the finished R.
export function AnimatedMark({ play, className = "" }: { play: boolean; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<MarkEngine | null>(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (!play || still) return;
    let raf = 0, cancelled = false;
    const run = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return; }
      const { createMarkEngine, DURATION } = await import("./animated-mark-engine");
      if (cancelled || !canvas.current) return;
      engine.current ??= createMarkEngine(canvas.current);
      const mark = engine.current;
      if (!mark) { setStill(true); return; }
      const begin = performance.now();
      const step = (now: number) => {
        const time = Math.min(DURATION, now - begin);
        mark.draw(time);
        if (time < DURATION && !cancelled) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    void run();
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, [play, still]);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const observer = new ResizeObserver(() => engine.current?.resize());
    observer.observe(element);
    return () => observer.disconnect();
  }, [still]);
  useEffect(() => () => { engine.current?.dispose(); engine.current = null; }, []);
  const [x, y, w, h] = MOTION_BOX;
  return <span className={`animated-mark ${className}`} aria-hidden="true" style={{ aspectRatio: `${w} / ${h}` }}>
    {still ? <svg viewBox={`${x} ${y} ${w} ${h}`} fill="currentColor"><path d={MARK_PATH} /></svg> : <canvas ref={canvas} />}
  </span>;
}
