import { headers } from "next/headers";
import { siteSettings } from "./site-settings.mjs";
export async function siteUrl() {
  const settings = siteSettings();
  if (settings.url) return settings.url;
  // Keep production metadata stable across host aliases and proxy headers.
  // The production hostname must be confirmed before enabling indexing.
  if (process.env.NODE_ENV === "production") return "https://rofran.com";
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = /^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? "http" : "https";
  return `${protocol}://${host}`;
}
