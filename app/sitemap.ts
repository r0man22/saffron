import type { MetadataRoute } from "next";
import { publishedContent } from "../lib/content-routes";
import { locales, localeHref, languageAlternates } from "../lib/i18n";
import { siteUrl } from "../lib/site-url";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await siteUrl();
  return locales.flatMap(locale => {
    // Metadata and discovery use the same draft status. Completing a page
    // includes it here automatically instead of requiring a second manual edit.
    return publishedContent(locale).map(({ path, image, lastModified }) => ({ url: base + localeHref(locale, path),
      lastModified,
      images: [`${base}/media/${image}.webp`],
      alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, base + href])) } }));
  });
}
