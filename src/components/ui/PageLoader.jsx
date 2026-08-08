import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CRITICAL_ASSETS = [
  "/images/portrait.jpg",
  "/images/projects/aura-cover.jpg",
  "/images/projects/neon-cover.jpg",
  "/images/projects/zenith-cover.jpg",
  "/images/projects/pureform-cover.jpg",
  "/images/projects/monograph-cover.jpg",
];

export default function PageLoader({ onLoadingComplete }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const startTime = Date.now();
    const MIN_DURATION = 800; // Under 1 second for a polished feel when cached

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const completeLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 200); // small pause at 100%
    };

    const updateProgress = () => {
      loadedCount++;
      const targetProgress = Math.round((loadedCount / CRITICAL_ASSETS.length) * 100);
      
      // Update progress smoothly
      setProgress((prev) => Math.max(prev, targetProgress));

      if (loadedCount >= CRITICAL_ASSETS.length) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_DURATION - elapsedTime);

        setTimeout(() => {
          completeLoading();
        }, remainingTime);
      }
    };

    // If no assets to load
    if (CRITICAL_ASSETS.length === 0) {
      setTimeout(completeLoading, MIN_DURATION);
      return;
    }

    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress; // still increment to not block loading
    });

    // Fallback timer (10s) just in case images hang
    const fallbackTimer = setTimeout(() => {
      completeLoading();
    }, 10000);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = '';
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-end select-none overflow-hidden"
          style={{ backgroundColor: "var(--text-primary)", color: "var(--bg-primary)" }}
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          onAnimationComplete={(definition) => {
             // Optional: handle something after exit animation
             // We restore overflow here again just to be safe
             if (definition === "exit") {
               document.body.style.overflow = '';
             }
          }}
        >
          {/* Top Brand Tag */}
          <div className="absolute top-8 md:top-12 left-8 md:left-12 flex justify-between w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] mix-blend-difference">
            <span className="text-xs font-mono tracking-widest uppercase">VISHAL PARMAR</span>
            <span className="text-xs font-mono tracking-widest uppercase">PORTFOLIO</span>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 text-xs md:text-sm font-mono tracking-widest uppercase mix-blend-difference">
            Initializing Experience
          </div>

          {/* Progress Bar Container at Bottom */}
          <div className="w-full px-8 md:px-12 pb-8 md:pb-12 mix-blend-difference">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-80">Loading Assets...</span>
              <span className="text-xs md:text-sm font-mono opacity-80">{progress}%</span>
            </div>
            
            {/* The Bar */}
            <div className="w-full h-[2px] bg-[var(--bg-primary)]/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[var(--bg-primary)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
