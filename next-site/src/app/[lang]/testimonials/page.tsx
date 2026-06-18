import { Star } from "lucide-react";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isJa = lang === "ja";
  return {
    title: isJa ? "お客様の声 | ヒノデネパール" : "Testimonials | Hinode Nepal Luxury Travel Reviews",
    description: isJa 
      ? "ヒノデネパールのラグジュアリーなネパール旅行を体験された日本人旅行者の声をご紹介します。"
      : "Read what our travelers say about their luxury Nepal experience with Hinode Nepal.",
    alternates: { languages: { ja: "https://hinodenepal.jp/ja/testimonials", en: "https://hinodenepal.jp/en/testimonials" } },
  };
}

export default async function TestimonialsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";

  await dbConnect();
  const reviews = await Testimonial.find({}).sort({ createdAt: -1 }).lean() as any[];

  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-20">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Traveler Stories</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">{isJa ? "お客様の声" : "Testimonials"}</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            {isJa ? "ヒノデネパールでネパールを旅したお客様の体験談をお読みください。" : "Read about the experiences of our guests who have journeyed through Nepal with us."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-10 rounded-sm border border-[#E8E5DF] flex flex-col justify-between hover:shadow-lg transition-shadow duration-500">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating || 5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#A07855] text-[#A07855]" />
                  ))}
                </div>
                <p className="text-[#5A5A5A] font-light leading-relaxed mb-8 text-lg font-light">
                  &quot;{isJa ? review.text : review.enText}&quot;
                </p>
              </div>
              <div className="border-t border-[#E8E5DF] pt-6 flex justify-between items-end">
                <div>
                  <span className="block text-sm text-[#2C2C2C] font-medium mb-1">{review.name}</span>
                  <span className="text-xs text-[#8B2C24] uppercase tracking-wider">{isJa ? review.location : review.enLocation}</span>
                </div>
                <span className="text-xs text-[#5A5A5A] uppercase tracking-wider max-w-[150px] text-right">{isJa ? review.tour : review.enTour}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
