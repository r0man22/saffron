# ROFRAN localization

English keeps the original URLs. Azerbaijani and Russian use `/az` and `/ru` prefixes. Each language has six server-rendered content pages: home, product, journal index and three articles.

The header language picker uses endonyms and preserves the current page, query string and fragment. A document navigation loads the matching root language, keeping `<html lang>`, metadata and the interface in agreement. Internal navigation stays within the chosen language; the bag remains shared through the existing local storage key.

UI dictionaries live in `lib/locales/{en,az,ru}.json`; complete article translations are in `az-articles.json` and `ru-articles.json`. Article slugs, section IDs and source URLs remain stable across languages. Metadata includes self-referencing canonicals, en/az/ru/x-default alternates, localized Open Graph text and Article inLanguage. The sitemap lists all 18 pages with language alternates.

The original serif and sans-serif families include local Cyrillic and Latin Extended files, supporting Azerbaijani Ə, Ğ, İ, Ş and related letters. Translated titles use adjusted responsive sizing. Unknown locales and articles return 404, using the documented Next.js global-not-found convention for the multiple locale root layouts.

Validation: production build; HTTP coverage for all 18 localized pages, full article translations, internal locale links, canonical/hreflang, sitemap, assets and unknown routes. Browser checks cover same-article language switching, shared bag state, localized controls and mobile layouts.
