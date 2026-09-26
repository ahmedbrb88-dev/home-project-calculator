const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// =======================
// TRANSLATIONS
// =======================
write('src/translations/en.json', `{
  "common": {
    "search": "Search calculators...",
    "explore": "Explore calculators",
    "find": "Find a calculator",
    "what_do_you_need": "What do you need to calculate?",
    "you_may_also_need": "You may also need",
    "results_estimate": "Results are estimates for planning purposes only. Actual material requirements may vary depending on product specifications, installation methods, surface conditions and local requirements.",
    "how_it_works": "How it works",
    "example_calculation": "Example calculation",
    "faq": "FAQ",
    "copy_result": "Copy result",
    "reset": "Reset",
    "advanced_options": "Advanced options",
    "waste_extra": "Waste / Extra %",
    "add_local_price": "Add your local price",
    "estimated_cost": "Estimated cost"
  },
  "nav": {
    "home": "Home",
    "calculators": "Calculators",
    "categories": "Categories",
    "about": "About",
    "contact": "Contact"
  },
  "categories": {
    "concrete": "Concrete",
    "concrete_desc": "Calculate concrete volume and material requirements.",
    "painting": "Painting",
    "painting_desc": "Calculate paint requirements and cost.",
    "flooring_tiles": "Flooring & Tiles",
    "flooring_tiles_desc": "Calculate tiles for any area.",
    "landscaping": "Landscaping",
    "landscaping_desc": "Calculate gravel, mulch, and soil.",
    "measurements": "Measurements",
    "measurements_desc": "Area and volume conversions."
  },
  "calculators": {
    "concrete": {
      "title": "Concrete Calculator",
      "length": "Length",
      "width": "Width",
      "depth": "Depth",
      "concrete_required": "Concrete required",
      "with_waste": "With waste"
    },
    "paint": {
      "title": "Paint Calculator",
      "wall_length": "Wall length",
      "wall_height": "Wall height",
      "number_of_walls": "Number of walls",
      "doors": "Doors",
      "windows": "Windows",
      "number_of_coats": "Number of coats",
      "paint_required": "Paint required"
    },
    "gravel": {
      "title": "Gravel Calculator",
      "length": "Length",
      "width": "Width",
      "depth": "Depth",
      "volume": "Volume",
      "estimated_weight": "Estimated weight"
    },
    "tile": {
      "title": "Tile Calculator",
      "room_length": "Room length",
      "room_width": "Room width",
      "tile_length": "Tile length",
      "tile_width": "Tile width",
      "area": "Area",
      "tiles_required": "Tiles required"
    },
    "square_footage": {
      "title": "Square Footage Calculator",
      "length": "Length",
      "width": "Width",
      "result_sqm": "Result (m²)",
      "result_sqft": "Result (sq ft)"
    }
  }
}`);

// =======================
// CONTEXTS
// =======================
write('src/contexts/SettingsContext.tsx', `
import React, { createContext, useContext, useState, useEffect } from 'react';

type UnitSystem = 'metric' | 'imperial';
type SettingsContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  country: string;
  setCountry: (country: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  unitSystem: UnitSystem;
  setUnitSystem: (sys: UnitSystem) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [country, setCountry] = useState(localStorage.getItem('country') || 'US');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>((localStorage.getItem('unitSystem') as UnitSystem) || 'imperial');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => localStorage.setItem('country', country), [country]);
  useEffect(() => localStorage.setItem('currency', currency), [currency]);
  useEffect(() => localStorage.setItem('unitSystem', unitSystem), [unitSystem]);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, country, setCountry, currency, setCurrency, unitSystem, setUnitSystem }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
`);

// =======================
// CALCULATIONS
// =======================
write('src/calculations/concrete.ts', `
export const calculateConcrete = (length: number, width: number, depth: number, wastePercent: number) => {
  const baseVolume = length * width * depth;
  const withWaste = baseVolume * (1 + wastePercent / 100);
  return { baseVolume, withWaste };
};
`);
write('src/calculations/paint.ts', `
export const calculatePaint = (length: number, height: number, walls: number, doors: number, windows: number, coats: number, wastePercent: number) => {
  const doorArea = 2; // approx m2
  const windowArea = 1.5; // approx m2
  let area = (length * height * walls) - (doors * doorArea) - (windows * windowArea);
  if (area < 0) area = 0;
  const coveragePerLiter = 10;
  const paintRequired = (area * coats) / coveragePerLiter;
  const withWaste = paintRequired * (1 + wastePercent / 100);
  return { area, paintRequired: withWaste };
};
`);
write('src/calculations/gravel.ts', `
export const calculateGravel = (length: number, width: number, depth: number, wastePercent: number) => {
  const volume = length * width * depth;
  const weight = volume * 1.6; // approx 1.6 tons per m3
  return { volume: volume * (1 + wastePercent / 100), weight: weight * (1 + wastePercent / 100) };
};
`);
write('src/calculations/tile.ts', `
export const calculateTile = (roomL: number, roomW: number, tileL: number, tileW: number, wastePercent: number) => {
  const area = roomL * roomW;
  const tileArea = tileL * tileW;
  const tilesRequired = tileArea > 0 ? area / tileArea : 0;
  return { area, tilesRequired: Math.ceil(tilesRequired * (1 + wastePercent / 100)) };
};
`);
write('src/calculations/area.ts', `
export const calculateArea = (length: number, width: number) => {
  return length * width;
};
`);

// =======================
// COMPONENTS
// =======================
write('src/components/Header.tsx', `
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

export const Header = () => {
  const { language, setLanguage, unitSystem, setUnitSystem } = useSettings();
  return (
    <header style={{ padding: '1rem', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontWeight: 700, fontSize: '1.25rem', color: '#2563eb' }}>HOME PROJECT CALCULATOR</Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
          <option value="it">Italiano</option>
        </select>
        <select value={unitSystem} onChange={(e) => setUnitSystem(e.target.value as any)}>
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>
      </div>
    </header>
  );
};
`);
write('src/components/Footer.tsx', `
import React from 'react';
export const Footer = () => (
  <footer style={{ padding: '2rem', background: '#0f172a', color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
    <p>Results are estimates for planning purposes only.</p>
    <p>&copy; 2026 Home Project Calculator</p>
  </footer>
);
`);

// =======================
// PAGES
// =======================
write('src/pages/Home.tsx', `
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const calculators = [
    { path: '/concrete-calculator', name: 'Concrete Calculator', desc: 'Calculate concrete volume.' },
    { path: '/paint-calculator', name: 'Paint Calculator', desc: 'Calculate paint required.' },
    { path: '/gravel-calculator', name: 'Gravel Calculator', desc: 'Calculate gravel weight.' },
    { path: '/tile-calculator', name: 'Tile Calculator', desc: 'Calculate tiles required.' },
    { path: '/square-footage-calculator', name: 'Square Footage Calculator', desc: 'Calculate area.' }
  ];

  return (
    <div className="container main-content">
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '4rem 0', background: '#2563eb', color: '#fff', borderRadius: '16px' }}>
        <h1>Plan your home project with confidence.</h1>
        <p style={{ color: '#e0e7ff' }}>Free calculators for materials, measurements, renovation and construction.</p>
      </div>
      <h2>Categories</h2>
      <div className="grid grid-cols-3">
        {calculators.map(calc => (
          <Link to={calc.path} key={calc.path} style={{ display: 'block', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', textDecoration: 'none', color: '#0f172a' }}>
            <h3>{calc.name}</h3>
            <p>{calc.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
`);

// I'll create one example calculator to prove it works
write('src/pages/ConcreteCalculator.tsx', `
import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { calculateConcrete } from '../calculations/concrete';

export const ConcreteCalculator = () => {
  const { unitSystem } = useSettings();
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(0.1);
  const [waste, setWaste] = useState(10);

  const { baseVolume, withWaste } = calculateConcrete(length, width, depth, waste);

  return (
    <div className="container main-content">
      <h1>Concrete Calculator</h1>
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
          <div style={{ fontSize: '3rem', fontWeight: 700, margin: '2rem 0' }}>{baseVolume.toFixed(2)} {unitSystem === 'metric' ? 'm³' : 'cu ft'}</div>
          <div style={{ fontSize: '1.5rem' }}>WITH {waste}% EXTRA: {withWaste.toFixed(2)} {unitSystem === 'metric' ? 'm³' : 'cu ft'}</div>
        </div>
      </div>
    </div>
  );
};
`);

// =======================
// MAIN ENTRY
// =======================
write('src/App.tsx', `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ConcreteCalculator } from './pages/ConcreteCalculator';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
          {/* other calculators would be here */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
`);
write('src/main.tsx', `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`);

console.log("App built successfully!");
