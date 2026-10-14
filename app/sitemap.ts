import type { MetadataRoute } from "next";
import { articles } from "../lib/journal";
import { locales, localeHref, languageAlternates } from "../lib/i18n";
import { siteUrl } from "../lib/site-url";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await siteUrl();
  const paths = ["/", "/saffron", "/journal", ...articles.map(article => `/journal/${article.slug}`)];
  return locales.flatMap(locale => paths.map(path => ({ url: base + localeHref(locale, path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : path === "/saffron" ? 0.9 : 0.7,
    alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, base + href])) } })));
}
