# ROFRAN SEO: initial version

## What is ready

The public content is translated into English, Azerbaijani and Russian. There are 51 content URLs: a home, product, journal index, seven articles, FAQ and six resource pages in each language. The sitemap contains 39 editorial URLs. Contact, shipping, wholesale and privacy remain `noindex, follow` drafts and are deliberately excluded from the sitemap.

The preview is globally `noindex` until `SITE_INDEXABLE=true` is set on the production deployment. This is a launch gate, not a ranking optimisation. Buying either domain does not automatically publish or index this repository.

Metadata includes page-specific descriptions, self-referencing canonicals, en/az/ru/x-default alternates, social cards and document language. JSON-LD includes Organization, WebSite, Product (without invented offers/reviews), Article and breadcrumbs. FAQ is visible server-rendered content; no discontinued Google FAQ rich-result feature is promised.

English URLs remain unchanged. Azerbaijani and Russian remain under `/az` and `/ru`. All implemented languages are statically generated in production. Responsive Next Image delivery is used for editorial and product photographs; the cinematic homepage remains available.

## Free keyword research

See `docs/keyword-research.csv`. Ahrefs Free Keyword Generator was inspected in the browser on 2026-10-14 with seed `saffron`, country United States, Phrase match and Questions reports. The free interface reports volume buckets and, for some terms, difficulty categories. Buckets are not exact volumes. No paid endpoint was called. No Azerbaijan, Russia or other-country metrics are claimed.

The content map is an initial editorial hypothesis. Azerbaijani and Russian equivalents are translations, not independently measured demand. Next research: use the free tool for the relevant markets when supported, compare search intent in local results, then update the content map. Avoid unrelated celebrity/perfume terms and medical/supplement queries for this culinary product.

Update, 2026-10-15: Azerbaijan (`zəfəran`) and Russian Federation (`шафран`) were checked directly in the free generator. See `keyword-research-az-ru.csv` for observed buckets and intent filtering. This is a country sample, not all Russian-speaking markets. The original use guide was substantively revised, with a per-article modification date.

## Owner edits

- `lib/business.ts`: real business identity, email, phone, product origin, weights, price, certificates and social profiles. Empty values are omitted from the public facts and structured data.
- `lib/page-content.ts`: localized about, quality, delivery, contact, wholesale and privacy copy. Review the operational descriptions and remove each page's `draft` flag only when its information is complete.
- `lib/faq.ts`: localized questions and answers. Ordering and delivery answers must be changed when the service changes.
- `lib/editorial.ts`: four new articles in each language. `lib/journal.ts` and `lib/locales/*-articles.json` contain the original three. Update dates only after meaningful revisions.
- `lib/locales/{en,az,ru}.json`: interface and product metadata.

Adding business facts does not itself activate checkout, shipping or returns. The current cart is a presentation cart and its checkout stays disabled. Implement and validate a purchase flow before publishing offers, availability, payment or delivery promises. Product markup without offers is descriptive; it does not meet every Google merchant rich-result requirement.

Replace presentation photographs with genuine product photographs before making production/origin claims. Never invent a laboratory report, organic certification, review, address or product provenance. Have the owner and native-language editors review the content before launch. Do not promise that AI detectors will classify text a particular way.

## Languages

`lib/international.ts` registers 20 possible languages. `publishedLocales` currently exposes only the complete en/az/ru versions. The other 17 are not translated, linked, indexed or presented as ready. To add a language: complete the UI dictionary, original and new articles, FAQ and resource copy; update locale validators and names, font coverage and RTL handling where needed; then extend `publishedLocales`. Type checks should expose missing typed translations. Check every URL, hreflang reciprocity, language switching, mobile layout and 404 handling. Add a real service/delivery policy for each market rather than implying service from a translation.

## Launch checklist

1. Confirm the primary owned domain. Set `NEXT_PUBLIC_SITE_URL` and rebuild. Production defaults to `https://rofran.com` without a configured value; this is a proposed URL, not a statement that the domain is owned.
2. At the host/CDN, configure HTTPS, one preferred hostname and path-preserving 301 redirects from rofran.az to the corresponding `/az` paths, plus www/non-www aliases. These redirects have not been installed by this local implementation.
3. Complete the company, product, shipping, payment, return and privacy information. Add terms of sale appropriate to the actual business before taking orders.
4. Verify URL inspection and Rich Results Test against the live domain. Add Product offers only when actual purchasing is possible and prices/inventory are synchronised.
5. Enable `SITE_INDEXABLE=true` only on production and rebuild. Confirm the home and editorial pages no longer contain noindex; drafts must remain noindex.

Indexing now also requires an explicitly configured public HTTPS origin. Paths, credentials, query strings and fragments are rejected in `NEXT_PUBLIC_SITE_URL`. Development and Vercel preview deployments remain noindex. Removing a resource page's draft flag automatically includes it in the sitemap; complete its copy first.
6. Verify both domains in Google Search Console, submit the canonical sitemap and inspect representative pages in every language. No Search Console account has been configured here.
7. Measure real mobile Core Web Vitals and conversion events. No analytics tracker, cookie banner or external data collection has been installed. Check privacy requirements before adding them.
8. Obtain legitimate reviews and relevant editorial mentions after real sales. Avoid bought ranking links and fabricated testimonials.

## Validation

`npm run lint`, `npm run typecheck`, `npm run build`, then `npm run start` and the rendered-HTML tests. For a production preview served on localhost with production canonicals, set `TEST_CANONICAL_URL=https://rofran.com` when running tests. For a custom build domain, use that domain instead.

Turbopack in this local Windows environment failed to connect to its CSS worker process (exit code 0); the supported Webpack build completed. The build script uses Webpack for a reproducible production build. Development still uses the existing Next dev command. There is no measured PageSpeed score or claim that rankings are achieved. A live-domain field performance check is still required.
