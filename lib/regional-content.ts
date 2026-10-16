import tr from "./locales/tr-content.json";
import kk from "./locales/kk-content.json";
import uz from "./locales/uz-content.json";
import ky from "./locales/ky-content.json";
import tg from "./locales/tg-content.json";
import type { EditorialArticle } from "./editorial";
import type { FAQ } from "./faq";
import type { ResourcePage, ResourceSlug } from "./page-content";
import { resolveProductText } from "./product-settings";
export const regionalLocales = ["tr", "kk", "uz", "ky", "tg"] as const;
export type RegionalLocale = typeof regionalLocales[number];
export type OriginalLocale = "en" | "az" | "ru";
type Bundle = {
  labels: { explore: string; faq: string; product: string; journal: string; updated: string; author: string; links: string; back: string };
  faqCopy: { title: string; description: string; eyebrow: string; intro: string; all: string; saffron: string; kitchen: string; buying: string; more: string; search: string; empty: string };
  faqs: FAQ[];
  resources: Record<ResourceSlug, ResourcePage>;
  articles: EditorialArticle[];
};
// JSON strings are checked against the content shape by the content validation test.
export const regionalContent = resolveProductText({ tr, kk, uz, ky, tg }) as Record<RegionalLocale, Bundle>;
export const isRegionalLocale = (value: string): value is RegionalLocale => regionalLocales.some(locale => locale === value);
export const regionalDate = "2026-10-16";
