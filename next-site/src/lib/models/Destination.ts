import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },           // Japanese title
    enTitle: { type: String, required: true },          // English title
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },      // Rich HTML, Japanese
    enDescription: { type: String, default: "" },       // Rich HTML, English
    highlights: { type: [String], default: [] },
    enHighlights: { type: [String], default: [] },
    metaTitle: { type: String, default: "" },
    enMetaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    enMetaDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Destination ||
  mongoose.model("Destination", DestinationSchema);
