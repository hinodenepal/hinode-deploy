import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Destination from "@/lib/models/Destination";

export async function GET() {
  try {
    await dbConnect();
    const destinations = await Destination.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: destinations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Auto-generate slug from English title if not provided
    if (!body.slug && body.enTitle) {
      body.slug = body.enTitle
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/(^-|-$)+/g, "");
    }

    // Ensure slug is unique
    let existing = await Destination.findOne({ slug: body.slug });
    let count = 1;
    const baseSlug = body.slug;
    while (existing) {
      body.slug = `${baseSlug}-${count}`;
      existing = await Destination.findOne({ slug: body.slug });
      count++;
    }

    const destination = await Destination.create(body);
    return NextResponse.json({ success: true, data: destination }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
