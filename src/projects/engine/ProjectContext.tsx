import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ProjectState, ProjectDef } from '../types';
import { useSettings } from '../../contexts/SettingsContext';

interface ProjectContextType {
  state: ProjectState | null;
  projectDef: ProjectDef | null;
  updateInputs: (inputs: Record<string, any>) => void;
  updateResults: (results: Record<string, any>) => void;
  setManualPrice: (itemKey: string, price: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (stepId: string) => void;
  saveAndExit: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ 
  projectDef, 
  initialState, 
  children,
  onExit
}: { 
  projectDef: ProjectDef, 
  initialState: ProjectState, 
  children: React.ReactNode,
  onExit: () => void
}) => {
  const [state, setState] = useState<ProjectState>(initialState);
  
  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (state) {
      const saved = JSON.parse(localStorage.getItem('hpc_projects') || '{}');
      saved[state.id] = state;
      localStorage.setItem('hpc_projects', JSON.stringify(saved));
    }
  }, [state]);

  const updateInputs = (inputs: Record<string, any>) => {
    setState(s => ({ ...s, inputs: { ...s.inputs, ...inputs }, updatedAt: Date.now() }));
  };

  const updateResults = (results: Record<string, any>) => {
    setState(s => ({ ...s, results: { ...s.results, ...results }, updatedAt: Date.now() }));
  };

  const setManualPrice = (itemKey: string, price: number) => {
    setState(s => ({ 
      ...s, 
      manualPrices: { ...s.manualPrices, [itemKey]: price },
      updatedAt: Date.now() 
    }));
  };

  const currentIndex = projectDef.steps.findIndex(s => s.id === state.currentStepId);

  const goToNextStep = () => {
    if (currentIndex < projectDef.steps.length - 1) {
      const nextStep = projectDef.steps[currentIndex + 1];
      setState(s => {
        const completed = new Set(s.completedSteps);
        completed.add(s.currentStepId);
        return { 
          ...s, 
          currentStepId: nextStep.id, 
          completedSteps: Array.from(completed),
          updatedAt: Date.now() 
        };
      });
    }
  };

  const goToPrevStep = () => {
    if (currentIndex > 0) {
      const prevStep = projectDef.steps[currentIndex - 1];
      setState(s => ({ ...s, currentStepId: prevStep.id, updatedAt: Date.now() }));
    }
  };

  const goToStep = (stepId: string) => {
    const targetIndex = projectDef.steps.findIndex(s => s.id === stepId);
    if (targetIndex !== -1) {
      // Allow going to any completed step, or the furthest reached step.
      const isCompleted = state.completedSteps.includes(stepId);
      const furthestReached = projectDef.steps.findIndex(s => !state.completedSteps.includes(s.id));
      if (isCompleted || targetIndex <= furthestReached || furthestReached === -1) {
        setState(s => ({ ...s, currentStepId: stepId, updatedAt: Date.now() }));
      }
    }
  };

  const saveAndExit = () => {
    onExit();
  };

  return (
    <ProjectContext.Provider value={{
      state, projectDef, updateInputs, updateResults, setManualPrice, goToNextStep, goToPrevStep, goToStep, saveAndExit
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
