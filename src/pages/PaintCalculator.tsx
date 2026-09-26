import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { calculatePaint } from '../calculations/paint';
import { Input } from '../components/ui/Input';
import { PriceInput } from '../components/PriceInput';
import { usePrice } from '../hooks/usePrice';
import { PaintDiagram } from '../components/ui/Diagrams';
import { Paintbrush, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';

export const PaintCalculator = ({
  initialWallL,
  initialWallH,
  initialDoors,
  initialWindows,
  initialCoverage,
  initialCoats,
  initialPrice,
  onStateChange,
  hideHeader
}: any = {}) => {
  const { unitSystem, currency, t } = useSettings();
  const [wallL, setWallL] = useState<number | ''>(initialWallL ?? 5);
  const [wallH, setWallH] = useState<number | ''>(initialWallH ?? 2.5);
  const [doors, setDoors] = useState<number | ''>(initialDoors ?? 1);
  const [windows, setWindows] = useState<number | ''>(initialWindows ?? 1);
  const [coverage, setCoverage] = useState<number | ''>(initialCoverage ?? 10);
  const [coats, setCoats] = useState<number | ''>(initialCoats ?? 2);
  const [pricePerL, setPricePerL] = useState<string>(initialPrice?.toString() ?? '');
  const [purchaseFormat, setPurchaseFormat] = useState<'litre' | 'container'>('container');
  const unitV = unitSystem === 'metric' ? 'L' : 'gal';
  
  const priceUnit = purchaseFormat === 'container' ? 'container' : (unitSystem === 'metric' ? 'litre' : 'gallon');
  const materialId = purchaseFormat === 'container' ? (unitSystem === 'metric' ? 'paint_interior_container_fr' : 'paint_interior_container_us') : (unitSystem === 'metric' ? 'paint_interior_litre_fr' : 'paint_interior_gallon_us');

  const { indicativePrice } = usePrice(materialId, priceUnit, 'paint', purchaseFormat);
  
  const num = (v: any) => Number(v) || 0;
  const activePrice = pricePerL !== '' ? num(pricePerL) : (indicativePrice?.typicalPrice ?? null);

  // If indicative price has a coverage, use it as fallback
  const activeCoverage = num(coverage); // User input takes precedence

  const { totalLiters, paintableArea } = calculatePaint(num(wallL), num(wallH), num(doors), num(windows), activeCoverage, num(coats));
  const paintRequired = totalLiters;
  
  const containerSize = indicativePrice?.packageSize ?? (unitSystem === 'metric' ? 2.5 : 1);
  const containersRequired = purchaseFormat === 'container' ? Math.ceil(paintRequired / containerSize) : 0;
  const purchasedVolume = purchaseFormat === 'container' ? containersRequired * containerSize : paintRequired;

  const cost = activePrice !== null ? (purchaseFormat === 'container' ? containersRequired * activePrice : purchasedVolume * activePrice) : null;

  React.useEffect(() => {
    if (onStateChange) {
      onStateChange({ wallL, wallH, doors, windows, coverage: activeCoverage, coats, price: pricePerL, priceUnit, activePrice, paintArea: paintableArea, paintRequired, purchaseFormat, containerSize, containersRequired, purchasedVolume, cost, priceSource: indicativePrice ? (indicativePrice.isDemo ? 'demo' : 'real') : 'none' });
    }
  }, [wallL, wallH, doors, windows, activeCoverage, coats, pricePerL, priceUnit, activePrice, paintableArea, paintRequired, purchaseFormat, containerSize, containersRequired, purchasedVolume, cost, indicativePrice]);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitA = unitSystem === 'metric' ? 'm²' : 'sq ft';

  return (
    <div className={hideHeader ? '' : 'container'} style={{ padding: hideHeader ? '0' : '2rem 1.5rem', animation: 'fadeIn 0.4s ease-out' }}>
      {!hideHeader && <Breadcrumbs items={[{ label: 'Calculators', path: '/calculators' }, { label: 'Paint' }]} />}
      
      {!hideHeader && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
              <Paintbrush size={36} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{t('home.categories.interior', 'PAINTING')}</span>
              <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '2.5rem' }}>{t('calc.paint.title')}</h1>
              <p style={{ margin: 0, fontSize: '1.125rem' }}>{t('calc.paint.description')}</p>
            </div>
          </div>
          <Link to="/calculators" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
            <ArrowLeft size={16} /> {t('directory.all', 'All calculators')}
          </Link>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          
          <PaintDiagram />
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step1', 'WALL DIMENSIONS')}</h3>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label={t('calc.inputs.length') + ' *'} unit={unitL} value={wallL} onChange={setWallL} />
              <Input label={t('calc.inputs.height') + ' *'} unit={unitL} value={wallH} onChange={setWallH} />
              <div style={{ position: 'relative' }}>
                <Input label={t('calc.inputs.doors')} unit="qty" value={doors} onChange={setDoors} />
                <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('calc.optional', 'Optional')}</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Input label={t('calc.inputs.windows')} unit="qty" value={windows} onChange={setWindows} />
                <span style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('calc.optional', 'Optional')}</span>
              </div>
            </div>
          </div>
          
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step2', 'PAINT OPTIONS')}</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="input-label">{t('calc.inputs.purchaseFormat', 'Purchase Format')}</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="purchaseFormat" value="litre" checked={purchaseFormat === 'litre'} onChange={() => { setPurchaseFormat('litre'); setPricePerL(''); }} />
                  {unitSystem === 'metric' ? t('calc.inputs.perLitre', 'Per litre') : t('calc.inputs.perGallon', 'Per gallon')}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="purchaseFormat" value="container" checked={purchaseFormat === 'container'} onChange={() => { setPurchaseFormat('container'); setPricePerL(''); }} />
                  {t('calc.inputs.perContainer', 'Per container')}
                </label>
              </div>
            </div>
            <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
              <Input label={t('calc.paint.coverage', 'Coverage per L') + ' *'} unit={unitA + '/' + unitV} value={coverage} onChange={setCoverage} />
              <Input label={t('calc.inputs.coats')} unit="qty" value={coats} onChange={setCoats} />
            </div>
            {purchaseFormat === 'container' && (
              <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {t('calc.outputs.containerSize', 'Container size')}: {containerSize} {unitV}
              </div>
            )}
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-navy)' }}>{t('calc.step3', 'COST ESTIMATION')}</h3>
            <PriceInput 
              materialId={materialId} 
              materialFamily="paint"
              productForm={purchaseFormat === 'container' ? 'container' : (unitSystem === 'metric' ? 'litre' : 'gallon')}
              unit={priceUnit} 
              value={pricePerL} 
              onChange={setPricePerL} 
            />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 700 }}>{t('calc.yourEstimate', 'YOUR ESTIMATE')}</div>
              {purchaseFormat === 'container' ? (
                <>
                  <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                    {containersRequired} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{t('calc.outputs.containers', 'containers')}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                    {t('calc.outputs.purchasedVolume', 'Purchased volume')}: {purchasedVolume.toFixed(2)} {unitV}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>
                  {totalLiters.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitV}</span>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', fontWeight: 700 }}>{t('calc.whatNext', 'WHAT NEXT?')}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>{t('calc.inputs.area', 'Paintable area')}</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{paintableArea.toFixed(2)} {unitA}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8' }}>{t('calc.outputs.paintRequired', 'Paint required')}</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{paintRequired.toFixed(2)} {unitV}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#94a3b8' }}>{t('calc.materialCost', 'Estimated material cost')}</span>
                {cost !== null ? (
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>{currency} {cost.toFixed(2)}</span>
                ) : (
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#94a3b8' }}>{t('calc.unavailable', 'Unavailable')}</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ flex: 1, background: 'var(--color-primary)', color: 'white' }}>
                <Copy size={18} /> {t('btn.copy')}
              </button>
              <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => { setWallL(''); setWallH(''); setDoors(1); setWindows(1); setCoverage(10); setCoats(2); setPricePerL(''); }}>
                {t('calc.startOver', 'Start over')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      {!hideHeader && (
        <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--color-border)', maxWidth: '800px' }}>
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>{t('calc.paint.howItWorks')}</h2>
          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.paint.howItWorksDesc')}</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.paint.formula')}</h3>
            <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
              {t('calc.paint.formula')}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.paint.example')}</h3>
            <p style={{ marginBottom: '1rem' }}>{t('calc.paint.exampleDesc')}</p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.paint.ex1')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.paint.ex2')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.paint.ex3')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.paint.ex4')}</strong></li>
            </ul>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.paint.tips')}</h3>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.paint.tipsDesc')}</p>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.paint.disclaimer')}</p>
          </div>
        </div>
      )}

      {!hideHeader && <RelatedCalculators related={['area', 'tile']} />}
    </div>
  );
};
