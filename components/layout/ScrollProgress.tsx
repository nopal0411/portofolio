"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-gradient-to-r from-primary-600 via-accent-400 to-primary-400 origin-left"
      style={{ scaleX: progress / 100, transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
    />
  );
}
