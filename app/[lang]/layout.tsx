import { RootDocument, rootMetadata, sharedViewport } from "../components/root-document";
import { localizedLocale } from "../../lib/locale-server";
export const viewport = sharedViewport;
import { locales } from "../../lib/i18n";
export function generateStaticParams() { return locales.filter(lang => lang !== "en").map(lang => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) { return rootMetadata(localizedLocale((await params).lang)); }
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <RootDocument locale={localizedLocale((await params).lang)}>{children}</RootDocument>;
}
