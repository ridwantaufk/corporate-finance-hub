import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getVirtualAccounts,
  getVirtualAccountById,
  createVirtualAccount,
  updateVirtualAccount,
  deleteVirtualAccount,
} from "./virtualAccount.services";
import { VirtualAccount } from "./virtualAccount.types";
import GraphQLJSON from "graphql-type-json";

export const virtualAccountResolvers: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Query: {
    getVirtualAccounts: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getVirtualAccounts(client);
      } finally {
        client.release();
      }
    },
    getVirtualAccountById: async (
      _: any,
      { va_id }: { va_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await getVirtualAccountById(va_id, client);
      } finally {
        client.release();
      }
    },
  },

  Mutation: {
    createVirtualAccount: async (
      _: any,
      { input }: { input: VirtualAccount },
      { db }: Context
    ): Promise<VirtualAccount> => {
      const client = await db.connect();
      try {
        return await createVirtualAccount(input, client);
      } finally {
        client.release();
      }
    },
    updateVirtualAccount: async (
      _: any,
      { va_id, input }: { va_id: number; input: VirtualAccount },
      { db }: Context
    ): Promise<VirtualAccount> => {
      const client = await db.connect();
      try {
        return await updateVirtualAccount(va_id, input, client);
      } finally {
        client.release();
      }
    },
    deleteVirtualAccount: async (
      _: any,
      { va_id }: { va_id: number },
      { db }: Context
    ): Promise<boolean> => {
      const client = await db.connect();
      try {
        return await deleteVirtualAccount(va_id, client);
      } finally {
        client.release();
      }
    },
  },
};
