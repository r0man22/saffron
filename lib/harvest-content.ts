import type { Locale } from "./i18n";

export interface HarvestStage {
  step: string;
  tag: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  badge: string;
}

export interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

export interface HarvestContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  disclaimerBadge: string;
  disclaimerText: string;
  stagesTitle: string;
  stagesSubtitle: string;
  stages: HarvestStage[];
  galleryTitle: string;
  gallerySubtitle: string;
  galleryItems: GalleryItem[];
  productButton: string;
  qualityButton: string;
  homeLink: string;
  navLabel: string;
}

export const harvestData: Record<Locale, HarvestContent> = {
  az: {
    metaTitle: "Maştağada Zəfəran Yığımı Xronikası | ROFRAN",
    metaDescription: "Abşeron yarımadasında, Bakının qədim Maştağa kəndində payız sübhündə zəfəran çiçəklərinin əl ilə zərif yığılması, tellərinin ayrılması və ənənəvi qurutma xronikası.",
    eyebrow: "VİZUAL XRONİKA · MAŞTAĞA, BAKI",
    title: "Sübh Tezdən Süfrəyə: Zəfəran Yığımının Canlı Xronikası",
    subtitle: "Payızın sərin mehində açılan bənövşəyi Crocus sativus qönçələrindən bütöv al-qırmızı tellərin ayrılmasına qədər hər addım səbir, həssaslıq və ənənəvi ustalıq tələb edir.",
    disclaimerBadge: "İlkin Foto-Xronika",
    disclaimerText: "Hazırkı vizual təqdimat ROFRAN-ın yığım prosesinin bədii-konseptual vizuallarıdır. Tezliklə cari mövsümün canlı çöl çəkilişləri və sənədli fotoşəkilləri ilə zənginləşdiriləcəkdir.",
    stagesTitle: "Yığımın Dörd Əsas Mərhələsi",
    stagesSubtitle: "Maştağa kənd təsərrüfatı ənənələri ilə aparılan payız zəfəran təqvimi",
    stages: [
      {
        step: "01",
        tag: "SÜBH ÇAĞI · MAŞTAĞA SAHƏLƏRİ",
        title: "Sübh Tezdən Sahə: Qum Torpaqda Bənövşəyi Oyanış",
        text: "Abşeronun qumlu torpağında zəfəran payızın sonlarında — oktyabr və noyabr aylarında çiçək açır. Yığım sübh tezdən, günəş şəfəqləri üfüqdən boylananda başlayır. Günorta istisi çiçəkləri tam açmazdan və zərif qırmızı tellərin təbii ətri buxarlanmazdan əvvəl hər bir çiçək dərhal toplanmalıdır.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Maştağada sübh tezdən zəfəran sahəsi və bənövşəyi Crocus sativus çiçəkləri",
        badge: "Mərhələ 1: Sübh Yığımı"
      },
      {
        step: "02",
        tag: "ƏL İLƏ ZƏRİF DƏRİLMƏ",
        title: "Həssas Əllərin Zəhməti: Bir-bir, Zədələmədən",
        text: "Zəfəran yığımı mexanikləşdirilə bilməyən nadir kənd təsərrüfatı incəsənətidir. Təcrübəli kənd sakinləri hər bir çiçəyi gövdəsindən ehtiyatla qoparır və ənənəvi toxunma həsir səbətlərə yığır. Hər qram zəfəran üçün yüzlərlə çiçəyin diqqətlə əl ilə toplanması tələb olunur.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Kənd sakininin zərif çiçəyi əl ilə dərməsi və toxunma səbət",
        badge: "Mərhələ 2: Əl Yığımı"
      },
      {
        step: "03",
        tag: "EMALATXANA · TELLƏRİN AYRILMASI",
        title: "Qırmızı Tellərin Zərif Ayrılması: Saf Yaqut Teller",
        text: "Sahədən indicə dərilib gətirilmiş bənövşəyi qönçələr həmin gün emalatxana masalarına çatdırılır. Hər çiçəyin ortasında yerləşən üç ədəd al-qırmızı stiqma (dişicik teli) zərif şəkildə sarı sütuncuqdan ayrılır. Yalnız ən qırmızı, dolğun uclar seçilərək saflıq təmin edilir.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Taxta masa arxasında bənövşəyi çiçəklərdən qırmızı zəfəran tellərinin ayrılması",
        badge: "Mərhələ 3: Tellərin Ayrılması"
      },
      {
        step: "04",
        tag: "TƏBİİ KÖLGƏLİKDƏ ŞƏBƏKƏLİ QURUTMA",
        title: "Ənənəvi Şəbəkədə Həssas Qurutma: Ətrin və Rəngin Həbsi",
        text: "Ayrılmış bütöv qırmızı tellər təmiz hava dövranı olan, birbaşa gün düşməyən otaqda taxta çərçivəli incə torlu səthlərə nazik təbəqə ilə yayılır. Zərif və mülayim temperaturda aparılan bu proses efir yağlarını (safranal) və güclü rəng piqmentini (krocin) daxildə tam saxlayır.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Taxta şəbəkəli tor üzərində nazik qatla sərilmiş tünd qırmızı zəfəran telləri",
        badge: "Mərhələ 4: Şəbəkəli Qurutma"
      }
    ],
    galleryTitle: "Kulinariya və Məhsul Qalereyası",
    gallerySubtitle: "Bütöv qırmızı tellərdən zərif kəhrəba dəmləməsinə və ənənəvi aş süfrəsinə qədər",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Bütöv Al-Qırmızı Tellər",
        description: "Təbii zurna formalı uclar və dərin yaqut rəngi, qırılmamış bütöv stiqmalar."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Qoruyucu Şüşə Qablaşdırma",
        description: "Qızılı qapaqlı minimalist şüşə qabda zəfəranın efir yağları və təbii ətri qorunur."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Təbii Dəmləmə Çalarları",
        description: "İlıq suda açılan parlaq kəhrəba və qızılı-narıncı rəng axını, süfrəyə yayılan zərif ətir."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Ənənəvi Zəfəranlı Ziyafət Aşı",
        description: "Dən-dən süzülmüş, zəfəran şirəsi ilə qızaran və badamla bəzədilən şah plov."
      }
    ],
    productButton: "Zəfəranı Kəşf Edin",
    qualityButton: "Keyfiyyət Standartlarımız",
    homeLink: "Əsas səhifəyə qayıt",
    navLabel: "Yığım Xronikası"
  },
  en: {
    metaTitle: "Mashtaga Saffron Harvest Chronicle | ROFRAN",
    metaDescription: "Visual chronicle of the autumn saffron harvest in Mashtaga village, Absheron peninsula: gathering Crocus sativus at dawn, artisanal stigma extraction, and shaded mesh curing.",
    eyebrow: "VISUAL CHRONICLE · MASHTAGA, BAKU",
    title: "From Dawn Gathering to Culinary Art: The Saffron Chronicle",
    subtitle: "From purple Crocus sativus petals opening in the cool Absheron morning breeze to whole crimson threads cured on artisanal screens, every harvest stage demands patience, delicacy, and ancestral craft.",
    disclaimerBadge: "Visual Chronicle Preview",
    disclaimerText: "These visual representations depict ROFRAN’s traditional harvest and curing steps. They will be complemented with live in-field documentary photography from our ongoing seasonal operations.",
    stagesTitle: "Four Stages of the Autumn Harvest",
    stagesSubtitle: "The seasonal agricultural rhythm of Mashtaga village on the Caspian shore",
    stages: [
      {
        step: "01",
        tag: "DAWN BREAK · MASHTAGA FIELDS",
        title: "The Dawn Gathering: Purple Blooms on Sandy Soil",
        text: "Saffron blossoms across the Absheron peninsula in late autumn, from late October through November. Harvesters arrive before sunrise as the sky turns amber and lavender. The flowers must be picked at first light before the midday warmth opens the blossoms fully and dissipates delicate safranal aromatics.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Saffron field at dawn in Mashtaga village with purple Crocus sativus flowers",
        badge: "Stage 1: Dawn Gathering"
      },
      {
        step: "02",
        tag: "ARTISANAL HAND HARVESTING",
        title: "Gentle Hands at Work: Plucking Flower by Flower",
        text: "Saffron harvesting cannot be mechanized. Village farmers bend over the low rows, snapping each blossom at the stem base with steady, gentle fingers. Fresh purple petals are laid into handwoven wicker baskets to preserve their structure until reaching the workshop.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Artisan farmer hands picking purple crocus blossoms at sunrise into a wicker basket",
        badge: "Stage 2: Hand Picking"
      },
      {
        step: "03",
        tag: "WORKSHOP · STIGMA EXTRACTION",
        title: "Extracting the Stigmas: Crimson Threads Separated",
        text: "Within hours of harvest, the baskets arrive in the shaded village atelier. Skilled hands open each purple flower and detach the three vivid crimson-red stigmas from the pale style. Only the deep scarlet portions are retained, guaranteeing clean, whole-thread purity.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Artisan hands separating scarlet saffron stigmas from purple crocus petals on a wooden table",
        badge: "Stage 3: Stigma Extraction"
      },
      {
        step: "04",
        tag: "VENTILATED MESH CURING",
        title: "Gentle Shaded Curing: Preserving Aroma and Color",
        text: "The freshly harvested stigmas are spread thinly across fine timber-framed mesh screens. Cured in a clean, shaded, well-ventilated room, gentle moisture loss concentrates precious crocin pigments and fragrant safranal without scorching the delicate plant tissues.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Fresh crimson saffron threads spread thinly on fine mesh drying screens in a shaded workshop",
        badge: "Stage 4: Mesh Curing"
      }
    ],
    galleryTitle: "Culinary & Craft Gallery",
    gallerySubtitle: "From whole whole threads to luminous amber infusions and golden banquet pilafs",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Whole Crimson Threads",
        description: "Natural flared trumpet tips and deep ruby hue, free from dust or added powder."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Protective Glass Cask",
        description: "Minimalist glass jar with a brushed gold lid to protect essential aromatic oils."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Luminous Amber Infusion",
        description: "Releasing brilliant golden-yellow ribbons into warm water as the aroma blossoms."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Traditional Golden Pilaf",
        description: "Distinct glistening grains infused with genuine saffron broth, garnished with almonds."
      }
    ],
    productButton: "Discover the Saffron",
    qualityButton: "Quality Standards",
    homeLink: "Return to Home",
    navLabel: "Harvest Chronicle"
  },
  ru: {
    metaTitle: "Хроника сбора шафрана в Маштаге | ROFRAN",
    metaDescription: "Визуальная хроника осеннего сбора шафрана в селении Маштага на Апшеронском полуострове: сбор на рассвете, ручное отделение рылец и бережная сушка на ситах.",
    eyebrow: "ВИЗУАЛЬНАЯ ХРОНИКА · МАШТАГА, БАКУ",
    title: "От рассветного поля до гастрономии: Хроника шафрана",
    subtitle: "От первых фиолетовых бутонов Crocus sativus в прохладном утреннем воздухе Апшерона до цельных рубиновых нитей, высушенных на традиционных ситах — каждый этап требует терпения и мастерства.",
    disclaimerBadge: "Предварительная хроника",
    disclaimerText: "Представленные кадры отражают традиционный технологический цикл сбора и сушки шафрана ROFRAN. Вскоре они будут дополнены живыми репортажными фотографиями с наших действующих полей.",
    stagesTitle: "Четыре этапа осеннего сбора",
    stagesSubtitle: "Сезонный календарь древнего селения Маштага на побережье Каспия",
    stages: [
      {
        step: "01",
        tag: "РАССВЕТ · ПОЛЯ МАШТАГИ",
        title: "Сбор на рассвете: Фиолетовое цветение на песчаной почве",
        text: "Шафран на Апшероне цветет поздней осенью — с конца октября по ноябрь. Сбор начинается на рассвете, пока солнце не прогрело воздух. Цветы необходимо собрать до полудня, чтобы лепестки не раскрылись полностью, сохранив драгоценные эфирные масла сафранала.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Поле шафрана на рассвете в селении Маштага с цветами Crocus sativus",
        badge: "Этап 1: Рассветный сбор"
      },
      {
        step: "02",
        tag: "РУЧНОЙ БЕРЕЖНЫЙ СБОР",
        title: "Забота чутких рук: Каждый цветок снимается бережно",
        text: "Сбор шафрана невозможно механизировать. Опытные сборщики аккуратно срывают каждый цветок у основания стебля, складывая их в плетеные корзины. Для получения каждого грамма требуется собрать сотни нежных бутонов.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Руки сборщика, бережно срывающие фиолетовый цветок крокуса на рассвете",
        badge: "Этап 2: Ручной сбор"
      },
      {
        step: "03",
        tag: "МАСТЕРСКАЯ · ОТДЕЛЕНИЕ РЫЛЕЦ",
        title: "Отделение алых рылец: Чистый рубиновый шафран",
        text: "В течение нескольких часов после сбора цветы доставляются в мастерскую. Из каждого бутона вручную извлекаются три ярко-красных рыльца, аккуратно отделяемые от светлого столбика. Только насыщенные красные нити отбираются для дальнейшей обработки.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Отделение красных нитей шафрана от фиолетовых лепестков за деревянным столом",
        badge: "Этап 3: Отделение рылец"
      },
      {
        step: "04",
        tag: "СУШКА В ТЕНИ НА СИТАХ",
        title: "Бережная сушка на сетках: Сохранение цвета и аромата",
        text: "Свежие нити тонким равномерным слоем выкладываются на мелкоячеистые деревянные сита в проветриваемом затененном помещении. Плавное испарение влаги концентрирует красящий кроцин и пряный аромат сафранала без перегрева растительных волокон.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Свежие алые нити шафрана, разложенные на традиционных ситах для сушки",
        badge: "Этап 4: Сушка на сетках"
      }
    ],
    galleryTitle: "Галерея кулинарии и ремесла",
    gallerySubtitle: "От цельных шафрановых нитей до янтарного настоя и праздничного плова",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Цельные рубиновые нити",
        description: "Характерная воронкообразная форма верхушек и глубокий насыщенный цвет без пыли."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Защитный стеклянный флакон",
        description: "Минималистичная баночка с золотистой крышкой для защиты ароматических масел."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Янтарный настой",
        description: "Плавное раскрытие теплого золотисто-оранжевого цвета в воде и богатого аромата."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Традиционный шафрановый плов",
        description: "Рассыпчатый длиннозерный рис, пропитанный шафрановым настоем, с миндалем и сухофруктами."
      }
    ],
    productButton: "Посмотреть шафран",
    qualityButton: "Стандарты качества",
    homeLink: "Вернуться на главную",
    navLabel: "Хроника сбора"
  },
  tr: {
    metaTitle: "Maştağa Safran Hasadı Güncesi | ROFRAN",
    metaDescription: "Bakü Maştağa köyünde sonbahar safran hasadı: şafak vakti Crocus sativus çiçeklerinin toplanması, tepeciklerin elle ayrılması ve geleneksel gölgede kurutma süreci.",
    eyebrow: "GÖRSEL GÜNCE · MAŞTAĞA, BAKÜ",
    title: "Şafak Vaktinden Sofraya: Safran Hasadının Canlı Güncesi",
    subtitle: "Abşeron'un serin sonbahar sabahında açan mor Crocus sativus tomurcuklarından saf yakut rengi tellerin ayrılmasına kadar her aşama sabır ve ustalık gerektirir.",
    disclaimerBadge: "Ön İzlenim Belgeseli",
    disclaimerText: "Bu görsel anlatım ROFRAN'ın geleneksel hasat döngüsünün editoryal bir temsilidir. Yakında tarlalarımızdan canlı saha çekimleri ve fotoğraflarla güncellenecektir.",
    stagesTitle: "Sonbahar Hasadının Dört Aşaması",
    stagesSubtitle: "Hazar kıyısındaki Maştağa köyünün asırlık tarım takvimi",
    stages: [
      {
        step: "01",
        tag: "ŞAFAK VAKTİ · MAŞTAĞA TARLALARI",
        title: "Şafak Vakti Hasat: Kumlu Toprakta Mor Uyanış",
        text: "Safran Abşeron'un kumlu bahçelerinde sonbaharın sonlarında, ekim ve kasım aylarında çiçek açar. Toplama şafak sökerken başlar; öğle güneşi çiçekleri tam açıp narin safranal aromalarını uçurmadan önce her çiçek derhal toplanmalıdır.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Maştağa'da şafak vakti safran tarlası ve mor Crocus sativus çiçekleri",
        badge: "1. Aşama: Şafak Hasadı"
      },
      {
        step: "02",
        tag: "ELLE ZARİF TOPLAMA",
        title: "Usta Ellerin Emeği: Çiçek Çiçek, İncelikle",
        text: "Safran hasadı makineyle yapılamaz. Deneyimli çiftçiler her çiçeği kökünden dikkatle koparır ve hasır sepetlere biriktirir. Tek bir gram safran için yüzlerce çiçeğin tek tek toplanması gerekir.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Çiftçinin mor safran çiçeklerini sepetine incelikle toplaması",
        badge: "2. Aşama: Elle Toplama"
      },
      {
        step: "03",
        tag: "ATÖLYE · TEPECİKLERİN AYRILMASI",
        title: "Kırmızı Tellerin Ayrılması: Saf Yakut Tepecikler",
        text: "Toplanan çiçekler birkaç saat içinde köy atölyesine getirilir. Her mor çiçeğin ortasındaki üç adet parlak kırmızı tepecik (stigma) sarı kısımdan özenle ayrılır; yalnızca en dolgun kırmızı kısımlar seçilir.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Ahşap masada mor çiçeklerden kırmızı safran tellerinin ayrılması",
        badge: "3. Aşama: Tel Ayrımı"
      },
      {
        step: "04",
        tag: "GÖLGEDE ELEKTE KURUTMA",
        title: "Geleneksel Elekte Kurutma: Aroma ve Rengin Korunması",
        text: "Ayrılan kırmızı teller havadar, doğrudan güneş almayan odalarda ahşap çerçeveli ince elekler üzerine serilir. Yavaş ve ılık kurutma, safranın krosin rengini ve safranal yağlarını tam olarak hapseder.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "İnce elekler üzerinde kurutulan taze kırmızı safran telleri",
        badge: "4. Aşama: Elekte Kurutma"
      }
    ],
    galleryTitle: "Mutfak ve Zanaat Galerisi",
    gallerySubtitle: "Bütün kırmızı tellerden kehribar demine ve geleneksel şah pilavına uzanan yolculuk",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Bütün Kırmızı Teller",
        description: "Doğal borazan uçlu tepecikler ve tozsuz, derin yakut rengi."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Koruyucu Cam Ambalaj",
        description: "Uçucu yağları hapseden altın kapaklı minimalist cam kavanoz."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Kehribar Rengi Demleme",
        description: "Ilık suda ağır ağır açılan altın-turuncu renk ve etrafa yayılan asil koku."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Geleneksel Safranlı Pilav",
        description: "Safran şerbetiyle demlenen, badem ve kayısıyla süslenmiş dane dane aş."
      }
    ],
    productButton: "Safranı İnceleyin",
    qualityButton: "Kalite Standartlarımız",
    homeLink: "Ana Sayfaya Dön",
    navLabel: "Hasat Güncesi"
  },
  de: {
    metaTitle: "Safranernte-Chronik aus Maschtaga | ROFRAN",
    metaDescription: "Visuelle Dokumentation der herbstlichen Safranernte in Maschtaga (Apscheron, Baku): Morgenlese von Crocus sativus, Handzupfen der Narben und schonende Siebtrocknung.",
    eyebrow: "VISUELLE CHRONIK · MASCHTAGA, BAKU",
    title: "Vom Morgengrauen zur Gaumenfreude: Die Safran-Chronik",
    subtitle: "Vom Öffnen der violetten Krokusblüten in der kühlen Apscheron-Morgenbrise bis hin zu den getrockneten tiefroten Fäden erfordert jede Etappe Geduld und meisterhafte Sorgfalt.",
    disclaimerBadge: "Visuelle Dokumentation",
    disclaimerText: "Diese Aufnahmen spiegeln den traditionellen Ernte- und Veredelungszyklus von ROFRAN wider. Sie werden bald durch aktuelle Fotoreportagen aus der laufenden Saison ergänzt.",
    stagesTitle: "Vier Stufen der herbstlichen Lese",
    stagesSubtitle: "Der überlieferte Erntezyklus im kaspischen Dorf Maschtaga",
    stages: [
      {
        step: "01",
        tag: "MORGENGRAUEN · FELDER VON MASCHTAGA",
        title: "Die Lese im Morgengrauen: Violettes Erwachen auf Sandboden",
        text: "Auf den sandigen Böden Apscherons blüht der Safran im Spätherbst zwischen Ende Oktober und November. Die Pflücker beginnen vor Sonnenaufgang, um die geschlossenen Blüten zu ernten, bevor die Mittagssonne die empfindlichen Safranal-Aromen verflüchtigt.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Safranfeld im Morgengrauen im Dorf Maschtaga mit violetten Krokusblüten",
        badge: "Stufe 1: Morgenlese"
      },
      {
        step: "02",
        tag: "SCHONENDE HANDARBEIT",
        title: "Behutsame Hände: Blüte für Blüte von Hand",
        text: "Die Safranernte lässt sich nicht mechanisieren. Erfahrene Bauern zupfen jede Blüte behutsam an der Stängelbasis ab und sammeln sie in geflochtenen Weidenkörben, um die zarten Narben unbeschädigt zu lassen.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Bäuerliche Hände ernten Krokusblüten in einen geflochtenen Korb",
        badge: "Stufe 2: Handernte"
      },
      {
        step: "03",
        tag: "WERKSTATT · NARBEN-TRENNUNG",
        title: "Auslesen der Narben: Reines Karminrot",
        text: "Binnen weniger Stunden nach der Lese werden die Blüten in die Werkstatt gebracht. Aus jedem Kelch trennen geübte Finger die drei tiefroten Narbenschenkel vom hellgelben Griffel. Nur makellose rote Fäden werden behalten.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Zupfen der roten Safrannarben aus violetten Blüten am Holztisch",
        badge: "Stufe 3: Narbentrennung"
      },
      {
        step: "04",
        tag: "SCHATTENTROCKNUNG AUF NETZEN",
        title: "Schonende Siebtrocknung: Vollendung von Aroma und Farbe",
        text: "Die frischen Fäden werden hauchdünn auf feinmaschigen Holzrahmen in einem schattigen, gut gelüfteten Raum ausgelegt. Die sanfte Trocknung konzentriert die Crocin-Farbstoffe und das ätherische Safranal.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Frische rote Safranfäden auf traditionellen Trockensieben",
        badge: "Stufe 4: Siebtrocknung"
      }
    ],
    galleryTitle: "Kulinarik- & Manufaktur-Galerie",
    gallerySubtitle: "Von ganzen Fäden über bernsteinfarbene Aufgüsse bis zum traditionellen Festtagsreis",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Ganze karminrote Fäden",
        description: "Natürliche kelchförmige Enden und tiefes Rubinrot ohne Zusätze oder Pulver."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Aromaschutz im Glas",
        description: "Minimalistisches Glas mit Goldverschluss zum Schutz der feinen ätherischen Öle."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Bernsteinfarbener Aufguss",
        description: "Langsames Verströmen sonnengelber Farbstreifen in warmem Wasser mit vollem Duft."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Traditioneller Safran-Pilaw",
        description: "Körniger Langkornreis mit echtem Safranfond, Mandelsplittern und Trockenfrüchten."
      }
    ],
    productButton: "Safran entdecken",
    qualityButton: "Qualitätsstandards",
    homeLink: "Zurück zur Startseite",
    navLabel: "Ernte-Chronik"
  },
  fr: {
    metaTitle: "Chronique de la récolte de safran à Machtaga | ROFRAN",
    metaDescription: "Chronique visuelle de la récolte automnale du safran à Machtaga (péninsule d'Abchéron, Bakou) : cueillette à l'aube, émondage manuel et séchage sur tamis.",
    eyebrow: "CHRONIQUE VISUELLE · MACHTAGA, BAKOU",
    title: "De l’aube à la table gastronomique : La chronique du safran",
    subtitle: "De l’éclosion des corolles mauves dans la brise d’Abchéron jusqu’aux stigmates écarlates séchés à l’ombre, chaque geste célèbre un savoir-faire millénaire.",
    disclaimerBadge: "Aperçu documentaire",
    disclaimerText: "Ces photographies illustrent le cycle traditionnel de récolte de ROFRAN. Elles seront prochainement complétées par les clichés en direct de notre campagne automnale.",
    stagesTitle: "Quatre temps forts de la cueillette",
    stagesSubtitle: "Le calendrier agricole ancestral du village de Machtaga sur la mer Caspienne",
    stages: [
      {
        step: "01",
        tag: "L'AUBE · CHAMPS DE MACHTAGA",
        title: "Cueillette à l'aurore : Réveil mauve sur la terre sablonneuse",
        text: "Le safran s'épanouit sur la péninsule d'Abchéron à la fin de l'automne, entre fin octobre et novembre. Les cueilleurs parcourent les rangs dès l'aube avant que la tiédeur du jour n'ouvre les fleurs et n'altère le précieux safranal.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Champ de safran à l'aube à Machtaga avec fleurs de Crocus sativus",
        badge: "Étape 1 : Cueillette à l'aube"
      },
      {
        step: "02",
        tag: "RÉCOLTE MANUELLE PRÉCIEUSE",
        title: "La délicatesse du geste : Fleur par fleur sans meurtrissure",
        text: "La récolte du safran ne tolère aucune mécanisation. Les villageois détachent chaque fleur avec précaution à la base de la tige pour la déposer dans des corbeilles d'osier tressé.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Mains d'agriculteur cueillant délicatement une fleur de crocus au lever du soleil",
        badge: "Étape 2 : Cueillette à la main"
      },
      {
        step: "03",
        tag: "ATELIER · ÉMONDAGE DES STIGMATES",
        title: "L'émondage minutieux : Extraction des trois filaments pourpres",
        text: "Rapportées à l'atelier quelques heures après la cueillette, les fleurs sont émondées à la main. Les trois stigmates pourpres sont délicatement séparés du style jaune avec une infinie minutie.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Émondage des pistils rouges de safran sur une table en bois",
        badge: "Étape 3 : Émondage"
      },
      {
        step: "04",
        tag: "SÉCHAGE TRADITIONNEL SUR TAMIS",
        title: "Séchage ombragé : Fixation des arômes et du pouvoir tinctorial",
        text: "Les filaments sont étalés en couche mince sur des tamis fins en bois dans une pièce aérée et abritée de la lumière directe, concentrant la crocine et les huiles essentielles sans altérer leur finesse.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Stigmates de safran rouge étalés sur un tamis de séchage en atelier",
        badge: "Étape 4 : Séchage sur tamis"
      }
    ],
    galleryTitle: "Galerie culinaire & savoir-faire",
    gallerySubtitle: "Des filaments pourpres entiers à l'infusion mordorée et au pilaf de cérémonie",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Filaments écarlates entiers",
        description: "Extrémités en cornet naturelles et couleur rubis profond, sans aucune brisure."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Écrin de verre protecteur",
        description: "Flacon en verre pur avec opercule doré préservant la fraîcheur des essences."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Infusion mordorée lumineuse",
        description: "Diffusion lente d'élégants rubans jaune-or et ambrés libérant un parfum envoûtant."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Riz pilaf d'apparat au safran",
        description: "Grains égouttés nacrés d'or, agrémentés d'amandes effilées et d'abricots secs."
      }
    ],
    productButton: "Découvrir le safran",
    qualityButton: "Nos exigences de qualité",
    homeLink: "Retour à l'accueil",
    navLabel: "Chronique de récolte"
  },
  es: {
    metaTitle: "Crónica de la cosecha de azafrán en Mashtaga | ROFRAN",
    metaDescription: "Crónica visual de la recolección otoñal del azafrán en Mashtaga (península de Absheron, Bakú): cosecha al alba, monda manual de las hebras y secado tradicional en cedazos.",
    eyebrow: "CRÓNICA VISUAL · MASHTAGA, BAKÚ",
    title: "Del amanecer en el campo a la alta cocina: La crónica del azafrán",
    subtitle: "Desde la apertura de las flores moradas de Crocus sativus en la fresca brisa marina hasta las hebras carmesí secadas a la sombra, cada paso exige paciencia y devoción artesanal.",
    disclaimerBadge: "Avance documental",
    disclaimerText: "Estas imágenes plasman el ciclo de recolección y desbriznado de ROFRAN. Se verán enriquecidas con instantáneas directas tomadas durante nuestra presente campaña de campo.",
    stagesTitle: "Las cuatro etapas de la cosecha otoñal",
    stagesSubtitle: "El ritmo agrícola tradicional de la aldea de Mashtaga a orillas del Caspio",
    stages: [
      {
        step: "01",
        tag: "EL ALBA · CAMPOS DE MASHTAGA",
        title: "Cosecha al alba: Despertar morado en la arena fértil",
        text: "El azafrán florece en Absheron a finales de otoño, entre finales de octubre y noviembre. La recogida comienza al clarear el día, recolectando cada capullo antes de que el calor del mediodía abra los pétalos y disipe los aromas del safranal.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Campo de azafrán al amanecer en Mashtaga con flores moradas de Crocus sativus",
        badge: "Etapa 1: Cosecha al alba"
      },
      {
        step: "02",
        tag: "RECOLECCIÓN MANUAL DELICADA",
        title: "Manos expertas en acción: Flor a flor sin dañarlas",
        text: "La cosecha del azafrán no admite máquinas. Los campesinos cortan cada flor con ternura por la base del tallo y las depositan en canastos de mimbre para mantener su lozanía hasta el taller.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Manos recolectando flores moradas de azafrán al amanecer",
        badge: "Etapa 2: Monda manual"
      },
      {
        step: "03",
        tag: "EL TALLER · DESBRIZNADO",
        title: "Desbriznado de las hebras: La separación del rubí puro",
        text: "Pocas horas tras la recogida, las flores llegan a las mesas del obrador. Manos artesanas separan los tres estigmas rojos vivos del estilo amarillento, seleccionando únicamente las hebras de carmesí puro.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Separación de las hebras rojas de azafrán en una mesa de madera",
        badge: "Etapa 3: Separación"
      },
      {
        step: "04",
        tag: "SECADO EN CEDAZOS A LA SOMBRA",
        title: "Secado en malla tradicional: Preservación de aroma y color",
        text: "Las hebras se extienden en una capa fina sobre bastidores de malla fina en una estancia ventilada y umbría. Este templado secado fija el colorante crocina y preserva los aceites aromáticos.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Hebras rojas de azafrán extendidas en bastidores de secado",
        badge: "Etapa 4: Secado en cedazos"
      }
    ],
    galleryTitle: "Galería de gastronomía y oficio",
    gallerySubtitle: "De las hebras enteras a la infusión ambarina y los grandes arroces festivos",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Hebras enteras de carmesí vivo",
        description: "Puntas acampanadas naturales y tono rubí sin polvo ni hebras rotas."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Frasco de cristal protector",
        description: "Envase hermético con tapa dorada para conservar intactos los aceites esenciales."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Infusión ámbar radiante",
        description: "Hilos que tiñen el agua tibia con destellos dorados y sufragios aromáticos sublimes."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Arroz ceremonial con azafrán",
        description: "Granos sueltos empapados en azafrán auténtico, almendras tostadas y fruta seca."
      }
    ],
    productButton: "Descubrir el azafrán",
    qualityButton: "Criterios de calidad",
    homeLink: "Volver al inicio",
    navLabel: "Crónica de cosecha"
  },
  it: {
    metaTitle: "Cronaca del raccolto dello zafferano a Mashtaga | ROFRAN",
    metaDescription: "Cronaca fotografica della raccolta autunnale dello zafferano a Mashtaga (penisola di Absheron, Baku): raccolta all'alba, mondatura manuale dei pistilli ed essiccazione su telai.",
    eyebrow: "CRONACA VISIVA · MASHTAGA, BAKU",
    title: "Dall'alba sui campi alla cucina d'autore: La cronaca dello zafferano",
    subtitle: "Dallo sbocciare dei petali violacei di Crocus sativus nella fresca brezza caspica fino agli stimmi scarlatti essiccati all'ombra, ogni passaggio è un inno alla pazienza artigianale.",
    disclaimerBadge: "Anteprima documentaria",
    disclaimerText: "Queste fotografie illustrano il ciclo di raccolta e mondatura di ROFRAN. Saranno presto affiancate da scatti diretti realizzati durante l'attuale stagione nei nostri campi.",
    stagesTitle: "Le quattro fasi del raccolto autunnale",
    stagesSubtitle: "L'antico calendario agricolo del borgo di Mashtaga sulla riva del mar Caspio",
    stages: [
      {
        step: "01",
        tag: "L'ALBA · CAMPI DI MASHTAGA",
        title: "Raccolta alle prime luci: Il risveglio viola sulla sabbia fertile",
        text: "Lo zafferano fiorisce ad Absheron nel tardo autunno, tra fine ottobre e novembre. I raccoglitori arrivano all'alba, prima che il calore del giorno dischiuda i petali e disperda il profumo del prezioso safranale.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Campo di zafferano all'alba a Mashtaga con fiori viola di Crocus sativus",
        badge: "Fase 1: Raccolta all'alba"
      },
      {
        step: "02",
        tag: "MONDA MANUALE DELICATA",
        title: "Mani pazienti e sapienti: Fiore per fiore senza spezzarlo",
        text: "La raccolta non può essere affidata alle macchine. I contadini recidono ogni stelo con grazia e ripongono i fiori in ceste di vimini intrecciate per preservarne l'integrità.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Mani del contadino che colgono i fiori di croco all'alba in una cesta",
        badge: "Fase 2: Raccolta a mano"
      },
      {
        step: "03",
        tag: "IL LABORATORIO · SEPARAZIONE DEGLI STIMMI",
        title: "La sfogliatura dei pistilli: Il rosso vivo separato dal calice",
        text: "Poche ore dopo il raccolto, i fiori giungono sui banchi del laboratorio. Le dita separano con perizia i tre stimmi rosso rubino dal filamento giallastro, trattenendo solo la parte più pura.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Separazione degli stimmi rossi di zafferano dai petali viola su un tavolo",
        badge: "Fase 3: Separazione"
      },
      {
        step: "04",
        tag: "ESSICCAZIONE SU TELAI ALL'OMBRA",
        title: "Lenta essiccazione su stuoie: Il sigillo di aromi e sfumature",
        text: "Gli stimmi sono stesi in strato sottile su telai di fine rete in un ambiente ventilato e riparato dal sole. L'essiccazione delicata custodisce la crocina e gli oli essenziali.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Stimmi scarlatti di zafferano stesi su reti di essiccazione in legno",
        badge: "Fase 4: Essiccazione su telai"
      }
    ],
    galleryTitle: "Galleria del gusto e del mestiere",
    gallerySubtitle: "Dagli stimmi integri all'infusione dorata e ai risotti della tradizione",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Stimmi scarlatti integri",
        description: "Estremità a trombetta naturali e colore rubino uniforme, privo di polveri."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Vasetto in vetro protettivo",
        description: "Design pulito con capsula dorata per conservare integri i composti aromatici."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Infusione ambrata brillante",
        description: "Rilascio lento di volute giallo-oro che inebriano l'acqua con profumo sontuoso."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Pilaf regale allo zafferano",
        description: "Chicchi sgranati tinti dall'infuso puro di zafferano, mandorle e frutti secchi."
      }
    ],
    productButton: "Scopri lo zafferano",
    qualityButton: "Standard di purezza",
    homeLink: "Torna alla home",
    navLabel: "Cronaca del raccolto"
  },
  nl: {
    metaTitle: "Saffraanoogst Kroniek uit Masjtaga | ROFRAN",
    metaDescription: "Visuele kroniek van de najaarsoogst van saffraan in Masjtaga (Absjeron, Bakoe): ochtendoogst van Crocus sativus, handmatige draadselectie en drogen op gazen.",
    eyebrow: "VISUELE KRONIEK · MASJTAGA, BAKOE",
    title: "Van ochtenddauw tot keukentafel: De saffraankroniek",
    subtitle: "Van het ontluiken van paarse krokussen in de koele Absjeron-wind tot de geurige karmijnrode saffraandraadjes: elke stap ademt toewijding en meesterschap.",
    disclaimerBadge: "Documentaire impressie",
    disclaimerText: "Deze beelden vatten de ambachtelijke oogstcyclus van ROFRAN samen. Ze worden binnenkort aangevuld met actuele fotografie rechtstreeks vanuit onze velden.",
    stagesTitle: "Vier stappen van de herfstoogst",
    stagesSubtitle: "Het overgeleverde landbouwritme van het dorp Masjtaga aan de Kaspische Zee",
    stages: [
      {
        step: "01",
        tag: "DAGERAAD · DE VELDEN VAN MASJTAGA",
        title: "Oogst bij zonsopgang: Paars ontwaken op de zandgrond",
        text: "Saffraan bloeit op Absjeron in het late najaar, van eind oktober tot november. De plukkers beginnen bij de eerste ochtendgloed, vóórdat de zon de bloemen opent en de vluchtige saffranaalaroma's vervliegen.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Saffraanveld bij ochtendgloren in Masjtaga met paarse Crocus sativus bloemen",
        badge: "Fase 1: Ochtendpluk"
      },
      {
        step: "02",
        tag: "AMBACHTELIJKE HANDPLUK",
        title: "Zorgzame handen aan het werk: Bloem voor bloem geplukt",
        text: "Saffraan kan niet machinaal geoogst worden. Ervaren dorpsbewoners knikken elke bloem voorzichtig bij de stengelbasis af en verzamelen ze in geweven wilgenmanden.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Handen van een teler die paarse krokusbloemen plukken in een mand",
        badge: "Fase 2: Handpluk"
      },
      {
        step: "03",
        tag: "ATELIER · STIGMA-SCHEIDING",
        title: "Splitsen van de stempels: Zuiver dieprode draden",
        text: "Kort na de pluk arriveren de manden in het atelier. Behendige vingers scheiden de drie dieprode stempels zorgvuldig van de bleke stijl; enkel het puurste rood wordt behouden.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Rode saffraanstempels scheiden van paarse bloemblaadjes op een houten tafel",
        badge: "Fase 3: Draadselectie"
      },
      {
        step: "04",
        tag: "SCHADUWDROGEN OP GAZELIJSTEN",
        title: "Behoedzaam drogen: Vergrendeling van geur en kleur",
        text: "De verse draden worden in een dunne laag uitgespreid op fijnmazige houten kaders in een tochtige, schaduwrijke kamer. Deze rustige droging concentreert de crocine en essentiële oliën.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Verse rode saffraandraden uitgespreid op traditionele droogramen",
        badge: "Fase 4: Drogen op gaas"
      }
    ],
    galleryTitle: "Culinair & Ambachtsgalerij",
    gallerySubtitle: "Van intacte draden naar goudamberkleurige infusies en feestelijke rijstgerechten",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Intacte karmijnrode draden",
        description: "Natuurlijke trechtervormige uiteinden en een diepe robijnrode gloed zonder gruis."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Beschermend glazen potje",
        description: "Minimalistisch glas met gouden sluiting om de vluchtige aroma's te bewaren."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Stralend amber aftreksel",
        description: "Warme slierten van goudoranje die langzaam in het water oplossen met volle geur."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Traditionele saffraanpilav",
        description: "Luchtige rijstkorrels goudkleurig doordrenkt met saffraanbouillon en amandelen."
      }
    ],
    productButton: "Ontdek de saffraan",
    qualityButton: "Kwaliteitsnormen",
    homeLink: "Terug naar startpagina",
    navLabel: "Oogstkroniek"
  },
  pl: {
    metaTitle: "Kronika zbiorów szafranu w Masztadze | ROFRAN",
    metaDescription: "Wizualna kronika jesiennych zbiorów szafranu w Masztadze (Półwysep Apszeroński, Baku): zbiór o świcie, ręczne rozdzielanie znamion i suszenie na sitach.",
    eyebrow: "KRONIKA WIZUALNA · MASZTAGA, BAKU",
    title: "Od świtu na polu do kulinarnego kunsztu: Kronika szafranu",
    subtitle: "Od pierwszych fioletowych kwiatów Crocus sativus w chłodnym porannym wietrze aż po rubinowe nitki wysuszone na tradycyjnych ramach — każdy etap wymaga cierpliwości i kunsztu.",
    disclaimerBadge: "Zapowiedź dokumentalna",
    disclaimerText: "Zdjęcia przedstawiają tradycyjny cykl zbioru i suszenia szafranu ROFRAN. Zostaną wkrótce uzupełnione o bezpośrednie ujęcia reportażowe z naszych pól.",
    stagesTitle: "Cztery etapy jesiennego zbioru",
    stagesSubtitle: "Odwieczny rytm rolniczy wsi Masztaga nad brzegiem Morza Kaspijskiego",
    stages: [
      {
        step: "01",
        tag: "ŚWIT · POLA W MASZTAGDZE",
        title: "Zbiór o brzasku: Fioletowe kwiaty na piaszczystej glebie",
        text: "Szafran na Apszeronie zakwita późną jesienią, od końca października do listopada. Zbieracze wychodzą w pole o świcie, zanim południowe słońce w pełni otworzy kielichy i ulotni cenny safranal.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Pole szafranu o świcie w Masztadze z fioletowymi kwiatami Crocus sativus",
        badge: "Etap 1: Zbiór o świcie"
      },
      {
        step: "02",
        tag: "DELIKATNY ZBIÓR RĘCZNY",
        title: "Czuły dotyk dłoni: Kwiat po kwiatku bez pośpiechu",
        text: "Zbioru szafranu nie da się zmechanizować. Doświadczeni rolnicy delikatnie zrywają każdy kwiat u nasady łodygi i składają w wyplatanych wiklinowych koszach.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Dłonie zbierające fioletowe kwiaty szafranu o wschodzie słońca",
        badge: "Etap 2: Zbiór ręczny"
      },
      {
        step: "03",
        tag: "WARSZTAT · ODDZIELANIE ZNAMION",
        title: "Wydobywanie szkarłatnych nitek: Czysty rubinowy szafran",
        text: "W ciągu paru godzin od zebrania kwiaty trafiają do wiejskiego warsztatu. Wprawne dłonie oddzielają trzy purpurowe znamiona od żółtej szyjki słupka, zachowując wyłącznie najczystsze nitki.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Oddzielanie czerwonych nitek szafranu od fioletowych płatków przy stole",
        badge: "Etap 3: Oddzielanie nitek"
      },
      {
        step: "04",
        tag: "SUSZENIE W CIENIU NA SITACH",
        title: "Tradycyjne suszenie na ramach: Utrwalenie barwy i aromatu",
        text: "Świeże nitki rozkłada się cienką warstwą na drewnianych ramach z drobną siatką w przewiewnym, zacienionym pomieszczeniu, co pozwala skoncentrować barwiącą krocinę i cenne olejki.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Świeże szkarłatne nitki szafranu suszące się na tradycyjnych ramach",
        badge: "Etap 4: Suszenie na sitach"
      }
    ],
    galleryTitle: "Galeria kulinariów i rzemiosła",
    gallerySubtitle: "Od całych nitek po bursztynowy napar i uroczysty pilaw z szafranem",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Całe szkarłatne nitki",
        description: "Naturalnie rozszerzone kielichowate końcówki i głęboka rubinowa barwa bez pyłu."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Ochronny szklany słoiczek",
        description: "Minimalistyczny słój ze złotą nakrętką chroniący cenne olejki eteryczne."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Bursztynowy świetlisty napar",
        description: "Stopniowe uwalnianie złocisto-pomarańczowych pasm barwy i bogatego zapachu w wodzie."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Tradycyjny pilaw z szafranem",
        description: "Sypki ryż nasycony naturalnym wyciągiem z szafranu, migdałami i suszonymi owocami."
      }
    ],
    productButton: "Poznaj szafran",
    qualityButton: "Standardy jakości",
    homeLink: "Powrót do strony głównej",
    navLabel: "Kronika zbiorów"
  },
  pt: {
    metaTitle: "Crónica da Colheita de Açafrão em Mashtaga | ROFRAN",
    metaDescription: "Crónica visual da colheita outonal de açafrão em Mashtaga (península de Absheron, Baku): apanha de Crocus sativus ao amanhecer, monda manual e secagem em crivos.",
    eyebrow: "CRÓNICA VISUAL · MASHTAGA, BAKU",
    title: "Da alvorada no campo à mesa farta: A crónica do açafrão",
    subtitle: "Do desabrochar das flores roxas de Crocus sativus na brisa de Absheron até aos estigmas rubis secos à sombra, cada gesto traduz séculos de paciência e rigor.",
    disclaimerBadge: "Antevisão documental",
    disclaimerText: "Estas fotografias retratam as etapas artesanais de apanha e cura da ROFRAN. Serão em breve enriquecidas com reportagens fotográficas diretas das nossas colheitas em curso.",
    stagesTitle: "Quatro momentos da colheita de outono",
    stagesSubtitle: "O ritmo agrícola ancestral da aldeia de Mashtaga à beira do Cáspio",
    stages: [
      {
        step: "01",
        tag: "AO AMANHECER · CAMPOS DE MASHTAGA",
        title: "Apanha na alvorada: O despertar roxo no solo arenoso",
        text: "O açafrão floresce em Absheron no final do outono, de finais de outubro a novembro. Os colhedores iniciam o trabalho ao clarear do dia, colhendo cada flor antes que o sol abra as corolas e evapore o safranal.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Campo de açafrão ao amanhecer em Mashtaga com flores de Crocus sativus",
        badge: "Etapa 1: Apanha na alvorada"
      },
      {
        step: "02",
        tag: "COLHEITA MANUAL DELICADA",
        title: "Mãos atentas e suaves: Flor a flor sem quebrar",
        text: "A colheita do açafrão é puramente manual. Os agricultores colhem cada flor com cuidado pela base do caule e colocam-na em cestos de vime para não ferir os estigmas.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Mãos do agricultor apanhando flores roxas de açafrão ao nascer do sol",
        badge: "Etapa 2: Apanha manual"
      },
      {
        step: "03",
        tag: "OFICINA · MONDA DOS ESTIGMAS",
        title: "A monda dos estigmas: Separação do carmesim genuíno",
        text: "Poucas horas após a apanha, as flores chegam à oficina. Mãos experientes separam os três filamentos escarlates do estilete amarelo, preservando apenas as pontas mais puras e intensas.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Separação dos estigmas vermelhos de açafrão das pétalas roxas",
        badge: "Etapa 3: Monda dos estigmas"
      },
      {
        step: "04",
        tag: "SECAGEM À SOMBRA EM CRIVOS",
        title: "Secagem em telas tradicionais: Selagem de aroma e cor",
        text: "Os filamentos frescos são estendidos em camada fina sobre telas de madeira num espaço arejado e sombreado. Esta secagem serena preserva os compostos de crocina e óleos aromáticos.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Fios vermelhos de açafrão estendidos em telas finas de secagem",
        badge: "Etapa 4: Secagem em telas"
      }
    ],
    galleryTitle: "Galeria de gastronomia e ofício",
    gallerySubtitle: "Dos estigmas inteiros à infusão âmbar e aos grandes arrozes tradicionais",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Fios carmesins inteiros",
        description: "Extremidades em trombeta naturais e tom rubi profundo sem quebras ou poeiras."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Frasco de vidro protetor",
        description: "Frasco translúcido com tampa dourada que resguarda os óleos aromáticos voláteis."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Infusão âmbar radiante",
        description: "Libertação gradual de tons dourados e alaranjados na água morna com perfume nobre."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Arroz de açafrão cerimonial",
        description: "Grãos soltos e brilhantes tingidos pelo açafrão puro, com amêndoas e damascos."
      }
    ],
    productButton: "Descobrir o açafrão",
    qualityButton: "Padrões de pureza",
    homeLink: "Voltar ao início",
    navLabel: "Crónica de colheita"
  },
  uk: {
    metaTitle: "Хроніка збору шафрану в Маштазі | ROFRAN",
    metaDescription: "Візуальна хроніка осіннього збору шафрану в селищі Маштага (Апшерон, Баку): світанковий збір Crocus sativus, ручне вилучення приймочок і сушіння на решетах.",
    eyebrow: "ВІЗУАЛЬНА ХРОНІКА · МАШТАГА, БАКУ",
    title: "Від світанку на полі до вишуканої кухні: Хроніка шафрану",
    subtitle: "Від розкриття фіолетових бутонів Crocus sativus у ранковій свіжості Апшерону до темно-рубінових ниток, висушених у затінку — кожен крок плекає багатовікову традицію.",
    disclaimerBadge: "Попередній документальний огляд",
    disclaimerText: "Ці світлини відтворюють традиційний виробничий цикл ROFRAN. Незабаром вони поповняться живими репортажними фотографіями безпосередньо з наших полів.",
    stagesTitle: "Чотири етапи осіннього збору",
    stagesSubtitle: "Традиційний календар прадавнього селища Маштага на березі Каспію",
    stages: [
      {
        step: "01",
        tag: "СВІТАНОК · ПОЛЯ МАШТАГИ",
        title: "Збір на світанку: Фіолетове розмаїття на піщаному ґрунті",
        text: "Шафран на Апшероні розквітає пізньої осені — з кінця жовтня до листопада. Збирачі виходять на поле вдосвіта, поки полуденне сонце не розкрило пелюстки й не розвіяло ніжний аромат сафраналу.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Поле шафрану на світанку в Маштазі з фіолетовими квітами Crocus sativus",
        badge: "Етап 1: Світанковий збір"
      },
      {
        step: "02",
        tag: "ДБАЙЛИВИЙ РУЧНИЙ ЗБІР",
        title: "Турбота чуйних рук: Квітка за квіткою, обережно",
        text: "Збір шафрану неможливо механізувати. Досвідчені селяни зрізають кожну квітку біля самої основи стебла та складають у плетені кошики, оберігаючи тендітні нитки.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Руки господаря, що обережно зривають квіти крокусу в кошик",
        badge: "Етап 2: Ручний збір"
      },
      {
        step: "03",
        tag: "МАЙСТЕРНЯ · ВІДОКРЕМЛЕННЯ ПРИЙМОЧОК",
        title: "Відокремлення червоних ниток: Чистий рубіновий шафран",
        text: "Упродовж кількох годин після збору квіти потрапляють до майстерні. Вправні руки витягують три насичено-червоні приймочки з кожної квітки, відбираючи лише найкращі цільні нитки.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Відокремлення червоних ниток шафрану від фіолетових пелюсток",
        badge: "Етап 3: Вилучення ниток"
      },
      {
        step: "04",
        tag: "СУШІННЯ НА СІТКАХ У ЗАТІНКУ",
        title: "Лагідне сушіння на рамах: Збереження барви та аромату",
        text: "Свіжі нитки тонким шаром розкладають на дерев’яних решетах у добре провітрюваному затіненому приміщенні. Таке делікатне сушіння зберігає кроцин і цінні леткі олії.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Свіжі червоні нитки шафрану, розкладені на решетах для сушіння",
        badge: "Етап 4: Сушіння на решетах"
      }
    ],
    galleryTitle: "Галерея кулінарії та майстерності",
    gallerySubtitle: "Від цільних ниток до бурштинового настою та святкового плову",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Цільні багряні нитки",
        description: "Природні лійкоподібні кінчики та глибокий рубіновий колір без домішок."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Захисна скляна баночка",
        description: "Мінімалістичне скло з золотистою кришкою, що надійно береже ефірні олії."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Бурштиновий променистий настій",
        description: "Повільне розкриття золотаво-жовтогарячих смуг у теплій воді з багатим ароматом."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Традиційний шафрановий плов",
        description: "Розсипчастий рис, просочений чистим настоєм шафрану, з мигдалем і сухофруктами."
      }
    ],
    productButton: "Переглянути шафран",
    qualityButton: "Стандарти якості",
    homeLink: "На головну",
    navLabel: "Хроніка збору"
  },
  ka: {
    metaTitle: "ზაფრანის მოსავლის ქრონიკა მაშთაღაში | ROFRAN",
    metaDescription: "მაშთაღაში (აფშერონი, ბაქო) ზაფრანის შემოდგომის მოსავლის ვიზუალური ქრონიკა: დილის კრეფა, ძაფების ხელით გამოყოფა და ტრადიციული გაშრობა.",
    eyebrow: "ვიზუალური ქრონიკა · მაშთაღა, ბაქო",
    title: "აისიდან სადღესასწაულო სუფრამდე: ზაფრანის ქრონიკა",
    subtitle: "აფშერონის გრილ ნიავზე გაშლილი იისფერი Crocus sativus-ის ყვავილებიდან ჩრდილში სათუთად გამომშრალ მუქ წითელ ძაფებამდე ყოველი ეტაპი ოსტატობას ითხოვს.",
    disclaimerBadge: "ვიზუალური მიმოხილვა",
    disclaimerText: "ეს კადრები ასახავს ROFRAN-ის ტრადიციულ მოსავლის ციკლს. უახლოეს ხანში გვერდი შეივსება უშუალოდ ჩვენი მიმდინარე სეზონის საველე ფოტოებით.",
    stagesTitle: "შემოდგომის მოსავლის ოთხი ეტაპი",
    stagesSubtitle: "კასპიისპირა სოფელ მაშთაღას საუკუნოვანი აგრარული კალენდარი",
    stages: [
      {
        step: "01",
        tag: "აისი · მაშთაღას ველები",
        title: "დილის კრეფა: იისფერი გამოღვიძება ქვიშიან ნიადაგზე",
        text: "აფშერონზე ზაფრანა გვიან შემოდგომაზე, ოქტომბრის მიწურულიდან ნოემბრამდე ყვავის. კრეფა გამთენიისას იწყება, სანამ შუადღის მზე ყვავილებს სრულად გადაშლის და არომატულ საფრანალს გააფრქვევს.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "ზაფრანის მინდორი აისისას მაშთაღაში Crocus sativus-ის ყვავილებით",
        badge: "ეტაპი 1: დილის კრეფა"
      },
      {
        step: "02",
        tag: "სათუთი ხელით კრეფა",
        title: "გულმოდგინე ხელების შრომა: თითოეული ყვავილი სათუთად",
        text: "ზაფრანის კრეფა მექანიზაციას არ ექვემდებარება. გამოცდილი მესაქმეები ყოველ ყვავილს ფრთხილად კრეფენ და დაწნულ კალათებში ათავსებენ ძაფების დასაცავად.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "მესაქმის ხელები, რომლებიც მზის ამოსვლისას კრეფენ კროკუსის ყვავილებს",
        badge: "ეტაპი 2: ხელით კრეფა"
      },
      {
        step: "03",
        tag: "სახელოსნო · ძაფების გამოყოფა",
        title: "მეწამული დინგების გამოყოფა: სუფთა ლალისფერი ძაფები",
        text: "მოკრეფიდან რამდენიმე საათში ყვავილები სახელოსნოში მიაქვთ. თითოეული იისფერი გვირგვინიდან ხელით გამოიყოფა სამი ალისფერი დინგი ყვითელი სვეტოსგან.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "ხის მაგიდაზე ყვავილებიდან წითელი ზაფრანის ძაფების გამოყოფა",
        badge: "ეტაპი 3: დინგების გამოყოფა"
      },
      {
        step: "04",
        tag: "ჩრდილში ბადეზე გაშრობა",
        title: "ბადეზე დინჯი გაშრობა: ფერისა და სურნელის შენარჩუნება",
        text: "ახლად გამოყოფილი ძაფები თხელ ფენად იფინება ხის ჩარჩოიან წვრილ ბადეებზე კარგად განიავებულ ჩრდილიან ოთახში, რაც კროცინსა და ეთერზეთებს სრულად ინარჩუნებს.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "წითელი ზაფრანის ძაფები გაშლილი საშრობ ბადეებზე",
        badge: "ეტაპი 4: ბადეზე გაშრობა"
      }
    ],
    galleryTitle: "კულინარიისა და ხელოსნობის გალერეა",
    gallerySubtitle: "მთლიანი წითელი ძაფებიდან ქარვისფერ ნაყენამდე და ტრადიციულ ფლავამდე",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "მთლიანი ალისფერი ძაფები",
        description: "ბუნებრივი მილისებრი ბოლოები და ღრმა ლალისფერი შეფერილობა მტვრის გარეშე."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "დამცავი მინის ქილა",
        description: "მინიმალისტური მინის ჭურჭელი ოქროსფერი თავსახურით არომატის დასაცავად."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "მანათობელი ქარვისფერი ნაყენი",
        description: "თბილ წყალში ოქროსფერ-ნარინჯისფერი ტალღების დინჯი გახსნა სურნელოვანი არომატით."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "ტრადიციული ზაფრანიანი ფლავი",
        description: "ფანტ-ფანტ მოხარშული ბრინჯი ზაფრანის ნაყენით, ნუშითა და გარგარის ჩირით."
      }
    ],
    productButton: "ზაფრანის ნახვა",
    qualityButton: "ხარისხის სტანდარტები",
    homeLink: "მთავარ გვერდზე დაბრუნება",
    navLabel: "მოსავლის ქრონიკა"
  },
  ar: {
    metaTitle: "سجل حصاد الزعفران في ماشتاغا | ROFRAN",
    metaDescription: "توثيق بصري لموسم حصاد الزعفران في قرية ماشتاغا بشبه جزيرة أبشيرون (باكو): القطف عند الفجر، فرز الخيوط القرمزية يدوياً والتجفيف التراثي في الظل.",
    eyebrow: "سجل بصري · ماشتاغا، باكو",
    title: "من إشراقة الفجر إلى مائدة الذواقة: سجل الزعفران الحقيقي",
    subtitle: "من تفتح بتلات زهور الزعفران البنفسجية في نسمات الصباح الباكرة إلى خيوط المياسم القرمزية النقية، تجسد كل خطوة صبراً وحرفة أصيلة تناقلتها الأجيال.",
    disclaimerBadge: "معاينة بصرية وثائقية",
    disclaimerText: "توضح هذه الصور المراحل الأصيلة لقطف وتجفيف زعفران ROFRAN. وسيتم إثراؤها قريباً بمشاهد حية وصور ميدانية ملتقطة مباشرة من حقولنا خلال الموسم الحالي.",
    stagesTitle: "مراحل الحصاد الخريفي الأربع",
    stagesSubtitle: "التقويم الزراعي المتوارث في قرية ماشتاغا العريقة على ضفاف بحر قزوين",
    stages: [
      {
        step: "01",
        tag: "عند الفجر · حقول ماشتاغا",
        title: "قطاف الفجر: تفتح البنفسج فوق التربة الرملية",
        text: "يزهر الزعفران في أبشيرون أواخر الخريف بين أواخر أكتوبر ونوفمبر. ينطلق الحصاد عند بزوغ الفجر ليتم قطف الزهور قبل أن تشتد حرارة النهار فتفتح البتلات كاملة وتتبدد زيوت السافرانال العطرية النادرة.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "حقل زعفران عند الفجر في قرية ماشتاغا مع زهور الزعفران البنفسجية",
        badge: "المرحلة 1: قطاف الفجر"
      },
      {
        step: "02",
        tag: "قطاف يدوي بالغ العناية",
        title: "سواعد فلاحية حانية: زهرة إثر زهرة دون خدش",
        text: "لا يمكن مكننة حصاد الزعفران إطلاقاً؛ إذ يقطف المزارعون المتمرسون كل زهرة بعناية فائقة عند قاعدة الساق، ثم يضعونها في سلال الخيزران المنسوجة للحفاظ على نضارة الخيوط.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "أياد مزارعة تقطف زهور الزعفران البنفسجية برفق عند شروق الشمس",
        badge: "المرحلة 2: القطف اليدوي"
      },
      {
        step: "03",
        tag: "الورشة · فرز المياسم",
        title: "فصل الخيوط الحمراء: الياقوت القرمزي الخالص",
        text: "في غضون ساعات معدودة من القطف، تصل الزهور إلى ورشة القرية، حيث تفصل الأيدي الخبيرة المياسم الثلاثة القرمزية من كل زهرة عن القلم الأصفر، ويُنتقى الأحمر الداكن وحده لضمان النقاء الكامل.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "فرز خيوط الزعفران الحمراء وفصلها عن بتلات الزهور البنفسجية",
        badge: "المرحلة 3: فرز الخيوط"
      },
      {
        step: "04",
        tag: "تجفيف مظلل على شباك تراثية",
        title: "تجفيف هادئ على الشباك: حبس الأريج واللون الذهبي",
        text: "تُبسط الخيوط الطازجة بطبقة رقيقة فوق شباك خشبية دقيقة داخل حجرة مظللة جيدة التهوية؛ وتضمن هذه المعاملة الهادئة تركيز صبغة الكروسين القوية دون تعريض النبات لأي حرارة متلفة.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "خيوط الزعفران الحمراء مفرودة بعناية للتجفيف على شباك خشبية",
        badge: "المرحلة 4: التجفيف المظلل"
      }
    ],
    galleryTitle: "معرض الطهي وحرفة الزعفران",
    gallerySubtitle: "من الخيوط القرمزية الكاملة إلى نقيع الزعفران الكهرماني وأطباق الأرز الفاخرة",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "خيوط قرمزية كاملة",
        description: "أطراف طبيعية بوقية ولون ياقوتي داكن منتقى دون أي مسحوق أو شوائب."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "وعاء زجاجي حافظ",
        description: "قارورة زجاجية أنيقة بغطاء ذهبي محكم لحفظ الزيوت العطرية الثمينة."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "نقيع كهرماني وهاج",
        description: "تدرج مذهل للون الذهبي والبرتقالي في الماء الدافئ يفوح بأريج الزعفران الفواح."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "الأرز الذهبي الفاخر",
        description: "حبات أرز طويلة متناثرة مفعمة بماء الزعفران الطبيعي ومزينة باللوز والمكسرات."
      }
    ],
    productButton: "اكتشف الزعفران",
    qualityButton: "معايير النقاء",
    homeLink: "العودة للرئيسية",
    navLabel: "سجل الحصاد"
  },
  kk: {
    metaTitle: "Маштағадағы шафран жинау жылнамасы | ROFRAN",
    metaDescription: "Апшерон түбегіндегі Маштаға ауылында шафран жинау үдерісі: таңсәріде Crocus sativus гүлдерін теру, қызыл жіпшелерді қолмен ажырату және көлеңкеде кептіру.",
    eyebrow: "ВИЗУАЛДЫ ЖЫЛНАМА · МАШТАҒА, БАКУ",
    title: "Таңғы егістен дастарқанға дейін: Шафран жинау шежіресі",
    subtitle: "Апшеронның салқын таңғы самалында ашылған күлгін гүлдерден дәстүрлі торда баппен кептірілген тұтас қызыл жіпшелерге дейінгі шеберлік пен шыдамдылық тарихы.",
    disclaimerBadge: "Бейнебаян шолуы",
    disclaimerText: "Бұл суреттер ROFRAN-ның дәстүрлі жиын-терін үдерісін көрсетеді. Жуырда олар нақты егістік алқаптарымыздан түсірілген тікелей фоторепортажбен толықтырылады.",
    stagesTitle: "Күзгі жиын-терімнің төрт кезеңі",
    stagesSubtitle: "Каспий жағасындағы көне Маштаға ауылының диқаншылық дәстүрі",
    stages: [
      {
        step: "01",
        tag: "ТАҢСӘРІ · МАШТАҒА АЛҚАБЫ",
        title: "Таңғы жиын: Құмды топырақтағы күлгін ояну",
        text: "Апшеронда шафран қара күзде — қазан айының соңы мен қарашада гүлдейді. Жиын таң бозарып атқанда басталады; түскі күн гүлді толық ашып, бағалы сафранал эфир майларын ұшырып жібермес бұрын гүлдер тез жиналуы керек.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Маштағадағы таңғы шафран алқабы және күлгін шафран гүлдері",
        badge: "1-кезең: Таңсәріде теру"
      },
      {
        step: "02",
        tag: "ҚОЛМЕН ҰҚЫПТЫ ТЕРУ",
        title: "Шебер қолдар еңбегі: Гүлдерді зақымдамай жинау",
        text: "Шафран жинауды автоматтандыру мүмкін емес. Тәжірибелі диқандар әрбір гүлді сабағынан еппен үзіп, нәзік жіпшелерді сақтау үшін өрілген себеттерге жинайды.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Диқанның күлгін шафран гүлдерін таңертең қолмен жинауы",
        badge: "2-кезең: Қолмен теру"
      },
      {
        step: "03",
        tag: "ШЕБЕРХАНА · АНАЛЫҚТАРДЫ БӨЛУ",
        title: "Қызыл жіпшелерді ажырату: Таза жақұт шафран",
        text: "Жиналған гүлдер бірнеше сағат ішінде шеберханаға жеткізіледі. Әр гүлден үш ашық қызыл аналық жіпшесі сары бағаншадан бөлініп, тек ең сапалы қызыл бөлігі ғана іріктеледі.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Ағаш үстел үстінде гүлден қызыл шафран жіпшелерін қолмен ажырату",
        badge: "3-кезең: Жіпшелерді бөлу"
      },
      {
        step: "04",
        tag: "КӨЛЕҢКЕДЕ ТОРДА КЕПТІРУ",
        title: "Дәстүрлі торда баппен кептіру: Түс пен хош иісті сақтау",
        text: "Бөлінген жас жіпшелер жақсы желдетілетін көлеңкелі бөлмеде ағаш жақтаулы жіңішке торларға жұқа етіп жайылады. Бұл баяу кептіру кроцин бояуын және сафранал хош иісін толық сақтайды.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Ағаш торларда баппен кептіріліп жатқан қызыл шафран жіпшелері",
        badge: "4-кезең: Торда кептіру"
      }
    ],
    galleryTitle: "Аспаздық және қолөнер галереясы",
    gallerySubtitle: "Тұтас қызыл жіпшелерден кәріптас тұнбаға және салтанатты палауға дейін",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Тұтас қызыл жіпшелер",
        description: "Табиғи керней пішінді ұштары бар, үгітілмеген қою жақұт түсті аналықтар."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Қорғаныш шыны құты",
        description: "Бағалы эфир майларын сақтайтын алтын қақпақты шыны құты."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Кәріптас реңкті тұнба",
        description: "Жылы суда баяу еріп, алтын-қызғылт реңк пен ерекше хош иіс таратады."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Дәстүрлі шафранды палау",
        description: "Табиғи шафран тұнбасына бөккен, бадам мен өрікпен сәнделген салтанатты ас."
      }
    ],
    productButton: "Шафранды танып-білу",
    qualityButton: "Сапа талаптары",
    homeLink: "Басты бетке оралу",
    navLabel: "Жиын шежіресі"
  },
  uz: {
    metaTitle: "Mashtag‘ada za’faron hosili yilnomasi | ROFRAN",
    metaDescription: "Absheron yarim orolidagi Mashtag‘a qishlog‘ida za’faron terimi: tong saharda Crocus sativus terish, tolalarni qo‘lda ajratish va soyada quritish jarayoni.",
    eyebrow: "VIZUAL YILNOMA · MASHTAG‘A, BOKU",
    title: "Tonggi daladan dasturxongacha: Za’faron hosili xronikasi",
    subtitle: "Absheronning salqin tongida ochilgan binafsharang za’faron gullaridan tozalab quritilgan to‘q qizil tolalargacha bo‘lgan sabr va an’anaviy mahorat yo‘li.",
    disclaimerBadge: "Ko‘rgazmali lavha",
    disclaimerText: "Ushbu suratlar ROFRAN an’anaviy za’faron terimi va quritish bosqichlarini ifodalaydi. Tez orada ushbu lavhalar joriy mavsum dalalarimizdan olingan fotosuratlar bilan boyitiladi.",
    stagesTitle: "Kuzgi hosil terimining to‘rt bosqichi",
    stagesSubtitle: "Kaspiy sohilidagi Mashtag‘a qishlog‘ining asriy dehqonchilik taqvimi",
    stages: [
      {
        step: "01",
        tag: "TONG SAHAR · MASHTAG‘A DALALARI",
        title: "Tonggi terim: Qumli tuproqda binafsharang uyg‘onish",
        text: "Za’faron Absheron tuprog‘ida kech kuzda — oktyabr oxiri va noyabrda gullaydi. Terim tong yorishishi bilan boshlanadi; tushki oftob gullarni to‘liq ochib, nozik safranal xushbo‘yligini uchirib yubormasidan terib olinishi zarur.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Mashtag‘ada tong saharda za’faron dalasi va Crocus sativus gullari",
        badge: "1-bosqich: Tonggi terim"
      },
      {
        step: "02",
        tag: "QO‘LDA AVAYLAB TERISH",
        title: "Momiq qo‘llar mehnati: Har bir gul ehtiyotkorlik bilan",
        text: "Za’faron hosilini texnika bilan yig‘ib bo‘lmaydi. Tajribali terimchilar har bir gulni poyasidan avaylab uzib, tolalarni shikastlamaslik uchun to‘qilgan savatlarga joylaydi.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Dehqonning tong saharda za’faron gullarini savatga terishi",
        badge: "2-bosqich: Qo‘lda terish"
      },
      {
        step: "03",
        tag: "USTAXONA · TOLALARNI AJRATISH",
        title: "Qizil tolalarni ajratish: Sof yoqutrang urug‘chi iplari",
        text: "Terilgan gullar bir necha soat ichida qishloq ustaxonasiga keltiriladi. Har bir gul ichidagi uch dona to‘q qizil urug‘chi iplari sarg‘ish qismidan ajratib olinadi.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Yog‘och stolda binafsharang gullardan qizil za’faron tolalarini ajratish",
        badge: "3-bosqich: Tolalarni ajratish"
      },
      {
        step: "04",
        tag: "SOYADA TO‘RLARDA QURITISH",
        title: "To‘rli elaklarda quritish: Rang va muattar iforni asrash",
        text: "Ajratilgan yangi tolalar yaxshi shamollatiladigan salqin xonada yog‘och romli ingichka to‘rlar ustiga yupqa qilib yoyiladi. Bu usul krosin rangini va tabiiy efir moylarini saqlab qoladi.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Yupqa to‘rlar ustida quritilayotgan yangi qizil za’faron tolalari",
        badge: "4-bosqich: To‘rda quritish"
      }
    ],
    galleryTitle: "Oshpazlik va hunarmandchilik galereyasi",
    gallerySubtitle: "Butun qizil tolalardan kahraborang damlamaga va to‘yona oshgacha",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Butun to‘q qizil tolalar",
        description: "Tabiiy naycha shaklidagi uchlar va changsiz chuqur yoqut rang."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Himoyalovchi shisha idish",
        description: "Nozik efir moylarini saqlab qoluvchi tilla qopqoqli shisha flakon."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Kahraborang damlama",
        description: "Iliq suvda mayin ochiluvchi tilla-zarg‘aldoq rang va muattar ifor."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "An’anaviy za’faronli palov",
        description: "Za’faron damlamasi bilan pishgan, bodom va quritilgan mevalar bilan bezalgan shohona osh."
      }
    ],
    productButton: "Za’faron bilan tanishish",
    qualityButton: "Sifat mezonlari",
    homeLink: "Bosh sahifaga qaytish",
    navLabel: "Hosil xronikasi"
  },
  ky: {
    metaTitle: "Маштагадагы шафран терүү жылнаамасы | ROFRAN",
    metaDescription: "Маштага айылында шафран жыйноо процесси: таң эрте Crocus sativus гүлдөрүн терүү, кызыл талчаларды кол менен ажыратуу жана көлөкөдө кургатуу.",
    eyebrow: "ВИЗУАЛДЫК ЖЫЛНААМА · МАШТАГА, БАКУ",
    title: "Таңкы талаадан дасторконго чейин: Шафран терүү тарыхы",
    subtitle: "Апшерондун салкын таңкы желинде ачылган кызгылт гүлдөрдөн көлөкөдө бап менен кургатылган нагыз кызыл талчаларга чейинки эмгек жана чеберчилик.",
    disclaimerBadge: "Көргөзмө баяны",
    disclaimerText: "Бул сүрөттөр ROFRAN түшүм жыйноо салтын чагылдырат. Жакында алар талааларыбыздан тартылган репортаждык фотосүрөттөр менен толукталат.",
    stagesTitle: "Күзгү түшүм жыйноонун төрт этабы",
    stagesSubtitle: "Каспий боюндагы Маштага айылынын дыйканчылык салты",
    stages: [
      {
        step: "01",
        tag: "ТАҢ СҮРҮЛГӨНДӨ · МАШТАГА ТАЛААСЫ",
        title: "Таңкы терүү: Кумдак топурактагы кызгылт гүлдөө",
        text: "Шафран Апшерондо кеч күздө — октябрдын аягы менен ноябрда гүлдөйт. Терүү таң сүрүлгөндө башталат; түшкү күндүн табы гүлдү толук ачып, назик сафранал жытын кетиргенче гүлдөр тез жыйналат.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Маштагадагы таңкы шафран талаасы жана Crocus sativus гүлдөрү",
        badge: "1-этап: Таңкы терүү"
      },
      {
        step: "02",
        tag: "КОЛ МЕНЕН АВАЙЛАП ТЕРҮҮ",
        title: "Кылдат колдордун мээнети: Ар бир гүл аярлык менен",
        text: "Шафранды машина менен терүү мүмкүн эмес. Тажрыйбалуу дыйкандар ар бир гүлдү сабагынан аяр үзүп, талчаларды сактоо үчүн согулган себеттерге чогултат.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Дыйкандын кызгылт шафран гүлдөрүн таң эрте себетке териши",
        badge: "2-этап: Кол менен терүү"
      },
      {
        step: "03",
        tag: "ӨСТАКАНА · ТАЛЧАЛАРДЫ БӨЛҮҮ",
        title: "Кызыл талчаларды ажыратуу: Таза жакуттай шафран",
        text: "Терилген гүлдөр бир нече саатта өстаканага жеткирилет. Ар бир гүлдүн ортосундагы үч ачык кызыл талча сары сабагынан бөлүнүп алынат.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Жыгач үстөлдө гүлдөрдөн кызыл шафран талчаларын ажыратуу",
        badge: "3-этап: Талчаларды бөлүү"
      },
      {
        step: "04",
        tag: "КӨЛӨКӨДӨ ТОРДО КУРГАТУУ",
        title: "Торчолордо бап менен кургатуу: Түс менен жытты сактоо",
        text: "Бөлүнгөн таза талчалар жакшы желдеген бөлмөдө жука торчолордун бетине жука жайылат. Бул жай кургатуу кроцин боегун жана баалуу эфир майларын бүт бойдон сактайт.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Жыгач торчолордо кургатылып жаткан жаңы кызыл шафран талчалары",
        badge: "4-этап: Тордо кургатуу"
      }
    ],
    galleryTitle: "Кулинария жана кол өнөр галереясы",
    gallerySubtitle: "Бүтүн кызыл талчалардан ачык янтарь демдөөгө жана салтанаттуу палоого чейин",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Бүтүн кочкул кызыл талчалар",
        description: "Табигый сурнай сымал учтары бар, чаңы жок кочкул жакут түс."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Коргоочу айнек идиш",
        description: "Эфир майларын сактоочу алтын капкактуу саркеч айнек идиш."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Янтарь түстүү демдөө",
        description: "Жылуу сууда жай ачылып, алтын-кызгылт түс жана жагымдуу жыт чыгарат."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Салттуу шафрандуу палоо",
        description: "Шафран ширеси менен демделген, бадам жана кургатылган өрүк кошулган тамак."
      }
    ],
    productButton: "Шафран менен таанышуу",
    qualityButton: "Сапат талаптары",
    homeLink: "Башкы бетке кайтуу",
    navLabel: "Түшүм жылнаамасы"
  },
  tg: {
    metaTitle: "Солномаи ҷамъоварии заъфарон дар Маштаға | ROFRAN",
    metaDescription: "Манзараи визуалии ҷамъоварии заъфарон дар деҳаи Маштаға (нимҷазираи Абшерон, Боку): чидани саҳарии гулҳо, ҷудо кардани риштаҳои сурх ва хушконидан.",
    eyebrow: "СОЛНОМАИ ВИЗУАЛӢ · МАШТАҒА, БОКУ",
    title: "Аз саҳари саҳро то дастархон: Солномаи заъфарони ноб",
    subtitle: "Аз шукуфтани гулҳои бунафши Crocus sativus дар насими саҳарии Абшерон то риштаҳои ёқутии дар соя хушконидашуда — ҳар як амал нишони сабру маҳорат аст.",
    disclaimerBadge: "Пешнамоиши ҳуҷҷатӣ",
    disclaimerText: "Ин аксҳо марҳилаҳои суннатии ҷамъоварӣ ва хушконидани заъфарони ROFRAN-ро инъикос мекунанд. Ба зудӣ онҳо бо аксҳои мустақим аз саҳроҳои мавсими ҷорӣ пурра мегарданд.",
    stagesTitle: "Чаҳор марҳилаи ҷамъоварии тирамоҳӣ",
    stagesSubtitle: "Тақвими деҳқонии деҳаи қадимаи Маштаға дар соҳили баҳри Хазар",
    stages: [
      {
        step: "01",
        tag: "САҲАРГОҲ · САҲРОИ МАШТАҒА",
        title: "Чидани саҳарӣ: Бедории бунафш дар замини регзор",
        text: "Дар Абшерон заъфарон дар охири тирамоҳ — охири октябр ва ноябр гул мекунад. Кор дар равшании аввали субҳ шурӯъ мешавад, то ки пеш аз гармии нисфирӯзӣ гулҳо ва равғанҳои хушбӯи сафранал ҳифз шаванд.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "Майдони заъфарон дар субҳи саҳар дар деҳаи Маштаға бо гулҳои Crocus sativus",
        badge: "Марҳилаи 1: Чидани субҳӣ"
      },
      {
        step: "02",
        tag: "ЧИДАНИ ДАСТӢ БО ЭҲТИЁТ",
        title: "Меҳнати дастони ботаҷриба: Гул ба гул бо назокат",
        text: "Чидани заъфарон кори техника нест. Деҳқонони соҳибтаҷриба ҳар гулро бодиққат аз по поя мекананд ва ба сабадҳои бофташуда мегузоранд, то риштаҳо солим бимонанд.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "Дастони деҳқон, ки гулҳои бунафшро дар сабад ҷамъ мекунанд",
        badge: "Марҳилаи 2: Чидани дастӣ"
      },
      {
        step: "03",
        tag: "КОРГОҲ · ҶУДО КАРДАНИ РИШТАҲО",
        title: "Ҷудо кардани риштаҳои сурх: Ёқути ноби заъфарон",
        text: "Дар давоми чанд соат пас аз чидан гулҳо ба коргоҳ мерасанд. Аз даруни ҳар як гули бунафш се тораи сурхи дурахшон бо даст аз сутунчаи зард ҷудо карда мешавад.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "Дар рӯи мизи чӯбӣ ҷудо кардани риштаҳои сурхи заъфарон аз гулҳо",
        badge: "Марҳилаи 3: Ҷудокунии риштаҳо"
      },
      {
        step: "04",
        tag: "ХУШКОНИДАН ДАР СОЯ БО ТОРҲО",
        title: "Хушконидани оҳиста дар торҳо: Посдории бӯй ва ранг",
        text: "Тораҳои тоза ҷудошуда дар болои чаҳорчӯбаҳои тӯрии чӯбӣ дар хонаи боҳаво ва соя паҳн карда мешаванд. Ин тарзи хушконидан ранги кротсин ва равғанҳои эфириро ҳифз мекунад.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "Риштаҳои сурхи тозаи заъфарон рӯи торҳои чӯбӣ барои хушконидан",
        badge: "Марҳилаи 4: Хушконидан дар торҳо"
      }
    ],
    galleryTitle: "Нигористони пазандагӣ ва ҳунар",
    gallerySubtitle: "Аз риштаҳои бутун то оби заъфарони зардтоб ва оши палови шоҳона",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "Риштаҳои бутуни сурх",
        description: "Нугҳои табиии найчамонанд ва ранги ёқути тира бидуни гарду чанг."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "Шишаи муҳофизатӣ",
        description: "Шишаи зебо бо сарпӯши тиллоӣ барои нигоҳ доштани равғанҳои хушбӯй."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "Оби заъфарони зардтоб",
        description: "Дар оби ширгарм оҳиста кушода шудани мавҷҳои зард ва бӯи дилангез."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "Оши суннатии заъфаронӣ",
        description: "Биринҷи дона-дона бо шарбати заъфарони аслӣ ва бодому хушкмеваҳо."
      }
    ],
    productButton: "Ошноӣ бо заъфарон",
    qualityButton: "Меъёрҳои сифат",
    homeLink: "Бозгашт ба саҳифаи аслӣ",
    navLabel: "Солномаи ҳосил"
  },
  ja: {
    metaTitle: "マシュタガ村 サフラン収穫クロニクル | ROFRAN",
    metaDescription: "アブシェロン半島マシュタガ村における秋のサフラン収穫記録：夜明けの手摘み、雌しべの選別、木枠メッシュによる伝統の陰干し製法。",
    eyebrow: "フォトクロニクル · バクー・マシュタガ村",
    title: "夜明けの畑から極上の食卓へ：サフラン収穫の記録",
    subtitle: "アブシェロンの冷涼な朝霧に開く紫のクロッカスから、木枠で丹念に乾燥させた深紅のホールスレッドまで、すべての工程が職人の技と忍耐の結晶です。",
    disclaimerBadge: "ドキュメンタリー先行公開",
    disclaimerText: "本ギャラリーはROFRANの伝統的な収穫・製法工程を表現したビジュアルです。近日中に今期の現地のリアルな収穫風景写真が追加されます。",
    stagesTitle: "秋の収穫 四つの工程",
    stagesSubtitle: "カスピ海沿岸マシュタガ村に代々伝わる農事暦",
    stages: [
      {
        step: "01",
        tag: "夜明け · マシュタガの畑",
        title: "夜明けの朝摘み：砂質土壌に目覚める紫の花",
        text: "アブシェロン半島では秋の深まる10月下旬から11月にサフランが開花します。日中の暖かさで花が完全に開き芳醇なサフラナール成分が揮発する前に、日の出とともに朝摘みを行います。",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "マシュタガ村の夜明けのサフラン畑と紫のクロッカス",
        badge: "第1工程: 夜明けの手摘み"
      },
      {
        step: "02",
        tag: "丁寧な手摘み作業",
        title: "職人の確かな手仕事：一輪一輪を傷つけず収穫",
        text: "サフランの収穫は決して機械化できません。熟練の農家が花の根元をやさしく摘み取り、繊細な雌しべを守るため伝統の編み籠へと丁寧に収めていきます。",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "朝日に照らされながらクロッカスの花を摘む農家の手元",
        badge: "第2工程: 手摘み収穫"
      },
      {
        step: "03",
        tag: "作業場 · 雌しべの選別",
        title: "真紅の雌しべ選別：ルビー色に輝く純粋なスレッド",
        text: "摘み取られた花は数時間以内に工房へ運ばれます。紫の花弁を開き、中央の3本の深紅の雌しべ（柱頭）を黄色の花柱から一本ずつ手作業で切り離します。",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "木製テーブルの上で紫の花弁から赤いサフラン雌しべを選別する作業",
        badge: "第3工程: 雌しべ選別"
      },
      {
        step: "04",
        tag: "木枠メッシュによる陰干し乾燥",
        title: "伝統の陰干し製法：芳香と色合いを封じ込める",
        text: "選別された雌しべは、通気性の良い日陰の部屋で木枠の細網スクリーンに薄く均一に広げられます。熱を加えずに乾燥させることで、クロシン色素と精油成分を守ります。",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "木枠の乾燥ネットに均一に広げられた深紅のサフラン雌しべ",
        badge: "第4工程: メッシュ陰干し"
      }
    ],
    galleryTitle: "料理と工芸ギャラリー",
    gallerySubtitle: "折れのない深紅のスレッドから琥珀色の抽出液、黄金の祝宴ピラフまで",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "深紅のホールスレッド",
        description: "粉末のない、トランペット状に広がる先端と深いルビー色が際立つ自然の姿。"
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "香りを守るガラス瓶",
        description: "繊細な精油成分を紫外線や空気から守るゴールドキャップの保存瓶。"
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "琥珀色の抽出液",
        description: "ぬるま湯に溶け出す黄金と橙色の鮮やかなグラデーションと気品ある香り。"
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "伝統のサフランピラフ",
        description: "本物のサフラン液で炊き上げたパラパラの長粒米に、香ばしいアーモンドを添えて。"
      }
    ],
    productButton: "サフランを見る",
    qualityButton: "品質へのこだわり",
    homeLink: "トップページへ戻る",
    navLabel: "収穫クロニクル"
  },
  ko: {
    metaTitle: "마슈타가 사프란 수확 크로니클 | ROFRAN",
    metaDescription: "아제르바이잔 바쿠 마슈타가 마을의 가을 사프란 수확 기록: 새벽녘 크로커스 채취, 암술대 수작업 분리, 전통 그늘 건조 과정.",
    eyebrow: "비주얼 크로니클 · 마슈타가, 바쿠",
    title: "새벽녘 밭에서 식탁까지: 사프란 수확의 기록",
    subtitle: "아프셰론의 차가운 아침 바람 속에 피어난 보랏빛 꽃잎부터 전통 건조망에서 섬세하게 건조된 진홍빛 홀 스레드까지의 장인 여정입니다.",
    disclaimerBadge: "다큐멘터리 프리뷰",
    disclaimerText: "본 갤러리는 ROFRAN의 전통 수확 및 가공 방식을 담은 비주얼입니다. 곧 실제 현장에서 촬영된 생생한 시즌 사진들로 업데이트됩니다.",
    stagesTitle: "가을 수확의 4단계",
    stagesSubtitle: "카스피해 연안 마슈타가 마을에서 대대로 이어져 온 농경 달력",
    stages: [
      {
        step: "01",
        tag: "새벽녘 · 마슈타가 들판",
        title: "새벽 채취: 모래 토양 위 보랏빛 개화",
        text: "사프란은 늦가을인 10월 말부터 11월에 개화합니다. 낮의 열기가 꽃잎을 완전히 열어 섬세한 사프라날 향기가 날아가기 전, 해 뜰 녘에 신속하게 수확합니다.",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "마슈타가 마을의 동틀 녘 사프란 밭과 보랏빛 사프란 꽃",
        badge: "1단계: 새벽 채취"
      },
      {
        step: "02",
        tag: "섬세한 수작업 채취",
        title: "농부의 정성 어린 손길: 꽃송이마다 온전하게",
        text: "사프란 수확은 기계화할 수 없습니다. 숙련된 농부들이 줄기 밑동을 조심스럽게 꺾어 전통 버들바구니에 담아 암술대가 손상되지 않도록 보호합니다.",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "농부가 보랏빛 사프란 꽃을 바구니에 조심스럽게 수확하는 손",
        badge: "2단계: 손 수확"
      },
      {
        step: "03",
        tag: "공방 · 암술대 분리",
        title: "진홍빛 암술대 분리: 순수한 루비빛 가닥",
        text: "수확 후 몇 시간 이내에 꽃은 공방으로 옮겨집니다. 보랏빛 꽃잎을 열고 중앙의 세 가닥 진홍빛 암술머리를 노란 꽃대에서 조심스럽게 분리합니다.",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "나무 작업대에서 꽃잎으로부터 붉은 사프란 암술대를 분리하는 모습",
        badge: "3단계: 암술대 분리"
      },
      {
        step: "04",
        tag: "그늘 속 메쉬 건조",
        title: "전통 메쉬망 건조: 풍미와 색감의 응축",
        text: "분리된 생가닥은 통풍이 잘되는 그늘진 방에서 나무틀 미세 메쉬망에 얇게 펼쳐집니다. 열을 가하지 않는 자연 건조로 크로신 색소와 정유 성분을 보존합니다.",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "전통 나무 건조망 위에 얇게 널려 건조 중인 붉은 사프란 가닥",
        badge: "4단계: 메쉬 건조"
      }
    ],
    galleryTitle: "미식 & 장인 갤러리",
    gallerySubtitle: "온전한 붉은 가닥부터 호박빛 우림물과 전통 황금빛 필라프까지",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "온전한 진홍빛 스레드",
        description: "가루 섞임 없이 자연스러운 나팔관 모양의 끝부분과 깊은 루비빛."
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "보호용 유리 용기",
        description: "사프란 특유의 섬세한 정유 성분을 지켜주는 골드 캡 유리병."
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "빛나는 호박빛 우림",
        description: "미온수에서 천천히 번져 나오는 황금빛 오렌지색 물결과 그윽한 향."
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "전통 사프란 필라프",
        description: "순수 사프란 추출액으로 물들여 고슬고슬하게 지어낸 아몬드 곁들임 밥."
      }
    ],
    productButton: "사프란 살펴보기",
    qualityButton: "품질 기준",
    homeLink: "홈으로 돌아가기",
    navLabel: "수확 크로니클"
  },
  zh: {
    metaTitle: "马什塔加藏红花秋收图志 | ROFRAN",
    metaDescription: "阿普歇伦半岛巴库马什塔加村藏红花秋收影像志：破晓采摘、手工剥离鲜红花丝、传统网筛阴干工艺。",
    eyebrow: "视觉图志 · 巴库马什塔加村",
    title: "破晓田埂至典雅餐席：藏红花采收实录",
    subtitle: "从阿普歇伦半岛清晨凉风中绽放的紫色番红花，到传统木框纱网上静置阴干的深红花丝，每一道工序均凝聚着世代相传的专注与手艺。",
    disclaimerBadge: "纪实影像预览",
    disclaimerText: "本图志展现ROFRAN藏红花传统的采收与加工流程。稍后我们将呈现来自当季田间实地拍摄的纪录相片。",
    stagesTitle: "秋季采收四部曲",
    stagesSubtitle: "里海之滨马什塔加村古老传承的农时节令",
    stages: [
      {
        step: "01",
        tag: "破晓黎明 · 马什塔加花田",
        title: "破晓采摘：沙质沃土上的紫色苏醒",
        text: "阿普歇伦半岛的藏红花于深秋十月下旬至十一月绽放。花农在天色破晓时步入花田，赶在正午日光将花蕾完全照开、挥发掉芳香的藏红花醛前迅速采收。",
        image: "/images/harvest/harvest-field-dawn.jpg",
        alt: "马什塔加村破晓时分的藏红花田与紫色花朵",
        badge: "步骤一：破晓采收"
      },
      {
        step: "02",
        tag: "精细手工摘花",
        title: "细腻手心劳作：逐朵轻巧采撷而不损花丝",
        text: "藏红花采摘无法机械化。熟练农人弯腰于田垄间，指尖轻巧掐断花梗基部，将鲜花收入柳条编织筐中，以保持花丝结构完整。",
        image: "/images/harvest/harvest-picking-hands.jpg",
        alt: "农人清晨将紫色番红花手工采撷至柳条篮中",
        badge: "步骤二：手工采摘"
      },
      {
        step: "03",
        tag: "工坊 · 花丝剥离",
        title: "剥离深红柱头：甄选纯正红宝石色丝",
        text: "采摘后数小时内花朵即送抵工坊。巧手逐一拨开紫色花瓣，将三根深红色的雌蕊柱头与浅黄色花柱细致分离，仅留取纯红饱满的部分。",
        image: "/images/harvest/harvest-separating-stigmas.jpg",
        alt: "在木质工作台上将红色藏红花丝从紫色花瓣中剥离",
        badge: "步骤三：花丝剥离"
      },
      {
        step: "04",
        tag: "纱网遮阴慢干",
        title: "传统网筛阴干：锁住浓郁香气与金黄原色",
        text: "新鲜花丝被薄薄摊铺在木框细纱网上，置于通风良好的避光室内阴干。柔和慢干让藏红花素与挥发油完美留存，绝无焦灼损伤。",
        image: "/images/harvest/harvest-drying-mesh.jpg",
        alt: "摊铺在传统木框细网筛上干燥的鲜红藏红花丝",
        badge: "步骤四：网筛阴干"
      }
    ],
    galleryTitle: "美馔与工艺画廊",
    gallerySubtitle: "从完整深红花丝到金黄琥珀茶汤与宴客抓饭",
    galleryItems: [
      {
        image: "/images/gallery/rofran-macro-threads.jpg",
        title: "整根深红花丝",
        description: "天然喇叭状花头与深沉红宝石色泽，无粉末碎屑掺杂。"
      },
      {
        image: "/images/gallery/rofran-glass-jar.jpg",
        title: "密封保护玻璃瓶",
        description: "简约玻璃瓶配以拉丝金盖，悉心呵护珍贵挥发性芳香油。"
      },
      {
        image: "/images/gallery/rofran-infusion.jpg",
        title: "璀璨琥珀色浸润",
        description: "温水中徐徐漾开的金黄与橙亮色泽，四溢清雅独特的香韵。"
      },
      {
        image: "/images/gallery/rofran-culinary-dish.jpg",
        title: "传统金黄藏红花抓饭",
        description: "以纯正藏红花汁沁润蒸透的粒粒长米，配以香脆杏仁与杏干。"
      }
    ],
    productButton: "探索纯正藏红花",
    qualityButton: "品质检验标准",
    homeLink: "返回首页",
    navLabel: "秋收图志"
  }
};
