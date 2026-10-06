# ROFRAN / Saffron — iş arxivi

2026-10-05 və 2026-10-06 tarixlərindəki yazışma, referanslar və yaradılan fayllar bir qovluqda toplanıb.

- [Tam görünən yazışma](conversation.md) — API açarları gizlədilib.
- `assets/` — şəkillər, storyboard alternativləri, video, Sunburst promptları və HTML önizləmələri.
- `references/` — söhbət arxivindən bərpa olunan istifadəçi şəkilləri.
- `originals/` — əvvəlki nəticələrlə eyni olmayan əlavə orijinal generasiyalar.
- [Son Full HD şəkil](assets/rofran-same-image-sunburst-full-hd.png) — 1920 × 1080.
- [Son Full HD önizləmə](assets/rofran-full-hd-preview.html).
- [25 kadrdan ibarət birləşdirilmiş storyboard](assets/rofran-combined-25-frames.png).
- [Mövcud repo kadrlarından hazırlanmış video](assets/saffron-animation.mp4).

## Yerli brauzer önizləməsi

Bu qovluqda terminaldan işlədin:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Sonra `http://127.0.0.1:8765/assets/rofran-full-hd-preview.html` ünvanını açın. HTML faylı ayrıca brauzerdə də açıla bilər; yanındakı şəkil faylını saxlayın.

## Görülən işlər və qərarlar

Saffron reposu klonlandı. Onun 71 mövcud WebP kadrından video önizləməsi hazırlandı. Zəfəran çiçəyinin açılması, sapların bankaya dolması və gün batımı fonunda məhsulun göstərilməsi üçün storyboard alternativləri yaradıldı. Tarladan başlayan giriş və məhsuldan sapların yüksəldiyi sonluq birləşdirildi.

Söhbətdə image generation, video generation və kodla animasiya variantları müzakirə edildi. Video modelləri haqqında araşdırma aparıldı, həmin xidmətlərdə video generasiyası edilmədi. Tam storyboarddan ayrıca ilk kadr üzərində işlənildi.

Birbaşa OpenAI API-də `gpt-image-2.5-sunburst` ilə üç nəticə yaradıldı. API nəticələri 1920 × 1088 oldu; yuxarıdan və aşağıdan 4 piksel kəsilərək 1920 × 1080 Full HD ixrac edildi. `*-native.png` faylları API-dən gələn ölçünü, `*-full-hd.png` isə həmin ixracı saxlayır. AI ilə təkrar işlənən şəkillərdə xırda detalların dəyişməsi mümkündür.

Bütün PNG faylları Full HD deyil: ilk generasiyalar və storyboardlar təxminən 1672 × 941 ölçüdədir; ayrıca 1K fayl 1024 × 576-dır. Bu arxiv istehsala hazır tam animasiya deyil, hazırkı dizayn materialları və önizləmələrdir.

## Məxfilik və mənbə

API açarları bu qovluqda saxlanılmır. Xam sessiya, autentifikasiya məlumatları və API cavablarının base64 jurnalları daxil edilməyib. Görünən yazışma iş tarixçəsidir; əvvəlki yanlış və sonradan düzəldilən cavablar da tarixçədə saxlanılıb.
