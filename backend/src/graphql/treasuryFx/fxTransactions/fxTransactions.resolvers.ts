import GraphQLJSON from "graphql-type-json";
import {
  getFxTransactions,
  getFxTransactionById,
  createFxTransaction,
  deleteFxTransaction,
} from "./fxTransactions.services";

export const fxTransactionResolvers = {
  JSON: GraphQLJSON,

  Query: {
    fxTransactions: async (_parent: any, _args: any, { db }: any) => {
      return getFxTransactions(db);
    },
    fxTransaction: async (
      _parent: any,
      args: { fx_transaction_id: number },
      { db }: any
    ) => {
      return getFxTransactionById(args.fx_transaction_id, db);
    },
  },
  Mutation: {
    createFxTransaction: async (
      _parent: any,
      args: { input: any },
      { db }: any
    ) => {
      return createFxTransaction(args.input, db);
    },
    deleteFxTransaction: async (
      _parent: any,
      args: { fx_transaction_id: number },
      { db }: any
    ) => {
      return deleteFxTransaction(args.fx_transaction_id, db);
    },
  },
};
