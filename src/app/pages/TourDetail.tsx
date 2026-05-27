import { useParams, Link } from "react-router";
import { ArrowRight, Check, MapPin, Calendar, Clock, Mountain, Info, Star } from "lucide-react";
import { TOURS } from "../../data/mock";

export function TourDetail() {
  const { id } = useParams();
  const tour = TOURS.find((t) => t.id === id) || TOURS[0];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] min-h-[600px] w-full mt-[-6rem]">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-black/20 to-black/40" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="text-white text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block drop-shadow-md">
                {tour.destination}
              </span>
              <h1 className="text-4xl md:text-6xl font-light text-[#2C2C2C] bg-white/90 backdrop-blur inline-block px-6 py-4 rounded-t-lg shadow-xl translate-y-8">
                {tour.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 pt-16 pb-24">
        <h2 className="text-xl text-[#5A5A5A] uppercase tracking-wider mb-12">{tour.enTitle}</h2>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-[#D1CCC5] mb-16">
              <div className="flex flex-col gap-2">
                <Clock className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">Duration</span>
                <span className="font-medium text-[#2C2C2C]">{tour.duration}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Mountain className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">Difficulty</span>
                <span className="font-medium text-[#2C2C2C]">{tour.difficulty}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Calendar className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">Best Season</span>
                <span className="font-medium text-[#2C2C2C]">{tour.season}</span>
              </div>
              <div className="flex flex-col gap-2">
                <MapPin className="w-5 h-5 text-[#8B2C24]" />
                <span className="text-xs uppercase tracking-wider text-[#5A5A5A]">Start/End</span>
                <span className="font-medium text-[#2C2C2C]">Kathmandu</span>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-16">
              <h3 className="text-2xl font-light text-[#2C2C2C] mb-6">Overview</h3>
              <p className="text-[#5A5A5A] leading-relaxed font-light text-lg mb-6">
                {tour.description}
                This journey is meticulously designed for those who seek the thrill of the Himalayas without compromising on comfort. Experience the majesty of the mountains during the day and retreat to the warmth of premium lodges at night.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "Stay in premium comfort lodges with en-suite facilities where available.",
                  "Guided by highly experienced, English/Japanese speaking Sherpa guides.",
                  "Helicopter return option available for a truly luxurious finish.",
                  "All domestic flights, permits, and logistics handled seamlessly."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#5A5A5A]">
                    <Check className="w-5 h-5 text-[#8B2C24] shrink-0 mt-0.5" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Day by Day */}
            <section className="mb-16">
              <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">Itinerary</h3>
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-[#D1CCC5]">
                {[
                  { day: "01", title: "Arrival in Kathmandu", desc: "Welcome to Nepal. Transfer to your luxury heritage hotel. Evening briefing and welcome dinner." },
                  { day: "02", title: "Fly to Lukla, Trek to Phakding", desc: "A scenic morning flight to Lukla followed by a gentle introductory trek to Phakding. Stay at a premium lodge." },
                  { day: "03", title: "Trek to Namche Bazaar", desc: "Enter Sagarmatha National Park and ascend to the bustling Sherpa capital, Namche Bazaar." },
                  { day: "04", title: "Acclimatization Day in Namche", desc: "Hike to Everest View Hotel for panoramic views, returning to Namche for rest." }
                ].map((item, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#FAF9F6] border-2 border-[#8B2C24] flex items-center justify-center text-xs font-bold text-[#8B2C24]">
                      {item.day}
                    </div>
                    <h4 className="text-lg font-medium text-[#2C2C2C] mb-2">Day {item.day}: {item.title}</h4>
                    <p className="text-[#5A5A5A] font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pl-12 text-sm text-[#8B2C24] uppercase tracking-widest cursor-pointer hover:underline">
                View Full Itinerary
              </div>
            </section>

            {/* Gallery placeholder */}
            <section className="mb-16">
               <h3 className="text-2xl font-light text-[#2C2C2C] mb-8">Gallery</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="aspect-square bg-[#E8E5DF] rounded-sm overflow-hidden">
                       <img src={tour.image} alt="Gallery" className="w-full h-full object-cover opacity-80" />
                    </div>
                 ))}
               </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 bg-white border border-[#E8E5DF] p-8 rounded-sm shadow-xl shadow-black/5">
              <div className="mb-6 pb-6 border-b border-[#E8E5DF]">
                <span className="text-sm uppercase tracking-wider text-[#5A5A5A] block mb-2">Starting from</span>
                <div className="text-3xl text-[#2C2C2C] mb-2">{tour.price} <span className="text-sm text-[#5A5A5A] font-light">/ person</span></div>
                <div className="flex items-center gap-2 text-xs text-[#8B2C24]">
                  <Info className="w-4 h-4" />
                  <span>Fully customizable</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Link to="/inquiry" className="block w-full py-4 bg-[#2C2C2C] text-[#FAF9F6] text-center text-sm tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm">
                  Inquire Now
                </Link>
                <button className="block w-full py-4 bg-transparent border border-[#2C2C2C] text-[#2C2C2C] text-center text-sm tracking-widest uppercase hover:bg-[#F4F1EC] transition-colors rounded-sm">
                  Download PDF
                </button>
              </div>

              <div className="bg-[#F4F1EC] p-6 rounded-sm">
                <h4 className="text-sm font-medium text-[#2C2C2C] mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#A07855]" /> Premium Support
                </h4>
                <p className="text-xs text-[#5A5A5A] leading-relaxed mb-4">
                  Our Japanese-speaking concierge team is available to assist you in planning your perfect journey.
                </p>
                <a href="#" className="text-sm text-[#8B2C24] border-b border-[#8B2C24] pb-0.5">Contact Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Tours */}
      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-light text-[#2C2C2C] mb-12 text-center">Similar Journeys</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOURS.slice(1,4).map((t) => (
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
