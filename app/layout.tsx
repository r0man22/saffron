import type { Metadata, Viewport } from "next";
import { SiteShell } from "./components/site-shell";
import { siteUrl } from "../lib/site-url";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#160e10", width: "device-width", initialScale: 1 };
export async function generateMetadata(): Promise<Metadata> {
  const base = await siteUrl();
  return {
    metadataBase: new URL(base), title: { default: "ROFRAN — Precious by nature. Saffron, beautifully told.", template: "%s | ROFRAN" },
    description: "Discover ROFRAN saffron. Follow a cinematic journey from crocus flower to crimson thread, and explore our guide to cooking with and caring for saffron.",
    alternates: { canonical: "/" }, icons: { icon: "/favicon.svg" },
    openGraph: { title: "ROFRAN — Precious by nature", description: "A small thread. An extraordinary story. Discover ROFRAN saffron.", type: "website", locale: "en_US", siteName: "ROFRAN", images: [{ url: "/media/social.jpg", width: 1200, height: 630, alt: "ROFRAN saffron in a sunset crocus field" }] },
    twitter: { card: "summary_large_image", title: "ROFRAN — Precious by nature", images: ["/media/social.jpg"] },
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="stylesheet" href="/fonts/fonts.css" /></head><body><SiteShell>{children}</SiteShell></body></html>;
}
