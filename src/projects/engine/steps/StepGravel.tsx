import React from 'react';
import { useProject } from '../ProjectContext';
import { GravelCalculator } from '../../../pages/GravelCalculator';
import { useSettings } from '../../../contexts/SettingsContext';

export const StepGravel = () => {
  const { state, updateInputs, updateResults } = useProject();
  const { t } = useSettings();
  
  if (!state) return null;

  const handleStateChange = (calcState: any) => {
    updateInputs({
      gravelDepth: calcState.depth,
      gravelDensity: calcState.density,
      gravelPrice: calcState.price
    });
    // We already have length/width from square footage step, but GravelCalculator maintains its own unless fed.
    // To keep it synced with project measurements, we feed it initialLength/Width from state.inputs
    // and if the user changes it in Gravel, it updates state.inputs.length/width too.
    updateInputs({
      length: calcState.length,
      width: calcState.width
    });
    
    updateResults({
      gravelVolume: calcState.volume,
      gravelWeight: calcState.weight,
      gravelPurchaseFormat: calcState.purchaseFormat,
      gravelBagsRequired: calcState.bagsRequired,
      gravelPurchasedWeight: calcState.purchasedWeight,
      gravelCost: calcState.cost,
      gravelPriceUnit: calcState.priceUnit,
      gravelPriceSource: calcState.priceSource,
      gravelPrice: calcState.activePrice
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('calc.gravel.title')}</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
        {t('calc.gravel.description')}
      </p>
      
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <GravelCalculator 
          hideHeader={true}
          initialLength={state.inputs.length || ''}
          initialWidth={state.inputs.width || ''}
          initialDepth={state.inputs.gravelDepth || ''}
          initialDensity={state.inputs.gravelDensity || ''}
          initialPrice={state.inputs.gravelPrice || ''}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};
