"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { locales, localeNames, localeHref, withoutLocale } from "../../lib/i18n";
import { useLocale } from "./locale-provider";
export function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [suffix, setSuffix] = useState("");
  const picker = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const sync = () => setSuffix(window.location.search + window.location.hash);
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (!picker.current?.contains(event.target as Node)) picker.current?.removeAttribute("open"); };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") picker.current?.removeAttribute("open"); };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", key); };
  }, []);
  return <details className="language-picker" ref={picker}>
    <summary aria-label={t.nav.language} title={t.nav.language}><span>{locale.toUpperCase()}</span><svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="m1 1 4 4 4-4" fill="none" stroke="currentColor" /></svg></summary>
    <nav aria-label={t.nav.language} className="language-options">{locales.map(item => <a key={item} href={localeHref(item, withoutLocale(pathname)) + suffix} hrefLang={item} lang={item} aria-current={item === locale ? "true" : undefined}><span>{localeNames[item]}</span><small>{item.toUpperCase()}</small></a>)}</nav>
  </details>;
}
