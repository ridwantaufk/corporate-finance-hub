import {
  getInvoiceById,
  getAllInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "./invoices.services";

const InvoiceResolver = {
  Query: {
    getInvoice: (_: any, args: { invoice_id: number }) =>
      getInvoiceById(args.invoice_id),
    getAllInvoices: () => getAllInvoices(),
  },
  Mutation: {
    createInvoice: (
      _: any,
      args: {
        client_id: number;
        amount: number;
        due_date: string;
        status: string;
      }
    ) => createInvoice(args.client_id, args.amount, args.due_date, args.status),
    updateInvoice: (
      _: any,
      args: {
        invoice_id: number;
        amount?: number;
        due_date?: string;
        status?: string;
      }
    ) =>
      updateInvoice(args.invoice_id, args.amount, args.due_date, args.status),
    deleteInvoice: (_: any, args: { invoice_id: number }) =>
      deleteInvoice(args.invoice_id),
  },
};

export default InvoiceResolver;
