export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full h-full flex flex-col justify-end pb-32 md:pb-48 px-6 md:px-12 pointer-events-none relative z-20"
    >
      <div className="w-full pointer-events-auto">
        <h2
          className="font-display font-bold uppercase tracking-tighter text-[#F4F4F0] mb-16 leading-[0.85]"
          style={{ fontSize: "clamp(4rem, 10vw, 10rem)" }}
        >
          LET'S BUILD <br />
          SOMETHING <br />
          <span className="text-[#888888]">INTERESTING.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-4">
            <a href="mailto:vishal2408007@gmail.com"
              className="font-sans text-xl md:text-3xl font-light text-[#E8E8E8] hover:text-[#4DA3FF] transition-colors w-fit"
            >
              EMAIL
            </a>
            <a
              href="https://github.com/vishal-parmar-10"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xl md:text-3xl font-light text-[#E8E8E8] hover:text-[#4DA3FF] transition-colors w-fit"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/vishal-parmar-41a098333/"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xl md:text-3xl font-light text-[#E8E8E8] hover:text-[#4DA3FF] transition-colors w-fit"
            >
              LINKEDIN
            </a>
          </div>

          <div className="flex flex-col justify-end md:text-right">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#555555]">
              AVAILABLE FOR <br />
              FREELANCE / INTERNSHIP / FULL-TIME OPPORTUNITIES
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
