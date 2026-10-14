import { RootDocument, rootMetadata, sharedViewport } from "../components/root-document";
import { localizedLocale } from "../../lib/locale-server";
export const viewport = sharedViewport;
export function generateStaticParams() { return [{ lang: "az" }, { lang: "ru" }]; }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) { return rootMetadata(localizedLocale((await params).lang)); }
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <RootDocument locale={localizedLocale((await params).lang)}>{children}</RootDocument>;
}
