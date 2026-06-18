import mongoose from "mongoose";

const oldImage = "https://images.unsplash.com/photo-1581014878418-4905bcaf366e?q=80&w=2000&auto=format&fit=crop";
const newImage = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop";

async function fixImages() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is required.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    if (!db) throw new Error("No db connection");

    const collections = ["tours", "destinations", "posts"];
    
    for (const collName of collections) {
      const collection = db.collection(collName);
      const result = await collection.updateMany(
        { image: oldImage },
        { $set: { image: newImage } }
      );
      console.log(`Updated ${result.modifiedCount} records in ${collName}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error fixing images:", error);
    process.exit(1);
  }
}

fixImages();
