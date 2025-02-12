import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("This is from backend");

  const { title, description, imageUrl, category, details } = await req.json();

  try {
    
  } catch (error) {
    
  }

  return NextResponse.json({ message: "done" });
}
