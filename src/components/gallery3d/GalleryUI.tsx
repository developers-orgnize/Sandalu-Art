import { motion } from 'framer-motion';
import { useState } from 'react';

const GalleryUI = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Menu button */}
      <motion.button
        className="absolute top-6 right-6 font-display text-sm tracking-ultra-wide text-foreground hover:text-muted-foreground transition-colors z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        MENU
      </motion.button>

      {/* Menu overlay */}
      {menuOpen && (
        <motion.div
          className="absolute inset-0 bg-background/95 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center space-y-8">
            <a href="/" className="block font-serif text-2xl text-foreground hover:text-muted-foreground transition-colors tracking-wide">
              Home
            </a>
            <a href="/gallery" className="block font-serif text-2xl text-foreground hover:text-muted-foreground transition-colors tracking-wide">
              2D Gallery
            </a>
            <button
              onClick={() => setMenuOpen(false)}
              className="font-serif text-2xl text-foreground hover:text-muted-foreground transition-colors tracking-wide"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Minimap placeholder */}
      <motion.div
        className="absolute bottom-6 right-6 w-24 h-24 border border-foreground/20 bg-background/50 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-full h-full relative p-2">
          {/* Simplified gallery outline */}
          <div className="absolute inset-3 border border-foreground/30" />
          {/* Player dot */}
          <div className="absolute left-1/2 bottom-1/4 w-1.5 h-1.5 bg-foreground rounded-full -translate-x-1/2" />
        </div>
      </motion.div>

      {/* Controls hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Scroll to move */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-xs text-muted-foreground tracking-wide">Move</span>
          <div className="flex items-center gap-1">
            <div className="px-3 py-1.5 border border-foreground/30 text-xs text-foreground">
              Scroll ↑↓
            </div>
          </div>
        </div>

        {/* Look around */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-xs text-muted-foreground tracking-wide">Look</span>
          <div className="px-3 py-1.5 border border-foreground/30 text-xs text-foreground">
            Click + Mouse
          </div>
        </div>

        {/* Menu key */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-xs text-muted-foreground tracking-wide">Menu</span>
          <div className="px-3 py-1.5 border border-foreground/30 text-xs text-foreground">
            ESC
          </div>
        </div>
      </motion.div>

      {/* Click to start overlay (shown initially) */}
      <motion.div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-30 cursor-pointer"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center">
          <p className="font-display text-2xl text-foreground mb-4">Scroll to explore the gallery</p>
          <p className="font-serif text-sm text-muted-foreground tracking-ultra-wide lowercase">scroll to move • click + mouse to look around</p>
        </div>
      </motion.div>
    </>
  );
};

export default GalleryUI;
