import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const protectedRouter = Router();

protectedRouter.use(authMiddleware);

protectedRouter.get("/protected", (req, res) => {
  res.send("This is a protected route");
});

export default protectedRouter;
