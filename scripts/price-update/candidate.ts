export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type MatchingStatus = 'EXACT_MATCH' | 'POSSIBLE_MATCH' | 'DIFFERENT_PRODUCT' | 'INSUFFICIENT_DATA';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface ProductIdentity {
  productIdentityId?: string;
  materialFamily: string;
  materialType?: string;
  brand?: string;
  productName?: string;
  productVariant?: string;
  dimensions?: string;
  finish?: string;
  application?: string;
  country: string;
  region?: string;
}

export interface PackageVariant {
  productForm: string;
  commercialUnit: string;
  physicalUnit: string;
  packageSize: number;
  coveragePerUnit?: number;
}

export type PriceType = 'EXACT_PRODUCT_PRICE' | 'MARKET_PRICE_RANGE' | 'UNKNOWN';

export interface PriceCandidate {
  candidateId: string;
  country: string;
  region?: string;
  materialFamily: string;
  materialType?: string;
  productForm: string;
  commercialUnit: string;
  physicalUnit: string;
  packageSize?: number; // Optional for MARKET_REFERENCE
  coveragePerUnit?: number;
  
  priceType?: PriceType;
  price?: number; // Optional for MARKET_REFERENCE
  minPrice?: number;
  maxPrice?: number;
  
  currency: string;
  taxIncluded?: boolean;
  sourceName: string;
  sourceUrl: string;
  checkedAt: string;
  confidence: ConfidenceLevel;
  notes?: string;
  discoveryMethod: 'manual' | 'scraper' | 'api' | 'user_submitted';
  providerId?: string;

  // Phase 16 additions
  productIdentity?: ProductIdentity;
  productFingerprint?: string;
  packageVariant?: PackageVariant;
  matchingStatus?: MatchingStatus;
  matchingConfidence?: ConfidenceLevel;
}

export interface ReviewQueueEntry {
  candidateId: string;
  reason: string;
  source: string;
  product: string;
  detectedAt: string;
  status: ReviewStatus;
}

