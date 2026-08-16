// ============================================================
// TypeScript Interfaces for Portfolio Data
// ============================================================

export interface PersonalInfo {
  name: string;
  nickname: string;
  title: string;
  degree: string;
  major: string;
  faculty: string;
  university: string;
  status: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  instagram: string;
  cvUrl: string;
  profileImage: string;
  availableForWork: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  icon: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: SkillItem[];
}

export type ProjectCategory =
  | "all"
  | "web"
  | "mobile"
  | "fullstack"
  | "ai-ml"
  | "tools";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  techStack: string[];
  features: string[];
  image: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  year: number;
  status: "completed" | "in-progress" | "archived";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: "internship" | "fulltime" | "parttime" | "freelance" | "volunteer";
  startDate: string;
  endDate: string | null; // null = present
  description: string;
  responsibilities: string[];
  techStack?: string[];
  logo?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  major: string;
  faculty: string;
  institution: string;
  location: string;
  startYear: number;
  endYear: number | null;
  gpa?: string;
  description?: string;
  achievements?: string[];
  logo?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  year: number;
  credentialId?: string | null;
  credentialUrl?: string | null;
  category: "cloud" | "programming" | "design" | "data" | "networking" | "general";
  featured?: boolean;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  instagram: string;
  location: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  stats: Stat[];
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates: Certificate[];
  contact: ContactInfo;
}
