import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ConcreteCalculator } from './pages/ConcreteCalculator';
import { PaintCalculator } from './pages/PaintCalculator';
import { GravelCalculator } from './pages/GravelCalculator';
import { TileCalculator } from './pages/TileCalculator';
import { SquareFootageCalculator } from './pages/SquareFootageCalculator';
import { CalculatorsDirectory } from './pages/CalculatorsDirectory';
import { ProjectsDirectory } from './pages/ProjectsDirectory';
import { About, Privacy, Terms, Disclaimer, Contact, HowItWorks } from './pages/StaticPages';
import { BackToTop } from './components/BackToTop';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<CalculatorsDirectory />} />
          <Route path="/concrete-calculator" element={<ConcreteCalculator />} />
          <Route path="/paint-calculator" element={<PaintCalculator />} />
          <Route path="/gravel-calculator" element={<GravelCalculator />} />
          <Route path="/tile-calculator" element={<TileCalculator />} />
          <Route path="/square-footage-calculator" element={<SquareFootageCalculator />} />
          
          <Route path="/projects" element={<ProjectsDirectory />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
        <Footer />
        <BackToTop />
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
