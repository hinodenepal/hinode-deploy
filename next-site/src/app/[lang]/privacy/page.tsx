"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function PrivacyPolicyPage({ params }: PageProps) {
  const { lang } = use(params);
  const locale = lang as Locale;
  const isJa = locale === "ja";

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-himalaya.jpg"
            alt="Himalayan landscape for privacy policy page"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center text-white mt-20">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-white tracking-wider">
            {isJa ? "プライバシーポリシー" : "Privacy Policy"}
          </h1>
          <p className="text-sm md:text-base text-white/80 tracking-widest font-light uppercase">
            {isJa ? "個人情報の取り扱いについて" : "How we handle your data"}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <div className="bg-white p-8 md:p-12 border border-[#E8E5DF] rounded-sm shadow-sm">
          {isJa ? (
            <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]">
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                Hinode Nepal（以下「当社」といいます）は、お客様のプライバシーを尊重し、お客様の個人情報の保護に努めております。本プライバシーポリシーでは、当社がお客様の情報をどのように収集、利用、保護するかについて説明します。
              </p>
              
              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                1. 収集する情報
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                当社は、お客様が当ウェブサイトを利用する際、以下の情報を収集する場合があります。
              </p>
              <ul className="list-disc pl-5 mb-6 text-[#5A5A5A] space-y-2 marker:text-[#D1CCC5]">
                <li>氏名、メールアドレス、電話番号などの個人情報（お問い合わせやご予約の際）</li>
                <li>IPアドレス、ブラウザの種類、アクセス日時などの利用データ</li>
                <li>クッキー（Cookie）および類似のトラッキング技術によって収集される情報</li>
              </ul>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                2. 情報の利用目的
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                収集した情報は、以下の目的で利用されます。
              </p>
              <ul className="list-disc pl-5 mb-6 text-[#5A5A5A] space-y-2 marker:text-[#D1CCC5]">
                <li>お問い合わせへの対応およびサービスの提供</li>
                <li>ウェブサイトの改善および利用状況の分析</li>
                <li>新しいサービスや特別オファーなどの情報提供（同意いただいた場合）</li>
              </ul>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                3. 情報の第三者提供
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                当社は、法令に基づく場合や、お客様の同意がある場合を除き、個人情報を第三者に提供することはありません。ただし、サービスの提供に必要な範囲で、信頼できる提携業者に情報を共有する場合があります。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                4. 情報の保護
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                当社は、お客様の個人情報を適切に保護するための安全対策を実施しております。データの紛失、改ざん、漏洩などを防ぐため、厳重な管理を行っています。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                5. お問い合わせ窓口
              </h2>
              <p className="text-[#5A5A5A] leading-relaxed">
                本ポリシーに関するご質問や、個人情報に関するお問い合わせは、<Link href={`/${lang}/contact`} className="text-[#8B2C24] hover:underline transition-colors">お問い合わせページ</Link>よりご連絡ください。
              </p>
              
              <div className="mt-12 pt-6 border-t border-[#E8E5DF] text-xs text-[#A39E99]">
                最終更新日: {new Date().getFullYear()}年{new Date().getMonth() + 1}月
              </div>
            </div>
          ) : (
            <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]">
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                Hinode Nepal ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>
              
              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                1. Information We Collect
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which includes:
              </p>
              <ul className="list-disc pl-5 mb-6 text-[#5A5A5A] space-y-2 marker:text-[#D1CCC5]">
                <li>Identity and Contact Data (such as name, email address, phone numbers) when you make an inquiry or booking.</li>
                <li>Technical Data (such as IP address, browser type and version, time zone setting).</li>
                <li>Usage Data (information about how you use our website, products and services).</li>
              </ul>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                2. How We Use Your Data
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                We will only use your personal data for the following purposes:
              </p>
              <ul className="list-disc pl-5 mb-6 text-[#5A5A5A] space-y-2 marker:text-[#D1CCC5]">
                <li>To process and deliver your requests and services.</li>
                <li>To manage our relationship with you.</li>
                <li>To improve our website, products/services, marketing, and customer experiences.</li>
              </ul>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                3. Disclosure of Your Data
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                4. Data Security
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                5. Contact Us
              </h2>
              <p className="text-[#5A5A5A] leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us via our <Link href={`/${lang}/contact`} className="text-[#8B2C24] hover:underline transition-colors">Contact page</Link>.
              </p>
              
              <div className="mt-12 pt-6 border-t border-[#E8E5DF] text-xs text-[#A39E99]">
                Last Updated: {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
