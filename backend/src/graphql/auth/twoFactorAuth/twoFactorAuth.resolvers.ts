import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  enableTwoFactorAuth,
  getTwoFactorAuth,
} from "./twoFactorAuth.services";
import { TwoFactorAuthInput, TwoFactorAuth } from "./twoFactorAuth.types";
import GraphQLJSON from "graphql-type-json";

export const twoFactorAuthResolvers: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Mutation: {
    enableTwoFactorAuth: async (
      _: any,
      { input }: { input: TwoFactorAuthInput },
      { db }: Context
    ): Promise<TwoFactorAuth> => {
      const client = await db.connect();
      try {
        return await enableTwoFactorAuth(input, client);
      } finally {
        client.release();
      }
    },
  },

  Query: {
    getTwoFactorAuth: async (
      _: any,
      { user_id }: { user_id: number },
      { db }: Context
    ): Promise<TwoFactorAuth | null> => {
      const client = await db.connect();
      try {
        return await getTwoFactorAuth(user_id, client);
      } finally {
        client.release();
      }
    },
  },
};
