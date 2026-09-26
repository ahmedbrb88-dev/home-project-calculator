const fs = require('fs');
const newKeys = {
  'projects.patio.title': 'Building a Patio',
  'projects.patio.desc': 'Planning a new outdoor patio? Start by measuring the area, then estimate the base materials and concrete you may need.',
  'projects.bathroom.title': 'Renovating a Bathroom',
  'projects.bathroom.desc': 'Calculate the essential materials needed for a bathroom remodel.',
  'projects.kitchen.title': 'Updating a Kitchen',
  'projects.kitchen.desc': 'Plan the flooring and paint required for your kitchen project.',
  'projects.garden.title': 'Improving your Garden',
  'projects.garden.desc': 'Calculate landscaping materials for your outdoor space.',
  'projects.driveway.title': 'Building a Driveway',
  'projects.driveway.desc': 'Estimate the bulk materials required for a new driveway.',
  'projects.bedroom.title': 'Refreshing a Bedroom',
  'projects.bedroom.desc': 'Quickly plan a bedroom makeover with our interior tools.',
  'projects.step.measureArea': 'Measure your area',
  'projects.step.estimateGravel': 'Estimate base gravel',
  'projects.step.calcConcrete': 'Calculate concrete (if pouring a slab)',
  'projects.step.measureFloor': 'Measure floor space',
  'projects.step.calcWallFloorTiles': 'Calculate wall and floor tiles',
  'projects.step.estimateCeilingPaint': 'Estimate ceiling and trim paint',
  'projects.step.calcFloorTiles': 'Calculate floor tiles',
  'projects.step.estimateWallPaint': 'Estimate wall paint',
  'projects.step.measureBeds': 'Measure garden beds',
  'projects.step.calcDecoGravel': 'Calculate decorative gravel/stones',
  'projects.step.calcConcreteSimple': 'Calculate concrete',
  'projects.step.measureRoom': 'Measure the room',
  'calc.paver': 'Paver Calculator',
  'calc.grout': 'Grout Calculator',
  'calc.drywall': 'Drywall Calculator',
  'calc.backsplash': 'Backsplash Calculator',
  'calc.cabinet': 'Cabinet Area Calculator',
  'calc.soil': 'Soil Calculator',
  'calc.mulch': 'Mulch Calculator',
  'calc.fence': 'Fence Calculator',
  'calc.asphalt': 'Asphalt Calculator',
  'calc.hardwood': 'Hardwood Flooring Calculator',
  'calc.carpet': 'Carpet Calculator',
  'common.comingSoon': 'COMING SOON',
  'common.recommendedTools': 'Recommended Tools',
  'common.projectNotFound': 'Project not found.'
};
const langs = ['en','fr','es','pt','it','ar'];
langs.forEach(lang => {
  const path = 'src/i18n/'+lang+'.ts';
  let content = fs.readFileSync(path, 'utf8');
  let dictEndIndex = content.lastIndexOf('}');
  let existingContent = content.substring(0, dictEndIndex);
  for (let key in newKeys) {
    if (!existingContent.includes("'" + key + "'") && !existingContent.includes('"' + key + '"')) {
      existingContent += ',\n  "' + key + '": "' + newKeys[key] + '"';
    }
  }
  existingContent += '\n};\n';
  fs.writeFileSync(path, existingContent);
});
console.log('Dictionaries updated!');
