import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyTokenFn } from "@/utils/verifyToken";

type Params_Props = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * @method GET
 * @route  ~/api/users/:id
 * @desc   Get One User
 * @access public
 */

export const GET = async (req: NextRequest, props: Params_Props) => {
  const params = await props.params;
  const user = await prisma.user.findUnique({ where: { id: +params.id } });

  // Check If User Exist
  if (!user) {
    return NextResponse.json(
      { message: "This user dose not exist" },
      { status: 404 }
    );
  }

  return NextResponse.json(user, { status: 200 });
};

/**
 * @method PUT
 * @route  ~/api/users/:id
 * @desc   Update One User
 * @access public
 */

export const PUT = async (req: NextRequest, props: Params_Props) => {
  const params = await props.params;
  const user = await prisma.user.findUnique({ where: { id: +params.id } });

  const body = await req.json();

  // Check If body Doesn't Exist
  if (!body) {
    return NextResponse.json({ message: "write something" }, { status: 404 });
  }

  // Check If User Doesn't Exist
  if (!user) {
    return NextResponse.json(
      { message: "This user dosen't exist" },
      { status: 404 }
    );
  }

  const token = req.cookies.get("token")?.value as string;

  const { isAdmin, id }: any = verifyTokenFn(token);

  // Check If id doesn't match or idAdmin == false
  if (!isAdmin || id != params.id) {
    return NextResponse.json(
      { message: "غير مصرح لك بتنفيذ هذه العملية" },
      { status: 500 }
    );
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id: +params.id },
      data: {
        userName: body.userName || user.userName,
        password: body.password || user.password,
        phone: body.phone || user.phone,
        isAdmin: body.isAdmin ?? user.isAdmin,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
};

/**
 * @method DELETE
 * @route  ~/api/users/:id
 * @desc   Delete One User
 * @access public
 */

export const DELETE = async (req: NextRequest, props: Params_Props) => {
  const params = await props.params;
  const user = await prisma.user.findUnique({ where: { id: +params.id } });

  // Check if user doesn't exist
  if (!user) {
    return NextResponse.json(
      { message: "This user doesn't exist" },
      { status: 400 }
    );
  }

  const token = req.cookies.get("token")?.value as string;

  // Check if token doesn't exist
  if (!token) {
    return NextResponse.json({ message: "There Is No Token" });
  }

  const { isAdmin, id }: any = verifyTokenFn(token);

  // Check if id dosen't match or isAdmin == false
  if (id != params.id || !isAdmin) {
    return NextResponse.json(
      { message: "غير مصرح لك بتنفيذ هذه العملية" },
      { status: 500 }
    );
  }

  try {
    // Delete User
    await prisma.user.delete({ where: { id: +params.id } });

    return NextResponse.json(
      { message: "This user has been deleted successfuly" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while deleteing user" },
      { status: 500 }
    );
  }
};
