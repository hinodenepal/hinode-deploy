import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Star } from "lucide-react";
import { TOURS, DESTINATIONS, ARTICLES } from "../../data/mock";

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full mt-[-6rem] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1697012511676-674067ec0aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBzdW5yaXNlfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Himalayas Sunrise" 
            className="w-full h-full object-cover scale-105 transform hover:scale-100 transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center text-white mt-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white/90"
          >
            Curated Luxury in the Himalayas
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-wide"
          >
            魂を揺さぶる<br/>ネパールの旅へ
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/tours" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-widest uppercase">
              Discover Journeys <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-24 md:py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Curated Experiences</span>
              <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C] mb-6">厳選された旅のプラン</h2>
              <p className="text-[#5A5A5A] font-light leading-relaxed">
                We have meticulously crafted journeys that blend the raw beauty of Nepal with unparalleled comfort and Japanese-standard hospitality.
              </p>
            </div>
            <Link to="/tours" className="group flex items-center gap-2 text-sm tracking-widest uppercase text-[#2C2C2C] hover:text-[#8B2C24] transition-colors pb-1 border-b border-[#2C2C2C] hover:border-[#8B2C24]">
              View All Tours <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {TOURS.slice(0, 2).map((tour) => (
              <Link key={tour.id} to={`/tours/${tour.id}`} className="group block">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-t-[100px] rounded-b-sm">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-6 left-6 bg-[#FAF9F6]/90 backdrop-blur px-4 py-1.5 text-xs tracking-widest text-[#2C2C2C] uppercase rounded-full">
                    {tour.duration}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl text-[#2C2C2C] mb-2">{tour.title}</h3>
                <p className="text-[#5A5A5A] text-sm uppercase tracking-wider mb-3">{tour.enTitle}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#5A5A5A]">{tour.destination}</span>
                  <span className="text-[#8B2C24]">{tour.price}~</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-24 md:py-32 bg-[#F4F1EC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Destinations</span>
            <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C]">魅惑の目的地</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <Link key={dest.id} to={`/destinations/${dest.id}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-white/80 text-xs tracking-[0.2em] uppercase mb-2">{dest.title}</span>
                  <h3 className="text-2xl text-white font-medium">{dest.jpTitle}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsb2RnZXxlbnwxfHx8fDE3Nzk4OTk2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Luxury Lodge" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#2C2C2C]/80" />
        </div>
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center text-[#FAF9F6]">
          <h2 className="text-3xl md:text-5xl font-light mb-6">あなただけの特別なネパール旅を</h2>
          <p className="max-w-2xl mx-auto text-[#D1CCC5] mb-10 font-light leading-relaxed">
            Let us design a bespoke itinerary that matches your pace, preferences, and desire for luxury. Our experts are ready to curate your perfect Himalayan journey.
          </p>
          <Link to="/inquiry" className="inline-block px-10 py-4 bg-[#FAF9F6] text-[#2C2C2C] text-sm tracking-widest uppercase hover:bg-[#8B2C24] hover:text-[#FAF9F6] transition-colors rounded-sm">
            Request a Consultation
          </Link>
        </div>
      </section>

      {/* Travel Guide/Blog */}
      <section className="py-24 md:py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Blogs</span>
              <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C]">ネパール旅行記とガイド</h2>
            </div>
            <Link to="/guide" className="group flex items-center gap-2 text-sm tracking-widest uppercase text-[#2C2C2C] hover:text-[#8B2C24] transition-colors pb-1 border-b border-[#2C2C2C] hover:border-[#8B2C24]">
              Read All Articles <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <Link key={article.id} to={`/guide/${article.id}`} className="group block">
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
      </section>

      {/* Testimonials snippet */}
      <section className="py-24 bg-[#F4F1EC]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <Star className="w-8 h-8 text-[#A07855] mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-[#2C2C2C] mb-8">
            「ヒマラヤの絶景と、細部まで行き届いたおもてなし。想像を遥かに超える感動的な旅になりました。ヒノデネパールにお願いして本当に良かったです。」
          </p>
          <div className="text-sm">
            <span className="block text-[#2C2C2C] font-medium mb-1">Tanaka S.</span>
            <span className="text-[#5A5A5A] tracking-wider uppercase">Tokyo, Japan</span>
          </div>
        </div>
      </section>
    </div>
  );
}
