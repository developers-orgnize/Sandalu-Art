import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-end p-8 md:p-16">
      {/* Vertical line decoration */}
      <motion.div 
        className="absolute left-1/4 top-0 bottom-0 w-px bg-border hidden md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-right max-w-4xl">
        {/* Brand name */}
        <motion.h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground mb-6 md:mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          TheVertMenthe
        </motion.h1>

        {/* Horizontal line */}
        <motion.div 
          className="w-full h-px bg-border mb-6 md:mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'right' }}
        />

        {/* Subtitle */}
        <motion.p 
          className="font-serif text-xl md:text-2xl lg:text-3xl text-muted-foreground tracking-ultra-wide lowercase italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          drawings
        </motion.p>

        {/* Social link */}
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 md:mt-16 font-serif text-xs md:text-sm text-muted-foreground tracking-ultra-wide lowercase hover:text-foreground transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          @thevertmenthe_drawing
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 md:bottom-16 left-8 md:left-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="font-serif text-xs text-muted-foreground tracking-ultra-wide lowercase rotate-90 origin-center translate-x-4">
            scroll
          </span>
          <motion.div 
            className="w-px h-16 bg-muted-foreground"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
