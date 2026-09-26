import { PriceSourceProvider, RawPriceData } from '../../types.js';

export class CastoramaPaintFR implements PriceSourceProvider {
  name = 'Castorama France';

  async fetchPrices(): Promise<RawPriceData[]> {
    const rawData: RawPriceData = {
      materialId: 'paint_interior_container_fr_real',
      country: 'FR',
      region: undefined, 
      currency: 'EUR',
      unit: 'container', 
      price: 38.90,
      taxIncluded: true,
      source: this.name,
      sourceUrl: 'https://www.castorama.fr/peinture-interieure-creme-de-couleur-dulux-valentine',
      publishedAt: new Date().toISOString(),
      notes: 'Dulux Valentine Crème de Couleur, pot de 1.25 L. Rendement environ 11 m2/L. 38.90 EUR TTC.',
      materialFamily: 'paint',
      materialType: 'interior',
      productForm: 'container',
      commercialUnit: 'container',
      physicalUnit: 'litre',
      packageSize: 1.25,
      coveragePerUnit: 11
    };

    return [rawData];
  }
}
