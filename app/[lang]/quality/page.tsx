import { ResourcePage, resourceMetadata } from "../../components/pages/resource-page";
import { localizedLocale } from "../../../lib/locale-server";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) { return resourceMetadata(localizedLocale((await params).lang), "quality"); }
export default async function Page({ params }: Props) { return <ResourcePage locale={localizedLocale((await params).lang)} slug="quality" />; }
