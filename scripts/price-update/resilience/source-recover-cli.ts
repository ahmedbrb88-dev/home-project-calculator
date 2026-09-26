import { UrlHistoryManager } from './url-recovery.js';
import { performRealUrlRecovery } from './real-orchestrator.js';

async function main() {
  console.log('--- REAL PRODUCT URL RECOVERY ---');
  
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  
  if (dryRun) {
    console.log('Mode: DRY RUN (no data will be saved)');
  } else {
    console.log('Mode: APPLY (data will be saved)');
  }

  // Real world example: testing Fixotop URL recovery
  const testFingerprint = 'peinture-satin-10l';
  const testUrl = 'https://fixotop.com/produit/old-broken-url-satin';
  const baseUrl = 'https://fixotop.com';
  const sourceId = 'fixotop_dz';

  const manager = new UrlHistoryManager([
    {
      productFingerprint: testFingerprint,
      currentUrl: testUrl,
      previousUrls: [],
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      urlStatus: 'ACTIVE'
    }
  ]);

  console.log(`\nSimulating Recovery for ${testFingerprint} at ${testUrl}`);
  
  const recoveredUrl = await performRealUrlRecovery(testFingerprint, baseUrl, sourceId, manager);
  
  if (recoveredUrl) {
    console.log(`\n✅ Success: URL recovered -> ${recoveredUrl}`);
  } else {
    console.log(`\n❌ Failed: URL could not be recovered.`);
  }

  const history = manager.getHistory(testFingerprint);
  console.log('\nUpdated History Record:');
  console.dir(history, { depth: null });
}

main().catch(console.error);
