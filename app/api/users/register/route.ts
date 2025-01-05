import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { userSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload, UserRegister } from "@/utils/dots";
import { generateJWT } from "@/utils/generateToken";
import { serialize } from "cookie";
import { User } from "@/app/types/types";

/**
 * @method POST
 * @route  ~/api/users/register
 * @desc   Register User
 * @access public
 */

export const POST = async (request: NextRequest) => {
  try {
    // ==> Get User Data From Request
    const body: UserRegister = await request.json();

    // ==> Validation
    const validation = userSchema.safeParse(body);

    // ==> Validation
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // ==> Check If User Exist
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        {
          message: "هذا الإيميل موجود بالفعل, سجل الان",
        },
        { status: 409 }
      );
    }
    // if (user) {
    //   //==>> Generate token

    //   const jwtPayload: JWTPayload = {
    //     id: user.id,
    //     userName: user.userName,
    //     isAdmin: user.isAdmin,
    //   };

    //   const token = generateJWT(jwtPayload);

    //   const cookie = serialize("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 30, // 30 days
    //   });

    //   // ==> Send Response After Create User

    //   return NextResponse.json(
    //     {
    //       user,
    //       token,
    //     },
    //     { status: 200, headers: { "Set-Cookie": cookie } }
    //   );
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // ==> Create User
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

    if (!newUser) {
      return NextResponse.json(
        {
          message: "Something went wrong when creating user",
        },
        { status: 400 }
      );
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Your Gmail address
        pass: process.env.SMTP_PASSWORD, // App password or OAuth token
      },
    });

    // Send the email
    const testResult = await transport.verify();
    console.log(testResult);

    const verificationLink = `http://localhost:3000/api/verify-email?email=${newUser.email}`;

    const sendResul = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: `${newUser?.email}`,
      subject: "Verify Your Email",
      html: `
                <p>Hello, ${newUser?.userName}</p>
                <p>Thanks for registering! Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you didn’t register for this account, you can ignore this email.</p>
              `,
    });

    if (!sendResul.accepted[0]) {
      return NextResponse.json(
        { message: "Error while send verification link to Gmail" },
        { status: 400 }
      );
    }
    console.log(sendResul.accepted[0]);
    //==>> Generate token

    // const jwtPayload: JWTPayload = {
    //   id: newUser.id,
    //   userName: newUser.userName,
    //   isAdmin: newUser.isAdmin,
    // };

    // const token = generateJWT(jwtPayload);

    // const cookie = serialize("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 30, // 30 days
    // });

    // ==> Send Response After Create User

    return NextResponse.json(
      {
        user: newUser,
        accepted: sendResul.accepted[0],
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
