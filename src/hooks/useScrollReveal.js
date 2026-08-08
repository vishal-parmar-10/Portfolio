import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-reveal animations using IntersectionObserver.
 * Returns a ref callback to attach to elements that should animate in.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal({ threshold = 0.15, delay = 0 } = {}) {
  const observerRef = useRef(null);
  const elementsRef = useRef(new Set());

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReduced) {
              entry.target.classList.remove("reveal-up");
              entry.target.style.opacity = "1";
              entry.target.style.transform = "none";
            } else {
              const d = entry.target.dataset.revealDelay || delay;
              setTimeout(() => {
                entry.target.classList.add("revealed");
              }, Number(d));
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    elementsRef.current.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, delay]);

  const ref = useCallback((node) => {
    if (node) {
      elementsRef.current.add(node);
      observerRef.current?.observe(node);
    }
  }, []);

  return ref;
}
