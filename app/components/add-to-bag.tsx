"use client";
import { useBag } from "./site-shell";
import { ButtonInner } from "./button";
import { useLocale } from "./locale-provider";
export function AddToBag() {
  const bag = useBag();
  const { t } = useLocale();
  return <button className="button button-gold product-add" onClick={bag.add} disabled={bag.count >= 20}><ButtonInner>{t.actions.add}</ButtonInner></button>;
}
