# ROFRAN — ilkin SEO versiyası və inkişaf xəritəsi

Yoxlama və dəyişiklik tarixi: 16 oktyabr 2026. Bu sənəd repo və ilkin axtarış nümunələri əsasında hazırlanıb. Canlı Google sıralaması, Search Console məlumatı və ölkələr üzrə tam axtarış həcmi ölçülməyib.

## Brendin mövqeyi

ROFRAN-ın ilk məhsulu yeməkdə istifadə edilən zəfəran telləridir. Minimum sifariş **5 qramdır**. Bu hədd bir qabın xalis çəkisini, sifarişin yalnız 5 qramlıq artımlarla verilməsini və ya yemək üçün istifadə miqdarını müəyyən etmir. Çay, kapsul, toz və başqa məhsullar hazırkı kataloqa daxil edilmir. Gələcək məhsul hazır olanda ayrıca məhsul səhifəsi əlavə etmək mümkündür.

Məqsəd yalnız ümumi “zəfəran/saffron” sözündə görünmək deyil: ROFRAN adı üzrə tanınmaq, uyğun alış axtarışlarında tapılmaq və oxucunu məhsulu anlayaraq sifariş verməyə gətirməkdir. Ümumi sözlər müxtəlif niyyətləri birləşdirir: ədviyyat, bitki, kapsul, aptek, restoran və şəxs adları. Bunların hamısı bizim auditoriyamız deyil.

## İlkin versiyada nə var?

- 8 işlək dil: EN, AZ, RU, TR, KK, UZ, KY, TG. İngilis dili `/`, digərləri dil prefiksi ilə açılır.
- Hər dildə 17 səhifə: ana səhifə, məhsul, bələdçi indeksi, 7 məqalə, FAQ və 6 məlumat səhifəsi. Cəmi **136 məzmun URL-si**.
- Hər dildə 13 FAQ. Məhsul səhifəsində minimum sifariş və sifariş/çatdırılma sualları ayrıca görünür.
- Sitemap-da **104 tamamlanmış məzmun URL-si**. Əlaqə, çatdırılma, topdan satış və məxfilik səhifələrinin 32 dil versiyası əməliyyat məlumatları gözləyən `noindex` qaralamalardır.
- Öz ünvanını göstərən canonical, qarşılıqlı hreflang, x-default, sənəd dili, səhifəyə uyğun başlıq və təsvir.
- Organization, WebSite, Product, Article və BreadcrumbList strukturlaşdırılmış məlumatları. Təsdiqlənməmiş qiymət, stok, rəy və sertifikat yaradılmır. Tək Product obyektinin olması Google alış nəticələrinə tam uyğunluq demək deyil.
- Azərbaycan/Abşeron yalnız işçi mənşə nümunəsidir. İnkişaf rejimində ayrıca müvəqqəti qeyd kimi görünür; təsdiqlənənədək production məhsul iddiasına və Product JSON-LD məlumatına daxil edilmir.
- Məhsul parametrləri `content/product.json`, bazar planı `content/markets.json` içindədir. Minimum sifariş mətnlərində `{minimum}` həmin parametrdən doldurulur.
- FAQ-nın brauzer hissəsinə yalnız seçilmiş dilin sualları ötürülür. Başlıq və səbət bütün məqalələri yükləmir.
- Qazax, qırğız və tacik əlifbası üçün yerli saxlanılan Noto Sans və lisenziyası əlavə olunub. Başlıqlardakı Cormorant qalır.

Yeni dillərdə mətnlər ilkin redaksiya versiyasıdır. Yayımdan əvvəl həmin dilləri ana dili səviyyəsində bilən redaktor məhsul terminlərini, ifadələri və satış şərtlərini yoxlamalıdır. Texniki keçərli olmaq redaksiya təsdiqi demək deyil.

## Səhifələrin rolu

| Səhifə | Axtarış və istifadəçi məqsədi | Nə əlavə edilməlidir? |
|---|---|---|
| Ana səhifə | ROFRAN brendi, zəfəranla tanışlıq | Mövcud film və dizayn, məhsula birbaşa keçid, qısa həqiqi brend hekayəsi |
| `/saffron` | Alış, məhsul seçimi, 5 qramdan sifariş | Real foto, təsdiqlənmiş mənşə, qablaşdırma/xalis çəki, qiymət və qram qiyməti, sifariş qaydası |
| `/quality` | Orijinallıq və keyfiyyət sualları | Məhsula/partiyaya uyğun sənədlər, analiz varsa laboratoriya, tarix və əhatə dairəsi |
| `/about` | Brend və sahibinə etibar | Real komanda, şirkət, fəaliyyət və məhsulun tədarük hekayəsi |
| `/journal` və məqalələr | Öyrənmə, seçim, istifadə | Sınaqdan keçirilmiş izahlar, orijinal şəkillər, yerli mətbəx nümunələri |
| `/faq` | Qısa suallar və alış tərəddüdləri | Minimum sifariş, məhsulun forması, ödəniş və real çatdırılma şərtləri |
| `/shipping`, `/contact`, `/privacy` | Sifarişi təhlükəsiz və aydın tamamlamaq | Faktiki şirkət, dəstək, ölkələr, tariflər, qaytarma və məxfilik qaydaları |
| `/wholesale` | Gələcək restoran və satış tərəfdaşları | Yalnız belə xidmət hazır olarsa real şərtlər; hazırda qaralamadır |

Bir məhsul üçün ayrıca təkrarlanan “ucuz zəfəran”, “ən yaxşı zəfəran”, “5 qram zəfəran” satış səhifələri açmırıq. Uyğun alış ifadələri eyni məhsul səhifəsində təbii şəkildə cavablandırılır. Yeni məhsul kateqoriyası və ya çay hazır olmadan boş SEO səhifələri yaradılmır. Sayta girişdən məhsul səhifəsinə keçmək üçün 25 saniyəlik filmi tam izləmək məcburi deyil.

## Dil və bazar planı

| Bazar | İlkin dil yolları | Araşdırma və məzmun istiqaməti |
|---|---|---|
| Azərbaycan | `/az`, `/ru` | Zəfəran qiyməti, dəmləmə, seçim; aptek/xəstəxana nəticələrini ayırmaq |
| Türkiyə | `/tr` | Safran satın al, gram fiyatı, nasıl kullanılır; Safranbolu mənşəyini məhsula aid etməmək |
| Qazaxıstan | `/kk`, `/ru` | Şafranın qida kimi seçimi, gram qiyməti; kapsul və yer adlarını ayırmaq |
| Özbəkistan | `/uz`, `/ru` | Za’faron / zafaron yazılışları, narxi, damlash; yerli istehsalçıları ayrıca müqayisə etmək |
| Qırğızıstan | `/ky`, `/ru` | Şafran ədviyyatı, istifadə və sifariş; rus və qırğız sorğularını ayrıca yoxlamaq |
| Tacikistan | `/tg`, `/ru` | Заъфарон / шафран, yerli söz seçimi və kulinariya niyyəti; tələb ölçməsi hələ lazımdır |
| İngilisdilli bazarlar | `/` | Saffron threads, buying and cooking; ABŞ və Britaniya kimi ölkələri gələcəkdə ayrı ölçmək |

Prioritetlər biznes fərziyyəsidir: ilk AZ/TR, sonra xidmət imkanına görə digər bazarlar. Dil seçimi çatdırılma mövcudluğunu bildirmir. Ölkəyə həqiqi çatdırılma, valyuta, vergi və fərqli təklif olmadan `/kz-buy-saffron`, `/bishkek-saffron` kimi eyni məzmunlu ölkə/şəhər səhifələri açmaq lazım deyil. Əsas domen kimi sahib olduğumuz bir `.com` və dil qovluqları uyğun başlanğıcdır. Domenin alınması və yayımlanması ayrıca təsdiqlənməlidir.

Google fərqli dillər üçün ayrıca URL və uyğun hreflang istifadə etməyi tövsiyə edir. İstifadəçini IP və ya brauzer dilinə görə məcburi başqa dilə yönləndirmək əvəzinə seçim saxlanılır. [Google-un çoxdilli sayt təlimatı](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

## Açar sözləri necə idarə etməli?

`docs/seo-keyword-map.csv` redaktə edilə bilən ilkin xəritədir. Hər sətirdə dil, ölkə, sorğu, niyyət, hədəf səhifə, prioritet və sübut səviyyəsi var. Həcm bilmədiyimiz yerdə rəqəm yazılmayıb.

1. Ölkə və dili seçin; tək “rus dili” seçmək bütün rusdilli ölkələri ölçmür.
2. Satış və məlumat sorğularını toplayın. Adın tibbi əlavələr və başqa bizneslərlə qarışmasını ayırın.
3. Hədəf ölkənin axtarış nəticələrində dominant səhifə tipinə baxın: məhsul, bələdçi, marketplace, resept? Buradakı ümumi veb axtarışı dəqiq ölkədən edilmiş Google sıralama ölçməsi deyil.
4. Eyni niyyətli sözləri bir mövzuya birləşdirin və bir əsas URL seçin. Məsələn, “necə dəmlənir” və “necə istifadə olunur” eyni praktik bələdçidə birləşə bilər.
5. Ölkə, alət, ölçmə tarixi, həcm aralığı və rəqib səhifələri qeyd edin. Ölçülməmiş söz “yüksək həcmli” sayılmır.
6. Mövcud məqaləni həmin bazara uyğun faydalı nümunə ilə zənginləşdirin. Ayrı faydalı məqsəd yoxdursa yeni səhifə açmayın.
7. Yayım sonrası Search Console-da real sorğu, ölkə, səhifə, klik və görünməyə əsasən yeniləyin.

Depoda əvvəlki araşdırma var: ABŞ/ingilis dili üçün `keyword-research.csv`, Azərbaycan və Rusiya nümunələri üçün `keyword-research-az-ru.csv`. Bunlar 14–15 oktyabr tarixli pulsuz Ahrefs müşahidələridir. Bu işdə həmin nəticələr yenidən ölçülmüş kimi göstərilmir. 16 oktyabrda Türkiyə və Mərkəzi Asiya üçün ümumi veb nəticələrinin ilkin nümunələrinə baxılıb; bu nümunələrdən axtarış həcmi və ya rəqib sıralaması çıxarılmayıb.

## Ödənişli Ahrefs lazımdırmı?

İlkin versiya üçün məcburi deyil. Pulsuz Ahrefs Keyword Generator və SERP nümunələri ilə başlamaq mümkündür. Geniş rəqib sorğuları, link profilləri, müqayisələr və davamlı izləmə lazım olanda ödənişli plan vaxta qənaət edə bilər. Plan almadan əvvəl ölkə əhatəsi və ixrac limitləri yoxlanmalıdır. [Ahrefs-in pulsuz alətləri](https://ahrefs.com/free-seo-tools).

Google Keyword Planner əlavə fikir və tələb təxminləri verir; giriş üçün Google Ads hesab qurulması və billing məlumatı tələb oluna bilər. Reklam rəqabəti göstəricisi üzvi SEO çətinliyi ilə eyni deyil. Bu işdə Ads hesabı qurulmayıb və kampaniya başladılmayıb. [Keyword Planner təlimatı](https://support.google.com/google-ads/answer/7337243?hl=en).

Google Trends mövsümilik və nisbi marağı müqayisə etmək üçündür; 0–100 bal aylıq axtarış sayı deyil. [Trends məlumatları](https://support.google.com/trends/answer/4365533?hl=en). Search Console isə yayımdan sonra öz saytınızın real görünmə və klik məlumatını verir, bütün bazarın həcmini göstərmir. [Search Console performans hesabatı](https://support.google.com/webmasters/answer/7576553?hl=en).

## Bələdçi və FAQ planı

Hazır 7 mövzu: zəfəran nədir; necə istifadə/dəmlənir; necə saxlanır; dadı və ətri; niyə bahadır və qiyməti necə müqayisə edilir; alarkən nə yoxlanır; tel və tozun fərqi.

Növbəti məzmun yalnız real məlumatla hazırlanmalıdır:

- ROFRAN məhsulunun mənbəyi və tədarük yolu — mənşə təsdiqlənəndən sonra.
- ROFRAN qablaşdırması və 5 qramdan başlayan sifarişin izahı — real qabın fotosu və satış vahidi müəyyənləşəndə.
- Azərbaycan plovu, türk zərdəsi, özbək və digər yerli mətbəx nümunələri — ölçülmüş, sınaqdan keçirilmiş resept, həqiqi şəkil və redaktor qeydləri ilə. Hər yeməkdə zəfəranın ənənəvi olduğunu fərz etməmək.
- “5 qram neçə istifadəyə çatır?” — ölçülmüş nümunə ilə hesab; istifadə olunan resept miqdarını açıq göstərmək, universal fincan/porsiya vədi verməmək.
- Həqiqi müştəri sualları, qablaşdırma və sifariş təcrübəsi — satışlar başlayandan sonra.

FAQ istifadəçinin qərarına kömək edir və mətn kimi indekslənə bilər. Onu Google-da xüsusi açılan FAQ nəticəsi almaq üçün qurmuruq: Google FAQ rich result funksiyasını 7 may 2026-dan dayandırıb. [Google dəyişiklik qeydi](https://developers.google.com/search/updates#may-2026).

Məqalənin məqsədi yalnız söz sayını artırmaq deyil. Müəllif/komanda, mənbə və real məhsul təcrübəsi görünməlidir. Çoxlu tərcümə ilə eyni zəif mətni böyütmək əvəzinə seçilmiş mövzuları yoxlanmış məlumat və orijinal materialla gücləndirin. [Google faydalı məzmun təlimatı](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [miqyaslı dəyərsiz məzmun siyasəti](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content).

## Brendi necə tanıdarıq?

ROFRAN adı, logo, domen və rəsmi profillərdə eyni yazılış saxlanılır. Saytda təsdiqlənmiş şirkət, məhsul və əlaqə məlumatı olmalıdır. Kulinariya müəllifləri, aşpazlar və uyğun nəşrlərlə real resept və məhsul təcrübəsinə əsaslanan əməkdaşlıq brendin xatırlanmasına kömək edə bilər. Rəy yalnız həqiqi müştəridən alınmalı, ödənişli əməkdaşlıq açıq göstərilməlidir. Bu mərhələdə heç kimə mesaj göndərilməyib və profil yaradılmayıb.

Satış hazır olanda real qiymət, stok, çatdırılma və qaytarma məlumatı ilə Product/Offer və uyğun Google Merchant Center məlumatları hazırlanır. Məhsul məlumatı səhifə, checkout və feed-də eyni olmalıdır. Merchant Center ölkə və hesab uyğunluğu həmin mərhələdə yoxlanmalıdır. [Google məhsul məlumatları](https://developers.google.com/search/docs/appearance/structured-data/product).

## Texniki prioritetlər

Əsas video təxminən 25 MiB, mobil versiyası 12 MiB-dir. Bu, ölçülmüş PageSpeed balı deyil, fayl ölçüsüdür. Şəkil posterini tez göstərmək, videoların yüklənmə prioritetini real mobil bağlantıda yoxlamaq, CDN/keş/byte-range davranışını test etmək lazımdır. İndiki scroll və idle video davranışı dəyişdirilməyib. Sürəti yalnız ümumi bal ilə yox, real istifadəçi metrikləri ilə izləyirik: LCP ≤2.5 saniyə, INP ≤200 ms, CLS ≤0.1, 75-ci persentil. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

Səhifələr normal HTML mətn və `<a href>` bağlantıları ilə əlçatan olmalıdır. Sitemap həmin əlaqələri tamamlayır. [Google mağaza strukturu təlimatı](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure).

## İş ardıcıllığı

1. **İndi / yerli baxış:** yeni dil və məhsul səhifələrini nəzərdən keçirmək, mətnləri və ilkin bazar prioritetlərini düzəltmək.
2. **Satışdan əvvəl:** real məhsul/mənşə/qab/qiymət/şirkət məlumatı; sifariş və çatdırılma qərarı; tərcümələrin ana dili redaktəsi. Məhsul təqdimatı ilə işlək checkout ayrı işlərdir.
3. **Yayıma hazırlıq:** sahib olunan domen, hostinq, HTTPS, canonical ünvan, lazımi yönləndirmələr; real mobil sürət və sifariş yoxlamaları; qaralama siyasətlərin tamamlanması.
4. **Yayım:** yalnız production üçün indeksləməni açmaq, Search Console/Bing təsdiqi, sitemap və nümunə URL yoxlamaları. Bu işdə deploy və indeksləmə açılmayıb.
5. **İlk 4–12 həftəlik müşahidə planı:** indekslənən səhifələr, ölkə və sorğular üzrə görünmə/klik, məhsula keçid və real sifarişləri izləmək; zəif mövzuları yeniləmək. Bu müddət sıralama vədi deyil.

Uğuru yalnız “zəfəran” sözünün yeri ilə ölçməyin: ROFRAN brend axtarışları, uyğun alış sorğularından trafik, məhsul səhifəsinə keçid, sifariş və təkrar müştəri daha mənalı göstəricilərdir. İlkin texniki quruluş inkişaf üçün baza yaradır; bütün ölkələrdə yüksək sıralama zəmanəti vermir.
