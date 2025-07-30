export function formatNumber(num: number): string {
  // Sonni stringga aylantiramiz va raqamlarni ajratish uchun regexdan foydalanamiz
  const numStr: string = num.toString();
  const formatted = numStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '); // Raqamlar orasiga bo'shliq qo'shamiz
  return formatted;
}
