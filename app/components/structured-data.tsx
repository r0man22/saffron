import { siteHref, type SiteLocale } from "../../lib/international";
import { business } from "../../lib/business";
import { siteUrl } from "../../lib/site-url";
export function StructuredData({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}
export async function BrandSchema() {
  const base = await siteUrl();
  return <StructuredData value={{ "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${base}/#organization`, name: business.name, url: base, logo: `${base}/favicon.svg`, ...(business.legalName && { legalName: business.legalName }), ...(business.email && { email: business.email }), ...(business.telephone && { telephone: business.telephone }), ...(business.socialProfiles.length && { sameAs: business.socialProfiles }) },
    { "@type": "WebSite", "@id": `${base}/#website`, name: business.name, url: base, publisher: { "@id": `${base}/#organization` } },
  ] }} />;
}
export async function BreadcrumbSchema({ locale, items }: { locale: SiteLocale; items: { name: string; path: string }[] }) {
  const base = await siteUrl();
  return <StructuredData value={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: base + siteHref(locale, item.path) })) }} />;
}
