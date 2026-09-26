const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

write('src/pages/PaintCalculator.tsx', `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { calculatePaint } from '../calculations/paint';
import { Input } from '../components/ui/Input';
import { PaintDiagram } from '../components/ui/Diagrams';
import { Paintbrush, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';

export const PaintCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [wallL, setWallL] = useState<number | ''>(5);
  const [wallH, setWallH] = useState<number | ''>(2.5);
  const [doors, setDoors] = useState<number | ''>(1);
  const [windows, setWindows] = useState<number | ''>(1);
  const [coverage, setCoverage] = useState<number | ''>(10);
  const [coats, setCoats] = useState<number | ''>(2);
  const [pricePerL, setPricePerL] = useState<number | ''>('');

  const num = (v: any) => Number(v) || 0;
  const { totalLiters, paintableArea } = calculatePaint(num(wallL), num(wallH), num(doors), num(windows), num(coverage), num(coats));
  const cost = totalLiters * num(pricePerL);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitA = unitSystem === 'metric' ? 'm²' : 'sq ft';
  const unitV = unitSystem === 'metric' ? 'L' : 'gal';

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      <Breadcrumbs items={[{ label: 'Calculators', path: '/calculators' }, { label: 'Paint' }]} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
            <Paintbrush size={36} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>PAINTING</span>
            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2.5rem' }}>Paint Calculator</h1>
            <p style={{ margin: 0, fontSize: '1.125rem' }}>Estimate the amount of paint required for your walls.</p>
          </div>
        </div>
        <Link to="/calculators" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} /> All calculators
        </Link>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <PaintDiagram />
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>WALL DIMENSIONS</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label="Total Wall Length *" unit={unitL} value={wallL} onChange={setWallL} />
              <Input label="Wall Height *" unit={unitL} value={wallH} onChange={setWallH} />
              <div style={{ position: 'relative' }}>
                <Input label="Doors" unit="qty" value={doors} onChange={setDoors} />
                <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Optional</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Input label="Windows" unit="qty" value={windows} onChange={setWindows} />
                <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Optional</span>
              </div>
            </div>
          </div>
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>PAINT OPTIONS</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label={\`Coverage per \${unitV} *\`} unit={unitA} value={coverage} onChange={setCoverage} />
              <Input label="Number of Coats *" unit="qty" value={coats} onChange={setCoats} />
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>COST ESTIMATION</h3>
            <div style={{ position: 'relative' }}>
              <Input label={\`Price per \${unitV}\`} unit={currency} value={pricePerL} onChange={setPricePerL} />
              <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Optional</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>YOUR ESTIMATE</div>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
                {totalLiters.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitV}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', fontWeight: 700 }}>WHAT NEXT?</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>Paintable area (doors/windows excluded)</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{paintableArea.toFixed(2)} {unitA}</span>
              </div>
              
              {num(pricePerL) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#94a3b8' }}>Estimated material cost</span>
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>{currency} {cost.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ flex: 1, background: 'var(--color-primary)', color: 'white' }}>
                <Copy size={18} /> Copy result
              </button>
              <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => { setWallL(''); setWallH(''); setDoors(1); setWindows(1); setCoverage(10); setCoats(2); setPricePerL(''); }}>
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <RelatedCalculators related={['area', 'tile']} />
    </div>
  );
};
`);

write('src/pages/SquareFootageCalculator.tsx', `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { Input } from '../components/ui/Input';
import { SquareFootageDiagram } from '../components/ui/Diagrams';
import { Ruler, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';

export const SquareFootageCalculator = () => {
  const { unitSystem } = useSettings();
  const [length, setLength] = useState<number | ''>(5);
  const [width, setWidth] = useState<number | ''>(4);

  const num = (v: any) => Number(v) || 0;
  const area = num(length) * num(width);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitA = unitSystem === 'metric' ? 'm²' : 'sq ft';

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      <Breadcrumbs items={[{ label: 'Calculators', path: '/calculators' }, { label: 'Area' }]} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
            <Ruler size={36} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>MEASUREMENTS</span>
            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2.5rem' }}>Square Footage</h1>
            <p style={{ margin: 0, fontSize: '1.125rem' }}>Calculate the area of a simple rectangular space.</p>
          </div>
        </div>
        <Link to="/calculators" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} /> All calculators
        </Link>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <SquareFootageDiagram />
          
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>SPACE DIMENSIONS</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label="Length *" unit={unitL} value={length} onChange={setLength} />
              <Input label="Width *" unit={unitL} value={width} onChange={setWidth} />
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>YOUR AREA</div>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
                {area.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitA}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ flex: 1, background: 'var(--color-primary)', color: 'white' }}>
                <Copy size={18} /> Copy result
              </button>
              <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => { setLength(''); setWidth(''); }}>
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <RelatedCalculators related={['concrete', 'paint', 'tile', 'gravel']} />
    </div>
  );
};
`);
