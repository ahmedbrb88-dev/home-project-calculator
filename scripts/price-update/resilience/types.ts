export type SourceStatus = 'ACTIVE' | 'DEGRADED' | 'TEMPORARILY_UNAVAILABLE' | 'UNAVAILABLE' | 'RETIRED' | 'BLOCKED';

export interface SourceHealth {
  sourceId: string;
  name: string;
  country: string;
  domain: string;
  status: SourceStatus;
  sourceType: string;
  priority: number;
  enabled: boolean;
  lastCheckedAt?: string;
  lastSuccessfulFetchAt?: string;
  lastSuccessfulDiscoveryAt?: string;
  lastSuccessfulExtractionAt?: string;
  consecutiveFailures: number;
  productsDiscovered: number;
  productsExtracted: number;
  validCandidates: number;
  rejectedCandidates: number;
  lastError?: string;
  healthScore: number; // 0 to 100
}

export type UrlStatus = 'ACTIVE' | 'REDIRECTED' | 'MOVED' | 'NOT_FOUND' | 'TEMPORARILY_UNAVAILABLE' | 'UNKNOWN';

export interface UrlHistory {
  productFingerprint: string;
  canonicalUrl?: string;
  currentUrl: string;
  previousUrls: string[];
  firstSeenAt: string;
  lastSeenAt: string;
  lastSuccessfulFetchAt?: string;
  urlStatus: UrlStatus;
}

export type CandidateStatus = 'DISCOVERED' | 'CANDIDATE' | 'TESTING' | 'VALIDATED' | 'PENDING_ACTIVATION' | 'ACTIVE' | 'REJECTED' | 'LOW_QUALITY' | 'BLOCKED' | 'RETIRED' | 'UNAVAILABLE';

export interface SourceCandidate {
  candidateId: string;
  domain: string;
  country: string;
  detectedName?: string;
  sourceType?: string;
  discoveryMethod: string;
  discoveredAt: string;
  relevanceScore: number;
  status: CandidateStatus;
  evidence: string[];
  reason?: string;
  testResult?: 'VALIDATED' | 'REJECTED' | 'BLOCKED' | 'UNAVAILABLE' | 'LOW_QUALITY';
  lastTestedAt?: string;
  lastValidatedAt?: string;
  productsTested?: number;
  productsValid?: number;
  productsRejected?: number;
  productsInsufficientData?: number;
}

export type PriceStatus = 'VALID' | 'STALE' | 'SOURCE_UNAVAILABLE' | 'PENDING_VALIDATION' | 'REJECTED';

export interface PriceMetadata {
  sourceId: string;
  sourceName: string;
  sourceUrl?: string;
  productUrl: string;
  canonicalUrl?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  lastValidatedAt?: string;
  previousPrice?: number;
  previousValidPrice?: number;
  priceStatus: PriceStatus;
  freshness: string; // ISO duration or similar
  extractionMethod: string;
}
