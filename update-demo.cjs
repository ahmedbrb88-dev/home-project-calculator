const fs = require('fs');
let content = fs.readFileSync('src/pricing/data/demo-prices.ts', 'utf8');

content = content.replace(/materialId: 'gravel_standard'/g, `materialFamily: 'gravel',\n    productForm: 'bulk',\n    commercialUnit: 'tonne',\n    materialId: 'gravel_standard'`);
content = content.replace(/materialId: 'concrete_ready_mix'/g, `materialFamily: 'concrete',\n    productForm: 'ready_mix',\n    commercialUnit: 'm3',\n    materialId: 'concrete_ready_mix'`);
content = content.replace(/materialId: 'tile_ceramic'/g, `materialFamily: 'tile',\n    materialType: 'ceramic',\n    commercialUnit: 'm2',\n    materialId: 'tile_ceramic'`);
content = content.replace(/materialId: 'paint_standard'/g, `materialFamily: 'paint',\n    commercialUnit: 'litre',\n    materialId: 'paint_standard'`);

fs.writeFileSync('src/pricing/data/demo-prices.ts', content);
