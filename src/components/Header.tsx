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
  const { language, setLanguage, unitSystem, setUnitSystem, currency, setCurrency, country, setCountry, t } = useSettings();
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
          <Link to="/" style={{ fontWeight: 600, color: location.pathname === '/' ? 'var(--color-navy)' : 'var(--color-text-secondary)' }} aria-current={location.pathname === '/' ? 'page' : undefined}>{t('nav.home')}</Link>
          <div style={{ position: 'relative' }} ref={megaMenuRef}>
            <button 
              onClick={() => setShowMegaMenu(!showMegaMenu)} 
              style={{ fontWeight: 600, color: isActive('/calculator') ? 'var(--color-navy)' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              {t('nav.calculators')} <ChevronDown size={16} style={{ transform: showMegaMenu ? 'rotate(180deg)' : 'none', transition: 'var(--transition)' }} />
            </button>
            {showMegaMenu && (
              <div style={{ position: 'absolute', top: 'calc(100% + 1rem)', left: '50%', transform: 'translateX(-50%)', background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '800px', boxShadow: 'var(--shadow-lg)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <Link to="/calculators" style={{ gridColumn: 'span 2', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>{t('nav.mega.viewAll')} <ArrowRight size={16} /></Link>
                {[
                  { nameKey: 'nav.mega.concrete.title', descKey: 'nav.mega.concrete.desc', tools: 1, icon: <Box size={20} />, to: '/concrete-calculator' },
                  { nameKey: 'nav.mega.paint.title', descKey: 'nav.mega.paint.desc', tools: 1, icon: <Paintbrush size={20} />, to: '/paint-calculator' },
                  { nameKey: 'nav.mega.tile.title', descKey: 'nav.mega.tile.desc', tools: 1, icon: <Grid2x2 size={20} />, to: '/tile-calculator' },
                  { nameKey: 'nav.mega.gravel.title', descKey: 'nav.mega.gravel.desc', tools: 1, icon: <Pickaxe size={20} />, to: '/gravel-calculator' },
                  { nameKey: 'nav.mega.area.title', descKey: 'nav.mega.area.desc', tools: 1, icon: <Ruler size={20} />, to: '/square-footage-calculator' }
                ].map((cat: any) => (
                  <Link to={cat.to} key={cat.to} className="mega-menu-item" style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius-md)', transition: 'var(--transition)' }}>
                    <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>{cat.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>{t(cat.nameKey)}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t(cat.descKey)}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.5rem' }}>{cat.tools} {t('home.categories.view')} →</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/projects/patio" style={{ fontWeight: 600, color: isActive('/project') ? 'var(--color-navy)' : 'var(--color-text-secondary)' }}>{t('nav.projects')}</Link>
          <Link to="/how-it-works" style={{ fontWeight: 600, color: isActive('/how-it-works') ? 'var(--color-navy)' : 'var(--color-text-secondary)' }}>{t('nav.howItWorks')}</Link>
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
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--color-navy)' }}>{t('prefs.title')}</h4>
                <CustomSelect label={t('prefs.language')} value={language} onChange={setLanguage} options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }, { value: 'ar', label: 'العربية' }, { value: 'es', label: 'Español' }, { value: 'pt', label: 'Português' }, { value: 'it', label: 'Italiano' }]} />
                <CustomSelect label={t('prefs.country')} value={country} onChange={setCountry} searchable={true} options={COUNTRIES} />
                <CustomSelect label={t('prefs.currency')} value={currency} onChange={setCurrency} searchable={true} options={CURRENCIES} />
                <CustomSelect label={t('prefs.units')} value={unitSystem} onChange={setUnitSystem} options={[{ value: 'metric', label: t('prefs.metric') }, { value: 'imperial', label: t('prefs.imperial') }]} />
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
            <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: location.pathname === '/' ? 'var(--color-navy)' : 'var(--color-text-secondary)' }} aria-current={location.pathname === '/' ? 'page' : undefined}>{t('nav.home')}</Link>
            <Link to="/calculators" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>{t('nav.calculators')}</Link>
            <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid var(--color-border)' }}>
              <Link to="/concrete-calculator" style={{ color: 'var(--color-text-secondary)' }}>{t('calc.concrete.title')}</Link>
              <Link to="/paint-calculator" style={{ color: 'var(--color-text-secondary)' }}>{t('calc.paint.title')}</Link>
              <Link to="/tile-calculator" style={{ color: 'var(--color-text-secondary)' }}>{t('calc.tile.title')}</Link>
              <Link to="/gravel-calculator" style={{ color: 'var(--color-text-secondary)' }}>{t('calc.gravel.title')}</Link>
            </div>
            <Link to="/projects/patio" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>{t('nav.projects')}</Link>
            <Link to="/how-it-works" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>{t('nav.howItWorks')}</Link>
          </div>
        </div>
      )}
      <style>{`
        .logo-link:hover .logo-icon { transform: scale(1.05) rotate(-5deg); }
        .mega-menu-item:hover { background: var(--color-surface-hover); }
        .mobile-menu-btn { display: flex; }
        @media(min-width: 768px) {
          .desktop-nav { display: flex !important; gap: 2.5rem; }
          .desktop-nav a:hover, .desktop-nav button:hover { color: var(--color-navy) !important; }
          .desktop-prefs-text { display: inline !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
import { ArrowRight } from 'lucide-react';
