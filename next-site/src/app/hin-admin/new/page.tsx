"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import CoverImageUpload from "@/components/admin/CoverImageUpload";

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    enTitle: "",
    category: "Travel Tips",
    enCategory: "Travel Tips",
    image: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    content: "",
    enContent: "",
    author: "ヒノデネパール専門家",
    enAuthor: "Hinode Nepal Experts",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.enTitle || !formData.content || !formData.enContent || !formData.image || !formData.author || !formData.enAuthor) {
      setError("Please fill in all required fields including image URL and authors.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/hin-admin");
      } else {
        setError(data.error || "Failed to create post.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-6 px-6 md:px-12">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/hin-admin" className="text-[#A39E99] hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <p className="text-[#A39E99] text-xs tracking-[0.3em] uppercase mb-1">CMS</p>
              <h1 className="text-2xl font-light tracking-widest text-white">New Blog Post</h1>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Japanese Title */}
            <div className="bg-white rounded-sm border border-[#E8E5DF] p-8">
              <h3 className="text-sm tracking-widest uppercase text-[#5A5A5A] mb-6 border-b border-[#E8E5DF] pb-3">Post Content</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A] font-medium">
                    Japanese Title <span className="text-[#8B2C24]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C] text-lg"
                    placeholder="ネパールの絶景スポット"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A] font-medium">
                    English Title <span className="text-[#8B2C24]">*</span>
                  </label>
                  <input
                    type="text"
                    name="enTitle"
                    required
                    value={formData.enTitle}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-4 py-3 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]"
                    placeholder="Nepal's Most Stunning Viewpoints"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A] font-medium">
                    Japanese Content <span className="text-[#8B2C24]">*</span>
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                    placeholder="Your article introduction goes here..."
                    height={500}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A] font-medium">
                    English Content <span className="text-[#8B2C24]">*</span>
                  </label>
                  <RichTextEditor
                    value={formData.enContent}
                    onChange={(content) => setFormData((prev) => ({ ...prev, enContent: content }))}
                    placeholder="Your article introduction in English goes here..."
                    height={500}
                  />
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div className="bg-white rounded-sm border border-[#E8E5DF] p-6">
                <h3 className="text-sm tracking-widest uppercase text-[#5A5A5A] mb-4">Image Preview</h3>
                <div className="aspect-[16/7] rounded-sm overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x400?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meta */}
            <div className="bg-white rounded-sm border border-[#E8E5DF] p-6">
              <h3 className="text-sm tracking-widest uppercase text-[#5A5A5A] mb-6 border-b border-[#E8E5DF] pb-3">Post Meta</h3>
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Category (Japanese)</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C] text-sm"
                  >
                    <option>Travel Tips</option>
                    <option>Accommodation</option>
                    <option>Culture</option>
                    <option>Trekking</option>
                    <option>Food & Dining</option>
                    <option>Adventure</option>
                    <option>Wildlife</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Category (English)</label>
                  <select
                    name="enCategory"
                    value={formData.enCategory}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C] text-sm"
                  >
                    <option>Travel Tips</option>
                    <option>Accommodation</option>
                    <option>Culture</option>
                    <option>Trekking</option>
                    <option>Food & Dining</option>
                    <option>Adventure</option>
                    <option>Wildlife</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Publish Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C] text-sm"
                    placeholder="June 1, 2026"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Author (Japanese)</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C] text-sm"
                    placeholder="ヒノデネパール専門家"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">Author (English)</label>
                  <input
                    type="text"
                    name="enAuthor"
                    value={formData.enAuthor}
                    onChange={handleChange}
                    className="border border-[#D1CCC5] rounded-sm px-3 py-2.5 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C] text-sm"
                    placeholder="Hinode Nepal Experts"
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white rounded-sm border border-[#E8E5DF] p-6">
              <h3 className="text-sm tracking-widest uppercase text-[#5A5A5A] mb-4 border-b border-[#E8E5DF] pb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Featured Image
              </h3>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">
                  Cover Image <span className="text-[#8B2C24]">*</span>
                </label>
                <CoverImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                />
              </div>
            </div>

            {/* Quick tips */}
            <div className="bg-[#2C2C2C] rounded-sm p-6 text-white">
              <h3 className="text-xs tracking-widest uppercase text-[#D1CCC5] mb-4">Writing Tips</h3>
              <ul className="space-y-2 text-[#A39E99] text-xs leading-relaxed">
                <li>• Write the Japanese title first for SEO</li>
                <li>• Use Unsplash for high-quality free images</li>
                <li>• Add internal links to tour pages</li>
                <li>• Keep paragraphs short and readable</li>
                <li>• Use H2 headings to structure content</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Link
                href="/hin-admin"
                className="flex-1 py-3 border border-[#D1CCC5] text-[#5A5A5A] text-xs tracking-widest uppercase text-center rounded-sm hover:border-[#2C2C2C] hover:text-[#2C2C2C] transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
