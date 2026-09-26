import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

export const ConcreteDiagram = () => {
  const { t } = useSettings();
  return (
    <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
      <path d="M40 30 L160 30 L180 60 L60 60 Z" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M60 60 L60 90 L180 90 L180 60" fill="var(--color-primary-light)" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M160 30 L160 60" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 4"/>
      <text x="100" y="20" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">{t('calc.inputs.length')}</text>
      <text x="30" y="50" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">{t('calc.inputs.width')}</text>
      <text x="195" y="80" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">{t('calc.inputs.depth')}</text>
      {/* Measurement lines */}
      <path d="M40 10 L160 10 M40 5 L40 15 M160 5 L160 15" stroke="var(--color-primary)" strokeWidth="1"/>
      <path d="M10 30 L30 60 M5 30 L15 30 M25 60 L35 60" stroke="var(--color-primary)" strokeWidth="1"/>
      <path d="M190 60 L190 90 M185 60 L195 60 M185 90 L195 90" stroke="var(--color-primary)" strokeWidth="1"/>
    </svg>
  );
};

export const PaintDiagram = () => {
  const { t } = useSettings();
  return (
    <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
      <rect x="20" y="20" width="160" height="80" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2"/>
      <rect x="130" y="40" width="30" height="60" fill="white" stroke="var(--color-navy)" strokeWidth="2"/> {/* Door */}
      <rect x="40" y="40" width="40" height="30" fill="white" stroke="var(--color-navy)" strokeWidth="2"/> {/* Window */}
      <path d="M40 55 L80 55 M60 40 L60 70" stroke="var(--color-navy)" strokeWidth="1"/>
      <circle cx="155" cy="70" r="2" fill="var(--color-navy)"/>
      <text x="100" y="12" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">{t('calc.inputs.length')}</text>
      <path d="M20 5 L180 5 M20 0 L20 10 M180 0 L180 10" stroke="var(--color-primary)" strokeWidth="1"/>
    </svg>
  );
};

export const TileDiagram = () => (
  <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
    <rect x="30" y="10" width="140" height="100" fill="white" stroke="var(--color-navy)" strokeWidth="2"/>
    <path d="M30 35 L170 35 M30 60 L170 60 M30 85 L170 85" stroke="var(--color-border)" strokeWidth="1"/>
    <path d="M65 10 L65 110 M100 10 L100 110 M135 10 L135 110" stroke="var(--color-border)" strokeWidth="1"/>
    {/* Highlighted tile */}
    <rect x="65" y="35" width="35" height="25" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2"/>
    <text x="100" y="12" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600"></text>
  </svg>
);

export const SquareFootageDiagram = () => (
  <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
    <rect x="40" y="20" width="120" height="80" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 4"/>
    <text x="100" y="65" fill="var(--color-navy)" fontSize="14" textAnchor="middle" fontWeight="700">L × W</text>
    <path d="M40 10 L160 10 M40 5 L40 15 M160 5 L160 15" stroke="var(--color-primary)" strokeWidth="1"/>
    <path d="M25 20 L25 100 M20 20 L30 20 M20 100 L30 100" stroke="var(--color-primary)" strokeWidth="1"/>
  </svg>
);
