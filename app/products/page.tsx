"use client";
import { useEffect, useState } from "react";
import "./products.css";
import Products from "@/components/all-Products/Products";
import { useSelector } from "react-redux";
import { States } from "../store/slices/product-slice";
import Filters from "@/components/all-Products/Filters";
import { fetchProducts } from "../store/api-calls/productApis";
import { useDispatch } from "react-redux";
import { Cairo } from "next/font/google";
import { AppDispatch } from "../store/store";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const {categoryFilter} = useSelector((state) => state.productsReducer)
  const { categoryFilter, allProducts, productsCount } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div
      className={`${cairo.className} min-h-[100vh] relative all-products-page-container mt-[86px] lg:mt-[56px] w-full h-full`}
      dir="rtl"
    >
      {/* <!-- Start Filter --> */}
      <div className="responsive-filters  ">
        <p className="count z-50 flex justify-between">
          {productsCount}

          {allProducts.length < 3 ? "منتج" : "منتجات"}
        </p>

        <button
          className="responsive-filter-buttom"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 23 19"
            fill="none"
            className="filter_svg__feather filter_svg__feather-filter everlane-icon styles_filter-toggle__filter-icon__ILXRd"
          >
            <path
              stroke="currentColor"
              d="M.625 3.829h21.75M.625 14.738h21.75"
            ></path>
            <circle
              cx="7.455"
              cy="4"
              r="3.375"
              fill="#fff"
              stroke="currentColor"
            ></circle>
            <circle
              cx="14.999"
              cy="14.909"
              r="3.375"
              fill="#fff"
              stroke="currentColor"
            ></circle>
          </svg>
          {categoryFilter ? categoryFilter : "FILTER"}
        </button>
      </div>
      <Filters
        categoryFilter={categoryFilter}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* <!-- Start All Products Section --> */}
      <div className="products-holder pb-2 pt-2 px-3">
        <div className="page-title">
          <p onClick={() => fetchProducts()} className=" text-[12px]">
            الرئيسية / {categoryFilter ? categoryFilter : "كل المنتجات"}
          </p>

          <h3>ملابس نسائية | ملابس وإكسسوارات - أحدث المنتجات</h3>
        </div>
        <Products />
      </div>
    </div>
  );
};

export default products;
