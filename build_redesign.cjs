const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// CSS DESIGN SYSTEM
// ==========================================
write('src/index.css', `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  /* Warm Premium Palette */
  --color-bg: #fdfcfaf0;
  --color-surface: #ffffff;
  --color-surface-hover: #f7f5f0;
  --color-surface-alt: #f4f1eb;
  
  --color-text: #1a1a1a;
  --color-text-secondary: #4a4a4a;
  --color-text-muted: #737373;
  
  --color-primary: #e07a5f;      /* Terracotta */
  --color-primary-hover: #d16b50;
  --color-primary-light: #fbeae5;
  
  --color-navy: #2b2d42;         /* Deep Navy */
  --color-navy-hover: #1d1e2c;
  
  --color-border: #e5e5e5;
  --color-border-hover: #d1d1d1;
  
  /* Utilities */
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.02);
  --shadow-md: 0 8px 16px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02);
  --shadow-lg: 0 20px 24px -4px rgba(0,0,0,0.06), 0 8px 10px -4px rgba(0,0,0,0.04);
  
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

[dir="rtl"] { text-align: right; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; transition: var(--transition); }
input, select { font-family: inherit; }

/* Layout */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Typography */
h1, h2, h3, h4, h5 { font-weight: 700; line-height: 1.2; color: var(--color-text); }
h1 { font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: -0.02em; }
h2 { font-size: clamp(2rem, 4vw, 2.5rem); letter-spacing: -0.01em; }
h3 { font-size: 1.5rem; }
.eyebrow { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); }

/* Components */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 1rem;
}
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-primary-hover); transform: translateY(-1px); }
.btn-navy { background: var(--color-navy); color: white; }
.btn-navy:hover { background: var(--color-navy-hover); transform: translateY(-1px); }
.btn-outline { background: transparent; border: 1px solid var(--color-border); color: var(--color-text); }
.btn-outline:hover { border-color: var(--color-navy); }

/* Forms */
.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}
.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
}
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-field {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--color-text);
  transition: var(--transition);
  outline: none;
}
.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-light);
}
.input-suffix {
  position: absolute;
  right: 1rem;
  color: var(--color-text-muted);
  font-weight: 500;
  pointer-events: none;
}
[dir="rtl"] .input-suffix { right: auto; left: 1rem; }

/* Custom Select (Native styled) */
.select-field {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}
[dir="rtl"] .select-field {
  background-position: left 1rem center;
  padding-right: 1rem;
  padding-left: 2.5rem;
}

/* Cards */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

/* Grid */
.grid { display: grid; gap: 2rem; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 1024px) { .grid-cols-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .grid-cols-2, .grid-cols-3 { grid-template-columns: 1fr; } }
`);

// ==========================================
// COMPONENTS
// ==========================================
write('src/components/Header.tsx', `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { Hammer, Globe, DollarSign, Ruler, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { language, setLanguage, unitSystem, setUnitSystem, currency, setCurrency } = useSettings();
  const [showPrefs, setShowPrefs] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(253,252,250,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--color-navy)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1, color: 'var(--color-navy)' }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Calculators</Link>
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Projects</Link>
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>How it works</Link>
        </nav>

        {/* Preferences */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowPrefs(!showPrefs)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Globe size={18} />
            <span style={{ display: 'none' }} className="desktop-prefs-text">{language.toUpperCase()} • {currency}</span>
            <ChevronDown size={16} />
          </button>
          
          {showPrefs && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', width: '240px', boxShadow: 'var(--shadow-md)', zIndex: 100 }}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="input-label">Language</label>
                <select className="input-field select-field" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية (RTL)</option>
                  <option value="es">Español</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label className="input-label">Currency</label>
                <select className="input-field select-field" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="input-label">Units</label>
                <select className="input-field select-field" value={unitSystem} onChange={(e) => setUnitSystem(e.target.value as any)}>
                  <option value="metric">Metric (m, kg)</option>
                  <option value="imperial">Imperial (ft, lb)</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
      </div>
      <style>{\`
        @media(min-width: 768px) {
          .desktop-nav { display: flex !important; gap: 2rem; }
          .desktop-prefs-text { display: inline !important; }
        }
      \`}</style>
    </header>
  );
};
`);

write('src/components/Footer.tsx', `
import React from 'react';
import { Hammer } from 'lucide-react';

export const Footer = () => (
  <footer style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
    <div className="container grid grid-cols-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3rem', marginBottom: '2rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: 'white', color: 'var(--color-navy)', padding: '0.5rem', borderRadius: '10px' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1 }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </div>
        <p style={{ color: '#94a3b8', maxWidth: '300px' }}>Free calculators to estimate materials, measurements and quantities for your next home project.</p>
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Calculators</h4>
        <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '0.75rem' }}>
          <li>Concrete</li>
          <li>Paint</li>
          <li>Gravel</li>
          <li>Tile</li>
          <li>Square Footage</li>
        </ul>
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Legal</h4>
        <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '0.75rem' }}>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Disclaimer</li>
        </ul>
      </div>
    </div>
    <div className="container" style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
      © 2026 Home Project Calculator. All rights reserved. Results are estimates for planning purposes only.
    </div>
  </footer>
);
`);

// ==========================================
// HOME PAGE (Rich Editorial)
// ==========================================
write('src/pages/Home.tsx', `
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Paintbrush, Grid2x2, Ruler, Box, Pickaxe } from 'lucide-react';

export const Home = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-surface-alt) 0%, var(--color-bg) 100%)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <span className="eyebrow">Home Project Tools</span>
            <h1 style={{ margin: '1rem 0 1.5rem 0', color: 'var(--color-navy)' }}>
              Plan your home project<br/>with confidence.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
              Free, professional calculators to estimate materials, measurements and costs for your next renovation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary">Explore calculators</button>
              <button className="btn btn-outline">Browse projects</button>
            </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            {/* Custom Illustration Composition using basic DOM elements and Lucide icons for now */}
            <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
               {/* Abstract background shapes */}
               <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%', background: 'var(--color-primary-light)', borderRadius: '50%', opacity: 0.5 }}></div>
               <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '40%', height: '40%', background: 'var(--color-surface-alt)', borderRadius: '20px', transform: 'rotate(-15deg)' }}></div>
               
               <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                   <div style={{ padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}><Paintbrush size={40} color="var(--color-primary)" /></div>
                   <div style={{ padding: '1rem', background: 'var(--color-navy)', borderRadius: '16px', boxShadow: 'var(--shadow-md)', transform: 'translateY(-20px)' }}><Ruler size={40} color="white" /></div>
                   <div style={{ padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}><Grid2x2 size={40} color="var(--color-text)" /></div>
                 </div>
                 <div style={{ display: 'inline-block', background: 'white', padding: '1rem 2rem', borderRadius: '99px', boxShadow: 'var(--shadow-md)', fontWeight: 700, color: 'var(--color-navy)' }}>
                   Estimate ready
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CALCULATORS */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span className="eyebrow">Quick Tools</span>
            <h2 style={{ marginTop: '0.5rem' }}>Popular calculators</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-3">
          {[
            { to: '/concrete-calculator', name: 'Concrete', desc: 'Calculate volume for slabs and footings', icon: <Box size={32} /> },
            { to: '/paint-calculator', name: 'Paint', desc: 'Estimate paint for interior walls and rooms', icon: <Paintbrush size={32} /> },
            { to: '/tile-calculator', name: 'Tile', desc: 'Plan flooring and wall tiles layouts', icon: <Grid2x2 size={32} /> },
            { to: '/gravel-calculator', name: 'Gravel', desc: 'Calculate gravel for driveways & paths', icon: <Pickaxe size={32} /> },
            { to: '/square-footage-calculator', name: 'Square Footage', desc: 'Basic area measurement conversion', icon: <Ruler size={32} /> }
          ].map((calc, i) => (
            <Link to={calc.to} key={i} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', background: 'var(--color-primary-light)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                {calc.icon}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{calc.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flex: 1 }}>{calc.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                Calculate <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--color-navy)', color: 'white', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)' }}>Simple Process</span>
            <h2 style={{ marginTop: '0.5rem', color: 'white' }}>How it works</h2>
          </div>
          <div className="grid grid-cols-3">
            {[
              { step: '01', title: 'Choose your project', desc: 'Select the material or area you want to estimate.' },
              { step: '02', title: 'Enter dimensions', desc: 'Input your measurements in metric or imperial.' },
              { step: '03', title: 'Get your estimate', desc: 'Instantly see quantities, waste factors, and costs.' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1rem', opacity: 0.8 }}>{s.step}</div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: '#94a3b8' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
`);

// ==========================================
// REUSABLE CALCULATOR COMPONENTS
// ==========================================
write('src/components/ui/Input.tsx', `
import React from 'react';

export const Input = ({ label, unit, value, onChange, type = "number" }: any) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <div className="input-wrapper">
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        className="input-field" 
        style={{ paddingRight: unit ? '3rem' : '1rem' }}
      />
      {unit && <span className="input-suffix">{unit}</span>}
    </div>
  </div>
);
`);

// ==========================================
// CALCULATOR PAGES (Example: Concrete)
// ==========================================
// Concrete Calculator Refined
write('src/pages/ConcreteCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateConcrete } from '../calculations/concrete';
import { Input } from '../components/ui/Input';
import { Box, Copy, CheckCircle2 } from 'lucide-react';

export const ConcreteCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);
  const [depth, setDepth] = useState(0.15);
  const [waste, setWaste] = useState(10);
  const [price, setPrice] = useState(120);

  const { baseVolume, withWaste } = calculateConcrete(length, width, depth, waste);
  const cost = withWaste * price;

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitV = unitSystem === 'metric' ? 'm³' : 'cu ft';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
          <Box size={32} />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2rem' }}>Concrete Calculator</h1>
          <p style={{ margin: 0 }}>Calculate volume for slabs, patios, and footings.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        
        {/* INPUTS PANEL */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            Project Dimensions
          </h3>
          
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Length" unit={unitL} value={length} onChange={setLength} />
            <Input label="Width" unit={unitL} value={width} onChange={setWidth} />
          </div>
          <Input label="Depth / Thickness" unit={unitL} value={depth} onChange={setDepth} />
          
          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
            Options & Pricing
          </h3>
          
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Waste / Extra" unit="%" value={waste} onChange={setWaste} />
            <Input label={\`Price per \${unitV}\`} unit={currency} value={price} onChange={setPrice} />
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)', display: 'block', marginBottom: '1rem' }}>Your Estimate</span>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                {withWaste.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitV}</span>
              </div>
              <div style={{ color: '#cbd5e1' }}>Total required including {waste}% waste</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>Estimated Material Cost</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
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

// Tile Calculator Refined
write('src/pages/TileCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateTile } from '../calculations/tile';
import { Input } from '../components/ui/Input';
import { Grid2x2, Copy } from 'lucide-react';

export const TileCalculator = () => {
  const { unitSystem, currency } = useSettings();
  const [roomL, setRoomL] = useState(4);
  const [roomW, setRoomW] = useState(3);
  const [tileL, setTileL] = useState(0.3);
  const [tileW, setTileW] = useState(0.3);
  const [waste, setWaste] = useState(10);
  const [pricePerBox, setPricePerBox] = useState(25);
  const [tilesPerBox, setTilesPerBox] = useState(10);

  const { area, tilesRequired } = calculateTile(roomL, roomW, tileL, tileW, waste);
  const boxes = Math.ceil(tilesRequired / tilesPerBox);
  const cost = boxes * pricePerBox;

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
          <Grid2x2 size={32} />
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2rem' }}>Tile Calculator</h1>
          <p style={{ margin: 0 }}>Plan flooring and wall tiles layouts.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            Room Area
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Room Length" unit={unitL} value={roomL} onChange={setRoomL} />
            <Input label="Room Width" unit={unitL} value={roomW} onChange={setRoomW} />
          </div>
          
          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
            Tile Details
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label="Tile Length" unit={unitL} value={tileL} onChange={setTileL} />
            <Input label="Tile Width" unit={unitL} value={tileW} onChange={setTileW} />
            <Input label="Tiles per Box" unit="qty" value={tilesPerBox} onChange={setTilesPerBox} />
            <Input label="Waste / Extra" unit="%" value={waste} onChange={setWaste} />
          </div>

          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>3</span>
            Pricing
          </h3>
          <Input label="Price per Box" unit={currency} value={pricePerBox} onChange={setPricePerBox} />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)', display: 'block', marginBottom: '1rem' }}>Your Estimate</span>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                {tilesRequired} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>tiles</span>
              </div>
              <div style={{ color: '#cbd5e1' }}>Or {boxes} boxes ({waste}% waste included)</div>
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

console.log("Redesign complete!");
