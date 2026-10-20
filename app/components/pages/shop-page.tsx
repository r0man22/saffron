import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { shopCopy, money, rangeLabel } from "../../../lib/shop-copy";
import { shopFamilies, shopVariants, shopSettings } from "../../../lib/shop-catalog.mjs";
import { localeHref, type Locale } from "../../../lib/i18n";
import { getDictionary } from "../../../lib/dictionaries";
import { siteUrl } from "../../../lib/site-url";
import { business } from "../../../lib/business";
import { BreadcrumbSchema, StructuredData } from "../structured-data";
import { LinkArrow } from "../button";
import { ShopCatalog } from "../shop-catalog";

// Gold glints over the hero's velvet: left %, top %, size px, delay s, duration s.
const SPARKLES = [[8, 18, 5, 0, 5.5], [17, 62, 4, 1.8, 6], [27, 30, 6, 3.1, 5], [36, 82, 4, 0.7, 6.5], [44, 12, 5, 2.4, 5.8],
  [52, 54, 3, 4.2, 6.2], [58, 24, 6, 1.1, 5.2], [64, 78, 5, 3.6, 6.8], [71, 8, 4, 0.3, 5.6], [77, 44, 7, 2.9, 6.1],
  [84, 70, 4, 1.5, 5.4], [90, 26, 5, 4.6, 6.4], [95, 58, 4, 2.1, 5.9], [5, 88, 5, 3.9, 6.6], [48, 92, 4, 0.9, 5.3], [68, 36, 3, 5.2, 6]];

export async function ShopPage({ locale }: { locale: Locale }) {
  const copy = shopCopy(locale);
  const t = getDictionary(locale);
  const base = await siteUrl();
  const url = base + localeHref(locale, "/shop");
  const collection = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": url + "#collection",
    name: `${copy.nav} | ROFRAN`, description: copy.intro, url, inLanguage: locale,
    mainEntity: { "@type": "ItemList", numberOfItems: shopVariants.length,
      itemListElement: shopVariants.map((variant, i) => ({ "@type": "ListItem", position: i + 1, item: {
        "@type": "Product", "@id": `${url}#${variant.id}`, name: copy.variants[i],
        description: copy.contents[i], image: base + variant.image, url: `${url}#${variant.id}`,
        brand: { "@type": "Brand", name: "ROFRAN" },
      } })) },
  };
  return <main id="main-content" className="shop-main">
    <StructuredData value={collection} />
    <BreadcrumbSchema locale={locale} items={[{ name: t.nav.home, path: "/" }, { name: copy.nav, path: "/shop" }]} />
    <section className="shop-hero">
      <div className="shop-hero-ornaments" aria-hidden="true"><span className="shop-art shop-art-painted shop-hero-art-a" /><span className="shop-art shop-art-painted shop-art-flip shop-hero-art-b" /></div>
      <div className="shop-sparkles" aria-hidden="true">{SPARKLES.map(([left, top, size, delay, duration], i) => <i key={i} style={{ left: `${left}%`, top: `${top}%`, "--s": `${size}px`, "--delay": `${delay}s`, "--d": `${duration}s` } as CSSProperties} />)}</div>
      <div className="shop-hero-copy">
        <div className="shop-breadcrumb"><Link href={localeHref(locale, "/")}>{t.nav.home}</Link><span>/</span><span>{copy.nav}</span></div>
        <p className="shop-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title.split("|").map((line, i) => <span key={line}>{i === 1 ? <em className="shop-gold-text">{line}</em> : line}</span>)}</h1>
        <p className="shop-hero-intro">{copy.intro}</p>
        <a href="#shop-collection" className="shop-button shop-button-primary">{copy.browse}<LinkArrow /></a>
        <div className="shop-unit-price"><span><bdi>{money(locale, shopSettings.pricePerGram)}</bdi></span><span>{copy.perGram}</span><span className="shop-price-thread" aria-hidden="true" /></div>
      </div>
      <figure className="shop-hero-figure"><div className="shop-hero-medallion"><Image src="/media/shop/bloom.webp" alt={copy.variants[1]} width={1254} height={1254} sizes="(max-width: 760px) 80vw, 40vw" loading="eager" fetchPriority="high" /></div><figcaption><span>02 / {copy.families[1]}</span><bdi>{rangeLabel(locale, "bloom")}</bdi></figcaption></figure>
    </section>
    <ShopCatalog locale={locale} copy={copy} />
    <section className="shop-guide" aria-labelledby="shop-guide-heading">
      <span className="shop-art shop-art-painted shop-guide-art" aria-hidden="true" /><span className="shop-art shop-art-painted shop-guide-art shop-guide-art-b" aria-hidden="true" />
      <div className="shop-guide-heading"><p className="shop-eyebrow">ROFRAN</p><h2 id="shop-guide-heading">{copy.guideTitle}</h2></div>
      <div className="shop-guide-grid">{shopFamilies.map((family, i) => <div key={family.id}><span className="shop-guide-number">0{i + 1}</span><bdi>{rangeLabel(locale, family.id)}</bdi><h3>{copy.families[i]}</h3><p>{copy.descriptions[i]}</p></div>)}</div>
      <div className="shop-guide-notes"><p>{copy.guideOverlap}</p><p>{copy.guidePrice.replace("{price}", money(locale, shopSettings.pricePerGram))}</p></div>
    </section>
    <section className="shop-personal"><span className="shop-art shop-art-fan shop-art-flip shop-personal-art" aria-hidden="true" /><div><p className="shop-eyebrow">ROFRAN / {copy.nav}</p><h2>{copy.customTitle}</h2><p>{copy.customText}</p></div><a className="shop-button" href={`mailto:${business.email}?subject=${encodeURIComponent(copy.emailSubject)}`}>{copy.contact}<LinkArrow /></a></section>
  </main>;
}
