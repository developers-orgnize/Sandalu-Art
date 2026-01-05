import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 25;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-16">
          {/* Progress number */}
          <motion.div 
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-7xl md:text-9xl font-light text-foreground tabular-nums">
              {Math.round(progress)}%
            </span>
          </motion.div>

          {/* Loading text */}
          <motion.div 
            className="absolute bottom-8 md:bottom-16 right-8 md:right-16 text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-serif text-sm md:text-base text-muted-foreground tracking-ultra-wide lowercase">
              loading experience
            </span>
          </motion.div>

          {/* Progress line */}
          <motion.div 
            className="absolute bottom-8 md:bottom-16 left-8 md:left-16 right-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-px bg-muted w-full overflow-hidden">
              <motion.div 
                className="h-full bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
