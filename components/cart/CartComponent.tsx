"use client";
import { ProductType, User_States } from "@/app/types/types";
import Image from "next/image";
// pages/cart.js
import { useState } from "react";
import { useSelector } from "react-redux";
import { LuPlus } from "react-icons/lu";
import { HiMinusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
  deleteFromCart,
  setDecrease,
  setIncrease,
} from "@/app/store/slices/user-slice";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "react-toastify";
import Link from "next/link";

const Cart = () => {
  // Get Cart Product
  const { cart } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const dispatch = useDispatch();

  // Increase Quantity of Product
  const increaseQuantity = (id: number, color: string) => {
    dispatch(setIncrease({ id, color }));
  };

  // Decrease Quantity of Product
  const decreaseQuantity = (id: number, color: string) => {
    dispatch(setDecrease({ id, color }));
  };

  // Delete Product From Cart
  const removeItem = (id: number, color: string) => {
    dispatch(deleteFromCart({ id, color }));
    toast.done("تم حذف المنتج");
  };

  // Total Price
  const getTotalPrice = () =>
    cart
      ?.reduce(
        (total: number, item: ProductType) =>
          total + +item?.price * +item?.quantity,
        0
      )
      .toFixed(2);

  // Hundle Buying Action
  const handleBuying = () => {
    console.log("Buying");
  };
  return (
    <div
      dir="rtl"
      className="flex flex-col gap-3 px-3 md:px-10 py-5 mt-[86px] lg:mt-[86px]"
    >
      <h2>عربة التسوق</h2>
      <div className="flex md:justify-between flex-col md:flex-row md:items-start md:gap-20">
        <div className="cart-products-container flex flex-col md:flex-1">
          {cart?.length > 0 ? (
            cart.map((ele: ProductType) => (
              <div
                className="relative cart-product border-t flex flex-col md:flex-row md:items-center py-3 justify-between w-[100%]"
                key={ele?.id}
              >
                <div className="flex gap-4 items-center h-[100%]">
                  <Image
                    src={ele?.image}
                    alt=""
                    width={105}
                    height={110}
                    className=" rounded"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="flex flex-col h-[100%] gap-5">
                    <h5>{ele?.name}</h5>
                    <p>
                      <small>اللون:</small> {ele?.color}
                    </p>
                    <p className="text-green-700 font-semibold">
                      EGP{ele?.price}
                    </p>
                  </div>
                </div>

                <div className="quantity flex flex-col justify-between mt-4 md:mt-0">
                  <div className="quantity flex items-center gap-3">
                    <button
                      onClick={() => increaseQuantity(ele?.id, ele?.color)}
                      className=" cursor-pointer"
                    >
                      <LuPlus />
                    </button>
                    <small className="py-1 px-2 text-[16px] bg-gray-100 rounded">
                      {ele?.quantity}
                    </small>
                    <button
                      onClick={() => decreaseQuantity(ele?.id, ele?.color)}
                      className=" cursor-pointer"
                    >
                      <HiMinusSmall />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(ele?.id, ele?.color)}
                  className=" absolute left-2 bottom-2"
                >
                  <LuTrash2 />
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="total border-t md:flex-1">
          <div className="border p-5 mt-5 rounded flex flex-col gap-5">
            <div className="sub-total flex justify-between items-center">
              <p className="text-[#737373]">المجموع: </p>
              <p className=" font-semibold">EGP{getTotalPrice()}</p>
            </div>
            <div className="delivery flex justify-between items-center">
              <p className="text-[#737373]">خدمة التوصيل: </p>
              <p className=" font-semibold">EGP 00.00</p>
            </div>
            <div className=" border-t flex justify-between items-center pt-5">
              <p className="text-[#737373]">الإجمالي: </p>
              <p className=" font-semibold">EGP{getTotalPrice()}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleBuying}
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        إشتري الطلب
      </button>
    </div>
  );
};

export default Cart;
