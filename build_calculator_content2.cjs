const fs = require('fs');
const path = require('path');

const appendContent = (filePath, contentBlock, relatedTags) => {
  const fullPath = path.join(__dirname, filePath);
  let fileContent = fs.readFileSync(fullPath, 'utf8');
  
  if (!fileContent.includes('import { RelatedCalculators }')) {
    fileContent = fileContent.replace(
      "import { Breadcrumbs } from '../components/Breadcrumbs';",
      "import { Breadcrumbs } from '../components/Breadcrumbs';\nimport { RelatedCalculators } from '../components/RelatedCalculators';"
    );
  }

  const splitStr = '</div>\n    </div>\n  );\n};';
  const parts = fileContent.split(splitStr);
  if (parts.length > 1) {
    fileContent = parts[0] + contentBlock + '\n      <RelatedCalculators related={[' + relatedTags + ']} />\n    </div>\n  );\n};';
    fs.writeFileSync(fullPath, fileContent, 'utf8');
  } else {
    console.log("Could not find the end of the file in " + filePath);
  }
};

const contentWrap = (content) => `
      <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)', maxWidth: '800px' }}>
        ${content}
      </div>
`;

appendContent('src/pages/ConcreteCalculator.tsx', contentWrap(`
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>How to calculate concrete</h2>
        <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem' }}>Estimating concrete for a slab, patio, or footing is essential before ordering from a ready-mix supplier or buying bags at a hardware store. Concrete is typically measured in cubic volume (Cubic Meters or Cubic Yards).</p>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>The Formula</h3>
          <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
            Length × Width × Depth = Total Volume
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Example Calculation</h3>
          <p style={{ marginBottom: '1rem' }}>If you are pouring a patio slab that is 5 meters long, 4 meters wide, and 0.10 meters (10cm) thick:</p>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Base volume:</strong> 5m × 4m × 0.10m = <strong>2.0 m³</strong></li>
          </ul>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Why do I need a waste factor?</h3>
          <p style={{ marginBottom: '1.5rem' }}>Site conditions are rarely perfect. The ground may be uneven, forms may bow slightly during the pour, or there may be spillage. For this reason, it is an industry standard to order approximately <strong>10% extra</strong> material to ensure you don't run short in the middle of a pour. Running out of concrete can result in a cold joint and ruin a project.</p>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Base volume:</strong> 2.0 m³</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Waste (10%):</strong> + 0.2 m³</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Total to order:</strong> <strong>2.2 m³</strong></li>
          </ul>

          <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '3rem', border: '1px solid var(--color-border)' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Disclaimer</h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Concrete orders should always be verified by the supplier or a qualified contractor. For load-bearing structures or foundations, always consult local building codes and structural engineers to determine the required thickness, reinforcement, and PSI rating.</p>
          </div>
        </div>
`), "'area', 'gravel', 'tile'");

appendContent('src/pages/TileCalculator.tsx', contentWrap(`
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>How to calculate tile requirements</h2>
        <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem' }}>Whether you are tiling a bathroom floor or a kitchen backsplash, accurate measurement is crucial. Tiles are typically sold by the box, so estimating the total required tiles allows you to purchase the correct number of boxes from the same manufacturing batch (to ensure consistent coloring).</p>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>The Formula</h3>
          <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
            (Room Area ÷ Single Tile Area) + Waste Factor = Total Tiles Required
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Example Calculation</h3>
          <p style={{ marginBottom: '1rem' }}>Tiling a 4m × 3m room using 0.3m × 0.3m (30cm) ceramic tiles:</p>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Room Area:</strong> 4m × 3m = 12 m²</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Tile Area:</strong> 0.3m × 0.3m = 0.09 m²</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Base Tiles Needed:</strong> 12 ÷ 0.09 = 133.3 tiles</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>With 10% Waste:</strong> 133.3 × 1.10 = <strong>147 tiles</strong></li>
          </ul>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Why add a waste factor?</h3>
          <p style={{ marginBottom: '1.5rem' }}>When installing tiles, you will inevitably need to cut tiles to fit the edges of the room, around pipes, or into corners. These cut pieces are often unusable elsewhere. Furthermore, tiles can crack or break during installation. A standard recommendation is <strong>10% extra</strong> for simple rectangular rooms, but complex layouts (like diagonal/herringbone patterns) or rooms with many obstacles may require <strong>15% to 20% waste</strong>.</p>
        </div>
`), "'area', 'paint'");
