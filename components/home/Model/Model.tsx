import image1 from "../../../public/images/16888567441291612.webp";
import image2 from "../../../public/images/New versatile lapel long-sleeved soft jacket.webp";
import "./model.css";
import Image from "next/image";

const Model = () => {
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
