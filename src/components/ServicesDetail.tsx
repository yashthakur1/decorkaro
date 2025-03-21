
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

type ServicesDetailProps = {
  services: Service[];
};

const ServicesDetail = ({ services }: ServicesDetailProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  return (
    <section ref={ref} className="section-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto max-w-7xl space-y-24"
      >
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            variants={itemVariants}
            id={service.id}
            className={`grid grid-cols-1 ${index % 2 === 0 ? 'md:grid-cols-[3fr,2fr]' : 'md:grid-cols-[2fr,3fr] md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
          >
            <div className={index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                {service.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {service.description}
              </p>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden h-[400px]">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesDetail;
