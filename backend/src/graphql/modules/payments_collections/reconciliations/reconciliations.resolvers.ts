import {
  getReconciliationById,
  getAllReconciliations,
  createReconciliation,
  updateReconciliation,
  deleteReconciliation,
} from "./reconciliations.services";

const ReconciliationResolver = {
  Query: {
    getReconciliation: (_: any, args: { reconciliation_id: number }) =>
      getReconciliationById(args.reconciliation_id),
    getAllReconciliations: () => getAllReconciliations(),
  },
  Mutation: {
    createReconciliation: (
      _: any,
      args: {
        invoice_id: number;
        transaction_id: number;
        amount: number;
        reconciliation_status: string;
      }
    ) =>
      createReconciliation(
        args.invoice_id,
        args.transaction_id,
        args.amount,
        args.reconciliation_status
      ),
    updateReconciliation: (
      _: any,
      args: {
        reconciliation_id: number;
        amount?: number;
        reconciliation_status?: string;
      }
    ) =>
      updateReconciliation(
        args.reconciliation_id,
        args.amount,
        args.reconciliation_status
      ),
    deleteReconciliation: (_: any, args: { reconciliation_id: number }) =>
      deleteReconciliation(args.reconciliation_id),
  },
};

export default ReconciliationResolver;
