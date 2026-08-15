"use client";

import { motion } from "framer-motion";
import { progressVariant, viewportConfig } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  color?: "primary" | "accent" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
  delay?: number;
}

const colorClasses = {
  primary: "bg-primary-600",
  accent: "bg-accent-400",
  gradient: "bg-gradient-to-r from-primary-600 to-accent-400",
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  label,
  showValue = true,
  color = "gradient",
  size = "md",
  className,
  delay = 0,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-[var(--color-fg)]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-semibold text-[var(--color-fg-muted)] ml-auto">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      <div className="skill-bar-track">
        <motion.div
          className={cn("h-full rounded-full", colorClasses[color])}
          variants={progressVariant(clampedValue)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={delay}
          style={{ transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms` }}
        />
      </div>
    </div>
  );
}
