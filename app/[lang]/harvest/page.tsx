import { HarvestPage, harvestMetadata } from "../../components/pages/harvest-page";
import { localizedLocale } from "../../../lib/locale-server";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  return harvestMetadata(localizedLocale((await params).lang));
}

export default async function Page({ params }: Props) {
  return <HarvestPage locale={localizedLocale((await params).lang)} />;
}
