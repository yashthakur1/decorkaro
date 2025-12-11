import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceProps {
  service: {
    id: number;
    title: string;
    icon: React.ReactNode;
    description: string;
    price: string;
    features: string[];
  };
  onBookNow?: () => void;
}

const ServiceCard: React.FC<ServiceProps> = ({ service, onBookNow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-gray-100"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="p-8">
        <div className="mb-5">{service.icon}</div>
        <h3 className="font-title text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
        <p className="font-secondary text-slate-600 mb-4">{service.description}</p>
        <div className="font-semibold text-xl text-slate-900 mb-5 font-secondary">{service.price}</div>
        
        <div className="space-y-3 mb-6">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check size={18} className="text-yellow-500 mr-2 flex-shrink-0 mt-1" />
              <span className="text-slate-700 font-secondary">{feature}</span>
            </div>
          ))}
        </div>
        
        <div>
          <button
            onClick={onBookNow}
            className="group inline-flex items-center font-medium text-yellow-500 hover:text-yellow-600 transition-colors font-secondary"
          >
            Get Estimate
            <ChevronRight size={16} className={`ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;