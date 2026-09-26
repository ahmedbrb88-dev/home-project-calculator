import { PriceData } from '../../src/pricing/types.js';

export interface RawPriceData {
  materialId?: string;
  country?: string;
  region?: string;
  currency?: string;
  unit?: string;
  price?: number | string;
  minPrice?: number | string;
  maxPrice?: number | string;
  source?: string;
  sourceUrl?: string;
  publishedAt?: string;
  notes?: string;
  taxIncluded?: boolean;
  [key: string]: any;
}

export interface PriceSourceProvider {
  name: string;
  fetchPrices(): Promise<RawPriceData[]>;
}

export interface ValidationResult {
  valid: boolean;
  price?: PriceData;
  reason?: string;
}

export interface UpdateReport {
  date: string;
  sourcesChecked: number;
  pricesFound: number;
  pricesAccepted: number;
  pricesRejected: number;
  pricesUnchanged: number;
  pricesUpdated: number;
  errors: number;
  warnings: number;
  rejections: {
    material: string;
    country: string;
    source: string;
    reason: string;
  }[];
}
