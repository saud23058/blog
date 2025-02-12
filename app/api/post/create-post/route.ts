import { DBconnection } from "@/lib/db";
import { PostModel } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await DBconnection();

    const { title, description, imageUrl, category, detail } = await req.json();

    await PostModel.create({
      title,
      description,
      imageUrl,
      category,
      detail,
    });

    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
      { status: 500 }
    );
  }
}
