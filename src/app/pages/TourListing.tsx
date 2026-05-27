import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { TOURS, DESTINATIONS } from "../../data/mock";

export function TourListing() {
  const [activeTab, setActiveTab] = useState("All");
  
  const tabs = ["All", "Trekking", "Cultural", "Luxury Safari"];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden mt-[-6rem]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVra2luZyUyMG5lcGFsfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Trekking in Nepal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center text-white mt-20">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Journeys</h1>
          <p className="text-lg text-white/80 tracking-widest font-light">至高のネパール体験</p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-16 border-b border-[#D1CCC5] pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm tracking-widest uppercase transition-colors relative pb-4 ${
                activeTab === tab ? "text-[#8B2C24]" : "text-[#5A5A5A] hover:text-[#2C2C2C]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-[#8B2C24]"></span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-32">
              <div className="flex items-center gap-2 mb-8 text-[#2C2C2C]">
                <SlidersHorizontal className="w-5 h-5" />
                <span className="text-sm tracking-widest uppercase font-medium">Filter</span>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-[#5A5A5A] mb-4">Duration</h4>
                  <div className="flex flex-col gap-3">
                    {["1-5 Days", "6-10 Days", "11+ Days"].map((dur) => (
                      <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 accent-[#8B2C24] bg-transparent border-[#D1CCC5]" />
                        <span className="text-[#2C2C2C] text-sm group-hover:text-[#8B2C24] transition-colors">{dur}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-wider text-[#5A5A5A] mb-4">Difficulty</h4>
                  <div className="flex flex-col gap-3">
                    {["Easy", "Moderate", "Advanced"].map((diff) => (
                      <label key={diff} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 accent-[#8B2C24] bg-transparent border-[#D1CCC5]" />
                        <span className="text-[#2C2C2C] text-sm group-hover:text-[#8B2C24] transition-colors">{diff}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Tour Grid */}
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {TOURS.map((tour) => (
                <Link key={tour.id} to={`/tours/${tour.id}`} className="group block bg-white rounded-sm border border-[#E8E5DF] overflow-hidden hover:shadow-xl transition-shadow duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs tracking-widest text-[#2C2C2C] uppercase rounded-full">
                      {tour.difficulty}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-xs tracking-wider text-[#5A5A5A] mb-3 uppercase">
                      <span>{tour.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D1CCC5]"></span>
                      <span>{tour.season}</span>
                    </div>
                    <h3 className="text-xl text-[#2C2C2C] mb-1 group-hover:text-[#8B2C24] transition-colors">{tour.title}</h3>
                    <p className="text-[#5A5A5A] text-xs uppercase tracking-wider mb-6">{tour.enTitle}</p>
                    <div className="flex justify-between items-end pt-6 border-t border-[#E8E5DF]">
                      <div className="flex flex-col">
                        <span className="text-xs text-[#5A5A5A] uppercase tracking-wider mb-1">From</span>
                        <span className="text-lg text-[#8B2C24]">{tour.price}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-[#D1CCC5] flex items-center justify-center group-hover:bg-[#8B2C24] group-hover:border-[#8B2C24] group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-16">
              <button className="w-10 h-10 rounded-full border border-[#D1CCC5] flex items-center justify-center text-[#5A5A5A] hover:border-[#8B2C24] hover:text-[#8B2C24] transition-colors">1</button>
              <button className="w-10 h-10 rounded-full border border-transparent flex items-center justify-center text-[#5A5A5A] hover:text-[#8B2C24] transition-colors">2</button>
              <button className="w-10 h-10 rounded-full border border-transparent flex items-center justify-center text-[#5A5A5A] hover:text-[#8B2C24] transition-colors">3</button>
              <span className="text-[#D1CCC5]">...</span>
              <button className="w-10 h-10 rounded-full border border-[#D1CCC5] flex items-center justify-center text-[#5A5A5A] hover:border-[#8B2C24] hover:text-[#8B2C24] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Related Destinations */}
      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-[#2C2C2C]">Discover Destinations</h2>
            <Link to="/destinations" className="text-sm tracking-widest uppercase text-[#5A5A5A] hover:text-[#8B2C24] transition-colors border-b border-[#D1CCC5] hover:border-[#8B2C24]">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DESTINATIONS.slice(0,4).map((dest) => (
               <Link key={dest.id} to={`/destinations/${dest.id}`} className="group relative aspect-square overflow-hidden rounded-full">
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white text-lg font-medium tracking-wide">{dest.title}</span>
                  </div>
               </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
