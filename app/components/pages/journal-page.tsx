import { JournalCards } from "../journal-cards";
import { TranslatedLines } from "../motion";
import { getDictionary } from "../../../lib/dictionaries";
import type { Locale } from "../../../lib/i18n";
export function JournalPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return <main id="main-content" className="inner-main"><section className="journal-hero"><p className="eyebrow">{t.journal.eyebrow}</p><h1><TranslatedLines lines={t.journal.title} /></h1><p>{t.journal.description}</p></section><section className="journal-index" aria-label={t.journal.guides}><JournalCards locale={locale} reveal={false} /></section></main>;
}
