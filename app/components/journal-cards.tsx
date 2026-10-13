import Link from "next/link";
import { articles } from "../../lib/journal";
import { LinkArrow } from "./button";
export function JournalCards({ exclude, reveal = true }: { exclude?: string; reveal?: boolean }) {
  return <div className="journal-cards">{articles.filter(article => article.slug !== exclude).map(article => <Link className="journal-card" href={`/journal/${article.slug}`} key={article.slug} data-reveal={reveal ? "up" : undefined}>
    <div className="journal-thumb"><img src={`/media/${article.image}.webp`} alt={article.imageAlt} width="1920" height="1080" loading="lazy" /></div>
    <div className="journal-card-copy"><span>{article.category}</span><h3>{article.title}</h3><LinkArrow /><span className="read-time">{article.readTime}</span></div>
  </Link>)}</div>;
}
