import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    "About",
    "Skills",
    "Projects",
    "Contact"
  ];

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-cyan-400">
          Vishal.
        </h1>

        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-cyan-400 transition"
            >
              {link}
            </a>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="md:hidden bg-slate-900 p-5 flex flex-col gap-4">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;