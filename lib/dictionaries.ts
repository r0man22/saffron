import en from "./locales/en.json";
import az from "./locales/az.json";
import ru from "./locales/ru.json";
import type { Locale } from "./i18n";
export type Dictionary = typeof en;
const dictionaries: Record<Locale, Dictionary> = { en, az, ru };
export const getDictionary = (locale: Locale) => dictionaries[locale];
