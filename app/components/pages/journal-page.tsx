import { JournalCards } from "../journal-cards";
import { TranslatedLines } from "../motion";
import { getDictionary } from "../../../lib/dictionaries";
import type { Locale } from "../../../lib/i18n";
import { ResourceLinks } from "../resource-links";
import { BreadcrumbSchema } from "../structured-data";
export function JournalPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return <main id="main-content" className="inner-main"><BreadcrumbSchema locale={locale} items={[{ name: t.nav.home, path: "/" }, { name: t.nav.journal, path: "/journal" }]} /><section className="journal-hero"><p className="eyebrow">{t.journal.eyebrow}</p><h1><TranslatedLines lines={t.journal.title} /></h1><p>{t.journal.description}</p></section><section className="journal-index" aria-label={t.journal.guides}><JournalCards locale={locale} reveal={false} limit={100} /></section><ResourceLinks locale={locale} /></main>;
}
