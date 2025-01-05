"use client";
import { motion } from "framer-motion";
import {
  FiHeadphones,
  FiTag,
  FiTrendingUp,
  FiStar,
  FiRotateCw,
} from "react-icons/fi";

const features = [
  {
    title: "خدمة عملاء متميزة",
    description: "نقدم لك خدمة عملاء على مدار الساعة لتلبية جميع احتياجاتك.",
    icon: <FiHeadphones size={32} />,
  },
  {
    title: "أسعار تنافسية",
    description: "نتعامل مباشرة مع المصانع لتقديم أسعار جملة لا تقبل المنافسة.",
    icon: <FiTag size={32} />,
  },
  {
    title: "أحدث صيحات الموضة",
    description: "نحرص على تقديم أحدث التصميمات التي تلبي رغبات العميل.",
    icon: <FiTrendingUp size={32} />,
  },
  {
    title: "جودة عالية",
    description: "نستخدم أجود الخامات لضمان راحة العميل وجودة المنتج.",
    icon: <FiStar size={32} />,
  },
  {
    title: "سياسة استرجاع سهلة",
    description: "نقدم سياسة استرجاع سهلة في حالة وجود أي عيوب في المنتج.",
    icon: <FiRotateCw size={32} />,
  },
];

const Review = () => {
  return (
    <div className="py-16 bg-gray-50 darks:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-5 text-center"
      >
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-gray-800 darks:text-white mb-4">
          لماذا <span className="text-green-800">RAVELLE</span>؟
        </h1>
        <p className="text-lg text-gray-600 darks:text-gray-300 mb-12">
          أبرز المميزات التي نقدمها لك
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center p-6 border-r-4 border-green-800 bg-white darks:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="text-green-800 mb-4">{feature.icon}</div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 darks:text-white mb-2">
                {feature.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 darks:text-gray-300 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Review;
