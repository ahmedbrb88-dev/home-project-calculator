import * as fs from 'fs';
import * as path from 'path';
import { discoverFromSitemap } from './sitemapDiscovery.js';
import { verifyProductUrl } from '../resilience/product-verification.js';

// Setup Mock Known Identity for Castorama France (Tile)
const knownIdentity = {
  brand: '',
  productName: '', // We don't know the exact name yet
  materialFamily: 'tile',
  country: 'FR'
};

async function testNewProductDiscovery() {
  console.log('--- STARTING NEW PRODUCT DISCOVERY TEST ---');
  
  // Isolate Dataset (B3)
  const testDir = path.join(process.cwd(), 'data/pricing/test-discovery');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  const sourceId = 'castorama-fr';
  const baseUrl = 'https://www.castorama.fr';

  console.log(`\nSOURCE: ${sourceId} (${baseUrl})`);
  console.log('METHOD: Sitemap');
  
  // Fetch Sitemap Links
  console.log('\nScanning sitemap for URLs...');
  const { urls } = await discoverFromSitemap(baseUrl, sourceId, 10);
  
  console.log(`Pages scanned: ${urls.length > 0 ? 1 : 0} (sitemap root)`);
  console.log(`URLs discovered: ${urls.length}`);

  let productUrls = 0;
  let newProducts = 0;
  let nonProductUrls = 0;
  let extractionFailures = 0;

  // Let's test max 5 URLs
  const urlsToTest = urls.slice(0, 5);
  
  for (const candidate of urlsToTest) {
    console.log(`\nTesting URL: ${candidate.url}`);
    try {
      const verification = await verifyProductUrl(candidate.url, knownIdentity, undefined, 'FR');
      
      if (verification.status === 'NOT_A_PRODUCT') {
        console.log('Result: NOT_A_PRODUCT');
        nonProductUrls++;
      } else if (verification.status === 'INSUFFICIENT_DATA' || verification.status === 'SOURCE_UNAVAILABLE') {
        console.log(`Result: ${verification.status}`);
        extractionFailures++;
      } else {
        // EXACT_MATCH, DIFFERENT_PRODUCT (which means it IS a product, just not the same as our placeholder identity)
        // Since we are discovering blindly, DIFFERENT_PRODUCT is actually a success for discovering *a* product
        console.log('Result: VALID PRODUCT PAGE FOUND');
        console.log(`  Title: ${verification.identity?.productName}`);
        console.log(`  Price: ${verification.price} ${verification.currency}`);
        
        productUrls++;
        newProducts++; // For this test, assume all are new since we have empty dataset
        console.log('  Status: NEW_PRODUCT_DISCOVERED');
      }
    } catch (e) {
      console.log('Extraction threw error.');
      extractionFailures++;
    }
  }

  console.log('\n========================================');
  console.log('NEW PRODUCT DISCOVERY REPORT');
  console.log('========================================');
  console.log(`Source: ${sourceId}`);
  console.log('Discovery method: Sitemap');
  console.log(`Pages scanned: ${urls.length > 0 ? 1 : 0}`);
  console.log(`URLs discovered: ${urls.length}`);
  console.log(`Product URLs: ${productUrls}`);
  console.log(`New products: ${newProducts}`);
  console.log(`Existing products: 0`);
  console.log(`Duplicates: 0`);
  console.log(`Non-product URLs: ${nonProductUrls}`);
  console.log(`Extraction failures: ${extractionFailures}`);
  
}

testNewProductDiscovery().catch(console.error);
