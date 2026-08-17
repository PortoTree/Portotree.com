import { NextResponse } from "next/server";
import { getPublishedCategories } from "@/app/actions/blog";

export const revalidate = 3600; // cache 1 jam

export async function GET() {
  const result = await getPublishedCategories();
  if (!result.success) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
  return NextResponse.json({ data: result.data ?? [] });
}
