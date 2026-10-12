"use client";
import { useBag } from "./site-shell";
import { Arrow } from "./icons";
export function AddToBag() {
  const bag = useBag();
  return <button className="button button-gold product-add" onClick={bag.add} disabled={bag.count >= 20}>Add to bag <Arrow /></button>;
}
