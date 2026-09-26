export const COUNTRY_TERMINOLOGY: Record<string, {
  domains: string[];
  languages: string[];
  commerce: string[];
  materials: Record<string, string[]>;
}> = {
  'DZ': {
    domains: ['.dz'],
    languages: ['fr', 'ar'],
    commerce: ['prix', 'acheter', 'vente', 'boutique', 'magasin', 'سعر', 'شراء'],
    materials: {
      'paint': ['peinture prix Algérie', 'peinture intérieure Algérie', 'peinture bâtiment Algérie', 'peinture 20kg Algérie', 'peinture litre Algérie', 'سعر الطلاء'],
      'tile': ['carrelage prix Algérie', 'carrelage 60x60 Algérie', 'carrelage sol Algérie', 'سعر السيراميك'],
      'concrete': ['béton sac prix Algérie', 'béton prêt à l\'emploi Algérie', 'ciment béton Algérie', 'سعر الاسمنت'],
      'gravel': ['gravier prix Algérie', 'gravier sac Algérie', 'granulat Algérie', 'سعر الحصى']
    }
  },
  'FR': {
    domains: ['.fr'],
    languages: ['fr'],
    commerce: ['prix', 'acheter', 'vente', 'magasin', 'matériaux'],
    materials: {
      'paint': ['peinture prix', 'peinture intérieure prix', 'peinture bâtiment', 'achat peinture'],
      'tile': ['carrelage prix', 'carrelage intérieur', 'achat carrelage sol'],
      'concrete': ['béton sac prix', 'ciment sac prix', 'béton prêt à l\'emploi'],
      'gravel': ['gravier prix', 'achat gravier']
    }
  },
  'US': {
    domains: ['.com', '.us'],
    languages: ['en'],
    commerce: ['price', 'buy', 'shop', 'store', 'building materials'],
    materials: {
      'paint': ['paint price', 'interior paint price', 'buy paint', 'building paint'],
      'tile': ['floor tile price', 'buy tiles', 'ceramic tile price'],
      'concrete': ['concrete bag price', 'ready mix concrete', 'cement price'],
      'gravel': ['gravel price', 'buy gravel']
    }
  }
};

export function generateQueries(country: string, materials: string[]): string[] {
  const terminology = COUNTRY_TERMINOLOGY[country];
  if (!terminology) return [];
  
  let queries: string[] = [];
  
  if (materials && materials.length > 0) {
    for (const material of materials) {
      if (terminology.materials[material]) {
        queries = queries.concat(terminology.materials[material]);
      }
    }
  } else {
    // Collect all material queries
    for (const mat in terminology.materials) {
      queries = queries.concat(terminology.materials[mat]);
    }
  }
  
  return queries;
}
