import { performRealUrlRecovery } from '../real-orchestrator.js';
import { UrlHistoryManager } from '../url-recovery.js';
import * as assert from 'assert';
import { cachedRealFetch } from '../real-orchestrator.js';

async function runIntegrationTests() {
  console.log('--- RUNNING REAL INTEGRATION TESTS ---');
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

  // A. TEST HTTP FETCH (Home Depot or similar real site)
  await runTest('Real HTTP Fetch - Check active URL', async () => {
    // Testing example.com to avoid 403 blocks from Cloudflare in test environment
    const res = await cachedRealFetch('https://example.com', false);
    assert.strictEqual(res.status, 200);
  });

  // B. TEST URL RECOVERY WITH REDIRECT
  await runTest('Real URL Recovery - Handling Redirection', async () => {
    const manager = new UrlHistoryManager([
      {
        productFingerprint: 'test-redirect',
        currentUrl: 'https://httpbin.org/status/301', 
        previousUrls: [],
        firstSeenAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        urlStatus: 'ACTIVE'
      }
    ]);
    
    // httpbin /status/301 redirects to /get by default if not specified, wait, let's use a simpler known redirect.
    // GitHub redirects http to https, for example.
    const githubManager = new UrlHistoryManager([
      {
        productFingerprint: 'test-github-redirect',
        currentUrl: 'http://github.com', 
        previousUrls: [],
        firstSeenAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        urlStatus: 'ACTIVE'
      }
    ]);

    const recoveredUrl = await performRealUrlRecovery('test-github-redirect', 'https://github.com', 'test_source', githubManager);
    assert.ok(recoveredUrl && recoveredUrl.startsWith('https://github.com'));
    
    const h = githubManager.getHistory('test-github-redirect');
    assert.strictEqual(h?.urlStatus, 'REDIRECTED');
    assert.ok(h?.currentUrl.startsWith('https://github.com'));
  });

  // C. TEST PLAYWRIGHT FALLBACK
  await runTest('Real Playwright Fallback - Fetch Page', async () => {
    // Some pages require JS, use playwright
    const res = await cachedRealFetch('https://example.com', true);
    assert.strictEqual(res.status, 200);
    assert.ok(res.html?.includes('Example Domain'));
  });

  console.log(`\nTests Completed: ${passed} PASS, ${failed} FAIL`);
}

runIntegrationTests().catch(console.error);
