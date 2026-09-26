import { validatePriceData } from '../validator.js';
import { normalizePriceData } from '../normalizer.js';
import { RawPriceData } from '../types.js';
import { PriceData } from '../../../src/pricing/types.js';

let failed = 0;
let passed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

function runTests() {
  console.log("--- RUNNING PRICE UPDATE TESTS ---");

  // 1. Dataset valide
  const validRaw: RawPriceData = {
    materialId: 'gravel_standard',
    country: 'FR',
    region: 'Ile-de-France',
    currency: 'EUR',
    unit: 'tonne',
    price: 45,
    source: 'Test Source',
    sourceUrl: 'https://example.com'
  };
  const validNormalized = normalizePriceData(validRaw);
  const validResult = validatePriceData(validNormalized);
  assert(validResult.valid === true, 'Valid dataset should be accepted');
  assert(validNormalized.isDemo === false, 'Normalized data should not be demo');

  // 2. Prix négatif
  const negRaw = { ...validRaw, price: -10 };
  const negResult = validatePriceData(normalizePriceData(negRaw));
  assert(negResult.valid === false && negResult.reason?.includes('> 0'), 'Negative price should be rejected');

  // 3. Prix zéro
  const zeroRaw = { ...validRaw, price: 0 };
  const zeroResult = validatePriceData(normalizePriceData(zeroRaw));
  assert(zeroResult.valid === false && zeroResult.reason?.includes('> 0'), 'Zero price should be rejected');

  // 4. Currency absente
  const noCurrRaw = { ...validRaw, currency: undefined };
  const noCurrResult = validatePriceData(normalizePriceData(noCurrRaw));
  assert(noCurrResult.valid === false && noCurrResult.reason?.includes('currency'), 'Missing currency should be rejected');

  // 5. Source absente
  const noSourceRaw = { ...validRaw, source: undefined };
  const noSourceResult = validatePriceData(normalizePriceData(noSourceRaw));
  assert(noSourceResult.valid === false && noSourceResult.reason?.includes('source'), 'Missing source should be rejected');

  // 6. Anomalie de prix (> 50%)
  const anomalyRaw = { ...validRaw, price: 90 }; // 45 -> 90 = 100% change
  const previousPrice: PriceData = { ...validNormalized as PriceData, typicalPrice: 45 };
  const anomalyResult = validatePriceData(normalizePriceData(anomalyRaw), previousPrice);
  assert(anomalyResult.valid === false && anomalyResult.reason?.includes('Anomaly detected'), 'Large price jump should trigger anomaly rejection');

  // 7. Conservation du dernier prix valide
  // This logic is tested via the index orchestrator in a full integration test,
  // but we can test that the validator safely passes a small change.
  const smallChangeRaw = { ...validRaw, price: 47 }; // 45 -> 47 = small
  const smallChangeResult = validatePriceData(normalizePriceData(smallChangeRaw), previousPrice);
  assert(smallChangeResult.valid === true, 'Small price change should be accepted');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Update tests failed");
}

runTests();
