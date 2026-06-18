import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tour from "@/lib/models/Tour";

import { TOURS } from "@/data/mock";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const destinationSlug = searchParams.get("destination");
    const query = destinationSlug ? { destination: destinationSlug } : {};
    let tours = await Tour.find(query).sort({ createdAt: -1 });

    if (tours.length === 0) {
      const seedData = TOURS.map((t) => ({
        title: t.title,
        enTitle: t.enTitle,
        slug: t.id,
        duration: t.duration,
        season: t.season,
        difficulty: t.difficulty,
        price: t.price,
        image: t.image,
        destination: t.destination,
        description: "Experience the ultimate luxury journey with Hinode Nepal.",
        enDescription: "Experience the ultimate luxury journey with Hinode Nepal.",
        highlights: [],
        itinerary: [],
        inclusions: [],
        exclusions: [],
        faqs: []
      }));
      await Tour.insertMany(seedData);
      tours = await Tour.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: tours });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Auto-generate slug from Japanese title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[#?%&/\\=+]/g, "")
        .replace(/(^-|-$)+/g, "");
    }

    // Ensure slug is unique
    let existing = await Tour.findOne({ slug: body.slug });
    let count = 1;
    const baseSlug = body.slug;
    while (existing) {
      body.slug = `${baseSlug}-${count}`;
      existing = await Tour.findOne({ slug: body.slug });
      count++;
    }

    const tour = await Tour.create(body);
    return NextResponse.json({ success: true, data: tour }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
