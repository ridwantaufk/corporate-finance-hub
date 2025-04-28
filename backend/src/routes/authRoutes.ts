import { Router } from "express";
import { setTokenCookie, clearTokenCookie, generateToken } from "../utils/auth";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  console.log("req.body : ", req.body);
  const { userId } = req.body;
  const token = generateToken({ userId });
  setTokenCookie(res, token);
  res.status(200).send("Login successful");
});

authRouter.post("/logout", (req, res) => {
  clearTokenCookie(res);
  res.status(200).send("Logout successful");
});

export default authRouter;
