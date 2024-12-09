"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./bestSeller.css";
import { useEffect } from "react";
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
    <div className="best-seller mt-0 px-0 bg-[#ffffff] py-2">
      <div className="title text-center mb-10">
        <h2 className="text-[26px] lg:text-4xl font-medium leading-8 pt-12 ">
          منتجاتنا الأكثر مبيعا
        </h2>
      </div>

      <div className="wraper">
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
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
          className="mySwiper"
        >
          {allProducts?.length ? (
            allProducts.map((ele) => (
              <SwiperSlide key={ele.id}>
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
