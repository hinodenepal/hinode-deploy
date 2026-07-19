import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import { ARTICLES } from "@/data/mock";
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
    title: isJa ? "ネパール旅行ブログ | ヒノデネパール" : "Nepal Travel Blog & Guide | Hinode Nepal",
    description: isJa
      ? "ネパールの旅行ヒント、文化的な洞察、高級宿泊施設ガイド。ヒノデネパール編集部からの専門家のアドバイス。"
      : "Read travel tips, cultural insights, and luxury accommodation guides for Nepal.",
    alternates: { languages: { ja: "https://hinodenepal.jp/ja/blog", en: "https://hinodenepal.jp/en/blog" } },
  };
}

async function getArticles() {
  await dbConnect();
  let posts = await Post.find({}).sort({ createdAt: -1 });
  if (posts.length === 0) {
    const seedData = ARTICLES.map((art) => ({
      title: art.title, enTitle: art.enTitle, category: art.category,
      image: art.image, date: art.date, slug: art.id,
      content: `<p class="text-xl text-[#2C2C2C] mb-8 font-light leading-relaxed">${art.enTitle}</p>`,
    }));
    await Post.insertMany(seedData);
    posts = await Post.find({}).sort({ createdAt: -1 });
  }
  return posts;
}

export default async function BlogListingPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  const posts = await getArticles();

  if (posts.length === 0) {
    return (
      <div className="w-full bg-[#FAF9F6] py-24 text-center">
        <p className="text-[#5A5A5A]">{isJa ? "記事がありません。" : "No posts found."}</p>
      </div>
    );
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": isJa ? "ネパール旅行ブログ | ヒノデネパール" : "Nepal Travel Blog & Guide | Hinode Nepal",
    "description": isJa
      ? "ネパールの旅行ヒント、文化的な洞察、高級宿泊施設ガイド。ヒノデネパール編集部からの専門家のアドバイス。"
      : "Read travel tips, cultural insights, and luxury accommodation guides for Nepal.",
    "url": `https://hinodenepal.jp/${locale}/blog`
  };

  return (
    <div className="w-full bg-[#FAF9F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="text-center mb-24">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block font-semibold">
            {isJa ? "ブログ" : "Blogs"}
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">
            {isJa ? "旅のガイド" : "Travel Guide"}
          </h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            {isJa
              ? "ネパールへの高級旅行を準備するための旅行ヒント、文化的な洞察、ストーリーをお届けします。"
              : "Insights, travel tips, and stories to help you prepare for your premium journey to Nepal."}
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-24">
          <Link href={p(`/blog/${featured.slug}`)} className="group block relative rounded-sm overflow-hidden shadow-lg">
            <div className="relative aspect-[21/9] min-h-[400px]">
              <Image src={featured.image} alt={`${featured.enTitle || featured.title} - Featured article`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-16">
                <div className="flex items-center gap-4 text-xs tracking-wider text-white/80 mb-4 uppercase">
                  <span>{featured.category}</span>
                  <div className="w-1 h-1 rounded-full bg-white/50"></div>
                  <span>{featured.date}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 max-w-3xl leading-tight">
                  {isJa ? featured.title : featured.enTitle}
                </h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Articles */}
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rest.map((article) => (
              <Link key={article._id?.toString() || article.slug} href={p(`/blog/${article.slug}`)} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-6 rounded-sm shadow-sm relative">
                  <Image src={article.image} alt={`${article.enTitle || article.title} - ${article.category}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="flex items-center gap-4 text-xs tracking-wider text-[#5A5A5A] mb-3 uppercase">
                  <span>{article.category}</span>
                  <div className="w-1 h-1 rounded-full bg-[#D1CCC5]"></div>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl text-[#2C2C2C] mb-2 group-hover:text-[#8B2C24] transition-colors font-medium">
                  {isJa ? article.title : article.enTitle}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#5A5A5A] font-light">
            {isJa ? "他の記事はまだありません。" : "No other articles available yet."}
          </p>
        )}
      </div>
    </div>
  );
}
