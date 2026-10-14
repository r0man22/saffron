import { HomePage } from "../components/pages/home-page";
import { localizedLocale } from "../../lib/locale-server";
export default async function Page({ params }: { params: Promise<{ lang: string }> }) { return <HomePage locale={localizedLocale((await params).lang)} />; }
