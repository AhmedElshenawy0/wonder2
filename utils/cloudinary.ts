import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 *
 * @param name person name
 * @param greeting greeting
 */
const sayHello = (name: string, greeting: string) => {
  console.log(greeting, name);
};

export default cloudinary;
