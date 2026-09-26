import { priceEngine } from './engine.js';
import type { PriceRequest } from './types.js';

let failed = 0;
let passed = 0;

function assertEqual(name: string, actual: any, expected: any) {
  if (actual === expected) {
    console.log(`[PASS] ${name}`);
    passed++;
  } else {
    console.error(`[FAIL] ${name} - Expected ${expected} but got ${actual}`);
    failed++;
  }
}

function runTests() {
  console.log("--- RUNNING PRICE ENGINE TESTS ---");

  // TEST A: France + EUR + region disponible -> prix régional utilisé
  const reqA: PriceRequest = {
    materialId: 'gravel_standard',
    country: 'FR',
    region: 'Ile-de-France',
    currency: 'EUR',
    unit: 'tonne'
  };
  const resA = priceEngine.getIndicativePrice(reqA);
  assertEqual("TEST A: Regional Match (typicalPrice)", resA?.typicalPrice, 45);

  // TEST B: France + EUR + region non disponible -> fallback national utilisé
  const reqB: PriceRequest = {
    materialId: 'gravel_standard',
    country: 'FR',
    region: 'Bretagne',
    currency: 'EUR',
    unit: 'tonne'
  };
  const resB = priceEngine.getIndicativePrice(reqB);
  assertEqual("TEST B: National Fallback (typicalPrice)", resB?.typicalPrice, 40);
  assertEqual("TEST B: Regional Fallback check sources", resB?.sources[0].name, "National Average FR");

  // TEST C: Pays sans données -> null -> aucun prix inventé
  const reqC: PriceRequest = {
    materialId: 'gravel_standard',
    country: 'IT',
    currency: 'EUR',
    unit: 'tonne'
  };
  const resC = priceEngine.getIndicativePrice(reqC);
  assertEqual("TEST C: No Data for Country", resC, null);

  // TEST D: Devise différente -> aucune conversion -> null
  const reqD: PriceRequest = {
    materialId: 'gravel_standard',
    country: 'FR',
    currency: 'USD',
    unit: 'tonne'
  };
  const resD = priceEngine.getIndicativePrice(reqD);
  assertEqual("TEST D: Currency Mismatch (no automatic conversion)", resD, null);

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Tests failed");
}

runTests();
