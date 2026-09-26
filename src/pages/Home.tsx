import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Paintbrush, Grid2x2, Ruler, Box, Pickaxe, Search, Droplets, Home as HomeIcon, Trees, Car, BedDouble, Hammer, CheckCircle2 } from 'lucide-react';
import { IconConcrete, IconPaint, IconTile, IconGravel, IconFlooring, IconSoil, IconMulch, IconPavers, IconDrywall, IconRoofing, IconBrick, IconWood } from '../components/ui/MaterialIcons';

import { useSettings } from '../contexts/SettingsContext';

export const Home = () => {
  const { t, content } = useSettings();
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
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} /> {content.hero.eyebrow}</span>
            <h1 style={{ margin: '1.5rem 0', color: 'var(--color-navy)' }}>
              {content.hero.title}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.6 }}>
              {content.hero.subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/calculators" className="btn btn-primary">{content.hero.primaryCta}</Link>
              <button className="btn btn-outline" onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}>{content.hero.secondaryCta}</button>
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
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{content.search.title}</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>{content.search.subtitle}</p>
            <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Search size={24} /></div>
              <input type="text" placeholder={content.search.placeholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none' }} className="search-input" />
              <button type="submit" className="btn btn-primary" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', bottom: '0.5rem' }}>{content.search.button}</button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. POPULAR CALCULATORS */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="eyebrow">{content.home.popular.eyebrow}</span>
          <h2 style={{ marginTop: '0.5rem' }}>{content.home.popular.title}</h2>
        </div>
        
        <div className="grid grid-cols-3">
          {[
            { to: '/concrete-calculator', nameKey: 'calc.concrete.title', labelKey: 'cat.foundation', descKey: 'calc.concrete.description', icon: <Box size={32} /> },
            { to: '/paint-calculator', nameKey: 'calc.paint.title', labelKey: 'cat.interior', descKey: 'calc.paint.description', icon: <Paintbrush size={32} /> },
            { to: '/square-footage-calculator', nameKey: 'calc.area.title', labelKey: 'cat.measure', descKey: 'calc.area.description', icon: <Ruler size={32} /> },
            { to: '/tile-calculator', nameKey: 'calc.tile.title', labelKey: 'cat.flooring', descKey: 'calc.tile.description', icon: <Grid2x2 size={32} /> },
            { to: '/gravel-calculator', nameKey: 'calc.gravel.title', labelKey: 'cat.landscaping', descKey: 'calc.gravel.description', icon: <Pickaxe size={32} /> }
          ].map((calc, i) => (
            <Link to={calc.to} key={i} className="calc-card card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                  {calc.icon}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)', background: 'var(--color-surface-alt)', padding: '0.25rem 0.75rem', borderRadius: '99px' }}>
                  {t(calc.labelKey)}
                </span>
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{t(calc.nameKey)}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flex: 1, fontSize: '0.95rem' }}>{t(calc.descKey)}</p>
              <div className="calc-card-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                {content.btn.calculate} <ArrowRight className="arrow-icon" size={16} style={{ transition: 'transform 0.2s' }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE BY CATEGORY */}
      <section style={{ background: 'var(--color-surface-alt)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow">{content.home.categories.eyebrow}</span>
            <h2 style={{ marginTop: '0.5rem' }}>{content.home.categories.title}</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
            {[
              { nameKey: 'nav.mega.concrete.title', descKey: 'home.categories.concrete.desc', to: '/calculators', icon: <Box size={24} /> },
              { nameKey: 'nav.mega.paint.title', descKey: 'home.categories.paint.desc', to: '/calculators', icon: <Paintbrush size={24} /> },
              { nameKey: 'nav.mega.tile.title', descKey: 'home.categories.tile.desc', to: '/calculators', icon: <Grid2x2 size={24} /> },
              { nameKey: 'nav.mega.gravel.title', descKey: 'home.categories.gravel.desc', to: '/calculators', icon: <Trees size={24} /> },
              { nameKey: 'home.categories.exterior.title', descKey: 'home.categories.exterior.desc', to: '/calculators', icon: <HomeIcon size={24} /> },
              { nameKey: 'nav.mega.area.title', descKey: 'home.categories.area.desc', to: '/calculators', icon: <Ruler size={24} /> }
            ].map((cat, i) => (
              <Link to={cat.to} key={i} className="cat-card" style={{ display: 'block', background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'var(--transition)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--color-navy)' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--color-navy)' }}>{t(cat.nameKey)}</h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{t(cat.descKey)}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{content.home.categories.view}</span>
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
          <span className="eyebrow">{content.materials.eyebrow}</span>
          <h2 style={{ marginTop: '0.5rem' }}>{content.materials.heading}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>{content.materials.subheading}</p>
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {[
            { nameKey: 'materials.concrete.name', icon: <IconConcrete />, to: '/concrete-calculator' },
            { nameKey: 'materials.paint.name', icon: <IconPaint />, to: '/paint-calculator' },
            { nameKey: 'materials.tile.name', icon: <IconTile />, to: '/tile-calculator' },
            { nameKey: 'materials.gravel.name', icon: <IconGravel />, to: '/gravel-calculator' },
            { nameKey: 'materials.flooring.name', icon: <IconFlooring />, to: '/calculators' },
            { nameKey: 'materials.soil.name', icon: <IconSoil />, to: '/calculators' },
            { nameKey: 'materials.mulch.name', icon: <IconMulch />, to: '/calculators' },
            { nameKey: 'materials.pavers.name', icon: <IconPavers />, to: '/calculators' },
            { nameKey: 'materials.drywall.name', icon: <IconDrywall />, to: '/calculators' },
            { nameKey: 'materials.roofing.name', icon: <IconRoofing />, to: '/calculators' },
            { nameKey: 'materials.brick.name', icon: <IconBrick />, to: '/calculators' },
            { nameKey: 'materials.wood.name', icon: <IconWood />, to: '/calculators' }
          ].map((mat, i) => (
            <Link to={mat.to} key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '2rem', borderRadius: 'var(--radius-md)', transition: 'var(--transition)' }} className="mat-card">
              <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {mat.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--color-navy)' }}>{t(mat.nameKey)}</h3>
            </Link>
          ))}
        </div>
        <style>{`
          .mat-card:hover { border-color: var(--color-primary); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
          @media(max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>

      {/* 6. HOW IT WORKS */}
      <section style={{ padding: '8rem 0', background: 'var(--color-surface-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="eyebrow">{content.home.howItWorks.eyebrow}</span>
            <h2 style={{ marginTop: '0.5rem' }}>{content.home.howItWorks.title}</h2>
          </div>
          
          <div className="grid grid-cols-3" style={{ position: 'relative' }}>
            <div className="timeline-line" style={{ position: 'absolute', top: '40px', left: '15%', right: '15%', height: '2px', background: 'var(--color-border)' }}></div>
            
            {[
              { step: '01', titleKey: 'home.howItWorks.step1', icon: <HomeIcon size={40} color="var(--color-primary)" strokeWidth={1.5} /> },
              { step: '02', titleKey: 'home.howItWorks.step2', icon: <Ruler size={40} color="var(--color-primary)" strokeWidth={1.5} /> },
              { step: '03', titleKey: 'home.howItWorks.step3', icon: <CheckCircle2 size={40} color="var(--color-primary)" strokeWidth={1.5} /> }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 1rem' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 2rem auto', background: 'var(--color-surface)', border: '2px solid var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{s.step}</div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{t(s.titleKey)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT IDEAS */}
      <section style={{ background: 'var(--color-navy)', color: 'white', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)' }}>{content.home.projects.eyebrow}</span>
            <h2 style={{ marginTop: '0.5rem', color: 'white' }}>{content.home.projects.title}</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>{content.home.projects.subtitle}</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {[
              { nameKey: 'projects.bathroom.title', icon: <Droplets size={40} /> },
              { nameKey: 'projects.kitchen.title', icon: <HomeIcon size={40} /> },
              { nameKey: 'projects.patio.title', icon: <Box size={40} /> },
              { nameKey: 'projects.garden.title', icon: <Trees size={40} /> },
              { nameKey: 'projects.driveway.title', icon: <Car size={40} /> },
              { nameKey: 'projects.bedroom.title', icon: <BedDouble size={40} /> }
            ].map((proj, i) => (
              <Link to="/projects" key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'var(--transition)' }}>
                <div style={{ color: 'white', marginBottom: '1.5rem', opacity: 0.8 }}>
                  {proj.icon}
                </div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: 'white' }}>{t(proj.nameKey)}</h3>
                <div style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {content.home.projects.view} <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/projects" className="btn btn-primary" style={{ background: 'white', color: 'var(--color-navy)' }}>
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>{content.home.cta.title}</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            {content.home.cta.desc}
          </p>
          <Link to="/calculators" className="btn btn-primary">{content.hero.primaryCta}</Link>
        </div>
      </section>

    </div>
  );
};
