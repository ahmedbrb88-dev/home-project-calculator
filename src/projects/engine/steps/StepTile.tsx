import React from 'react';
import { useProject } from '../ProjectContext';
import { TileCalculator } from '../../../pages/TileCalculator';
import { useSettings } from '../../../contexts/SettingsContext';

export const StepTile = () => {
  const { state, updateInputs, updateResults } = useProject();
  const { t } = useSettings();
  
  if (!state) return null;

  const handleStateChange = (calcState: any) => {
    updateInputs({
      tileL: calcState.tileL,
      tileW: calcState.tileW,
      tileWaste: calcState.waste,
      tilePricePerBox: calcState.pricePerBox,
      tilesPerBox: calcState.tilesPerBox,
      length: calcState.roomL,
      width: calcState.roomW
    });
    
    updateResults({
      tilesRequired: calcState.tilesRequired,
      tileBoxes: calcState.boxes,
      tileCost: calcState.cost,
      tilePurchaseFormat: calcState.purchaseFormat,
      tilePurchasedArea: calcState.purchasedArea,
      tilePriceUnit: calcState.priceUnit,
      tilePriceSource: calcState.priceSource,
      tilePrice: calcState.activePrice
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('calc.tile.title')}</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
        {t('calc.tile.description')}
      </p>
      
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TileCalculator 
          hideHeader={true}
          initialRoomL={state.inputs.length || ''}
          initialRoomW={state.inputs.width || ''}
          initialTileL={state.inputs.tileL || ''}
          initialTileW={state.inputs.tileW || ''}
          initialWaste={state.inputs.tileWaste || ''}
          initialPricePerBox={state.inputs.tilePricePerBox || ''}
          initialTilesPerBox={state.inputs.tilesPerBox || ''}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};
