"use client";
import image1 from "@/public/images/06.webp";
import image2 from "@/public/images/07.webp";
import image3 from "@/public/images/08.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./reviews.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const images = [image1, image2, image3];
const Reviews = () => {
  return (
    <div className="px-2  py-0 ">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="slide">
              <Image src={image} alt="" />

              <div className="desc" dir="rtl">
                <h5>آراء عملائنا عن تصميماتنا</h5>
                <div className="stars">
                  <FaStar color="green" />
                  <FaStar color="green" />
                  <FaStar color="green" />
                  <FaStar color="green" />
                  <FaStar color="green" />
                </div>
                <p>
                  <span className="relative">
                    هذه<i className="fa-solid fa-quote-left"></i>
                  </span>
                  السترة جميلة. انها الستائر بشكل جيد ومريح للغاية. تفاصيل الضلع
                  على طول خط العنق وأساور الأكمام
                  <span className="relative">
                    مثالية<i className="fa-solid fa-quote-right"></i>
                  </span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="green-line-2"></div>
    </div>
  );
};

export default Reviews;
