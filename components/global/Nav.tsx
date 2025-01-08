"use client";
import Link from "next/link";
import "./style.css";
import { FiShoppingCart } from "react-icons/fi";
import SubButton from "./SubButton";
import { useCallback, useEffect, useState } from "react";
import CategoryDropDown from "./CategoryDropDown";
import { IoClose } from "react-icons/io5";
import useOnclickOutside from "react-cool-onclickoutside";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOpenCart } from "@/app/store/slices/user-slice";
import { User_States } from "@/app/types/types";
import { useSelector } from "react-redux";
import { FaBarsStaggered } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Session {
  update: any;
  status: any;
  data?: {
    user?: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
      isAdmin?: boolean; // Add this line to extend the type
    };
  } | null;
}
const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const pathName = usePathname();
  const dispatch = useDispatch();
  const session: Session = useSession();
  const router = useRouter();

  // Close Nav When Click Outside
  // const ref = useOnclickOutside(() => {
  //   setOpenNav(false);
  // });

  // Getting OpenCart Function And Cart Array From RTK
  const { cart } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  // Handle Clicking On The Cart Icon
  const handleCartClick = useCallback(() => {
    session.data?.user?.email
      ? dispatch(setOpenCart(true))
      : toast.error("يجب عليك التسجيل أولا", {
          style: {
            border: "1px solid #003322",
            padding: "16px",
            color: "#003322",
          },
          iconTheme: {
            primary: "#003322",
            secondary: "#FFFAEE",
          },
        });
  }, [dispatch, session.data?.user?.email]);

  // Ensure That Render Done To Show Cart products Number
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="fixed top-0 z-[999999999999] w-full ">
      <SubButton />
      <nav className="flex flex-col bg-white overflow-hidden">
        <div className="border-b border-black">
          <div className="h-fit mx-3 lg:mx-10 relative flex justify-between items-center min-h-[53px]">
            <div className="flex gap-4 lg:gap-5 items-center">
              {session.data?.user?.email ? (
                <button
                  className="py-1 px-2 border border-black text-black hover:bg-black rounded-md hover:text-white transition text-sm font-semibold"
                  onClick={() => signOut()}
                >
                  Signout
                </button>
              ) : (
                <button
                  className="py-1 px-2 border border-black text-black hover:bg-black rounded-md hover:text-white transition text-sm font-semibold"
                  onClick={() => router.push("/register")}
                >
                  Signup
                </button>
              )}
              <div className="relative">
                <FiShoppingCart
                  aria-label="Open Shopping Cart"
                  className=" cursor-pointer"
                  onClick={handleCartClick}
                  style={{ fontSize: "15px" }}
                />
                {isClient && session.data?.user?.email && (
                  <span className="absolute -top-2 -right-3 flex justify-center items-center w-[14px] h-[14px] text-[9px] rounded-full bg-green-800 text-white">
                    {cart?.length ? cart.length : 0}
                  </span>
                )}
              </div>
            </div>

            {openNav ? (
              <button
                className="lg:hidden absolute top-[50%] translate-y-[-50%] left-0 text-[20px] cursor-pointer"
                onClick={() => setOpenNav(false)}
              >
                <IoClose />
              </button>
            ) : (
              <button
                className="lg:hidden absolute top-[50%] translate-y-[-50%] left-0 text-[20px] cursor-pointer"
                onClick={() => setOpenNav(true)}
              >
                <FaBarsStaggered />
              </button>
            )}
            <div
              // ref={ref}
              style={{
                clipPath: openNav
                  ? "polygon(100% 0, 0 0, 0 100%, 100% 100%)"
                  : "",
              }}
              className="links-holder transition-all duration-500 z-20"
            >
              <ul className="flex lg:items-center links">
                <li
                  className={`hidden lg:flex justify-center items-center ${
                    pathName == "/" ? "border-b border-black font-semibold" : ""
                  }`}
                >
                  <Link href="/" className="text-[13px] ">
                    الرئيسية
                  </Link>
                </li>
                <li
                  className={`hidden lg:flex justify-center items-center ${
                    pathName == "/products"
                      ? "border-b border-black font-semibold"
                      : ""
                  }`}
                >
                  <Link href="/products" className="text-[13px] ">
                    أحدث المنتجات
                  </Link>
                </li>
                <li
                  className={`hidden lg:flex justify-center items-center ${
                    pathName == "/care-article"
                      ? "border-b border-black font-semibold"
                      : ""
                  }`}
                >
                  <Link href="/care-article" className="text-[13px] ">
                    المدونة
                  </Link>
                </li>
                <li
                  className={`hidden lg:flex justify-center items-center ${
                    pathName == "/about"
                      ? "border-b border-black font-semibold"
                      : ""
                  }`}
                >
                  <Link href="/about" className="text-[13px] ">
                    من نحن
                  </Link>
                </li>

                {isClient && session?.data?.user?.isAdmin === true && (
                  <li className={`hidden lg:flex  justify-center items-center`}>
                    <Link
                      href="/admin"
                      className="font-extrabold text-[13px] bg-black text-neutral-200 border border-black py-1 px-2 "
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
              {/* <div className="rounded-lg flex flex-col justify-start"> */}
              <CategoryDropDown openNav={openNav} setOpenNav={setOpenNav} />
              {/* </div> */}
            </div>
            <Link
              href="/"
              className={`relative text-[18px] logo font-semibold max-lg:absolute max-lg:right-[50%] max-lg:top-[50%] max-lg:translate-y-[-50%] max-lg:translate-x-[50%]`}
            >
              <span className="absolute h-[3px] w-[70%] top-[10px] bg-black -right-2 z-[999999999]"></span>
              <span className="absolute h-[3px] w-[70%] bottom-[10px] bg-black -left-2 z-[999999999]"></span>
              RAVELLE
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
//
export default Nav;
