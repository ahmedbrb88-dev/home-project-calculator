import { validatePriceData } from '../validator.js';
import { normalizePriceData } from '../normalizer.js';
import { PointPFR } from '../sources/retail/PointPFR.js';

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

async function runPointPTests() {
  console.log("--- RUNNING POINTP CONNECTOR TESTS ---");
  
  const provider = new PointPFR();
  
  assert(provider.name === 'Point.P France', 'Name should be Point.P France');
  
  const prices = await provider.fetchPrices();
  assert(prices.length > 0, 'Should return at least one price');
  
  const raw = prices[0];
  assert(raw.materialId === 'gravel_concrete_6_20_35kg', 'Should use precise material ID');
  assert(raw.unit === 'sac', 'Should keep commercial unit');
  assert(raw.taxIncluded === true, 'Should capture tax inclusion');
  
  const normalized = normalizePriceData(raw);
  const validated = validatePriceData(normalized);
  
  assert(validated.valid === true, 'Data should pass validation');
  assert(validated.price?.typicalPrice === 4.88, 'Price should be correctly parsed');
  assert(validated.price?.isDemo === false, 'isDemo should be false');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("PointP tests failed");
}

runPointPTests();
