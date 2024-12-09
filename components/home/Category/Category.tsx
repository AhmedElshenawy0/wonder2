import Image from "next/image";
import "./category.css";
import Link from "next/link";
import image1 from "../../../public/images/018.webp";
import image2 from "../../../public/images/022.webp";
import image3 from "../../../public/images/017.webp";
import image4 from "../../../public/images/08.webp";
import image5 from "../../../public/images/012.webp";
import image7 from "../../../public/images/025.webp";

const Category = async () => {
  // const categories = await axios
  //   .get("http://localhost:3000/api/product/category")
  //   .then((res) => res.data);

  // console.log(categories);

  const images = [
    {
      name: "فساتين",
      image: image1,
    },
    {
      name: "بناطيل",
      image: image2,
    },
    ,
    {
      name: "جواكيت",
      image: image3,
    },
    ,
    {
      name: "قمصان",
      image: image4,
    },
    ,
    {
      name: "سروال",
      image: image5,
    },
    {
      name: "جيب",
      image: image7,
    },
  ];
  return (
    <div className="category">
      <h3>إختار تصميمك المفضل</h3>

      <div className="carts-container">
        {images.map((ele: any, i) => (
          <div className="cart overflow-hidden" key={i}>
            <Image
              src={ele.image}
              className="image hover:scale-[1.1] transition-all duration-1000"
              alt=""
            />
            <Link href="/products">{ele?.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
