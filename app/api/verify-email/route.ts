import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
  const token: any = req.nextUrl.searchParams.get("token");

  // If Token Not Provided
  if (!token) {
    // Redirect To Login Page With No Token Query

    return NextResponse.redirect(`${baseUrl}/login?error=NoToken`);
  }

  // Verify Token
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error: any) {
    // Redirect To Login Page With Not Verified Query
    return NextResponse.redirect(`${baseUrl}/login?error=Notverified`);
  }

  // Get Email From Token
  const { email }: any = jwt.decode(token);

  if (!email) {
    return NextResponse.json(
      { message: "Email Dosen't exist" },
      { status: 404 }
    );
  }

  // Get User From Database
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return NextResponse.json(
      { message: "User Dosen't Exist" },
      { status: 404 }
    );
  }

  // Update User To Verified ==> true
  try {
    await prisma.user.update({
      where: { email: user?.email },
      data: { ...user, verified: true },
    });

    // Redirect To Login Page With True Query
    return NextResponse.redirect(`${baseUrl}/login?auth=true`);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
