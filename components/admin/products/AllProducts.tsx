"use client";
import { States } from "@/app/store/slices/product-slice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableTitle from "../GlobaleAdmin/TableTitle";
import GlobaleDots from "../GlobaleAdmin/GlobaleDots";
import "./adminProducts.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import UpdateProduct from "./UpdateProduct";
import Link from "next/link";
import {
  deleteProduct,
  fetchProducts,
} from "@/app/store/api-calls/productApis";
import { LuEye } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { AppDispatch } from "@/app/store/store";

const AllProducts = () => {
  const { allProducts } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  //===> Fetch Products <===//
  const fetchProductsFn = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    fetchProductsFn();
  }, [fetchProductsFn]);

  //===> Pagination <===//
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIndex, setFirstIndex] = useState<number>();
  const [lastIndex, setLastIndex] = useState<number>();

  const ProductPerPage: number = 10;

  useEffect(() => {
    setFirstIndex((currentPage - 1) * ProductPerPage);
    setLastIndex(currentPage * ProductPerPage);
  }, [currentPage]);

  const totalPages: number = Math.ceil(allProducts?.length / ProductPerPage);

  const paginationHandleClick = (e: number) => {
    setCurrentPage(e);
  };

  //===> Update <===//

  const [openUpdatePopup, setOpenUpdatePopup] = useState<boolean>(false);
  const [product, setProduct] = useState<number>();

  const handleUpdate = (ele: any) => {
    setOpenUpdatePopup(true);
    setProduct(ele);
  };

  //===> Delete <===//
  const handleDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="relative bg-white rounded-xl mt-16">
      <TableTitle>جدول العملاء</TableTitle>

      <div className="relative rounded-lg bg-white pb-12 pt-[70px]  overflow-x-scroll">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500">
          <thead className="text-xs bg-[#003322b2] text-[#ffffff]">
            <tr className="text-[14px]">
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                المنتح
              </th>
              <th scope="col" className="px-6 py-3">
                السعر
              </th>
              <th scope="col" className="px-6 py-3">
                المخزون
              </th>
              <th scope="col" className="px-6 py-3">
                النوع
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts ? (
              allProducts.slice(firstIndex, lastIndex).map((ele, i) => (
                <tr
                  key={ele?.id}
                  className="border-r border-l border-b border-[#00332249] text-[13px] "
                >
                  <td className="px-6 py-4 font-medium text-start">
                    {i + 1 + firstIndex!}
                  </td>
                  <td className="px-6 py-4 min-w-[230px] text-black font-bold flex items-center justify-start gap-3">
                    <Image
                      src={ele.image}
                      alt="product-image"
                      width={50}
                      height={50}
                      className="object-cover rounded-md aspect-[1.1/1.1] border"
                    />
                    <div className="flex flex-col gap-2">
                      <span>{ele?.name}</span>
                      <div className="flex items-center gap-1">
                        {ele?.sizes?.map((ele) => (
                          <span className="px-1 border" key={ele}>
                            {ele}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-black text-start  min-w-[108px]">
                    {ele?.price} EGP
                  </td>
                  <td className="px-6 py-4 font-semibold text-black  min-w-[120px]">
                    {ele?.price} قطعة
                  </td>
                  <td className="px-6 py-4 font-semibold text-black  min-w-[90px]">
                    {ele?.category}
                  </td>
                  <td className="px-6 py-4 gap-1 font-medium min-w-[160px] text-black">
                    <button className="py-1 px-2 h-[100%] mx-1 ">
                      <Link href={`/admin/products/${ele?.id}`} className="">
                        <LuEye color="green" width={40} />
                      </Link>
                    </button>
                    <button
                      className="py-1 px-2  h-[100%] mx-1 "
                      onClick={() => handleUpdate(ele)}
                    >
                      <CiEdit color="green" width={40} />
                    </button>
                    <button
                      className="py-1 px-2  h-[100%] mx-1 "
                      onClick={() => handleDelete(ele.id)}
                    >
                      <MdOutlineDelete color="green" width={40} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>There Are No Products Here</p>
            )}
          </tbody>
        </table>
        <GlobaleDots
          totalPages={totalPages}
          currentPage={currentPage}
          paginationHandleClick={paginationHandleClick}
        />
      </div>

      {openUpdatePopup && (
        <UpdateProduct
          openUpdatePopup={openUpdatePopup}
          setOpenUpdatePopup={setOpenUpdatePopup}
          product={product!}
        />
      )}
    </div>
  );
};

export default AllProducts;
