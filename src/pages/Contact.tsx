
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your message!', {
        description: 'We will get back to you as soon as possible.',
        icon: <Check className="h-4 w-4" />,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Let's start a conversation about transforming your space
            </motion.p>
          </div>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl font-display font-medium mb-6">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Whether you have a project in mind, want to explore our services, 
                or simply have questions, we'd love to hear from you.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Design Street, Juhu<br />
                      Mumbai, Maharashtra 400049<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">+91 99999 88888</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Address</h3>
                    <p className="text-muted-foreground">info@designify.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Monday to Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-display font-medium mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input 
                      id="contact-name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name" 
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input 
                      id="contact-email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone Number</Label>
                    <Input 
                      id="contact-phone" 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number" 
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input 
                      id="contact-subject" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter message subject" 
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Your Message</Label>
                    <Textarea 
                      id="contact-message" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your message" 
                      required
                      className="bg-secondary/50 min-h-[120px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-secondary">
        <div className="container mx-auto max-w-7xl">
          <div className="rounded-xl overflow-hidden h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.8213315010254!3d19.127644782271223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x75f29a4205098f99!2sJuhu%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1644763218275!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Designify location map"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
