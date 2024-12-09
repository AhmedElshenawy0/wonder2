import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { Product_Created } from "@/utils/dots";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const products = await prisma.product.findMany({
    include: {
      available: true,
      sales: true,
    },
  });

  if (!products) {
    return NextResponse.json([], { status: 200 });
  } else {
    return NextResponse.json(products, { status: 200 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body: Product_Created = await req.json();

    // Validate required fields
    if (
      !body.name ||
      !body.price ||
      !body.image ||
      !body.category ||
      !body.sizes
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const uploadResponse = await cloudinary.v2.uploader.upload(body.image, {
      folder: "user_images",
    });

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        price: +body.price,
        color: body.color,
        category: body.category,
        image: uploadResponse.secure_url,
        sizes: body.sizes,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wronge", error },
      { status: 500 }
    );
  }
};
