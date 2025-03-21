
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  const imageRevealVariants = {
    hidden: { 
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'  
    },
    visible: { 
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { 
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          variants={imageRevealVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2000&auto=format&fit=crop"
            alt="Modern interior design"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      {/* Content Area with Glass Effect */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-2xl border border-white/20 shadow-lg"
        >
          <motion.div
            className="overflow-hidden mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="subtitle text-white/90 inline-block"
            >
              Premium Interior Design
            </motion.span>
          </motion.div>
          
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="font-display text-4xl md:text-6xl font-semibold text-balance text-white"
            >
              Transform Your Space Into Something Extraordinary
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-8">
            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/90 max-w-xl"
            >
              Elevate your surroundings with our bespoke interior design solutions,
              crafted precisely for your space and lifestyle.
            </motion.p>
          </div>
          
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="text-md px-8 py-6">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-md px-8 py-6 bg-transparent border-white text-white hover:bg-white/20">
              <Link to="/projects">Explore Projects</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="scroll-indicator"
      >
        <span className="text-white/70 text-sm mb-2">Scroll</span>
        <ArrowDown className="w-5 h-5 text-white/70 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
