"use client";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Image from "next/image";
import image from "../../../public/images/012.jpg";
import "./features.css";
const Review = () => {
  return (
    <div className="review flex flex-col mb-5 gap-5 md:gap-0 lg:h-[755px] bg-[#f4f8f0] lg:flex-row items-center md:mb-0 overflow-hidden py-0">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.5,
          ease: "easeOut",
          duration: 0.7,
        }}
        className=" flex-1 py-14 lg:py-0 px-8 lg:px-11 "
      >
        <div className="title text-center mb-7">
          <h1 className="md:text-center text-start text-4xl font-semibold text-[#323e48]">
            لماذا WONDER ؟
          </h1>
          <p className="text-xl font-medium mt-2 text-start md:text-center text-[#323e48]">
            أبرز المميزات
          </p>
        </div>
        <div className="desc  flex flex-col justify-start gap-5 ">
          <motion.div
            className=""
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              ease: "easeOut",
              duration: 0.7,
            }}
          >
            <h2>خدمة عملاء متميزة</h2>
            <p>
              .نؤمن بأن العميل هو شريكنا في النجاح. لذلك نقدم لك خدمة عملاء علي
              مدار الساعة لتلبية جميع احتياجاتك
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              ease: "easeOut",
              duration: 0.7,
            }}
            className="lg:mx-auto"
          >
            <h2>أسعار تنافسية</h2>
            <p>
              نحن نتعامل مباشرة مع المصانع مما يتيح لنا تقديم أسعار جملة لا تقبل
              المنافسة.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              ease: "easeOut",
              duration: 0.7,
            }}
            className=""
          >
            <h2>أحدث صيحات الموضة</h2>
            <p>
              فريقنا علي دراية بأحدث صيحات الموضة العالمية ونحرص علي تقديم أحدث
              التصميمات التي تلبي رغبات العميل
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              ease: "easeOut",
              duration: 0.7,
            }}
            className="lg:mx-auto"
          >
            <h2>جودة عالية</h2>
            <p>
              نستخدم أجود الخامات لضمان راحة العميل وجودة المنتج علي المدي
              الطويل
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              ease: "easeOut",
              duration: 0.7,
            }}
            className=""
          >
            <h2> سياسة إسترجاع سهلة </h2>
            <p>
              نثق بمنتجاتنا لذلك نقدم لك سياسة إسترجاع سهلة في حالة وجود أي عيوب
              في المنتج
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Review;
