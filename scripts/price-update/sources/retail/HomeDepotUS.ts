import { PriceSourceProvider, RawPriceData } from '../../types.js';

export class HomeDepotUS implements PriceSourceProvider {
  name = 'Home Depot US';

  async fetchPrices(): Promise<RawPriceData[]> {
    const rawData: RawPriceData = {
      materialId: 'ceramic_tile_box_us_real',
      country: 'US',
      region: undefined, 
      currency: 'USD',
      unit: 'box', 
      price: 152.73,
      taxIncluded: false, // US retail typically lists pre-tax prices
      source: this.name,
      sourceUrl: 'https://www.homedepot.com/p/Ivy-Hill-Tile-24-in-x-24-in-Matte-Porcelain-Floor-and-Wall-Tile/',
      publishedAt: new Date().toISOString(),
      notes: 'Ivy Hill Tile 24 in. x 24 in. Matte Porcelain Floor and Wall Tile. $152.73 / case. Covers 15.49 sq. ft.',
      materialFamily: 'tile',
      materialType: 'ceramic',
      productForm: 'box',
      commercialUnit: 'box',
      physicalUnit: 'sq_ft',
      packageSize: 15.49,
      
      // Phase 16 Identity fields
      brand: 'Ivy Hill Tile',
      productName: 'Porcelain Floor and Wall Tile',
      productVariant: 'Matte',
      dimensions: '24x24 in'
    };

    return [rawData];
  }
}
