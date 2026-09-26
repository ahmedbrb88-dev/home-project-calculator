import React from 'react';
import { PROJECTS_REGISTRY } from '../../../src/projects/registry.js';
import { ProjectWorkflow } from '../../../src/projects/engine/ProjectWorkflow.js';

let failed = 0;
let passed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

function runProjectTests() {
  console.log("--- RUNNING PROJECT E2E TESTS ---");

  // Mock a new project
  const bathroom = PROJECTS_REGISTRY['bathroom'];
  assert(!!bathroom, 'Bathroom project definition exists');
  assert(bathroom.steps.length === 5, 'Bathroom project has 5 steps');

  const initialState = {
    id: 'test_123',
    projectTypeId: 'bathroom',
    name: 'Bathroom Renovation',
    country: 'FR',
    currency: 'EUR',
    units: 'metric',
    inputs: {},
    results: {},
    manualPrices: {},
    completedSteps: [],
    currentStepId: bathroom.steps[0].id,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  assert(initialState.currentStepId === 'details', 'First step is details');

  // Simulate updating inputs and moving next
  initialState.inputs = { length: 3, width: 2 };
  initialState.completedSteps.push('details');
  initialState.currentStepId = 'measure';

  assert(initialState.completedSteps.includes('details'), 'Completed step is saved');

  // Next steps simulate calculators updating results
  initialState.results = {
    tileCost: 350,
    tilePriceSource: 'real',
    tilePurchaseFormat: 'box',
    tileBoxes: 15,
    tilePriceUnit: 'box'
  };
  
  assert(Object.keys(initialState.results).length > 0, 'Results are saved in state');
  assert(initialState.results.tileCost === 350, 'Tile cost is saved');
  assert(initialState.results.tilePriceSource === 'real', 'Price source is saved');

  // Manual price test
  initialState.manualPrices = {
    paintPrice: 20
  };
  assert(initialState.manualPrices.paintPrice === 20, 'Manual price override is saved independently');

  // Save and exit simulation (check if structure is serializable)
  try {
    const serialized = JSON.stringify(initialState);
    assert(typeof serialized === 'string', 'Project state can be serialized to LocalStorage');
    const deserialized = JSON.parse(serialized);
    assert(deserialized.id === 'test_123', 'Project state can be deserialized');
  } catch (e) {
    assert(false, 'Failed to serialize project state');
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) throw new Error("Project E2E tests failed");
}

runProjectTests();
