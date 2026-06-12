const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend Development",
    skills: [
      "Python",
      "FastAPI",
    ],
  },
  {
    title: "Database",
    skills: [
      "MySQL",
    ],
  },
  {
    title: "Tools & Version Control",
    skills: [
      "Git",
      "GitHub",
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto py-24 px-6"
    >
      <div className="mb-12">
        <p className="text-cyan-400 font-medium mb-2">
          What I Work With
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Skills & Technologies
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl">
          Technologies and tools I use to build responsive,
          modern, and user-friendly web applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-6
              hover:border-cyan-500
              transition-all
              duration-300
            "
          >
            <h3 className="text-xl font-semibold mb-5">
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-slate-800
                    text-slate-300
                    text-sm
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;