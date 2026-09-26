export interface PriceSource {
  name: string;
  url?: string;
}

export interface PriceData {
  id?: string;
  materialFamily?: string;
  materialType?: string;
  productForm?: string;
  commercialUnit?: string;
  physicalUnit?: string;
  packageSize?: number;
  coveragePerUnit?: number;

  materialId: string;
  country: string;
  region?: string;
  currency: string;
  unit: string;
  lowPrice: number;
  typicalPrice: number;
  highPrice: number;
  sources: PriceSource[];
  lastChecked: string;
  lastUpdated: string;
  confidence: 'high' | 'medium' | 'low';
  pricingVersion: string;
  priceHistory?: { date: string; price: number }[];
  isDemo?: boolean;
  taxIncluded?: boolean;
}

export interface PriceRequest {
  materialFamily?: string;
  materialType?: string;
  productForm?: string;
  materialId: string;
  country: string;
  region?: string;
  currency: string;
  unit: string;
}
