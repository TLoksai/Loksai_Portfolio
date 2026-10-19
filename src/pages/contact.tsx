import { useState, useRef, useEffect } from "react";

/* Netlify Forms — a matching static form lives in index.html so Netlify detects it at deploy */
const FORM_NAME = "contact";
const encode = (data: Record<string, string>) => new URLSearchParams(data).toString();

/* ── Floating label input ── */
const Field = ({
  label, name, type = "text", value, onChange, required, rows,
}: {
  label: string; name: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={`field-${name}`}
        className="absolute left-4 pointer-events-none font-mono text-sm transition-all duration-200"
        style={{
          top: active ? "8px" : rows ? "16px" : "50%",
          transform: active ? "none" : rows ? "none" : "translateY(-50%)",
          fontSize: active ? "10px" : "14px",
          color: active ? (focused ? "#14b8a6" : "#8b95a5") : "#8b95a5",
          letterSpacing: active ? ".1em" : "normal",
          textTransform: active ? "uppercase" : "none",
        }}
      >
        {label}
      </label>

      {rows ? (
        <textarea
          id={`field-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl pt-6 pb-3 px-4 bg-transparent text-white text-sm resize-none outline-none"
          style={{
            background: focused ? "rgba(20,184,166,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "rgba(20,184,166,0.5)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused ? "0 0 0 3px rgba(20,184,166,0.08)" : "none",
            transition: "background .3s, border-color .3s, box-shadow .3s",
          }}
        />
      ) : (
        <input
          id={`field-${name}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl pt-6 pb-3 px-4 bg-transparent text-white text-sm outline-none"
          style={{
            background: focused ? "rgba(20,184,166,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "rgba(20,184,166,0.5)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: focused ? "0 0 0 3px rgba(20,184,166,0.08)" : "none",
            transition: "background .3s, border-color .3s, box-shadow .3s",
          }}
        />
      )}
    </div>
  );
};

/* ── Contact info card ── */
const InfoCard = ({ icon, title, value, href, hex, idx }: { icon: string; title: string; value: string; href?: string; hex: string; idx: number }) => {
  const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setVis(true), idx * 100); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [idx]);

  const El = href ? "a" : "div";
  return (
    <El
      ref={ref}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-4 p-4 rounded-2xl"
      style={{
        background: hov ? `${hex}08` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? hex + "35" : "rgba(255,255,255,0.07)"}`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity .6s ease, transform .6s ease, background .3s, border-color .3s",
        cursor: href ? "pointer" : "default",
        textDecoration: "none",
        boxShadow: hov ? `0 12px 28px ${hex}10` : "none",
      }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${hex}15`, border: `1px solid ${hex}25` }}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-xs uppercase tracking-widest font-mono">{title}</p>
        <p className="text-white text-sm font-semibold mt-0.5">{value}</p>
      </div>
      {href && (
        <div className="ml-auto" style={{ color: hex, opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-4px)", transition: "opacity .2s, transform .2s" }}>
          →
        </div>
      )}
    </El>
  );
};

/* ── Social link ── */
const SocialBtn = ({ label, icon, href, hex }: { label: string; icon: string; href: string; hex: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
    style={{ color: "#9ca3af", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = hex; el.style.borderColor = `${hex}35`; el.style.background = `${hex}08`; el.style.transform = "translateX(4px)"; }}
    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#9ca3af"; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = "rgba(255,255,255,0.02)"; el.style.transform = "none"; }}
  >
    <span className="text-base">{icon}</span> {label}
  </a>
);

/* ══ PAGE ══ */
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVis, setHeroVis] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formVis, setFormVis] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeroVis(true); }, { threshold: 0.1 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVis(true); }, { threshold: 0.1 });
    if (heroRef.current) o1.observe(heroRef.current);
    if (formRef.current) o2.observe(formRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const [botField, setBotField] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": FORM_NAME, ...form, "bot-field": botField }),
      });
      if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Couldn't send right now. Please try again, or email loksai2024@gmail.com / WhatsApp +91 7680872629.");
    } finally {
      setSending(false);
    }
  };

  const PROJECT_TYPES = ["Website / Landing page", "Web app / Dashboard", "Mobile app", "API / Backend", "Automation / Scraping", "Fix or upgrade"];

  const INFO = [
    { icon: "📧", title: "Email",     value: "loksai2024@gmail.com",     href: "mailto:loksai2024@gmail.com", hex: "#14b8a6" },
    { icon: "📞", title: "Phone",     value: "+91 7680872629",            href: "tel:+917680872629",           hex: "#3b82f6" },
    { icon: "📍", title: "Location",  value: "Bengaluru, Karnataka, IN",  href: undefined,                     hex: "#a855f7" },
    { icon: "🤝", title: "Freelance", value: "Available for new projects", href: undefined,                    hex: "#ec4899" },
    { icon: "⏱️", title: "Response",  value: "Usually within 24 hours",   href: undefined,                     hex: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#060a0a" }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-28 px-6 md:px-12 lg:px-20">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(20,184,166,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />

        <div
          ref={heroRef}
          className="relative max-w-7xl mx-auto text-center lg:text-left"
          style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(30px)", transition: "opacity .9s ease, transform .9s ease" }}
        >
          <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-4 font-mono">Contact</p>
          <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            <span className="block text-5xl md:text-6xl" style={{ color: "#e2e8f0" }}>Get In</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ background: "linear-gradient(120deg,#2dd4bf,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(20,184,166,0.3))" }}>Touch</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto lg:mx-0">
            Got a website, web app or mobile app in mind? I'm available for freelance projects — tell me what you need.
          </p>

          {/* desktop: me with my phone, standing on the section's bottom edge (phones/tablets never download it) */}
          <div className="hidden lg:block absolute right-0 xl:right-16 -bottom-28 w-[300px] pointer-events-none">
            <div className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.28) 0%, rgba(20,184,166,0.06) 55%, transparent 72%)" }} />
            <picture>
              <source media="(min-width: 1024px)" srcSet="/images/pose-contact.webp" />
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                alt="Loksai holding a phone, ready to chat"
                width={480}
                height={633}
                className="relative w-full h-auto select-none"
                draggable={false}
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
                }}
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="py-12 px-6 md:px-12 lg:px-20 overflow-x-clip" style={{ background: "#070d0d", borderTop: "1px solid rgba(20,184,166,0.08)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: info + socials */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-2 font-mono">Contact Info</p>
              <h2 className="text-3xl font-black text-white mb-6" style={{ fontFamily: "'Georgia',serif" }}>
                Let's <span style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
              </h2>
            </div>

            {INFO.map((c, i) => <InfoCard key={i} {...c} idx={i} />)}

            <div className="pt-4">
              <p className="text-gray-600 text-xs uppercase tracking-widest font-mono mb-3">Find me on</p>
              <div className="space-y-2">
                <SocialBtn label="GitHub" icon="🐙" href="https://github.com/TLoksai" hex="#e2e8f0" />
                <SocialBtn label="LinkedIn" icon="💼" href="https://www.linkedin.com/in/tammineniloksai/" hex="#0077b5" />
                <SocialBtn label="Instagram" icon="📸" href="https://www.instagram.com/loksai2002_/" hex="#e4405f" />
                <SocialBtn label="WhatsApp" icon="💬" href="https://wa.me/917680872629" hex="#25D366" />
                {/* Resume hidden for now — add public/resume.pdf, then restore:
                <SocialBtn label="Resume" icon="📄" href="/resume.pdf" hex="#14b8a6" /> */}
              </div>
            </div>
          </div>

          {/* RIGHT: form */}
          <div
            ref={formRef}
            className="lg:col-span-3"
            style={{ opacity: formVis ? 1 : 0, transform: formVis ? "translateX(0)" : "translateX(30px)", transition: "opacity .8s ease .2s, transform .8s ease .2s" }}
          >
            <div
              className="p-8 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-2 font-mono">Message</p>
              <h3 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Georgia',serif" }}>
                Send a <span style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Message</span>
              </h3>

              {success && (
                <div className="mb-5 p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.25)" }}>
                  <span className="text-teal-400 text-xl">✓</span>
                  <div>
                    <p className="text-teal-300 font-bold text-sm">Message sent!</p>
                    <p className="text-teal-500 text-xs mt-0.5">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-5 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
                  <p className="text-red-400 text-sm font-semibold">✗ {error}</p>
                </div>
              )}

              <form name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-4">
                {/* spam trap: hidden from people, bots fill it and Netlify drops the submission */}
                <p className="hidden" aria-hidden="true">
                  <label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={e => setBotField(e.target.value)} /></label>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <p className="text-gray-600 text-[11px] uppercase tracking-widest font-mono mb-2">What do you need?</p>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map(t => {
                      const active = form.subject === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setForm(f => ({ ...f, subject: t }))}
                          className="px-3 py-2 rounded-lg text-xs font-semibold"
                          style={{
                            color: active ? "#000" : "#9ca3af",
                            background: active ? "#14b8a6" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${active ? "#14b8a6" : "rgba(255,255,255,0.08)"}`,
                            transition: "background .2s, color .2s, border-color .2s",
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} required />
                <Field label="Your Message" name="message" value={form.message} onChange={handleChange} required rows={5} />

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2"
                  style={{
                    background: sending ? "rgba(20,184,166,0.5)" : "linear-gradient(135deg,#14b8a6,#0f766e)",
                    transition: "box-shadow .3s, transform .2s, opacity .3s",
                    opacity: sending ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (!sending) { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(20,184,166,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent" style={{ animation: "spin .7s linear infinite" }} />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Availability note ── */}
      <section className="py-12 px-6 text-center" style={{ background: "#060a0a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.18)" }}>
          <span className="w-2 h-2 rounded-full bg-teal-400" style={{ animation: "statusPing 2s ease infinite" }} />
          <span className="text-gray-400 text-sm">Currently <span className="text-teal-400 font-semibold">available</span> for freelance projects — web apps, mobile apps &amp; APIs.</span>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes statusPing { 0%,100%{box-shadow:0 0 0 0 rgba(20,184,166,0.5)} 50%{box-shadow:0 0 0 6px rgba(20,184,166,0)} }
      `}</style>
    </div>
  );
};

export default Contact;