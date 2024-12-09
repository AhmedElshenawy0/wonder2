"use client";
import Link from "next/link";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./sidebare.css";
import dynamic from "next/dynamic";

const Links = dynamic(() => import("./Links"));

const DashboardSidebar = () => {
  const [openDashboardNav, setOpenDashboardNav] = useState<boolean>(false);
  return (
    <div className="w-full lg:w-[250px] px-2 lg:px-0 fixed top-0 lg:top-[50%] z-[100] h-[40px] lg:translate-y-[-50%] bg-[#ffffff] lg:border lg:h-[100vh] ">
      <div className="h-[100%] p-2 flex flex-col gap-2 relative">
        <div className="flex items-center justify-between lg:justify-end w-full">
          <button
            className={`${
              openDashboardNav ? "hidden" : "block"
            } pointer lg:hidden`}
            onClick={() => setOpenDashboardNav(true)}
          >
            <FaBarsStaggered />
          </button>
          <button
            className={`${
              !openDashboardNav ? "hidden" : "block"
            } pointer lg:hidden`}
            onClick={() => setOpenDashboardNav(false)}
          >
            <AiOutlineClose />
          </button>
          <Link
            href="/admin "
            className=" text-[20px] font-semibold flex lg:justify-end lg:border-b lg:pb-3 border-[#00332231] items-center gap-1 lg:mb-5"
          >
            Wonder Dashboard
            <TbLayoutDashboardFilled />
          </Link>
        </div>
        <Links
          openDashboardNav={openDashboardNav}
          setOpenDashboardNav={setOpenDashboardNav}
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
