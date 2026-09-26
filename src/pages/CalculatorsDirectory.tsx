import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Box, Paintbrush, Grid2x2, Pickaxe, Ruler, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSettings } from '../contexts/SettingsContext';

export const CalculatorsDirectory = () => {
  const { t } = useSettings();
  const [search, setSearch] = useState('');
  
  const ALL_CALCS = [
    { to: '/concrete-calculator', nameKey: 'calc.concrete.title', categoryKey: 'cat.foundation', descKey: 'calc.concrete.description', keywordsKey: 'keywords.concrete', icon: <Box size={24} /> },
    { to: '/paint-calculator', nameKey: 'calc.paint.title', categoryKey: 'cat.interior', descKey: 'calc.paint.description', keywordsKey: 'keywords.paint', icon: <Paintbrush size={24} /> },
    { to: '/tile-calculator', nameKey: 'calc.tile.title', categoryKey: 'cat.flooring', descKey: 'calc.tile.description', keywordsKey: 'keywords.tile', icon: <Grid2x2 size={24} /> },
    { to: '/gravel-calculator', nameKey: 'calc.gravel.title', categoryKey: 'cat.landscaping', descKey: 'calc.gravel.description', keywordsKey: 'keywords.gravel', icon: <Pickaxe size={24} /> },
    { to: '/square-footage-calculator', nameKey: 'calc.area.title', categoryKey: 'cat.measure', descKey: 'calc.area.description', keywordsKey: 'keywords.area', icon: <Ruler size={24} /> }
  ];
  
  const filtered = ALL_CALCS.filter(c => 
    t(c.nameKey).toLowerCase().includes(search.toLowerCase()) || 
    t(c.categoryKey).toLowerCase().includes(search.toLowerCase()) ||
    t(c.descKey).toLowerCase().includes(search.toLowerCase()) ||
    t(c.keywordsKey).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <Breadcrumbs items={[{ label: t('nav.calculators') }]} />
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>{t('directory.title')}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>{t('directory.subtitle')}</p>
        
        <div style={{ background: 'var(--color-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('search.title')}</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>{t('search.subtitle')}</p>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Search size={24} /></div>
            <input 
              type="text" 
              placeholder={t('search.placeholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 4rem', fontSize: '1.125rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--color-border)', outline: 'none', transition: 'var(--transition)' }}
            />
          </div>
        </div>
      </div>

      {search && filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)', background: 'var(--color-surface-alt)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '1rem' }}>{t('search.noResults')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {filtered.map(calc => (
            <Link to={calc.to} key={calc.nameKey} className="card calc-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '1rem', display: 'inline-block' }}>{t(calc.categoryKey).toUpperCase()}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>{calc.icon}</div>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{t(calc.nameKey)}</h3>
              </div>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flex: 1, fontSize: '0.95rem' }}>{t(calc.descKey)}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600, marginTop: 'auto' }}>
                {t('btn.calculate')} <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
