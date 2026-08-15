"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MessageCircle, ArrowUp, Code2, MapPin, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import portfolioData from "@/data/portfolio.json";

const socialLinks = [
  { icon: Github, href: portfolioData.personal.github, label: "GitHub" },
  { icon: Linkedin, href: portfolioData.personal.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: portfolioData.personal.instagram, label: "Instagram" },
  { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "Email" },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary-600/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-4">
              Fresh Graduate Informatika yang bersemangat membangun aplikasi web modern dan memberikan solusi digital terbaik.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-[var(--color-fg-muted)]">
              <MapPin size={14} className="text-primary-600" />
              {portfolioData.personal.location}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--color-fg)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-fg-muted)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600/40 group-hover:bg-primary-600 transition-colors duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-[var(--color-fg)] mb-4">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass border border-[var(--color-border)] flex items-center justify-center text-[var(--color-fg-muted)] hover:text-primary-600 hover:border-primary-600/30 hover:bg-primary-600/5 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>

            {/* Open to Work Badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Open to Work
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-fg-subtle)] text-center">
            © {new Date().getFullYear()} {portfolioData.personal.name}. Dibuat dengan{" "}
            <Heart size={11} className="inline text-red-500 mx-0.5" fill="currentColor" /> menggunakan Next.js & Tailwind CSS.
          </p>
          <p className="text-xs text-[var(--color-fg-subtle)]">
            All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-400 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-shadow duration-300"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.93 }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
