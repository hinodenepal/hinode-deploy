import { Star } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      text: "エベレスト・ベースキャンプまでのトレッキングでしたが、毎日清潔で快適なロッジに宿泊でき、食事も素晴らしかったです。ガイドのホスピタリティに感動しました。",
      name: "Takahashi Y.",
      location: "Tokyo",
      tour: "Everest Base Camp Luxury Trek",
      rating: 5
    },
    {
      text: "初めてのネパールで不安もありましたが、事前のきめ細やかなサポートと現地の日本語ガイドのおかげで、安心して素晴らしい文化体験ができました。",
      name: "Sato M.",
      location: "Osaka",
      tour: "Kathmandu Valley Heritage Tour",
      rating: 5
    },
    {
      text: "アンナプルナの朝日は一生の思い出です。ラグジュアリーなロッジでの滞在は、トレッキングの疲れを完全に癒してくれました。",
      name: "Yamamoto K.",
      location: "Kyoto",
      tour: "Annapurna Sanctuary Retreat",
      rating: 5
    },
    {
      text: "チトワンでのサファリ体験は、期待を遥かに超えるものでした。エコリゾートの設備も環境への配慮も素晴らしかったです。",
      name: "Ito S.",
      location: "Fukuoka",
      tour: "Chitwan Luxury Safari",
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-20">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Traveler Stories</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">お客様の声</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            Read about the experiences of our guests who have journeyed through Nepal with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-10 rounded-sm border border-[#E8E5DF] flex flex-col justify-between hover:shadow-lg transition-shadow duration-500">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#A07855] text-[#A07855]" />
                  ))}
                </div>
                <p className="text-[#5A5A5A] font-light leading-relaxed mb-8 text-lg">
                  "{review.text}"
                </p>
              </div>
              <div className="border-t border-[#E8E5DF] pt-6 flex justify-between items-end">
                <div>
                  <span className="block text-sm text-[#2C2C2C] font-medium mb-1">{review.name}</span>
                  <span className="text-xs text-[#8B2C24] uppercase tracking-wider">{review.location}</span>
                </div>
                <span className="text-xs text-[#5A5A5A] uppercase tracking-wider max-w-[150px] text-right">{review.tour}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
