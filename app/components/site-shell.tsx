"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BagIcon, FlowerMark } from "./icons";
import { ButtonInner, LinkArrow, RollText } from "./button";

const BagContext = createContext({ count: 0, add: () => {}, open: () => {} });
const BAG_KEY = "rofran-bag";
const bagListeners = new Set<() => void>();
let memoryBag: number | null = null;
function readBag() {
  if (memoryBag !== null) return memoryBag;
  try { const n = Number(localStorage.getItem(BAG_KEY)); return Number.isInteger(n) && n > 0 && n <= 20 ? n : 0; } catch { return 0; }
}
function writeBag(value: number) {
  memoryBag = value;
  try { localStorage.setItem(BAG_KEY, String(value)); } catch {}
  bagListeners.forEach(listener => listener());
}
function subscribeBag(listener: () => void) {
  const storage = (e: StorageEvent) => { if (e.key === BAG_KEY) { memoryBag = null; listener(); } };
  bagListeners.add(listener); window.addEventListener("storage", storage);
  return () => { bagListeners.delete(listener); window.removeEventListener("storage", storage); };
}
export const useBag = () => useContext(BagContext);
export function SiteShell({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const count = useSyncExternalStore(subscribeBag, readBag, () => 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const path = usePathname();
  useEffect(() => {
    let last = window.scrollY;
    const scroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 160); last = y;
    };
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    // Content already on screen at first paint stays put; everything else rises in as it is scrolled into view.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const items = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in):not(.is-shown)")];
    if (!root.classList.contains("reveal-on")) {
      items.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-shown"); });
      root.classList.add("reveal-on");
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in"); observer.unobserve(entry.target);
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    items.forEach(el => { if (!el.classList.contains("is-shown")) observer.observe(el); });
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = (e: PointerEvent) => (e.target as Element | null)?.closest?.<HTMLElement>(".button:not(:disabled)");
    const track = (e: PointerEvent, el: HTMLElement, pull: boolean) => {
      const r = el.getBoundingClientRect(); const x = e.clientX - r.left; const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`); el.style.setProperty("--my", `${y}px`);
      const magnetic = pull && fine.matches && !motion.matches;
      el.style.setProperty("--tx", magnetic ? `${(x / r.width - 0.5) * 10}px` : "0px");
      el.style.setProperty("--ty", magnetic ? `${(y / r.height - 0.5) * 8}px` : "0px");
    };
    const move = (e: PointerEvent) => { const el = target(e); if (el) track(e, el, true); };
    const out = (e: PointerEvent) => { const el = target(e); if (el && !el.contains(e.relatedTarget as Node | null)) track(e, el, false); };
    document.addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerout", out, { passive: true });
    return () => { document.removeEventListener("pointermove", move); document.removeEventListener("pointerout", out); };
  }, []);
  function update(value: number) {
    writeBag(Math.min(20, Math.max(0, value)));
  }
  const open = () => { setMenuOpen(false); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  return <BagContext.Provider value={{ count, open, add: () => { update(count + 1); open(); } }}>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className={`site-header ${scrolled || path !== "/" ? "header-solid" : ""} ${hidden && !menuOpen ? "header-hidden" : ""}`}>
      <Link className="brand" href="/" aria-label="ROFRAN home" onClick={() => setMenuOpen(false)}><FlowerMark /><span>ROFRAN</span></Link>
      <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Main navigation">
        <Link href="/#story" onClick={() => setMenuOpen(false)}><RollText>Our story</RollText></Link>
        <Link href="/saffron" aria-current={path === "/saffron" ? "page" : undefined} onClick={() => setMenuOpen(false)}><RollText>Saffron</RollText></Link>
        <Link href="/journal" aria-current={path.startsWith("/journal") ? "page" : undefined} onClick={() => setMenuOpen(false)}><RollText>Journal</RollText></Link>
      </nav>
      <div className="header-actions"><button className="bag-button" aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`} onClick={open}><BagIcon /><span aria-live="polite">{count}</span></button><button className={`menu-button ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
    </header>
    {children}
    {footer}
    <dialog className="bag-dialog" ref={dialog} onClick={e => { if (e.target === dialog.current) close(); }}>
      <div className="bag-panel"><div className="bag-heading"><p className="eyebrow">YOUR SELECTION</p><button onClick={close} aria-label="Close bag" className="close-button">×</button></div><h2>Your bag<sup>{count}</sup></h2>
        {count ? <><div className="bag-item"><img src="/media/product.webp" alt="ROFRAN saffron jar" width="120" height="150"/><div><h3>ROFRAN saffron</h3><p>Saffron threads</p><div className="quantity"><button aria-label="Decrease quantity" onClick={() => update(count - 1)}>−</button><output aria-label="Quantity">{count}</output><button aria-label="Increase quantity" onClick={() => update(count + 1)} disabled={count >= 20}>+</button></div><button className="remove-item" onClick={() => update(0)}>Remove</button></div></div><div className="bag-checkout"><p>Your selection is saved. Online checkout is not available yet.</p><button className="button button-gold" disabled><ButtonInner icon={false}>Checkout unavailable</ButtonInner></button></div></> : <div className="bag-empty"><FlowerMark /><p>A little treasure<br />belongs here.</p><Link className="button button-gold" href="/saffron" onClick={close}><ButtonInner>Discover our saffron</ButtonInner></Link></div>}
        <button className="text-link bag-continue" onClick={close}>Continue exploring <LinkArrow /></button>
      </div>
    </dialog>
  </BagContext.Provider>;
}
