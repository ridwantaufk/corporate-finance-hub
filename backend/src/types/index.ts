import { Request, Response } from "express";

interface googlePayload {
  id: number;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface TokenPayload {
  user_id: number;
  username: string;
  role: string;
}

export interface RequestWithUser extends Request {
  user?: TokenPayload | null;
}

export interface GraphQLContext {
  req: RequestWithUser;
  res: Response;
  user: TokenPayload | null;
  session: any;
}
