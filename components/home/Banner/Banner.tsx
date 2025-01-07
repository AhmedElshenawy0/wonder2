"use client";
import { motion } from "framer-motion";
import "./banner.css";
import Image from "next/image";
import image1 from "@/public/images/Choker Neck Dip Hem Striped Top.webp";
import image2 from "@/public/images/Pulôver Catarina - Cinza _ GG.webp";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

const BannerContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const toastMessage = searchParams.get("toastMessage");
  const session = useSession();
  // useEffect(() => {
  //   if (session.data?.isAdmin == false) {
  //     router.replace("/");
  //   }
  // }, []);

  console.log(session.data?.user);
  console.log(session.status);
  console.log(session.update);
  useEffect(() => {
    if (searchParams.get("status") === "welcom") {
      router.replace("/");
      toast.success("Welcome", { duration: 6000 });
      console.log("WELCOME");
    }
  }, [toast, searchParams, router]);

  useEffect(() => {
    if (toastMessage) {
      toast.error(toastMessage, {
        position: "top-center",
        duration: 6000,
      });
      const newUrl = pathname;
      router.replace(newUrl, undefined);
    }
  }, [toastMessage, pathname, router]);

  return (
    <div className="relative banner flex md:justify-start items-center">
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            ease: "easeOut",
            duration: 0.7,
          }}
        >
          <h3 className="font-semibold text-[10px]  max-w-[800px]">
            تألقي بجاذبية لا تقاوم مع أزيائنا الأنيقة
          </h3>
          <p className="md:mb-12 text-center">Ravelle, لأنكي تستحقي</p>
        </motion.div>
        <button
          className={`banner-button text-[16px] z-30 font-medium hidden md:block py-[10px] px-[20px] text-black bg-[#ffffff] hover:bg-neutral-200 transition-all duration-300`}
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

const Banner = () => (
  <Suspense fallback={<div>Loading banner...</div>}>
    <BannerContent />
  </Suspense>
);

export default Banner;
