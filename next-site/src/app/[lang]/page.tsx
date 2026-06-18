import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ChevronDown } from "lucide-react";
import FAQ from "@/components/FAQ";
import { DESTINATIONS } from "@/data/mock";
import dbConnect from "@/lib/mongodb";
import Tour from "@/lib/models/Tour";
import Post from "@/lib/models/Post";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isJa = lang === "ja";
  return {
    title: isJa
      ? "ヒノデネパール | 日本人のためのヒマラヤ高級旅行"
      : "Hinode Nepal | Luxury Himalayan Travel for Japanese Travelers",
    description: isJa
      ? "ヒノデネパールは日本人旅行者のためのネパール高級旅行を専門とします。エベレストトレッキング、文化ツアー、野生動物サファリ。"
      : "Hinode Nepal curates premium luxury travel experiences in Nepal for the discerning Japanese traveler.",
    alternates: {
      languages: {
        ja: "https://hinodenepal.jp/ja",
        en: "https://hinodenepal.jp/en",
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  await dbConnect();
  const dbTours = await Tour.find({}).sort({ createdAt: -1 }).limit(2).lean() as any[];
  const dbPosts = await Post.find({}).sort({ createdAt: -1 }).limit(3).lean() as any[];

  return (
    <div className="w-full">
      {/* Hero Section — client component for animations */}
      <HeroSection locale={locale} />

      {/* Featured Tours */}
      <section className="py-24 md:py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">
                {isJa ? "厳選された体験" : "Curated Experiences"}
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C] mb-6">
                {isJa ? "厳選された旅のプラン" : "Our Signature Journeys"}
              </h2>
              <p className="text-[#5A5A5A] font-light leading-relaxed">
                {isJa
                  ? "ネパールの大自然の美しさと比類なき快適さ、日本基準のおもてなしを融合させた旅をご用意しています。"
                  : "We have meticulously crafted journeys that blend the raw beauty of Nepal with unparalleled comfort and Japanese-standard hospitality."}
              </p>
            </div>
            <Link
              href={p("/tours")}
              className="group flex items-center gap-2 text-sm tracking-widest uppercase text-[#2C2C2C] hover:text-[#8B2C24] transition-colors pb-1 border-b border-[#2C2C2C] hover:border-[#8B2C24]"
            >
              {isJa ? "全ツアーを見る" : "View All Tours"}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {dbTours.map((tour) => (
              <Link key={tour.slug || tour.id} href={p(`/tours/${tour.slug || tour.id}`)} className="group block">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-t-[100px] rounded-b-sm">
                  <Image
                    src={tour.image}
                    alt={`${tour.enTitle} - ${tour.destination}, Nepal`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#FAF9F6]/90 backdrop-blur px-6 py-2 text-[10px] sm:text-xs font-medium tracking-widest text-[#2C2C2C] uppercase rounded-sm shadow-md whitespace-nowrap">
                    {tour.duration}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl text-[#2C2C2C] mb-2">
                  {isJa ? tour.title : tour.enTitle}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#5A5A5A]">{tour.destination}</span>
                  <span className="text-[#8B2C24]">{tour.price}~</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 md:py-32 bg-[#F4F1EC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">
              Destinations
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C]">
              {isJa ? "魅惑の目的地" : "Enchanting Destinations"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.id}
                href={p(`/destinations/${dest.id}`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={dest.image}
                  alt={`${dest.title} (${dest.jpTitle}) - Nepal destination`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/80 text-xs tracking-[0.2em] uppercase mb-2">
                    {dest.title}
                  </span>
                  <h3 className="text-2xl text-white font-medium">
                    {isJa ? dest.jpTitle : dest.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsb2RnZXxlbnwxfHx8fDE3Nzk4OTk2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury eco-lodge in Nepal surrounded by mountains"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#2C2C2C]/80" />
        </div>
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center text-[#FAF9F6]">
          <h2 className="text-3xl md:text-5xl font-light mb-6 text-white">
            {isJa ? "あなただけの特別なネパール旅を" : "Your Perfect Himalayan Journey Awaits"}
          </h2>
          <p className="max-w-2xl mx-auto text-[#D1CCC5] mb-10 font-light leading-relaxed">
            {isJa
              ? "お客様のペース、好み、そして高級志向に合わせたオーダーメイドの旅程をご提案します。専門スタッフが最高のヒマラヤの旅をお作りします。"
              : "Let us design a bespoke itinerary that matches your pace, preferences, and desire for luxury. Our experts are ready to curate your perfect Himalayan journey."}
          </p>
          <Link
            href={p("/inquiry")}
            className="inline-block px-10 py-4 bg-[#FAF9F6] text-[#2C2C2C] text-sm tracking-widest uppercase hover:bg-[#8B2C24] hover:text-[#FAF9F6] transition-colors rounded-sm"
          >
            {isJa ? "無料相談を申し込む" : "Request a Consultation"}
          </Link>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 md:py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">
                {isJa ? "ブログ" : "Blogs"}
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C]">
                {isJa ? "ネパール旅行記とガイド" : "Nepal Travel Guides & Stories"}
              </h2>
            </div>
            <Link
              href={p("/blog")}
              className="group flex items-center gap-2 text-sm tracking-widest uppercase text-[#2C2C2C] hover:text-[#8B2C24] transition-colors pb-1 border-b border-[#2C2C2C] hover:border-[#8B2C24]"
            >
              {isJa ? "全記事を読む" : "Read All Articles"}{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dbPosts.map((article) => (
              <Link key={article.slug || article._id?.toString()} href={p(`/blog/${article.slug}`)} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-6 rounded-sm">
                  <Image
                    src={article.image}
                    alt={`${article.enTitle} - ${article.category} article`}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-center gap-4 text-xs tracking-wider text-[#5A5A5A] mb-3 uppercase">
                  <span>{article.category}</span>
                  <div className="w-1 h-1 rounded-full bg-[#D1CCC5]"></div>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl text-[#2C2C2C] mb-2 group-hover:text-[#8B2C24] transition-colors">
                  {isJa ? article.title : article.enTitle}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ isJa={isJa} />

      {/* Testimonials */}
      <section className="py-24 bg-[#F4F1EC]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <Star className="w-8 h-8 text-[#A07855] mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-[#2C2C2C] mb-8">
            {isJa
              ? "「ヒマラヤの絶景と、細部まで行き届いたおもてなし。想像を遥かに超える感動的な旅になりました。ヒノデネパールにお願いして本当に良かったです。」"
              : '"The breathtaking Himalayan scenery and meticulous hospitality. It was a deeply moving journey that far exceeded our expectations. We are so glad we chose Hinode Nepal."'}
          </p>
          <div className="text-sm">
            <span className="block text-[#2C2C2C] font-medium mb-1">Tanaka S.</span>
            <span className="text-[#5A5A5A] tracking-wider uppercase">Tokyo, Japan</span>
          </div>
        </div>
      </section>
    </div>
  );
}
