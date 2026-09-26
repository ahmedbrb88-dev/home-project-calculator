import { Page } from 'playwright';
import { SourceBrowserExtractor, RawProductCandidate } from './browserTypes.js';
import { extractJsonLd, genericDOMExtract, extractMetaProduct } from './browserUtils.js';

export class GenericBrowserExtractor implements SourceBrowserExtractor {
  canHandle(url: string): boolean {
    return true; // Fallback for all other URLs
  }

  async extract(html: string, url: string, page?: Page): Promise<RawProductCandidate[]> {
    const results: RawProductCandidate[] = [];
    if (!page) return results;

    const combinedCandidate: Partial<RawProductCandidate> = { sourceUrl: url };

    // 1. Try JSON-LD
    const jsonLdData = await extractJsonLd(page);
    for (const data of jsonLdData) {
      if (data['@type'] === 'Product') {
        if (data.name) combinedCandidate.productName = data.name;
        if (data.brand?.name) combinedCandidate.brand = data.brand.name;
        if (data.offers?.price) combinedCandidate.price = data.offers.price;
        if (data.offers?.priceCurrency) combinedCandidate.currency = data.offers.priceCurrency;
        combinedCandidate.taxIncluded = true;
      }
    }

    // 2. Try Meta Data
    const metaData = await extractMetaProduct(page);
    if (!combinedCandidate.productName && metaData.productName) combinedCandidate.productName = metaData.productName;
    if (!combinedCandidate.price && metaData.price) combinedCandidate.price = metaData.price;
    if (!combinedCandidate.currency && metaData.currency) combinedCandidate.currency = metaData.currency;
    if (!combinedCandidate.brand && metaData.brand) combinedCandidate.brand = metaData.brand;

    // 3. Try generic DOM extraction
    const domResults = await genericDOMExtract(page);
    if (domResults.length > 0) {
      const dr = domResults[0];
      if (!combinedCandidate.productName && dr.productName) combinedCandidate.productName = dr.productName;
      if (combinedCandidate.price === undefined && dr.price !== undefined) combinedCandidate.price = dr.price;
      if (!combinedCandidate.currency && dr.currency) combinedCandidate.currency = dr.currency;
      
      // Bring over attributes parsed from DOM
      if (dr.packageSize) combinedCandidate.packageSize = dr.packageSize;
      if (dr.physicalUnit) combinedCandidate.physicalUnit = dr.physicalUnit;
      if (dr.commercialUnit) combinedCandidate.commercialUnit = dr.commercialUnit;
      if (dr.dimensions) combinedCandidate.dimensions = dr.dimensions;
    }

    // Normalization Pass
    if (!combinedCandidate.packageSize && combinedCandidate.productName) {
      const { extractPackageSize, parseCommercialUnit, parseDimensions } = await import('./attributeParsers.js');
      const pkg = extractPackageSize(combinedCandidate.productName);
      if (pkg) {
        combinedCandidate.packageSize = pkg.size;
        combinedCandidate.physicalUnit = pkg.unit;
        combinedCandidate.commercialUnit = pkg.commercialUnit;
        if (combinedCandidate.commercialUnit === 'unknown') {
          combinedCandidate.commercialUnit = parseCommercialUnit(combinedCandidate.productName);
        }
      }
      if (!combinedCandidate.dimensions) {
        const dims = parseDimensions(combinedCandidate.productName);
        if (dims) combinedCandidate.dimensions = dims;
      }
    }

    if (Object.keys(combinedCandidate).length > 1) { // more than just sourceUrl
      results.push(combinedCandidate as RawProductCandidate);
    }

    return results;
  }
}


