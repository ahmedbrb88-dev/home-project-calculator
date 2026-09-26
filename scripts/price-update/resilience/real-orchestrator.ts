import { SourceDiscoveryManager, validateCandidate } from './source-discovery.js';
import { UrlHistoryManager, attemptUrlRecovery } from './url-recovery.js';
import { realFetchUrl } from './real-fetch.js';
import { discoverFromSitemap } from '../discovery/sitemapDiscovery.js';
import { SOURCE_REGISTRY } from '../registry.js';
import { PriceContinuityManager } from './price-continuity.js';
import { SourceHealthManager } from './source-health.js';

// Cache to prevent duplicate fetching
const fetchCache = new Map<string, { status: number, redirectedTo?: string, html?: string }>();

export async function cachedRealFetch(url: string, useBrowser: boolean = false) {
  const cacheKey = `${url}-${useBrowser}`;
  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey)!;
  }
  const result = await realFetchUrl(url, useBrowser);
  fetchCache.set(cacheKey, result);
  return result;
}

export async function realSearchSitemap(fingerprint: string, baseUrl: string, sourceId: string): Promise<string | undefined> {
  try {
    const { urls } = await discoverFromSitemap(baseUrl, sourceId, 200);
    // Simple mock logic for finding fingerprint in URL as a basic search heuristic
    // For a real match, we'd fetch the URL and check Product Identity via GenericBrowserExtractor
    const matchedUrl = urls.find(u => u.url.includes(fingerprint) || u.url.includes(fingerprint.split('-')[0]));
    return matchedUrl ? matchedUrl.url : undefined;
  } catch (e) {
    return undefined;
  }
}

export async function performRealUrlRecovery(
  fingerprint: string, 
  baseUrl: string, 
  sourceId: string, 
  historyManager: UrlHistoryManager,
  knownIdentity: import('../candidate.js').ProductIdentity,
  knownVariant?: import('../candidate.js').PackageVariant
) {
  // Try finding candidates in sitemap
  const candidateUrl = await realSearchSitemap(fingerprint, baseUrl, sourceId);
  
  if (candidateUrl) {
    const { verifyProductUrl } = await import('./product-verification.js');
    const result = await verifyProductUrl(candidateUrl, knownIdentity, knownVariant, knownIdentity.country);
    
    if (result.status === 'EXACT_MATCH') {
      historyManager.registerUrl(fingerprint, result.currentUrl);
      return result.currentUrl;
    }
  }

  // Fallback to attemptUrlRecovery for basic redirects check
  return await attemptUrlRecovery(
    fingerprint,
    historyManager,
    (url) => cachedRealFetch(url, false), // Start with HTTP
    async () => undefined // We already searched sitemap
  );
}
