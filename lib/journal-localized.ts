import { articlePhoto } from "./editorial-media";
import { articles } from "./journal";
import az from "./locales/az-articles.json";
import ru from "./locales/ru-articles.json";
import type { Locale } from "./i18n";
import { regionalContent, isRegionalLocale } from "./regional-content";
import { editorial } from "./editorial";
type Translation = typeof az["what-is-saffron"];
const translated: Record<"az" | "ru", Record<string, Translation>> = { az, ru };
function localizedArticles(locale: Locale) {
  if (isRegionalLocale(locale)) return regionalContent[locale].articles;
  if (locale === "en") return [...articles, ...editorial.en];
  return [...articles.map(article => {
    const text = translated[locale][article.slug];
    return { ...article, ...text,
      sections: article.sections.map((section, i) => ({ ...section, ...text.sections[i] })),
      sources: article.sources.map((source, i) => ({ ...source, title: text.sourceTitles[i] })),
    };
  }), ...editorial[locale]];
}

export function getArticles(locale: Locale) {
  return localizedArticles(locale).map(article => ({ ...article, ...articlePhoto(locale, article.slug) }));
}
