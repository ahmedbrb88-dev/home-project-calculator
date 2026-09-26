import React from 'react';
import { useProject } from '../ProjectContext';
import { PaintCalculator } from '../../../pages/PaintCalculator';
import { useSettings } from '../../../contexts/SettingsContext';

export const StepPaint = () => {
  const { state, updateInputs, updateResults } = useProject();
  const { t } = useSettings();
  
  if (!state) return null;

  const handleStateChange = (calcState: any) => {
    updateInputs({
      paintWallL: calcState.wallL,
      paintWallH: calcState.wallH,
      paintDoors: calcState.doors,
      paintWindows: calcState.windows,
      paintCoverage: calcState.coverage,
      paintCoats: calcState.coats,
      paintPricePerL: calcState.pricePerL
    });
    
    updateResults({
      paintLiters: calcState.paintRequired,
      paintContainers: calcState.containersRequired,
      paintPurchaseFormat: calcState.purchaseFormat,
      paintPurchasedVolume: calcState.purchasedVolume,
      paintCost: calcState.cost,
      paintPriceUnit: calcState.priceUnit,
      paintPriceSource: calcState.priceSource,
      paintPrice: calcState.activePrice
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('calc.paint.title')}</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
        {t('calc.paint.description')}
      </p>
      
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <PaintCalculator 
          hideHeader={true}
          initialWallL={state.inputs.paintWallL || state.inputs.length || ''} // Fallback to room length if not set
          initialWallH={state.inputs.paintWallH || ''}
          initialDoors={state.inputs.paintDoors || ''}
          initialWindows={state.inputs.paintWindows || ''}
          initialCoverage={state.inputs.paintCoverage || ''}
          initialCoats={state.inputs.paintCoats || ''}
          initialPrice={state.inputs.paintPricePerL || ''}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};
