"use client";
import image1 from "../../../public/images/06.webp";
import image2 from "../../../public/images/06.png";
// import image3 from "../../../public/images/04.webp";

import { useEffect, useState } from "react";
import "./model.css";
import Image from "next/image";

// const images = [image1, image2, image3];

const Model = () => {
  // ===>  Slide Show

  // const [count, setCount] = useState(0);
  // const [count2, setCount2] = useState(0);

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setCount((count) => count + 1);
  //   }, 3000);

  //   return () => clearInterval(timerId);
  // }, []);

  // const image = images[count % images.length];
  return (
    <div>
      {/* <!-- Start Model Section--> */}

      <div className="model" dir="rtl">
        <Image src={image2} className="model-image" alt="" />
        <div className="image">
          <Image src={image1} className="main-image" alt="" />
        </div>
        <div className="desc">
          <div>
            <span style={{ fontSize: "12px" }}>إلحق العرض</span>
            <h1>نقدم لكم أحدث التصميمات في عالم الأزياء</h1>
          </div>
          <div>
            <p>
              نسعي دائما إلي تقديم أحدث التصميمات الأنيقة والمتميزة. ابدا بطلب
              هذه النسخه محدودة ولا .يمكن تفويتها
            </p>
            <button>إحصل عليه الان</button>
          </div>
        </div>
      </div>

      {/* <!-- Start Responsive Model Section--> */}

      <div className="responsive-model">
        <div className="top-side">
          <span style={{ fontSize: "12px" }}>إلحق العرض</span>
          <h1>نقدم لكم أحدث التصميمات في عالم الأزياء</h1>
          <Image src={image1} alt="" />
        </div>
        <div className="bottom-side">
          <p>
            نسعي دائما إلي تقديم أحدث التصميمات الأنيقة والمتميزة. ابدا بطلب هذه
            النسخه محدودة ولا .يمكن تفويتها
          </p>
          <button>إحصل عليه الان</button>
        </div>
      </div>
    </div>
  );
};

export default Model;
