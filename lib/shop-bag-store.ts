"use client";
import { useMemo, useSyncExternalStore } from "react";
import { findVariant, parseSelections, selectionKey, shopSettings, validWeight } from "./shop-catalog.mjs";

export type ShopSelection = { variantId: string; grams: number; quantity: number };
const key = "rofran-shop-bag-v1";
const listeners = new Set<() => void>();
let memory: string | null = null;
function read() {
  if (memory !== null) return memory;
  try { return localStorage.getItem(key) || "[]"; } catch { return "[]"; }
}
function write(items: ShopSelection[]) {
  memory = JSON.stringify(items);
  try { localStorage.setItem(key, memory); } catch {}
  listeners.forEach(listener => listener());
}
function subscribe(listener: () => void) {
  const sync = (e: StorageEvent) => { if (e.key === key || e.key === null) { memory = null; listener(); } };
  listeners.add(listener); window.addEventListener("storage", sync);
  return () => { listeners.delete(listener); window.removeEventListener("storage", sync); };
}
export function useShopBag(legacyCount: number) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const capacity = Math.max(0, shopSettings.maxBagSets - legacyCount);
  const items: ShopSelection[] = useMemo(() => parseSelections(raw, capacity), [raw, capacity]);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  function add(variantId: string, grams: number) {
    const variant = findVariant(variantId);
    if (!variant || !validWeight(variant.family, grams)) return false;
    const current: ShopSelection[] = parseSelections(read(), capacity);
    if (current.reduce((sum, item) => sum + item.quantity, 0) >= capacity) return false;
    const existing = current.find(item => item.variantId === variantId && item.grams === grams);
    if (existing) existing.quantity++;
    else current.push({ variantId, grams, quantity: 1 });
    write(current); return true;
  }
  function update(itemKey: string, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 0) return;
    const current: ShopSelection[] = parseSelections(read(), capacity);
    const otherCount = current.filter(item => selectionKey(item) !== itemKey).reduce((sum, item) => sum + item.quantity, 0);
    const next = current.map(item => selectionKey(item) === itemKey ? { ...item, quantity: Math.min(quantity, capacity - otherCount) } : item).filter(item => item.quantity > 0);
    write(next);
  }
  return { items, count, add, update };
}
