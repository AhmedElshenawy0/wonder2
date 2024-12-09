import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

// Updated function to handle sales logic
export async function POST(req: NextRequest) {
  const body = await req.json();

  // // Validate the incoming request body
  const { userId, productId } = body;

  // if (!productId || !userId) {
  //   return NextResponse.json(
  //     { error: "productId and userId are required" },
  //     { status: 400 }
  //   );
  // }

  try {
    //   // Find the existing sale by both productId and userId
    const existingSale = await prisma.sale.findMany({
      where: { userId, productId },
    });

    if (existingSale[0]) {
      // If the sale exists, increment the sales count
      const updatedSale = await prisma.sale.updateMany({
        where: { userId: userId },
        data: {
          count: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(
        {
          message: "Sale updated",
          sale: updatedSale,
        },
        { status: 200 }
      );
    } else {
      //   // If no existing sale, create a new sale record
      const newSale = await prisma.sale.create({
        data: {
          productId: 1,
          userId: body.userId,
          count: 1,
        },
      });

      return NextResponse.json(
        {
          message: "Sale created",
          sale: newSale,
        },
        { status: 201 }
      );
      // }
    }
  } catch (error) {
    console.error("Error processing sale:", error);
    return NextResponse.json(
      {
        error: "Failed to process sale",
      },
      { status: 500 }
    );
  }
}

export const GET = async (req: NextRequest) => {
  const sales = await prisma.sale.findMany({
    include: { user: true, product: true },
  });
  return NextResponse.json(sales, { status: 200 });
};
