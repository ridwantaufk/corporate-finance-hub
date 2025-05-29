import "express-session";

declare module "express-session" {
  interface SessionData {
    captcha: any;
    token: string;
  }
}
