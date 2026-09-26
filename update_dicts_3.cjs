const fs = require('fs');
const newKeys = {
  // Home
  'hero.eyebrow': 'HOME PROJECT TOOLS',
  'search.button': 'Search',
  'home.popular.eyebrow': 'Quick Answers',
  'home.popular.title': 'Popular calculators',
  'cat.foundation': 'FOUNDATION',
  'cat.interior': 'INTERIOR',
  'cat.measure': 'MEASURE',
  'cat.flooring': 'FLOORING',
  'cat.landscaping': 'LANDSCAPING',
  'btn.calculate': 'Calculate',
  'home.categories.eyebrow': 'All Tools',
  'home.categories.title': 'Explore by category',
  'home.categories.concrete.desc': 'Volume, slabs, footings',
  'home.categories.paint.desc': 'Interior, exterior, ceilings',
  'home.categories.tile.desc': 'Tiles, hardwood, carpet',
  'home.categories.gravel.desc': 'Gravel, mulch, soil',
  'home.categories.exterior.title': 'Exterior',
  'home.categories.exterior.desc': 'Roofing, siding, fencing',
  'home.categories.area.desc': 'Area, volume, conversions',
  'home.categories.view': 'View tools',
  'materials.eyebrow': 'Materials',
  'materials.heading': "Calculate what you'll need.",
  'materials.subheading': 'Estimate quantities for the materials used in common home projects.',
  'home.howItWorks.eyebrow': 'Simple Process',
  'home.howItWorks.title': 'How it works',
  'home.howItWorks.step1': 'Choose a calculator',
  'home.howItWorks.step2': 'Enter measurements',
  'home.howItWorks.step3': 'Get your estimate',
  'home.projects.eyebrow': 'Project Navigation',
  'home.projects.title': 'Planning a bigger project?',
  'home.projects.subtitle': "Select your project to see the tools you'll need.",
  'home.projects.view': 'View tools',
  'home.cta.title': 'Start planning your project.',
  'home.cta.desc': 'Find the calculator you need and get your estimate in seconds.',
  
  // Calculators Directory
  'directory.title': 'All Calculators',
  'directory.subtitle': 'Find the right tool for your next home improvement project.',
  'directory.popular': 'Popular Tools',
  'directory.all': 'All Tools',

  // Shared
  'calc.step1': 'Project Dimensions',
  'calc.step2': 'Options & Pricing',
  'calc.step3': 'Options & Pricing',
  'calc.estimateReady': 'Estimate ready',
  
  // Gravel
  'calc.gravel.howItWorks': 'How to calculate gravel',
  'calc.gravel.formula': 'The Formula',
  'calc.gravel.example': 'Example Calculation',
  'calc.gravel.tips': 'Density & Weight',
  'calc.gravel.disclaimer': 'Always verify with your local supplier as moisture and exact rock composition can change the final weight significantly.',
  'calc.gravel.howItWorksDesc': 'Estimating gravel, crushed stone, or soil usually involves finding the volume in cubic yards or cubic meters, and then converting that volume into weight (tons) since most bulk materials are sold by weight.',
  'calc.gravel.exampleDesc': 'Filling a 10m × 2m path at 0.05m (5cm) depth:',
  'calc.gravel.ex1': 'Volume: 10 × 2 × 0.05 = 1.0 m³',
  'calc.gravel.ex2': 'Weight: 1.0 m³ × 1.6 = 1.6 metric tons',
  'calc.gravel.tipsDesc': 'Different materials have different densities. Standard gravel is usually around 1.6 metric tons per cubic meter. Soil is lighter (around 1.2 t/m³), while sand is heavier. Check with your supplier for the exact conversion factor.',
  'calc.gravel.density': 'Density (tons per unit³)',
  'copy.gravel.base': 'Volume: {val}',
  
  // Paint
  'calc.paint.howItWorks': 'How to calculate paint',
  'calc.paint.formula': 'The Formula',
  'calc.paint.example': 'Example Calculation',
  'calc.paint.tips': 'Why subtract doors and windows?',
  'calc.paint.howItWorksDesc': 'To estimate paint, you calculate the total surface area of the walls, subtract the areas that won\'t be painted (doors and windows), and divide by the paint\'s coverage rate.',
  'calc.paint.exampleDesc': 'Painting a room with 40 m² of walls, 1 door (2 m²), and 1 window (1.5 m²):',
  'calc.paint.ex1': 'Total wall area: 40 m²',
  'calc.paint.ex2': 'Subtract openings: 40 - 2 - 1.5 = 36.5 m²',
  'calc.paint.ex3': 'Paint required (1 coat): 36.5 ÷ 10 m²/L = 3.65 Liters',
  'calc.paint.ex4': 'For 2 coats: 3.65 × 2 = 7.3 Liters',
  'calc.paint.tipsDesc': 'Doors and windows take up significant wall space. A standard interior door is about 2 m² (21 sq ft) and a standard window is about 1.5 m² (15 sq ft). Subtracting them prevents you from over-buying paint.',
  'calc.paint.disclaimer': 'Textured walls, bare drywall, and dramatic color changes (e.g., painting white over dark blue) will require more paint or a primer coat.',
  'calc.paint.gallons': 'gallons',
  'calc.paint.liters': 'liters',
  'copy.paint.base': 'Surface area: {val}',
  
  // Square Footage
  'calc.area.howItWorks': 'How to calculate square footage',
  'calc.area.formula': 'The Formula',
  'calc.area.example': 'Example Calculation',
  'calc.area.tips': 'Complex shapes',
  'calc.area.howItWorksDesc': 'Square footage (or square meters) is the most basic and common measurement in home improvement. It measures the 2D area of a surface, like a floor, wall, or garden bed.',
  'calc.area.exampleDesc': 'Measuring a rectangular room that is 4 meters long and 3 meters wide:',
  'calc.area.ex1': 'Area: 4m × 3m = 12 m²',
  'calc.area.tipsDesc': 'If your room isn\'t a perfect rectangle (like an L-shaped room), break it down into smaller rectangular sections. Measure the area of each section separately, then add them together for the total area.',
  'calc.area.disclaimer': 'Always measure twice! For expensive materials like hardwood flooring or custom tiles, add a 5-10% waste factor to your final area calculation.',
  'copy.area.base': 'Total Area: {val}'
};

const langs = ['en','fr','es','pt','it','ar'];
langs.forEach(lang => {
  const path = 'src/i18n/'+lang+'.ts';
  let content = fs.readFileSync(path, 'utf8');
  let dictEndIndex = content.lastIndexOf('}');
  let existingContent = content.substring(0, dictEndIndex);
  for (let key in newKeys) {
    if (!existingContent.includes("'" + key + "'") && !existingContent.includes('"' + key + '"')) {
      let val = newKeys[key].replace(/"/g, '\\"');
      existingContent += ',\n  "' + key + '": "' + val + '"';
    }
  }
  existingContent += '\n};\n';
  fs.writeFileSync(path, existingContent);
});
console.log('Dictionaries updated!');
