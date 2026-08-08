import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorMode, setCursorMode] = useState("normal");
  const [isEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isFinePointer && !isTouch && !prefersReducedMotion;
    }
    return true;
  });


  useEffect(() => {
    if (!isEnabled) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const ticker = gsap.ticker.add(() => {
      const dt = 1 - Math.pow(1 - 0.2, gsap.ticker.deltaRatio());
      ringX += (mouseX - ringX) * dt;
      ringY += (mouseY - ringY) * dt;

      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });
    });

    const onMouseOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor], .project-card");
      if (!target) {
        setCursorMode("normal");
        setCursorText("");
        return;
      }

      const customCursorData = target.getAttribute("data-cursor");
      if (customCursorData === "project" || target.classList.contains("project-card")) {
        setCursorMode("project");
        setCursorText("VIEW");
      } else if (target.hasAttribute("target") && target.getAttribute("target") === "_blank") {
        setCursorMode("external");
        setCursorText("OPEN");
      } else {
        setCursorMode("hover");
        setCursorText("");
      }
    };

    const onMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related || !related.closest("a, button, [data-cursor], .project-card")) {
        setCursorMode("normal");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none select-none aria-hidden:true" aria-hidden="true">
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ${
          cursorMode === "normal"
            ? "w-2.5 h-2.5 bg-white"
            : cursorMode === "project" || cursorMode === "external"
            ? "w-16 h-16 bg-white text-black flex items-center justify-center font-mono text-[10px] font-bold tracking-widest uppercase scale-110 shadow-xl"
            : "w-4 h-4 bg-white"
        }`}
      >
        {cursorText && (
          <span className="select-none font-mono text-[10px] tracking-wider text-black">
            {cursorText}
          </span>
        )}
      </div>

      {/* Trailing Outer Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-500 ease-out ${
          cursorMode === "normal"
            ? "w-10 h-10 border-white/50"
            : cursorMode === "project" || cursorMode === "external"
            ? "w-20 h-20 border-white/80 scale-125"
            : "w-12 h-12 border-white/80"
        }`}
      />
    </div>
  );
}

