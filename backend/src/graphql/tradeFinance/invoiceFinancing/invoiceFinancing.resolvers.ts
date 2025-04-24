import GraphQLJSON from "graphql-type-json";
import {
  getInvoiceFinancings,
  getInvoiceFinancingById,
  createInvoiceFinancing,
  updateInvoiceFinancing,
  deleteInvoiceFinancing,
} from "./invoiceFinancing.services";

export const invoiceFinancingResolvers = {
  JSON: GraphQLJSON,

  Query: {
    getInvoiceFinancings: async (_: any, __: any, { db }: any) => {
      return getInvoiceFinancings(db);
    },
    getInvoiceFinancingById: async (_: any, { id }: any, { db }: any) => {
      return getInvoiceFinancingById(Number(id), db);
    },
  },
  Mutation: {
    createInvoiceFinancing: async (_: any, { input }: any, { db }: any) => {
      return createInvoiceFinancing(input, db);
    },
    updateInvoiceFinancing: async (_: any, { id, input }: any, { db }: any) => {
      return updateInvoiceFinancing(Number(id), input, db);
    },
    deleteInvoiceFinancing: async (_: any, { id }: any, { db }: any) => {
      return deleteInvoiceFinancing(Number(id), db);
    },
  },
};
