export type SourceCandidateStatus = 
  | 'DISCOVERED'
  | 'CANDIDATE'
  | 'TESTING'
  | 'VALIDATED'
  | 'ACTIVE'
  | 'REJECTED'
  | 'BLOCKED'
  | 'LOW_QUALITY'
  | 'RETIRED'
  | 'UNAVAILABLE';

export type SourceDiscoveryMethod = 
  | 'KNOWN_SOURCE_LINKS'
  | 'SITEMAP_DISCOVERY'
  | 'ROBOTS_SITEMAP_DISCOVERY'
  | 'EXTERNAL_LINK_DISCOVERY'
  | 'CATEGORY_DISCOVERY'
  | 'DOMAIN_PATTERN_DISCOVERY'
  | 'SEARCH_QUERY_DISCOVERY'
  | 'PREVIOUS_CANDIDATES';

export type SourceType = 
  | 'PRODUCT_RETAIL'
  | 'MARKETPLACE'
  | 'MARKET_REFERENCE'
  | 'DISTRIBUTOR'
  | 'MANUFACTURER'
  | 'UNKNOWN';

export interface SourceIdentity {
  sourceId: string;
  domain: string;
  country: string;
  detectedName?: string;
  sourceType: SourceType;
  firstDiscoveredAt: string;
  lastSeenAt: string;
  status: SourceCandidateStatus;
}

export interface SourceCandidate {
  candidateId: string;
  domain: string;
  country: string;
  detectedName?: string;
  sourceType: SourceType;
  discoveryMethod: SourceDiscoveryMethod;
  discoveryMethods: SourceDiscoveryMethod[];
  discoveredAt: string;
  queries?: string[];
  relevanceScore: number;
  evidence: string[];
  status: SourceCandidateStatus;
  testResult?: 'VALIDATED' | 'REJECTED' | 'BLOCKED' | 'UNAVAILABLE' | 'LOW_QUALITY';
  lastTestedAt?: string;
  lastValidatedAt?: string;
  lastSuccessfulExtractionAt?: string;
  productsTested?: number;
  productsValid?: number;
  productsRejected?: number;
  productsInsufficientData?: number;
}

export interface DiscoverSourcesOptions {
  country: string;
  materials?: string[];
  maxCandidates?: number;
  maxDomains?: number;
  maxRequests?: number;
  maxPagesPerDomain?: number;
  maxProductTests?: number;
  timeout?: number;
  concurrency?: number;
  dryRun?: boolean;
}

export interface SourceDiscoveryReport {
  country: string;
  queries: number;
  domainsDiscovered: number;
  domainsRejected: number;
  domainsTested: number;
  productPagesFound: number;
  productsTested: number;
  validProductExtractions: number;
  taxonomyCompatible: number;
  sourcesValidated: number;
  sourcesRejected: number;
  sourcesBlocked: number;
  sourcesUnavailable: number;
  
  sources: SourceCandidate[];
}
