import { register } from "@/app/store/api-calls/user-api";
import { User_States } from "@/app/types/types";
import { sendEmail } from "@/utils/mail";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const RegisterPopup = ({
  isSignUpOpen,
  onClose,
  handleOpenSignInPopup,
  isSignInOpen,
}: {
  isSignUpOpen: boolean;
  onClose: () => void;
  handleOpenSignInPopup: any;
  isSignInOpen: any;
}) => {
  if (!isSignUpOpen) return null;

  const { loading, error } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );
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
    try {
      await dispatch(register(formData));
      if (error) {
        toast.error(error);
      }
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
    }
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
  return (
    <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[90%] md:w-[60%] lg:w-96">
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
            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="flex-1 text-gray-600 hover:text-black rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
                onClick={onClose}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white rounded-md py-1 hover:bg-blue-700 text-sm"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>تسجيل الدخول</span>
                )}
              </button>
            </div>
            <div
              className="mt-3 text-slate-600
           text-sm"
            >
              هل لديك حساب بالفعل ؟
              <button
                className="border-b border-blue-500 pb-[1px] text-[15px] text-blue-500 mr-1
            "
                onClick={handleOpenSignInPopup}
              >
                الدخول
              </button>
            </div>

            <div>
              <button className=" bg-green-700 text-white rounded-md py-2 text-center font-semibold mt-2 w-full hover:bg-green-800 text-md">
                Sign As A Admin
              </button>
            </div>
          </div>
        </form>
        <button onClick={handlesendEmail}>send mail</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterPopup;
