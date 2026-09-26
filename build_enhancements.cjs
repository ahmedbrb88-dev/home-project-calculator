const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

// ==========================================
// BACK TO TOP COMPONENT
// ==========================================
write('src/components/BackToTop.tsx', `
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 999,
        background: 'var(--color-primary)',
        color: 'white',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-lg)',
        border: 'none',
        cursor: 'pointer',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <ChevronUp size={24} />
      <style>{\`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.8) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        [dir="rtl"] .back-to-top { right: auto; left: 2rem; }
      \`}</style>
    </button>
  );
};
`);

// ==========================================
// SVG DIAGRAMS
// ==========================================
write('src/components/ui/Diagrams.tsx', `
import React from 'react';

export const ConcreteDiagram = () => (
  <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
    <path d="M40 30 L160 30 L180 60 L60 60 Z" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M60 60 L60 90 L180 90 L180 60" fill="var(--color-primary-light)" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M160 30 L160 60" stroke="var(--color-navy)" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 4"/>
    <text x="100" y="20" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">Length</text>
    <text x="30" y="50" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">Width</text>
    <text x="195" y="80" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">Depth</text>
    {/* Measurement lines */}
    <path d="M40 10 L160 10 M40 5 L40 15 M160 5 L160 15" stroke="var(--color-primary)" strokeWidth="1"/>
    <path d="M10 30 L30 60 M5 30 L15 30 M25 60 L35 60" stroke="var(--color-primary)" strokeWidth="1"/>
    <path d="M190 60 L190 90 M185 60 L195 60 M185 90 L195 90" stroke="var(--color-primary)" strokeWidth="1"/>
  </svg>
);

export const PaintDiagram = () => (
  <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
    <rect x="20" y="20" width="160" height="80" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2"/>
    <rect x="130" y="40" width="30" height="60" fill="white" stroke="var(--color-navy)" strokeWidth="2"/> {/* Door */}
    <rect x="40" y="40" width="40" height="30" fill="white" stroke="var(--color-navy)" strokeWidth="2"/> {/* Window */}
    <path d="M40 55 L80 55 M60 40 L60 70" stroke="var(--color-navy)" strokeWidth="1"/>
    <circle cx="155" cy="70" r="2" fill="var(--color-navy)"/>
    <text x="100" y="12" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600">Wall Length</text>
    <path d="M20 5 L180 5 M20 0 L20 10 M180 0 L180 10" stroke="var(--color-primary)" strokeWidth="1"/>
  </svg>
);

export const TileDiagram = () => (
  <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
    <rect x="30" y="10" width="140" height="100" fill="white" stroke="var(--color-navy)" strokeWidth="2"/>
    <path d="M30 35 L170 35 M30 60 L170 60 M30 85 L170 85" stroke="var(--color-border)" strokeWidth="1"/>
    <path d="M65 10 L65 110 M100 10 L100 110 M135 10 L135 110" stroke="var(--color-border)" strokeWidth="1"/>
    {/* Highlighted tile */}
    <rect x="65" y="35" width="35" height="25" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2"/>
    <text x="100" y="12" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontWeight="600"></text>
  </svg>
);

export const SquareFootageDiagram = () => (
  <svg width="100%" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
    <rect x="40" y="20" width="120" height="80" fill="var(--color-surface-alt)" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 4"/>
    <text x="100" y="65" fill="var(--color-navy)" fontSize="14" textAnchor="middle" fontWeight="700">L × W</text>
    <path d="M40 10 L160 10 M40 5 L40 15 M160 5 L160 15" stroke="var(--color-primary)" strokeWidth="1"/>
    <path d="M25 20 L25 100 M20 20 L30 20 M20 100 L30 100" stroke="var(--color-primary)" strokeWidth="1"/>
  </svg>
);
`);

// ==========================================
// APP ROOT UPDATES
// ==========================================
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
import { BackToTop } from './components/BackToTop';

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
        <BackToTop />
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
`);
