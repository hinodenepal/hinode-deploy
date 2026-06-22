import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import Destination from "@/lib/models/Destination";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isJa = lang === "ja";
  return {
    title: isJa ? "目的地 | ヒノデネパール" : "Destinations in Nepal | Hinode Nepal Luxury Travel",
    description: isJa
      ? "ネパールの魅力的な目的地を探検しましょう。日本人旅行者のために厳選された高級旅行。"
      : "Explore Nepal's most captivating destinations. Curated luxury travel for Japanese travelers.",
    alternates: { languages: { ja: "https://hinodenepal.jp/ja/destinations", en: "https://hinodenepal.jp/en/destinations" } },
  };
}

export default async function DestinationsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? path : `/en${path}`;

  let destinations: any[] = [];
  try {
    await dbConnect();
    destinations = (await Destination.find({}).sort({ createdAt: 1 }).lean()) || [];
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": isJa ? "目的地を探す | ヒノデネパール" : "Destinations in Nepal | Hinode Nepal",
    "description": isJa
      ? "ネパールの魅力的な目的地を探検しましょう。日本人旅行者のために厳選された高級旅行。"
      : "Explore Nepal's most captivating destinations. Curated luxury travel for Japanese travelers.",
    "url": `https://hinodenepal.jp/${locale}/destinations`
  };

  return (
    <div className="w-full bg-[#FAF9F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Explore Nepal</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">{isJa ? "目的地を探す" : "Destinations"}</h1>
          <p className="text-[#5A5A5A] font-light leading-relaxed text-lg">
            {isJa
              ? "活気ある古代都市カトマンズから、穏やかなポカラの湖、そして雄大なヒマラヤの山々まで、ネパールの多様な地域を発見してください。"
              : "From the bustling ancient streets of Kathmandu to the serene lakes of Pokhara and the majestic peaks of the Himalayas, discover the diverse regions of Nepal."}
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#5A5A5A] font-light">{isJa ? "目的地はまだ登録されていません。" : "No destinations have been added yet."}</p>
          </div>
        ) : (
          <div className="space-y-24 md:space-y-32">
            {destinations.map((dest: any, index: number) => (
              <div key={dest._id?.toString()} className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-24`}>
                <div className="w-full md:w-1/2">
                  <Link href={p(`/destinations/${dest.slug}`)} className="block relative aspect-[4/5] overflow-hidden rounded-t-[150px] rounded-b-sm group">
                    <Image
                      src={dest.image} alt={`${dest.enTitle} — ${dest.title}`}
                      fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                  </Link>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">{isJa ? "地域" : "Region"}</span>
                  <h2 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-8">{isJa ? dest.title : dest.enTitle}</h2>
                  <div
                    className="text-[#5A5A5A] font-light leading-relaxed mb-8 text-lg line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: isJa ? dest.description : (dest.enDescription || dest.description) }}
                  />
                  <Link href={p(`/destinations/${dest.slug}`)}
                    className="inline-block px-8 py-4 border border-[#2C2C2C] text-[#2C2C2C] text-sm tracking-widest uppercase hover:bg-[#2C2C2C] hover:text-[#FAF9F6] transition-colors rounded-sm w-max">
                    {isJa ? `${dest.title}を探検する` : `Explore ${dest.enTitle}`}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

