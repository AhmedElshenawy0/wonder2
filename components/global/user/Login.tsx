// import { login } from "@/app/store/api-calls/user-api";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";

// const Login = ({
//   onClose,
//   handleOpenSignUpPopup,
// }: {
//   onClose: () => void;
//   handleOpenSignUpPopup: any;
// }) => {
//   // Register
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const loginUser = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();

//     try {
//       dispatch(login(formData));
//       onClose();
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };
//   return (
//     <div className="fixed inset-0 z-[9999999999] flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg p-6 shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
//         <form onSubmit={loginUser}>
//           <div className="mb-3">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="email"
//             >
//               الإيميل
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter Your Email"
//               required
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               className="mt-1 block text-sm outline-none w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800"
//             />
//           </div>
//           <div className="mb-3">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="password"
//             >
//               الرقم السري
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter Your Password"
//               required
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               className="mt-1 block text-sm outline-none w-full border border-gray-300 rounded-md py-1 px-2 focus:border-green-800"
//             />
//           </div>
//           <div className="flex justify-between gap-2">
//             <button
//               type="button"
//               className="flex-1 text-gray-600 hover:text-black rounded-md  bg-gray-200 hover:bg-gray-300 text-sm"
//               onClick={onClose}
//             >
//               إلغاء
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-blue-600 text-white rounded-md py-1 hover:bg-blue-700 text-sm"
//             >
//               تسجيل الدخو3
//             </button>
//           </div>
//           <div
//             className="mt-3 text-slate-600
//            text-sm"
//           >
//             ليس لديك حساب؟
//             <button
//               className="border-b border-blue-500 pb-[1px] text-[15px] text-blue-500 mr-1"
//               onClick={handleOpenSignUpPopup}
//             >
//               تسجيل
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
