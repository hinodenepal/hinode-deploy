"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function TermsOfServicePage({ params }: PageProps) {
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
            alt="Himalayan landscape for terms of service page"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center text-white mt-20">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-white tracking-wider">
            {isJa ? "利用規約" : "Terms of Service"}
          </h1>
          <p className="text-sm md:text-base text-white/80 tracking-widest font-light uppercase">
            {isJa ? "当サイトの利用条件" : "Rules & Guidelines"}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-4xl">
        <div className="bg-white p-8 md:p-12 border border-[#E8E5DF] rounded-sm shadow-sm">
          {isJa ? (
            <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]">
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                本利用規約（以下「本規約」といいます）は、Hinode Nepal（以下「当社」といいます）が提供するウェブサイトおよびサービスの利用条件を定めるものです。当サイトを利用されることにより、お客様は本規約に同意したものとみなされます。
              </p>
              
              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                1. サービスの利用
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                お客様は、本規約および関連する法令に従って、当サイトを個人的かつ非営利の目的で利用することができます。当サイトのコンテンツを無断で複製、転載、配布することは禁止されています。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                2. 予約と支払い
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                ツアーやサービスの予約は、当社の定める手順に従って行われます。予約の確定には、規定の支払いが必要となる場合があります。キャンセルポリシーや返金に関する詳細は、各ツアーの予約時に明示される条件が適用されます。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                3. 免責事項
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                当社は、当サイトに掲載される情報の正確性や完全性について、細心の注意を払っておりますが、その内容を保証するものではありません。当サイトの利用により生じたいかなる損害についても、当社は一切の責任を負いません。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                4. 知的財産権
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                当サイト上のすべてのコンテンツ（テキスト、画像、ロゴなど）の著作権その他の知的財産権は、当社または正当な権利者に帰属します。事前の書面による許可なく、これらを使用することはできません。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                5. 規約の変更
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                当社は、必要に応じて本規約を予告なく変更することがあります。変更後の規約は、当サイトに掲載された時点で効力を生じるものとします。
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                6. 準拠法および管轄裁判所
              </h2>
              <p className="text-[#5A5A5A] leading-relaxed">
                本規約の解釈および適用は、ネパール国の法律に準拠するものとします。また、本規約に関するすべての紛争については、ネパールの裁判所を専属的合意管轄裁判所とします。
              </p>
              
              <div className="mt-12 pt-6 border-t border-[#E8E5DF] text-xs text-[#A39E99]">
                最終更新日: {new Date().getFullYear()}年{new Date().getMonth() + 1}月
              </div>
            </div>
          ) : (
            <div className="prose prose-sm md:prose-base max-w-none text-[#2C2C2C]">
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of the Hinode Nepal website and services. By accessing or using our website, you agree to be bound by these Terms.
              </p>
              
              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                1. Use of Services
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                You may use our website for your personal, non-commercial use only. You may not use our website for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the website.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                2. Bookings and Payments
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                All tour bookings are subject to availability and our booking conditions. Payment requirements, cancellation policies, and refund eligibility will be detailed at the time of booking.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                3. Disclaimer of Warranties
              </h2>
              <p className="mb-4 text-[#5A5A5A] leading-relaxed">
                While we strive to provide accurate information, our website and services are provided on an "as is" and "as available" basis without any warranties of any kind. We do not warrant that the content is accurate, reliable, or correct.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                4. Intellectual Property
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of Hinode Nepal or its content suppliers and is protected by international copyright laws. Unauthorized use of this content is strictly prohibited.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                5. Changes to Terms
              </h2>
              <p className="mb-6 text-[#5A5A5A] leading-relaxed">
                We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the website after any changes indicates your acceptance of the new Terms.
              </p>

              <h2 className="text-xl font-medium text-[#8B2C24] mt-10 mb-4 border-b border-[#E8E5DF] pb-2">
                6. Governing Law
              </h2>
              <p className="text-[#5A5A5A] leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Nepal.
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
