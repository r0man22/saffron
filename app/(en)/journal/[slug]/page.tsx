import { ArticlePage, articleMetadata } from "../../../components/pages/article-page";
import { articles } from "../../../../lib/journal";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props) { return articleMetadata("en", (await params).slug); }
export default async function Page({ params }: Props) { return <ArticlePage locale="en" slug={(await params).slug} />; }
