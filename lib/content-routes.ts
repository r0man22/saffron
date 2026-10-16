import { getArticles } from "./journal-localized";
import { resourceCopy, resourceSlugs } from "./page-content";
import { isRegionalLocale, regionalDate } from "./regional-content";
import { articleRevisions, editorialUpdated } from "./editorial";
import type { Locale } from "./i18n";
export function publishedContent(locale: Locale) {
  const routes = [
    { path: "/", image: "valley" },
    { path: "/saffron", image: "product" },
    { path: "/journal", image: "flower" },
    { path: "/faq", image: "flower" },
    ...resourceSlugs.filter(slug => !resourceCopy[locale][slug].draft).map(slug => ({ path: `/${slug}`, image: resourceCopy[locale][slug].image })),
    ...getArticles(locale).map(article => ({ path: `/journal/${article.slug}`, image: article.image })),
  ];
  return routes.map(route => ({ ...route, lastModified: isRegionalLocale(locale) ? regionalDate : ["/", "/saffron", "/faq"].includes(route.path) ? "2026-10-16" : route.path.startsWith("/journal/") ? articleRevisions[route.path.split("/").at(-1)!] || editorialUpdated : editorialUpdated }));
}
