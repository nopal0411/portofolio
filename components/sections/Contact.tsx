"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, MessageCircle, Linkedin, Github, Instagram,
  MapPin, Send, CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainerVariant, staggerItemVariant, fadeLeftVariant, fadeRightVariant, viewportConfig } from "@/lib/animations";
import portfolioData from "@/data/portfolio.json";
import { formatWhatsAppLink } from "@/lib/utils";

// Form validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(5, "Subjek minimal 5 karakter").max(100, "Subjek terlalu panjang"),
  message: z
    .string()
    .min(20, "Pesan minimal 20 karakter")
    .max(1000, "Pesan terlalu panjang"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: portfolioData.personal.email,
    href: `mailto:${portfolioData.personal.email}`,
    color: "text-primary-600 dark:text-primary-400",
    bg: "bg-primary-600/10",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: `+${portfolioData.personal.whatsapp}`,
    href: formatWhatsAppLink(portfolioData.personal.whatsapp),
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: portfolioData.personal.linkedin.replace("https://", ""),
    href: portfolioData.personal.linkedin,
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/10",
  },
  {
    icon: Github,
    label: "GitHub",
    value: portfolioData.personal.github.replace("https://", ""),
    href: portfolioData.personal.github,
    color: "text-[var(--color-fg)]",
    bg: "bg-gray-500/10",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: portfolioData.personal.instagram.replace("https://", ""),
    href: portfolioData.personal.instagram,
    color: "text-[#E1306C]",
    bg: "bg-[#E1306C]/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: portfolioData.contact.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(portfolioData.contact.location)}`,
    color: "text-[var(--color-fg-muted)]",
    bg: "bg-[var(--color-primary-light)]",
  },
];

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("sending");
    // Simulate form submission (integrate with Formspree/EmailJS in production)
    await new Promise((res) => setTimeout(res, 1500));
    console.log("Form data:", data);
    setSubmitStatus("success");
    reset();
    setTimeout(() => setSubmitStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      className="section-padding"
      aria-label="Contact section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact"
          title="Mari Terhubung"
          titleHighlight="Bersama"
          subtitle="Saya siap menerima tawaran kerja, freelance, atau sekadar diskusi tentang teknologi. Jangan ragu untuk menghubungi!"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Contact Info */}
          <motion.div
            variants={fadeLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Open to Work — Available for opportunities
                </span>
              </div>
              <p className="text-[var(--color-fg-muted)] text-sm leading-relaxed">
                Saat ini saya sedang mencari peluang sebagai <strong className="text-[var(--color-fg)]">Full Stack Web Developer</strong> atau <strong className="text-[var(--color-fg)]">Software Developer</strong> baik full-time maupun freelance. Response time biasanya &lt; 24 jam.
              </p>
            </div>

            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="space-y-3"
            >
              {contactLinks.map(({ icon: Icon, label, value, href, color, bg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  variants={staggerItemVariant}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="flex items-center gap-4 p-4 card-base group"
                  aria-label={`Contact via ${label}: ${value}`}
                >
                  <div className={`w-10 h-10 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-fg-subtle)] mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-[var(--color-fg)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            variants={fadeRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="card-base p-7">
              <h3 className="text-lg font-bold text-[var(--color-fg)] mb-6">
                Kirim Pesan 💬
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[var(--color-fg)] mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Nama Anda"
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-fg)] text-sm placeholder-[var(--color-fg-subtle)] focus:outline-none focus:border-primary-600/50 focus:ring-2 focus:ring-primary-600/10 transition-all"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[var(--color-fg)] mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="email@anda.com"
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-fg)] text-sm placeholder-[var(--color-fg-subtle)] focus:outline-none focus:border-primary-600/50 focus:ring-2 focus:ring-primary-600/10 transition-all"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[var(--color-fg)] mb-2">
                    Subjek *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Perihal pesan Anda..."
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-fg)] text-sm placeholder-[var(--color-fg-subtle)] focus:outline-none focus:border-primary-600/50 focus:ring-2 focus:ring-primary-600/10 transition-all"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[var(--color-fg)] mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tuliskan pesan Anda di sini..."
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-fg)] text-sm placeholder-[var(--color-fg-subtle)] focus:outline-none focus:border-primary-600/50 focus:ring-2 focus:ring-primary-600/10 transition-all resize-none"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitStatus === "sending" || submitStatus === "success"}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: submitStatus === "success"
                      ? "linear-gradient(135deg, #22c55e, #16a34a)"
                      : submitStatus === "error"
                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                      : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    color: "white",
                    boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3)",
                  }}
                  whileHover={submitStatus === "idle" ? { scale: 1.02, y: -1 } : {}}
                  whileTap={submitStatus === "idle" ? { scale: 0.98 } : {}}
                >
                  {submitStatus === "sending" && (
                    <><Loader2 size={16} className="animate-spin" /> Mengirim...</>
                  )}
                  {submitStatus === "success" && (
                    <><CheckCircle size={16} /> Pesan Terkirim! ✨</>
                  )}
                  {submitStatus === "error" && (
                    <><AlertCircle size={16} /> Gagal — Coba Lagi</>
                  )}
                  {submitStatus === "idle" && (
                    <><Send size={16} /> Kirim Pesan</>
                  )}
                </motion.button>

                <p className="text-center text-[10px] text-[var(--color-fg-subtle)]">
                  Dengan mengirim pesan, Anda menyetujui untuk dihubungi kembali melalui email.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
