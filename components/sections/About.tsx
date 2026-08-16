"use client";

import { motion } from "framer-motion";
import {
  FolderCode, Code2, Award, GraduationCap,
  MapPin, Mail, Linkedin
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { staggerContainerVariant, staggerItemVariant, fadeLeftVariant, fadeRightVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";

const iconMap: Record<string, React.ElementType> = {
  FolderCode,
  Code2,
  Award,
  GraduationCap,
};

export function About() {
  const { personal, stats } = portfolioData;

  return (
    <section
      id="about"
      className="section-padding bg-[var(--color-bg-secondary)]"
      aria-label="About me section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Kenali"
          titleHighlight="Saya Lebih Dekat"
          subtitle="Seorang pengembang perangkat lunak yang bersemangat menciptakan solusi digital yang bermakna."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Bio */}
          <motion.div
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="space-y-5 text-[var(--color-fg-muted)] text-base leading-relaxed">
              <p>
                Saya adalah{" "}
                <strong className="text-[var(--color-fg)] font-semibold">
                  Sarjana Komputer (S.Kom.)
                </strong>{" "}
                dari Program Studi Informatika, Fakultas Ilmu Komputer,{" "}
                <strong className="text-[var(--color-fg)] font-semibold">
                  Universitas Bhayangkara Jakarta Raya
                </strong>.
              </p>
              <p>
                {personal.bio}
              </p>
              <p>
                Saya memiliki passion kuat dalam{" "}
                <strong className="text-primary-600 dark:text-primary-400">Full Stack Web Development</strong>,{" "}
                <strong className="text-primary-600 dark:text-primary-400">UI/UX Design</strong>, dan{" "}
                <strong className="text-primary-600 dark:text-primary-400">Artificial Intelligence</strong>.
                Saya percaya bahwa teknologi yang baik harus fungsional, beautiful, dan accessible bagi semua orang.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {[
                              { icon: MapPin, label: "Lokasi", value: personal.location },
                { icon: GraduationCap, label: "Status", value: personal.status },
                { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { icon: Linkedin, label: "LinkedIn", value: personal.linkedin.replace("https://", "").replace("www.", ""), href: personal.linkedin },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary-600/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-[var(--color-fg-subtle)] uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[var(--color-fg)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate block"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-xs font-medium text-[var(--color-fg)] truncate">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats Grid */}
          <motion.div
            variants={fadeRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, i) => {
                const Icon = iconMap[stat.icon] || Code2;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="card-base p-6 text-center group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600/10 to-accent-400/10 border border-primary-600/10 flex items-center justify-center mx-auto mb-4 group-hover:from-primary-600/20 group-hover:to-accent-400/20 transition-all duration-300">
                      <Icon size={22} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-3xl font-extrabold gradient-text mb-1">
                      <Counter target={stat.value} suffix={stat.suffix ?? ""} delay={i * 150} />
                    </div>
                    <p className="text-xs text-[var(--color-fg-muted)] font-medium">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
