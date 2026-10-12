import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "../../../lib/journal";
import { JournalCards } from "../../components/journal-cards";
import { siteUrl } from "../../../lib/site-url";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const article = articles.find(item => item.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.description, alternates: { canonical: `/journal/${article.slug}` }, openGraph: { title: `${article.title} | ROFRAN`, description: article.description, type: "article", images: [`/media/${article.image}.webp`] } };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params; const article = articles.find(item => item.slug === slug); if (!article) notFound();
  const url = await siteUrl();
  const structured = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, image: `${url}/media/${article.image}.webp`, author: { "@type": "Organization", name: "ROFRAN" }, mainEntityOfPage: `${url}/journal/${slug}` };
  return <main id="main-content" className="inner-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <div className="page-topline"><Link href="/">Home</Link><span>/</span><Link href="/journal">Journal</Link><span>/</span><span>{article.title}</span></div>
    <article><header className="article-hero"><img src={`/media/${article.image}.webp`} alt={article.imageAlt} width="1920" height="1080" fetchPriority="high"/><div className="article-hero-copy"><p className="eyebrow">{article.category} · {article.readTime}</p><h1>{article.title}</h1><p className="article-deck">{article.deck}</p></div></header>
      <div className="article-body-layout"><nav className="article-toc" aria-label="In this article"><p>IN THIS STORY</p>{article.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav><div className="article-content"><p className="lead">{article.lead}</p>{article.sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className="article-sources"><span>FURTHER READING</span>{article.sources.map(source => <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>)}</div></div></div>
    </article><section className="article-related"><h2>Continue exploring</h2><JournalCards exclude={slug}/></section>
  </main>;
}
