import { JournalPage } from "../../components/pages/journal-page";
import { pageMetadata } from "../../../lib/page-metadata";
import { localizedLocale } from "../../../lib/locale-server";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata(localizedLocale((await params).lang), "journal"); }
export default async function Page({ params }: Props) { return <JournalPage locale={localizedLocale((await params).lang)} />; }
