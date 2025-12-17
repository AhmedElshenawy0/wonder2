import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route  ~/api/product/:id
 * @desc   Get One Product
 * @access public
 */
type Params_Props = {
  params: Promise<{
    id: string;
  }>;
};
export const GET = async (req: NextRequest, props: Params_Props) => {
  const params = await props.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: +params.id },
      include: {
        available: true,
        sales: { include: { product: true, user: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while fetching single product" },
      { status: 500 }
    );
  }
};

/**
 * @method DELETE
 * @route  ~/api/product/:id
 * @desc   delete One Product
 * @access public
 */

export const DELETE = async (req: NextRequest, props: Params_Props) => {
  const params = await props.params;
  try {
    const productId = Number(params.id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json(
      { message: "Product has been deleted succsessfuly", id: productId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while deleting single product" },
      { status: 500 }
    );
  }
};

/**
 * @method PUT
 * @route  ~/api/product/:id
 * @desc   Update One Product
 * @access public
 */

export const PUT = async (req: NextRequest, props: Params_Props) => {
  const params = await props.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: +params.id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: +params.id },
      data: {
        name: body.name || product.name,
        price: +body.price || product.price,
        color: body.color || product.color,
        category: body.category || product.category,
        image: product.image,
        sizes: body.sizes,
      },
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while updating single product" },
      { status: 500 }
    );
  }
};
