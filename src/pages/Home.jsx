import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WhyAWDSection from '../components/WhyAWDSection';
import HowItWorksSection from '../components/HowItWorksSection';
import HardwareSection from '../components/HardwareSection';
import FirmwareCloudSection from '../components/FirmwareCloudSection';
import PerformanceSection from '../components/PerformanceSection';
import DataVisualizationSection from '../components/DataVisualizationSection';
import ChallengesLearningsSection from '../components/ChallengesLearningsSection';

const Home = () => {
  return (
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
  );
};

export default Home;
