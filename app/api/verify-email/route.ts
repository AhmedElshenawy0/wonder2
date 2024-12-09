import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email: any = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Query Email Required" },
      { status: 400 }
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!isUserExist) {
    return NextResponse.json(
      {
        message: "Your Email Does not exist. Please sign Up First",
      },
      { status: 404 }
    );
  }

  try {
    await prisma.user.update({
      where: { email: email },
      data: { ...isUserExist, verified: true },
    });

    console.log(isUserExist);

    return NextResponse.redirect(new URL("/login?auth=true", req.url));
  } catch (error) {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 500 }
    );
  }
}
