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

const page = () => {
  const { loading, error, user } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const session = useSession();

  session.data && redirect("/");
  // Register
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "ahmed",
    email: "ahmed@gmail.com",
    password: "11111111",
    phone: "012138169910",
  });
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(register(formData));

    // if (error) {
    //   toast.error(error);
    // } else {
    //   toast.success(
    //     "تم التسجيل بنجاح, أرسلنا لك رسالة تفعيل علي الإيميل الخاص بك",
    //     { duration: 8000 }
    //   );
    //   router.replace("/login");
    // }
  };

  const handlesendEmail = async () => {
    const emailResponse = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    if (!emailResponse.ok) throw new Error("Failed to send verification email");

    console.log(emailResponse);
  };

  const searchParams = useSearchParams();

  const toastMessage = searchParams.get("error");
  const pathname = usePathname();

  const router = useRouter();

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
      if (error.status) {
        if (error.status == 409) {
          toast.error(error.data.message);
          router.replace("/login");
        } else {
          toast.error(error.data.message);
          console.log(error.data.message);
        }
      }
    }
  }, [error, user]);
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
    if (session.status == "authenticated") {
      router.replace("/");
    }
  }, [session.status]);
  return (
    <div className="flex items-center justify-center mt-[86px] py-10">
      <div className="bg-white rounded-lg p-4 shadow-xl border w-[90%] md:w-[60%]">
        <h2 className="text-2xl font-bold mb-3">التسجيل</h2>
        <form onSubmit={registerUser}>
          <div className="mb-2">
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
              className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800 text-sm"
            />
          </div>
          <div className="mb-2">
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
              className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800 text-sm"
            />
          </div>
          <div className="mb-2">
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
              className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800 text-sm"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
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
              className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800 text-sm"
            />
          </div>
          <div>
            <div
              className="mt-3 text-slate-600
           text-sm"
            >
              هل لديك حساب بالفعل ؟
              <Link
                className="border-b border-blue-500 pb-[1px] text-[15px] text-blue-500 mr-1
            "
                href={"/login"}
              >
                الدخول
              </Link>
            </div>

            <div className="mt-2">
              <button className=" bg-blue-700 text-white rounded-md py-2 text-center font-semibold mt-2 w-full hover:bg-blue-800 text-md">
                تسجيل
              </button>
              <div className=" bg-green-700 text-white rounded-md py-2 text-center font-semibold mt-2 w-full hover:bg-green-800 text-md">
                Sign As A Admin
              </div>
            </div>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default page;
