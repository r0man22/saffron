import translations from "./locales/shop.json";
import { shopFamilies, shopSettings } from "./shop-catalog.mjs";
import type { Locale } from "./i18n";
import { shopNumber } from "./shop-number.mjs";

export type ShopCopy = typeof translations.en;
export const shopCopy = (locale: Locale): ShopCopy => translations[locale];
export function money(locale: Locale, amount: number) {
  return `${shopNumber(locale, amount)} ${shopSettings.currency}`;
}
export function gramLabel(locale: Locale, grams: number) {
  return `${shopNumber(locale, grams)} g`;
}
export function rangeLabel(locale: Locale, familyId: string) {
  const f = shopFamilies.find(family => family.id === familyId)!;
  const n = (value: number) => shopNumber(locale, value);
  return f.max === null ? `${n(f.min)} g+` : `${n(f.min)}–${n(f.max)} g`;
}
export const familyIndex = (id: string) => shopFamilies.findIndex(family => family.id === id);
