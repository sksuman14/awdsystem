import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhyAWDSection from './components/WhyAWDSection';
import HowItWorksSection from './components/HowItWorksSection';
import HardwareSection from './components/HardwareSection';
import FirmwareCloudSection from './components/FirmwareCloudSection';
import PerformanceSection from './components/PerformanceSection';
import DataVisualizationSection from './components/DataVisualizationSection';
import ChallengesLearningsSection from './components/ChallengesLearningsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyAWDSection />
        <HowItWorksSection />
        <HardwareSection />
        <FirmwareCloudSection />
        <DataVisualizationSection />
        <PerformanceSection />
        <ChallengesLearningsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
