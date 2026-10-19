// Keep SSR and browser text identical across ICU/CLDR versions (notably Azerbaijani grouping).
export function shopNumber(locale, value) {
  const number = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
  return locale === 'ar' ? number.replace(/\d/g, digit => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]) : number;
}
