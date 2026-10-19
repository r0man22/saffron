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
      <div className="shop-hero-copy">
        <div className="shop-breadcrumb"><Link href={localeHref(locale, "/")}>{t.nav.home}</Link><span>/</span><span>{copy.nav}</span></div>
        <p className="shop-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title.split("|").map((line, i) => <span key={line}>{i === 1 ? <em>{line}</em> : line}</span>)}</h1>
        <p className="shop-hero-intro">{copy.intro}</p>
        <a href="#shop-collection" className="shop-button shop-button-primary">{copy.browse}<LinkArrow /></a>
        <div className="shop-unit-price"><span><bdi>{money(locale, shopSettings.pricePerGram)}</bdi></span><span>{copy.perGram}</span><span className="shop-price-thread" aria-hidden="true" /></div>
      </div>
      <figure className="shop-hero-figure"><Image src="/media/shop/bloom.webp" alt={copy.variants[1]} width={1254} height={1254} sizes="(max-width: 760px) 90vw, 46vw" loading="eager" fetchPriority="high" /><figcaption><span>02 / {copy.families[1]}</span><bdi>{rangeLabel(locale, "bloom")}</bdi></figcaption></figure>
    </section>
    <ShopCatalog locale={locale} copy={copy} />
    <section className="shop-guide" aria-labelledby="shop-guide-heading">
      <div className="shop-guide-heading"><p className="shop-eyebrow">ROFRAN</p><h2 id="shop-guide-heading">{copy.guideTitle}</h2></div>
      <div className="shop-guide-grid">{shopFamilies.map((family, i) => <div key={family.id}><span className="shop-guide-number">0{i + 1}</span><bdi>{rangeLabel(locale, family.id)}</bdi><h3>{copy.families[i]}</h3><p>{copy.descriptions[i]}</p></div>)}</div>
      <div className="shop-guide-notes"><p>{copy.guideOverlap}</p><p>{copy.guidePrice.replace("{price}", money(locale, shopSettings.pricePerGram))}</p></div>
    </section>
    <section className="shop-personal"><div><p className="shop-eyebrow">ROFRAN / {copy.nav}</p><h2>{copy.customTitle}</h2><p>{copy.customText}</p></div><a className="shop-button" href={`mailto:${business.email}?subject=${encodeURIComponent(copy.emailSubject)}`}>{copy.contact}<LinkArrow /></a></section>
  </main>;
}
