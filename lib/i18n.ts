import { publishedLocales } from "./international";
export const locales = publishedLocales;
export type Locale = typeof locales[number];
export const localeNames: Record<Locale, string> = { en: "English", az: "Azərbaycan", ru: "Русский" };
export const isLocale = (value: string): value is Locale => locales.some(locale => locale === value);
export function withoutLocale(pathname: string) {
  return pathname.replace(/^\/(az|ru)(?=\/|$)/, "") || "/";
}
export function localeHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const index = href.search(/[?#]/);
  const path = index < 0 ? href : href.slice(0, index);
  const suffix = index < 0 ? "" : href.slice(index);
  const prefix = locale === "en" ? "" : `/${locale}`;
  return (path === "/" ? prefix || "/" : prefix + path) + suffix;
}
export function languageAlternates(path: string) {
  return { ...Object.fromEntries(locales.map(locale => [locale, localeHref(locale, path)])), "x-default": path };
}
