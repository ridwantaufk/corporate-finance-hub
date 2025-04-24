import { IResolvers } from "@graphql-tools/utils";
import { Context } from "@/types/context";
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "./invoices.services";
import { InvoiceInput } from "./invoices.types";
import GraphQLJSON from "graphql-type-json";

export const invoicesResolvers: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Query: {
    getInvoices: async (_: any, __: any, { db }: Context) => {
      const client = await db.connect();
      try {
        return await getInvoices(client);
      } finally {
        client.release();
      }
    },
    getInvoiceById: async (
      _: any,
      { invoice_id }: { invoice_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await getInvoiceById(invoice_id, client);
      } finally {
        client.release();
      }
    },
  },
  Mutation: {
    createInvoice: async (
      _: any,
      { input }: { input: InvoiceInput },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await createInvoice(input, client);
      } finally {
        client.release();
      }
    },
    updateInvoice: async (
      _: any,
      { invoice_id, input }: { invoice_id: number; input: InvoiceInput },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await updateInvoice(invoice_id, input, client);
      } finally {
        client.release();
      }
    },
    deleteInvoice: async (
      _: any,
      { invoice_id }: { invoice_id: number },
      { db }: Context
    ) => {
      const client = await db.connect();
      try {
        return await deleteInvoice(invoice_id, client);
      } finally {
        client.release();
      }
    },
  },
};
