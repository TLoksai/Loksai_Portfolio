import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./pages/shared/header";
import Footer from "./pages/shared/footer";
import Hero from "./pages/hero";
import Who from "./pages/who";
import Contact from "./pages/contact";
import Skills from "./pages/skills";
import Skills1 from "./pages/skills1";
import Services from "./pages/services";
import Projects from "./pages/projects";
import Experience from "./pages/experience";
import Freelance from "./pages/freelance";
import CTA from "./pages/cta";
import Projects1 from "./pages/projects1";
import NotFound from "./pages/notfound";
import WhatsApp from "./pages/whatsapp";

const NAME = "Tammineni Loksai";

/* Client-side navigation neither resets scroll nor follows #hash links — handle both */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    if (!hash) {
      if (!samePage) window.scrollTo(0, 0);
      return;
    }
    // the target section mounts with the route, so retry briefly until it exists
    let tries = 0;
    const t = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el || ++tries > 40) {
        clearInterval(t);
        el?.scrollIntoView({ behavior: samePage ? "smooth" : "auto" });
      }
    }, 50);
    return () => clearInterval(t);
  }, [pathname, hash, key]);

  return null;
};

const Page = ({ title, children }: { title: string; children: React.ReactNode }) => {
  useEffect(() => { document.title = title; }, [title]);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const Home = () => (
  <Page title={`${NAME} — Full-Stack & Mobile Developer | Available for Freelance`}>
    <Hero />
    <Experience />
    <Skills />
    <Services />
    <Projects />
    <Freelance />
    <CTA />
  </Page>
);

const AboutUs = () => (
  <Page title={`About — ${NAME}`}>
    <Who />
  </Page>
);

const SkillsPage = () => (
  <Page title={`Skills — ${NAME}`}>
    <Skills1 />
    <CTA />
  </Page>
);

const ProjectsPage = () => (
  <Page title={`Projects — ${NAME}`}>
    <Projects1 />
    <CTA />
  </Page>
);

const ContactPage = () => (
  <Page title={`Contact — ${NAME} | Hire for Freelance`}>
    <Contact />
  </Page>
);

const NotFoundPage = () => (
  <Page title={`Page not found — ${NAME}`}>
    <NotFound />
  </Page>
);

const App = () => {
  return (
    <Router>
      <ScrollManager />
      <div className="min-h-screen font-sans" style={{ background: "#060a0a" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* ✅ WhatsApp Button (Visible on all pages) */}
        <WhatsApp />
      </div>
    </Router>
  );
};

export default App;
