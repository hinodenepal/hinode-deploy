import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, X, MapPin, Calendar, Clock, Mountain, Info, Star, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import Tour from "@/lib/models/Tour";
import { isValidLocale, type Locale } from "@/lib/i18n";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  overnight?: string;
  meals?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TourData {
  id: string;
  slug?: string;
  title: string;
  enTitle: string;
  duration: string;
  season: string;
  difficulty: string;
  price: string;
  showPrice?: boolean;
  image: string;
  destination: string;
  description: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  faqs?: FAQ[];
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
}

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

async function getTour(id: string): Promise<TourData | null> {
  try {
    await dbConnect();
    const dbTour = (await Tour.findOne({ slug: id }).lean()) as any;
    if (dbTour) {
      return {
        id: dbTour.slug, slug: dbTour.slug, title: dbTour.title, enTitle: dbTour.enTitle,
        duration: dbTour.duration, season: dbTour.season, difficulty: dbTour.difficulty,
        price: dbTour.price, showPrice: dbTour.showPrice !== undefined ? dbTour.showPrice : true, 
        image: dbTour.image, destination: dbTour.destination,
        description: dbTour.description, highlights: dbTour.highlights || [],
        itinerary: dbTour.itinerary || [], inclusions: dbTour.inclusions || [],
        exclusions: dbTour.exclusions || [], faqs: dbTour.faqs || [],
        metaTitle: dbTour.metaTitle || "", metaDescription: dbTour.metaDescription || "",
        focusKeywords: dbTour.focusKeywords || "",
      };
    }
  } catch {}
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, lang } = await params;
  const tour = await getTour(id);
  if (!tour) return { title: "Tour Not Found | Hinode Nepal" };

  const isJa = lang === "ja";
  const title = isJa
    ? `${tour.title} | ヒノデネパール`
    : (tour.metaTitle || `${tour.enTitle} | Hinode Nepal Luxury Tours`);

  const description = tour.metaDescription ||
    `${tour.description} ${tour.duration} journey starting from ${tour.price}.`;

  return {
    title, description,
    alternates: {
      languages: {
        ja: `https://hinodenepal.jp/ja/tours/${id}`,
        en: `https://hinodenepal.jp/en/tours/${id}`,
      },
    },
    openGraph: { title, description, images: [{ url: tour.image, width: 1200, height: 630, alt: tour.enTitle }], type: "website" },
  };
}

export const dynamic = "force-dynamic";

export default async function TourDetailPage({ params }: PageProps) {
  const { id, lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  const tour = await getTour(id);
  if (!tour) notFound();

  let relatedTours: any[] = [];
  try {
    await dbConnect();
    relatedTours = (await Tour.find({ slug: { $ne: id } }).sort({ createdAt: -1 }).limit(3).lean()) as any[] || [];
  } catch (error) {
    console.error("Failed to fetch related tours:", error);
  }

  const tourSlug = tour.slug || tour.id;
  const hasItinerary = tour.itinerary && tour.itinerary.length > 0;
  const hasHighlights = tour.highlights && tour.highlights.length > 0;
  const hasFAQs = tour.faqs && tour.faqs.length > 0;
  const hasInclusions = tour.inclusions && tour.inclusions.length > 0;
  const hasExclusions = tour.exclusions && tour.exclusions.length > 0;

  const displayTitle = isJa ? tour.title : tour.enTitle;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": displayTitle,
    "image": tour.image,
    "description": tour.description,
    "offers": {
      "@type": "Offer",
      "url": `https://hinodenepal.jp/${locale}/tours/${tourSlug}`,
      "priceCurrency": "JPY",
      "price": tour.price.replace(/[^0-9]/g, '') || "500000",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        <Image src={tour.image} alt={`${tour.enTitle} - scenic view of ${tour.destination} in Nepal`} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-black/20 to-black/40" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-white/70 text-xs tracking-widest uppercase mb-4">
              <Link href={p("/")} className="hover:text-white transition-colors">{isJa ? "ホーム" : "Home"}</Link>
              <span>/</span>
              <Link href={p("/tours")} className="hover:text-white transition-colors">{isJa ? "ツアー" : "Tours"}</Link>
              <span>/</span>
              <span className="text-white">{displayTitle}</span>
            </nav>
            <div className="max-w-3xl">
              <span className="text-white text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block drop-shadow-md">{tour.destination}</span>
              <h1 className="text-4xl md:text-6xl font-light text-[#2C2C2C] bg-white/90 backdrop-blur inline-block px-6 py-4 rounded-t-lg shadow-xl translate-y-8">
                {displayTitle}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 pt-16 pb-24">

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-[#D1CCC5] mb-16">
              <div className="flex flex-col gap-2">
                <Clock className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "日数" : "Duration"}</span>
                <span className="font-medium text-[#2C2C2C]">{tour.duration}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Mountain className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "難易度" : "Difficulty"}</span>
                <span className="font-medium text-[#2C2C2C]">{tour.difficulty}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Calendar className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "ベストシーズン" : "Best Season"}</span>
                <span className="font-medium text-[#2C2C2C]">{tour.season}</span>
              </div>
              <div className="flex flex-col gap-2">
                <MapPin className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "発着地" : "Start / End"}</span>
                <span className="font-medium text-[#2C2C2C]">Kathmandu</span>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-16" aria-labelledby="overview-heading">
              <h3 id="overview-heading" className="text-2xl font-light text-[#2C2C2C] mb-6">{isJa ? "概要" : "Overview"}</h3>
              <div 
                className="prose prose-lg max-w-none text-[#5A5A5A] font-light leading-relaxed text-justify [&_p]:mb-6"
                dangerouslySetInnerHTML={{ __html: tour.description }}
              />
            </section>

            {/* Highlights */}
            {hasHighlights && (
              <section className="mb-16">
                <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">{isJa ? "ハイライト" : "Trip Highlights"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.highlights!.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-[#5A5A5A] bg-[#FAF9F6] border border-[#E8E5DF] rounded-sm px-4 py-3">
                      <Check className="w-4 h-4 text-[#8B2C24] shrink-0 mt-0.5" />
                      <span className="font-light text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary */}
            {hasItinerary && (
              <section className="mb-16">
                <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">
                  {isJa ? "日程表" : "Day-by-Day Itinerary"}
                  <span className="ml-3 text-sm text-[#8B2C24] font-normal">{tour.itinerary!.length} {isJa ? "日間" : "Days"}</span>
                </h3>
                <div className="space-y-0 relative">
                  <div className="absolute left-[19px] top-8 bottom-8 w-px bg-[#D1CCC5]" />
                  {tour.itinerary!.map((day, i) => (
                    <details key={i} className="group relative pl-14 pb-8" open={i === 0}>
                      <div className="absolute left-0 top-[18px] w-10 h-10 rounded-full bg-white border-2 border-[#8B2C24] flex items-center justify-center text-xs font-bold text-[#8B2C24] z-10 shadow-sm">
                        {String(day.dayNumber).padStart(2, "0")}
                      </div>
                      <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-4 py-4 pr-4 group-open:border-b group-open:border-[#E8E5DF]">
                        <h4 className="text-base font-medium text-[#2C2C2C] group-hover:text-[#8B2C24] transition-colors">
                          {isJa ? `${day.dayNumber}日目` : `Day ${day.dayNumber}`}: {day.title}
                        </h4>
                        <ChevronDown className="w-4 h-4 text-[#A39E99] shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pt-4 pb-2 space-y-3">
                        <p className="text-[#5A5A5A] font-light leading-relaxed text-sm">{day.description}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Fallback itinerary (mock tours) */}
            {!hasItinerary && (
              <section className="mb-16">
                <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">{isJa ? "日程表" : "Itinerary"}</h3>
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-[#D1CCC5]">
                  {[
                    { day: "01", title: isJa ? "カトマンズ到着" : "Arrival in Kathmandu", desc: isJa ? "ネパールへようこそ。高級ホテルへの送迎、イブニングブリーフィングとウェルカムディナー。" : "Welcome to Nepal. Transfer to your luxury heritage hotel. Evening briefing and welcome dinner." },
                    { day: "02", title: isJa ? "ルクラへ飛行、パクディンへ" : "Fly to Lukla, Trek to Phakding", desc: isJa ? "朝の景色豊かなフライトでルクラへ。パクディンへの穏やかな入門トレッキング。" : "A scenic morning flight to Lukla followed by a gentle introductory trek to Phakding." },
                    { day: "03", title: isJa ? "ナムチェバザールへ" : "Trek to Namche Bazaar", desc: isJa ? "サガルマータ国立公園に入り、シェルパの首都ナムチェバザールへ。" : "Enter Sagarmatha National Park and ascend to Namche Bazaar." },
                    { day: "04", title: isJa ? "ナムチェで高度順応" : "Acclimatization Day in Namche", desc: isJa ? "エベレストビューホテルまでのハイキングでパノラマの眺望を楽しみ、ナムチェへ戻り休息。" : "Hike to Everest View Hotel for panoramic views, returning to Namche for rest." },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#FAF9F6] border-2 border-[#8B2C24] flex items-center justify-center text-xs font-bold text-[#8B2C24]">{item.day}</div>
                      <h4 className="text-lg font-medium text-[#2C2C2C] mb-2">{isJa ? `${item.day}日目` : `Day ${item.day}`}: {item.title}</h4>
                      <p className="text-[#5A5A5A] font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            {(hasInclusions || hasExclusions) && (
              <section className="mb-16">
                <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">{isJa ? "含まれるもの" : "What's Included"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hasInclusions && (
                    <div className="bg-white border border-[#E8E5DF] rounded-sm p-6">
                      <h4 className="text-sm font-semibold text-[#2C2C2C] uppercase tracking-widest mb-4 pb-3 border-b border-[#E8E5DF] flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#8B2C24]" /> {isJa ? "含む" : "Included"}
                      </h4>
                      <ul className="space-y-2.5">
                        {tour.inclusions!.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-[#5A5A5A] font-light">
                            <Check className="w-3.5 h-3.5 text-[#8B2C24] shrink-0 mt-0.5" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {hasExclusions && (
                    <div className="bg-white border border-[#E8E5DF] rounded-sm p-6">
                      <h4 className="text-sm font-semibold text-[#2C2C2C] uppercase tracking-widest mb-4 pb-3 border-b border-[#E8E5DF] flex items-center gap-2">
                        <X className="w-4 h-4 text-[#A39E99]" /> {isJa ? "含まない" : "Not Included"}
                      </h4>
                      <ul className="space-y-2.5">
                        {tour.exclusions!.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-[#5A5A5A] font-light">
                            <X className="w-3.5 h-3.5 text-[#A39E99] shrink-0 mt-0.5" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* FAQs */}
            {hasFAQs && (
              <section className="mb-16">
                <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">{isJa ? "よくあるご質問" : "Frequently Asked Questions"}</h3>
                <div className="space-y-3">
                  {tour.faqs!.map((faq, i) => (
                    <details key={i} className="group bg-white border border-[#E8E5DF] rounded-sm overflow-hidden hover:border-[#8B2C24] transition-colors">
                      <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-4 px-6 py-4 font-medium text-[#2C2C2C] text-sm hover:text-[#8B2C24] transition-colors">
                        <span>{faq.question}</span>
                        <ChevronDown className="w-4 h-4 text-[#A39E99] shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-5 pt-1">
                        <p className="text-[#5A5A5A] font-light text-sm leading-relaxed border-t border-[#F0EDE8] pt-4">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            <section className="mb-16">
              <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">{isJa ? "ギャラリー" : "Gallery"}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-[#E8E5DF] rounded-sm overflow-hidden relative">
                    <Image src={tour.image} alt={`${tour.enTitle} gallery image ${i}`} fill className="object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" sizes="(max-width: 768px) 50vw, 22vw" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white border border-[#E8E5DF] p-8 rounded-sm shadow-xl shadow-black/5">
                <div className="mb-6 pb-6 border-b border-[#E8E5DF]">
                  {tour.showPrice !== false ? (
                    <>
                      <span className="text-sm uppercase tracking-wider text-[#5A5A5A] block mb-2">{isJa ? "料金" : "Starting from"}</span>
                      <div className="text-3xl text-[#2C2C2C] mb-2 font-light">
                        {tour.price} <span className="text-sm text-[#5A5A5A]">/ {isJa ? "1名様" : "person"}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-sm uppercase tracking-wider text-[#5A5A5A] block mb-2">{isJa ? "料金" : "Price"}</span>
                      <div className="text-3xl text-[#2C2C2C] mb-2 font-light">
                        {isJa ? "お問い合わせ" : "On Request"}
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2 text-xs text-[#8B2C24]">
                    <Info className="w-4 h-4" />
                    <span>{isJa ? "カスタマイズ可能" : "Fully customizable"}</span>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  <Link href={p("/inquiry")} className="block w-full py-4 bg-[#2C2C2C] text-[#FAF9F6] text-center text-sm tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm">
                    {isJa ? "お問い合わせ" : "Inquire Now"}
                  </Link>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#25D366] text-white text-center text-sm tracking-widest uppercase hover:bg-[#128C7E] transition-colors rounded-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-[#00C300] text-white text-center text-sm tracking-widest uppercase hover:bg-[#00A000] transition-colors rounded-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.925h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .26-.148.51-.381.604a.64.64 0 0 1-.653-.125L11.84 9.835v3.414c0 .344-.281.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.26.146-.511.38-.605.23-.094.499-.046.65.127l2.636 3.522V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.344 0 .626.285.626.63v3.511h1.756c.345 0 .627.286.627.631 0 .344-.282.629-.627.629M12 0C5.373 0 0 4.298 0 9.605c0 4.793 4.295 8.796 10.045 9.475.405.086 1.018.266 1.166.608.134.308.087.788.04 1.121-.013.093-.162 1.056-.192 1.25-.05.318-.21.993.844.545 1.054-.447 5.679-3.346 7.82-5.753C22.616 13.568 24 11.666 24 9.605 24 4.298 18.627 0 12 0"/></svg>
                    LINE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-light text-[#2C2C2C] mb-12 text-center">{isJa ? "おすすめの旅" : "Similar Journeys"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTours.map((t) => (
              <Link key={t.slug || t.id || t._id?.toString()} href={p(`/tours/${t.slug || t.id || t._id?.toString()}`)} className="group block bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                  <Image src={t.image} alt={`${t.enTitle} - luxury tour in Nepal`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="text-lg text-[#2C2C2C] mb-1 font-light group-hover:text-[#8B2C24] transition-colors">
                  {isJa ? t.title : t.enTitle}
                </h3>
                {t.showPrice !== false ? (
                  <span className="text-sm text-[#8B2C24] font-medium">{t.price}</span>
                ) : (
                  <span className="text-sm text-[#8B2C24] font-medium">{isJa ? "価格応相談" : "Price on Request"}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
