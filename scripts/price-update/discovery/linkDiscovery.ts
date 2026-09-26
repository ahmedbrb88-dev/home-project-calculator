import { Page } from 'playwright';
import { ProductUrlCandidate } from './urlTypes.js';
import { normalizeUrl, scoreUrl } from './urlFilters.js';

export async function discoverInternalLinks(page: Page, baseUrl: string, sourceId: string, depth: number): Promise<ProductUrlCandidate[]> {
  const candidates: ProductUrlCandidate[] = [];

  try {
    const hrefs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]')).map(a => (a as HTMLAnchorElement).href);
    });

    for (const href of hrefs) {
      const normalized = normalizeUrl(href, baseUrl);
      if (normalized) {
        const { score, matchedKeywords } = scoreUrl(normalized);
        candidates.push({
          url: normalized,
          sourceId,
          discoveryMethod: 'internal_link',
          matchedKeywords,
          depth,
          discoveredAt: new Date().toISOString(),
          score
        });
      }
    }
  } catch (e) {
    // Ignore extraction errors
  }

  return candidates;
}
