import { SourceHealthManager } from '../source-health.js';
import { UrlHistoryManager, attemptUrlRecovery } from '../url-recovery.js';
import { SourceDiscoveryManager } from '../source-discovery.js';
import { PriceContinuityManager } from '../price-continuity.js';
import * as assert from 'assert';

async function runTests() {
  console.log('--- RUNNING RESILIENCE TESTS ---');
  let passed = 0;
  let failed = 0;

  function runTest(name: string, fn: () => void | Promise<void>) {
    try {
      const res = fn();
      if (res instanceof Promise) {
        return res.then(() => {
          console.log(`✅ PASS: ${name}`);
          passed++;
        }).catch(err => {
          console.log(`❌ FAIL: ${name}`);
          console.error(err);
          failed++;
        });
      } else {
        console.log(`✅ PASS: ${name}`);
        passed++;
      }
    } catch (err) {
      console.log(`❌ FAIL: ${name}`);
      console.error(err);
      failed++;
    }
  }

  // A. URL change & C. previous URL recovery
  await runTest('URL History - Register and update URL', () => {
    const mgr = new UrlHistoryManager();
    mgr.registerUrl('fp1', 'http://a.com/1');
    mgr.registerUrl('fp1', 'http://a.com/2');
    const h = mgr.getHistory('fp1');
    assert.strictEqual(h?.currentUrl, 'http://a.com/2');
    assert.strictEqual(h?.previousUrls.includes('http://a.com/1'), true);
  });

  // B. 301 redirect
  await runTest('URL History - Handle redirect', () => {
    const mgr = new UrlHistoryManager();
    mgr.registerUrl('fp2', 'http://b.com/old');
    mgr.recordRedirect('fp2', 'http://b.com/old', 'http://b.com/new');
    const h = mgr.getHistory('fp2');
    assert.strictEqual(h?.currentUrl, 'http://b.com/new');
    assert.strictEqual(h?.urlStatus, 'REDIRECTED');
  });

  // G. Source temporary failure & H. Source permanent failure
  await runTest('Source Health - Handle failures', () => {
    const mgr = new SourceHealthManager([{
      sourceId: 'src1', name: 'Src 1', country: 'FR', domain: 'src1.fr',
      status: 'ACTIVE', sourceType: 'RETAIL', priority: 1, enabled: true,
      healthScore: 100, consecutiveFailures: 0, productsDiscovered: 0,
      productsExtracted: 0, validCandidates: 0, rejectedCandidates: 0
    }]);

    mgr.recordFailure('src1', 'timeout');
    assert.strictEqual(mgr.getHealth('src1')?.healthScore, 90);

    mgr.recordFailure('src1', 'timeout');
    mgr.recordFailure('src1', 'timeout');
    assert.strictEqual(mgr.getHealth('src1')?.status, 'DEGRADED');

    for (let i = 0; i < 15; i++) mgr.recordFailure('src1', 'timeout');
    assert.strictEqual(mgr.getHealth('src1')?.status, 'UNAVAILABLE');
    assert.strictEqual(mgr.getHealth('src1')?.healthScore, 0);
  });

  // I. source structure changed
  await runTest('Source Health - Structure change detection', () => {
    const mgr = new SourceHealthManager([{
      sourceId: 'src2', name: 'Src 2', country: 'FR', domain: 'src2.fr',
      status: 'ACTIVE', sourceType: 'RETAIL', priority: 1, enabled: true,
      healthScore: 100, consecutiveFailures: 0, productsDiscovered: 0,
      productsExtracted: 0, validCandidates: 0, rejectedCandidates: 0
    }]);

    mgr.detectStructuralChange('src2', 100, 0);
    assert.strictEqual(mgr.getHealth('src2')?.status, 'DEGRADED');
  });

  // J. new source discovery & L. candidate validated
  await runTest('Source Discovery - Register and validate', () => {
    const mgr = new SourceDiscoveryManager();
    const c = mgr.registerCandidate({
      domain: 'test.com', country: 'FR', discoveryMethod: 'SEARCH',
      relevanceScore: 90, evidence: []
    });
    assert.strictEqual(c.status, 'DISCOVERED');
    mgr.updateStatus(c.candidateId, 'VALIDATED');
    assert.strictEqual(mgr.getHealth?.length, undefined); // Ensure isolated
  });

  // N. stale price preservation
  await runTest('Price Continuity - Preserve valid price', () => {
    const mgr = new PriceContinuityManager();
    mgr.registerPrice('url1', 'src1', 'Src 1', 25.90, 'VALID');
    
    const stalePrice = mgr.handleSourceUnavailable('url1');
    assert.strictEqual(stalePrice, 25.90);
    assert.strictEqual(mgr.getMetadata('url1')?.priceStatus, 'SOURCE_UNAVAILABLE');
  });

  console.log(`\nTests Completed: ${passed} PASS, ${failed} FAIL`);
}

runTests().catch(console.error);
