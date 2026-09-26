import React from 'react';
import { useProject } from '../ProjectContext';
import { useSettings } from '../../../contexts/SettingsContext';

export const StepDetails = () => {
  const { state, updateInputs } = useProject();
  const { t } = useSettings();

  if (!state) return null;

  // Let's store customName in inputs
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{t('projects.details.title', 'Project Details')}</h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
        {t('projects.details.desc', "Let's start by giving your project a name. This will help you identify it later in your saved projects.")}
      </p>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('projects.details.name', 'Project Name')}</label>
          <input 
            type="text" 
            value={state.inputs.customName ?? state.name} 
            onChange={(e) => updateInputs({ customName: e.target.value })}
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem' }}
            placeholder={t('projects.details.placeholder', 'e.g. Master Bathroom Renovation')}
          />
        </div>
      </div>
    </div>
  );
};
