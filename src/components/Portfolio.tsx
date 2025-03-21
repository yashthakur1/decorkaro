import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Minimalist Apartment',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    link: '/projects/minimalist-apartment'
  },
  {
    id: 2,
    title: 'Luxury Villa Redesign',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
    link: '/projects/luxury-villa'
  },
  {
    id: 3,
    title: 'Corporate Office',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800&auto=format&fit=crop',
    link: '/projects/corporate-office'
  },
  {
    id: 4,
    title: 'Boutique Hotel',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=800&auto=format&fit=crop',
    link: '/projects/boutique-hotel'
  }
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  return (
    <section className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="subtitle">Our Portfolio</span>
          <h2 className="section-title mb-4">Recent Projects</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-6">
            Browse our showcase of completed interior design projects 
            spanning various styles and spaces.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="portfolio-item aspect-[4/3]"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="portfolio-overlay">
                <div className="text-center p-6">
                  <span className="text-white/80 text-sm uppercase tracking-widest mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-display font-medium mb-4">
                    {project.title}
                  </h3>
                  <Link to={project.link}>
                    <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/10">
                      <Eye className="mr-2 h-4 w-4" />
                      View Project
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-16">
          <Button asChild size="lg" variant="outline">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
