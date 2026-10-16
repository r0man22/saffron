import settings from "../content/product.json";
/** The order minimum is independent of packaging weight and cooking quantities. */
export const productSettings = settings;
if (!Number.isFinite(settings.minimumOrderGrams) || settings.minimumOrderGrams <= 0) {
  throw new Error("minimumOrderGrams must be a positive number.");
}
export function resolveProductText<T>(content: T): T {
  return JSON.parse(JSON.stringify(content).replaceAll("{minimum}", String(settings.minimumOrderGrams))) as T;
}
