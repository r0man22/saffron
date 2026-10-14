import type { Locale } from "./i18n";
export const siteLocales = ["en", "az", "ru", "tr", "ar", "de", "fr", "es", "it", "pt", "nl", "pl", "uk", "ka", "fa", "hi", "zh", "ja", "ko", "id"] as const;
export type SiteLocale = typeof siteLocales[number];
export const siteLocaleNames: Record<SiteLocale, string> = { en: "English", az: "Azərbaycan", ru: "Русский", tr: "Türkçe", ar: "العربية", de: "Deutsch", fr: "Français", es: "Español", it: "Italiano", pt: "Português", nl: "Nederlands", pl: "Polski", uk: "Українська", ka: "ქართული", fa: "فارسی", hi: "हिन्दी", zh: "中文", ja: "日本語", ko: "한국어", id: "Bahasa Indonesia" };
export const isSiteLocale = (value: string): value is SiteLocale => siteLocales.some(locale => locale === value);
export const isPrimaryLocale = (value: SiteLocale): value is Locale => publishedLocales.some(locale => locale === value);
/** Activate a locale only after every public route has been translated and reviewed. */
export const publishedLocales = ["en", "az", "ru"] as const;
export const siteHref = (locale: SiteLocale, path: string) => locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;
export const coreArticleSlugs = ["what-is-saffron", "how-to-use-saffron", "how-to-store-saffron"];
export const corePaths = ["/", "/saffron", "/about", "/quality", "/faq", "/journal", ...coreArticleSlugs.map(slug => `/journal/${slug}`)];
export const primaryPaths = ["/contact", "/shipping", "/wholesale"];
export function availableLocales(path: string): readonly SiteLocale[] {
  void path;
  return publishedLocales;
}
export function siteAlternates(path: string) {
  return { ...Object.fromEntries(availableLocales(path).map(locale => [locale, siteHref(locale, path)])), "x-default": path };
}
export function stripSiteLocale(path: string) {
  const first = path.split("/")[1];
  return isSiteLocale(first) && first !== "en" ? path.slice(first.length + 1) || "/" : path;
}
