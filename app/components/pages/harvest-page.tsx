import Image from "next/image";
import Link from "next/link";
import { harvestData } from "../../../lib/harvest-content";
import { getDictionary } from "../../../lib/dictionaries";
import { localeHref, type Locale } from "../../../lib/i18n";
import { contentMetadata } from "../../../lib/seo";
import { LinkArrow } from "../button";
import { BreadcrumbSchema } from "../structured-data";
import { ResourceLinks } from "../resource-links";

export function harvestMetadata(locale: Locale) {
  const content = harvestData[locale] || harvestData.en;
  return {
    ...contentMetadata(
      locale,
      "/harvest",
      content.metaTitle,
      content.metaDescription,
      "/images/harvest/harvest-field-dawn.jpg"
    ),
    robots: { index: false, follow: true }
  };
}

export function HarvestPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const data = harvestData[locale] || harvestData.en;

  return (
    <main id="main-content" className="inner-main harvest-main">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { name: t.nav.home, path: "/" },
          { name: data.navLabel, path: "/harvest" }
        ]}
      />

      <div className="page-topline">
        <Link href={localeHref(locale, "/")}>{t.nav.home}</Link>
        <span>/</span>
        <span>{data.navLabel}</span>
      </div>

      <header className="harvest-hero" data-reveal="stagger">
        <div className="harvest-hero-text">
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p className="harvest-intro">{data.subtitle}</p>

          <aside className="harvest-disclaimer" data-nosnippet>
            <span className="harvest-badge">{data.disclaimerBadge}</span>
            <p>{data.disclaimerText}</p>
          </aside>
        </div>
        <div className="harvest-hero-media" data-reveal="image">
          <Image
            src="/images/harvest/harvest-field-dawn.jpg"
            alt={data.stages[0].alt}
            width={1280}
            height={720}
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span className="harvest-hero-caption">
            ROFRAN · {data.stages[0].tag}
          </span>
        </div>
      </header>

      <section className="harvest-timeline" aria-labelledby="stages-heading">
        <div className="section-heading harvest-section-heading">
          <div>
            <p className="eyebrow">ROFRAN · MASHTAGA</p>
            <h2 id="stages-heading">{data.stagesTitle}</h2>
            <p className="harvest-section-desc">{data.stagesSubtitle}</p>
          </div>
        </div>

        <div className="harvest-steps">
          {data.stages.map((stage, idx) => (
            <article
              key={stage.step}
              className={`harvest-step ${idx % 2 === 1 ? "harvest-step-reverse" : ""}`}
            >
              <div className="harvest-step-media" data-reveal="image">
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  width={1200}
                  height={900}
                  loading={idx === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 760px) 100vw, 45vw"
                />
                <span className="harvest-step-badge">{stage.badge}</span>
              </div>
              <div className="harvest-step-copy" data-reveal="stagger">
                <span className="resource-number">{stage.step}</span>
                <p className="eyebrow">{stage.tag}</p>
                <h3>{stage.title}</h3>
                <p className="harvest-step-text">{stage.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="harvest-gallery" aria-labelledby="gallery-heading">
        <div className="section-heading harvest-section-heading">
          <div>
            <p className="eyebrow">ROFRAN · CROCUS SATIVUS</p>
            <h2 id="gallery-heading">{data.galleryTitle}</h2>
            <p className="harvest-section-desc">{data.gallerySubtitle}</p>
          </div>
        </div>

        <div className="harvest-gallery-grid">
          {data.galleryItems.map((item, i) => (
            <figure key={i} className="harvest-gallery-card" data-reveal="up">
              <div className="harvest-gallery-imgwrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
              </div>
              <figcaption className="harvest-gallery-caption">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="harvest-cta">
        <div className="harvest-cta-inner">
          <p className="eyebrow">ROFRAN · MASHTAGA ORIGIN</p>
          <h2>{data.productButton}</h2>
          <div className="harvest-cta-actions">
            <Link className="button button-gold" href={localeHref(locale, "/saffron")}>
              {data.productButton} <LinkArrow />
            </Link>
            <Link className="text-link" href={localeHref(locale, "/quality")}>
              {data.qualityButton} <LinkArrow />
            </Link>
          </div>
        </div>
      </section>

      <ResourceLinks locale={locale} />
    </main>
  );
}
