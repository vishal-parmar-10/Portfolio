import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DevSpace() {
  const containerRef = useRef(null);
  const designRef = useRef(null);
  const codeRef = useRef(null);
  const interactionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      });

      // Start positions: spread out
      gsap.set(designRef.current, { x: -300, opacity: 0 });
      gsap.set(codeRef.current, { x: 300, opacity: 0 });
      gsap.set(interactionRef.current, { scale: 0.5, opacity: 0, y: 100 });

      // Animate to converge
      tl.to(
        [designRef.current, codeRef.current, interactionRef.current],
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
        0
      )
      // Stay for a moment
      .to({}, { duration: 0.5 })
      // Then fade out together as it scrolls up
      .to(
        wrapperRef.current,
        { opacity: 0, y: -100, duration: 1, ease: "power2.in" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-full flex flex-col justify-center items-center text-center pointer-events-none px-6">
      <div ref={wrapperRef} className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-display font-bold text-[clamp(2.5rem,6vw,6rem)] uppercase text-[#F4F4F0] tracking-tighter leading-none">
          <span ref={designRef}>DESIGN</span>
          <span className="text-[#4DA3FF] font-sans font-light text-2xl md:text-5xl mt-2 md:mt-0">×</span>
          <span ref={codeRef}>CODE</span>
          <span className="text-[#4DA3FF] font-sans font-light text-2xl md:text-5xl mt-2 md:mt-0">×</span>
          <span ref={interactionRef}>INTERACTION</span>
        </div>
        
        <div className="mt-24 font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-[#888888]">
          ENTER SELECTED WORK
        </div>
      </div>
    </section>
  );
}
