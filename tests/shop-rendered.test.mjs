import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const copy = JSON.parse(readFileSync(new URL('../lib/locales/shop.json', import.meta.url), 'utf8'));
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const canonical = process.env.TEST_CANONICAL_URL || base;
const href = locale => locale === 'en' ? '/shop' : `/${locale}/shop`;
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));

test('the seven-product Shop renders in every language with canonical URLs and catalogue schema', async () => {
  for (const [locale, labels] of Object.entries(copy)) {
    const path = href(locale);
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), path);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path);
    assert.ok(html.includes(`rel="canonical" href="${canonical}${path}"`), path);
    assert.match(html, /class="shop-main"/, path);
    assert.equal((html.match(/class="shop-product-card"/g) || []).length, 7, path);
    assert.ok(html.includes(labels.nav), path);
    for (const language of Object.keys(copy)) assert.match(html, new RegExp(`hrefLang="${language}"`, 'i'), path);
    const schema = jsonLd(html).find(node => node['@type'] === 'CollectionPage');
    assert.equal(schema?.inLanguage, locale, path);
    assert.equal(schema.mainEntity.numberOfItems, 7, path);
    assert.deepEqual(schema.mainEntity.itemListElement.map(entry => entry.position), [1,2,3,4,5,6,7]);
    for (const { item } of schema.mainEntity.itemListElement) {
      assert.equal(item['@type'], 'Product');
      assert.equal(item.brand.name, 'ROFRAN');
      assert.ok(item.url.startsWith(canonical + path + '#'));
      assert.ok(item.image.startsWith(canonical + '/media/shop/'));
      assert.equal(item.offers, undefined, 'Checkout remains disabled');
      assert.equal(item.aggregateRating, undefined);
      assert.equal(item.review, undefined);
    }
    assert.doesNotMatch(html.match(/<main[\s\S]*?<\/main>/)?.[0] || '', /\/media\/(?:frame|scene|valley)/, path);
    assert.doesNotMatch(html.match(/<main[\s\S]*?<\/main>/)?.[0] || "", /\{price\}|\{grams\}/, path);
    if (locale === 'ar') assert.match(html, /dir="rtl"/);
  }
});
