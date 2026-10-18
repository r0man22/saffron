import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../../lib/dictionaries";
import { resourceCopy, resourceLabels, type ResourceSlug } from "../../../lib/page-content";
import { contentMetadata } from "../../../lib/seo";
import { localeHref, type Locale } from "../../../lib/i18n";
import { business } from "../../../lib/business";
import { LinkArrow } from "../button";
import { ResourceLinks } from "../resource-links";
import { BreadcrumbSchema } from "../structured-data";
export function resourceMetadata(locale: Locale, slug: ResourceSlug) {
  const page = resourceCopy[locale][slug];
  return { ...contentMetadata(locale, `/${slug}`, page.title, page.description, `/media/${page.image}.webp`), ...(page.draft && { robots: { index: false, follow: true } }) };
}
export function ResourcePage({ locale, slug }: { locale: Locale; slug: ResourceSlug }) {
  const page = resourceCopy[locale][slug]; const d = getDictionary(locale); const t = resourceLabels[locale];
  return <main id="main-content" className={`inner-main knowledge-main resource-${slug}`}><BreadcrumbSchema locale={locale} items={[{ name: d.nav.home, path: "/" }, { name: page.title, path: `/${slug}` }]} />
    <div className="page-topline"><Link href={localeHref(locale, "/")}>{d.nav.home}</Link><span>/</span><span>{page.title}</span></div>
    <header className="knowledge-hero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="knowledge-intro">{page.intro}</p></div><div className="knowledge-hero-image"><Image sizes="(max-width: 760px) 90vw, 42vw" src={`/media/${page.image}.webp`} alt={page.title} width={1920} height={1080} fetchPriority="high" /><span className="knowledge-image-caption">ROFRAN · {page.eyebrow}</span></div></header>
    <div className="knowledge-body"><aside className="knowledge-aside"><span className="eyebrow">ROFRAN</span><nav aria-label={page.title}>{page.sections.map((section, i) => <a key={section.title} href={`#detail-${i + 1}`}>{section.title}</a>)}</nav><Link className="text-link" href={localeHref(locale, "/faq")}>{t.faq}<LinkArrow /></Link></aside>
      <div className="knowledge-sections">{page.sections.map((section, i) => <section id={`detail-${i + 1}`} key={section.title}><span className="resource-number">0{i + 1}</span><h2>{section.title}</h2><p>{section.text}</p></section>)}
        {slug === "quality" && business.certificates.length > 0 && <ul>{business.certificates.map(c => <li key={c.url}><a href={c.url}>{c.name}</a></li>)}</ul>}
        {slug === "contact" && (business.emails.length > 0 || business.telephone) && <div className="contact-details">{business.emails.map(email => <a key={email} href={`mailto:${email}`}>{email}</a>)}{business.telephone && <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>}</div>}
        <div className="knowledge-next"><Link className="button button-gold" href={localeHref(locale, "/saffron")}>{t.product}<LinkArrow /></Link><Link className="text-link" href={localeHref(locale, "/journal")}>{t.journal}<LinkArrow /></Link></div>
      </div></div><ResourceLinks locale={locale} />
  </main>;
}
