"use client";
import { register } from "@/app/store/api-calls/user-api";
import { User_States } from "@/app/types/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "../../../app/register/register.module.css";

const RegisterCom = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();

  const { loading, error, user } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  // =>> Register
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(register(formData));
  };

  const toastMessage = searchParams.get("error");

  useEffect(() => {
    if (user?.userName) {
      console.log("user: ", user);

      toast.success(
        "تم التسجيل بنجاح, أرسلنا لك رسالة تفعيل علي الإيميل الخاص بك",
        { duration: 8000 }
      );
      router.replace("/login");
    }
    if (error) {
      console.log("errrror: ", error);
    }
  }, [error, user, toast]);

  useEffect(() => {
    if (toastMessage == "notFound") {
      toast.error("الإيميل غير موجود, برجاء التسجيل", {
        position: "top-center",
        duration: 8000,
      });
      const newUrl = pathname;
      router.replace(newUrl, undefined);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (session?.status == "authenticated" && session?.data?.user?.email) {
      router.replace("/");
    }
  }, [session.status]);
  return (
    <div className="mt-[83px]">
      <div className={`px-6 py-12 lg:p-16 ${styles.linearBg}`}>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form onSubmit={registerUser}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="userName"
              >
                الإسم
              </label>
              <input
                type="text"
                id="userName"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                الإيميل
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                الرقم السري
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                رقم الموبايل
              </label>
              <input
                type="number"
                id="number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              هل لديك حساب بالفعل؟{" "}
              <Link className="text-blue-500 hover:underline" href="/login">
                الدخول
              </Link>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>تسجيل</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCom;
