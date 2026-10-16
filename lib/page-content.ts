import { regionalContent, type OriginalLocale } from "./regional-content";
import type { Locale } from "./i18n";
export const resourceSlugs = ["about", "quality", "shipping", "contact", "wholesale", "privacy"] as const;
export type ResourceSlug = typeof resourceSlugs[number];
export type ResourcePage = { title: string; description: string; eyebrow: string; intro: string; image: string; sections: { title: string; text: string }[]; draft?: boolean };
const originalResourceCopy: Record<OriginalLocale, Record<ResourceSlug, ResourcePage>> = {
  en: {
    about: { title: "A closer look at ROFRAN", description: "Meet ROFRAN, a saffron brand shaped around considered cooking, clear product information and the small details of a shared table.", eyebrow: "THE ROFRAN STORY", intro: "A small ingredient can change the way we approach a meal. ROFRAN begins with that idea: give saffron the attention it deserves, from the first question to the finished dish.", image: "flower", sections: [
      { title: "A place at your table", text: "Our world centres on saffron and the ways it becomes part of everyday cooking. The collection and journal bring the ingredient into focus: what it is, how to prepare it and what to ask before choosing it. A beautiful presentation should be accompanied by useful information." },
      { title: "Details before promises", text: "Product origin, weight, ingredients and ordering conditions should be easy to find. As the collection takes shape, confirmed product facts will be published alongside it. We do not treat a brand story as a substitute for a product's documented history." },
      { title: "Knowledge to keep", text: "Our journal is a place for straightforward saffron guides. It connects choosing, preparation and storage so that a first purchase can become a familiar ingredient. Where a guide refers to external information, you can follow its sources and read further." },
    ] },
    quality: { title: "Choosing saffron with confidence", description: "Learn what saffron quality information should include: ingredients, origin, batch identification and relevant laboratory documents.", eyebrow: "KNOW WHAT YOU CHOOSE", intro: "Quality is easier to understand when the information is clear. Start with the product, ask how it is identified and read what any documents actually confirm.", image: "threads", sections: [
      { title: "The ingredient", text: "Check whether the product contains saffron threads, ground saffron or a mixture. Look for a clear ingredient list and net weight. Colour and appearance can be useful observations, but neither independently establishes purity." },
      { title: "The record", text: "Origin, date markings and a batch or lot number help connect a jar to its supply history. A brand's address is not necessarily the place where its saffron grew. Ask for the information that applies to the particular product." },
      { title: "The evidence", text: "When testing is claimed, check the laboratory, sample identification, date and scope. ISO 3632 includes saffron testing methods; referring to the standard alone does not mean a product has been tested or certified. ROFRAN product certificates will be listed here only when supplied and verified." },
    ] },
    shipping: { title: "Delivery & ordering", description: "Check the latest ROFRAN ordering and delivery information, including the status of online checkout and international destinations.", eyebrow: "BEFORE YOUR ORDER", intro: "Online ordering is not open yet. Delivery destinations, charges and estimated times will be published when the service is ready.", image: "product", draft: true, sections: [
      { title: "Within Azerbaijan", text: "Local delivery options and collection points have not been announced. Confirm the available destination, delivery charge and estimated time before placing an order once sales open." },
      { title: "International orders", text: "International shipping is not currently offered through this website. Supported countries and country-specific conditions will be published before orders are accepted. A language version of the site is not a promise of delivery to that country." },
      { title: "Payment & returns", text: "Online checkout is currently unavailable. Confirmed payment methods, cancellation and return conditions will be provided before purchase. No delivery price or return period is being offered on this page." },
    ] },
    contact: { title: "Contact ROFRAN", description: "Find the ROFRAN contact page for product questions, ordering information and future business enquiries.", eyebrow: "LET'S TALK SAFFRON", intro: "A product question, a kitchen idea or a possible collaboration. This is where confirmed ROFRAN contact details will be available.", image: "flower", draft: true, sections: [
      { title: "Product questions", text: "For questions about choosing or using saffron, begin with our guides and FAQ. Product-specific questions should be answered using the information and documents for the relevant product." },
      { title: "Business enquiries", text: "For a future restaurant, retail or distribution enquiry, useful details include your country, business type, intended use and expected quantity. Wholesale availability and terms have not been announced." },
      { title: "Contact availability", text: "A public contact address and telephone number have not been announced yet. We will display confirmed details here before opening online sales." },
    ] },
    wholesale: { title: "Saffron for restaurants & retail", description: "Explore the information needed for future ROFRAN saffron enquiries from restaurants, retailers and distribution partners.", eyebrow: "FOR YOUR BUSINESS", intro: "Good sourcing starts with a clear brief. Tell us the use, format and destination you have in mind when business enquiries become available.", image: "threads", draft: true, sections: [
      { title: "For professional kitchens", text: "The recipe, serving volume and measurement method help define the saffron a kitchen needs. Product consistency, documented information and storage instructions matter alongside presentation." },
      { title: "For retail partners", text: "Retail enquiries should specify the market, packaging format and expected volume. Any future offer will need confirmed product identifiers, ingredients, weights and commercial conditions." },
      { title: "Availability", text: "Wholesale prices, minimum quantities and supply commitments are not available yet. This page introduces the enquiry process and does not constitute a supply offer." },
    ] },
    privacy: { title: "Privacy & your browser", description: "Learn about the browser storage currently used by the ROFRAN presentation website and the status of online ordering.", eyebrow: "YOUR VISIT", intro: "The current site is a presentation and reading experience. Online checkout and a contact submission form are not active.", image: "flower", draft: true, sections: [
      { title: "Local preferences", text: "The site uses your browser's local storage to remember the presentation bag and sound preference. These settings can be removed by clearing site data in your browser. The presentation bag does not place an order." },
      { title: "External reading", text: "Journal references can take you to external websites. Those sites have their own privacy practices. Reading a reference is optional." },
      { title: "Before sales open", text: "The responsible business and hosting arrangements must be confirmed before a complete privacy notice is published. This description is limited to the site's current features; it is not a completed privacy policy for future payments, forms or analytics." },
    ] },
  },
  az: {
    about: { title: "ROFRAN ilə yaxından tanış olun", description: "Zəfəran, düşünülmüş mətbəx təcrübəsi və aydın məhsul məlumatı ətrafında qurulan ROFRAN brendi ilə tanış olun.", eyebrow: "ROFRAN HEKAYƏSİ", intro: "Kiçik bir ərzaq yeməyə münasibətimizi dəyişə bilər. ROFRAN bu fikirdən başlayır: ilk sualdan hazır yeməyə qədər zəfərana layiq olduğu diqqəti vermək.", image: "flower", sections: [
      { title: "Süfrənizdə bir yer", text: "ROFRAN-ın dünyasında zəfəran və onun gündəlik mətbəxdəki yeri var. Kolleksiya və bələdçi bu ərzağı yaxından tanıdır: nədir, necə hazırlanır və seçimdən əvvəl nələri soruşmaq lazımdır. Gözəl təqdimat faydalı məlumatla tamamlanmalıdır." },
      { title: "Vəddən əvvəl məlumat", text: "Mənşə, çəki, tərkib və sifariş şərtləri asan tapılmalıdır. Kolleksiya formalaşdıqca təsdiqlənmiş məhsul məlumatları burada göstəriləcək. Brend hekayəsini məhsulun sənədlə təsdiqlənən tarixçəsinin əvəzi hesab etmirik." },
      { title: "Saxlamağa dəyən bilik", text: "Bələdçimiz zəfəran haqqında aydın izahlar üçün hazırlanıb. Seçim, istifadə və saxlama mövzuları ilk alışın tanış bir mətbəx vərdişinə çevrilməsinə kömək edir. Xarici məlumatdan istifadə edilən yazılarda mənbələri izləyib əlavə oxuya bilərsiniz." },
    ] },
    quality: { title: "Zəfəranı məlumatlı seçin", description: "Zəfəranın keyfiyyətini qiymətləndirərkən tərkib, mənşə, partiya məlumatı və uyğun laboratoriya sənədləri haqqında bilməli olduqlarınız.", eyebrow: "NƏ SEÇDİYİNİZİ BİLİN", intro: "Məlumat aydın olduqda keyfiyyəti anlamaq asanlaşır. Məhsuldan başlayın, necə müəyyənləşdirildiyini soruşun və sənədlərin nəyi təsdiqlədiyini oxuyun.", image: "threads", sections: [
      { title: "Tərkib", text: "Məhsulun tel zəfəran, üyüdülmüş zəfəran və ya qarışıq olduğunu yoxlayın. Aydın tərkib siyahısı və xalis çəki məlumatını axtarın. Rəng və görünüş müşahidə üçün faydalıdır, amma ayrı-ayrılıqda təmizliyi sübut etmir." },
      { title: "Tarixçə", text: "Mənşə, tarix qeydləri və partiya nömrəsi qabı təchizat tarixçəsi ilə əlaqələndirməyə kömək edir. Brendin ünvanı zəfəranın yetişdirildiyi yer olmaya bilər. Məhz seçdiyiniz məhsula aid məlumatı soruşun." },
      { title: "Sübut", text: "Analiz iddiası varsa, laboratoriyanı, nümunə identifikatorunu, tarixi və analiz çərçivəsini yoxlayın. ISO 3632 zəfəranın sınaq üsullarını əhatə edir; standartın adı məhsulun yoxlanıldığı və ya sertifikatlaşdırıldığı mənasına gəlmir. ROFRAN sənədləri yalnız təqdim və yoxlanıldıqdan sonra burada göstəriləcək." },
    ] },
    shipping: { title: "Çatdırılma və sifariş", description: "ROFRAN onlayn sifarişinin cari vəziyyəti, Azərbaycan və beynəlxalq çatdırılma məlumatları ilə tanış olun.", eyebrow: "SİFARİŞDƏN ƏVVƏL", intro: "Onlayn sifariş hələ açılmayıb. Çatdırılma istiqamətləri, xərcləri və təxmini müddətlər xidmət hazır olduqda yayımlanacaq.", image: "product", draft: true, sections: [
      { title: "Azərbaycan daxilində", text: "Yerli çatdırılma və təhvil məntəqələri hələ elan edilməyib. Satış başladıqda sifarişdən əvvəl ünvan üzrə mövcud xidməti, çatdırılma xərcini və təxmini müddəti dəqiqləşdirin." },
      { title: "Beynəlxalq sifarişlər", text: "Hazırda bu sayt üzərindən beynəlxalq çatdırılma təklif olunmur. Sifariş qəbulundan əvvəl dəstəklənən ölkələr və ölkəyə uyğun şərtlər göstəriləcək. Saytın bir dildə mövcud olması həmin ölkəyə çatdırılma vədi deyil." },
      { title: "Ödəniş və qaytarma", text: "Onlayn ödəniş hazırda aktiv deyil. Ödəniş üsulları, ləğv və qaytarma şərtləri alışdan əvvəl təqdim ediləcək. Bu səhifədə çatdırılma qiyməti və qaytarma müddəti barədə satış təklifi verilmir." },
    ] },
    contact: { title: "ROFRAN ilə əlaqə", description: "Məhsul sualları, sifariş məlumatı və gələcək əməkdaşlıq müraciətləri üçün ROFRAN əlaqə səhifəsi.", eyebrow: "ZƏFƏRANDAN DANIŞAQ", intro: "Məhsul haqqında sual, mətbəx ideyası və ya əməkdaşlıq təklifi. Təsdiqlənmiş ROFRAN əlaqə məlumatları burada yerləşəcək.", image: "flower", draft: true, sections: [
      { title: "Məhsul haqqında suallar", text: "Zəfəranın seçimi və istifadəsi barədə bələdçi və FAQ ilə başlayın. Konkret məhsula aid suallar həmin məhsulun məlumatları və sənədləri əsasında cavablandırılmalıdır." },
      { title: "Əməkdaşlıq müraciətləri", text: "Restoran, mağaza və distribütorluq müraciətlərində ölkə, fəaliyyət növü, istifadə məqsədi və təxmini miqdar faydalıdır. Topdansatış mövcudluğu və şərtləri hələ elan edilməyib." },
      { title: "Əlaqə imkanları", text: "İctimai əlaqə ünvanı və telefon nömrəsi hələ elan edilməyib. Onlayn satış açılmadan əvvəl təsdiqlənmiş məlumatlar burada göstəriləcək." },
    ] },
    wholesale: { title: "Restoranlar və mağazalar üçün zəfəran", description: "Restoranlar, mağazalar və distribütorların gələcək ROFRAN zəfəran müraciətləri üçün faydalı məlumatlar.", eyebrow: "BİZNESİNİZ ÜÇÜN", intro: "Düzgün təchizat aydın ehtiyacdan başlayır. Əməkdaşlıq müraciətləri açıldıqda istifadə məqsədini, məhsul formasını və çatdırılma ölkəsini bildirin.", image: "threads", draft: true, sections: [
      { title: "Peşəkar mətbəxlər üçün", text: "Resept, porsiya sayı və ölçmə üsulu mətbəxin ehtiyacını müəyyənləşdirməyə kömək edir. Təqdimatla yanaşı məhsulun sabitliyi, sənədləri və saxlama təlimatı vacibdir." },
      { title: "Mağazalar üçün", text: "Satış tərəfdaşlığı müraciətində bazar, qablaşdırma forması və gözlənilən həcm göstərilməlidir. Gələcək təklif üçün məhsul identifikatorları, tərkib, çəkilər və kommersiya şərtləri təsdiqlənməlidir." },
      { title: "Mövcudluq", text: "Topdansatış qiymətləri, minimum miqdar və təchizat öhdəlikləri hələ müəyyən edilməyib. Bu səhifə gələcək müraciət prosesini təqdim edir, təchizat təklifi deyil." },
    ] },
    privacy: { title: "Məxfilik və brauzeriniz", description: "ROFRAN təqdimat saytında hazırda istifadə olunan brauzer yaddaşı və onlayn sifarişin vəziyyəti haqqında məlumat.", eyebrow: "SAYTA SƏFƏRİNİZ", intro: "Hazırkı sayt təqdimat və oxu təcrübəsidir. Onlayn ödəniş və müraciət göndərmə forması aktiv deyil.", image: "flower", draft: true, sections: [
      { title: "Yerli seçimlər", text: "Sayt təqdimat səbətini və səs seçimini brauzerinizin yerli yaddaşında saxlayır. Brauzerdə sayt məlumatlarını təmizləməklə bu seçimləri silə bilərsiniz. Təqdimat səbəti sifariş yaratmır." },
      { title: "Xarici mənbələr", text: "Bloqdakı istinadlar sizi başqa saytlara yönləndirə bilər. Onların öz məxfilik qaydaları var. Mənbəni oxumaq məcburi deyil." },
      { title: "Satış başlamazdan əvvəl", text: "Tam məxfilik bildirişinin yayımlanması üçün məsul şirkət və hostinq məlumatları təsdiqlənməlidir. Bu izah saytın hazırkı funksiyaları ilə məhdudlaşır; gələcək ödənişlər, formalar və analitika üçün tamamlanmış məxfilik siyasəti deyil." },
    ] },
  },
  ru: {
    about: { title: "Познакомьтесь с ROFRAN", description: "ROFRAN — шафран, внимание к приготовлению и понятные сведения о продукте. Познакомьтесь с идеей бренда и нашим журналом.", eyebrow: "ИСТОРИЯ ROFRAN", intro: "Маленький ингредиент способен изменить отношение к блюду. ROFRAN начинается с этой мысли: уделить шафрану внимание от первого вопроса до готовой еды.", image: "flower", sections: [
      { title: "Место за вашим столом", text: "В центре нашего мира — шафран и его роль в повседневной кухне. Коллекция и журнал знакомят с ингредиентом: что это, как его подготовить и что спросить до выбора. Красивую подачу должна сопровождать полезная информация." },
      { title: "Сведения прежде обещаний", text: "Происхождение, вес, состав и условия заказа должны быть доступны. По мере подготовки коллекции рядом с ней появятся подтверждённые факты. История бренда не заменяет документированную историю продукта." },
      { title: "Знания, которые остаются", text: "В журнале собраны понятные руководства о шафране. Выбор, приготовление и хранение помогают превратить первую покупку в знакомый ингредиент. Если статья ссылается на внешние сведения, можно перейти к источникам и прочитать подробнее." },
    ] },
    quality: { title: "Выбирайте шафран осознанно", description: "Какие сведения важны при выборе шафрана: состав, происхождение, номер партии и соответствующие лабораторные документы.", eyebrow: "ЗНАЙТЕ, ЧТО ВЫБИРАЕТЕ", intro: "Качество проще понять, когда сведения ясны. Начните с продукта, уточните его идентификацию и прочитайте, что подтверждают документы.", image: "threads", sections: [
      { title: "Состав", text: "Уточните, содержит ли товар целые нити, молотый шафран или смесь. Найдите состав и массу нетто. Цвет и вид полезны для наблюдения, но сами по себе не устанавливают чистоту." },
      { title: "История продукта", text: "Происхождение, даты и номер партии помогают связать банку с историей поставки. Адрес бренда не обязательно совпадает с местом выращивания. Просите сведения именно о выбранном продукте." },
      { title: "Подтверждение", text: "Если заявлен анализ, проверьте лабораторию, образец, дату и объём исследования. ISO 3632 включает методы испытаний шафрана; название стандарта не означает, что продукт испытан или сертифицирован. Документы ROFRAN появятся здесь только после получения и проверки." },
    ] },
    shipping: { title: "Доставка и заказ", description: "Текущий статус заказов ROFRAN и информация о будущей доставке по Азербайджану и за рубеж.", eyebrow: "ПЕРЕД ЗАКАЗОМ", intro: "Онлайн-заказы ещё не открыты. Направления доставки, стоимость и ориентировочные сроки появятся после подготовки сервиса.", image: "product", draft: true, sections: [
      { title: "По Азербайджану", text: "Варианты местной доставки и пункты получения ещё не объявлены. После запуска продаж уточняйте доступность по адресу, стоимость и примерный срок до оформления заказа." },
      { title: "Международные заказы", text: "Сейчас сайт не предлагает международную доставку. Поддерживаемые страны и условия будут опубликованы до приёма заказов. Языковая версия не означает доставку в соответствующую страну." },
      { title: "Оплата и возврат", text: "Онлайн-оплата недоступна. Способы оплаты, отмены и возврата будут предоставлены до покупки. На этой странице нет предложения по цене доставки или сроку возврата." },
    ] },
    contact: { title: "Связаться с ROFRAN", description: "Страница контактов ROFRAN для вопросов о продукте, заказах и будущем сотрудничестве.", eyebrow: "ПОГОВОРИМ О ШАФРАНЕ", intro: "Вопрос о продукте, идея для кухни или предложение сотрудничества. Здесь будут опубликованы подтверждённые контакты ROFRAN.", image: "flower", draft: true, sections: [
      { title: "Вопросы о продукте", text: "Для выбора и приготовления начните с руководств и FAQ. На вопросы о конкретном продукте следует отвечать на основе его сведений и документов." },
      { title: "Деловые обращения", text: "Для будущего обращения от ресторана, магазина или дистрибьютора полезны страна, вид бизнеса, цель использования и предполагаемое количество. Оптовые условия ещё не объявлены." },
      { title: "Контакты", text: "Публичные адрес и телефон ещё не объявлены. Подтверждённые контакты будут указаны здесь до начала онлайн-продаж." },
    ] },
    wholesale: { title: "Шафран для ресторанов и магазинов", description: "Сведения для будущих обращений о шафране ROFRAN от ресторанов, розничных продавцов и дистрибьюторов.", eyebrow: "ДЛЯ ВАШЕГО БИЗНЕСА", intro: "Хорошая поставка начинается с понятной задачи. После открытия обращений укажите применение, формат и страну доставки.", image: "threads", draft: true, sections: [
      { title: "Профессиональным кухням", text: "Рецепт, количество порций и способ измерения помогают определить потребности кухни. Стабильность продукта, документация и условия хранения важны наряду с подачей." },
      { title: "Розничным партнёрам", text: "Укажите рынок, упаковку и предполагаемый объём. Будущее предложение потребует подтверждённых идентификаторов, состава, весов и коммерческих условий." },
      { title: "Доступность", text: "Оптовые цены, минимальные количества и обязательства по поставкам ещё не определены. Страница описывает будущие обращения и не является предложением поставки." },
    ] },
    privacy: { title: "Конфиденциальность и ваш браузер", description: "Информация о локальном хранилище браузера, используемом на презентационном сайте ROFRAN, и статусе заказов.", eyebrow: "ВАШ ВИЗИТ", intro: "Сейчас сайт предназначен для знакомства с продуктом и чтения. Онлайн-оплата и форма отправки обращений не активны.", image: "flower", draft: true, sections: [
      { title: "Локальные настройки", text: "Сайт сохраняет презентационную корзину и выбор звука в локальном хранилище браузера. Их можно удалить, очистив данные сайта. Презентационная корзина не оформляет заказ." },
      { title: "Внешние источники", text: "Ссылки в журнале могут вести на другие сайты с собственными правилами конфиденциальности. Читать источники необязательно." },
      { title: "Перед началом продаж", text: "Для полного уведомления необходимо подтвердить ответственную компанию и размещение сайта. Описание касается текущих функций и не является готовой политикой для будущих платежей, форм и аналитики." },
    ] },
  },
};
const originalResourceLabels = {
  en: { explore: "Explore ROFRAN", faq: "Questions & answers", product: "Discover the saffron", journal: "The journal", updated: "Updated", author: "ROFRAN editorial", links: "Further reading", back: "Home" },
  az: { explore: "ROFRAN-ı kəşf edin", faq: "Suallar və cavablar", product: "Zəfəranı kəşf edin", journal: "Bələdçi", updated: "Yenilənib", author: "ROFRAN redaksiyası", links: "Əlavə oxu", back: "Ana səhifə" },
  ru: { explore: "Откройте ROFRAN", faq: "Вопросы и ответы", product: "Познакомьтесь с шафраном", journal: "Журнал", updated: "Обновлено", author: "Редакция ROFRAN", links: "Читайте также", back: "Главная" },
};

export const resourceCopy: Record<Locale, Record<ResourceSlug, ResourcePage>> = { ...originalResourceCopy, ...Object.fromEntries(Object.entries(regionalContent).map(([locale, c]) => [locale, c.resources])) } as Record<Locale, Record<ResourceSlug, ResourcePage>>;
export const resourceLabels = { ...originalResourceLabels, tr: regionalContent.tr.labels, kk: regionalContent.kk.labels, uz: regionalContent.uz.labels, ky: regionalContent.ky.labels, tg: regionalContent.tg.labels };
