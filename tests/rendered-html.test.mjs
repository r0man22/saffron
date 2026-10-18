import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const canonicalBase = process.env.TEST_CANONICAL_URL || base;
const originalRoutes = ['/', '/saffron', '/journal', '/journal/what-is-saffron', '/journal/how-to-use-saffron', '/journal/how-to-store-saffron'];
const locales = ['en', 'az', 'ru', 'tr', 'kk', 'uz', 'ky', 'tg', 'de', 'fr', 'es', 'it', 'nl', 'pl', 'pt', 'uk', 'ka', 'ar', 'ja', 'ko', 'zh'];
const routeFor = (locale, path) => locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
const routes = locales.flatMap(locale => originalRoutes.map(path => routeFor(locale, path)));
const minimum = JSON.parse(readFileSync(new URL('../content/product.json', import.meta.url), 'utf8')).minimumOrderGrams;
const dictionaries = Object.fromEntries(locales.map(locale => [locale, JSON.parse(readFileSync(new URL(`../lib/locales/${locale}.json`, import.meta.url), 'utf8').replaceAll('{minimum}', String(minimum)))]));


test('all 48 core pages render the correct language, localized content and canonical/hreflang links', async () => {
  for (const path of routes) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const locale = locales.find(l => l !== 'en' && (path === `/${l}` || path.startsWith(`/${l}/`))) || 'en';
    const t = dictionaries[locale];
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`));
    assert.ok(html.includes(t.nav.saffron), `${path}: localized navigation`);
    assert.ok(html.includes(t.actions.discoverSaffron) || html.includes(t.product.subtitle) || path.includes('/journal'), `${path}: localized main content`);
    for (const lang of [...locales, 'x-default']) assert.match(html, new RegExp(`hrefLang="${lang}"`, 'i'));
    if (path === routeFor(locale, '/')) assert.ok(html.includes(t.story.chapters[0].title[0]), `${path}: translated hero`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one main heading`);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical, `${path}: canonical exists`);
    assert.equal(new URL(canonical[1]).pathname, path);
    assert.doesNotMatch(html, /Your site is taking shape|Lab tested|Worldwide shipping|Pure Azerbaijani/);
    if (locale !== 'en') {
      const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] || '';
      for (const [, href] of main.matchAll(/href="(\/[^"#?]*)"/g)) assert.ok(href === `/${locale}` || href.startsWith(`/${locale}/`), `${path}: internal link keeps locale: ${href}`);
    }
    if (path.includes('/journal/')) {
      assert.match(html, /application\/ld\+json/);
      assert.ok(html.includes(t.journal.sources));
      assert.ok(html.includes(t.journal.toc));
      assert.match(html, new RegExp(`"inLanguage":"${locale}"`));
      if (locale === 'az' || locale === 'ru') {
        const translated = JSON.parse(readFileSync(new URL(`../lib/locales/${locale}-articles.json`, import.meta.url), 'utf8'))[path.split('/').at(-1)];
        assert.ok(html.includes(translated.lead), `${path}: translated article body`);
        for (const section of translated.sections) assert.ok(html.includes(section.text), `${path}: translated section ${section.title}`);
      }
    }
  }
});

test('movie files support byte ranges for seeking and local assets are served', async () => {
  for (const file of ['rofran-story.mp4', 'rofran-story-mobile.mp4', 'rofran-hero-idle.mp4', 'rofran-hero-idle-mobile.mp4', 'rofran-finale-idle.mp4', 'rofran-finale-idle-mobile.mp4']) {
    const response = await fetch(`${base}/media/${file}`, { headers: { Range: 'bytes=0-1023' } });
    assert.equal(response.status, 206, file);
    assert.match(response.headers.get('content-range'), /^bytes 0-1023\//);
    assert.equal((await response.arrayBuffer()).byteLength, 1024);
  }
  for (const path of ['/media/valley.webp', '/media/product.webp', '/fonts/fonts.css', '/fonts/noto-sans-400-central-asia.woff2', '/fonts/noto-sans-500-central-asia.woff2', '/fonts/noto-sans-600-central-asia.woff2', '/fonts/cormorant-garamond-400-latin-ext.woff2', '/fonts/manrope-500-latin-ext.woff2', '/favicon.svg']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    await response.arrayBuffer();
  }
});

test('discovery files list the real content routes and unknown articles return 404', async () => {
  const response = await fetch(base + '/sitemap.xml');
  assert.equal(response.status, 200);
  const xml = await response.text();
  for (const path of routes) assert.ok(xml.includes(canonicalBase + path), path);
  const robots = await fetch(base + '/robots.txt');
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:/);
  for (const path of [...locales.map(l => routeFor(l, '/journal/does-not-exist')), '/az/missing/page', '/ru/missing/page', '/fa']) {
    const missing = await fetch(base + path);
    assert.equal(missing.status, 404, path);
    if (locales.some(l => l !== 'en' && path.startsWith(`/${l}/`))) {
      const locale = path.slice(1, 3); const html = await missing.text();
      // Next renders a special error document for server-thrown notFound(),
      // then restores the locale root in the browser. Check HTTP status,
      // localized copy and noindex here; the live document lang is checked in UI QA.
      assert.match(html, /<meta name="robots" content="noindex"/);
      assert.ok(html.includes(dictionaries[locale].notFound.description));
    }
  }
});
