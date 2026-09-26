import { ProductUrlCandidate, UrlDiscoveryReport } from './urlTypes.js';
import { discoverFromSitemap } from './sitemapDiscovery.js';
import { discoverInternalLinks } from './linkDiscovery.js';
import { BrowserFetcher } from '../browser/browserFetcher.js';

export async function runUrlDiscovery(
  baseUrl: string, 
  sourceId: string, 
  browserFetcher: BrowserFetcher,
  maxUrlsToSelect: number = 20
): Promise<{ report: UrlDiscoveryReport, selectedUrls: ProductUrlCandidate[] }> {
  
  const report: UrlDiscoveryReport = {
    sourceId,
    sitemap: { found: false, urls: 0 },
    linksDiscovered: 0,
    uniqueUrls: 0,
    selectedUrls: 0,
    productPages: 0,
    productsExtracted: 0
  };

  const allCandidates: Map<string, ProductUrlCandidate> = new Map();

  // 1. Try Sitemap
  const sitemapResult = await discoverFromSitemap(baseUrl, sourceId);
  if (sitemapResult.urls.length > 0) {
    report.sitemap.found = true;
    report.sitemap.urls = sitemapResult.urls.length;
    for (const cand of sitemapResult.urls) {
      allCandidates.set(cand.url, cand);
    }
  }

  // 2. Internal link extraction via homepage
  const { result, page } = await browserFetcher.fetchPage(baseUrl);
  if (result.success && page) {
    const linkCandidates = await discoverInternalLinks(page, baseUrl, sourceId, 1);
    report.linksDiscovered = linkCandidates.length;
    for (const cand of linkCandidates) {
      if (!allCandidates.has(cand.url)) {
        allCandidates.set(cand.url, cand);
      } else {
        // Keep the one with the higher score or update
        const existing = allCandidates.get(cand.url)!;
        if (cand.score > existing.score) {
          allCandidates.set(cand.url, cand);
        }
      }
    }
  }
  if (page) await page.close();

  report.uniqueUrls = allCandidates.size;

  // Filter out definitely non-product pages
  const validCandidates = Array.from(allCandidates.values()).filter(c => c.score >= 0);

  // Sort by score descending
  validCandidates.sort((a, b) => b.score - a.score);

  const selectedUrls = validCandidates.slice(0, maxUrlsToSelect);
  report.selectedUrls = selectedUrls.length;

  return { report, selectedUrls };
}
