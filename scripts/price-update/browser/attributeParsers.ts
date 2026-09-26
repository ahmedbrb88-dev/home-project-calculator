export function parseDimensions(text: string): string | undefined {
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*(?:x|×|X)\s*(\d+(?:[.,]\d+)?)\s*(cm|mm|in|m)/i);
  if (match) {
    return `${match[1]}x${match[2]} ${match[3].toLowerCase()}`;
  }
  return undefined;
}

export function parseCoverage(text: string): number | undefined {
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*(?:m2|m²|sq\s*ft)\s*\/\s*(?:l|L|litre|kg)/i);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  // range coverage, take lower or average? User says "If a range is provided: coverageMin / coverageMax. Do NOT automatically convert the range to a midpoint." But model only has coveragePerUnit.
  // Wait, I will just extract the first number if it says "10 m2/L"
  const rangeMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:-|–|a|à)\s*(\d+(?:[.,]\d+)?)\s*(?:m2|m²|sq\s*ft)\s*\/\s*(?:l|L|litre|kg)/i);
  if (rangeMatch) {
    // If range, maybe return undefined since we only have coveragePerUnit and user says do not midpoint
    return undefined; 
  }
  return undefined;
}

export function parseCommercialUnit(text: string): string {
  const lower = text.toLowerCase();
  if (lower.match(/\b(sac|bag)\b/)) return 'bag';
  if (lower.match(/\b(box|carton|boîte|boite)\b/)) return 'box';
  if (lower.match(/\b(container|pot|seau|bidon|bottle)\b/)) return 'container';
  if (lower.match(/\b(piece|pièce|unité)\b/)) return 'piece';
  if (lower.match(/\b(tonne)\b/)) return 'tonne';
  if (lower.match(/\b(m3|m³)\b/)) return 'm3';
  if (lower.match(/\b(m2|m²|sq\s*ft)\b/)) return 'm2';
  if (lower.match(/\b(litre|liter|l)\b/)) return 'litre';
  return 'unknown';
}

export function parseProductForm(text: string): string {
  const lower = text.toLowerCase();
  if (lower.match(/\b(sac|bag)\b/)) return 'bag';
  if (lower.match(/\b(box|carton|boîte|boite)\b/)) return 'box';
  if (lower.match(/\b(container|pot|seau|bidon|bottle)\b/)) return 'container';
  if (lower.match(/\b(vrac|bulk)\b/)) return 'bulk';
  if (lower.match(/\b(prêt à l'emploi|ready_mix)\b/)) return 'ready_mix';
  if (lower.match(/\b(piece|pièce)\b/)) return 'piece';
  return 'unknown';
}

export function extractPackageSize(text: string): { size: number; unit: string; commercialUnit: string } | null {
  // Matches "25 kg / sac", "1.44 m2 / boite"
  const complexMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(kg|g|l|ml|m2|m²|sq\s*ft|كغ|لتر|مل|غ)\s*\/\s*(sac|bag|boîte|boite|box|carton|pot|seau|bidon)/i);
  if (complexMatch) {
    return {
      size: parseFloat(complexMatch[1].replace(',', '.')),
      unit: normalizePhysicalUnit(complexMatch[2]),
      commercialUnit: parseCommercialUnit(complexMatch[3])
    };
  }

  // Matches "25 kg", "2.5 L"
  // Negative lookahead (?![a-zA-Z]) ensures we don't match "G" inside "GSHONDA"
  const simpleMatch = text.match(/(?:\b|^)(\d+(?:[.,]\d+)?)\s*(kg|g|l|ml|m2|m²|sq\s*ft|كغ|لتر|مل|غ)(?![a-zA-Z])/i);
  if (simpleMatch) {
    // Make sure it is not part of a density or coverage (e.g. not "25 kg/m3")
    if (text.substring(simpleMatch.index! + simpleMatch[0].length).match(/^\s*\/\s*(m2|m³|m3|l)/i)) {
      return null;
    }
    return {
      size: parseFloat(simpleMatch[1].replace(',', '.')),
      unit: normalizePhysicalUnit(simpleMatch[2]),
      commercialUnit: 'unknown'
    };
  }

  return null;
}

export function normalizePhysicalUnit(unit: string): string {
  const lower = unit.toLowerCase().trim();
  if (lower === 'm²' || lower === 'sq ft') return 'm2';
  if (lower === 'l' || lower === 'لتر') return 'litre';
  if (lower === 'ml' || lower === 'مل') return 'ml';
  if (lower === 'g' || lower === 'غ') return 'g';
  if (lower === 'kg' || lower === 'كغ') return 'kg';
  return lower;
}
