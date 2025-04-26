import {
  getTransactionRiskScoreById,
  getAllTransactionRiskScores,
  createTransactionRiskScore,
  updateTransactionRiskScore,
  deleteTransactionRiskScore,
} from "./transaction_risk_scores.services";

const TransactionRiskScoresResolver = {
  Query: {
    getTransactionRiskScore: (_: any, args: { id: number }) =>
      getTransactionRiskScoreById(args.id),
    getAllTransactionRiskScores: () => getAllTransactionRiskScores(),
  },
  Mutation: {
    createTransactionRiskScore: (
      _: any,
      args: { transaction_id: number; risk_score: number }
    ) => createTransactionRiskScore(args.transaction_id, args.risk_score),
    updateTransactionRiskScore: (
      _: any,
      args: { id: number; transaction_id?: number; risk_score?: number }
    ) =>
      updateTransactionRiskScore(args.id, args.transaction_id, args.risk_score),
    deleteTransactionRiskScore: (_: any, args: { id: number }) =>
      deleteTransactionRiskScore(args.id),
  },
};

export default TransactionRiskScoresResolver;
