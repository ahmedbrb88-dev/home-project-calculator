const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const { from, to } of replacements) {
    if (typeof from === 'string') {
      content = content.replace(from, to);
    } else {
      content = content.replace(from, to);
    }
  }
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

const dir = path.join(__dirname, 'src', 'pages');
const compDir = path.join(__dirname, 'src', 'components');

// 1. Home.tsx
replaceInFile(path.join(dir, 'Home.tsx'), [
  { from: '<span className="eyebrow">SIMPLE PROCESS</span>', to: '<span className="eyebrow">{t(\'home.howItWorks.eyebrow\', \'Simple Process\')}</span>' },
  { from: '<h2 style={{ marginTop: \'0.5rem\' }}>How it works</h2>', to: '<h2 style={{ marginTop: \'0.5rem\' }}>{t(\'home.howItWorks.title\', \'How it works\')}</h2>' },
  { from: 'title: \'Choose a calculator\'', to: 'title: t(\'home.howItWorks.step1\', \'Choose a calculator\')' },
  { from: 'title: \'Enter measurements\'', to: 'title: t(\'home.howItWorks.step2\', \'Enter measurements\')' },
  { from: 'title: \'Get your estimate\'', to: 'title: t(\'home.howItWorks.step3\', \'Get your estimate\')' },
  { from: '<span className="eyebrow" style={{ color: \'var(--color-primary-light)\' }}>Project Navigation</span>', to: '<span className="eyebrow" style={{ color: \'var(--color-primary-light)\' }}>{t(\'home.projects.eyebrow\', \'Project Navigation\')}</span>' },
  { from: '<h2 style={{ marginTop: \'0.5rem\', color: \'white\' }}>Planning a bigger project?</h2>', to: '<h2 style={{ marginTop: \'0.5rem\', color: \'white\' }}>{t(\'home.projects.title\', \'Planning a bigger project?\')}</h2>' },
  { from: '<p style={{ color: \'#94a3b8\', fontSize: \'1.125rem\' }}>Select your project to see the tools you\'ll need.</p>', to: '<p style={{ color: \'#94a3b8\', fontSize: \'1.125rem\' }}>{t(\'home.projects.subtitle\', \'Select your project to see the tools you\\\'ll need.\')}</p>' },
  { from: 'View tools <ArrowRight', to: '{t(\'home.projects.view\', \'View tools\')} <ArrowRight' },
  { from: '<h2 style={{ marginBottom: \'1rem\' }}>Start planning your project.</h2>', to: '<h2 style={{ marginBottom: \'1rem\' }}>{t(\'home.cta.title\', \'Start planning your project.\')}</h2>' },
  { from: 'Find the calculator you need and get your estimate in seconds.', to: '{t(\'home.cta.desc\', \'Find the calculator you need and get your estimate in seconds.\')}' },
]);

// 2. GravelCalculator.tsx
replaceInFile(path.join(dir, 'GravelCalculator.tsx'), [
  { from: 'const { unitSystem, currency } = useSettings();', to: 'const { unitSystem, currency, t } = useSettings();' },
  { from: '<h1 style={{ marginBottom: \'0.25rem\', fontSize: \'2rem\' }}>Gravel Calculator</h1>', to: '<h1 style={{ marginBottom: \'0.25rem\', fontSize: \'2rem\' }}>{t(\'calc.gravel.title\', \'Gravel Calculator\')}</h1>' },
  { from: '<p style={{ margin: 0 }}>Estimate gravel or aggregate for landscaping.</p>', to: '<p style={{ margin: 0 }}>{t(\'calc.gravel.description\', \'Estimate gravel or aggregate for landscaping.\')}</p>' },
  { from: 'Room Area', to: '{t(\'calc.step1\', \'Project Dimensions\')}' },
  { from: 'label="Length"', to: 'label={t(\'calc.inputs.length\', \'Length\')}' },
  { from: 'label="Width"', to: 'label={t(\'calc.inputs.width\', \'Width\')}' },
  { from: 'label="Depth"', to: 'label={t(\'calc.inputs.depth\', \'Depth\')}' },
  { from: /<h3[^>]*>\s*<span[^>]*>2<\/span>\s*Options & Pricing\s*<\/h3>/, to: '<h3 style={{ margin: \'3rem 0 2rem 0\', display: \'flex\', alignItems: \'center\', gap: \'0.5rem\' }}><span style={{ width: \'24px\', height: \'24px\', borderRadius: \'50%\', background: \'var(--color-navy)\', color: \'white\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', fontSize: \'12px\' }}>2</span>{t(\'calc.step2\', \'Options & Pricing\')}</h3>' },
  { from: 'label="Density (tons per unit³)"', to: 'label={t(\'calc.gravel.density\', \'Density (tons per unit³)\')}' },
  { from: 'label="Waste / Extra"', to: 'label={t(\'calc.waste\', \'Waste Factor\')}' },
  { from: 'label="Price per Ton"', to: 'label={t(\'calc.pricePer\', \'Price per\') + \' Ton\'}' },
  { from: '<span className="eyebrow" style={{ color: \'var(--color-primary-light)\', display: \'block\', marginBottom: \'1rem\' }}>Your Estimate</span>', to: '<span className="eyebrow" style={{ color: \'var(--color-primary-light)\', display: \'block\', marginBottom: \'1rem\' }}>{t(\'calc.yourEstimate\', \'Your Estimate\')}</span>' },
  { from: 'Volume: {totalVol.toFixed(1)} {unitVol}', to: '{t(\'copy.gravel.base\', \'Volume: {val}\', { val: `${totalVol.toFixed(1)} ${unitVol}` })}' },
  { from: '<div style={{ fontSize: \'0.875rem\', color: \'#94a3b8\', textTransform: \'uppercase\', letterSpacing: \'0.05em\', marginBottom: \'0.5rem\', fontWeight: 600 }}>Estimated Cost</div>', to: '<div style={{ fontSize: \'0.875rem\', color: \'#94a3b8\', textTransform: \'uppercase\', letterSpacing: \'0.05em\', marginBottom: \'0.5rem\', fontWeight: 600 }}>{t(\'calc.materialCost\', \'Estimated material cost\')}</div>' },
  { from: 'Copy result', to: '{t(\'btn.copy\', \'Copy result\')}' },
  { from: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\', color: \'var(--color-navy)\' }}>How to calculate gravel</h2>', to: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.gravel.howItWorks\', \'How to calculate gravel\')}</h2>' },
  { from: 'Estimating gravel, crushed stone, or soil usually involves finding the volume in cubic yards or cubic meters, and then converting that volume into weight (tons) since most bulk materials are sold by weight.', to: '{t(\'calc.gravel.howItWorksDesc\', \'Estimating gravel, crushed stone, or soil usually involves finding the volume in cubic yards or cubic meters, and then converting that volume into weight (tons) since most bulk materials are sold by weight.\')}' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>The Formula</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.gravel.formula\', \'The Formula\')}</h3>' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>Example Calculation</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.gravel.example\', \'Example Calculation\')}</h3>' },
  { from: 'Filling a 10m × 2m path at 0.05m (5cm) depth:', to: '{t(\'calc.gravel.exampleDesc\', \'Filling a 10m × 2m path at 0.05m (5cm) depth:\')}' },
  { from: '<strong>Volume:</strong> 10 × 2 × 0.05 = 1.0 m³', to: '<strong>{t(\'calc.gravel.ex1\', \'Volume: 10 × 2 × 0.05 = 1.0 m³\')}</strong>' },
  { from: '<strong>Weight:</strong> 1.0 m³ × 1.6 = 1.6 metric tons', to: '<strong>{t(\'calc.gravel.ex2\', \'Weight: 1.0 m³ × 1.6 = 1.6 metric tons\')}</strong>' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>Density & Weight</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.gravel.tips\', \'Density & Weight\')}</h3>' },
  { from: 'Different materials have different densities. Standard gravel is usually around 1.6 metric tons per cubic meter. Soil is lighter (around 1.2 t/m³), while sand is heavier. Check with your supplier for the exact conversion factor.', to: '{t(\'calc.gravel.tipsDesc\', \'Different materials have different densities. Standard gravel is usually around 1.6 metric tons per cubic meter. Soil is lighter (around 1.2 t/m³), while sand is heavier. Check with your supplier for the exact conversion factor.\')}' },
  { from: 'Always verify with your local supplier as moisture and exact rock composition can change the final weight significantly.', to: '{t(\'calc.gravel.disclaimer\', \'Always verify with your local supplier as moisture and exact rock composition can change the final weight significantly.\')}' },
]);

// 3. PaintCalculator.tsx
replaceInFile(path.join(dir, 'PaintCalculator.tsx'), [
  { from: 'const { unitSystem, currency } = useSettings();', to: 'const { unitSystem, currency, t } = useSettings();' },
  { from: '<h1 style={{ marginBottom: \'0.25rem\', fontSize: \'2rem\' }}>Paint Calculator</h1>', to: '<h1 style={{ marginBottom: \'0.25rem\', fontSize: \'2rem\' }}>{t(\'calc.paint.title\', \'Paint Calculator\')}</h1>' },
  { from: '<p style={{ margin: 0 }}>Estimate how much paint you need for your walls.</p>', to: '<p style={{ margin: 0 }}>{t(\'calc.paint.description\', \'Estimate how much paint you need for your walls.\')}</p>' },
  { from: 'Project Dimensions', to: '{t(\'calc.step1\', \'Project Dimensions\')}' },
  { from: 'label="Room Length"', to: 'label={t(\'calc.inputs.length\', \'Length\')}' },
  { from: 'label="Room Width"', to: 'label={t(\'calc.inputs.width\', \'Width\')}' },
  { from: 'label="Wall Height"', to: 'label={t(\'calc.inputs.height\', \'Height\')}' },
  { from: 'Doors & Windows', to: '{t(\'calc.inputs.doors\', \'Doors\')} & {t(\'calc.inputs.windows\', \'Windows\')}' },
  { from: 'label="Doors"', to: 'label={t(\'calc.inputs.doors\', \'Doors\')}' },
  { from: 'label="Windows"', to: 'label={t(\'calc.inputs.windows\', \'Windows\')}' },
  { from: /<h3[^>]*>\s*<span[^>]*>3<\/span>\s*Options & Pricing\s*<\/h3>/, to: '<h3 style={{ margin: \'3rem 0 2rem 0\', display: \'flex\', alignItems: \'center\', gap: \'0.5rem\' }}><span style={{ width: \'24px\', height: \'24px\', borderRadius: \'50%\', background: \'var(--color-navy)\', color: \'white\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', fontSize: \'12px\' }}>3</span>{t(\'calc.step3\', \'Options & Pricing\')}</h3>' },
  { from: 'label="Coats"', to: 'label={t(\'calc.inputs.coats\', \'Coats\')}' },
  { from: 'label="Coverage per unit"', to: 'label={t(\'calc.inputs.coverage\', \'Coverage per unit\')}' },
  { from: 'label="Price per unit"', to: 'label={t(\'calc.pricePer\', \'Price per\') + \' unit\'}' },
  { from: 'Your Estimate', to: '{t(\'calc.yourEstimate\', \'Your Estimate\')}' },
  { from: 'Surface area: {netArea.toFixed(1)} {unitA}', to: '{t(\'copy.paint.base\', \'Surface area: {val}\', { val: `${netArea.toFixed(1)} ${unitA}` })}' },
  { from: 'Estimated Cost', to: '{t(\'calc.materialCost\', \'Estimated material cost\')}' },
  { from: 'Copy result', to: '{t(\'btn.copy\', \'Copy result\')}' },
  { from: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\', color: \'var(--color-navy)\' }}>How to calculate paint</h2>', to: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.paint.howItWorks\', \'How to calculate paint\')}</h2>' },
  { from: 'To estimate paint, you calculate the total surface area of the walls, subtract the areas that won\'t be painted (doors and windows), and divide by the paint\'s coverage rate.', to: '{t(\'calc.paint.howItWorksDesc\', \'To estimate paint, you calculate the total surface area of the walls, subtract the areas that won\\\'t be painted (doors and windows), and divide by the paint\\\'s coverage rate.\')}' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>The Formula</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.paint.formula\', \'The Formula\')}</h3>' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>Example Calculation</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.paint.example\', \'Example Calculation\')}</h3>' },
  { from: 'Painting a room with 40 m² of walls, 1 door (2 m²), and 1 window (1.5 m²):', to: '{t(\'calc.paint.exampleDesc\', \'Painting a room with 40 m² of walls, 1 door (2 m²), and 1 window (1.5 m²):\')}' },
  { from: '<strong>Total wall area:</strong> 40 m²', to: '<strong>{t(\'calc.paint.ex1\', \'Total wall area: 40 m²\')}</strong>' },
  { from: '<strong>Subtract openings:</strong> 40 - 2 - 1.5 = 36.5 m²', to: '<strong>{t(\'calc.paint.ex2\', \'Subtract openings: 40 - 2 - 1.5 = 36.5 m²\')}</strong>' },
  { from: '<strong>Paint required (1 coat):</strong> 36.5 ÷ 10 m²/L = 3.65 Liters', to: '<strong>{t(\'calc.paint.ex3\', \'Paint required (1 coat): 36.5 ÷ 10 m²/L = 3.65 Liters\')}</strong>' },
  { from: '<strong>For 2 coats:</strong> 3.65 × 2 = 7.3 Liters', to: '<strong>{t(\'calc.paint.ex4\', \'For 2 coats: 3.65 × 2 = 7.3 Liters\')}</strong>' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>Why subtract doors and windows?</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.paint.tips\', \'Why subtract doors and windows?\')}</h3>' },
  { from: 'Doors and windows take up significant wall space. A standard interior door is about 2 m² (21 sq ft) and a standard window is about 1.5 m² (15 sq ft). Subtracting them prevents you from over-buying paint.', to: '{t(\'calc.paint.tipsDesc\', \'Doors and windows take up significant wall space. A standard interior door is about 2 m² (21 sq ft) and a standard window is about 1.5 m² (15 sq ft). Subtracting them prevents you from over-buying paint.\')}' },
  { from: 'Textured walls, bare drywall, and dramatic color changes (e.g., painting white over dark blue) will require more paint or a primer coat.', to: '{t(\'calc.paint.disclaimer\', \'Textured walls, bare drywall, and dramatic color changes (e.g., painting white over dark blue) will require more paint or a primer coat.\')}' },
]);

// 4. SquareFootageCalculator.tsx
replaceInFile(path.join(dir, 'SquareFootageCalculator.tsx'), [
  { from: 'const { unitSystem } = useSettings();', to: 'const { unitSystem, t } = useSettings();' },
  { from: '<h1 style={{ marginBottom: \'0.25rem\', fontSize: \'2rem\' }}>Square Footage Calculator</h1>', to: '<h1 style={{ marginBottom: \'0.25rem\', fontSize: \'2rem\' }}>{t(\'calc.area.title\', \'Square Footage Calculator\')}</h1>' },
  { from: '<p style={{ margin: 0 }}>Calculate total area for any rectangular space.</p>', to: '<p style={{ margin: 0 }}>{t(\'calc.area.description\', \'Calculate total area for any rectangular space.\')}</p>' },
  { from: 'Project Dimensions', to: '{t(\'calc.step1\', \'Project Dimensions\')}' },
  { from: 'label="Length"', to: 'label={t(\'calc.inputs.length\', \'Length\')}' },
  { from: 'label="Width"', to: 'label={t(\'calc.inputs.width\', \'Width\')}' },
  { from: 'Your Estimate', to: '{t(\'calc.yourEstimate\', \'Your Estimate\')}' },
  { from: 'Copy result', to: '{t(\'btn.copy\', \'Copy result\')}' },
  { from: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\', color: \'var(--color-navy)\' }}>How to calculate square footage</h2>', to: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.area.howItWorks\', \'How to calculate square footage\')}</h2>' },
  { from: 'Square footage (or square meters) is the most basic and common measurement in home improvement. It measures the 2D area of a surface, like a floor, wall, or garden bed.', to: '{t(\'calc.area.howItWorksDesc\', \'Square footage (or square meters) is the most basic and common measurement in home improvement. It measures the 2D area of a surface, like a floor, wall, or garden bed.\')}' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>The Formula</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.area.formula\', \'The Formula\')}</h3>' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>Example Calculation</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.area.example\', \'Example Calculation\')}</h3>' },
  { from: 'Measuring a rectangular room that is 4 meters long and 3 meters wide:', to: '{t(\'calc.area.exampleDesc\', \'Measuring a rectangular room that is 4 meters long and 3 meters wide:\')}' },
  { from: '<strong>Area:</strong> 4m × 3m = 12 m²', to: '<strong>{t(\'calc.area.ex1\', \'Area: 4m × 3m = 12 m²\')}</strong>' },
  { from: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>Complex shapes</h3>', to: '<h3 style={{ fontSize: \'1.25rem\', marginBottom: \'1rem\', marginTop: \'2.5rem\', color: \'var(--color-navy)\' }}>{t(\'calc.area.tips\', \'Complex shapes\')}</h3>' },
  { from: 'If your room isn\'t a perfect rectangle (like an L-shaped room), break it down into smaller rectangular sections. Measure the area of each section separately, then add them together for the total area.', to: '{t(\'calc.area.tipsDesc\', \'If your room isn\\\'t a perfect rectangle (like an L-shaped room), break it down into smaller rectangular sections. Measure the area of each section separately, then add them together for the total area.\')}' },
  { from: 'Always measure twice! For expensive materials like hardwood flooring or custom tiles, add a 5-10% waste factor to your final area calculation.', to: '{t(\'calc.area.disclaimer\', \'Always measure twice! For expensive materials like hardwood flooring or custom tiles, add a 5-10% waste factor to your final area calculation.\')}' },
]);

// 5. CalculatorsDirectory.tsx
replaceInFile(path.join(dir, 'CalculatorsDirectory.tsx'), [
  { from: '<h1 style={{ marginBottom: \'1rem\', fontSize: \'2.5rem\' }}>All Calculators</h1>', to: '<h1 style={{ marginBottom: \'1rem\', fontSize: \'2.5rem\' }}>{t(\'directory.title\', \'All Calculators\')}</h1>' },
  { from: '<p style={{ color: \'var(--color-text-muted)\', fontSize: \'1.25rem\' }}>Find the right tool for your next home improvement project.</p>', to: '<p style={{ color: \'var(--color-text-muted)\', fontSize: \'1.25rem\' }}>{t(\'directory.subtitle\', \'Find the right tool for your next home improvement project.\')}</p>' },
  { from: '<h2 style={{ fontSize: \'1.5rem\' }}>Popular Tools</h2>', to: '<h2 style={{ fontSize: \'1.5rem\' }}>{t(\'directory.popular\', \'Popular Tools\')}</h2>' },
  { from: '<h2 style={{ fontSize: \'1.5rem\' }}>All Tools</h2>', to: '<h2 style={{ fontSize: \'1.5rem\' }}>{t(\'directory.all\', \'All Tools\')}</h2>' },
  { from: 'name: \'Concrete Calculator\'', to: 'name: t(\'calc.concrete.title\', \'Concrete Calculator\')' },
  { from: 'label: \'FOUNDATION\'', to: 'label: t(\'cat.foundation\', \'FOUNDATION\')' },
  { from: 'desc: \'Calculate concrete volume and material requirements.\'', to: 'desc: t(\'calc.concrete.description\', \'Calculate concrete volume and material requirements.\')' },
  { from: 'name: \'Paint Calculator\'', to: 'name: t(\'calc.paint.title\', \'Paint Calculator\')' },
  { from: 'label: \'INTERIOR\'', to: 'label: t(\'cat.interior\', \'INTERIOR\')' },
  { from: 'desc: \'Estimate the amount of paint required.\'', to: 'desc: t(\'calc.paint.description\', \'Estimate the amount of paint required.\')' },
  { from: 'name: \'Square Footage\'', to: 'name: t(\'calc.area.title\', \'Square Footage Calculator\')' },
  { from: 'label: \'MEASURE\'', to: 'label: t(\'cat.measure\', \'MEASURE\')' },
  { from: 'desc: \'Calculate the area of a space.\'', to: 'desc: t(\'calc.area.description\', \'Calculate total area for any rectangular space.\')' },
  { from: 'name: \'Tile Calculator\'', to: 'name: t(\'calc.tile.title\', \'Tile Calculator\')' },
  { from: 'label: \'FLOORING\'', to: 'label: t(\'cat.flooring\', \'FLOORING\')' },
  { from: 'desc: \'Estimate tiles and material requirements.\'', to: 'desc: t(\'calc.tile.description\', \'Calculate the number of tiles needed for floors or walls.\')' },
  { from: 'name: \'Gravel Calculator\'', to: 'name: t(\'calc.gravel.title\', \'Gravel Calculator\')' },
  { from: 'label: \'LANDSCAPING\'', to: 'label: t(\'cat.landscaping\', \'LANDSCAPING\')' },
  { from: 'desc: \'Calculate gravel for paths or driveways.\'', to: 'desc: t(\'calc.gravel.description\', \'Estimate gravel or aggregate for landscaping.\')' },
  { from: 'name: \'Paver Calculator\'', to: 'name: t(\'calc.paver\', \'Paver Calculator\')' },
  { from: 'name: \'Grout Calculator\'', to: 'name: t(\'calc.grout\', \'Grout Calculator\')' },
  { from: 'name: \'Drywall Calculator\'', to: 'name: t(\'calc.drywall\', \'Drywall Calculator\')' },
  { from: 'name: \'Backsplash Calculator\'', to: 'name: t(\'calc.backsplash\', \'Backsplash Calculator\')' },
  { from: 'name: \'Cabinet Area Calculator\'', to: 'name: t(\'calc.cabinet\', \'Cabinet Area Calculator\')' },
  { from: 'name: \'Soil Calculator\'', to: 'name: t(\'calc.soil\', \'Soil Calculator\')' },
  { from: 'name: \'Mulch Calculator\'', to: 'name: t(\'calc.mulch\', \'Mulch Calculator\')' },
  { from: 'name: \'Fence Calculator\'', to: 'name: t(\'calc.fence\', \'Fence Calculator\')' },
  { from: 'name: \'Asphalt Calculator\'', to: 'name: t(\'calc.asphalt\', \'Asphalt Calculator\')' },
  { from: 'name: \'Hardwood Flooring Calculator\'', to: 'name: t(\'calc.hardwood\', \'Hardwood Flooring Calculator\')' },
  { from: 'name: \'Carpet Calculator\'', to: 'name: t(\'calc.carpet\', \'Carpet Calculator\')' },
  { from: 'desc: \'COMING SOON\'', to: 'desc: t(\'common.comingSoon\', \'COMING SOON\')' },
  { from: 'Calculate <ArrowRight', to: '{t(\'btn.calculate\', \'Calculate\')} <ArrowRight' },
]);

// 6. RelatedCalculators.tsx
replaceInFile(path.join(compDir, 'RelatedCalculators.tsx'), [
  { from: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\' }}>You may also need</h2>', to: '<h2 style={{ fontSize: \'1.75rem\', marginBottom: \'1.5rem\' }}>{t(\'calc.youMayAlsoNeed\', \'You may also need\')}</h2>' },
]);

console.log('All remaining hardcoded strings processed.');
