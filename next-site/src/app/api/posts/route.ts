import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
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
    let existing = await Post.findOne({ slug: body.slug });
    let count = 1;
    const baseSlug = body.slug;
    while (existing) {
      body.slug = `${baseSlug}-${count}`;
      existing = await Post.findOne({ slug: body.slug });
      count++;
    }

    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
