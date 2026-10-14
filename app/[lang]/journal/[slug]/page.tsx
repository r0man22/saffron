import { ArticlePage, articleMetadata } from "../../../components/pages/article-page";
import { localizedLocale } from "../../../../lib/locale-server";
import { articles } from "../../../../lib/journal";
type Props = { params: Promise<{ lang: string; slug: string }> };
export function generateStaticParams() { return ["az", "ru"].flatMap(lang => articles.map(article => ({ lang, slug: article.slug }))); }
export async function generateMetadata({ params }: Props) { const { lang, slug } = await params; return articleMetadata(localizedLocale(lang), slug); }
export default async function Page({ params }: Props) { const { lang, slug } = await params; return <ArticlePage locale={localizedLocale(lang)} slug={slug} />; }
