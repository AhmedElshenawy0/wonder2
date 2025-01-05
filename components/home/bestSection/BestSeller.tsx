"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import styles from "./bestSeller.module.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { States } from "@/app/store/slices/product-slice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/app/store/api-calls/productApis";
import { AppDispatch } from "@/app/store/store";
const BestSeller = () => {
  const { allProducts } = useSelector(
    (state: { productsReducer: States }) => state.productsReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!allProducts?.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts]);

  return (
    <div className={`${styles.best_seller} my-10 px-0 bg-neutral-100 py-2`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl lg:text-4xl font-bold text-gray-800 pt-12 ">
          منتجاتنا الأكثر مبيعا
        </h3>
      </div>

      <div className={`${styles.wraper}`}>
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={
            {
              // 640: {
              //   slidesPerView: 1,
              //   spaceBetween: 20,
              // },
              // 768: {
              //   slidesPerView: 3,
              //   spaceBetween: 20,
              // },
              // 1024: {
              //   slidesPerView: 4,
              // },
              // 1300: {
              //   slidesPerView: 5,
              //   spaceBetween: 15,
              // },
            }
          }
          // centeredSlides={true}
          modules={[Pagination]}
          className={styles.mySwiper}
        >
          {allProducts?.length ? (
            allProducts.map((ele) => (
              <SwiperSlide className={styles.slide} key={ele.id}>
                <Card ele={ele} />
              </SwiperSlide>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSeller;
