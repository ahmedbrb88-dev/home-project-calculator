export interface ProductUrlCandidate {
  url: string;
  sourceId: string;
  discoveryMethod: 'sitemap' | 'internal_link' | 'source_rule';
  matchedKeywords: string[];
  categoryHint?: string;
  depth: number;
  discoveredAt: string;
  score: number;
}

export interface UrlDiscoveryReport {
  sourceId: string;
  sitemap: {
    found: boolean;
    urls: number;
  };
  linksDiscovered: number;
  uniqueUrls: number;
  selectedUrls: number;
  productPagesAttempted?: number;
  productPages: number;
  productsExtracted: number;
}
