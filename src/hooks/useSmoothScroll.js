import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scroll. Disabled when prefers-reduced-motion is set.
 * Syncs with GSAP ScrollTrigger if available.
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger if loaded
    if (typeof window !== "undefined" && window.ScrollTrigger) {
      lenis.on("scroll", () => {
        window.ScrollTrigger.update();
      });
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
