import { isMaterialCompatible, convertPrice, canConvert } from '../../../src/pricing/taxonomy.js';
import { PriceRequest, PriceData } from '../../../src/pricing/types.js';

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
  console.log("--- RUNNING MATCHING & CONVERSION TESTS ---");

  // TEST 1: gravel bag 35kg ≠ gravel tonne
  const req1: PriceRequest = {
    materialFamily: 'gravel',
    productForm: 'bulk',
    materialId: 'gravel_standard',
    country: 'FR',
    currency: 'EUR',
    unit: 'tonne'
  };
  const data1: PriceData = {
    materialFamily: 'gravel',
    productForm: 'bag',
    materialId: 'gravel_concrete_6_20_35kg',
    country: 'FR',
    currency: 'EUR',
    unit: 'sac',
    lowPrice: 4, typicalPrice: 4.88, highPrice: 6,
    sources: [], lastChecked: '', lastUpdated: '', confidence: 'medium', pricingVersion: '1.0'
  };
  assert(isMaterialCompatible(req1, data1) === false, 'gravel bag 35kg ≠ gravel tonne (different productForm)');

  // TEST 2: concrete bag ≠ ready mix
  const req2: PriceRequest = { ...req1, materialFamily: 'concrete', productForm: 'ready_mix' };
  const data2: PriceData = { ...data1, materialFamily: 'concrete', productForm: 'bag' };
  assert(isMaterialCompatible(req2, data2) === false, 'concrete bag ≠ ready mix');

  // TEST 3: real product cannot replace incompatible calculator material
  // Same as Test 1
  assert(isMaterialCompatible(req1, data1) === false, 'real product cannot replace incompatible calculator material');

  // TEST 4: exact matching returns real price (returns true)
  const req4: PriceRequest = {
    materialFamily: 'gravel',
    productForm: 'bag',
    materialId: 'gravel_concrete_6_20_35kg',
    country: 'FR',
    currency: 'EUR',
    unit: 'sac'
  };
  assert(isMaterialCompatible(req4, data1) === true, 'exact matching returns true');

  // TEST 5: incompatible matching returns null
  // This is handled in PriceEngine, but isMaterialCompatible returning false ensures it.
  assert(isMaterialCompatible(req1, data1) === false, 'incompatible matching returns false');

  // TEST 6: kg → tonne conversion works
  assert(canConvert('kg', 'tonne') === true, 'kg -> tonne is convertible');
  assert(convertPrice(50, 'kg', 'tonne') === 50000, '50 EUR/kg -> 50000 EUR/tonne');

  // TEST 7: bag → m³ conversion is rejected without density
  assert(canConvert('sac', 'm³') === false, 'sac -> m³ is rejected without density');
  
  // TEST 8: demo data still works when compatible
  const data8: PriceData = {
    materialFamily: 'gravel',
    productForm: 'bulk',
    materialId: 'gravel_standard',
    country: 'FR',
    currency: 'EUR',
    unit: 'tonne',
    lowPrice: 40, typicalPrice: 50, highPrice: 60,
    sources: [], lastChecked: '', lastUpdated: '', confidence: 'medium', pricingVersion: '1.0',
    isDemo: true
  };
  assert(isMaterialCompatible(req1, data8) === true, 'demo data still works when compatible');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Matching tests failed");
}

runTests();
