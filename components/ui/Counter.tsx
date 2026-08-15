"use client";

import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

interface CounterProps {
  target: number;
  suffix?: string;
  className?: string;
  delay?: number;
}

export function Counter({ target, suffix = "", className, delay = 0 }: CounterProps) {
  const { count, ref } = useCounter(target, 2000, delay);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {count}
      {suffix}
    </span>
  );
}
