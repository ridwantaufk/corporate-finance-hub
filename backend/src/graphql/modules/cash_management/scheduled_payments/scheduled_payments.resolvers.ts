import {
  getScheduledPaymentById,
  getAllScheduledPayments,
  createScheduledPayment,
  updateScheduledPayment,
  deleteScheduledPayment,
} from "./scheduled_payments.services";

const ScheduledPaymentResolver = {
  Query: {
    getScheduledPayment: (_: any, args: { id: number }) =>
      getScheduledPaymentById(args.id),
    getAllScheduledPayments: () => getAllScheduledPayments(),
  },
  Mutation: {
    createScheduledPayment: (
      _: any,
      args: {
        virtual_account_id: number;
        amount: number;
        payment_date: string;
        status: string;
      }
    ) =>
      createScheduledPayment(
        args.virtual_account_id,
        args.amount,
        args.payment_date,
        args.status
      ),
    updateScheduledPayment: (
      _: any,
      args: {
        id: number;
        amount?: number;
        payment_date?: string;
        status?: string;
      }
    ) =>
      updateScheduledPayment(
        args.id,
        args.amount,
        args.payment_date,
        args.status
      ),
    deleteScheduledPayment: (_: any, args: { id: number }) =>
      deleteScheduledPayment(args.id),
  },
};

export default ScheduledPaymentResolver;
