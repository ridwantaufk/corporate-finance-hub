import {
  createFxTransaction,
  getAllFxTransactions,
  getFxTransactionById,
  updateFxTransaction,
  deleteFxTransaction,
} from "./fx_transactions.services";

const FxTransactionsResolver = {
  Query: {
    getAllFxTransactions: async () => await getAllFxTransactions(),
    getFxTransactionById: async (
      _: any,
      { fx_transaction_id }: { fx_transaction_id: number }
    ) => await getFxTransactionById(fx_transaction_id),
  },
  Mutation: {
    createFxTransaction: async (_: any, { input }: any) =>
      await createFxTransaction(input),
    updateFxTransaction: async (_: any, { fx_transaction_id, input }: any) =>
      await updateFxTransaction(fx_transaction_id, input),
    deleteFxTransaction: async (_: any, { fx_transaction_id }: any) =>
      await deleteFxTransaction(fx_transaction_id),
  },
};

export default FxTransactionsResolver;
