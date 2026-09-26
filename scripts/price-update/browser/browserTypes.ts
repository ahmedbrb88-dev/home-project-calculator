export interface BrowserFetchResult {
  success: boolean;
  url: string;
  finalUrl: string;
  statusCode: number;
  rendered: boolean;
  blocked: boolean;
  html: string;
  title: string;
  error?: string;
  loadTimeMs: number;
}

export interface RawProductCandidate {
  brand?: string;
  productName?: string;
  productVariant?: string;
  price?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
  priceType?: 'EXACT_PRODUCT_PRICE' | 'MARKET_PRICE_RANGE' | 'UNKNOWN';
  currency?: string;
  packageSize?: number;
  commercialUnit?: string;
  physicalUnit?: string;
  productForm?: string;
  taxIncluded?: boolean;
  dimensions?: string;
  finish?: string;
  application?: string;
  coveragePerUnit?: number;
  density?: number;
  sku?: string;
  ean?: string;
  mpn?: string;
  weight?: string;
  volume?: string;
  attributeConflict?: boolean;
  sourceUrl?: string;
}

export interface SourceBrowserExtractor {
  canHandle(url: string): boolean;
  extract(html: string, url: string): Promise<RawProductCandidate[]>;
}
