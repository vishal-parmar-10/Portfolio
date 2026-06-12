const featuredProjects = [
  {
    title: "Today's Best Salon",
    description:
      "Complete salon management and appointment booking system built with PHP and MySQL. Customers can book appointments and manage bookings, while administrators can manage services, appointments, and customer records through a dedicated dashboard.",
    image: "/projects/Homepage.png",
    tech: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/vishal-parmar-10/Today-s-Best-Salon",
  },
  {
    title: "Developer Hub",
    description:
      "Developer-focused platform built with React.js featuring responsive design, reusable components, and modern frontend development practices.",
    image: "/projects/devhub.png",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/vishal-parmar-10/Developer-Hub",
  },
  {
    title: "Flask Blog App",
    description:
      "Blog management application built with Flask allowing users to create, edit, and manage articles with database integration.",
    image: "/projects/flask-blog.png",
    tech: ["Python", "Flask", "MySQL"],
    github: "https://github.com/vishal-parmar-10/flask-blog-app",
  },
];

const otherProjects = [
  {
    title: "BizScout",
    description:
      "Business discovery tool that identifies industries and checks whether they have an online website presence.",
  },
  {
    title: "Shopify Image Optimizer",
    description:
      "Utility tool that scans Shopify store images and converts them into optimized WebP format for improved performance.",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto py-24 px-6"
    >
      {/* Heading */}

      <div className="mb-14">
        <p className="text-cyan-400 font-medium mb-2">
          My Work
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Featured Projects
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl">
          A collection of projects that showcase my
          experience in frontend development, backend
          development, database management, and problem solving.
        </p>
      </div>

      {/* Featured Projects */}

      <div className="space-y-10">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              overflow-hidden
              hover:border-cyan-500
              transition-all
              duration-300
            "
          >
            <div className="grid lg:grid-cols-2">

              {/* Image */}

              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    hover:scale-105
                    transition-transform
                    duration-500
                  "
                />
              </div>

              {/* Content */}

              <div className="p-8 flex flex-col justify-center">

                <h3 className="text-2xl font-bold mb-4">
                  {project.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="
                        px-3
                        py-1
                        bg-slate-800
                        rounded-lg
                        text-sm
                        text-slate-300
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-6
                    text-cyan-400
                    font-medium
                    hover:text-cyan-300
                  "
                >
                  View Project →
                </a>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Other Projects */}

      <div className="mt-20">

        <h3 className="text-3xl font-bold mb-8">
          Other Projects
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {otherProjects.map((project) => (
            <div
              key={project.title}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
                hover:border-cyan-500
                transition-all
              "
            >
              <h4 className="text-xl font-semibold mb-3">
                {project.title}
              </h4>

              <p className="text-slate-400 leading-7">
                {project.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Projects;