"use client";

import { createProduct } from "@/app/store/api-calls/productApis";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UploadImage from "./UploadImage";
import { useSelector } from "react-redux";
import { States } from "@/app/store/slices/product-slice";
import { AppDispatch } from "@/app/store/store";
import toast from "react-hot-toast";

const CreateProductForm = () => {
  const [image, setImage] = useState();
  const [shownImage, setShownImage] = useState<any>();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productSizes, setProductSizes] = useState<string[]>([]);

  const { loading } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  // Handle Adding Sizes
  const handleSizeFn = (size: string) => {
    // if (!productSizes) {
    //   setProductSizes([]);
    // }
    const targetSize = productSizes?.find((ele) => ele == size);
    if (targetSize) {
      setProductSizes(() => productSizes.filter((ele) => ele !== size));
      console.log(true);
      console.log(productSizes);
    } else {
      setProductSizes((prev) => [...prev, size]);
      console.log(false);
      console.log(productSizes);
    }
  };

  // Handle Creating Product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!image) return;
    if (!image) return toast.error("صورة المنتج مطلوبة");
    if (!productName) return toast.error("إسم المنتج مطلوب");
    if (!productPrice) return toast.error("سعر المنتج مطلوب");
    if (!productCategories) return toast.error("نوع المنتج مطلوب");
    if (!productColor) return toast.error("لون المنتج مطلوب");
    if (!productSizes[0]) return toast.error("مقاس المنتج مطلوب");
    // Convert image file to base64
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      try {
        dispatch(
          createProduct({
            name: productName,
            price: productPrice,
            color: productColor,
            category: productCategories,
            image: reader.result as string, // Send base64 image data
            sizes: productSizes ? productSizes : [],
          })
        );

        setProductName("");
        setProductPrice("");
        setProductCategories("");
        setProductColor("");
        setProductSizes([]);
        shownImage(undefined);
      } catch (error) {
        console.log(`From Client Create Product ${error}`);
      }
    };
  };
  return (
    <div className="">
      <UploadImage
        setShownImage={setShownImage}
        setImage={setImage}
        shownImage={shownImage}
      />
      <div className="w-full mt-3 bg-white rounded-lg">
        <h6 className="text-[16px] p-3 border-b font-medium text-[#111111]">
          Product Information
        </h6>
        <form
          onSubmit={handleSubmit}
          className=" p-3 text-sm flex gap-x-3 gap-y-4 lg:gap-y-9 flex-wrap"
        >
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="name" className=" text-[16px] font-medium">
              Product Name
            </label>
            <input
              value={productName}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="Item Name"
              id="name"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="name" className=" text-[16px] font-medium">
              Product Price
            </label>
            <input
              value={productPrice}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="Item Price"
              id="price"
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          {/* <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="addCategory" className=" text-[16px] font-medium">
              Add New Category
            </label>
            <input
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="New Category"
              id="addCategory"
            />
          </div> */}
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <p className=" text-[16px] font-medium">Product Categories</p>
            <div className="flex w-full gap-2 flex-wrap p-1 border rounded">
              <div className="flex gap-1 w-[60px] justify-between ">
                <label htmlFor="shirt">قمصان</label>
                <input
                  value="قمصان"
                  name="categories"
                  type="radio"
                  id="shirt"
                  onChange={(e) => setProductCategories(e.target.value)}
                />
              </div>

              <div className="flex gap-1 w-[60px] justify-between ">
                <label htmlFor="jacket">جواكيت</label>
                <input
                  value="جواكيت"
                  name="categories"
                  type="radio"
                  id="jacket"
                  onChange={(e) => setProductCategories(e.target.value)}
                />
              </div>

              <div className="flex gap-1 w-[60px] justify-between ">
                <label htmlFor="jacket">إسدال</label>
                <input
                  value="إسدال"
                  name="categories"
                  type="radio"
                  id="jacket"
                  onChange={(e) => setProductCategories(e.target.value)}
                />
              </div>
              <div className="flex gap-1 w-[60px] justify-between ">
                <label htmlFor="dresses">فساتين</label>
                <input
                  value="فساتين"
                  name="categories"
                  type="radio"
                  id="dresses"
                  onChange={(e) => setProductCategories(e.target.value)}
                />
              </div>

              <div className="flex gap-1 w-[60px] justify-between ">
                <label htmlFor="jeep">جيب</label>
                <input
                  value="جيب"
                  name="categories"
                  type="radio"
                  id="jeep"
                  onChange={(e) => setProductCategories(e.target.value)}
                />
              </div>

              <div className="flex gap-1 w-[60px] justify-between ">
                <label htmlFor="pants">بناطيل</label>
                <input
                  value="بناطيل"
                  name="categories"
                  type="radio"
                  id="pants"
                  onChange={(e) => setProductCategories(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="color" className=" text-[16px] font-medium">
              Product Color
            </label>
            <input
              value={productColor}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="Item Color"
              id="color"
              onChange={(e) => setProductColor(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className=" text-[16px] font-medium flex items-center gap-2">
              <span>Product Sizes</span>
              <span className="text-[10px] font-semibold text-gray-400">
                (.You have to choose at least 1 size)
              </span>
            </p>
            <div className="flex rounded p-1 border flex-wrap gap-x-[20px] gap-y-3">
              {["XS", "S", "M", "XL", "XXL", "3XL"].map((ele) => (
                <div
                  className={`flex gap-1 items-center max-w-fit lg:max-w-[100%]`}
                  key={ele}
                >
                  <label className="text-[12px]" htmlFor={ele}>
                    {ele}
                  </label>
                  <input
                    type="checkbox"
                    id={ele}
                    className="text-xl"
                    onChange={(e) => handleSizeFn(ele)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full transition-all flex justify-center duration-300 bg-green-800 text-center hover:bg-green-900 rounded-md p-2 my-3 text-white font-semibold"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Create Product</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
