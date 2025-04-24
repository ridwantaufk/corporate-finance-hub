import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getScheduledPayments,
  createScheduledPayment,
  updateScheduledPayment,
  deleteScheduledPayment,
} from "./scheduledPayment.services";
import { ScheduledPayment } from "./scheduledPayment.types";
import GraphQLJSON from "graphql-type-json";

export const scheduledPaymentResolvers: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Query: {
    getScheduledPayments: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getScheduledPayments(client);
      } finally {
        client.release();
      }
    },
  },

  Mutation: {
    createScheduledPayment: async (
      _: any,
      { input }: { input: ScheduledPayment },
      { db }: Context
    ): Promise<ScheduledPayment> => {
      const client = await db.connect();
      try {
        return await createScheduledPayment(input, client);
      } finally {
        client.release();
      }
    },
    updateScheduledPayment: async (
      _: any,
      { payment_id, input }: { payment_id: number; input: ScheduledPayment },
      { db }: Context
    ): Promise<ScheduledPayment> => {
      const client = await db.connect();
      try {
        return await updateScheduledPayment(payment_id, input, client);
      } finally {
        client.release();
      }
    },
    deleteScheduledPayment: async (
      _: any,
      { payment_id }: { payment_id: number },
      { db }: Context
    ): Promise<boolean> => {
      const client = await db.connect();
      try {
        return await deleteScheduledPayment(payment_id, client);
      } finally {
        client.release();
      }
    },
  },
};
