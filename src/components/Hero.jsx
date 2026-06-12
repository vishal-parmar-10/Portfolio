import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Background Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative text-center max-w-4xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            border-cyan-500/30
            bg-cyan-500/10
            text-cyan-400
            text-sm
            mb-6
          "
        >
          Available for Opportunities
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-400"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mt-4"
        >
          Vishal Parmar
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-cyan-400 mt-5"
        >
          Frontend Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-slate-400 text-lg leading-8"
        >
          Frontend Developer with hands-on experience in web
          development and modern web technologies.
          <br />
          <br />
          I have also worked on
          <span className="text-white">
            {" "}Shopify store customization
          </span>,
          theme management, product management, and collection setup,
          while continuously expanding my frontend development skills.
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <a
            href="#projects"
            className="
              px-7 py-3
              bg-cyan-500
              text-slate-950
              font-semibold
              rounded-xl
              hover:scale-105
              transition
            "
          >
            View Projects
          </a>

          <a
            href="/Vishal_Parmar_FlowCV.pdf"
            download
            className="
              px-7 py-3
              border border-slate-600
              rounded-xl
              hover:border-cyan-500
              hover:text-cyan-400
              transition
            "
          >
            Download Resume
          </a>

        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-8 text-2xl">

          <a
            href="https://github.com/vishal-parmar-10"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition"
          >
            <FiGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/vishal-parmar-41a098333"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition"
          >
            <FiLinkedin />
          </a>

          <a
            href="mailto:vishal2408007@gmail.com"
            className="text-slate-400 hover:text-cyan-400 transition"
          >
            <FiMail />
          </a>

        </div>

      </div>
    </section>
  );
};

export default Hero;