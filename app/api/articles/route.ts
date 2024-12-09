import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const articles = await prisma.article.findMany();

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, image }: any = await req.json();

    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: "user_images",
    });

    const newArticle = await prisma.article.create({
      data: {
        title,
        description,
        image: uploadResponse.secure_url,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
