import { Link } from "react-router-dom";

/* ══ 404 ══ */
const NotFound = () => (
  <section className="relative overflow-hidden min-h-[70vh] flex items-center px-6 md:px-12 lg:px-20 py-28" style={{ background: "#060a0a" }}>
    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(20,184,166,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />

    <div className="relative max-w-3xl mx-auto text-center">
      <p className="text-teal-500 text-xs font-semibold tracking-[.4em] uppercase mb-4 font-mono">Error 404</p>
      <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Georgia', serif" }}>
        <span className="block text-5xl md:text-6xl" style={{ color: "#e2e8f0" }}>Page not</span>
        <span className="block text-6xl md:text-7xl lg:text-8xl" style={{ background: "linear-gradient(120deg,#2dd4bf,#14b8a6,#0d9488)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>found</span>
      </h1>
      <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
        This link doesn't go anywhere — but my projects do.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-bold text-sm text-black" style={{ background: "linear-gradient(135deg,#14b8a6,#0f766e)" }}>
          Back to home
        </Link>
        <Link to="/projects" className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-bold text-sm text-gray-300" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
          View projects
        </Link>
        <Link to="/contact" className="inline-flex items-center justify-center px-7 py-3 rounded-xl font-bold text-sm text-teal-400" style={{ border: "1px solid rgba(20,184,166,0.3)" }}>
          Contact me
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
