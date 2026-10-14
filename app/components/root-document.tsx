import type { Metadata, Viewport } from "next";
import { SiteShell } from "./site-shell";
import { SiteFooter } from "./site-footer";
import { LocaleProvider } from "./locale-provider";
import { getDictionary } from "../../lib/dictionaries";
import { languageAlternates, localeHref, type Locale } from "../../lib/i18n";
import { siteUrl } from "../../lib/site-url";
import "../globals.css";
import { BrandSchema } from "./structured-data";
import { siteSettings } from "../../lib/site-settings.mjs";
export const sharedViewport: Viewport = { themeColor: "#160e10", width: "device-width", initialScale: 1 };
export async function rootMetadata(locale: Locale): Promise<Metadata> {
  const base = await siteUrl(); const t = getDictionary(locale);
  return { metadataBase: new URL(base), title: { default: t.meta.homeTitle, template: "%s | ROFRAN" }, description: t.meta.homeDescription,
    robots: { index: siteSettings().indexable, follow: true },
    alternates: { canonical: localeHref(locale, "/"), languages: languageAlternates("/") }, icons: { icon: "/favicon.svg" },
    openGraph: { title: t.meta.brandTitle, description: t.meta.brandDescription, type: "website", locale: { en: "en_US", az: "az_AZ", ru: "ru_RU" }[locale], siteName: "ROFRAN", images: [{ url: "/media/social.jpg", width: 1200, height: 630, alt: t.meta.socialAlt }] },
    twitter: { card: "summary_large_image", title: t.meta.brandTitle, description: t.meta.brandDescription, images: ["/media/social.jpg"] } };
}
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  return <html lang={locale}><head>
    <link rel="preload" href="/fonts/cormorant-garamond-400-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" href="/fonts/manrope-500-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="stylesheet" href="/fonts/fonts.css" />
  </head><body><BrandSchema /><LocaleProvider locale={locale} t={t}><SiteShell footer={<SiteFooter locale={locale} />}>{children}</SiteShell></LocaleProvider></body></html>;
}
