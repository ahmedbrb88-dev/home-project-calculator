import type { PriceData, PriceRequest } from './types';

// Valid units
export type Unit = 'kg' | 'tonne' | 'm³' | 'litre' | 'gallon' | 'm²' | 'pièce' | 'sac' | 'boîte';

export interface ConversionRule {
  fromUnit: string;
  toUnit: string;
  factor: number;
}

// Only EXACT mathematical conversions allowed.
// A bag -> m3 is NOT allowed without density/weight info, which we don't store generically here.
export const CONVERSIONS: ConversionRule[] = [
  { fromUnit: 'kg', toUnit: 'tonne', factor: 0.001 },
  { fromUnit: 'tonne', toUnit: 'kg', factor: 1000 },
];

export function canConvert(fromUnit: string, toUnit: string): boolean {
  if (fromUnit === toUnit) return true;
  return CONVERSIONS.some(c => c.fromUnit === fromUnit && c.toUnit === toUnit);
}

export function convertPrice(price: number, fromUnit: string, toUnit: string): number | null {
  if (fromUnit === toUnit) return price;
  
  const rule = CONVERSIONS.find(c => c.fromUnit === fromUnit && c.toUnit === toUnit);
  if (!rule) return null; // Conversion forbidden
  
  return price / rule.factor; // If we know 1 kg = 0.001 tonne, price per tonne = price per kg / 0.001
}

export function isMaterialCompatible(req: PriceRequest, data: PriceData): boolean {
  // 1. If the request explicitly asks for taxonomy matching
  if (req.materialFamily) {
    if (data.materialFamily !== req.materialFamily) return false;
    
    // Optional further specificity
    if (req.materialType && data.materialType && data.materialType !== req.materialType) return false;
    if (req.productForm && data.productForm && data.productForm !== req.productForm) return false;
  } else {
    // Legacy matching based purely on ID if family isn't specified
    if (req.materialId !== data.materialId) return false;
  }

  // 2. Unit conversion matching
  if (req.unit !== data.unit) {
    if (!canConvert(data.unit, req.unit)) {
      return false;
    }
  }

  return true;
}
