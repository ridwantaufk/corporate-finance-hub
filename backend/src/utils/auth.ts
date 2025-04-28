import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET!;
const expired = process.env.JWT_EXPIRES_IN || "1h";

interface TokenPayload {
  userId: string;
  // username: string;
  // role: string;
}

export const generateToken = (payload: TokenPayload) => {
  let expiresIn: number | StringValue;
  console.log("payload : ", payload);

  if (!isNaN(Number(expired))) {
    expiresIn = Number(expired);
  } else {
    expiresIn = expired as StringValue;
  }

  const options: SignOptions = { expiresIn };

  // console.log(
  //   "jwt.sign(payload, jwtSecret, options) : ",
  //   jwt.sign(payload, jwtSecret, options)
  // );
  return jwt.sign(payload, jwtSecret, options);
};

// token verif
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};

// setting tokens in Cookies
export const setTokenCookie = (res: any, token: string) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1h
  });
};

export const clearTokenCookie = (res: any) => {
  res.clearCookie("accessToken");
};
