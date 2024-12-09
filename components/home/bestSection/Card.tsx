import Image from "next/image";
import React, { useState } from "react";
import "./bestSeller.css";
import { useRouter } from "next/navigation";

const Card = ({ ele }: any) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${ele.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="card transition-all duration-500 relative cursor-pointer bg-white rounded-xl w-[100%] flex text-black flex-col justify-between"
    >
      <small className=" absolute top-2 right-2 bg-[#044123] text-[#ffffff] px-2 py-1 font-semibold">
        جديد !{" "}
      </small>
      <Image
        src={ele.image}
        alt=""
        className="image"
        width={300}
        height={300}
      />
      <div className="overlay z-50 absolute cursor-pointer w-full aspect-[1/1] flex transition-all duration-[1.1s] justify-center items-center">
        <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-black opacity-40  " />
        <h2 className=" z-20 bg-white text-black py-1 px-2 rounded-xl font-semibold">
          click to show
        </h2>
      </div>
      <div className="docs px-0 flex justify-between w-full mt-2">
        <h3 className="text-[12px]">{ele.name}</h3>
        <div className=" font-bold text-[12px] flex flex-col justify-center">
          <p>EGP {ele.price}</p>
        </div>
      </div>
      <div className="px-0 w-full mt-1 mb-6">
        <p className="text-start text-[12px]">100 قطعة</p>
      </div>
    </div>
  );
};

export default Card;
