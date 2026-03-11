import { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.95)"
          : "rgba(10,10,10,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(20,184,166,0.15)" : "1px solid transparent",
        transition: "background 0.4s ease, border-color 0.4s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-black text-sm"
              style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
            >
              L
            </div>
            <span
              className="text-xl font-black tracking-wide"
              style={{
                background: "linear-gradient(135deg, #ffffff, #14b8a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LOKSAI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-teal-400 w-0 group-hover:w-full transition-all duration-300"
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #0f766e)",
              boxShadow: "0 0 0 rgba(20,184,166,0)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(20,184,166,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(20,184,166,0)"; }}
          >
            Let's Talk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className="w-5 h-0.5 bg-gray-300 transition-all duration-300"
              style={{ transform: isOpen ? "rotate(45deg) translate(2px, 8px)" : "none" }}
            />
            <span
              className="w-5 h-0.5 bg-gray-300 transition-all duration-300"
              style={{ opacity: isOpen ? 0 : 1 }}
            />
            <span
              className="w-5 h-0.5 bg-gray-300 transition-all duration-300"
              style={{ transform: isOpen ? "rotate(-45deg) translate(2px, -8px)" : "none" }}
            />
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: isOpen ? "400px" : "0",
            transition: "max-height 0.4s ease",
          }}
        >
          <nav className="py-4 border-t border-white/5">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center py-3 text-gray-400 hover:text-teal-400 transition-colors duration-300 font-medium"
                style={{
                  borderBottom: i < navLinks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="flex items-center justify-center mt-4 py-3 rounded-xl font-semibold text-black"
              style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
              onClick={() => setIsOpen(false)}
            >
              Let's Talk
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
