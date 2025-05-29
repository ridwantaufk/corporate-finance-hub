import { Request, Response, NextFunction } from "express";

export const logRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("Request Body : ", req.body);
  next();
};
