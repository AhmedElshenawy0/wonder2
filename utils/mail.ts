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
    const verifyLink = `http://localhost:3000/api/verify-email?email=${email}`;

    const sendResul = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: "shnawyahmedkamal@gmail.com",
      subject: "Verify Your Email",
      html: `
          <p>Hi,</p>
          <p>Thanks for registering! Please click the link below to verify your email address:</p>
                <a href="${verifyLink}">Verify Email</a>

          <p>If you didn’t register for this account, you can ignore this email.</p>
        `,
    });

    console.log(sendResul);
  } catch (error) {
    console.log("There is an error when sending the email");
  }
};
