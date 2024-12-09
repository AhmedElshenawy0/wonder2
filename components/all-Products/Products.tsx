"use client";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { States } from "@/app/store/slices/product-slice";
import { useSelector } from "react-redux";

const Products = () => {
  const { allProducts, filteredProduct, category } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );

  return (
    <>
      {!allProducts[0] ? (
        <div className="w-fit flex flex-row items-center flex-wrap gap-3 gap-x-4 gap-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((ele) => (
            <div
              key={ele}
              className="flex flex-col gap-3 animate-pulse min-w-[200px]"
            >
              <div className="h-[170px] bg-gray-100 rounded-xl"></div>
              <p className="p-3 bg-gray-100 mb-1 rounded-xl "></p>
              <p className="p-3 bg-gray-100 rounded-xl "></p>
            </div>
          ))}
          <span className="loading loading-dots loading-lg"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <section className="all-products">
          {category != "الكل"
            ? filteredProduct?.map((ele) => (
                <ProductCard product={ele} key={ele.id} />
              ))
            : allProducts?.map((ele) => (
                <ProductCard product={ele} key={ele.id} />
              ))}
        </section>
      )}
    </>
  );
};

export default Products;
