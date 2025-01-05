import Image from "next/image";
import React from "react";
import Link from "next/link";
import image1 from "@/public/images/wear.webp";
import image2 from "@/public/images/pexels-karolina-grabowska-5202913.webp";

const ReadMore = () => {
  return (
    <div className="px-4 bg-white darks:bg-gray-900 mb-[75px]">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="group overflow-hidden rounded-lg shadow-md bg-white darks:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-80">
            <Image
              src={image1}
              alt="كيف تختارين الملابس المناسبة لشكل جسمك ؟"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <p className="text-gray-800 darks:text-gray-200 text-lg font-semibold mb-3">
              كيف تختارين الملابس المناسبة لشكل جسمك ؟
            </p>
            <Link
              href="/choose-article"
              className="inline-block text-green-500 font-medium hover:underline"
            >
              إقرأ المزيد →
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group overflow-hidden rounded-lg shadow-md bg-white darks:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
          <div className="relative w-full h-80">
            <Image
              src={image2}
              alt="نصائح للعناية بالملابس للحفاظ على جودتها"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5">
            <p className="text-gray-800 darks:text-gray-200 text-lg font-semibold mb-3">
              نصائح للعناية بالملابس للحفاظ على جودتها لأطول فترة ممكنة.
            </p>
            <Link
              href="/care-article"
              className="inline-block text-green-500 font-medium hover:underline"
            >
              إقرأ المزيد →
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      {/* <div className="w-full h-1 bg-green-500 mt-12"></div> */}
    </div>
  );
};

export default ReadMore;
