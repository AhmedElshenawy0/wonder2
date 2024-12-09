"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../store/api-calls/user-api";
import { useSelector } from "react-redux";
import { User_States } from "../types/types";
import { signIn, signOut, useSession } from "next-auth/react";

const page = () => {
  const { user } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const searchParams = useSearchParams();

  // ======================>> Redirect to home if session exist
  const router = useRouter();

  const session = useSession();

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [session.status, router]);

  // ======================>> Check if there is verifed true auth query

  useEffect(() => {
    if (searchParams.get("auth")) {
      if (searchParams.get("auth") === "true") {
        router.replace("/login");

        setTimeout(() => {
          toast.success(
            "Congratulation 👏, You are authorized, You can login now",
            { duration: 5000 }
          );
        }, 3000);
      } else {
        router.replace("/register");

        setTimeout(() => {
          toast.error("You are not authorized", { duration: 5000 });
        }, 3000);
      }
    }
    if (searchParams.get("error") == "notVerified") {
      toast.error(
        "لقد أرسلنا لك رساله تفعيل الإيميل علي الإيميل الخاص بك, برجاء التفعيل اولا",
        { duration: 8000 }
      );
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (session.status == "authenticated") {
      router.replace("/");
    }
  }, [session.status]);
  // ======================>> Login process with credintials

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (res?.error) {
        setError(res?.error!);
        console.log("error login");
        console.log(res);
        console.log(error);
        toast.error(`يرجي التأكد من الإيميل وكلمة المرور`, {
          duration: 6000,
        });
      } else {
        toast.success(` مرحبا بك 👋`, {
          duration: 6000,
        });
      }
    } catch (error) {
      console.log("error here");
    }

    // try {
    //   dispatch(login(formData));
    // } catch (error) {
    //   console.error("Registration failed:", error);
    // }
  };

  // ======================>> Handle open signUp page

  const handleOpenSignUpPage = () => {
    router.push("/register");
  };

  // ======================>> Handle signin with google

  const signin = async () => {
    const res = await signIn("google", { redirect: false });
    console.log(res);

    if (res?.error) {
      toast.error("Google Sign-In failed!");
    } else {
      toast(`👋 Congratulation, Hello `, {
        duration: 6000,
      });
    }
  };

  console.log(session);

  return (
    <div className=" flex justify-center mt-[86px] p-5 min-h-[100vh]">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[90%] h-fit md:w-[300px] lg:w-[400px]">
        <h2 className="text-2xl font-bold mb-4 cursor-pointer">تسجيل الدخول</h2>

        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label
              className="block text-[12px] lg:text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              الإيميل
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block text-sm outline-none w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-[12px] lg:text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              الرقم السري
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 block text-sm outline-none w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={signin}
              className="w-full rounded-2xl px-4 py-1 flex gap-3 items-center border border-gray-500 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#ffc107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                />
                <path
                  fill="#ff3d00"
                  d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                />
                <path
                  fill="#4caf50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                />
                <path
                  fill="#1976d2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                />
              </svg>
              تسجيل الدخول عن طريق جوجل
            </button>
            <button
              type="submit"
              className="w-full rounded-2xl px-2 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              تسجيل الدخول
            </button>
          </div>
          <div
            className="mt-3 text-slate-600
           text-[12px]"
          >
            ليس لديك حساب؟
            <button
              className="border-b border-blue-500 pb-[1px] text-[15px] text-blue-500 mr-1"
              onClick={handleOpenSignUpPage}
            >
              تسجيل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
