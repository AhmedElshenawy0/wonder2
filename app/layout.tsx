"use client";
// import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/global/Nav";
import Footer from "@/components/global/footer/Footer";
import Providers from "./store/provider";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import CartPopup from "@/components/cart/CartPopup";
import { usePathname } from "next/navigation";
import { Cairo } from "next/font/google";
import AuthProvider from "@/utils/providers";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Conditionally exclude Nav and Footer for specific routes
  const shouldHideNavAndFooter = pathname.startsWith("/admin");
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} relative`}>
        <Providers>
          {!shouldHideNavAndFooter && <Nav />}

          <Toaster
            position="top-center"
            containerStyle={{ zIndex: "99999999999999999999999" }}
          />
          <div className="">
            <CartPopup />
            <AuthProvider>{children}</AuthProvider>
          </div>
          {!shouldHideNavAndFooter && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
