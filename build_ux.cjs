const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// BREADCRUMBS & RELATED CALCULATORS COMPONENTS
// ==========================================
write('src/components/Breadcrumbs.tsx', `
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs = ({ items }: { items: { label: string, path?: string }[] }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
    <Link to="/" style={{ hover: { color: 'var(--color-navy)' }, fontWeight: 500 }}>Home</Link>
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <ChevronRight size={14} />
        {item.path ? (
          <Link to={item.path} style={{ fontWeight: 500 }}>{item.label}</Link>
        ) : (
          <span style={{ color: 'var(--color-navy)', fontWeight: 600 }}>{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);
`);

write('src/components/RelatedCalculators.tsx', `
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Paintbrush, Grid2x2, Ruler, Pickaxe } from 'lucide-react';

const ALL_CALCS = {
  concrete: { to: '/concrete-calculator', name: 'Concrete Calculator', icon: <Box size={24} /> },
  paint: { to: '/paint-calculator', name: 'Paint Calculator', icon: <Paintbrush size={24} /> },
  tile: { to: '/tile-calculator', name: 'Tile Calculator', icon: <Grid2x2 size={24} /> },
  gravel: { to: '/gravel-calculator', name: 'Gravel Calculator', icon: <Pickaxe size={24} /> },
  area: { to: '/square-footage-calculator', name: 'Square Footage Calculator', icon: <Ruler size={24} /> }
};

export const RelatedCalculators = ({ related }: { related: (keyof typeof ALL_CALCS)[] }) => (
  <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
    <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>You may also need</h3>
    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Other tools to help complete your project.</p>
    <div className="grid grid-cols-3">
      {related.map(key => {
        const calc = ALL_CALCS[key];
        return (
          <Link to={calc.to} key={key} className="card calc-card" style={{ display: 'flex', flexDirection: 'column' }}>
             <div style={{ color: 'var(--color-primary)', marginBottom: '1rem', background: 'var(--color-primary-light)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
                {calc.icon}
             </div>
             <h4 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', flex: 1 }}>{calc.name}</h4>
             <div className="calc-card-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600, fontSize: '0.875rem' }}>
                Calculate <ArrowRight className="arrow-icon" size={16} style={{ transition: 'transform 0.2s' }} />
             </div>
          </Link>
        );
      })}
    </div>
  </div>
);
`);

// ==========================================
// REFINED HEADER WITH MEGA MENU & DRAWER
// ==========================================
write('src/components/Header.tsx', `
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { Hammer, Globe, ChevronDown, Check, Menu, X, Box, Paintbrush, Grid2x2, Ruler, Pickaxe, Trees } from 'lucide-react';

const CustomSelect = ({ label, options, value, onChange }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label className="input-label" style={{ marginBottom: '0.25rem' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div onClick={() => setOpen(!open)} className="input-field" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface)', padding: '0.5rem 0.75rem' }}>
          <span>{options.find((o: any) => o.value === value)?.label}</span>
          <ChevronDown size={16} color="var(--color-text-muted)" />
        </div>
        {open && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginTop: '4px', overflow: 'hidden' }}>
            {options.map((opt: any) => (
              <div key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }} style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: value === opt.value ? 'var(--color-surface-hover)' : 'white' }}>
                <span style={{ fontWeight: value === opt.value ? 600 : 400 }}>{opt.label}</span>
                {value === opt.value && <Check size={16} color="var(--color-primary)" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const Header = () => {
  const { language, setLanguage, unitSystem, setUnitSystem, currency, setCurrency, country, setCountry } = useSettings();
  const [showPrefs, setShowPrefs] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefsRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (prefsRef.current && !prefsRef.current.contains(e.target as Node)) setShowPrefs(false);
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) setShowMegaMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowMegaMenu(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 150, background: 'rgba(253,252,250,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* LOGO */}
        <Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'var(--transition)' }}>
          <div className="logo-icon" style={{ background: 'var(--color-navy)', color: 'white', padding: '0.5rem', borderRadius: '10px', transition: 'var(--transition)' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1, color: 'var(--color-navy)' }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav style={{ display: 'none' }} className="desktop-nav">
          <div style={{ position: 'relative' }} ref={megaMenuRef}>
            <button 
              onClick={() => setShowMegaMenu(!showMegaMenu)} 
              style={{ fontWeight: 600, color: isActive('/calculator') ? 'var(--color-navy)' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Calculators <ChevronDown size={16} style={{ transform: showMegaMenu ? 'rotate(180deg)' : 'none', transition: 'var(--transition)' }} />
            </button>
            {showMegaMenu && (
              <div style={{ position: 'absolute', top: 'calc(100% + 1rem)', left: '50%', transform: 'translateX(-50%)', background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '800px', boxShadow: 'var(--shadow-lg)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <Link to="/calculators" style={{ gridColumn: 'span 2', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>View all calculators <ArrowRight size={16} /></Link>
                
                {[
                  { name: 'Concrete', desc: 'Volume and materials', tools: 3, icon: <Box size={20} />, to: '/calculators' },
                  { name: 'Painting', desc: 'Walls and rooms', tools: 4, icon: <Paintbrush size={20} />, to: '/paint-calculator' },
                  { name: 'Flooring & Tiles', desc: 'Tiles and layout', tools: 2, icon: <Grid2x2 size={20} />, to: '/tile-calculator' },
                  { name: 'Landscaping', desc: 'Gravel and soil', tools: 2, icon: <Pickaxe size={20} />, to: '/gravel-calculator' },
                  { name: 'Measurements', desc: 'Area and volume', tools: 4, icon: <Ruler size={20} />, to: '/square-footage-calculator' }
                ].map(cat => (
                  <Link to={cat.to} key={cat.name} className="mega-menu-item" style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)', transition: 'var(--transition)' }}>
                    <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>{cat.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>{cat.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{cat.desc}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem' }}>{cat.tools} tools →</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Projects</Link>
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>How it works</Link>
        </nav>

        {/* PREFERENCES & MOBILE MENU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }} ref={prefsRef}>
            <button onClick={() => setShowPrefs(!showPrefs)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
              <Globe size={18} />
              <span style={{ display: 'none' }} className="desktop-prefs-text">{language.toUpperCase()} • {currency}</span>
              <ChevronDown size={16} />
            </button>
            {showPrefs && (
              <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', width: '280px', boxShadow: 'var(--shadow-lg)' }}>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--color-navy)' }}>Preferences</h4>
                <CustomSelect label="Language" value={language} onChange={setLanguage} options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }, { value: 'ar', label: 'العربية' }, { value: 'es', label: 'Español' }]} />
                <CustomSelect label="Country" value={country} onChange={setCountry} options={[{ value: 'US', label: 'United States' }, { value: 'UK', label: 'United Kingdom' }]} />
                <CustomSelect label="Currency" value={currency} onChange={setCurrency} options={[{ value: 'USD', label: 'USD ($)' }, { value: 'EUR', label: 'EUR (€)' }, { value: 'GBP', label: 'GBP (£)' }]} />
                <CustomSelect label="Units" value={unitSystem} onChange={setUnitSystem} options={[{ value: 'metric', label: 'Metric (m, kg)' }, { value: 'imperial', label: 'Imperial (ft, lb)' }]} />
              </div>
            )}
          </div>

          <button className="mobile-menu-btn btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ padding: '0.5rem' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderBottom: '1px solid var(--color-border)', padding: '2rem 1.5rem', boxShadow: 'var(--shadow-lg)', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/calculators" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>All Calculators</Link>
            <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid var(--color-border)' }}>
              <Link to="/concrete-calculator" style={{ color: 'var(--color-text-secondary)' }}>Concrete</Link>
              <Link to="/paint-calculator" style={{ color: 'var(--color-text-secondary)' }}>Painting</Link>
              <Link to="/tile-calculator" style={{ color: 'var(--color-text-secondary)' }}>Flooring & Tiles</Link>
              <Link to="/gravel-calculator" style={{ color: 'var(--color-text-secondary)' }}>Landscaping</Link>
            </div>
            <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>Projects</Link>
            <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>How it works</Link>
          </div>
        </div>
      )}

      <style>{\`
        .logo-link:hover .logo-icon { transform: scale(1.05) rotate(-5deg); }
        .mega-menu-item:hover { background: var(--color-surface-hover); }
        .mobile-menu-btn { display: flex; }
        @media(min-width: 768px) {
          .desktop-nav { display: flex !important; gap: 2.5rem; }
          .desktop-nav a:hover, .desktop-nav button:hover { color: var(--color-navy) !important; }
          .desktop-prefs-text { display: inline !important; }
          .mobile-menu-btn { display: none !important; }
        }
      \`}</style>
    </header>
  );
};
`);

// ==========================================
// CALCULATOR DIRECTORY PAGE
// ==========================================
write('src/pages/CalculatorsDirectory.tsx', `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box, Paintbrush, Grid2x2, Pickaxe, Ruler, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const ALL_CALCS = [
  { to: '/concrete-calculator', name: 'Concrete Calculator', category: 'Concrete', keywords: ['slab', 'foundation', 'cement', 'patio', 'driveway'], icon: <Box size={24} /> },
  { to: '/paint-calculator', name: 'Paint Calculator', category: 'Painting', keywords: ['wall', 'room', 'interior', 'exterior'], icon: <Paintbrush size={24} /> },
  { to: '/tile-calculator', name: 'Tile Calculator', category: 'Flooring', keywords: ['floor', 'bathroom', 'kitchen', 'ceramic'], icon: <Grid2x2 size={24} /> },
  { to: '/gravel-calculator', name: 'Gravel Calculator', category: 'Landscaping', keywords: ['driveway', 'path', 'stones', 'patio'], icon: <Pickaxe size={24} /> },
  { to: '/square-footage-calculator', name: 'Square Footage Calculator', category: 'Measurements', keywords: ['area', 'room', 'floor', 'patio'], icon: <Ruler size={24} /> }
];

export const CalculatorsDirectory = () => {
  const [search, setSearch] = useState('');
  
  const filtered = ALL_CALCS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.keywords.some(k => k.includes(search.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <Breadcrumbs items={[{ label: 'Calculators' }]} />
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>Calculators</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>Find the right tool for your home project.</p>
        
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Search size={24} /></div>
          <input 
            type="text" 
            placeholder="What are you working on? (e.g. driveway, paint, tiles)..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3">
        {filtered.length > 0 ? filtered.map(calc => (
          <Link to={calc.to} key={calc.name} className="card calc-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '1rem', display: 'inline-block' }}>{calc.category.toUpperCase()}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>{calc.icon}</div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{calc.name}</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600, marginTop: 'auto', paddingTop: '1rem' }}>
              Calculate <ArrowRight size={16} />
            </div>
          </Link>
        )) : (
          <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
            No calculators found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
};
`);

// ==========================================
// REFINED HOME PAGE (PROJECT NAVIGATION)
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
    navigate('/calculators');
  };

  return (
    <div>
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
              <Link to="/calculators" className="btn btn-primary">Explore calculators</Link>
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="20" y="20" width="360" height="260" rx="20" fill="white" stroke="var(--color-border)" strokeWidth="2" />
                 <path d="M40 40 L360 40 M40 80 L360 80 M40 120 L360 120 M40 160 L360 160 M40 200 L360 200 M40 240 L360 240" stroke="#f1f5f9" strokeWidth="2" />
                 <path d="M80 20 L80 280 M120 20 L120 280 M160 20 L160 280 M200 20 L200 280 M240 20 L240 280 M280 20 L280 280 M320 20 L320 280" stroke="#f1f5f9" strokeWidth="2" />
                 <path d="M100 80 L260 80 L260 160 L300 160 L300 220 L100 220 Z" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="4" strokeLinejoin="round" />
                 <path d="M180 80 L180 160 M180 160 L260 160" stroke="var(--color-navy)" strokeWidth="4" />
                 <rect x="260" y="40" width="40" height="40" rx="8" fill="var(--color-primary)" />
                 <rect x="310" y="40" width="40" height="40" rx="8" fill="var(--color-primary-light)" />
                 <path d="M100 65 L260 65 M100 60 L100 70 M260 60 L260 70" stroke="var(--color-primary)" strokeWidth="2" />
                 <text x="180" y="55" fill="var(--color-primary)" fontSize="14" fontWeight="bold" textAnchor="middle">8.5m</text>
                 <circle cx="120" cy="200" r="12" fill="#10b981" opacity="0.2" />
                 <circle cx="120" cy="200" r="6" fill="#10b981" opacity="0.5" />
               </svg>
               <div style={{ position: 'absolute', top: '10%', left: '-5%', padding: '1rem', background: 'var(--color-navy)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}><Ruler size={32} color="white" /></div>
               <div style={{ position: 'absolute', bottom: '15%', right: '-5%', padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}><Paintbrush size={32} color="var(--color-primary)" /></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ transform: 'translateY(-50%)', position: 'relative', zIndex: 20 }}>
        <div className="container">
          <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>What are you working on?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Search by tool or project (e.g. driveway, paint, tiles).</p>
            <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Search size={24} /></div>
              <input type="text" placeholder="Search calculators..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none' }} className="search-input" />
              <button type="submit" className="btn btn-primary" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}>Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* PROJECT IDEAS - GUIDING NAVIGATION */}
      <section className="container" style={{ padding: '2rem 0 6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="eyebrow">Project Navigation</span>
          <h2 style={{ marginTop: '0.5rem' }}>Planning a bigger project?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Select your project to see the tools you'll need.</p>
        </div>

        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {[
            { name: 'Building a Patio', icon: <Box size={32} />, calc: '/concrete-calculator' },
            { name: 'Painting a Room', icon: <Paintbrush size={32} />, calc: '/paint-calculator' },
            { name: 'Installing Flooring', icon: <Grid2x2 size={32} />, calc: '/tile-calculator' }
          ].map((proj, i) => (
            <Link to={proj.calc} key={i} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                {proj.icon}
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{proj.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                View relevant tools <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* FINAL CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--color-surface-alt)' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>READY TO START YOUR PROJECT?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Find the calculator you need and get your estimate in seconds.
          </p>
          <Link to="/calculators" className="btn btn-primary">Browse all calculators</Link>
        </div>
      </section>

    </div>
  );
};
`);

// ==========================================
// APP ROUTING UPDATE
// ==========================================
write('src/App.tsx', `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ConcreteCalculator } from './pages/ConcreteCalculator';
import { PaintCalculator } from './pages/PaintCalculator';
import { GravelCalculator } from './pages/GravelCalculator';
import { TileCalculator } from './pages/TileCalculator';
import { SquareFootageCalculator } from './pages/SquareFootageCalculator';
import { CalculatorsDirectory } from './pages/CalculatorsDirectory';
import { BackToTop } from './components/BackToTop';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<CalculatorsDirectory />} />
          <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
          <Route path="/paint-calculator" element={<PaintCalculator />} />
          <Route path="/gravel-calculator" element={<GravelCalculator />} />
          <Route path="/tile-calculator" element={<TileCalculator />} />
          <Route path="/square-footage-calculator" element={<SquareFootageCalculator />} />
        </Routes>
        <Footer />
        <BackToTop />
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
`);
