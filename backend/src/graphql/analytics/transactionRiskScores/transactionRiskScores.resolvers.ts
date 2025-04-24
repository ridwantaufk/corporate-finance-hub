import { PoolClient } from "pg";
import { TransactionRiskScore } from "./transactionRiskScores.types";
import {
  getTransactionRiskScores,
  getTransactionRiskScoreById,
  createTransactionRiskScore,
  updateTransactionRiskScore,
  deleteTransactionRiskScore,
} from "./transactionRiskScores.services";
import GraphQLJSON from "graphql-type-json";

export const transactionRiskScoreResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getTransactionRiskScores: async (
      _parent: any,
      _args: any,
      { db }: { db: PoolClient }
    ) => {
      return getTransactionRiskScores(db);
    },
    getTransactionRiskScoreById: async (
      _parent: any,
      { risk_id }: { risk_id: number },
      { db }: { db: PoolClient }
    ) => {
      return getTransactionRiskScoreById(risk_id, db);
    },
  },
  Mutation: {
    createTransactionRiskScore: async (
      _parent: any,
      { input }: { input: TransactionRiskScore },
      { db }: { db: PoolClient }
    ) => {
      return createTransactionRiskScore(input, db);
    },
    updateTransactionRiskScore: async (
      _parent: any,
      { risk_id, input }: { risk_id: number; input: TransactionRiskScore },
      { db }: { db: PoolClient }
    ) => {
      return updateTransactionRiskScore(risk_id, input, db);
    },
    deleteTransactionRiskScore: async (
      _parent: any,
      { risk_id }: { risk_id: number },
      { db }: { db: PoolClient }
    ) => {
      return deleteTransactionRiskScore(risk_id, db);
    },
  },
};
