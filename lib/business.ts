/** Owner-supplied facts. Leave unknown values empty; never invent offers or certifications. */
export const business = {
  name: "ROFRAN",
  legalName: "",
  email: "",
  telephone: "",
  address: "",
  origin: "",
  harvest: "",
  weightGrams: null as number | null,
  price: null as number | null,
  currency: "AZN",
  checkoutUrl: "",
  shippingCountries: [] as string[],
  certificates: [] as { name: string; url: string }[],
  socialProfiles: [] as string[],
  /** Set true only after the purchase flow and inventory are live. */
  salesEnabled: false,
};
