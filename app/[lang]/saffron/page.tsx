import { SaffronPage } from "../../components/pages/saffron-page";
import { pageMetadata } from "../../../lib/page-metadata";
import { localizedLocale } from "../../../lib/locale-server";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata(localizedLocale((await params).lang), "saffron"); }
export default async function Page({ params }: Props) { return <SaffronPage locale={localizedLocale((await params).lang)} />; }
