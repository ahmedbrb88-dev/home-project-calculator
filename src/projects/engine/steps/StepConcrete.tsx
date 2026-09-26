import React from 'react';
import { useProject } from '../ProjectContext';
import { ConcreteCalculator } from '../../../pages/ConcreteCalculator';
import { useSettings } from '../../../contexts/SettingsContext';

export const StepConcrete = () => {
  const { state, updateInputs, updateResults } = useProject();
  const { t } = useSettings();
  
  if (!state) return null;

  const handleStateChange = (calcState: any) => {
    updateInputs({
      concreteDepth: calcState.depth,
      concreteWaste: calcState.waste,
      concretePrice: calcState.price,
      length: calcState.length,
      width: calcState.width
    });
    
    updateResults({
      concreteVolume: calcState.concreteVolume,
      concreteVolumeToPurchase: calcState.volumeToPurchase,
      concretePurchaseFormat: calcState.purchaseFormat,
      concreteBagsRequired: calcState.bagsRequired,
      concretePurchasedWeight: calcState.purchasedWeight,
      concreteCost: calcState.cost,
      concretePriceUnit: calcState.priceUnit,
      concretePriceSource: calcState.priceSource,
      concretePrice: calcState.activePrice
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('calc.concrete.title')}</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
        {t('calc.concrete.description')}
      </p>
      
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <ConcreteCalculator 
          hideHeader={true}
          initialLength={state.inputs.length || ''}
          initialWidth={state.inputs.width || ''}
          initialDepth={state.inputs.concreteDepth || ''}
          initialWaste={state.inputs.concreteWaste || ''}
          initialPrice={state.inputs.concretePrice || ''}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};
