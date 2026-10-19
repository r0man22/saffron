import captions from "./locales/editorial-images.json";
import type { Locale } from "./i18n";
import type { ResourceSlug } from "./page-content";

// Editorial photographs are independent of the film and Harvest Chronicles.
const topics = {
  "what-is-saffron": ["saffron-botanical", 0],
  "how-to-use-saffron": ["saffron-infusion", 1],
  "how-to-store-saffron": ["saffron-storage", 2],
  "what-does-saffron-taste-like": ["saffron-flavour", 3],
  "why-is-saffron-expensive": ["saffron-value", 4],
  "how-to-buy-saffron": ["saffron-selection", 5],
  "saffron-threads-vs-powder": ["saffron-threads-powder", 6],
} as const;
const resourceTopics: Record<ResourceSlug, readonly [string, number]> = {
  about: ["saffron-origin-story", 7],
  quality: ["saffron-quality", 8],
  shipping: ["saffron-storage", 2],
  contact: ["saffron-origin-story", 7],
  wholesale: ["saffron-flavour", 3],
  privacy: ["saffron-threads-powder", 6],
};
export function articlePhoto(locale: Locale, slug: string) {
  const topic = topics[slug as keyof typeof topics];
  return topic ? { image: `editorial/${topic[0]}`, imageAlt: captions[locale][topic[1]] } : undefined;
}
export function resourcePhoto(locale: Locale, slug: ResourceSlug) {
  const [name, index] = resourceTopics[slug];
  return { image: `editorial/${name}`, imageAlt: captions[locale][index] };
}
