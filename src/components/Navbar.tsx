
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-8 md:px-12 lg:px-24',
        isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl font-semibold"
          >
            Designify
            <span className="text-primary">.</span>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "nav-link font-medium transition-colors",
                isActive(link.path) ? "text-primary" : "text-foreground/80 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="ml-4">
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-[80px] bg-background z-40 flex flex-col p-6"
        >
          <nav className="flex flex-col space-y-6 pt-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-medium py-1",
                  isActive(link.path) ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-4 w-full">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Book Consultation
              </Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
