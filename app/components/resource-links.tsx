import Link from "next/link";
import { localeHref, type Locale } from "../../lib/i18n";
import { resourceCopy, resourceLabels } from "../../lib/page-content";
import { faqCopy } from "../../lib/faq";
import { LinkArrow } from "./button";
export function ResourceLinks({ locale }: { locale: Locale }) {
  const t = resourceLabels[locale];
  const cards = [
    { path: "/quality", title: resourceCopy[locale].quality.title, description: resourceCopy[locale].quality.intro },
    { path: "/faq", title: faqCopy[locale].title, description: faqCopy[locale].intro },
    { path: "/about", title: resourceCopy[locale].about.title, description: resourceCopy[locale].about.intro },
  ];
  return <section className="resource-links"><div className="section-heading"><p className="eyebrow">ROFRAN</p><h2>{t.explore}</h2></div><div className="resource-link-grid">{cards.map((card, i) => <Link key={card.path} href={localeHref(locale, card.path)}><span className="resource-number">0{i + 1}</span><h3>{card.title}</h3><p>{card.description}</p><LinkArrow /></Link>)}</div></section>;
}
