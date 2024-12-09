import { fetchArticles } from "@/app/store/api-calls/article-api";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import image2 from "@/public/images/wear2.jpg";
import image3 from "@/public/images/body-shap-2.webp";
import image4 from "@/public/images/body-shap-5.webp";
import image5 from "@/public/images/body-shap-4.webp";
import image6 from "@/public/images/body-shap-1.webp";
import image7 from "@/public/images/body-shap-3.webp";
const AllArticles = () => {
  return (
    <div>
      <Image
        src={image2}
        alt=""
        width={1200}
        height={1200}
        className="w-[100%] aspect-[1/0.5] object-cover"
      />
      <div className="flex flex-col px-4">
        <div className="flex flex-col">
          <h1 className="mx-auto text-center max-w-[70%] mb-12 mt-5 text-2xl">
            اختيار الملابس التي تبرز جمالك وتعزز ثقتك بنفسك يبدأ بفهم شكل جسمك
            واختيار التصاميم التي تناسبه. إليك بعض النصائح المهمة التي تساعدك
            على اختيار الملابس المناسبة بسهولة:
          </h1>

          <div className="pb-4">
            <h2 className="mb-5 font-medium text-center">
              أفضل نصائح اختيار الملابس المناسبة لجسمك
            </h2>

            <div>
              <h5 className="text-lg font-medium mt-12 mb-3">
                1. تحديد شكل جسمك:
              </h5>
              <Image
                src={image6}
                alt="body-shap"
                width={500}
                height={500}
                className="w-[100%] md:w-[90%] mx-auto mb-5"
              />
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="text-[14px] font-medium text-black">
                  الجسم الكمثري:
                </span>
                <span className="leading-[21px] max-w-[600px]">
                  يتميز بخصر نحيف وأرداف عريضة. يناسبك اختيار قمصان أو بلوزات
                  تلفت الانتباه إلى الجزء العلوي من جسمك مع بناطيل أو تنانير
                  بألوان داكنة.
                </span>
                <Image
                  src={image4}
                  alt="body-shap"
                  width={500}
                  height={500}
                  className="w-[100%] md:w-[70%] mb-2 mt-1"
                />
              </p>
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="text-[14px] font-medium text-black">
                  الجسم الساعة الرملية:
                </span>
                <span className="leading-[21px] max-w-[600px]">
                  يتميز بتوازن بين الجزء العلوي والسفلي وخصر نحيف. اختاري ملابس
                  تبرز خصرك مثل الفساتين الضيقة.
                </span>
                <Image
                  src={image5}
                  alt="body-shap"
                  width={500}
                  height={500}
                  className="w-[100%] md:w-[70%] mb-2 mt-1"
                />
              </p>
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="text-[14px] font-medium text-black">
                  الجسم التفاحي:
                </span>
                <span className="leading-[21px] max-w-[600px]">
                  ييتميز بامتلاء في الجزء العلوي. اختاري فساتين بقصات مستقيمة
                  وبلوزات طويلة تغطي منطقة البطن. الجسم المستطيل: يناسبك اختيار
                  الملابس التي تضيف منحنيات مثل الفساتين المربوطة عند الخصر أو
                  السترات المزينة بالأحزمة.
                </span>
                <Image
                  src={image7}
                  alt="body-shap"
                  width={500}
                  height={500}
                  className="w-[100%] md:w-[70%] mb-2 mt-1"
                />
              </p>
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="text-[14px] font-medium text-black">
                  الجسم المستطيل:
                </span>
                <span className="leading-[21px] max-w-[600px]">
                  يناسبك اختيار الملابس التي تضيف منحنيات مثل الفساتين المربوطة
                  عند الخصر أو السترات المزينة بالأحزمة.
                </span>
                <Image
                  src={image3}
                  alt="body-shap"
                  width={500}
                  height={500}
                  className="w-[100%] md:w-[70%] mb-2 mt-1"
                />
              </p>
            </div>
            <div>
              <h5 className="text-lg font-medium mt-5 mb-2">
                2 . إختيار الألوان المناسبة
              </h5>
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="text-[14px] font-medium text-black">
                  الألوان الداكنة:
                </span>
                <span className="leading-[21px] max-w-[600px]">
                  مثل الأسود والأزرق الداكن تعطي مظهرًا أنحف. الألوان الفاتحة
                  والزاهية تلفت الأنظار إلى المناطق التي ترغبين بإبرازها.
                </span>
              </p>
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="text-[14px] font-medium text-black">
                  الألوان الفاتحة والزاهية:
                </span>
                <span className="leading-[21px] max-w-[600px]">
                  تلفت الأنظار إلى المناطق التي ترغبين بإبرازها.
                </span>
              </p>
            </div>
            <div>
              <h5 className="text-lg font-medium mt-5 mb-2">
                3 . إلاهتمام بالخامات والتفاصيل:
              </h5>
              <p className="text-sm text-slate-500 flex flex-col gap-1 mb-2">
                <span className="leading-[21px] max-w-[600px]">
                  اختاري خامات مريحة تتناسب مع الطقس والمناسبة. تجنبي التصاميم
                  المزخرفة جدًا إذا كنتِ تفضلين المظهر الكلاسيكي. <br /> لا تنسي
                  الإكسسوارات: الإكسسوارات يمكنها أن تضيف لمسة مميزة لإطلالتك
                  وتلفت الأنظار إلى المناطق التي ترغبين في إبرازها. استمتعي
                  بالتسوق بثقة! مع هذه النصائح، يمكنك الآن التسوق بثقة أكبر
                  واختيار الملابس التي تجعلك تشعرين بالراحة والجمال في كل
                  مناسبة. لا تنسي أن الأناقة تبدأ بالراحة والثقة بالنفس!
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
