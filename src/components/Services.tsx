import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

const services: Service[] = [
  {
    id: 1,
    title: 'Residential Design',
    description: 'Transform your home into a sanctuary that reflects your personal style and enhances your daily life.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
    link: '/services#residential'
  },
  {
    id: 2,
    title: 'Commercial Spaces',
    description: 'Create productive, inspiring workplaces that embody your brand identity and company culture.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop',
    link: '/services#commercial'
  },
  {
    id: 3,
    title: 'Hospitality Interiors',
    description: 'Design memorable experiences for hotels, restaurants, and entertainment venues that keep guests returning.',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1600&auto=format&fit=crop',
    link: '/services#hospitality'
  }
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="subtitle">Our Expertise</span>
          <h2 className="section-title mb-4">What We Offer</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-6">
            We provide end-to-end design solutions tailored to your unique requirements,
            from conceptualization to final execution.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="service-card"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="service-card-content">
                <h3 className="text-2xl font-display font-medium mb-2">{service.title}</h3>
                <p className="mb-4 text-white/80">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center text-white hover:text-white/90"
                >
                  <span>Learn more</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
