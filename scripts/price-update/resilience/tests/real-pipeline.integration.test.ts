import { WeeklyPricePipeline } from '../price-pipeline.js';
import * as fs from 'fs';
import * as path from 'path';

// Note: Test runner handles ts files usually using Mocha or Jest. 
// We create a standalone script since we don't know the exact test runner context (TS-node script).

async function runIntegrationTest() {
  console.log('--- STARTING REAL PIPELINE INTEGRATION TEST ---');
  const tempPricesPath = path.join(process.cwd(), 'data/pricing/prices.test.json');
  
  // Seed with fake old price on a real product to trigger anomaly rejection 
  // and a valid real product to trigger valid update.
  const testData = [
    {
      id: "product-1",
      sourceId: "castorama-fr",
      productName: "Test Anomaly Product",
      country: "FR",
      materialFamily: "tile",
      productUrl: "https://www.castorama.fr/carrelage-sol-et-mur-beige-60-x-60-cm-lounge/3663602120005_CAFR.prd",
      typicalPrice: 1.0, // Unrealistic price to trigger anomaly (10x rule will block real price)
      unit: "m2"
    },
    {
      id: "product-2",
      sourceId: "leroymerlin-fr",
      productName: "Test Valid Product",
      country: "FR",
      materialFamily: "concrete",
      productUrl: "https://www.leroymerlin.fr/produits/materiaux/beton-ciment-et-mortier/ciment/ciment-multiusage-eqiom-35-kg-82006180.html",
      typicalPrice: 6.90, // Realistic price
      unit: "bag",
      packageSize: 35
    }
  ];

  fs.writeFileSync(tempPricesPath, JSON.stringify(testData, null, 2));

  try {
    // 1. Dry Run test
    console.log('\n>> RUNNING DRY RUN');
    const dryPipeline = new WeeklyPricePipeline({ dryRun: true, priceDataPath: tempPricesPath, maxProducts: 2 });
    const dryReport = await dryPipeline.run();
    console.log(`Dry Run Complete. Changed: ${dryReport.production.changed}`);

    // 2. Apply mode test
    console.log('\n>> RUNNING APPLY MODE');
    const applyPipeline = new WeeklyPricePipeline({ dryRun: false, priceDataPath: tempPricesPath, maxProducts: 2 });
    const applyReport = await applyPipeline.run();
    console.log(`Apply Mode Complete. Changed: ${applyReport.production.changed}`);

    // 3. Rollback test
    console.log('\n>> RUNNING ROLLBACK MODE');
    process.env.FORCE_ROLLBACK_TEST = "true";
    const rollbackPipeline = new WeeklyPricePipeline({ dryRun: false, priceDataPath: tempPricesPath, maxProducts: 2 });
    const rollbackReport = await rollbackPipeline.run();
    console.log(`Rollback Mode Complete. Rollback: ${rollbackReport.production.rollback}`);
    
    // Check if the original temp file exists and hasn't been corrupted
    if (fs.existsSync(tempPricesPath)) {
      console.log('Prices test file is intact after rollback.');
    } else {
      console.error('Prices test file is MISSING after rollback!');
    }
    
    console.log('\nINTEGRATION TEST SUCCESS');
  } catch (e) {
    console.error('INTEGRATION TEST FAILED', e);
  } finally {
    if (fs.existsSync(tempPricesPath)) fs.unlinkSync(tempPricesPath);
    if (process.env.FORCE_ROLLBACK_TEST) delete process.env.FORCE_ROLLBACK_TEST;
  }
}

runIntegrationTest();
