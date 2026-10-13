# ROFRAN — Tasarım güncellemesi

13 Ekim 2026. Bu belge siteye yapılan tasarım, hareket ve performans değişikliklerini özetler.

## Kısaca

- Butonlar ve linkler yeniden tasarlandı: hap şekli, ok ikonu, imleci takip eden hover efektleri.
- Hero'dan sonraki bölümler kaydırınca animasyonla beliriyor; hero başlıkları kelime kelime netleşiyor.
- 10px'in altında yazı kalmadı; paragraflar ve makale metni büyütüldü.
- Film greni, kaydırınca gizlenen header ve yeni editoryal footer eklendi.
- Fontlar WOFF2'ye çevrildi: her sayfada yüklenen font 1,16 MB'tan 164 KB'a indi.
- Video (`public/media/rofran-story.mp4`, `rofran-story-mobile.mp4`) ve mevcut görseller değiştirilmedi, repoda aynen duruyor.

## İncelenen referanslar

| Site | Alınan fikir |
|---|---|
| [microkit.co](https://microkit.co/) | Yazının yukarı kayıp yerine yenisinin gelmesi, imlecin girdiği noktadan dolan arka plan |
| [amicro.vercel.app](https://amicro.vercel.app/) | Ok değişimi, butonun üzerinden geçen parıltı, bulanıktan netleşen yazı |
| [cuedesign.space](https://www.cuedesign.space/) | Hap şekli, ince kenarlı ikincil buton |
| [modulify.ai](https://modulify.ai/templates) | Sade ve net buton hiyerarşisi |
| [scrolltide.co](https://www.scrolltide.co/) | Hover'da yumuşak ışıma, buzlu cam görünümlü buton |
| [motionin.design](https://www.motionin.design/) | `cubic-bezier(.16,1,.3,1)` yumuşak bitiş eğrisi, basınca hafif küçülme |
| [landdding.com](https://landdding.com/) | Ok ikonlu butonlar |
| [recent.design](https://recent.design/) | Hap şekilli küçük kontroller |
| [awwwards.com](https://www.awwwards.com/) | İnceleme sırasında 503 hatası verdi |

## 1. Butonlar ve linkler

- **Ana butonlar:** Hap şeklinde, sağda yuvarlak ok ikonu var. Hover'da arka plan imlecin girdiği noktadan dolarak açılıyor, yazı yukarı kayıyor, ok değişip 45° dönüyor. Altın butonda ayrıca parıltı ve altın ışıma var; hero'daki butonun buzlu cam görünümü var.
- **Mıknatıs etkisi:** Buton imleci birkaç piksel takip ediyor, basınca hafifçe küçülüyor. Dokunmatik ekranlarda ve "azaltılmış hareket" ayarında kapalı.
- **Linkler:** Menü linklerinde aynı yazı kayması var. Metin linklerinde altın alt çizgi soldan sağa çiziliyor ve ok değişiyor; footer linkleri ve journal kartları da böyle.
- **Küçük kontroller:**
  - Sepet butonu hap şeklinde, ürün sayısı altın rozet içinde.
  - Kapatma butonu yuvarlak ve hover'da dönüyor.
  - Adet butonları yuvarlak.
  - Akordeondaki `+` açılınca `×` olacak şekilde dönüyor.
- **Bileşenler:** `app/components/button.tsx` içinde `ButtonInner` (yazı + ok ikonu), `RollText` (kayan yazı) ve `LinkArrow` (değişen ok).
- **Köşe ayarı:** Butonların eski keskin köşeli görünümü için `app/globals.css` içinde `--btn-radius: 0` yapmak yeterli; animasyonlar aynen çalışır.

## 2. Kaydırınca beliren bölümler

Bir elemana `data-reveal` eklemek yeterli:

| Değer | Etki |
|---|---|
| `up` | Eleman aşağıdan yükselerek belirir |
| `stagger` | Elemanın doğrudan içindekiler sırayla belirir |
| `lines` | Başlık satırları maskeden yükselir (başlığın içinde `<Lines>` kullanılır) |
| `image` | İçindeki `img` alttan yukarı açılır, hafif yakınlaşmadan yerine oturur |
| `letters` | Harfler sırayla yükselir (footer'daki ROFRAN yazısı) |

- **Çalışma mantığı:** `app/components/site-shell.tsx` içinde bir IntersectionObserver var. Sayfa ilk açıldığında zaten ekranda olan içerik animasyonsuz gösterilir, yani yanıp sönme olmaz. Sayfa geçişlerinde yeni içerik animasyonla gelir.
- **Satır maskeli başlıklar:** `app/components/motion.tsx` içindeki `Lines` bileşeni kullanılıyor.
- **Erişilebilirlik:** "Azaltılmış hareket" ayarı açık olan kullanıcılarda bütün animasyonlar kapalıdır ve içerik doğrudan görünür.
- **Teknik not 1:** IntersectionObserver, kendi `clip-path`'i olan bir elemanı görünmez sayıyor. Bu yüzden görsel kırpması kutunun kendisine değil, içindeki `img`'e uygulanıyor.
- **Teknik not 2:** `clip-path`, `none` değerine kayarak geçemiyor. Bu yüzden `clipIn` keyframe'inin bitişi açıkça `inset(0)` olarak yazıldı.

## 3. Hero

- **Başlıklar:** `SplitTitle` bileşeniyle (`motion.tsx`) kelimeler bulanıktan netleşerek sırayla geliyor. Başlıklar `scroll-story.tsx` içindeki `chapters` listesinde satır dizisi olarak tutuluyor; `*kelime*` yazılan kelime italik çıkıyor.
- **Final:** ROFRAN harf harf geliyor ve çiçek logosu çizilerek beliriyor. Header'daki logo da sayfa açılırken bir kez çiziliyor.
- **Film greni:** Videonun üzerine hafif, hareketli bir doku eklendi (SVG gürültü dokusu).

## 4. Okunabilirlik

- **Etiketler:** En az 10–11px.
- **Paragraflar:** 15px.
- **Makale metni:** 17px (mobilde 16px).
- **İçindekiler ve kaynaklar:** 13px.

## 5. Header ve footer

- **Header:** Aşağı kaydırınca gizleniyor, yukarı kaydırınca geri geliyor. Menü açıkken ve klavye odağı header'dayken görünür kalıyor.
- **Footer:** Yeniden tasarlandı. İçinde slogan, menü, journal linkleri ve aşağı doğru solan altın gradyanlı dev ROFRAN yazısı var. Dosyası `app/components/site-footer.tsx`; server component olarak `layout.tsx`'ten `SiteShell`'e prop olarak geçiyor.

## 6. Sayfa açılış animasyonları

Ürün sayfası, journal, makale ve 404 sayfalarında içerik açılışta sırayla geliyor, görseller yumuşak açılıyor. Bu, sayfalar arasında geçiş hissi de veriyor.

## 7. Fontlar

Fontlar `fonttools` ile WOFF2'ye çevrildi ve sadece gereken karakterler bırakıldı.

| | Önce | Sonra |
|---|---|---|
| Her sayfada yüklenen fontlar | 1,16 MB (6 TTF) | 164 KB (6 Latin WOFF2) |

- **Latin dosyası:** Türkçe ve Azerbaycanca harfleri (ə, ğ, ş, ı, İ, ç, ö, ü) içeriyor.
- **Kiril dosyası:** Ayrı tutuluyor (`unicode-range`). Tarayıcı onu yalnızca sayfada Kiril metin olursa indiriyor; ileride Rusça eklenirse hazır.
- **Çıkarılanlar:** Yunan ve Vietnam karakterleri.
- **Ön yükleme:** Cormorant 400 ve Manrope 500 sayfa açılırken önceden yükleniyor (`layout.tsx`).
- **Bilinen eksik:** Manrope'ta büyük Ə harfi ve ↗ işareti yok; orijinal dosyada da yoktu. Gerekirse bunlar yedek fontla görünür.
- **Eski dosyalar:** TTF dosyaları silindi; git geçmişinde duruyor.

## Dosyalar

- **Yeni:**
  - `app/components/button.tsx`, `app/components/motion.tsx`, `app/components/site-footer.tsx`
  - `public/fonts/*.woff2`
  - `scripts/generate-images.mjs`
  - `DEGISIKLIKLER.md`
- **Değişen:**
  - `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/saffron/page.tsx`, `app/journal/page.tsx`, `app/journal/[slug]/page.tsx`, `app/not-found.tsx`
  - `app/components/site-shell.tsx`, `scroll-story.tsx`, `journal-cards.tsx`, `add-to-bag.tsx`, `icons.tsx`
  - `public/fonts/fonts.css`
- **Silinen:** `public/fonts/rofran-font-0.ttf` … `rofran-font-5.ttf`

## Doğrulama

- `npx tsc --noEmit`: hata yok.
- `npx eslint app`: hata yok. 9 uyarı var, hepsi önceden de vardı (`<img>` kullanımı ve font stylesheet'i).
- `npm test`: 3 testin 3'ü de geçti.
- `npm run build`: başarılı.
- 375, 1024 ve 1440px genişlikte hiçbir sayfada yatay taşma yok.
- Temiz bir sekmede konsol hatası yok.

## Bekleyen işler

- **Yeni görseller:** Sitedeki fotoğraflar videonun karelerinden alınmış. Aynı renk dünyasında ama farklı kompozisyonlarda 6 yeni görsel planlandı; prompt'lar `scripts/generate-images.mjs` içinde. Üretmek için proje klasöründe `.env.local` dosyasına `OPENAI_API_KEY=...` yazılır ve şu komut çalıştırılır: `node scripts/generate-images.mjs .env.local <çıktı klasörü>`.
  - **Ürün natürmortu:** Ana sayfa, galeri, sepet, paylaşım görseli.
  - **Safran tellerinin makro çekimi:** Galeri.
  - **Yukarıdan tek çiğdem çiçeği:** Ürün sayfası, "It begins with a flower" bölümü.
  - **Hasat sepeti:** "What is saffron?" makalesi.
  - **Altın renkli demleme:** "How to use saffron" makalesi ve galeri.
  - **Dolapta kavanoz:** "How to store saffron" makalesi.
  - **Hero'nun açılış karesi** (`valley.webp`) videonun ilk karesi olduğu için değişmeyecek. Farklı olursa video başlarken ekranda bir sıçrama görünür.
- **Video boyutu:** Masaüstü videosu 25,7 MB, mobil 12 MB. Büyük olmasının sebebi, kaydırırken akıcı ilerlesin diye her 6 karede bir anahtar kare konmuş olması. Küçültmek için `ffmpeg` ile yeniden sıkıştırıp kaydırma akıcılığını test etmek gerekir.
- **Kullanılmayan dosyalar:**
  - `public/frames` (71 kare, 2,7 MB) `scripts/build_frames.py` çıktısı ve sitede kullanılmıyor.
  - `public/media` içindeki `detail.webp`, `threads.webp` ve `finale.webp` de kullanılmıyor.
- **Satın alma:** Ürün sayfası hâlâ "Checkout unavailable" ile bitiyor. Haber ver formu, WhatsApp/Instagram ya da online ödeme arasından karar bekliyor.
