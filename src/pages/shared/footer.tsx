import { Linkedin, Instagram, FileText, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #050a0a 100%)",
        borderTop: "1px solid rgba(20,184,166,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-black font-black text-sm"
                style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
              >
                L
              </div>
              <span
                className="text-2xl font-black"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #14b8a6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                LOKSAI
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Full-stack developer crafting end-to-end solutions with React, Node.js, Python, and more.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Contact</h3>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: "+91 7680872629" },
                { icon: Mail, text: "loksai2024@gmail.com" },
                { icon: MapPin, text: "Bangalore, Karnataka, India" },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-500 text-sm">
                  <Icon size={14} className="text-teal-500 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Connect</h3>
            <div className="flex flex-col space-y-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/tammineniloksai/", label: "LinkedIn", color: "#0077B5" },
                { icon: Instagram, href: "https://www.instagram.com/loksai2002_/", label: "Instagram", color: "#E4405F" },
                { icon: FileText, href: "/resume.pdf", label: "Resume", color: "#14b8a6" },
              ].map(({ icon: Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300 text-sm"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${color}20`; (e.currentTarget as HTMLElement).style.borderColor = `${color}40`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    <Icon size={14} color={color} />
                  </div>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(20,184,166,0.2), transparent)" }} />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2026 Code & Creativity by LOKSAI</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-gray-600 text-xs">Available for new opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
