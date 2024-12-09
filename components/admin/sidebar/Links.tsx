"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome } from "react-icons/fa";

const dashboarNav = [
  {
    name: "الرئيسية",
    path: "/admin",
  },
  {
    name: "المنتجات",
    path: "/admin/products",
  },
  {
    name: "العملاء",
    path: "/admin/users",
  },
  {
    name: "إضافة منتج",
    path: "/admin/create-product",
  },
  {
    name: "إضافة عميل ",
    path: "/admin/create-user",
  },
];
const Links = ({ openDashboardNav, setOpenDashboardNav }: any) => {
  const pathname = usePathname();

  return (
    <div
      className={`
    ${
      openDashboardNav ? " absolute right-0 block" : "hidden lg:block"
    } bg-white top-[calc(100%+10px)] lg:top-0 mt-3 lg:mt-0 px-3 py-4 lg:p-0 rounded-lg right-3 z-[200] w-full`}
    >
      {dashboarNav.map((ele) => (
        <Link
          key={ele.name}
          href={ele.path}
          className={`text-[14px] font-semibold flex gap-2 items-center p-2 transition-all duration-500 rounded hover:bg-[#eff2f3] ${
            pathname == ele.path &&
            " bg-gradient-to-r from-[#003322b6] to-[#005e3f] text-[#ffffff] p-2 rounded "
          }`}
          onClick={() => setOpenDashboardNav(false)}
        >
          <FaHome />
          {ele.name}
        </Link>
      ))}
    </div>
  );
};

export default Links;
