"use client";
import Image from "next/image";
import { shopVariants, findVariant, selectionKey, selectionPrice } from "../../lib/shop-catalog.mjs";
import { shopCopy, gramLabel, money, familyIndex } from "../../lib/shop-copy";
import { useLocale } from "./locale-provider";
import type { ShopSelection } from "../../lib/shop-bag-store";
export function ShopBagItems({ items, count, update }: { items: ShopSelection[]; count: number; update: (key: string, quantity: number) => void }) {
  const { locale, t } = useLocale(); const copy = shopCopy(locale);
  return <div className="shop-bag-items">{items.map(item => {
    const variant = findVariant(item.variantId)!; const key = selectionKey(item);
    const i = shopVariants.findIndex(v => v.id === item.variantId);
    return <div className="shop-bag-item" key={key}>
      <div className="shop-bag-photo"><Image src={variant.image} alt={copy.variants[i]} width={200} height={200} sizes="108px" /></div>
      <div><p className="shop-bag-family">{copy.families[familyIndex(variant.family)]}</p><h3>{copy.variants[i]}</h3><p><bdi>{gramLabel(locale, item.grams)}</bdi> · <bdi>{money(locale, selectionPrice(item.grams))}</bdi></p><div className="quantity"><button type="button" aria-label={`${t.bag.decrease}: ${copy.variants[i]}`} onClick={() => update(key, item.quantity - 1)}>−</button><output aria-label={t.bag.quantity}>{item.quantity}</output><button type="button" aria-label={`${t.bag.increase}: ${copy.variants[i]}`} onClick={() => update(key, item.quantity + 1)} disabled={count >= 20}>+</button></div><button type="button" className="remove-item" onClick={() => update(key, 0)}>{t.bag.remove}</button></div>
      <strong className="shop-bag-price"><bdi>{money(locale, selectionPrice(item.grams, item.quantity))}</bdi></strong>
    </div>;
  })}</div>;
}
