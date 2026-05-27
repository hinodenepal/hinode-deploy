import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hinodeLogo from "@/assets/hinode-logo.svg";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Tours", path: "/tours" },
    { name: "Destinations", path: "/destinations" },
    { name: "Blogs", path: "/guide" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#FAF9F6]/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={hinodeLogo} alt="Hinode Logo" className="w-6 h-6 text-[#8B2C24] transition-transform duration-500 group-hover:rotate-45" />
            <div className="flex flex-col">
              <span className={`text-lg font-medium tracking-widest ${isScrolled || location.pathname !== '/' ? 'text-[#2C2C2C]' : 'text-[#2C2C2C]'}`}>
                HINODE NEPAL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-widest uppercase hover:text-[#8B2C24] transition-colors ${
                  location.pathname.startsWith(link.path) ? "text-[#8B2C24]" : "text-[#5A5A5A]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-px h-4 bg-[#D1CCC5]"></div>
            <Link
              to="/inquiry"
              className="px-6 py-2 border border-[#2C2C2C] text-[#2C2C2C] text-sm tracking-widest uppercase hover:bg-[#2C2C2C] hover:text-[#FAF9F6] transition-colors rounded-sm"
            >
              Inquire
            </Link>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-[#2C2C2C]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#FAF9F6] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to="/" className="flex items-center gap-2">
                <img src={hinodeLogo} alt="Hinode Logo" className="w-6 h-6 text-[#8B2C24]" />
                <span className="text-lg font-medium tracking-widest text-[#2C2C2C]">
                  HINODE NEPAL
                </span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-[#2C2C2C]" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 items-center mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-medium tracking-widest text-[#2C2C2C] uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-12 h-px bg-[#D1CCC5] my-6"></div>
              <Link
                to="/inquiry"
                className="px-8 py-3 bg-[#2C2C2C] text-[#FAF9F6] text-sm tracking-widest uppercase rounded-sm"
              >
                Inquire Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
