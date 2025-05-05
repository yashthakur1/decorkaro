import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../ui/ServiceCard';
import { Home, Building2, Building as BuildingStore, Hotel, Palette } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  const services = [
    {
      id: 1,
      title: '1BHK Package',
      icon: <Home className="text-yellow-500" size={32} />,
      description: 'Complete modular interior package for 1BHK homes, including kitchen, wardrobes, and living room solutions.',
      price: 'Starting at ₹3.62L*',
      features: [
        'Modular Kitchen',
        'Bedroom Wardrobe',
        'TV Unit',
        'Space-saving solutions',
        'Free 3D design'
      ]
    },
    {
      id: 2,
      title: '2BHK Package',
      icon: <Building2 className="text-yellow-500" size={32} />,
      description: 'Comprehensive interior package for 2BHK homes with customizable options for each room.',
      price: 'Starting at ₹4.52L*',
      features: [
        'Modular Kitchen',
        '2 Bedroom Wardrobes',
        'Living Room Setup',
        'TV Unit & Storage',
        'Free 3D design'
      ]
    },
    {
      id: 3,
      title: '3BHK Package',
      icon: <BuildingStore className="text-yellow-500" size={32} />,
      description: 'Premium interior solutions for 3BHK homes with additional storage and customization options.',
      price: 'Starting at ₹5.57L*',
      features: [
        'Modular Kitchen',
        '3 Bedroom Wardrobes',
        'Living Room Setup',
        'Multiple Storage Solutions',
        'Free 3D design'
      ]
    },
    {
      id: 4,
      title: '4BHK Package',
      icon: <Hotel className="text-yellow-500" size={32} />,
      description: 'Luxurious interior package for 4BHK homes with premium finishes and extensive storage solutions.',
      price: 'Starting at ₹6.33L*',
      features: [
        'Modular Kitchen',
        '4 Bedroom Wardrobes',
        'Premium Living Room Setup',
        'Multiple Storage Solutions',
        'Free 3D design'
      ]
    },
    {
      id: 5,
      title: 'Modular Kitchen',
      icon: <Palette className="text-yellow-500" size={32} />,
      description: 'Custom modular kitchen solutions with premium materials and efficient storage design.',
      price: 'Starting at ₹1.7L*',
      features: [
        'Quality Materials',
        'Efficient Storage',
        'Customizable Layouts',
        'Modern Accessories',
        'Free Design Consultation'
      ]
    },
    {
      id: 6,
      title: 'Custom Solutions',
      icon: <Palette className="text-yellow-500" size={32} />,
      description: 'Tailored interior solutions for specific rooms or requirements. Choose from our Essentials, Premium, or Luxe packages.',
      price: 'Custom Quote',
      features: [
        'Flexible Options',
        'Choice of Packages',
        'Premium Materials',
        'Expert Consultation',
        'Free 3D Visualization'
      ]
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeIn}
        >
          <p className="text-yellow-500 font-medium mb-2 font-secondary">OUR SERVICES</p>
          <h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Comprehensive Interior Design Solutions
          </h2>
          <p className="text-slate-700 font-secondary">
            From concept to completion, we offer a range of specialized design services 
            tailored to meet your unique requirements and preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={index + 1}
              variants={fadeIn}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={6}
          variants={fadeIn}
        >
          <p className="text-slate-700 mb-6">
            Not sure which service is right for you? Get in touch for a free consultation.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-md transition-colors duration-300"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;