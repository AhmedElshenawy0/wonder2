"use client";
import { motion } from "framer-motion";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaRegHandshake } from "react-icons/fa6";
import { SiDatabricks } from "react-icons/si";

const Services = () => {
  const services = [
    {
      icon: <FaRegHandshake />,
      title: "قيمة كبيرة كل يوم",
      description: "اكتشف عروضنا وخصوماتنا اليومية",
    },
    {
      icon: <LiaShippingFastSolid />,
      title: "شحن واسترجاع بسهوله",
      description:
        "استمتع بتجربة شحن سهله وإذا لم يعجبك المنتج، يمكنك اعادته لنا بكل سهولة",
    },
    {
      icon: <TfiHeadphoneAlt />,
      title: "خدمة عملاء استثنائية",
      description: "فريقنا لخدمة العملاء مستعد دائما للمساعدة",
    },
    {
      icon: <SiDatabricks />,
      title: "بدائل بلا نهاية",
      description:
        "تشكيله كبيرة ورائعه من المنتجات التي تمت على يد مصممين من ثقافات ودول مختلفة",
    },
  ];

  return (
    <div className="px-4 pb-20 darks:bg-gray-900 pt-20 max-lg:pt-0">
      <div className="w-full h-1 bg-green-800 mb-20 hidden max-lg:block"></div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 * index,
              ease: "easeOut",
              duration: 0.7,
            }}
            className="flex flex-col items-center text-center p-6 bg-white darks:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="text-green-800 text-6xl mb-4">{service.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 darks:text-white mb-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 darks:text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
