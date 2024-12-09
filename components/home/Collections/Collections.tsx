import "./collections.css";
import image1 from "../../../public/images/09.webp";
import image2 from "../../../public/images/010.webp";
import image3 from "../../../public/images/011.webp";
import Image from "next/image";

const Collections = () => {
  const images = [image1, image2, image3];

  return (
    <div className="collections">
      {images.map((image, i) => (
        <div className="collections-card" key={i}>
          <Image src={image} alt="" />
          <h3>The Boots Edit</h3>
          <button>SHOP NEW BOOTS</button>
        </div>
      ))}
    </div>
  );
};

export default Collections;
