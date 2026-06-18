import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { Calendar, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  
  const decodedSlug = decodeURIComponent(slug);
  const isJa = lang === "ja";
  
  return {
    title: isJa ? `${decodedSlug} | 著者 | ヒノデネパール` : `${decodedSlug} | Author | Hinode Nepal`,
    description: isJa 
      ? `${decodedSlug}によるネパール旅行、トレッキング、文化に関する記事一覧。`
      : `Articles by ${decodedSlug} about Nepal travel, trekking, and culture.`,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug, lang } = await params;
  if (!isValidLocale(lang)) notFound();
  
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const decodedSlug = decodeURIComponent(slug);
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  await dbConnect();
  
  // Find posts by this author (either in author or enAuthor field)
  const posts = await Post.find({
    $or: [{ author: decodedSlug }, { enAuthor: decodedSlug }]
  }).sort({ createdAt: -1 }).lean() as any[];

  if (posts.length === 0) {
    notFound();
  }

  // Author details (can be hardcoded or derived from the posts)
  const authorName = isJa ? posts[0].author || decodedSlug : posts[0].enAuthor || decodedSlug;
  const authorBio = isJa 
    ? "ネパール在住のトラベルエキスパート。現地ならではの視点で、ネパールの魅力を深掘りしてお伝えします。"
    : "A travel expert residing in Nepal. Sharing the deep charm of Nepal from a local perspective.";

  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 pb-16 border-b border-[#D1CCC5]">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-[#E8E5DF] shrink-0 relative">
            <Image 
              src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYXZlbGVyfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt={authorName} 
              fill 
              className="object-cover"
              sizes="160px"
            />
          </div>
          <div className="text-center md:text-left">
            <span className="text-[#8B2C24] text-xs tracking-widest uppercase mb-2 block">
              {isJa ? "著者" : "Author"}
            </span>
            <h1 className="text-3xl md:text-4xl font-light text-[#2C2C2C] mb-4">{authorName}</h1>
            <p className="text-[#5A5A5A] font-light leading-relaxed max-w-2xl">{authorBio}</p>
          </div>
        </div>

        {/* Author Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-[#2C2C2C] mb-8">
            {isJa ? "執筆記事一覧" : "Articles by this author"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug || post._id?.toString()} href={p(`/blog/${post.slug || post._id?.toString()}`)} className="group block">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-4 relative">
                  <Image src={post.image} alt={isJa ? post.title : (post.enTitle || post.title)} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <div className="flex items-center gap-3 text-xs tracking-wider text-[#5A5A5A] mb-3 uppercase">
                  <span className="text-[#8B2C24] font-medium">{isJa ? post.category : (post.enCategory || post.category)}</span>
                  <div className="w-1 h-1 rounded-full bg-[#D1CCC5]"></div>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                </div>
                <h3 className="text-xl font-medium text-[#2C2C2C] mb-2 leading-tight group-hover:text-[#8B2C24] transition-colors line-clamp-2">
                  {isJa ? post.title : (post.enTitle || post.title)}
                </h3>
                <div className="flex items-center gap-1 text-[#8B2C24] text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  {isJa ? "続きを読む" : "Read More"} <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
