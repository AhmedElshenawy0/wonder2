import Image from "next/image";
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const UploadImage = ({ setShownImage, setImage, shownImage }: any) => {
  // Handle Showen Image On The Page Once Uploaded
  const handleImageUpload = (e: any) => {
    if (e) {
      const previewURL: any = URL.createObjectURL(e);
      setShownImage(previewURL);
      setImage(e);
    }
  };
  return (
    <div className="w-full bg-white rounded-lg">
      <h6 className="text-[16px] p-3 border-b font-medium text-[#111111]">
        Add Product Photo
      </h6>
      <div className="p-4">
        <div className=" text-center border-2 border-dashed rounded-lg flex flex-col justify-center items-center px-2 py-5 lg:py-10">
          <label htmlFor="upload" className=" cursor-pointer">
            <IoCloudUploadOutline
              color="green"
              size={40}
              className="animate-[bounce_2s_ease-in-out_infinite]"
            />
          </label>
          <h5 className="text-2xl font-semibold mt-7 mb-2">
            Drop your images here, or{" "}
            <label
              htmlFor="upload"
              className="text-green-700 cursor-pointer animate-pulse"
            >
              click to browse
            </label>
            <input
              type="file"
              id="upload"
              className=" hidden"
              onChange={(e) => handleImageUpload(e.target.files![0])}
            />
          </h5>
          {shownImage && (
            <Image
              src={shownImage}
              alt="product-image"
              width={300}
              height={250}
              className=" rounded-md my-3 w-full md:w-[80%] object-cover aspect-[1/0.8]"
            />
          )}

          <p className="text-sm text-[#5d7186] font-medium">
            1600 x 1200 (4:3) recommended. PNG, JPG are allowed
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
