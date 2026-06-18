"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { type Locale, getAlternateLocale, getToggleLabel, switchLocaleInPath } from "@/lib/i18n";

interface LanguageToggleProps {
  locale: Locale;
}

export function LanguageToggle({ locale }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const targetLocale = getAlternateLocale(locale);
  const label = getToggleLabel(locale);
  const targetPath = switchLocaleInPath(pathname, targetLocale);

  const isJapanese = locale === "ja";

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={() => router.push(targetPath)}
      aria-label={label}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 group"
    >
      <div className="flex flex-col items-center justify-center bg-[#2C2C2C]/90 backdrop-blur-sm text-[#FAF9F6] rounded-l-lg px-1.5 py-2 md:px-3 md:py-4 shadow-xl border-l-2 border-t border-b border-[#8B2C24] hover:bg-[#8B2C24] transition-all duration-300 cursor-pointer gap-1.5 md:gap-2.5 min-h-[50px] md:min-h-[80px]">
        {/* Flag / language indicator */}
        <div className="flex flex-col items-center gap-1">
          {isJapanese ? (
            /* Showing Japanese → button offers English */
            <>
              <span className="text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-[#A39E99] group-hover:text-white/80 transition-colors font-light">
                EN
              </span>
              <div className="w-px h-2 md:h-4 bg-[#4A4A4A] group-hover:bg-white/20 transition-colors" />
              <span
                className="text-[10px] md:text-xs font-medium text-[#FAF9F6] tracking-wider"
                style={{ writingMode: "vertical-rl" }}
              >
                English
              </span>
            </>
          ) : (
            /* Showing English → button offers Japanese */
            <>
              <span className="text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-[#A39E99] group-hover:text-white/80 transition-colors font-light">
                JP
              </span>
              <div className="w-px h-2 md:h-4 bg-[#4A4A4A] group-hover:bg-white/20 transition-colors" />
              <span
                className="text-[10px] md:text-xs font-medium text-[#FAF9F6] tracking-wider"
                style={{ writingMode: "vertical-rl" }}
              >
                日本語
              </span>
            </>
          )}
        </div>

        {/* Small arrow indicator */}
        <div className="w-4 h-px bg-[#8B2C24] group-hover:bg-white/60 transition-colors" />
      </div>
    </motion.button>
  );
}
