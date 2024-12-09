"use client";
import { motion } from "framer-motion";
import "./banner.css";
import Image from "next/image";
import image1 from "@/public/images/010.webp";
import image2 from "@/public/images/09.webp";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";

const ToastWithSuspence = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const toastMessage = searchParams.get("toastMessage");

  useEffect(() => {
    if (toastMessage) {
      toast.error(toastMessage, {
        position: "top-center",
      });
      const newUrl = pathname;
      router.replace(newUrl, undefined);
    }
  }, [toastMessage]);

  return <></>;
};

const Banner = () => {
  // ===> First Slide Show

  const [count, setCount] = useState(0);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((count) => count + 1);
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  // ===> Second Slide Show
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount2((count2) => count2 + 1);
    }, 2700);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className=" relative banner flex md:justify-start items-center">
      <Suspense fallback={""}>
        <ToastWithSuspence />
      </Suspense>
      <Image
        src={image1}
        alt="logo"
        style={{ objectFit: "cover" }}
        className="w-[100%] md:w-[50%] image-1"
      />
      <Image
        src={image2}
        alt="logo"
        style={{ width: "50%", objectFit: "cover" }}
        className="hidden md:block image-2"
      />
      <div className="absolute text-white h-fit py-4 md:pr-5 md:pl-24 w-[100%] text-center md:text-start flex justify-center flex-col items-center top-[50%] right-0 translate-y-[-50%]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            ease: "easeOut",
            duration: 0.7,
          }}
          className="font-semibold text-[10px]  max-w-[800px]"
        >
          تألقي بجاذبية لا تقاوم مع أزيائنا الأنيقة
        </motion.h2>
        <p className="md:mb-12">wonder, لأنكي تستحقي</p>
        <button
          className={`banner-button text-[18px] lg:text-xl z-30 font-medium hidden md:block`}
        >
          سجل الآن وابدأ التسوق
        </button>
      </div>

      <button
        className={`banner-button-responsive md:hidden text-[18px] lg:text-xl z-30 font-medium`}
      >
        سجل الآن وابدأ التسوق
      </button>
    </div>
  );
};

export default Banner;
