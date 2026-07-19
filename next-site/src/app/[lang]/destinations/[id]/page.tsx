import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Destination from "@/lib/models/Destination";
import Tour from "@/lib/models/Tour";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { MapPin, Clock, Star, ChevronRight, ArrowLeft, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  let dest;
  try {
    await dbConnect();
    dest = await Destination.findOne({ slug: id }).lean() as any;
  } catch (error) {
    console.error("Failed to fetch destination for metadata:", error);
  }
  if (!dest) return {};
  const isJa = lang === "ja";
  return {
    title: dest.metaTitle || `${isJa ? dest.title : dest.enTitle} | Hinode Nepal`,
    description: dest.metaDescription || (isJa ? dest.description?.replace(/<[^>]*>/g, "").slice(0, 160) : dest.enDescription?.replace(/<[^>]*>/g, "").slice(0, 160)),
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { lang, id } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? path : `/en${path}`;

  let dest, tours: any[] = [];
  try {
    await dbConnect();
    [dest, tours] = await Promise.all([
      Destination.findOne({ slug: id }).lean(),
      Tour.find({ destination: id }).sort({ createdAt: -1 }).lean(),
    ]);
  } catch (error) {
    console.error("Failed to fetch destination or tours:", error);
  }

  if (!dest) notFound();
  const d = dest as any;

  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": isJa ? d.title : d.enTitle,
    "description": isJa ? d.description?.replace(/<[^>]*>/g, "") : d.enDescription?.replace(/<[^>]*>/g, ""),
    "image": d.image,
    "url": `https://hinodenepal.jp/${locale}/destinations/${d.slug}`
  };

  return (
    <div className="w-full bg-[#FAF9F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={d.image}
          alt={isJa ? d.title : d.enTitle}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-20">
          <div className="container mx-auto">
            <Link
              href={p("/destinations")}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-6 w-max"
            >
              <ArrowLeft className="w-4 h-4" />
              {isJa ? "目的地一覧に戻る" : "All Destinations"}
            </Link>
            <span className="text-[#D4A97A] text-xs tracking-[0.3em] uppercase mb-3 block">{isJa ? "地域" : "Region"}</span>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-3 leading-tight">
              {isJa ? d.title : d.enTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E5DF]">
        <div className="container mx-auto px-6 md:px-12 py-3 flex items-center gap-2 text-xs text-[#A39E99]">
          <Link href={p("/")} className="hover:text-[#2C2C2C] transition-colors">{isJa ? "ホーム" : "Home"}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={p("/destinations")} className="hover:text-[#2C2C2C] transition-colors">{isJa ? "目的地" : "Destinations"}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2C2C2C]">{isJa ? d.title : d.enTitle}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              className="prose prose-lg max-w-none text-[#5A5A5A] font-light leading-relaxed [&_h2]:text-[#2C2C2C] [&_h2]:font-light [&_h3]:text-[#2C2C2C] [&_h3]:font-light [&_strong]:text-[#2C2C2C] [&_strong]:font-medium"
              dangerouslySetInnerHTML={{
                __html: isJa ? d.description : (d.enDescription || d.description),
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Highlights */}
            {d.highlights && d.highlights.length > 0 && (
              <div className="bg-white border border-[#E8E5DF] rounded-sm p-8">
                <h3 className="text-xs uppercase tracking-widest text-[#8B2C24] font-semibold mb-6">
                  {isJa ? "見どころ" : "Highlights"}
                </h3>
                <ul className="space-y-4">
                  {d.highlights.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Star className="w-3.5 h-3.5 text-[#8B2C24] shrink-0 mt-1" />
                      <span className="text-sm text-[#5A5A5A] font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-[#2C2C2C] text-white p-8 rounded-sm">
              <h3 className="text-xs uppercase tracking-widest text-[#A39E99] font-semibold mb-4">
                {isJa ? "クイックリンク" : "Plan Your Trip"}
              </h3>
              <div className="space-y-3">
                <Link href={p("/inquiry")}
                  className="block text-sm text-white hover:text-[#D4A97A] transition-colors py-1 border-b border-white/10">
                  {isJa ? "旅行のお問い合わせ →" : "Send a Travel Inquiry →"}
                </Link>
                <Link href={p("/contact")}
                  className="block text-sm text-white hover:text-[#D4A97A] transition-colors py-1 border-b border-white/10">
                  {isJa ? "お問い合わせ →" : "Contact Us →"}
                </Link>
                <Link href={p("/tours")}
                  className="block text-sm text-white hover:text-[#D4A97A] transition-colors py-1">
                  {isJa ? "全ツアーを見る →" : "Browse All Tours →"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tours in this Destination */}
        <div className="mt-24 pt-16 border-t border-[#E8E5DF]">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase block mb-2">
                {isJa ? "ツアーパッケージ" : "Curated Experiences"}
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C]">
                {isJa ? `${d.title}のツアー` : `Tours in ${d.enTitle}`}
              </h2>
            </div>
            <Link href={p("/tours")} className="hidden md:block text-sm text-[#5A5A5A] hover:text-[#2C2C2C] transition-colors tracking-wider uppercase border-b border-[#D1CCC5] pb-0.5">
              {isJa ? "全て見る" : "View All"}
            </Link>
          </div>

          {tours.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#E8E5DF] rounded-sm">
              <MapPin className="w-10 h-10 text-[#D1CCC5] mx-auto mb-4" />
              <p className="text-[#5A5A5A] font-light">
                {isJa ? "この地域のツアーはまだ登録されていません。" : "No tours have been added for this destination yet."}
              </p>
              <Link href={p("/tours")} className="mt-4 inline-block text-sm text-[#8B2C24] hover:underline">
                {isJa ? "全てのツアーを見る →" : "Browse all available tours →"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(tours as any[]).map((tour) => (
                <Link
                  key={tour._id?.toString()}
                  href={p(`/tours/${tour.slug}`)}
                  className="group block bg-white border border-[#E8E5DF] rounded-sm overflow-hidden hover:shadow-lg hover:border-[#2C2C2C] transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={isJa ? tour.title : tour.enTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {tour.showPrice && (
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white text-lg font-light">{tour.price}</span>
                        <span className="text-white/70 text-xs ml-1">{isJa ? "/人" : "/person"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#2C2C2C] font-medium text-sm mb-1 line-clamp-2 group-hover:text-[#8B2C24] transition-colors">
                      {isJa ? tour.title : tour.enTitle}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-[#A39E99]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.duration}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{tour.season}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E8E5DF] flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tour.difficulty === "Easy" ? "bg-green-50 text-green-700" :
                        tour.difficulty === "Moderate" ? "bg-amber-50 text-amber-700" :
                        "bg-red-50 text-red-700"
                      }`}>{tour.difficulty}</span>
                      <span className="text-[#8B2C24] text-xs tracking-wider uppercase">
                        {isJa ? "詳細を見る →" : "View Details →"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
