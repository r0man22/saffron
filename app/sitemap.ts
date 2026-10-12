import type { MetadataRoute } from "next";
import { articles } from "../lib/journal";
import { siteUrl } from "../lib/site-url";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await siteUrl();
  return ["", "/saffron", "/journal", ...articles.map(article => `/journal/${article.slug}`)].map(path => ({ url: base + path, changeFrequency: "monthly", priority: path === "" ? 1 : path === "/saffron" ? 0.9 : 0.7 }));
}
