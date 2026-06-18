import mongoose from "mongoose";

import Destination from "../src/lib/models/Destination.js";
import Tour from "../src/lib/models/Tour.js";
import { TOURS, DESTINATIONS } from "../src/data/mock.js";

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI missing in .env.local");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    console.log("Seeding DESTINATIONS from mock.ts...");
    for (const d of DESTINATIONS) {
      await Destination.findOneAndUpdate(
        { slug: d.id },
        {
          title: d.jpTitle,
          enTitle: d.title,
          slug: d.id,
          image: d.image,
          description: `<p>${d.description}</p>`,
          enDescription: `<p>${d.description}</p>`,
          highlights: [],
          enHighlights: [],
          metaTitle: `${d.jpTitle} - Hinode Nepal`,
          enMetaTitle: `${d.title} - Hinode Nepal`,
        },
        { upsert: true, new: true }
      );
    }

    console.log("Seeding TOURS from mock.ts...");
    for (const t of TOURS) {
      // Find the destination id based on tour.destination
      // For example, "Everest Region" -> "everest"
      let destSlug = t.destination.toLowerCase().replace(/ /g, "-");
      if (t.destination === "Everest Region") destSlug = "everest";
      if (t.destination === "Annapurna Region") destSlug = "annapurna-region";
      if (t.destination === "Kathmandu") destSlug = "kathmandu";
      if (t.destination === "Chitwan National Park") destSlug = "chitwan-national-park";

      await Tour.findOneAndUpdate(
        { slug: t.id },
        {
          title: t.title,
          enTitle: t.enTitle,
          slug: t.id,
          duration: t.duration,
          enDuration: t.duration,
          season: t.season,
          enSeason: t.season,
          difficulty: t.difficulty,
          enDifficulty: t.difficulty,
          price: t.price.replace("¥", ""), // strip symbol
          showPrice: true,
          image: t.image,
          destination: destSlug,
          enDestination: t.destination,
          description: `<p>${t.description}</p>`,
          enDescription: `<p>${t.description}</p>`,
          highlights: [],
          enHighlights: [],
          itinerary: [],
          inclusions: [],
          enInclusions: [],
          exclusions: [],
          enExclusions: [],
          faqs: [],
        },
        { upsert: true, new: true }
      );
    }

    console.log("Mock data seeded successfully.");
  } catch (error) {
    console.error("Error seeding mock data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
