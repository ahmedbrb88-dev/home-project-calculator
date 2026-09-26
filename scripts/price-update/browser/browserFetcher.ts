import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { BrowserFetchResult } from './browserTypes.js';

export class BrowserFetcher {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  
  private async init() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
      this.context = await this.browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        viewport: { width: 1280, height: 720 }
      });
    }
  }

  public async fetchPage(url: string, timeoutMs: number = 20000): Promise<{ result: BrowserFetchResult, page?: Page }> {
    await this.init();
    
    let page: Page | null = null;
    const startTime = Date.now();
    let result: BrowserFetchResult = {
      success: false,
      url,
      finalUrl: url,
      statusCode: 0,
      rendered: false,
      blocked: false,
      html: '',
      title: '',
      loadTimeMs: 0
    };

    try {
      page = await this.context!.newPage();
      
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
      
      result.loadTimeMs = Date.now() - startTime;
      
      if (!response) {
        result.error = 'No response';
        await page.close();
        return { result };
      }

      result.statusCode = response.status();
      result.finalUrl = page.url();

      const html = await page.content();
      result.html = html;
      result.title = await page.title();
      
      // Basic block detection
      if (html.includes('Cloudflare') && html.includes('challenge')) {
        result.blocked = true;
        result.error = 'Blocked by anti-bot challenge';
        await page.close();
        return { result };
      }

      if (result.statusCode >= 400 && result.statusCode !== 404) {
        result.error = `HTTP ${result.statusCode}`;
      } else {
        result.success = true;
        result.rendered = true;
      }

      return { result, page };
    } catch (e: any) {
      result.error = e.message;
      result.loadTimeMs = Date.now() - startTime;
      if (page) await page.close();
      return { result };
    }
  }

  public async close() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    this.context = null;
    this.browser = null;
  }
}
