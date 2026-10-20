"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatedMark } from "./animated-mark";
import { SoundToggle } from "./sound-toggle";
import { ButtonInner } from "./button";
import { SplitTitle, plainTitle } from "./motion";
import { useLocale } from "./locale-provider";
import { localeHref } from "../../lib/i18n";
import type { createThreadWordmark } from "./thread-wordmark-engine.mjs";

const DURATION = 25.708333;
const chapterSpecs = [
  { start: 0, className: "scene-intro" },
  { start: 2.4, className: "scene-flower" },
  { start: 5.4, className: "scene-detail" },
  { start: 7.8, className: "scene-threads" },
  { start: 12.7, className: "scene-jar" },
  { start: 18.3, className: "scene-product" },
  { start: 23.3, className: "scene-finale", letters: true },
];
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function ScrollStory() {
  const { locale, t } = useLocale();
  const chapters = chapterSpecs.map((spec, index) => ({ ...spec, ...t.story.chapters[index] }));
  const stage = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const idleVideo = useRef<HTMLVideoElement>(null);
  const finaleVideo = useRef<HTMLVideoElement>(null);
  const threadCanvas = useRef<HTMLCanvasElement>(null);
  const playback = useRef({ start: () => {}, stop: () => {} });
  const [finaleVisible, setFinaleVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [idleVisible, setIdleVisible] = useState(false);
  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [threads, setThreads] = useState(false);
  const [gathering, setGathering] = useState(false);
  const active = chapters.reduce((value, chapter, i) => time >= chapter.start ? i : value, 0);
  useEffect(() => {
    const player = video.current;
    const section = stage.current;
    if (!player || !idleVideo.current || !finaleVideo.current || !section) return;
    let raf = 0;
    let disposed = false;
    let automatic = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let reduced = motion.matches || !!saveData;
    setReducedMotion(reduced);

    function makeIdle(idle: HTMLVideoElement, name: string, show: (visible: boolean) => void) {
      let wanted = false;
      let starting = false;
      let blocked = false;
      let pauseTimer: ReturnType<typeof setTimeout> | undefined;
      const sync = (next: boolean) => {
        wanted = next && !reduced && !document.hidden;
        if (!wanted) {
          show(false);
          if (!pauseTimer && !idle.paused) pauseTimer = setTimeout(() => {
            idle.pause(); pauseTimer = undefined;
          }, document.hidden || reduced ? 0 : 700);
          return;
        }
        clearTimeout(pauseTimer); pauseTimer = undefined;
        if (!idle.getAttribute("src")) {
          idle.src = `/media/${name}${mobile.matches ? "-mobile" : ""}.mp4`;
          idle.load();
        }
        if (!idle.paused && idle.readyState >= 2) show(true);
        if (idle.paused && !starting && !blocked) {
          starting = true;
          void idle.play().catch(() => { blocked = true; show(false); })
            .finally(() => { starting = false; });
        }
      };
      const onPlaying = () => { if (!disposed) sync(wanted); };
      const onError = () => { blocked = true; if (!disposed) show(false); };
      const retry = () => { blocked = false; schedule(); };
      idle.addEventListener("playing", onPlaying);
      idle.addEventListener("error", onError);
      window.addEventListener("pointerdown", retry, { passive: true });
      return { sync, cleanup() {
        clearTimeout(pauseTimer); idle.pause();
        idle.removeEventListener("playing", onPlaying);
        idle.removeEventListener("error", onError);
        window.removeEventListener("pointerdown", retry);
      } };
    }
    const opening = makeIdle(idleVideo.current, "rofran-hero-idle", setIdleVisible);
    const ending = makeIdle(finaleVideo.current, "rofran-finale-idle", setFinaleVisible);
    const stop = () => {
      automatic = false; player.pause(); setPlaying(false); schedule();
    };
    const update = () => {
      raf = 0;
      if (disposed || reduced) return;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const end = Math.min(DURATION - 0.05, player.duration || DURATION);
      if (automatic) {
        // Play decoded video normally; scroll follows its clock, never seeks against it.
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;
        window.scrollTo({ top: sectionTop + distance * clamp(player.currentTime / end), behavior: "instant" });
        setTime(player.currentTime);
      }
      const top = section.getBoundingClientRect().top;
      const progress = clamp(-top / distance);
      opening.sync(!automatic && top >= -6 && top < window.innerHeight);
      ending.sync(!automatic && progress >= 0.985 && player.currentTime >= end - 0.45 && top > -section.offsetHeight + 100);
      const target = progress * end;
      const delta = target - player.currentTime;
      if (!automatic && player.readyState >= 2 && !player.seeking && Math.abs(delta) > 0.035) {
        player.currentTime = Math.abs(delta) < 0.12 ? target : player.currentTime + delta * 0.32;
      }
      if (automatic || Math.abs(delta) > 0.035 || player.seeking) raf = requestAnimationFrame(update);
    };
    function schedule() { if (!raf && !disposed) raf = requestAnimationFrame(update); }
    playback.current = {
      stop,
      start: () => {
        if (reduced) return;
        automatic = true; setPlaying(true);
        opening.sync(false); ending.sync(false);
        player.currentTime = 0;
        schedule();
        void player.play().catch(() => { if (!disposed) stop(); });
      },
    };
    const seeked = () => { if (!disposed) { setTime(player.currentTime); schedule(); } };
    const loaded = () => { if (!disposed) { setReady(true); schedule(); } };
    const ended = () => { stop(); setTime(player.currentTime); };
    const error = () => { if (!disposed) { stop(); setFailed(true); opening.sync(false); ending.sync(false); } };
    const interrupt = () => { if (automatic) stop(); };
    const key = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(event.key)) interrupt();
    };
    const visibility = () => {
      if (document.hidden) { stop(); opening.sync(false); ending.sync(false); }
      else schedule();
    };
    const load = () => {
      if (!player.getAttribute("src") && !reduced) {
        player.src = mobile.matches ? "/media/rofran-story-mobile.mp4" : "/media/rofran-story.mp4";
        player.load();
      }
    };
    const change = () => {
      reduced = motion.matches || !!saveData; setReducedMotion(reduced);
      if (reduced) { stop(); opening.sync(false); ending.sync(false); setTime(0); }
      else { load(); schedule(); }
    };
    player.addEventListener("loadeddata", loaded);
    player.addEventListener("seeked", seeked);
    player.addEventListener("ended", ended);
    player.addEventListener("error", error);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", change);
    load(); if (player.readyState >= 2) loaded(); schedule();
    return () => {
      disposed = true; automatic = false;
      playback.current = { start: () => {}, stop: () => {} };
      cancelAnimationFrame(raf); player.pause(); opening.cleanup(); ending.cleanup();
      player.removeEventListener("loadeddata", loaded);
      player.removeEventListener("seeked", seeked);
      player.removeEventListener("ended", ended);
      player.removeEventListener("error", error);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", change);
    };
  }, []);
  // Finale: saffron threads from the film's cloud settle into the ROFRAN letters, which then turn to gold text.
  // The threads follow the film's clock, so scrolling back lifts them off the letters again.
  useEffect(() => {
    const player = video.current, section = stage.current, canvas = threadCanvas.current;
    if (!player || !section || !canvas || reducedMotion || failed) return;
    const viewport = canvas.parentElement as HTMLElement;
    const letters = [...section.querySelectorAll<HTMLElement>(".scene-finale .gold-glint")];
    const words = letters.map(letter => letter.parentElement as HTMLElement);
    if (!letters.length) return;
    let engine: ReturnType<typeof createThreadWordmark> | null = null, geometry: typeof import("./thread-wordmark-engine.mjs") | null = null;
    let raf = 0, last = -1, inView = false, disposed = false, timer: ReturnType<typeof setTimeout> | undefined;
    const layout = () => {
      if (!engine || !geometry) return;
      engine.layout(geometry.letterBoxes(viewport, letters), geometry.coverBox(viewport, player));
      last = -1; schedule();
    };
    const frame = () => {
      raf = 0;
      if (!engine || disposed || !inView) return;
      const t = player.currentTime;
      if (t !== last) {
        last = t;
        engine.draw(t);
        engine.letterOpacity(t).forEach((opacity: number, i: number) => { words[i].style.opacity = String(opacity); });
        setGathering(t < engine.wordDone);
      }
      schedule();
    };
    function schedule() { if (!raf && !disposed && inView) raf = requestAnimationFrame(frame); }
    const relayout = () => { clearTimeout(timer); timer = setTimeout(layout, 120); };
    const visible = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); });
    const resized = new ResizeObserver(relayout);
    const style = getComputedStyle(letters[0]);
    void Promise.all([import("./thread-wordmark-engine.mjs"), document.fonts.load(`${style.fontStyle} ${style.fontWeight} 100px ${style.fontFamily}`, "ROFRAN")])
      .then(([mod]) => {
        if (disposed) return;
        geometry = mod; engine = mod.createThreadWordmark(canvas);
        setThreads(true); layout();
        visible.observe(section); resized.observe(viewport);
        document.fonts.addEventListener("loadingdone", relayout);
      })
      .catch(() => {});
    return () => {
      disposed = true; cancelAnimationFrame(raf); clearTimeout(timer);
      visible.disconnect(); resized.disconnect();
      document.fonts.removeEventListener("loadingdone", relayout);
      for (const word of words) word.style.opacity = "";
      setThreads(false); setGathering(false);
    };
  }, [reducedMotion, failed]);
  const waitingForWord = threads && gathering;
  function goTo(index: number) {
    playback.current.stop();
    const section = stage.current; if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const destination = index === 0 ? top : top + Math.max(0, section.offsetHeight - window.innerHeight) * (index === chapters.length - 1 ? 1 : (chapters[index].start + 0.35) / DURATION);
    window.scrollTo({ top: destination, behavior: reducedMotion ? "instant" : "smooth" });
  }
  return <section id="story" ref={stage} className={`scroll-story ${reducedMotion || failed ? "story-static" : ""} ${threads ? "threads-on" : ""}`} aria-label={t.story.aria}>
    <div className={`story-viewport chapter-${active}`}>
      <img className="story-poster" src="/media/valley.webp" alt={t.images.valley} fetchPriority="high" width="1920" height="1080" />
      <video ref={video} className={`story-video ${ready && !reducedMotion && !failed ? "is-ready" : ""}`} muted playsInline preload="auto" aria-hidden="true" disablePictureInPicture />
      <video ref={idleVideo} className={`story-idle-video ${idleVisible && !reducedMotion && !failed ? "is-active" : ""}`} muted loop playsInline preload="none" aria-hidden="true" disablePictureInPicture />
      <video ref={finaleVideo} className={`story-idle-video story-finale-video ${finaleVisible && !reducedMotion && !failed ? "is-active" : ""}`} muted loop playsInline preload="none" aria-hidden="true" disablePictureInPicture />
      <div className="story-shade" /><div className="story-grain" />
      <canvas ref={threadCanvas} className="story-threads" aria-hidden="true" />
      {chapters.map((chapter, index) => <div key={chapter.name} className={`scene-copy ${chapter.className} ${active === index ? "is-active" : ""} ${index === 6 && waitingForWord ? "is-gathering" : ""}`} aria-hidden={active !== index} inert={active !== index}>
        {index === 6 && <AnimatedMark className="finale-mark" play={active === 6 && !waitingForWord} />}{chapter.label && <p className="eyebrow">{chapter.label}</p>}
        {index === 0 ? <h1 aria-label={plainTitle(chapter.title)}><SplitTitle lines={chapter.title} /></h1> : <h2 aria-label={plainTitle(chapter.title)}><SplitTitle lines={chapter.title} letters={chapter.letters} /></h2>}
        {chapter.body && <p className="scene-description">{chapter.body}</p>}
        {index === 0 && <>{reducedMotion || failed ? <Link className="button button-outline" href={localeHref(locale, "/saffron")}><ButtonInner>{t.actions.discoverSaffron}</ButtonInner></Link> : <button className="button button-outline" onClick={() => playback.current.start()}><ButtonInner>{t.actions.discoverStory}</ButtonInner></button>}</>}
        {index === 5 && <Link className="button button-outline" href={localeHref(locale, "/saffron")}><ButtonInner>{t.actions.exploreSaffron}</ButtonInner></Link>}
        {index === 6 && <Link className="button button-gold" href={localeHref(locale, "/saffron")}><ButtonInner>{t.actions.discoverSaffron}</ButtonInner></Link>}
      </div>)}
      {!reducedMotion && !failed && <nav className="chapter-rail" aria-label={t.story.chaptersLabel}><div className="rail-track"><span style={{ transform: `scaleY(${time / DURATION})` }} /></div>{chapters.map((chapter, index) => <button key={chapter.name} className={index === active ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`${t.story.chapter} ${index + 1}: ${chapter.name}`} aria-current={index === active ? "step" : undefined}><span className="rail-dot" /><span className="rail-number">0{index + 1}</span><span className="rail-tooltip">{chapter.name}</span></button>)}</nav>}
      <div className="story-bottom"><span className="bottom-caption">{t.story.bottom}</span><a className="scroll-cue" href="#saffron" onClick={e => { if (!reducedMotion && !failed && active === 0) { e.preventDefault(); goTo(1); } }}><span>{active === 6 ? t.story.continue : t.story.scroll}</span><svg viewBox="0 0 14 28" aria-hidden="true"><path d="M7 0v26m-5-6 5 6 5-6" fill="none" stroke="currentColor" /></svg></a><div className="bottom-right"><SoundToggle story={stage} /><span className="bottom-index">0{active + 1}<i />07</span></div></div>
      {playing && <button className="story-pause" onClick={() => playback.current.stop()} aria-label={t.story.pause}>{t.story.pause}</button>}
      {!ready && !idleVisible && !failed && !reducedMotion && <div className="film-loader" role="status"><span />{t.story.preparing}</div>}
      {failed && <p className="video-fallback">{t.story.unavailable}</p>}
    </div>
  </section>;
}
