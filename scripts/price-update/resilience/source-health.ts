import { SourceHealth, SourceStatus } from './types.js';

export class SourceHealthManager {
  private healthData: Map<string, SourceHealth> = new Map();

  constructor(initialData: SourceHealth[] = []) {
    for (const h of initialData) {
      this.healthData.set(h.sourceId, h);
    }
  }

  public getHealth(sourceId: string): SourceHealth | undefined {
    return this.healthData.get(sourceId);
  }

  public updateHealth(sourceId: string, updates: Partial<SourceHealth>): SourceHealth {
    const current = this.healthData.get(sourceId);
    if (!current) {
      throw new Error(`Source health not found for ${sourceId}`);
    }
    const updated = { ...current, ...updates };
    this.healthData.set(sourceId, updated);
    return updated;
  }

  public recordSuccess(sourceId: string, extractedCount: number): void {
    const current = this.healthData.get(sourceId);
    if (!current) return;

    this.updateHealth(sourceId, {
      status: 'ACTIVE',
      consecutiveFailures: 0,
      lastSuccessfulExtractionAt: new Date().toISOString(),
      lastCheckedAt: new Date().toISOString(),
      productsExtracted: current.productsExtracted + extractedCount,
      healthScore: Math.min(100, current.healthScore + 5)
    });
  }

  public recordFailure(sourceId: string, error: string): void {
    const current = this.healthData.get(sourceId);
    if (!current) return;

    const failures = current.consecutiveFailures + 1;
    let newStatus = current.status;
    let score = current.healthScore;

    if (failures === 1) {
      score = Math.max(0, score - 10);
    } else if (failures > 1 && failures <= 3) {
      newStatus = 'DEGRADED';
      score = Math.max(0, score - 20);
    } else if (failures > 3 && failures <= 10) {
      newStatus = 'TEMPORARILY_UNAVAILABLE';
      score = Math.max(0, score - 30);
    } else if (failures > 10) {
      newStatus = 'UNAVAILABLE';
      score = 0;
    }

    this.updateHealth(sourceId, {
      status: newStatus,
      consecutiveFailures: failures,
      lastError: error,
      lastCheckedAt: new Date().toISOString(),
      healthScore: score
    });
  }

  public detectStructuralChange(sourceId: string, previousProductCount: number, currentProductCount: number): void {
    const current = this.healthData.get(sourceId);
    if (!current) return;
    
    if (previousProductCount > 0 && currentProductCount === 0) {
      this.updateHealth(sourceId, {
        status: 'DEGRADED',
        lastError: 'SOURCE_STRUCTURE_CHANGED: Drop from ' + previousProductCount + ' to 0',
        healthScore: Math.max(0, current.healthScore - 40)
      });
    }
  }

  public getAll(): SourceHealth[] {
    return Array.from(this.healthData.values());
  }
}
