"use client";
import Link from "next/link";
import { ButtonInner } from "./button";
import { TranslatedLines } from "./motion";
import { useLocale } from "./locale-provider";
import { localeHref } from "../../lib/i18n";
export function LocalizedNotFound() {
  const { locale, t } = useLocale();
  return <main id="main-content" className="not-found"><p className="eyebrow">{t.notFound.eyebrow}</p><h1><TranslatedLines lines={t.notFound.title} /></h1><p>{t.notFound.description}</p><Link href={localeHref(locale, "/")} className="button button-gold"><ButtonInner>{t.notFound.back}</ButtonInner></Link></main>;
}
