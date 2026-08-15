"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import { useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { formatWhatsAppLink } from "@/lib/utils";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const waLink = formatWhatsAppLink(
    portfolioData.personal.whatsapp,
    "Halo, saya tertarik untuk berdiskusi dengan Anda!"
  );

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: waLink,
      color: "from-green-500 to-green-600",
      shadow: "shadow-green-500/30",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${portfolioData.personal.email}`,
      color: "from-primary-600 to-primary-500",
      shadow: "shadow-primary-600/30",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-3">
      {/* Action Buttons */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={action.label}
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ delay: i * 0.06, duration: 0.2 }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${action.color} text-white text-sm font-semibold shadow-lg ${action.shadow} hover:shadow-xl transition-shadow duration-200`}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <action.icon size={16} />
              {action.label}
            </motion.a>
          ))}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-400 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-shadow duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle contact options"
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X size={20} /> : <Phone size={20} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
