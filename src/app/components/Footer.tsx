import { Link } from "react-router";
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#FAF9F6] pt-24 pb-12 mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img src="/src/assets/hinode-logo.svg" alt="Hinode Logo" className="w-8 h-8 text-[#FAF9F6] transition-transform duration-500 group-hover:rotate-45" />
              <span className="text-xl font-medium tracking-widest text-[#FAF9F6]">
                HINODE NEPAL
              </span>
            </Link>
            <p className="text-[#A39E99] text-sm leading-relaxed mb-6">
              Curating premium luxury travel experiences in Nepal for the discerning Japanese traveler. Discover the profound beauty of the Himalayas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#D1CCC5]">Journeys</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/tours" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">All Tours</Link></li>
              <li><Link to="/tours/everest-base-camp-luxury" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">Everest Luxury Trek</Link></li>
              <li><Link to="/tours/annapurna-sanctuary" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">Annapurna Sanctuary</Link></li>
              <li><Link to="/destinations" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">Destinations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#D1CCC5]">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">About Us</Link></li>
              <li><Link to="/testimonials" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">Testimonials</Link></li>
              <li><Link to="/guide" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">Blogs</Link></li>
              <li><Link to="/contact" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#D1CCC5]">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-[#A39E99] text-sm">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>Thamel, Kathmandu<br/>Bagmati Province, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-[#A39E99] text-sm">
                <Phone className="w-5 h-5 shrink-0" />
                <span>Nepal: +977 985-1146179<br/>Japan: +81-7036177182</span>
              </li>
              <li className="flex items-center gap-3 text-[#A39E99] text-sm">
                <Mail className="w-5 h-5 shrink-0" />
                <span>info@hinodenepal.jp</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#4A4A4A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A39E99] text-xs">
            © {new Date().getFullYear()} Hinode Nepal. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#A39E99]">
            <a href="#" className="hover:text-[#FAF9F6] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FAF9F6] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
