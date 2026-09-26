import { SourceDiscoveryManager, DiscoverSourcesOptions } from './source-discovery.js';

async function main() {
  console.log('--- SOURCE DISCOVERY ---');
  
  const args = process.argv.slice(2);
  const options: DiscoverSourcesOptions = {
    country: 'DZ',
    dryRun: true
  };

  let materials: string[] = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--country' && args[i + 1]) {
      options.country = args[i + 1].toUpperCase();
      i++;
    } else if (args[i] === '--material' && args[i + 1]) {
      materials.push(args[i + 1]);
      i++;
    } else if (args[i] === '--max-candidates' && args[i + 1]) {
      options.maxCandidates = parseInt(args[i + 1]);
      i++;
    } else if (args[i].startsWith('--seed-url=')) {
      options.seedUrl = args[i].split('=')[1];
    } else if (args[i] === '--apply' || args[i] === '--no-dry-run') {
      options.dryRun = false;
    }
  }
  
  if (materials.length > 0) {
    options.materials = materials;
  }
  
  if (options.dryRun) {
    console.log('Mode: DRY RUN (no candidates will be saved)');
  } else {
    console.log('Mode: APPLY (candidates will be saved to source-candidates.json)');
  }

  const manager = new SourceDiscoveryManager();
  const report = await manager.discoverSources(options);

  console.log('\n--- SOURCE DISCOVERY REPORT ---');
  console.log(`Country: ${report.country}`);
  console.log(`Queries: ${report.queries}`);
  console.log(`Domains discovered: ${report.domainsDiscovered}`);
  console.log(`Domains rejected: ${report.domainsRejected}`);
  console.log(`Domains tested: ${report.domainsTested}`);
  console.log(`Product pages found: ${report.productPagesFound}`);
  console.log(`Products tested: ${report.productsTested}`);
  console.log(`Valid product extractions: ${report.validProductExtractions}`);
  console.log(`Taxonomy compatible: ${report.taxonomyCompatible}`);
  console.log(`Sources validated: ${report.sourcesValidated}`);
  console.log(`Sources rejected: ${report.sourcesRejected}`);
  console.log(`Sources blocked: ${report.sourcesBlocked}`);
  console.log(`Sources unavailable: ${report.sourcesUnavailable}`);
}

main().catch(console.error);
