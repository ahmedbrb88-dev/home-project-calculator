import React from 'react';
import { useProject } from './ProjectContext';
import { CheckCircle2, Circle, Save } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export const StepNavigation = () => {
  const { state, projectDef, goToStep, saveAndExit } = useProject();
  const { t } = useSettings();

  if (!state || !projectDef) return null;

  return (
    <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0', position: 'sticky', top: '72px', zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '4px', flex: 1 }}>
          {projectDef.steps.map((step, idx) => {
            const isCompleted = state.completedSteps.includes(step.id);
            const isActive = state.currentStepId === step.id;
            // A step is accessible if it's completed, active, or is the next uncompleted step
            const furthestReached = projectDef.steps.findIndex(s => !state.completedSteps.includes(s.id));
            const isAccessible = isCompleted || isActive || (idx <= furthestReached || furthestReached === -1);

            return (
              <button 
                key={step.id}
                onClick={() => goToStep(step.id)}
                disabled={!isAccessible}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  opacity: isAccessible ? 1 : 0.5,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-navy)',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  padding: '0.5rem 0'
                }}
              >
                {isCompleted ? <CheckCircle2 size={18} color="var(--color-primary)" /> : <Circle size={18} />}
                {t(step.titleKey)}
              </button>
            );
          })}
        </div>

        <button onClick={saveAndExit} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <Save size={16} /> {t('projects.nav.saveAndExit', 'Save & exit')}
        </button>
      </div>
    </div>
  );
};
