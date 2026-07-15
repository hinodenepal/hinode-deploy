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

const visaPost = {
  title: "ネパールビザ取得ガイド：必要書類と手続き方法",
  enTitle: "Nepal Visa Guide: Required Documents and Application Process",
  category: "Travel Guide",
  enCategory: "Travel Guide",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200", 
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  slug: "nepal-visa-guide",
  author: "ヒノデネパール専門家",
  enAuthor: "Hinode Nepal Experts",
  content: `
    <p>ネパールに訪れる際、ビザの取得は必須です。到着時にトリブバン国際空港や、インド・チベット国境のイミグレーション入国ポイントで簡単に取得できます。こちらでは、必要な手続きと注意点について詳しく解説します。</p>

    <h2>ネパールビザの取得方法</h2>
    <p>ネパール到着時にトリブバン国際空港でビザを取得するのが最も簡単な方法です。インドやチベットから陸路で入国する場合も、主要なイミグレーションポイントでビザを申請できます。</p>
    
    <h2>ビザ申請の必要書類</h2>
    <p>空港や入国ポイントでビザを取得する際には、以下の書類が必要です。</p>
    <ul>
      <li><strong>有効なパスポート:</strong> パスポートの残存有効期間が6ヶ月以上で、ビザスタンプ用の空白ページがあること。</li>
      <li><strong>オンライン申請フォーム:</strong> 到着前にオンラインで申請フォームを記入してください。フォームは到着の15日前から記入可能です。</li>
      <li><strong>ビザ料金:</strong> 現金またはクレジットカードで支払い可能。</li>
    </ul>
    
    <h2>ネパールでの宿泊先の住所</h2>
    <p>ビザ申請時には、滞在先の住所を記入する必要があります。例えば、次の住所が参考になります：</p>
    <blockquote>
      Hotel Name<br>
      Address Line 1 ,<br>
      Address Line 2
    </blockquote>
    
    <h2>ネパールへの主要入国ポイント</h2>
    <p><strong>空路:</strong> トリブバン国際空港 (TIA)</p>
    <p><strong>陸路:</strong></p>
    <ul>
      <li><strong>東部:</strong> カカルビッタ（ジャパ）</li>
      <li><strong>中央:</strong> ビルガンジ（パルサ）</li>
      <li><strong>北部:</strong> コダリ（シンドパルチョーク）</li>
      <li><strong>西部:</strong> ルパンデヒ（ベリヤ、バイラワ）</li>
      <li><strong>中西部:</strong> バンケ（ネパールガンジ）</li>
      <li><strong>遠西部:</strong> カイラリ（ダンガディ）/カンチャンプル（マヘンドラナガル）</li>
    </ul>
    
    <h2>ビザ料金と延長</h2>
    <p><strong>観光ビザ料金:</strong></p>
    <ul>
      <li>15日間：USD 30</li>
      <li>30日間：USD 50</li>
      <li>90日間：USD 125</li>
    </ul>
    <p><strong>SAARC諸国の観光客:</strong> 30日間まで無料ビザ（ただし、インド国民はビザ不要）</p>
    <p><strong>ビザ延長:</strong></p>
    <ul>
      <li>15日以内の延長はUSD 30</li>
      <li>15日以上の延長は1日あたりUSD 2の追加料金で最大150日まで可能</li>
    </ul>
    
    <h2>トランジットビザ</h2>
    <p>ネパールの空港でトランジットが必要な場合、1日あたりUSD 5でトランジットビザが取得可能です。</p>
    
    <h2>ビザに関する注意事項</h2>
    <ul>
      <li><strong>無効ビザでの入国は違法:</strong> 有効なビザがなければネパールへの入国や滞在は違法です。</li>
      <li><strong>ビザの再発行:</strong> 新しいパスポートを取得した場合は、移民局に連絡してビザを転記する必要があります。</li>
      <li><strong>ビザ料金は返金不可:</strong> ビザ発行後、変更や返金はできません。</li>
      <li><strong>10歳以下の子供:</strong> ビザ料金は免除されますが、有効なビザを取得する必要があります。</li>
      <li><strong>尊重すべき文化:</strong> ネパールの文化や伝統を尊重し、不適切な行為は避けましょう。</li>
    </ul>
    
    <p>ネパールへの旅行前に必要な情報を事前に把握し、快適な旅行を楽しんでください。</p>
  `,
  enContent: `
    <p>A visa is required to enter Nepal. You can easily obtain one upon arrival at Tribhuvan International Airport or at immigration checkpoints along the India–Nepal and Tibet–Nepal borders. Below is a detailed guide to the application process and important things to keep in mind.</p>
    
    <h2>How to Obtain a Nepal Visa</h2>
    <p>The easiest way to get a Nepal visa is to apply for a Visa on Arrival at Tribhuvan International Airport in Kathmandu. If you are entering Nepal overland from India or Tibet, you can also apply for a visa at the major immigration checkpoints.</p>
    
    <h2>Required Documents for a Visa Application</h2>
    <p>When applying for a visa at the airport or a land border crossing, you will need:</p>
    <ul>
      <li><strong>A valid passport:</strong> Your passport must be valid for at least 6 months from the date of entry and have at least one blank page for the visa stamp.</li>
      <li><strong>Online application form:</strong> Complete the online visa application form before arrival. The form can be submitted up to 15 days before your arrival.</li>
      <li><strong>Visa fee:</strong> Payment can be made in cash or by credit card.</li>
    </ul>
    
    <h2>Accommodation Address in Nepal</h2>
    <p>You will need to provide the address of your accommodation when applying for your visa. For example:</p>
    <blockquote>
      Hotel Name<br>
      Address Line 1<br>
      Address Line 2
    </blockquote>
    
    <h2>Main Entry Points to Nepal</h2>
    <p><strong>By Air:</strong></p>
    <p>Tribhuvan International Airport (TIA)</p>
    <p><strong>By Land:</strong></p>
    <ul>
      <li><strong>Eastern Nepal:</strong> Kakarbhitta (Jhapa)</li>
      <li><strong>Central Nepal:</strong> Birgunj (Parsa)</li>
      <li><strong>Northern Nepal:</strong> Kodari (Sindhupalchok)</li>
      <li><strong>Western Nepal:</strong> Rupandehi (Belahiya/Bhairahawa)</li>
      <li><strong>Mid-Western Nepal:</strong> Banke (Nepalgunj)</li>
      <li><strong>Far-Western Nepal:</strong> Kailali (Dhangadhi) / Kanchanpur (Mahendranagar)</li>
    </ul>
    
    <h2>Visa Fees and Extensions</h2>
    <p><strong>Tourist Visa Fees:</strong></p>
    <ul>
      <li>15 days: USD 30</li>
      <li>30 days: USD 50</li>
      <li>90 days: USD 125</li>
    </ul>
    <p><strong>SAARC Nationals:</strong></p>
    <p>Free tourist visa for up to 30 days (Indian citizens do not require a visa).</p>
    <p><strong>Visa Extension:</strong></p>
    <ul>
      <li>Up to 15 days: USD 30</li>
      <li>More than 15 days: USD 2 per additional day, up to a maximum stay of 150 days.</li>
    </ul>
    
    <h2>Transit Visa</h2>
    <p>If you are transiting through Nepal, you can obtain a Transit Visa at the airport for USD 5 per day.</p>
    
    <h2>Important Visa Information</h2>
    <ul>
      <li><strong>Entering Nepal without a valid visa is illegal.</strong> You must have a valid visa to enter and stay in the country.</li>
      <li><strong>Visa transfer:</strong> If you receive a new passport, you must contact the Department of Immigration to have your valid visa transferred to your new passport.</li>
      <li><strong>Visa fees are non-refundable:</strong> Once a visa has been issued, fees cannot be refunded or changed.</li>
      <li><strong>Children under 10 years old:</strong> Visa fees are waived, but a valid visa is still required.</li>
      <li><strong>Respect local culture:</strong> Visitors are expected to respect Nepal's culture and traditions and avoid inappropriate behavior.</li>
    </ul>
    
    <p>Before traveling to Nepal, make sure you understand the visa requirements and entry procedures so you can enjoy a smooth and pleasant trip.</p>
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
    await Post.deleteOne({ slug: "ネパールビザ取得ガイド：必要書類と手続き方法" });
    await Post.deleteOne({ slug: visaPost.slug });

    await Post.create(visaPost);
    console.log("Successfully added the Visa Guide Blog Post.");

    process.exit(0);
  } catch (error) {
    console.error("Error adding post:", error);
    process.exit(1);
  }
}

seed();
