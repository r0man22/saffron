"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Arrow, BagIcon, FlowerMark } from "./icons";

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
export function SiteShell({ children }: { children: React.ReactNode }) {
  const count = useSyncExternalStore(subscribeBag, readBag, () => 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const path = usePathname();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    scroll(); window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  function update(value: number) {
    writeBag(Math.min(20, Math.max(0, value)));
  }
  const open = () => { setMenuOpen(false); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  return <BagContext.Provider value={{ count, open, add: () => { update(count + 1); open(); } }}>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className={`site-header ${scrolled || path !== "/" ? "header-solid" : ""}`}>
      <Link className="brand" href="/" aria-label="ROFRAN home" onClick={() => setMenuOpen(false)}><FlowerMark /><span>ROFRAN</span></Link>
      <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Main navigation">
        <Link href="/#story" onClick={() => setMenuOpen(false)}>Our story</Link>
        <Link href="/saffron" aria-current={path === "/saffron" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Saffron</Link>
        <Link href="/journal" aria-current={path.startsWith("/journal") ? "page" : undefined} onClick={() => setMenuOpen(false)}>Journal</Link>
      </nav>
      <div className="header-actions"><button className="bag-button" aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`} onClick={open}><BagIcon /><span aria-live="polite">{count}</span></button><button className={`menu-button ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
    </header>
    {children}
    <footer className="site-footer"><Link href="/" className="brand"><FlowerMark /><span>ROFRAN</span></Link><p>Precious by nature.</p><nav aria-label="Footer"><Link href="/saffron">Saffron</Link><Link href="/journal">Journal</Link><a href="#main-content">Back to top ↑</a></nav><small>© {new Date().getFullYear()} ROFRAN</small></footer>
    <dialog className="bag-dialog" ref={dialog} onClick={e => { if (e.target === dialog.current) close(); }}>
      <div className="bag-panel"><div className="bag-heading"><p className="eyebrow">YOUR SELECTION</p><button onClick={close} aria-label="Close bag" className="close-button">×</button></div><h2>Your bag<sup>{count}</sup></h2>
        {count ? <><div className="bag-item"><img src="/media/product.webp" alt="ROFRAN saffron jar" width="120" height="150"/><div><h3>ROFRAN saffron</h3><p>Saffron threads</p><div className="quantity"><button aria-label="Decrease quantity" onClick={() => update(count - 1)}>−</button><output aria-label="Quantity">{count}</output><button aria-label="Increase quantity" onClick={() => update(count + 1)} disabled={count >= 20}>+</button></div><button className="remove-item" onClick={() => update(0)}>Remove</button></div></div><div className="bag-checkout"><p>Your selection is saved. Online checkout is not available yet.</p><button className="button button-gold" disabled>Checkout unavailable</button></div></> : <div className="bag-empty"><FlowerMark /><p>A little treasure<br />belongs here.</p><Link className="button button-gold" href="/saffron" onClick={close}>Discover our saffron <Arrow /></Link></div>}
        <button className="text-link bag-continue" onClick={close}>Continue exploring <Arrow /></button>
      </div>
    </dialog>
  </BagContext.Provider>;
}
