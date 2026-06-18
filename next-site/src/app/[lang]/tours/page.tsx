"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, SlidersHorizontal, Search, X } from "lucide-react";
import { DESTINATIONS } from "@/data/mock";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ToursPage({ params }: PageProps) {
  const { lang } = use(params);
  const locale = lang as Locale;
  const isJa = locale === "ja";
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;

  const [activeTab, setActiveTab] = useState("All");
  const [toursList, setToursList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const formatted = data.data.map((t: any) => ({
            id: t.slug,
            title: t.title,
            enTitle: t.enTitle,
            duration: t.duration,
            season: t.season,
            difficulty: t.difficulty,
            price: t.price,
            image: t.image,
            destination: t.destination,
            description: t.description,
          }));
          setToursList(formatted);
        } else {
          setToursList([]);
        }
      } catch {
        setToursList([]);
      }
    }
    fetchTours();
  }, []);

  const tabs = isJa
    ? ["すべて", "トレッキング", "文化体験", "ラグジュアリーサファリ"]
    : ["All", "Trekking", "Cultural", "Luxury Safari"];

  const filteredTours = toursList.filter((tour) => {
    // 1. Tab filter
    const tabIndex = tabs.indexOf(activeTab);
    let tabMatch = true;
    if (tabIndex === 1) tabMatch = tour.destination.toLowerCase().includes("region") || tour.enTitle.toLowerCase().includes("trek");
    if (tabIndex === 2) tabMatch = tour.destination.toLowerCase().includes("kathmandu") || tour.enTitle.toLowerCase().includes("heritage") || tour.enTitle.toLowerCase().includes("culture");
    if (tabIndex === 3) tabMatch = tour.destination.toLowerCase().includes("chitwan") || tour.enTitle.toLowerCase().includes("safari");

    if (!tabMatch) return false;

    // 2. Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchSearch = 
        tour.title.toLowerCase().includes(query) ||
        tour.enTitle.toLowerCase().includes(query) ||
        tour.description.toLowerCase().includes(query) ||
        tour.destination.toLowerCase().includes(query);
      if (!matchSearch) return false;
    }

    // 3. Duration filter
    if (selectedDurations.length > 0) {
      const daysMatch = tour.duration.match(/\d+/);
      const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;
      
      let durationMatch = false;
      if (selectedDurations.includes("1-5 Days") && days >= 1 && days <= 5) durationMatch = true;
      if (selectedDurations.includes("6-10 Days") && days >= 6 && days <= 10) durationMatch = true;
      if (selectedDurations.includes("11+ Days") && days >= 11) durationMatch = true;

      if (!durationMatch) return false;
    }

    // 4. Difficulty filter
    if (selectedDifficulties.length > 0) {
      const difficultyMapping: Record<string, string> = {
        "Easy": "初級",
        "Moderate": "中級",
        "Advanced": "上級",
      };
      
      const hasMatch = selectedDifficulties.some(diff => {
        const targetDiff = isJa ? diff : difficultyMapping[diff];
        return tour.difficulty.includes(targetDiff);
      });
      if (!hasMatch) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDurations([]);
    setSelectedDifficulties([]);
    setActiveTab(tabs[0]);
  };
  
  const hasActiveFilters = searchQuery !== "" || selectedDurations.length > 0 || selectedDifficulties.length > 0 || activeTab !== tabs[0];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden mt-[-6rem]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVra2luZyUyMG5lcGFsfGVufDF8fHx8MTc3OTg5OTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Trekkers hiking through the scenic Himalayan trails in Nepal"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center text-white mt-20">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-white">
            {isJa ? "旅のプラン" : "Journeys"}
          </h1>
          <p className="text-lg text-white/80 tracking-widest font-light">
            {isJa ? "至高のネパール体験" : "The Ultimate Nepal Experience"}
          </p>
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
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-[#2C2C2C]">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="text-sm tracking-widest uppercase font-medium">
                    {isJa ? "フィルター" : "Filter"}
                  </span>
                </div>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-[#8B2C24] uppercase tracking-wider hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    {isJa ? "クリア" : "Clear All"}
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={isJa ? "キーワード検索..." : "Search tours..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-b border-[#D1CCC5] py-2 pl-8 bg-transparent focus:outline-none focus:border-[#8B2C24] text-sm text-[#2C2C2C]"
                  />
                  <Search className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-[#5A5A5A]" />
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-wider text-[#5A5A5A] mb-4">
                    {isJa ? "日数" : "Duration"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {["1-5 Days", "6-10 Days", "11+ Days"].map((dur) => (
                      <label key={dur} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedDurations.includes(dur)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedDurations([...selectedDurations, dur]);
                            else setSelectedDurations(selectedDurations.filter(d => d !== dur));
                          }}
                          className="w-4 h-4 accent-[#8B2C24] bg-transparent border-[#D1CCC5] rounded" 
                        />
                        <span className="text-[#2C2C2C] text-sm group-hover:text-[#8B2C24] transition-colors">{dur}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-wider text-[#5A5A5A] mb-4">
                    {isJa ? "難易度" : "Difficulty"}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {(isJa ? ["初級", "中級", "上級"] : ["Easy", "Moderate", "Advanced"]).map((diff) => (
                      <label key={diff} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedDifficulties.includes(diff)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedDifficulties([...selectedDifficulties, diff]);
                            else setSelectedDifficulties(selectedDifficulties.filter(d => d !== diff));
                          }}
                          className="w-4 h-4 accent-[#8B2C24] bg-transparent border-[#D1CCC5] rounded" 
                        />
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
              {filteredTours.map((tour) => (
                <Link key={tour.id} href={p(`/tours/${tour.id}`)} className="group block bg-white rounded-sm border border-[#E8E5DF] overflow-hidden hover:shadow-xl transition-shadow duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={`${tour.enTitle} - ${tour.duration} ${tour.difficulty} tour in ${tour.destination}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 37vw"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs tracking-widest text-[#2C2C2C] uppercase rounded-full font-semibold">
                      {tour.difficulty}
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#FAF9F6]/90 backdrop-blur px-6 py-2 text-[10px] sm:text-xs font-medium tracking-widest text-[#2C2C2C] uppercase rounded-sm shadow-md whitespace-nowrap">
                      {tour.duration}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-xs tracking-wider text-[#5A5A5A] mb-3 uppercase">
                      <span>{tour.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D1CCC5]"></span>
                      <span>{tour.season}</span>
                    </div>
                    <h3 className="text-xl text-[#2C2C2C] mb-1 group-hover:text-[#8B2C24] transition-colors font-light">
                      {isJa ? tour.title : tour.enTitle}
                    </h3>
                    <div className="flex justify-between items-end pt-6 border-t border-[#E8E5DF]">
                      <div className="flex flex-col">
                        <span className="text-xs text-[#5A5A5A] uppercase tracking-wider mb-1">
                          {isJa ? "料金" : "From"}
                        </span>
                        <span className="text-lg text-[#8B2C24] font-medium">{tour.price}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-[#D1CCC5] flex items-center justify-center group-hover:bg-[#8B2C24] group-hover:border-[#8B2C24] group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Related Destinations */}
      <section className="bg-[#F4F1EC] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-[#2C2C2C]">
              {isJa ? "目的地を探す" : "Discover Destinations"}
            </h2>
            <Link href={p("/destinations")} className="text-sm tracking-widest uppercase text-[#5A5A5A] hover:text-[#8B2C24] transition-colors border-b border-[#D1CCC5] hover:border-[#8B2C24]">
              {isJa ? "すべて見る" : "View All"}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DESTINATIONS.slice(0, 4).map((dest) => (
              <Link key={dest.id} href={p(`/destinations/${dest.id}`)} className="group relative aspect-square overflow-hidden rounded-full">
                <Image
                  src={dest.image}
                  alt={`${dest.title} - Explore this destination in Nepal`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="text-white text-lg font-medium tracking-wide">
                    {isJa ? dest.jpTitle : dest.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
