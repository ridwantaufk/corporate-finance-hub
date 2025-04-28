import { verifyToken } from "../utils/auth";

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).send("Authentication required");
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token");
  }
};
