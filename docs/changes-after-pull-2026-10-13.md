# Son pull sonrası değişiklikler — 13 Ekim 2026

Başlangıç commit'i: `8bd3879` — Refresh ROFRAN design: buttons, scroll motion, readability, footer and fonts.

## Ana sayfa ve scroll hikâyesi

- İlk sahneye Seedance 2.5 ile canlı çevre animasyonu hazırlandı. Daha görünür bulut hareketi, değişen güneş ışınları ve hafif çiçek hareketi içeren ikinci sürüm onaylandı.
- Açılış animasyonu Monid üzerinden Topaz Starlight Precise 2.6 ile 1080p'ye yükseltildi. Döngü geçişi düzenlendi; desktop 1080p ve mobile 720p dosyaları ana sayfaya eklendi.
- Son manzara için aynı görsel ilk ve son referans olarak kullanılarak 5 saniyelik animasyon üretildi. Topaz ile yükseltildi, tam 1920×1080 ölçüye getirildi ve desktop/mobile döngüleri eklendi.
- Discover the story artık 25.7 saniyelik videoyu baştan sona oynatıyor. Scroll konumu videonun saatini izliyor; yedi bölüm de sırayla gösteriliyor.
- Fare tekerleği, dokunma, yön tuşları veya pointer müdahalesi otomatik oynatmayı durduruyor ve kontrolü kullanıcıya veriyor. Pause story düğmesi eklendi.
- İlk bölüm kontrolü tam başlangıca dönüyor. Son bölüm kontrolü final sahnesine ulaşıyor. Son sahnedeki küçük scroll değişikliklerinde canlı döngü devam ediyor.
- Aktif sahneye göre açılış/final videoları yumuşak geçişle gösteriliyor. Gizli sekmede veya reduced-motion/save-data durumlarında hareket duruyor.

## Yazılar ve düğmeler

- Navigasyon ve düğmelerde aynı kelimenin yeniden çıktığı hover animasyonu kaldırıldı; tek metin örneği kullanılıyor.
- Final ROFRAN harflerine sıralı, 5 saniyede bir altın ışık geçişi eklendi.
- Header marka yazısı, footer marka yazıları ve footer bağlantıları için incelikli parıltı eklendi. Reduced-motion tercihi destekleniyor.

## Logo çalışmaları

Tüm görseller `design/rofran-logo-motion-v1/` içinde:

- Üç yön: üç safran teli, R monogramı ve sade çiğdem.
- 1 → 2 geçişinin ilk ve alternatif taslakları.
- 2 → 3, 1 → 3, 3 → 2 ve 2 → 1 geçişleri.
- Tek panoda 1 → 2 → 3 sırasını gösteren 18 karelik taslak.
- 3. ve 4. kare arasındaki ani değişimi düzelten ara ve son sürümler. Son sürümde teller önce kıvrılıyor, ardından R'nin çizgileri kademeli kalınlaşıyor.

Logo görselleri GPT Image ile üretilen değerlendirme storyboardlarıdır. Çalışan bir logo morph animasyonu henüz uygulanmadı.

## Dosyalar ve doğrulama

- Kaynak görseller, promptlar, küçük önizleme panoları ve yükseltilmiş video masterları ilgili `design/` klasörlerinde saklandı.
- Yeni dört idle video, HTTP byte-range testlerine eklendi.
- TypeScript kontrolü, production build ve üç mevcut HTTP testi geçti.
- Brauzerde tam hikâye oynatma, elle müdahale, açılış/final döngüsü ve 390×844 mobil görünüm kontrol edildi.
- Next.js'in oluşturduğu AGENTS.md eklendi; TypeScript derleme önbelleği Git dışında tutuldu.
