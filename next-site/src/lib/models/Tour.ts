import mongoose from "mongoose";

const ItineraryDaySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  title: { type: String, required: true },
  enTitle: { type: String, default: "" },
  description: { type: String, required: true },
  enDescription: { type: String, default: "" },
  overnight: { type: String, default: "" },
  enOvernight: { type: String, default: "" },
  meals: { type: String, default: "" },
  enMeals: { type: String, default: "" }
});

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  enQuestion: { type: String, default: "" },
  answer: { type: String, required: true },
  enAnswer: { type: String, default: "" }
});

const TourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    enTitle: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    duration: { type: String, required: true },
    enDuration: { type: String, default: "" },
    season: { type: String, required: true },
    enSeason: { type: String, default: "" },
    difficulty: { type: String, required: true },
    enDifficulty: { type: String, default: "" },
    price: { type: String, required: true },
    showPrice: { type: Boolean, default: true },
    image: { type: String, required: true },
    destination: { type: String, required: true },
    enDestination: { type: String, default: "" },
    description: { type: String, required: true },
    enDescription: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    enHighlights: { type: [String], default: [] },
    itinerary: { type: [ItineraryDaySchema], default: [] },
    inclusions: { type: [String], default: [] },
    enInclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    enExclusions: { type: [String], default: [] },
    faqs: { type: [FAQSchema], default: [] },
    metaTitle: { type: String, default: "" },
    enMetaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    enMetaDescription: { type: String, default: "" },
    focusKeywords: { type: String, default: "" },
    enFocusKeywords: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Tour || mongoose.model("Tour", TourSchema);
