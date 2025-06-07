import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AIAnalysisSection from '../components/sections/AIAnalysisSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AIAnalysisSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Home;