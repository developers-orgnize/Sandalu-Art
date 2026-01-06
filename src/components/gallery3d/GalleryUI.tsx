import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const GalleryUI = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Menu button - top right */}
      <motion.button
        className="absolute top-6 right-8 font-display text-sm tracking-ultra-wide text-foreground hover:text-muted-foreground transition-colors z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        MENU
      </motion.button>

      {/* Menu overlay */}
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Controls bar - bottom center */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Move controls */}
        <div className="flex items-end gap-3">
          <span className="font-serif text-sm text-foreground mb-1">Move</span>
          <div className="flex flex-col items-center gap-1">
            {/* Up arrow */}
            <div className="w-8 h-8 border border-foreground/40 flex items-center justify-center text-foreground text-sm">
              ↑
            </div>
            {/* Bottom row: left, down, right */}
            <div className="flex gap-1">
              <div className="w-8 h-8 border border-foreground/40 flex items-center justify-center text-foreground text-sm">
                ←
              </div>
              <div className="w-8 h-8 border border-foreground/40 flex items-center justify-center text-foreground text-sm">
                ↓
              </div>
              <div className="w-8 h-8 border border-foreground/40 flex items-center justify-center text-foreground text-sm">
                →
              </div>
            </div>
          </div>
        </div>

        {/* Open/Close Menu */}
        <div className="flex items-end gap-3">
          <span className="font-serif text-sm text-foreground mb-1">Open/Close Menu</span>
          <div className="px-3 h-8 border border-foreground/40 flex items-center justify-center text-foreground text-xs font-display tracking-wide">
            ESC
          </div>
        </div>

        {/* See details */}
        <div className="flex items-end gap-3">
          <span className="font-serif text-sm text-foreground mb-1">See details</span>
          <div className="w-8 h-8 border border-foreground/40 flex items-center justify-center text-foreground text-sm">
            ↵
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default GalleryUI;
