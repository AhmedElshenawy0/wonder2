import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  if (!params.id) {
    return NextResponse.json(
      { message: "There is no id provided" },
      { status: 400 }
    );
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: +params.id },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article is not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
};
