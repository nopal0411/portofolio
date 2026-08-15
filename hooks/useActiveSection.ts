"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/constants";

/**
 * Tracks which section is currently active in the viewport
 * for the sticky navbar active indicator.
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("#home");

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return activeSection;
}
