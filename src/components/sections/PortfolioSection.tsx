import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PortfolioSection: React.FC = () => {
  const [category, setCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'retail', name: 'Retail' },
    { id: 'hospitality', name: 'Hospitality' }
  ];
  
  const projects = [
    {
      id: 1,
      title: 'Luxury Villa Redesign',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      location: 'Bandra, Mumbai'
    },
    {
      id: 2,
      title: 'Modern Office Space',
      category: 'commercial',
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg',
      location: 'BKC, Mumbai'
    },
    {
      id: 3,
      title: 'Fashion Boutique Interior',
      category: 'retail',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
      location: 'Colaba, Mumbai'
    },
    {
      id: 4,
      title: 'Minimalist Apartment',
      category: 'residential',
      image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
      location: 'Worli, Mumbai'
    },
    {
      id: 5,
      title: 'Fine Dining Restaurant',
      category: 'hospitality',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      location: 'Juhu, Mumbai'
    },
    {
      id: 6,
      title: 'Corporate Headquarters',
      category: 'commercial',
      image: 'https://images.pexels.com/photos/3773583/pexels-photo-3773583.png',
      location: 'Lower Parel, Mumbai'
    }
  ];
  
  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow-500 font-medium mb-2 font-secondary">OUR PORTFOLIO</p>
          <h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Recent Projects
          </h2>
          <p className="text-slate-700 mb-8 font-secondary">
            Explore our portfolio of completed projects across residential, commercial, retail, and hospitality spaces.
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-full border transition-colors duration-300 font-secondary ${category === cat.id ? 'bg-yellow-500 text-slate-900 border-yellow-500' : 'bg-white text-slate-700 border-slate-200 hover:bg-yellow-50'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="group relative rounded-xl overflow-hidden shadow-md"
              variants={itemVariants}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-title text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-500 font-secondary">{project.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-700 mb-6">
            Want to see more of our work or discuss your project requirements?
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
          >
            Let's Discuss Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;