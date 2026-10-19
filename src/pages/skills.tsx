import { useEffect, useRef, useState } from "react";
import { FaReact, FaGitAlt, FaPython, FaNodeJs, FaTheaterMasks } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiTypescript, SiTailwindcss, SiFastapi, SiMongodb, SiSupabase, SiCapacitor, SiExpo, SiFirebase,
  SiPostgresql, SiStripe, SiGithubactions, SiFlutter,
} from "react-icons/si";

const skills = [
  { name: "React",          Icon: FaReact,         hex: "#61DAFB", level: "Expert",       pct: 95 },
  { name: "TypeScript",     Icon: SiTypescript,    hex: "#3178C6", level: "Advanced",     pct: 85 },
  { name: "Tailwind",       Icon: SiTailwindcss,   hex: "#06B6D4", level: "Expert",       pct: 95 },
  { name: "React Native",   Icon: SiExpo,          hex: "#E2E8F0", level: "Advanced",     pct: 85 },
  { name: "Capacitor",      Icon: SiCapacitor,     hex: "#119EFF", level: "Advanced",     pct: 75 },
  { name: "Supabase",       Icon: SiSupabase,      hex: "#3ECF8E", level: "Expert",       pct: 90 },
  { name: "PostgreSQL",     Icon: SiPostgresql,    hex: "#4169E1", level: "Advanced",     pct: 75 },
  { name: "FastAPI",        Icon: SiFastapi,       hex: "#009688", level: "Advanced",     pct: 75 },
  { name: "Python",         Icon: FaPython,        hex: "#F7C948", level: "Advanced",     pct: 80 },
  { name: "Node.js",        Icon: FaNodeJs,        hex: "#68A063", level: "Intermediate", pct: 70 },
  { name: "Firebase",       Icon: SiFirebase,      hex: "#FFCA28", level: "Advanced",     pct: 80 },
  { name: "MongoDB",        Icon: SiMongodb,       hex: "#4DB33D", level: "Intermediate", pct: 65 },
  { name: "Playwright",     Icon: FaTheaterMasks,  hex: "#2EAD33", level: "Advanced",     pct: 75 },
  { name: "Stripe",         Icon: SiStripe,        hex: "#635BFF", level: "Intermediate", pct: 70 },
  { name: "OpenAI / LLMs",  Icon: RiOpenaiFill,    hex: "#10A37F", level: "Intermediate", pct: 70 },
  { name: "GitHub Actions", Icon: SiGithubactions, hex: "#2088FF", level: "Advanced",     pct: 75 },
  { name: "Flutter",        Icon: SiFlutter,       hex: "#02569B", level: "Intermediate", pct: 60 },
  { name: "Git",            Icon: FaGitAlt,        hex: "#F1502F", level: "Expert",       pct: 95 },
];

const LEVEL_COLOR: Record<string, string> = {
  Expert: "#14b8a6", Advanced: "#3b82f6", Intermediate: "#a855f7",
};

/* 3-D tilt card */
const SkillCard = ({ s, idx }: { s: typeof skills[0]; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [barFull, setBarFull] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setEntered(true), idx * 55); setTimeout(() => setBarFull(true), idx * 55 + 350); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [idx]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current!;
    const { left, top, width, height } = el.getBoundingClientRect();
    const rx = ((e.clientY - top) / height - 0.5) * 14;
    const ry = ((e.clientX - left) / width - 0.5) * -14;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    el.style.boxShadow = `0 20px 40px ${s.hex}18, 0 0 0 1px ${s.hex}40`;
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    el.style.boxShadow = "none";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative p-6 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${entered ? s.hex + "28" : "rgba(255,255,255,0.06)"}`,
        opacity: entered ? 1 : 0,
        transform: entered ? "perspective(600px) rotateX(0) rotateY(0) translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity .55s ease ${idx * 0.04}s, border-color .4s ease, box-shadow .3s ease`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        transitionProperty: entered ? "box-shadow, border-color" : "opacity, transform, border-color",
      }}
    >
      {/* icon + badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.hex}15` }}>
          <s.Icon style={{ color: s.hex, fontSize: "22px" }} />
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: LEVEL_COLOR[s.level], background: `${LEVEL_COLOR[s.level]}15`, border: `1px solid ${LEVEL_COLOR[s.level]}25` }}>
          {s.level}
        </span>
      </div>
      <h3 className="text-white font-bold text-sm mb-4">{s.name}</h3>
      {/* bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-700">Proficiency</span>
          <span style={{ color: s.hex }}>{s.pct}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: barFull ? `${s.pct}%` : "0%",
              background: `linear-gradient(90deg, ${s.hex}70, ${s.hex})`,
              boxShadow: barFull ? `0 0 8px ${s.hex}60` : "none",
              transition: "width 1.1s cubic-bezier(.4,0,.2,1) .2s, box-shadow .6s ease .8s",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [hv, setHv] = useState(false);
  const hr = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHv(true); }, { threshold: 0.2 });
    if (hr.current) o.observe(hr.current);
    return () => o.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#070d0d" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.18),transparent)" }} />

      <div className="max-w-7xl mx-auto">
        <div ref={hr} className="text-center mb-14" style={{ opacity: hv ? 1 : 0, transform: hv ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
          <p className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase mb-3 font-mono">Expertise</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Skills &amp; <span style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Technologies</span>
          </h2>
          <p className="text-gray-600 text-base max-w-md mx-auto">The tools I ship production web &amp; mobile apps with every day</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {skills.map((s, i) => <SkillCard key={i} s={s} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Skills;