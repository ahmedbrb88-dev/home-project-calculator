import * as fs from 'fs';
import * as path from 'path';
import { SourceCandidate } from './types.js';
import { SOURCE_REGISTRY, SourceConfig } from '../registry.js';

const CANDIDATES_FILE = path.join(process.cwd(), 'data/pricing/source-candidates.json');

export interface ActivationPolicyConfig {
  minProductsTested: number;
  minSuccessRate: number; // 0 to 1
  requireTaxonomyCompatibility: boolean;
}

const DEFAULT_POLICY: ActivationPolicyConfig = {
  minProductsTested: 5,
  minSuccessRate: 0.8,
  requireTaxonomyCompatibility: true
};

export class SourceActivationManager {
  private candidates: SourceCandidate[] = [];

  constructor() {
    this.loadCandidates();
  }

  private loadCandidates() {
    if (fs.existsSync(CANDIDATES_FILE)) {
      try {
        const data = fs.readFileSync(CANDIDATES_FILE, 'utf-8');
        this.candidates = JSON.parse(data);
      } catch (err) {
        console.error('Error loading source candidates:', err);
      }
    }
  }

  private saveCandidates() {
    if (this.candidates.length > 0) {
      fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(this.candidates, null, 2));
    }
  }

  public evaluateCandidates(policy: ActivationPolicyConfig = DEFAULT_POLICY): {
    pending: SourceCandidate[],
    rejected: SourceCandidate[]
  } {
    const pending: SourceCandidate[] = [];
    const rejected: SourceCandidate[] = [];

    for (const candidate of this.candidates) {
      if (candidate.status === 'VALIDATED') {
        const tested = candidate.productsTested || 0;
        const valid = candidate.productsValid || 0;
        const successRate = tested > 0 ? valid / tested : 0;

        if (
          tested >= policy.minProductsTested &&
          successRate >= policy.minSuccessRate
        ) {
          candidate.status = 'PENDING_ACTIVATION';
          pending.push(candidate);
        } else {
          // Leave it as VALIDATED or mark it differently, but for this pipeline let's keep it VALIDATED unless it explicitly failed.
          // In real scenarios, maybe we just don't activate it yet.
        }
      } else if (candidate.status === 'PENDING_ACTIVATION') {
        pending.push(candidate);
      }
    }

    return { pending, rejected };
  }

  public activatePendingSources(dryRun: boolean = true): SourceConfig[] {
    const newlyActivated: SourceConfig[] = [];

    for (const candidate of this.candidates) {
      if (candidate.status === 'PENDING_ACTIVATION') {
        // Convert to SourceConfig
        const newSource: SourceConfig = {
          id: candidate.candidateId,
          name: candidate.detectedName || candidate.domain,
          country: candidate.country as any,
          url: `https://${candidate.domain}`,
          domain: candidate.domain,
          supportedMaterials: [], // Would ideally be populated from discovery
          supportedProductForms: [],
          enabled: true,
          priority: 3, // Default priority for newly activated
          sourceType: (candidate.sourceType as any) || 'UNKNOWN',
          activation: {
            activatedAt: new Date().toISOString(),
            activatedBy: 'AUTOMATED_PIPELINE',
            activationMode: 'AUTOMATED_POLICY'
          }
        };

        newlyActivated.push(newSource);
        
        if (!dryRun) {
          candidate.status = 'ACTIVE';
        }
      }
    }

    if (!dryRun) {
      this.saveCandidates();
      // NOTE: In a fully autonomous system we would write to registry.ts here.
      // But Phase 26 specifies the registry is the source of truth, and we should be careful.
      // We will output what needs to be added, but not dynamically rewrite the TS file during dry run.
    }

    return newlyActivated;
  }
}
