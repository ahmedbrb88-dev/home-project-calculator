import { BrowserFetcher } from '../browser/browserFetcher.js';
import * as http from 'http';
import * as https from 'https';

export async function realFetchUrl(url: string, useBrowser: boolean = false): Promise<{status: number, redirectedTo?: string, html?: string}> {
  if (useBrowser) {
    const fetcher = new BrowserFetcher();
    const { result, page } = await fetcher.fetchPage(url);
    if (page) await fetcher.close();
    
    return {
      status: result.statusCode,
      redirectedTo: result.finalUrl !== url ? result.finalUrl : undefined,
      html: result.html
    };
  }

  // HTTP Fetch fallback with redirects
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    return {
      status: response.status,
      redirectedTo: response.redirected && response.url !== url ? response.url : undefined,
      html
    };
  } catch (error) {
    console.error(`HTTP fetch failed for ${url}:`, error);
    return { status: 500 };
  }
}
