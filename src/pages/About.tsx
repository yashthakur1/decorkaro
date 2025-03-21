
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
              About Designify
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Transforming spaces across India with thoughtful, innovative design since 2012
            </motion.p>
          </div>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="subtitle">Our Story</span>
              <h2 className="text-4xl font-display font-medium mb-6">
                Where Passion Meets Design Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2012 by a collective of visionary designers, Designify was born out of a shared passion for creating spaces that inspire, comfort, and function seamlessly for those who inhabit them.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                What began as a small studio in Mumbai has grown into one of India's most respected interior design firms, with projects spanning residential, commercial, and hospitality sectors across the country.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our philosophy is simple yet profound: we believe that exceptional interior design should be a perfect balance of aesthetics, functionality, and sustainability – all while reflecting the unique personality and needs of our clients.
              </p>
            </motion.div>
            
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop" 
                alt="Designify team" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-accent">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="subtitle">Our Values</span>
            <h2 className="section-title mb-6">What Drives Us</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Our core values shape every decision we make and every space we design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in every aspect of our work, from the initial concept to the final execution. No detail is too small when it comes to creating exceptional spaces.
              </p>
            </motion.div>
            
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace innovation and creativity, constantly exploring new ideas, technologies, and approaches to push the boundaries of what's possible in interior design.
              </p>
            </motion.div>
            
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Client-Focused</h3>
              <p className="text-muted-foreground">
                We believe in collaborative partnerships with our clients. Your vision, needs, and satisfaction are at the heart of everything we do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="subtitle">Meet The Team</span>
            <h2 className="section-title mb-6">Our Design Experts</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Our talented team brings diverse skills and perspectives to every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="rounded-xl overflow-hidden mb-6 aspect-square">
                <img 
                  src="https://randomuser.me/api/portraits/women/23.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Ananya Kapoor</h3>
              <p className="text-muted-foreground mb-4">Founder & Principal Designer</p>
            </motion.div>
            
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="rounded-xl overflow-hidden mb-6 aspect-square">
                <img 
                  src="https://randomuser.me/api/portraits/men/36.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Vikram Mehta</h3>
              <p className="text-muted-foreground mb-4">Creative Director</p>
            </motion.div>
            
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="rounded-xl overflow-hidden mb-6 aspect-square">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Nisha Agarwal</h3>
              <p className="text-muted-foreground mb-4">Senior Interior Designer</p>
            </motion.div>
            
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="rounded-xl overflow-hidden mb-6 aspect-square">
                <img 
                  src="https://randomuser.me/api/portraits/men/42.jpg" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Arjun Singh</h3>
              <p className="text-muted-foreground mb-4">Project Manager</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium mb-6"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-8"
          >
            Let's collaborate to create an interior that reflects your vision and enhances your lifestyle.
          </motion.p>
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-md px-8 py-6">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
