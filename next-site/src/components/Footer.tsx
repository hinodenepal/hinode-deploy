import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const p = (path: string) => locale === "ja" ? (path === "/" ? "/" : path) : `/en${path === "/" ? "" : path}`;
  const isJa = locale === "ja";

  return (
    <footer className="bg-[#2C2C2C] text-[#FAF9F6] pt-24 pb-12 mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href={p("/")} className="flex items-center gap-2 mb-6 group">
              <img
                src="/hinode-logo.svg"
                alt="Hinode Logo"
                className="w-8 h-8 text-[#FAF9F6] transition-transform duration-500 group-hover:rotate-45"
              />
              <span className="text-xl font-medium tracking-widest text-[#FAF9F6]">
                HINODE NEPAL
              </span>
            </Link>
            <p className="text-[#A39E99] text-sm leading-relaxed mb-6">
              {isJa
                ? "日本人旅行者のためのネパール高級旅行を厳選。ヒマラヤの深い美しさをご体験ください。"
                : "Curating premium luxury travel experiences in Nepal for the discerning Japanese traveler. Discover the profound beauty of the Himalayas."}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#D1CCC5]">
              {isJa ? "旅のプラン" : "Journeys"}
            </h4>
            <ul className="flex flex-col gap-3">
              <li><Link href={p("/tours")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "全ツアー" : "All Tours"}</Link></li>
              <li><Link href={p("/tours/everest-base-camp-luxury")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "エベレスト・ラグジュアリー" : "Everest Luxury Trek"}</Link></li>
              <li><Link href={p("/tours/annapurna-sanctuary")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "アンナプルナ" : "Annapurna Sanctuary"}</Link></li>
              <li><Link href={p("/destinations")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "目的地" : "Destinations"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#D1CCC5]">
              {isJa ? "会社情報" : "Company"}
            </h4>
            <ul className="flex flex-col gap-3">
              <li><Link href={p("/about")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "会社概要" : "About Us"}</Link></li>
              <li><Link href={p("/testimonials")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "お客様の声" : "Testimonials"}</Link></li>
              <li><Link href={p("/blog")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "ブログ" : "Blogs"}</Link></li>
              <li><Link href={p("/contact")} className="text-[#A39E99] hover:text-[#FAF9F6] transition-colors text-sm">{isJa ? "お問い合わせ" : "Contact"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-[#D1CCC5]">
              {isJa ? "連絡先" : "Contact"}
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-[#A39E99] text-sm">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>Kathmandu<br />Bagmati Province, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-[#A39E99] text-sm">
                <Phone className="w-5 h-5 shrink-0" />
                <span>Nepal: +977 985-1146179<br />Japan: +81-7036177182</span>
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
            © {new Date().getFullYear()} Hinode Nepal. {isJa ? "無断転載禁止。" : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-xs text-[#A39E99]">
            <Link href={p("/privacy")} className="hover:text-[#FAF9F6] transition-colors">{isJa ? "プライバシーポリシー" : "Privacy Policy"}</Link>
            <Link href={p("/terms")} className="hover:text-[#FAF9F6] transition-colors">{isJa ? "利用規約" : "Terms of Service"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
