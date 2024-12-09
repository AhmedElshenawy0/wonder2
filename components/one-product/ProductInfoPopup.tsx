// components/LoginPopup.js
import { addToCart } from "@/app/store/slices/user-slice";
import { ProductType } from "@/app/types/types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import "./productInfo.css";

const ProductInfoPopup = ({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType;
}) => {
  if (!isOpen) return null;
  console.log(product);

  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>(product?.color);

  // Register
  const dispatch = useDispatch();

  const addProductToCart = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    try {
      console.log({ ...product, quantity, color });
      toast.success("تمت إضافة المنتج إلي عربة التسوق");

      dispatch(addToCart({ ...product, quantity, color }));
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="fixed z-[9999999999] inset-0 flex items-center justify-center bg-black bg-opacity-50 px-3">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[100%] md:w-96">
        <h2 className="text-[14px] lg:text-[16px] font-bold mb-4">
          تأكيد إضافة المنتج إلي عربة التسوق
        </h2>
        <form onSubmit={addProductToCart}>
          <div className="mb-4 flex justify-between">
            <p className="text-[13px] lg:text-[14px]">الإسم</p>
            <p className="text-[13px] lg:text-[14px]">{product.name}</p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="text-[13px] lg:text-[14px]">السعر</p>
            <p className="text-[13px] lg:text-[14px]">
              {+product.price * quantity}
            </p>
          </div>
          <div className="mb-4 flex justify-between">
            <p className="text-[13px] lg:text-[14px]">الكمية</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              className=" outline-none border border-black w-10 text-end rounded text-[13px] lg:text-[14px]"
            />
          </div>
          <div className="mb-4 flex justify-between">
            <p className="text-[13px] lg:text-[14px]">اللون</p>
            <select
              id=""
              onChange={(e) => setColor(e.target.value)}
              className=" cursor-pointer outline-none border border-black rounded text-[13px] lg:text-[14px]"
            >
              <option value={product.color} key={product.color}>
                {product.color}
              </option>
              {product.available?.map((ele) => (
                <option value={ele.color} key={ele.id}>
                  {ele.color}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100%] justify-between gap-1">
            <button
              type="button"
              className="w-[49.5%] text-gray-600 text-[12px] lg:text-[14px] bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={onClose}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="ml-2 bg-blue-600 w-[49.5%] text-[12px] lg:text-[14px] text-white rounded-md px-4 py-2 hover:bg-blue-700"
            >
              أضف إلي العربة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductInfoPopup;
