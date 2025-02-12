import { DBconnection } from "@/lib/db";
import { PostModel } from "@/models/post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await DBconnection();
    const posts = await PostModel.find();
    return NextResponse.json(
      { posts }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Unable to fetch the data: ${error}` },
      { status: 400 }
    );
  }
}