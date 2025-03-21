
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your consultation request has been submitted!', {
        description: 'We will contact you shortly to confirm your appointment.',
        icon: <Check className="h-4 w-4" />,
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setDate(undefined);
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section className="section-padding bg-primary text-white" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="subtitle text-white/80">Schedule a Meeting</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
              Book a Free Consultation
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Let's discuss your interior design needs. Book a consultation with our team
              to get started on transforming your space into something extraordinary.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 bg-white/10 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Expert Consultation</h3>
                  <p className="text-white/80">
                    Get personalized advice from our experienced design team.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 bg-white/10 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Tailored Solutions</h3>
                  <p className="text-white/80">
                    Receive a custom design plan based on your specific needs and preferences.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 bg-white/10 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Transparent Pricing</h3>
                  <p className="text-white/80">
                    Get a clear understanding of costs and timelines before any commitment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-display text-primary font-medium mb-6">
                Request Your Consultation
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    required
                    className="bg-secondary/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                    className="bg-secondary/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number" 
                    required
                    className="bg-secondary/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-secondary/50",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Project Details</Label>
                  <Textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project" 
                    className="bg-secondary/50 min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 text-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book Your Consultation"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
