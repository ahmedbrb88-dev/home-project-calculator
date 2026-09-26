import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowRight, Box, Paintbrush, Grid2x2, Pickaxe, Ruler, Droplets, Home as HomeIcon, Trees, Car, BedDouble } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const PROJECTS: Record<string, any> = {
  patio: {
    id: 'patio',
    icon: <Box size={48} />,
    tools: [
      { step: 1, key: 'projects.step.measureArea', to: '/square-footage-calculator', icon: <Ruler size={24} /> },
      { step: 2, key: 'projects.step.estimateGravel', to: '/gravel-calculator', icon: <Pickaxe size={24} /> },
      { step: 3, key: 'projects.step.calcConcrete', to: '/concrete-calculator', icon: <Box size={24} /> }
    ],
    comingSoon: ['calc.paver']
  },
  bathroom: {
    id: 'bathroom',
    icon: <Droplets size={48} />,
    tools: [
      { step: 1, key: 'projects.step.measureFloor', to: '/square-footage-calculator', icon: <Ruler size={24} /> },
      { step: 2, key: 'projects.step.calcWallFloorTiles', to: '/tile-calculator', icon: <Grid2x2 size={24} /> },
      { step: 3, key: 'projects.step.estimateCeilingPaint', to: '/paint-calculator', icon: <Paintbrush size={24} /> }
    ],
    comingSoon: ['calc.grout', 'calc.drywall']
  },
  kitchen: {
    id: 'kitchen',
    icon: <HomeIcon size={48} />,
    tools: [
      { step: 1, key: 'projects.step.calcFloorTiles', to: '/tile-calculator', icon: <Grid2x2 size={24} /> },
      { step: 2, key: 'projects.step.estimateWallPaint', to: '/paint-calculator', icon: <Paintbrush size={24} /> }
    ],
    comingSoon: ['calc.backsplash', 'calc.cabinet']
  },
  garden: {
    id: 'garden',
    icon: <Trees size={48} />,
    tools: [
      { step: 1, key: 'projects.step.measureBeds', to: '/square-footage-calculator', icon: <Ruler size={24} /> },
      { step: 2, key: 'projects.step.calcDecoGravel', to: '/gravel-calculator', icon: <Pickaxe size={24} /> }
    ],
    comingSoon: ['calc.soil', 'calc.mulch', 'calc.fence']
  },
  driveway: {
    id: 'driveway',
    icon: <Car size={48} />,
    tools: [
      { step: 1, key: 'projects.step.estimateGravel', to: '/gravel-calculator', icon: <Pickaxe size={24} /> },
      { step: 2, key: 'projects.step.calcConcreteSimple', to: '/concrete-calculator', icon: <Box size={24} /> }
    ],
    comingSoon: ['calc.asphalt', 'calc.paver']
  },
  bedroom: {
    id: 'bedroom',
    icon: <BedDouble size={48} />,
    tools: [
      { step: 1, key: 'projects.step.measureRoom', to: '/square-footage-calculator', icon: <Ruler size={24} /> },
      { step: 2, key: 'projects.step.estimateWallPaint', to: '/paint-calculator', icon: <Paintbrush size={24} /> }
    ],
    comingSoon: ['calc.hardwood', 'calc.carpet']
  }
};

export const ProjectPage = () => {
  const { id } = useParams();
  const { t } = useSettings();
  const project = PROJECTS[id || ''];

  if (!project) {
    return <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>{t('common.projectNotFound')}</div>;
  }

  const projTitle = t(`projects.${project.id}.title`);
  const projDesc = t(`projects.${project.id}.desc`);

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <Breadcrumbs items={[{ label: t('nav.projects') }, { label: projTitle }]} />
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'var(--color-surface-alt)', color: 'var(--color-navy)', borderRadius: '50%', marginBottom: '1.5rem' }}>
          {project.icon}
        </div>
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{projTitle}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>{projDesc}</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>{t('common.recommendedTools')}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {project.tools.map((tool: any, i: number) => (
            <Link to={tool.to} key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', transition: 'var(--transition)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>0{tool.step}</div>
              <div style={{ color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '12px' }}>
                {tool.icon}
              </div>
              <div style={{ flex: 1, fontWeight: 600, fontSize: '1.125rem' }}>{t(tool.key)}</div>
              <ArrowRight size={20} color="var(--color-text-muted)" />
            </Link>
          ))}
          
          {project.comingSoon.map((toolKey: string, i: number) => (
            <div key={`soon-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'var(--color-surface-alt)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)', opacity: 0.8 }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-muted)', visibility: 'hidden' }}>00</div>
              <div style={{ flex: 1, fontWeight: 600, color: 'var(--color-text-muted)' }}>{t(toolKey)}</div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text-muted)', background: 'white', padding: '0.25rem 0.75rem', borderRadius: '99px' }}>{t('common.comingSoon')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
