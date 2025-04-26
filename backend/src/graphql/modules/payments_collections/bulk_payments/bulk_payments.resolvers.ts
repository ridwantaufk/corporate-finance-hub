import {
  getBulkPaymentById,
  getAllBulkPayments,
  createBulkPayment,
  updateBulkPayment,
  deleteBulkPayment,
} from "./bulk_payments.services";

const BulkPaymentResolver = {
  Query: {
    getBulkPayment: (_: any, args: { payment_id: number }) =>
      getBulkPaymentById(args.payment_id),
    getAllBulkPayments: () => getAllBulkPayments(),
  },
  Mutation: {
    createBulkPayment: (
      _: any,
      args: {
        sender_va_id: number;
        receiver_va_id: number;
        total_amount: number;
        status: string;
      }
    ) =>
      createBulkPayment(
        args.sender_va_id,
        args.receiver_va_id,
        args.total_amount,
        args.status
      ),
    updateBulkPayment: (
      _: any,
      args: {
        payment_id: number;
        sender_va_id?: number;
        receiver_va_id?: number;
        total_amount?: number;
        status?: string;
      }
    ) =>
      updateBulkPayment(
        args.payment_id,
        args.sender_va_id,
        args.receiver_va_id,
        args.total_amount,
        args.status
      ),
    deleteBulkPayment: (_: any, args: { payment_id: number }) =>
      deleteBulkPayment(args.payment_id),
  },
};

export default BulkPaymentResolver;
