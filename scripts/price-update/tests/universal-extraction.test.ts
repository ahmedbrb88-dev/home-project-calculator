import { 
  parseDimensions, 
  parseCoverage, 
  parseCommercialUnit, 
  parseProductForm, 
  extractPackageSize, 
  normalizePhysicalUnit 
} from '../browser/attributeParsers.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[FAIL] ${message}`);
  }
  console.log(`[PASS] ${message}`);
}

async function runTests() {
  console.log("--- RUNNING UNIVERSAL EXTRACTION TESTS ---");

  // Package Sizes
  const pkg1 = extractPackageSize("Peinture intérieure Crème de Couleur - 2,5L");
  assert(pkg1?.size === 2.5 && pkg1.unit === 'litre', "Package extraction: 2.5L");

  const pkg2 = extractPackageSize("Sac de béton 25 kg");
  assert(pkg2?.size === 25 && pkg2.unit === 'kg', "Package extraction: 25 kg");

  const pkg3 = extractPackageSize("Carrelage 60x60 — boîte 1.44 m²");
  assert(pkg3?.size === 1.44 && pkg3.unit === 'm2' && pkg3.commercialUnit === 'unknown', "Package extraction: 1.44 m2 / box");

  // In GenericBrowserExtractor, parseCommercialUnit is used as fallback
  assert(parseCommercialUnit("Carrelage 60x60 — boîte 1.44 m²") === 'box', "Fallback commercial unit parsing");

  const pkg4 = extractPackageSize("25 kg / sac");
  assert(pkg4?.size === 25 && pkg4.unit === 'kg' && pkg4.commercialUnit === 'bag', "Package extraction: 25 kg / sac");

  const pkg5 = extractPackageSize("Peinture blanche");
  assert(pkg5 === null, "Package extraction: no package");

  // Dimensions
  const dim1 = parseDimensions("Carrelage 60x60 cm");
  assert(dim1 === "60x60 cm", "Dimensions: 60x60 cm");

  const dim2 = parseDimensions("1200 x 600 mm");
  assert(dim2 === "1200x600 mm", "Dimensions: 1200 x 600 mm");

  // Commercial Units
  assert(parseCommercialUnit("boîte") === "box", "Unit: boîte -> box");
  assert(parseCommercialUnit("seau") === "container", "Unit: seau -> container");
  assert(parseCommercialUnit("vrac") === "unknown", "Unit: vrac -> unknown (commercial unit)");

  // Product Forms
  assert(parseProductForm("vrac") === "bulk", "Form: vrac -> bulk");
  assert(parseProductForm("béton prêt à l'emploi") === "ready_mix", "Form: prêt à l'emploi -> ready_mix");

  console.log("Universal Extraction tests passed.");
}

runTests().catch(console.error);
