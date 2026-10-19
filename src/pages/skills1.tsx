import { useEffect, useRef, useState } from "react";
import { SKILL_GROUPS } from "../data/portfolio";

const useReveal = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
};

const GroupCard = ({ g, idx }: { g: typeof SKILL_GROUPS[0]; idx: number }) => {
  const { ref, visible } = useReveal((idx % 3) * 110);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="p-7 rounded-3xl"
      style={{
        background: hov ? `${g.hex}07` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? g.hex + "38" : "rgba(255,255,255,0.07)"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: "opacity .6s ease, transform .6s ease, background .3s, border-color .3s",
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: `${g.hex}14`, border: `1px solid ${g.hex}28` }}>{g.icon}</div>
        <h3 className="text-white font-bold text-lg">{g.title}</h3>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{g.desc}</p>
      <div className="flex flex-wrap gap-2">
        {g.items.map(item => (
          <span key={item} className="text-xs px-2.5 py-1 rounded-lg font-mono" style={{ color: hov ? g.hex : "#9ca3af", background: "rgba(255,255,255,0.04)", border: `1px solid ${hov ? g.hex + "28" : "rgba(255,255,255,0.07)"}`, transition: "color .3s, border-color .3s" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ══ /skills ══ */
const SkillsPage = () => {
  const hero = useReveal();
  const total = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="min-h-screen" style={{ background: "#060a0a", cursor: "default" }}>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(20,184,166,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />
        <div
          ref={hero.ref}
          className="relative max-w-7xl mx-auto text-center"
          style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(30px)", transition: "opacity .9s ease, transform .9s ease" }}
        >
          <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-4 font-mono">Toolkit</p>
          <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            <span className="block text-5xl md:text-6xl" style={{ color: "#e2e8f0" }}>Skills &amp;</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ background: "linear-gradient(120deg,#2dd4bf,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(20,184,166,0.3))" }}>Stack</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {total}+ tools I've used in production over the last 2+ years — picked for the job, not for the hype.
          </p>
        </div>
      </section>

      {/* ── GROUPS ── */}
      <section className="pb-24 px-6 md:px-12 lg:px-20">
        <h2 className="sr-only">Skill areas</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, i) => <GroupCard key={g.title} g={g} idx={i} />)}
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;
