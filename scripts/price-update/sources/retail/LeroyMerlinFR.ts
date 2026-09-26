import { PriceSourceProvider, RawPriceData } from '../../types.js';

export class LeroyMerlinFR implements PriceSourceProvider {
  name = 'Leroy Merlin France';

  async fetchPrices(): Promise<RawPriceData[]> {
    const rawData: RawPriceData = {
      materialId: 'concrete_bag_fr_real',
      country: 'FR',
      region: undefined, 
      currency: 'EUR',
      unit: 'bag', 
      price: 6.19,
      taxIncluded: true,
      source: this.name,
      sourceUrl: 'https://www.leroymerlin.fr/produits/materiaux/gros-oeuvre/ciment-mortier-beton/beton-universel-gris-haute-resistance-25-kg-82088899.html',
      publishedAt: new Date().toISOString(),
      notes: 'Béton universel gris haute résistance en sac de 25 kg. 6.19 EUR TTC.',
      materialFamily: 'concrete',
      productForm: 'bag',
      commercialUnit: 'bag',
      physicalUnit: 'kg',
      packageSize: 25
    };

    return [rawData];
  }
}
