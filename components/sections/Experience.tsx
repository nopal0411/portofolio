"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { staggerContainerVariant, staggerItemVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import { formatDate } from "@/lib/utils";
import type { ExperienceItem } from "@/types";

const typeLabels: Record<string, string> = {
  internship: "Magang",
  fulltime: "Full Time",
  parttime: "Part Time",
  freelance: "Freelance",
  volunteer: "Volunteer",
};

const typeBadge: Record<string, "primary" | "accent" | "success" | "warning" | "neutral"> = {
  internship: "accent",
  fulltime: "primary",
  parttime: "warning",
  freelance: "success",
  volunteer: "neutral",
};

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="section-padding"
      aria-label="Experience section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Experience"
          title="Pengalaman"
          titleHighlight="Profesional"
          subtitle="Perjalanan dan pengalaman kerja yang membentuk kemampuan saya sebagai developer."
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
            {(experience as ExperienceItem[]).map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={staggerItemVariant}
                className="relative sm:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-5 w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center shadow-lg shadow-primary-600/25 hidden sm:flex">
                  <Briefcase size={18} className="text-white" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, scale: 1.005 }}
                  className="card-base p-6 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant={typeBadge[exp.type] ?? "neutral"}>
                          {typeLabels[exp.type] ?? exp.type}
                        </Badge>
                        <span className="text-[10px] text-[var(--color-fg-subtle)] flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : "Sekarang"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--color-fg)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {exp.role}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-primary-600/10 flex items-center justify-center">
                      <Briefcase size={14} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-fg)]">{exp.company}</p>
                      <p className="text-xs text-[var(--color-fg-muted)] flex items-center gap-1">
                        <MapPin size={10} />
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <ul className="space-y-2 mb-4">
                    {exp.responsibilities.map((responsibility, ri) => (
                      <li key={ri} className="flex items-start gap-2 text-sm text-[var(--color-fg-muted)]">
                        <ChevronRight size={14} className="text-primary-600 mt-0.5 shrink-0" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]">
                      {exp.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--color-primary-light)] text-primary-600 dark:text-primary-400">
                          {tech}
                        </span>
                      ))}
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
