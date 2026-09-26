import { PriceSourceProvider } from './types.js';
import { PriceCandidate } from './candidate.js';
import { SOURCE_REGISTRY, SourceConfig } from './registry.js';
import { PointPFR } from './sources/retail/PointPFR.js';
import { LeroyMerlinFR } from './sources/retail/LeroyMerlinFR.js';
import { CastoramaFR } from './sources/retail/CastoramaFR.js';
import { CastoramaPaintFR } from './sources/retail/CastoramaPaintFR.js';
import { HomeDepotUS } from './sources/retail/HomeDepotUS.js';

export class SourceDiscovery {
  private providers: Map<string, PriceSourceProvider> = new Map();

  constructor() {
    // In a full DI system we'd inject these, but for now we map them manually
    this.providers.set('pointp_fr', new PointPFR());
    this.providers.set('leroymerlin_fr', new LeroyMerlinFR());
    this.providers.set('castorama_fr', new CastoramaFR());
    this.providers.set('castorama_paint_fr', new CastoramaPaintFR()); // We can add this specifically or merge
    this.providers.set('homedepot_us', new HomeDepotUS());
  }

  async discoverCandidates(): Promise<PriceCandidate[]> {
    const candidates: PriceCandidate[] = [];
    const activeSources = SOURCE_REGISTRY.filter(s => s.enabled);

    for (const source of activeSources) {
      const provider = this.providers.get(source.id);
      if (!provider) {
        // e.g. for castorama_fr we might have multiple providers currently
        // Let's just fallback to the manual list below if needed, or instantiate based on the registry
        continue;
      }

      try {
        const rawDataList = await provider.fetchPrices();
        
        for (const raw of rawDataList) {
          candidates.push({
            candidateId: `${raw.materialId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            country: raw.country || source.country,
            region: raw.region,
            materialFamily: raw.materialFamily,
            materialType: raw.materialType,
            productForm: raw.productForm,
            commercialUnit: raw.commercialUnit,
            physicalUnit: raw.physicalUnit,
            packageSize: raw.packageSize,
            coveragePerUnit: raw.coveragePerUnit,
            price: typeof raw.price === 'number' ? raw.price : parseFloat(raw.price as string),
            currency: raw.currency || 'EUR',
            taxIncluded: raw.taxIncluded !== false,
            sourceName: raw.source || source.name,
            sourceUrl: raw.sourceUrl || source.url,
            checkedAt: new Date().toISOString(),
            confidence: 'medium', // Default for basic scrapers
            notes: raw.notes,
            discoveryMethod: 'scraper',
            providerId: source.id,
            productIdentity: {
              materialFamily: raw.materialFamily,
              materialType: raw.materialType,
              brand: raw.brand,
              productName: raw.productName,
              productVariant: raw.productVariant,
              dimensions: raw.dimensions,
              finish: raw.finish,
              application: raw.application,
              country: raw.country || source.country,
              region: raw.region
            },
            packageVariant: {
              productForm: raw.productForm,
              commercialUnit: raw.commercialUnit,
              physicalUnit: raw.physicalUnit,
              packageSize: raw.packageSize,
              coveragePerUnit: raw.coveragePerUnit
            }
          });
        }
      } catch (err) {
        console.error(`[Discovery] Failed to fetch from ${source.id}:`, err);
      }
    }
    
    // Also include providers not formally in the registry yet but we have classes for
    const paintProvider = this.providers.get('castorama_paint_fr');
    if (paintProvider) {
        const rawDataList = await paintProvider.fetchPrices();
        for (const raw of rawDataList) {
          candidates.push({
            candidateId: `${raw.materialId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            country: raw.country || 'FR',
            region: raw.region,
            materialFamily: raw.materialFamily,
            materialType: raw.materialType,
            productForm: raw.productForm,
            commercialUnit: raw.commercialUnit,
            physicalUnit: raw.physicalUnit,
            packageSize: raw.packageSize,
            coveragePerUnit: raw.coveragePerUnit,
            price: typeof raw.price === 'number' ? raw.price : parseFloat(raw.price as string),
            currency: raw.currency || 'EUR',
            taxIncluded: raw.taxIncluded !== false,
            sourceName: raw.source || paintProvider.name,
            sourceUrl: raw.sourceUrl || '',
            checkedAt: new Date().toISOString(),
            confidence: 'medium',
            notes: raw.notes,
            discoveryMethod: 'scraper',
            providerId: 'castorama_fr'
          });
        }
    }

    return candidates;
  }
}
