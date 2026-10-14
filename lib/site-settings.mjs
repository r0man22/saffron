/**
 * Validate canonical URL configuration and keep previews out of search.
 * @param {{ NEXT_PUBLIC_SITE_URL?: string, SITE_INDEXABLE?: string, NODE_ENV?: string, VERCEL_ENV?: string }} env
 */
export function siteSettings(env = process.env) {
  const requested = env.SITE_INDEXABLE === "true";
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) {
    if (requested) throw new Error("Set NEXT_PUBLIC_SITE_URL to the confirmed production domain before enabling indexing.");
    return { url: null, indexable: false };
  }
  let url;
  try { url = new URL(configured); }
  catch { throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin."); }
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("NEXT_PUBLIC_SITE_URL must contain only the HTTP(S) origin, without credentials, paths, query strings or fragments.");
  }
  const local = url.hostname === "localhost" || url.hostname.endsWith(".localhost") || url.hostname === "[::1]" || /^127\./.test(url.hostname) || url.hostname === "0.0.0.0";
  if (requested && (url.protocol !== "https:" || local)) {
    throw new Error("Indexing requires a public HTTPS production origin.");
  }
  return {
    url: url.origin,
    indexable: requested && env.NODE_ENV === "production" && (!env.VERCEL_ENV || env.VERCEL_ENV === "production"),
  };
}
