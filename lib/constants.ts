// ============================================================
// Site Constants & Configuration
// ============================================================

export const siteConfig = {
  name: "MOH. NAUFAL FARIYAN, S.Kom.",
  shortName: "Naufal",
  title: "Full Stack Web Developer | Software Developer",
  description:
    "Website portofolio personal Moh. Naufal Fariyan — Fresh Graduate Informatika Universitas Bhayangkara Jakarta Raya. Full Stack Web Developer & Data Analyst yang membangun aplikasi web modern, cepat, dan responsif.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.vercel.app",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.vercel.app"}/og-image.png`,
  keywords: [
    "Moh Naufal Fariyan",
    "Naufal Fariyan",
    "portfolio",
    "web developer",
    "full stack developer",
    "software developer",
    "data analyst",
    "informatika",
    "fresh graduate",
    "bekasi",
    "laravel",
    "react",
    "nextjs",
    "typescript",
    "python",
    "ubhara",
  ],
  author: "Moh. Naufal Fariyan",
  twitterHandle: "@naufalfariyan",
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export const socialLinks = {
  github: "https://github.com/nopal0411",
  linkedin: "https://www.linkedin.com/in/naufalfariyan/",
  instagram: "https://instagram.com/naufalfariyan",
  email: "mailto:fariyannaufal3@gmail.com",
  whatsapp: "https://wa.me/6281211785556",
};

export const TYPING_PHRASES = [
  "Full Stack Web Developer",
  "Software Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Enthusiast",
  "Fresh Graduate S.Kom.",
];

export const PROJECT_CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "web", label: "Web App" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai-ml", label: "AI/ML & Data" },
  { id: "tools", label: "Tools" },
] as const;
