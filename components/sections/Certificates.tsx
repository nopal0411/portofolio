"use client";

import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { staggerContainerVariant, staggerItemVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import type { Certificate } from "@/types";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  cloud: "from-sky-500/20 to-blue-500/20 border-sky-500/20",
  programming: "from-violet-500/20 to-purple-500/20 border-violet-500/20",
  design: "from-pink-500/20 to-rose-500/20 border-pink-500/20",
  data: "from-green-500/20 to-emerald-500/20 border-green-500/20",
  networking: "from-orange-500/20 to-amber-500/20 border-orange-500/20",
  general: "from-primary-600/20 to-accent-400/20 border-primary-600/20",
};

const categoryIcon: Record<string, string> = {
  cloud: "☁️",
  programming: "💻",
  design: "🎨",
  data: "📊",
  networking: "🌐",
  general: "🏅",
};

const issuerColors: Record<string, string> = {
  Google: "text-[#EA4335]",
  Microsoft: "text-[#00A4EF]",
  "Dicoding Indonesia": "text-[#4F46E5]",
  "Cisco Networking Academy": "text-[#049fd9]",
  "Coursera (Stanford University)": "text-[#0056D2]",
  "BNSP (Badan Nasional Sertifikasi Profesi)": "text-[#E63946]",
};

export function Certificates() {
  const { certificates } = portfolioData;
  const featured = (certificates as Certificate[]).filter((c) => c.featured);
  const others = (certificates as Certificate[]).filter((c) => !c.featured);

  return (
    <section
      id="certificates"
      className="section-padding"
      aria-label="Certificates section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Certificates"
          title="Sertifikat &"
          titleHighlight="Pencapaian"
          subtitle="Bukti komitmen saya dalam terus belajar dan mengembangkan keahlian di bidang teknologi."
        />

        {/* Featured Certificates */}
        {featured.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold text-[var(--color-fg-muted)] uppercase tracking-widest mb-5 flex items-center gap-2">
              <Award size={14} className="text-amber-500" />
              Sertifikat Unggulan
            </h3>
            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5"
            >
              {featured.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={staggerItemVariant}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={cn(
                    "card-base p-5 group relative overflow-hidden",
                    "bg-gradient-to-br",
                    categoryColors[cert.category]
                  )}
                >
                  {/* Background icon */}
                  <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 select-none">
                    {categoryIcon[cert.category]}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border border-[var(--color-border)] flex items-center justify-center text-xl shadow-sm shrink-0">
                      {categoryIcon[cert.category]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="warning" size="sm">⭐ Featured</Badge>
                        <span className="text-[10px] text-[var(--color-fg-subtle)] flex items-center gap-1">
                          <Calendar size={9} />
                          {cert.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[var(--color-fg)] leading-snug mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className={cn("text-xs font-semibold mb-3", issuerColors[cert.issuer] ?? "text-primary-600")}>
                        {cert.issuer}
                      </p>

                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Other Certificates */}
        {others.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-[var(--color-fg-muted)] uppercase tracking-widest mb-5 flex items-center gap-2">
              <Award size={14} className="text-[var(--color-fg-muted)]" />
              Sertifikat Lainnya
            </h3>
            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {others.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={staggerItemVariant}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="card-base p-4 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-lg shrink-0">
                      {categoryIcon[cert.category]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-[var(--color-fg)] leading-snug mb-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className={cn("text-[10px] font-semibold mb-2 truncate", issuerColors[cert.issuer] ?? "text-[var(--color-fg-muted)]")}>
                        {cert.issuer}
                      </p>
                      <div className="flex items-center">
                        <span className="text-[10px] text-[var(--color-fg-subtle)]">{cert.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
