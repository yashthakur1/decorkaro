import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Aarav Patel',
      position: 'Homeowner',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      quote: 'DecorKaro transformed our home beyond our expectations. Their attention to detail and commitment to understanding our lifestyle needs resulted in a space that feels both luxurious and perfectly comfortable. The name really delivers on its promise—they truly "decor-ed" our home beautifully!',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      position: 'Restaurant Owner',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      quote: 'Working with DecorKaro for our restaurant design was the best decision we made. The team created a unique ambiance that perfectly captures our brand essence, and our customers constantly compliment the space. Their innovative décor solutions have become a talking point among our patrons.',
      rating: 5
    },
    {
      id: 3,
      name: 'Vikram Malhotra',
      position: 'CEO, TechVision India',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      quote: 'Our office redesign by DecorKaro has significantly improved workplace morale and productivity. The team masterfully balanced aesthetics with functionality, creating a space that inspires innovation. Their name says it all—they really know how to "DecorKaro" (do décor) expertly!',
      rating: 5
    },
    {
      id: 4,
      name: 'Anjali Desai',
      position: 'Boutique Owner',
      image: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg',
      quote: 'The DecorKaro team understood exactly what my clothing boutique needed. The design has completely elevated the shopping experience, and sales have increased by 30% since the renovation. Their approach to décor is truly transformative for retail spaces.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (autoplay) {
      interval = window.setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-yellow-500 font-medium mb-2 font-secondary">TESTIMONIALS</p>
          <h2 className="font-title text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-slate-700 font-secondary">
            Don't just take our word for it. Here's what some of our satisfied clients 
            have to say about their experience working with DecorKaro.
          </p>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Carousel */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-slate-50 rounded-xl p-8 md:p-10 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center mb-6">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
                        />
                      </div>
                      <div>
                        <h3 className="font-title text-xl font-bold text-slate-900">{testimonial.name}</h3>
                        <p className="text-slate-700 mb-6 font-secondary">{testimonial.position}</p>
                        <div className="flex mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="relative">
                      <div className="text-yellow-500 text-5xl absolute -top-2 -left-2 opacity-20">"</div>
                      <p className="text-slate-700 relative z-10 italic">
                        {testimonial.quote}
                      </p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-slate-800 hover:bg-yellow-500 hover:text-slate-900 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-slate-800 hover:bg-yellow-500 hover:text-slate-900 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-yellow-500' : 'bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;