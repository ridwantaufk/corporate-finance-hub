import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getBulkPayments,
  getBulkPaymentById,
  createBulkPayment,
  updateBulkPayment,
  deleteBulkPayment,
} from "./bulkPayments.services";
import { BulkPayment, BulkPaymentInput } from "./bulkPayments.types";

export const bulkPaymentsResolvers: IResolvers<any, Context> = {
  Query: {
    getBulkPayments: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getBulkPayments(client);
      } finally {
        client.release();
      }
    },
    getBulkPaymentById: async (
      _: any,
      { payment_id }: { payment_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await getBulkPaymentById(payment_id, client);
      } finally {
        client.release();
      }
    },
  },
  Mutation: {
    createBulkPayment: async (
      _: any,
      { input }: { input: BulkPaymentInput },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await createBulkPayment(input, client);
      } finally {
        client.release();
      }
    },
    updateBulkPayment: async (
      _: any,
      { payment_id, input }: { payment_id: number; input: BulkPaymentInput },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await updateBulkPayment(payment_id, input, client);
      } finally {
        client.release();
      }
    },
    deleteBulkPayment: async (
      _: any,
      { payment_id }: { payment_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await deleteBulkPayment(payment_id, client);
      } finally {
        client.release();
      }
    },
  },
};
