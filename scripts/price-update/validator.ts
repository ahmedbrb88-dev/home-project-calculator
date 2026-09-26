import { ValidationResult } from './types.js';
import { PriceData } from '../../src/pricing/types.js';

export function validatePriceData(
  candidate: Partial<PriceData>,
  previousValidPrice?: PriceData
): ValidationResult {
  // Required fields check
  if (!candidate.materialId) return { valid: false, reason: 'Missing materialId' };
  if (!candidate.country) return { valid: false, reason: 'Missing country' };
  if (!candidate.currency) return { valid: false, reason: 'Missing currency' };
  if (!candidate.unit) return { valid: false, reason: 'Missing unit' };
  if (!candidate.sources || candidate.sources.length === 0) return { valid: false, reason: 'Missing source' };
  
  const source = candidate.sources[0];
  if (!source.name || source.name === 'Unknown') return { valid: false, reason: 'Missing source name' };
  if (!source.retrievedAt) return { valid: false, reason: 'Missing retrievedAt' };

  // Numeric checks
  if (typeof candidate.typicalPrice !== 'number' || isNaN(candidate.typicalPrice) || !isFinite(candidate.typicalPrice)) {
    return { valid: false, reason: 'Invalid typicalPrice (NaN/Infinite/Missing)' };
  }
  if (candidate.typicalPrice <= 0) {
    return { valid: false, reason: 'typicalPrice must be > 0' };
  }

  // Anomaly Detection (e.g. > 50% change from previous price)
  if (previousValidPrice) {
    const prev = previousValidPrice.typicalPrice;
    const curr = candidate.typicalPrice;
    const change = Math.abs(curr - prev) / prev;
    if (change > 0.5) {
      return { 
        valid: false, 
        reason: `Anomaly detected: Price changed by ${(change * 100).toFixed(1)}% (from ${prev} to ${curr})` 
      };
    }
  }

  return { valid: true, price: candidate as PriceData };
}
