const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// REFINED HEADER WITH CUSTOM PREFS DROPDOWN
// ==========================================
write('src/components/Header.tsx', `
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { Hammer, Globe, ChevronDown, Check } from 'lucide-react';

// Custom Select Component for Preferences
const CustomSelect = ({ label, options, value, onChange }: any) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label className="input-label" style={{ marginBottom: '0.25rem' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => setOpen(!open)}
          className="input-field"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface)', padding: '0.5rem 0.75rem' }}
        >
          <span>{options.find((o: any) => o.value === value)?.label}</span>
          <ChevronDown size={16} color="var(--color-text-muted)" />
        </div>
        
        {open && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginTop: '4px', overflow: 'hidden' }}>
            {options.map((opt: any) => (
              <div 
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: value === opt.value ? 'var(--color-surface-hover)' : 'white' }}
              >
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
  const prefsRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (prefsRef.current && !prefsRef.current.contains(e.target as Node)) {
        setShowPrefs(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 150, background: 'rgba(253,252,250,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--color-navy)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1, color: 'var(--color-navy)' }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </Link>

        <nav style={{ display: 'none' }} className="desktop-nav">
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Calculators</Link>
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>Projects</Link>
          <Link to="/" style={{ fontWeight: 600, color: 'var(--color-text-secondary)', transition: 'color 0.2s' }}>How it works</Link>
        </nav>

        <div style={{ position: 'relative' }} ref={prefsRef}>
          <button onClick={() => setShowPrefs(!showPrefs)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
            <Globe size={18} />
            <span style={{ display: 'none' }} className="desktop-prefs-text">{language.toUpperCase()} • {currency}</span>
            <ChevronDown size={16} />
          </button>
          
          {showPrefs && (
            <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', width: '280px', boxShadow: 'var(--shadow-lg)' }}>
              <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--color-navy)' }}>Preferences</h4>
              
              <CustomSelect 
                label="Language" 
                value={language} 
                onChange={setLanguage}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'fr', label: 'Français' },
                  { value: 'ar', label: 'العربية (RTL)' },
                  { value: 'es', label: 'Español' }
                ]} 
              />
              
              <CustomSelect 
                label="Country" 
                value={country} 
                onChange={setCountry}
                options={[
                  { value: 'US', label: 'United States' },
                  { value: 'UK', label: 'United Kingdom' },
                  { value: 'CA', label: 'Canada' },
                  { value: 'FR', label: 'France' }
                ]} 
              />

              <CustomSelect 
                label="Currency" 
                value={currency} 
                onChange={setCurrency}
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' },
                  { value: 'CAD', label: 'CAD ($)' }
                ]} 
              />

              <CustomSelect 
                label="Units" 
                value={unitSystem} 
                onChange={setUnitSystem}
                options={[
                  { value: 'metric', label: 'Metric (m, kg)' },
                  { value: 'imperial', label: 'Imperial (ft, lb)' }
                ]} 
              />
              
            </div>
          )}
        </div>
      </div>
      <style>{\`
        @media(min-width: 768px) {
          .desktop-nav { display: flex !important; gap: 2.5rem; }
          .desktop-nav a:hover { color: var(--color-navy) !important; }
          .desktop-prefs-text { display: inline !important; }
        }
      \`}</style>
    </header>
  );
};
`);

// ==========================================
// REFINED FOOTER
// ==========================================
write('src/components/Footer.tsx', `
import React from 'react';
import { Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
    <div className="container grid grid-cols-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3rem', marginBottom: '2rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'white', color: 'var(--color-navy)', padding: '0.5rem', borderRadius: '10px' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1 }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </div>
        <p style={{ color: '#94a3b8', maxWidth: '300px', fontSize: '0.9rem' }}>Free tools for planning home projects.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', gridColumn: 'span 2' }}>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li><Link to="/concrete-calculator">Concrete</Link></li>
            <li><Link to="/paint-calculator">Paint</Link></li>
            <li><Link to="/gravel-calculator">Gravel</Link></li>
            <li><Link to="/tile-calculator">Tile</Link></li>
            <li><Link to="/square-footage-calculator">Area</Link></li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li>Bathroom</li>
            <li>Kitchen</li>
            <li>Patio</li>
            <li>Garden</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li>About</li>
            <li>How it works</li>
            <li>Contact</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Disclaimer</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="container" style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
      © 2026 Home Project Calculator. All rights reserved. Results are estimates for planning purposes only.
    </div>
  </footer>
);
`);

// ==========================================
// REFINED HOME PAGE
// ==========================================
write('src/pages/Home.tsx', `
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Paintbrush, Grid2x2, Ruler, Box, Pickaxe, Search, Droplets, Home as HomeIcon, Trees, Car, BedDouble } from 'lucide-react';

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
      {/* HERO SECTION */}
      <section style={{ padding: '6rem 0 4rem 0', background: 'linear-gradient(135deg, var(--color-surface-alt) 0%, var(--color-bg) 100%)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <span className="eyebrow">Home Project Tools</span>
            <h1 style={{ margin: '1rem 0 1.5rem 0', color: 'var(--color-navy)' }}>
              Plan your home project<br/>with confidence.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '500px' }}>
              Free calculators to estimate materials, measurements and costs for your next home project.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>Explore calculators</button>
              <button className="btn btn-outline" onClick={() => window.scrollTo({ top: 1600, behavior: 'smooth' })}>Browse projects</button>
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            {/* Enhanced Coherent Illustration */}
            <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {/* Base Shapes */}
               <div style={{ position: 'absolute', top: '10%', right: '10%', width: '50%', height: '50%', background: 'var(--color-primary-light)', borderRadius: '50%', opacity: 0.8 }}></div>
               <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: '60%', height: '40%', background: 'var(--color-surface)', border: '2px solid var(--color-border)', borderRadius: '12px', transform: 'rotate(-5deg)', boxShadow: 'var(--shadow-md)' }}></div>
               <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '40%', height: '25%', background: '#f8fafc', border: '1px dashed var(--color-text-muted)', borderRadius: '6px', transform: 'rotate(-5deg)' }}></div>
               
               {/* Floating Elements */}
               <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
                 <div style={{ position: 'absolute', top: '25%', left: '20%', padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-lg)', transform: 'rotate(-10deg)' }}>
                    <HomeIcon size={48} color="var(--color-navy)" strokeWidth={1.5} />
                 </div>
                 <div style={{ position: 'absolute', top: '15%', right: '25%', padding: '0.75rem', background: 'var(--color-primary)', borderRadius: '12px', boxShadow: 'var(--shadow-md)', transform: 'rotate(15deg)' }}>
                    <Paintbrush size={32} color="white" strokeWidth={1.5} />
                 </div>
                 <div style={{ position: 'absolute', bottom: '30%', right: '15%', padding: '1rem', background: 'var(--color-navy)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
                    <Ruler size={40} color="white" strokeWidth={1.5} />
                    <div style={{ position: 'absolute', right: '-40px', top: '20px', width: '60px', height: '2px', background: 'var(--color-navy)', borderTop: '2px dashed white' }}></div>
                 </div>
                 <div style={{ position: 'absolute', bottom: '10%', left: '35%', padding: '0.75rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                    <Grid2x2 size={32} color="var(--color-primary)" strokeWidth={1.5} />
                 </div>
                 
                 {/* Measurement Lines Overlay */}
                 <div style={{ position: 'absolute', top: '40%', left: '45%', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '40px', height: '1px', background: 'var(--color-primary)' }}></div>
                   <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>4.5m</span>
                 </div>
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
        <style>{\`
          .search-input:focus { border-color: var(--color-primary) !important; box-shadow: 0 0 0 4px var(--color-primary-light); }
        \`}</style>
      </section>

      {/* POPULAR CALCULATORS */}
      <section className="container" style={{ padding: '2rem 0 6rem 0' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span className="eyebrow">Quick Answers</span>
          <h2 style={{ marginTop: '0.5rem' }}>Popular calculators</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Quick answers for your next home project.</p>
        </div>
        
        <div className="grid grid-cols-3">
          {[
            { to: '/concrete-calculator', name: 'Concrete Calculator', label: 'FOUNDATION', desc: 'Calculate concrete volume and material requirements.', icon: <Box size={32} /> },
            { to: '/paint-calculator', name: 'Paint Calculator', label: 'INTERIOR', desc: 'Estimate paint quantities for walls and rooms.', icon: <Paintbrush size={32} /> },
            { to: '/tile-calculator', name: 'Tile Calculator', label: 'FLOORING', desc: 'Plan flooring and wall tiles layouts accurately.', icon: <Grid2x2 size={32} /> }
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
        <style>{\`
          .calc-card:hover .arrow-icon { transform: translateX(6px); }
        \`}</style>
      </section>

      {/* EXPLORE BY CATEGORY */}
      <section style={{ background: 'var(--color-surface-alt)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow">All Tools</span>
            <h2 style={{ marginTop: '0.5rem' }}>Explore by category</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Tools for every stage of your home project.</p>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
            {[
              { name: 'Concrete', desc: 'Volume, slabs, footings', count: 1, icon: <Box size={24} /> },
              { name: 'Painting', desc: 'Interior, exterior, ceilings', count: 1, icon: <Paintbrush size={24} /> },
              { name: 'Flooring & Tiles', desc: 'Tiles, hardwood, carpet', count: 1, icon: <Grid2x2 size={24} /> },
              { name: 'Landscaping', desc: 'Gravel, mulch, soil', count: 1, icon: <Trees size={24} /> },
              { name: 'Exterior', desc: 'Roofing, siding, fencing', count: 0, icon: <HomeIcon size={24} /> },
              { name: 'Measurements', desc: 'Area, volume, conversions', count: 1, icon: <Ruler size={24} /> }
            ].map((cat, i) => (
              <div key={i} className="cat-card" style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--color-navy)' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{cat.name}</h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{cat.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{cat.count} calculator{cat.count !== 1 ? 's' : ''}</span>
                  <ArrowRight size={16} color="var(--color-primary)" />
                </div>
              </div>
            ))}
          </div>
          <style>{\`
            .cat-card:hover { border-color: var(--color-primary); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
          \`}</style>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--color-navy)', color: 'white', padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)' }}>Simple Process</span>
            <h2 style={{ marginTop: '0.5rem', color: 'white' }}>How it works</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ position: 'relative' }}>
            {/* Horizontal timeline line (desktop) */}
            <div className="timeline-line" style={{ position: 'absolute', top: '24px', left: '15%', right: '15%', height: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
            
            {[
              { step: '01', title: 'Choose your project', desc: 'Select the material or area you want to estimate from our growing library.' },
              { step: '02', title: 'Enter your dimensions', desc: 'Input your measurements securely in either metric or imperial units.' },
              { step: '03', title: 'Get your estimate', desc: 'Instantly view required quantities, recommended waste factors, and estimated costs.' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 1rem' }}>
                <div style={{ width: '50px', height: '50px', margin: '0 auto 2rem auto', background: 'var(--color-navy)', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800 }}>
                  {s.step}
                </div>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>{s.title}</h3>
                <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <style>{\`
            @media (max-width: 768px) {
              .timeline-line { display: none; }
            }
          \`}</style>
        </div>
      </section>

      {/* PROJECT IDEAS */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="eyebrow">Future Projects</span>
          <h2 style={{ marginTop: '0.5rem' }}>Planning something bigger?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Combine different tools to plan your entire project.</p>
        </div>

        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {[
            { name: 'Bathroom', icon: <Droplets size={28} /> },
            { name: 'Kitchen', icon: <HomeIcon size={28} /> },
            { name: 'Patio', icon: <Box size={28} /> },
            { name: 'Garden', icon: <Trees size={28} /> },
            { name: 'Driveway', icon: <Car size={28} /> },
            { name: 'Bedroom', icon: <BedDouble size={28} /> }
          ].map((proj, i) => (
            <div key={i} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ background: 'var(--color-surface-alt)', color: 'var(--color-navy)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                {proj.icon}
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{proj.name}</h3>
              <div style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Coming Soon
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
`);
