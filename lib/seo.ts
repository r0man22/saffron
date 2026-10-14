import type { Metadata } from "next";
import { localeHref, languageAlternates, type Locale } from "./i18n";
export const openGraphLocales = { en: "en_US", az: "az_AZ", ru: "ru_RU" };
export function contentMetadata(locale: Locale, path: string, title: string, description: string, image = "/media/social.jpg"): Metadata {
  return { title, description,
    alternates: { canonical: localeHref(locale, path), languages: languageAlternates(path) },
    openGraph: { title: `${title} | ROFRAN`, description, type: "website", locale: openGraphLocales[locale], siteName: "ROFRAN", url: localeHref(locale, path), images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
