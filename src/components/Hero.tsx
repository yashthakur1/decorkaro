
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
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
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  const imageRevealVariants = {
    hidden: { 
      opacity: 0,
      y: 60
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.4
      }
    }
  };
  
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-16">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Text Content */}
          <div className="text-left mb-16">
            <motion.div
              className="overflow-hidden mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                variants={fadeInUpVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="subtitle text-primary/90 inline-block"
              >
                Premium Interior Design
              </motion.span>
            </motion.div>
            
            <div className="overflow-hidden mb-6">
              <motion.h1
                variants={fadeInUpVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-balance text-primary leading-tight"
              >
                Transforming Spaces<br/>
                Into Modern Masterpieces.
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mb-10">
              <motion.p
                variants={fadeInUpVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl"
              >
                Our Team of Expert Designers and Architects Create Stunning, Functional Interiors 
                Tailored to Your Unique Style and Needs.
              </motion.p>
            </div>
            
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="text-md rounded-full px-8 py-6">
                <Link to="/contact">LET'S TALK</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-md rounded-full px-8 py-6 border-primary/20 hover:bg-primary/5">
                <Link to="/projects" className="flex items-center gap-2">
                  <Play size={16} className="fill-primary" /> WATCH OUR SHOWREEL
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Image Below */}
          <motion.div
            variants={imageRevealVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2000&auto=format&fit=crop"
              alt="Modern interior design"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-muted-foreground text-sm mb-2">Scroll</span>
        <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
