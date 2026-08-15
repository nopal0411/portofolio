"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

/**
 * Animated counter hook — counts from 0 to target value
 * when the element comes into view.
 */
export function useCounter(
  target: number,
  duration: number = 2000,
  delay: number = 0
) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const delayTimeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [inView, target, duration, delay]);

  return { count, ref };
}
