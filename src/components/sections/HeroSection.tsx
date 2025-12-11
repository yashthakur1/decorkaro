import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GoogleFormModal from '../GoogleFormModal';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const revolvingTexts = ['Home', 'Office', 'Brand', 'Salon', 'Shop', 'Store'];

  const slides = [
    {
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      subtitle: 'Creating stunning interiors across India, starting from Thane'
    },
    {
      image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      subtitle: 'Bespoke interior designs for every lifestyle'
    },
    {
      image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
      subtitle: 'Where functionality meets aesthetics'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % revolvingTexts.length);
    }, 2000);
    return () => clearInterval(textInterval);
  }, [revolvingTexts.length]);

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
            Design your{' '}
            <span className="relative inline-block min-w-[180px] md:min-w-[220px] text-yellow-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute left-0"
                >
                  {revolvingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible">{revolvingTexts[0]}</span>
            </span>
          </h1>
          <p className="font-secondary text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-md transition-colors duration-300"
            >
              Get Free Estimate
            </button>
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

      {/* Google Form Modal */}
      <GoogleFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
    </section>
  );
};

export default HeroSection;