/** Owner-supplied facts. Leave unknown values empty; never invent offers or certifications. */
import { productSettings } from "./product-settings";
export const business = {
  name: "ROFRAN",
  legalName: "",
  email: "contact@rofran.com",
  secondaryEmail: "contact@rofran.az",
  emails: ["contact@rofran.com", "contact@rofran.az"],
  telephone: "+994508239345",
  telephoneDisplay: "+994 50 823 93 45",
  address: "Baku, Mashtaga, Azerbaijan",
  origin: productSettings.originConfirmed ? productSettings.originLabels.en : "",
  harvest: productSettings.harvest,
  weightGrams: productSettings.netWeightGrams as number | null,
  price: productSettings.price as number | null,
  currency: productSettings.currency,
  internationalPrice: productSettings.internationalPrice as number | null,
  internationalCurrency: productSettings.internationalCurrency,
  inStock: productSettings.inStock,
  checkoutUrl: "",
  shippingCountries: productSettings.shippingCountries as string[],
  certificates: [] as { name: string; url: string }[],
  socialProfiles: [] as string[],
  /** Set true only after the purchase flow and inventory are live. */
  salesEnabled: productSettings.salesEnabled,
};
export function getLocalePrice(locale: string) {
  const isAz = locale === "az";
  const amount = isAz ? business.price : business.internationalPrice;
  const currency = isAz ? business.currency : business.internationalCurrency;
  if (amount === null) return null;
  return { amount, currency, formatted: isAz ? `${amount} AZN` : `$${amount} USD` };
}
