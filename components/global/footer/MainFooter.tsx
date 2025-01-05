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
    <div className="flex main-footer flex-row max-lg:flex-col justify-center  max-lg:justify-start">
      <div className="account mb-4 lg:mb-0 flex flex-col max-lg:w-full w-[12rem] max-lg:border-b max-lg:border-[#e1e0e067] border-none">
        <h2 className=" max-lg:px-[1.2rem] px-0 flex items-center gap-2">
          {!openAccount ? (
            <FiPlus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
              onClick={() => setOpenAccount(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
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
            opacity: openAccount ? "1" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] max-lg:px-[1.2rem] px-0 max-lg:pb-2 pb-0"
        >
          <p>دخول</p>
          <p>حساب جديد</p>
          <p>استعادة كلمة المرور</p>
        </div>
      </div>
      <div className="company max-lg:mb-4 mb-0 flex flex-col max-lg:w-full w-[12rem] max-lg:border-b max-lg:border-[#e1e0e067] border-none">
        <h2 className=" max-lg:px-[1.2rem] px-0 flex items-center gap-2">
          {!openCompany ? (
            <FiPlus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
              onClick={() => setOpenCompany(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
              onClick={() => setOpenCompany(false)}
            />
          )}
          من نحن
        </h2>
        <div
          style={{
            clipPath: openCompany
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "",
            height: openCompany ? "100%" : "",
            opacity: openCompany ? "1" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] px-[1.2rem] lg:px-0 pb-2 lg:pb-0"
        >
          <p>عن الشركة</p>
          <p>رؤيتنا</p>
          <p>وظائف</p>
          <p>الاسئلة الشائعة</p>
        </div>
      </div>
      <div className="get-help max-lg:mb-4 mb-0 flex flex-col w-full lg:w-[12rem] max-lg:border-b max-lg:border-[#e1e0e067] border-none">
        <h2 className=" px-[1.2rem] lg:px-0 flex items-center gap-2">
          {!openHelp ? (
            <FiPlus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
              onClick={() => setOpenHelp(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer  max-lg:block hidden"
              onClick={() => setOpenHelp(false)}
            />
          )}
          المساعدة
        </h2>
        <div
          style={{
            clipPath: openHelp ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
            height: openHelp ? "100%" : "",
            opacity: openHelp ? "1" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] max-lg:px-[1.2rem] px-0 max-lg:pb-2 pb-0"
        >
          <p>الشحن والاسترجاع</p>
          <p>جدول المقاسات</p>
          <p>طرق الدفع</p>
        </div>
      </div>
      <div className="connect get-help max-lg:mb-4 mb-0 flex flex-col w-full lg:w-[12rem] max-lg:border-b max-lg:border-[#e1e0e067] border-none">
        <h2 className=" max-lg:px-[1.2rem] px-0 flex items-center gap-2">
          {!openConnect ? (
            <FiPlus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
              onClick={() => setOpenConnect(true)}
            />
          ) : (
            <HiMinus
              className="text-[#737373] cursor-pointer max-lg:block hidden"
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
            opacity: openConnect ? "1" : "",
          }}
          className="flex flex-col gap-[10px] mt-[0.6rem] max-lg:px-[1.2rem] px-0 max-lg:pb-2 pb-0"
        >
          <p>فيسبوك</p>
          <p>انستجرام</p>
          <p>تيك توك</p>
          <p>سناب شات</p>
          <p>لينكد ان</p>
        </div>
      </div>
      <div className=" email-address flex items-center max-lg:px-[2.2rem] px-0  max-lg:mt-5 mt-0">
        <input
          type="text"
          placeholder="إشترك ببريدك الإلكتروني"
          className="max-lg:w-full w-[23rem] text-[0.9rem]  h-[2.2rem] px-[0.5rem] outline-none"
        />
        <div className="px-2 bg-white border-r border-black w-[2.6rem] h-[2.2rem] cursor-pointer flex justify-center items-center">
          <FaArrowLeftLong className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
