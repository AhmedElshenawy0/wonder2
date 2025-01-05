import { ProductType, User_States } from "@/app/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductInfoPopup from "../one-product/ProductInfoPopup";
import LoginPopup from "../global/user/LoginPopup";
import styles from "../../app/products/[productId]/product.module.css";
import RegisterPopup from "../global/user/RegisterPopup";
import { useSession } from "next-auth/react";
import { PiRecycle } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Product = ({ data }: { data: ProductType }) => {
  const [selectedImage, setSelectedImage] = useState(data?.image);
  const [selectedColor, setSelectedColor] = useState(data?.color || "");
  const [openSignInPopup, setOpenSignInPopup] = useState(false);
  const [openSignUpPopup, setOpenSignUpPopup] = useState(false);
  const [productInfo, setProductInfo] = useState(false);

  useEffect(() => {
    setSelectedImage(data?.image);
    setSelectedColor(data?.color);
  }, [data]);

  //  Handle Resgister Popup
  const router = useRouter();
  const session = useSession();
  console.log(session);

  const handleAddToCart = () => {
    if (session.data?.user?.email) {
      setProductInfo(true);
      setOpenSignUpPopup(false);
    } else {
      toast.error("سجل الان لتتمكن من إضافة المنتجات");
      router.push("/login");
      setProductInfo(false);
    }
  };
  const closePopup = () => {
    setOpenSignInPopup(false);
    setOpenSignUpPopup(false);
  };

  //  Handle Product Info Popup

  const closeProductInfo = () => setProductInfo(false);

  //  Handle Change Color And Image

  const handleColorChange = (val: any) => {
    // if (colorHex !== selectedColor) {
    setSelectedColor(val?.color);
    setSelectedImage(val?.image);
    // }
  };

  const handleOpenSignInPopup = () => {
    setOpenSignInPopup(true);
    setOpenSignUpPopup(false);
  };
  const handleOpenSignUpPopup = () => {
    setOpenSignInPopup(false);
    setOpenSignUpPopup(true);
  };
  return (
    <section className="relative flex flex-col items-center justify-center px-2 py-4 lg:p-8 bg-neutral-100 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative flex justify-center items-center bg-gray-50 p-6">
          <Image
            width={500}
            height={500}
            src={selectedImage}
            alt="product"
            className="rounded transform transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
        <div className="flex flex-col gap-6 p-5 text-right">
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            حريمي / {data?.category}
          </p>
          <h3 className="flex justify-between text-lg lg:text-xl font-bold text-gray-800">
            <span>{data?.name}</span>
            <span className="text-green-700">EGP{data.price}</span>
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-800">
              <strong>اللون :</strong>
            </p>
            <span
              className={`w-4 h-4 rounded-full cursor-pointer shadow-sm`}
              style={{
                backgroundColor: `${data.color}`,
                border: data.color === "#ffffff" ? "1px solid #000" : "",
              }}
              onClick={() => handleColorChange(data)}
            ></span>
            {data.available &&
              data.available.length > 0 &&
              data.available.map((val: any, index: number) => (
                <span
                  key={index}
                  className={`w-4 h-4 rounded-full cursor-pointer shadow-sm`}
                  style={{
                    backgroundColor: `${val.color}`,
                    border: val.color === "#ffffff" ? "1px solid #000" : "",
                  }}
                  onClick={() => handleColorChange(val)}
                ></span>
              ))}
          </div>
          <div className="pb-3">
            <p className="font-semibold text-gray-800">المقاسات المتاحة</p>
            <div className="flex gap-2 mt-2">
              {data.sizes?.map((val: string) => (
                <span
                  key={val}
                  className="inline-block px-3 py-1 text-sm rounded-md  cursor-pointer bg-gray-800 text-white "
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
          <p className="border-b border-gray-300 pb-5 text-sm text-gray-700 mt-2">
            في حال لم يتناسب المقاس معك، نقدم لك سياسة إرجاع مرنة. يمكنك إرجاع
            المنتج خلال 45 يومًا من تاريخ الشراء للحصول على المقاس الصحيح."
          </p>
          <div className="flex justify-end">
            <button
              className="px-6 py-2 w-full bg-green-700 text-white font-bold rounded-md shadow-md hover:bg-green-800 transition"
              onClick={handleAddToCart}
            >
              أضف إالي العربة
            </button>
          </div>
        </div>
      </div>
      {openSignUpPopup && (
        <RegisterPopup isSignUpOpen={openSignUpPopup} onClose={closePopup} />
      )}
      {openSignInPopup && (
        <LoginPopup
          onClose={closePopup}
          handleOpenSignUpPopup={handleOpenSignUpPopup}
        />
      )}
      {productInfo && (
        <ProductInfoPopup
          product={data}
          isOpen={productInfo}
          onClose={closeProductInfo}
        />
      )}
    </section>
  );
};

export default Product;
