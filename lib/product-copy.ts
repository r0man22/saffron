import original from "./locales/commerce.json";
import { productSettings } from "./product-settings";
import type { Locale } from "./i18n";
export function productCopy(locale: Locale) {
  const copy = original[locale];
  const grams = new Intl.NumberFormat(locale).format(productSettings.minimumOrderGrams);
  return { ...copy, minimumValue: `${grams} ${copy.unit}`,
    minimumNote: copy.minimumTemplate.replace("{grams}", grams),
    minimumAnswer: copy.minimumAnswer.replace("{grams}", grams) };
}
