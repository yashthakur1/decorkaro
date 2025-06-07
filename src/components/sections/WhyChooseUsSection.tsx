import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Shield, 
  Users,
  Banknote,
  Headphones
} from 'lucide-react';

const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      icon: <Star className="text-yellow-500" size={36} />,
      title: 'Exceptional Quality',
      description: 'We deliver superior craftsmanship and attention to detail in every project we undertake.'
    },
    {
      icon: <Clock className="text-yellow-500" size={36} />,
      title: 'Timely Delivery',
      description: 'We value your time and ensure projects are completed on schedule without compromising quality.'
    },
    {
      icon: <Shield className="text-yellow-500" size={36} />,
      title: 'Trusted Expertise',
      description: 'With over 10 years of experience and 500+ successful projects, your space is in expert hands.'
    },
    {
      icon: <Users className="text-yellow-500" size={36} />,
      title: 'Client-Centric Approach',
      description: 'We listen carefully to your needs and preferences to create truly personalized designs.'
    },
    {
      icon: <Banknote className="text-yellow-500" size={36} />,
      title: 'Transparent Pricing',
      description: 'No hidden costs or surprises. We provide detailed estimates and regular budget updates.'
    },
    {
      icon: <Headphones className="text-yellow-500" size={36} />,
      title: 'Dedicated Support',
      description: 'Our support continues beyond project completion with after-service care and maintenance guidance.'
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow-500 font-medium mb-2 font-secondary">WHY CHOOSE US</p>
          <h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            The DecorKaro Difference
          </h2>
          <p className="text-slate-700 font-secondary">
            What sets us apart is our commitment to excellence, innovation, and customer satisfaction.
            Discover why leading clients across India trust us with their spaces.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              className="bg-slate-50 rounded-xl p-8 transition-all duration-300 hover:shadow-md"
              variants={itemVariants}
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="font-title text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-slate-700 font-secondary">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="bg-yellow-500 rounded-xl p-10 mt-16 text-center shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready to Transform Your Space?
          </h3>
          <p className="text-slate-800 mb-8 max-w-2xl mx-auto">
            Take the first step towards your dream interior. Schedule a free consultation with 
            our design experts and explore how we can bring your vision to life.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
          >
            Book Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;