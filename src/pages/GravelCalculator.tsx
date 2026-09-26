import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { calculateGravel } from '../calculations/gravel';
import { Input } from '../components/ui/Input';
import { PriceInput } from '../components/PriceInput';
import { usePrice } from '../hooks/usePrice';
import { Pickaxe, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';

export const GravelCalculator = ({
  initialLength,
  initialWidth,
  initialDepth,
  initialDensity,
  initialPrice,
  onStateChange,
  hideHeader
}: any = {}) => {
  const { unitSystem, currency, t } = useSettings();
  const [length, setLength] = useState<number | ''>(initialLength ?? 10);
  const [width, setWidth] = useState<number | ''>(initialWidth ?? 5);
  const [depth, setDepth] = useState<number | ''>(initialDepth ?? 0.05);
  const [density, setDensity] = useState<number | ''>(initialDensity ?? 1600);
  const [price, setPrice] = useState<string>(initialPrice?.toString() ?? '');
  const [purchaseFormat, setPurchaseFormat] = useState<'bulk' | 'bag'>('bulk');
  const unitW = unitSystem === 'metric' ? 'kg' : 'lb';
  
  // Dynamic materialId for bag based on real Point.P data
  const materialId = purchaseFormat === 'bulk' ? 'gravel_standard' : 'gravel_concrete_6_20_35kg';
  const priceUnit = purchaseFormat === 'bulk' ? (unitSystem === 'metric' ? 'tonne' : 'ton') : 'sac';

  const { indicativePrice } = usePrice(materialId, priceUnit, 'gravel', purchaseFormat);

  const num = (v: any) => Number(v) || 0;
  const activePrice = price !== '' ? num(price) : (indicativePrice?.typicalPrice ?? null);
  
  const { volume, weight } = calculateGravel(num(length), num(width), num(depth), num(density));
  
  const packageSize = indicativePrice?.packageSize ?? 35; // Default 35kg if not provided
  
  const bagsRequired = purchaseFormat === 'bag' ? Math.ceil(weight / packageSize) : 0;
  const purchasedWeight = purchaseFormat === 'bag' ? bagsRequired * packageSize : weight;

  const cost = activePrice !== null ? (purchaseFormat === 'bag' ? bagsRequired * activePrice : (weight / (priceUnit === 'tonne' || priceUnit === 'ton' ? 1000 : 1)) * activePrice) : null;

  React.useEffect(() => {
    if (onStateChange) {
      onStateChange({ length, width, depth, density, price, activePrice, volume, weight, cost, purchaseFormat, bagsRequired, purchasedWeight, packageSize, purchaseUnit: priceUnit, priceSource: indicativePrice ? (indicativePrice.isDemo ? 'demo' : 'real') : 'none' });
    }
  }, [length, width, depth, density, price, activePrice, volume, weight, cost, purchaseFormat, bagsRequired, purchasedWeight, packageSize, priceUnit, indicativePrice]);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitV = unitSystem === 'metric' ? 'm³' : 'cu ft';

  return (
    <div className={hideHeader ? '' : 'container'} style={{ padding: hideHeader ? '0' : '2rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      {!hideHeader && <Breadcrumbs items={[{ label: 'Calculators', path: '/calculators' }, { label: 'Gravel' }]} />}
      
      {!hideHeader && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
              <Pickaxe size={36} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{t('home.categories.landscaping', 'LANDSCAPING')}</span>
              <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2.5rem' }}>{t('calc.gravel.title')}</h1>
              <p style={{ margin: 0, fontSize: '1.125rem' }}>{t('calc.gravel.description')}</p>
            </div>
          </div>
          <Link to="/calculators" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <ArrowLeft size={16} /> {t('directory.all', 'All calculators')}
          </Link>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step1', 'PROJECT DIMENSIONS')}</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label={t('calc.inputs.length') + ' *'} unit={unitL} value={length} onChange={setLength} />
              <Input label={t('calc.inputs.width') + ' *'} unit={unitL} value={width} onChange={setWidth} />
            </div>
            <Input label={t('calc.inputs.depth') + ' *'} unit={unitL} value={depth} onChange={setDepth} />
          </div>
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step2', 'MATERIAL OPTIONS')}</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="input-label">{t('calc.inputs.purchaseFormat', 'Purchase Format')}</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="purchaseFormat" value="bulk" checked={purchaseFormat === 'bulk'} onChange={() => { setPurchaseFormat('bulk'); setPrice(''); }} />
                  {t('calc.inputs.bulk', 'Bulk')}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="purchaseFormat" value="bag" checked={purchaseFormat === 'bag'} onChange={() => { setPurchaseFormat('bag'); setPrice(''); }} />
                  {t('calc.inputs.bags', 'Bags')}
                </label>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Input label={t('calc.gravel.density')} unit={unitW + '/' + unitV} value={density} onChange={setDensity} />
              <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('calc.optional', 'Default applied')}</span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step3', 'COST ESTIMATION')}</h3>
            <PriceInput 
              materialId={materialId} 
              materialFamily="gravel"
              productForm={purchaseFormat}
              unit={priceUnit} 
              value={price} 
              onChange={setPrice} 
            />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>{t('calc.yourEstimate', 'YOUR ESTIMATE')}</div>
              {purchaseFormat === 'bag' ? (
                <>
                  <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                    {bagsRequired} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{t('calc.inputs.bags', 'bags')}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                    {t('calc.outputs.purchasedWeight', 'Purchased weight')}: {purchasedWeight.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unitW}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
                  {weight.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitW}</span>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', fontWeight: 700 }}>{t('calc.whatNext', 'WHAT NEXT?')}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>{t('calc.outputs.required', 'Required')}</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{weight.toLocaleString(undefined, { maximumFractionDigits: 2 })} {unitW}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#94a3b8' }}>{t('calc.materialCost', 'Estimated material cost')}</span>
                {cost !== null ? (
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>{currency} {cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#94a3b8' }}>{t('calc.unavailable', 'Unavailable')}</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ flex: 1, background: 'var(--color-primary)', color: 'white' }}>
                <Copy size={18} /> {t('btn.copy')}
              </button>
              <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => { setLength(''); setWidth(''); setDepth(''); setDensity(1600); setPrice(''); setPurchaseFormat('bulk'); }}>
                {t('calc.startOver', 'Start over')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      {!hideHeader && (
        <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)', maxWidth: '800px' }}>
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>{t('calc.gravel.howItWorks')}</h2>
          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.gravel.howItWorksDesc')}</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.gravel.formula')}</h3>
            <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
              {t('calc.gravel.formula')}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.gravel.example')}</h3>
            <p style={{ marginBottom: '1rem' }}>{t('calc.gravel.exampleDesc')}</p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.gravel.ex1')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.gravel.ex2')}</strong></li>
            </ul>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.gravel.tips')}</h3>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.gravel.tipsDesc')}</p>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.gravel.disclaimer')}</p>
          </div>
        </div>
      )}

      {!hideHeader && <RelatedCalculators related={['area', 'concrete']} />}
    </div>
  );
};
