"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5",
            "bg-primary-600/10 dark:bg-primary-400/10 text-primary-600 dark:text-primary-400 border border-primary-600/20"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse" />
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--color-fg)] leading-tight tracking-tight mb-4"
      >
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className={cn(
            "text-[var(--color-fg-muted)] text-base sm:text-lg leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={cn(
          "mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary-600 to-accent-400",
          align === "center" ? "mx-auto" : ""
        )}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
      />
    </div>
  );
}
