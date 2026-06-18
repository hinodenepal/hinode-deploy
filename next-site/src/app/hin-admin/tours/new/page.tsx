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
  enTitle: string;
  description: string;
  enDescription: string;
  overnight: string;
  enOvernight: string;
  meals: string;
  enMeals: string;
}

interface FAQ {
  question: string;
  enQuestion: string;
  answer: string;
  enAnswer: string;
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
    duration: "10日間",
    enDuration: "10 Days",
    season: "春・秋",
    enSeason: "Spring / Autumn",
    difficulty: "Moderate",
    enDifficulty: "Moderate",
    price: "¥500,000",
    showPrice: true,
    image: "",
    destination: "",
    description: "",
    enDescription: "",
    metaTitle: "",
    enMetaTitle: "",
    metaDescription: "",
    enMetaDescription: "",
    focusKeywords: "",
    enFocusKeywords: "",
  });

  const [highlights, setHighlights] = useState<{ ja: string; en: string }[]>([]);
  const [newHighlight, setNewHighlight] = useState({ ja: "", en: "" });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [newDay, setNewDay] = useState({
    title: "",
    enTitle: "",
    description: "",
    enDescription: "",
    overnight: "",
    enOvernight: "",
    meals: "",
    enMeals: ""
  });

  const [inclusions, setInclusions] = useState<{ ja: string; en: string }[]>([]);
  const [newInclusion, setNewInclusion] = useState({ ja: "", en: "" });

  const [exclusions, setExclusions] = useState<{ ja: string; en: string }[]>([]);
  const [newExclusion, setNewExclusion] = useState({ ja: "", en: "" });

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFAQ, setNewFAQ] = useState({ question: "", enQuestion: "", answer: "", enAnswer: "" });

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
    if (newHighlight.ja.trim() && newHighlight.en.trim()) {
      setHighlights([...highlights, { ja: newHighlight.ja.trim(), en: newHighlight.en.trim() }]);
      setNewHighlight({ ja: "", en: "" });
    }
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const addItineraryDay = () => {
    if (newDay.title.trim() && newDay.enTitle.trim()) {
      const dayNum = itinerary.length + 1;
      setItinerary([...itinerary, { dayNumber: dayNum, ...newDay }]);
      setNewDay({ title: "", enTitle: "", description: "", enDescription: "", overnight: "", enOvernight: "", meals: "", enMeals: "" });
    }
  };

  const removeItineraryDay = (index: number) => {
    const filtered = itinerary.filter((_, i) => i !== index);
    const reindexed = filtered.map((day, idx) => ({ ...day, dayNumber: idx + 1 }));
    setItinerary(reindexed);
  };

  const addInclusion = () => {
    if (newInclusion.ja.trim() && newInclusion.en.trim()) {
      setInclusions([...inclusions, { ja: newInclusion.ja.trim(), en: newInclusion.en.trim() }]);
      setNewInclusion({ ja: "", en: "" });
    }
  };

  const removeInclusion = (index: number) => {
    setInclusions(inclusions.filter((_, i) => i !== index));
  };

  const addExclusion = () => {
    if (newExclusion.ja.trim() && newExclusion.en.trim()) {
      setExclusions([...exclusions, { ja: newExclusion.ja.trim(), en: newExclusion.en.trim() }]);
      setNewExclusion({ ja: "", en: "" });
    }
  };

  const removeExclusion = (index: number) => {
    setExclusions(exclusions.filter((_, i) => i !== index));
  };

  const addFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.enQuestion.trim()) {
      setFaqs([...faqs, { ...newFAQ }]);
      setNewFAQ({ question: "", enQuestion: "", answer: "", enAnswer: "" });
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
      highlights: highlights.map(h => h.ja),
      enHighlights: highlights.map(h => h.en),
      itinerary,
      inclusions: inclusions.map(i => i.ja),
      enInclusions: inclusions.map(i => i.en),
      exclusions: exclusions.map(e => e.ja),
      enExclusions: exclusions.map(e => e.en),
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
          </div>

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
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Duration (Japanese)</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Duration (English)</label>
                      <input
                        type="text"
                        name="enDuration"
                        value={formData.enDuration}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Season (Japanese)</label>
                      <input
                        type="text"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Season (English)</label>
                      <input
                        type="text"
                        name="enSeason"
                        value={formData.enSeason}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Difficulty (Japanese)</label>
                      <input
                        type="text"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Difficulty (English)</label>
                      <input
                        type="text"
                        name="enDifficulty"
                        value={formData.enDifficulty}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
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
                          No destinations yet.
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
                  
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={newHighlight.ja}
                      onChange={(e) => setNewHighlight({ ...newHighlight, ja: e.target.value })}
                      placeholder="Japanese Highlight"
                      className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newHighlight.en}
                        onChange={(e) => setNewHighlight({ ...newHighlight, en: e.target.value })}
                        placeholder="English Highlight"
                        className="flex-1 border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xs tracking-wider uppercase rounded-sm transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>

                  <div className="border border-[#E8E5DF] rounded-sm overflow-hidden mt-4">
                    <ul className="divide-y divide-[#E8E5DF]">
                      {highlights.map((item, index) => (
                        <li key={index} className="flex justify-between items-center py-3 px-4 bg-[#FAF9F6] text-sm text-[#5A5A5A]">
                          <div>
                            <span className="font-medium block">{item.ja}</span>
                            <span className="font-light text-xs">{item.en}</span>
                          </div>
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
                </div>
              )}

              {/* 3. ITINERARY TAB */}
              {activeSubTab === "itinerary" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">Day-by-Day Itinerary ({itinerary.length} Days)</h3>
                  
                  <div className="bg-[#FAF9F6] p-6 rounded-sm border border-[#E8E5DF] space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-[#2C2C2C] font-semibold">Add Itinerary Day</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Day Title (Japanese)</label>
                        <input
                          type="text"
                          value={newDay.title}
                          onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Day Title (English)</label>
                        <input
                          type="text"
                          value={newDay.enTitle}
                          onChange={(e) => setNewDay({ ...newDay, enTitle: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Details (Japanese)</label>
                        <textarea
                          rows={3}
                          value={newDay.description}
                          onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Details (English)</label>
                        <textarea
                          rows={3}
                          value={newDay.enDescription}
                          onChange={(e) => setNewDay({ ...newDay, enDescription: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Lodging (JA)</label>
                        <input
                          type="text"
                          value={newDay.overnight}
                          onChange={(e) => setNewDay({ ...newDay, overnight: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Lodging (EN)</label>
                        <input
                          type="text"
                          value={newDay.enOvernight}
                          onChange={(e) => setNewDay({ ...newDay, enOvernight: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Meals (JA)</label>
                        <input
                          type="text"
                          value={newDay.meals}
                          onChange={(e) => setNewDay({ ...newDay, meals: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Meals (EN)</label>
                        <input
                          type="text"
                          value={newDay.enMeals}
                          onChange={(e) => setNewDay({ ...newDay, enMeals: e.target.value })}
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

                  <div className="space-y-4 mt-4">
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
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-[#2C2C2C] mb-2">{day.title}</h4>
                            <p className="text-xs text-[#5A5A5A] font-light leading-relaxed mb-3">{day.description}</p>
                            <div className="flex gap-4 text-xxs text-[#A39E99] uppercase tracking-wider">
                              <span>🏨 {day.overnight || "N/A"}</span>
                              <span>🍽️ {day.meals || "N/A"}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-[#2C2C2C] mb-2">{day.enTitle}</h4>
                            <p className="text-xs text-[#5A5A5A] font-light leading-relaxed mb-3">{day.enDescription}</p>
                            <div className="flex gap-4 text-xxs text-[#A39E99] uppercase tracking-wider">
                              <span>🏨 {day.enOvernight || "N/A"}</span>
                              <span>🍽️ {day.enMeals || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                      <input
                        type="text"
                        value={newInclusion.ja}
                        onChange={(e) => setNewInclusion({ ...newInclusion, ja: e.target.value })}
                        placeholder="Japanese Inclusion"
                        className="w-full border border-[#D1CCC5] rounded-sm px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-xs"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newInclusion.en}
                          onChange={(e) => setNewInclusion({ ...newInclusion, en: e.target.value })}
                          placeholder="English Inclusion"
                          className="flex-1 border border-[#D1CCC5] rounded-sm px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-xs"
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
                            <div>
                              <span className="block font-medium">{item.ja}</span>
                              <span className="block text-xxs">{item.en}</span>
                            </div>
                            <button type="button" onClick={() => removeInclusion(i)} className="text-[#A39E99] hover:text-red-600">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-widest text-[#5A5A5A] font-semibold">Excluded / Extras</h4>
                      <input
                        type="text"
                        value={newExclusion.ja}
                        onChange={(e) => setNewExclusion({ ...newExclusion, ja: e.target.value })}
                        placeholder="Japanese Exclusion"
                        className="w-full border border-[#D1CCC5] rounded-sm px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-xs"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newExclusion.en}
                          onChange={(e) => setNewExclusion({ ...newExclusion, en: e.target.value })}
                          placeholder="English Exclusion"
                          className="flex-1 border border-[#D1CCC5] rounded-sm px-3 py-1.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-xs"
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
                            <div>
                              <span className="block font-medium">{item.ja}</span>
                              <span className="block text-xxs">{item.en}</span>
                            </div>
                            <button type="button" onClick={() => removeExclusion(i)} className="text-[#A39E99] hover:text-red-600">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Question (JA)</label>
                        <input
                          type="text"
                          value={newFAQ.question}
                          onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Question (EN)</label>
                        <input
                          type="text"
                          value={newFAQ.enQuestion}
                          onChange={(e) => setNewFAQ({ ...newFAQ, enQuestion: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Answer (JA)</label>
                        <textarea
                          rows={3}
                          value={newFAQ.answer}
                          onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xxs uppercase tracking-wider text-[#5A5A5A]">Answer (EN)</label>
                        <textarea
                          rows={3}
                          value={newFAQ.enAnswer}
                          onChange={(e) => setNewFAQ({ ...newFAQ, enAnswer: e.target.value })}
                          className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addFAQ}
                      className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xs tracking-wider uppercase rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add FAQ
                    </button>
                  </div>

                  <div className="space-y-4 mt-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-[#E8E5DF] rounded-sm p-5 bg-white relative hover:border-[#8B2C24] transition-colors">
                        <button
                          type="button"
                          onClick={() => removeFAQ(i)}
                          className="absolute top-4 right-4 p-1 text-[#A39E99] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-4 pr-8">
                          <div>
                            <h4 className="text-sm font-medium text-[#2C2C2C] mb-2">Q: {faq.question}</h4>
                            <p className="text-xs text-[#5A5A5A] font-light leading-relaxed">A: {faq.answer}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-[#2C2C2C] mb-2">Q: {faq.enQuestion}</h4>
                            <p className="text-xs text-[#5A5A5A] font-light leading-relaxed">A: {faq.enAnswer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. SEO TAB */}
              {activeSubTab === "seo" && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">SEO Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Title (Japanese)</label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Title (English)</label>
                      <input
                        type="text"
                        name="enMetaTitle"
                        value={formData.enMetaTitle}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Focus Keywords (JA)</label>
                      <input
                        type="text"
                        name="focusKeywords"
                        value={formData.focusKeywords}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Focus Keywords (EN)</label>
                      <input
                        type="text"
                        name="enFocusKeywords"
                        value={formData.enFocusKeywords}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Meta Description (JA)</label>
                      <textarea
                        name="metaDescription"
                        rows={3}
                        value={formData.metaDescription}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">Meta Description (EN)</label>
                      <textarea
                        name="enMetaDescription"
                        rows={3}
                        value={formData.enMetaDescription}
                        onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                      />
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
