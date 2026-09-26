import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Paintbrush, Box, Pickaxe, Ruler, Grid2x2 } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const ICONS: Record<string, React.ReactNode> = {
  area: <Ruler size={24} />,
  concrete: <Box size={24} />,
  paint: <Paintbrush size={24} />,
  gravel: <Pickaxe size={24} />,
  tile: <Grid2x2 size={24} />
};

export const RelatedCalculators = ({ related }: { related: string[] }) => {
  const { t } = useSettings();
  return (
    <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-border)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--color-navy)' }}>{t('calc.youMayAlsoNeed')}</h3>
      <div className="grid grid-cols-3">
        {related.map(key => {
          const icon = ICONS[key];
          if (!icon) return null;
          
          let to = '/calculators';
          if (key === 'area') to = '/square-footage-calculator';
          if (key === 'concrete') to = '/concrete-calculator';
          if (key === 'paint') to = '/paint-calculator';
          if (key === 'gravel') to = '/gravel-calculator';
          if (key === 'tile') to = '/tile-calculator';
          
          return (
            <Link to={to} key={key} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', transition: 'var(--transition)' }} className="related-card">
              <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>{t(`calc.${key}.title`)}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t(`calc.${key}.description`)}</div>
              </div>
              <ArrowRight size={20} color="var(--color-text-muted)" className="arrow-icon" />
            </Link>
          );
        })}
      </div>
      <style>{`
        .related-card:hover { border-color: var(--color-primary); transform: translateY(-2px); }
        .related-card:hover .arrow-icon { color: var(--color-primary) !important; transform: translateX(4px); transition: transform 0.2s; }
      `}</style>
    </div>
  );
};
