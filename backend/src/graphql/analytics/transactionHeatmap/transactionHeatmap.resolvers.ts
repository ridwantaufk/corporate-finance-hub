import { GraphQLJSON } from "graphql-type-json";
import { PoolClient } from "pg";
import {
  getTransactionHeatmaps,
  getTransactionHeatmapById,
  createTransactionHeatmap,
  updateTransactionHeatmap,
  deleteTransactionHeatmap,
} from "./transactionHeatmap.services";
import { TransactionHeatmap } from "./transactionHeatmap.types";

export const transactionHeatmapResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getTransactionHeatmaps: async (
      _: any,
      __: any,
      { db }: { db: PoolClient }
    ) => getTransactionHeatmaps(db),

    getTransactionHeatmapById: async (
      _: any,
      { heatmap_id }: { heatmap_id: number },
      { db }: { db: PoolClient }
    ) => getTransactionHeatmapById(heatmap_id, db),
  },

  Mutation: {
    createTransactionHeatmap: async (
      _: any,
      { input }: { input: TransactionHeatmap },
      { db }: { db: PoolClient }
    ) => createTransactionHeatmap(input, db),

    updateTransactionHeatmap: async (
      _: any,
      { heatmap_id, input }: { heatmap_id: number; input: TransactionHeatmap },
      { db }: { db: PoolClient }
    ) => updateTransactionHeatmap(heatmap_id, input, db),

    deleteTransactionHeatmap: async (
      _: any,
      { heatmap_id }: { heatmap_id: number },
      { db }: { db: PoolClient }
    ) => deleteTransactionHeatmap(heatmap_id, db),
  },
};
