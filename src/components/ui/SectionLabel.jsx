const SectionLabel = ({ number, text }) => {
  return (
    <div className="mb-8">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-[--text-tertiary]">
        {number && `${number} — `}{text}
      </span>
      <div className="mt-3 w-10 h-px bg-[--accent]" />
    </div>
  );
};

export default SectionLabel;
