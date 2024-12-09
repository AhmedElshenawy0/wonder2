"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import "./footer.css";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { HiMinus } from "react-icons/hi";

const MainFooter = () => {
  const [openAccount, setOpenAccount] = useState<boolean>(false);
  const [openCompany, setOpenCompany] = useState<boolean>(false);
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [openConnect, setOpenConnect] = useState<boolean>(false);
  return (
    <div className="flex main-footer flex-col lg:flex-row lg:justify-center  ">
      <div className="account mb-4 lg:mb-0 flex flex-col w-full lg:w-[12rem] border-b border-[#e1e0e067] lg:border-none">
        <h2 className=" px-[1.2rem] lg:px-0 flex items-center gap-2">
          {!openAccount ? (
            <FiPlus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenAccount(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenAccount(false)}
            />
          )}
          الحساب
        </h2>
        <div
          style={{
            clipPath: openAccount
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "",
            height: openAccount ? "100%" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] px-[1.2rem] lg:px-0 pb-2 lg:pb-0"
        >
          <p>دخول</p>
          <p>حساب جديد</p>
          <p>استعادة كلمة المرور</p>
        </div>
      </div>
      <div className="company mb-4 lg:mb-0 flex flex-col w-full lg:w-[12rem] border-b border-[#e1e0e067] lg:border-none">
        <h2 className=" px-[1.2rem] lg:px-0 flex items-center gap-2">
          {!openCompany ? (
            <FiPlus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenCompany(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenCompany(false)}
            />
          )}
          وندر
        </h2>
        <div
          style={{
            clipPath: openCompany
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "",
            height: openCompany ? "100%" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] px-[1.2rem] lg:px-0 pb-2 lg:pb-0"
        >
          <p>عن الشركة</p>
          <p>رؤيتنا</p>
          <p>وظائف</p>
          <p>الاسئلة الشائعة</p>
        </div>
      </div>
      <div className="get-help mb-4 lg:mb-0 flex flex-col w-full lg:w-[12rem] border-b border-[#e1e0e067] lg:border-none">
        <h2 className=" px-[1.2rem] lg:px-0 flex items-center gap-2">
          {!openHelp ? (
            <FiPlus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenHelp(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenHelp(false)}
            />
          )}
          المساعدة
        </h2>
        <div
          style={{
            clipPath: openHelp ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
            height: openHelp ? "100%" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] px-[1.2rem] lg:px-0 pb-2 lg:pb-0"
        >
          <p>الشحن والاسترجاع</p>
          <p>جدول المقاسات</p>
          <p>طرق الدفع</p>
        </div>
      </div>
      <div className="connect mb-4 lg:mb-0 flex flex-col w-full lg:w-[12rem] border-b border-[#e1e0e067] lg:border-none">
        <h2 className=" px-[1.2rem] lg:px-0 flex items-center gap-2">
          {!openConnect ? (
            <FiPlus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenConnect(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer lg:hidden"
              onClick={() => setOpenConnect(false)}
            />
          )}
          اتصل بنا
        </h2>
        <div
          style={{
            clipPath: openConnect
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "",
            height: openConnect ? "100%" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] px-[1.2rem] lg:px-0 pb-2 lg:pb-0"
        >
          <p>فيسبوك</p>
          <p>انستجرام</p>
          <p>تيك توك</p>
          <p>سناب شات</p>
          <p>لينكد ان</p>
        </div>
      </div>
      <div className=" email-address flex items-center px-[2.2rem] lg:px-0  mt-5 lg:mt-0">
        <input
          type="text"
          placeholder="إشترك ببريدك الإلكتروني"
          className="w-full lg:w-[23rem] text-[0.9rem]  h-[3.2rem] px-[0.5rem] outline-none"
        />
        <div className="p-2 bg-black w-[3.2rem] h-[3.2rem] cursor-pointer flex justify-center items-center">
          <FaArrowLeftLong className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
