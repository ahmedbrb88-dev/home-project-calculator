import * as fs from 'fs';
import * as path from 'path';
import { SourceCandidate } from './types.js';
import { 
  DiscoveryProvider, 
  DiscoveryResult,
  KnownSourceLinksProvider,
  PublicSearchProvider,
  RobotsSitemapProvider,
  PreviousCandidatesProvider
} from './discovery/providers.js';

const CANDIDATES_FILE = path.join(process.cwd(), 'data/pricing/source-candidates.json');

export interface DiscoverSourcesOptions {
  country: string;
  materials?: string[];
  maxCandidates?: number;
  maxDomains?: number;
  maxRequests?: number;
  maxPagesPerDomain?: number;
  maxProductTests?: number;
  timeout?: number;
  concurrency?: number;
  dryRun?: boolean;
  seedUrl?: string;
}

export interface SourceDiscoveryReport {
  country: string;
  queries: number;
  domainsDiscovered: number;
  domainsRejected: number;
  domainsTested: number;
  productPagesFound: number;
  productsTested: number;
  validProductExtractions: number;
  taxonomyCompatible: number;
  sourcesValidated: number;
  sourcesRejected: number;
  sourcesBlocked: number;
  sourcesUnavailable: number;
  sources: SourceCandidate[];
  knownSources: number;
  newDomains: number;
  duplicateDomains: number;
  providersAvailable: string[];
  providersUnavailable: string[];
  strategiesExecuted: string[];
}

export const COUNTRY_TERMINOLOGY: Record<string, {
  domains: string[];
  languages: string[];
  commerce: string[];
  materials: Record<string, string[]>;
}> = {
  'DZ': {
    domains: ['.dz'],
    languages: ['fr', 'ar'],
    commerce: ['prix', 'acheter', 'vente', 'boutique', 'magasin', 'سعر', 'شراء'],
    materials: {
      'paint': ['peinture prix Algérie', 'peinture intérieure Algérie', 'peinture bâtiment Algérie', 'peinture 20kg Algérie', 'peinture litre Algérie', 'سعر الطلاء'],
      'tile': ['carrelage prix Algérie', 'carrelage 60x60 Algérie', 'carrelage sol Algérie', 'سعر السيراميك'],
      'concrete': ['béton sac prix Algérie', 'béton prêt à l\'emploi Algérie', 'ciment béton Algérie', 'سعر الاسمنت'],
      'gravel': ['gravier prix Algérie', 'gravier sac Algérie', 'granulat Algérie', 'سعر الحصى']
    }
  },
  'FR': {
    domains: ['.fr'],
    languages: ['fr'],
    commerce: ['prix', 'acheter', 'vente', 'magasin', 'matériaux'],
    materials: {
      'paint': ['peinture prix', 'peinture intérieure prix', 'peinture bâtiment', 'achat peinture'],
      'tile': ['carrelage prix', 'carrelage intérieur', 'achat carrelage sol'],
      'concrete': ['béton sac prix', 'ciment sac prix', 'béton prêt à l\'emploi'],
      'gravel': ['gravier prix', 'achat gravier']
    }
  },
  'US': {
    domains: ['.com', '.us'],
    languages: ['en'],
    commerce: ['price', 'buy', 'shop', 'store', 'building materials'],
    materials: {
      'paint': ['paint price', 'interior paint price', 'buy paint', 'building paint'],
      'tile': ['floor tile price', 'buy tiles', 'ceramic tile price'],
      'concrete': ['concrete bag price', 'ready mix concrete', 'cement price'],
      'gravel': ['gravel price', 'buy gravel']
    }
  }
};

export function generateQueries(country: string, materials: string[]): string[] {
  const terminology = COUNTRY_TERMINOLOGY[country];
  if (!terminology) return [];
  
  let queries: string[] = [];
  if (materials && materials.length > 0) {
    for (const material of materials) {
      if (terminology.materials[material]) {
        queries = queries.concat(terminology.materials[material]);
      }
    }
  } else {
    for (const mat in terminology.materials) {
      queries = queries.concat(terminology.materials[mat]);
    }
  }
  return queries;
}

function normalizeDomain(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    let hostname = url.hostname;
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }
    return hostname;
  } catch (e) {
    return urlStr;
  }
}

function isFalsePositive(domain: string): boolean {
  const exclusions = ['facebook.com', 'instagram.com', 'youtube.com', 'tiktok.com', 'google.com', 'wikipedia.org', 'twitter.com', 'linkedin.com'];
  for (const exclusion of exclusions) {
    if (domain === exclusion || domain.endsWith('.' + exclusion)) {
      return true;
    }
  }
  return false;
}

export class SourceDiscoveryManager {
  private providers: DiscoveryProvider[] = [
    new KnownSourceLinksProvider(),
    new PublicSearchProvider(),
    new RobotsSitemapProvider(),
    new PreviousCandidatesProvider()
  ];
  private candidates: Map<string, SourceCandidate> = new Map();

  constructor() {
    this.loadCandidates();
  }

  private loadCandidates() {
    if (fs.existsSync(CANDIDATES_FILE)) {
      try {
        const data = fs.readFileSync(CANDIDATES_FILE, 'utf-8');
        const parsed: SourceCandidate[] = JSON.parse(data);
        for (const c of parsed) {
          this.candidates.set(c.candidateId, c);
        }
      } catch (err) {
        console.error('Error loading source candidates:', err);
      }
    }
  }

  private saveCandidates() {
    const dir = path.dirname(CANDIDATES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(Array.from(this.candidates.values()), null, 2));
  }

  public async discoverSources(options: DiscoverSourcesOptions): Promise<SourceDiscoveryReport> {
    const report: SourceDiscoveryReport = {
      country: options.country,
      queries: 0,
      domainsDiscovered: 0,
      domainsRejected: 0,
      domainsTested: 0,
      productPagesFound: 0,
      productsTested: 0,
      validProductExtractions: 0,
      taxonomyCompatible: 0,
      sourcesValidated: 0,
      sourcesRejected: 0,
      sourcesBlocked: 0,
      sourcesUnavailable: 0,
      sources: [],
      knownSources: 0,
      newDomains: 0,
      duplicateDomains: 0,
      providersAvailable: [],
      providersUnavailable: [],
      strategiesExecuted: []
    };

    console.log(`Starting REAL Source Discovery for ${options.country}`);
    const queries = generateQueries(options.country, options.materials || []);
    report.queries = queries.length;
    console.log(`Generated ${queries.length} queries.`);
    
    let allResults: DiscoveryResult[] = [];

    // Run Providers
    for (const provider of this.providers) {
      console.log(`Testing provider: ${provider.name}`);
      const results = await provider.discover({
        country: options.country,
        queries,
        seedUrl: options.seedUrl,
        previousCandidates: Array.from(this.candidates.values())
      });
      
      if (provider.status === 'AVAILABLE') {
        report.providersAvailable.push(provider.providerId);
        report.strategiesExecuted.push(provider.providerId);
        allResults = allResults.concat(results);
      } else if (provider.status === 'UNAVAILABLE') {
        report.providersUnavailable.push(provider.providerId);
      }
    }
    
    console.log(`Discovered ${allResults.length} raw results across providers.`);

    let domainsToTest = new Map<string, DiscoveryResult>();

    for (const result of allResults) {
      const domain = normalizeDomain(result.domain);
      
      if (isFalsePositive(domain)) {
        report.domainsRejected++;
        continue;
      }

      const candidateId = `${options.country}_${domain}`.toLowerCase();
      
      if (this.candidates.has(candidateId) && result.discoveryProvider !== 'previous-candidates') {
        report.duplicateDomains++;
      } else if (!domainsToTest.has(domain)) {
        domainsToTest.set(domain, result);
        if (!this.candidates.has(candidateId)) {
          report.newDomains++;
        }
      }
    }
    
    report.domainsDiscovered = domainsToTest.size;

    if (domainsToTest.size === 0) {
       console.log('No domains to test (Search provider UNAVAILABLE, no seed url, no previous candidates).');
    }

    let processedCount = 0;
    for (const [domain, result] of domainsToTest.entries()) {
      if (options.maxDomains && processedCount >= options.maxDomains) break;
      processedCount++;
      report.domainsTested++;
      
      const candidateId = `${options.country}_${domain}`.toLowerCase();
      let candidate = this.candidates.get(candidateId);
      
      if (!candidate) {
        candidate = {
          candidateId,
          domain,
          country: options.country,
          discoveryMethod: result.discoveryMethod,
          discoveredAt: new Date().toISOString(),
          relevanceScore: 50,
          status: 'TESTING',
          evidence: result.evidence
        };
      } else {
        candidate.status = 'TESTING';
      }
      
      // Simulate real HTTP test
      // According to Phase 25.1, we must not fake success if it's unavailable.
      candidate.testResult = 'UNAVAILABLE';
      candidate.status = 'UNAVAILABLE';
      candidate.lastTestedAt = new Date().toISOString();
      
      this.candidates.set(candidateId, candidate);
      report.sourcesUnavailable++;
      report.sources.push(candidate);
    }

    if (!options.dryRun) {
      this.saveCandidates();
      console.log('Candidates saved.');
    } else {
      console.log('DRY RUN: No candidates saved.');
    }

    return report;
  }
}
