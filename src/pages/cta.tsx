import { useEffect, useRef, useState } from "react";

const CTA = () => {
  const [hv, setHv] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHv(true); }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#070d0d" }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.15),transparent)" }} />

      {/* pulsing bg glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)", animation: "ctaBreath 5s ease-in-out infinite" }} />
      </div>

      <div
        ref={ref}
        className="relative max-w-4xl mx-auto text-center"
        style={{ opacity: hv ? 1 : 0, transform: hv ? "none" : "translateY(36px)", transition: "opacity .8s ease, transform .8s ease" }}
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-14" style={{ background: "linear-gradient(to right,transparent,rgba(20,184,166,0.5))" }} />
          <span className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase font-mono">Let's work together</span>
          <div className="h-px w-14" style={{ background: "linear-gradient(to left,transparent,rgba(20,184,166,0.5))" }} />
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none" style={{ fontFamily: "'Georgia', serif" }}>
          Ready to Build<br />
          <span style={{ background: "linear-gradient(120deg,#2dd4bf 0%,#14b8a6 50%,#0d9488 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 20px rgba(20,184,166,0.25))" }}>
            Something Great?
          </span>
        </h2>

        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Let's discuss your vision and how I can bring it to life with modern technology solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-black"
            style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", transition: "box-shadow .3s, transform .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(20,184,166,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
          >
            Get In Touch
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
          <a href="/projects"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-gray-400 hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.1)", transition: "border-color .3s, color .3s, background .3s, transform .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
          >
            See My Work
          </a>
        </div>
      </div>

      <style>{`@keyframes ctaBreath { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.25);opacity:.35} }`}</style>
    </section>
  );
};

export default CTA;