import { ProductUrlCandidate } from './urlTypes.js';
import { normalizeUrl, scoreUrl } from './urlFilters.js';

export async function discoverFromSitemap(baseUrl: string, sourceId: string, maxUrls: number = 100): Promise<{ urls: ProductUrlCandidate[], limitReached: boolean }> {
  const candidates: ProductUrlCandidate[] = [];
  let limitReached = false;

  try {
    const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString();
    const response = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!response.ok) {
      return { urls: [], limitReached: false };
    }

    const xml = await response.text();
    // basic regex for loc tags
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;

    while ((match = locRegex.exec(xml)) !== null) {
      const rawUrl = match[1];
      const normalized = normalizeUrl(rawUrl, baseUrl);
      
      if (normalized) {
        // Avoid duplicate check logic here, we'll deduplicate later
        const { score, matchedKeywords } = scoreUrl(normalized);
        
        candidates.push({
          url: normalized,
          sourceId,
          discoveryMethod: 'sitemap',
          matchedKeywords,
          depth: 1,
          discoveredAt: new Date().toISOString(),
          score
        });

        if (candidates.length >= maxUrls) {
          limitReached = true;
          break;
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return { urls: candidates, limitReached };
}
