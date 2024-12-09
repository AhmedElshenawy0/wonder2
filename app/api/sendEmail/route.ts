import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { email }: any = req.body;

    // if (!email) {
    //   return NextResponse.json({ message: "Email is required" });
    // }
    console.log(email);

    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, // Your Gmail address
          pass: process.env.SMTP_PASSWORD, // App password or OAuth token
        },
      });

      // Send the email
      try {
        const testResult = await transport.verify();
        console.log(testResult);
      } catch (error) {
        console.log("error while test");
        return;
      }
      try {
        //@ts-ignore
        const token = crypto.randomBytes(32).toString("hex");

        const verificationLink = `http://localhost:3000/api/verify-email?email=shnawyahmedkamal@gmail.com`;

        const sendResul = await transport.sendMail({
          from: process.env.SMTP_USER,
          to: "shnawyahmedkamal@gmail.com",
          subject: "Verify Your Email",
          html: `
                <p>Hi,</p>
                <p>Thanks for registering! Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you didn’t register for this account, you can ignore this email.</p>
              `,
        });

        console.log(sendResul);
        console.log(email);
      } catch (error) {
        console.log("There is an error when sending the email");
      }

      return NextResponse.json({
        message: "Verification email sent successfully",
        // result,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: "Failed to send email" });
    }
  } else {
    console.error("Error sending email:");

    return NextResponse.json({ error: "Method not allowed" });
  }
}
