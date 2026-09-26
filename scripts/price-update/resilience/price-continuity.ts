import { PriceMetadata, PriceStatus } from './types.js';

export class PriceContinuityManager {
  private priceMetadata: Map<string, PriceMetadata> = new Map();

  constructor(initialData: PriceMetadata[] = []) {
    for (const m of initialData) {
      this.priceMetadata.set(m.productUrl, m);
    }
  }

  public registerPrice(
    productUrl: string,
    sourceId: string,
    sourceName: string,
    price: number,
    status: PriceStatus,
    canonicalUrl?: string
  ): void {
    const now = new Date().toISOString();
    const current = this.priceMetadata.get(productUrl);

    if (!current) {
      this.priceMetadata.set(productUrl, {
        sourceId,
        sourceName,
        productUrl,
        canonicalUrl,
        firstSeenAt: now,
        lastSeenAt: now,
        lastValidatedAt: status === 'VALID' ? now : undefined,
        previousValidPrice: status === 'VALID' ? price : undefined,
        priceStatus: status,
        freshness: 'P0D',
        extractionMethod: 'UNKNOWN'
      });
      return;
    }

    if (status === 'VALID') {
      current.previousPrice = current.previousValidPrice;
      current.previousValidPrice = price;
      current.lastValidatedAt = now;
    }

    current.lastSeenAt = now;
    current.priceStatus = status;
    this.priceMetadata.set(productUrl, current);
  }

  public handleSourceUnavailable(productUrl: string): number | undefined {
    const current = this.priceMetadata.get(productUrl);
    if (!current) return undefined;
    
    current.priceStatus = 'SOURCE_UNAVAILABLE';
    this.priceMetadata.set(productUrl, current);
    
    // Return last valid price to keep price continuity
    return current.previousValidPrice;
  }

  public getMetadata(productUrl: string): PriceMetadata | undefined {
    return this.priceMetadata.get(productUrl);
  }
}
