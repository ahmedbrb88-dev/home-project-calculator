import { RawPriceData } from './types.js';
import { PriceData } from '../../src/pricing/types.js';

export function normalizePriceData(raw: RawPriceData): Partial<PriceData> {
  const num = (v: any) => {
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const parsed = parseFloat(v.replace(/[^0-9.-]+/g,""));
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  };

  const typicalPrice = num(raw.price);

  return {
    id: `${raw.materialId}_${raw.country}_${raw.region || 'national'}`,
    materialId: raw.materialId as any,
    country: raw.country,
    region: raw.region,
    currency: raw.currency,
    unit: raw.unit,
    typicalPrice: typicalPrice || 0,
    minPrice: num(raw.minPrice),
    maxPrice: num(raw.maxPrice),
    isDemo: false, // Normalizer always assumes false for real pipeline
    taxIncluded: raw.taxIncluded,
    materialFamily: raw.materialFamily,
    materialType: raw.materialType,
    productForm: raw.productForm,
    commercialUnit: raw.commercialUnit,
    physicalUnit: raw.physicalUnit,
    packageSize: raw.packageSize,
    coveragePerUnit: raw.coveragePerUnit,
    sources: [
      {
        name: raw.source || 'Unknown',
        url: raw.sourceUrl,
        retrievedAt: new Date().toISOString(),
        publishedAt: raw.publishedAt,
        confidence: 'medium',
        notes: raw.notes
      }
    ]
  };
}
