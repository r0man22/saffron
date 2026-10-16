/** Owner-supplied facts. Leave unknown values empty; never invent offers or certifications. */
import { productSettings } from "./product-settings";
export const business = {
  name: "ROFRAN",
  legalName: "",
  email: "",
  telephone: "",
  address: "",
  origin: productSettings.originConfirmed ? productSettings.originLabels.en : "",
  harvest: productSettings.harvest,
  weightGrams: productSettings.netWeightGrams as number | null,
  price: productSettings.price as number | null,
  currency: productSettings.currency,
  checkoutUrl: "",
  shippingCountries: productSettings.shippingCountries as string[],
  certificates: [] as { name: string; url: string }[],
  socialProfiles: [] as string[],
  /** Set true only after the purchase flow and inventory are live. */
  salesEnabled: productSettings.salesEnabled,
};
