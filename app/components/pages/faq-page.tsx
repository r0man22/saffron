import Image from "next/image";
import Link from "next/link";
import { faqCopy } from "../../../lib/faq";
import { getDictionary } from "../../../lib/dictionaries";
import { localeHref, type Locale } from "../../../lib/i18n";
import { contentMetadata } from "../../../lib/seo";
import { FaqExplorer } from "../faq-explorer";
import { ResourceLinks } from "../resource-links";
import { BreadcrumbSchema } from "../structured-data";
export function faqMetadata(locale: Locale) { const t = faqCopy[locale]; return contentMetadata(locale, "/faq", t.title, t.description); }
export function FaqPage({ locale }: { locale: Locale }) {
  const t = faqCopy[locale]; const d = getDictionary(locale);
  return <main id="main-content" className="inner-main knowledge-main"><BreadcrumbSchema locale={locale} items={[{ name: d.nav.home, path: "/" }, { name: t.title, path: "/faq" }]} />
    <div className="page-topline"><Link href={localeHref(locale, "/")}>{d.nav.home}</Link><span>/</span><span>{t.title}</span></div>
    <header className="knowledge-hero"><div><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="knowledge-intro">{t.intro}</p></div><div className="knowledge-hero-image"><Image sizes="(max-width: 760px) 90vw, 42vw" src="/media/flower.webp" alt={d.images.flower} width={1920} height={1080} fetchPriority="high" /><span className="knowledge-image-caption">Crocus sativus · ROFRAN</span></div></header>
    <section className="faq-section" aria-label={t.title}><FaqExplorer locale={locale} /></section><ResourceLinks locale={locale} />
  </main>;
}
