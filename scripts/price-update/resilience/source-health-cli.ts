import { SourceHealthManager } from './source-health.js';
import { SOURCE_REGISTRY } from '../registry.js';

async function main() {
  console.log('--- SOURCE HEALTH CHECK ---');
  
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  
  if (dryRun) {
    console.log('Mode: DRY RUN (no data will be saved)');
  } else {
    console.log('Mode: APPLY (data will be saved)');
  }

  const manager = new SourceHealthManager();
  
  // Initialize with registry data
  for (const source of SOURCE_REGISTRY) {
    manager.updateHealth(source.id, {
      sourceId: source.id,
      name: source.name,
      country: source.country,
      domain: source.domain || new URL(source.url).hostname,
      status: source.enabled ? 'ACTIVE' : 'RETIRED',
      sourceType: source.sourceType || 'UNKNOWN',
      priority: source.priority,
      enabled: source.enabled,
      healthScore: source.enabled ? 100 : 0,
      consecutiveFailures: 0,
      productsDiscovered: 0,
      productsExtracted: 0,
      validCandidates: 0,
      rejectedCandidates: 0,
    });
  }

  // Simulate health checks
  for (const source of SOURCE_REGISTRY) {
    if (!source.enabled) continue;
    
    console.log(`Checking health for ${source.id}...`);
    // Mock check: 90% success rate
    const success = Math.random() > 0.1;
    if (success) {
      manager.recordSuccess(source.id, Math.floor(Math.random() * 50) + 10);
      console.log(`  -> SUCCESS (Status: ${manager.getHealth(source.id)?.status})`);
    } else {
      manager.recordFailure(source.id, 'Connection timeout');
      console.log(`  -> FAILED (Status: ${manager.getHealth(source.id)?.status})`);
    }
  }

  console.log('\nFinal Health Summary:');
  const allHealth = manager.getAll();
  for (const h of allHealth) {
    console.log(`- ${h.sourceId}: ${h.status} (Score: ${h.healthScore})`);
  }
}

main().catch(console.error);
