import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const productSettings = JSON.parse(readFileSync(new URL('../content/product.json', import.meta.url), 'utf8'));

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const canonicalBase = process.env.TEST_CANONICAL_URL || base;
const locales = ['en', 'az', 'ru', 'tr', 'kk', 'uz', 'ky', 'tg', 'de', 'fr', 'es', 'it', 'nl', 'pl', 'pt', 'uk', 'ka', 'ar', 'ja', 'ko', 'zh'];
const href = (locale, path) => locale === 'en' ? path : `/${locale}${path}`;
const contentPaths = ['/about', '/quality', '/faq', '/journal/what-does-saffron-taste-like', '/journal/why-is-saffron-expensive', '/journal/how-to-buy-saffron', '/journal/saffron-threads-vs-powder'];
const draftPaths = ['/contact', '/shipping', '/wholesale', '/privacy'];
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));

test('every new localized page has its own metadata, content and valid structured data', async () => {
  for (const locale of locales) for (const path of [...contentPaths, ...draftPaths]) {
    const url = href(locale, path);
    const response = await fetch(base + url);
    assert.equal(response.status, 200, url);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), url);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, url);
    assert.ok(html.includes(`rel="canonical" href="${canonicalBase}${url}"`), url);
    const schemas = jsonLd(html);
    assert.ok(schemas.some(item => item['@type'] === 'BreadcrumbList'), url);
    assert.ok(schemas.some(item => item['@graph']?.some(node => node['@type'] === 'Organization')), url);
    for (const language of locales) assert.match(html, new RegExp(`hrefLang="${language}"`, 'i'), url);
    if (draftPaths.includes(path)) assert.match(html, /name="robots" content="noindex, follow"/, url);
    if (path === '/faq') {
      assert.equal((html.match(/<summary(?:\s|>)/g) || []).length, 14, `${url}: 13 questions plus language picker`);
      assert.match(html, /type="search"/);
      assert.ok(!schemas.some(item => item['@type'] === 'FAQPage'), 'No discontinued FAQ rich-result markup');
    }
    if (path.startsWith('/journal/')) {
      const article = schemas.find(item => item['@type'] === 'Article');
      assert.equal(article?.inLanguage, locale, url);
      assert.ok(article?.dateModified, url);
      assert.ok(article?.author?.url.endsWith(href(locale, '/about')), url);
      assert.ok(article?.publisher?.['@id'], url);
    }
    for (const [, target] of html.match(/<main[\s\S]*?<\/main>/)?.[0]?.matchAll(/href="(\/[^"#?]*)"/g) || []) {
      if (locale !== 'en') assert.ok(target === `/${locale}` || target.startsWith(`/${locale}/`), `${url}: locale link ${target}`);
    }
  }
});

test('the sitemap contains all published content, not operational drafts or untranslated locales', async () => {
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  assert.equal((xml.match(/<loc>/g) || []).length, 273);
  for (const locale of locales) for (const path of contentPaths) assert.ok(xml.includes(canonicalBase + href(locale, path)), path);
  for (const locale of locales) for (const path of draftPaths) assert.ok(!xml.includes(`<loc>${canonicalBase + href(locale, path)}</loc>`), path);
  assert.doesNotMatch(xml, /<loc>[^<]*\/(?:fa|hi|id)(?:\/|<)/);
  const priceArticle = xml.match(/<url>[^]*?<loc>[^<]*\/journal\/why-is-saffron-expensive<\/loc>([^]*?)<\/url>/)?.[1];
  assert.ok(priceArticle?.includes('/media/flower.webp'));
  const flavourArticle = xml.match(/<loc>[^<]*\/journal\/what-does-saffron-taste-like<\/loc>([^]*?)<\/url>/)?.[1];
  assert.ok(flavourArticle?.includes('/media/threads.webp'), 'Sitemap uses the actual article photograph');
});

test('product data makes no invented sale, review or certification claims', async () => {
  for (const locale of locales) {
    const html = await (await fetch(base + href(locale, '/saffron'))).text();
    const product = jsonLd(html).find(item => item['@type'] === 'Product');
    assert.ok(product?.name);
    assert.equal(product.brand.name, 'ROFRAN');
    assert.equal(product.offers, undefined);
    assert.equal(product.aggregateRating, undefined);
    assert.equal(product.review, undefined);
    if (!productSettings.originConfirmed) assert.equal(product.countryOfOrigin, undefined, 'Provisional origin must not become a verified product claim');
    else assert.equal(product.countryOfOrigin.name, productSettings.originCountryCode);
    if (productSettings.netWeightGrams === null) assert.equal(product.weight, undefined, 'The minimum is not a packaging weight');
    else assert.equal(product.weight.value, productSettings.netWeightGrams);
    assert.match(html, /product-order-card/);
    assert.ok(html.match(/<meta name="description" content="([^"]+)"/)?.[1].includes(String(productSettings.minimumOrderGrams)));
    assert.doesNotMatch(html, /\{minimum\}|\{grams\}/);
    assert.equal(product.hasCertification, undefined);
    assert.match(html, /srcset=/i, 'Responsive optimized images');
  }
});
