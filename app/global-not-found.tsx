import type { Metadata } from "next";
import { RootDocument } from "./components/root-document";
import { LocalizedNotFound } from "./components/localized-not-found";
export const metadata: Metadata = { title: "Page not found | ROFRAN", robots: { index: false, follow: false } };
export default function GlobalNotFound() { return <RootDocument locale="en"><LocalizedNotFound /></RootDocument>; }
