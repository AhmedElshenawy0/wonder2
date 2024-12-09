"use client";
import Link from "next/link";
import "./style.css";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import SubButton from "./SubButton";
import HelpDropDown from "./HelpDropDown";
import { useCallback, useState } from "react";
import CategoryDropDown from "./CategoryDropDown";
import { IoClose } from "react-icons/io5";
import useOnclickOutside from "react-cool-onclickoutside";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setOpenCart } from "@/app/store/slices/user-slice";
import { User_States } from "@/app/types/types";
import { useSelector } from "react-redux";
import { FaBarsStaggered } from "react-icons/fa6";

const Nav = () => {
  const [openHelpMenu, setOpenHelpMenu] = useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [clickNew, setClickNew] = useState(false);
  const [clickBlog, setClickBlog] = useState(false);
  const [clickHome, setClickHome] = useState(true);

  const ref = useOnclickOutside(() => {
    setOpenNav(false);
  });

  const handleClickHome = () => {
    setClickHome(true);
    setOpenHelpMenu(false);
    setOpenCategoryMenu(false);
    setClickBlog(false);
    setClickNew(false);
  };
  const handleOpenHelps = () => {
    setOpenHelpMenu(true);
    setOpenCategoryMenu(false);
    setClickBlog(false);
    setClickNew(false);
    setClickHome(false);
  };
  // const handleOpenCategory = () => {
  //   setOpenCategoryMenu(true);
  //   setOpenHelpMenu(false);
  //   setClickBlog(false);
  //   setClickNew(false);
  //   setClickHome(false);
  // };

  const handleCloseAction = () => {
    setOpenNav(false);
    setOpenHelpMenu(false);
    setOpenCategoryMenu(false);
    setClickHome(false);
  };
  const handleClickNew = () => {
    setOpenHelpMenu(false);
    setOpenCategoryMenu(false);
    setClickNew(true);
    setClickBlog(false);
    setClickHome(false);
  };
  const handleClickBlog = () => {
    setOpenHelpMenu(false);
    setOpenCategoryMenu(false);
    setClickBlog(true);
    setClickNew(false);
    setClickHome(false);
  };
  const { openCart, cart } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const pathName = usePathname();
  const dispatch = useDispatch();

  const handleCartClick = useCallback(() => {
    dispatch(setOpenCart(true));
  }, [dispatch, openCart]);

  return (
    <div className="header fixed top-0 z-[999999999999] w-full ">
      <SubButton />
      <nav className="main-nav flex flex-col bg-white">
        <div className="top-nav-holder  border-b border-black">
          <div className="top-nav h-[3.5rem] mx-3 lg:mx-16  relative justify-between">
            <div className="flex gap-3 justify-end absolute top-[50%] translate-y-[-50%] right-0">
              <IoSearchOutline style={{ fontSize: "15px" }} />
              <div className="relative">
                <FiShoppingCart
                  aria-label="Open Shopping Cart"
                  className=" cursor-pointer"
                  onClick={handleCartClick}
                  style={{ fontSize: "15px" }}
                />
                <span className="absolute -top-2 -right-3 flex justify-center items-center w-[14px] h-[14px] text-[9px] rounded-full bg-green-800 text-white">
                  {cart?.length || 0}
                </span>
              </div>
            </div>
            <Link
              href="/"
              className={` text-[20px] logo font-semibold absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[50%]`}
            >
              WONDER
            </Link>
            {openNav ? (
              <IoClose
                className="lg:hidden absolute top-[50%] translate-y-[-50%] left-0 text-[20px] cursor-pointer"
                onClick={() => setOpenNav(false)}
              />
            ) : (
              <FaBarsStaggered
                className="lg:hidden absolute top-[50%] translate-y-[-50%] left-0 text-[20px] cursor-pointer"
                onClick={() => setOpenNav(true)}
              />
            )}
            <div
              ref={ref}
              style={{
                clipPath: openNav
                  ? "polygon(100% 0, 0 0, 0 100%, 100% 100%)"
                  : "",
              }}
              className="links-holder transition-all duration-500 z-20"
            >
              <ul className="flex lg:items-center lg:gap-3 links  lg:absolute lg:top-[50%] lg:h-full lg:translate-y-[-50%] lg:left-0">
                <li
                  className={`hidden lg:block ${
                    pathName == "/" ? "sub-new" : ""
                  }`}
                  onClick={handleClickHome}
                >
                  <Link href="/">الرئيسية</Link>
                </li>
                <li
                  className={`hidden lg:block ${
                    pathName == "/products" ? "sub-new" : ""
                  }`}
                  onClick={handleClickNew}
                >
                  <Link href="/products">أحدث المنتجات</Link>
                </li>
                <li
                  className={`hidden lg:block ${clickBlog ? "sub-blog" : ""}`}
                  onClick={handleClickBlog}
                >
                  <Link href="/care-article" className="">
                    المدونة
                  </Link>
                </li>
                <li
                  className={`hidden lg:block ${clickBlog ? "sub-blog" : ""}`}
                  onClick={handleClickBlog}
                >
                  <Link href="/about" className="">
                    من نحن
                  </Link>
                </li>
              </ul>
              <div className="rounded-lg flex flex-col justify-start">
                <CategoryDropDown openNav={openNav} setOpenNav={setOpenNav} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-green-300 hidden lg:block ">
          <HelpDropDown openHelp={openHelpMenu} />
          <CategoryDropDown openCategory={openCategoryMenu} />
        </div> */}
      </nav>
    </div>
  );
};
//
export default Nav;
