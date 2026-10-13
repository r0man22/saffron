import Link from "next/link";
import { articles } from "../../lib/journal";
import { FlowerMark } from "./icons";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-top" data-reveal="stagger">
      <div className="footer-intro"><Link href="/" className="brand" aria-label="ROFRAN home"><FlowerMark /><span className="gold-glint" data-glint="ROFRAN">ROFRAN</span></Link><p className="footer-tagline">Precious by <em>nature.</em></p></div>
      <nav className="footer-nav" aria-label="Footer">
        <div><p className="eyebrow">EXPLORE</p><Link href="/#story">Our story</Link><Link href="/saffron">Saffron</Link><Link href="/journal">Journal</Link></div>
        <div><p className="eyebrow">THE JOURNAL</p>{articles.map(article => <Link key={article.slug} href={`/journal/${article.slug}`}>{article.title}</Link>)}</div>
      </nav>
    </div>
    <p className="footer-wordmark" aria-hidden="true" data-reveal="letters">{[..."ROFRAN"].map((letter, i) => <span key={i}><span className="gold-glint" data-glint={letter}>{letter}</span></span>)}</p>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} ROFRAN</small><span>A small thread. An extraordinary story.</span><a href="#main-content">Back to top ↑</a></div>
  </footer>;
}
