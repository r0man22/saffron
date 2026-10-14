import Image from "next/image";
import Link from "next/link";
import { ScrollStory } from "../scroll-story";
import { ButtonInner, LinkArrow } from "../button";
import { JournalCards } from "../journal-cards";
import { Lines, TranslatedLines } from "../motion";
import { getDictionary } from "../../../lib/dictionaries";
import { localeHref, type Locale } from "../../../lib/i18n";
import { ResourceLinks } from "../resource-links";
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return <main id="main-content">
    <ScrollStory />
    <section className="home-product" id="saffron" aria-labelledby="product-heading">
      <div className="home-product-image" data-reveal="image"><Image sizes="(max-width: 760px) 100vw, 50vw" src="/media/product.webp" alt={t.images.product} width={1920} height={1080} loading="lazy" /><span className="image-caption">{t.home.collection}</span></div>
      <div className="home-product-copy" data-reveal="stagger"><p className="eyebrow">{t.home.eyebrow}</p><h2 id="product-heading"><TranslatedLines lines={t.home.productTitle} /></h2><p>{t.home.description}</p><Link className="button button-gold" href={localeHref(locale, "/saffron")}><ButtonInner>{t.actions.discoverSaffron}</ButtonInner></Link><span className="product-footnote">{t.home.footnote}</span></div>
    </section>
    <section className="journal-section" id="journal" aria-labelledby="journal-heading">
      <div className="section-heading"><div data-reveal="stagger"><p className="eyebrow">{t.home.journalEyebrow}</p><h2 id="journal-heading"><Lines lines={[t.home.journalTitle]} /></h2></div><Link className="text-link" href={localeHref(locale, "/journal")} data-reveal="up">{t.actions.exploreJournal} <LinkArrow /></Link></div><JournalCards locale={locale} />
    </section>
    <ResourceLinks locale={locale} />
  </main>;
}
