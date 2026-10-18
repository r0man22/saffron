import Image from "next/image";
import Link from "next/link";
import { ProductGallery } from "../product-gallery";
import { AddToBag } from "../add-to-bag";
import { LinkArrow } from "../button";
import { JournalCards } from "../journal-cards";
import { Lines, TranslatedLines } from "../motion";
import { getDictionary } from "../../../lib/dictionaries";
import { localeHref, type Locale } from "../../../lib/i18n";
import { business, getLocalePrice } from "../../../lib/business";
import { siteUrl } from "../../../lib/site-url";
import { BreadcrumbSchema, StructuredData } from "../structured-data";
import { productCopy } from "../../../lib/product-copy";
import { productSettings } from "../../../lib/product-settings";
import { siteSettings } from "../../../lib/site-settings.mjs";
import { faqs } from "../../../lib/faq";
import { ResourceLinks } from "../resource-links";
export async function SaffronPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const base = await siteUrl();
  const labels = productCopy(locale);
  const showDraftOrigin = process.env.NODE_ENV !== "production" && !siteSettings().indexable && !productSettings.originConfirmed;
  const origin = productSettings.originLabels[locale];
  const localePrice = getLocalePrice(locale);
  const questions = faqs[locale].filter(faq => faq.link === "/saffron" || faq.link === "/shipping");
  const product = { "@context": "https://schema.org", "@type": "Product", "@id": `${base}${localeHref(locale, "/saffron")}#product`, name: t.product.subtitle, description: `${t.product.description} ${labels.minimumNote}`, image: [`${base}/media/product.webp`, `${base}/media/threads.webp`], url: base + localeHref(locale, "/saffron"), brand: { "@type": "Brand", name: "ROFRAN" }, ...(productSettings.originConfirmed && { countryOfOrigin: { "@type": "Country", name: productSettings.originCountryCode } }), ...(business.weightGrams !== null && { weight: { "@type": "QuantitativeValue", value: business.weightGrams, unitCode: "GRM" } }) };
  const links = ["", "/journal/how-to-use-saffron", "/journal/how-to-store-saffron"];
  return <main id="main-content" className="inner-main">
    <StructuredData value={product} /><BreadcrumbSchema locale={locale} items={[{ name: t.nav.home, path: "/" }, { name: t.nav.saffron, path: "/saffron" }]} />
    <div className="page-topline"><Link href={localeHref(locale, "/")}>{t.nav.home}</Link><span>/</span><span>{t.nav.saffron}</span></div>
    <section className="product-detail"><ProductGallery /><div className="product-detail-copy"><p className="eyebrow">{t.product.collection}</p><h1><TranslatedLines lines={t.product.title} /></h1><p className="product-subtitle">{t.product.subtitle}</p><p className="product-description">{t.product.description}</p><div className="product-order-card"><div><span>{labels.minimumLabel}</span><strong>{labels.minimumValue}</strong></div><p>{labels.minimumNote}</p></div><AddToBag /><p className="product-note">{t.product.note}</p>
      {showDraftOrigin && <aside className="product-origin-preview" data-nosnippet><span>{labels.preview}</span><p>{origin}</p></aside>}
      <div className="product-facts">{t.product.facts.map((fact, i) => <details key={i} open={i === 0}><summary>{fact.title}</summary><p>{fact.text}{fact.linkText && <> <Link href={localeHref(locale, links[i])}>{fact.linkText}</Link></>}</p></details>)}</div>
      {(business.origin || business.weightGrams !== null || localePrice !== null) && <dl className="product-owner-facts">{business.origin && <div><dt>{labels.origin}</dt><dd>{origin}</dd></div>}{business.weightGrams !== null && <div><dt>{labels.weight}</dt><dd>{business.weightGrams} g</dd></div>}{localePrice !== null && <div><dt>{labels.price}</dt><dd>{localePrice.formatted}</dd></div>}{!business.inStock && <div><dt>{labels.status}</dt><dd>{labels.outOfStock}</dd></div>}</dl>}
    </div></section>
    <section className="product-editorial"><div className="product-editorial-copy" data-reveal="stagger"><p className="eyebrow">{t.product.editorialEyebrow}</p><h2><TranslatedLines lines={t.product.editorialTitle} /></h2><p>{t.product.editorialText}</p><Link className="text-link" href={localeHref(locale, "/journal/what-is-saffron")}>{t.product.editorialLink} <LinkArrow /></Link></div><div className="product-editorial-media" data-reveal="image"><Image sizes="(max-width: 760px) 100vw, 50vw" src="/media/flower.webp" alt={t.images.flower} width={1920} height={1080} loading="lazy" /></div></section>
    <section className="product-questions" aria-labelledby="product-questions-heading"><div><p className="eyebrow">ROFRAN</p><h2 id="product-questions-heading">{labels.productQuestions}</h2><Link className="text-link" href={localeHref(locale, "/faq")}>{labels.faqLink}<LinkArrow /></Link></div><div className="faq-list">{questions.map(q => <details key={q.question}><summary>{q.question}<span className="faq-plus" aria-hidden="true">+</span></summary><div className="faq-answer"><p>{q.answer}</p></div></details>)}</div></section>
    <section className="journal-section"><div className="section-heading"><h2 data-reveal="lines"><Lines lines={[t.product.relatedTitle]} /></h2><Link href={localeHref(locale, "/journal")} className="text-link" data-reveal="up">{t.home.journalTitle} <LinkArrow /></Link></div><JournalCards locale={locale} /></section>
    <ResourceLinks locale={locale} />
  </main>;
}
