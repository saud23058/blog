import { DBconnection } from "@/lib/db";
import { PostModel } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await DBconnection();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    // Here we can apply the logic like if the user sessions in not changng then should
    // not be incremented
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true } 
    );

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Unable to fetch the post" },
      { status: 500 }
    );
  }
}
