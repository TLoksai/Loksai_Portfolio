import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Reusable scroll reveal hook ── */
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

/* ── Animated counter ── */
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(start);
    }, 35);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{val}{suffix}</span>;
};

/* ── Timeline item ── */
const TimelineItem = ({
  year, title, desc, accent, idx, last,
}: { year: string; title: string; desc: string; accent: string; idx: number; last: boolean }) => {
  const { ref, visible } = useReveal(idx * 120);
  return (
    <div
      ref={ref}
      className="relative flex gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      {/* line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-1 shrink-0"
          style={{ background: accent, boxShadow: `0 0 12px ${accent}80` }}
        />
        {!last && <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${accent}40, transparent)` }} />}
      </div>
      {/* content */}
      <div className="pb-10">
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-1 font-mono"
          style={{ color: accent }}
        >
          {year}
        </span>
        <h3 className="text-white font-bold text-base mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

/* ── Value card ── */
const ValueCard = ({
  icon, title, desc, hex, idx,
}: { icon: string; title: string; desc: string; hex: string; idx: number }) => {
  const { ref, visible } = useReveal(idx * 100);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: hov ? `${hex}08` : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? hex + "35" : "rgba(255,255,255,0.07)"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: "opacity .6s ease, transform .6s ease, background .3s, border-color .3s, box-shadow .3s",
        boxShadow: hov ? `0 20px 40px ${hex}12` : "none",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
        style={{ background: `${hex}14`, border: `1px solid ${hex}25` }}
      >
        {icon}
      </div>
      <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
};

/* ── Skill expertise bar ── */
const ExpertiseBar = ({
  label, pct, hex, idx,
}: { label: string; pct: number; hex: string; idx: number }) => {
  const { ref, visible } = useReveal(idx * 80);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-16px)", transition: `opacity .6s ease ${idx * .06}s, transform .6s ease ${idx * .06}s` }}>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400 font-mono">{label}</span>
        <span style={{ color: hex }}>{pct}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${hex}70, ${hex})`,
            boxShadow: visible ? `0 0 8px ${hex}50` : "none",
            transition: "width 1.2s cubic-bezier(.4,0,.2,1) .3s, box-shadow .6s ease .9s",
          }}
        />
      </div>
    </div>
  );
};

/* ══ PAGE ══ */
const Who = () => {
  const hero = useReveal();

  const timeline = [
    { year: "2022", title: "Started Web Development", desc: "Dived into HTML/CSS/JS and fell in love with building for the web. First projects were small but the passion was massive.", accent: "#14b8a6" },
    { year: "2023", title: "React & Full-Stack Growth", desc: "Mastered React, Node.js and began building complete applications. Landed first real client projects.", accent: "#3b82f6" },
    { year: "Feb 2025", title: "Full-Stack Developer · Xtrans Matrix", desc: "Led the company website and careers portal, built a FastAPI + PostgreSQL careers API and the AI Tank community platform.", accent: "#a855f7" },
    { year: "Sep 2025", title: "Full-Stack & Mobile Developer · Luverly", desc: "Joined the Knowsy team — realtime multiplayer games, multi-tenant Supabase backends, Stripe payments, Capacitor apps and 10k-user load tests.", accent: "#f59e0b" },
    { year: "Now", title: "Open for Freelance", desc: "Building websites and apps for clients — PRSTC Hostel on Google Play, Hotel Winsar Park, EpicQ and more — and taking on new freelance projects.", accent: "#ec4899" },
  ];

  const values = [
    { icon: "🎯", title: "Quality First",        desc: "Every line of code matters. Clean, maintainable, scalable — always.",               hex: "#14b8a6" },
    { icon: "🤝", title: "Collaboration",         desc: "Great products come from open communication and shared success.",                    hex: "#3b82f6" },
    { icon: "🚀", title: "Continuous Learning",   desc: "Technology evolves fast. I stay curious and committed to growing every day.",        hex: "#a855f7" },
    { icon: "⚡", title: "Fast Delivery",         desc: "I respect timelines. Rapid iteration without cutting corners on quality.",            hex: "#f59e0b" },
    { icon: "🔒", title: "Secure by Default",     desc: "Security isn't an afterthought — it's baked into architecture from day one.",        hex: "#ec4899" },
    { icon: "💡", title: "Problem Solver",        desc: "Complex challenges become elegant solutions through creative engineering.",          hex: "#22d3ee" },
  ];

  const expertise = [
    { label: "Frontend (React / TS)",     pct: 95, hex: "#14b8a6" },
    { label: "Mobile (RN / Expo / Capacitor)", pct: 85, hex: "#a855f7" },
    { label: "Supabase & Databases",      pct: 85, hex: "#3ECF8E" },
    { label: "Backend / APIs",            pct: 80, hex: "#3b82f6" },
    { label: "Testing & Load Testing",    pct: 75, hex: "#22d3ee" },
    { label: "DevOps & CI/CD",            pct: 75, hex: "#f59e0b" },
    { label: "AI Integrations",           pct: 70, hex: "#ec4899" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#060a0a", cursor: "default" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden py-28 px-6 md:px-12 lg:px-20" style={{ background: "linear-gradient(135deg, #060a0a 0%, #0a1a1a 50%, #060a0a 100%)" }}>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(20,184,166,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />

        <div
          ref={hero.ref}
          className="relative max-w-7xl mx-auto"
          style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(32px)", transition: "opacity .9s ease, transform .9s ease" }}
        >
          <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-4 font-mono">Who I Am</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ color: "#e2e8f0" }}>About</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ background: "linear-gradient(120deg,#2dd4bf,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(20,184,166,0.3))" }}>Me</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                Full-stack &amp; mobile developer from Bengaluru with 2+ years of professional experience. Currently building the Knowsy platform at Luverly, and available for freelance web and app projects.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-10">
                {[
                  { n: 15, suf: "+", label: "Projects Shipped" },
                  { n: 2,  suf: "+", label: "Years Experience" },
                  { n: 40, suf: "+", label: "Technologies"     },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl text-center"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(20,184,166,0.12)" }}
                  >
                    <div className="text-3xl font-black mb-1" style={{ fontFamily: "'Georgia',serif", background: "linear-gradient(135deg,#2dd4bf,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      <Counter target={s.n} suffix={s.suf} />
                    </div>
                    <div className="text-gray-600 text-xs uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo: me at work */}
            <figure className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] pointer-events-none" style={{ background: "radial-gradient(ellipse at 35% 40%, rgba(20,184,166,0.18), transparent 70%)" }} />
              <img
                srcSet="/images/scene-coding-800.webp 800w, /images/scene-coding-1280.webp 1280w"
                sizes="(min-width: 1024px) 600px, 100vw"
                src="/images/scene-coding-1280.webp"
                width={1280}
                height={853}
                alt="Loksai coding on a laptop at night"
                className="relative w-full h-auto rounded-3xl"
                style={{ border: "1px solid rgba(20,184,166,0.25)", boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(20,184,166,0.08)" }}
              />
              <figcaption className="absolute left-4 bottom-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono text-gray-200" style={{ background: "rgba(6,10,10,0.75)", border: "1px solid rgba(20,184,166,0.3)", backdropFilter: "blur(8px)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />Shipping code from Bengaluru
              </figcaption>
            </figure>
          </div>

          {/* Profile image strip */}
          <div className="mt-14 flex items-center gap-6">
            <img
              src="/images/avatar.webp"
              alt="Tammineni Loksai"
              width={80}
              height={80}
              className="w-20 h-20 rounded-2xl object-cover"
              style={{ border: "2px solid rgba(20,184,166,0.3)", boxShadow: "0 0 30px rgba(20,184,166,0.15)" }}
            />
            <div>
              <p className="text-white font-bold text-lg">Tammineni Loksai</p>
              <p className="text-teal-400 text-sm font-mono">Full-Stack &amp; Mobile Developer · Bengaluru, India</p>
              <div className="flex gap-2 mt-2">
                {["Available for freelance", "Remote friendly"].map((t, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ color: "#14b8a6", background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                    {i === 0 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 mr-1.5 animate-pulse" />}{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20" style={{ background: "#070d0d" }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Timeline */}
            <div>
              <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-3 font-mono">Journey</p>
              <h2 className="text-4xl font-black text-white mb-10" style={{ fontFamily: "'Georgia',serif" }}>
                My <span style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Timeline</span>
              </h2>
              <div>
                {timeline.map((t, i) => <TimelineItem key={i} {...t} idx={i} last={i === timeline.length - 1} />)}
              </div>
            </div>

            {/* Expertise bars */}
            <div>
              <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-3 font-mono">Expertise</p>
              <h2 className="text-4xl font-black text-white mb-10" style={{ fontFamily: "'Georgia',serif" }}>
                What I <span style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Excel At</span>
              </h2>
              <div className="space-y-5">
                {expertise.map((e, i) => <ExpertiseBar key={i} {...e} idx={i} />)}
              </div>

              {/* Story text */}
              <div className="mt-10 p-6 rounded-2xl" style={{ background: "rgba(20,184,166,0.04)", border: "1px solid rgba(20,184,166,0.12)" }}>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  My journey began with curiosity and a hunger to build. What started as tinkering with HTML is now production work — realtime multiplayer games, multi-tenant backends, payments, and apps on both app stores.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  I take on freelance projects for businesses that want one developer who can handle everything — design, web, mobile, backend and deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 px-6 md:px-12 lg:px-20" style={{ background: "#060a0a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-3 font-mono">Principles</p>
            <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Georgia',serif" }}>
              What I <span style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Value</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => <ValueCard key={i} {...v} idx={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="py-16 px-6 md:px-12 lg:px-20" style={{ background: "#070d0d", borderTop: "1px solid rgba(20,184,166,0.08)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "'Georgia',serif" }}>Want to work together?</h3>
          <p className="text-gray-500 mb-6">I'm available for freelance web and app projects. Tell me what you're building.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-black"
              style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", transition: "box-shadow .3s, transform .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(20,184,166,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              Get In Touch
            </Link>
            <Link to="/projects" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-gray-400"
              style={{ border: "1px solid rgba(255,255,255,0.1)", transition: "border-color .3s, color .3s, transform .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)"; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "#9ca3af"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Who;