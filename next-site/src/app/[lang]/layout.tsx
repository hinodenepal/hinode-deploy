import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LanguageToggle } from "@/components/LanguageToggle";
import { isValidLocale, type Locale } from "@/lib/i18n";
import Script from "next/script";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const isJa = lang === "ja";
  return {
    alternates: {
      languages: {
        "ja": "https://hinodenepal.jp/ja",
        "en": "https://hinodenepal.jp/en",
      },
    },
    title: isJa
      ? "ヒノデネパール | 日本人のためのヒマラヤ高級旅行"
      : "Hinode Nepal | Luxury Himalayan Travel for Japanese Travelers",
    description: isJa
      ? "ヒノデネパールは日本人旅行者のためのネパール高級旅行を専門とします。エベレストトレッキング、文化ツアー、野生動物サファリ。"
      : "Hinode Nepal curates premium luxury travel experiences in Nepal for the discerning Japanese traveler. Discover Everest treks, cultural tours, and wildlife safaris.",
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Hinode Nepal",
    "image": "https://hinodenepal.jp/hinode-logo.png",
    "@id": "https://hinodenepal.jp",
    "url": "https://hinodenepal.jp",
    "telephone": "+9779851146179",
    "email": "info@hinodenepal.jp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati Province",
      "addressCountry": "NP"
    },
    "sameAs": [
      "https://www.facebook.com/hinodenepal",
      "https://www.instagram.com/hinodenepal",
      "https://twitter.com/hinodenepal"
    ],
    "priceRange": "$$$"
  };

  return (
    <>
      <Script
        id="set-lang"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = "${locale}";`,
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation locale={locale} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer locale={locale} />
      <LanguageToggle locale={locale} />
    </>
  );
}
