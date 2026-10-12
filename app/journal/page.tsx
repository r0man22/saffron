import type { Metadata } from "next";
import { JournalCards } from "../components/journal-cards";
export const metadata: Metadata = { title: "The saffron journal", description: "Get to know saffron: where it begins, how to cook with its threads and how to care for it in your kitchen.", alternates: { canonical: "/journal" } };
export default function JournalPage() {
  return <main id="main-content" className="inner-main"><section className="journal-hero"><p className="eyebrow">NOTES FROM ROFRAN</p><h1>The saffron<br /><em>journal.</em></h1><p>A little knowledge makes the ritual richer. Meet the flower, find your first recipe and give each thread the attention it deserves.</p></section><section className="journal-index" aria-label="Saffron guides"><JournalCards /></section></main>;
}
