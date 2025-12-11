import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoogleFormModal from './GoogleFormModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md text-slate-900 py-3' 
          : 'bg-transparent text-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/dk-logo.png"
              alt="DecorKaro"
              className={`h-10 md:h-12 w-auto transition-all duration-300 ${
                scrolled ? '' : 'brightness-0 invert'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="hover:text-yellow-500 transition-colors font-title">About</a>
            <a href="#services" className="hover:text-yellow-500 transition-colors font-title">Services</a>
            <a href="#packages" className="hover:text-yellow-500 transition-colors font-title">Packages</a>
            <a href="#testimonials" className="hover:text-yellow-500 transition-colors font-title">Testimonials</a>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className={`px-4 py-2 rounded-md font-title ${
                scrolled
                  ? 'bg-slate-900 text-white'
                  : 'bg-yellow-500 text-slate-900'
              } hover:bg-yellow-600 transition-colors`}
            >
              Get Free Estimate
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center">
            <a 
              href="tel:+919503380888" 
              className={`mr-2 p-2 rounded-full ${
                scrolled 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-yellow-500 text-slate-900'
              }`}
            >
              <Phone size={20} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled 
                  ? 'text-slate-900' 
                  : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="flex flex-col space-y-3 px-4 pt-2 pb-4">
            <a 
              href="#about" 
              className="py-2 px-4 text-slate-900 hover:bg-slate-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className="py-2 px-4 text-slate-900 hover:bg-slate-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a 
              href="#portfolio" 
              className="py-2 px-4 text-slate-900 hover:bg-slate-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </a>
            <a 
              href="#testimonials" 
              className="py-2 px-4 text-slate-900 hover:bg-slate-100 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <button
              className="py-2 px-4 bg-yellow-500 text-slate-900 hover:bg-yellow-600 rounded-md text-center w-full"
              onClick={() => {
                setIsOpen(false);
                setIsFormModalOpen(true);
              }}
            >
              Get Free Estimate
            </button>
          </div>
        </motion.div>
      )}

      {/* Google Form Modal */}
      <GoogleFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
    </nav>
  );
};

export default Navbar;