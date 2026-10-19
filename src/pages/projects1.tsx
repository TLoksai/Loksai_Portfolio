import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "./projects";
import { PROJECTS, CATEGORIES, type Category } from "../data/portfolio";

/* ══ /projects — every project, filterable by type ══ */
const ProjectsPage = () => {
  const [filter, setFilter] = useState<Category | "All">("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeroVis(true); }, { threshold: 0.1 });
    if (heroRef.current) o.observe(heroRef.current);
    return () => o.disconnect();
  }, []);

  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category.includes(filter));
  const count = (c: Category | "All") => (c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category.includes(c)).length);

  return (
    <div className="min-h-screen" style={{ background: "#060a0a", cursor: "default" }}>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(20,184,166,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />

        <div
          ref={heroRef}
          className="relative max-w-7xl mx-auto text-center"
          style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)", transition: "opacity .9s ease, transform .9s ease" }}
        >
          <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-4 font-mono">Portfolio</p>
          <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            <span className="block text-5xl md:text-6xl" style={{ color: "#e2e8f0" }}>Things I've</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ background: "linear-gradient(120deg,#2dd4bf,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(20,184,166,0.3))" }}>Built</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Client products, company platforms and side projects — web apps, mobile apps, APIs, automation and AI.
          </p>

          {/* filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {(["All", ...CATEGORIES] as const).map(c => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className="px-4 py-2 rounded-full text-xs font-semibold font-mono"
                  style={{
                    color: active ? "#000" : "#9ca3af",
                    background: active ? "linear-gradient(135deg,#14b8a6,#0f766e)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.08)"}`,
                    transition: "background .3s, color .3s, border-color .3s",
                  }}
                >
                  {c} <span style={{ opacity: 0.6 }}>{count(c)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="pb-24 px-6 md:px-12 lg:px-20" style={{ background: "#060a0a" }}>
        <h2 className="sr-only">{filter === "All" ? "All projects" : `${filter} projects`}</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((p, i) => <ProjectCard key={p.title} p={p} idx={i % 3} />)}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
