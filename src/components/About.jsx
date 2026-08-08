import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for the traits as we scroll through the section
      gsap.fromTo(
        textRefs.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-44 px-6 md:px-12 w-full h-full flex flex-col justify-center items-center text-center pointer-events-none">
      
      <h2 
        ref={(el) => (textRefs.current[0] = el)}
        className="font-display font-bold tracking-tighter uppercase text-[#F4F4F0] mb-12 pointer-events-auto"
        style={{ fontSize: "clamp(4rem, 15vw, 12rem)", lineHeight: 0.85 }}
      >
        ABOUT
      </h2>

      <div className="max-w-2xl mx-auto space-y-8 pointer-events-auto">
        <p ref={(el) => (textRefs.current[1] = el)} className="font-sans text-xl md:text-3xl font-light text-[#F4F4F0] leading-relaxed">
          I'm Vishal — <br/>
          a creative developer and designer <br/>
          focused on creating visually strong <br/>
          digital experiences.
        </p>
        
        <div ref={(el) => (textRefs.current[2] = el)} className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8 font-sans text-xs uppercase tracking-widest text-[#888888]">
          <span>BCA Graduate</span>
          <span>•</span>
          <span>Creative Developer</span>
          <span>•</span>
          <span>Frontend Developer</span>
          <span>•</span>
          <span>Web Designer</span>
        </div>
      </div>
      
    </section>
  );
}