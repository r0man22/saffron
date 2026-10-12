import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site-url";
export default async function robots(): Promise<MetadataRoute.Robots> {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${await siteUrl()}/sitemap.xml` };
}
