const About = () => {
  return (
    <section
      id="about"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <p className="text-cyan-400 font-medium mb-2">
            Get To Know Me
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            About Me
          </h2>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Side */}
          <div>
            <p className="text-slate-300 leading-8 text-lg">
              I am a BCA graduate with a strong interest in frontend
              development and modern web technologies.
            </p>

            <p className="text-slate-400 leading-8 mt-6">
              My experience includes building responsive web applications
              using React.js, JavaScript, Tailwind CSS, Python, and MySQL.
              I have also worked with Shopify stores, handling theme
              customization, product management, and collection management.
            </p>

            <p className="text-slate-400 leading-8 mt-6">
              I enjoy turning ideas into user-friendly digital experiences
              and continuously improving my technical skills through
              hands-on projects and learning.
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Education */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-5">
                Education
              </h3>

              <div>
                <h4 className="text-lg font-medium">
                  Bachelor of Computer Applications (BCA)
                </h4>

                <p className="text-slate-400 mt-2">
                  OM VVIM college, Morbi
                </p>

                <p className="text-cyan-400 mt-2">
                  Graduation: 2026
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;