import mongoose from "mongoose";

async function findImages() {
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
      const docs = await collection.find({ image: { $regex: "1581014878418", $options: "i" } }).toArray();
      if (docs.length > 0) {
        console.log(`Found ${docs.length} in ${collName}`);
        for (const doc of docs) {
          console.log(`- ${doc._id}: ${doc.image}`);
        }
      } else {
        console.log(`None in ${collName}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("Error finding images:", error);
    process.exit(1);
  }
}

findImages();
