import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { AVAILABILITY, FREELANCE_OFFERS, FREELANCE_STEPS } from "../data/portfolio";

const FACTS = [
  { icon: "⏱️", text: "Replies within 24 hours" },
  { icon: "🌍", text: "Remote — clients anywhere" },
  { icon: "💬", text: "Updates on WhatsApp or email" },
  { icon: "📦", text: "Source code & docs on handover" },
];

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

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "none" : "translateY(28px)",
  transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
});

const Freelance = () => {
  const head = useReveal();
  const body = useReveal(100);

  return (
    <section id="freelance" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#060a0a" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }} />
      <div className="absolute -right-40 top-20 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto">
        {/* heading */}
        <div ref={head.ref} className="text-center mb-14" style={reveal(head.visible)}>
          <p className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase mb-3 font-mono">Freelance</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Open for <span style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Freelance</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">{AVAILABILITY.long}</p>
        </div>

        <div ref={body.ref} className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* LEFT: schedule + how it works */}
          <div className="lg:col-span-2 flex flex-col gap-5" style={reveal(body.visible)}>
            {/* availability */}
            <div className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(20,184,166,0.14)" }}>
              <div className="flex items-center justify-between mb-5">
                <p className="text-white font-bold text-sm">Availability</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ color: "#14b8a6", background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />Open for projects
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FACTS.map(f => (
                  <li key={f.text} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-gray-400" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-base">{f.icon}</span>{f.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* process */}
            <div className="p-6 rounded-3xl flex-1" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-white font-bold text-sm mb-5">How it works</p>
              <ol className="space-y-4">
                {FREELANCE_STEPS.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 font-mono" style={{ color: "#14b8a6", background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.22)" }}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-gray-200 text-sm font-semibold">{s.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT: what I take on */}
          <div className="lg:col-span-3 flex flex-col gap-5" style={reveal(body.visible, 0.15)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FREELANCE_OFFERS.map((o, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", transition: "border-color .3s, background .3s, transform .2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${o.hex}40`; el.style.background = `${o.hex}08`; el.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = "rgba(255,255,255,0.025)"; el.style.transform = "none"; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3" style={{ background: `${o.hex}14`, border: `1px solid ${o.hex}28` }}>{o.icon}</div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{o.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA banner — on desktop I stand at its left edge, pointing at it */}
        <div className="relative mt-10 lg:mt-32" style={reveal(body.visible, 0.25)}>
          <picture>
          <source media="(min-width: 1024px)" srcSet="/images/pose-freelance.webp" />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            alt="Loksai pointing to the project form"
            width={480}
            height={542}
            loading="lazy"
            className="hidden lg:block absolute left-10 bottom-0 h-[330px] w-auto z-10 select-none pointer-events-none"
            draggable={false}
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, #000 82%, transparent 100%)",
              filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))",
            }}
          />
          </picture>
          <div
            className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 lg:py-16 lg:pl-[360px] lg:pr-10 rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.14), rgba(13,148,136,0.03))", border: "1px solid rgba(20,184,166,0.25)" }}
          >
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full pointer-events-none hidden lg:block" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.22) 0%, transparent 70%)" }} />
            <div className="relative">
              <p className="text-white font-black text-2xl md:text-3xl" style={{ fontFamily: "'Georgia', serif" }}>Have a web or app idea?</p>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-md">Send me the details — I'll reply with a plan and quote within 24 hours.</p>
            </div>
            <div className="relative flex flex-wrap gap-3 flex-shrink-0">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-black" style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", transition: "box-shadow .3s, transform .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(20,184,166,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                Start a project
              </Link>
              <a href={`https://wa.me/${AVAILABILITY.whatsapp}?text=${encodeURIComponent("Hi Loksai, I have a freelance project I'd like to discuss.")}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm" style={{ color: "#25D366", border: "1px solid rgba(37,211,102,0.3)", transition: "background .3s, transform .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
              >
                <FaWhatsapp size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Freelance;
