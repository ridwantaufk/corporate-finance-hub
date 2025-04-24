import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getReconciliations,
  getReconciliationById,
  createReconciliation,
  updateReconciliation,
  deleteReconciliation,
} from "./reconciliations.services";
import { Reconciliation } from "./reconciliations.types";

export const reconciliationResolvers: IResolvers<any, Context> = {
  Query: {
    getReconciliations: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getReconciliations(client);
      } finally {
        client.release();
      }
    },
    getReconciliationById: async (
      _: any,
      { reconciliation_id }: { reconciliation_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await getReconciliationById(reconciliation_id, client);
      } finally {
        client.release();
      }
    },
  },
  Mutation: {
    createReconciliation: async (
      _: any,
      { input }: { input: Reconciliation },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await createReconciliation(input, client);
      } finally {
        client.release();
      }
    },
    updateReconciliation: async (
      _: any,
      {
        reconciliation_id,
        input,
      }: { reconciliation_id: number; input: Reconciliation },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await updateReconciliation(reconciliation_id, input, client);
      } finally {
        client.release();
      }
    },
    deleteReconciliation: async (
      _: any,
      { reconciliation_id }: { reconciliation_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await deleteReconciliation(reconciliation_id, client);
      } finally {
        client.release();
      }
    },
  },
};
