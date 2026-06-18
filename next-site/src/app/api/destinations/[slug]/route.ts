import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Destination from "@/lib/models/Destination";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { slug } = await params;
    const destination = await Destination.findOne({ slug });
    if (!destination) {
      return NextResponse.json({ success: false, error: "Destination not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: destination });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await req.json();
    const destination = await Destination.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );
    if (!destination) {
      return NextResponse.json({ success: false, error: "Destination not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: destination });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { slug } = await params;
    const destination = await Destination.findOneAndDelete({ slug });
    if (!destination) {
      return NextResponse.json({ success: false, error: "Destination not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Destination deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
