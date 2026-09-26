export type DiscoveryStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'BLOCKED' | 'RATE_LIMITED' | 'ERROR';

export interface DiscoveryResult {
  url: string;
  domain: string;
  discoveryMethod: string;
  discoveryProvider: string;
  evidence: string[];
}

export interface DiscoveryProvider {
  providerId: string;
  name: string;
  status: DiscoveryStatus;
  discover(options: any): Promise<DiscoveryResult[]>;
}

export class KnownSourceLinksProvider implements DiscoveryProvider {
  providerId = 'known-source-links';
  name = 'Known Source Links Provider';
  status: DiscoveryStatus = 'AVAILABLE';
  
  async discover(options: any): Promise<DiscoveryResult[]> {
    // In a real implementation this would fetch the homepage of known sources and extract outlinks.
    // For Phase 25.1, we respect REAL DISCOVERY. Since we cannot easily do a real fetch here without network access (if blocked), 
    // we return an empty array or gracefully handle errors, or use the seedUrl if provided.
    
    const results: DiscoveryResult[] = [];
    if (options.seedUrl) {
      try {
        const urlObj = new URL(options.seedUrl);
        results.push({
          url: options.seedUrl,
          domain: urlObj.hostname,
          discoveryMethod: 'EXTERNAL_LINK',
          discoveryProvider: this.providerId,
          evidence: ['Seed URL explicitly provided']
        });
      } catch (e) {
        // Invalid URL
      }
    }
    
    return results;
  }
}

export class PublicSearchProvider implements DiscoveryProvider {
  providerId = 'public-search';
  name = 'Public Search Engine Provider';
  status: DiscoveryStatus = 'UNAVAILABLE';
  
  async discover(options: any): Promise<DiscoveryResult[]> {
    // Phase 25.1: If no public search is technically available (no API key, don't scrape aggressively), return UNAVAILABLE.
    // Do not fabricate results.
    this.status = 'UNAVAILABLE';
    return [];
  }
}

export class RobotsSitemapProvider implements DiscoveryProvider {
  providerId = 'robots-sitemap';
  name = 'Robots/Sitemap Provider';
  status: DiscoveryStatus = 'AVAILABLE';
  
  async discover(options: any): Promise<DiscoveryResult[]> {
    // Similar to KnownSourceLinks, we would fetch sitemaps.
    return [];
  }
}

export class PreviousCandidatesProvider implements DiscoveryProvider {
  providerId = 'previous-candidates';
  name = 'Previous Candidates Provider';
  status: DiscoveryStatus = 'AVAILABLE';
  
  async discover(options: any): Promise<DiscoveryResult[]> {
    const results: DiscoveryResult[] = [];
    if (options.previousCandidates) {
      for (const candidate of options.previousCandidates) {
        if (candidate.status === 'DISCOVERED' || candidate.status === 'TESTING' || candidate.status === 'REJECTED') {
          results.push({
            url: `https://${candidate.domain}`,
            domain: candidate.domain,
            discoveryMethod: 'PREVIOUS_CANDIDATES',
            discoveryProvider: this.providerId,
            evidence: ['Previously discovered candidate']
          });
        }
      }
    }
    return results;
  }
}
