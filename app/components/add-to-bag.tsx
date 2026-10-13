"use client";
import { useBag } from "./site-shell";
import { ButtonInner } from "./button";
export function AddToBag() {
  const bag = useBag();
  return <button className="button button-gold product-add" onClick={bag.add} disabled={bag.count >= 20}><ButtonInner>Add to bag</ButtonInner></button>;
}
