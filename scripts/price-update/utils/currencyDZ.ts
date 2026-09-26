export function parseAlgerianPrice(rawPrice: string): { price: number; currency: string } | null {
  if (!rawPrice) return null;

  // Clean the string
  const cleaned = rawPrice.trim();

  // Check for currency indicators
  const hasDZD = /dzd/i.test(cleaned);
  const hasDA = /\bda\b/i.test(cleaned);
  const hasArabic = /د\.?ج/.test(cleaned);

  if (!hasDZD && !hasDA && !hasArabic) {
    return null; // Not an Algerian price format we recognize
  }

  // E.g. "1 250 DA" -> "1250", "1,250 DZD" -> "1250" or "260,00" -> "260.00"
  let numberStr = cleaned.replace(/[^\d., ]/g, '').trim();
  
  // If we have a comma followed by exactly two digits at the end, it's a decimal comma.
  if (/(,\d{2})$/.test(numberStr)) {
     numberStr = numberStr.replace(/(,\d{2})$/, (match) => match.replace(',', '.'));
  }

  // Remove spaces and any remaining commas (which would be thousand separators)
  const normalizedNumberStr = numberStr.replace(/[, ]/g, '');
  
  const price = parseFloat(normalizedNumberStr);

  if (isNaN(price) || price <= 0) return null;

  return {
    price,
    currency: 'DZD'
  };
}
