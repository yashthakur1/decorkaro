import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      title: 'Transform Your Space',
      subtitle: 'Creating stunning interiors across India, starting from Mumbai'
    },
    {
      image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      title: 'Luxury Design Solutions',
      subtitle: 'Bespoke interior designs for every lifestyle'
    },
    {
      image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
      title: 'Elevate Your Living',
      subtitle: 'Where functionality meets aesthetics'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen">
      {/* Slide Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="font-secondary text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#ai-analysis"
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-md transition-colors duration-300"
            >
              Visualise your home with AI
            </a>
            <a
              href="#contact"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
            >
              Book consultation
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={32} className="text-white" />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-yellow-500' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;