import { useParams, Link } from "react-router";
import { DESTINATIONS, TOURS } from "../../data/mock";

export function DestinationDetail() {
  const { id } = useParams();
  const dest = DESTINATIONS.find((d) => d.id === id) || DESTINATIONS[0];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full mt-[-6rem]">
        <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide">{dest.title}</h1>
            <p className="text-xl md:text-2xl font-light tracking-widest">{dest.jpTitle}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
             <p className="text-[#5A5A5A] font-light leading-relaxed text-xl md:text-2xl text-justify text-justify-last-center">
               {dest.description} A place where spirituality and nature intertwine seamlessly, offering an unparalleled experience for the luxury traveler seeking both comfort and profound cultural immersion.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
               <h3 className="text-2xl font-light text-[#2C2C2C] mb-6">Cultural Highlights</h3>
               <p className="text-[#5A5A5A] font-light leading-relaxed mb-6">
                 Immerse yourself in the rich tapestry of local traditions. Visit centuries-old monasteries, observe daily rituals, and connect with communities whose way of life has remained unchanged for generations.
               </p>
            </div>
            <div>
               <h3 className="text-2xl font-light text-[#2C2C2C] mb-6">Luxury Experiences</h3>
               <p className="text-[#5A5A5A] font-light leading-relaxed mb-6">
                 Retreat to carefully selected boutique heritage hotels and premium lodges. Enjoy private guided tours, exclusive dining experiences, and personalized wellness sessions overlooking the Himalayas.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours in this destination */}
      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Journeys in {dest.title}</span>
            <h2 className="text-3xl font-light text-[#2C2C2C]">関連するツアー</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {TOURS.slice(0,3).map((tour) => (
               <Link key={tour.id} to={`/tours/${tour.id}`} className="group block bg-white rounded-sm overflow-hidden">
                 <div className="aspect-[4/3] overflow-hidden">
                   <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
                 <div className="p-6">
                   <h3 className="text-lg text-[#2C2C2C] mb-2">{tour.title}</h3>
                   <span className="text-sm text-[#8B2C24] block mb-4">{tour.price}</span>
                   <span className="text-xs tracking-widest text-[#5A5A5A] uppercase border-b border-[#D1CCC5] pb-1">View Tour</span>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
