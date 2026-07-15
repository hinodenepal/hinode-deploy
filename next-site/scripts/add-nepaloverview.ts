import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    enTitle: { type: String, required: true },
    category: { type: String, required: true },
    enCategory: { type: String, default: "" },
    image: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
    enContent: { type: String, default: "" },
    slug: { type: String, required: true, unique: true },
    author: { type: String, default: "ヒノデネパール専門家" },
    enAuthor: { type: String, default: "Hinode Nepal Experts" },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

const nepalOverviewPost = {
  title: "ネパール概要：ヒマラヤの息吹を感じる国",
  enTitle: "Nepal Overview: The Land of the Himalayas",
  category: "Information",
  enCategory: "Information",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200", 
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  slug: "nepaloverview",
  author: "ヒノデネパール専門家",
  enAuthor: "Hinode Nepal Experts",
  content: `
    <p>ネパールは、雄大なヒマラヤ山脈、豊かな文化遺産、そして温かい人々で知られる魅惑的な国です。</p>
    <h2>地理と自然</h2>
    <p>南アジアに位置し、北は中国（チベット）、南・東・西はインドに接しています。世界最高峰のエベレストを含む8,000メートル峰が8座もあり、登山家やトレッカーの聖地となっています。</p>
    <h2>文化と宗教</h2>
    <p>ヒンドゥー教と仏教が調和して共存しており、多くの寺院や仏塔が街の至る所に点在しています。ユネスコ世界遺産に登録されているカトマンズ盆地は、歴史的建造物の宝庫です。</p>
    <h2>おすすめの体験</h2>
    <p>ヒマラヤでのトレッキングはもちろん、チトワン国立公園でのジャングルサファリ、ポカラでのリラックスした湖畔の滞在など、多様な体験が可能です。</p>
  `,
  enContent: `
    <p>Nepal is a fascinating country known for the majestic Himalayas, rich cultural heritage, and warm people.</p>
    <h2>Geography and Nature</h2>
    <p>Located in South Asia, it is bordered by China (Tibet) to the north and India to the south, east, and west. Home to eight of the world's 8,000-meter peaks, including Mount Everest, it is a mecca for mountaineers and trekkers.</p>
    <h2>Culture and Religion</h2>
    <p>Hinduism and Buddhism coexist in harmony, with numerous temples and stupas scattered throughout the cities. The Kathmandu Valley, a UNESCO World Heritage site, is a treasure trove of historical architecture.</p>
    <h2>Recommended Experiences</h2>
    <p>In addition to trekking in the Himalayas, you can enjoy a jungle safari in Chitwan National Park or a relaxing lakeside stay in Pokhara.</p>
  `
};

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is required.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    await Post.deleteOne({ slug: nepalOverviewPost.slug });

    await Post.create(nepalOverviewPost);
    console.log("Successfully added the Nepal Overview Blog Post.");

    process.exit(0);
  } catch (error) {
    console.error("Error adding post:", error);
    process.exit(1);
  }
}

seed();
