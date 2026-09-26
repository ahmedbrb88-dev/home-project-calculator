import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateTile } from '../calculations/tile';
import { Input } from '../components/ui/Input';
import { PriceInput } from '../components/PriceInput';
import { usePrice } from '../hooks/usePrice';
import { Grid2x2, Copy, ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedCalculators } from '../components/RelatedCalculators';
import { Link } from 'react-router-dom';

export const TileCalculator = ({
  initialRoomL,
  initialRoomW,
  initialTileL,
  initialTileW,
  initialWaste,
  initialPricePerBox,
  initialTilesPerBox,
  onStateChange,
  hideHeader
}: any = {}) => {
  const { unitSystem, currency, t } = useSettings();
  const [roomL, setRoomL] = useState(initialRoomL ?? 4);
  const [roomW, setRoomW] = useState(initialRoomW ?? 3);
  const [tileL, setTileL] = useState(initialTileL ?? 0.3);
  const [tileW, setTileW] = useState(initialTileW ?? 0.3);
  const [waste, setWaste] = useState(initialWaste ?? 10);
  const [purchaseFormat, setPurchaseFormat] = useState<'m2' | 'box'>('box');
  const [pricePerUnit, setPricePerUnit] = useState<string>(initialPricePerBox?.toString() ?? '');
  const [tilesPerBox, setTilesPerBox] = useState(initialTilesPerBox ?? 10);

  const priceUnit = purchaseFormat === 'box' ? 'box' : (unitSystem === 'metric' ? 'm²' : 'sq_ft');
  const materialId = purchaseFormat === 'box' ? (unitSystem === 'metric' ? 'ceramic_tile_box_fr' : 'ceramic_tile_box_us') : (unitSystem === 'metric' ? 'ceramic_tile_m2_fr' : 'ceramic_tile_sq_ft_us');

  const { indicativePrice } = usePrice(materialId, priceUnit, 'tile', purchaseFormat);
  const num = (v: any) => Number(v) || 0;
  const activePrice = pricePerUnit !== '' ? num(pricePerUnit) : (indicativePrice?.typicalPrice ?? null);

  const { area, tilesRequired } = calculateTile(roomL, roomW, tileL, tileW, 0); // calculate required without waste for base requirement
  const areaRequired = area;
  
  // Apply waste factor BEFORE box rounding
  const tilesToPurchaseWithWaste = Math.ceil(tilesRequired * (1 + num(waste) / 100));
  const areaToPurchase = areaRequired * (1 + num(waste) / 100);
  
  // Figure out areaPerBox
  const tileArea = num(tileL) * num(tileW);
  const areaPerBox = num(tilesPerBox) * tileArea;

  const boxes = Math.ceil(tilesToPurchaseWithWaste / (num(tilesPerBox) || 1));
  const purchasedArea = purchaseFormat === 'box' ? boxes * areaPerBox : areaToPurchase;

  const cost = activePrice !== null ? (purchaseFormat === 'box' ? boxes * activePrice : purchasedArea * activePrice) : null;

  React.useEffect(() => {
    if (onStateChange) {
      onStateChange({ roomL, roomW, tileL, tileW, waste, price: pricePerUnit, priceUnit, activePrice, tilesPerBox, areaRequired, areaToPurchase, boxesRequired: boxes, purchasedArea, purchaseFormat, cost, priceSource: indicativePrice ? (indicativePrice.isDemo ? 'demo' : 'real') : 'none', areaPerBox });
    }
  }, [roomL, roomW, tileL, tileW, waste, pricePerUnit, priceUnit, activePrice, tilesPerBox, areaRequired, areaToPurchase, boxes, purchasedArea, purchaseFormat, cost, indicativePrice, areaPerBox]);

  const unitL = unitSystem === 'metric' ? 'm' : 'ft';
  const unitA = unitSystem === 'metric' ? 'm²' : 'sq ft';

  return (
    <div className={hideHeader ? '' : 'container'} style={{ padding: hideHeader ? '0' : '4rem 1.5rem' }}>
      
      {!hideHeader && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '16px' }}>
            <Grid2x2 size={32} />
          </div>
          <div>
            <h1 style={{ marginBottom: '0.25rem', fontSize: '2rem' }}>{t('calc.tile.title')}</h1>
            <p style={{ margin: 0 }}>{t('calc.tile.description')}</p>
          </div>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
            {t('calc.step1')}
          </h3>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label={t('calc.inputs.length')} unit={unitL} value={roomL} onChange={setRoomL} />
            <Input label={t('calc.inputs.width')} unit={unitL} value={roomW} onChange={setRoomW} />
          </div>
          
          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
            {t('calc.step2')}
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">{t('calc.inputs.purchaseFormat', 'Purchase Format')}</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="purchaseFormat" value="m2" checked={purchaseFormat === 'm2'} onChange={() => { setPurchaseFormat('m2'); setPricePerUnit(''); }} />
                {unitSystem === 'metric' ? t('calc.inputs.perM2', 'Per m²') : t('calc.inputs.perSqFt', 'Per sq. ft.')}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="purchaseFormat" value="box" checked={purchaseFormat === 'box'} onChange={() => { setPurchaseFormat('box'); setPricePerUnit(''); }} />
                {t('calc.inputs.perBox', 'Per box')}
              </label>
            </div>
          </div>
          <div className="grid-cols-2 grid" style={{ gap: '1rem' }}>
            <Input label={t('calc.inputs.length')} unit={unitL} value={tileL} onChange={setTileL} />
            <Input label={t('calc.inputs.width')} unit={unitL} value={tileW} onChange={setTileW} />
            <Input label={t('calc.tilesPerBox')} unit="qty" value={tilesPerBox} onChange={setTilesPerBox} />
            <Input label={t('calc.waste')} unit="%" value={waste} onChange={setWaste} />
          </div>

          <h3 style={{ margin: '3rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>3</span>
            {t('calc.step3')}
          </h3>
          <PriceInput 
            materialId={materialId} 
            materialFamily="tile"
            productForm={purchaseFormat}
            unit={priceUnit} 
            value={pricePerUnit} 
            onChange={setPricePerUnit} 
          />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--color-navy)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
            <span className="eyebrow" style={{ color: 'var(--color-primary-light)', display: 'block', marginBottom: '1rem' }}>{t('calc.tile.yourEstimate')}</span>
            
            <div style={{ marginBottom: '3rem' }}>
              {purchaseFormat === 'box' ? (
                <>
                  <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                    {boxes} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{t('calc.outputs.boxesRequired', 'boxes')}</span>
                  </div>
                  <div style={{ color: '#cbd5e1' }}>{t('calc.outputs.purchasedArea', 'Purchased area')}: {purchasedArea.toFixed(2)} {unitA}</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
                    {purchasedArea.toFixed(2)} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#94a3b8' }}>{unitA}</span>
                  </div>
                  <div style={{ color: '#cbd5e1' }}>{t('calc.outputs.areaToPurchase', 'Area to purchase')}</div>
                </>
              )}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>{t('calc.tile.estimatedCost')}</div>
              {cost !== null ? (
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
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
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>{t('calc.tile.howItWorks')}</h2>
          <div style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.tile.howItWorksDesc')}</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.tile.formula')}</h3>
            <div style={{ background: 'var(--color-surface-alt)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, border: '1px solid var(--color-border)' }}>
              (Room Area ÷ Single Tile Area) × (1 + Waste Percentage) = Total Tiles
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.tile.example')}</h3>
            <p style={{ marginBottom: '1rem' }}>{t('calc.tile.exampleDesc')}</p>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--color-primary)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.tile.ex1')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.tile.ex2')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.tile.ex3')}</strong></li>
              <li style={{ marginBottom: '0.5rem' }}><strong>{t('calc.tile.ex4')}</strong></li>
            </ul>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2.5rem', color: 'var(--color-navy)' }}>{t('calc.tile.whyWaste')}</h3>
            <p style={{ marginBottom: '1.5rem' }}>{t('calc.tile.whyWasteDesc')}</p>
          </div>
        </div>
      )}

      {!hideHeader && <RelatedCalculators related={['area', 'paint']} />}
    </div>
  );
};