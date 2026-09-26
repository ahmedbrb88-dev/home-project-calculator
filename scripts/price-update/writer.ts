import fs from 'fs/promises';
import path from 'path';
import { PriceData } from '../../src/pricing/types.js';

export async function writeDataset(dataset: PriceData[], filePath: string) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(dataset, null, 2), 'utf8');
}

export async function writeHistory(date: string, data: any, historyDir: string) {
  await fs.mkdir(historyDir, { recursive: true });
  const filePath = path.join(historyDir, `${date}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function readDataset(filePath: string): Promise<PriceData[]> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content) as PriceData[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}
