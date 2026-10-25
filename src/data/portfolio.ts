/* ─────────────────────────────────────────────────────────────
   Single source of truth for portfolio content.
   Edit here — home, /projects, /skills and /about all read from it.
   ───────────────────────────────────────────────────────────── */

export const AVAILABILITY = {
  badge: "Available for freelance",
  long: "I'm available for freelance web and mobile app projects — from quick fixes to full builds, for startups, small businesses and individuals.",
  whatsapp: "917680872629",
};

export const STATS = [
  { n: "15+", l: "Projects" },
  { n: "2+", l: "Years" },
  { n: "1k+", l: "Commits" },
];

/* ── Resume (keep in sync with the PDF in public/resume/) ── */
export const RESUME_URL = "/resume/Tammineni_Loksai_Resume.pdf";

/* ── Experience (newest first) ── */
export const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "Xtrasmatrix Consulting (XTMX)",
    kind: "Full-time",
    period: "Nov 2024 – Present",
    hex: "#14b8a6",
    points: [
      "Joined as the company's first developer and built the company website and careers portal from scratch across two versions (90+ commits) — services, industries, case studies, a job portal and admin dashboards.",
      "Built a FastAPI + PostgreSQL API for job applications with resume upload, email notifications and Swagger/OpenAPI docs.",
      "Developed the AI Tank learning-community platform (courses, events, admin) and its FastAPI + MongoDB OTP auth service.",
      "Set up CI/CD pipelines, domains and production monitoring; turned stakeholder requirements into features and onboarded new developers.",
    ],
    stack: ["React", "TypeScript", "Tailwind", "Firebase", "FastAPI", "PostgreSQL", "MongoDB", "Python", "Selenium"],
  },
  {
    role: "Freelance Full-Stack & Mobile Developer",
    company: "Independent",
    kind: "Client projects",
    period: "Mar 2025 – Present",
    hex: "#a855f7",
    points: [
      "Deliver web and mobile projects end-to-end for clients — scoping, build, deployment and handover.",
      "PRSTC Hostel — an Expo + Supabase hostel-management app built solo and published on Google Play.",
      "Websites for EpicQ (Agile training), Darshan Singh Choudhary (bilingual English/Hindi) and a Hotel Winsar Park rebuild with an admin CMS.",
      "A Telegram AI agent that reads receipts with a vision LLM and logs expenses to Google Sheets.",
    ],
    stack: ["React Native", "Expo", "React", "Supabase", "Tailwind", "i18next", "Python", "Groq"],
  },
];

/* ── Projects ── */
export const CATEGORIES = ["Web", "Mobile", "Backend", "AI & Automation"] as const;
export type Category = typeof CATEGORIES[number];

export interface Project {
  title: string;
  sub: string;
  role: string;
  desc: string;
  tags: string[];
  image?: string;
  url?: string;
  hex: string;
  category: Category[];
  year: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: "Knowsy Knows",
    sub: "Brand Engagement & Contest Platform",
    role: "Lead Developer · Client project",
    desc: "Platform where brands run ranking contests and live party games for customers, fans and employees. Built the realtime Konnect game, AI topic suggestions and Capacitor iOS/Android apps on a multi-tenant Supabase backend.",
    tags: ["React 19", "TypeScript", "Supabase", "Edge Functions", "Capacitor", "Cloudflare Workers", "OpenAI"],
    image: "/images/projects/knowsyknows.webp",
    url: "https://knowsyknows.game",
    hex: "#14b8a6",
    category: ["Web", "Mobile", "Backend"],
    year: "2026",
    featured: true,
  },
  {
    title: "Knowsy.game",
    sub: "Social Ranking & Trivia Game",
    role: "Lead Full-Stack & Mobile Developer · Client project",
    desc: "Multiplayer “how well do you know your friends” game with white-label team pages. Added Stripe checkout & webhooks, Shiprocket shipping, a Shopify store proxy on Cloud Run, AI players and k6 load tests.",
    tags: ["React", "TypeScript", "Supabase", "Stripe", "Cloud Run", "OpenAI", "k6"],
    image: "/images/projects/knowsy.webp",
    url: "https://knowsy.game",
    hex: "#3b82f6",
    category: ["Web", "Backend"],
    year: "2025–26",
    featured: true,
  },
  {
    title: "PRSTC Hostel",
    sub: "Hostel Management App · Android",
    role: "Solo Developer · Client",
    desc: "Idea → Play Store, solo. Students handle notices, leave, complaints and meals; admins manage students, meal attendance and announcements. Push notifications, Google Sign-In and CI-built APKs.",
    tags: ["React Native", "Expo", "Supabase", "EAS Build", "Jest"],
    image: "/images/projects/prstc.webp",
    url: "https://play.google.com/store/apps/details?id=com.prstc.hostel",
    hex: "#a855f7",
    category: ["Mobile"],
    year: "2025–26",
    featured: true,
  },
  {
    title: "UCO Hub",
    sub: "Android App + Web Console",
    role: "Solo Developer · Client",
    desc: "Operations system for a used-cooking-oil collection business. Hotels request pickups and collectors run routes in the Android app; owners run the network, inventory and payments from a 14-module web console.",
    tags: ["Expo", "React Native", "React 19", "Supabase", "Tailwind"],
    hex: "#f59e0b",
    category: ["Mobile", "Web"],
    year: "2026",
    featured: true,
  },
  {
    title: "GammaWealth",
    sub: "Wealth Distribution Website",
    role: "Solo Developer · Client",
    desc: "Site for an AMFI-registered mutual fund distributor — product catalogue, risk-profiler quiz, SEO (JSON-LD, sitemap) and preview deploys for every pull request.",
    tags: ["React 19", "TypeScript", "Tailwind v4", "Firebase", "GitHub Actions"],
    image: "/images/projects/gammawealth.webp",
    url: "https://gammawealth.in",
    hex: "#22d3ee",
    category: ["Web"],
    year: "2026",
    featured: true,
  },
  {
    title: "Expenses AI Agent",
    sub: "Receipt-Reading Telegram Bot",
    role: "Solo Developer · Personal",
    desc: "Snap a receipt in Telegram — a vision LLM extracts the details and logs them to a formatted Google Sheet per person. Webhook bot deployed on Render.",
    tags: ["Python", "Groq · Llama 4", "Telegram Bot API", "Flask", "Google Sheets"],
    url: "https://github.com/TLoksai/Expenses_ai_agent",
    hex: "#ec4899",
    category: ["AI & Automation", "Backend"],
    year: "2025",
    featured: true,
  },
  {
    title: "Hotel Winsar Park",
    sub: "Hotel Website Rebuild + Admin CMS",
    role: "Solo Developer · Client",
    desc: "Rebuild of a Vizag hotel's WordPress site with a Supabase admin panel for rooms, dining, banquet, gallery and enquiries. An image-optimisation pipeline fixed a 126 MB gallery page; booking, WhatsApp and UPI built in.",
    tags: ["React", "Vite", "Tailwind v4", "Supabase", "sharp"],
    hex: "#f97316",
    category: ["Web"],
    year: "2026",
  },
  {
    title: "Xtrans Matrix",
    sub: "Company Website, Careers Portal & API",
    role: "Full-Stack Developer · XTMX",
    desc: "Lead developer on the company site — services, industries, case studies, careers job portal and admin dashboards — plus a FastAPI + PostgreSQL API for job applications with resume upload.",
    tags: ["React", "TypeScript", "Tailwind", "GSAP", "FastAPI", "PostgreSQL"],
    image: "/images/projects/xtmx.webp",
    url: "https://xtransmatrix.com",
    hex: "#8b5cf6",
    category: ["Web", "Backend"],
    year: "2025",
  },
  {
    title: "AI Tank",
    sub: "AI Learning Community Platform",
    role: "Full-Stack Developer",
    desc: "Community platform for AI learners with courses & enrollment, events, faculty and admin pages — backed by a FastAPI + MongoDB auth API with email-OTP sign-up and password reset.",
    tags: ["React", "TypeScript", "Tailwind", "FastAPI", "MongoDB", "SendGrid"],
    image: "/images/projects/aitank.webp",
    url: "https://aitank.ai",
    hex: "#14b8a6",
    category: ["Web", "Backend"],
    year: "2025",
  },
  {
    title: "Darshan Singh Choudhary",
    sub: "Bilingual Public-Figure Website",
    role: "Frontend Developer · Client",
    desc: "English/Hindi site for a political leader — news & speeches, a government-schemes dashboard, digital gallery, report card and office contact.",
    tags: ["React", "TypeScript", "Tailwind", "i18next", "React Helmet"],
    image: "/images/projects/dharshan.webp",
    url: "https://darshansinghchoudhary.org",
    hex: "#22c55e",
    category: ["Web"],
    year: "2025–26",
  },
  {
    title: "EpicQ",
    sub: "Agile Training & Consulting Website",
    role: "Frontend Developer · Client",
    desc: "Site for an Agile/Scrum training firm — CSM, CSPO, PSM and SAFe course pages, workshops, enterprise programs, blogs & events, with enquiry forms.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion", "Supabase", "EmailJS"],
    image: "/images/projects/epicq.webp",
    hex: "#a855f7",
    category: ["Web"],
    year: "2025",
  },
  {
    title: "Contest Load Testing",
    sub: "Real-Browser Load & E2E Testing",
    role: "QA Automation · Knowsy (client project)",
    desc: "Load tests that drive real browsers through signup, lobby, topic-drop and leaderboard spikes from 10 to 10k users, reporting p50/p95/p99 latency — plus the Playwright E2E suite setup for Knowsy.",
    tags: ["Playwright", "Node.js", "TypeScript", "Express"],
    hex: "#3b82f6",
    category: ["AI & Automation"],
    year: "2026",
  },
  {
    title: "Paylio",
    sub: "Payments Wallet · UI Prototype",
    role: "Solo Developer · Concept",
    desc: "Expo app prototype of a UPI-style wallet — onboarding, PIN & security questions, balance, send money, QR scan, bill payments and rewards.",
    tags: ["React Native", "Expo", "NativeWind", "React Navigation"],
    hex: "#06b6d4",
    category: ["Mobile"],
    year: "2025",
  },
  {
    title: "Catalogue Scrapers",
    sub: "Product Data Extraction",
    role: "Python Developer",
    desc: "Python scrapers that turn product & vendor catalogues and Amazon listings into clean JSON / pandas datasets.",
    tags: ["Python", "requests", "selectolax", "pandas", "Jupyter"],
    hex: "#f59e0b",
    category: ["AI & Automation"],
    year: "2025",
  },
];

/* ── Skills, grouped (used on /skills) ── */
export const SKILL_GROUPS = [
  { title: "Frontend", icon: "🎨", hex: "#14b8a6", desc: "Fast, responsive interfaces with clean component architecture.",
    items: ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GSAP", "TanStack Query", "React Router", "i18next", "Recharts"] },
  { title: "Mobile", icon: "📱", hex: "#a855f7", desc: "One codebase for Android & iOS — from first screen to store release.",
    items: ["React Native", "Expo", "EAS Build", "NativeWind", "Capacitor", "Flutter", "Push notifications", "Play Store publishing"] },
  { title: "Backend & APIs", icon: "⚙️", hex: "#3b82f6", desc: "Secure, documented APIs and serverless functions.",
    items: ["Supabase Edge Functions", "FastAPI", "Node.js", "Express", "Flask", "Cloudflare Workers", "REST APIs", "Webhooks", "Auth & OTP flows"] },
  { title: "Databases", icon: "🗄️", hex: "#22d3ee", desc: "Data models with real security rules, not just tables.",
    items: ["PostgreSQL", "Supabase (RLS, Realtime)", "MongoDB", "Firebase", "SQLAlchemy", "Google Sheets API"] },
  { title: "Payments & Integrations", icon: "🔌", hex: "#f59e0b", desc: "Wiring products into the services businesses already use.",
    items: ["Stripe", "Shiprocket", "Shopify", "SendGrid", "EmailJS", "Telegram Bot API", "reCAPTCHA", "ImageKit"] },
  { title: "AI & Automation", icon: "🤖", hex: "#ec4899", desc: "LLM features and scripts that save people hours.",
    items: ["OpenAI API", "Groq (Llama vision)", "LLM agents", "Python", "Web scraping", "pandas", "selectolax"] },
  { title: "Testing & QA", icon: "🧪", hex: "#22c55e", desc: "Confidence before launch — from unit tests to 10k-user load tests.",
    items: ["Playwright", "k6 load testing", "Vitest", "Jest"] },
  { title: "DevOps & Deploy", icon: "🚀", hex: "#f97316", desc: "Automated pipelines and reliable hosting.",
    items: ["GitHub Actions", "Firebase Hosting", "Netlify", "Vercel", "Google Cloud Run", "Render", "Docker", "Git"] },
  { title: "Design", icon: "✏️", hex: "#8b5cf6", desc: "Turning ideas into clear, usable screens.",
    items: ["Figma", "UI / UX", "Responsive design", "SEO & Open Graph"] },
];

/* ── Freelance ── */
export const FREELANCE_OFFERS = [
  { icon: "🌐", title: "Websites & landing pages", desc: "Fast, SEO-ready sites for businesses, hotels, clinics and personal brands — with a simple admin panel if you need one.", hex: "#14b8a6" },
  { icon: "🧩", title: "Web apps & dashboards", desc: "Booking systems, admin consoles, portals and MVPs with login, roles, payments and real-time data.", hex: "#3b82f6" },
  { icon: "📱", title: "Android & iOS apps", desc: "Cross-platform apps with React Native / Expo or Capacitor — built, tested and published to the stores.", hex: "#a855f7" },
  { icon: "⚙️", title: "APIs & backends", desc: "Supabase, FastAPI or Node backends, database design, payment gateways and third-party integrations.", hex: "#22d3ee" },
  { icon: "🤖", title: "AI & automation", desc: "LLM-powered features, chatbots, document & receipt reading, web scraping and workflow automation.", hex: "#ec4899" },
  { icon: "🛠️", title: "Fixes, upgrades & support", desc: "Bug fixes, performance work, redesigns and ongoing maintenance for existing React / React Native projects.", hex: "#f59e0b" },
];

export const FREELANCE_STEPS = [
  { title: "Share your idea", desc: "Message me on WhatsApp, email or the contact form with what you need." },
  { title: "Plan & quote", desc: "I reply within 24 hours with scope, timeline and a clear quote." },
  { title: "Build & demo", desc: "I build in short milestones and share a working demo at each one, so you always see progress." },
  { title: "Launch & handover", desc: "Deployment, store publishing, source code and docs — plus support after launch." },
];
