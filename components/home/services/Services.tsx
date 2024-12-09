"use client";
import { motion } from "framer-motion";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceFill } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import { BsBricks } from "react-icons/bs";
import "./services.css";

const Services = () => {
  return (
    <div className="services flex flex-col lg:flex-row lg:justify-between lg:items-center gap-7 px-12 py-10">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.4,
          ease: "easeOut",
          duration: 0.7,
        }}
        className="card flex flex-col items-center  text-center"
      >
        <HiSpeakerphone className="text-7xl text-[#003322] mb-6" />
        <h3 className="text-2xl font-medium mb-2 ">قيمة كبيرة كل يوم</h3>
        <p className=" lg:max-w-[400px]">اكتشف عروضنا وخصوماتنا اليومية</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.5,
          ease: "easeOut",
          duration: 0.7,
        }}
        className="card flex flex-col items-center text-center"
      >
        <TbTruckDelivery className="text-7xl text-[#003322] mb-6" />
        <h3 className="text-2xl font-medium mb-2 ">شحن واسترجاع بكل سهوله</h3>
        <p className=" lg:max-w-[400px]">
          استمتع بتجربة شحن سهله وإذا لما يعجبك المنتج، يمكنك اعادته لنا بكل
          سهولة
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.6,
          ease: "easeOut",
          duration: 0.7,
        }}
        className="card flex flex-col items-center  text-center"
      >
        <RiCustomerServiceFill className="text-7xl text-[#003322] mb-6" />

        <h3 className="text-2xl font-medium mb-2 ">خدمة عملاء استثنائية</h3>
        <p className=" lg:max-w-[400px]">
          فريقنا لخدمة العملاء مستعد دائما للمساعدة
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.7,
          ease: "easeOut",
          duration: 0.7,
        }}
        className="card flex flex-col items-center  text-center"
      >
        <BsBricks className="text-7xl text-[#003322] mb-6" />
        <h3 className="text-2xl font-medium mb-2 ">بدائل بلا نهاية</h3>
        <p className=" lg:max-w-[400px]">
          تشكيله كبيره و رائعه من المنتجات، التي تمت على يد مصممين من ثقافات
          ودول مختلفه
        </p>
      </motion.div>
      {/* {loading ? (
        <p>loading..........</p>
      ) : (
        <div>
          {allProducts.map((ele) => (
            <p>{ele.name}</p>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Services;
