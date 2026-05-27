import { Link } from "react-router";
import { ARTICLES } from "../../data/mock";

export function BlogListing() {
  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-24">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Blogs</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">旅のガイド</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            Insights, travel tips, and stories to help you prepare for your premium journey to Nepal.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-24">
          <Link to={`/guide/${featured.id}`} className="group block relative rounded-sm overflow-hidden">
             <div className="relative aspect-[21/9] min-h-[400px]">
               <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
               <div className="absolute bottom-0 left-0 p-8 md:p-16">
                 <div className="flex items-center gap-4 text-xs tracking-wider text-white/80 mb-4 uppercase">
                    <span>{featured.category}</span>
                    <div className="w-1 h-1 rounded-full bg-white/50"></div>
                    <span>{featured.date}</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-light text-white mb-4 max-w-3xl">{featured.title}</h2>
                 <p className="text-white/80 text-lg">{featured.enTitle}</p>
               </div>
             </div>
          </Link>
        </div>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rest.concat(ARTICLES).map((article, i) => (
             <Link key={`${article.id}-${i}`} to={`/guide/${article.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-6 rounded-sm">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-4 text-xs tracking-wider text-[#5A5A5A] mb-3 uppercase">
                  <span>{article.category}</span>
                  <div className="w-1 h-1 rounded-full bg-[#D1CCC5]"></div>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl text-[#2C2C2C] mb-2 group-hover:text-[#8B2C24] transition-colors">{article.title}</h3>
                <p className="text-[#5A5A5A] text-sm">{article.enTitle}</p>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
