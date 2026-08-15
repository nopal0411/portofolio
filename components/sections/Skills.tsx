"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Layers, Database, Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { staggerContainerVariant, staggerItemVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Code2, Layers, Database, Wrench,
};

// Skill icon colors for pill display
const techIconColors: Record<string, string> = {
  php: "bg-[#777BB4]/10 text-[#777BB4]",
  javascript: "bg-[#F7DF1E]/10 text-[#ca9e00] dark:text-[#F7DF1E]",
  typescript: "bg-[#3178C6]/10 text-[#3178C6]",
  python: "bg-[#3776AB]/10 text-[#3776AB]",
  java: "bg-[#ED8B00]/10 text-[#ED8B00]",
  html: "bg-[#E34F26]/10 text-[#E34F26]",
  laravel: "bg-[#FF2D20]/10 text-[#FF2D20]",
  react: "bg-[#61DAFB]/10 text-[#0ea5e9]",
  nextjs: "bg-gray-100 dark:bg-gray-800 text-[var(--color-fg)]",
  nodejs: "bg-[#339933]/10 text-[#339933]",
  bootstrap: "bg-[#7952B3]/10 text-[#7952B3]",
  tailwindcss: "bg-[#06B6D4]/10 text-[#06B6D4]",
  mysql: "bg-[#4479A1]/10 text-[#4479A1]",
  postgresql: "bg-[#336791]/10 text-[#336791]",
  mongodb: "bg-[#47A248]/10 text-[#47A248]",
  redis: "bg-[#DC382D]/10 text-[#DC382D]",
  git: "bg-[#F05032]/10 text-[#F05032]",
  github: "bg-gray-100 dark:bg-gray-800 text-[var(--color-fg)]",
  figma: "bg-[#F24E1E]/10 text-[#F24E1E]",
  vscode: "bg-[#007ACC]/10 text-[#007ACC]",
  docker: "bg-[#2496ED]/10 text-[#2496ED]",
  postman: "bg-[#FF6C37]/10 text-[#FF6C37]",
};

export function Skills() {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState(skills[0].id);

  const currentCategory = skills.find((cat) => cat.id === activeCategory) ?? skills[0];

  return (
    <section
      id="skills"
      className="section-padding"
      aria-label="Skills section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="My Skills"
          title="Teknologi yang"
          titleHighlight="Saya Kuasai"
          subtitle="Kumpulan teknologi dan tools yang saya gunakan untuk membangun solusi digital berkualitas tinggi."
        />

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Skill categories"
        >
          {skills.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                id={`tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                    : "bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-primary-600/30 hover:text-[var(--color-fg)] hover:bg-[var(--color-primary-light)]"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={16} />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          key={activeCategory}
          id={`panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          variants={staggerContainerVariant}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {currentCategory.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={staggerItemVariant}
              whileHover={{ y: -4, scale: 1.01 }}
              className="card-base p-5 group"
            >
              <div className="flex items-center gap-3 mb-4">
                {/* Skill Icon Pill */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
                    techIconColors[skill.icon] ?? "bg-primary-600/10 text-primary-600"
                  )}
                >
                  {skill.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-[var(--color-fg)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-[var(--color-fg-subtle)]">
                    {skill.level >= 85
                      ? "Expert"
                      : skill.level >= 70
                      ? "Advanced"
                      : skill.level >= 55
                      ? "Intermediate"
                      : "Beginner"}
                  </p>
                </div>
                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                  {skill.level}%
                </span>
              </div>

              <ProgressBar
                value={skill.level}
                showValue={false}
                delay={i * 80}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* All Skills Pill Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-7 card-base"
        >
          <h3 className="text-sm font-semibold text-[var(--color-fg-muted)] mb-5 text-center uppercase tracking-widest">
            All Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {portfolioData.skills.flatMap((cat) => cat.skills).map((skill) => (
              <motion.span
                key={skill.name}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold border border-[var(--color-border)] cursor-default",
                  techIconColors[skill.icon] ?? "bg-primary-600/5 text-primary-600"
                )}
                whileHover={{ scale: 1.06, y: -2 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
