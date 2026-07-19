"use client";

import { useState, use } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function InquiryPage({ params }: PageProps) {
  const { lang } = use(params);
  const locale = lang as Locale;
  const isJa = locale === "ja";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    duration: "6-10 Days",
    groupSize: "2 People",
    interests: "Luxury Trekking",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError(isJa ? "必須項目をすべて入力してください。" : "Please fill out all required fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || (isJa ? "エラーが発生しました。" : "Something went wrong."));
      }
    } catch (err: any) {
      setError(isJa ? "ネットワークエラーが発生しました。" : "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6]">
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block font-semibold">{isJa ? "旅を計画する" : "Plan Your Journey"}</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6">{isJa ? "お問い合わせ・ご相談" : "Inquire Now"}</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            {isJa 
              ? "以下のフォームにご記入ください。日本人対応のコンシェルジュが24時間以内にご連絡いたします。"
              : "Please fill out the form below. Our concierge will contact you within 24 hours."}
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-12 rounded-sm border border-[#E8E5DF] text-center shadow-lg animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-[#8B2C24] mx-auto mb-6" />
            <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">{isJa ? "送信が完了しました" : "Submission Complete"}</h2>
            <p className="text-[#5A5A5A] font-light mb-8 max-w-md mx-auto">
              {isJa 
                ? `${formData.email} に確認メールを送信しました。担当者が内容を確認し、折り返しご連絡いたします。`
                : `Thank you for your inquiry. A confirmation email has been sent to ${formData.email}.`}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", phone: "", travelDate: "", duration: "6-10 Days", groupSize: "2 People", interests: "Luxury Trekking", message: "" });
              }}
              className="px-8 py-3 bg-[#2C2C2C] text-white text-xs tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm"
            >
              {isJa ? "別のお問い合わせをする" : "Submit Another Inquiry"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-sm border border-[#E8E5DF] shadow-sm">
            {error && <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">{error}</div>}
            <div className="space-y-12">
              <section>
                <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-6 border-b border-[#D1CCC5] pb-2 font-medium">{isJa ? "1. お客様情報" : "1. Personal Information"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "お名前 *" : "Full Name *"}</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" placeholder={isJa ? "山田 太郎" : "Taro Yamada"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "メールアドレス *" : "Email Address *"}</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" placeholder="taro@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "電話番号 *" : "Phone Number *"}</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" placeholder="+81 90 0000 0000" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-6 border-b border-[#D1CCC5] pb-2 font-medium">{isJa ? "2. 旅行のご希望" : "2. Travel Preferences"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "出発予定月" : "Estimated Travel Date"}</label>
                    <input type="month" name="travelDate" value={formData.travelDate} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#5A5A5A]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "日数" : "Duration (Days)"}</label>
                    <select name="duration" value={formData.duration} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#5A5A5A]">
                      <option>1-5 Days</option><option>6-10 Days</option><option>11-15 Days</option><option>15+ Days</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "人数" : "Group Size"}</label>
                    <select name="groupSize" value={formData.groupSize} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#5A5A5A]">
                      <option>1 Person</option><option>2 People</option><option>3-4 People</option><option>5+ People</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "興味のあること" : "Interests"}</label>
                    <select name="interests" value={formData.interests} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#5A5A5A]">
                      <option>Luxury Trekking</option><option>Cultural Tour</option><option>Wildlife Safari</option><option>Wellness & Yoga</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-6 border-b border-[#D1CCC5] pb-2 font-medium">{isJa ? "3. その他の情報" : "3. Additional Information"}</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "メッセージ / 特別なご要望" : "Message / Special Requests"}</label>
                  <textarea name="message" rows={5} value={formData.message} onChange={handleChange} className="border border-[#D1CCC5] p-4 rounded-sm bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" placeholder={isJa ? "食事の制限やご希望のホテルなど、特別なご要望があればご記入ください。" : "Please let us know if you have any dietary requirements, specific hotels you wish to stay in, or any other special requests."}></textarea>
                </div>
              </section>

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#2C2C2C] text-[#FAF9F6] text-sm tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm disabled:bg-gray-400">
                {loading ? (isJa ? "送信中..." : "Submitting...") : (isJa ? "送信する" : "Submit Inquiry")} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
