import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    enLocation: { type: String, default: "" },
    tour: { type: String, required: true },
    enTour: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    enText: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

const testimonials = [
  {
    name: "Takahashi Y.", 
    location: "東京", 
    enLocation: "Tokyo",
    tour: "エベレスト・ベースキャンプ・ラグジュアリー", 
    enTour: "Everest Base Camp Luxury Trek",
    rating: 5,
    text: "エベレスト・ベースキャンプまでのトレッキングでしたが、毎日清潔で快適なロッジに宿泊でき、食事も素晴らしかったです。ガイドのホスピタリティに感動しました。",
    enText: "Trekking to Everest Base Camp was amazing. We stayed in clean and comfortable lodges every day, and the food was excellent. The guide's hospitality was truly touching."
  },
  {
    name: "Sato M.", 
    location: "大阪", 
    enLocation: "Osaka",
    tour: "カトマンズ盆地ヘリテージツアー", 
    enTour: "Kathmandu Valley Heritage Tour", 
    rating: 5,
    text: "初めてのネパールで不安もありましたが、事前のきめ細やかなサポートと現地の日本語ガイドのおかげで、安心して素晴らしい文化体験ができました。",
    enText: "It was my first time in Nepal so I was anxious, but thanks to the meticulous pre-trip support and local Japanese-speaking guide, I felt safe and had a wonderful cultural experience."
  },
  {
    name: "Yamamoto K.", 
    location: "京都", 
    enLocation: "Kyoto",
    tour: "アンナプルナ・サンクチュアリ・リトリート", 
    enTour: "Annapurna Sanctuary Retreat", 
    rating: 5,
    text: "アンナプルナの朝日は一生の思い出です。ラグジュアリーなロッジでの滞在は、トレッキングの疲れを完全に癒してくれました。",
    enText: "The sunrise at Annapurna is a lifelong memory. Staying at the luxury lodges completely healed the fatigue from trekking."
  },
  {
    name: "Ito S.", 
    location: "福岡", 
    enLocation: "Fukuoka",
    tour: "チトワン・ラグジュアリー・サファリ", 
    enTour: "Chitwan Luxury Safari", 
    rating: 5,
    text: "チトワンでのサファリ体験は、期待を遥かに超えるものでした。エコリゾートの設備も環境への配慮も素晴らしかったです。",
    enText: "The safari experience in Chitwan far exceeded my expectations. The eco-resort's facilities and environmental considerations were excellent."
  }
];

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is required.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    await Testimonial.deleteMany({});
    console.log("Cleared existing testimonials.");

    await Testimonial.insertMany(testimonials);
    console.log("Seeded testimonials.");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding testimonials:", error);
    process.exit(1);
  }
}

seed();
