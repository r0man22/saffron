import type { Metadata } from "next";
import { localeHref, languageAlternates, type Locale } from "./i18n";
export const openGraphLocales = { en: "en_US", az: "az_AZ", ru: "ru_RU", tr: "tr_TR", kk: "kk_KZ", uz: "uz_UZ", ky: "ky_KG", tg: "tg_TJ", de: "de_DE", fr: "fr_FR", es: "es_ES", it: "it_IT", nl: "nl_NL", pl: "pl_PL", pt: "pt_PT", uk: "uk_UA", ka: "ka_GE", ar: "ar_AE", ja: "ja_JP", ko: "ko_KR", zh: "zh_CN" };
export function contentMetadata(locale: Locale, path: string, title: string, description: string, image = "/media/social.jpg"): Metadata {
  return { title, description,
    alternates: { canonical: localeHref(locale, path), languages: languageAlternates(path) },
    openGraph: { title: `${title} | ROFRAN`, description, type: "website", locale: openGraphLocales[locale], siteName: "ROFRAN", url: localeHref(locale, path), images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
