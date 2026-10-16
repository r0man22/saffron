import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
const read = name => JSON.parse(readFileSync(new URL(`../${name}`, import.meta.url), 'utf8'));
const regional = ['tr', 'kk', 'uz', 'ky', 'tg'];
const keys = (object, prefix = '') => Object.entries(object).flatMap(([key, value]) => {
  const path = `${prefix}.${key}`;
  return value !== null && typeof value === 'object' ? keys(value, path) : [path];
}).sort();
test('each regional language contains a complete interface, seven guides and thirteen FAQs', () => {
  const reference = keys(read('lib/locales/en.json'));
  for (const locale of regional) {
    assert.deepEqual(keys(read(`lib/locales/${locale}.json`)), reference, locale);
    const c = read(`lib/locales/${locale}-content.json`);
    assert.equal(c.articles.length, 7, locale);
    assert.equal(new Set(c.articles.map(a => a.slug)).size, 7, locale);
    assert.equal(c.faqs.length, 13, locale);
    assert.equal(new Set(c.faqs.map(q => q.question)).size, 13, locale);
    assert.equal(Object.keys(c.resources).length, 6, locale);
    for (const q of c.faqs) assert.ok(['saffron', 'kitchen', 'buying'].includes(q.category));
    for (const a of c.articles) {
      assert.ok(a.title && a.description && a.lead && a.imageAlt, `${locale}/${a.slug}`);
      assert.equal(a.sections.length, 3);
      assert.ok(a.sections.every(s => s.title && s.id && s.text.length >= 80));
      assert.ok(a.sources.every(s => new URL(s.url).protocol === 'https:'));
    }
    for (const slug of ['contact', 'shipping', 'wholesale', 'privacy']) assert.equal(c.resources[slug].draft, true);
  }
});
test('product configuration keeps order minimum, packaging and markets explicit', () => {
  const p = read('content/product.json');
  assert.ok(Number.isFinite(p.minimumOrderGrams) && p.minimumOrderGrams > 0);
  assert.ok(p.netWeightGrams === null || p.netWeightGrams > 0);
  assert.ok(p.price === null || p.price >= 0);
  assert.equal(typeof p.originConfirmed, 'boolean');
  assert.equal(typeof p.salesEnabled, 'boolean');
  assert.ok(Array.isArray(p.shippingCountries));
  for (const locale of ['en','az','ru',...regional]) {
    assert.ok(p.originLabels[locale]);
    const ui = read(`lib/locales/${locale}.json`);
    assert.ok(ui.meta.saffronTitle.includes('{minimum}'));
    assert.ok(ui.meta.saffronDescription.includes('{minimum}'));
  }
  const markets = read('content/markets.json');
  for (const country of ['AZ','TR','KZ','UZ','KG','TJ']) assert.ok(markets.some(m => m.country === country));
});
