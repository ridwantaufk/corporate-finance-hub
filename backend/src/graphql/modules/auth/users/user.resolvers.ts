import { validationResult } from "express-validator";
import { Request, Response } from "express";
import {
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserByField,
} from "./user.services";
import {
  createUserValidationRules,
  updateUserValidationRules,
} from "./user.validation";
import { CreateUserBiodata, UpdateUserBiodata, User } from "./user.types";
import {
  clearTokenCookie,
  setTokenCookie,
  setTokenjwtRS256,
} from "@/utils/auth";
import { getBiodataByField, getBiodataById } from "../biodata/biodata.services";
import { oAuth2Client } from "@/utils/auth";
import { createCaptcha, verifyCaptcha } from "@/services/captchaService";
import { GraphQLContext } from "@/types";

const UserResolver = {
  Query: {
    getCaptcha: async (_: any, __: any, context: GraphQLContext) => {
      const { data, solution } = await createCaptcha();
      console.log("solution : ", solution);
      context.session.captcha = solution;
      console.log("context.session : ", context.session);
      await context.session.save?.();
      return { data, solution: null };
    },
    me: async (_parent: any, _args: any, context: any) => {
      console.log("context : ", context);
      console.log("context.user : ", context.user);
      if (!context.user) return null;

      const user = await getUserById(context.user.user_id);

      if (!user) return null;

      const biodata = await getBiodataById(user?.biodata_id);

      const userWithBiodata = {
        ...user,
        biodata,
      };
      console.log("userWithBiodata : ", userWithBiodata);
      return userWithBiodata;
    },
    getUserById: (
      _parent: any,
      { user_id }: { user_id: number },
      context: any
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return getUserById(user_id);
    },
    getUsers: (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return getUsers();
    },
  },
  Mutation: {
    login: async (
      _: any,
      args: { username: string; password: string },
      context: GraphQLContext
    ) => {
      const { username, password } = args;
      const { req, res, session } = context;

      const result = await loginUser(username, password);

      if (!result) {
        throw new Error("Invalid username or password");
      }
      console.log("session. : ", session);
      console.log("session.captchaVerified : ", session.captchaVerified);
      console.log(
        "VERIFFF : ",
        !session.captchaVerified ||
          (session.captchaVerified.response !== "success" &&
            !session.captchaVerified.token)
      );
      if (
        !session.captchaVerified ||
        (session.captchaVerified.response !== "success" &&
          !session.captchaVerified.token)
      )
        throw new Error("Captcha not verified");

      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            console.error("Failed to destroy session:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // // opsi 1
      // setTokenCookie(res, result.accessToken);

      // opsi 2 (lebih kuat)
      const RSAKeyPair = setTokenjwtRS256(res, result.accessToken);

      console.log("=== USER LOGIN SUCCESS ===");
      console.log("User Data:", result.user);
      console.log("Access Token:", result.accessToken);
      console.log("===========================");

      // return {
      //   accessToken: result.accessToken,
      //   user: result.user,
      // };

      return { success: true, message: "Login successful !", RSAKeyPair };
    },

    verifyCaptcha: async (
      _: any,
      {
        responseBody,
      }: {
        responseBody: { response: number; trail: { x: number[]; y: number[] } };
      },
      context: GraphQLContext
    ) => {
      const { session } = context;
      console.log("session:", session);

      if (!session.captcha) {
        throw new Error("Captcha not generated");
      }

      const verification = await verifyCaptcha(session.captcha, responseBody);

      console.log("verification:", verification);

      context.session.captchaVerified = verification;

      await context.session.save?.();

      return verification;
    },

    oAuthLogin: async (
      _: any,
      args: { provider: string; code: string },
      { res }: { res: Response }
    ) => {
      const { provider, code } = args;

      let accessToken: string;
      let user: any;

      if (provider === "google") {
        const oAuth2ClientResponse = await oAuth2Client(code);
        user = oAuth2ClientResponse.user;
        accessToken = oAuth2ClientResponse.accessToken;

        const getBiodata = await getBiodataByField("email", user.email);

        if (!getBiodata)
          return { success: false, message: `Email is not found`, user };

        const getUser = await getUserById(getBiodata.biodata_id);

        if (!getUser)
          return {
            success: false,
            message: "User is not found",
            user: { email: user.email },
          };

        console.log("oAuth2ClientRespons : ", oAuth2ClientResponse);
      } else {
        throw new Error("Unsupported OAuth provider");
      }

      // token di cookie HttpOnly dengan RS256
      setTokenjwtRS256(res, accessToken);

      console.log("=== OAUTH LOGIN SUCCESS ===");
      console.log("User Data:", user);
      console.log("Access Token:", accessToken);
      console.log("===========================");

      return { success: true, message: "Login successful!", user };
    },

    createUser: async (
      _: any,
      { input }: { input: CreateUserBiodata }
    ): Promise<{ success: boolean; message: string }> => {
      try {
        console.log("masuk");
        console.log("biodata:", input.biodata);
        await createUser(
          input.username,
          input.password,
          input.role,
          input.is_active,
          input.biodata
        );

        return {
          success: true,
          message: "User created successfully",
        };
      } catch (error: any) {
        console.error("Error creating user:", error);
        return {
          success: false,
          message: error.message || "Failed to create user",
        };
      }
    },

    updateUser: async (
      _: any,
      {
        user_id,
        username,
        password,
        role,
        is_active,
        biodata,
      }: UpdateUserBiodata,
      context: any
    ) => {
      return updateUser(user_id, username, password, role, is_active, biodata);
    },

    deleteUser: (_: any, { user_id }: { user_id: number }) => {
      deleteUser(user_id);

      return true;
    },

    logout: (_: any, __: any, { res }: { res: Response }) => {
      clearTokenCookie(res);

      return true;
    },
  },
};

export default UserResolver;
