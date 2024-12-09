import Image from "next/image";
import React from "react";
import image1 from "@/public/images/wear.jpg";
import image2 from "@/public/images/pexels-karolina-grabowska-5202913.jpg";
import "./readMore.css";
import Link from "next/link";
const ReadMore = () => {
  return (
    <div className="px-2">
      <div className="read-more">
        <div className="read-more-card">
          <Image src={image1} alt="" />
          <p>كيف تختارين الملابس المناسبة لشكل جسمك ؟</p>
          <Link href="/choose-article">إقرأ المزيد</Link>
        </div>
        <div className="read-more-card">
          <Image src={image2} alt="" />
          <p>نصائح للعناية بالملابس للحفاظ على جودتها لأطول فترة ممكنة.</p>
          <Link href="/care-article">إقرأ المزيد</Link>
        </div>
      </div>
      <div className="green-line-1"></div>
    </div>
  );
};

export default ReadMore;
