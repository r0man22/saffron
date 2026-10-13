import Link from "next/link";
import { ScrollStory } from "./components/scroll-story";
import { ButtonInner, LinkArrow } from "./components/button";
import { JournalCards } from "./components/journal-cards";
import { Lines } from "./components/motion";

export default function Home() {
  return <main id="main-content">
    <ScrollStory />
    <section className="home-product" id="saffron" aria-labelledby="product-heading">
      <div className="home-product-image" data-reveal="image">
        <img src="/media/product.webp" alt="Saffron threads in a glass jar, beside a violet crocus at sunset" width="1920" height="1080" loading="lazy" />
        <span className="image-caption">THE SAFFRON COLLECTION</span>
      </div>
      <div className="home-product-copy" data-reveal="stagger">
        <p className="eyebrow">ROFRAN SAFFRON</p>
        <h2 id="product-heading"><Lines lines={["Bring the story", <>to your <em>table.</em></>]} /></h2>
        <p>A small thread. A golden colour. An unmistakable aroma.<br className="desktop-break" /> Discover a different kind of everyday ritual.</p>
        <Link className="button button-gold" href="/saffron"><ButtonInner>Discover our saffron</ButtonInner></Link>
        <span className="product-footnote">A CLOSER LOOK AT SOMETHING EXTRAORDINARY</span>
      </div>
    </section>
    <section className="journal-section" id="journal" aria-labelledby="journal-heading">
      <div className="section-heading"><div data-reveal="stagger"><p className="eyebrow">A LITTLE KNOWLEDGE, A RICHER RITUAL</p><h2 id="journal-heading"><Lines lines={["The saffron journal"]} /></h2></div><Link className="text-link" href="/journal" data-reveal="up">Explore the journal <LinkArrow /></Link></div>
      <JournalCards />
    </section>
  </main>;
}
