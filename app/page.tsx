import Link from "next/link";
import { ScrollStory } from "./components/scroll-story";
import { Arrow } from "./components/icons";
import { JournalCards } from "./components/journal-cards";

export default function Home() {
  return <main id="main-content">
    <ScrollStory />
    <section className="home-product" id="saffron" aria-labelledby="product-heading">
      <div className="home-product-image">
        <img src="/media/product.webp" alt="Saffron threads in a glass jar, beside a violet crocus at sunset" width="1920" height="1080" loading="lazy" />
        <span className="image-caption">THE SAFFRON COLLECTION</span>
      </div>
      <div className="home-product-copy">
        <p className="eyebrow">ROFRAN SAFFRON</p>
        <h2 id="product-heading">Bring the story<br />to your <em>table.</em></h2>
        <p>A small thread. A golden colour. An unmistakable aroma.<br className="desktop-break" /> Discover a different kind of everyday ritual.</p>
        <Link className="button button-gold" href="/saffron">Discover our saffron <Arrow /></Link>
        <span className="product-footnote">A CLOSER LOOK AT SOMETHING EXTRAORDINARY</span>
      </div>
    </section>
    <section className="journal-section" id="journal" aria-labelledby="journal-heading">
      <div className="section-heading"><div><p className="eyebrow">A LITTLE KNOWLEDGE, A RICHER RITUAL</p><h2 id="journal-heading">The saffron journal</h2></div><Link className="text-link" href="/journal">Explore the journal <Arrow /></Link></div>
      <JournalCards />
    </section>
  </main>;
}
