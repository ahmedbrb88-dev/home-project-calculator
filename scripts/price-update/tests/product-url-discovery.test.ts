import fs from 'fs';
import path from 'path';
import { normalizeUrl, scoreUrl } from '../discovery/urlFilters.js';

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

async function runTests() {
  console.log("--- RUNNING PRODUCT URL DISCOVERY TESTS ---");

  // URL normalization & external rejection
  assert(normalizeUrl('https://example.com/test', 'https://example.com') === 'https://example.com/test', "1. valid same-domain URL");
  assert(normalizeUrl('https://external.com', 'https://example.com') === null, "2. external link rejection");
  assert(normalizeUrl('https://example.com/test#fragment', 'https://example.com') === 'https://example.com/test', "3. fragment removal");
  assert(normalizeUrl('https://example.com/test?utm_source=foo', 'https://example.com') === 'https://example.com/test', "4. tracking parameter normalization");
  assert(normalizeUrl('mailto:test@example.com', 'https://example.com') === null, "5. mailto rejection");

  // Scoring
  const score1 = scoreUrl('https://example.com/product/ciment-sac-25kg');
  assert(score1.score > 0 && score1.matchedKeywords.includes('ciment'), "6. material keyword scoring");
  assert(score1.score >= 35, "7. product URL scoring is high (product/ + sac + ciment)");

  const score2 = scoreUrl('https://example.com/category/construction');
  assert(score2.score < score1.score, "8. category URL penalized compared to product");

  const score3 = scoreUrl('https://example.com/search?q=beton');
  assert(score3.score < score1.score, "9. search URL penalized");

  // Duplicate URL logic simulation
  const urls = ['https://test.com/a', 'https://test.com/a?utm_source=foo'];
  const unique = new Set(urls.map(u => normalizeUrl(u, 'https://test.com')).filter(Boolean));
  assert(unique.size === 1, "10. duplicate URL detection");

  // Verify write protection
  const discoverOnlySource = fs.readFileSync(path.resolve('scripts/price-update/discover-only.ts'), 'utf8');
  assert(!discoverOnlySource.includes("fs.writeFileSync(path.join(dataDir, 'prices.json')"), "11. no production write in discover-only");

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Product URL discovery tests failed");
}

runTests().catch(console.error);
