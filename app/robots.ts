import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site-url";
export default async function robots(): Promise<MetadataRoute.Robots> {
  // Preview pages remain crawlable so crawlers can see their noindex metadata.
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${await siteUrl()}/sitemap.xml` };
}
