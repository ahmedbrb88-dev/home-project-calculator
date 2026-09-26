export interface SearchResult {
  url: string;
  title: string;
  snippet?: string;
}

export interface SearchProvider {
  name: string;
  search(query: string): Promise<SearchResult[] | 'UNAVAILABLE' | 'BLOCKED'>;
}

export class MockSearchProvider implements SearchProvider {
  name = 'MockSearchProvider';
  
  async search(query: string): Promise<SearchResult[] | 'UNAVAILABLE' | 'BLOCKED'> {
    // Phase 25 states: If no search provider is available for free, implement the interface but return UNAVAILABLE.
    // Do not invent results.
    return 'UNAVAILABLE';
  }
}
