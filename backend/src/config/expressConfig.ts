import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "@/middleware/authMiddleware";
import session from "express-session";
import { sessionCookieConfig } from "./cookieConfig";

/**
 * Configure the Express App with the required Middleware
 * @returns Express application with middleware is configured
 */
export const configureExpressApp = (): Express => {
  const app = express();

  // bbody parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cookie Parser to handle authentication cookies
  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "default_secret_key",
      resave: false,
      saveUninitialized: false,
      cookie: sessionCookieConfig,
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );

  // middleware authentication for all requests
  app.use(authMiddleware);

  // Middleware for handling global errors
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res.status(500).send("Something went wrong!");
    }
  );

  return app;
};
