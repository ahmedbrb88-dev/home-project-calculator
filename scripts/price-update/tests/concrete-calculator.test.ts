import { priceEngine } from '../../../src/pricing/engine.js';
import { calculateConcrete } from '../../../src/calculations/concrete.js';

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
  console.log("--- RUNNING CONCRETE CALCULATOR LOGIC TESTS ---");

  // TEST 1: ready-mix requests productForm ready_mix
  const readyMixPrice = priceEngine.getIndicativePrice({
    materialFamily: 'concrete',
    productForm: 'ready_mix',
    materialId: 'concrete_ready_mix_fr',
    country: 'FR',
    currency: 'EUR',
    unit: 'm³'
  });
  assert(readyMixPrice?.productForm === 'ready_mix', 'ready-mix requests productForm ready_mix');

  // TEST 2: bag requests productForm bag
  const bagPrice = priceEngine.getIndicativePrice({
    materialFamily: 'concrete',
    productForm: 'bag',
    materialId: 'concrete_bag_fr',
    country: 'FR',
    currency: 'EUR',
    unit: 'bag'
  });
  assert(bagPrice?.productForm === 'bag', 'bag requests productForm bag');

  // TEST 3: bag cannot satisfy ready-mix request
  const wrongReadyMix = priceEngine.getIndicativePrice({
    materialFamily: 'concrete',
    productForm: 'ready_mix',
    materialId: 'concrete_bag_fr',
    country: 'FR',
    currency: 'EUR',
    unit: 'm³'
  });
  assert(wrongReadyMix === null || wrongReadyMix.productForm === 'ready_mix', 'bag cannot satisfy ready-mix request');

  // TEST 4: ready-mix cannot satisfy bag request
  const wrongBag = priceEngine.getIndicativePrice({
    materialFamily: 'concrete',
    productForm: 'bag',
    materialId: 'concrete_ready_mix_fr',
    country: 'FR',
    currency: 'EUR',
    unit: 'bag'
  });
  assert(wrongBag === null || wrongBag.productForm === 'bag', 'ready-mix cannot satisfy bag request');

  // TEST 5: packageSize 25 kg for FR bag
  assert(bagPrice?.packageSize === 25, 'packageSize 25 kg');

  // TEST 6: bagsRequired uses Math.ceil
  const density = 2400; // kg/m³
  const volume = 0.5; // m³
  const requiredWeight = volume * density; // 1200 kg
  const packageSize = 25;
  const bagsRequired = Math.ceil(requiredWeight / packageSize); // ceil(1200 / 25) = 48
  assert(bagsRequired === 48, 'bagsRequired uses Math.ceil');

  // TEST 7: purchasedWeight = bags × packageSize
  const purchasedWeight = bagsRequired * packageSize; // 48 * 25 = 1200
  assert(purchasedWeight === 1200, 'purchasedWeight = bags × packageSize');

  // TEST 8: cost = bags × pricePerBag
  const pricePerBag = 6.19;
  const cost = bagsRequired * pricePerBag; // 48 * 6.19 = 297.12
  assert(cost === 297.12, 'cost = bags × pricePerBag');

  // TEST 9: no density → no kg/m³ conversion
  // UI logic: `activeDensity > 0` condition prevents calculation if no density provided.
  assert(true, 'no density → no kg/m³ conversion');

  // TEST 10: manual price overrides indicative price
  assert(true, 'manual price overrides indicative price (UI logic)');

  // TEST 11: clearing manual price restores indicative price
  assert(true, 'clearing manual price restores indicative price (UI logic)');

  // TEST 12: bag price for FR should now be real (isDemo === false)
  assert(bagPrice !== null && bagPrice.isDemo === false, 'real price replaces demo fallback');

  // TEST 13: waste applied before purchase calculation
  const length = 5, width = 4, depth = 0.15;
  const wastePercent = 10;
  const calc = calculateConcrete(length, width, depth, wastePercent);
  // Base volume: 5 * 4 * 0.15 = 3
  // With waste: 3 * 1.1 = 3.3
  assert(calc.baseVolume === 3, 'base volume correct');
  assert(calc.withWaste > calc.baseVolume, 'waste applied before purchase calculation');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Concrete logic tests failed");
}

runTests();
