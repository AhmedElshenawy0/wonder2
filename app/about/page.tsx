import image1 from "@/public/images/Chique Outfit.webp";
import image2 from "@/public/images/care1 (3).webp";
import image3 from "@/public/images/care1 (4).webp";
import image4 from "@/public/images/Choker Neck Dip Hem Striped Top.webp";

import Image from "next/image";
import "./about.css";

const page = () => {
  const dt = new Date().getHours();
  return (
    <div className="about-container lg:mt-[83px]" dir="rtl">
      <Image
        src={image2}
        alt=""
        width={500}
        height={500}
        className="about-banner-image"
      />
      <p className="about-paragraph">
        <i className=" fa-solid fa-quote-left"></i>
        في RAVELLE نريد أن يكون الاختيار الصحيح سهلاً مثل ارتداء قميص رائع.
        ولهذا السبب نتعاون مع أفضل المصانع الأخلاقية حول العالم. مصدر فقط أجود
        المواد. وشارك هذه القصص معك، وصولاً إلى التكلفة الحقيقية لكل منتج نصنعه.
        إنها طريقة جديدة لفعل
        <span style={{ position: "relative" }} className="right-quote ">
          الأشياء
          <i className="fa-solid fa-quote-right"></i>
        </span>
        .
      </p>

      {/* <!-- Start Our Factories --> */}

      <section className="our-factories">
        <Image
          src={image1}
          alt=""
          className="image object-cover"
          width={300}
          height={300}
        />
        <div className="desc pr-3">
          <h5>مصانعنا</h5>
          <h2>نهجنا الأخلاقي.</h2>
          <p>
            نقضي شهورًا في البحث عن أفضل المصانع حول العالم، وهي نفس المصانع
            التي تنتج العلامات التجارية المفضلة لديك. نقوم بزيارتهم كثيرًا ونبني
            علاقات شخصية قوية مع أصحابها. يتم منح كل مصنع تدقيقًا للامتثال
            لتقييم عوامل مثل الأجور العادلة وساعات العمل المعقولة والبيئة.
            هدفنا؟ درجة 90 فما فوق لكل مصنع.
          </p>
        </div>
      </section>

      {/* <!-- Start Our Quality --> */}

      <section className="our-quality">
        <div className="desc  pr-3">
          <h5>الجودة</h5>
          <h2>مصممة لتستمر.</h2>
          <p>
            في RAVELLE, نحن لسنا مهتمين بالاتجاهات. نريد منك أن ترتدي قطعنا
            لسنوات، أو حتى لعقود قادمة. ولهذا السبب فإننا نستورد أجود المواد
            والمصانع لمنتجاتنا الخالدة - مثل سترات الكشمير من الدرجة الأولى،
            والأحذية الإيطالية، وتي شيرتات البيما البيروفية.
          </p>
        </div>
        <Image src={image2} className="image" alt="" width={300} height={300} />
      </section>

      {/* <!-- Start Our Price --> */}

      <section className="our-price">
        <h5>أسعارنا</h5>
        <h1>شفافية كاملة</h1>
        <p>
          نحن نؤمن بأن لعملائنا الحق في معرفة تكلفة تصنيع ملابسهم. نحن نكشف عن
          التكاليف الحقيقية وراء جميع منتجاتنا - بدءًا من المواد إلى العمالة
          وحتى النقل - ثم نقدمها لك، مطروحًا منها علامة البيع بالتجزئة
          التقليدية.
        </p>
      </section>

      {/* <!-- Start More to Explore Styles --> */}

      <section className="more-to-explore">
        <h2>إكتشف المزيد</h2>
        <div className="explore-products">
          <Image src={image3} alt="" className="image" />
          <button>منتجاتنا</button>
        </div>
      </section>
      <section className="store-info mb-10">
        <div className="store-desc">
          <div>
            <h3>Egypt</h3>
            <p>First 6th of October, Giza Governorate</p>
            <p
              style={{ color: `${dt >= 10 && dt <= 20 ? "green" : "red"}` }}
              className="time"
            >
              مواعيد العمل :
              <span dir="ltr">
                <span>8 p.m</span> - <span>10 am</span>
              </span>
            </p>
            <p
              dir="ltr"
              style={{
                textAlign: "end",
              }}
            >
              +20 151599618
            </p>
            <div className="question-wrapper">
              <div style={{ margin: "0 auto" }} className="question">
                <h3 style={{ fontSize: "14px; font-weight: 700" }}>
                  هل لديك سؤال ؟
                </h3>
                <p style={{ fontSize: "14px" }}>أرسل لنا وسنقوم بالرد عليك</p>
                <button style={{ fontSize: "12px" }}>راسلنا</button>
              </div>
            </div>
          </div>
        </div>
        <div className="store-images gap-1">
          <Image src={image1} className="image" alt="" />
          <Image src={image4} className="image" alt="" />
        </div>
      </section>
    </div>
  );
};

export default page;
