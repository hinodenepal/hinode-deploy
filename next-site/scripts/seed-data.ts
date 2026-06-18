import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Calculate dirname for any local file operations if needed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Destination from "../src/lib/models/Destination.js";
import Tour from "../src/lib/models/Tour.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const destinations = [
  {
    title: "エベレスト地方",
    enTitle: "Everest Region",
    slug: "everest-region",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop",
    description: "<p>エベレスト地方は、世界最高峰のエベレストを含む壮大な山々が連なる地域です。シェルパ族の文化に触れることができます。</p>",
    enDescription: "<p>The Everest region is home to the majestic Himalayas, including Mount Everest. Experience the legendary Sherpa culture and awe-inspiring trails.</p>",
    highlights: ["エベレストベースキャンプ", "ナムチェバザール", "テンボチェ修道院"],
    enHighlights: ["Everest Base Camp", "Namche Bazaar", "Tengboche Monastery"],
    metaTitle: "エベレスト地方 - Hinode Nepal",
    enMetaTitle: "Everest Region - Hinode Nepal",
    metaDescription: "エベレスト地方でのトレッキング。世界最高峰を間近で体験。",
    enMetaDescription: "Trekking in the Everest region. Experience the world's highest peak up close."
  },
  {
    title: "カトマンズ盆地",
    enTitle: "Kathmandu Valley",
    slug: "kathmandu-valley",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop",
    description: "<p>カトマンズ盆地は、ユネスコ世界遺産に登録された寺院や王宮広場が集まる、歴史と文化の中心地です。</p>",
    enDescription: "<p>The Kathmandu Valley is a vibrant hub of history and culture, featuring UNESCO World Heritage sites, bustling markets, and ancient temples.</p>",
    highlights: ["ボダナート", "パタン旧王宮広場", "スワヤンブナート"],
    enHighlights: ["Boudhanath Stupa", "Patan Durbar Square", "Swayambhunath"],
    metaTitle: "カトマンズ盆地 - Hinode Nepal",
    enMetaTitle: "Kathmandu Valley - Hinode Nepal",
    metaDescription: "カトマンズ盆地の歴史的建造物と文化を探索するツアー。",
    enMetaDescription: "Explore the historical monuments and vibrant culture of the Kathmandu Valley."
  },
  {
    title: "チトワン国立公園",
    enTitle: "Chitwan National Park",
    slug: "chitwan-national-park",
    image: "https://images.unsplash.com/photo-1628105747656-74fc24a59a72?q=80&w=2000&auto=format&fit=crop",
    description: "<p>チトワン国立公園は、サイやベンガルトラが生息する野生動物の宝庫です。ジャングルサファリを楽しめます。</p>",
    enDescription: "<p>Chitwan National Park is a haven for wildlife, including the one-horned rhinoceros and Bengal tigers. Enjoy an exciting jungle safari.</p>",
    highlights: ["ジャングルサファリ", "ゾウの保護センター", "タルー族の文化体験"],
    enHighlights: ["Jungle Safari", "Elephant Breeding Center", "Tharu Culture Experience"],
    metaTitle: "チトワン国立公園 - Hinode Nepal",
    enMetaTitle: "Chitwan National Park - Hinode Nepal",
    metaDescription: "チトワン国立公園でのサファリ体験。豊かな野生動物と出会う。",
    enMetaDescription: "Safari experience in Chitwan National Park. Encounter abundant wildlife."
  }
];

const tours = [
  {
    title: "エベレスト・ベースキャンプ・トレック",
    enTitle: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    duration: "16 日間",
    enDuration: "16 Days",
    season: "春、秋",
    enSeason: "Spring, Autumn",
    difficulty: "上級",
    enDifficulty: "Hard",
    price: "1525",
    showPrice: true,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000&auto=format&fit=crop",
    destination: "everest-region", // slug
    enDestination: "Everest Region",
    description: "<p>世界最高峰エベレストの麓まで歩く、世界中のトレッカーの憧れのコースです。</p>",
    enDescription: "<p>The classic Himalayan expedition to the base of the world's highest peak. A dream course for trekkers worldwide.</p>",
    highlights: ["カラパタールからの絶景", "シェルパ族の文化", "ナムチェバザール"],
    enHighlights: ["Stunning views from Kala Patthar", "Sherpa culture", "Namche Bazaar"],
    itinerary: [
      {
        dayNumber: 1,
        title: "カトマンズ到着",
        enTitle: "Arrival in Kathmandu",
        description: "空港へのお出迎え、ホテルへの送迎。",
        enDescription: "Airport pickup and transfer to the hotel.",
        overnight: "ホテル",
        enOvernight: "Hotel",
        meals: "夕食",
        enMeals: "Dinner"
      },
      {
        dayNumber: 2,
        title: "ルクラへフライト、パクディンへトレッキング",
        enTitle: "Fly to Lukla and trek to Phakding",
        description: "早朝のフライトでルクラへ向かい、そこからトレッキングを開始します。",
        enDescription: "Early morning flight to Lukla, followed by the start of the trek.",
        overnight: "ロッジ",
        enOvernight: "Lodge",
        meals: "朝, 昼, 夕",
        enMeals: "B, L, D"
      }
    ],
    inclusions: ["国内線航空券", "トレッキング許可証", "ガイド・ポーター"],
    enInclusions: ["Domestic flights", "Trekking permits", "Guide & Porter"],
    exclusions: ["国際線航空券", "海外旅行保険", "個人的な出費"],
    enExclusions: ["International flights", "Travel insurance", "Personal expenses"],
    faqs: [
      {
        question: "高山病の心配はありますか？",
        enQuestion: "Is altitude sickness a concern?",
        answer: "高山病を防ぐため、高度順応日を設けてゆっくりと登ります。",
        enAnswer: "We include acclimatization days to ascend slowly and prevent altitude sickness."
      }
    ]
  },
  {
    title: "アンナプルナ・サーキット・トレック",
    enTitle: "Annapurna Circuit Trek",
    slug: "annapurna-circuit-trek",
    duration: "14 日間",
    enDuration: "14 Days",
    season: "春、秋",
    enSeason: "Spring, Autumn",
    difficulty: "中級〜上級",
    enDifficulty: "Moderate to Hard",
    price: "1250",
    showPrice: true,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop",
    destination: "annapurna-region", // Not created yet, but can just act as string reference
    enDestination: "Annapurna Region",
    description: "<p>アンナプルナ山群の周りを歩く、多様な景観が楽しめるトレッキングルートです。</p>",
    enDescription: "<p>A diverse trekking route around the Annapurna massif, offering stunning scenery from jungles to alpine passes.</p>",
    highlights: ["トロンパス越え", "マナン村の風景", "温泉"],
    enHighlights: ["Thorong La Pass", "Manang Village", "Natural Hot Springs"],
    itinerary: [],
    inclusions: ["許可証", "ロッジ宿泊"],
    enInclusions: ["Permits", "Lodge Accommodation"],
    exclusions: ["お酒類"],
    enExclusions: ["Alcoholic beverages"],
    faqs: []
  },
  {
    title: "ネパールハイライトツアー",
    enTitle: "Best of Nepal Tour",
    slug: "best-of-nepal-tour",
    duration: "14 日間",
    enDuration: "14 Days",
    season: "通年",
    enSeason: "All Year",
    difficulty: "初級",
    enDifficulty: "Easy",
    price: "1850",
    showPrice: true,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop",
    destination: "kathmandu-valley",
    enDestination: "Kathmandu Valley",
    description: "<p>カトマンズの歴史、ポカラの自然、チトワンのジャングルを巡る贅沢なツアーです。</p>",
    enDescription: "<p>A luxurious tour spanning the history of Kathmandu, the nature of Pokhara, and the jungles of Chitwan.</p>",
    highlights: ["世界遺産巡り", "エレファントサファリ", "ヒマラヤの日の出"],
    enHighlights: ["World Heritage Tour", "Elephant Safari", "Himalayan Sunrise"],
    itinerary: [],
    inclusions: ["ホテル宿泊", "専用車", "国内線"],
    enInclusions: ["Hotel Accommodation", "Private Vehicle", "Domestic Flights"],
    exclusions: ["夕食（一部）"],
    enExclusions: ["Dinner (some days)"],
    faqs: []
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected to MongoDB.");

    console.log("Clearing existing sample data...");
    // Only deleting the seeded slugs so we don't destroy user data
    const destinationSlugs = destinations.map(d => d.slug);
    const tourSlugs = tours.map(t => t.slug);
    
    await Destination.deleteMany({ slug: { $in: destinationSlugs } });
    await Tour.deleteMany({ slug: { $in: tourSlugs } });

    console.log("Inserting new destinations...");
    await Destination.insertMany(destinations);

    console.log("Inserting new tours...");
    await Tour.insertMany(tours);

    console.log("Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
