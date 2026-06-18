import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/lib/models/Testimonial";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
