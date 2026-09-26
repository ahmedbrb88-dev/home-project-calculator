import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateConcrete } from '../calculations/concrete';
import { Input } from '../components/ui/Input';
import { PriceInput } from '../components/PriceInput';
import { usePrice } from '../hooks/usePrice';
import { ConcreteDiagram } from '../components/ui/Diagrams';
import { Box, Copy, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { Link } from 'react-router-dom';

export const ConcreteCalculator = ({
  initialLength,
  initialWidth,
  initialDepth,
  initialWaste,
  initialPrice,
  onStateChange,
  hideHeader
}: any = {}) => {
  const { unitSystem, currency, t } = useSettings();
  const [length, setLength] = useState<number | ''>(initialLength ?? 5);
  const [width, setWidth] = useState<number | ''>(initialWidth ?? 4);
  const [depth, setDepth] = useState<number | ''>(initialDepth ?? 0.15);
  const [waste, setWaste] = useState<number | ''>(initialWaste ?? 10);
  const [price, setPrice] = useState<string>(initialPrice?.toString() ?? '');
  const [purchaseFormat, setPurchaseFormat] = useState<'ready_mix' | 'bag'>('ready_mix');
  const [density, setDensity] = useState<number | ''>(2400); // Standard concrete density kg/m3

  const unitV = unitSystem === 'metric' ? 'm³' : 'cu_yd';
  const unitW = unitSystem === 'metric' ? 'kg' : 'lb';
  
  const priceUnit = purchaseFormat === 'bag' ? 'bag' : (unitSystem === 'metric' ? 'm³' : 'cu_yd');
  const materialId = purchaseFormat === 'bag' ? (unitSystem === 'metric' ? 'concrete_bag_fr' : 'concrete_bag_us') : (unitSystem === 'metric' ? 'concrete_ready_mix_fr' : 'concrete_ready_mix_us');

  const { indicativePrice } = usePrice(materialId, priceUnit, 'concrete', purchaseFormat);
  
  const num = (v: any) => Number(v) || 0;
  const activePrice = price !== '' ? num(price) : (indicativePrice?.typicalPrice ?? null);

  const { baseVolume, withWaste } = calculateConcrete(num(length), num(width), num(depth), num(waste));
  const volumeToPurchase = withWaste;
  
  // Convert to weight only if density is explicitly provided
  const activeDensity = num(density);
  const requiredWeight = activeDensity > 0 ? volumeToPurchase * activeDensity : 0;
  
  const packageSize = indicativePrice?.packageSize ?? (unitSystem === 'metric' ? 35 : 60);
  const bagsRequired = purchaseFormat === 'bag' && activeDensity > 0 ? Math.ceil(requiredWeight / packageSize) : 0;
  const purchasedWeight = purchaseFormat === 'bag' ? bagsRequired * packageSize : 0;

  const cost = activePrice !== null ? (purchaseFormat === 'bag' ? bagsRequired * activePrice : volumeToPurchase * activePrice) : null;

  React.useEffect(() => {
    if (onStateChange) {
      onStateChange({ length, width, depth, waste, density: activeDensity, purchaseFormat, price, priceUnit, activePrice, concreteVolume: baseVolume, volumeToPurchase, requiredWeight, packageSize, bagsRequired, purchasedWeight, cost, priceSource: indicativePrice ? (indicativePrice.isDemo ? 'demo' : 'real') : 'none' });
    }
  }, [length, width, depth, waste, activeDensity, purchaseFormat, price, priceUnit, activePrice, baseVolume, volumeToPurchase, requiredWeight, packageSize, bagsRequired, purchasedWeight, cost, indicativePrice]);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';

  return (
    <div className={hideHeader ? '' : 'container'} style={{ padding: hideHeader ? '0' : '4rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      {!hideHeader && (
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
            <Box size={36} />
          </div>
          <div>
            <h1 style={{ marginBottom: '0.25rem', fontSize: '2.5rem' }}>{t('calc.concrete.title')}</h1>
            <p style={{ margin: 0, fontSize: '1.125rem' }}>{t('calc.concrete.description')}</p>
          </div>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <ConcreteDiagram />
          
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-navy)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'var(--color-surface-alt)', borderRadius: '99px' }}>1</span>
            {t('calc.step1')}
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label={t('calc.inputs.length')} unit={unitL} value={length} onChange={setLength} />
            <Input label={t('calc.inputs.width')} unit={unitL} value={width} onChange={setWidth} />
          </div>
          <Input label={t('calc.inputs.depth')} unit={unitL} value={depth} onChange={setDepth} />
          
          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-navy)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'var(--color-surface-alt)', borderRadius: '99px' }}>2</span>
            {t('calc.step2')}
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">{t('calc.inputs.purchaseFormat', 'Purchase Format')}</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="purchaseFormat" value="ready_mix" checked={purchaseFormat === 'ready_mix'} onChange={() => { setPurchaseFormat('ready_mix'); setPrice(''); }} />
                {t('calc.inputs.readyMix', 'Ready-mix')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="purchaseFormat" value="bag" checked={purchaseFormat === 'bag'} onChange={() => { setPurchaseFormat('bag'); setPrice(''); }} />
                {t('calc.inputs.bags', 'Bags')}
              </label>
            </div>
          </div>
          <div className="grid-cols-2 grid" style={{ gap: '1rem', marginBottom: '2rem' }}>
            <Input label={t('calc.waste')} unit="%" value={waste} onChange={setWaste} />
            {purchaseFormat === 'bag' && (
              <Input label={t('calc.inputs.density', 'Density')} unit={unitSystem === 'metric' ? 'kg/m³' : 'lb/cu yd'} value={density} onChange={setDensity} />
            )}
          </div>

          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-navy)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'var(--color-surface-alt)', borderRadius: '99px' }}>3</span>
            {t('calc.step3', 'COST ESTIMATION')}
          </h3>
          <PriceInput 
            materialId={materialId} 
            materialFamily="concrete"
            productForm={purchaseFormat}
            unit={priceUnit} 
            value={price} 
            onChange={setPrice} 
          />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 800, padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', color: 'var(--color-primary-light)' }}>3</span>
              {withWaste > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-primary)' }}><CheckCircle2 size={16} /> {t('calc.estimateReady')}</span>}
            </div>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 600 }}>{t('calc.yourEstimate')}</div>
              {purchaseFormat === 'bag' && activeDensity > 0 ? (
                <>
                  <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem', transition: 'var(--transition)' }}>
                    {bagsRequired} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{t('calc.inputs.bags', 'bags')}</span>
                  </div>
                  <div style={{ color: '#cbd5e1' }}>
                    {t('calc.outputs.purchasedWeight', 'Purchased weight')}: {purchasedWeight.toFixed(2)} {unitW}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem', transition: 'var(--transition)' }}>
                    {volumeToPurchase.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitV}</span>
                  </div>
                  <div style={{ color: '#cbd5e1' }}>{t('copy.concrete.base', { val: `${baseVolume.toFixed(2)} ${unitV}` })} (+{waste}%)</div>
                </>
              )}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>{t('calc.materialCost')}</div>
              {cost !== null ? (
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', transition: 'var(--transition)' }}>
                  {currency} {cost.toFixed(2)}
                </div>
              ) : (
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#94a3b8' }}>
                  {t('calc.unavailable', 'Unavailable')}
                </div>
              )}
            </div>

            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
              <Copy size={18} /> {t('btn.copy')}
            </button>
          </div>
        </div>
      </div>
      
      {!hideHeader && (
        <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)', maxWidth: '800px' }}>
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>{t('calc.concrete.howItWorks')}</h2>
          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.concrete.howItWorksDesc')}</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.concrete.formula')}</h3>
            <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
              {t('calc.concrete.formula')}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.concrete.example')}</h3>
            <p style={{ marginBottom: '1rem' }}>{t('calc.concrete.exampleDesc')}</p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.concrete.ex1')}</strong></li>
            </ul>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.concrete.tips')}</h3>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.concrete.tipsDesc')}</p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.concrete.ex2')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.concrete.ex3')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.concrete.ex4')}</strong></li>
            </ul>
          </div>

          <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '3rem', border: '1px solid var(--color-border)' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>{t('calc.concrete.disclaimer')}</h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{t('calc.concrete.disclaimer')}</p>
          </div>

        </div>
      )}

      {!hideHeader && <RelatedCalculators related={['area', 'gravel', 'tile']} />}
    </div>
  );
};