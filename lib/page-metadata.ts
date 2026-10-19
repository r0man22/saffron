import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import type { Locale } from "./i18n";
import { contentMetadata } from "./seo";
export function pageMetadata(locale: Locale, page: "saffron" | "journal"): Metadata {
  const t = getDictionary(locale); const path = `/${page}`;
  const title = page === "saffron" ? t.meta.saffronTitle : t.meta.journalTitle;
  const description = page === "saffron" ? t.meta.saffronDescription : t.meta.journalDescription;
  return contentMetadata(locale, path, title, description, page === "saffron" ? "/media/editorial/saffron-product.webp" : "/media/editorial/saffron-botanical.webp");
}
