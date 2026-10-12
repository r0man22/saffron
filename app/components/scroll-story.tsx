"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Arrow, FlowerMark } from "./icons";

const DURATION = 25.708333;
const chapters = [
  { start: 0, name: "The beginning", label: "SAFFRON BY ROFRAN", title: <>NATURE’S<br />FINEST TREASURE</>, body: "A story that begins with a flower.", className: "scene-intro" },
  { start: 2.4, name: "The flower", label: "01 / THE FLOWER", title: <>It begins with<br />a <em>flower.</em></>, body: "Come a little closer to something extraordinary.", className: "scene-flower" },
  { start: 5.4, name: "The essence", label: "02 / THE ESSENCE", title: <>A closer kind<br />of <em>wonder.</em></>, body: "", className: "scene-detail" },
  { start: 7.8, name: "The threads", label: "03 / THE CRIMSON THREAD", title: <>A story in<br />every <em>thread.</em></>, body: "", className: "scene-threads" },
  { start: 12.7, name: "The journey", label: "04 / THE JOURNEY", title: <>From bloom<br />to your <em>table.</em></>, body: "", className: "scene-jar" },
  { start: 18.3, name: "The saffron", label: "05 / ROFRAN SAFFRON", title: <>A little.<br /><em>Remarkable.</em></>, body: "Colour. Aroma. A moment to savour.", className: "scene-product" },
  { start: 23.3, name: "Precious by nature", label: "", title: <>ROFRAN</>, body: "Precious by nature.", className: "scene-finale" },
];
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function ScrollStory() {
  const stage = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const active = chapters.reduce((value, chapter, i) => time >= chapter.start ? i : value, 0);
  useEffect(() => {
    const player = video.current; const section = stage.current;
    if (!player || !section) return;
    let raf = 0; let disposed = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let reduced = motion.matches || !!saveData;
    setReducedMotion(reduced);
    const update = () => {
      raf = 0;
      if (disposed || reduced) return;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const target = clamp(-section.getBoundingClientRect().top / distance) * Math.min(DURATION - 0.05, player.duration || DURATION);
      const delta = target - player.currentTime;
      if (player.readyState >= 2 && !player.seeking && Math.abs(delta) > 0.035) player.currentTime = Math.abs(delta) < 0.12 ? target : player.currentTime + delta * 0.32;
      if (Math.abs(delta) > 0.035 || player.seeking) raf = requestAnimationFrame(update);
    };
    const schedule = () => { if (!raf && !disposed) raf = requestAnimationFrame(update); };
    const seeked = () => { if (disposed) return; setTime(player.currentTime); schedule(); };
    const loaded = () => { if (disposed) return; setReady(true); schedule(); };
    const error = () => { if (!disposed) setFailed(true); };
    const load = () => { if (!player.getAttribute("src") && !reduced) { player.src = mobile.matches ? "/media/rofran-story-mobile.mp4" : "/media/rofran-story.mp4"; player.load(); } };
    const change = () => { reduced = motion.matches || !!saveData; setReducedMotion(reduced); if (reduced) { player.pause(); setTime(0); } else { load(); schedule(); } };
    player.addEventListener("loadeddata", loaded); player.addEventListener("seeked", seeked); player.addEventListener("error", error);
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule); motion.addEventListener("change", change);
    load(); schedule();
    return () => { disposed = true; cancelAnimationFrame(raf); player.removeEventListener("loadeddata", loaded); player.removeEventListener("seeked", seeked); player.removeEventListener("error", error); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); motion.removeEventListener("change", change); };
  }, []);
  function goTo(index: number) {
    const section = stage.current; if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const destination = top + Math.max(0, section.offsetHeight - window.innerHeight) * ((chapters[index].start + 0.35) / DURATION);
    window.scrollTo({ top: destination, behavior: reducedMotion ? "instant" : "smooth" });
  }
  return <section id="story" ref={stage} className={`scroll-story ${reducedMotion || failed ? "story-static" : ""}`} aria-label="The ROFRAN saffron story">
    <div className={`story-viewport chapter-${active}`}>
      <img className="story-poster" src="/media/valley.webp" alt="Purple saffron flowers in a mountain valley at sunset" fetchPriority="high" width="1920" height="1080" />
      <video ref={video} className={`story-video ${ready && !reducedMotion && !failed ? "is-ready" : ""}`} muted playsInline preload="auto" aria-hidden="true" disablePictureInPicture />
      <div className="story-shade" /><div className="story-grain" />
      {chapters.map((chapter, index) => <div key={chapter.name} className={`scene-copy ${chapter.className} ${active === index ? "is-active" : ""}`} aria-hidden={active !== index} inert={active !== index}>
        {index === 6 && <FlowerMark className="finale-mark" />}{chapter.label && <p className="eyebrow">{chapter.label}</p>}
        {index === 0 ? <h1>{chapter.title}</h1> : <h2>{chapter.title}</h2>}
        {chapter.body && <p className="scene-description">{chapter.body}</p>}
        {index === 0 && <>{reducedMotion || failed ? <Link className="button button-outline" href="/saffron">Discover our saffron <Arrow /></Link> : <button className="button button-outline" onClick={() => goTo(1)}>Discover the story <Arrow /></button>}</>}
        {index === 5 && <Link className="button button-outline" href="/saffron">Explore saffron <Arrow /></Link>}
        {index === 6 && <Link className="button button-gold" href="/saffron">Discover our saffron <Arrow /></Link>}
      </div>)}
      {!reducedMotion && !failed && <nav className="chapter-rail" aria-label="Story chapters"><div className="rail-track"><span style={{ transform: `scaleY(${time / DURATION})` }} /></div>{chapters.map((chapter, index) => <button key={chapter.name} className={index === active ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`Chapter ${index + 1}: ${chapter.name}`} aria-current={index === active ? "step" : undefined}><span className="rail-dot" /><span className="rail-number">0{index + 1}</span><span className="rail-tooltip">{chapter.name}</span></button>)}</nav>}
      <div className="story-bottom"><span className="bottom-caption">A SMALL THREAD. AN EXTRAORDINARY STORY.</span><a className="scroll-cue" href="#saffron" onClick={e => { if (!reducedMotion && !failed && active === 0) { e.preventDefault(); goTo(1); } }}><span>{active === 6 ? "CONTINUE EXPLORING" : "SCROLL TO DISCOVER"}</span><svg viewBox="0 0 14 28" aria-hidden="true"><path d="M7 0v26m-5-6 5 6 5-6" fill="none" stroke="currentColor" /></svg></a><span className="bottom-index">0{active + 1}<i />07</span></div>
      {!ready && !failed && !reducedMotion && <div className="film-loader" role="status"><span />Preparing your journey</div>}
      {failed && <p className="video-fallback">The film is unavailable. Explore our saffron below.</p>}
    </div>
  </section>;
}
