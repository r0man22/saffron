import Link from "next/link";
import { ProductGallery } from "../product-gallery";
import { AddToBag } from "../add-to-bag";
import { LinkArrow } from "../button";
import { JournalCards } from "../journal-cards";
import { Lines, TranslatedLines } from "../motion";
import { getDictionary } from "../../../lib/dictionaries";
import { localeHref, type Locale } from "../../../lib/i18n";
export function SaffronPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const links = ["", "/journal/how-to-use-saffron", "/journal/how-to-store-saffron"];
  return <main id="main-content" className="inner-main">
    <div className="page-topline"><Link href={localeHref(locale, "/")}>{t.nav.home}</Link><span>/</span><span>{t.nav.saffron}</span></div>
    <section className="product-detail"><ProductGallery /><div className="product-detail-copy"><p className="eyebrow">{t.product.collection}</p><h1><TranslatedLines lines={t.product.title} /></h1><p className="product-subtitle">{t.product.subtitle}</p><p className="product-description">{t.product.description}</p><AddToBag /><p className="product-note">{t.product.note}</p>
      <div className="product-facts">{t.product.facts.map((fact, i) => <details key={i} open={i === 0}><summary>{fact.title}</summary><p>{fact.text}{fact.linkText && <> <Link href={localeHref(locale, links[i])}>{fact.linkText}</Link></>}</p></details>)}</div>
    </div></section>
    <section className="product-editorial"><div className="product-editorial-copy" data-reveal="stagger"><p className="eyebrow">{t.product.editorialEyebrow}</p><h2><TranslatedLines lines={t.product.editorialTitle} /></h2><p>{t.product.editorialText}</p><Link className="text-link" href={localeHref(locale, "/journal/what-is-saffron")}>{t.product.editorialLink} <LinkArrow /></Link></div><div className="product-editorial-media" data-reveal="image"><img src="/media/flower.webp" alt={t.images.flower} width="1920" height="1080" loading="lazy" /></div></section>
    <section className="journal-section"><div className="section-heading"><h2 data-reveal="lines"><Lines lines={[t.product.relatedTitle]} /></h2><Link href={localeHref(locale, "/journal")} className="text-link" data-reveal="up">{t.home.journalTitle} <LinkArrow /></Link></div><JournalCards locale={locale} /></section>
  </main>;
}
