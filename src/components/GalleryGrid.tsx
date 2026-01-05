import { motion } from 'framer-motion';

interface Artwork {
  id: number;
  title: string;
  image: string;
  year: string;
}

interface GalleryGridProps {
  artworks: Artwork[];
}

const GalleryGrid = ({ artworks }: GalleryGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {artworks.map((artwork) => (
        <motion.article 
          key={artwork.id}
          className="group cursor-pointer"
          variants={item}
        >
          <div className="relative overflow-hidden bg-card aspect-[3/4] mb-4">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          <div className="flex justify-between items-baseline">
            <h3 className="font-serif text-lg text-foreground tracking-wide lowercase">
              {artwork.title}
            </h3>
            <span className="font-display text-xs text-muted-foreground">
              {artwork.year}
            </span>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
