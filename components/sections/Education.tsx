"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainerVariant, staggerItemVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import type { EducationItem } from "@/types";

export function Education() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="section-padding bg-[var(--color-bg-secondary)]"
      aria-label="Education section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Education"
          title="Latar Belakang"
          titleHighlight="Pendidikan"
          subtitle="Perjalanan akademik yang membangun fondasi kuat dalam ilmu komputer dan teknologi."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-0.5 timeline-line hidden sm:block" />

          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-8"
          >
            {(education as EducationItem[]).map((edu) => (
              <motion.div
                key={edu.id}
                variants={staggerItemVariant}
                className="relative sm:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-5 w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center shadow-lg shadow-primary-600/25 hidden sm:flex">
                  <GraduationCap size={18} className="text-white" />
                </div>

                <motion.div
                  whileHover={{ y: -3, scale: 1.005 }}
                  className="card-base p-6 group"
                >
                  {/* Year Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-400/10 text-accent-500 dark:text-accent-400 border border-accent-400/20">
                      <Calendar size={10} />
                      {edu.startYear} — {edu.endYear ?? "Sekarang"}
                    </span>
                  </div>

                  {/* Header */}
                  <h3 className="text-lg font-bold text-[var(--color-fg)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">
                    {edu.major} · {edu.faculty}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-primary-600/10 flex items-center justify-center">
                      <GraduationCap size={14} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-fg)]">{edu.institution}</p>
                      <p className="text-xs text-[var(--color-fg-muted)] flex items-center gap-1">
                        <MapPin size={10} />
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  {edu.gpa && (
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary-600/5 to-accent-400/5 border border-primary-600/10">
                      <Trophy size={14} className="text-amber-500" />
                      <span className="text-sm font-semibold text-[var(--color-fg)]">
                        IPK: {edu.gpa}
                      </span>
                      <span className="text-xs text-[var(--color-fg-muted)]">/ 4.00</span>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-4">
                      {edu.description}
                    </p>
                  )}

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <h4 className="text-xs font-bold text-[var(--color-fg)] uppercase tracking-wider mb-3">
                        Pencapaian
                      </h4>
                      <ul className="space-y-1.5">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]">
                            <span className="text-amber-500 mt-0.5">🏆</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
