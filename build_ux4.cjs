const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

write('src/pages/GravelCalculator.tsx', `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { calculateGravel } from '../calculations/gravel';
import { Input } from '../components/ui/Input';
import { Pickaxe, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';

export const GravelCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [length, setLength] = useState<number | ''>(10);
  const [width, setWidth] = useState<number | ''>(5);
  const [depth, setDepth] = useState<number | ''>(0.05);
  const [density, setDensity] = useState<number | ''>(1600);
  const [price, setPrice] = useState<number | ''>('');

  const num = (v: any) => Number(v) || 0;
  const { volume, weight } = calculateGravel(num(length), num(width), num(depth), num(density));
  const cost = weight * num(price);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitV = unitSystem === 'metric' ? 'm³' : 'cu ft';
  const unitW = unitSystem === 'metric' ? 'kg' : 'lb';

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      <Breadcrumbs items={[{ label: 'Calculators', path: '/calculators' }, { label: 'Gravel' }]} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
            <Pickaxe size={36} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>LANDSCAPING</span>
            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2.5rem' }}>Gravel Calculator</h1>
            <p style={{ margin: 0, fontSize: '1.125rem' }}>Calculate the amount of gravel needed for your path or driveway.</p>
          </div>
        </div>
        <Link to="/calculators" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} /> All calculators
        </Link>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>PROJECT DIMENSIONS</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label="Length *" unit={unitL} value={length} onChange={setLength} />
              <Input label="Width *" unit={unitL} value={width} onChange={setWidth} />
            </div>
            <Input label="Depth / Thickness *" unit={unitL} value={depth} onChange={setDepth} />
          </div>
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>MATERIAL OPTIONS</h3>
            <div style={{ position: 'relative' }}>
              <Input label={\`Density per \${unitV}\`} unit={unitW} value={density} onChange={setDensity} />
              <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Default applied</span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>COST ESTIMATION</h3>
            <div style={{ position: 'relative' }}>
              <Input label={\`Price per \${unitW}\`} unit={currency} value={price} onChange={setPrice} />
              <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Optional</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>YOUR ESTIMATE</div>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
                {weight.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitW}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', fontWeight: 700 }}>WHAT NEXT?</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>Total volume</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{volume.toFixed(2)} {unitV}</span>
              </div>
              
              {num(price) > 0 && (
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
              <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => { setLength(''); setWidth(''); setDepth(''); setDensity(1600); setPrice(''); }}>
                Start over
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <RelatedCalculators related={['area', 'concrete']} />
    </div>
  );
};
`);
