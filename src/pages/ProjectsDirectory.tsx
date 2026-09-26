import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { PROJECTS_REGISTRY } from '../projects/registry';
import { ProjectWorkflow } from '../projects/engine/ProjectWorkflow';
import type { ProjectState } from '../projects/types';
import { ArrowRight, Trash2, Plus } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ProjectsDirectory = () => {
  const { t, country, currency, unitSystem } = useSettings();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  // Load saved projects
  const [savedProjects, setSavedProjects] = useState<Record<string, ProjectState>>(() => {
    return JSON.parse(localStorage.getItem('hpc_projects') || '{}');
  });

  const handleStartNew = (projectTypeId: string) => {
    const id = Date.now().toString();
    const newProject: ProjectState = {
      id,
      projectTypeId,
      name: t(PROJECTS_REGISTRY[projectTypeId].titleKey),
      country,
      currency,
      units: unitSystem,
      inputs: {},
      results: {},
      manualPrices: {},
      completedSteps: [],
      currentStepId: PROJECTS_REGISTRY[projectTypeId].steps[0].id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const updated = { ...savedProjects, [id]: newProject };
    setSavedProjects(updated);
    localStorage.setItem('hpc_projects', JSON.stringify(updated));
    setActiveProjectId(id);
  };

  const handleResume = (id: string) => {
    setActiveProjectId(id);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('projects.confirmDelete') || 'Delete this project?')) {
      const updated = { ...savedProjects };
      delete updated[id];
      setSavedProjects(updated);
      localStorage.setItem('hpc_projects', JSON.stringify(updated));
    }
  };

  if (activeProjectId && savedProjects[activeProjectId]) {
    const project = savedProjects[activeProjectId];
    const def = PROJECTS_REGISTRY[project.projectTypeId];
    return (
      <ProjectWorkflow 
        projectDef={def} 
        initialState={project} 
        onExit={() => {
          setActiveProjectId(null);
          setSavedProjects(JSON.parse(localStorage.getItem('hpc_projects') || '{}'));
        }} 
      />
    );
  }

  const savedList = Object.values(savedProjects).sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <Breadcrumbs items={[{ label: t('nav.projects') }]} />
      <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{t('nav.projects')}</h1>
      
      {savedList.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            {t('projects.myProjects') || 'My Projects'}
          </h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {savedList.map(p => {
              const def = PROJECTS_REGISTRY[p.projectTypeId];
              if (!def) return null;
              
              const progress = Math.round((p.completedSteps.length / def.steps.length) * 100);
              
              return (
                <div key={p.id} className="card" style={{ padding: '1.5rem', position: 'relative' }}>
                  <button onClick={() => handleDelete(p.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                    <Trash2 size={18} />
                  </button>
                  <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{def.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.name}</h3>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    {progress}% complete • Last updated {new Date(p.updatedAt).toLocaleDateString()}
                  </div>
                  
                  <div style={{ height: '4px', background: 'var(--color-surface-alt)', borderRadius: '2px', marginBottom: '1.5rem' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '2px' }}></div>
                  </div>
                  
                  <button onClick={() => handleResume(p.id)} className="btn btn-primary" style={{ width: '100%' }}>
                    {t('projects.resume') || 'Continue Project'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          {t('projects.startNew') || 'Start a new project'}
        </h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {Object.values(PROJECTS_REGISTRY).map(def => (
            <div key={def.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '1rem', padding: '1rem', background: 'var(--color-primary-light)', display: 'inline-block', borderRadius: '12px', width: 'fit-content' }}>
                {def.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t(def.titleKey)}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flex: 1 }}>{t(def.descKey)}</p>
              
              <button onClick={() => handleStartNew(def.id)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                <Plus size={18} /> {t('projects.start') || 'Start'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
