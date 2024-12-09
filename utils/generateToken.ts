import { JWTPayload } from "@/utils/dots";
import jwt from "jsonwebtoken";

export const generateJWT = (jwtPayload: JWTPayload): string => {
  // Get Private Key
  const privateKey = process.env.PRIVATE_KEY as string;

  // Generate Token
  const token = jwt.sign(jwtPayload, privateKey, {
    expiresIn: "30d",
  });

  return token;
};
