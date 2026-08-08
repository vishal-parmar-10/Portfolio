import { useState, useEffect, useRef } from "react";

/**
 * Tracks mouse position via requestAnimationFrame for smooth cursor effects.
 * No-ops on touch devices.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const update = () => {
      setPosition({ ...posRef.current });
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
}
