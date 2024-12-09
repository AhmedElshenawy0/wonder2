import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong while fetching users", error },
      { status: 200 }
    );
  }
};
