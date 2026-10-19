import { useEffect, useRef, useState } from "react";
import { FaCode, FaMobileAlt, FaServer, FaRobot } from "react-icons/fa";

const SERVICES = [
  { Icon: FaCode,     title: "Full-Stack Web Dev",        desc: "End-to-end web apps with React & TypeScript — responsive UIs, auth & roles, payments, realtime data, CI/CD and cloud deployment.", tag: "React · TypeScript · Supabase", hex: "#14b8a6" },
  { Icon: FaMobileAlt,title: "Mobile Development",         desc: "Cross-platform apps with React Native/Expo, Capacitor or Flutter — one codebase for Android & iOS, published to the stores.", tag: "Expo · Capacitor · EAS",       hex: "#3b82f6" },
  { Icon: FaServer,   title: "Backend & API Dev",          desc: "Secure backends with Supabase edge functions, FastAPI & Node.js. Row-level security, documented REST APIs, webhooks & integrations.",   tag: "Supabase · FastAPI · Postgres",  hex: "#a855f7" },
  { Icon: FaRobot,    title: "Automation & AI",            desc: "LLM features & agents, web scraping, E2E and load testing, workflow automation — less manual work, more reliable apps.",          tag: "Python · Playwright · LLM APIs", hex: "#f59e0b" },
];

/* Spotlight card: a moving gradient follows the cursor */
const ServiceCard = ({ svc, idx }: { svc: typeof SERVICES[0]; idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setEntered(true), idx * 110); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [idx]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    setSpot({ x: ((e.clientX - left) / width) * 100, y: ((e.clientY - top) / height) * 100 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative p-8 rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid rgba(255,255,255,0.07)`,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .6s ease ${idx * .1}s, transform .6s ease ${idx * .1}s, border-color .3s ease, box-shadow .3s ease`,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${svc.hex}35`; (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 60px ${svc.hex}10`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      {/* spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(200px at ${spot.x}% ${spot.y}%, ${svc.hex}12 0%, transparent 80%)`,
          transition: "opacity .3s ease",
        }}
      />
      {/* number */}
      <div className="absolute top-5 right-6 text-6xl font-black pointer-events-none" style={{ color: svc.hex, opacity: 0.05, fontFamily: "'Georgia', serif" }}>
        {String(idx + 1).padStart(2, "0")}
      </div>
      {/* icon */}
      <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${svc.hex}14`, border: `1px solid ${svc.hex}28`, transition: "box-shadow .3s" }}>
        <svc.Icon style={{ color: svc.hex, fontSize: "22px" }} />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{svc.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full font-mono" style={{ color: svc.hex, background: `${svc.hex}10`, border: `1px solid ${svc.hex}1e` }}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: svc.hex }} />{svc.tag}
      </span>
    </div>
  );
};

const Services = () => {
  const [hv, setHv] = useState(false);
  const hr = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHv(true); }, { threshold: .2 });
    if (hr.current) o.observe(hr.current);
    return () => o.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20" style={{ background: "#060a0a" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }} />
      <div className="max-w-7xl mx-auto">
        <div ref={hr} className="text-center mb-14" style={{ opacity: hv ? 1 : 0, transform: hv ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
          <p className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase mb-3 font-mono">Services</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            What I <span style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Do</span>
          </h2>
          <p className="text-gray-600 text-base max-w-md mx-auto">Transforming ideas into digital reality with cutting-edge technologies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;