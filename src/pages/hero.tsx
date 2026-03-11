import { useEffect, useRef, useState } from "react";

/* ─── Custom magnetic cursor ─── */
const MagneticCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 20}px,${ring.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full z-[9999] pointer-events-none" style={{ background: "#14b8a6", willChange: "transform" }} />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 rounded-full z-[9998] pointer-events-none" style={{ border: "1.5px solid rgba(20,184,166,0.5)", willChange: "transform" }} />
    </>
  );
};

/* ─── Canvas: floating code glyphs that react to mouse ─── */
const CodeField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, rafId = 0;

    const GLYPHS = [
      "const", "async", "=>", "{}", "[]", "fn()", "React",
      ".tsx", "API", "git", "npm", "type", "let", "import",
      "export", "return", "await", "</>", "0x1F", "&&", "||",
      "===", "null", "true", "render", "useEffect", "supabase",
      "FastAPI", "python", "node", "CI/CD", "push()", "build()",
    ];

    interface Glyph { x: number; y: number; vx: number; vy: number; text: string; baseAlpha: number; size: number; }
    let glyphs: Glyph[] = [];

    const init = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      glyphs = Array.from({ length: 55 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        baseAlpha: 0.07 + Math.random() * 0.15,
        size: 11 + Math.random() * 7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const REPEL = 140;

      for (const g of glyphs) {
        g.x += g.vx; g.y += g.vy;
        if (g.x < -80) g.x = W + 80; if (g.x > W + 80) g.x = -80;
        if (g.y < -40) g.y = H + 40; if (g.y > H + 40) g.y = -40;

        const dx = g.x - mx, dy = g.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = g.baseAlpha, scale = 1;

        if (dist < REPEL) {
          const f = 1 - dist / REPEL;
          g.x += dx * f * 0.07; g.y += dy * f * 0.07;
          alpha = Math.min(0.9, g.baseAlpha + f * 0.75);
          scale = 1 + f * 0.55;
        }

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.scale(scale, scale);
        ctx.font = `600 ${g.size}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(20,184,166,${alpha})`;
        ctx.fillText(g.text, 0, 0);
        ctx.restore();
      }

      // draw connection lines near mouse
      for (let i = 0; i < glyphs.length; i++) {
        for (let j = i + 1; j < glyphs.length; j++) {
          const a = glyphs[i], b = glyphs[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 85) {
            const ad = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2);
            const bd = Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2);
            if (ad < 170 || bd < 170) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(20,184,166,${(1 - d / 85) * 0.18})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", init);
    init(); draw();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", init); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ─── Animated terminal ─── */
const Terminal = () => {
  const lines = [
    { text: 'const dev = "Tammineni Loksai";', color: "#e2e8f0" },
    { text: 'const role = "Full-Stack & Mobile Dev";', color: "#e2e8f0" },
    { text: 'const stack = ["React","FastAPI","Supabase"];', color: "#94a3b8" },
    { text: 'const builds = ["Web","Mobile","APIs","Automation"];', color: "#94a3b8" },
    { text: "// ✓ Available for new projects", color: "#14b8a6" },
  ];
  const [shown, setShown] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (shown < lines.length) {
      const t = setTimeout(() => setShown(s => s + 1), 480 + shown * 320);
      return () => clearTimeout(t);
    }
  }, [shown]);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(6,10,10,0.9)",
        border: "1px solid rgba(20,184,166,0.18)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(20,184,166,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04]" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
        <span className="ml-3 text-xs text-gray-600 font-mono tracking-wide">portfolio.ts — loksai</span>
      </div>
      {/* Code */}
      <div className="p-5 font-mono text-sm space-y-2" style={{ minHeight: "155px" }}>
        {lines.slice(0, shown).map((line, i) => (
          <div key={i} className="flex gap-4" style={{ animation: "termLine 0.25s ease forwards", opacity: 0 }}>
            <span className="text-gray-700 select-none text-right w-3 flex-shrink-0">{i + 1}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}
        <div className="flex gap-4">
          <span className="text-gray-700 select-none text-right w-3 flex-shrink-0">{shown + 1}</span>
          <span style={{ color: "#14b8a6" }}>{cursor ? "▋" : "\u00A0"}</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Floating pills ─── */
const FloatingPills = () => {
  const pills = [
    { label: "React", left: "4%", top: "15%", delay: "0s" },
    { label: "TypeScript", left: "72%", top: "9%", delay: "0.7s" },
    { label: "FastAPI", left: "88%", top: "52%", delay: "1.3s" },
    { label: "Supabase", left: "2%", top: "72%", delay: "1s" },
    { label: "Capacitor", left: "62%", top: "90%", delay: "0.4s" },
    { label: "Selenium", left: "18%", top: "90%", delay: "1.6s" },
  ];
  return (
    <>
      {pills.map((p, i) => (
        <div
          key={i}
          className="absolute text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none"
          style={{
            left: p.left, top: p.top,
            color: "#14b8a6",
            background: "rgba(20,184,166,0.08)",
            border: "1px solid rgba(20,184,166,0.22)",
            backdropFilter: "blur(8px)",
            animation: `pillDrift 5s ease-in-out ${p.delay} infinite alternate`,
            fontFamily: "'Courier New', monospace",
          }}
        >
          {p.label}
        </div>
      ))}
    </>
  );
};

/* ─── Hero ─── */
const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  const fadeUp = (delay: string): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <>
      <MagneticCursor />

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#060a0a", cursor: "none" }}
      >
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(20,184,166,0.09) 0%, transparent 70%), radial-gradient(ellipse 30% 40% at 10% 60%, rgba(20,184,166,0.04) 0%, transparent 60%)",
        }} />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* canvas */}
        <div className="absolute inset-0"><CodeField /></div>

        {/* pills */}
        <div className="absolute inset-0 pointer-events-none"><FloatingPills /></div>

        {/* content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div className="space-y-7">
              {/* badge */}
              <div style={fadeUp("0.05s")}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ color: "#14b8a6", background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" style={{ animation: "badge 2s ease infinite" }} />
                  Open to opportunities
                </span>
              </div>

              {/* name */}
              <div style={fadeUp("0.15s")}>
                <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-2 font-mono">Hi, I'm</p>
                <h1 className="font-black leading-none" style={{ fontFamily: "'Georgia', serif" }}>
                  <span className="block text-5xl md:text-6xl lg:text-[5.5rem]" style={{ color: "#e2e8f0", letterSpacing: "-0.02em" }}>Tammineni</span>
                  <span className="block text-6xl md:text-7xl lg:text-[6.5rem]" style={{
                    background: "linear-gradient(120deg, #2dd4bf 0%, #14b8a6 50%, #0d9488 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 28px rgba(20,184,166,0.28))",
                    letterSpacing: "-0.03em",
                  }}>Loksai</span>
                </h1>
              </div>

              {/* role */}
              <div style={fadeUp("0.25s")} className="flex items-center gap-3">
                <div className="h-px w-8 flex-shrink-0" style={{ background: "rgba(20,184,166,0.5)" }} />
                <span className="text-gray-400 text-base md:text-lg font-light tracking-wide" style={{ fontFamily: "'Courier New', monospace" }}>
                  Full-Stack &amp; Mobile Developer
                </span>
              </div>

              {/* desc */}
              <p className="text-gray-500 text-sm leading-relaxed max-w-md" style={fadeUp("0.35s")}>
                I craft high-performance web &amp; mobile products — pixel-perfect UIs, scalable APIs, and everything in between. Clean code, fast delivery, real impact.
              </p>

              {/* stats */}
              <div className="flex gap-8" style={fadeUp("0.45s")}>
                {[{ n: "10+", l: "Projects" }, { n: "1+", l: "Years" }, { n: "15+", l: "Technologies" }].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black" style={{ fontFamily: "'Georgia', serif", background: "linear-gradient(135deg,#2dd4bf,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.n}</div>
                    <div className="text-xs text-gray-600 tracking-widest uppercase mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4" style={fadeUp("0.55s")}>
                <a href="#projects"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-black"
                  style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", transition: "box-shadow 0.3s, transform 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 32px rgba(20,184,166,0.45)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.transform = "none"; }}
                >
                  View My Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm"
                  style={{ color: "#14b8a6", border: "1px solid rgba(20,184,166,0.3)", transition: "background 0.3s, border-color 0.3s, transform 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(20,184,166,0.07)"; el.style.borderColor = "rgba(20,184,166,0.6)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(20,184,166,0.3)"; el.style.transform = "none"; }}
                >
                  Get In Touch
                </a>
              </div>
            </div>

            {/* RIGHT — terminal + mini cards */}
            <div className="flex flex-col gap-4" style={fadeUp("0.3s")}>
              <Terminal />

              <div className="grid grid-cols-3 gap-3">
                {[{ icon: "⚡", title: "Fast", sub: "Delivery" }, { icon: "🔒", title: "Secure", sub: "Code" }, { icon: "📱", title: "Mobile", sub: "First" }].map((card, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center py-4 rounded-xl text-center"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(20,184,166,0.09)", transition: "background 0.3s, border-color 0.3s, transform 0.2s, box-shadow 0.3s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(20,184,166,0.06)"; el.style.borderColor = "rgba(20,184,166,0.28)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 12px 24px rgba(20,184,166,0.08)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.02)"; el.style.borderColor = "rgba(20,184,166,0.09)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}
                  >
                    <span className="text-2xl mb-1">{card.icon}</span>
                    <span className="text-white font-bold text-sm">{card.title}</span>
                    <span className="text-gray-600 text-xs">{card.sub}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-xs text-gray-700 uppercase tracking-widest whitespace-nowrap font-mono">Built with</span>
                <div className="h-px flex-1 bg-white/5" />
                {["React", "TS", "Python", "SQL"].map((t, i) => (
                  <span key={i} className="text-xs font-mono font-semibold px-2 py-0.5 rounded" style={{ color: "#14b8a6", background: "rgba(20,184,166,0.1)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: visible ? 0.45 : 0, transition: "opacity 1s ease 2s" }}>
          <span className="text-[10px] text-gray-600 tracking-[0.4em] uppercase font-mono">scroll</span>
          <div className="w-5 h-8 rounded-full border border-gray-800 flex justify-center pt-2">
            <div className="w-1 h-1.5 rounded-full bg-teal-500" style={{ animation: "scrollWheel 2s ease-in-out infinite" }} />
          </div>
        </div>

        <style>{`
          @keyframes termLine { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:none; } }
          @keyframes pillDrift { from { transform:translateY(0) rotate(-1.5deg); } to { transform:translateY(-12px) rotate(1.5deg); } }
          @keyframes badge { 0%,100% { box-shadow:0 0 0 0 rgba(20,184,166,0.5); } 50% { box-shadow:0 0 0 5px rgba(20,184,166,0); } }
          @keyframes scrollWheel { 0% { opacity:1; transform:translateY(0); } 75% { opacity:0; transform:translateY(12px); } 100% { opacity:0; transform:translateY(0); } }
        `}</style>
      </section>
    </>
  );
};

export default Hero;