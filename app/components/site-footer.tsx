import Link from "next/link";
import { getArticles } from "../../lib/journal-localized";
import { getDictionary } from "../../lib/dictionaries";
import { localeHref, type Locale } from "../../lib/i18n";
import { RofranMark } from "./icons";
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return <footer className="site-footer"><div className="footer-top" data-reveal="stagger">
    <div className="footer-intro"><Link href={localeHref(locale, "/")} className="brand" aria-label={t.nav.homeLabel}><RofranMark /><span className="gold-glint" data-glint="ROFRAN">ROFRAN</span></Link><p className="footer-tagline">{t.footer.taglinePrefix}<em>{t.footer.taglineEm}</em></p></div>
    <nav className="footer-nav" aria-label={t.footer.aria}><div><p className="eyebrow">{t.footer.explore}</p><Link href={localeHref(locale, "/#story")}>{t.nav.story}</Link><Link href={localeHref(locale, "/saffron")}>{t.nav.saffron}</Link><Link href={localeHref(locale, "/journal")}>{t.nav.journal}</Link></div><div><p className="eyebrow">{t.footer.journal}</p>{getArticles(locale).map(article => <Link key={article.slug} href={localeHref(locale, `/journal/${article.slug}`)}>{article.title}</Link>)}</div></nav>
  </div><p className="footer-wordmark" aria-hidden="true" data-reveal="letters">{[..."ROFRAN"].map((letter, i) => <span key={i}><span className="gold-glint" data-glint={letter}>{letter}</span></span>)}</p><div className="footer-bottom"><small>© {new Date().getFullYear()} ROFRAN</small><span>{t.footer.bottom}</span><a href="#main-content">{t.footer.top}</a></div></footer>;
}
