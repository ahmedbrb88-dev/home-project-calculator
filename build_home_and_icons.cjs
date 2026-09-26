const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// MATERIAL ICONS
// ==========================================
write('src/components/ui/MaterialIcons.tsx', `
import React from 'react';

// Common icon wrapper with consistent styling
const SvgWrap = ({ children }: { children: React.ReactNode }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

export const IconConcrete = () => (
  <SvgWrap>
    <rect x="8" y="14" width="24" height="12" rx="2" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M12 20 L28 20 M16 14 L16 26 M24 14 L24 26" stroke="var(--color-navy)" strokeWidth="1" strokeDasharray="2 2" />
  </SvgWrap>
);

export const IconPaint = () => (
  <SvgWrap>
    <path d="M14 16 L26 16 L26 30 L14 30 Z" fill="var(--color-primary-light)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M10 16 L30 16" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M16 10 C16 10 20 8 24 10 L24 16 L16 16 Z" stroke="var(--color-navy)" strokeWidth="2" fill="white" />
    <circle cx="20" cy="24" r="2" fill="var(--color-primary)" />
  </SvgWrap>
);

export const IconTile = () => (
  <SvgWrap>
    <rect x="8" y="8" width="10" height="10" fill="white" stroke="var(--color-navy)" strokeWidth="2" />
    <rect x="22" y="8" width="10" height="10" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <rect x="8" y="22" width="10" height="10" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <rect x="22" y="22" width="10" height="10" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
  </SvgWrap>
);

export const IconGravel = () => (
  <SvgWrap>
    <circle cx="12" cy="24" r="4" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="20" cy="26" r="6" fill="var(--color-primary-light)" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="28" cy="22" r="5" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="16" cy="18" r="3" fill="white" stroke="var(--color-navy)" strokeWidth="1.5" />
    <circle cx="24" cy="16" r="4" fill="white" stroke="var(--color-navy)" strokeWidth="1.5" />
  </SvgWrap>
);

export const IconFlooring = () => (
  <SvgWrap>
    <rect x="6" y="8" width="28" height="24" rx="2" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M6 14 L34 14 M6 20 L34 20 M6 26 L34 26" stroke="var(--color-navy)" strokeWidth="1.5" />
    <path d="M16 8 L16 14 M26 14 L26 20 M12 20 L12 26 M22 26 L22 32" stroke="var(--color-navy)" strokeWidth="1.5" />
  </SvgWrap>
);

export const IconSoil = () => (
  <SvgWrap>
    <path d="M6 24 C 12 24 16 20 20 24 C 24 28 28 24 34 24" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
    <path d="M6 28 L34 28 M8 32 L32 32" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M20 24 L20 12 M20 12 C 16 12 16 16 16 16 M20 12 C 24 12 24 8 24 8" stroke="var(--color-navy)" strokeWidth="2" fill="none" />
  </SvgWrap>
);

export const IconMulch = () => (
  <SvgWrap>
    <path d="M8 26 C 14 26 14 22 20 24 C 26 26 26 22 32 24" stroke="var(--color-navy)" strokeWidth="2" fill="none" />
    <path d="M10 30 C 16 30 16 26 22 28 C 28 30 28 26 30 28" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
    <circle cx="20" cy="14" r="2" fill="var(--color-primary)" />
    <circle cx="26" cy="18" r="1.5" fill="var(--color-navy)" />
    <circle cx="12" cy="16" r="1.5" fill="var(--color-navy)" />
  </SvgWrap>
);

export const IconPavers = () => (
  <SvgWrap>
    <path d="M6 20 L20 12 L34 20 L20 28 Z" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M6 20 L6 24 L20 32 L34 24 L34 20" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round" fill="none" />
    <path d="M20 28 L20 32" stroke="var(--color-navy)" strokeWidth="2" />
  </SvgWrap>
);

export const IconDrywall = () => (
  <SvgWrap>
    <rect x="8" y="6" width="24" height="28" fill="white" stroke="var(--color-navy)" strokeWidth="2" />
    <circle cx="12" cy="10" r="1" fill="var(--color-navy)" />
    <circle cx="12" cy="20" r="1" fill="var(--color-navy)" />
    <circle cx="12" cy="30" r="1" fill="var(--color-navy)" />
    <circle cx="28" cy="10" r="1" fill="var(--color-navy)" />
    <circle cx="28" cy="20" r="1" fill="var(--color-navy)" />
    <circle cx="28" cy="30" r="1" fill="var(--color-navy)" />
  </SvgWrap>
);

export const IconRoofing = () => (
  <SvgWrap>
    <path d="M4 24 L20 10 L36 24" stroke="var(--color-navy)" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M8 24 L20 14 L32 24" stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M12 24 L20 18 L28 24" stroke="var(--color-navy)" strokeWidth="2" fill="none" strokeLinejoin="round" />
  </SvgWrap>
);

export const IconBrick = () => (
  <SvgWrap>
    <rect x="6" y="10" width="28" height="20" fill="white" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M6 16 L34 16 M6 24 L34 24" stroke="var(--color-navy)" strokeWidth="1.5" />
    <path d="M14 10 L14 16 M26 10 L26 16 M20 16 L20 24 M10 24 L10 30 M28 24 L28 30" stroke="var(--color-navy)" strokeWidth="1.5" />
  </SvgWrap>
);

export const IconWood = () => (
  <SvgWrap>
    <rect x="10" y="6" width="20" height="28" rx="2" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" />
    <path d="M16 6 C 14 12 18 20 14 34 M24 6 C 26 12 22 20 26 34" stroke="var(--color-navy)" strokeWidth="1" opacity="0.5" />
    <circle cx="20" cy="14" r="1.5" fill="var(--color-navy)" />
  </SvgWrap>
);
`);

// ==========================================
// REFINED HOMEPAGE LAYOUT
// ==========================================
write('src/pages/Home.tsx', `
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Paintbrush, Grid2x2, Ruler, Box, Pickaxe, Search, Droplets, Home as HomeIcon, Trees, Car, BedDouble, Hammer, CheckCircle2 } from 'lucide-react';
import { IconConcrete, IconPaint, IconTile, IconGravel, IconFlooring, IconSoil, IconMulch, IconPavers, IconDrywall, IconRoofing, IconBrick, IconWood } from '../components/ui/MaterialIcons';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/calculators');
  };

  return (
    <div>
      {/* 1. HERO - NO OVERLAP */}
      <section style={{ padding: '6rem 0 6rem 0', background: 'var(--color-surface-alt)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} /> HOME PROJECT TOOLS</span>
            <h1 style={{ margin: '1.5rem 0', color: 'var(--color-navy)' }}>
              Plan your home project<br/>with confidence.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
              Free calculators to estimate materials, measurements and costs for your next home project.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/calculators" className="btn btn-primary">Explore calculators</Link>
              <button className="btn btn-outline" onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}>Browse projects</button>
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

      {/* 2. SEARCH SECTION (Clean separation) */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>What do you need to calculate?</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>Find the right calculator for your next project.</p>
            <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Search size={24} /></div>
              <input type="text" placeholder="Search calculators..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none' }} className="search-input" />
              <button type="submit" className="btn btn-primary" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}>Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CALCULATORS */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="eyebrow">Quick Answers</span>
          <h2 style={{ marginTop: '0.5rem' }}>Popular calculators</h2>
        </div>
        
        <div className="grid grid-cols-3">
          {[
            { to: '/concrete-calculator', name: 'Concrete Calculator', label: 'FOUNDATION', desc: 'Calculate concrete volume and material requirements.', icon: <Box size={32} /> },
            { to: '/paint-calculator', name: 'Paint Calculator', label: 'INTERIOR', desc: 'Estimate the amount of paint required.', icon: <Paintbrush size={32} /> },
            { to: '/square-footage-calculator', name: 'Square Footage', label: 'MEASURE', desc: 'Calculate the area of a space.', icon: <Ruler size={32} /> },
            { to: '/tile-calculator', name: 'Tile Calculator', label: 'FLOORING', desc: 'Estimate tiles and material requirements.', icon: <Grid2x2 size={32} /> },
            { to: '/gravel-calculator', name: 'Gravel Calculator', label: 'LANDSCAPING', desc: 'Calculate gravel for paths or driveways.', icon: <Pickaxe size={32} /> }
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

      {/* 4. EXPLORE BY CATEGORY */}
      <section style={{ background: 'var(--color-surface-alt)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow">All Tools</span>
            <h2 style={{ marginTop: '0.5rem' }}>Explore by category</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
            {[
              { name: 'Concrete', desc: 'Volume, slabs, footings', to: '/calculators', icon: <Box size={24} /> },
              { name: 'Painting', desc: 'Interior, exterior, ceilings', to: '/calculators', icon: <Paintbrush size={24} /> },
              { name: 'Flooring & Tiles', desc: 'Tiles, hardwood, carpet', to: '/calculators', icon: <Grid2x2 size={24} /> },
              { name: 'Landscaping', desc: 'Gravel, mulch, soil', to: '/calculators', icon: <Trees size={24} /> },
              { name: 'Exterior', desc: 'Roofing, siding, fencing', to: '/calculators', icon: <HomeIcon size={24} /> },
              { name: 'Measurements', desc: 'Area, volume, conversions', to: '/calculators', icon: <Ruler size={24} /> }
            ].map((cat, i) => (
              <Link to={cat.to} key={i} className="cat-card" style={{ display: 'block', background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--color-navy)' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--color-navy)' }}>{cat.name}</h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{cat.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>View tools</span>
                  <ArrowRight size={16} color="var(--color-primary)" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MATERIALS WITH NEW ICONS */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="eyebrow">Materials</span>
          <h2 style={{ marginTop: '0.5rem' }}>Calculate what you'll need.</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Estimate quantities for the materials used in common home projects.</p>
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {[
            { name: 'Concrete', icon: <IconConcrete />, to: '/concrete-calculator' },
            { name: 'Paint', icon: <IconPaint />, to: '/paint-calculator' },
            { name: 'Tile', icon: <IconTile />, to: '/tile-calculator' },
            { name: 'Gravel', icon: <IconGravel />, to: '/gravel-calculator' },
            { name: 'Flooring', icon: <IconFlooring />, to: '/calculators' },
            { name: 'Soil', icon: <IconSoil />, to: '/calculators' },
            { name: 'Mulch', icon: <IconMulch />, to: '/calculators' },
            { name: 'Pavers', icon: <IconPavers />, to: '/calculators' },
            { name: 'Drywall', icon: <IconDrywall />, to: '/calculators' },
            { name: 'Roofing', icon: <IconRoofing />, to: '/calculators' },
            { name: 'Brick', icon: <IconBrick />, to: '/calculators' },
            { name: 'Wood', icon: <IconWood />, to: '/calculators' }
          ].map((mat, i) => (
            <Link to={mat.to} key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '2rem', borderRadius: 'var(--radius-md)', transition: 'var(--transition)' }} className="mat-card">
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {mat.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--color-navy)' }}>{mat.name}</h3>
            </Link>
          ))}
        </div>
        <style>{\`
          .mat-card:hover { border-color: var(--color-primary); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
          @media(max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr) !important; } }
        \`}</style>
      </section>

      {/* 6. HOW IT WORKS */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="eyebrow">Simple Process</span>
            <h2 style={{ marginTop: '0.5rem' }}>How it works</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ position: 'relative' }}>
            <div className="timeline-line" style={{ position: 'absolute', top: '40px', left: '15%', right: '15%', height: '2px', background: 'var(--color-border)' }}></div>
            
            {[
              { step: '01', title: 'Choose a calculator', icon: <HomeIcon size={40} color="var(--color-primary)" strokeWidth={1.5} /> },
              { step: '02', title: 'Enter measurements', icon: <Ruler size={40} color="var(--color-primary)" strokeWidth={1.5} /> },
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

      {/* 7. PROJECT IDEAS */}
      <section style={{ background: 'var(--color-navy)', color: 'white', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)' }}>Project Navigation</span>
            <h2 style={{ marginTop: '0.5rem', color: 'white' }}>Planning a bigger project?</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>Select your project to see the tools you'll need.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {[
              { name: 'Bathroom', icon: <Droplets size={40} />, to: '/projects/bathroom' },
              { name: 'Kitchen', icon: <HomeIcon size={40} />, to: '/projects/kitchen' },
              { name: 'Patio', icon: <Box size={40} />, to: '/projects/patio' },
              { name: 'Garden', icon: <Trees size={40} />, to: '/projects/garden' },
              { name: 'Driveway', icon: <Car size={40} />, to: '/projects/driveway' },
              { name: 'Bedroom', icon: <BedDouble size={40} />, to: '/projects/bedroom' }
            ].map((proj, i) => (
              <Link to={proj.to} key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'var(--transition)' }}>
                <div style={{ color: 'white', marginBottom: '1.5rem', opacity: 0.8 }}>
                  {proj.icon}
                </div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'white' }}>{proj.name}</h3>
                <div style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  View tools <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Start planning your project.</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Find the calculator you need and get your estimate in seconds.
          </p>
          <Link to="/calculators" className="btn btn-primary">Explore calculators</Link>
        </div>
      </section>

    </div>
  );
};
`);
