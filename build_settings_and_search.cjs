const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// 1. SETTINGS CONTEXT - CURRENCIES
// ==========================================
write('src/contexts/SettingsContext.tsx', `
import React, { createContext, useContext, useState, useEffect } from 'react';

type SettingsContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  unitSystem: 'metric' | 'imperial';
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  currency: string;
  setCurrency: (currency: string) => void;
  country: string;
  setCountry: (country: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const CURRENCIES = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
  { value: 'NZD', label: 'New Zealand Dollar (NZD)' },
  { value: 'CHF', label: 'Swiss Franc (CHF)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'CNY', label: 'Chinese Yuan (CNY)' },
  { value: 'INR', label: 'Indian Rupee (INR)' },
  { value: 'BRL', label: 'Brazilian Real (BRL)' },
  { value: 'MXN', label: 'Mexican Peso (MXN)' },
  { value: 'ZAR', label: 'South African Rand (ZAR)' },
  { value: 'SEK', label: 'Swedish Krona (SEK)' },
  { value: 'NOK', label: 'Norwegian Krone (NOK)' },
  { value: 'DKK', label: 'Danish Krone (DKK)' },
  { value: 'PLN', label: 'Polish Zloty (PLN)' },
  { value: 'CZK', label: 'Czech Koruna (CZK)' },
  { value: 'HUF', label: 'Hungarian Forint (HUF)' },
  { value: 'RON', label: 'Romanian Leu (RON)' },
  { value: 'TRY', label: 'Turkish Lira (TRY)' },
  { value: 'AED', label: 'UAE Dirham (AED)' },
  { value: 'SAR', label: 'Saudi Riyal (SAR)' },
  { value: 'QAR', label: 'Qatari Riyal (QAR)' },
  { value: 'KWD', label: 'Kuwaiti Dinar (KWD)' },
  { value: 'ILS', label: 'Israeli New Shekel (ILS)' },
  { value: 'DZD', label: 'Algerian Dinar (DZD)' },
  { value: 'MAD', label: 'Moroccan Dirham (MAD)' },
  { value: 'TND', label: 'Tunisian Dinar (TND)' },
  { value: 'EGP', label: 'Egyptian Pound (EGP)' },
  { value: 'SGD', label: 'Singapore Dollar (SGD)' },
  { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
  { value: 'KRW', label: 'South Korean Won (KRW)' },
  { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
  { value: 'THB', label: 'Thai Baht (THB)' },
  { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
  { value: 'PHP', label: 'Philippine Peso (PHP)' }
];

export const COUNTRIES = [
  { value: 'US', label: 'United States', currency: 'USD' },
  { value: 'GB', label: 'United Kingdom', currency: 'GBP' },
  { value: 'CA', label: 'Canada', currency: 'CAD' },
  { value: 'AU', label: 'Australia', currency: 'AUD' },
  { value: 'NZ', label: 'New Zealand', currency: 'NZD' },
  { value: 'FR', label: 'France', currency: 'EUR' },
  { value: 'DE', label: 'Germany', currency: 'EUR' },
  { value: 'ES', label: 'Spain', currency: 'EUR' },
  { value: 'IT', label: 'Italy', currency: 'EUR' },
  { value: 'PT', label: 'Portugal', currency: 'EUR' },
  { value: 'BE', label: 'Belgium', currency: 'EUR' },
  { value: 'CH', label: 'Switzerland', currency: 'CHF' },
  { value: 'JP', label: 'Japan', currency: 'JPY' },
  { value: 'CN', label: 'China', currency: 'CNY' },
  { value: 'IN', label: 'India', currency: 'INR' },
  { value: 'BR', label: 'Brazil', currency: 'BRL' },
  { value: 'MX', label: 'Mexico', currency: 'MXN' },
  { value: 'ZA', label: 'South Africa', currency: 'ZAR' },
  { value: 'SE', label: 'Sweden', currency: 'SEK' },
  { value: 'NO', label: 'Norway', currency: 'NOK' },
  { value: 'DK', label: 'Denmark', currency: 'DKK' },
  { value: 'PL', label: 'Poland', currency: 'PLN' },
  { value: 'AE', label: 'UAE', currency: 'AED' },
  { value: 'SA', label: 'Saudi Arabia', currency: 'SAR' },
  { value: 'QA', label: 'Qatar', currency: 'QAR' },
  { value: 'KW', label: 'Kuwait', currency: 'KWD' },
  { value: 'DZ', label: 'Algeria', currency: 'DZD' },
  { value: 'MA', label: 'Morocco', currency: 'MAD' },
  { value: 'TN', label: 'Tunisia', currency: 'TND' },
  { value: 'EG', label: 'Egypt', currency: 'EGP' }
];

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('calc_lang') || 'en');
  const [unitSystem, setUnitSystem] = useState<'metric'|'imperial'>(() => (localStorage.getItem('calc_unit') as any) || 'metric');
  const [currency, setCurrency] = useState(() => localStorage.getItem('calc_currency') || 'USD');
  const [country, setCountry] = useState(() => localStorage.getItem('calc_country') || 'US');

  useEffect(() => {
    localStorage.setItem('calc_lang', language);
    localStorage.setItem('calc_unit', unitSystem);
    localStorage.setItem('calc_currency', currency);
    localStorage.setItem('calc_country', country);
    
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language, unitSystem, currency, country]);

  const handleSetCountry = (c: string) => {
    setCountry(c);
    const countryData = COUNTRIES.find(x => x.value === c);
    // Don't forcefully overwrite if user specifically chose another currency before, but for simplicity here we default it.
    if(countryData && !localStorage.getItem('calc_currency_manual')) {
      setCurrency(countryData.currency);
    }
  };

  const handleSetCurrency = (c: string) => {
    setCurrency(c);
    localStorage.setItem('calc_currency_manual', 'true');
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, unitSystem, setUnitSystem, currency, setCurrency: handleSetCurrency, country, setCountry: handleSetCountry }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
`);

// ==========================================
// 2. FOOTER - REAL LINKS
// ==========================================
write('src/components/Footer.tsx', `
import React from 'react';
import { Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
    <div className="container grid grid-cols-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '3rem', marginBottom: '2rem' }}>
      <div>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'white' }}>
          <div style={{ background: 'white', color: 'var(--color-navy)', padding: '0.5rem', borderRadius: '10px' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1 }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </Link>
        <p style={{ color: '#94a3b8', maxWidth: '300px', fontSize: '0.9rem' }}>Simple tools to estimate materials, quantities and measurements for your next home project.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', gridColumn: 'span 2' }}>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li><Link to="/calculators">All Calculators</Link></li>
            <li><Link to="/concrete-calculator">Concrete</Link></li>
            <li><Link to="/paint-calculator">Paint</Link></li>
            <li><Link to="/gravel-calculator">Gravel</Link></li>
            <li><Link to="/tile-calculator">Tile</Link></li>
            <li><Link to="/square-footage-calculator">Square Footage</Link></li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li><Link to="/projects/bathroom">Bathroom</Link></li>
            <li><Link to="/projects/kitchen">Kitchen</Link></li>
            <li><Link to="/projects/patio">Patio</Link></li>
            <li><Link to="/projects/garden">Garden</Link></li>
            <li><Link to="/projects/driveway">Driveway</Link></li>
            <li><Link to="/projects/bedroom">Bedroom</Link></li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
          <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
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
// 3. HEADER UPDATE - USE NEW CONTEXT LISTS
// ==========================================
write('src/components/Header.tsx', `
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings, CURRENCIES, COUNTRIES } from '../contexts/SettingsContext';
import { Hammer, Globe, ChevronDown, Check, Menu, X, Box, Paintbrush, Grid2x2, Ruler, Pickaxe, Trees } from 'lucide-react';

const CustomSelect = ({ label, options, value, onChange, searchable }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filteredOptions = options.filter((o:any) => o.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label className="input-label" style={{ marginBottom: '0.25rem' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div onClick={() => { setOpen(!open); setSearch(''); }} className="input-field" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface)', padding: '0.5rem 0.75rem' }}>
          <span>{options.find((o: any) => o.value === value)?.label}</span>
          <ChevronDown size={16} color="var(--color-text-muted)" />
        </div>
        {open && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginTop: '4px', overflow: 'hidden' }}>
            {searchable && (
              <div style={{ padding: '0.5rem' }}>
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} onClick={e => e.stopPropagation()} style={{ width: '100%', padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
              </div>
            )}
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredOptions.map((opt: any) => (
                <div key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }} style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: value === opt.value ? 'var(--color-surface-hover)' : 'white' }}>
                  <span style={{ fontWeight: value === opt.value ? 600 : 400 }}>{opt.label}</span>
                  {value === opt.value && <Check size={16} color="var(--color-primary)" />}
                </div>
              ))}
            </div>
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
        
        <Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'var(--transition)' }}>
          <div className="logo-icon" style={{ background: 'var(--color-navy)', color: 'white', padding: '0.5rem', borderRadius: '10px', transition: 'var(--transition)' }}>
            <Hammer size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', lineHeight: 1.1, color: 'var(--color-navy)' }}>HOME PROJECT</div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary)' }}>CALCULATOR</div>
          </div>
        </Link>

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
                  { name: 'Concrete', desc: 'Volume and materials', tools: 1, icon: <Box size={20} />, to: '/concrete-calculator' },
                  { name: 'Painting', desc: 'Walls and rooms', tools: 1, icon: <Paintbrush size={20} />, to: '/paint-calculator' },
                  { name: 'Flooring & Tiles', desc: 'Tiles and layout', tools: 1, icon: <Grid2x2 size={20} />, to: '/tile-calculator' },
                  { name: 'Landscaping', desc: 'Gravel and soil', tools: 1, icon: <Pickaxe size={20} />, to: '/gravel-calculator' },
                  { name: 'Measurements', desc: 'Area and volume', tools: 1, icon: <Ruler size={20} />, to: '/square-footage-calculator' }
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
          <Link to="/projects/patio" style={{ fontWeight: 600, color: isActive('/project') ? 'var(--color-navy)' : 'var(--color-text-secondary)' }}>Projects</Link>
          <Link to="/how-it-works" style={{ fontWeight: 600, color: isActive('/how-it-works') ? 'var(--color-navy)' : 'var(--color-text-secondary)' }}>How it works</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }} ref={prefsRef}>
            <button onClick={() => setShowPrefs(!showPrefs)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
              <Globe size={18} />
              <span style={{ display: 'none' }} className="desktop-prefs-text">{language.toUpperCase()} • {currency}</span>
              <ChevronDown size={16} />
            </button>
            {showPrefs && (
              <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', width: '320px', boxShadow: 'var(--shadow-lg)' }}>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--color-navy)' }}>Preferences</h4>
                <CustomSelect label="Language" value={language} onChange={setLanguage} options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }, { value: 'ar', label: 'العربية' }, { value: 'es', label: 'Español' }]} />
                <CustomSelect label="Country" value={country} onChange={setCountry} searchable={true} options={COUNTRIES} />
                <CustomSelect label="Currency" value={currency} onChange={setCurrency} searchable={true} options={CURRENCIES} />
                <CustomSelect label="Units" value={unitSystem} onChange={setUnitSystem} options={[{ value: 'metric', label: 'Metric (m, kg)' }, { value: 'imperial', label: 'Imperial (ft, lb)' }]} />
              </div>
            )}
          </div>

          <button className="mobile-menu-btn btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ padding: '0.5rem' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
            <Link to="/projects/patio" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>Projects</Link>
            <Link to="/how-it-works" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>How it works</Link>
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
import { ArrowRight } from 'lucide-react';
`);

// ==========================================
// 4. FUNCTIONAL DIRECTORY SEARCH
// ==========================================
write('src/pages/CalculatorsDirectory.tsx', `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box, Paintbrush, Grid2x2, Pickaxe, Ruler, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const ALL_CALCS = [
  { to: '/concrete-calculator', name: 'Concrete Calculator', category: 'Concrete', desc: 'Calculate concrete volume and material requirements.', keywords: ['slab', 'foundation', 'cement', 'patio', 'driveway'], icon: <Box size={24} /> },
  { to: '/paint-calculator', name: 'Paint Calculator', category: 'Painting', desc: 'Estimate paint for walls and rooms.', keywords: ['wall', 'room', 'interior', 'exterior'], icon: <Paintbrush size={24} /> },
  { to: '/tile-calculator', name: 'Tile Calculator', category: 'Flooring', desc: 'Estimate tiles and material requirements.', keywords: ['floor', 'bathroom', 'kitchen', 'ceramic', 'wall'], icon: <Grid2x2 size={24} /> },
  { to: '/gravel-calculator', name: 'Gravel Calculator', category: 'Landscaping', desc: 'Calculate gravel needed for paths or driveways.', keywords: ['driveway', 'path', 'stones', 'patio', 'aggregate'], icon: <Pickaxe size={24} /> },
  { to: '/square-footage-calculator', name: 'Square Footage Calculator', category: 'Measurements', desc: 'Calculate the area of a space.', keywords: ['area', 'room', 'floor', 'patio', 'square', 'footage'], icon: <Ruler size={24} /> }
];

export const CalculatorsDirectory = () => {
  const [search, setSearch] = useState('');
  
  const filtered = ALL_CALCS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase()) ||
    c.keywords.some(k => k.includes(search.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <Breadcrumbs items={[{ label: 'Calculators' }]} />
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>Calculators</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>Simple tools to estimate materials, quantities and measurements for your next home project.</p>
        
        <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>What do you need to calculate?</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Find the right calculator for your next project.</p>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Search size={24} /></div>
            <input 
              type="text" 
              placeholder="Search calculators (e.g. paint, concrete, tile)..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none', transition: 'var(--transition)' }}
            />
          </div>
        </div>
      </div>

      {search && filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)', background: 'var(--color-surface-alt)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '1rem' }}>No calculators found matching "{search}".</h3>
          <p>Try searching for paint, concrete, tile, gravel or area.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {filtered.map(calc => (
            <Link to={calc.to} key={calc.name} className="card calc-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '1rem', display: 'inline-block' }}>{calc.category.toUpperCase()}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>{calc.icon}</div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{calc.name}</h3>
              </div>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flex: 1, fontSize: '0.95rem' }}>{calc.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600, marginTop: 'auto' }}>
                Calculate <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
`);
