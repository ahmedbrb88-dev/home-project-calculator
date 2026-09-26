import { RawPriceData, PriceSourceProvider, UpdateReport } from './types.js';
import { normalizePriceData } from './normalizer.js';
import { validatePriceData } from './validator.js';
import { readDataset, writeDataset, writeHistory } from './writer.js';
import { generateReportString } from './report.js';
import { PriceData } from '../../src/pricing/types.js';

const DATASET_PATH = 'data/pricing/prices.json';
const HISTORY_DIR = 'data/pricing/history';

export async function runUpdate(sources: PriceSourceProvider[]) {
  const date = new Date().toISOString().split('T')[0];
  
  const report: UpdateReport = {
    date,
    sourcesChecked: sources.length,
    pricesFound: 0,
    pricesAccepted: 0,
    pricesRejected: 0,
    pricesUnchanged: 0,
    pricesUpdated: 0,
    errors: 0,
    warnings: 0,
    rejections: []
  };

  const currentDataset = await readDataset(DATASET_PATH);
  const datasetMap = new Map<string, PriceData>();
  currentDataset.forEach(p => datasetMap.set(p.id, p));

  const historyEntries: any[] = [];

  for (const source of sources) {
    try {
      const rawPrices = await source.fetchPrices();
      report.pricesFound += rawPrices.length;

      for (const raw of rawPrices) {
        const preliminary = normalizePriceData(raw);
        const previousValid = datasetMap.get(preliminary.id!);
        
        const validation = validatePriceData(preliminary, previousValid);
        if (validation.valid && validation.price) {
          report.pricesAccepted++;
          
          if (!previousValid) {
            report.pricesUpdated++;
            datasetMap.set(validation.price.id, validation.price);
            historyEntries.push({
              action: 'ADDED',
              newPrice: validation.price,
              source: source.name
            });
          } else {
            if (previousValid.typicalPrice !== validation.price.typicalPrice) {
              report.pricesUpdated++;
              datasetMap.set(validation.price.id, validation.price);
              historyEntries.push({
                action: 'UPDATED',
                oldPrice: previousValid,
                newPrice: validation.price,
                source: source.name
              });
            } else {
              report.pricesUnchanged++;
            }
          }
        } else {
          report.pricesRejected++;
          report.rejections.push({
            material: String(raw.materialId || 'Unknown'),
            country: String(raw.country || 'Unknown'),
            source: source.name,
            reason: validation.reason || 'Unknown error'
          });
        }
      }
    } catch (e: any) {
      report.errors++;
      console.error(`Error fetching from source ${source.name}:`, e);
    }
  }

  const finalDataset = Array.from(datasetMap.values());
  
  if (report.pricesUpdated > 0) {
    await writeDataset(finalDataset, DATASET_PATH);
    await writeHistory(date, historyEntries, HISTORY_DIR);
  }

  const reportString = generateReportString(report);
  console.log(reportString);
  
  return report;
}

import { PointPFR } from './sources/retail/PointPFR.js';
import { LeroyMerlinFR } from './sources/retail/LeroyMerlinFR.js';
import { CastoramaFR } from './sources/retail/CastoramaFR.js';
import { CastoramaPaintFR } from './sources/retail/CastoramaPaintFR.js';
import { HomeDepotUS } from './sources/retail/HomeDepotUS.js';

const isMainModule = import.meta.url.startsWith('file:') && process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop() || '');

if (isMainModule || process.argv[1].includes('index.ts')) {
  const sources = [new PointPFR(), new LeroyMerlinFR(), new CastoramaFR(), new CastoramaPaintFR(), new HomeDepotUS()];
  runUpdate(sources).catch(console.error);
}
