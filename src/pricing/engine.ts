import type { PriceRequest, PriceData } from './types';
import { DEMO_PRICES } from './data/demo-prices';
import realPricesData from '../../data/pricing/prices.json';

const realPrices = realPricesData as unknown as PriceData[];

import { isMaterialCompatible, convertPrice } from './taxonomy';

export class PriceEngine {
  private data: PriceData[] = [];

  constructor() {
    this.data = [...realPrices, ...DEMO_PRICES];
  }

  getIndicativePrice(request: PriceRequest): PriceData | null {
    // 1. Try real data first
    const realMatch = this.findMatch(request, realPrices);
    if (realMatch) return realMatch;

    // 2. Fallback to demo data
    const demoMatch = this.findMatch(request, DEMO_PRICES);
    return demoMatch;
  }

  private findMatch(req: PriceRequest, dataset: PriceData[]): PriceData | null {
    // 1. Exact match including region
    if (req.region) {
      const exact = dataset.find(p => 
        isMaterialCompatible(req, p) &&
        p.country === req.country &&
        p.region === req.region &&
        p.currency === req.currency
      );
      if (exact) return this.applyConversion(req, exact);
    }

    // 2. Fallback to national average
    const national = dataset.find(p => 
      isMaterialCompatible(req, p) &&
      p.country === req.country &&
      p.region === 'national' &&
      p.currency === req.currency
    );
    if (national) return this.applyConversion(req, national);

    // 3. Fallback to any matching country data without region specificity
    const countryAny = dataset.find(p => 
      isMaterialCompatible(req, p) &&
      p.country === req.country &&
      p.currency === req.currency
    );
    if (countryAny) return this.applyConversion(req, countryAny);

    return null;
  }

  private applyConversion(req: PriceRequest, data: PriceData): PriceData {
    if (req.unit === data.unit) return data;
    
    const newPrice = convertPrice(data.typicalPrice, data.unit, req.unit);
    if (newPrice === null) return data; // Should not happen if isMaterialCompatible passed, but fallback safely
    
    return {
      ...data,
      unit: req.unit,
      typicalPrice: newPrice,
      lowPrice: convertPrice(data.lowPrice, data.unit, req.unit) || data.lowPrice,
      highPrice: convertPrice(data.highPrice, data.unit, req.unit) || data.highPrice,
    };
  }
}

export const priceEngine = new PriceEngine();
