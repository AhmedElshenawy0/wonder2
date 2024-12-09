"use client";
import { FaUsers } from "react-icons/fa";
import { NumberTicker } from "./NumberTicker";
import { useSelector } from "react-redux";
import { User_States } from "@/app/types/types";
import { States } from "@/app/store/slices/product-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/app/store/api-calls/user-api";
import { fetchProducts } from "@/app/store/api-calls/productApis";
import { AppDispatch } from "@/app/store/store";

const DashHome = () => {
  const { productsCount } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );
  const { usersCount } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  // console.log(users);
  // console.log(allProducts);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="px-2 ">
      <div className="mt-7 flex gap-3 flex-wrap">
        <div className="flex-1 border min-w-[100%] sm:min-w-[45%] lg:min-w-[160px] bg-[#ffffff] py-4 px-3 rounded-lg">
          <div className="flex items-center justify-between flex-row-reverse">
            <div className="p-1 bg-[#003322] w-fit h-fit rounded-md">
              <FaUsers color="white" />
            </div>
            <div className="flex flex-col items-center">
              <p>العملاء</p>
              <p className="whitespace-pre-wrap text-[16px] font-medium tracking-tighter text-black ">
                <small>{usersCount} </small>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 border min-w-[100%] sm:min-w-[45%] lg:min-w-[160px] bg-[#ffffff] py-4 px-3 rounded-lg">
          <div className="flex items-center justify-between flex-row-reverse">
            <div className="p-1 bg-[#003322] w-fit h-fit rounded-md">
              <FaUsers color="white" />
            </div>
            <div className="flex flex-col items-center">
              <p>المنتجات</p>
              <p className="whitespace-pre-wrap text-[16px] font-medium tracking-tighter text-black ">
                <small>{productsCount}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
