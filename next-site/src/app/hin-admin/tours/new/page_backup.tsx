"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import CoverImageUpload from "@/components/admin/CoverImageUpload";
import { 
  ArrowLeft, Save, Compass, Star, Calendar, 
  CheckCircle, HelpCircle, Eye, Search, Plus, Trash2 
} from "lucide-react";

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  overnight: string;
  meals: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function NewTourPage() {
  const router = useRouter();
  
  // States
  const [activeSubTab, setActiveSubTab] = useState<"general" | "highlights" | "itinerary" | "inc-exc" | "faqs" | "seo">("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [destinations, setDestinations] = useState<{ slug: string; enTitle: string; title: string }[]>([]);

  useEffect(() => {
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((d) => { if (d.success) setDestinations(d.data); })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    enTitle: "",
    slug: "",
    duration: "10 Days",
    season: "Spring / Autumn",
    difficulty: "Moderate",
    price: "¥500,000",
    showPrice: true,
    image: "",
    destination: "",
    description: "",
    enDescription: "",
    metaTitle: "",
    metaDescription: "",
    focusKeywords: "",
  });

  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [newDay, setNewDay] = useState({
    title: "",
    description: "",
    overnight: "",
    meals: ""
  });

  const [inclusions, setInclusions] = useState<string[]>([]);
  const [newInclusion, setNewInclusion] = useState("");

  const [exclusions, setExclusions] = useState<string[]>([]);
  const [newExclusion, setNewExclusion] = useState("");

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // List Handlers
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const addItineraryDay = () => {
    if (newDay.title.trim() && newDay.description.trim()) {
      const dayNum = itinerary.length + 1;
      setItinerary([...itinerary, { dayNumber: dayNum, ...newDay }]);
      setNewDay({ title: "", description: "", overnight: "", meals: "" });
    }
  };

  const removeItineraryDay = (index: number) => {
    const filtered = itinerary.filter((_, i) => i !== index);
    // Re-index days
    const reindexed = filtered.map((day, idx) => ({ ...day, dayNumber: idx + 1 }));
    setItinerary(reindexed);
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion("");
    }
  };

  const removeInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()]);
      setNewExclusion("");
    }
  };

  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  const addFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      setFaqs([...faqs, { ...newFAQ }]);
      setNewFAQ({ question: "", answer: "" });
    }
  };

  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.enTitle || !formData.image || !formData.description || !formData.enDescription) {
      setError("Please fill out all required general fields.");
      setActiveSubTab("general");
      return;
    }

    setLoading(true);
    setError("");

    const completePayload = {
      ...formData,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      faqs
    };

    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completePayload),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/hin-admin");
      } else {
        setError(data.error || "Failed to create tour package.");
      }
    } catch (err) {
      setError("A server connection issue occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-6 px-6 md:px-12 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/hin-admin" className="text-[#A39E99] hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <p className="text-[#A39E99] text-xs tracking-[0.3em] uppercase mb-1">CMS</p>
              <h1 className="text-2xl font-light tracking-widest text-white">New Tour Package</h1>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Publish Package"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-sm font-light">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sub Tab Navigation Sidebar */}
          <div className="space-y-2 lg:col-span-1">
            <div className="bg-white rounded-sm border border-[#E8E5DF] p-4 space-y-1">
              <p className="text-xxs tracking-wider uppercase text-[#A39E99] px-3 mb-3">Package Creator Tabs</p>
              {[
                { id: "general", label: "General Info", icon: <Compass className="w-4 h-4" /> },
                { id: "highlights", label: "Highlights", icon: <Star className="w-4 h-4" /> },
                { id: "itinerary", label: "Day Itinerary", icon: <Calendar className="w-4 h-4" /> },
                { id: "inc-exc", label: "Inclusions/Exclusions", icon: <CheckCircle className="w-4 h-4" /> },
                { id: "faqs", label: "FAQ Section", icon: <HelpCircle className="w-4 h-4" /> },
                { id: "seo", label: "SEO Config", icon: <Search className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider uppercase rounded-sm transition-all ${
                    activeSubTab === tab.id
                      ? "bg-[#8B2C24] text-white"
                      : "text-[#5A5A5A] hover:bg-[#F4F1EC] hover:text-[#2C2C2C]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-[#2C2C2C] text-white p-6 rounded-sm text-xs leading-relaxed">
              <h4 className="text-xxs tracking-widest text-[#D1CCC5] uppercase mb-3 font-semibold">SEO Guidelines</h4>
              <p className="mb-3 text-[#A39E99] font-light">Structure your itinerary clearly day-by-day. This directly populates the JSON-LD schemas parsed by search bots.</p>
              <p className="text-[#A39E99] font-light">Include 3-5 keywords in your content and write clear FAQs to appear in Google Rich Search Snippets.</p>
            </div>
          </div>

          {/* Form Content Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-sm border border-[#E8E5DF] p-8 min-h-[500px]">
              
              {/* 1. GENERAL TAB */}
              {activeSubTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">General Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Japanese Tour Title *</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="エベレスト・ベースキャンプ・ラグジュアリー"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">English Tour Title *</label>
                      <input
                        type="text"
                        name="enTitle"
                        required
                        value={formData.enTitle}
                        onChange={handleChange}
                        placeholder="Everest Base Camp Luxury Trek"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="14 Days"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Best Season</label>
                      <input
                        type="text"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        placeholder="Spring / Autumn"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Difficulty</label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      >
                        <option>Easy</option>
                        <option>Moderate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Price</label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="showPrice" 
                            checked={formData.showPrice} 
                            onChange={handleChange}
                            className="accent-[#8B2C24]"
                          />
                          <span className="text-xs text-[#5A5A5A]">Show Price</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="¥850,000"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Destination</label>
                      {destinations.length > 0 ? (
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        >
                          <option value="">— Select a Destination —</option>
                          {destinations.map((d) => (
                            <option key={d.slug} value={d.slug}>{d.enTitle} / {d.title}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="border border-dashed border-[#D1CCC5] rounded-sm px-4 py-2.5 text-xs text-[#A39E99]">
                          No destinations yet. <Link href="/hin-admin/destinations/new" className="text-[#8B2C24] underline">Create one first →</Link>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Custom URL Slug</label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="everest-base-camp-luxury"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Cover Image *</label>
                    <CoverImageUpload 
                      value={formData.image} 
                      onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))} 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Overview Description (Japanese) *</label>
                    <RichTextEditor
                      value={formData.description}
                      onChange={(content) => setFormData((prev) => ({ ...prev, description: content }))}
                      placeholder="Write a compelling introductory description for the tour in Japanese..."
                      height={300}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Overview Description (English) *</label>
                    <RichTextEditor
                      value={formData.enDescription}
                      onChange={(content) => setFormData((prev) => ({ ...prev, enDescription: content }))}
                      placeholder="Write a compelling introductory description for the tour in English..."
                      height={300}
                    />
                  </div>
                </div>
              )}

              {/* 2. HIGHLIGHTS TAB */}
              {activeSubTab === "highlights" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">Key Tour Highlights</h3>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      placeholder="e.g. Scenic helicopter flight back to Kathmandu"
                      className="flex-1 border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                    />
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xs tracking-wider uppercase rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>

                  {highlights.length === 0 ? (
                    <div className="text-center py-12 text-[#A39E99] font-light text-sm">
                      No highlights added. Provide key takeaways to summarize the package value.
                    </div>
                  ) : (
                    <div className="border border-[#E8E5DF] rounded-sm overflow-hidden">
                      <ul className="divide-y divide-[#E8E5DF]">
                        {highlights.map((item, index) => (
                          <li key={index} className="flex justify-between items-center py-3 px-4 bg-[#FAF9F6] text-sm text-[#5A5A5A]">
                            <span className="font-light">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeHighlight(index)}
                              className="p-1 text-[#A39E99] hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* 3. ITINERARY TAB */}
              {activeSubTab === "itinerary" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">Day-by-Day Itinerary ({itinerary.length} Days)</h3>
                  
                  <div className="bg-[#FAF9F6] p-6 rounded-sm border border-[#E8E5DF] space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-[#2C2C2C] font-semibold">Add Itinerary Day</h4>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Day Title</label>
                      <input
                        type="text"
                        value={newDay.title}
                        onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                        placeholder="e.g. Arrival in Kathmandu and Transfer"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Activity Details</label>
                      <textarea
                        rows={3}
                        value={newDay.description}
                        onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
                        placeholder="Explain the activities, elevations, trek distance, and trail highlights..."
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Overnight Lodging</label>
                        <input
                          type="text"
                          value={newDay.overnight}
                          onChange={(e) => setNewDay({ ...newDay, overnight: e.target.value })}
                          placeholder="e.g. Hyatt Regency or Luxury Teahouse"
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Meals Included</label>
                        <input
                          type="text"
                          value={newDay.meals}
                          onChange={(e) => setNewDay({ ...newDay, meals: e.target.value })}
                          placeholder="e.g. Breakfast, Lunch, Dinner (B/L/D)"
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addItineraryDay}
                      className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xs tracking-wider uppercase rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Day
                    </button>
                  </div>

                  {itinerary.length === 0 ? (
                    <div className="text-center py-12 text-[#A39E99] font-light text-sm">
                      No itinerary days added. Create days to build the journey timeline.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {itinerary.map((day, idx) => (
                        <div key={idx} className="border border-[#E8E5DF] rounded-sm p-5 bg-white relative hover:border-[#8B2C24] transition-colors">
                          <button
                            type="button"
                            onClick={() => removeItineraryDay(idx)}
                            className="absolute top-4 right-4 p-1 text-[#A39E99] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="text-xs font-bold text-[#8B2C24] mb-1">DAY {day.dayNumber}</div>
                          <h4 className="text-sm font-medium text-[#2C2C2C] mb-2">{day.title}</h4>
                          <p className="text-xs text-[#5A5A5A] font-light leading-relaxed mb-3">{day.description}</p>
                          <div className="flex gap-4 text-xxs text-[#A39E99] uppercase tracking-wider">
                            <span>🏨 Lodging: {day.overnight || "N/A"}</span>
                            <span>🍽️ Meals: {day.meals || "N/A"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4. INCLUSIONS & EXCLUSIONS TAB */}
              {activeSubTab === "inc-exc" && (
                <div className="space-y-8">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">Inclusions & Exclusions</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Inclusions */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-[#8B2C24] font-semibold">Included in Price</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newInclusion}
                          onChange={(e) => setNewInclusion(e.target.value)}
                          placeholder="e.g. All Airport Pickups/Drops"
                          className="flex-1 border border-[#D1CCC5] rounded-sm px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-xs"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInclusion())}
                        />
                        <button
                          type="button"
                          onClick={addInclusion}
                          className="px-3 py-1.5 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xxs tracking-wider uppercase rounded-sm transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="border border-[#E8E5DF] rounded-sm divide-y divide-[#E8E5DF] bg-[#FAF9F6]">
                        {inclusions.map((item, i) => (
                          <li key={i} className="flex justify-between items-center py-2 px-3 text-xs text-[#5A5A5A] font-light">
                            <span>{item}</span>
                            <button type="button" onClick={() => removeInclusion(i)} className="text-[#A39E99] hover:text-red-600">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                        {inclusions.length === 0 && (
                          <li className="py-4 text-center text-xxs text-[#A39E99]">No inclusion items.</li>
                        )}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-[#5A5A5A] font-semibold">Excluded / Extras</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newExclusion}
                          onChange={(e) => setNewExclusion(e.target.value)}
                          placeholder="e.g. International airfare, Visa fees"
                          className="flex-1 border border-[#D1CCC5] rounded-sm px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-xs"
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExclusion())}
                        />
                        <button
                          type="button"
                          onClick={addExclusion}
                          className="px-3 py-1.5 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xxs tracking-wider uppercase rounded-sm transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <ul className="border border-[#E8E5DF] rounded-sm divide-y divide-[#E8E5DF] bg-[#FAF9F6]">
                        {exclusions.map((item, i) => (
                          <li key={i} className="flex justify-between items-center py-2 px-3 text-xs text-[#5A5A5A] font-light">
                            <span>{item}</span>
                            <button type="button" onClick={() => removeExclusion(i)} className="text-[#A39E99] hover:text-red-600">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                        {exclusions.length === 0 && (
                          <li className="py-4 text-center text-xxs text-[#A39E99]">No exclusion items.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. FAQs TAB */}
              {activeSubTab === "faqs" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">FAQ Section</h3>
                  
                  <div className="bg-[#FAF9F6] p-6 border border-[#E8E5DF] rounded-sm space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-[#2C2C2C] font-semibold">Create FAQ Entry</h4>
                    <div className="flex flex-col gap-2">
                      <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Question</label>
                      <input
                        type="text"
                        value={newFAQ.question}
                        onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                        placeholder="e.g. What is the maximum altitude reached on this trek?"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Detailed Answer</label>
                      <textarea
                        rows={3}
                        value={newFAQ.answer}
                        onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                        placeholder="Provide a clear, detailed, and reassuring response..."
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addFAQ}
                      className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xs tracking-wider uppercase rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add FAQ
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <div className="text-center py-12 text-[#A39E99] font-light text-sm">
                      No FAQs added. Dynamic FAQPage JSON-LD schema will populate when Q&As exist.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-[#E8E5DF] rounded-sm p-5 bg-white relative hover:border-[#8B2C24] transition-colors">
                          <button
                            type="button"
                            onClick={() => removeFAQ(i)}
                            className="absolute top-4 right-4 p-1 text-[#A39E99] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <h4 className="text-sm font-medium text-[#2C2C2C] pr-8 mb-2">Q: {faq.question}</h4>
                          <p className="text-xs text-[#5A5A5A] font-light leading-relaxed">A: {faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 6. SEO TAB */}
              {activeSubTab === "seo" && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">SEO Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Title</label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        placeholder="Everest Base Camp Luxury Tour | Hinode Nepal"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Focus Keywords</label>
                      <input
                        type="text"
                        name="focusKeywords"
                        value={formData.focusKeywords}
                        onChange={handleChange}
                        placeholder="Everest Luxury Trek, Nepal Tourism, Hinode"
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Description</label>
                    <textarea
                      name="metaDescription"
                      rows={3}
                      value={formData.metaDescription}
                      onChange={handleChange}
                      placeholder="Write a highly search-optimized snippet (around 150-160 characters)..."
                      className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                    />
                  </div>

                  {/* Google Search Result Preview Simulator */}
                  <div className="pt-6 border-t border-[#E8E5DF]">
                    <span className="block text-xs uppercase tracking-widest text-[#5A5A5A] mb-4">Google Search Result Preview</span>
                    <div className="bg-white border border-[#E8E5DF] p-5 rounded-md shadow-sm max-w-xl">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#202124] mb-1 font-sans">
                        <span>https://hinodenepal.com</span>
                        <span className="text-[#5f6368]">› tours › {formData.slug || "everest-base-camp-luxury"}</span>
                      </div>
                      <h4 className="text-[#1a0dab] hover:underline text-[19px] font-sans leading-tight mb-1 cursor-pointer font-medium">
                        {formData.metaTitle || `${formData.enTitle || "Tour Package"} | Hinode Nepal Luxury Tours`}
                      </h4>
                      <p className="text-[#4d5156] text-[13px] font-sans leading-relaxed">
                        <span className="text-[#70757a]">Jun 8, 2026 — </span>
                        {formData.metaDescription || `${formData.description ? formData.description.slice(0, 150) + "..." : "Experience the ultimate luxury journey to the roof of the world with Hinode Nepal. Premium lodges and expert guide concierge included."}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
