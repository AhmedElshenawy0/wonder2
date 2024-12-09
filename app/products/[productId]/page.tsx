"use client";
import { States } from "@/app/store/slices/product-slice";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles from "./product.module.css";
import Product from "@/components/one-product/Product";
import Accordion from "@/components/one-product/accordion/Accordion";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "@/components/home/bestSection/Card";
import dynamic from "next/dynamic";
import {
  fetchProducts,
  getOneProduct,
} from "@/app/store/api-calls/productApis";
import { Cairo } from "next/font/google";
import { PiRecycle } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";
import { AppDispatch } from "@/app/store/store";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const ProductPage = ({ params }: { params: { productId: number } }) => {
  const { oneProduct, allProducts } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = useCallback(() => {
    try {
      console.log(`here is success from product page`);
      params.productId && dispatch(getOneProduct(params.productId));
    } catch (error) {
      console.log(`here is error from product page`);
    }
  }, [dispatch, params.productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const careItems = [
    {
      title: "طرق الإهتمام بالمنتج",
      content: (
        <p>
          يُغسل في الغسالة بماء بارد مع الألوان المشابهة. فقط المبيضات التي لا
          تحتوي على الكلور عند الحاجة. تجفيف بالمجفف على درجة منخفضة. مكواة
          دافئة عند الحاجة.
        </p>
      ),
    },
  ];

  const aboutStyleItems = [
    {
      title: "إعرف أكثر حول هذا التصميم",
      content: (
        <p>
          تتميز هذه القطعة بارتفاع عالٍ، وطول حتى الكاحل، وساق أسطوانية، مع جيوب
          أمامية بزاوية، وجيوب خلفية بحاشية، وسهام أمامية وخلفية للشكل، وسحاب،
          من القطن العضوي مع لمسة من الكتان.
        </p>
      ),
    },
  ];

  console.log();

  return (
    <div className={`${cairo.className} ${styles.product_container} mt-[80px]`}>
      {oneProduct.name ? (
        <Product data={oneProduct} />
      ) : (
        <div className="w-full p-3">
          <div className="flex lg:justify-between flex-col lg:flex-row items-center gap-2 w-full animate-pulse">
            <div className="bg-gray-100 mt-2 lg:mt-0 w-[100%] lg:w-[49%] aspect-[1/0.9]"></div>
            <div className="flex flex-col w-[100%] lg:w-[49%] aspect-[1/0.9] pt-2">
              <p className="p-3 bg-gray-100 mb-2 lg:mb-4"></p>
              <p className="p-3 bg-gray-100 mb-2 lg:mb-4"></p>
              <p className="p-3 bg-gray-100 mb-2 lg:mb-4"></p>
              <p className="p-3 bg-gray-100 mb-2 lg:mb-4"></p>
              <p className="p-3 bg-gray-100 mb-2 lg:mb-6"></p>
              <div className="flex gap-2">
                <p className="bg-gray-100 flex-1 py-4 rounded-xl"></p>
                <p className="bg-gray-100 flex-1 py-4 rounded-xl"></p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className={`${styles.about_product}`} dir="rtl">
        <div className={`${styles.politics}`}>
          <div className={`${styles.shipping}`}>
            <FaTruckFast color="green" size={30} />
            <div className={`${styles.shipping_desc}`}>
              <h4>خصم الشحن</h4>
              <p>سعر مخفض للشحن السريع للطلبات التي تزيد عن 3200 جنيه.</p>
            </div>
          </div>
          <div className={`${styles.easy_return}`}>
            <PiRecycle color="green" size={30} />
            <div className={`${styles.return_desc}`}>
              <h4>سهولة الإرجاع</h4>
              <p>
                الإرجاع خلال 45 يومًا من تاريخ الشراء. الرسوم والضرائب غير قابلة
                للاسترداد.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Accordion items={aboutStyleItems} />
      <Accordion items={careItems} />
      <div
        className={`{${styles.wraper} mt-6 mb-9 rounded border px-1 mx-[20px] }`}
      >
        <h2 className="mb-4 mt-3 font-medium text-center text-lg">
          إكتشف ما يناسبك
        </h2>
        {allProducts.length > 0 && (
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Pagination]}
            className=""
          >
            {allProducts.map((ele, i) => (
              <SwiperSlide className="w-[200px]" key={ele.id}>
                <Card key={ele.id} ele={ele} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
