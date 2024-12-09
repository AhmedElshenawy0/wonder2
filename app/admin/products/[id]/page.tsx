"use client";
import { getOneProduct } from "@/app/store/api-calls/productApis";
import { States } from "@/app/store/slices/product-slice";
import { ProductType } from "@/app/types/types";
import dynamic from "next/dynamic";
// import Product from "@/components/one-product/Product";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ProductComp = dynamic(() => import("@/components/one-product/Product"));

const page = ({ params }: { params: { id: number } }) => {
  const { oneProduct } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );
  console.log(oneProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProduct(params?.id));
  }, [params.id]);

  return (
    <div>
      {oneProduct.id ? (
        <>
          <ProductComp data={oneProduct && oneProduct} />
          <div className="mt-4 bg-white rounded">
            <div className="flex justify-between items-center p-2 border-b">
              <h5>عمليات البيع</h5>
              <p>{oneProduct.sales?.length} عملية</p>
            </div>
            {oneProduct.sales?.length! > 0 &&
              oneProduct.sales?.map((ele) => (
                <div className="p-2">
                  {ele.user.userName}
                  {ele.count}
                </div>
              ))}
          </div>
        </>
      ) : (
        <h1 className="text-3xl">Loading....</h1>
      )}
    </div>
  );
};

export default page;
