import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { HeroAnimatedText } from "./HeroAnimatedText";

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
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <HeroAnimatedText isJa={isJa} p={p} />
    </section>
  );
}
