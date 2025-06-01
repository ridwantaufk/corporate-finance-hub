// src/middleware/authMiddleware.ts
import { Response, NextFunction } from "express";
import { verifyToken, verifyTokenJwtRS256 } from "@/utils/auth";
import { RequestWithUser } from "@/types";

/**
 * Middleware autentikasi untuk mengekstrak dan memverifikasi token JWT dari cookies
 * Mengatur req.user dengan data user yang terautentikasi atau null jika tidak ada token
 */
export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  // pake ini biar lebih aman dan efisien, karena pengecekan tanpa set dari user, alias tdk manual pengisian token cookiesnya, karena dia otomatis ambil dari cookies yang nempel di client (cek: devTools->appliaction->cookies)
  const token = req.cookies?.token;
  // console.log("Auth Middleware: Checking token in cookies", token);

  // // fungsi req.headers.authorization ini untuk permintaan header dari client, biasanya untuk REST API, tdk menutup kemungkinan juga bisa digunakan untuk GraphQL (misal: fetch API dengan pengisian token di header sisi client/frontend/ssr),  kekurangannya ini perlu diset manual oleh pengembang di sisi client, jadi tidak otomatis seperti cookies, dan juga tidak aman karena bisa saja tokennya diubah oleh user, jadi lebih baik pakai cookies yang sudah di set dari server
  // const authorized = req.headers.authorization;
  // console.log(
  //   "Auth Middleware: Checking authentication in cookies",
  //   authorized
  // );

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    // opsi 1
    // const decoded = verifyToken(token);

    // opsi 2
    const decoded = verifyTokenJwtRS256(token);
    req.user = decoded || null;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
