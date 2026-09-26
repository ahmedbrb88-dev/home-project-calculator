import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { usePrice } from '../hooks/usePrice';

interface PriceInputProps {
  materialId: string;
  unit: string;
  value: string;
  onChange: (val: string) => void;
  label?: string;
  materialFamily?: string;
  productForm?: string;
}

export const PriceInput: React.FC<PriceInputProps> = ({ materialId, unit, value, onChange, label, materialFamily, productForm }) => {
  const { currency, t } = useSettings();
  const { indicativePrice } = usePrice(materialId, unit, materialFamily, productForm);

  const defaultLabel = `Price per ${unit} (${currency})`;

  return (
    <div>
      <label className="input-label" style={{ fontSize: '0.875rem' }}>{label || defaultLabel}</label>
      <input 
        type="number" 
        className="input-field" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={indicativePrice ? indicativePrice.typicalPrice.toString() : "0.00"} 
      />
      
      {indicativePrice ? (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <span>
              Indicative local price: <strong style={{ color: 'var(--color-navy)' }}>{indicativePrice.typicalPrice} {currency} / {unit}</strong>
              {indicativePrice.isDemo && <span style={{ color: '#f59e0b', fontWeight: 600, marginLeft: '0.25rem' }}>[DEMO DATA]</span>}
            </span>
            {!value && (
              <button 
                type="button" 
                onClick={() => onChange(indicativePrice.typicalPrice.toString())}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.75rem', padding: 0, textDecoration: 'underline' }}
              >
                Use this price
              </button>
            )}
          </div>
          <div style={{ opacity: 0.8 }}>
            Latest available price data (Updated: {indicativePrice.lastUpdated}). Prices are estimates and may vary by supplier, location, quality, availability and taxes.
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', opacity: 0.8 }}>
          No reliable indicative price data available for your selected region/currency. Please enter a manual price.
        </div>
      )}
    </div>
  );
};
