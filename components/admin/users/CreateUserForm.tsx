"use client";

import { createProduct } from "@/app/store/api-calls/productApis";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { States } from "@/app/store/slices/product-slice";
import { register } from "@/app/store/api-calls/user-api";
import { User_States } from "@/app/types/types";

const CreateUserForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Get loading state from RTK
  const { loading } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const dispatch = useDispatch();

  // Handle Creating Product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(
        register({
          userName,
          email: userEmail,
          password: userPassword,
          phone: userPhone,
        })
      );

      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserPhone("");
    } catch (error) {
      console.log(`From Client Create User ${error}`);
    }
  };

  return (
    <div className="">
      <div className="w-full mt-3 bg-white rounded-lg">
        <form
          onSubmit={handleSubmit}
          className=" p-3 text-sm flex gap-x-3 gap-y-4 lg:gap-y-9 flex-wrap"
        >
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="name" className=" text-[16px] font-medium">
              User Name
            </label>
            <input
              value={userName}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="Item Name"
              id="name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="name" className=" text-[16px] font-medium">
              Email
            </label>
            <input
              value={userEmail}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="Item Price"
              id="price"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="addCategory" className=" text-[16px] font-medium">
              Password
            </label>
            <input
              value={userPassword}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="New Category"
              id="addCategory"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-[100%] lg:w-[49%] gap-2">
            <label htmlFor="color" className=" text-[16px] font-medium">
              Phone
            </label>
            <input
              value={userPhone}
              className=" outline-none border p-1 rounded"
              type="text"
              placeholder="Item Color"
              id="color"
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full transition-all flex justify-center duration-300 bg-green-800 hover:bg-green-900 rounded-md p-2 my-3 text-white font-semibold"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Sign As A Admin</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateUserForm;
