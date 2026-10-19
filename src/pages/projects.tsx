import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaGooglePlay } from "react-icons/fa";
import { PROJECTS, type Project } from "../data/portfolio";


export const ProjectCard = ({ p, idx }: { p: Project; idx: number }) => {
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
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{
              transform: hov ? "scale(1.06)" : "scale(1)",
              transition: "transform .6s ease",
              filter: hov ? "brightness(0.75)" : "brightness(0.6)",
            }}
          />
        ) : (
          /* no screenshot yet: branded code-style cover */
          <div
            className="w-full h-full flex flex-col justify-center px-7"
            style={{
              background: `radial-gradient(circle at 85% 20%, ${p.hex}30 0%, transparent 55%), linear-gradient(135deg, ${p.hex}14, rgba(6,10,10,0.9))`,
              transform: hov ? "scale(1.04)" : "scale(1)",
              transition: "transform .6s ease",
            }}
          >
            <span className="text-5xl font-black leading-none" style={{ fontFamily: "'Georgia', serif", color: p.hex, opacity: 0.9 }}>{p.title.split(/[\s.]/)[0]}</span>
            <span className="mt-3 text-xs font-mono text-gray-500">{"// " + p.tags.slice(0, 3).join(" · ")}</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 30%, ${p.hex}15 70%, rgba(6,10,10,0.92) 100%)` }} />
        <span className="absolute top-3 left-3 text-[10px] font-mono font-semibold px-2 py-1 rounded-md text-gray-300" style={{ background: "rgba(6,10,10,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(6px)" }}>
          {p.year} · {p.category.join(" / ")}
        </span>
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
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 py-2 text-xs font-bold"
            style={{ color: p.hex }}
          >
            {p.url.includes("play.google") ? <><FaGooglePlay size={10} /> Get it on Play Store</>
              : p.url.includes("github.com") ? <><FaGithub size={11} /> View code</>
              : <><FaExternalLinkAlt size={9} /> Visit live site</>}
          </a>
        )}
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
          {PROJECTS.filter(p => p.featured).map((p, i) => <ProjectCard key={p.title} p={p} idx={i} />)}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm" style={{ color: "#14b8a6", border: "1px solid rgba(20,184,166,0.25)", transition: "background .3s, border-color .3s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.25)"; }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;