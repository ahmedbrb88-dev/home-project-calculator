import { Page } from 'playwright';
import { RawProductCandidate, SourceBrowserExtractor } from './browserTypes.js';
import { extractJsonLd } from './browserUtils.js';
import { parseAlgerianPrice } from '../utils/currencyDZ.js';

export class OuedknissBrowserExtractor implements SourceBrowserExtractor {
  canHandle(url: string): boolean {
    return url.includes('ouedkniss.com');
  }

  async extract(html: string, url: string, page?: Page): Promise<RawProductCandidate[]> {
    if (!page) return [];

    // Attempt to extract JSON-LD first
    const jsonLdData = await extractJsonLd(page);
    let candidates: RawProductCandidate[] = [];

    // Ouedkniss is typically a classifieds site. Let's look for Product structures.
    for (const data of jsonLdData) {
      if (data['@type'] === 'Product' || data['@type'] === 'ItemPage') {
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
            taxIncluded: false // Typically C2C/B2C classifieds don't explicitly list taxes or they are included
          });
        }
      }
    }

    // Fallback to DOM extraction if no JSON-LD yields results
    if (candidates.length === 0) {
      try {
        const title = await page.locator('h1').first().textContent();
        // They use span classes for price, we will just try to find something matching a price format in a prominent element
        const priceText = await page.locator('.price, [class*="price"]').first().textContent();
        
        if (title && priceText) {
          const parsed = parseAlgerianPrice(priceText);
          if (parsed) {
            candidates.push({
              productName: title.trim(),
              price: parsed.price,
              currency: parsed.currency,
              taxIncluded: false
            });
          }
        }
      } catch (e) {
        // DOM extraction failed
      }
    }

    // Heuristics to attempt to fill in package details based on titles
    for (const cand of candidates) {
      const nameLower = cand.productName?.toLowerCase() || '';
      
      // Concrete bag
      if ((nameLower.includes('beton') || nameLower.includes('ciment')) && nameLower.includes('sac') && nameLower.includes('25')) {
        cand.productForm = 'bag';
        cand.commercialUnit = 'bag';
        cand.physicalUnit = 'kg';
        cand.packageSize = 25;
      }
      // Gravel bag
      else if (nameLower.includes('gravier') && nameLower.includes('sac')) {
        cand.productForm = 'bag';
        cand.commercialUnit = 'bag';
        cand.physicalUnit = 'kg';
        const match = nameLower.match(/(\d+)\s*kg/);
        cand.packageSize = match ? parseInt(match[1]) : undefined;
      }
      // Tile box
      else if (nameLower.includes('carrelage') && nameLower.includes('carton')) {
        cand.productForm = 'box';
        cand.commercialUnit = 'box';
        cand.physicalUnit = 'm2';
        const match = nameLower.match(/(\d+\.?\d*)\s*m2/);
        cand.packageSize = match ? parseFloat(match[1]) : undefined;
      }
      // Paint container
      else if (nameLower.includes('peinture')) {
        cand.productForm = 'container';
        cand.commercialUnit = 'container';
        cand.physicalUnit = 'litre';
        const match = nameLower.match(/(\d+\.?\d*)\s*[lL]/);
        cand.packageSize = match ? parseFloat(match[1]) : undefined;
      }
    }

    // Only return candidates that have enough information to not just be "classified listing"
    // The main flow will mark it as INSUFFICIENT_DATA if units/packageSize are missing
    return candidates;
  }
}
