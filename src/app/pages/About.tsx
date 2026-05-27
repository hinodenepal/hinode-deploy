import { Shield, Heart, Compass, Award } from "lucide-react";

export function About() {
  return (
    <div className="w-full bg-[#FAF9F6]">
      <section className="relative h-[60vh] min-h-[500px] w-full mt-[-6rem]">
        <img src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYXZlbGVyfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Japanese Traveler" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-wide">Our Story</h1>
            <p className="text-xl font-light tracking-widest uppercase">Hinode Nepalについて</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24 max-w-4xl">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C] mb-8 leading-tight">
            ヒマラヤの絶景と、<br className="hidden md:block"/>日本基準の細やかなおもてなしの融合
          </h2>
          <p className="text-[#5A5A5A] font-light leading-relaxed text-lg mb-8">
            Hinode Nepal was born from a profound respect for the Himalayan landscape and a desire to share its majesty with Japanese travelers, without compromising on comfort, safety, or quality.
          </p>
          <p className="text-[#5A5A5A] font-light leading-relaxed text-lg">
            We bridge the gap between rugged adventure and refined luxury, ensuring that every detail of your journey is meticulously planned and flawlessly executed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="flex flex-col items-center text-center">
             <Shield className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">Uncompromising Safety</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               Your safety is our paramount concern. We work exclusively with certified, highly experienced Sherpa guides and monitor weather and trail conditions meticulously.
             </p>
          </div>
          <div className="flex flex-col items-center text-center">
             <Heart className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">Omotenashi Spirit</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               Our team is trained in the Japanese art of hospitality. Anticipating your needs and providing thoughtful, discreet service is at the core of what we do.
             </p>
          </div>
          <div className="flex flex-col items-center text-center">
             <Compass className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">Curated Experiences</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               We skip the ordinary. Every lodge, every detour, and every meal is carefully selected to ensure a premium, authentic experience.
             </p>
          </div>
          <div className="flex flex-col items-center text-center">
             <Award className="w-10 h-10 text-[#8B2C24] mb-6" />
             <h3 className="text-xl text-[#2C2C2C] mb-4">Sustainable Luxury</h3>
             <p className="text-[#5A5A5A] font-light text-sm leading-relaxed">
               We believe in traveling responsibly. We support local communities and partner with eco-friendly premium lodges.
             </p>
          </div>
        </div>

        <div className="bg-[#F4F1EC] p-12 md:p-16 rounded-sm text-center">
          <h3 className="text-2xl font-light text-[#2C2C2C] mb-6">Message from the Founder</h3>
          <div className="w-24 h-24 mx-auto rounded-full bg-[#E8E5DF] overflow-hidden mb-6">
             <img src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYXZlbGVyfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" alt="Founder" className="w-full h-full object-cover" />
          </div>
          <p className="text-[#5A5A5A] font-light italic leading-relaxed mb-6 text-lg">
            "ネパールの手つかずの自然と深い精神性に魅了され、この素晴らしい国を日本の皆様に最高の形で体験していただきたいという思いからHinode Nepalを設立しました。皆様の人生を変えるような旅のサポートができることを楽しみにしています。"
          </p>
          <span className="block text-sm text-[#2C2C2C] uppercase tracking-widest font-medium">Kenji Sato</span>
          <span className="text-xs text-[#8B2C24] uppercase tracking-wider">Founder & Managing Director</span>
        </div>
      </div>
    </div>
  );
}
