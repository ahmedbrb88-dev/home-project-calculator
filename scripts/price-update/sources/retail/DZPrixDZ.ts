import { PriceSourceProvider, RawPriceData } from '../../types.js';

export class DZPrixDZ implements PriceSourceProvider {
  name = 'DZPRIX';
  id = 'dzprix_dz';
  pagesChecked = 0;

  async fetchPrices(): Promise<RawPriceData[]> {
    this.pagesChecked = 1;
    try {
      const response = await fetch('https://dzprix.com', {
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      throw new Error('No structured JSON-LD found on homepage for pricing candidates');
    } catch (error: any) {
      throw new Error(`Failed to access or parse source: ${error.message}`);
    }
  }
}
