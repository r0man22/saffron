import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { languageAlternates, localeHref, type Locale } from "./i18n";
export function pageMetadata(locale: Locale, page: "saffron" | "journal"): Metadata {
  const t = getDictionary(locale); const path = `/${page}`;
  const title = page === "saffron" ? t.meta.saffronTitle : t.meta.journalTitle;
  const description = page === "saffron" ? t.meta.saffronDescription : t.meta.journalDescription;
  return { title, description, alternates: { canonical: localeHref(locale, path), languages: languageAlternates(path) },
    openGraph: { title, description, type: "website", locale: { en: "en_US", az: "az_AZ", ru: "ru_RU" }[locale], images: ["/media/social.jpg"] },
    twitter: { title, description, images: ["/media/social.jpg"] } };
}
