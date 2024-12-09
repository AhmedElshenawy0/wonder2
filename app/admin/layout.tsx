"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardSidebar from "@/components/admin/sidebar/Dashboard-Sidebar";
import { BiLogOut } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { Toaster } from "react-hot-toast";
import { Cairo } from "next/font/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  const logOutFn = () => {
    localStorage.removeItem("userID");
    const router = useRouter();

    router.replace("/");
  };

  return (
    <div className={`${cairo.className}bg-[#d5f0c19f] min-h-[100vh] relative`}>
      <DashboardSidebar />
      <ToastContainer
        theme="colored"
        position="bottom-left"
        style={{ fontSize: "12px", zIndex: 999999999 }}
      />
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-0 relative lg:-left-[250px] mt-[50px] lg:mt-0 -left-0 top-0 pt-3 pb-1 px-5 w-full z-50 lg:w-[calc(100%-250px)]">
        <div>
          <h5 className="font-medium">
            <span>لوحة التحكم</span> /{" "}
            <span>
              {path == "/admin"
                ? "الرئيسية"
                : path == "/admin/products"
                ? "المنتجات"
                : path == "/admin/users"
                ? "العملاء"
                : path == "/admin/create-product"
                ? "إضافة منتجات"
                : ""}
            </span>
          </h5>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <input
              className=" outline-none py-1 px-2 text-[14px] w-[200px] border rounded-lg"
              type="search"
              placeholder="Search"
            />
          </div>
          <button
            onClick={logOutFn}
            className="flex items-center gap-1 text-[14px] text-[#607d8b] font-medium"
          >
            <BiLogOut className="text-[#607d8b]" />
            Logout
          </button>

          <div className="text-[14px] text-[#607d8b]">
            <IoNotifications />
          </div>
        </div>
      </div>
      <div className=" relative lg:-left-[250px] py-2 px-4 w-full lg:w-[calc(100%-250px)]">
        {children}
      </div>
    </div>
  );
}
// d4e7c5a8
