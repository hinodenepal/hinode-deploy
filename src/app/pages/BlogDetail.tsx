import { useParams, Link } from "react-router";
import { ARTICLES, TOURS } from "../../data/mock";

export function BlogDetail() {
  const { id } = useParams();
  const article = ARTICLES.find((a) => a.id === id) || ARTICLES[0];

  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <div className="text-center mb-12">
           <div className="flex items-center justify-center gap-4 text-xs tracking-wider text-[#8B2C24] mb-6 uppercase">
              <span>{article.category}</span>
              <div className="w-1 h-1 rounded-full bg-[#D1CCC5]"></div>
              <span className="text-[#5A5A5A]">{article.date}</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-light text-[#2C2C2C] mb-6 leading-tight">{article.title}</h1>
           <p className="text-xl text-[#5A5A5A] font-light">{article.enTitle}</p>
        </div>

        <div className="aspect-[21/9] w-full mb-16 rounded-sm overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-lg max-w-none text-[#5A5A5A] font-light leading-relaxed mb-24 prose-headings:text-[#2C2C2C] prose-headings:font-light prose-a:text-[#8B2C24]">
          <p className="text-xl text-[#2C2C2C] mb-8">
            ネパールへの旅行を計画する際、最も重要な決定事項の一つが「いつ行くか」です。ヒマラヤ山脈の麓に位置するこの国は、季節によって全く異なる表情を見せます。
          </p>
          
          <h2>秋（9月〜11月）：ベストシーズン</h2>
          <p>
            モンスーン（雨季）が明け、空気が澄み渡る秋は、ヒマラヤの絶景を望むのに最も適した季節です。気候も穏やかで、トレッキングには最適な条件が揃います。多くの旅行者がこの時期を選ぶため、早めの予約をお勧めします。
          </p>

          <h2>春（3月〜5月）：シャクナゲの季節</h2>
          <p>
            春もまた、ネパールを訪れるのに素晴らしい季節です。気温が徐々に上がり、山肌は国花であるシャクナゲの鮮やかな花で彩られます。野生動物の観察（チトワン国立公園など）にも適した時期です。
          </p>

          <img src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Nzk4OTk2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Landscape" className="w-full rounded-sm my-12" />

          <h2>冬とモンスーン期</h2>
          <p>
            冬（12月〜2月）は高地では厳しい寒さとなりますが、カトマンズ盆地やポカラなどの低地では日中は暖かく、観光客も少ないため、静かな滞在を楽しめます。モンスーン期（6月〜8月）は雨が多くなりますが、ムスタン地方などのチベット仏教文化が色濃く残る雨陰地域への旅行には最適な時期です。
          </p>

          <p>
            Hinode Nepalでは、お客様のご希望の時期や目的に合わせて、最適な旅のプランをご提案いたします。季節ごとの魅力を最大限に引き出す、カスタマイズされた旅をお楽しみください。
          </p>
        </article>

        <div className="border-t border-[#D1CCC5] py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-[#E8E5DF] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYXZlbGVyfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Author" className="w-full h-full object-cover" />
             </div>
             <div>
                <span className="block text-sm text-[#2C2C2C] font-medium">Hinode Nepal Editorial Team</span>
                <span className="text-xs text-[#5A5A5A] uppercase tracking-wider">Kathmandu Office</span>
             </div>
          </div>
          <div className="flex gap-4">
            <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">Share</span>
            {/* Share icons placeholder */}
          </div>
        </div>
      </div>

      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light text-[#2C2C2C]">Related Tours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOURS.slice(0,3).map((t) => (
              <Link key={t.id} to={`/tours/${t.id}`} className="group block bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-lg text-[#2C2C2C] mb-1">{t.title}</h3>
                <span className="text-sm text-[#8B2C24]">{t.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
