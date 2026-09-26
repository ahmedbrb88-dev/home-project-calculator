import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  const { language, t } = useSettings();
  const isRtl = language === 'ar';
  
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
      <Link to="/" style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-navy)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>{t('nav.home', 'Home')}</Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} style={{ transform: isRtl ? 'rotate(180deg)' : 'none', opacity: 0.5 }} aria-hidden="true" />
          {item.path ? (
            <Link to={item.path} style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-navy)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--color-navy)', fontWeight: 600 }} aria-current="page">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
