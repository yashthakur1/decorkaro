
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type VideoProject = {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
};

// Sample videos using the updated URL format for thumbnails
const videoProjects: VideoProject[] = [
  {
    id: 1,
    title: "Living Room Transformation",
    category: "Residential",
    thumbnail: "https://decorkaro.bitroot.org/lovable-uploads/cdd8a9f0-b967-407d-905a-d07ce7b7acd4.png",
    videoUrl: "#"
  },
  {
    id: 2,
    title: "Wardrobe Design Process",
    category: "Residential",
    thumbnail: "https://decorkaro.bitroot.org/lovable-uploads/7b948f43-5325-4d0a-af9a-e8c00c48c4d6.png",
    videoUrl: "#"
  },
  {
    id: 3,
    title: "Master Bedroom Styling",
    category: "Residential",
    thumbnail: "https://decorkaro.bitroot.org/lovable-uploads/a471fd36-d23f-40a5-85fa-52c4ffa99ee1.png",
    videoUrl: "#"
  },
  {
    id: 4,
    title: "Kitchen Design Solutions",
    category: "Residential",
    thumbnail: "https://decorkaro.bitroot.org/lovable-uploads/bd9f69ce-9be4-4594-990e-40d9fd3db422.png",
    videoUrl: "#"
  }
];

const VideoShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="section-padding bg-accent/30" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="subtitle">Video Gallery</span>
          <h2 className="section-title mb-4">Design in Motion</h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-6">
            Watch our design process and transformations come to life through 
            these inspiring videos.
          </p>
        </motion.div>

        {/* Vertical Video Carousel for Mobile */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {videoProjects.map((project) => (
                <CarouselItem key={project.id}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl">
                      <div className="relative">
                        <AspectRatio ratio={9/16} className="bg-muted">
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 cursor-pointer hover:bg-white/30 transition-colors">
                              <Play className="h-8 w-8 text-white fill-white" />
                            </div>
                          </div>
                        </AspectRatio>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-medium text-lg">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {videoProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: project.id * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="relative">
                <AspectRatio ratio={9/16} className="bg-muted">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 cursor-pointer hover:bg-white/30 transition-colors">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                </AspectRatio>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-lg">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
