import { FaqPage, faqMetadata } from "../../components/pages/faq-page";
import { localizedLocale } from "../../../lib/locale-server";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) { return faqMetadata(localizedLocale((await params).lang)); }
export default async function Page({ params }: Props) { return <FaqPage locale={localizedLocale((await params).lang)} />; }
