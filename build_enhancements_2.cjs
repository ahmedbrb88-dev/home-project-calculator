const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// CALCULATOR UPDATES WITH DIAGRAMS & STEPS
// ==========================================
write('src/pages/ConcreteCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateConcrete } from '../calculations/concrete';
import { Input } from '../components/ui/Input';
import { ConcreteDiagram } from '../components/ui/Diagrams';
import { Box, Copy, CheckCircle2 } from 'lucide-react';

export const ConcreteCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [length, setLength] = useState<number | ''>(5);
  const [width, setWidth] = useState<number | ''>(4);
  const [depth, setDepth] = useState<number | ''>(0.15);
  const [waste, setWaste] = useState<number | ''>(10);
  const [price, setPrice] = useState<number | ''>(120);

  const num = (v: any) => Number(v) || 0;
  const { baseVolume, withWaste } = calculateConcrete(num(length), num(width), num(depth), num(waste));
  const cost = withWaste * num(price);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitV = unitSystem === 'metric' ? 'm³' : 'cu ft';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
          <Box size={36} />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2.5rem' }}>Concrete Calculator</h1>
          <p style={{ margin: 0, fontSize: '1.125rem' }}>Calculate volume for slabs, patios, and footings.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <ConcreteDiagram />
          
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-navy)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'var(--color-surface-alt)', borderRadius: '99px' }}>STEP 1</span>
            Project Dimensions
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Length" unit={unitL} value={length} onChange={setLength} />
            <Input label="Width" unit={unitL} value={width} onChange={setWidth} />
          </div>
          <Input label="Depth / Thickness" unit={unitL} value={depth} onChange={setDepth} />
          
          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-navy)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'var(--color-surface-alt)', borderRadius: '99px' }}>STEP 2</span>
            Options & Pricing
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Waste / Extra" unit="%" value={waste} onChange={setWaste} />
            <Input label={\`Price per \${unitV}\`} unit={currency} value={price} onChange={setPrice} />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', color: 'var(--color-primary-light)' }}>STEP 3</span>
              {withWaste > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-primary)' }}><CheckCircle2 size={16} /> Estimate ready</span>}
            </div>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 600 }}>Your Estimate</div>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem', transition: 'var(--transition)' }}>
                {withWaste.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitV}</span>
              </div>
              <div style={{ color: '#cbd5e1' }}>Base volume: {baseVolume.toFixed(2)} {unitV} (+{waste}% waste)</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Estimated Material Cost</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', transition: 'var(--transition)' }}>
                {currency} {cost.toFixed(2)}
              </div>
            </div>

            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <Copy size={18} /> Copy result to clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// ==========================================
// ENHANCED HOME PAGE
// ==========================================
write('src/pages/Home.tsx', `
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Paintbrush, Grid2x2, Ruler, Box, Pickaxe, Search, Droplets, Home as HomeIcon, Trees, Car, BedDouble, Hammer, CheckCircle2 } from 'lucide-react';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.toLowerCase().includes('paint')) navigate('/paint-calculator');
    else if(searchQuery.toLowerCase().includes('concrete')) navigate('/concrete-calculator');
    else if(searchQuery.toLowerCase().includes('tile')) navigate('/tile-calculator');
    else if(searchQuery.toLowerCase().includes('gravel')) navigate('/gravel-calculator');
    else if(searchQuery.toLowerCase().includes('area') || searchQuery.toLowerCase().includes('square')) navigate('/square-footage-calculator');
  };

  return (
    <div>
      {/* ENHANCED HERO SECTION */}
      <section style={{ padding: '6rem 0 4rem 0', background: 'var(--color-surface-alt)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} /> PROFESSIONAL TOOLS</span>
            <h1 style={{ margin: '1.5rem 0', color: 'var(--color-navy)' }}>
              Plan your home project<br/>with confidence.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
              Free calculators to estimate materials, measurements and costs for your next home project.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>Explore calculators</button>
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* Architectural Floor Plan Illustration */}
               <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                 {/* Desk/Background Board */}
                 <rect x="20" y="20" width="360" height="260" rx="20" fill="white" stroke="var(--color-border)" strokeWidth="2" />
                 {/* Blueprint lines */}
                 <path d="M40 40 L360 40 M40 80 L360 80 M40 120 L360 120 M40 160 L360 160 M40 200 L360 200 M40 240 L360 240" stroke="#f1f5f9" strokeWidth="2" />
                 <path d="M80 20 L80 280 M120 20 L120 280 M160 20 L160 280 M200 20 L200 280 M240 20 L240 280 M280 20 L280 280 M320 20 L320 280" stroke="#f1f5f9" strokeWidth="2" />
                 
                 {/* Floor Plan outline */}
                 <path d="M100 80 L260 80 L260 160 L300 160 L300 220 L100 220 Z" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="4" strokeLinejoin="round" />
                 {/* Inner walls */}
                 <path d="M180 80 L180 160 M180 160 L260 160" stroke="var(--color-navy)" strokeWidth="4" />
                 
                 {/* Material Swatches overlay */}
                 <rect x="260" y="40" width="40" height="40" rx="8" fill="var(--color-primary)" />
                 <rect x="310" y="40" width="40" height="40" rx="8" fill="var(--color-primary-light)" />
                 
                 {/* Dimensions */}
                 <path d="M100 65 L260 65 M100 60 L100 70 M260 60 L260 70" stroke="var(--color-primary)" strokeWidth="2" />
                 <text x="180" y="55" fill="var(--color-primary)" fontSize="14" fontWeight="bold" textAnchor="middle">8.5m</text>

                 {/* Plants / Decorative */}
                 <circle cx="120" cy="200" r="12" fill="#10b981" opacity="0.2" />
                 <circle cx="120" cy="200" r="6" fill="#10b981" opacity="0.5" />
                 <circle cx="145" cy="200" r="10" fill="#10b981" opacity="0.2" />
               </svg>

               {/* Floating Icon Badges */}
               <div style={{ position: 'absolute', top: '10%', left: '-5%', padding: '1rem', background: 'var(--color-navy)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                  <Ruler size={32} color="white" />
               </div>
               <div style={{ position: 'absolute', bottom: '15%', right: '-5%', padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                  <Paintbrush size={32} color="var(--color-primary)" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH COMPONENT */}
      <section style={{ transform: 'translateY(-50%)', position: 'relative', zIndex: 20 }}>
        <div className="container">
          <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>What do you need to calculate?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Find the right calculator for your next project.</p>
            <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Search calculators (e.g. paint, concrete, tile)..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none', transition: 'var(--transition)' }}
                className="search-input"
              />
              <button type="submit" className="btn btn-primary" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}>Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* PLANNING STRIP */}
      <section style={{ padding: '0 0 4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {[
            { icon: <Ruler />, text: 'Measure space' },
            { icon: <Box />, text: 'Calculate materials' },
            { icon: <CheckCircle2 />, text: 'Plan budget' },
            { icon: <Hammer />, text: 'Build project' }
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-navy)', fontWeight: 600 }}>
              <div style={{ padding: '0.75rem', background: 'var(--color-surface-alt)', borderRadius: '50%', color: 'var(--color-primary)' }}>
                {step.icon}
              </div>
              {step.text}
              {i < 3 && <ArrowRight size={16} color="var(--color-text-muted)" style={{ marginLeft: '1rem' }} />}
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR CALCULATORS */}
      <section className="container" style={{ padding: '4rem 0 6rem 0' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ marginTop: '0.5rem' }}>Popular calculators</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Quick answers for your next home project.</p>
        </div>
        
        <div className="grid grid-cols-3">
          {[
            { to: '/concrete-calculator', name: 'Concrete Calculator', label: 'FOUNDATION', desc: 'Calculate how much concrete you need.', icon: <Box size={32} /> },
            { to: '/paint-calculator', name: 'Paint Calculator', label: 'INTERIOR', desc: 'Estimate the amount of paint required.', icon: <Paintbrush size={32} /> },
            { to: '/tile-calculator', name: 'Tile Calculator', label: 'FLOORING', desc: 'Estimate tiles and material requirements.', icon: <Grid2x2 size={32} /> }
          ].map((calc, i) => (
            <Link to={calc.to} key={i} className="calc-card card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                  {calc.icon}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)', background: 'var(--color-surface-alt)', padding: '0.25rem 0.75rem', borderRadius: '99px' }}>
                  {calc.label}
                </span>
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{calc.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flex: 1, fontSize: '0.95rem' }}>{calc.desc}</p>
              <div className="calc-card-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                Calculate <ArrowRight className="arrow-icon" size={16} style={{ transition: 'transform 0.2s' }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MATERIALS SECTION (Visual Bridge) */}
      <section style={{ background: 'var(--color-surface-alt)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow">Materials</span>
            <h2 style={{ marginTop: '0.5rem' }}>Calculate what you'll need.</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
            {['Concrete', 'Paint', 'Tile', 'Gravel', 'Flooring', 'Soil'].map((mat, i) => (
              <div key={i} style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--color-primary-light)', borderRadius: '8px' }}></div>
                <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--color-navy)' }}>{mat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="eyebrow">Simple Process</span>
            <h2 style={{ marginTop: '0.5rem' }}>How it works</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ position: 'relative' }}>
            <div className="timeline-line" style={{ position: 'absolute', top: '40px', left: '15%', right: '15%', height: '2px', background: 'var(--color-border)' }}></div>
            
            {[
              { step: '01', title: 'Choose your project', icon: <HomeIcon size={40} color="var(--color-primary)" strokeWidth={1.5} /> },
              { step: '02', title: 'Enter your dimensions', icon: <Ruler size={40} color="var(--color-primary)" strokeWidth={1.5} /> },
              { step: '03', title: 'Get your estimate', icon: <CheckCircle2 size={40} color="var(--color-primary)" strokeWidth={1.5} /> }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 1rem' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 2rem auto', background: 'var(--color-surface)', border: '2px solid var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{s.step}</div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT IDEAS */}
      <section style={{ background: 'var(--color-navy)', color: 'white', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)' }}>Future Projects</span>
            <h2 style={{ marginTop: '0.5rem', color: 'white' }}>Planning something bigger?</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>Combine different tools to plan your entire project.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {[
              { name: 'Bathroom', icon: <Droplets size={40} /> },
              { name: 'Kitchen', icon: <HomeIcon size={40} /> },
              { name: 'Patio', icon: <Box size={40} /> },
              { name: 'Garden', icon: <Trees size={40} /> },
              { name: 'Driveway', icon: <Car size={40} /> },
              { name: 'Bedroom', icon: <BedDouble size={40} /> }
            ].map((proj, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ color: 'white', marginBottom: '1.5rem', opacity: 0.8 }}>
                  {proj.icon}
                </div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'white' }}>{proj.name}</h3>
                <div style={{ background: 'rgba(224, 122, 95, 0.2)', color: 'var(--color-primary-light)', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Coming Soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>READY TO START YOUR PROJECT?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Find the calculator you need and get your estimate in seconds.
          </p>
          <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Explore calculators</button>
        </div>
      </section>

    </div>
  );
};
`);
