"use client";
import Image from "next/image";
import image1 from "@/public/images/012.webp";
import { useSelector } from "react-redux";
import { ProductType, User_States } from "@/app/types/types";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFromCart, setOpenCart } from "@/app/store/slices/user-slice";
import "./cartPopup.css";
import { States } from "@/app/store/slices/product-slice";
import Link from "next/link";
import { toast } from "react-toastify";
const CartPopup = () => {
  const { openCart, cart } = useSelector(
    (state: { usersReducer: User_States }) => state.usersReducer
  );

  const dispatch = useDispatch();

  const handleCloseCart = () => {
    dispatch(setOpenCart(false));
  };

  const removeItem = (id: number, color: string) => {
    dispatch(deleteFromCart({ id, color }));
    toast.success(".تم حذف المنتج");
  };

  const getTotalPrice = () =>
    cart
      ?.reduce(
        (total: number, item: ProductType) =>
          total + +item?.price * +item?.quantity,
        0
      )
      .toFixed(2);

  const closeCart = () => {
    dispatch(setOpenCart(false));
  };
  return (
    <>
      {openCart && (
        <div
          className={`${
            openCart ? "open-cart-popup" : "close-cart-popup"
          }   h-[calc(100%-70px)] fixed top-[85px] transition-all duration-500 border-e-[2px]`}
        >
          <div className="flex flex-col bg-white shadow-2xl w-[100%] h-[100%]">
            <div className="flex-1 px-4 pt-2 pb-3 sm:px-6 h-[50%] overflow-y-auto">
              <div className="flex gap-4 items-center justify-between">
                <h2 className="text-[16px] font-semibold text-gray-700 flex-1 border px-2 py-1 rounded-md border-gray-300">
                  عربة التسوق
                </h2>
                <div className=" flex h-7 items-center px-2 py-1 rounded-md border border-gray-300">
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  >
                    <MdClose onClick={handleCloseCart} />
                  </button>
                </div>
              </div>
              {cart.length > 0 ? (
                <div className="mt-4">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.map((ele: ProductType) => (
                      <li
                        key={`${ele.name}${ele.color}`}
                        className="flex py-6 gap-2"
                      >
                        <div className="w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            width={200}
                            height={200}
                            src={ele?.image}
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between gap-2 flex-col sm:flex-row text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{ele?.name}</a>
                              </h3>
                              <p className="">
                                EGP{+ele?.price * +ele.quantity}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {ele?.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {ele.quantity}</p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => removeItem(ele.id, ele.color)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4">عربة التسوق الخاصة بك فاغة</p>
              )}
            </div>

            <div className="border-t border-gray-200 h-[50%] px-4 py-2 sm:px-6">
              <div className="flex justify-between text-[16px] text-gray-900">
                <p>المجموع النهائي</p>
                <p className="font-medium">EGP {getTotalPrice()}</p>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                الشحن والضرائب تحسب عند عملية الشراء.
              </p>
              {cart.length > 0 && (
                <div className="mt-5">
                  <Link
                    onClick={closeCart}
                    href="/cart"
                    className="flex items-center justify-center rounded-3xl border py-2 text-sm font-medium text-white transition-all duration-500 shadow-sm bg-indigo-600 hover:bg-indigo-700"
                  >
                    أكمل الطلب
                  </Link>
                </div>
              )}
              <div className="mt-2 flex justify-center text-center rounded-3xl border py-2 text-sm font-medium  text-white transition-all duration-500 shadow-sm bg-green-600 hover:bg-green-700">
                <button type="button" className="ml-2" onClick={closeCart}>
                  تابع التسوق
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPopup;
