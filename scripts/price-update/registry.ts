export type CountryCode = 'FR' | 'US' | 'UK' | 'AU' | 'CA' | 'DZ';
export type SourceType = 'PRODUCT_RETAIL' | 'MARKETPLACE' | 'MARKET_REFERENCE' | 'B2B_SUPPLIER' | 'UNKNOWN';
export type PriceType = 'EXACT_PRODUCT_PRICE' | 'MARKET_PRICE_RANGE' | 'UNKNOWN';

export interface SourceConfig {
  id: string;
  name: string;
  country: CountryCode;
  url: string;
  domain?: string;
  supportedMaterials: string[];
  supportedProductForms: string[];
  enabled: boolean;
  priority: number; // Lower number = higher priority
  sourceType?: SourceType;
  priceType?: PriceType;
  reliability?: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
  activation?: {
    activatedAt: string;
    activatedBy: string;
    activationMode: 'MANUAL' | 'AUTOMATED_POLICY';
    validationReportId?: string;
  };
}

export const SOURCE_REGISTRY: SourceConfig[] = [
  {
    id: 'pointp_fr',
    name: 'Point.P France',
    country: 'FR',
    url: 'https://www.pointp.fr',
    supportedMaterials: ['gravel', 'concrete'],
    supportedProductForms: ['bag'],
    enabled: true,
    priority: 1
  },
  {
    id: 'leroymerlin_fr',
    name: 'Leroy Merlin France',
    country: 'FR',
    url: 'https://www.leroymerlin.fr',
    supportedMaterials: ['concrete', 'paint', 'tile'],
    supportedProductForms: ['bag', 'container', 'box'],
    enabled: true,
    priority: 2
  },
  {
    id: 'castorama_fr',
    name: 'Castorama France',
    country: 'FR',
    url: 'https://www.castorama.fr',
    supportedMaterials: ['paint', 'tile'],
    supportedProductForms: ['container', 'box'],
    enabled: true,
    priority: 3
  },
  // Future Countries (Disabled for now)
  {
    id: 'homedepot_us',
    name: 'Home Depot US',
    country: 'US',
    url: 'https://www.homedepot.com',
    supportedMaterials: ['gravel', 'concrete', 'tile', 'paint'],
    supportedProductForms: ['bag', 'box', 'gallon'],
    enabled: true,
    priority: 1
  },
  {
    id: 'ouedkniss_dz',
    name: 'Ouedkniss DZ',
    country: 'DZ',
    url: 'https://www.ouedkniss.com',
    domain: 'ouedkniss.com',
    supportedMaterials: ['concrete', 'gravel', 'tile', 'paint'],
    supportedProductForms: ['bag', 'box', 'container', 'tonne', 'm3'],
    enabled: true,
    priority: 1,
    sourceType: 'MARKETPLACE',
    priceType: 'EXACT_PRODUCT_PRICE',
    reliability: 'LOW'
  },
  {
    id: 'dzprix_dz',
    name: 'DZPRIX',
    country: 'DZ',
    url: 'https://dzprix.com',
    domain: 'dzprix.com',
    supportedMaterials: ['concrete', 'gravel', 'tile', 'paint'],
    supportedProductForms: ['bag', 'box', 'container'],
    enabled: true,
    priority: 2,
    sourceType: 'MARKETPLACE',
    priceType: 'EXACT_PRODUCT_PRICE',
    reliability: 'LOW'
  },
  {
    id: 'bricowest_dz',
    name: 'Bricowest DZ',
    country: 'DZ',
    url: 'https://bricowest.com',
    domain: 'bricowest.com',
    supportedMaterials: ['concrete', 'gravel', 'tile', 'paint'],
    supportedProductForms: ['bag', 'box', 'container', 'm3', 'tonne'],
    enabled: true,
    priority: 1,
    sourceType: 'PRODUCT_RETAIL',
    priceType: 'EXACT_PRODUCT_PRICE',
    reliability: 'MEDIUM'
  },
  {
    id: 'fixotop_dz',
    name: 'Fixotop DZ',
    country: 'DZ',
    url: 'https://fixotop.com',
    domain: 'fixotop.com',
    supportedMaterials: ['paint', 'tile', 'concrete'],
    supportedProductForms: ['container', 'box', 'bag'],
    enabled: true,
    priority: 1,
    sourceType: 'PRODUCT_RETAIL',
    priceType: 'EXACT_PRODUCT_PRICE',
    reliability: 'MEDIUM'
  },
  {
    id: 'dekkal_dz',
    name: 'Dekkal Quincaillerie',
    country: 'DZ',
    url: 'https://dekkal-quincaillerie.dz',
    domain: 'dekkal-quincaillerie.dz',
    supportedMaterials: ['paint'],
    supportedProductForms: ['container'],
    enabled: true,
    priority: 1,
    sourceType: 'PRODUCT_RETAIL',
    priceType: 'EXACT_PRODUCT_PRICE',
    reliability: 'HIGH'
  },
  {
    id: 'peintoura_dz',
    name: 'Peintoura',
    country: 'DZ',
    url: 'https://peintoura.com',
    domain: 'peintoura.com',
    supportedMaterials: ['paint'],
    supportedProductForms: ['container'],
    enabled: true,
    priority: 1,
    sourceType: 'PRODUCT_RETAIL',
    priceType: 'EXACT_PRODUCT_PRICE',
    reliability: 'HIGH'
  },
  {
    id: 'mawaddz_dz',
    name: 'MAWAD-DZ',
    country: 'DZ',
    url: 'https://mawad-dz.com',
    domain: 'mawad-dz.com',
    supportedMaterials: ['concrete', 'gravel', 'tile', 'paint'],
    supportedProductForms: ['bag', 'box', 'container', 'm3', 'tonne'],
    enabled: true,
    priority: 1,
    sourceType: 'MARKET_REFERENCE',
    priceType: 'MARKET_PRICE_RANGE',
    reliability: 'MEDIUM'
  },
  {
    id: 'bandq_uk',
    name: 'B&Q UK',
    country: 'UK',
    url: 'https://www.diy.com',
    supportedMaterials: ['concrete', 'paint', 'tile'],
    supportedProductForms: ['bag', 'container', 'box'],
    enabled: false,
    priority: 1
  },
  {
    id: 'bunnings_au',
    name: 'Bunnings AU',
    country: 'AU',
    url: 'https://www.bunnings.com.au',
    supportedMaterials: ['gravel', 'concrete', 'tile', 'paint'],
    supportedProductForms: ['bag', 'box', 'container'],
    enabled: false,
    priority: 1
  }
];
