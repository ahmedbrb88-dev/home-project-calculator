const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

write('src/pages/PaintCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculatePaint } from '../calculations/paint';

export const PaintCalculator = () => {
  const { unitSystem } = useSettings();
  const [length, setLength] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [walls, setWalls] = useState(4);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(1);
  const [coats, setCoats] = useState(2);
  const [waste, setWaste] = useState(10);

  const { area, paintRequired } = calculatePaint(length, height, walls, doors, windows, coats, waste);

  return (
    <div className="container main-content">
      <h1>Paint Calculator</h1>
      <div className="grid grid-cols-2">
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
          <h3>Inputs</h3>
          <label>Wall length ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Wall height ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Number of walls</label>
          <input type="number" value={walls} onChange={e => setWalls(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Doors</label>
          <input type="number" value={doors} onChange={e => setDoors(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Windows</label>
          <input type="number" value={windows} onChange={e => setWindows(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Number of coats</label>
          <input type="number" value={coats} onChange={e => setCoats(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Waste %</label>
          <input type="number" value={waste} onChange={e => setWaste(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
        </div>
        <div style={{ background: '#2563eb', color: '#fff', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <h3>YOUR RESULT</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, margin: '2rem 0' }}>{paintRequired.toFixed(2)} Liters</div>
          <div style={{ fontSize: '1.5rem' }}>Area to paint: {area.toFixed(2)} {unitSystem === 'metric' ? 'm²' : 'sq ft'}</div>
        </div>
      </div>
    </div>
  );
};
`);

write('src/pages/GravelCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateGravel } from '../calculations/gravel';

export const GravelCalculator = () => {
  const { unitSystem } = useSettings();
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(5);
  const [depth, setDepth] = useState(0.05);
  const [waste, setWaste] = useState(5);

  const { volume, weight } = calculateGravel(length, width, depth, waste);

  return (
    <div className="container main-content">
      <h1>Gravel Calculator</h1>
      <div className="grid grid-cols-2">
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
          <h3>Inputs</h3>
          <label>Length ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Width ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Depth ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Waste %</label>
          <input type="number" value={waste} onChange={e => setWaste(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
        </div>
        <div style={{ background: '#2563eb', color: '#fff', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <h3>YOUR RESULT</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, margin: '2rem 0' }}>{volume.toFixed(2)} {unitSystem === 'metric' ? 'm³' : 'cu ft'}</div>
          <div style={{ fontSize: '1.5rem' }}>Estimated Weight: {weight.toFixed(2)} tons</div>
        </div>
      </div>
    </div>
  );
};
`);

write('src/pages/TileCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateTile } from '../calculations/tile';

export const TileCalculator = () => {
  const { unitSystem } = useSettings();
  const [roomL, setRoomL] = useState(4);
  const [roomW, setRoomW] = useState(3);
  const [tileL, setTileL] = useState(0.3);
  const [tileW, setTileW] = useState(0.3);
  const [waste, setWaste] = useState(10);

  const { area, tilesRequired } = calculateTile(roomL, roomW, tileL, tileW, waste);

  return (
    <div className="container main-content">
      <h1>Tile Calculator</h1>
      <div className="grid grid-cols-2">
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
          <h3>Inputs</h3>
          <label>Room Length ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={roomL} onChange={e => setRoomL(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Room Width ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={roomW} onChange={e => setRoomW(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Tile Length ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={tileL} onChange={e => setTileL(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Tile Width ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={tileW} onChange={e => setTileW(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Waste %</label>
          <input type="number" value={waste} onChange={e => setWaste(Number(e.target.value))} style={{ display: 'block', width: '100%' }} />
        </div>
        <div style={{ background: '#2563eb', color: '#fff', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <h3>YOUR RESULT</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, margin: '2rem 0' }}>{tilesRequired} Tiles</div>
          <div style={{ fontSize: '1.5rem' }}>Room Area: {area.toFixed(2)} {unitSystem === 'metric' ? 'm²' : 'sq ft'}</div>
        </div>
      </div>
    </div>
  );
};
`);

write('src/pages/SquareFootageCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateArea } from '../calculations/area';

export const SquareFootageCalculator = () => {
  const { unitSystem } = useSettings();
  const [length, setLength] = useState(5);
  const [width, setWidth] = useState(4);

  const area = calculateArea(length, width);

  return (
    <div className="container main-content">
      <h1>Square Footage Calculator</h1>
      <div className="grid grid-cols-2">
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px' }}>
          <h3>Inputs</h3>
          <label>Length ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
          <label>Width ({unitSystem === 'metric' ? 'm' : 'ft'})</label>
          <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ display: 'block', width: '100%', marginBottom: '1rem' }} />
        </div>
        <div style={{ background: '#2563eb', color: '#fff', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
          <h3>YOUR RESULT</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, margin: '2rem 0' }}>{area.toFixed(2)} {unitSystem === 'metric' ? 'm²' : 'sq ft'}</div>
        </div>
      </div>
    </div>
  );
};
`);

write('src/App.tsx', `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ConcreteCalculator } from './pages/ConcreteCalculator';
import { PaintCalculator } from './pages/PaintCalculator';
import { GravelCalculator } from './pages/GravelCalculator';
import { TileCalculator } from './pages/TileCalculator';
import { SquareFootageCalculator } from './pages/SquareFootageCalculator';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
          <Route path="/paint-calculator" element={<PaintCalculator />} />
          <Route path="/gravel-calculator" element={<GravelCalculator />} />
          <Route path="/tile-calculator" element={<TileCalculator />} />
          <Route path="/square-footage-calculator" element={<SquareFootageCalculator />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
`);

console.log("Calculators added successfully!");
