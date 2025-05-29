import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";
import { Response } from "express";
import { TokenPayload } from "@/types/index";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("WARNING: JWT_SECRET is not defined in environment variables!");
}

const jwtSecret =
  process.env.JWT_SECRET || "fallback_secret_for_development_only";
const expired = process.env.JWT_EXPIRES_IN || "1d";

/**
 * Generate jwt token from payload user
 * @param payload - Data user untuk disimpan dalam token
 * @returns JWT token
 */
export const generateToken = (payload: TokenPayload): string => {
  let expiresIn: number | StringValue;

  if (!isNaN(Number(expired))) {
    expiresIn = Number(expired);
  } else {
    expiresIn = expired as StringValue;
  }

  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, jwtSecret, options);
};

/**
 * Verify and detect jwt tokens
 * @param token - Token JWT untuk diverifikasi
 * @returns Payload yang didecode
 */
export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, jwtSecret) as TokenPayload;
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};

/**
 * Set JWT token into cookie HTTP-only
 * @param res - Express response object
 * @param token - JWT token
 */
export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
};

/**
 * delete the token cookie (for logout)
 * @param res - Express response object
 */
export const clearTokenCookie = (res: Response): void => {
  res.clearCookie("token");
};

export const generateTokenJwtRS256 = (user: TokenPayload): string => {
  const privateKeyPath = path.resolve(
    process.cwd(),
    process.env.PRIVATE_KEY_PATH!
  );
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");

  console.warn(
    "WARNING: JWT_RS256 is not implemented yet. Please use HS256 for now."
  );

  return jwt.sign(user, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
};

export const setTokenjwtRS256 = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60, // 1 hour
  });
};

export const verifyTokenJwtRS256 = (token: string): TokenPayload => {
  const publicKeyPath = path.resolve(
    process.cwd(),
    process.env.PUBLIC_KEY_PATH!
  );
  const publicKey = fs.readFileSync(publicKeyPath, "utf8");

  console.warn(
    "WARNING: JWT_RS256 is not implemented yet. Please use HS256 for now."
  );

  try {
    return jwt.verify(token, publicKey) as TokenPayload;
  } catch (error) {
    throw new Error("Token is invalid or expired");
  }
};

export const oAuth2Client = async (code: string) => {
  // console.log("Exchanging code:", code);
  // console.log("Using redirect URI:", process.env.GOOGLE_REDIRECT_URI);

  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    throw new Error(tokenData.error_description || "Failed to get token");
  }

  const accessToken = tokenData.access_token;

  // take user data from Google
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const user = await userRes.json();

  return { user, accessToken };
};
