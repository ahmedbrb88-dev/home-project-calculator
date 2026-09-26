import React from 'react';
import { Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

export const Footer = () => {
  const { t } = useSettings();

  return (
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
          <p style={{ color: '#94a3b8', maxWidth: '300px', fontSize: '0.9rem' }}>{t('footer.description')}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', gridColumn: 'span 2' }}>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('footer.tools')}</h4>
            <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
              <li><Link to="/calculators">{t('nav.calculators')}</Link></li>
              <li><Link to="/concrete-calculator">{t('materials.concrete.name')}</Link></li>
              <li><Link to="/paint-calculator">{t('materials.paint.name')}</Link></li>
              <li><Link to="/gravel-calculator">{t('materials.gravel.name')}</Link></li>
              <li><Link to="/tile-calculator">{t('materials.tile.name')}</Link></li>
              <li><Link to="/square-footage-calculator">{t('calc.area.title')}</Link></li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('nav.projects')}</h4>
            <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
              <li><Link to="/projects/bathroom">{t('projects.bathroom.title')}</Link></li>
              <li><Link to="/projects/kitchen">{t('projects.kitchen.title')}</Link></li>
              <li><Link to="/projects/patio">{t('projects.patio.title')}</Link></li>
              <li><Link to="/projects/garden">{t('projects.garden.title')}</Link></li>
              <li><Link to="/projects/driveway">{t('projects.driveway.title')}</Link></li>
              <li><Link to="/projects/bedroom">{t('projects.bedroom.title')}</Link></li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('footer.company')}</h4>
            <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
              <li><Link to="/about">{t('footer.about')}</Link></li>
              <li><Link to="/how-it-works">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('footer.legal')}</h4>
            <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
              <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms">{t('footer.terms')}</Link></li>
              <li><Link to="/disclaimer">{t('footer.disclaimer')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
        {t('footer.copyright')}
      </div>
    </footer>
  );
};
