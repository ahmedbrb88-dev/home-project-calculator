const fs = require('fs');
const path = require('path');

const appendContent = (filePath, contentBlock) => {
  const fullPath = path.join(__dirname, filePath);
  let fileContent = fs.readFileSync(fullPath, 'utf8');
  const splitStr = '<RelatedCalculators';
  const parts = fileContent.split(splitStr);
  if (parts.length > 1) {
    fileContent = parts[0] + contentBlock + '\n      <RelatedCalculators' + parts[1];
    fs.writeFileSync(fullPath, fileContent, 'utf8');
  } else {
    console.log("Could not find <RelatedCalculators in " + filePath);
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
`));

appendContent('src/pages/PaintCalculator.tsx', contentWrap(`
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>How to estimate interior paint</h2>
        <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem' }}>Knowing exactly how much paint to buy saves you money and prevents the frustration of running out mid-project. Paint is estimated by calculating the total surface area of the walls, subtracting large openings, and dividing by the paint's coverage rate.</p>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>The Formula</h3>
          <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
            ((Total Wall Length × Wall Height) - (Doors Area + Windows Area)) × Coats / Paint Coverage
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Example Calculation</h3>
          <p style={{ marginBottom: '1rem' }}>If you are painting a room with 16 meters of total wall length, a ceiling height of 2.5 meters, containing 1 door and 1 window. You are applying 2 coats of paint that covers 10 m² per liter:</p>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Gross Area:</strong> 16m × 2.5m = 40 m²</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Minus Openings:</strong> ~35.5 m² (Paintable Area)</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Two Coats:</strong> 35.5 m² × 2 = 71 m² total coverage required</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Total Paint:</strong> 71 m² ÷ 10 m²/L = <strong>7.1 Liters</strong></li>
          </ul>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Important Considerations</h3>
          <p style={{ marginBottom: '1.5rem' }}><strong>Coverage Rates:</strong> Paint coverage is highly dependent on the quality of the paint and the surface being painted. Premium paints often cover better than budget options. Additionally, painting over dark colors, fresh drywall, or textured surfaces (like stucco) will significantly increase the amount of paint required.</p>
          <p style={{ marginBottom: '1.5rem' }}><strong>Touch-ups:</strong> It's always advisable to have a little extra paint (half a liter or a quart) left over for future touch-ups.</p>
        </div>
`));

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
`));

appendContent('src/pages/GravelCalculator.tsx', contentWrap(`
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>How to calculate gravel & aggregates</h2>
        <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem' }}>Gravel, crushed stone, soil, and mulch are typically estimated by calculating the volume of the space and then converting that volume into weight (tons or kilograms) based on the material's density, as suppliers often sell bulk materials by weight.</p>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>The Formula</h3>
          <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
            (Length × Width × Depth) × Material Density = Total Weight
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Example Calculation</h3>
          <p style={{ marginBottom: '1rem' }}>Creating a gravel driveway 10m long, 5m wide, at a depth of 0.05m (5cm), using standard gravel (approx 1,600 kg per m³):</p>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Volume:</strong> 10m × 5m × 0.05m = 2.5 m³</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Weight:</strong> 2.5 m³ × 1600 kg/m³ = <strong>4,000 kg (4 metric tons)</strong></li>
          </ul>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Understanding Material Density</h3>
          <p style={{ marginBottom: '1.5rem' }}>It's important to remember that not all materials weigh the same. A cubic meter of loose topsoil might weigh around 1,200 kg, while a cubic meter of compacted crushed stone could weigh over 1,700 kg. Additionally, wet materials weigh significantly more than dry materials. Always confirm the actual density or conversion rate with your local supplier before ordering bulk loads.</p>
        </div>
`));

appendContent('src/pages/SquareFootageCalculator.tsx', contentWrap(`
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>How to calculate area (Square Footage / Square Meters)</h2>
        <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
          <p style={{ marginBottom: '1.5rem' }}>Calculating the area of a surface is the foundational first step for almost every home improvement project. Whether you are buying flooring, painting a wall, laying sod, or pouring a concrete slab, you need to know the total area of the space.</p>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>The Formula</h3>
          <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
            Length × Width = Area
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Example Calculations</h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Metric System</p>
              <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
                <li style={{ marginBottom: '0.5rem' }}>Room length: 4 meters</li>
                <li style={{ marginBottom: '0.5rem' }}>Room width: 3 meters</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Area:</strong> 4 × 3 = <strong>12 m²</strong></li>
              </ul>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Imperial System</p>
              <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
                <li style={{ marginBottom: '0.5rem' }}>Room length: 12 feet</li>
                <li style={{ marginBottom: '0.5rem' }}>Room width: 10 feet</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Area:</strong> 12 × 10 = <strong>120 sq ft</strong></li>
              </ul>
            </div>
          </div>
          
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>Complex Rooms</h3>
          <p style={{ marginBottom: '1.5rem' }}>If your room is an L-shape or not a perfect rectangle, the easiest way to find the total area is to break the room down into smaller rectangles, calculate the area of each one separately, and then add the totals together.</p>
        </div>
`));
