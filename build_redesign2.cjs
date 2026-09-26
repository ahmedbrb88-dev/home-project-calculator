const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

write('src/pages/PaintCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculatePaint } from '../calculations/paint';
import { Input } from '../components/ui/Input';
import { Paintbrush, Copy } from 'lucide-react';

export const PaintCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [length, setLength] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [walls, setWalls] = useState(4);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(1);
  const [coats, setCoats] = useState(2);
  const [waste, setWaste] = useState(10);
  const [pricePerLiter, setPricePerLiter] = useState(15);

  const { area, paintRequired } = calculatePaint(length, height, walls, doors, windows, coats, waste);
  const cost = paintRequired * pricePerLiter;

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
          <Paintbrush size={32} />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2rem' }}>Paint Calculator</h1>
          <p style={{ margin: 0 }}>Estimate paint for interior walls and rooms.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            Wall Dimensions
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Wall Length" unit={unitL} value={length} onChange={setLength} />
            <Input label="Wall Height" unit={unitL} value={height} onChange={setHeight} />
            <Input label="Number of Walls" value={walls} onChange={setWalls} />
          </div>

          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
            Openings & Details
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Doors" value={doors} onChange={setDoors} />
            <Input label="Windows" value={windows} onChange={setWindows} />
            <Input label="Coats of Paint" value={coats} onChange={setCoats} />
            <Input label="Waste / Extra" unit="%" value={waste} onChange={setWaste} />
          </div>

          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>3</span>
            Pricing
          </h3>
          <Input label="Price per Liter" unit={currency} value={pricePerLiter} onChange={setPricePerLiter} />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)', display: 'block', marginBottom: '1rem' }}>Your Estimate</span>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                {paintRequired.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>Liters</span>
              </div>
              <div style={{ color: '#cbd5e1' }}>Total area to paint: {area.toFixed(2)} {unitSystem === 'metric' ? 'm²' : 'sq ft'}</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Estimated Cost</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {currency} {cost.toFixed(2)}
              </div>
            </div>

            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <Copy size={18} /> Copy result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

write('src/pages/GravelCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateGravel } from '../calculations/gravel';
import { Input } from '../components/ui/Input';
import { Pickaxe, Copy } from 'lucide-react';

export const GravelCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(5);
  const [depth, setDepth] = useState(0.05);
  const [waste, setWaste] = useState(5);
  const [price, setPrice] = useState(45);

  const { volume, weight } = calculateGravel(length, width, depth, waste);
  const cost = weight * price;

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
          <Pickaxe size={32} />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2rem' }}>Gravel Calculator</h1>
          <p style={{ margin: 0 }}>Calculate gravel for driveways, paths, and landscaping.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            Area Dimensions
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Length" unit={unitL} value={length} onChange={setLength} />
            <Input label="Width" unit={unitL} value={width} onChange={setWidth} />
            <Input label="Depth / Thickness" unit={unitL} value={depth} onChange={setDepth} />
            <Input label="Waste / Extra" unit="%" value={waste} onChange={setWaste} />
          </div>

          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
            Pricing
          </h3>
          <Input label="Price per Ton" unit={currency} value={price} onChange={setPrice} />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)', display: 'block', marginBottom: '1rem' }}>Your Estimate</span>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                {weight.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>tons</span>
              </div>
              <div style={{ color: '#cbd5e1' }}>Total volume: {volume.toFixed(2)} {unitSystem === 'metric' ? 'm³' : 'cu ft'}</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Estimated Cost</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {currency} {cost.toFixed(2)}
              </div>
            </div>

            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <Copy size={18} /> Copy result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

write('src/pages/SquareFootageCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateArea } from '../calculations/area';
import { Input } from '../components/ui/Input';
import { Ruler, Copy } from 'lucide-react';

export const SquareFootageCalculator = () => {
  const { unitSystem } = useSettings();
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);

  const area = calculateArea(length, width);
  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitA = unitSystem === 'metric' ? 'm²' : 'sq ft';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
          <Ruler size={32} />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2rem' }}>Square Footage Calculator</h1>
          <p style={{ margin: 0 }}>Basic area measurement conversion.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            Dimensions
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Length" unit={unitL} value={length} onChange={setLength} />
            <Input label="Width" unit={unitL} value={width} onChange={setWidth} />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)', display: 'block', marginBottom: '1rem' }}>Total Area</span>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                {area.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitA}</span>
              </div>
            </div>

            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', marginTop: '2rem' }}>
              <Copy size={18} /> Copy result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);
