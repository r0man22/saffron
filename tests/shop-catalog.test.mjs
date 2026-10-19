import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { shopFamilies, shopVariants, shopSettings, validWeight, selectionPrice, parseSelections, selectionKey } from '../lib/shop-catalog.mjs';
import { shopNumber } from '../lib/shop-number.mjs';
const copy = JSON.parse(readFileSync(new URL('../lib/locales/shop.json', import.meta.url), 'utf8'));
const item = (variantId, grams, quantity = 1) => ({ variantId, grams, quantity });

test('packaging boundaries support both 25 g choices and leave 51–99 g to a custom request', () => {
  assert.equal(shopFamilies.length, 4);
  assert.equal(shopVariants.length, 7);
  for (const [id, weights] of [['everyday', [1, 2, 3, 4]], ['bloom', [5, 10, 25]], ['keepsake', [25, 37, 50]], ['ritual', [100, 175, 1000]]]) {
    for (const grams of weights) assert.equal(validWeight(id, grams), true, `${id}: ${grams}`);
  }
  for (const family of shopFamilies) {
    for (const grams of [0, -1, 1.5, NaN, Infinity, '25', 51, 99]) assert.equal(validWeight(family.id, grams), false, `${family.id}: ${grams}`);
    assert.ok(validWeight(family.id, family.defaultGrams));
    family.presets.forEach(grams => assert.ok(validWeight(family.id, grams)));
  }
  assert.equal(validWeight('everyday', 5), false);
  assert.equal(validWeight('bloom', 26), false);
  assert.equal(validWeight('keepsake', 24), false);
  assert.equal(validWeight('missing', 1), false);
});

test('the owner-confirmed price is 10 AZN per gram for every variant', () => {
  assert.equal(shopSettings.currency, 'AZN');
  assert.equal(shopSettings.pricePerGram, 10);
  assert.equal(selectionPrice(1), 10);
  assert.equal(selectionPrice(25), 250);
  assert.equal(selectionPrice(100), 1000);
  assert.equal(selectionPrice(37, 3), 1110);
  for (const grams of [0, -1, 1.5, '10', Infinity, Number.MAX_SAFE_INTEGER]) assert.equal(selectionPrice(grams), 0);
  assert.equal(selectionPrice(25, -1), 0);
});

test('stored bag data is validated, duplicate selections merge, and stored prices are ignored', () => {
  for (const raw of ['broken', '{}', 'null', 'true']) assert.deepEqual(parseSelections(raw), []);
  const stored = [null, item('unknown', 5), item('everyday', 5), item('bloom', 5.5), item('silk', 99), item('bloom', 10, -1), item('bloom', 10, '2'), { ...item('necklace', 25, 2), price: 1 }, item('necklace', 25, 1), item('bracelet', 25, 1), item('necklace', 50, 1)];
  assert.deepEqual(parseSelections(JSON.stringify(stored)), [item('necklace', 25, 3), item('bracelet', 25), item('necklace', 50)]);
  assert.notEqual(selectionKey(item('necklace', 25)), selectionKey(item('necklace', 50)));
  assert.equal(parseSelections(JSON.stringify([item('bloom', 10, 100)]))[0].quantity, 20);
  assert.deepEqual(parseSelections(JSON.stringify([item('bloom', 10, 10), item('silk', 100, 10)]), 12), [item('bloom', 10, 10), item('silk', 100, 2)]);
  assert.deepEqual(parseSelections(JSON.stringify([item('bloom', 10)]), 0), []);
});

test('all 21 locales have a full catalogue and each variant has a local product photograph', () => {
  assert.equal(Object.keys(copy).length, 21);
  const keys = Object.keys(copy.en).sort();
  for (const [locale, data] of Object.entries(copy)) {
    assert.deepEqual(Object.keys(data).sort(), keys, locale);
    assert.equal(data.families.length, 4, locale);
    assert.equal(data.descriptions.length, 4, locale);
    assert.equal(data.variants.length, 7, locale);
    assert.equal(data.contents.length, 7, locale);
    assert.equal(data.title.split('|').length, 2, locale);
    assert.ok(data.guidePrice.includes('{price}'), locale);
    for (const value of Object.values(data).flat()) assert.ok(typeof value === 'string' && value.trim(), locale);
  }
  assert.equal(new Set(shopVariants.map(variant => variant.image)).size, 7);
  for (const variant of shopVariants) assert.ok(existsSync(new URL('../public' + variant.image, import.meta.url)), variant.id);
});

// Browser and Node ICU versions disagree on Azerbaijani thousands separators.
test('number text is deterministic across runtimes and Arabic digits remain localized', () => {
  assert.equal(shopNumber('az', 1000), '1\u202f000');
  assert.equal(shopNumber('ru', 2500), '2\u202f500');
  assert.equal(shopNumber('en', 1000000), '1\u202f000\u202f000');
  assert.equal(shopNumber('ar', 1000), '١\u202f٠٠٠');
});
