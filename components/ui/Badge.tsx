"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "success" | "warning" | "neutral" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  primary: "bg-primary-600/10 text-primary-600 dark:text-primary-400 border-primary-600/20",
  accent: "bg-accent-400/10 text-accent-500 dark:text-accent-400 border-accent-400/20",
  success: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  neutral: "bg-[var(--color-primary-light)] text-[var(--color-fg-muted)] border-[var(--color-border)]",
  outline: "bg-transparent text-[var(--color-fg-muted)] border-[var(--color-border)]",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium tracking-wide",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}
