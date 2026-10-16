# ROFRAN — 16 Oktyabr 2026 Pull-dan Sonra Görülən İşlər və Növbəti Addımlar

Bu sənəd sonuncu `git pull` əməliyyatından (commit `3f53e95`) sonra layihədə edilən bütün dəyişiklikləri, sessiyanın kəsildiyi məqamı və növbəti addımları sənədləşdirir.

---

## 1. Pull-dan Sonra Nələr Edildi?

### A. 8 Dilli Beynəlxalq Sistem (136 Səhifə, 140 Marşrut)
Mövcud 3 dilə (İngilis, Azərbaycan, Rus) əlavə olaraq **5 yeni Türk və Mərkəzi Asiya dili** tətbiq edildi:
* **Türkcə (`/tr`)** — Türkiyə bazarı üçün.
* **Qazaxca (`/kk`)** — Qazaxıstan bazarı üçün.
* **Özbəkcə (`/uz`)** — Özbəkistan bazarı üçün.
* **Qırğızca (`/ky`)** — Qırğızıstan bazarı üçün.
* **Tacikcə (`/tg`)** — Tacikistan bazarı üçün.

Hər dildə tam sistem qurulub:
* Ana səhifə, məhsul səhifəsi, zəfəran bələdçisi indeksi, **7 əsas məqalə**, **13 suallıq FAQ** və məlumat səhifələri.
* Qazax, qırğız və tacik əlifbalarının xüsusi kiril simvollarını saytda qüsursuz göstərmək üçün **Noto Sans Central Asia** şriftləri yüklənib və CSS-ə inteqrasiya olunub (`public/fonts/`).

### B. "Yalnız Zəfəran və Minimum 5 Qram" Satış Modeli
* İstifadəçinin parametrləri rahatlıqla tək bir yerdən dəyişə bilməsi üçün konfiqurasiya mənbələri ayrıldı:
  * `content/product.json` — minimum sifariş miqdarı (5 qram), qablaşdırma və satış şərtləri tək bu fayldan idarə olunur.
  * `content/markets.json` — hədəf ölkələr və bazar prioritetləri.
  * `lib/product-settings.ts` və `lib/product-copy.ts` — təkrar sahələri mərkəzləşdirir.
* Məhsul səhifəsində və FAQ-da minimum sifarişin 5 qram olması aydın vurğulanıb.
* Mənşə kimi "Azərbaycan, Abşeron" müvəqqəti işçi qaralama kimi daxil edilib və inkişaf rejimində xüsusi qeydlə göstərilir (rəsmi təsdiqlənənədək Google sxeminə və iddialara daxil edilmir).

### C. SEO Mütəxəssisi Səviyyəsində Qurulan Baza və Xəritələr
* **`docs/seo-keyword-map.csv`:** 8 dil və hədəf ölkələr üzrə **114 sətirlik** redaktə edilə bilən açar söz xəritəsi.
* **`docs/seo-v1-guide-az.md`:** ROFRAN brendinin SEO mövqeləndirməsi, Google axtarış niyyətləri, Ahrefs/Google Trends-dən istifadə təlimatı və mərhələli inkişaf planı.
* **`docs/seo-editing-guide-az.md`:** Qiymət, mənşə, minimum sifariş və mətnləri redaktə etmək üçün proqramlaşdırma tələb etməyən bələdçi.
* **`docs/seo-research-observations-2026-10-16.md`:** Türkiyə və Mərkəzi Asiyada zəfəran sorğularının kulinariya, ədviyyat, tibbi preparatlar və restoran adları arasındakı fərqləri üzrə SERP analizi.
* **Texniki SEO:** Hər dildə unikal canonical, qarşılıqlı hreflang, x-default, 104 məzmun URL-lik dinamik sitemap və Schema.org (Product, Article, FAQ, Organization, BreadcrumbList) mikroformatları.

---

## 2. Nədə Yarımçıq Qalmışdı?

Sessiya zamanı Codex bütün kod, JSON və bələdçi fayllarını uğurla yaratmış və `finalize.py` skriptini icra etmişdi.
Lakin sonuncu addımda:
1. **Daxili Brauzer Yoxlaması və Ekran Görüntüləri:** Sayt `npm run dev -- --port 3001` ilə başladılıb daxili brauzerlə (CUA) səhifələrin vizual ekran görüntülərini çəkərkən OpenAI istifadə limiti bitmiş (`usage_limit_exceeded`) və proses dayandırılmışdı.
2. **Yekun Test və Git Push:** Bu səbəbdən avtomatlaşdırılmış testlər (`npm test`), production build (`npm run build`) və `git commit/push` icra olunmamış, 51 fayllıq dəyişiklik yalnız lokal iş qovluğunda qalmışdı.

### Nəticə və Bərpa:
Antigravity tərəfindən layihə bərpa edildi:
* Lokal server qaldırıldı (`http://127.0.0.1:3001/`).
* Bütün avtomatlaşdırılmış testlər işə salındı: **13 testin 13-ü də uğurla keçdi (`13 passed, 0 failed`)**.
* Next.js production build yoxlanıldı: **140 statik marşrutun hamısı qüsursuz kompilyasiya olundu**.

---

## 3. Növbəti Mərhələdə Görülməli Olan İşlər

1. **Real Məhsul Məlumatlarının Təsdiqi:**
   - Dəqiq mənşə (Abşeron və ya digər təsdiqlənmiş bölgə).
   - Real qablaşdırma fotoları, xalis çəki və qiymət cədvəli.
   - Sifariş qəbulu mexanizmi: birbaşa kartla onlayn ödəniş, yoxsa WhatsApp/əlaqə forması ilə sifariş.
2. **Yeni Dillərin Yerli Redaktəsi:**
   - 5 yeni dilin (TR, KK, UZ, KY, TG) mətnləri ilkin AI tərcüməsidir; canlı yayımdan əvvəl yerli ədviyyat və kulinariya terminləri ana dili səviyyəsində yoxlanmalıdır.
3. **Qaralama Səhifələrin Doldurulması:**
   - Çatdırılma (`/shipping`), əlaqə (`/contact`), məxfilik (`/privacy`) və şirkət rekvizitləri tamamlanmalı və `noindex` statusundan çıxarılmalıdır.
4. **Canlı Yayım və Google Qeydiyyatı:**
   - Domenə yönləndirmə və HTTPS təmin edildikdən sonra `robots.txt`-də Google indeksləməsi açılmalı və sitemap Google Search Console-a göndərilməlidir.
