"use client";
import { useEffect, useRef, useState } from "react";
import { createAmbience, type Ambience } from "./ambient-sound";

const KEY = "rofran-sound";
const clamp = (n: number) => Math.min(1, Math.max(0, n));
function switchSound(ambience: React.RefObject<Ambience | null>, setOn: (on: boolean) => void, next: boolean) {
  if (next && !ambience.current) ambience.current = createAmbience();
  ambience.current?.setEnabled(next);
  setOn(next);
  try { localStorage.setItem(KEY, next ? "on" : "off"); } catch {}
}

// Field ambience for the story. Off by default; a remembered "on" resumes with the visitor's first tap or key
// press, because browsers only start audio after a gesture.
export function SoundToggle({ story }: { story: React.RefObject<HTMLElement | null> }) {
  const [on, setOn] = useState(false);
  const ambience = useRef<Ambience | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch {}
    if (stored !== "on") return;
    const start = (event: Event) => {
      if ((event.target as Element | null)?.closest?.(".sound-toggle")) return;   // the button handles itself
      switchSound(ambience, setOn, true); remove();
    };
    const remove = () => { window.removeEventListener("pointerdown", start); window.removeEventListener("keydown", start); };
    window.addEventListener("pointerdown", start); window.addEventListener("keydown", start);
    return remove;
  }, []);

  // Scrolling stirs the grass; progress through the story brings on dusk; leaving the story lowers the volume.
  useEffect(() => {
    if (!on) return;
    let lastY = window.scrollY, lastTime = performance.now(), gust = 0, calm: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      const section = story.current, sound = ambience.current;
      if (!section || !sound) return;
      const rect = section.getBoundingClientRect(), distance = Math.max(1, section.offsetHeight - window.innerHeight);
      sound.setDusk(clamp((clamp(-rect.top / distance) - 0.72) / 0.28));
      sound.setPresence(clamp(rect.bottom / window.innerHeight));
    };
    const scroll = () => {
      const time = performance.now(), speed = Math.abs(window.scrollY - lastY) / Math.max(16, time - lastTime);
      lastY = window.scrollY; lastTime = time;
      gust = gust * 0.6 + clamp(speed / 2.5) * 0.4;
      ambience.current?.setGust(gust);
      measure();
      clearTimeout(calm);
      calm = setTimeout(() => { gust = 0; ambience.current?.setGust(0); }, 180);
    };
    measure();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("scroll", scroll); clearTimeout(calm); };
  }, [on, story]);

  useEffect(() => () => { ambience.current?.close(); ambience.current = null; }, []);

  return <button type="button" className={`sound-toggle ${on ? "is-on" : ""}`} aria-pressed={on} aria-label={on ? "Turn the field sound off" : "Turn the field sound on"}
    onPointerDown={event => event.stopPropagation()} onClick={() => switchSound(ambience, setOn, !on)}>
    <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span><span className="sound-label">{on ? "SOUND ON" : "SOUND OFF"}</span>
  </button>;
}
