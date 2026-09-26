export interface ProjectState {
  id: string; // unique ID for the user's saved project
  projectTypeId: string; // e.g., 'bathroom_renovation'
  name: string;
  country: string;
  currency: string;
  units: 'metric' | 'imperial';
  
  // Stored inputs across all steps
  inputs: Record<string, any>;
  
  // Calculation results from steps
  results: Record<string, any>;
  
  // Custom manual prices overrides
  manualPrices: Record<string, number>;
  
  // State of progress
  completedSteps: string[]; // step IDs
  currentStepId: string;
  
  createdAt: number;
  updatedAt: number;
}

export interface ProjectStepDef {
  id: string;
  titleKey: string;
  component: React.ComponentType<any>;
  isSummary?: boolean;
}

export interface ProjectDef {
  id: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
  icon: React.ReactNode;
  steps: ProjectStepDef[];
}

export interface PricingProfile {
  country: string;
  currency: string;
  lastUpdated: string;
  pricingVersion: string;
  items: Record<string, {
    unit: string;
    lowPrice: number;
    typicalPrice: number;
    highPrice: number;
    source: string;
  }>;
}
