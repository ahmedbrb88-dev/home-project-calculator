import { priceEngine } from '../../../src/pricing/engine.js';

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
  console.log("--- RUNNING US TILE ISOLATION AND CALCULATOR TESTS ---");

  // TEST 1: FR request does not get US data
  const frTile = priceEngine.getIndicativePrice({
    materialFamily: 'tile',
    productForm: 'box',
    materialId: 'ceramic_tile_box_fr',
    country: 'FR',
    currency: 'EUR',
    unit: 'box'
  });
  
  assert(frTile !== null && frTile.country === 'FR', 'FR request receives FR data');
  assert(frTile?.currency === 'EUR', 'FR data has EUR currency');
  // It shouldn't be 152.73
  assert(frTile?.typicalPrice !== 152.73, 'FR data does not return US price');

  // TEST 2: US request gets US data (not FR data)
  const usTile = priceEngine.getIndicativePrice({
    materialFamily: 'tile',
    productForm: 'box',
    materialId: 'ceramic_tile_box_us',
    country: 'US',
    currency: 'USD',
    unit: 'box'
  });

  assert(usTile !== null && usTile.country === 'US', 'US request receives US data');
  assert(usTile?.currency === 'USD', 'US data has USD currency');
  assert(usTile?.isDemo === false, 'US request receives REAL price');
  assert(usTile?.typicalPrice === 152.73, 'US price is exactly $152.73');
  assert(usTile?.taxIncluded === false, 'US price is marked taxIncluded=false');
  assert(usTile?.packageSize === 15.49, 'US box covers 15.49 sq ft');

  // TEST 3: Tile Calculator for US (using area=100 sq ft, 10% waste)
  const areaRequired = 100; 
  const areaToPurchase = 110; // 100 + 10% waste
  const packageSize = usTile!.packageSize!;
  const boxesRequired = Math.ceil(areaToPurchase / packageSize); // ceil(110 / 15.49) = ceil(7.1) = 8
  
  assert(boxesRequired === 8, 'Calculator rounds up to 8 boxes for 110 sq ft with 15.49 sq ft per box');
  
  const purchasedArea = boxesRequired * packageSize; // 8 * 15.49 = 123.92
  assert(Math.abs(purchasedArea - 123.92) < 0.001, 'Purchased area correctly derived from boxes');

  const cost = boxesRequired * usTile!.typicalPrice; // 8 * 152.73 = 1221.84
  assert(Math.abs(cost - 1221.84) < 0.001, 'Total cost correctly calculated from box price');

  // TEST 4: US fallback when real data doesn't exist (e.g. Paint US, hasn't been added real yet)
  const usPaint = priceEngine.getIndicativePrice({
    materialFamily: 'paint',
    productForm: 'container',
    materialId: 'paint_interior_container_us',
    country: 'US',
    currency: 'USD',
    unit: 'container'
  });

  assert(usPaint !== null && usPaint.isDemo === true, 'Missing US real data falls back to US demo data, not FR real data');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("US Tile tests failed");
}

runTests();
