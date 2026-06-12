import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";

const Contact = () => {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto py-24 px-6"
    >
      <div className="text-center">

        <p className="text-cyan-400 font-medium mb-2">
          Get In Touch
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Let's Work Together
        </h2>

        <p className="text-slate-400 mt-6 max-w-2xl mx-auto leading-8">
          I'm currently looking for opportunities as a
          Frontend Developer, React.js Developer, or Shopify Developer.
          If you have a role that matches my skills,
          I'd love to hear from you.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-16">

        {/* Email */}
        <a
          href="mailto:vishal2408007@gmail.com"
          className="
            block
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-6
            hover:border-cyan-500
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-center gap-3">
            <FiMail className="text-cyan-400 text-xl" />
            <span>Email</span>
          </div>

          <p className="mt-3 text-slate-400 break-all">
            vishal2408007@gmail.com
          </p>
        </a>

        {/* Phone */}
        <a
          href="tel:+918128351850"
          className="
            block
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-6
            hover:border-cyan-500
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-center gap-3">
            <FiPhone className="text-cyan-400 text-xl" />
            <span>Phone</span>
          </div>

          <p className="mt-3 text-slate-400">
            +91 8128351850
          </p>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/vishal-parmar-10"
          target="_blank"
          rel="noreferrer"
          className="
            block
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-6
            hover:border-cyan-500
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-center gap-3">
            <FiGithub className="text-cyan-400 text-xl" />
            <span>GitHub</span>
          </div>

          <p className="mt-3 text-slate-400">
            github.com/vishal-parmar-10
          </p>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vishal-parmar-41a098333"
          target="_blank"
          rel="noreferrer"
          className="
            block
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-6
            hover:border-cyan-500
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <div className="flex items-center gap-3">
            <FiLinkedin className="text-cyan-400 text-xl" />
            <span>LinkedIn</span>
          </div>

          <p className="mt-3 text-slate-400">
            linkedin.com/in/vishal-parmar-41a098333
          </p>
        </a>

      </div>
    </section>
  );
};

export default Contact;