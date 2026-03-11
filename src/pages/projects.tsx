import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const PROJECTS = [
  {
    title: "Knowsy.game",
    sub: "Social Trivia Gaming Platform",
    role: "Lead Full-Stack & Mobile Developer",
    desc: "Real-time multiplayer trivia for a US-based client. Converted web → Android & iOS via Capacitor. E2E automation with Playwright. Secure FastAPI backend.",
    tags: ["React", "TypeScript", "Supabase", "Capacitor", "FastAPI"],
    image: "/images/knowsy.png",
    url: "https://knowsy.game",
    hex: "#14b8a6",
  },
  {
    title: "PRSTC Boys Hostel",
    sub: "Complete Hostel Management App",
    role: "Solo Founder-Developer",
    desc: "Idea → Play Store solo. Role-based dashboards, real-time attendance, payments, notices & mess menu. Zero production bugs.",
    tags: ["React Native", "Expo", "Supabase", "EAS Build"],
    image: "/images/15.jpeg",
    url: "https://play.google.com/store/apps/details?id=com.prstchostel",
    hex: "#3b82f6",
  },
  {
    title: "Xtrans Matrix",
    sub: "Corporate Website + APIs",
    role: "Full-Stack Developer",
    desc: "Full company website + REST APIs with auto-generated Swagger docs. Deployed on Render with security best practices.",
    tags: ["React", "TailwindCSS", "FastAPI", "Render"],
    image: "/images/xtmx.png",
    url: "https://xtransmatrix.com",
    hex: "#a855f7",
  },
  {
    title: "E-Commerce Platform",
    sub: "Full-Featured Online Store",
    role: "Lead Developer",
    desc: "Complete e-commerce solution with cart, checkout, payment gateway integration, admin dashboard, and inventory management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    image: "/images/ecommerce.png",
    url: "#",
    hex: "#f59e0b",
  },
  {
    title: "AI Tank Game",
    sub: "Interactive Gaming Application",
    role: "Solo Developer",
    desc: "AI-powered tank battle game with smart enemy AI, multiple levels, sound effects, and responsive gameplay.",
    tags: ["JavaScript", "HTML5 Canvas", "Game Dev", "AI"],
    image: "/images/aitank.png",
    url: "#",
    hex: "#ec4899",
  },
  {
    title: "EpicQ Quiz Platform",
    sub: "Online Quiz & Assessment Tool",
    role: "Full-Stack Developer",
    desc: "Quiz platform with real-time scoring, leaderboards, category filters, and detailed analytics dashboard.",
    tags: ["React", "Firebase", "Chart.js", "TailwindCSS"],
    image: "/images/epicq.png",
    url: "#",
    hex: "#22d3ee",
  },
  {
    title: "Warm Ambiance",
    sub: "Restaurant & Hospitality Website",
    role: "Frontend Developer",
    desc: "Elegant restaurant website with online reservations, menu display, gallery, and customer testimonials.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Node.js"],
    image: "/images/warmambiance.png",
    url: "#",
    hex: "#14b8a6",
  },
  {
    title: "Collaborative Frameworks",
    sub: "Business Consulting Website",
    role: "Full-Stack Developer",
    desc: "Corporate consulting website with service listings, team profiles, contact forms, and blog integration.",
    tags: ["React", "Next.js", "TypeScript", "CMS"],
    image: "/images/collaborativeframeworks.png",
    url: "#",
    hex: "#8b5cf6",
  },
];

const ProjectCard = ({ p, idx }: { p: typeof PROJECTS[0]; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [in_, setIn] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setIn(true), idx * 140); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [idx]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? p.hex + "38" : "rgba(255,255,255,0.06)"}`,
        opacity: in_ ? 1 : 0,
        transform: in_ ? "translateY(0)" : "translateY(44px)",
        transition: `opacity .65s ease ${idx*.1}s, transform .65s ease ${idx*.1}s, border-color .3s, box-shadow .3s`,
        boxShadow: hov ? `0 40px 70px ${p.hex}12` : "none",
      }}
    >
      {/* image with clip-path reveal */}
      <div className="relative overflow-hidden" style={{ height: "210px" }}>
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
          style={{
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform .6s ease",
            filter: hov ? "brightness(0.75)" : "brightness(0.6)",
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${p.hex}15 70%, rgba(6,10,10,0.92) 100%)` }} />
        {p.url !== "#" && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-black"
            style={{
              background: p.hex,
              opacity: hov ? 1 : 0,
              transform: hov ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity .25s ease, transform .25s ease",
            }}
          >
            <FaExternalLinkAlt size={9} /> Live
          </a>
        )}
      </div>

      {/* body */}
      <div className="p-6">
        <h3 className="text-lg font-black text-white">{p.title}</h3>
        <p className="text-xs mb-2" style={{ color: p.hex }}>{p.sub}</p>
        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3" style={{ color: p.hex, background: `${p.hex}12`, border: `1px solid ${p.hex}22` }}>{p.role}</span>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-md text-gray-500 font-mono" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [hv, setHv] = useState(false);
  const hr = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHv(true); }, { threshold: .2 });
    if (hr.current) o.observe(hr.current);
    return () => o.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-20" style={{ background: "#070d0d" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }} />
      <div className="max-w-7xl mx-auto">
        <div ref={hr} className="text-center mb-14" style={{ opacity: hv ? 1 : 0, transform: hv ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
          <p className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase mb-3 font-mono">Portfolio</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Featured <span style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
          <p className="text-gray-600 text-base max-w-lg mx-auto">A curated collection of work across web, mobile, and backend engineering</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} idx={i} />)}
        </div>

        <div className="text-center mt-12">
          <a href="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm" style={{ color: "#14b8a6", border: "1px solid rgba(20,184,166,0.25)", transition: "background .3s, border-color .3s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.25)"; }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;