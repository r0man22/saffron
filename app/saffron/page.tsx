import type { Metadata } from "next";
import Link from "next/link";
import { ProductGallery } from "../components/product-gallery";
import { AddToBag } from "../components/add-to-bag";
import { Arrow } from "../components/icons";
import { JournalCards } from "../components/journal-cards";

export const metadata: Metadata = { title: "Saffron threads", description: "Discover ROFRAN saffron threads. Explore the colour, aroma and everyday ritual of cooking with saffron.", alternates: { canonical: "/saffron" }, openGraph: { title: "Discover ROFRAN saffron", description: "A little. Remarkable.", images: ["/media/social.jpg"] } };
export default function SaffronPage() {
  return <main id="main-content" className="inner-main">
    <div className="page-topline"><Link href="/">Home</Link><span>/</span><span>Saffron</span></div>
    <section className="product-detail"><ProductGallery /><div className="product-detail-copy"><p className="eyebrow">THE ROFRAN COLLECTION</p><h1>A little.<br /><em>Remarkable.</em></h1><p className="product-subtitle">ROFRAN saffron threads</p><p className="product-description">For the meals you linger over. For the small rituals that become your own. Discover the colour and aroma of saffron, one thread at a time.</p><AddToBag /><p className="product-note">Explore the collection. Online checkout is not available yet.</p>
      <div className="product-facts"><details open><summary>The saffron</summary><p>Saffron is made from the dried red stigmas of the Crocus sativus flower. Its place in the kitchen is both visual and aromatic: a small ingredient that invites a little attention.</p></details><details><summary>Your first ritual</summary><p>Start with a saffron recipe and follow its preparation instructions. Infusing the threads in warm liquid is a common first step. <Link href="/journal/how-to-use-saffron">Read our guide to using saffron.</Link></p></details><details><summary>A little care</summary><p>Keep your saffron in an airtight container away from light, and follow the storage instructions on its packaging. <Link href="/journal/how-to-store-saffron">Explore the storage guide.</Link></p></details></div>
    </div></section>
    <section className="product-editorial"><div className="product-editorial-copy"><p className="eyebrow">BEFORE THE FIRST THREAD</p><h2>It begins<br />with a <em>flower.</em></h2><p>Take a closer look at Crocus sativus and the delicate beginning of an extraordinary ingredient.</p><Link className="text-link" href="/journal/what-is-saffron">Get to know saffron <Arrow /></Link></div><img src="/media/flower.webp" alt="An opening saffron crocus" width="1920" height="1080" loading="lazy"/></section>
    <section className="journal-section"><div className="section-heading"><h2>A richer ritual</h2><Link href="/journal" className="text-link">The saffron journal <Arrow /></Link></div><JournalCards /></section>
  </main>;
}
