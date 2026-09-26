import { PriceSourceProvider, RawPriceData } from '../../types.js';

export class CastoramaFR implements PriceSourceProvider {
  name = 'Castorama France';

  async fetchPrices(): Promise<RawPriceData[]> {
    const rawData: RawPriceData = {
      materialId: 'ceramic_tile_box_fr_real',
      country: 'FR',
      region: undefined, 
      currency: 'EUR',
      unit: 'box', 
      price: 28.73,
      taxIncluded: true,
      source: this.name,
      sourceUrl: 'https://www.castorama.fr/carrelage-sol-et-mur-interieur-gres-cerame-emaille-effet-beton-gris-malt-60-x-60-cm-ep-8-mm/3663602812080_CAFR.prd',
      publishedAt: new Date().toISOString(),
      notes: 'Carrelage sol et mur intérieur en grès cérame émaillé effet béton gris (modèle Malt), dimensions 60 x 60 cm. 28.73 EUR / Boîte. Boîte couvre 1.44 m2.',
      materialFamily: 'tile',
      materialType: 'ceramic',
      productForm: 'box',
      commercialUnit: 'box',
      physicalUnit: 'm²',
      packageSize: 1.44
    };

    return [rawData];
  }
}
