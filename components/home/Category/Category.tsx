import Image from "next/image";
import "./category.css";
import Link from "next/link";
import image1 from "../../../public/images/Womens Long Sweater Dresses.webp";
import image2 from "../../../public/images/Na Nin Townes Cotton Twill Trouser.webp";
import image3 from "../../../public/images/Women's hooded large pocket denim jacket.webp";
import image4 from "../../../public/images/Women White Chiffon Shirts Korean Elegant Pearl Loose Hollow Out Female Blouse Fashion New Chic Lace Patchwork Ladies Tops - WHITE _ XL.webp";
import image5 from "../../../public/images/012.webp";
import image7 from "../../../public/images/Stile Hijab.webp";

const Category = async () => {
  const images = [
    {
      name: "فساتين",
      image: image1,
    },
    {
      name: "بناطيل",
      image: image2,
    },
    {
      name: "جواكت",
      image: image3,
    },
    ,
    {
      name: "قمصان",
      image: image4,
    },
    {
      name: "جيب",
      image: image7,
    },
  ];

  return (
    <div className="category">
      <h3 className="text-gray-800 font-bold max-lg:text-2xl text-4xl">
        إختار تصميمك المفضل
      </h3>

      <div className="carts-container">
        {images.map((ele: any, i) => (
          <Link href="/products" key={i} className="cart overflow-hidden">
            <div>
              <Image
                src={ele.image}
                className="image hover:scale-[1.1] transition-all duration-1000 overflow-hidden"
                alt=""
              />
            </div>
            <small className="border-b-2 block border-green-500">
              {ele?.name}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
