import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import GalleryGrid from '@/components/GalleryGrid';

const Gallery = () => {
  // Sample artwork data
  const artworks = [
    {
      id: 1,
      title: 'étude I',
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=800&fit=crop&q=80',
      year: '2024',
    },
    {
      id: 2,
      title: 'portrait',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop&q=80',
      year: '2024',
    },
    {
      id: 3,
      title: 'nature morte',
      image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=800&fit=crop&q=80',
      year: '2023',
    },
    {
      id: 4,
      title: 'composition',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=800&fit=crop&q=80',
      year: '2023',
    },
    {
      id: 5,
      title: 'étude II',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&q=80',
      year: '2023',
    },
    {
      id: 6,
      title: 'abstraction',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop&q=80',
      year: '2022',
    },
  ];

  return (
    <>
      <Navigation />
      <main className="bg-background min-h-screen pt-32 md:pt-40 pb-16 px-8 md:px-16">
        {/* Page header */}
        <motion.header 
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Gallery
          </h1>
          <div className="w-24 h-px bg-border mb-6" />
          <p className="font-serif text-lg text-muted-foreground tracking-wide lowercase italic">
            selected works
          </p>
        </motion.header>

        {/* Gallery grid */}
        <GalleryGrid artworks={artworks} />

        {/* Footer */}
        <motion.footer 
          className="mt-24 md:mt-32 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <span className="font-display text-sm text-muted-foreground">
              © 2024 TheVertMenthe
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-sm text-muted-foreground tracking-wide lowercase hover:text-foreground transition-colors duration-500"
            >
              @thevertmenthe_drawing
            </a>
          </div>
        </motion.footer>
      </main>
    </>
  );
};

export default Gallery;
