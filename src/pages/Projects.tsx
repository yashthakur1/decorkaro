
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Minimalist Apartment',
    category: 'Residential',
    location: 'Mumbai, India',
    year: '2023',
    description: 'A sleek, minimalist apartment design that maximizes space and light.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Luxury Villa Redesign',
    category: 'Residential',
    location: 'Delhi, India',
    year: '2022',
    description: 'Complete redesign of a luxury villa with elegant, contemporary aesthetics.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Corporate Office',
    category: 'Commercial',
    location: 'Bangalore, India',
    year: '2023',
    description: 'A modern workspace designed to foster creativity and collaboration.',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Boutique Hotel',
    category: 'Hospitality',
    location: 'Goa, India',
    year: '2022',
    description: 'A boutique hotel that blends luxury with local cultural elements.',
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Modern Restaurant',
    category: 'Hospitality',
    location: 'Mumbai, India',
    year: '2022',
    description: 'A contemporary dining space with a focus on ambiance and experience.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Urban Loft',
    category: 'Residential',
    location: 'Pune, India',
    year: '2023',
    description: 'An industrial-inspired loft with modern finishes and open concept.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Tech Startup Office',
    category: 'Commercial',
    location: 'Hyderabad, India',
    year: '2023',
    description: 'A vibrant office space designed for innovation and flexibility.',
    image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Wellness Spa Center',
    category: 'Commercial',
    location: 'Chennai, India',
    year: '2022',
    description: 'A tranquil spa environment focused on relaxation and rejuvenation.',
    image: 'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?q=80&w=800&auto=format&fit=crop'
  }
];

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filterCategories = ['All', 'Residential', 'Commercial', 'Hospitality'];
  
  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  return (
    <div>
      <Navbar />
      
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-primary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-medium mb-6"
            >
              Our Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              A showcase of our finest interior design work across India
            </motion.p>
          </div>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filterCategories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="px-6"
              >
                {category}
              </Button>
            ))}
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="portfolio-item rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="portfolio-overlay">
                  <div className="text-center p-6">
                    <span className="text-white/80 text-sm uppercase tracking-widest mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-white text-2xl font-display font-medium mb-4">
                      {project.title}
                    </h3>
                    <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white/10">
                      <Eye className="mr-2 h-4 w-4" />
                      View Project
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-medium mt-1">{project.title}</h3>
                  <p className="text-muted-foreground mt-1">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-display font-medium mb-2">{selectedProject.title}</h2>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-primary/10 text-primary rounded-full text-xs px-3 py-1">
                  {selectedProject.category}
                </span>
                <span className="bg-secondary text-secondary-foreground rounded-full text-xs px-3 py-1">
                  {selectedProject.location}
                </span>
                <span className="bg-accent text-accent-foreground rounded-full text-xs px-3 py-1">
                  {selectedProject.year}
                </span>
              </div>
              <p className="text-muted-foreground mb-8">{selectedProject.description}</p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-display font-medium mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-xl text-white/80 mb-8"
          >
            Let's create a space that's uniquely yours. Our team is ready to bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-md px-8 py-6">
              <a href="/contact">Book a Consultation</a>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Projects;
