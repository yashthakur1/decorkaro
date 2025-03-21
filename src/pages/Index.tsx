
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="parallax-container rounded-2xl overflow-hidden h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1000&auto=format&fit=crop" 
                alt="Interior design" 
                className="parallax-image"
              />
            </div>
            <div className="reveal-container">
              <div className="reveal-content animate">
                <span className="subtitle">About Designify</span>
                <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
                  We Create Spaces That Inspire
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Designify is a premier interior design studio based in Mumbai, 
                  serving clients across India. Our team of passionate designers transforms 
                  spaces into personalized environments that reflect your unique style 
                  and meet your functional needs.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  With over 10 years of experience in residential, commercial, and 
                  hospitality design, we've developed a reputation for creating 
                  distinctive and innovative interiors that stand the test of time.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-3xl font-display font-medium mb-2">150+</h3>
                    <p className="text-muted-foreground">Projects Completed</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-medium mb-2">95%</h3>
                    <p className="text-muted-foreground">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Services />
      <Portfolio />
      <Booking />
      
      <section className="section-padding bg-accent">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <span className="subtitle">Testimonials</span>
            <h2 className="section-title mb-16">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/45.jpg" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Priya Sharma</h3>
                  <p className="text-muted-foreground">Residential Client</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "Designify transformed our apartment into a stunning home that perfectly 
                captures our style. Their attention to detail and ability to listen made 
                the entire process enjoyable. We couldn't be happier with the results!"
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Rajesh Patel</h3>
                  <p className="text-muted-foreground">Office Renovation</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "Working with Designify on our office renovation was a fantastic experience. 
                They understood our corporate culture and created a space that is both 
                functional and inspirational. Our team productivity has noticeably improved!"
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Client" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Meera Desai</h3>
                  <p className="text-muted-foreground">Restaurant Owner</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "The team at Designify helped create an ambiance for our restaurant that 
                our customers absolutely love. Their design has become a key part of our 
                brand identity and a reason why customers keep coming back."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
