import { ProductUrlCandidate } from './urlTypes.js';

const MATERIAL_KEYWORDS = [
  'béton', 'beton', 'ciment', 'mortier',
  'gravier', 'graviers', 'sable',
  'carrelage', 'carreau', 'carreaux', 'faience', 'faïence', 'gres', 'grès',
  'peinture'
];

const IGNORE_PATTERNS = [
  /^mailto:/,
  /^tel:/,
  /^javascript:/,
  /login/i,
  /account/i,
  /cart/i,
  /checkout/i,
  /panier/i,
  /contact/i,
  /register/i
];

export function normalizeUrl(rawUrl: string, baseUrl: string): string | null {
  try {
    const url = new URL(rawUrl, baseUrl);
    const baseDomain = new URL(baseUrl).hostname.replace('www.', '');
    const currentDomain = url.hostname.replace('www.', '');

    // Reject external domains
    if (baseDomain !== currentDomain) {
      return null;
    }

    // Ignore non-http/https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }

    // Reject specific patterns
    for (const pattern of IGNORE_PATTERNS) {
      if (pattern.test(url.pathname)) {
        return null;
      }
    }

    // Remove fragments
    url.hash = '';

    // Remove common tracking params safely
    url.searchParams.delete('utm_source');
    url.searchParams.delete('utm_medium');
    url.searchParams.delete('utm_campaign');
    url.searchParams.delete('fbclid');

    let finalUrl = url.toString();

    // Remove unnecessary trailing slash if not root
    if (finalUrl.length > baseUrl.length && finalUrl.endsWith('/')) {
      finalUrl = finalUrl.slice(0, -1);
    }

    return finalUrl;
  } catch (e) {
    return null; // invalid URL
  }
}

export function scoreUrl(url: string): { score: number; matchedKeywords: string[] } {
  let score = 0;
  const matchedKeywords: string[] = [];
  const urlLower = url.toLowerCase();

  for (const keyword of MATERIAL_KEYWORDS) {
    if (urlLower.includes(keyword)) {
      score += 20;
      matchedKeywords.push(keyword);
    }
  }

  // Common product-like signals
  if (urlLower.includes('/product/') || urlLower.includes('/p/') || urlLower.includes('/item/')) {
    score += 15;
  }

  // Common listing identifiers (e.g., -id12345, or numbers)
  if (/-p\d+/.test(urlLower) || /-\d+$/.test(urlLower)) {
    score += 10;
  }
  
  if (urlLower.includes('sac') || urlLower.includes('kg') || urlLower.includes('carton') || urlLower.includes('litre')) {
    score += 15;
  }

  // Penalize category or search pages if we want product pages
  if (urlLower.includes('/category/') || urlLower.includes('/c/') || urlLower.includes('search') || urlLower.includes('?q=')) {
    score -= 10;
  }

  return { score, matchedKeywords };
}
