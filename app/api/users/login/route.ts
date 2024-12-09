import bcrypt from "bcryptjs";
import { JWTPayload, UserLogin } from "@/utils/dots";
import prisma from "@/utils/db";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateJWT } from "@/utils/generateToken";
import { serialize } from "cookie";

/**
 * @method POST
 * @route  ~/api/users/login
 * @desc   Login User
 * @access public
 */

export const POST = async (request: NextRequest) => {
  try {
    // ==>> Get body from request
    const body: UserLogin = await request.json();

    // ==>> Validation
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // ==>> Check if user is already exist
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    if (!user.verified) {
      return NextResponse.json({
        message: "email not verified, Verify email first",
      });
    }

    // ==>> Check if password match existed password
    const isPassMatch = await bcrypt.compare(body.password, user.password);

    if (!isPassMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    //==>> Generate token

    // const jwtPayload: JWTPayload = {
    //   id: user.id,
    //   userName: user.userName,
    //   isAdmin: user.isAdmin,
    // };

    // const token = generateJWT(jwtPayload);

    // const cookie = serialize("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    // });

    // ==>> Send Response
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
