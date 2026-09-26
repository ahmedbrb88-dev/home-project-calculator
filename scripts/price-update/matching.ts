import { ProductIdentity, PackageVariant, MatchingStatus } from './candidate.js';

/**
 * Normalizes text for better product matching
 * e.g., "Peinture Dulux Valentine Crème de Couleur 1,25 L" -> "peinture dulux valentine creme de couleur 1.25l"
 */
export function normalizeText(text?: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, ' ') // Collapse spaces
    .replace(/,/g, '.') // Convert decimal commas to dots
    .replace(/(\d)\s+(l|kg|m2|cm|mm|m)/g, '$1$2') // Attach units to numbers
    .trim();
}

/**
 * Generates a deterministic fingerprint for the product identity.
 */
export function generateProductFingerprint(identity: ProductIdentity, variant?: PackageVariant): string {
  const parts = [
    normalizeText(identity.brand),
    normalizeText(identity.productName),
    normalizeText(identity.productVariant),
    normalizeText(identity.dimensions),
    normalizeText(identity.finish),
    identity.materialFamily,
    identity.materialType || '',
    identity.country,
  ];

  if (variant) {
    parts.push(variant.productForm);
    parts.push(variant.commercialUnit);
    parts.push(variant.physicalUnit);
    parts.push(variant.packageSize.toString());
  }

  // Filter out empty strings and join with a separator
  return parts.filter(p => p !== '').join('||');
}

/**
 * Compares two ProductIdentities (with optional PackageVariants) and returns the match status.
 */
export function matchProduct(
  a: ProductIdentity, 
  b: ProductIdentity,
  variantA?: PackageVariant,
  variantB?: PackageVariant
): MatchingStatus {
  // If the basic taxonomy doesn't even match, it's a different product
  if (
    a.materialFamily !== b.materialFamily ||
    a.country !== b.country ||
    (a.materialType && b.materialType && a.materialType !== b.materialType)
  ) {
    return 'DIFFERENT_PRODUCT';
  }

  // Normalization for easy comparison
  const brandA = normalizeText(a.brand);
  const brandB = normalizeText(b.brand);
  const nameA = normalizeText(a.productName);
  const nameB = normalizeText(b.productName);
  const varA = normalizeText(a.productVariant);
  const varB = normalizeText(b.productVariant);
  const dimA = normalizeText(a.dimensions);
  const dimB = normalizeText(b.dimensions);

  // If one of the primary identification fields is missing entirely on one side, it's insufficient data
  if ((!brandA && brandB) || (brandA && !brandB) || (!nameA && nameB) || (nameA && !nameB)) {
    return 'INSUFFICIENT_DATA';
  }
  
  if (!brandA && !brandB && !nameA && !nameB) {
    return 'INSUFFICIENT_DATA';
  }

  // If any core distinguishing features conflict directly
  if (brandA && brandB && brandA !== brandB) return 'DIFFERENT_PRODUCT';
  if (nameA && nameB && nameA !== nameB) return 'DIFFERENT_PRODUCT';
  if (varA && varB && varA !== varB) return 'DIFFERENT_PRODUCT';
  if (dimA && dimB && dimA !== dimB) return 'DIFFERENT_PRODUCT';

  // Check packaging variants if provided
  if (variantA && variantB) {
    if (
      variantA.productForm !== variantB.productForm ||
      variantA.commercialUnit !== variantB.commercialUnit ||
      variantA.physicalUnit !== variantB.physicalUnit
    ) {
      return 'DIFFERENT_PRODUCT';
    }

    if (variantA.packageSize !== variantB.packageSize) {
      // Same product, different packaging -> DIFFERENT_PRODUCT for pricing purposes (as per reqs)
      return 'DIFFERENT_PRODUCT';
    }
  } else if (variantA || variantB) {
    // If one has variant and the other doesn't, we can't definitively match
    return 'INSUFFICIENT_DATA';
  }

  const finA = normalizeText(a.finish);
  const finB = normalizeText(b.finish);
  
  if (finA && finB && finA !== finB) return 'DIFFERENT_PRODUCT';

  // If we made it here and have at least brand and name matching
  if (brandA && brandB && nameA && nameB) {
    // If one has variant/dimensions/finish and the other doesn't, it's possible but not exact
    if (
      (varA && !varB) || (!varA && varB) ||
      (dimA && !dimB) || (!dimA && dimB) ||
      (finA && !finB) || (!finA && finB)
    ) {
      return 'POSSIBLE_MATCH';
    }
    return 'EXACT_MATCH';
  }

  return 'POSSIBLE_MATCH';
}
