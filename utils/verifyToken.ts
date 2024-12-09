import jwt from "jsonwebtoken";
import { JWTPayload } from "./dots";

export const verifyTokenFn = (token: string) => {
  const userFromToken = jwt.verify(
    token,
    process.env.PRIVATE_KEY as string
  ) as JWTPayload;

  return userFromToken;
};
