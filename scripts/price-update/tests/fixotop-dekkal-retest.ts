import { BrowserFetcher } from '../browser/browserFetcher.js';
import { GenericBrowserExtractor } from '../browser/GenericBrowserExtractor.js';
import { PriceCandidate } from '../candidate.js';

const urls = [
  'https://fixotop.com/ar/products/peintures-interieures/peinture-murale-blanche-20kg',
  'https://fixotop.com/ar/p/boite-vis-boulons-500',
  'https://fixotop.com/ar/products/carrelage-ceramique/colle-carrelage-c1',
  'https://fixotop.com/ar/products/etancheite-isolation/etancheite-toiture-20kg',
  'https://fixotop.com/ar/p/courroie-distribution-universelle',
  'https://fixotop.com/ar/p/filtre-air-industriel',
  'https://dekkal-quincaillerie.dz/fr/produit/decapeur-de-peinture-thermique-1600w-220v-350-50',
  'https://dekkal-quincaillerie.dz/fr/produit/peinture-en-spray-chromee-200ml-spraytec',
  'https://dekkal-quincaillerie.dz/fr/produit/peinture-en-spray-doree-400ml-spraytec',
  'https://dekkal-quincaillerie.dz/fr/produit/decapant-peinture-spray-swab-400ml-algerie',
  'https://dekkal-quincaillerie.dz/fr/produit/decapant-peinture-enap-300g-025l-algerie',
  'https://dekkal-quincaillerie.dz/fr/produit/monte-charge-500kg-hd-18600-gshonda',
  'https://dekkal-quincaillerie.dz/fr/produit/monte-charge-800kg-hd-18601-gshonda',
  'https://dekkal-quincaillerie.dz/fr/produit/scie-sauteuse-400w-js262-orca-2',
  'https://dekkal-quincaillerie.dz/fr/produit/odometre-hd18500-gshonda-2'
];

async function run() {
  console.log('--- REAL FIXOTOP + DEKKAL RE-TEST ---');
  const fetcher = new BrowserFetcher();
  const extractor = new GenericBrowserExtractor();
  
  let accepted = 0;
  let review = 0;
  let rejected = 0;
  let insufficient = 0;

  try {
    for (const url of urls) {
      console.log(`\nFetching: ${url}`);
      const fetchRes = await fetcher.fetchPage(url);
      const res = fetchRes.result;
      if (!res.success) {
        console.log(`Failed to fetch: ${res.error}`);
        continue;
      }
      
      const candidates = await extractor.extract(res.html, url, fetchRes.page);
      
      if (fetchRes.page) await fetchRes.page.close();

      if (candidates.length === 0) {
        console.log('No products extracted.');
        rejected++;
        continue;
      }

      for (const raw of candidates) {
        // Run same validation as discover-only
        const candidate: any = {
          priceType: raw.priceType || 'EXACT_PRODUCT_PRICE',
          price: typeof raw.price === 'number' ? raw.price : parseFloat(raw.price as string),
          packageVariant: {
            packageSize: raw.packageSize || 0,
            commercialUnit: raw.commercialUnit
          },
          materialFamily: raw.productName?.toLowerCase().includes('peinture') ? 'paint' :
                          raw.productName?.toLowerCase().includes('carrelage') ? 'tile' : 'unknown',
          commercialUnit: raw.commercialUnit,
          physicalUnit: raw.physicalUnit,
          country: 'DZ'
        };

        let status = 'ACCEPTED';
        let reason = '';

        if (candidate.priceType === 'EXACT_PRODUCT_PRICE' && (candidate.price === undefined || isNaN(candidate.price))) {
          status = 'INSUFFICIENT_DATA';
          reason = 'Missing or invalid exact price';
        } else if (!candidate.materialFamily || !candidate.commercialUnit || !candidate.physicalUnit) {
          status = 'REJECTED';
          reason = 'Incompatible taxonomy / Missing units';
        } else if (candidate.priceType === 'EXACT_PRODUCT_PRICE' && !candidate.packageVariant?.packageSize && !['m2', 'm3', 'piece', 'box'].includes(candidate.commercialUnit)) {
          status = 'REVIEW';
          reason = 'Missing package size for retail product';
        } else if (!raw.brand && !raw.productName && candidate.priceType === 'EXACT_PRODUCT_PRICE') {
          status = 'REVIEW';
          reason = 'Incomplete product identity';
        }

        console.log(`Extracted: ${raw.productName} | Size: ${raw.packageSize}${raw.physicalUnit} | Price: ${raw.price} ${raw.currency}`);
        console.log(`Status: ${status} (${reason})`);
        
        if (status === 'ACCEPTED') accepted++;
        else if (status === 'REVIEW') review++;
        else if (status === 'REJECTED') rejected++;
        else insufficient++;
      }
    }
  } finally {
    await fetcher.close();
  }

  console.log('\n--- OVERALL RESULTS ---');
  console.log(`ACCEPTED: ${accepted}`);
  console.log(`REVIEW: ${review}`);
  console.log(`REJECTED: ${rejected}`);
  console.log(`INSUFFICIENT_DATA: ${insufficient}`);
}

run().catch(console.error);
