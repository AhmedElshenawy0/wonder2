import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWTPayload } from "./utils/dots";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("toastMessage", "Forbidden Step");
    return NextResponse.redirect(url);
  }

  try {
    // Verify JWT using `jose` (replaces `jsonwebtoken.verify`)

    // Check if the user is an admin
    if (token?.role === false) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("toastMessage", " تحذير: غير مصرح لك بالدخول ");
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
  matcher: ["/admin", "/admin/:path*"],
};
