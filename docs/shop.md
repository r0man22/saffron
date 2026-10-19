# ROFRAN Shop

The separate `/shop` route (and `/{locale}/shop` in the other 20 languages) presents seven sets on white backgrounds. The existing `/saffron` page and cinematic homepage are retained.

## Owner-confirmed pricing and ranges

`content/shop.json` is the source of truth for the new collection. Every set costs **10 AZN per gram**. Packaging/gifts do not have a separate surcharge in this initial version. Change `pricePerGram` there to update displayed prices and saved-bag calculations together.

- Everyday: 1–4 g, pouch and carton.
- Bloom: 5–25 g, jar and flower-opening box.
- Keepsake: 25–50 g, chest with necklace, bracelet or brooch.
- Ritual: 100 g and above, pouch with kitchen pieces or silk shawl.

25 g deliberately belongs to Bloom and Keepsake. 51–99 g is a custom enquiry rather than an invented packaging option. All selections use whole grams; the displayed amount is the saffron weight, excluding packaging and gifts. Bulk photos illustrate the packaging style; exact dimensions/final packing need confirmation for the selected weight.

`lib/locales/shop.json` contains all collection copy in the 21 published site languages. Arrays follow the family/variant order in `content/shop.json`. Keep their order aligned when editing.

## Bag and order enquiries

New selections persist under `rofran-shop-bag-v1` in localStorage, grouped by variant and weight. Quantities and line/subtotals use the current price, never a stored client price. The existing product bag is preserved separately; the combined bag holds at most 20 sets. The collection subtotal only covers the new Shop selections.

This is still a frontend preview: no payment, inventory reservation or order submission is enabled. The enquiry button opens the customer's email app with the chosen sets and prices addressed to the confirmed ROFRAN contact. Existing sales/stock settings remain unchanged.

## Photography and SEO

Seven square GPT Image product photographs live in `public/media/shop/` as responsive WebP sources. `docs/shop-image-prompts.json` records the generation prompts and references. No video stills are used in Shop.

Each locale has its own server-rendered heading, metadata, canonical, hreflang links and CollectionPage/ItemList schema with seven products. No fake offers, stock, reviews or certificates are added. Shop is included in the sitemap; the site's existing preview noindex policy remains in force.

## Verification

`tests/shop-catalog.test.mjs` verifies ranges, 25 g overlap, 51–99 g gap, owner pricing, untrusted bag data, capacity, locales and image assets. `tests/shop-rendered.test.mjs` checks the server-rendered routes and schema in every language. Run rendered tests with `TEST_BASE_URL` and `TEST_CANONICAL_URL` matching the local server/build.
