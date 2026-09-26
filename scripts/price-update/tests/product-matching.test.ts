import { ProductIdentity, PackageVariant, PriceCandidate } from '../candidate.js';
import { matchProduct, generateProductFingerprint } from '../matching.js';
import { selectBestCandidate } from '../selection.js';

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
  console.log("--- RUNNING PRODUCT MATCHING & SELECTION TESTS ---");

  const baseProduct: ProductIdentity = {
    materialFamily: 'paint',
    materialType: 'interior',
    brand: 'Dulux Valentine',
    productName: 'Crème de Couleur',
    country: 'FR'
  };

  const baseVariant: PackageVariant = {
    productForm: 'container',
    commercialUnit: 'container',
    physicalUnit: 'litre',
    packageSize: 1.25
  };

  const candidateIdentity: ProductIdentity = {
    materialFamily: 'paint',
    materialType: 'interior',
    brand: 'DULUX VALENTINE ',
    productName: ' Creme de couleur', // normalizer handles accents and space
    country: 'FR'
  };

  const candidateVariant: PackageVariant = { ...baseVariant };

  // 1. Exact match
  assert(matchProduct(baseProduct, candidateIdentity, baseVariant, candidateVariant) === 'EXACT_MATCH', '1. exact product match (normalization succeeds)');

  // 2. Different brand
  assert(matchProduct(baseProduct, { ...candidateIdentity, brand: 'Tollens' }, baseVariant, candidateVariant) === 'DIFFERENT_PRODUCT', '2. different brand');

  // 3. Different package size
  assert(matchProduct(baseProduct, candidateIdentity, baseVariant, { ...candidateVariant, packageSize: 2.5 }) === 'DIFFERENT_PRODUCT', '3. different package size implies different price commercial unit');

  // 4. Different product variant
  assert(matchProduct({ ...baseProduct, productVariant: 'Mat' }, { ...candidateIdentity, productVariant: 'Satin' }, baseVariant, candidateVariant) === 'DIFFERENT_PRODUCT', '4. different product variant');

  // 5. Different dimensions
  assert(matchProduct({ ...baseProduct, dimensions: '60x60' }, { ...candidateIdentity, dimensions: '30x60' }, baseVariant, candidateVariant) === 'DIFFERENT_PRODUCT', '5. different dimensions');

  // 6. Same product / different retailer
  // Matching doesn't care about retailer, so exact match still holds
  assert(matchProduct(baseProduct, candidateIdentity, baseVariant, candidateVariant) === 'EXACT_MATCH', '6. same product / different retailer (matching is identical)');

  // 7. Same product / different package
  assert(matchProduct(baseProduct, candidateIdentity, baseVariant, { ...candidateVariant, packageSize: 5 }) === 'DIFFERENT_PRODUCT', '7. same product / different package (is DIFFERENT_PRODUCT for pricing matching)');

  // 8. Insufficient product data
  assert(matchProduct(baseProduct, { ...candidateIdentity, brand: '' }, baseVariant, candidateVariant) === 'INSUFFICIENT_DATA', '8. insufficient product data');

  // 9. Possible match
  assert(matchProduct({ ...baseProduct, finish: 'Mat' }, candidateIdentity, baseVariant, candidateVariant) === 'POSSIBLE_MATCH', '9. possible match (one missing finish)');

  // 10. Fingerprint consistency
  const fp1 = generateProductFingerprint(baseProduct, baseVariant);
  const fp2 = generateProductFingerprint(candidateIdentity, candidateVariant);
  assert(fp1 === fp2, '10. fingerprint consistency across normalized values');

  // Next, selection logic
  const candidate1: PriceCandidate = {
    candidateId: 'c1',
    country: 'FR',
    materialFamily: 'paint',
    productForm: 'container',
    commercialUnit: 'container',
    physicalUnit: 'litre',
    packageSize: 1.25,
    price: 38.90,
    currency: 'EUR',
    taxIncluded: true,
    sourceName: 'Store A',
    sourceUrl: '',
    checkedAt: new Date(Date.now() - 1000).toISOString(),
    confidence: 'high',
    discoveryMethod: 'scraper',
    productIdentity: candidateIdentity,
    packageVariant: candidateVariant
  };

  const candidate2: PriceCandidate = {
    ...candidate1,
    candidateId: 'c2',
    price: 39.50,
    sourceName: 'Store B',
    checkedAt: new Date(Date.now()).toISOString(), // fresher
  };

  // 11, 12, 13. Historical price matching & multiple source & price selection
  const res1 = selectBestCandidate([candidate1, candidate2], undefined, baseProduct, baseVariant);
  assert(res1.selected !== null && res1.selected.sources?.[0].name === 'Store B', '11/12/13. fresher data selected among EXACT_MATCH candidates');

  // 14. Anomaly + product identity
  const candidateAnomaly = { ...candidate1, price: 99.0 }; // huge jump
  const prevPrice = { typicalPrice: 38.0 } as any;
  const res2 = selectBestCandidate([candidateAnomaly], prevPrice, baseProduct, baseVariant);
  assert(res2.selected === null && res2.anomalies.length === 1, '14. anomaly detected with matching product identity');

  // 15 & 16. Rejected candidate & Accepted candidate
  const candidateDiff = { ...candidate1, productIdentity: { ...candidateIdentity, brand: 'Tollens' } };
  const res3 = selectBestCandidate([candidate1, candidateDiff], undefined, baseProduct, baseVariant);
  assert(res3.selected?.sources?.[0].name === 'Store A', '16. exact match accepted');
  assert(res3.rejected.some(c => c.candidateId === candidateDiff.candidateId), '15. different product candidate rejected');

  // 17. Review queue (POSSIBLE_MATCH -> needsReview)
  const candidatePossible = { ...candidate1, productIdentity: { ...candidateIdentity, finish: '' } }; // Missing finish vs expected
  const expectedPossible = { ...baseProduct, finish: 'Mat' };
  const res4 = selectBestCandidate([candidatePossible], undefined, expectedPossible, baseVariant);
  assert(res4.selected === null && res4.needsReview.length === 1, '17. possible match placed in review queue');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Product Matching tests failed");
}

runTests();
