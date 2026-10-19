import { ShopPage } from "../../components/pages/shop-page";
import { shopCopy } from "../../../lib/shop-copy";
import { contentMetadata } from "../../../lib/seo";
import { localizedLocale } from "../../../lib/locale-server";
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = localizedLocale((await params).lang); const copy = shopCopy(locale);
  return contentMetadata(locale, "/shop", `${copy.nav} — ${copy.collection.replace(/\.$/, "")}`, copy.intro, "/media/shop/bloom.webp");
}
export default async function Page({ params }: Props) { return <ShopPage locale={localizedLocale((await params).lang)} />; }
