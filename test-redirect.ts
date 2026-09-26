import { performRealUrlRecovery } from './scripts/price-update/resilience/real-orchestrator.js';
import { UrlHistoryManager } from './scripts/price-update/resilience/url-recovery.js';

async function t() {
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
    console.log("recoveredUrl:", recoveredUrl);
}
t();
