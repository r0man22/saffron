"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FRAME_COUNT = 71;

const storyCopy = [
  {
    from: 0,
    to: 0.13,
    eyebrow: "Pure Azerbaijani saffron",
    title: "ROFRAN",
    body: "A single filament awakens.",
    align: "center",
  },
  {
    from: 0.13,
    to: 0.29,
    eyebrow: "The ritual of",
    title: "Red gold",
    body: "Nature’s most precious gift. Timeless, rare, exquisite.",
    align: "left",
  },
  {
    from: 0.29,
    to: 0.43,
    eyebrow: "From flower",
    title: "To treasure",
    body: "Nature creates. We preserve its finest secret.",
    align: "left",
  },
  {
    from: 0.43,
    to: 0.57,
    eyebrow: "Threads of devotion",
    title: "Converge",
    body: "Gathered by time. Perfected by nature.",
    align: "right",
  },
  {
    from: 0.57,
    to: 0.71,
    eyebrow: "Every thread",
    title: "Holds a story",
    body: "A harvest measured in patience, not speed.",
    align: "left",
  },
  {
    from: 0.71,
    to: 0.86,
    eyebrow: "The shape of",
    title: "Preciousness",
    body: "Resplendent in aroma. Precious in every thread.",
    align: "right",
  },
  {
    from: 0.86,
    to: 1.01,
    eyebrow: "Crafted by nature",
    title: "Captured with reverence",
    body: "The jar is born.",
    align: "left",
  },
] as const;

const sizes = [
  { grams: "1 gram", price: 36 },
  { grams: "3 gram", price: 88 },
  { grams: "5 gram", price: 132, badge: "Best value" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  let x = 0;
  let y = 0;

  if (imageRatio > canvasRatio) {
    drawWidth = height * imageRatio;
    x = (width - drawWidth) / 2;
  } else {
    drawHeight = width / imageRatio;
    y = (height - drawHeight) / 2;
  }

  context.clearRect(0, 0, width, height);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

export default function Home() {
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const requestedFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeCopy = useMemo(
    () => storyCopy.find((item) => progress >= item.from && progress < item.to) ?? storyCopy[0],
    [progress],
  );

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image?.complete || image.naturalWidth === 0) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const targetWidth = Math.round(width * pixelRatio);
    const targetHeight = Math.round(height * pixelRatio);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    drawCover(context, image, targetWidth, targetHeight);
  };

  useEffect(() => {
    let cancelled = false;
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = `/frames/frame-${String(index).padStart(3, "0")}.webp`;
      image.onload = () => {
        if (cancelled) return;
        setLoadedFrames((count) => Math.min(count + 1, FRAME_COUNT));
        if (index === 0 || index === requestedFrameRef.current) renderFrame(index);
      };
      return image;
    });
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const available = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / available, 0, 1);
      const frame = Math.min(FRAME_COUNT - 1, Math.round(nextProgress * (FRAME_COUNT - 1)));
      requestedFrameRef.current = frame;
      setProgress(nextProgress);
      renderFrame(frame);
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const size = sizes[selectedSize];

  return (
    <main>
      <header className="site-header">
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <a className="wordmark" href="#top" aria-label="ROFRAN home">
          ROFRAN
        </a>
        <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
          <a href="#origin" onClick={() => setMenuOpen(false)}>Origin</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>Craft</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
        </nav>
        <button className="locale-button" aria-label="Current language: Azerbaijani">
          Azerbaijan <span aria-hidden="true">◎</span>
        </button>
        <a className="cart-link" href="#shop" aria-label={`${cartCount} items in cart`}>
          Bag <span>{String(cartCount).padStart(2, "0")}</span>
        </a>
      </header>

      <section className="scroll-stage" ref={stageRef} id="top" aria-label="From saffron flower to jar">
        <div className="sticky-scene">
          <canvas ref={canvasRef} className="sequence-canvas" aria-hidden="true" />
          <div className="scene-vignette" />
          <div className={`story-copy story-copy-${activeCopy.align}`} key={activeCopy.title}>
            <p className="story-eyebrow">{activeCopy.eyebrow}</p>
            <h1>{activeCopy.title}</h1>
            <p className="story-body">{activeCopy.body}</p>
          </div>

          <div className="chapter-rail" aria-hidden="true">
            {storyCopy.map((item, index) => (
              <span
                key={item.title}
                className={progress >= item.from && progress < item.to ? "active" : ""}
              />
            ))}
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll</span>
            <i />
          </div>

          {loadedFrames < FRAME_COUNT && (
            <div className="loader" role="status" aria-live="polite">
              <span style={{ width: `${(loadedFrames / FRAME_COUNT) * 100}%` }} />
            </div>
          )}
        </div>
      </section>

      <section className="origin-section" id="origin">
        <div className="origin-overlay" />
        <div className="origin-copy reveal-panel">
          <p className="section-kicker">From the heart of Azerbaijan</p>
          <h2>Born from soil.<br />Perfected by hand.</h2>
          <p>
            In the first light of autumn, every crocus is gathered by hand. Only three crimson
            stigmas are chosen from each flower—a harvest defined by patience.
          </p>
          <a href="#craft" className="text-link">Discover our craft <span>↘</span></a>
        </div>
      </section>

      <section className="craft-section" id="craft">
        <div className="craft-intro">
          <p className="section-kicker">A ritual of purity</p>
          <h2>Nothing added.<br />Nothing hurried.</h2>
        </div>
        <div className="principles-grid">
          {[
            ["01", "100% natural", "Pure Crocus sativus, selected without additives."],
            ["02", "Hand picked", "Harvested at dawn while every flower is still closed."],
            ["03", "Lab tested", "Carefully verified for strength, color and aroma."],
            ["04", "Pure aroma", "A deep honeyed fragrance with a clean, lasting finish."],
          ].map(([number, title, body]) => (
            <article key={number} className="principle-card">
              <span>{number}</span>
              <div className="principle-mark" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-section" id="shop">
        <div className="product-visual">
          <img src="/images/anchors/product-hero.png" alt="ROFRAN pure Azerbaijani saffron jar" />
          <div className="product-glow" />
        </div>
        <div className="product-panel">
          <p className="section-kicker">The essence of luxury</p>
          <h2>Pure Azerbaijani<br />saffron</h2>
          <p className="product-description">
            Intense in color. Rich in aroma. A small ritual with extraordinary depth.
          </p>

          <fieldset className="size-picker">
            <legend>Choose your size</legend>
            {sizes.map((option, index) => (
              <button
                type="button"
                key={option.grams}
                className={selectedSize === index ? "selected" : ""}
                aria-pressed={selectedSize === index}
                onClick={() => setSelectedSize(index)}
              >
                <span>{option.grams}</span>
                {option.badge && <small>{option.badge}</small>}
                <b>${option.price}</b>
              </button>
            ))}
          </fieldset>

          <button className="add-button" onClick={() => setCartCount((count) => count + 1)}>
            <span>Add {size.grams} to bag</span>
            <span>${size.price}</span>
          </button>
          <p className="purchase-note">Complimentary premium packaging · Worldwide shipping</p>
        </div>
      </section>

      <section className="legacy-section">
        <div className="legacy-number">03</div>
        <div className="legacy-copy">
          <p className="section-kicker">Packaging & legacy</p>
          <h2>A legacy to be savored.<br />A tradition to be shared.</h2>
          <p>
            Presented in a deep oxblood case with antique-gold detailing, ROFRAN is made to be
            opened slowly—and remembered long after.
          </p>
        </div>
        <div className="package-object" aria-label="ROFRAN gift packaging illustration">
          <div className="package-spine">ROFRAN</div>
          <div className="package-face">
            <span>R</span>
            <strong>ROFRAN</strong>
            <small>Pure Azerbaijani saffron</small>
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="final-overlay" />
        <div className="final-copy">
          <div className="sun-mark" aria-hidden="true"><span>R</span></div>
          <p>Precious by nature.</p>
          <a href="#shop" className="gold-button">Shop ROFRAN</a>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">ROFRAN</a>
        <p>Pure Azerbaijani saffron · Crafted in reverence.</p>
        <span>© 2026 ROFRAN</span>
      </footer>
    </main>
  );
}
