# ROFRAN — pull-dan sonra görülən işlər və növbəti plan

Son yenilənmə: **15 oktyabr 2026**

## Başlanğıc vəziyyət

14 oktyabr 2026-da `origin/main` dəyişiklikləri lokal `main` branch-inə fast-forward pull edilib. Başlanğıc commit: **`b00f740` — Add Azerbaijani and Russian site translations**. Pull zamanı konflikt olmayıb, iş qovluğu təmiz olub.

Pull ilə gələn Azərbaycan və rus tərcümələri, mövcud ingilis versiyası, üç ilkin bloq, əsas canonical/hreflang və sitemap quruluşu bu işdən əvvəl mövcud idi. Aşağıda bunlardan sonra əlavə edilən və təkmilləşdirilən işlər qeyd olunur.

## 1. Araşdırma və SEO istiqaməti

- Mövcud səhifələr, məhsul təqdimatı, dillər, metadata və texniki quruluş araşdırılıb.
- Google-un beynəlxalq sayt, faydalı məzmun, AI məzmunu, strukturlaşdırılmış məlumat və sürət sənədləri yoxlanılıb.
- Ahrefs Free Keyword Generator ilə ABŞ-da `saffron`, Azərbaycanda `zəfəran`, Rusiyada `шафран` sorğuları araşdırılıb.
- Görünən açar sözlər, həcm aralıqları, mövzu seçimi və əlaqəsiz niyyətlər CSV fayllarında qeyd edilib.
- Aptek, xəstəxana, şəxs, başqa biznes və tibbi müalicə niyyətli sorğular kulinariya məhsulu üçün hədəfdən ayrılıb.
- Ödənişli Ahrefs/Monid API çağırışı və abunəlik istifadə edilməyib.

Həcm aralıqları Ahrefs-in təxmini göstəriciləridir; dəqiq aylıq həcm deyil. Rusiya nümunəsi bütün rusdilli auditoriyanı təmsil etmir. Mövzunun seçilməsi rəqabətin sıfır olduğunu və ya yüksək satış gətirəcəyini sübut etmir.

Araşdırma qeydləri:

- [ABŞ açar sözləri](keyword-research.csv)
- [Azərbaycan və Rusiya açar sözləri](keyword-research-az-ru.csv)

## 2. Bloq / Bələdçi

Saytda **Bələdçi** adı ilə göstərilən bölmə bloqdur. Hər məqalə AZ, EN və RU dillərində mövcuddur.

| Azərbaycan başlığı | Pull-dan sonrakı iş |
| --- | --- |
| Zəfəran nədir? | Mövcud yazı saxlanılıb; ümumi məqalə şablonunun SEO təkmilləşdirmələrindən istifadə edir |
| Zəfəran necə dəmlənir və yeməklərdə necə istifadə olunur? | Mövcud istifadə yazısı üç dildə praktik izah, uyğun başlıq və mənbə ilə yenilənib; URL saxlanılıb |
| Zəfəran necə saxlanır? | Mövcud yazı saxlanılıb; ümumi məqalə şablonu təkmilləşdirilib |
| Zəfəranın dadı və ətri necədir? | Yeni yazı |
| Zəfəran niyə bahadır və qiyməti necə müqayisə etməli? | Yeni yazı |
| Zəfəran alarkən nəyə diqqət etmək lazımdır? | Yeni yazı |
| Tel zəfəran və üyüdülmüş zəfəran: hansını seçməli? | Yeni yazı |

Nəticə: **hər dildə 7 məqalə, üç dil üzrə 21 məqalə ünvanı**. Dörd yeni mövzu əlavə edilib; bütün yeddi yazı yeni yaradılmayıb.

Məqalə şablonuna redaksiya bağlantısı, uyğun tarix məlumatları, publisher məlumatı, breadcrumbs və məhsul/FAQ/keyfiyyət səhifələrinə daxili bağlantılar əlavə edilib. Əvvəlcədən mövcud məzmun naviqasiyası, mənbələr və əlaqəli yazılar saxlanılıb. Mənalı dəyişiklik edilən istifadə bələdçisinin yenilənmə tarixi ayrıca idarə olunur; bütün məqalələrin tarixi hər build zamanı dəyişdirilmir.

Məqsəd: axtarış edən insanın sualını cavablandırmaq, məhsul seçimini asanlaşdırmaq və uyğun ziyarətçini məhsul səhifəsinə yönləndirmək. Bütün mövzular üçün ayrıca yüksək axtarış həcmi təsdiqlənməyib. Saxlama və tel/toz müqayisəsi ilkin redaksiya mövzularıdır.

## 3. FAQ

Üç dildə ayrıca FAQ səhifəsi yaradılıb. Hər dildə **12 sual-cavab** var. Axtarış, mövzu filtrləri və açılıb-bağlanan cavablar işləyir. İlkin HTML bütün sual-cavabları ehtiva edir.

Azərbaycan başlıqları:

1. Zəfəran nədir?
2. Zəfəranın dadı necədir?
3. Zəfəran niyə bahadır?
4. Zəfəran və sarıkök eynidir?
5. Zəfəran necə dəmlənir?
6. Yeməyə nə qədər zəfəran əlavə edilməlidir?
7. Zəfəranı birbaşa düyüyə əlavə etmək olar?
8. Zəfəran necə saxlanmalıdır?
9. Tel zəfəran, yoxsa üyüdülmüş zəfəran seçilməlidir?
10. Su testi zəfəranın həqiqi olduğunu sübut edir?
11. ROFRAN zəfəranını onlayn sifariş etmək olar?
12. ROFRAN xaricə çatdırılma edir?

FAQ mövcud bloq, məhsul və çatdırılma səhifələrinə bağlanıb. Satış və çatdırılma cavabları xidmət açıldıqda yenilənməlidir. Google-un dayandırılmış FAQ rich-result görünüşü üçün schema əlavə edilməyib və belə görünüş vəd edilmir.

## 4. Yeni məlumat səhifələri

| Səhifə | URL yolu | Vəziyyət |
| --- | --- | --- |
| ROFRAN haqqında | `/about` | İlkin brend təqdimatı hazırdır |
| Keyfiyyət | `/quality` | Seçim, izlənə bilən məlumat və sənədlər barədə bələdçi hazırdır; real məhsul sənədləri gözlənilir |
| Əlaqə | `/contact` | Qaralama; real ictimai əlaqə məlumatları lazımdır |
| Çatdırılma və sifariş | `/shipping` | Qaralama; ölkələr, xərclər və şərtlər lazımdır |
| Restoranlar və mağazalar üçün | `/wholesale` | Qaralama; faktiki təchizat və topdansatış şərtləri lazımdır |
| Məxfilik və brauzer | `/privacy` | Cari brauzer yaddaşı təsvir edilib; tam hüquqi siyasət deyil |

Hər səhifənin Azərbaycan və rus versiyası müvafiq olaraq `/az` və `/ru` altında mövcuddur. Dörd qaralama səhifə `noindex, follow` olaraq qalır və sitemap-a daxil edilmir. Məlumatları tamamlanıb `draft` statusu götürülən səhifə avtomatik sitemap-a daxil olur.

## 5. Texniki SEO

- Mövcud canonical/hreflang və dil uyğunluğu yeni səhifələrə tətbiq edilib.
- Ana və məhsul səhifələrinin SEO başlıqları/təsvirləri yaxşılaşdırılıb; məhsulun əsas başlığı daha aydın edilib.
- Yeni səhifələr üçün ayrıca metadata və sosial paylaşım məlumatları hazırlanıb.
- Organization, WebSite, Product və BreadcrumbList strukturlaşdırılmış məlumatları əlavə edilib; Article məlumatı genişləndirilib.
- Məhsul schema-sında uydurma qiymət, stok, rəy, reytinq və sertifikat yoxdur. Tam merchant görünüşünə uyğunluq hələ hazır deyil.
- Sitemap **39 məzmun URL-ni** ehtiva edir; hər məqalənin öz şəkli istifadə edilir.
- `robots.txt` saxlanılıb və `/api/` yolları üçün tarama məhdudiyyəti əlavə edilib.
- Production canonical ünvanı sabitləşdirilib. `NEXT_PUBLIC_SITE_URL` formatı yoxlanılır.
- İndeksləmə yalnız açıq şəkildə təsdiqlənmiş, public HTTPS production domeni ilə aktivləşdirilə bilər. Development və Vercel preview mühitləri noindex qalır.
- Şirkət və məhsulun sahibdən gələcək faktları `lib/business.ts` faylında ayrıca saxlanılır.

**Hazırda bütün ilkin versiyada indeksləmə bağlıdır.** Sadəcə dörd qaralama səhifə deyil. Canlı yayımdan əvvəl production konfiqurasiyası tamamlanmalıdır.

## 6. Dizayn və optimizasiya

- Yeni FAQ və məlumat səhifələri üçün ROFRAN rənglərinə uyğun açıq fonlu giriş blokları, foto bölmələri və rahat oxunan məzmun düzülüşü yaradılıb.
- Mövcud ana və məhsul səhifələrinə məlumat səhifələrinə keçid kartları əlavə edilib.
- Naviqasiya və footer yeni səhifələrə uyğunlaşdırılıb.
- Məqalə və məhsul şəkillərində responsive Next Image istifadə edilib.
- AZ/EN/RU əsas səhifələri production build zamanı əvvəlcədən yaradılır.
- FAQ axtarışı, filtrləri, AZ/RU dil keçidi və seçilmiş səhifələrin mobil görünüşü brauzerdə yoxlanılıb.
- Mövcud kino/animasiya təqdimatı saxlanılıb. Ağır video faylları üçün ayrıca performans işi hələ planlanır.
- Lokal Turbopack CSS worker xətasına görə production build dəstəklənən Webpack rejiminə keçirilib.

Canlı domen üzrə real istifadəçi Core Web Vitals və PageSpeed nəticələri hələ ölçülməyib. Müəyyən sürət balı və sıralama üstünlüyü iddia edilmir.

## 7. Dillərin faktiki vəziyyəti

Tam işlək dillər: **Azərbaycan, ingilis, rus**.

20 mümkün dil `lib/international.ts` faylında qeydiyyatdadır. Digər 17 dilin məzmunu, şrift/RTL uyğunluğu və route yoxlamaları tamamlanmayıb. Bu dillər aktiv saytda göstərilmir. Dil qeydiyyatı tam 20 dilli sayt demək deyil.

Hazırda hər dildə 17 səhifə, ümumilikdə **51 content URL** var. Bunlardan 39-u editorial sitemap-da, 12-si isə əməliyyat qaralamalarıdır. İndeksləmə gate-i səbəbindən bu saylar Google-da indekslənmiş səhifə sayı deyil.

## 8. Yoxlamalar

15 oktyabr 2026-da:

- `npm run build` — keçib.
- `npm run typecheck` — keçib.
- `npm run lint` — xəta yoxdur; mövcud stylesheet və iki `img` istifadəsinə aid 3 xəbərdarlıq qalır.
- `npm test` — **11 yoxlama keçib**.
- `git diff --check` — whitespace xətası yoxdur.

HTTP yoxlamaları `http://127.0.0.1:3001` production preview üzərində, production canonical ünvanı `https://rofran.com` qəbul edilərək işlədilib. Bu canonical ünvanı təklif olunan konfiqurasiyadır; domenin alınması və ya canlı yayımlanması barədə təsdiq deyil.

Yoxlamalar dil məzmunu, metadata, canonical/hreflang, sitemap, JSON-LD, uydurma satış məlumatının olmaması, 404 cavabları, media faylları və indeksləmə konfiqurasiyasını əhatə edir.

## 9. Növbəti plan

### Mərhələ 1 — məhsul və şirkət faktları

Sahibdən alınmalı məlumatlar:

- Hüquqi şirkət adı, ictimai e-poçt, telefon və varsa müştəriyə açıq ünvan.
- Məhsulun mənşəyi, tərkibi, real çəkiləri, qablaşdırması və qiymətləri.
- Məhsul/partiya identifikatorları və varsa həqiqi analiz sənədləri.
- Real məhsul, qablaşdırma və istehsal/təchizat fotoşəkilləri.

Bu məlumatlarla məhsul, əlaqə, keyfiyyət və FAQ yenilənəcək. Məlumat olmadan mənşə, sertifikat və satış vədi əlavə edilməyəcək.

### Mərhələ 2 — real sifariş və xidmət

- Sifariş qəbul üsulunu müəyyən etmək: ilkin müraciət və ya tam checkout.
- Ödəniş üsulları, çatdırılma ölkələri, qiymətlər və müddətləri təsdiqləmək.
- Alış, ləğv, qaytarma və tam məxfilik şərtlərini hazırlamaq.
- Faktiki işləyən satış olduqda uyğun offer/availability məlumatlarını əlavə etmək.
- Merchant Center uyğunluğunu ölkə, məhsul və checkout tələbləri üzrə yoxlamaq. WhatsApp bağlantısı öz-özlüyündə tam checkout deyil.

### Mərhələ 3 — performans və yayımlama

- Məhsul şəkillərini real fotoşəkillərlə əvəzləmək, ölçü və alt mətnləri yoxlamaq.
- Ana səhifənin video yüklənməsini ölçüb lazımi optimizasiyanı etmək.
- Alınmış əsas domeni və kommersiya üçün uyğun hostinqi təsdiqləmək.
- HTTPS və www/non-www yönləndirmələrini qurmaq.
- `rofran.az` üçün uyğun səhifələri `rofran.com/az` altında qarşılıqlarına 301 yönləndirmək.
- Canlı URL və strukturlaşdırılmış məlumat yoxlamalarından sonra yalnız production-da indeksləməni aktivləşdirmək.

### Mərhələ 4 — pulsuz ölçmə və məzmun inkişafı

- Search Console və Bing Webmaster Tools-da domeni təsdiqləmək, sitemap göndərmək.
- Brend və qeyri-brend sorğuları, ölkə, səhifə və klikləri ayrı izləmək.
- Müraciət və sifariş ölçməsini faktiki satış prosesinə uyğun qurmaq.
- Mövcud yazıları real məhsul təcrübəsi və istifadəçi sualları ilə gücləndirmək.
- Sınaqdan keçirilmiş reseptləri yayımlamaq; coğrafi/keyfiyyət müqayisələrini yalnız uyğun mənbə və sübutla hazırlamaq.
- Real əməkdaşlıq və redaksiya qeydləri ilə tanınmanı artırmaq; saxta rəy və sıralama üçün alınan linklərdən istifadə etməmək.

### Mərhələ 5 — yeni dillər

- Axtarış tələbi, müraciət/satış, çatdırılma və dəstək imkanlarına görə bazar seçmək.
- Seçilmiş dil üçün tam UI, məhsul, FAQ, əsas səhifələr və uyğun məqalələri hazırlamaq.
- Redaktor yoxlaması, şrift/RTL, mobil dizayn, URL və hreflang yoxlamalarını tamamlamaq.
- Bundan sonra dili aktivləşdirmək. 17 dili eyni anda açmaq hazırkı plan deyil.

## 10. Hazır olmayan və edilməyən işlər

- Canlı domenə deploy, DNS/301 yönləndirmələri və Google indeksləməsi aparılmayıb.
- Search Console, Merchant Center və analitika hesabları qoşulmayıb.
- Ödəniş, checkout və beynəlxalq çatdırılma aktiv deyil.
- Məhsul mənşəyi, qiymət, stok, sertifikat və rəy uydurulmayıb.
- Digər 17 dil tərcümə edilməyib.
- Birinci yer, dünya üzrə tanınma və AI detektorlarının nəticəsi barədə zəmanət yoxdur.

## Əlaqəli təlimatlar

- [SEO yayımlama təlimatı](seo-launch.md)
- [Qısa Azərbaycan dilində növbəti addımlar](next-steps-az.md)
- [Mövcud lokalizasiya quruluşu](localization.md)

Bu sənəd pull-dan sonrakı işlərin və planın qeydidir. Dəyişikliklərin GitHub-a push edilməsi saytın canlı yayımlanması və indeksləmənin açılması ilə eyni əməliyyat deyil.
