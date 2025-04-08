
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

type VideoProject = {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
};

// Sample videos using the uploaded images as thumbnails
const videoProjects: VideoProject[] = [
  {
    id: 1,
    title: "Living Room Transformation",
    category: "Residential",
    description: "See how we transformed this space from concept to completion with custom furniture and lighting solutions.",
    thumbnail: "public/lovable-uploads/cdd8a9f0-b967-407d-905a-d07ce7b7acd4.png",
    videoUrl: "#"
  },
  {
    id: 2,
    title: "Wardrobe Design Process",
    category: "Residential",
    description: "Our detailed approach to designing and implementing custom storage solutions for modern homes.",
    thumbnail: "public/lovable-uploads/7b948f43-5325-4d0a-af9a-e8c00c48c4d6.png",
    videoUrl: "#"
  },
  {
    id: 3,
    title: "Master Bedroom Styling",
    category: "Residential", 
    description: "Watch our designers create a serene and functional bedroom space with attention to every detail.",
    thumbnail: "public/lovable-uploads/a471fd36-d23f-40a5-85fa-52c4ffa99ee1.png",
    videoUrl: "#"
  },
  {
    id: 4,
    title: "Kitchen Design Solutions",
    category: "Residential",
    description: "A walkthrough of our modern kitchen design with insights into the materials and appliances selected.",
    thumbnail: "public/lovable-uploads/bd9f69ce-9be4-4594-990e-40d9fd3db422.png",
    videoUrl: "#"
  },
  {
    id: 5,
    title: "Bedroom Makeover",
    category: "Residential",
    description: "The complete transformation process of a standard bedroom into a luxurious retreat.",
    thumbnail: "public/lovable-uploads/b3ad8244-e6a4-4abc-87a5-270c036e4f42.png",
    videoUrl: "#"
  },
  {
    id: 6,
    title: "Art-Inspired Bedroom",
    category: "Residential",
    description: "See how we incorporated art elements into this beautiful bedroom redesign.",
    thumbnail: "public/lovable-uploads/82bcdf67-5ead-4267-8082-09a7108ab59a.png",
    videoUrl: "#"
  },
  {
    id: 7,
    title: "Living Area Design Timeline",
    category: "Residential",
    description: "A time-lapse video showing the complete redesign of this modern living space.",
    thumbnail: "public/lovable-uploads/af4735be-f647-4dea-9572-dd9ae06dc521.png",
    videoUrl: "#"
  },
  {
    id: 8,
    title: "Minimalist Bedroom Creation",
    category: "Residential",
    description: "Our approach to creating a clean, functional, and aesthetically pleasing bedroom space.",
    thumbnail: "public/lovable-uploads/c0836c0a-e7d8-4a66-8360-91c4b356d497.png",
    videoUrl: "#"
  }
];

const Videos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState(videoProjects);
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  
  const filterCategories = ['All', 'Residential', 'Commercial', 'Hospitality'];
  
  useEffect(() => {
    if (filter === 'All') {
      setFilteredVideos(videoProjects);
    } else {
      setFilteredVideos(videoProjects.filter(video => video.category === filter));
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
              Video Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Watch our design process and transformations come to life
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="overflow-hidden rounded-xl bg-white shadow-sm cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <AspectRatio ratio={9/16} className="bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 cursor-pointer hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-4">
                  <span className="text-sm text-primary font-medium">{video.category}</span>
                  <h3 className="font-medium text-lg mt-1">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="aspect-video bg-black overflow-hidden">
              {/* This would be replaced with an actual video player in a real implementation */}
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={selectedVideo.thumbnail} 
                  alt={selectedVideo.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute">
                  <div className="rounded-full bg-white/20 backdrop-blur-sm p-6 cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-display font-medium mb-2">{selectedVideo.title}</h2>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-primary/10 text-primary rounded-full text-xs px-3 py-1">
                  {selectedVideo.category}
                </span>
              </div>
              <p className="text-muted-foreground mb-8">{selectedVideo.description}</p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedVideo(null)}
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
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-xl text-white/80 mb-8"
          >
            Let's discuss your project and create something beautiful together.
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

export default Videos;
