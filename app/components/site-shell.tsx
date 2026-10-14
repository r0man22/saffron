"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BagIcon, FlowerMark, RofranMark } from "./icons";
import { ButtonInner, LinkArrow, RollText } from "./button";
import { useLocale } from "./locale-provider";
import { LanguageSwitcher } from "./language-switcher";
import { localeHref, withoutLocale } from "../../lib/i18n";

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
  const { locale, t } = useLocale();
  const count = useSyncExternalStore(subscribeBag, readBag, () => 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const path = usePathname();
  const localPath = withoutLocale(path);
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
    <a href="#main-content" className="skip-link">{t.nav.skip}</a>
    <header className={`site-header ${scrolled || localPath !== "/" ? "header-solid" : ""} ${hidden && !menuOpen ? "header-hidden" : ""}`}>
      <Link className="brand" href={localeHref(locale, "/")} aria-label={t.nav.homeLabel} onClick={() => setMenuOpen(false)}><RofranMark /><span className="gold-glint" data-glint="ROFRAN">ROFRAN</span></Link>
      <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label={t.nav.main}>
        <Link href={localeHref(locale, "/#story")} onClick={() => setMenuOpen(false)}><RollText>{t.nav.story}</RollText></Link>
        <Link href={localeHref(locale, "/saffron")} aria-current={localPath === "/saffron" ? "page" : undefined} onClick={() => setMenuOpen(false)}><RollText>{t.nav.saffron}</RollText></Link>
        <Link href={localeHref(locale, "/journal")} aria-current={localPath.startsWith("/journal") ? "page" : undefined} onClick={() => setMenuOpen(false)}><RollText>{t.nav.journal}</RollText></Link>
        <Link href={localeHref(locale, "/faq")} aria-current={localPath === "/faq" ? "page" : undefined} onClick={() => setMenuOpen(false)}><RollText>{locale === "az" ? "Suallar" : locale === "ru" ? "Вопросы" : "FAQ"}</RollText></Link>
      </nav>
      <div className="header-actions"><LanguageSwitcher /><button className="bag-button" aria-label={`${t.nav.openBag}: ${count}`} onClick={open}><BagIcon /><span aria-live="polite">{count}</span></button><button className={`menu-button ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
    </header>
    {children}
    {footer}
    <dialog className="bag-dialog" ref={dialog} onClick={e => { if (e.target === dialog.current) close(); }}>
      <div className="bag-panel"><div className="bag-heading"><p className="eyebrow">{t.bag.selection}</p><button onClick={close} aria-label={t.bag.close} className="close-button">×</button></div><h2>{t.bag.title}<sup>{count}</sup></h2>
        {count ? <><div className="bag-item"><img src="/media/product.webp" alt={t.images.jar} width="120" height="150"/><div><h3>{t.bag.product}</h3><p>{t.bag.threads}</p><div className="quantity"><button aria-label={t.bag.decrease} onClick={() => update(count - 1)}>−</button><output aria-label={t.bag.quantity}>{count}</output><button aria-label={t.bag.increase} onClick={() => update(count + 1)} disabled={count >= 20}>+</button></div><button className="remove-item" onClick={() => update(0)}>{t.bag.remove}</button></div></div><div className="bag-checkout"><p>{t.bag.saved}</p><button className="button button-gold" disabled><ButtonInner icon={false}>{t.bag.unavailable}</ButtonInner></button></div></> : <div className="bag-empty"><FlowerMark /><p>{t.bag.empty[0]}<br />{t.bag.empty[1]}</p><Link className="button button-gold" href={localeHref(locale, "/saffron")} onClick={close}><ButtonInner>{t.actions.discoverSaffron}</ButtonInner></Link></div>}
        <button className="text-link bag-continue" onClick={close}>{t.actions.continue} <LinkArrow /></button>
      </div>
    </dialog>
  </BagContext.Provider>;
}
