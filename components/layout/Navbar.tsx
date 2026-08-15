"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeSection = useActiveSection();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-[var(--color-border)] shadow-sm py-3"
            : "py-5 bg-transparent"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Back to top"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary-600/30 transition-all duration-300">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight gradient-text hidden sm:block">
                Portfolio
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-primary-light)]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary-600/10 dark:bg-primary-400/10 rounded-lg"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--color-primary-light)] hover:bg-[var(--color-accent-light)] text-[var(--color-fg)] transition-colors duration-200"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Hire Me Badge */}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary-600/30 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Hire Me
              </motion.a>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-fg)]"
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass border-l border-[var(--color-border)] shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-lg gradient-text">Menu</span>
                  <motion.button
                    onClick={() => setMobileOpen(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-[var(--color-primary-light)]"
                    whileTap={{ scale: 0.92 }}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href;
                    return (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary-600/10 text-primary-600 dark:text-primary-400 font-semibold"
                            : "text-[var(--color-fg-muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-fg)]"
                        )}
                      >
                        {link.label}
                      </motion.button>
                    );
                  })}
                </nav>

                <div className="pt-6 border-t border-[var(--color-border)]">
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Hubungi Saya
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
