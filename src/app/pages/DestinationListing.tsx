import { Link } from "react-router";
import { DESTINATIONS } from "../../data/mock";

export function DestinationListing() {
  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Explore Nepal</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">目的地を探す</h1>
          <p className="text-[#5A5A5A] font-light leading-relaxed text-lg">
            From the bustling ancient streets of Kathmandu to the serene lakes of Pokhara and the majestic peaks of the Himalayas, discover the diverse regions of Nepal.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {DESTINATIONS.map((dest, index) => (
            <div key={dest.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
              <div className="w-full md:w-1/2">
                <Link to={`/destinations/${dest.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-t-[150px] rounded-b-sm group">
                  <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </Link>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block">Region</span>
                <h2 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-2">{dest.title}</h2>
                <h3 className="text-xl text-[#5A5A5A] mb-8">{dest.jpTitle}</h3>
                <p className="text-[#5A5A5A] font-light leading-relaxed mb-8 text-lg">
                  {dest.description} Explore ancient heritage sites, vibrant local culture, and stunning natural landscapes.
                </p>
                <Link to={`/destinations/${dest.id}`} className="inline-block px-8 py-4 border border-[#2C2C2C] text-[#2C2C2C] text-sm tracking-widest uppercase hover:bg-[#2C2C2C] hover:text-[#FAF9F6] transition-colors rounded-sm w-max">
                  Explore {dest.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
