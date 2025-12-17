import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route  ~/api/product/category/:name
 * @desc   Get Product By Category
 * @access public
 */

// Get Products By Category
export const GET = async (
  req: NextRequest,
  props: {
    params: Promise<{
      name: string;
    }>;
  }
) => {
  const params = await props.params;
  try {
    const products = await prisma.product.findMany({
      where: { category: params.name },
    });

    if (!products[0]) {
      return NextResponse.json(
        {
          message: "There is no products in this category",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong when fetch products by category" },
      { status: 500 }
    );
  }
};
