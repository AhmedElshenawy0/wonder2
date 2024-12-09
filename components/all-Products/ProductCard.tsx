"use client";
import { ProductType } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import RegisterPopup from "../global/user/RegisterPopup";
import ProductInfoPopup from "../one-product/ProductInfoPopup";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [productInfoBeforeAdd, setProductInfoBeforeAdd] = useState(false);

  const handleAddToCart = () => {
    if (localStorage.getItem("userID")) {
      setProductInfoBeforeAdd(true);
    } else {
      toast.error("سجل الان لتتمكن من إضافة المنتجات");
      setTimeout(() => {
        setIsPopupOpen(true);
      }, 3000);
    }
  };
  const closePopup = () => setIsPopupOpen(false);
  const closeProductInfo = () => setProductInfoBeforeAdd(false);

  return (
    <div className="product" dir="rtl">
      <div className=" w-full relative cursor-pointer">
        <Image
          src={product?.image}
          alt={product?.name}
          className="image "
          width={200}
          height={200}
          style={{ objectFit: "cover" }}
        />
        <div className="view-info">
          <Link
            href={`/products/${product.id}`}
            style={{ width: "100%", display: "inline-block" }}
            className=""
          >
            <button className="z-20 bg-white text-black py-[3px] px-3 w-full text-center rounded-md font-semibold">
              إعرف المزيد
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            className="z-20 bg-white text-black py-[3px] px-3 w-full text-center rounded-md font-semibold"
          >
            أضف الان
          </button>
        </div>
      </div>

      {/* // Register before add product */}
      {isPopupOpen && (
        <RegisterPopup isOpen={isPopupOpen} onClose={closePopup} />
      )}

      {productInfoBeforeAdd && (
        <ProductInfoPopup
          product={product}
          isOpen={productInfoBeforeAdd}
          onClose={closeProductInfo}
        />
      )}
      <div className="w-[100%] flex flex-col justify-start gap-2">
        <h4 className="text-[13px] font-[600]">{product.name}</h4>
        <p className="text-[13px] font-[700] flex gap-2 items-center">
          {product.price} EGP
          <span className=" line-through font-[400] text-[11px]">
            {product.price + Math.floor(Math.random() * 70)} EGP
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1 w-full">
        {product.available?.map((product, i) => (
          <span
            key={i}
            className="color"
            style={{
              backgroundColor: `${product.color}`,
            }}
          ></span>
        ))}
        <span
          className={`color`}
          style={{
            backgroundColor: `${product.color}`,
          }}
        ></span>
      </div>
    </div>
  );
};

export default ProductCard;
