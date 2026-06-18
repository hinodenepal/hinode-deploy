import mongoose from "mongoose";

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

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
