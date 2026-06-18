import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Tour from "@/lib/models/Tour";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { slug } = await params;
    const tour = await Tour.findOne({ slug });
    if (!tour) {
      return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: tour });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await req.json();

    const tour = await Tour.findOneAndUpdate({ slug }, body, { new: true, runValidators: true });
    if (!tour) {
      return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: tour });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { slug } = await params;
    const tour = await Tour.findOneAndDelete({ slug });
    if (!tour) {
      return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
