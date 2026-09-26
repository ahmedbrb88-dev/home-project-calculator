import React from 'react';
import type { ProjectDef } from './types';
import { Droplets, Box, Home as HomeIcon, Trees, Car, BedDouble } from 'lucide-react';
import { StepSquareFootage } from './engine/steps/StepSquareFootage';
import { StepSummary } from './engine/steps/StepSummary';
import { StepDetails } from './engine/steps/StepDetails';
import { StepConcrete } from './engine/steps/StepConcrete';
import { StepGravel } from './engine/steps/StepGravel';
import { StepPaint } from './engine/steps/StepPaint';
import { StepTile } from './engine/steps/StepTile';

export const PROJECTS_REGISTRY: Record<string, ProjectDef> = {
  bathroom: {
    id: 'bathroom',
    titleKey: 'projects.bathroom.title',
    descKey: 'projects.bathroom.desc',
    categoryKey: 'projects.interior',
    icon: <Droplets size={32} />,
    steps: [
      { id: 'details', titleKey: 'projects.step.details', component: StepDetails },
      { id: 'measure', titleKey: 'projects.step.measureArea', component: StepSquareFootage },
      { id: 'tiles', titleKey: 'projects.step.calcWallFloorTiles', component: StepTile },
      { id: 'paint', titleKey: 'projects.step.estimateCeilingPaint', component: StepPaint },
      { id: 'summary', titleKey: 'projects.step.summary', component: StepSummary, isSummary: true }
    ]
  },
  patio: {
    id: 'patio',
    titleKey: 'projects.patio.title',
    descKey: 'projects.patio.desc',
    categoryKey: 'projects.exterior',
    icon: <Box size={32} />,
    steps: [
      { id: 'details', titleKey: 'projects.step.details', component: StepDetails },
      { id: 'measure', titleKey: 'projects.step.measureArea', component: StepSquareFootage },
      { id: 'gravel', titleKey: 'projects.step.estimateGravel', component: StepGravel },
      { id: 'concrete', titleKey: 'projects.step.calcConcrete', component: StepConcrete },
      { id: 'summary', titleKey: 'projects.step.summary', component: StepSummary, isSummary: true }
    ]
  }
};
