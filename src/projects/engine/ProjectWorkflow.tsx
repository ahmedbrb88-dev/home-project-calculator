import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { ProjectProvider, useProject } from './ProjectContext';
import { StepNavigation } from './StepNavigation';
import type { ProjectState, ProjectDef } from '../types';

const WorkflowContent = () => {
  const { state, projectDef, goToNextStep, goToPrevStep } = useProject();
  const { t } = useSettings();

  if (!state || !projectDef) return null;

  const currentStep = projectDef.steps.find(s => s.id === state.currentStepId);
  const currentIndex = projectDef.steps.findIndex(s => s.id === state.currentStepId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === projectDef.steps.length - 1;

  if (!currentStep) return <div>Invalid step</div>;

  const StepComponent = currentStep.component;

  return (
    <div style={{ paddingBottom: '6rem', minHeight: '80vh' }}>
      <StepNavigation />
      
      <div className="container" style={{ paddingTop: '2rem' }}>
        <StepComponent />
      </div>

      <div className="container" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          className="btn btn-outline" 
          onClick={goToPrevStep} 
          disabled={isFirst}
          style={{ visibility: isFirst ? 'hidden' : 'visible' }}
        >
          ← {t('projects.nav.back', 'Back')}
        </button>

        {!isLast && (
          <button className="btn btn-primary" onClick={goToNextStep}>
            {t('projects.nav.continue', 'Continue')} →
          </button>
        )}
      </div>
    </div>
  );
};

export const ProjectWorkflow = ({ 
  projectDef, 
  initialState, 
  onExit 
}: { 
  projectDef: ProjectDef, 
  initialState: ProjectState, 
  onExit: () => void 
}) => {
  return (
    <ProjectProvider projectDef={projectDef} initialState={initialState} onExit={onExit}>
      <WorkflowContent />
    </ProjectProvider>
  );
};
