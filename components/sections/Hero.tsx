"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import {
  Download, MessageCircle, ArrowRight, Github, Linkedin,
  MapPin, Sparkles, ChevronDown
} from "lucide-react";
import { TYPING_PHRASES } from "@/lib/constants";
import { staggerContainerVariant, staggerItemVariant } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import { formatWhatsAppLink } from "@/lib/utils";

// Build typing sequence for react-type-animation
const typingSequence: (string | number)[] = [];
TYPING_PHRASES.forEach((phrase) => {
  typingSequence.push(phrase, 2200);
});

export function Hero() {
  const { personal } = portfolioData;
  const waLink = formatWhatsAppLink(personal.whatsapp, "Halo! Saya tertarik untuk berdiskusi dengan Anda.");

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F0F9FF] dark:from-[#0B1120] dark:via-[#0F172A] dark:to-[#0C1628]" />

        {/* Blob 1 */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-primary-600/10 dark:bg-primary-600/15 blur-3xl"
        />
        {/* Blob 2 */}
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 0.92, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[8%] w-80 h-80 rounded-full bg-accent-400/10 dark:bg-accent-400/15 blur-3xl"
        />
        {/* Blob 3 */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[55%] left-[55%] w-56 h-56 rounded-full bg-primary-400/8 dark:bg-accent-400/8 blur-3xl"
        />

        {/* Floating dots grid */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #2563EB 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen lg:min-h-0 lg:py-24">

          {/* Left — Text */}
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            animate="visible"
            className="flex flex-col order-2 lg:order-1"
          >
            {/* Available Badge */}
            <motion.div variants={staggerItemVariant} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for Work · Bekasi, Indonesia
                <MapPin size={10} />
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={staggerItemVariant}
              className="text-[var(--color-fg-muted)] font-medium text-lg mb-2"
            >
              Halo, Saya 👋
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={staggerItemVariant}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-[var(--color-fg)] mb-4"
            >
              {personal.name}
              <br />
              <span className="gradient-text">{personal.degree}</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              variants={staggerItemVariant}
              className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-5 min-h-[2rem]"
            >
              <Sparkles size={22} className="text-accent-400 shrink-0" />
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                cursor
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={staggerItemVariant}
              className="text-[var(--color-fg-muted)] text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              Membangun aplikasi web modern yang{" "}
              <strong className="text-[var(--color-fg)] font-semibold">cepat</strong>,{" "}
              <strong className="text-[var(--color-fg)] font-semibold">responsif</strong>,{" "}
              <strong className="text-[var(--color-fg)] font-semibold">aman</strong>, dan memberikan{" "}
              <strong className="text-[var(--color-fg)] font-semibold">pengalaman pengguna terbaik</strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItemVariant}
              className="flex flex-wrap gap-3 mb-10"
            >
              {/* Download CV */}
              <motion.a
                href={personal.cvUrl}
                download
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/35 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Download CV"
              >
                <Download size={16} />
                Download CV
              </motion.a>

              {/* Hubungi Saya */}
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Chat via WhatsApp"
              >
                <MessageCircle size={16} />
                Hubungi Saya
              </motion.a>

              {/* Lihat Project */}
              <motion.button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-fg)] font-semibold text-sm hover:border-primary-600/40 hover:bg-[var(--color-primary-light)] transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Lihat Project
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItemVariant} className="flex items-center gap-4">
              <span className="text-xs text-[var(--color-fg-subtle)] font-medium">Follow me:</span>
              {[
                { icon: Github, href: personal.github, label: "GitHub" },
                { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--color-fg-muted)] hover:text-primary-600 dark:hover:text-primary-400 border border-[var(--color-border)] hover:border-primary-600/30 hover:bg-[var(--color-primary-light)] transition-all duration-200"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-600 via-accent-400 to-primary-600 opacity-20 blur-xl"
              />

              {/* Spinning gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #2563EB, #38BDF8, #2563EB)",
                  opacity: 0.6,
                }}
              />

              {/* Profile image container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] rounded-full overflow-hidden border-4 border-[var(--color-bg)]"
              >
                {/* Fallback gradient avatar (shown if image fails) */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-400 flex items-center justify-center z-0">
                  <span className="text-7xl font-bold text-white select-none">
                    {personal.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                {/* Real profile photo — sits on top of the fallback */}
                <Image
                  src={personal.profileImage}
                  alt={`Foto profil ${personal.name}`}
                  fill
                  className="object-cover object-[center_20%] z-10 relative"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 416px"
                />
              </motion.div>

              {/* Floating badges around the image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass border border-[var(--color-border)] rounded-2xl px-3 py-2 text-xs font-semibold text-[var(--color-fg)] shadow-lg"
              >
                🎓 S.Kom.
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass border border-[var(--color-border)] rounded-2xl px-3 py-2 text-xs font-semibold text-[var(--color-fg)] shadow-lg"
              >
                💻 Full Stack Dev
              </motion.div>

              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -translate-y-1/2 -right-12 glass border border-[var(--color-border)] rounded-2xl px-3 py-2 text-xs font-semibold text-[var(--color-fg)] shadow-lg hidden lg:block"
              >
                ⚡ React
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Down Indicator ── */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-[var(--color-fg-subtle)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="font-medium tracking-widest uppercase text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
