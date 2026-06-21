import Image from "next/image";
import { Shield, Heart, Compass, Award } from "lucide-react";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isJa = lang === "ja";
  return {
    title: isJa ? "ヒノデネパールについて | Our Story & Mission" : "About Hinode Nepal | Our Story & Mission",
    description: isJa
      ? "ヒノデネパールについて — 日本のおもてなしとヒマラヤの冒険の融合。妥協のない安全性、厳選された体験、持続可能な高級旅行。"
      : "Learn about Hinode Nepal — bridging Japanese hospitality with Himalayan adventure.",
    alternates: { languages: { ja: "https://hinodenepal.jp/ja/about", en: "https://hinodenepal.jp/en/about" } },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";

  return (
    <div className="w-full bg-[#FAF9F6]">
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <Image src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYXZlbGVyfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Japanese traveler enjoying the scenic beauty of Nepal's Himalayan landscape" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-wide text-white">{isJa ? "Hinode Nepalについて" : "Our Story"}</h1>
            <p className="text-xl font-light tracking-widest uppercase text-white/95">{isJa ? "Our Story" : "About Hinode Nepal"}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24 max-w-4xl">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C] mb-8 leading-tight">
            {isJa ? (
              <>ヒマラヤの絶景と、<br className="hidden md:block"/>日本基準の細やかなおもてなしの融合</>
            ) : (
              <>The breathtaking Himalayas,<br className="hidden md:block"/>fused with meticulous Japanese hospitality.</>
            )}
          </h2>
          <p className="text-[#5A5A5A] font-light leading-relaxed text-lg mb-8">
            {isJa 
              ? "Hinode Nepalは、ヒマラヤの風景への深い敬意と、その壮大さを、快適さ、安全性、品質を妥協することなく、日本人旅行者と共有したいという思いから生まれました。" 
              : "Hinode Nepal was born from a profound respect for the Himalayan landscape and a desire to share its majesty with Japanese travelers, without compromising on comfort, safety, or quality."}
          </p>
          <p className="text-[#5A5A5A] font-light leading-relaxed text-lg">
            {isJa 
              ? "私たちは過酷な冒険と洗練された贅沢のギャップを埋め、お客様の旅のすべての詳細が綿密に計画され、完璧に実行されることを保証します。" 
              : "We bridge the gap between rugged adventure and refined luxury, ensuring that every detail of your journey is meticulously planned and flawlessly executed."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="flex flex-col items-center text-center">
             <Shield className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">{isJa ? "妥協のない安全性" : "Uncompromising Safety"}</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               {isJa ? "お客様の安全は私たちの最優先事項です。経験豊富な認定シェルパガイドとのみ提携し、天候やトレイルの状況を細心の注意を払って監視します。" : "Your safety is our paramount concern. We work exclusively with certified, highly experienced Sherpa guides and monitor weather and trail conditions meticulously."}
             </p>
          </div>
          <div className="flex flex-col items-center text-center">
             <Heart className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">{isJa ? "おもてなしの心" : "Omotenashi Spirit"}</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               {isJa ? "私たちのチームは日本のおもてなしの心を学んでいます。お客様のニーズを先読みし、思いやりのある控えめなサービスを提供することが私たちの核心です。" : "Our team is trained in the Japanese art of hospitality. Anticipating your needs and providing thoughtful, discreet service is at the core of what we do."}
             </p>
          </div>
          <div className="flex flex-col items-center text-center">
             <Compass className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">{isJa ? "厳選された体験" : "Curated Experiences"}</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               {isJa ? "私たちはありきたりな旅をしません。すべてのロッジ、すべての寄り道、すべての食事が、プレミアムで本物の体験を保証するために慎重に選ばれています。" : "We skip the ordinary. Every lodge, every detour, and every meal is carefully selected to ensure a premium, authentic experience."}
             </p>
          </div>
          <div className="flex flex-col items-center text-center">
             <Award className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">{isJa ? "サステナブルなラグジュアリー" : "Sustainable Luxury"}</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               {isJa ? "私たちは責任ある旅行を信じています。地元コミュニティを支援し、環境に優しいプレミアムロッジと提携しています。" : "We believe in traveling responsibly. We support local communities and partner with eco-friendly premium lodges."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
