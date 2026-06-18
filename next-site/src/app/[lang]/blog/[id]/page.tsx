import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Tour from "@/lib/models/Tour";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import DOMPurify from "isomorphic-dompurify";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, lang } = await params;
  await dbConnect();
  const post = await Post.findOne({ slug: id });
  if (!post) return { title: "Article Not Found | Hinode Nepal" };

  const isJa = lang === "ja";
  const title = isJa ? `${post.title} | ヒノデネパール` : `${post.enTitle || post.title} | Hinode Nepal Blog`;
  return {
    title,
    description: `${post.enTitle || post.title} - ${post.category} guide by Hinode Nepal.`,
    alternates: { languages: { ja: `https://hinodenepal.jp/ja/blog/${id}`, en: `https://hinodenepal.jp/en/blog/${id}` } },
    openGraph: { title, images: [{ url: post.image, width: 1200, height: 630, alt: post.enTitle || post.title }], type: "article" },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id, lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  await dbConnect();
  const post = await Post.findOne({ slug: id });
  if (!post) notFound();

  const relatedTours = await Tour.find({}).sort({ createdAt: -1 }).limit(3).lean() as any[];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": isJa ? post.title : post.enTitle,
    "image": [post.image],
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "author": [{
      "@type": "Person",
      "name": isJa ? post.author : post.enAuthor,
      "url": `https://hinodenepal.jp/${locale}/authors/${isJa ? post.author : post.enAuthor}`
    }]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": isJa ? "ホーム" : "Home",
      "item": `https://hinodenepal.jp/${locale}`
    },{
      "@type": "ListItem",
      "position": 2,
      "name": isJa ? "ブログ" : "Blog",
      "item": `https://hinodenepal.jp/${locale}/blog`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": isJa ? post.title : post.enTitle
    }]
  };

  return (
    <div className="w-full bg-[#FAF9F6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 text-xs tracking-wider text-[#8B2C24] mb-6 uppercase font-semibold">
            <span>{post.category}</span>
            <div className="w-1 h-1 rounded-full bg-[#D1CCC5]"></div>
            <span className="text-[#5A5A5A]">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-[#2C2C2C] mb-6 leading-tight">
            {isJa ? post.title : post.enTitle}
          </h1>
        </div>

        <div className="aspect-[21/9] w-full mb-16 rounded-sm overflow-hidden shadow-md relative">
          <Image src={post.image} alt={`${post.enTitle || post.title} - featured image`} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 800px" />
        </div>

        <article
          className="prose prose-lg max-w-none text-[#5A5A5A] font-light leading-relaxed mb-24 prose-headings:text-[#2C2C2C] prose-headings:font-light prose-a:text-[#8B2C24]"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(isJa ? post.content : (post.enContent || post.content)) }}
        />

        <div className="border-t border-[#D1CCC5] py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href={p(`/authors/${encodeURIComponent(isJa ? post.author : (post.enAuthor || post.author))}`)} className="flex items-center gap-6 group">
            <div className="w-16 h-16 rounded-full bg-[#E8E5DF] overflow-hidden relative border border-[#D1CCC5] group-hover:border-[#8B2C24] transition-colors">
              <Image src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYXZlbGVyfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt={isJa ? post.author : (post.enAuthor || post.author)} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <span className="block text-[#8B2C24] text-xs tracking-widest uppercase mb-1">{isJa ? "著者" : "Author"}</span>
              <span className="block text-lg text-[#2C2C2C] font-medium group-hover:text-[#8B2C24] transition-colors">{isJa ? post.author : (post.enAuthor || post.author)}</span>
              <span className="text-xs text-[#5A5A5A] font-light mt-1 block max-w-sm line-clamp-2">
                {isJa 
                  ? "ネパール在住のトラベルエキスパート。現地ならではの視点で、ネパールの魅力を深掘りしてお伝えします。" 
                  : "A travel expert residing in Nepal. Sharing the deep charm of Nepal from a local perspective."}
              </span>
            </div>
          </Link>
          <div className="flex gap-4">
            <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "共有" : "Share"}</span>
            <span className="text-xs text-[#8B2C24]">LINE</span>
            <span className="text-xs text-[#8B2C24]">WhatsApp</span>
          </div>
        </div>
      </div>

      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-[#2C2C2C]">{isJa ? "関連ツアー" : "Related Tours"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTours.map((t) => (
              <Link key={t.slug || t._id?.toString()} href={p(`/tours/${t.slug || t._id?.toString()}`)} className="group block bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                  <Image src={t.image} alt={`${t.enTitle} - luxury tour`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="text-lg text-[#2C2C2C] mb-1">{isJa ? t.title : t.enTitle}</h3>
                <span className="text-sm text-[#8B2C24]">{t.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
