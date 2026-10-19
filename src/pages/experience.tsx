import { useEffect, useRef, useState } from "react";
import { EXPERIENCE } from "../data/portfolio";

const RoleCard = ({ r, idx }: { r: typeof EXPERIENCE[0]; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [in_, setIn] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setIn(true), idx * 140); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [idx]);

  return (
    <div ref={ref} className="relative flex gap-5 md:gap-8">
      {/* rail */}
      <div className="hidden sm:flex flex-col items-center shrink-0 pt-7">
        <div className="w-3.5 h-3.5 rounded-full" style={{ background: r.hex, boxShadow: `0 0 14px ${r.hex}90` }} />
        {idx < EXPERIENCE.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${r.hex}50, transparent)` }} />}
      </div>

      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="flex-1 p-6 md:p-7 rounded-3xl mb-5"
        style={{
          background: hov ? `${r.hex}06` : "rgba(255,255,255,0.025)",
          border: `1px solid ${hov ? r.hex + "38" : "rgba(255,255,255,0.07)"}`,
          opacity: in_ ? 1 : 0,
          transform: in_ ? "none" : "translateY(32px)",
          transition: "opacity .65s ease, transform .65s ease, border-color .3s, background .3s",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-white font-black text-xl" style={{ fontFamily: "'Georgia', serif" }}>{r.role}</h3>
            <p className="text-sm font-semibold mt-1" style={{ color: r.hex }}>
              {r.company}
              <span className="text-gray-600 font-normal"> · {r.kind}</span>
            </p>
          </div>
          <span className="self-start text-xs font-mono font-semibold px-3 py-1.5 rounded-full whitespace-nowrap" style={{ color: r.hex, background: `${r.hex}12`, border: `1px solid ${r.hex}25` }}>
            {r.period}
          </span>
        </div>

        <ul className="space-y-2 mb-5">
          {r.points.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: r.hex }} />
              {p}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {r.stack.map((t, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-md text-gray-500 font-mono" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [hv, setHv] = useState(false);
  const hr = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHv(true); }, { threshold: .2 });
    if (hr.current) o.observe(hr.current);
    return () => o.disconnect();
  }, []);

  return (
    <section id="experience" className="relative py-24 px-6 md:px-12 lg:px-20" style={{ background: "#060a0a" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }} />
      <div className="max-w-5xl mx-auto">
        <div ref={hr} className="text-center mb-14" style={{ opacity: hv ? 1 : 0, transform: hv ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
          <p className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase mb-3 font-mono">Experience</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Where I've <span style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Worked</span>
          </h2>
          <p className="text-gray-600 text-base max-w-lg mx-auto">2+ years shipping production web apps, mobile apps, APIs and automation</p>
        </div>

        {EXPERIENCE.map((r, i) => <RoleCard key={i} r={r} idx={i} />)}
      </div>
    </section>
  );
};

export default Experience;
