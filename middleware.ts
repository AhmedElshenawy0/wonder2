import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWTPayload } from "./utils/dots";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const middleware = async (req: NextRequest) => {
  const jwtToken = req.cookies.get("token");

  if (!jwtToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("toastMessage", " تحذير: لا يوجد توكن");
    return NextResponse.redirect(url);
  }

  const token = jwtToken?.value as string;

  try {
    // Verify JWT using `jose` (replaces `jsonwebtoken.verify`)
    const { payload } = await jwtVerify(token, secret);
    const userPayload = payload as JWTPayload;
    console.log(userPayload);

    // Check if the user is an admin
    if (userPayload.isAdmin === false) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("toastMessage", " تحذير: أنت لست مالك لهذا الموقع");
      return NextResponse.redirect(url);
    }

    // Proceed if the user is an admin
    return NextResponse.next();
  } catch (err) {
    // Token verification failed (invalid or expired token)
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("toastMessage", " تحذير: خطأ في التحقق من التوكن");
    return NextResponse.redirect(url);
  }
};

export const config = {
  matcher: ["/api/admin/:path*"],
};
