import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { productId, color, image, size } = await req.json();

  try {
    const newAvailable = await prisma.availableProduct.create({
      data: {
        productId: parseInt(productId),
        color,
        image,
      },
    });

    return NextResponse.json(newAvailable, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong in available product" },
      { status: 500 }
    );
  }
};
