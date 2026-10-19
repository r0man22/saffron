import settings from "../content/shop.json" with { type: "json" };

export const shopSettings = settings;
export const shopFamilies = settings.families;
export const shopVariants = settings.variants;
export const findFamily = id => shopFamilies.find(family => family.id === id);
export const findVariant = id => shopVariants.find(variant => variant.id === id);
export function validWeight(familyId, grams) {
  const family = findFamily(familyId);
  return !!family && Number.isSafeInteger(grams) && grams >= family.min && (family.max === null || grams <= family.max);
}
export function selectionPrice(grams, quantity = 1) {
  const result = grams * quantity * settings.pricePerGram;
  return Number.isSafeInteger(grams) && grams > 0 && Number.isSafeInteger(quantity) && quantity > 0 && Number.isSafeInteger(result) ? result : 0;
}
export const selectionKey = item => `${item.variantId}:${item.grams}`;

/** Untrusted localStorage is validated against the current catalogue, not a stored price. */
export function parseSelections(raw, capacity = settings.maxBagSets) {
  let parsed;
  try { parsed = JSON.parse(raw || "[]"); } catch { return []; }
  if (!Array.isArray(parsed)) return [];
  const result = [];
  let remaining = Math.max(0, Math.min(settings.maxBagSets, capacity));
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const variant = findVariant(item.variantId);
    if (!variant || !validWeight(variant.family, item.grams) || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || !selectionPrice(item.grams, item.quantity)) continue;
    const quantity = Math.min(item.quantity, remaining);
    if (!quantity) break;
    const previous = result.find(entry => selectionKey(entry) === selectionKey(item));
    if (previous) previous.quantity += quantity;
    else result.push({ variantId: variant.id, grams: item.grams, quantity });
    remaining -= quantity;
  }
  return result;
}
