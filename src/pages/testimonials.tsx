import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

const TESTIMONIALS = [
  { name: "Sarah Johnson",   role: "CEO, TechStart Inc.",        content: "Loksai delivered exceptional work on our Knowsy platform. His expertise in full-stack development and attention to detail resulted in a product that exceeded our expectations.", rating: 5, hex: "#14b8a6" },
  { name: "Michael Chen",    role: "Founder, InnovateLab",       content: "Working with Loksai was a game-changer for our mobile app. His technical skills and problem-solving abilities helped us launch a successful product our users love.",            rating: 5, hex: "#3b82f6" },
  { name: "Emily Rodriguez", role: "Project Manager, Digital Co", content: "Loksai's professionalism and dedication to quality are outstanding. He transformed our vision into a beautiful, functional website that perfectly represents our brand.",   rating: 5, hex: "#a855f7" },
];

const Testimonials = () => {
  const [hv, setHv] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHv(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20" style={{ background: "#060a0a" }} ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.14),transparent)" }} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14" style={{ opacity: hv ? 1 : 0, transform: hv ? "none" : "translateY(24px)", transition: "opacity .7s ease, transform .7s ease" }}>
          <p className="text-teal-500 text-xs font-semibold tracking-[.35em] uppercase mb-3 font-mono">Reviews</p>
          <h2 className="text-5xl md:text-6xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
            Client <span style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Testimonials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative p-7 rounded-3xl group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: hv ? 1 : 0,
                transform: hv ? "translateY(0)" : "translateY(30px)",
                transition: `opacity .6s ease ${i * .15}s, transform .6s ease ${i * .15}s, border-color .3s, box-shadow .3s`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${t.hex}30`; (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${t.hex}0e`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div className="text-5xl leading-none mb-3 font-serif" style={{ color: t.hex, opacity: 0.25 }}>"</div>
              <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, k) => <FaStar key={k} className="text-yellow-400 text-xs" />)}</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 italic">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: `linear-gradient(135deg,${t.hex},${t.hex}88)` }}>{t.name[0]}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;