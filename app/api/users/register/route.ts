import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { userSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload, UserRegister } from "@/utils/dots";
import { generateJWT } from "@/utils/generateToken";
import { serialize } from "cookie";
import { User } from "@/app/types/types";
import { sendEmail } from "@/utils/mail";

/**
 * @method POST
 * @route  ~/api/users/register
 * @desc   Register User
 * @access public
 */

export const POST = async (request: NextRequest) => {
  try {
    //=> Get User Data From Request
    const body: UserRegister = await request.json();

    //=> Validation
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    //=> Check if user exist
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        {
          message: "هذا الإيميل موجود بالفعل, سجل الان",
        },
        { status: 409 }
      );
    }

    //=> Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    //=> Create User
    const newUser: User = await prisma.user.create({
      data: {
        userName: body.userName,
        email: body.email,
        password: hashedPassword,
        phone: body.phone,
        isAdmin: body.isAdmin ? body.isAdmin : false,
      },
      select: {
        userName: true,
        id: true,
        isAdmin: true,
        email: true,
      },
    });

    //=> Check if New User is already created
    if (!newUser) {
      return NextResponse.json(
        {
          message: "Something went wrong when creating user",
        },
        { status: 400 }
      );
    }

    //=> sendEmail function that send Verfication code to user's gmail
    await sendEmail(newUser?.email!);

    // ==> Send Response After Create User
    return NextResponse.json(
      {
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while register", error },
      { status: 500 }
    );
  }
};
