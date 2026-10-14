"use client";
import { useState } from "react";
import Link from "next/link";
import { faqs, faqCopy } from "../../lib/faq";
import { localeHref, type Locale } from "../../lib/i18n";
import { LinkArrow } from "./button";
const normalize = (text: string, locale: Locale) => text.toLocaleLowerCase(locale).normalize("NFD").replace(/\p{M}/gu, "");
export function FaqExplorer({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const t = faqCopy[locale];
  const items = faqs[locale].filter(item => (category === "all" || item.category === category) && normalize(`${item.question} ${item.answer}`, locale).includes(normalize(query, locale)));
  return <div className="faq-explorer">
    <div className="faq-controls"><div className="faq-filters" role="group" aria-label={t.title}>{(["all", "saffron", "kitchen", "buying"] as const).map(key => <button type="button" key={key} aria-pressed={category === key} onClick={() => setCategory(key)}>{t[key]}</button>)}</div><label className="faq-search"><span>{t.search}</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search} /></label></div>
    <div className="faq-results" aria-live="polite" aria-atomic="true"><span>{items.length} / {faqs[locale].length}</span></div>
    <div className="faq-list">{items.map(item => <details key={item.question}><summary><span>{item.question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><div className="faq-answer"><p>{item.answer}</p>{item.link && <Link href={localeHref(locale, item.link)} className="text-link">{t.more} <LinkArrow /></Link>}</div></details>)}{!items.length && <p className="faq-empty">{t.empty}</p>}</div>
  </div>;
}
