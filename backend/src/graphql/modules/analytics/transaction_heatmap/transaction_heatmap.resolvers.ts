import {
  getTransactionHeatmapById,
  getAllTransactionHeatmaps,
  createTransactionHeatmap,
  updateTransactionHeatmap,
  deleteTransactionHeatmap,
} from "./transaction_heatmap.services";

const TransactionHeatmapResolver = {
  Query: {
    getTransactionHeatmap: (_: any, args: { id: number }) =>
      getTransactionHeatmapById(args.id),
    getAllTransactionHeatmaps: () => getAllTransactionHeatmaps(),
  },
  Mutation: {
    createTransactionHeatmap: (
      _: any,
      args: { transaction_time: string; heatmap_value: number }
    ) => createTransactionHeatmap(args.transaction_time, args.heatmap_value),
    updateTransactionHeatmap: (
      _: any,
      args: { id: number; transaction_time?: string; heatmap_value?: number }
    ) =>
      updateTransactionHeatmap(
        args.id,
        args.transaction_time,
        args.heatmap_value
      ),
    deleteTransactionHeatmap: (_: any, args: { id: number }) =>
      deleteTransactionHeatmap(args.id),
  },
};

export default TransactionHeatmapResolver;
