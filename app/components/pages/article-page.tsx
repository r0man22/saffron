import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "../../../lib/journal-localized";
import { getDictionary } from "../../../lib/dictionaries";
import { languageAlternates, localeHref, type Locale } from "../../../lib/i18n";
import { siteUrl } from "../../../lib/site-url";
import { JournalCards } from "../journal-cards";
import { Lines } from "../motion";
export function articleMetadata(locale: Locale, slug: string): Metadata {
  const article = getArticles(locale).find(item => item.slug === slug);
  if (!article) return {};
  const path = `/journal/${slug}`;
  return { title: article.title, description: article.description, alternates: { canonical: localeHref(locale, path), languages: languageAlternates(path) },
    openGraph: { title: `${article.title} | ROFRAN`, description: article.description, type: "article", locale: { en: "en_US", az: "az_AZ", ru: "ru_RU" }[locale], images: [`/media/${article.image}.webp`] },
    twitter: { title: article.title, description: article.description, images: [`/media/${article.image}.webp`] } };
}
export async function ArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const article = getArticles(locale).find(item => item.slug === slug); if (!article) notFound();
  const t = getDictionary(locale); const url = await siteUrl();
  const structured = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, inLanguage: locale, image: `${url}/media/${article.image}.webp`, author: { "@type": "Organization", name: "ROFRAN" }, mainEntityOfPage: url + localeHref(locale, `/journal/${slug}`) };
  return <main id="main-content" className="inner-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <div className="page-topline"><Link href={localeHref(locale, "/")}>{t.nav.home}</Link><span>/</span><Link href={localeHref(locale, "/journal")}>{t.nav.journal}</Link><span>/</span><span>{article.title}</span></div>
    <article><header className="article-hero"><img src={`/media/${article.image}.webp`} alt={article.imageAlt} width="1920" height="1080" fetchPriority="high" /><div className="article-hero-copy"><p className="eyebrow">{article.category} · {article.readTime}</p><h1>{article.title}</h1><p className="article-deck">{article.deck}</p></div></header>
      <div className="article-body-layout"><nav className="article-toc" aria-label={t.journal.tocLabel}><p>{t.journal.toc}</p>{article.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav><div className="article-content"><p className="lead">{article.lead}</p>{article.sections.map(section => <section key={section.id} id={section.id} data-reveal="up"><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className="article-sources" data-reveal="up"><span>{t.journal.sources}</span>{article.sources.map(source => <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>)}</div></div></div>
    </article><section className="article-related"><h2 data-reveal="lines"><Lines lines={[t.actions.continue]} /></h2><JournalCards locale={locale} exclude={slug} /></section>
  </main>;
}
