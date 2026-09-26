import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { Input } from '../components/ui/Input';
import { SquareFootageDiagram } from '../components/ui/Diagrams';
import { Ruler, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';

export const SquareFootageCalculator = ({
  initialLength,
  initialWidth,
  onStateChange,
  hideHeader
}: any = {}) => {
  const { unitSystem, t } = useSettings();
  const [length, setLength] = useState<number | ''>(initialLength ?? 5);
  const [width, setWidth] = useState<number | ''>(initialWidth ?? 4);

  const num = (v: any) => Number(v) || 0;
  const area = num(length) * num(width);

  React.useEffect(() => {
    if (onStateChange) {
      onStateChange({ length, width, area });
    }
  }, [length, width, area]);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitA = unitSystem === 'metric' ? 'm²' : 'sq ft';

  return (
    <div className={hideHeader ? '' : 'container'} style={{ padding: hideHeader ? '0' : '2rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      {!hideHeader && <Breadcrumbs items={[{ label: 'Calculators', path: '/calculators' }, { label: 'Area' }]} />}
      
      {!hideHeader && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
                <Ruler size={36} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{t('cat.measure').toUpperCase()}</span>
                <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2.5rem' }}>{t('calc.area.title', 'Square Footage')}</h1>
                <p style={{ margin: 0, fontSize: '1.125rem' }}>{t('calc.area.description')}</p>
              </div>
            </div>
            <Link to="/calculators" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <ArrowLeft size={16} /> {t('directory.all', 'All calculators')}
            </Link>
          </div>
        </>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <SquareFootageDiagram />
          
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step1', 'SPACE DIMENSIONS')}</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label={t('calc.inputs.length') + ' *'} unit={unitL} value={length} onChange={setLength} />
              <Input label={t('calc.inputs.width') + ' *'} unit={unitL} value={width} onChange={setWidth} />
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>{t('calc.yourEstimate', 'YOUR AREA')}</div>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
                {area.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitA}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ flex: 1, background: 'var(--color-primary)', color: 'white' }}>
                <Copy size={18} /> {t('btn.copy')}
              </button>
              <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => { setLength(''); setWidth(''); }}>
                {t('calc.startOver', 'Start over')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      {!hideHeader && (
        <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)', maxWidth: '800px' }}>
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>{t('calc.area.howItWorks')}</h2>
          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.area.howItWorksDesc')}</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.area.formula')}</h3>
            <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
              {t('calc.area.formula')}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.area.example')}</h3>
            <p style={{ marginBottom: '1rem' }}>{t('calc.area.exampleDesc')}</p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.area.ex1')}</strong></li>
            </ul>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.area.tips')}</h3>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.area.tipsDesc')}</p>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.area.disclaimer')}</p>
          </div>
        </div>
      )}

      {!hideHeader && <RelatedCalculators related={['concrete', 'paint', 'tile', 'gravel']} />}
    </div>
  );
};
