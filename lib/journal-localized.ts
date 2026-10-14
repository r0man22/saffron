import { articles } from "./journal";
import az from "./locales/az-articles.json";
import ru from "./locales/ru-articles.json";
import type { Locale } from "./i18n";
type Translation = typeof az["what-is-saffron"];
const translated: Record<"az" | "ru", Record<string, Translation>> = { az, ru };
export function getArticles(locale: Locale) {
  if (locale === "en") return articles;
  return articles.map(article => {
    const text = translated[locale][article.slug];
    return { ...article, ...text,
      sections: article.sections.map((section, i) => ({ ...section, ...text.sections[i] })),
      sources: article.sources.map((source, i) => ({ ...source, title: text.sourceTitles[i] })),
    };
  });
}
