import { fetchUsers } from "@/app/store/api-calls/user-api";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const UpdateUser = ({
  openUpdatePopup,
  setOpenUpdatePopup,
  user,
}: {
  user: any;
  setOpenUpdatePopup: any;
  openUpdatePopup: boolean;
}) => {
  const [userName, setUserName] = useState<string>(user?.userName);
  const [email, setEmail] = useState<string>(user?.email);
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<number | any>(user?.phone);
  const [isAdmin, setIsAdmin] = useState<boolean>(user?.isAdmin);
  const dispatch = useDispatch();

  console.log(user?.userName);
  console.log(isAdmin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios
      .put(`/api/users/${user.id}`, {
        userName,
        password,
        phone,
        isAdmin,
      })
      .then((res) => {
        console.log(res);
        toast.success("User has been updated successfully");
        setOpenUpdatePopup(false);
        dispatch(fetchUsers());
      })
      .catch((err) => {
        console.log(err);
        toast.error("Faild to update user");
      });
  };

  return (
    <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className=" text-2xl font-bold mb-4 shadow-none">Update User</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              id="name"
              value={userName}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              id="phone"
              value={phone}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="isAdmin">
              <span>Is Admin</span>
            </label>
            <div
              className="mt-1 flex gap-3 items-center cursor-pointer w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              onClick={() => setIsAdmin((prev) => !prev)}
            >
              <span>{isAdmin ? "True" : "False"}</span>
              <span className="text-[10px] font-semibold text-gray-400">
                Click To Change
              </span>
            </div>
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

export default UpdateUser;
