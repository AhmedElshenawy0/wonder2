"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import styles from "@/app/register/register.module.css";

const LoginCom = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState<boolean | null>(false);
  const [adminLoading, setAdminLoading] = useState<boolean | null>(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const baseUrl = process.env.NEXTAUTH_URL;

  // ==>> Check if there is verification true Or Not
  useEffect(() => {
    if (searchParams.get("auth")) {
      if (searchParams.get("auth") === "true") {
        router.replace(process.env.NEXTAUTH_URL as string);
        setTimeout(() => {
          toast.success("Authorized, You can login now", { duration: 5000 });
        }, 8000);
      }
    }

    // ==>> Redirect To Login If error Is Not verified Or No Token
    // if (searchParams.get("error")) {
    //   if (searchParams.get("error") == "notVerified") {
    //     setGoogleLoading(false);
    //     router.replace(`${baseUrl}/login`);
    //     toast.error("Email not verified. Check Your Gmail", {
    //       duration: 6000,
    //     });
    //     router.replace(`${baseUrl}/login`);
    //   } else if (searchParams.get("error") == "NoToken") {
    //     setGoogleLoading(false);
    //     router.replace(`${baseUrl}/login`);
    //     toast.error("Warning: You Are Not Allowed", {
    //       duration: 6000,
    //     });
    //     router.replace(`${baseUrl}/login`);
    //   }
    // }
  }, [searchParams, router, googleLoading]);

  // =>> Redirect to home if session is authenticated
  useEffect(() => {
    if (session.data?.user?.email) {
      router.replace(process.env.NEXTAUTH_URL as string);
      console.log(session.data?.user);
    }
  }, [session.data?.user, router]);

  // ==> Login process with credintials

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (res?.error) {
        if (
          res.error === "User does not exist" ||
          res.error === "Invalid password"
        ) {
          console.log("User does not exist");
          console.log(res.error);

          toast.error("Invalid email or password", {
            duration: 6000,
          });
          setLoading(false);
        } else if (res.error === "User not verified") {
          console.log(res.error);
          toast.error("Email not verified. Check Your Gmail", {
            duration: 6000,
          });
          setLoading(false);
        } else {
          toast.error("Invalid email or password", {
            duration: 6000,
          });
          setLoading(false);
          console.log("Invalid email or password...");
          console.log(res.error);
        }
      }
      if (res?.ok) {
        router.replace(`${baseUrl}/?status=welcom`);
        setLoading(false);
      }
    } catch (error) {
      console.log("error here");
      setLoading(false);
    }
  };

  // =>> Handle signin with google

  const signin = async () => {
    setGoogleLoading(true);
    const res = await signIn("google", { redirect: false });
    console.log(res);
    if (res?.ok) {
      router.replace(`${baseUrl}`); // Replace with the desired route
    }
    if (res?.error) {
      toast.error("Google Sign-In failed!", res?.error as any);
    }
  };

  // =>> Handle open signUp page

  const handleOpenSignUpPage = () => {
    router.push("/register");
  };

  // =>> Handle open signUp page

  const handleAdminSignup = async () => {
    setAdminLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: "ahmed@gmail.com",
        password: 11111111,
      });
      if (res?.error) {
        if (res.error === "User does not exist") {
          toast.error("Email does not exist.", {
            duration: 6000,
          });
          setAdminLoading(false);
        } else if (res.error === "User not verified") {
          toast.error("Email not verified. Check Your Gmail.", {
            duration: 6000,
          });
          setAdminLoading(false);
        } else {
          toast.error("Invalid email or password.", {
            duration: 6000,
          });
          setAdminLoading(false);
        }
      }
      if (res?.ok) {
        router.replace(`${baseUrl}/?status=welcom`);
        setAdminLoading(false);
      }
    } catch (error) {
      console.log("error here");
      setAdminLoading(false);
    }
  };
  return (
    <div
      className={`mt-[83px] testy flex justify-center items-center min-h-screen p-3 ${styles.linearBg}`}
    >
      <div className="bg-white rounded-2xl shadow-xl p-3 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 cursor-pointer">
          Sign In
        </h2>
        {/* Google Sign-In Button */}
        <button
          onClick={signin}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
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
          تسجيل الدخول عن طريق جوجل{" "}
          {googleLoading && (
            <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
        <div className="h-[0.5px] w-full relative bg-gray-400 my-4"></div>
        <form onSubmit={loginUser}>
          {/* Email Input */}
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col">
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-center py-2 text-sm font-semibold flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>تسجيل الدخول</span>
              )}
            </button>
            <div
              onClick={handleAdminSignup}
              className="mt-4 w-full py-2 text-sm bg-green-700 flex justify-center text-white rounded-lg font-semibold text-center cursor-pointer hover:bg-green-800 transition duration-200"
            >
              {adminLoading ? (
                <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Sign As A Admin</span>
              )}
            </div>
          </div>

          {/* Sign-Up Redirect */}
          <div className="mt-4 text-sm text-center text-gray-600 flex">
            <span>ليس لديك حساب؟</span>

            <div
              className="text-blue-500 border-b border-blue-500 ml-1 cursor-pointer"
              onClick={handleOpenSignUpPage}
            >
              تسجيل
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCom;
