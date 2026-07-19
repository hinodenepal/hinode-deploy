"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.querySelector("main section");
      if (!firstSection) {
        setIsScrolled(true);
        return;
      }
      const heroHeight = firstSection.clientHeight;
      // 80 is roughly the height of the navbar
      setIsScrolled(window.scrollY > (heroHeight > 100 ? heroHeight - 80 : 20));
    };
    window.addEventListener("scroll", handleScroll);
    // Initialize state on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  const navLinks =
    locale === "ja"
      ? [
        { name: "ツアー", path: p("/tours") },
        { name: "目的地", path: p("/destinations") },
        { name: "ブログ", path: p("/blog") },
        { name: "会社概要", path: p("/about") },
      ]
      : [
        { name: "Tours", path: p("/tours") },
        { name: "Destinations", path: p("/destinations") },
        { name: "Blogs", path: p("/blog") },
        { name: "About", path: p("/about") },
      ];

  const inquireLabel = locale === "ja" ? "お問い合わせ" : "Inquire";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href={p("/")} className="flex items-center gap-3 group">
            <img
              src="/hinode-logo.svg"
              alt="Hinode Logo"
              className="w-10 h-10 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className={`text-lg font-semibold tracking-[0.15em] transition-colors ${isScrolled ? "text-[#2C2C2C]" : "text-white"}`}>
                HINODE NEPAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm tracking-widest uppercase transition-colors ${pathname.startsWith(link.path)
                  ? `font-medium ${isScrolled ? "text-[#8B2C24]" : "text-white"}`
                  : `${isScrolled ? "text-[#5A5A5A] hover:text-[#8B2C24]" : "text-white/90 hover:text-white"}`
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-5 bg-[#D1CCC5]"></div>
            <Link
              href={p("/inquiry")}
              className={`px-6 py-2.5 text-sm tracking-widest uppercase transition-colors duration-300 rounded-sm ${isScrolled
                ? "bg-[#6B6B6B] text-white hover:bg-[#2C2C2C]"
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-[#2C2C2C] border border-white/30"
                }`}
            >
              {inquireLabel}
            </Link>

          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className={`md:hidden ${isScrolled ? "text-[#2C2C2C]" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href={p("/")} className="flex items-center gap-3">
                <img src="/hinode-logo.svg" alt="Hinode Logo" className="w-10 h-10" />
                <span className="text-lg font-semibold tracking-[0.15em] text-[#2C2C2C]">
                  HINODE NEPAL
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6 text-[#2C2C2C]" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 items-center mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-2xl font-medium tracking-widest text-[#2C2C2C] uppercase"
                >
                  {link.name}
                </Link>
              ))}

              <div className="w-12 h-px bg-[#D1CCC5] my-6"></div>
              <Link
                href={p("/inquiry")}
                className="px-8 py-3 bg-[#6B6B6B] text-white text-sm tracking-widest uppercase rounded-sm hover:bg-[#2C2C2C] transition-colors"
              >
                {inquireLabel}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
