import { PriceCandidate, ReviewQueueEntry, ReviewStatus } from './candidate.js';
import { PriceData } from '../../src/pricing/types.js';
import { SourceConfig, SOURCE_REGISTRY } from './registry.js';
import { matchProduct } from './matching.js';

export function selectBestCandidate(
  candidates: PriceCandidate[],
  previousValidPrice?: PriceData,
  expectedIdentity?: PriceCandidate['productIdentity'],
  expectedVariant?: PriceCandidate['packageVariant']
): { selected: PriceData | null; rejected: PriceCandidate[]; anomalies: PriceCandidate[]; needsReview: PriceCandidate[] } {
  if (candidates.length === 0) {
    return { selected: null, rejected: [], anomalies: [], needsReview: [] };
  }

  const anomalies: PriceCandidate[] = [];
  const validCandidates: PriceCandidate[] = [];
  const rejected: PriceCandidate[] = [];
  const needsReview: PriceCandidate[] = [];

  // Step 1: Basic validation & Anomaly Detection & Product Matching
  for (const candidate of candidates) {
    // Must be high or medium confidence
    if (candidate.confidence === 'low') {
      rejected.push(candidate);
      continue;
    }
    
    // Taxonomy essentials check
    if (!candidate.packageSize || !candidate.commercialUnit || !candidate.physicalUnit) {
      rejected.push(candidate);
      continue;
    }

    // Product Matching
    if (expectedIdentity && candidate.productIdentity) {
      const matchResult = matchProduct(expectedIdentity, candidate.productIdentity, expectedVariant, candidate.packageVariant);
      candidate.matchingStatus = matchResult;

      if (matchResult === 'DIFFERENT_PRODUCT') {
        rejected.push(candidate);
        continue;
      }
      
      if (matchResult === 'INSUFFICIENT_DATA' || matchResult === 'POSSIBLE_MATCH') {
        needsReview.push(candidate);
        continue;
      }
      
      // If it's EXACT_MATCH, it can proceed
    } else if (expectedIdentity && !candidate.productIdentity) {
        // Missing identity entirely when expected
        candidate.matchingStatus = 'INSUFFICIENT_DATA';
        needsReview.push(candidate);
        continue;
    }

    // Anomaly detection
    if (previousValidPrice) {
      const prev = previousValidPrice.typicalPrice;
      const change = Math.abs(candidate.price - prev) / prev;
      if (change > 0.5) { // 50% change is flagged as anomaly
        anomalies.push(candidate);
        continue;
      }
    }

    validCandidates.push(candidate);
  }

  if (validCandidates.length === 0) {
    return { selected: null, rejected, anomalies, needsReview };
  }

  // Step 2: Source priority and freshness
  validCandidates.sort((a, b) => {
    const sourceA = SOURCE_REGISTRY.find(s => s.id === a.providerId);
    const sourceB = SOURCE_REGISTRY.find(s => s.id === b.providerId);
    const prioA = sourceA?.priority || 99;
    const prioB = sourceB?.priority || 99;

    if (prioA !== prioB) return prioA - prioB;
    
    const dateA = new Date(a.checkedAt).getTime();
    const dateB = new Date(b.checkedAt).getTime();
    return dateB - dateA;
  });

  const best = validCandidates[0];
  const others = validCandidates.slice(1);
  rejected.push(...others); 

  const selectedPrice: PriceData = {
    id: `${best.materialFamily}_${best.productForm}_${best.country}_national`,
    materialId: `${best.materialFamily}_${best.productForm}_real`,
    country: best.country,
    region: best.region,
    currency: best.currency,
    unit: best.commercialUnit,
    typicalPrice: best.price,
    minPrice: undefined,
    maxPrice: undefined,
    isDemo: false,
    taxIncluded: best.taxIncluded,
    materialFamily: best.materialFamily,
    materialType: best.materialType,
    productForm: best.productForm,
    commercialUnit: best.commercialUnit,
    physicalUnit: best.physicalUnit,
    packageSize: best.packageSize,
    coveragePerUnit: best.coveragePerUnit,
    sources: [
      {
        name: best.sourceName,
        url: best.sourceUrl,
        retrievedAt: best.checkedAt,
        publishedAt: best.checkedAt,
        confidence: best.confidence,
        notes: best.notes
      }
    ]
  };

  return { selected: selectedPrice, rejected, anomalies, needsReview };
}
