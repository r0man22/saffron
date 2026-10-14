import Link from "next/link";
import { getArticles } from "../../lib/journal-localized";
import { localeHref, type Locale } from "../../lib/i18n";
import { LinkArrow } from "./button";
export function JournalCards({ locale, exclude, reveal = true }: { locale: Locale; exclude?: string; reveal?: boolean }) {
  return <div className="journal-cards">{getArticles(locale).filter(article => article.slug !== exclude).map(article => <Link className="journal-card" href={localeHref(locale, `/journal/${article.slug}`)} key={article.slug} data-reveal={reveal ? "up" : undefined}>
    <div className="journal-thumb"><img src={`/media/${article.image}.webp`} alt={article.imageAlt} width="1920" height="1080" loading="lazy" /></div><div className="journal-card-copy"><span>{article.category}</span><h3>{article.title}</h3><LinkArrow /><span className="read-time">{article.readTime}</span></div>
  </Link>)}</div>;
}
