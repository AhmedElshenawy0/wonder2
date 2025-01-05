"use client";
import image1 from "@/public/images/Elegante pelliccia da donna (1).webp";
import image2 from "@/public/images/SHEIN Plus Lace Up Balloon Sleeve Sweater.webp";
import image3 from "@/public/images/Choker Neck Dip Hem Striped Top.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./reviews.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const data = [
  {
    image: image1,
    comment:
      "موقع رافيل ده اكتشاف حقيقي! الموديلات شيك جدًا وجودتها عالية، وكمان حاسة براحة في كل قطعة بلبسها. دايمًا بتناسب ذوقي!",
  },
  {
    image: image2,
    comment:
      "كل مرة بشوف قطعة جديدة من رافيل مش بقدر أقاوم! الموديلات جميلة وجديدة، والملابس مريحة جدًا. بجد موقع رائع لكل بنت عايزة تواكب الموضة",
  },
  {
    image: image1,
    comment:
      "بصراحة، ملابس رافيل حاجة تانية! كل حاجة فيها طابع مميز، والراحة فيها مش طبيعية. بشتري دايمًا منها وكل مرة بشوف حاجة جديدة تعجبني.",
  },
];
const Reviews = () => {
  return (
    <div className="px-2 py-0 ">
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
        {data.map((ele, i) => (
          <SwiperSlide key={i}>
            <div className="slide">
              <Image src={ele.image} alt="" />

              <div className="desc" dir="rtl">
                <h5 className="text-lg text-gray-600">
                  آراء عملائنا عن تصميماتنا
                </h5>
                <div className="stars">
                  <FaStar color="green" />
                  <FaStar color="green" />
                  <FaStar color="green" />
                  <FaStar color="green" />
                  <FaStar color="green" />
                </div>
                <p className="text-gray-800">{ele.comment}</p>
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
