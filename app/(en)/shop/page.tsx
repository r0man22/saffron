import { ShopPage } from "../../components/pages/shop-page";
import { shopCopy } from "../../../lib/shop-copy";
import { contentMetadata } from "../../../lib/seo";
export const generateMetadata = () => {
  const copy = shopCopy("en");
  return contentMetadata("en", "/shop", `${copy.nav} — ${copy.collection.replace(/\.$/, "")}`, copy.intro, "/media/shop/bloom.webp");
};
export default function Page() { return <ShopPage locale="en" />; }
