"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

export function CVDownloadButton() {
  return (
    <motion.a
      href="/Endika Orube Vega - CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-6 right-[140px] z-50 flex items-center gap-1.5 px-3 py-2 font-mono text-sm font-bold tracking-wider text-[#de5e91] hover:text-white/80 transition-colors duration-200 border border-[#de5e91]/30 backdrop-blur-xs"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="View CV"
    >
      <Download className="w-3.5 h-3.5" />
      <span>CV</span>
    </motion.a>
  );
}
