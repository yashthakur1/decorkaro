
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
    title: 'Modern Bedroom Suite',
    category: 'Residential',
    location: 'Mumbai, India',
    year: '2023',
    description: 'A contemporary bedroom with custom wardrobe integration and elegant lighting design.',
    image: 'public/lovable-uploads/b3ad8244-e6a4-4abc-87a5-270c036e4f42.png'
  },
  {
    id: 2,
    title: 'Elegant Bedroom Design',
    category: 'Residential',
    location: 'Delhi, India',
    year: '2023',
    description: 'An artistic bedroom featuring modern storage solutions and statement wall art.',
    image: 'public/lovable-uploads/82bcdf67-5ead-4267-8082-09a7108ab59a.png'
  },
  {
    id: 3,
    title: 'Contemporary Living Room',
    category: 'Residential',
    location: 'Bangalore, India',
    year: '2022',
    description: 'Open-concept living space with dining area integration and modern decor elements.',
    image: 'public/lovable-uploads/af4735be-f647-4dea-9572-dd9ae06dc521.png'
  },
  {
    id: 4,
    title: 'Minimalist Bedroom',
    category: 'Residential',
    location: 'Pune, India',
    year: '2023',
    description: 'Clean lines and functional design with built-in storage and natural lighting.',
    image: 'public/lovable-uploads/c0836c0a-e7d8-4a66-8360-91c4b356d497.png'
  },
  {
    id: 5,
    title: 'Luxury Living Room',
    category: 'Residential',
    location: 'Mumbai, India',
    year: '2022',
    description: 'Elegant living space with marble accents, custom lighting, and designer furniture.',
    image: 'public/lovable-uploads/cdd8a9f0-b967-407d-905a-d07ce7b7acd4.png'
  },
  {
    id: 6,
    title: 'Designer Wardrobe Solutions',
    category: 'Residential',
    location: 'Gurgaon, India',
    year: '2023',
    description: 'Custom storage system with integrated dressing area and premium finishes.',
    image: 'public/lovable-uploads/7b948f43-5325-4d0a-af9a-e8c00c48c4d6.png'
  },
  {
    id: 7,
    title: 'Modern Apartment Design',
    category: 'Residential',
    location: 'Hyderabad, India',
    year: '2023',
    description: 'Contemporary living space with seamless flow and balanced aesthetic elements.',
    image: 'public/lovable-uploads/a471fd36-d23f-40a5-85fa-52c4ffa99ee1.png'
  },
  {
    id: 8,
    title: 'Premium Kitchen Design',
    category: 'Residential',
    location: 'Chennai, India',
    year: '2022',
    description: 'Modern parallel kitchen with high-end appliances and functional storage solutions.',
    image: 'public/lovable-uploads/bd9f69ce-9be4-4594-990e-40d9fd3db422.png'
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
