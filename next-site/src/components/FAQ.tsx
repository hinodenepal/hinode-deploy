"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  jaQ: string;
  jaA: string;
  enQ: string;
  enA: string;
}

const faqs: FAQItem[] = [
  {
    jaQ: "日の出ネパールホリデーズではどのようなサービスを提供していますか？",
    jaA: "日の出ネパールホリデーズは、ネパールでのトレッキング、文化ツアー、冒険アクティビティ、そしてホリデーパッケージを専門にしています。グループツアーやプライベートツアーの両方に対応しており、安全と楽しさを確保しています。",
    enQ: "What services does Hinode Nepal Holidays offer?",
    enA: "Hinode Nepal Holidays specializes in trekking, cultural tours, adventure activities, and holiday packages in Nepal. We cater to both group and private tours, ensuring safety and enjoyment.",
  },
  {
    jaQ: "ネパールで人気のトレッキングルートは何ですか？",
    jaA: "エベレストベースキャンプトレック、アンナプルナ回廊トレック、ラングタンバレートレックが特に人気です。その他にも、マナスルトレックや上ムスタントレックなど、未踏のルートも提供しています。",
    enQ: "What are the popular trekking routes in Nepal?",
    enA: "Everest Base Camp Trek, Annapurna Circuit Trek, and Langtang Valley Trek are particularly popular. We also offer less-traveled routes like the Manaslu Trek and Upper Mustang Trek.",
  },
  {
    jaQ: "日の出ネパールホリデーズのガイドの経験はどのくらいですか？",
    jaA: "当社のガイドは非常に経験豊富で、資格を持ち、多言語（日本語、英語など）に堪能です。地形、文化、そして安全プロトコルに関する豊富な知識を持っており、充実した旅をサポートします。",
    enQ: "How experienced are the guides at Hinode Nepal Holidays?",
    enA: "Our guides are highly experienced, certified, and fluent in multiple languages (including Japanese and English). They possess extensive knowledge of the terrain, culture, and safety protocols to ensure a fulfilling journey.",
  },
  {
    jaQ: "トレッキング経験がなくても参加できますか？",
    jaA: "はい、トレッキングの経験がなくてもご参加いただけます。初心者から経験豊富なトレッカーまで、体力や経験に応じたトレッキングをカスタマイズ可能です。",
    enQ: "Can I participate even if I don't have trekking experience?",
    enA: "Yes, you can participate even without prior trekking experience. We can customize treks to suit all fitness and experience levels, from beginners to seasoned trekkers.",
  },
  {
    jaQ: "トレッキングに最適な時期はいつですか？",
    jaA: "トレッキングに最適な時期は、春（3月～5月）と秋（9月～11月）です。この時期は天候が良く、景色も素晴らしいです。",
    enQ: "When is the best time for trekking?",
    enA: "The best times for trekking are spring (March to May) and autumn (September to November). The weather is clear and the views are spectacular during these seasons.",
  },
  {
    jaQ: "日の出ネパールホリデーズのツアーはどのように予約できますか？",
    jaA: "当社のウェブサイトから直接予約するか、メールまたは電話/LINEでのお問い合わせが可能です。詳細は「お問い合わせページ」にてご確認ください。",
    enQ: "How can I book a tour with Hinode Nepal Holidays?",
    enA: "You can book directly through our website, or contact us via email, phone, or LINE. Please check our 'Contact Us' page for more details.",
  },
  {
    jaQ: "旅行中の安全対策はどうなっていますか？",
    jaA: "安全が最優先です。経験豊富なガイド、救急キットを提供し、トレッキング中の適切な高度順応を徹底しています。天候やトレイル状況も常に把握し、緊急時には迅速に対応します。",
    enQ: "What safety measures are in place during the trip?",
    enA: "Safety is our top priority. We provide experienced guides, first-aid kits, and ensure proper acclimatization during treks. We also constantly monitor weather and trail conditions to respond quickly in emergencies.",
  },
];

export default function FAQ({ isJa }: { isJa: boolean }) {
  return (
    <section className="bg-[#FAF9F6] py-24 border-t border-[#E8E5DF]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[#8B2C24] text-xs tracking-[0.2em] uppercase mb-4 block font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-[#2C2C2C] mb-6">
            {isJa ? "よくあるご質問" : "Frequently Asked Questions"}
          </h2>
          <p className="text-[#5A5A5A] font-light max-w-2xl mx-auto">
            {isJa
              ? "旅行に関する疑問や不安を解消し、安心してネパールへお越しいただけるよう、よくあるご質問をまとめました。"
              : "Find answers to common questions to help you prepare for your journey to Nepal with confidence."}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQCard key={index} faq={faq} isJa={isJa} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQCard({ faq, isJa, defaultOpen }: { faq: FAQItem; isJa: boolean; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-[#E8E5DF] rounded-sm overflow-hidden hover:border-[#8B2C24] transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 text-left"
      >
        <span className="font-medium text-[#2C2C2C] text-sm md:text-base leading-snug">
          {isJa ? faq.jaQ : faq.enQ}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#A39E99] shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[#5A5A5A] font-light text-sm md:text-base leading-relaxed border-t border-[#F0EDE8] pt-4">
          {isJa ? faq.jaA : faq.enA}
        </p>
      </div>
    </div>
  );
}
