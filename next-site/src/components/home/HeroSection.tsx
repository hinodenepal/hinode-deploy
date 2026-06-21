"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function HeroSection({ locale }: { locale: Locale }) {
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-himalaya.jpg"
          alt={isJa ? "ネパール・ヒマラヤの黄金の夜明け" : "Golden sunrise over the Himalayan mountains in Nepal"}
          fill
          className="object-cover scale-105 transform hover:scale-100 transition-transform duration-[10s]"
          priority
          loading="eager"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white/90"
        >
          {isJa ? "ヒマラヤの高級旅行" : "Curated Luxury in the Himalayas"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-wide text-white"
        >
          {isJa ? (
            <>魂を揺さぶる<br />ネパールの旅へ</>
          ) : (
            <>A Journey That<br />Moves the Soul</>
          )}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href={p("/tours")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase text-white hover:text-[#2C2C2C]"
          >
            {isJa ? "旅を発見する" : "Discover Journeys"}{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
