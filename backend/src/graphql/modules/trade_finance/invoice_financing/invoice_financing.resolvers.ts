import {
  createInvoiceFinancing,
  getAllInvoiceFinancings,
  getInvoiceFinancingById,
  updateInvoiceFinancing,
  deleteInvoiceFinancing,
} from "./invoice_financing.services";

const invoiceFinancingResolvers = {
  Query: {
    getAllInvoiceFinancings: async () => await getAllInvoiceFinancings(),
    getInvoiceFinancingById: async (
      _: any,
      { invoice_id }: { invoice_id: number }
    ) => await getInvoiceFinancingById(invoice_id),
  },
  Mutation: {
    createInvoiceFinancing: async (_: any, { input }: any) =>
      await createInvoiceFinancing(input),
    updateInvoiceFinancing: async (_: any, { invoice_id, input }: any) =>
      await updateInvoiceFinancing(invoice_id, input),
    deleteInvoiceFinancing: async (_: any, { invoice_id }: any) =>
      await deleteInvoiceFinancing(invoice_id),
  },
};

export default invoiceFinancingResolvers;
