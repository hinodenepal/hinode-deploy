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

const ebcPost = {
  title: "エベレスト・ベースキャンプ・トレッキングのベストシーズン：春と秋のガイド",
  enTitle: "Best Time to Trek Everest Base Camp: Spring & Autumn Guide",
  category: "Trekking",
  enCategory: "Trekking",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200", // Using a high-quality Unsplash image of Everest
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  slug: "best-time-to-trek-everest-base-camp",
  author: "ヒノデネパール専門家",
  enAuthor: "Hinode Nepal Experts",
  content: `
    <p>世界最高峰へのトレッキングを計画する際、最も重要な決定の1つは「いつ行くか」です。エベレスト・ベースキャンプ（EBC）へのトレッキングは、ネパールで最も人気のあるルートの1つであり、季節によって全く異なる体験となります。</p>
    
    <h2>1. 春（3月～5月）：シャクナゲと活気あるベースキャンプ</h2>
    <p>春はEBCトレッキングで2番目に人気のある季節です。雪解けが進み、日中の気温は暖かく、ハイキングに最適です。特に4月と5月は、標高の低い地域でシャクナゲ（ネパールの国花）が満開になり、森が赤やピンクに染まります。</p>
    <ul>
      <li><strong>メリット：</strong> 暖かく快適な気候。満開の花々。エベレスト登頂を目指す遠征隊で賑わうベースキャンプの活気を体験できる。</li>
      <li><strong>デメリット：</strong> トレイルが混雑する傾向がある。午後は雲が出やすい。</li>
    </ul>

    <h2>2. 秋（9月～11月）：澄み切った空と最高のパノラマ</h2>
    <p>モンスーン（雨季）明けの秋は、間違いなくエベレスト・ベースキャンプ・トレッキングのベストシーズンです。雨が空中の塵を洗い流すため、一年で最も空気が澄み、山々のパノラマビューを鮮明に楽しむことができます。</p>
    <ul>
      <li><strong>メリット：</strong> 快晴の日が多く、写真撮影に最適。安定した天候。</li>
      <li><strong>デメリット：</strong> 一年で最も混雑する季節。特に11月後半になると朝晩の冷え込みが厳しくなる。</li>
    </ul>

    <h2>3. 冬とモンスーン（夏）は避けるべき？</h2>
    <p>冬（12月～2月）は非常に寒く、大雪によりパス（峠）が閉鎖されることもありますが、混雑を避けたい経験豊富なトレッカーには静かなトレッキングが楽しめる時期でもあります。一方、モンスーン（6月～8月）は雨が多く、ヒルが発生し、山も雲に隠れがちなため、EBCトレッキングにはお勧めしません。</p>

    <h2>結論：あなたにとってのベストシーズンは？</h2>
    <p>最高の景色と安定した天候を求めるなら<strong>「秋」</strong>を、暖かさと花々、そして活気あるベースキャンプの雰囲気を楽しみたいなら<strong>「春」</strong>を選ぶのが正解です。ヒノデネパールのラグジュアリー・トレッキング・パッケージでは、どの季節であっても、最高級のロッジ滞在と専門ガイドのサポートにより、快適で安全な旅をお約束します。</p>
  `,
  enContent: `
    <p>When planning a trek to the roof of the world, one of the most crucial decisions is deciding <em>when</em> to go. The Everest Base Camp (EBC) trek is one of the most iconic routes in Nepal, and the experience varies dramatically depending on the season.</p>
    
    <h2>1. Spring (March – May): Rhododendrons and a Bustling Base Camp</h2>
    <p>Spring is the second most popular season for the EBC trek. As the winter snow melts away, daytime temperatures become warm and ideal for hiking. April and May are particularly spectacular as the lower elevations burst into color with blooming rhododendrons (Nepal's national flower).</p>
    <ul>
      <li><strong>Pros:</strong> Warm and comfortable weather. Beautiful blooming flowers. You can experience the vibrant atmosphere of Base Camp filled with expedition teams preparing to summit Everest.</li>
      <li><strong>Cons:</strong> Trails can be busy. Clouds often roll in during the late afternoon.</li>
    </ul>

    <h2>2. Autumn (September – November): Crystal Clear Skies and Perfect Panoramas</h2>
    <p>Following the monsoon season, autumn is undoubtedly the premier season for trekking to Everest Base Camp. The monsoon rains wash away the dust from the atmosphere, leaving the air incredibly crisp and clear, offering the most pristine and sharpest panoramic views of the mountains all year.</p>
    <ul>
      <li><strong>Pros:</strong> Excellent visibility and stable weather, making it perfect for photography.</li>
      <li><strong>Cons:</strong> This is the peak season, so expect the most crowds. Nights become noticeably colder, especially towards late November.</li>
    </ul>

    <h2>3. What About Winter and the Monsoon?</h2>
    <p>Winter (December – February) is intensely cold, and heavy snowfall can occasionally block high passes. However, for experienced trekkers willing to brave the chill, it offers a beautifully quiet and solitary experience on the trails. Conversely, the monsoon season (June – August) is generally not recommended for EBC due to heavy rains, leeches, slippery trails, and obscured mountain views.</p>

    <h2>Conclusion: Which Season is Right for You?</h2>
    <p>If you prioritize the clearest mountain views and the most stable weather, <strong>Autumn</strong> is your best bet. If you prefer warmer trekking conditions, blooming flora, and the excitement of a bustling Base Camp, choose <strong>Spring</strong>. Regardless of the season you choose, Hinode Nepal's luxury trekking packages guarantee a comfortable, safe, and unforgettable journey with premium lodge accommodations and expert guiding.</p>
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

    // Avoid duplicates
    await Post.deleteOne({ slug: ebcPost.slug });

    await Post.create(ebcPost);
    console.log("Successfully added the Everest Base Camp Blog Post.");

    process.exit(0);
  } catch (error) {
    console.error("Error adding post:", error);
    process.exit(1);
  }
}

seed();
