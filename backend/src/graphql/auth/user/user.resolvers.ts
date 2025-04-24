import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import { createUser, getUser, getUsers } from "./user.services";
import { UserInput, User } from "./user.types";

export const usersResolvers: IResolvers<any, Context> = {
  Query: {
    getUsers: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getUsers(client);
      } finally {
        client.release();
      }
    },
    getUser: async (
      _: any,
      { user_id }: { user_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await getUser(user_id, client);
      } finally {
        client.release();
      }
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { input }: { input: UserInput },
      { db }: Context
    ): Promise<User> => {
      const client = await db.connect();
      try {
        return await createUser(input, client);
      } finally {
        client.release();
      }
    },
  },
};
