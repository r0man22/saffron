# Mətnləri və məhsul məlumatını necə dəyişmək olar?

## Ən çox dəyişəcək fayl

`content/product.json` məhsulun əsas məlumatıdır. Faylı redaktə edərkən JSON qaydasını qoruyun: mətn dırnaq içində, rəqəm dırnaqsız, bilinməyən qiymət `null`.

| Sahə | Nə deməkdir? |
|---|---|
| `minimumOrderGrams` | Minimum ümumi sifariş miqdarı. Hazırda 5. `{minimum}` olan mətnlər buradan doldurulur. |
| `netWeightGrams` | Satış vahidinin həqiqi xalis çəkisi. Minimum sifarişlə eyni olmaq məcburiyyətində deyil. |
| `price`, `currency` | Təsdiqlənmiş satış vahidinin qiyməti və valyutası. 1 qram qiymətini səhvən bütün məhsul qiyməti kimi yazmayın. |
| `originLabels` | Mənşənin 8 dildə göstərilən adı. Hazırda Azərbaycan/Abşeron müvəqqəti nümunədir. |
| `originCountryCode`, `originRegion` | Yetişdirilmə ölkəsinin kodu və bölgə. Qablaşdırma ünvanı deyil. |
| `originConfirmed` | Həqiqi mənşəni yoxladıqdan sonra `true`. Əks halda nümunə development səhifəsində işarəli görünür, production/schema-ya getmir. |
| `harvest` | Faktiki məhsulun yığım məlumatı; bilinmirsə boş qalır. |
| `shippingCountries` | Yalnız həqiqətən xidmət göstərilən ölkələr. Bu siyahı öz-özünə çatdırılma xidməti yaratmır. |
| `salesEnabled` | İşlək sifariş sistemi hazır olmadan açılmamalıdır. Bayrağın dəyişməsi checkout qurmur; hazırda yalnız təqdimat səbəti var. |

`content/markets.json` bazar planıdır: ölkə, dil, prioritet və çatdırılmanın təsdiq vəziyyəti. Bu fayl planlama üçündür; təkcə ora ölkə əlavə etmək yeni dil və xidmət açmır.

## Hansı mətni haradan dəyişmək olar?

| Dəyişiklik | Fayl |
|---|---|
| Başlıq, düymə, menyu, video üzərindəki yazılar, SEO title/description | `lib/locales/en.json`, `az.json`, `ru.json`, `tr.json`, `kk.json`, `uz.json`, `ky.json`, `tg.json` |
| Məhsuldakı minimum sifariş və etiket sözləri | `lib/locales/commerce.json` |
| EN/AZ/RU FAQ | `lib/faq.ts` |
| EN/AZ/RU şirkət, keyfiyyət, əlaqə, çatdırılma və məxfilik | `lib/page-content.ts` |
| İlk 3 ingilis məqaləsi | `lib/journal.ts` |
| İlk 3 məqalənin AZ/RU tərcüməsi | `lib/locales/az-articles.json`, `ru-articles.json` |
| Sonrakı 4 EN/AZ/RU məqaləsi | `lib/editorial.ts` |
| TR/KK/UZ/KY/TG məqalə, FAQ və məlumat səhifələri | `lib/locales/<dil>-content.json` |
| Şirkətin real hüquqi adı, əlaqəsi, sertifikatları, profilləri | `lib/business.ts` |
| Açar sözün hansı səhifəyə aid olduğu | `docs/seo-keyword-map.csv` — cədvəl proqramında açıla bilər |

Yeni regional dillərin content faylında `articles` məqalələr, `faqs` suallar, `resources` məlumat səhifələridir. Məhsul etiketləri yalnız ayrıca `commerce.json` faylındadır.

`draft: true` olan məlumat səhifəsi noindex qalır və sitemap-a düşmür. Məzmun həqiqətən hazır olanda bu işarəni çıxarın. Başlığı dəyişmək üçün URL-ni dəyişmək lazım deyil.

## Məqalə əlavə edərkən

1. Əvvəl açar söz xəritəsində mövzuya artıq cavab verən səhifə olub-olmadığını yoxlayın.
2. Ayrı məqsədi varsa sabit `slug`, başlıq, təsvir, giriş, mətn bölmələri, şəkil/alt mətn və uyğun mənbələri hazırlayın.
3. Hazırkı sistem bütün aktiv dillərdə eyni məqalə URL-lərini gözləyir. Bütün 8 dil versiyasını hazırlayın; yalnız bir dildə yayım lazımdırsa əvvəl `availableLocales(path)` və sitemap/language switcher qaydasını uyğunlaşdırmaq lazımdır.
4. Müəllif adı, mənbə və yenilənmə tarixini real vəziyyətə uyğun yazın. Bütün tarixləri avtomatik bu günə dəyişməyin.
5. Mövzuyla əlaqəli məqalədən və uyğun məhsul səhifəsindən keçid verin. Məhsul haqqında yazıda məhsul linki təbii və faydalı yerdə olmalıdır.

## Yoxlama

`npm run typecheck`, `npm run lint`, `npm run build`. Sonra production serveri açıb `TEST_BASE_URL=http://127.0.0.1:3002 TEST_CANONICAL_URL=https://rofran.com npm test` işlədilə bilər; port və canonical faktiki konfiqurasiyaya uyğun olmalıdır.

Brauzerdə masaüstü və mobil görünüş, dil dəyişməsi, FAQ axtarışı, səbət, məhsul yazıları və linklərə baxın. Səhifənin mətni ilə title, description və Product JSON-LD məlumatı zidd olmamalıdır. Tərcümənin təbii olması ayrıca redaksiya yoxlaması tələb edir.

## Yayıma keçəndə

`.env.example` izahına uyğun əsas sahib olduğunuz domeni təyin edin. `SITE_INDEXABLE=false` yerli/preview baxışı üçün qalır. Yalnız production hazır olduqda `true` edilir və yeni build/deploy hazırlanır. Bu dəyişiklik Google-da avtomatik ilk sıraya çıxarmır; canlı saytın yoxlanması və Search Console müşahidəsi ayrıca mərhələdir.
