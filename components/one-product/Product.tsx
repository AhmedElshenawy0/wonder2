import { ProductType, User_States } from "@/app/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductInfoPopup from "../one-product/ProductInfoPopup";
import LoginPopup from "../global/user/LoginPopup";
import styles from "../../app/products/[productId]/product.module.css";
import RegisterPopup from "../global/user/RegisterPopup";
import { useSession } from "next-auth/react";

const Product = ({ data }: { data: ProductType }) => {
  const [selectedImage, setSelectedImage] = useState(data?.image);
  const [selectedColor, setSelectedColor] = useState(data?.color || "");
  const [openSignInPopup, setOpenSignInPopup] = useState(false);
  const [openSignUpPopup, setOpenSignUpPopup] = useState(false);
  const [productInfo, setProductInfo] = useState(false);

  useEffect(() => {
    setSelectedImage(data?.image);
    setSelectedColor(data?.color);
  }, [data]);

  //  Handle Resgister Popup
  const session = useSession();

  const handleAddToCart = () => {
    if (session.data?.user?.email) {
      setProductInfo(true);
      setOpenSignUpPopup(false);
    } else {
      setOpenSignUpPopup(true);
      setProductInfo(false);
    }
  };
  const closePopup = () => {
    setOpenSignInPopup(false);
    setOpenSignUpPopup(false);
  };

  //  Handle Product Info Popup

  const closeProductInfo = () => setProductInfo(false);

  //  Handle Change Color And Image

  const handleColorChange = (val: any) => {
    // if (colorHex !== selectedColor) {
    setSelectedColor(val?.color);
    setSelectedImage(val?.image);
    // }
  };

  const handleOpenSignInPopup = () => {
    setOpenSignInPopup(true);
    setOpenSignUpPopup(false);
  };
  const handleOpenSignUpPopup = () => {
    setOpenSignInPopup(false);
    setOpenSignUpPopup(true);
  };
  return (
    <section className={`${styles.product_container} relative`}>
      <div className={`${styles.one_product_info}`} dir="rtl">
        <div className={`${styles.image} relative`}>
          <Image
            width={500}
            height={500}
            src={selectedImage}
            alt="product"
            className={`${styles.card_image} rounded`}
            priority
          />
        </div>
        <div className={`${styles.desc}`}>
          <p className={`${styles.product_category}`}>
            حريمي / {data?.category}
          </p>

          <h3 className=" lg:mb-2">
            <span>{data?.name}</span>
            <span>EGP{data.price}</span>
          </h3>

          <div className={`${styles.all_colors} items-center`}>
            <p className={`${styles.color}`}>
              <strong>اللون : </strong>
            </p>
            <span
              className={`${styles.color} cursor-pointer`}
              style={{
                backgroundColor: `${data.color}`,
                border: `${data.color == "#ffffff" ? "1px solid black" : ""}`,
              }}
              onClick={() => handleColorChange(data)}
            ></span>
            {data.available &&
              data.available?.length > 0 &&
              data.available?.map((val: any, index: number) => (
                <span
                  key={index}
                  className={`${styles.color} cursor-pointer`}
                  style={{
                    backgroundColor: `${val.color}`,
                    border: `${val == "#ffffff" ? "1px solid black" : ""}`,
                  }}
                  onClick={() => handleColorChange(val)}
                ></span>
              ))}
          </div>
          <div className={`${styles.size} lg:mt-2`}>
            <p>المقاسات المتاحة</p>
            <div>
              {data.sizes?.map((val: string) => (
                <span className="" key={val}>
                  {val}
                </span>
              ))}
            </div>
          </div>
          <div className={`${styles.add_to_buttons}`}>
            <button
              className={`${styles.add_to_cart}`}
              onClick={handleAddToCart}
            >
              أضف إالي العربة
            </button>
            {/* <button className={`${styles.add_to_cart}`}>
              أضف إالي المفضلة
            </button> */}
          </div>
        </div>
        {openSignUpPopup && (
          <RegisterPopup
            isSignInOpen={openSignInPopup}
            isSignUpOpen={openSignUpPopup}
            onClose={closePopup}
            handleOpenSignInPopup={handleOpenSignInPopup}
          />
        )}
        {openSignInPopup && (
          <LoginPopup
            onClose={closePopup}
            handleOpenSignUpPopup={handleOpenSignUpPopup}
          />
        )}
        {productInfo && (
          <ProductInfoPopup
            product={data}
            isOpen={productInfo}
            onClose={closeProductInfo}
          />
        )}
      </div>
    </section>
  );
};

export default Product;
