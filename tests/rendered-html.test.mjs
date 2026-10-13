import assert from 'node:assert/strict';
import test from 'node:test';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const routes = ['/', '/saffron', '/journal', '/journal/what-is-saffron', '/journal/how-to-use-saffron', '/journal/how-to-store-saffron'];

test('all public pages render crawlable English content and self-referencing canonicals', async () => {
  for (const path of routes) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<html[^>]+lang="en"/);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one main heading`);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical, `${path}: canonical exists`);
    assert.equal(new URL(canonical[1]).pathname, path);
    assert.doesNotMatch(html, /Your site is taking shape|Lab tested|Worldwide shipping|Pure Azerbaijani/);
    if (path.startsWith('/journal/')) {
      assert.match(html, /application\/ld\+json/);
      assert.match(html, /FURTHER READING/);
      assert.match(html, /IN THIS STORY/);
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
  for (const path of ['/media/valley.webp', '/media/product.webp', '/fonts/fonts.css', '/favicon.svg']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    await response.arrayBuffer();
  }
});

test('discovery files list the real content routes and unknown articles return 404', async () => {
  const response = await fetch(base + '/sitemap.xml');
  assert.equal(response.status, 200);
  const xml = await response.text();
  for (const path of routes) assert.ok(xml.includes(base + path), path);
  const robots = await fetch(base + '/robots.txt');
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:/);
  const missing = await fetch(base + '/journal/does-not-exist');
  assert.equal(missing.status, 404);
});
