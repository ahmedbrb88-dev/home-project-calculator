import fs from 'fs';
import path from 'path';
import { SOURCE_REGISTRY } from './registry.js';
import { PriceCandidate } from './candidate.js';
import { OuedknissDZ } from './sources/retail/OuedknissDZ.js';
import { DZPrixDZ } from './sources/retail/DZPrixDZ.js';
import { BrowserFetcher } from './browser/browserFetcher.js';
import { OuedknissBrowserExtractor } from './browser/OuedknissBrowserExtractor.js';
import { DZPrixBrowserExtractor } from './browser/DZPrixBrowserExtractor.js';
import { GenericBrowserExtractor } from './browser/GenericBrowserExtractor.js';
import { SourceBrowserExtractor } from './browser/browserTypes.js';
import { runUrlDiscovery } from './discovery/productUrlDiscovery.js';
import { UrlDiscoveryReport } from './discovery/urlTypes.js';

export interface DiscoveryReport {
  country: string;
  sourcesChecked: number;
  sourcesAvailable: number;
  sourcesUnavailable: number;
  pagesDiscovered: number;
  candidatesExtracted: number;
  accepted: number;
  review: number;
  rejected: number;
  urlDiscoveryReports: UrlDiscoveryReport[];
}

const extractors: SourceBrowserExtractor[] = [
  new OuedknissBrowserExtractor(),
  new DZPrixBrowserExtractor(),
  new GenericBrowserExtractor()
];

async function runDiscovery(countryCode: string) {
  console.log(`Starting discovery for country: ${countryCode}`);

  const sources = SOURCE_REGISTRY.filter(s => s.country === countryCode && s.enabled);
  if (sources.length === 0) {
    console.log(`No enabled sources found for country ${countryCode}`);
    return;
  }

  const report: DiscoveryReport = {
    country: countryCode,
    sourcesChecked: sources.length,
    sourcesAvailable: 0,
    sourcesUnavailable: 0,
    pagesDiscovered: 0,
    candidatesExtracted: 0,
    accepted: 0,
    review: 0,
    rejected: 0,
    urlDiscoveryReports: []
  };

  const discoveryResults = {
    generatedAt: new Date().toISOString(),
    country: countryCode,
    urlDiscovery: {
      sources: [] as string[],
      urlsDiscovered: 0,
      urlsSelected: 0
    },
    candidates: [] as any[]
  };

  const providers: Record<string, any> = {};
  if (countryCode === 'DZ') {
    providers['ouedkniss_dz'] = new OuedknissDZ();
    providers['dzprix_dz'] = new DZPrixDZ();
  }

  const browserFetcher = new BrowserFetcher();

  try {
    for (const config of sources) {
      console.log(`\nChecking source: ${config.name}`);
      discoveryResults.urlDiscovery.sources.push(config.id);

      // Phase 20: URL DISCOVERY
      console.log(`[Running URL Discovery for ${config.url}]`);
      const { report: urlReport, selectedUrls } = await runUrlDiscovery(config.url, config.id, browserFetcher, 15); // Use 15 for max pages per source

      report.urlDiscoveryReports.push(urlReport);
      discoveryResults.urlDiscovery.urlsDiscovered += urlReport.uniqueUrls;
      discoveryResults.urlDiscovery.urlsSelected += urlReport.selectedUrls;

      console.log(`[Discovered ${urlReport.uniqueUrls} URLs, selected top ${urlReport.selectedUrls}]`);

      if (urlReport.selectedUrls === 0) {
        report.sourcesUnavailable++;
        discoveryResults.candidates.push({
          status: 'NO_PRODUCT_DATA',
          source: config.name,
          reason: 'No useful product URLs found during discovery'
        });
        continue;
      }

      report.sourcesAvailable++;

      // FETCH EACH SELECTED URL
      for (const urlCandidate of selectedUrls) {
        console.log(`\n[Fetching product URL: ${urlCandidate.url}]`);
        urlReport.productPagesAttempted = (urlReport.productPagesAttempted || 0) + 1;
        report.pagesDiscovered++;

        let rawData: any[] = [];
        let httpSuccess = false;

        // BROWSER FALLBACK / FETCH
        const { result, page } = await browserFetcher.fetchPage(urlCandidate.url);
        
        if (result.blocked) {
          console.log(`[Browser blocked] ${result.error}`);
          discoveryResults.candidates.push({
            status: 'BROWSER_BLOCKED',
            source: config.name,
            url: urlCandidate.url,
            reason: result.error
          });
          if (page) await page.close();
          continue;
        }

        if (result.success && page) {
          console.log(`[Browser loaded page successfully]`);
          const extractor = extractors.find(e => e.canHandle(urlCandidate.url));
          if (extractor) {
            const extracted = await extractor.extract(result.html, urlCandidate.url, page);
            
            if (extracted.length > 0) {
              urlReport.productPages++;
              urlReport.productsExtracted += extracted.length;
              // Map Browser Candidate to RawPriceData
              rawData = extracted.map(ext => ({
                materialId: 'unknown',
                country: countryCode,
                currency: ext.currency || 'DZD',
                price: ext.price,
                taxIncluded: ext.taxIncluded,
                source: config.name,
                sourceUrl: urlCandidate.url,
                publishedAt: new Date().toISOString(),
                brand: ext.brand,
                productName: ext.productName,
                productVariant: ext.productVariant,
                packageSize: ext.packageSize,
                commercialUnit: ext.commercialUnit,
                physicalUnit: ext.physicalUnit,
                productForm: ext.productForm,
                materialFamily: ext.productName?.toLowerCase().includes('beton') ? 'concrete' :
                                ext.productName?.toLowerCase().includes('gravier') ? 'gravel' :
                                ext.productName?.toLowerCase().includes('carrelage') ? 'tile' :
                                ext.productName?.toLowerCase().includes('peinture') ? 'paint' : 'unknown'
              }));
            }
          }
        }
        
        if (page) await page.close();

        if (rawData.length === 0) {
          discoveryResults.candidates.push({
            status: 'EXTRACTION_FAILED',
            source: config.name,
            url: urlCandidate.url,
            reason: 'Extraction returned no valid products'
          });
          continue;
        }

        report.candidatesExtracted += rawData.length;

        // VALIDATION PIPELINE
        for (const raw of rawData) {
          let confidenceScore = 0;
          if (raw.brand && raw.productName) confidenceScore += 20;
          if (raw.price) confidenceScore += 20;
          if (raw.currency) confidenceScore += 15;
          if (raw.packageSize) confidenceScore += 15;
          if (raw.commercialUnit) confidenceScore += 10;
          if (raw.physicalUnit) confidenceScore += 10;
          confidenceScore += 5;
          if (raw.sourceUrl) confidenceScore += 5;
          
          let confidenceLevel: 'high' | 'medium' | 'low' = 'low';
          if (confidenceScore >= 80) confidenceLevel = 'high';
          else if (confidenceScore >= 60) confidenceLevel = 'medium';

          const candidate: PriceCandidate = {
            candidateId: `${raw.materialId || 'unknown'}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            country: raw.country || config.country,
            region: raw.region,
            materialFamily: raw.materialFamily,
            materialType: raw.materialType,
            productForm: raw.productForm,
            commercialUnit: raw.commercialUnit,
            physicalUnit: raw.physicalUnit,
            packageSize: raw.packageSize,
            coveragePerUnit: raw.coveragePerUnit,
            priceType: raw.priceType || config.priceType || 'EXACT_PRODUCT_PRICE',
            price: raw.price !== undefined ? (typeof raw.price === 'number' ? raw.price : parseFloat(raw.price as string)) : undefined,
            minPrice: raw.minPrice !== undefined ? (typeof raw.minPrice === 'number' ? raw.minPrice : parseFloat(raw.minPrice as string)) : undefined,
            maxPrice: raw.maxPrice !== undefined ? (typeof raw.maxPrice === 'number' ? raw.maxPrice : parseFloat(raw.maxPrice as string)) : undefined,
            currency: raw.currency || 'DZD',
            taxIncluded: raw.taxIncluded !== undefined ? raw.taxIncluded : (config.sourceType !== 'B2B_SUPPLIER'),
            sourceName: raw.source || config.name,
            sourceUrl: raw.sourceUrl || urlCandidate.url,
            checkedAt: new Date().toISOString(),
            confidence: confidenceLevel,
            notes: raw.notes,
            discoveryMethod: 'scraper',
            providerId: config.id,
            productIdentity: {
              materialFamily: raw.materialFamily,
              materialType: raw.materialType,
              brand: raw.brand,
              productName: raw.productName,
              productVariant: raw.productVariant,
              dimensions: raw.dimensions,
              finish: raw.finish,
              application: raw.application,
              country: raw.country || config.country,
              region: raw.region
            },
            packageVariant: {
              productForm: raw.productForm,
              commercialUnit: raw.commercialUnit,
              physicalUnit: raw.physicalUnit,
              packageSize: raw.packageSize || 0, // 0 means unknown, will trigger review
              coveragePerUnit: raw.coveragePerUnit
            }
          };

          let status = 'ACCEPTED';
          let reason = '';

          if (candidate.priceType === 'EXACT_PRODUCT_PRICE' && (candidate.price === undefined || isNaN(candidate.price))) {
            status = 'INSUFFICIENT_DATA';
            reason = 'Missing or invalid exact price';
          } else if (candidate.priceType === 'MARKET_PRICE_RANGE' && (candidate.minPrice === undefined || isNaN(candidate.minPrice) || candidate.maxPrice === undefined || isNaN(candidate.maxPrice))) {
            status = 'INSUFFICIENT_DATA';
            reason = 'Missing or invalid market price range';
          } else if (candidate.country !== countryCode) {
            status = 'REJECTED';
            reason = 'Country mismatch';
          } else if (!candidate.materialFamily || !candidate.commercialUnit || !candidate.physicalUnit) {
            status = 'REJECTED';
            reason = 'Incompatible taxonomy / Missing units';
          } else if (config.sourceType === 'MARKETPLACE' && (candidate.priceType !== 'EXACT_PRODUCT_PRICE' || !candidate.packageVariant?.packageSize)) {
            status = 'REVIEW';
            reason = 'Marketplace requires explicit price and package size';
          } else if (candidate.priceType === 'EXACT_PRODUCT_PRICE' && !candidate.packageVariant?.packageSize && !['m2', 'm3', 'piece', 'box'].includes(candidate.commercialUnit)) {
            status = 'REVIEW';
            reason = 'Missing package size for retail product';
          } else if (confidenceLevel === 'low') {
            status = 'REVIEW';
            reason = 'Low confidence';
          } else if (!raw.brand && !raw.productName && candidate.priceType === 'EXACT_PRODUCT_PRICE') {
            status = 'REVIEW';
            reason = 'Incomplete product identity';
          }

          if (status === 'ACCEPTED') report.accepted++;
          else if (status === 'REVIEW') report.review++;
          else if (status === 'REJECTED') report.rejected++;
          else report.rejected++;

          discoveryResults.candidates.push({
            status,
            confidenceScore,
            confidenceLevel,
            candidate,
            reason
          });
        }
      }
    }
  } finally {
    await browserFetcher.close();
  }

  const dataDir = path.resolve('data/pricing');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(path.join(dataDir, 'discovery-results.json'), JSON.stringify(discoveryResults, null, 2));
  fs.writeFileSync(path.join(dataDir, 'discovery-report.json'), JSON.stringify(report, null, 2));

  console.log(`\nDiscovery completed. Check data/pricing/discovery-results.json and discovery-report.json for details.`);
}

const args = process.argv.slice(2);
const countryIndex = args.indexOf('--country');
if (countryIndex !== -1 && args.length > countryIndex + 1) {
  runDiscovery(args[countryIndex + 1].toUpperCase()).catch(console.error);
} else {
  console.log('Usage: npx tsx scripts/price-update/discover-only.ts --country <CODE>');
}
