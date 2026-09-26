import { PriceCandidate } from '../candidate.js';
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
  console.log("--- RUNNING DISCOVERY & SELECTION TESTS ---");

  const c1: PriceCandidate = {
    candidateId: 'c1',
    country: 'FR',
    materialFamily: 'paint',
    productForm: 'container',
    commercialUnit: 'container',
    physicalUnit: 'litre',
    packageSize: 2.5,
    price: 35.0,
    currency: 'EUR',
    taxIncluded: true,
    sourceName: 'Store A',
    sourceUrl: 'http://a',
    checkedAt: new Date(Date.now() - 10000).toISOString(),
    confidence: 'medium',
    discoveryMethod: 'scraper',
    providerId: 'store_a'
  };

  const c2: PriceCandidate = {
    candidateId: 'c2',
    country: 'FR',
    materialFamily: 'paint',
    productForm: 'container',
    commercialUnit: 'container',
    physicalUnit: 'litre',
    packageSize: 2.5,
    price: 34.0, // Cheaper, but same everything else
    currency: 'EUR',
    taxIncluded: true,
    sourceName: 'Store B',
    sourceUrl: 'http://b',
    checkedAt: new Date(Date.now()).toISOString(), // Fresher
    confidence: 'medium',
    discoveryMethod: 'scraper',
    providerId: 'store_b'
  };

  const cLow: PriceCandidate = {
    ...c1,
    candidateId: 'cLow',
    confidence: 'low'
  };

  const cAnomaly: PriceCandidate = {
    ...c1,
    candidateId: 'cAnomaly',
    price: 100.0 // Huge jump
  };

  // TEST 1: Low confidence is rejected
  const res1 = selectBestCandidate([cLow]);
  assert(res1.selected === null, 'Low confidence candidates are rejected');
  assert(res1.rejected.length === 1, 'Low confidence candidate in rejected array');

  // TEST 2: Anomaly is flagged and rejected if previous price exists
  const prevPrice = {
    id: 'prev',
    materialId: 'prev',
    country: 'FR',
    currency: 'EUR',
    unit: 'container',
    typicalPrice: 35.0,
    isDemo: false
  };
  const res2 = selectBestCandidate([cAnomaly], prevPrice as any);
  assert(res2.selected === null, 'Anomalous candidate is rejected');
  assert(res2.anomalies.length === 1, 'Anomalous candidate in anomalies array');

  // TEST 3: Selection prefers fresher data if priorities tie (here assuming tie)
  const res3 = selectBestCandidate([c1, c2]);
  assert(res3.selected !== null, 'A candidate was selected');
  assert(res3.selected?.sources?.[0]?.name === 'Store B', 'Fresher candidate selected when priorities tie');
  assert(res3.rejected.length === 1, 'Slower/older candidate is in rejected array');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Discovery tests failed");
}

runTests();
