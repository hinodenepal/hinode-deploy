"use client";

import { useState, use } from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ContactPage({ params }: PageProps) {
  const { lang } = use(params);
  const locale = lang as Locale;
  const isJa = locale === "ja";

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError(isJa ? "すべての項目を入力してください。" : "Please fill out all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/messages", {
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
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <div className="text-center mb-16">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block font-semibold">{isJa ? "連絡を取る" : "Get in Touch"}</span>
          <h1 className="text-4xl md:text-5xl font-light text-[#2C2C2C] mb-6 font-light">{isJa ? "コンタクト" : "Contact Us"}</h1>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            {isJa ? "簡単な質問でも、旅の計画の始まりでも、私たちがお手伝いいたします。" : "Whether you have a quick question or are ready to start planning your journey, we are here to assist you."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-light text-[#2C2C2C] mb-8 font-light">{isJa ? "連絡先情報" : "Contact Information"}</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#8B2C24] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-2 font-medium">{isJa ? "オフィス住所" : "Office Address"}</h3>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">Hinode Nepal Pvt. Ltd.<br/>Kathmandu 44600, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#8B2C24] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-2 font-medium">{isJa ? "電話サポート" : "Phone Support"}</h3>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">Nepal: +977 985-1146179<br/>Japan: +81-7036177182<br/><span className="text-xs text-[#8B2C24] font-semibold">{isJa ? "(日本語対応 9:00 - 18:00 ネパール時間)" : "(Japanese support available 9:00 - 18:00 NPT)"}</span></p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#8B2C24] mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-2 font-medium">{isJa ? "メール" : "Email"}</h3>
                  <p className="text-[#5A5A5A] font-light leading-relaxed">info@hinodenepal.jp</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F1EC] p-8 rounded-sm">
               <h3 className="text-sm tracking-widest uppercase text-[#2C2C2C] mb-4 font-medium">{isJa ? "クイックコンタクト" : "Quick Connect"}</h3>
               <p className="text-[#5A5A5A] font-light text-sm mb-6">{isJa ? "即時のサポートが必要な場合は、LINEまたはWhatsApp経由でお問い合わせください。" : "Reach out to us instantly via LINE or WhatsApp for immediate assistance."}</p>
               <div className="flex gap-4 flex-col sm:flex-row">
                 <a href="https://line.me/ti/p/~+9779851146179" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#00B900] text-white text-xs tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                   LINE: +977 985-1146179
                 </a>
                 <a href="https://wa.me/9779851146179" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white text-xs tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                   WhatsApp: +977 985-1146179
                 </a>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-sm border border-[#E8E5DF]">
            <h2 className="text-2xl font-light text-[#2C2C2C] mb-8 font-light">{isJa ? "メッセージを送る" : "Send a Message"}</h2>
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#8B2C24] mx-auto mb-4" />
                <h3 className="text-xl font-light text-[#2C2C2C] mb-2">{isJa ? "メッセージを送信しました" : "Message Sent"}</h3>
                <p className="text-sm text-[#5A5A5A] font-light mb-6">{isJa ? "お問い合わせありがとうございます。できるだけ早くご連絡いたします。" : "Thank you for your message. We will get back to you as soon as possible."}</p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }} className="px-6 py-2.5 bg-[#2C2C2C] text-white text-xs tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm">{isJa ? "新しいメッセージを送る" : "Send New Message"}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs">{error}</div>}
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "お名前" : "Name"}</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "メールアドレス" : "Email"}</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "件名" : "Subject"}</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#5A5A5A]">{isJa ? "メッセージ" : "Message"}</label>
                  <textarea name="message" rows={4} required value={formData.message} onChange={handleChange} className="border-b border-[#D1CCC5] py-2 bg-transparent focus:outline-none focus:border-[#8B2C24] transition-colors text-[#2C2C2C]"></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-[#2C2C2C] text-[#FAF9F6] text-sm tracking-widest uppercase hover:bg-[#8B2C24] transition-colors rounded-sm mt-4 disabled:bg-gray-400">
                  {loading ? (isJa ? "送信中..." : "Sending...") : (isJa ? "送信する" : "Send Message")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
