const marqueeText =
  "BRAND IDENTITY ● TYPOGRAPHY ● PACKAGING ● UI DESIGN ● VISUAL STORYTELLING ● COLOR THEORY ● ";

const Marquee = () => {
  return (
    <div
      className="border-y border-[--border] py-5 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="font-mono text-sm tracking-[0.15em] uppercase text-[--text-tertiary] whitespace-nowrap px-2"
          >
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
