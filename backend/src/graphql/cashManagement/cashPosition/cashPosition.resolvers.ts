import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getCashPositions,
  createCashPosition,
  updateCashPosition,
  deleteCashPosition,
} from "./cashPosition.services";
import { CashPosition } from "./cashPosition.types";
import GraphQLJSON from "graphql-type-json";

export const cashPositionResolvers: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Query: {
    getCashPositions: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getCashPositions(client);
      } finally {
        client.release();
      }
    },
  },

  Mutation: {
    createCashPosition: async (
      _: any,
      { input }: { input: CashPosition },
      { db }: Context
    ): Promise<CashPosition> => {
      const client = await db.connect();
      try {
        return await createCashPosition(input, client);
      } finally {
        client.release();
      }
    },
    updateCashPosition: async (
      _: any,
      { position_id, input }: { position_id: number; input: CashPosition },
      { db }: Context
    ): Promise<CashPosition> => {
      const client = await db.connect();
      try {
        return await updateCashPosition(position_id, input, client);
      } finally {
        client.release();
      }
    },
    deleteCashPosition: async (
      _: any,
      { position_id }: { position_id: number },
      { db }: Context
    ): Promise<boolean> => {
      const client = await db.connect();
      try {
        return await deleteCashPosition(position_id, client);
      } finally {
        client.release();
      }
    },
  },
};
