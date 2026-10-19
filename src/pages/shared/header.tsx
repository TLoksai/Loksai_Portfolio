import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

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
    { href: "/#freelance", label: "Hire Me" },
    { href: "/contact", label: "Contact" },
  ];

  // "/#freelance" is a section, not a page — never mark it active
  const isPage = (href: string) => !href.includes("#");

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
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <div
              aria-hidden="true"
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
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end
                className={({ isActive }) =>
                  `relative text-sm font-medium whitespace-nowrap transition-colors duration-300 group ${isActive && isPage(link.href) ? "text-white" : "text-gray-400 hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-teal-400 transition-all duration-300 ${isActive && isPage(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-black whitespace-nowrap transition-all duration-300 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #14b8a6, #0f766e)",
              boxShadow: "0 0 0 rgba(20,184,166,0)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(20,184,166,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(20,184,166,0)"; }}
          >
            Let's Talk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-3 -mr-3"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
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
          id="mobile-nav"
          className="lg:hidden overflow-hidden"
          style={{
            maxHeight: isOpen ? "480px" : "0",
            visibility: isOpen ? "visible" : "hidden",
            transition: "max-height 0.4s ease, visibility 0.4s",
          }}
        >
          <nav className="py-4 border-t border-white/5" aria-label="Mobile">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.href}
                to={link.href}
                end
                className={({ isActive }) =>
                  `flex items-center py-3 transition-colors duration-300 font-medium ${isActive && isPage(link.href) ? "text-teal-400" : "text-gray-400 hover:text-teal-400"}`
                }
                style={{
                  borderBottom: i < navLinks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="flex items-center justify-center mt-4 py-3 rounded-xl font-semibold text-black"
              style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
              onClick={() => setIsOpen(false)}
            >
              Let's Talk
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
