import { Page } from 'playwright';
import { RawProductCandidate, SourceBrowserExtractor } from './browserTypes.js';
import { extractJsonLd } from './browserUtils.js';
import { parseAlgerianPrice } from '../utils/currencyDZ.js';

export class DZPrixBrowserExtractor implements SourceBrowserExtractor {
  canHandle(url: string): boolean {
    return url.includes('dzprix.com');
  }

  async extract(html: string, url: string, page?: Page): Promise<RawProductCandidate[]> {
    if (!page) return [];

    const jsonLdData = await extractJsonLd(page);
    let candidates: RawProductCandidate[] = [];

    for (const data of jsonLdData) {
      if (data['@type'] === 'Product') {
        const title = data.name || '';
        const priceElement = data.offers?.price || data.offers?.lowPrice;
        const currencyElement = data.offers?.priceCurrency;
        
        let price: number | undefined;
        let currency: string | undefined;

        if (priceElement) {
          price = typeof priceElement === 'number' ? priceElement : parseFloat(priceElement);
          currency = currencyElement || 'DZD';
        }

        if (title && price) {
          candidates.push({
            productName: title,
            price: price,
            currency: currency,
            taxIncluded: true
          });
        }
      }
    }

    if (candidates.length === 0) {
      try {
        const title = await page.locator('h1, .product-title').first().textContent();
        const priceText = await page.locator('.price, .product-price').first().textContent();
        
        if (title && priceText) {
          const parsed = parseAlgerianPrice(priceText);
          if (parsed) {
            candidates.push({
              productName: title.trim(),
              price: parsed.price,
              currency: parsed.currency,
              taxIncluded: true
            });
          }
        }
      } catch (e) {
        // Fallback DOM extraction failed
      }
    }

    for (const cand of candidates) {
      const nameLower = cand.productName?.toLowerCase() || '';
      
      if ((nameLower.includes('beton') || nameLower.includes('ciment')) && nameLower.includes('sac') && nameLower.includes('25')) {
        cand.productForm = 'bag';
        cand.commercialUnit = 'bag';
        cand.physicalUnit = 'kg';
        cand.packageSize = 25;
      }
      else if (nameLower.includes('gravier') && nameLower.includes('sac')) {
        cand.productForm = 'bag';
        cand.commercialUnit = 'bag';
        cand.physicalUnit = 'kg';
        const match = nameLower.match(/(\d+)\s*kg/);
        cand.packageSize = match ? parseInt(match[1]) : undefined;
      }
      else if (nameLower.includes('carrelage') && nameLower.includes('carton')) {
        cand.productForm = 'box';
        cand.commercialUnit = 'box';
        cand.physicalUnit = 'm2';
        const match = nameLower.match(/(\d+\.?\d*)\s*m2/);
        cand.packageSize = match ? parseFloat(match[1]) : undefined;
      }
      else if (nameLower.includes('peinture')) {
        cand.productForm = 'container';
        cand.commercialUnit = 'container';
        cand.physicalUnit = 'litre';
        const match = nameLower.match(/(\d+\.?\d*)\s*[lL]/);
        cand.packageSize = match ? parseFloat(match[1]) : undefined;
      }
    }

    return candidates;
  }
}
