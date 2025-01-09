import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //   secure: process.env.MAIL_NODE_INV !== "development",
  auth: {
    user: process.env.SMTP_USER, // Your Gmail address
    pass: process.env.SMTP_PASSWORD, // App password or OAuth token
  },
});

// Send the email
export const sendEmail = async (email: string) => {
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log("error while test");
    return;
  }
  try {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const baseUrl = process.env.NEXTAUTH_URL;

    const verifyLink = `${baseUrl}/api/verify-email?token=${token}`;

    const sendResul = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify Your Email",
      html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f0f9f4;">
      <h1 style="font-size: 24px; color: #4CAF50; text-align: center; margin-bottom: 20px;">Welcome to RAVELLE!</h1>
      <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">
        We're thrilled to have you join us! Please confirm your email address to unlock your account.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyLink}" style="
          display: inline-block;
          padding: 14px 28px;
          background: linear-gradient(90deg, #4CAF50, #81C784);
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          border-radius: 50px;
          box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
        ">Verify Your Email</a>
      </div>
      <p style="font-size: 14px; color: #666; text-align: center; margin-bottom: 30px;">
        If you didn’t register for this account, you can safely ignore this email.
      </p>
      <footer style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
        <p style="margin-bottom: 5px;">Follow us:</p>
        <a href="#" style="color: #4CAF50; margin: 0 10px;">Facebook</a> | 
        <a href="#" style="color: #81C784; margin: 0 10px;">Instagram</a> | 
        <a href="#" style="color: #007BFF; margin: 0 10px;">Twitter</a>
        <p style="margin-top: 20px;">&copy; ${new Date().getFullYear()} RAVELLE. All rights reserved.</p>
      </footer>
    </div>
        `,
    });

    console.log(sendResul);
  } catch (error) {
    console.log("There is an error when sending the email");
  }
};
