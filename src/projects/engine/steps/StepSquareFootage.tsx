import React from 'react';
import { useProject } from '../ProjectContext';
import { SquareFootageCalculator } from '../../../pages/SquareFootageCalculator';
import { useSettings } from '../../../contexts/SettingsContext';

export const StepSquareFootage = () => {
  const { state, updateInputs, updateResults } = useProject();
  const { t } = useSettings();
  
  if (!state) return null;

  const handleStateChange = (calcState: any) => {
    updateInputs({
      length: calcState.length,
      width: calcState.width
    });
    updateResults({
      area: calcState.area
    });
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('calc.area.title')}</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
        {t('calc.area.description')}
      </p>
      
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <SquareFootageCalculator 
          hideHeader={true}
          initialLength={state.inputs.length || ''}
          initialWidth={state.inputs.width || ''}
          onStateChange={handleStateChange}
        />
      </div>
    </div>
  );
};
