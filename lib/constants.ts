// ============================================================
// Site Constants & Configuration
// ============================================================

export const siteConfig = {
  name: "[NAMA ANDA], S.Kom.",
  shortName: "[NAMA ANDA]",
  title: "Full Stack Web Developer | Software Developer",
  description:
    "Website portofolio personal [NAMA ANDA] — Fresh Graduate Informatika Universitas Bhayangkara Jakarta Raya. Full Stack Web Developer yang membangun aplikasi web modern, cepat, dan responsif.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.vercel.app",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.vercel.app"}/og-image.png`,
  keywords: [
    "portfolio",
    "web developer",
    "full stack developer",
    "software developer",
    "informatika",
    "fresh graduate",
    "bekasi",
    "laravel",
    "react",
    "nextjs",
    "typescript",
  ],
  author: "[NAMA ANDA]",
  twitterHandle: "@[USERNAME]",
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
  github: "https://github.com/[USERNAME]",
  linkedin: "https://linkedin.com/in/[USERNAME]",
  instagram: "https://instagram.com/[USERNAME]",
  email: "mailto:[EMAIL@ANDA.COM]",
  whatsapp: "https://wa.me/628XXXXXXXXX",
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
  { id: "ai-ml", label: "AI/ML" },
  { id: "tools", label: "Tools" },
] as const;
