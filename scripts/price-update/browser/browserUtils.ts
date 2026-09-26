import { Page } from 'playwright';
import { RawProductCandidate } from './browserTypes.js';
import { parseAlgerianPrice } from '../utils/currencyDZ.js';

import { Page } from 'playwright';
import { RawProductCandidate } from './browserTypes.js';
import { parseDimensions, extractPackageSize, parseCommercialUnit, parseProductForm, normalizePhysicalUnit } from './attributeParsers.js';
import { parseAlgerianPrice } from '../utils/currencyDZ.js';

export async function extractJsonLd(page: Page): Promise<any[]> {
  try {
    const jsonLdContents = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(s => s.textContent || '');
    });

    const parsed: any[] = [];
    for (const content of jsonLdContents) {
      if (!content.trim()) continue;
      try {
        const data = JSON.parse(content);
        if (Array.isArray(data)) {
          parsed.push(...data);
        } else if (data['@graph'] && Array.isArray(data['@graph'])) {
          parsed.push(...data['@graph']);
        } else {
          parsed.push(data);
        }
      } catch (e) {
        // Ignore JSON parse errors in individual scripts
      }
    }
    return parsed;
  } catch (e) {
    return [];
  }
}

export async function extractMetaProduct(page: Page): Promise<Partial<RawProductCandidate>> {
  try {
    return await page.evaluate(() => {
      const data: any = {};
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      if (ogTitle) data.productName = ogTitle;
      
      const priceAmount = document.querySelector('meta[property="product:price:amount"]')?.getAttribute('content');
      const priceCurrency = document.querySelector('meta[property="product:price:currency"]')?.getAttribute('content');
      if (priceAmount) data.price = parseFloat(priceAmount);
      if (priceCurrency) data.currency = priceCurrency;
      
      const brand = document.querySelector('meta[property="product:brand"]')?.getAttribute('content');
      if (brand) data.brand = brand;
      
      return data;
    });
  } catch (e) {
    return {};
  }
}

export async function genericDOMExtract(page: Page): Promise<RawProductCandidate[]> {
  try {
    const domData = await page.evaluate(() => {
      // 1. Get H1
      const title = document.querySelector('h1')?.textContent?.trim();
      
      // 2. Get Visible Price
      let priceText = '';
      const priceSelectors = ['.woocommerce-Price-amount', '.price', '[itemprop="price"]', '.product-price', '.amount'];
      for (const sel of priceSelectors) {
        const el = document.querySelector(sel);
        if (el && el.textContent) {
          priceText = el.textContent.trim();
          break;
        }
      }

      // 3. Get Specifications tables/lists
      const specs: Record<string, string> = {};
      const rows = Array.from(document.querySelectorAll('table tr, ul li, dl dt'));
      for (const row of rows) {
        if (row.tagName === 'TR') {
          const th = row.querySelector('th, td:first-child');
          const td = row.querySelector('td:last-child');
          if (th && td && th !== td) {
            specs[th.textContent?.trim().toLowerCase() || ''] = td.textContent?.trim() || '';
          }
        } else if (row.tagName === 'LI') {
          const text = row.textContent || '';
          if (text.includes(':')) {
            const [k, v] = text.split(':');
            specs[k.trim().toLowerCase()] = v.trim();
          }
        } else if (row.tagName === 'DT') {
          const dd = row.nextElementSibling;
          if (dd && dd.tagName === 'DD') {
            specs[row.textContent?.trim().toLowerCase() || ''] = dd.textContent?.trim() || '';
          }
        }
      }

      // 4. Description
      const desc = document.querySelector('#description, .description, [itemprop="description"]')?.textContent?.trim() || '';

      return { title, priceText, specs, desc };
    });

    const candidate: RawProductCandidate = {};
    if (domData.title) candidate.productName = domData.title;

    if (domData.priceText) {
      // Attempt to parse price text
      // Here we assume DZ for now, or just extract numeric value
      const p = parseAlgerianPrice(domData.priceText);
      if (p !== null) {
        candidate.price = p.price;
        candidate.currency = p.currency || 'DZD'; // Assume DZD via parseAlgerianPrice
      }
    }

    if (candidate.price === undefined) {
      const jsPrice = await page.evaluate(() => {
          const scripts = document.querySelectorAll('script');
          for (const s of scripts) {
            if (s.textContent && s.textContent.includes('glaGtagData')) {
               const m = s.textContent.match(/"price"\s*:\s*([\d.]+)/);
               if (m) return parseFloat(m[1]);
            }
          }
          return null;
       });
       if (jsPrice !== null) {
          candidate.price = jsPrice;
          candidate.currency = 'DZD';
       }
    }

    // Attempt to extract package size from specs
    let rawPackage = '';
    const pkgKeys = ['poids', 'weight', 'conditionnement', 'packaging', 'format', 'contenance', 'volume'];
    for (const k of pkgKeys) {
      const match = Object.keys(domData.specs).find(sk => sk.includes(k));
      if (match) {
        rawPackage += ' ' + domData.specs[match];
      }
    }

    // Try extracting from title if specs empty
    if (!rawPackage && domData.title) {
      rawPackage = domData.title;
    }

    const pkg = extractPackageSize(rawPackage);
    if (pkg) {
      candidate.packageSize = pkg.size;
      candidate.physicalUnit = pkg.unit;
      candidate.commercialUnit = pkg.commercialUnit;
      if (candidate.commercialUnit === 'unknown') {
        // Try to infer commercial unit from title/specs
        candidate.commercialUnit = parseCommercialUnit(rawPackage);
      }
    }

    const dimsKey = Object.keys(domData.specs).find(sk => sk.includes('dimensions') || sk.includes('format'));
    if (dimsKey) {
      const dims = parseDimensions(domData.specs[dimsKey]);
      if (dims) candidate.dimensions = dims;
    } else if (domData.title) {
      const dims = parseDimensions(domData.title);
      if (dims) candidate.dimensions = dims;
    }

    return [candidate];
  } catch (e) {
    return [];
  }
}
