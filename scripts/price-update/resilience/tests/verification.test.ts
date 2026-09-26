import { verifyProductUrl } from '../product-verification.js';
import { ProductIdentity, PackageVariant } from '../../candidate.js';
import * as assert from 'assert';

async function runTests() {
  console.log('--- RUNNING PRODUCT VERIFICATION TESTS ---');
  let passed = 0;
  let failed = 0;

  async function runTest(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.log(`❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  const knownIdentity: ProductIdentity = {
    brand: 'Dulux',
    productName: 'Peinture',
    materialFamily: 'paint',
    country: 'FR'
  };

  // 1. exact fingerprint match
  await runTest('1. Exact Match', async () => {
    const fetcher = async () => ({
      status: 200,
      html: `<script type="application/ld+json">{"@type":"Product","name":"Peinture","brand":{"name":"Dulux"},"offers":{"price":"25.0","priceCurrency":"EUR"}}</script>`
    });
    const res = await verifyProductUrl('http://test.com', knownIdentity, undefined, 'FR', fetcher);
    assert.strictEqual(res.status, 'EXACT_MATCH');
  });

  // 2. different product
  await runTest('2. Different Product', async () => {
    const fetcher = async () => ({
      status: 200,
      html: `<script type="application/ld+json">{"@type":"Product","name":"Peinture","brand":{"name":"Tollens"},"offers":{"price":"25.0","priceCurrency":"EUR"}}</script>`
    });
    const res = await verifyProductUrl('http://test.com', knownIdentity, undefined, 'FR', fetcher);
    assert.strictEqual(res.status, 'DIFFERENT_PRODUCT');
  });

  // 3. insufficient data
  await runTest('3. Insufficient Data', async () => {
    const fetcher = async () => ({
      status: 200,
      html: `<script type="application/ld+json">{"@type":"Product","brand":{"name":"Dulux"}}</script>`
    });
    const res = await verifyProductUrl('http://test.com', knownIdentity, undefined, 'FR', fetcher);
    assert.strictEqual(res.status, 'INSUFFICIENT_DATA');
  });

  // 4. not product
  await runTest('4. Not A Product', async () => {
    const fetcher = async () => ({
      status: 200,
      html: `<html><body>Category Page</body></html>`
    });
    const res = await verifyProductUrl('http://test.com', knownIdentity, undefined, 'FR', fetcher);
    assert.strictEqual(res.status, 'NOT_A_PRODUCT');
  });

  // 8. price change (still exact match)
  await runTest('8. Price Change (Still Exact Match)', async () => {
    const fetcher = async () => ({
      status: 200,
      html: `<script type="application/ld+json">{"@type":"Product","name":"Peinture","brand":{"name":"Dulux"},"offers":{"price":"31.50","priceCurrency":"EUR"}}</script>`
    });
    const res = await verifyProductUrl('http://test.com', knownIdentity, undefined, 'FR', fetcher);
    assert.strictEqual(res.status, 'EXACT_MATCH');
    assert.strictEqual(res.price, 31.5);
  });

  // 10. cache reuse
  await runTest('10. Cache Reuse', async () => {
    let callCount = 0;
    const myCache = new Map();
    const fetcher = async (url: string) => {
      if (myCache.has(url)) return myCache.get(url);
      callCount++;
      const res = { status: 200, html: `<script type="application/ld+json">{"@type":"Product","name":"Peinture","brand":{"name":"Dulux"},"offers":{"price":10}}</script>` };
      myCache.set(url, res);
      return res;
    };
    
    await verifyProductUrl('http://cache.com', knownIdentity, undefined, 'FR', fetcher);
    await verifyProductUrl('http://cache.com', knownIdentity, undefined, 'FR', fetcher);
    
    assert.strictEqual(callCount, 1);
  });

  console.log(`\nTests Completed: ${passed} PASS, ${failed} FAIL`);
}

runTests().catch(console.error);
