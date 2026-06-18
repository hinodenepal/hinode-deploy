"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import CoverImageUpload from "@/components/admin/CoverImageUpload";
import { ArrowLeft, Save, MapPin, Star, Search, Plus, Trash2, Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EditDestinationPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"general" | "highlights" | "seo">("general");
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    enTitle: "",
    slug: "",
    image: "",
    description: "",
    enDescription: "",
    metaTitle: "",
    enMetaTitle: "",
    metaDescription: "",
    enMetaDescription: "",
  });

  const [highlights, setHighlights] = useState<{ ja: string; en: string }[]>([]);
  const [newHighlight, setNewHighlight] = useState({ ja: "", en: "" });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/destinations/${slug}`);
        const data = await res.json();
        if (data.success) {
          const d = data.data;
          setFormData({
            title: d.title || "",
            enTitle: d.enTitle || "",
            slug: d.slug || "",
            image: d.image || "",
            description: d.description || "",
            enDescription: d.enDescription || "",
            metaTitle: d.metaTitle || "",
            enMetaTitle: d.enMetaTitle || "",
            metaDescription: d.metaDescription || "",
            enMetaDescription: d.enMetaDescription || "",
          });
          
          const hlJa = d.highlights || [];
          const hlEn = d.enHighlights || [];
          setHighlights(hlJa.map((h: string, i: number) => ({ ja: h, en: hlEn[i] || "" })));
        } else {
          setError("Destination not found.");
        }
      } catch {
        setError("Failed to load destination.");
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addHighlight = () => {
    if (newHighlight.ja.trim() || newHighlight.en.trim()) {
      setHighlights([...highlights, { ja: newHighlight.ja.trim(), en: newHighlight.en.trim() }]);
      setNewHighlight({ ja: "", en: "" });
    }
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formData.title || !formData.enTitle || !formData.image || !formData.description) {
      setError("Please fill out all required fields.");
      setActiveTab("general");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/destinations/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          highlights: highlights.map(h => h.ja),
          enHighlights: highlights.map(h => h.en) 
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/hin-admin");
      } else {
        setError(data.error || "Failed to update destination.");
      }
    } catch {
      setError("A server connection issue occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "general", label: "General Info", icon: <MapPin className="w-4 h-4" /> },
    { id: "highlights", label: "Highlights", icon: <Star className="w-4 h-4" /> },
    { id: "seo", label: "SEO Config", icon: <Search className="w-4 h-4" /> },
  ];

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B2C24]" />
      </div>
    );
  }

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
              <h1 className="text-2xl font-light tracking-widest text-white">Edit Destination</h1>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-2 lg:col-span-1">
            <div className="bg-white rounded-sm border border-[#E8E5DF] p-4 space-y-1">
              <p className="text-xs tracking-wider uppercase text-[#A39E99] px-3 mb-3">Editor Tabs</p>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-wider uppercase rounded-sm transition-all ${
                    activeTab === tab.id
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

              {/* GENERAL TAB */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">General Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Japanese Title *</label>
                      <input
                        type="text" name="title" required value={formData.title} onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">English Title *</label>
                      <input
                        type="text" name="enTitle" required value={formData.enTitle} onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">URL Slug</label>
                    <input
                      type="text" name="slug" value={formData.slug} disabled
                      className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-gray-100 text-[#5A5A5A] text-sm cursor-not-allowed opacity-70"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Cover Image *</label>
                    <CoverImageUpload value={formData.image} onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Description (Japanese) *</label>
                    <RichTextEditor
                      value={formData.description}
                      onChange={(c) => setFormData((prev) => ({ ...prev, description: c }))}
                      placeholder="世界最高峰の麓に広がる神秘的な地域について説明してください..."
                      height={280}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#5A5A5A] font-medium">Description (English)</label>
                    <RichTextEditor
                      value={formData.enDescription}
                      onChange={(c) => setFormData((prev) => ({ ...prev, enDescription: c }))}
                      placeholder="Write a compelling description of this destination in English..."
                      height={280}
                    />
                  </div>
                </div>
              )}

              {/* HIGHLIGHTS TAB */}
              {activeTab === "highlights" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">Destination Highlights</h3>
                  
                  <div className="flex flex-col gap-4">
                    <input
                      type="text" value={newHighlight.ja} onChange={(e) => setNewHighlight({ ...newHighlight, ja: e.target.value })}
                      placeholder="Japanese Highlight"
                      className="border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text" value={newHighlight.en} onChange={(e) => setNewHighlight({ ...newHighlight, en: e.target.value })}
                        placeholder="English Highlight"
                        className="flex-1 border border-[#D1CCC5] rounded-sm px-4 py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                      />
                      <button type="button" onClick={addHighlight}
                        className="px-4 py-2 bg-[#2C2C2C] hover:bg-[#8B2C24] text-white text-xs tracking-wider uppercase rounded-sm transition-colors flex items-center gap-1.5">
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>

                  <div className="border border-[#E8E5DF] rounded-sm overflow-hidden mt-4">
                    <ul className="divide-y divide-[#E8E5DF]">
                      {highlights.map((item, i) => (
                        <li key={i} className="flex justify-between items-center py-3 px-4 bg-[#FAF9F6] text-sm text-[#5A5A5A]">
                          <div>
                            <span className="font-medium block">{item.ja}</span>
                            <span className="font-light text-xs">{item.en}</span>
                          </div>
                          <button type="button" onClick={() => removeHighlight(i)}
                            className="p-1 text-[#A39E99] hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* SEO TAB */}
              {activeTab === "seo" && (
                <div className="space-y-6">
                  <h3 className="text-base font-light text-[#2C2C2C] border-b border-[#E8E5DF] pb-3 mb-6">SEO Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Title (JA)</label>
                      <input
                        type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Title (EN)</label>
                      <input
                        type="text" name="enMetaTitle" value={formData.enMetaTitle} onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Description (JA)</label>
                      <textarea
                        name="metaDescription" rows={3} value={formData.metaDescription} onChange={handleChange}
                        className="border border-[#D1CCC5] rounded-sm px-4 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] text-[#2C2C2C] text-sm leading-relaxed"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest text-[#5A5A5A]">SEO Meta Description (EN)</label>
                      <textarea
                        name="enMetaDescription" rows={3} value={formData.enMetaDescription} onChange={handleChange}
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
