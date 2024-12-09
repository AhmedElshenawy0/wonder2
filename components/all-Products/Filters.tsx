"use client";
import {
  setCategoryFilter,
  setFilter,
  setPriceFilter,
  States,
} from "@/app/store/slices/product-slice";
import { useDispatch } from "react-redux";
import "./filterComp.css";
import { useSelector } from "react-redux";
import { fetchProducts } from "@/app/store/api-calls/productApis";
import { AppDispatch } from "@/app/store/store";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const Filters = ({
  isOpen,
  onClose,
  categoryFilter,
}: {
  isOpen: boolean;
  onClose: any;
  categoryFilter: string | undefined;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { allProducts, priceFilter } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );

  const HandleCategoryFilter = (e: string) => {
    dispatch(setCategoryFilter(e));
    onClose();
  };

  const HandlePriceFilter = (e: string) => {
    dispatch(setPriceFilter(e));
    onClose();
  };

  const handleGetAllFilter = (e: string) => {
    dispatch(fetchProducts());
    dispatch(setFilter(e));
    onClose();
  };

  return (
    <div className="relative w-fit">
      <div className={`filters bg-white shadow-xl p-6 z-10 overflow-hidden`}>
        <p className="count">
          {allProducts.length} {allProducts.length > 3 ? "منتجات" : "منتج"}
        </p>

        <div className="category-filter">
          <div className="category-input">
            <input
              className="w-[15px] h-[15px]"
              type="radio"
              name="category"
              value="الكل"
              id="all"
              onChange={(e) => handleGetAllFilter(e.target.value)}
            />
            <label
              htmlFor="all"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              الكل
            </label>
          </div>
          <div className="category-input">
            <input
              className="w-[15px] h-[15px]"
              type="radio"
              name="category"
              id="Dresses"
              value="فساتين"
              onChange={(e: any) => HandleCategoryFilter(e.target.value)}
            />
            <label
              htmlFor="Dresses"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              فساتين
            </label>
          </div>
          <div className="category-input">
            <input
              className="w-[15px] h-[15px]"
              type="radio"
              name="category"
              id="pants"
              value="بناطيل"
              onChange={(e: any) => HandleCategoryFilter(e.target.value)}
            />
            <label
              htmlFor="pants"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              بناطيل
            </label>
          </div>
          <div className="category-input">
            <input
              className="w-[15px] h-[15px]"
              type="radio"
              name="category"
              id="jacket"
              value="جاكيت"
              onChange={(e: any) => HandleCategoryFilter(e.target.value)}
            />
            <label
              htmlFor="jacket"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              جواكيت
            </label>
          </div>
          <div className="category-input">
            <input
              className="w-[15px] h-[15px]"
              type="radio"
              name="category"
              id="shirt"
              value="قمصان"
              onChange={(e: any) => HandleCategoryFilter(e.target.value)}
            />
            <label
              htmlFor="shirt"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              قمصان
            </label>
          </div>
        </div>

        {/* <!-- Start Price Filter --> */}

        <div className="price-filter ">
          <div className="flex flex-row-reverse justify-between items-center">
            <input
              type="radio"
              id="low"
              name="price"
              value="low"
              className="w-4 h-4"
              onChange={(e: any) => HandlePriceFilter(e.target.value)}
            />
            <label
              htmlFor="low"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              أقل سعر
            </label>
          </div>
          <div className="flex flex-row-reverse justify-between items-center">
            <input
              type="radio"
              id="high"
              className="w-4 h-4"
              name="price"
              value="high"
              onChange={(e: any) => HandlePriceFilter(e.target.value)}
            />
            <label
              htmlFor="high"
              className="text-[13px] font-medium text-gray-900 dark:text-gray-500"
            >
              أعلي سعر
            </label>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`responsive-designed-filter`}>
          <div className="category-filter">
            <div className="category-input">
              <input
                className="checkmark hidden lg:block"
                type="radio"
                name="category"
                value="الكل"
                id="all"
                onChange={(e) => handleGetAllFilter(e.target.value)}
              />
              <label
                htmlFor="all"
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  categoryFilter == "الكل" ? "bg-gray-200" : "bg-white"
                }`}
              >
                <span>الكل</span>
                <IoCheckmarkCircleSharp
                  className={` ${
                    categoryFilter == "الكل" ? "block" : "hidden"
                  }`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
            </div>
            <div className="category-input">
              <input
                className="checkmark  hidden lg:block"
                type="radio"
                name="category"
                id="Dresses"
                value="فساتين"
                onChange={(e: any) => HandleCategoryFilter(e.target.value)}
              />
              <label
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  categoryFilter == "فساتين" ? "bg-gray-200" : "bg-white"
                }`}
                htmlFor="Dresses"
              >
                <span>فساتين</span>
                <IoCheckmarkCircleSharp
                  className={` ${
                    categoryFilter == "فساتين" ? "block" : "hidden"
                  }`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
            </div>
            <div className="category-input">
              <input
                className="checkmark  hidden lg:block"
                type="radio"
                name="category"
                id="pants"
                value="بناطيل"
                onChange={(e: any) => HandleCategoryFilter(e.target.value)}
              />
              <label
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  categoryFilter == "بناطيل" ? "bg-gray-200" : "bg-white"
                }`}
                htmlFor="pants"
              >
                <span>بناطيل</span>
                <IoCheckmarkCircleSharp
                  className={` ${
                    categoryFilter == "بناطيل" ? "block" : "hidden"
                  }`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
            </div>
            <div className="category-input">
              <input
                className="checkmark  hidden lg:block"
                type="radio"
                name="category"
                id="jacket"
                value="جواكيت"
                onChange={(e: any) => HandleCategoryFilter(e.target.value)}
              />
              <label
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  categoryFilter == "جاكيت" ? "bg-gray-200" : "bg-white"
                }`}
                htmlFor="jacket"
              >
                <span>جواكيت</span>

                <IoCheckmarkCircleSharp
                  className={` ${
                    categoryFilter == "جاكيت" ? "block" : "hidden"
                  }`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
            </div>
            <div className="category-input">
              <input
                className="checkmark  hidden lg:block"
                type="radio"
                name="category"
                id="shirt"
                value="قمصان"
                onChange={(e: any) => HandleCategoryFilter(e.target.value)}
              />
              <label
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  categoryFilter == "قمصان" ? "bg-gray-200" : "bg-white"
                }`}
                htmlFor="shirt"
              >
                <span>قمصان</span>
                <IoCheckmarkCircleSharp
                  className={` ${
                    categoryFilter == "قمصان" ? "block" : "hidden"
                  }`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
            </div>
          </div>

          {/* <!-- Start Price Filter --> */}

          <div className="price-filter ">
            <div className="price-input">
              <label
                htmlFor="low"
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  priceFilter == "low" ? "bg-gray-200" : "bg-white"
                }`}
              >
                <span>أقل سعر</span>
                <IoCheckmarkCircleSharp
                  className={` ${priceFilter == "low" ? "block" : "hidden"}`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
              <input
                className="hidden"
                type="radio"
                id="low"
                name="price"
                value="low"
                onChange={(e: any) => HandlePriceFilter(e.target.value)}
              />
            </div>
            <div className="price-input">
              <label
                htmlFor="high"
                className={`border flex justify-between items-center w-full p-2 rounded-md cursor-pointer ${
                  priceFilter == "high" ? "bg-gray-200" : "bg-white"
                }`}
              >
                <span>أعلي سعر</span>{" "}
                <IoCheckmarkCircleSharp
                  className={`${priceFilter == "high" ? "block" : "hidden"}`}
                  color="green"
                  fontSize={"17px"}
                />
              </label>
              <input
                className="hidden"
                type="radio"
                id="high"
                name="price"
                value="high"
                onChange={(e: any) => HandlePriceFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
