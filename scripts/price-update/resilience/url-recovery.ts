import { UrlHistory, UrlStatus } from './types.js';

export class UrlHistoryManager {
  private history: Map<string, UrlHistory> = new Map();

  constructor(initialData: UrlHistory[] = []) {
    for (const h of initialData) {
      this.history.set(h.productFingerprint, h);
    }
  }

  public getHistory(fingerprint: string): UrlHistory | undefined {
    return this.history.get(fingerprint);
  }

  public registerUrl(fingerprint: string, url: string, canonicalUrl?: string): void {
    const now = new Date().toISOString();
    const current = this.history.get(fingerprint);

    if (!current) {
      this.history.set(fingerprint, {
        productFingerprint: fingerprint,
        canonicalUrl,
        currentUrl: url,
        previousUrls: [],
        firstSeenAt: now,
        lastSeenAt: now,
        urlStatus: 'ACTIVE'
      });
      return;
    }

    if (current.currentUrl !== url) {
      if (!current.previousUrls.includes(current.currentUrl)) {
        current.previousUrls.push(current.currentUrl);
      }
      current.currentUrl = url;
      current.canonicalUrl = canonicalUrl || current.canonicalUrl;
      current.urlStatus = 'MOVED';
    }
    
    current.lastSeenAt = now;
    this.history.set(fingerprint, current);
  }

  public recordRedirect(fingerprint: string, oldUrl: string, newUrl: string): void {
    this.registerUrl(fingerprint, newUrl);
    const current = this.history.get(fingerprint);
    if (current) {
      current.urlStatus = 'REDIRECTED';
      if (!current.previousUrls.includes(oldUrl)) {
        current.previousUrls.push(oldUrl);
      }
    }
  }

  public markNotFound(fingerprint: string): void {
    const current = this.history.get(fingerprint);
    if (current) {
      current.urlStatus = 'NOT_FOUND';
    }
  }

  public getAll(): UrlHistory[] {
    return Array.from(this.history.values());
  }
}

export async function attemptUrlRecovery(
  fingerprint: string,
  historyManager: UrlHistoryManager,
  fetchUrlFn: (url: string) => Promise<{status: number, redirectedTo?: string}>,
  searchSitemapFn: (fingerprint: string) => Promise<string | undefined>
): Promise<string | undefined> {
  const history = historyManager.getHistory(fingerprint);
  if (!history) return undefined;

  // STEP 1 & 2: Test current URL & HTTP redirects
  try {
    const res = await fetchUrlFn(history.currentUrl);
    if (res.redirectedTo) {
      historyManager.recordRedirect(fingerprint, history.currentUrl, res.redirectedTo);
      return res.redirectedTo;
    }
    if (res.status === 200) {
      return history.currentUrl;
    }
  } catch (e) {
    // continue
  }

  // STEP 3: Test previous URLs
  for (const prev of history.previousUrls) {
    try {
      const res = await fetchUrlFn(prev);
      if (res.status === 200 || res.redirectedTo) {
        const finalUrl = res.redirectedTo || prev;
        historyManager.registerUrl(fingerprint, finalUrl);
        return finalUrl;
      }
    } catch (e) {
      // continue
    }
  }

  // STEP 4: Search via Sitemap/Index
  try {
    const foundUrl = await searchSitemapFn(fingerprint);
    if (foundUrl) {
      historyManager.registerUrl(fingerprint, foundUrl);
      return foundUrl;
    }
  } catch (e) {
    // continue
  }

  // Not found
  historyManager.markNotFound(fingerprint);
  return undefined;
}
