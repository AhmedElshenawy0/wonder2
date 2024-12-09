"use client";

import { fetchProducts } from "@/app/store/api-calls/productApis";
import { AppDispatch } from "@/app/store/store";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const UpdateProduct = ({
  openUpdatePopup,
  setOpenUpdatePopup,
  product,
}: {
  product: any;
  setOpenUpdatePopup: any;
  openUpdatePopup: boolean;
}) => {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/product/${product?.id}`, {
        name: productName,
        price: +price,
      });
      toast.success("تم تعديل المنتج بنجاح");
      console.log(response.data);
      setOpenUpdatePopup(false);
      dispatch(fetchProducts());
    } catch (error) {
      toast.error("Failed to create user");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] md:w-96">
        <h2 className="text-center text-2xl font-bold mb-4 shadow-none">
          Update Product
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              الإسم
            </label>
            <input
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              id="name"
              value={productName}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              السعر
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              id="price"
              value={price}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setOpenUpdatePopup(false)}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
            >
              تعديل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
