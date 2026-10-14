import assert from 'node:assert/strict';
import test from 'node:test';
import { siteSettings } from '../lib/site-settings.mjs';

test('indexing cannot be enabled without a confirmed canonical domain', () => {
  assert.throws(() => siteSettings({ NODE_ENV: 'production', SITE_INDEXABLE: 'true' }), /confirmed production domain/);
});
test('invalid canonical configuration is rejected rather than creating broken SEO links', () => {
  for (const value of ['rofran.com', 'https://rofran.com/az', 'https://rofran.com/?lang=az', 'https://user:password@rofran.com', 'ftp://rofran.com', 'https://rofran.com/#top']) {
    assert.throws(() => siteSettings({ NEXT_PUBLIC_SITE_URL: value }), /NEXT_PUBLIC_SITE_URL/);
  }
});
test('local and insecure origins cannot be indexed', () => {
  for (const value of ['http://rofran.com', 'https://localhost', 'https://127.0.0.1:3000', 'https://[::1]']) {
    assert.throws(() => siteSettings({ NEXT_PUBLIC_SITE_URL: value, SITE_INDEXABLE: 'true', NODE_ENV: 'production' }), /public HTTPS/);
  }
});
test('development, staging previews and an unapproved production build stay noindex', () => {
  for (const env of [
    { NODE_ENV: 'development', SITE_INDEXABLE: 'true' },
    { NODE_ENV: 'production', VERCEL_ENV: 'preview', SITE_INDEXABLE: 'true' },
    { NODE_ENV: 'production', SITE_INDEXABLE: 'false' },
  ]) assert.equal(siteSettings({ NEXT_PUBLIC_SITE_URL: 'https://rofran.com', ...env }).indexable, false);
});
test('an approved production build uses a normalized HTTPS canonical origin', () => {
  assert.deepEqual(siteSettings({ NEXT_PUBLIC_SITE_URL: ' https://rofran.com/ ', SITE_INDEXABLE: 'true', NODE_ENV: 'production' }), { url: 'https://rofran.com', indexable: true });
});
