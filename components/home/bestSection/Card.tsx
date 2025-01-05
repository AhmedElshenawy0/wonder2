import Image from "next/image";
import React, { useState } from "react";
import styles from "./bestSeller.module.css";
import { useRouter } from "next/navigation";
import { MdOutlineOpenInNew } from "react-icons/md";
import toast from "react-hot-toast";
import ProductInfoPopup from "@/components/one-product/ProductInfoPopup";
import RegisterPopup from "@/components/global/user/RegisterPopup";
import { useSession } from "next-auth/react";

const Card = ({ ele }: any) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${ele.id}`);
  };

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [productInfoBeforeAdd, setProductInfoBeforeAdd] = useState(false);

  const session = useSession();

  const handleAddToCart = () => {
    if (session.status == "authenticated") {
      setProductInfoBeforeAdd(true);
    } else {
      toast.error("سجل الان لتتمكن من إضافة المنتجات");
    }
  };
  const closePopup = () => setIsPopupOpen(false);
  const closeProductInfo = () => setProductInfoBeforeAdd(false);
  return (
    <div
      className={`${styles.card} transition-all duration-500 shadow-md relative cursor-pointer bg-white rounded-[4px] w-[100%] flex text-black flex-col justify-between`}
    >
      {/* <small className=" absolute top-2 right-2 bg-green-800 text-[#ffffff] px-2 py-1 font-semibold">
        جديد !
      </small> */}
      <Image
        src={ele.image}
        alt=""
        className={`${styles.image}`}
        width={300}
        height={300}
      />
      <div
        className={`${styles.overlay} z-50 absolute cursor-pointer w-full aspect-[1/0.9] flex transition-all duration-[1.1s] justify-center items-center`}
      >
        <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-black opacity-70  " />
        <button
          onClick={handleClick}
          // style={{ textShadow: "0 0 7px white" }}
          className=" z-20 text-white text-[16px] flex gap-2 items-center"
        >
          <MdOutlineOpenInNew color="white" />
          <span> رؤية المزيد</span>
        </button>
      </div>
      <div className="flex flex-col gap-1 w-full mt-3 mb-2 px-1 justify-center items-center">
        <h3 className="text-[13px] font-[600]">{ele.name}</h3>
        <p className="text-[13px] font-[700] flex gap-2 items-center">
          {ele.price} EGP
          <span className=" line-through font-[400] text-[11px]">
            {ele.price + Math.floor(Math.random() * 70)} EGP
          </span>
        </p>
      </div>
      <div className="px-1 w-full mb-1 flex justify-center">
        <span
          className={`${styles.color}`}
          style={{
            backgroundColor: `${ele.color}`,
          }}
        ></span>
      </div>
      <button
        onClick={handleAddToCart}
        className="py-2 w-[60%] mt-2 mb-3 mx-auto rounded bg-black text-white text-sm"
      >
        أضف الآن
      </button>
      {isPopupOpen && (
        <RegisterPopup isSignUpOpen={isPopupOpen} onClose={closePopup} />
      )}

      {productInfoBeforeAdd && (
        <ProductInfoPopup
          product={ele}
          isOpen={productInfoBeforeAdd}
          onClose={closeProductInfo}
        />
      )}
    </div>
  );
};

export default Card;
